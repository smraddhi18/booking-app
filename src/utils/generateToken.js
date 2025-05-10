const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Generates a JWT token for a given user ID.
 * @param {string} userId - The MongoDB ObjectId of the user.
 * @returns {string} Signed JWT token.
 */
const generateToken = (userId) => {
  if (!config.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign({ id: userId }, config.JWT_SECRET, {
    expiresIn: '30d',
    algorithm: 'HS256',
  });
};

module.exports = generateToken;
