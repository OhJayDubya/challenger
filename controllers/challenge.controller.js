const mongoose = require('mongoose');

const Challenge = mongoose.model('Challenge');

exports.getChallenges = async (req, res) => {
  const challenges = await Challenge.find();
  res.json(challenges);
};
