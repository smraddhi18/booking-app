const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const AppError = require('../utils/AppError');
const asyncHandler = require('../middlewares/asyncHandler'); 

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (await User.exists({ email })) {
    throw new AppError('User with that email already exists', 400);
  }

  const user = new User({ name, email, phone, password });
  await user.save(); 

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    },
  });
});

// @desc    Authenticate user & get token
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw AppError('Invalid email or password', 401);
  }

  res.status(200).json({
    success: true,
    data: {
      token: generateToken(user._id),
    },
  });
});

module.exports = { registerUser, loginUser };
