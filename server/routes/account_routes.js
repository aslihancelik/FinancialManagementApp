const express = require("express");
const router = express.Router();
const {
  createLinkToken,
  linkBankAccount,
  linkCreditCard,
  getAccounts,
  getAccountById,
  updateAccount,
} = require("../controllers/account_controllers");
const mockAuthMiddleware = require("../middleware/mockAuthMiddleware");

// Apply mock authentication middleware to all routes
// router.use(mockAuthMiddleware);

// Route to generate a Plaid link token
// http://localhost:3000/api/create_link_token
router.get("/create_link_token", mockAuthMiddleware, createLinkToken);

// Link a bank account
// http://localhost:3000/api/accounts/bank

/* {
  "name": "My Bank Account",
  "type": "bank account",
  "balance": 10000,
  "bankAccount": {
    "routingNumber": "110000000",
    "accountNumber": "123456789"
  }
} */

router.post("/accounts/bank", mockAuthMiddleware, linkBankAccount);

// Link a credit card
// http://localhost:3000/api/accounts/credit-card

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

router.post("/accounts/credit-card", mockAuthMiddleware, linkCreditCard);

// Get all accounts for a user
// http://localhost:3000/api/accounts
router.get("/accounts", mockAuthMiddleware, getAccounts);

// Get a single account by ID
// http://localhost:3000/api/accounts/<account_id>
router.get("/accounts/:id", mockAuthMiddleware, getAccountById);

// Update an existing account
// http://localhost:3000/api/accounts/<account_id>
router.put("/accounts/:id", mockAuthMiddleware, updateAccount);

module.exports = router;
