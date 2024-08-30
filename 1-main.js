import dbClient from './utils/db';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const waitConnection = async (maxRetries = 10, interval = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    if (dbClient.isAlive()) {
      return;
    }
    await sleep(interval);
  }
  throw new Error("Unable to connect to the database after multiple attempts");
};

(async () => {
  try {
    console.log("Initial DB connection status:", dbClient.isAlive());
    await waitConnection();
    console.log("DB connection established:", dbClient.isAlive());
    console.log("Number of users:", await dbClient.nbUsers());
    console.log("Number of files:", await dbClient.nbFiles());
  } catch (error) {
    console.error("Error during database operations:", error);
  }
})();
