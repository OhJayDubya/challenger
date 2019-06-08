const express = require('express');

const router = express.Router();
const challengeController = require('../controllers/challenge.controller');

/* GET challenges listing */
router.get('/', challengeController.getChallengeAjax);

module.exports = router;
