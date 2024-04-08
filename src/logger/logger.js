// logger.js

const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: '/home/arpit/remitx/ecommerce-backend/app.log' }),
  ],
});

module.exports = logger;
