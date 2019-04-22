const mongoose = require('mongoose');

const passport = require('passport');

const User = mongoose.model('User');

const crypto = require('crypto');

const mail = require('../util/mail');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login',
  successRedirect: '/',
  successFlash: 'You are now logged in',
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/');
};

exports.authCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'Please login to your account');
  res.redirect('/login');
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    req.flash('success', 'Password reset instructions have been sent to the requested E-Mail')
    return res.redirect('/login');
  }

  // Generates reset token and expiry to an hour after request
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000;

  await user.save();
  const resetURL = `http://${req.headers.host}/users/reset/${user.resetPasswordToken}`;

  await mail.sendMail({
    user,
    filename: 'email-reset',
    subject: 'Password Reset',
    resetURL,
  });

  req.flash('success', 'Password reset instructions have been sent to the requested E-Mail');
  return res.redirect('/login');
};
