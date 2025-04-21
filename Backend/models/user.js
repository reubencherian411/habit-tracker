const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  // No password field needed
  habits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Habit' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);