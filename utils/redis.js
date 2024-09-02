import redis from 'redis';
import util from 'util';
/**
 * The RedisClient class is a wrapper around the Redis client for Node.js.
 * It provides a simpler interface for interacting with the Redis database.
 * It also includes a singleton pattern to ensure that only one instance of the
 * Redis client is created.
 *
 * @class
 */
class RedisClient {
  constructor() {
    if (RedisClient.instance) {
      return RedisClient.instance;
    }
    this.client = redis.createClient();
    this.client.on('connect', () => {

    }).on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err}`);
    });
    RedisClient.instance = this;
  };
  /**
   * Checks if the Redis client is connected to the server.
   *
   * @return {boolean} True if the Redis client is connected, false otherwise.
   */
  isAlive() {
    if (this.client)
      return this.client.connected;
  }
  /**
   * Retrieves the value associated with the given key from the Redis database.
   *
   * @param {string} key - The key to retrieve from the Redis database.
   * @return {Promise<string>} A promise that resolves with the value associated with the key.
   */
  async get(key) {
    const getAsync = util.promisify(this.client.get).bind(this.client);
    return await getAsync(key);
  }

  /**
   * Sets a key-value pair in the Redis database with an optional expiration time.
   *
   * @param {string} key - The key to be set in the Redis database.
   * @param {string} value - The value associated with the key.
   * @param {number} [time=5] - The expiration time of the key-value pair in seconds.
   * @return {Promise<string>} A promise that resolves with the result of the set operation.
   */
  async set(key, value, time = 5) {
    const setAsync = util.promisify(this.client.set).bind(this.client);
    return await setAsync(key, value, 'EX', time);
  }

  /**
   * Deletes the key-value pair from the Redis database.
   *
   * @param {string} key - The key to be deleted from the Redis database.
   * @return {Promise<number>} A promise that resolves with the number of deleted keys.
   */
  async del(key) {
    const delAsync = util.promisify(this.client.del).bind(this.client);
    return await delAsync(key);
  }
  /**
   * Retrieves the keys from the Redis database.
   *
   * @return {Promise<string[]>} A promise that resolves with an array of keys in the Redis database.
   */
  async getKeys() {
    const keysAsync = util.promisify(this.client.keys).bind(this.client);
    return await keysAsync('*');
  }
};

const redisClient = new RedisClient();
export default redisClient;

