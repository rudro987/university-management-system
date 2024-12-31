/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

const sendResponse = (
  res: Response,
  status: number,
  message: string,
  data: any = null,
): Response => {
  return res.status(status).json({
    success: status >= 200 && status < 300,
    message,
    data,
  });
};

export default sendResponse;
