const express = require('express');
const router = express.Router();
const { bookActivity, getMyBookings } = require('../controllers/bookingController');
const auth = require('../middlewares/auth');
const bookingValidation = require('../middlewares/validators/activityValidators');
const validate = require('../middlewares/validators/validation');


// --- Routes ---

// @route   GET /api/v1/bookings/my-bookings
// @desc    Get bookings for logged-in user
// @access  Private
router.get('/my-bookings', auth, getMyBookings);

// @route   POST /api/v1/bookings/activity/:activityId
// @desc    Book an activity by its ID
// @access  Private
router.post('/activity/:activityId', auth, [bookingValidation()], validate, bookActivity);

module.exports = router;
