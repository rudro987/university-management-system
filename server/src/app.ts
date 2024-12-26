import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

//? Initialize Express application
const app : Application = express();

//? Middleware for parsing JSON request bodies
app.use(express.json());

//? Middleware for enabling CORS (Cross-Origin Resource Sharing)
app.use(cors());

//? Middleware for logging HTTP requests in development mode
app.use(morgan('dev')); // Use 'dev' for concise logs in development. Logs concise request details.

//* Default route to test server setup
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the UMS server!");
});

export default app;
