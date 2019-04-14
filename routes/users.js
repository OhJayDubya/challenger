const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

/* GET Requests */
router.get('/', userController.getUsers);

router.post('/register',
  userController.registerValidate,
  userController.registerAccount,
  authController.login);

router.post('/login',
  authController.login);

module.exports = router;
