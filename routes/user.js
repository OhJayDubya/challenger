const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

/* GET Requests */
router.get('/settings', authController.authCheck, userController.settings);

/* POST Requests */

router.post('/register',
  userController.registerValidate,
  userController.registerAccount,
  authController.login);

router.post('/login',
  authController.login);

router.post('/forgot', authController.forgotPassword);

router.post('/settings', authController.authCheck, userController.editAccount);

module.exports = router;
