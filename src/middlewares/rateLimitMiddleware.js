const rateLimit = require('express-rate-limit');
const config = require('../config');

const rateLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS, 
  max: config.RATE_LIMIT_MAX_REQUESTS, 
  message: 'Too many requests from this IP, please try again after a few minutes',
  standardHeaders: true, 
  legacyHeaders: false, 
});


module.exports = rateLimiter;