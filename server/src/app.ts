import express, { Application, ErrorRequestHandler, Request, Response } from 'express';
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

//*Application error handler
app.use(appErrorHandler);

//* gobal error handler
app.use(globalErrorHandler);

//* Default route to test server setup
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the UMS server!');
});

export default app;
