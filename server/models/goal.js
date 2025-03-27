const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema( //  Create the Goal Schema
  {
    user: { // Link goal to a specific user
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { //  Define the title field
      type: String,
      required: true,
    },
    targetAmount: { //  Define the targetAmount field
      type: Number,
      required: true,
    },
    savedAmount: { //  Define the savedAmount field
      type: Number,
      default: 0,
    },
    deadline: { // Define the deadline field
      type: Date,
      required: true,
    },
    account: {
      type: String, // Link goal to a specific account
      default: null,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Goal", goalSchema);
