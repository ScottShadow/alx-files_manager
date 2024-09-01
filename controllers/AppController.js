import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

export default class AppController {


  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }
  static getStats(req, res) {
    res.status(200).json({
      nbUsers: dbClient.nbUsers(),
      nbFiles: dbClient.nbFiles(),
    });
  }
}

