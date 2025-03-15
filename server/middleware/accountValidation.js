// const { body } = require("express-validator");

// const validateLinkAccount = [
//   body("name").notEmpty().withMessage("Name is required"),
//   body("type")
//     .isIn(["credit card", "bank account"])
//     .withMessage("Invalid account type"),
//   body("balance").isNumeric().withMessage("Balance must be a number"),
//   body("creditCard.number")
//     .if(body("type").equals("credit card"))
//     .notEmpty()
//     .withMessage("Credit card number is required"),
//   body("creditCard.expDate")
//     .if(body("type").equals("credit card"))
//     .notEmpty()
//     .withMessage("Credit card expiration date is required"),
//   body("creditCard.cvc")
//     .if(body("type").equals("credit card"))
//     .notEmpty()
//     .withMessage("Credit card CVC is required"),
//   body("bankAccount.routingNumber")
//     .if(body("type").equals("bank account"))
//     .notEmpty()
//     .withMessage("Bank account routing number is required"),
//   body("bankAccount.accountNumber")
//     .if(body("type").equals("bank account"))
//     .notEmpty()
//     .withMessage("Bank account number is required"),
// ];

// const validateUpdateAccount = [
//   body("name").optional().notEmpty().withMessage("Name is required"),
//   body("type")
//     .optional()
//     .isIn(["credit card", "bank account"])
//     .withMessage("Invalid account type"),
//   body("balance")
//     .optional()
//     .isNumeric()
//     .withMessage("Balance must be a number"),
//   body("creditCard.number")
//     .if(body("type").equals("credit card"))
//     .optional()
//     .notEmpty()
//     .withMessage("Credit card number is required"),
//   body("creditCard.expDate")
//     .if(body("type").equals("credit card"))
//     .optional()
//     .notEmpty()
//     .withMessage("Credit card expiration date is required"),
//   body("creditCard.cvc")
//     .if(body("type").equals("credit card"))
//     .optional()
//     .notEmpty()
//     .withMessage("Credit card CVC is required"),
//   body("bankAccount.routingNumber")
//     .if(body("type").equals("bank account"))
//     .optional()
//     .notEmpty()
//     .withMessage("Bank account routing number is required"),
//   body("bankAccount.accountNumber")
//     .if(body("type").equals("bank account"))
//     .optional()
//     .notEmpty()
//     .withMessage("Bank account number is required"),
// ];

// module.exports = {
//   validateLinkAccount,
//   validateUpdateAccount,
// };
