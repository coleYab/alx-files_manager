import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Reids Client Implementation.
 */
class RedisClient {
  /**
   * Creating a new redis client
   */
  constructor() {
    this.client = createClient();
    this.isConnected = true;

    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isConnected = false;
    });

    this.client.on('connect', () => {
      this.isConnected = true;
    });
  }

  /**
   * Returns: true if connected else false.
   * @returns {boolean}
   */
  isAlive() {
    return this.isConnected;
  }

  /**
   * getting a value for a key.
   * @param {String} key the key of the item.
   * @returns {String | Object}
   */
  async get(key) {
    const getter = promisify(this.client.GET).bind(this.client);
    return getter(key);
  }

  /**
   * Redis.setex(for the key with specific value).
   * @param {String} key key to store.
   * @param {String | Number | Boolean} value the value.
   * @param {Number} duration how long to store.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  /**
   * Removing the value asyncronously.
   * @param {String} key The key to remove.
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;