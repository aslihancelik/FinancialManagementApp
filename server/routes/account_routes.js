const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Import 
const {
  getAccounts,
  linkAccount,
  getAccountById,
  updateAccount,
  getBalance
} = require("../controllers/account_controllers");
// const mockAuthMiddleware = require("../middleware/mockAuthMiddleware");

// Apply mock authentication middleware to all routes
// router.use(mockAuthMiddleware);

// Get all accounts for a user
// http://localhost:3000/api/accounts
// router.get("/accounts", mockAuthMiddleware, getAccounts);
router.get("/accounts", authMiddleware, getAccounts);

// Link an existing account
// http://localhost:3000/api/accounts

/* {
  "name": "My Bank Account",
  "type": "bank account",
  "balance": 10000,
  "bankAccount": {
    "routingNumber": "110000000",
    "accountNumber": "123456789"
  }
} */

/* {
  "name": "My Card",
  "type": "credit card",
  "balance": 3000,
  "creditCard": {
    "number": "110000000",
    "expDate": "12/20/2024",
    "cvc": 333
  }
} */


// router.post("/accounts", mockAuthMiddleware, linkAccount);
router.post("/accounts", authMiddleware, linkAccount);

// Get a single account by ID
// http://localhost:3000/api/accounts/<account_id>
// router.get("/accounts/:id", mockAuthMiddleware, getAccountById);
router.get("/accounts/:id", authMiddleware, getAccountById);

// Update an existing account
// http://localhost:3000/api/accounts/<account_id>
// router.put("/accounts/:id", mockAuthMiddleware, updateAccount);
router.put("/accounts/:id", authMiddleware, updateAccount);


// // Route to get the balance
// // http://localhost:3000/api/accounts/<account_id>/balance
// router.get("accounts/:id/balance", authMiddleware, getBalance); // Authent

module.exports = router;
