import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

//? Main function to initialize database connection and start the server
const main = async () => {
  try {
    //* Connect to the MongoDB database using Mongoose
    await mongoose.connect(config.database_url as string);

    //* Start the Express server on the specified port
    app.listen(config.port, () => {
      console.log(`UMS server listening on port ${config.port}`);
    });
    
  } catch (error) {
    //! Log any errors that occur during initialization
    console.error(error);
  }
};
main();
