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

exports.registerValidate = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'Please supply a name').notEmpty();
  req.checkBody('email', 'Please supply a valid E-Mail').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Please supply a password').notEmpty();
  req.checkBody('confirmPassword', 'Please confirm your password').notEmpty();
  req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    console.log('THESE ARE THE ERRORS', errors);
    return;
  }

  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  await User.register(user, req.body.password);
  next();
};

exports.forgotForm = (req, res) => {
  res.render('forgot', { title: 'Forgot' });
};
