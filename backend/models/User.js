const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  suspended: { type: Boolean, default: false },
  avatarUrl: { type: String },
  bio: { type: String },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);