const mongoose = require('mongoose');
const validator = require('validator');
const mongoErrors = require('mongoose-mongodb-errors');
const passportLocal = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  challenges: [{
    challenge: {
      type: mongoose.Schema.ObjectId,
      ref: 'Challenge',
      status: String,
      time: Date,
    },
  }],
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid E-Mail Address'],
    required: 'Please supply an E-Mail Address',
  },
  resetPasswordExpires: Date,
  resetPasswordToken: String,
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
});

userSchema.plugin(passportLocal, { usernameField: 'email' });
userSchema.plugin(mongoErrors);

module.exports = mongoose.model('User', userSchema);
