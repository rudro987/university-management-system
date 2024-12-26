import { createClient, RedisClientType } from "redis";
import logger from "./logger";

//* Create a Redis client instance
const redisClient: RedisClientType = createClient();

//? Log any Redis connection success
redisClient.on('connect', () => logger.info('Redis client connected successfully.'));

//? Log any Redis connection errors
redisClient.on('error', (err: Error) => logger.error('Redis Client Error: ', {error: err.message}));

//* Connect to the Redis server asynchronously
(async () => {
    try {
        await redisClient.connect();
      } catch (err) {
        logger.error('Failed to connect to Redis:', { error: err });
      }
})();

export default redisClient;