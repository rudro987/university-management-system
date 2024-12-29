import { ZodError, ZodIssue } from 'zod';
import { ErrorDetail, GenericErrorResponse } from './errors.types';

const handleZodError = (err: ZodError): GenericErrorResponse => {
  const errorSources: ErrorDetail[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1] || "unknown",
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
