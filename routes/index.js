const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Challenger' });
});

router.get('/login', userController.loginForm);

router.get('/logout', authController.logout);

router.get('/register', userController.registerForm);

router.get('/forgot', userController.forgotForm);

router.get('/reset/:token', authController.resetPassword);

module.exports = router;
