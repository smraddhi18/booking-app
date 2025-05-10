const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Activity',
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

BookingSchema.index({ user: 1, activity: 1 }, { unique: true });
BookingSchema.index({ activity: 1 });

module.exports = mongoose.model('Booking', BookingSchema);
