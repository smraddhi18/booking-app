const { validationResult } = require('express-validator');
const AppError = require('../../utils/AppError'); 

const validate = (req, _res, next) => {
  console.log('validation me a gya');
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    console.log('validation me nikl gya');
    return next();
  }

  const groupedErrors = {};

  errors.array().forEach(err => {
    if (!groupedErrors[err.path]) {
      groupedErrors[err.path] = [];
    }
    groupedErrors[err.path].push(err.msg);
  });

  return next(new AppError('Validation failed', 400, groupedErrors));
};

module.exports = validate;
