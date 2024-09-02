import { exec } from "child_process";
import dbClient from "../utils/db";
import redisClient from "../utils/redis";
import crypto from "crypto";
import { v4 as uuidv4 } from 'uuid';

/**
 * Class to manage the authentication
 * @class AuthController
 */
export default class AuthController {

  /**
   * Handle the GET /connect route
   * @param {Request} req Express request
   * @param {Response} res Express response
   * @returns {Promise<void>}
   */
  static async getConnect(req, res) {
    const auth_header = req.headers["authorization"].split(" ")[1];
    const decoded_user_creds = Buffer.from(auth_header, "base64").toString();
    const [email, password] = decoded_user_creds.split(":");
    const hash_password = crypto.createHash("sha1").update(password).digest("hex");
    const current_user = await dbClient.getUser(email, hash_password);

    if (current_user == null || current_user == undefined) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    const auth_token = uuidv4();
    redisClient.set(`auth_${auth_token}`, current_user._id.toString(), 86400);
    return res.status(200).send({ token: auth_token });
  }

  /**
   * Handle the GET /disconnect route
   * @param {Request} req Express request
   * @param {Response} res Express response
   * @returns {Promise<void>}
   */
  static async getDisconnect(req, res) {
    const auth_header = req.headers["x-token"];
    const confirm_auth_header = await redisClient.get(`auth_${auth_header}`);
    if (auth_header == undefined || confirm_auth_header == undefined) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    try {
      redisClient.del(`auth_${auth_header}`);
      return res.status(204).send({});
    } catch (error) {
      return res.status(401).send({ message: error });
    }
  }
}
