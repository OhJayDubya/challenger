const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Challenger' });
});

router.get('/login', userController.loginForm);

router.get('/register', userController.registerForm);

router.get('/forgot', userController.forgotForm);

module.exports = router;
