const {model,Schema} = require('mongoose');

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Models
const User = model('User', userSchema);

module.exports = {User};