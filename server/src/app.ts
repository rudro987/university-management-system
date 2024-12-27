import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { StudentRoutes } from './app/modules/student/student.route';
import logger from './app/utils/logger';
import config from './app/config';
import attachRequestId from './app/middlewares/attachRequestId';
import logIncomingRequest from './app/middlewares/logIncomingRequest';

//? Initialize Express application
const app: Application = express();

//? Middleware for parsing JSON request bodies
app.use(express.json());

//? Middleware for enabling CORS (Cross-Origin Resource Sharing)
app.use(cors());


// //? Middleware for logging HTTP requests in development mode
// const morganFormat =
//   config.node_env === 'production'
//     ? ':method :url :status :response-time ms - :res[content-length]'
//     : ':method :url :status :response-time ms';

// app.use(
//   morgan(morganFormat, {
//     stream: {
//       write: (message) => {
//         //* Parse and structure the Morgan log message
//         const logObject = {
//           method: message.split(' ')[0], // HTTP method
//           url: message.split(' ')[1], // Request URL
//           status: message.split(' ')[2], // HTTP status code
//           responseTime: message.split(' ')[3], // Response time in ms
//         };
//         //? Log the structured HTTP request details
//         logger.info(JSON.stringify(logObject));
//       },
//     },
//   }),
// );

//? Application Routes
app.use('/api/v1/students', StudentRoutes);

//? Middleware for logging incoming requests & responses
app.use(attachRequestId);
app.use(logIncomingRequest);

//* Default route to test server setup
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the UMS server!');
});

export default app;
