import redisClient from './utils/redis';

async function initializeRedisClient() {
  return new Promise((resolve, reject) => {
    redisClient.client.on('ready', () => {
      console.log('Redis client is ready');
      resolve();
    });

    redisClient.client.on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err}`);
      reject(err);
    });
  });
}

(async () => {
  try {
    await initializeRedisClient();  // Wait for the Redis client to be ready

    console.log(redisClient.isAlive());  // Should return true if connected
    console.log(await redisClient.get('myKey'));  // Should return null if the key does not exist

    // Set 'myKey' with a value of 12 and expiration time of 5 seconds
    await redisClient.set('myKey', 12, 'EX', 5);
    console.log(await redisClient.get('myKey'));  // Should return '12'

    // Wait for 10 seconds and check the value again
    setTimeout(async () => {
      console.log(await redisClient.get('myKey'));  // Should return null since the key should have expired
    }, 1000 * 10);
  } catch (err) {
    console.error('Failed to initialize Redis client:', err);
  }
})();
