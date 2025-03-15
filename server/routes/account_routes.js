// const express = require("express");
// const router = express.Router();
// const {
//   getAccounts,
//   linkAccount,
//   getAccountById,
//   updateAccount,
// } = require("../controllers/account_controllers");

// // Get all accounts for a user
// router.get("/accounts", getAccounts);

// // Link an existing account
// router.post("/accounts", linkAccount);

// // Get a single account by ID
// router.get("/accounts/:id", getAccountById);

// // Update an existing account
// router.put("/accounts/:id", updateAccount);

// module.exports = router;




const express = require("express");
const router = express.Router();
const {
  getAccounts,
  linkAccount,
  getAccountById,
  updateAccount,
} = require("../controllers/account_controllers");
const mockAuthMiddleware = require("../middleware/mockAuthMiddleware");

// Get all accounts for a user
// http://localhost:3000/api/accounts
router.get("/accounts", mockAuthMiddleware, getAccounts);

// Link an existing account
// http://localhost:3000/api/accounts

// {
//   "name": "Savings",
//   "type": "bank account",
//   "balance": 1000,
//   "bankAccount": "12345"
// }


router.post("/accounts", mockAuthMiddleware, linkAccount);

// Get a single account by ID
// http:localhost:3000/api/accounts/<account_id>
router.get("/accounts/:id", mockAuthMiddleware, getAccountById);

// Update an existing account
// http:localhost:3000/api/accounts/<account_id>
router.put("/accounts/:id", mockAuthMiddleware, updateAccount);

module.exports = router;
