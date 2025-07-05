const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
  ratings: [{ field: String, value: Number }],
  comment: String,
  replies: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
