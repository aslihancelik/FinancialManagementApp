const express = require("express");
const router = express.Router();
const {
  getBills,
  addBill,
  updateBill,
  deleteBill,
} = require("../controllers/bills_controllers");
const authenticateUser = require("../middleware/authMiddleware"); // Import the authentication middleware

console.log("✅ authenticateUser type:", typeof authenticateUser); // 👀 This should be "function"

// Route to get all bills for the authenticated user
router.get("/", authenticateUser, getBills); //http://localhost:3000/bills get ALL bills, empty body and select none, it lists all created bills

// Route to add a new bill for the authenticated user
router.post("/", authenticateUser, addBill); //http://localhost:3000/bills creates a bill needs body

// Route to update an existing bill
router.put("/:id", authenticateUser, updateBill); //update a bill http://localhost:3000/bills/ObjectID from mongoDB needs body model

// Route to delete a bill
router.delete("/:id", authenticateUser, deleteBill); //delete

module.exports = router;
