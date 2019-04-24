const mongoose = require('mongoose');

const Challenge = mongoose.model('Challenge');

exports.getChallenges = async (req, res) => {
  const challenges = await Challenge.find();
  res.json(challenges);
};

exports.getChallenge = async (req, res) => {
  const challenge = await Challenge
    .aggregate([
      { $sample: { size: 1 } },
    ]);
  res.send(challenge);
};
