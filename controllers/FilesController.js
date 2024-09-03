import dbClient from "../utils/db";
import redisClient from "../utils/redis";
import util from "util";
import { v4 as uuidv4 } from 'uuid';
import { mkdir, writeFile, existsSync } from "fs";
import path from "path";

// Promisify the file system operations
const asyncMkdir = util.promisify(mkdir);
const asyncWriteFile = util.promisify(writeFile);

// Set folder path, use environment variable or default to '/tmp/files_manager'
const FOLDER_PATH = process.env.FOLDER_PATH || "/tmp/files_manager";

export default class FilesController {
  static async postUpload(req, res) {
    try {
      // Retrieve and validate the user from the Redis cache
      const auth_header = req.headers["x-token"];
      if (!auth_header) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const current_user_id = await redisClient.get(`auth_${auth_header}`);
      if (!current_user_id) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const user = await dbClient.getUserById(current_user_id);
      if (!user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      // Validate request body parameters
      const name = req.body.name;
      if (!name) return res.status(400).send({ error: "Missing name" });

      const type = req.body.type;
      if (!type || !["file", "folder", "image"].includes(type)) {
        return res.status(400).send({ error: "Missing or invalid type" });
      }

      const data = req.body.data;
      if (type !== "folder" && !data) {
        return res.status(400).send({ error: "Missing data" });
      }

      let parentId = req.body.parentId || 0;
      let parentPath = FOLDER_PATH;
      let parentObj = null;
      if (parentId !== 0) {
        parentObj = await dbClient.getFileById(parentId);
        if (!parentObj) {
          return res.status(400).send({ error: "Parent not found" });
        }
        if (parentObj.type !== "folder") {
          return res.status(400).send({ error: "Parent is not a folder" });
        }
        parentPath = parentObj.localPath;
      }

      // Ensure the Path exists, create it if it doesn't
      if (!existsSync(FOLDER_PATH)) {
        await asyncMkdir(FOLDER_PATH, { recursive: true });
      }

      // Handle folder creation
      if (type === "folder") {
        const newFolderPath = path.join(parentPath, `${name}`)
        //await asyncMkdir(newFolderPath, { recursive: true });
        const folderPayload = {
          userId: user._id,
          name,
          type,
          parentId,
          isPublic: req.body.isPublic || false,
          localPath: newFolderPath,
        };

        const newFolder = await dbClient.addFile(folderPayload);
        if (!newFolder) {
          return res.status(500).send({ error: "Failed to create folder" });
        } delete newFolder.localPath;
        return res.status(201).send(newFolder);
      }


      // Handle file or image creation
      if (type === "file" || type === "image") {
        const filePath = path.join(FOLDER_PATH, uuidv4());
        const dataBinary = Buffer.from(data, "base64");

        await asyncWriteFile(filePath, dataBinary);

        const filePayload = {
          userId: user._id,
          name,
          type,
          isPublic: req.body.isPublic || false,
          parentId,
          localPath: filePath,
        };

        const newFile = await dbClient.addFile(filePayload);
        if (!newFile) {
          return res.status(500).send({ error: "Failed to create file" });
        }
        delete newFile.localPath;
        return res.status(201).send(newFile);
      }
    } catch (e) {
      console.error(e);
      return res.status(500).send({ error: "Internal server error" });
    }
  }
}
