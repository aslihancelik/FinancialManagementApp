const express = require("express");
const { getUserProfile } = require("../controllers/auth_Controllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, getUserProfile); // ✅ Get logged-in user details

module.exports = router;
