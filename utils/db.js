import mongodb from 'mongodb';
import envLoader from './env_loader';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';

/**
 * A mongo db client api.
 */
class DBClient {
  /**
   * Creating a new constructor.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    this.client = new mongodb.MongoClient(`mongodb://${host}:${port}/${database}`, { 
        useUnifiedTopology: true 
    });
    this.client.connect();
  }

  /**
   * Checking if a client is still connected. 
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Returns the number of users.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Returns the number of files.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * Returns the `users`.
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * Returns the `files`.
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
