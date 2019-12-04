const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author',
  },
  challenge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Challenge',
    required: 'You must supply a challenge',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  text: {
    type: String,
    required: 'Your review must have text',
  },
});

module.exports = mongoose.model('Review', reviewSchema);
