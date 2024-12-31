import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const attachRequestId = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  req.requestId = uuidv4(); // Add a unique request ID
  next();
};

export default attachRequestId;
