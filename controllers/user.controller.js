const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.forgotForm = (req, res) => {
  res.render('forgot', { title: 'Forgot' });
};

exports.settings = (req, res) => {
  res.render('settings', { title: 'Settings' });
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
    req.flash('error', errors.map(err => err.msg));
    res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
    return;
  }

  next();
};

exports.registerAccount = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  try {
    await User.register(user, req.body.password);
    next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.editAccount = async (req, res) => {
  const edits = {
    name: req.body.name,
    email: req.body.email,
  };

  await User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: edits },
    { new: true, runValidators: true, context: 'query' },
  );

  req.flash('success', 'Account details have been updated');
  res.redirect('back');
};
