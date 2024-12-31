import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import attachRequestId from './app/middlewares/attachRequestId';
import logIncomingRequest from './app/middlewares/logIncomingRequest';
import appErrorHandler from './app/middlewares/appErrorHandler';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

//? Initialize Express application
const app: Application = express();

//? Middleware for parsing JSON request bodies
app.use(express.json());

//? Middleware for enabling CORS (Cross-Origin Resource Sharing)
app.use(cors());

//? Middleware for logging incoming requests & responses
app.use(attachRequestId);
app.use(logIncomingRequest);

//? Application Routes
app.use('/api/v1/students', StudentRoutes);

//* Default route to test server setup
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the UMS server!');
});

//* Application-specific error handler
//? Handles errors specific to the application's logic (e.g., AppError)
app.use(appErrorHandler);

//* Global error handler
//? Catches unhandled errors or exceptions from preceding middleware or routes
app.use(globalErrorHandler);

export default app;
