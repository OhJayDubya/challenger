const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  descrpition: {
    type: String,
    required: 'You must supply a description',
  },
  name: {
    type: String,
    required: 'You must supply a name',
  },
});

module.exports = mongoose.model('Challenge', challengeSchema);
