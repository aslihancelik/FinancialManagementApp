const Bill = require("../models/bills_models"); // Import Bill model

// Get all bills for the authenticated user
const getBills = async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.user._id });
    console.log("Fetched bills from CreateBill collection:", bills);
    res.status(200).json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ message: "Error fetching bills", error });
  }
};

// Add a new bill
const addBill = async (req, res) => {
  const { billName, amountDue, frequency, dueDate, nextDueDate, category } =
    req.body;

  try {
    const newBill = new Bill({
      billName,
      amountDue,
      frequency,
      dueDate,
      nextDueDate,
      userId: req.user._id,
      category,
    });

    const savedBill = await newBill.save();
    console.log("Saved bill to CreateBill collection:", savedBill);
    res.status(201).json(savedBill);
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ message: "Error creating bill", error });
  }
};

// Edit an existing bill
const updateBill = async (req, res) => {
  const { id } = req.params;
  const {
    billName,
    amountDue,
    frequency,
    dueDate,
    nextDueDate,
    category,
    status,
  } = req.body;

  try {
    const updatedBill = await Bill.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      {
        billName,
        amountDue,
        frequency,
        dueDate,
        nextDueDate,
        category,
        status,
      },
      { new: true }
    );

    if (!updatedBill) {
      return res
        .status(404)
        .json({ message: "Bill not found or unauthorized" });
    }

    console.log("Updated bill in CreateBill collection:", updatedBill);
    res.status(200).json(updatedBill);
  } catch (error) {
    console.error("Error updating bill:", error);
    res.status(500).json({ message: "Error updating bill", error });
  }
};

// Delete a bill
const deleteBill = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBill = await Bill.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!deletedBill) {
      return res
        .status(404)
        .json({ message: "Bill not found or unauthorized" });
    }

    console.log("Deleted bill from CreateBill collection:", deletedBill);
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    console.error("Error deleting bill:", error);
    res.status(500).json({ message: "Error deleting bill", error });
  }
};

module.exports = { getBills, addBill, updateBill, deleteBill };
