export type ErrorDetail = {
    path: string | number;
    message: string;
  };

  
export type GenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: ErrorDetail[];
  };