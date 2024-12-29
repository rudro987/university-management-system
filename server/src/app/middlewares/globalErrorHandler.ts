import { ErrorRequestHandler } from 'express';
import config from '../config';
import { ErrorDetail } from '../errors/errors.types';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import logger from '../utils/logger';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Setting default values
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorSources: ErrorDetail[] = [
    {
      path: 'Error',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: 'Error',
        message: err?.message,
      },
    ];
  }

  // Log the error centrally
  logger.error('Global Error Handler', {
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    statusCode,
    message,
    errorSources,
    stack: config.node_env === 'production' ? undefined : err.stack,
  });

  // return response
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: config.node_env === 'development' ? { name: err?.name, message: err?.message } : null,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
