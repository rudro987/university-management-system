import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { StudentRoutes } from './app/modules/student/student.route';

//? Initialize Express application
const app : Application = express();

//? Middleware for parsing JSON request bodies
app.use(express.json());

//? Middleware for enabling CORS (Cross-Origin Resource Sharing)
app.use(cors());

//? Middleware for logging HTTP requests in development mode
app.use(morgan('dev')); // Use 'dev' for concise logs in development. Logs concise request details.

//? Application Routes

app.use('/api/v1/students', StudentRoutes);

//* Default route to test server setup
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the UMS server!");
});

export default app;
