const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// POST /api/admin/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin || !(await admin.verifyPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ token });
});

module.exports = router;
