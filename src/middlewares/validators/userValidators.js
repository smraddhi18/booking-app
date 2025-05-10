const { check } = require('express-validator');

const nameValidator = () => 
  check('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2–50 chars')
    .matches(/^[\p{L} .'-]+$/u).withMessage('Invalid characters');

const emailValidator = () =>
  check('email')
    .normalizeEmail()
    .isEmail().withMessage('Must be a valid email');

const phoneValidator = () =>
  check('phone')
    .notEmpty().withMessage('Phone is required')
    .isMobilePhone(['en-IN']).withMessage('Invalid Indian phone');

const passwordValidator = () =>
  check('password')
    .isLength({ min: 8 }).withMessage('Min 8 chars')
    .matches(/[A-Z]/).withMessage('One uppercase required')
    .matches(/\d/).withMessage('One number required')
    .matches(/[@$!%*?&]/).withMessage('One special char required');

module.exports = {
  nameValidator,
  emailValidator,
  phoneValidator,
  passwordValidator
};
