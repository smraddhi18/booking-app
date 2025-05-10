const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value > Date.now(); 
      },
      message: 'Activity date must be in the future',
    },
  },
}, {
  timestamps: true,
});

ActivitySchema.index({ dateTime: 1 });

module.exports = mongoose.model('Activity', ActivitySchema);
