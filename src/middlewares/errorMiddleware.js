const AppError = require('../utils/AppError');

const notFound = (req, _res, next) => {
  const err = new Error(`Not Found – ${req.originalUrl}`);
  err.status = 404;
  next(err);
};


const errorHandler = (err, req, res, _next) => {
  const status = err.statusCode || err.status || 500;
  res.status(status);

  console.error({
    method: req.method,
    url: req.originalUrl,
    status,
    message: err.message,
    stack: err.stack,
  }, 'Unhandled error');

  const response = {
    success: false,
    message: err.message,
  };

  if (err.errors) {
    response.errors = err.errors; 
  }

  // In development mode, send stack trace too
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.json(response);
};


module.exports = {notFound, errorHandler}