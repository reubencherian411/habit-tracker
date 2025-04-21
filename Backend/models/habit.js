const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  progress: {
    type: [Boolean],
    default: [false, false, false, false, false, false, false]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // This is what's causing the error if missing
  },

    isFavorite: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Habit', habitSchema);
