const Booking = require('../models/Booking');
const Activity = require('../models/Activity');
const AppError = require('../utils/AppError');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc    Book an activity
// @route   POST /api/v1/bookings/activity/:activityId
// @access  Private
const bookActivity = asyncHandler(async (req, res) => {
  const { activityId } = req.params;
  const userId = req.user._id;
  
  const activity = await Activity.findOne({ 
    _id: activityId 
  });
  
  if (!activity) {
    throw new AppError('Activity not found', 404);
  }
  
  if (activity.dateTime <= new Date()) {
    throw new AppError('Activity already passed', 400);
  }
  

  const existingBooking = await Booking.findOne({ user: userId, activity: activityId });
  if (existingBooking) {
    throw new AppError('You have already booked this activity', 400);
  }

  
  const booking = await Booking.create({ user: userId, activity: activityId });

  res.status(201).json({
    success: true,
    message: 'Activity booked successfully',
    booking,
  });
});

module.exports = {
  bookActivity,
};


// @desc    Get bookings for the logged-in user
// @route   GET /api/v1/bookings/my-bookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const bookings = await Booking.find({ user: userId }).populate('activity');

  res.status(200).json({
    success: true,
    bookings,
  });
});

module.exports = {
  bookActivity,
  getMyBookings,
};
