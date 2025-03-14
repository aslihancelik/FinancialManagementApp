const express = require("express");
const {
  createGoal,
  getGoals,
  updateGoal,
} = require("../Controllers/goalControllers"); // Import controller functions
const { protect } = require("../middleware/authMiddleware"); // Ensure authentication middleware is used

const router = express.Router();

router.post("/", protect, createGoal); // ✅ Ensure user is authenticated
router.get("/", protect, getGoals); // ✅ Get all goals
router.put("/:id", protect, updateGoal); // ✅ Update savings progress

module.exports = router;
