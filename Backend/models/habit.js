const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: String,
  progress: {
    type: [Boolean],
    default: [false, false, false, false, false, false, false] // Sunday to Saturday
  }
});

module.exports = mongoose.model('Habit', habitSchema);
