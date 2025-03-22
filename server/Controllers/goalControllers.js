// const mongoose = require("mongoose");
// const Goal = require("../models/goal");

// // ✅ Create a Goal (POST /api/goals)
// exports.createGoal = async (req, res) => {
//   try {
//     const { title, targetAmount, deadline, account } = req.body;

//     if (!title || !targetAmount || !deadline) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Unauthorized: No user ID" });
//     }

//     const goal = new Goal({
//       user: req.user.id,
//       title,
//       targetAmount,
//       deadline,
//       account: account || null, // Optional: Link goal to a specific account
//       savedAmount: 0, // ✅ Initialize savedAmount to 0
//     });

//     const savedGoal = await goal.save();
//     res.status(201).json(savedGoal);
//   } catch (error) {
//     console.error("❌ Create Goal Error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // ✅ Fetch User's Goals (GET /api/goals)
// exports.getGoals = async (req, res) => {
//   try {
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Unauthorized: No user ID" });
//     }

//     const goals = await Goal.find({ user: req.user.id });
//     res.status(200).json(goals);
//   } catch (error) {
//     console.error("❌ Get Goals Error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // ✅ Update Goal Progress (PUT /api/goals/:id)
// exports.updateGoal = async (req, res) => {
//   try {
//     const { savedAmount } = req.body;
//     const { id } = req.params;

//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Unauthorized: No user ID" });
//     }

//     // ✅ Validate ObjectId before querying MongoDB
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid Goal ID format" });
//     }

//     const goal = await Goal.findById(id);
//     if (!goal) {
//       return res.status(404).json({ message: "Goal not found" });
//     }

//     if (goal.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Forbidden: Not authorized" });
//     }

//     // ✅ Ensure savedAmount updates correctly
//     goal.savedAmount = (goal.savedAmount || 0) + savedAmount;
//     const updatedGoal = await goal.save();
//     res.status(200).json(updatedGoal);
//   } catch (error) {
//     console.error("❌ Update Goal Error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // ✅ Calculate Progress Toward Goal (GET /api/goals/:id/progress)
// exports.getGoalProgress = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // ✅ Validate ObjectId before querying MongoDB
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid Goal ID format" });
//     }

//     const goal = await Goal.findById(id);

//     if (!goal) {
//       return res.status(404).json({ message: "Goal not found" });
//     }

//     if (goal.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Forbidden: Not authorized" });
//     }

//     // ✅ Calculate progress percentage
//     const progress = ((goal.savedAmount / goal.targetAmount) * 100).toFixed(2);
//     res.status(200).json({ goalId: goal._id, progress: `${progress}%` });
//   } catch (error) {
//     console.error("❌ Get Goal Progress Error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // ✅ Delete a Goal (DELETE /api/goals/:id)
// exports.deleteGoal = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("🗑️ DELETE Request for Goal ID:", id);
//     console.log("🔑 Authenticated User ID:", req.user?.id);

//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Unauthorized: No user ID" });
//     }

//     // ✅ Validate ObjectId before querying MongoDB
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid Goal ID format" });
//     }

//     const goal = await Goal.findById(id);
//     console.log("📋 Goal Found:", goal);

//     if (!goal) {
//       return res.status(404).json({ message: "Goal not found" });
//     }

//     // ✅ Ensure the goal belongs to the logged-in user
//     if (goal.user.toString() !== req.user.id) {
//       console.log("🚫 Unauthorized User:", req.user.id);
//       return res.status(403).json({ message: "Forbidden: Not authorized" });
//     }

//     await goal.deleteOne();
//     console.log("✅ Goal Deleted Successfully:", id);
//     res.status(200).json({ message: "Goal deleted successfully" });
//   } catch (error) {
//     console.error("❌ Delete Goal Error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

