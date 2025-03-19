const express = require("express");
const {
  createGoal,
  getGoals,
  updateGoal,
  getGoalProgress, 
  deleteGoal,
} = require("../Controllers/goalControllers");//  Import goal controllers 
const { protect } = require("../middleware/authMiddleware"); // Import the protect middleware

const router = express.Router(); // ✅ Goal Routes

router.post("/", protect, createGoal); // ✅ Create a goal
router.get("/", protect, getGoals); // ✅ Fetch user's goals
router.put("/:id", protect, updateGoal);// ✅ Update goal progress
router.get("/:id/progress", protect, getGoalProgress);// ✅ Get goal progress
router.delete("/:id", protect, deleteGoal); // ✅ Delete a goal

module.exports = router;
