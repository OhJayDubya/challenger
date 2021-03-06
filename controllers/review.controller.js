const mongoose = require('mongoose');

const Review = mongoose.model('Review');

exports.getReviews = async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
};
