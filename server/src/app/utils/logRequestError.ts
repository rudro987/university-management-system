/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import logger from './logger';

const logRequestError = (req: Request, message: string, error: any): void => {
  logger.error(message, {
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    query: req.query,
    params: req.params,
    error: error.message,
    stack: error.stack,
  });
};

export default logRequestError;
