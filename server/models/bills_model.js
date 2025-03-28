const mongoose = require("mongoose");

// Define the Bill Schema
const billSchema = new mongoose.Schema(
  {
    billName: {
      type: String,
      required: true,
      trim: true,
    },
    amountDue: {
      type: Number,
      required: true,
      min: 0,
    },
    frequency: {
      type: String,
      enum: ["Monthly", "Quarterly", "Annually"],
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    nextDueDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Overdue"],
      default: "Pending",
    },
    category: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Create the Bill model
const Bill = mongoose.model("Bill", billSchema, "CreateBill");

module.exports = Bill;
