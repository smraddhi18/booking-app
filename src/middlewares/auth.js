const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const AppError = require('../utils/AppError')

const auth = async (req, _res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]; 
  } else {
    throw AppError('Not authorized, no token',401,);
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    req.user = await User.findById(decoded.id).select('-password');
    console.log(`Decoded user ID: ${decoded.id}`);
    if (!req.user) {
      throw AppError('Not authorized, user not found',401); 
    }

    next(); 
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    throw AppError('Not authorized, token failed',401); 
  }
};

module.exports = auth;
