import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import logger from './app/utils/logger';
import redisClient from './app/utils/redis';

//? Main function to initialize database connection and start the server
const main = async () => {
  try {
    //* Connect to the MongoDB database using Mongoose
    await mongoose.connect(config.database_url as string);
    logger.info('Connected to MongoDB successfully.');

    //* Start the Express server on the specified port
    const server = app.listen(config.port, () => {
      logger.info(`UMS server listening on port ${config.port}`);
    });

    // Graceful shutdown for Redis and MongoDB
    process.on('SIGINT', async () => {
      logger.info('Shutting down gracefully...');
      await redisClient.disconnect(); // Disconnect Redis client
      logger.info('Redis client disconnected.');
      await mongoose.connection.close(); // Close MongoDB connection
      logger.info('MongoDB connection closed.');
      server.close(() => {
        logger.info('Express server closed.');
        process.exit(0); // Exit process
      });
    });
    
  } catch (error) {
    //! Log any errors that occur during initialization
    logger.error('Error during server startup:', { error });
    process.exit(1); // Exit with failure
  }
};
main();
