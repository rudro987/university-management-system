import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import config from "../config";

const logIncomingRequest = (req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl, headers } = req;
    const requestId = req.requestId || 'unknown';

    logger.info('Incoming Request', {
        requestId,
        method,
        url: originalUrl,
        headers: config.node_env === 'production' ? undefined : headers,  // Exclude headers in production
    });

    //? Log the time taken for the request
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info('Request Completed', {
            requestId,
            method,
            url: originalUrl,
            duration: `${duration}ms`,
            status: res.statusCode,
        });
    });

    next();
};

export default logIncomingRequest;