import { createLogger, format, Logger, transports } from "winston";
import config from "../config";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, json, colorize, printf } = format;

//? Custom format for console logging with colors and concise output
const consoleLogFormat = combine(
    colorize(), // Add colors for log levels
    printf(({ level, message, timestamp }) => {
      return `${timestamp} - ${level}: ${message}`; // Format log message
    })
  );

//* Create a Winston logger instance
const logger: Logger = createLogger({
    level: config.node_env === 'production' ? 'warn' : 'info', // Default log level
    format: combine(colorize(), timestamp(), json()),
    transports: [
       //* Transport for logging to the console
        new transports.Console({
            format: consoleLogFormat
        }),
        //* Transport for logging to a file
        new DailyRotateFile({
          filename: 'logs/%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '14d', // Retain logs for 14 days
        }), // Logs saved in logs file with specific date identifiers
    ],
});

export default logger;