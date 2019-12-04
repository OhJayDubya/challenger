const mongoose = require('mongoose');

const Challenge = mongoose.model('Challenge');

const User = mongoose.model('User');

/**
 * Function used for updating the current
 * challenge against the user model
 *
 * @param {*} id
 * @param {*} challenge
 * @param {*} status
 */
const updateUser = (id, challenge, status) => User.findOneAndUpdate(
  { _id: id },
  {
    $set: {
      challenge: {
        details: challenge[0],
        status,
      },
    },
  },
  { new: true, runValidators: true, context: 'query' },
);

exports.getChallengeAjax = async (req, res) => {
  const challenge = await Challenge.aggregate([{ $sample: { size: 1 } }]);

  // Updates user model with the newly generated challenge
  await updateUser(req.user.id, challenge, 'PENDING');

  // Sends through the challenge to update the UI with
  res.send(challenge);
};

exports.getChallenge = async (req, res) => {
  if (req.user && req.user.challenge.details) {
    res.render('dashboard');
  } else {
    const challenge = await Challenge.aggregate([{ $sample: { size: 1 } }]);

    // Updates user model with the newly generated challenge
    const user = await updateUser(req.user.id, challenge, 'PENDING');

    // Sends through updated user into the dashboard and renders page
    res.render('dashboard', { user });
  }
};
