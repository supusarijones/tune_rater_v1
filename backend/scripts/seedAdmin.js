// scripts/seedAdmin.js
// Run this via bash "node scripts/seedAdmin.js"
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost:27017/tunerater");

async function createAdmin() {
  const passwordHash = await bcrypt.hash("admin123", 10);
  await Admin.create({ email: "admin@tunerater.com", passwordHash });
  console.log("Admin user created: admin@tunerater.com / admin123");
  mongoose.disconnect();
}

createAdmin();
