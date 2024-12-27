import { createLogger, format, Logger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from '../config';

const { combine, timestamp, json, colorize, printf } = format;

//? Custom format for console logging with colors and concise output
const consoleLogFormat = combine(
  colorize(), // Add colors for log levels
  printf(({ level, message, timestamp }) => {
    return `${timestamp} - ${level}: ${message}`; // Format log message
  }),
);

//* Create a Winston logger instance
const logger: Logger = createLogger({
  level: config.node_env === 'production' ? 'warn' : 'info', // Default log level
  format: combine(colorize(), timestamp(), json()),
  transports: [
    //* Transport for logging to the console
    new transports.Console({
      format: consoleLogFormat,
    }),
    //* Transport for logging to a file
    new DailyRotateFile({
      filename: 'logs/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d', // Retain logs for 14 days
    }), // Logs saved in logs file with specific date identifiers
  ],
});

// Utility for logging operations
export const logOperation = (message: string, metadata: Record<string, any>) => {
  logger.info(message, metadata);
};

// Utility for logging errors
export const logError = (message: string, metadata: Record<string, any>) => {
  logger.error(message, metadata);
};

export default logger;
