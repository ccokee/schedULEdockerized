const winston = require('winston')

var options = {
  file: {
    level: 'info',
    filename: `./logs/app.log`,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 10,
    colorize: true,
  },
  console: {
    level: 'debug',
    json: false,
    colorize: true,
  },
};

var logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ]
});

module.exports = logger