import { MongoClient, ObjectId } from 'mongodb';
/**
 * DBClient class
 *
 * @class DBClient
 * @property {string} host - MongoDB host
 * @property {number} port - MongoDB port
 * @property {string} database - MongoDB database
 * @property {MongoClient} client - MongoClient instance
 * @property {Db} databaseInstance - MongoDB database instance
 */
class DBClient {
  /**
   * Constructor
   *
   * @param {string} [host=localhost] - MongoDB host
   * @param {number} [port=27017] - MongoDB port
   * @param {string} [database=users_manager] - MongoDB database
   */
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'users_manager';

    this.client = new MongoClient(`mongodb://${this.host}:${this.port}`, { useNewUrlParser: true, useUnifiedTopology: true });
    (async () => {
      try {
        await this.client.connect();
        console.log("Connected to MongoDB");
        this.databaseInstance = this.client.db(this.database);
      } catch (error) {
        console.error("Failed to connect to MongoDB", error);
      }
    })();
  }

  /**
   * Check if the database is alive
   *
   * @returns {boolean} - True if connected, False otherwise
   */
  isAlive() {
    return this.client.topology.isConnected();
  }

  /**
   * Get the number of users in the database
   *
   * @returns {Promise<number>} - Number of users
   */
  async nbUsers() {
    return this.databaseInstance.collection('users').countDocuments();

  }
}

const dbClient = new DBClient();
export default dbClient;
