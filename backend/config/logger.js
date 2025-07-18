import winston from 'winston';
import 'winston-daily-rotate-file';

const dayFormat = 'YY-MM-DD HH-mm-ss';

// define log levels and colors
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'white',
};

winston.addColors(colors);

//* Define log format
const format = winston.format.combine(
  winston.format.timestamp({ format: dayFormat }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) =>
      `${info.timestamp}: ${info.level}: ${info.message}` +
      (info.stack ? `\n${info.stack}` : '')
  )
);

//* create transport
const transports = [
  // Console transports(for dev)
  new winston.transports.Console({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format,
  }),

  // Daily Rotate transport (production)
  new winston.transports.DailyRotateFile({
    level: 'info', //log info or above to file
    filename: 'logs/application-%DATAE%.log',
    datePattern: 'YY-MM-DD',
    zippedArchive: true, //zip old log files
    maxSize: '20m', //max size of log file
    maxFiles: '7d', //retain logs for 14 days
    format: winston.format.combine(
      winston.format.timestamp({ format: dayFormat }),
      winston.format.json() //use JSON format for file logs
    ),
  }),

  // Error log file (separate file)
  new winston.transports.DailyRotateFile({
    level: 'error',
    filename: 'logs/error-%DATAE%.log',
    datePattern: 'YY-MM-DD',
    zippedArchive: true, //zip old log files
    maxSize: '20m', //max size of log file
    maxFiles: '30d', //retain logs for 30 days
    format: winston.format.combine(
      winston.format.timestamp({ format: dayFormat }),
      winston.format.json() //use JSON format for file logs
    ),
  }),
];

// create the logger instance
const logger = winston.createLogger({
  levels,
  transports,
  exitOnError: false, //Do not exit on handled exeptions
});

// morgan stream for HTTP logging
logger.stream = {
  write: (message) => {
    logger.http(message.trim());
  }
}

export { logger };
