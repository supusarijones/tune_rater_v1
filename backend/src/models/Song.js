const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genre: String,
  thumbnail: String,
  ratingFields: [{ name: String }],
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);
