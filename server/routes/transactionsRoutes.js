const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Transaction = require( "../models/Transaction");

//test just to make sure everything is going smoothly
router.get("/test", (req, res) => {
  //localhost:3000/api/test
  res.send("Hello World!");
});

//route to create a new transaction
router.post("/transactions", async (req, res) => {
  const {amount, category, date, description } = req.body;

  try {
    const newTransaction = new Transaction({
      amount,
      category,
      date, 
      description,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error});
  }
 });
  
 //route to fetch all transactions
 router.get("/transactions", async( req, res) => {
  
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({message: "Error fetching transactions", error});
  }
 });

 //route to update a transaction by id
 router.put("/transactions/:id", async (req, res) => {
  const {id} = req.params;
  const {amount, category, date, description } = req.body;
  

  //log the incoming request body
  console.log("Incoming request body:", req.body);

  //validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({message: "Invalid transaction ID" });
  }

  //validate required fields
  if (!amount ||typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({message: "Amount must be a positive number" });
  }

  if (!category || typeof category !== "string" || category.trim() === "") {
    return res.status(400).json({ message: "Category must be a non-empty string" });
  }

  if (!date || isNaN(Date.parse(date))) {
    return res.status(400).json({ message: "Date must be a valid date" });
  }

  try {
    //update the transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
       { amount, category, date, description },
      { new: true }
    );
//if no transaction was found
    if(!updatedTransaction) {
      return res.status(404).json({message: "Transaction not found"});
    }
//return the updated transaction
    res.status(200).json(updatedTransaction);
  }catch(error) {
    console.error("Error updating transaction:", error); 
    res.status(500).json({message: "Error updating transaction", error});
  }
 });

 //routes to delete by id
 router.delete("/transactions/:id", async (req, res) => {
  const {id} = req.params;

  try{
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if(!deletedTransaction) {
      return res.status(404).json({message: "Transaction not found"});
    }
    res.status(200).json({message: "Transaction deleted"});
  } catch (error) {
    res.status(500).json({message: "Error deleting transaction", error});
  }
 });

module.exports = router;