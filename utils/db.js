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

  } async nbFiles() {
    return this.databaseInstance.collection('files').countDocuments();

  }
  /**
   * Adds a new user to the database if the email does not already exist.
   *
   * @param {string} email - The email of the user to add.
   * @param {string} password - The password of the user to add.
   * @return {object|null} The newly added user object, or null if the email already exists.
   */
  async addUser(email, password) {
    const user = {
      email,
      password
    }
    const user_count = await this.databaseInstance.collection('users').find({ email: email }).count();
    if (user_count != 0) return null;
    await this.databaseInstance.collection('users').insertOne(user);
    return user;
  }

  /**
   * Retrieves a user from the database based on their email and password.
   *
   * @param {string} email - The email of the user to retrieve.
   * @param {string} password - The password of the user to retrieve.
   * @return {object|null} The user object if found, or null otherwise.
   */
  async getUser(email, password) {
    const user = await this.databaseInstance.collection('users').findOne({ email: email, password: password });
    return user;
  }

  /**
   * Retrieves a user from the database based on their ID.
   *
   * @param {string} id - The ID of the user to retrieve.
   * @return {object|null} The user object if found, or null otherwise.
   */
  async getUserById(id) {
    const user = await this.databaseInstance.collection('users').findOne({ _id: new ObjectId(id) });
    return user;
  }
}
const dbClient = new DBClient();
export default dbClient;
