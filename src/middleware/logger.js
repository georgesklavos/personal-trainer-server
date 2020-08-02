const winston = require("winston");
const moment = require("moment");

// const logger = winston.createLogger({
//   format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
//   transports: [
//     new winston.transports.Console({
//       level: 'info'
//     }),
//     new winston.transports.File({
//       filename: './logs/error.log',
//       level: 'error'
//     }),
//     new winston.transports.File({
//       filename: './logs/combined.log'
//     })
//   ]
// });

const options = {
  file: {
    level: "info",
    filename: `./logs/combined.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  errorFile: {
    level: "error",
    filename: `./logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
};
// instantiate a new Winston Logger with the settings defined above
const logger = new winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: moment().format("YYYY-MM-DD hh:mm:ss"),
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    new winston.transports.File(options.errorFile),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`

module.exports = logger;
