const mongoose = require('mongoose');
const validator = require('validator');
const mongoErrors = require('mongoose-mongodb-errors');
const passportLocal = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  challenge: {
    details: {
      type: mongoose.Schema.ObjectId,
      ref: 'Challenge',
    },
    status: String,
    time: Date,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid E-Mail Address'],
    required: 'Please supply an E-Mail Address',
  },
  history: [{
    challenge: {
      details: {
        type: mongoose.Schema.ObjectId,
        ref: 'Challenge',
      },
      status: String,
      time: Date,
    },
  }],
  resetPasswordExpires: Date,
  resetPasswordToken: String,
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
});

function autoPopulate(next) {
  this.populate('challenge.details');
  next();
}

userSchema.plugin(passportLocal, { usernameField: 'email' });
userSchema.plugin(mongoErrors);
userSchema.pre('find', autoPopulate);
userSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('User', userSchema);
