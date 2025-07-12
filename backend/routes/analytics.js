// File: backend/routes/analytics.js

const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Song = require("../models/Song");
const verifyAdminToken = require("../middleware/verifyAdminToken");

// GET /api/analytics/top-rated
router.get("/top-rated", verifyAdminToken, async (req, res) => {
  try {
    const songs = await Song.find();
    const ratings = await Review.aggregate([
      {
        $group: {
          _id: "$song",
          averageRating: { $avg: "$overall" },
        },
      },
      { $sort: { averageRating: -1 } },
      { $limit: 10 },
    ]);

    const result = await Promise.all(
      ratings.map(async (entry) => {
        const song = songs.find((s) => s._id.equals(entry._id));
        return {
          title: song?.title || "Unknown",
          averageRating: entry.averageRating.toFixed(2),
        };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top rated songs" });
  }
});

// GET /api/analytics/most-reviewed
router.get("/most-reviewed", verifyAdminToken, async (req, res) => {
  try {
    const reviewCounts = await Review.aggregate([
      {
        $group: {
          _id: "$song",
          reviewCount: { $sum: 1 },
        },
      },
      { $sort: { reviewCount: -1 } },
      { $limit: 10 },
    ]);

    const result = await Promise.all(
      reviewCounts.map(async (entry) => {
        const song = await Song.findById(entry._id);
        return {
          title: song?.title || "Unknown",
          reviewCount: entry.reviewCount,
        };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch most reviewed songs" });
  }
});

module.exports = router;
