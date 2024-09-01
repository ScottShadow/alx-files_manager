import redisClient from "../utils/redis";
import dbClient from "../utils/db";
import crypto from "crypto";

export default class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ error: "Missing email" });
    if (!password) return res.status(400).send({ error: "Missing password" });
    const hash_pass = crypto.createHash("sha1").update(password).digest("hex");
    const new_user = await dbClient.addUser(email, hash_pass)
    if (new_user != null) {
      res.status(201).send({ id: new_user._id, email: email });
    } else {
      res.status(400).send({ error: "Already exists" });
    }
  }
}
