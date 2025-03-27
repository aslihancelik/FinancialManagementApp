const express = require("express");
const {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
  logoutUser,
} = require("../Controllers/authControllers"); // Import auth controllers
const authenticateUser = require("../middleware/authMiddleware"); // Import the authentication middleware

const router = express.Router();
console.log("🔍 getUserProfile:", typeof getUserProfile); 


// ✅ Authentication Routes
//pubic Routes
router.post("/signup", registerUser); // Register User
router.post("/login", loginUser); // Login User

//proetected Routes
router.get("/me", authenticateUser, getUserProfile); // Get User Profile (Protected)
router.put("/me", authenticateUser, updateUserProfile); // Update User Profile (Protected)
router.post("/logout", authenticateUser, logoutUser); // Logout User (Clear Cookie)
module.exports = router;
