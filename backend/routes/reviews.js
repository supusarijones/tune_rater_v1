// File: backend/routes/reviews.js

const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Song = require("../models/Song");
const User = require("../models/User");
const verifyAdminToken = require("../middleware/verifyAdminToken");

// GET /api/reviews/all - Admin: fetch all reviews with song + user populated
router.get("/all", verifyAdminToken, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("song", "title artist");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// PUT /api/reviews/:id - Admin: edit review text
router.put("/:id", verifyAdminToken, async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update review" });
  }
});

// DELETE /api/reviews/:id - Admin: delete review
router.delete("/:id", verifyAdminToken, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete review" });
  }
});

module.exports = router;
