import 'express';

declare global {
  namespace Express {
    export interface Request {
      requestId?: string; // Add the requestId property
    }
  }
}
