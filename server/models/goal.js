const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Goal", GoalSchema);
