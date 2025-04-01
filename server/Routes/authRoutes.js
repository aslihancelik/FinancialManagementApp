// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile,
} = require("../Controllers/authControllers"); // Ensure functions are imported correctly
const protect = require("../middleware/authMiddleware"); // Protect middleware for authentication

// Route to get the logged-in user's profile (GET request)
router.get("/me", protect, getUserProfile); // Correctly using the getUserProfile function
 
// Route to update the logged-in user's profile (PUT request)
router.put("/me", protect, updateUserProfile); // Correctly using the updateUserProfile function

// Other routes for registration and login
router.post("/signup", registerUser); // POST route to register a user
router.post("/login", loginUser); // POST route to login a user
router.post("/logout", logoutUser); // POST route to logout

module.exports = router;
