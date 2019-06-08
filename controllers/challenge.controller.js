const mongoose = require('mongoose');

const Challenge = mongoose.model('Challenge');

const User = mongoose.model('User');

exports.getChallengeAjax = async (req, res) => {
  const challenge = await Challenge
    .aggregate([
      { $sample: { size: 1 } },
    ]);

  // Updates user model with the newly generated challenge
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: { challenge: { details: challenge[0], status: 'PENDING', time: Date() } } },
    { new: true, runValidators: true, context: 'query' },
  );

  // Sends through the challenge to update the UI with
  res.send(challenge);
};

exports.getChallenge = async (req, res) => {
  if (req.user && req.user.challenge) {
    res.render('index');
  } else {
    const challenge = await Challenge
      .aggregate([
        { $sample: { size: 1 } },
      ]);

    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { challenge: { details: challenge[0], status: 'PENDING', time: Date() } } },
      { new: true, runValidators: true, context: 'query' },
    );

    res.render('index', { user });
  }
};
