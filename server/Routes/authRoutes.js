const express = require("express");
const {
  getUserProfile,
  loginUser,
  registerUser,
} = require("../Controllers/authControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Authentication Routes
router.post("/signup", registerUser); // Register User
router.post("/login", loginUser); // Login User
router.get("/me", protect, getUserProfile); // Get User Profile (Protected)

module.exports = router;
