var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  onHands: String,
  title: String,
  author: String,
  description: String,
  published_year: Number,
  publisher: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', BookSchema);
