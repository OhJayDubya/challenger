const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const challengeController = require('../controllers/challenge.controller');

/* GET home page. */
router.get('/', authController.loggedIn);

router.get('/dashboard', authController.authCheck, challengeController.getChallenge);

router.get('/login', userController.loginForm);

router.get('/logout', authController.logout);

router.get('/register', userController.registerForm);

router.get('/forgot', userController.forgotForm);

router.get('/reset/:token', authController.resetPassword);

router.post('/reset/:token', authController.confirmPassword, authController.changePassword);

module.exports = router;
