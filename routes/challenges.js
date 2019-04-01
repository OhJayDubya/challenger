const express = require('express');

const router = express.Router();
const challengeController = require('../controllers/challenge.controller');

/* GET challenges listing */
router.get('/', challengeController.getChallenges);

module.exports = router;
