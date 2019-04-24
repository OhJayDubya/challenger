const express = require('express');

const router = express.Router();
const challengeController = require('../controllers/challenge.controller');

/* GET challenges listing */
router.get('/', challengeController.getChallenge);

module.exports = router;
