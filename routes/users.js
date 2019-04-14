const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');

/* GET Requests */
router.get('/', userController.getUsers);

router.post('/register',
  userController.registerValidate,
  userController.registerAccount,
  userController.loginForm);

module.exports = router;
