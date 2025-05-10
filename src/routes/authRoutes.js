const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const validate  = require('../middlewares/validators/validation');
const {
  nameValidator,
  emailValidator,
  phoneValidator,
  passwordValidator
} = require('../middlewares/validators/userValidators');
const {registerUser, loginUser} = require('../controllers/authController')

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   
  max: 5,                    
  message: {
    success: false,
    errors: [{ msg: 'Too many login attempts, please try again later.' }]
  }
});

router.post(
  '/register',
  [ nameValidator(), emailValidator(), phoneValidator(), passwordValidator() ],
  validate,
  registerUser
);

router.post(
  '/login',
  loginLimiter,
  [ emailValidator(), passwordValidator() ],
  validate,
  loginUser
);

module.exports = router;
