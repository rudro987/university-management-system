import { ErrorDetail, GenericErrorResponse } from './errors.types';

const handleDuplicateError = (err: any): GenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match ? match[1] : 'Duplicate Entry';

  const errorSources: ErrorDetail[] = [
    {
      path: '',
      message: `${extractedMessage} already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};

export default handleDuplicateError;
