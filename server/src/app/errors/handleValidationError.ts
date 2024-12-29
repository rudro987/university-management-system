import mongoose from 'mongoose';
import { ErrorDetail, GenericErrorResponse } from './errors.types';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): GenericErrorResponse => {

  const errorSources: ErrorDetail[] = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path || "unknown",
        message: val?.message || "Validation Failed",
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
