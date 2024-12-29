import mongoose from 'mongoose';
import { ErrorDetail, GenericErrorResponse } from './errors.types';

const handleCastError = (
  err: mongoose.Error.CastError,
): GenericErrorResponse => {
  const errorSources: ErrorDetail[] = [
    {
      path: err.path || 'unknown',
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleCastError;
