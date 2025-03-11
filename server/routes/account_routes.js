const express = require("express");
const router = express.Router();
const {
  getAccounts,
  linkAccount,
  getAccountById,
  updateAccount,
} = require("../controllers/accountController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all accounts for a user
router.get("/accounts", authMiddleware, getAccounts);

// Link an existing account
router.post("/accounts", authMiddleware, linkAccount);

// Get a single account by ID
router.get("/accounts/:id", authMiddleware, getAccountById);

// Update an existing account
router.put("/accounts/:id", authMiddleware, updateAccount);

module.exports = router;
