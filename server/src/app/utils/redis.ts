import { createClient, RedisClientType } from 'redis';
import logger from './logger';

//* Create a Redis client instance
const redisClient: RedisClientType = createClient({
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  password: process.env.REDIS_PASSWORD || undefined,
});

//? Log any Redis connection success
redisClient.on('connect', () =>
  logger.info('Redis client connected successfully.'),
);

//? Log any Redis connection errors
redisClient.on('error', (err: Error) =>
  logger.error('Redis Client Error: ', { error: err }),
);

//* Connect to the Redis server asynchronously
(async (): Promise<void> => {
  try {
    await redisClient.connect();
  } catch (err) {
    logger.error('Failed to connect to Redis:', { error: err });
  }
})();

export default redisClient;
