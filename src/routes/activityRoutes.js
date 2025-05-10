const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// @route   GET /api/v1/activities
// @desc    Fetch all available activities
// @access  Public
router.get('/', activityController.listActivities);

module.exports = router;
