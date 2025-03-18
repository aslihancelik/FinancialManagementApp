// // const express = require("express");
// // const router = express.Router();
// // const {
// //   getAccounts,
// //   linkAccount,
// //   getAccountById,
// //   updateAccount,
// // } = require("../controllers/account_controllers");

// // // Get all accounts for a user
// // router.get("/accounts", getAccounts);

// // // Link an existing account
// // router.post("/accounts", linkAccount);

// // // Get a single account by ID
// // router.get("/accounts/:id", getAccountById);

// // // Update an existing account
// // router.put("/accounts/:id", updateAccount);

// // module.exports = router;




// const express = require("express");
// const router = express.Router();
// const plaidClient = require("../plaidConfig");
// const {
//   getAccounts,
//   linkAccount,
//   getAccountById,
//   updateAccount,
// } = require("../controllers/account_controllers");
// const mockAuthMiddleware = require("../middleware/mockAuthMiddleware");

// // Apply mock authentication middleware to all routes
// // router.use(mockAuthMiddleware);

// // Get all accounts for a user
// // http://localhost:3000/api/accounts
// router.get("/accounts", mockAuthMiddleware, getAccounts);

// // Link an existing account
// // http://localhost:3000/api/accounts

// /* {
//   "name": "My Bank Account",
//   "type": "bank account",
//   "balance": 10000,
//   "bankAccount": {
//     "routingNumber": "110000000",
//     "accountNumber": "123456789"
//   }
// } */

// /* {
//   "name": "My Card",
//   "type": "credit card",
//   "balance": 3000,
//   "creditCard": {
//     "number": "110000000",
//     "expDate": "12/20/2024",
//     "cvc": 333
//   }
// } */


// router.post("/accounts", mockAuthMiddleware, linkAccount);

// // Get a single account by ID
// // http://localhost:3000/api/accounts/<account_id>
// router.get("/accounts/:id", mockAuthMiddleware, getAccountById);

// // Update an existing account
// // http://localhost:3000/api/accounts/<account_id>
// router.put("/accounts/:id", mockAuthMiddleware, updateAccount);

// module.exports = router;
