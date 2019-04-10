const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.forgotForm = (req, res) => {
  res.render('forgot', { title: 'Forgot' });
};
