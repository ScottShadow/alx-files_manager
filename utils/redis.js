import redis from 'redis';
import util from 'util';
class RedisClient {
  constructor() {
    if (RedisClient.instance) {
      return RedisClient.instance;
    }
    this.client = redis.createClient();
    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
    }).on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err}`);
    });
    RedisClient.instance = this;
  };
  isAlive() {
    if (this.client)
      return this.client.connected;
  }
  async get(key) {
    const getAsync = util.promisify(this.client.get).bind(this.client);
    return await getAsync(key);
  }

  async set(key, value) {
    const setAsync = util.promisify(this.client.set).bind(this.client);
    return await setAsync(key, value, 'EX', 5);
  }

  async del(key) {
    const delAsync = util.promisify(this.client.del).bind(this.client);
    return await delAsync(key);
  }
};
const redisClient = new RedisClient();
export default redisClient;

