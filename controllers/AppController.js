import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

/**
 * AppController
 *
 * @class
 */
export default class AppController {

  /**
   * Get the status of the application
   *
   * @param {Object} req - The Express request object
   * @param {Object} res - The Express response object
   *
   * @returns {Promise} - A Promise that resolves with a JSON object containing the status
   */
  static async getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  /**
   * Get the stats of the application
   *
   * @param {Object} req - The Express request object
   * @param {Object} res - The Express response object
   *
   * @returns {Promise} - A Promise that resolves with a JSON object containing the stats
   */
  static async getStats(req, res) {
    res.status(200).json({
      nbUsers: await dbClient.nbUsers(),
      nbFiles: await dbClient.nbFiles(),
    });
  }

  /**
   * Get the keys in the Redis database
   *
   * @param {Object} req - The Express request object
   * @param {Object} res - The Express response object
   *
   * @returns {Promise} - A Promise that resolves with a JSON object containing the keys
   */
  static async getKeys(req, res) {
    res.status(200).json({
      keys: await redisClient.getKeys(),
      files: await dbClient.Files(),
      users: await dbClient.Users(),
    })
  }
}


