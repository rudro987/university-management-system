import dotenv from 'dotenv';
import path from 'path';

//? Load environment variables from the .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

//* Validate environment variables
if (!process.env.PORT || !process.env.DATABASE_URL) {
  throw new Error('Missing required environment variables');
}

//? Export configuration object
export default {
  port: process.env.PORT || 3000, // Application port
  database_url: process.env.DATABASE_URL || '', // MongoDB connection URL
};
