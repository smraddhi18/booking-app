const asyncHandler = require('../middlewares/asyncHandler');
const Activity = require('../models/Activity');

// @desc    Get all activities
// @route   GET /api/v1/activities
// @access  Public
const listActivities = asyncHandler(async (_req, res) => {
  const activities = await Activity.find();
  res.status(200).json({
    success: true,
    count: activities.length,
    data: activities,
  });
});

module.exports = {
  listActivities,
};
