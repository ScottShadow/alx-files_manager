import { MongoClient } from 'mongodb';
class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

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
  isAlive() {
    return this.client.topology.isConnected();
  }
  async nbUsers() {
    return this.databaseInstance.collection('files').countDocuments();

  }

  async nbFiles() {
    return this.databaseInstance.collection('files').countDocuments();

  }

}
const dbClient = new DBClient();
export default dbClient;
