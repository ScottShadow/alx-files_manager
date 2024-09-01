import redisClient from "../utils/redis";
import dbClient from "../utils/db";
import crypto from "crypto";

/**
 * Class representing a controller for managing users.
 *
 * @class
 */
export default class UsersController {
  /**
   * Handle the POST /users route.
   *
   * @param {Request} req Express request
   * @param {Response} res Express response
   * @returns {Promise<void>}
   */
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

  /**
   * Handle the GET /users/me route.
   *
   * @param {Request} req Express request
   * @param {Response} res Express response
   * @returns {Promise<void>}
   */
  static async getMe(req, res) {
    try {
      const auth_header = req.headers["x-token"];
      const current_user_id = await redisClient.get(auth_header);
      const current_user = await dbClient.getUserById(current_user_id);
      const email = current_user.email;
      return res.send({ id: current_user_id, email: email });
    } catch (e) {
      return res.status(401).send({ error: "Unauthorized" });
    }
  }
}

