const Goal = require("../models/goal"); // ✅ Keep only one import

// Create a new financial goal
exports.createGoal = async (req, res) => {
  try {
    const { title, targetAmount, account } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: No user ID" });
    }

    const goal = new Goal({
      user: req.user.id,
      title,
      targetAmount,
      account: account || null,
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    console.error("Create Goal Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all goals for a user
exports.getGoals = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: No user ID" });
    }

    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
  } catch (error) {
    console.error("Get Goals Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update savings progress
exports.updateGoal = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: No user ID" });
    }

    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    goal.currentAmount = (goal.currentAmount || 0) + amount;
    await goal.save();
    res.status(200).json(goal);
  } catch (error) {
    console.error("Update Goal Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
