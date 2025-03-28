const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./user"); // Import the User model

const AccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //String,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      //used to distinguish between credit card and bank account
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    creditCard: {
      number: {
        type: String,
        required: function () {
          return this.type === "credit card";
        },
      },
      last4: {
        type: String, // Store only the last 4 digits
        required: function () {
          return this.type === "credit card";
        },
      },
      expDate: {
        type: String,
        required: function () {
          return this.type === "credit card";
        },
      },
      cvc: {
        type: String,
        required: function () {
          return this.type === "credit card";
        },
      },
    },
    bankAccount: {
      routingNumber: {
        type: String,
        required: function () {
          return this.type === "bank account";
        },
      },
      accountNumber: {
        type: String,
        required: function () {
          return this.type === "bank account";
        },
      },

      last4Routing: {
        type: String, // Store only the last 4 digits of the routing number
        required: function () {
          return this.type === "bank account";
        },
      },
      last4Account: {
        type: String, // Store only the last 4 digits of the account number
        required: function () {
          return this.type === "bank account";
        },
      },
    },
  },
  { timestamps: true }
);

// Encrypt sensitive data before saving to the database
AccountSchema.pre("save", async function (next) {
  if (this.isModified("creditCard.number")) {
    // Extract and store last 4 digits before hashing
    this.creditCard.last4 = this.creditCard.number.slice(-4);
    this.creditCard.number = await bcrypt.hash(this.creditCard.number, 10); // Hash the full number
  }

  if (this.isModified("bankAccount.accountNumber")) {
    this.bankAccount.last4Account = this.bankAccount.accountNumber.slice(-4); // Store last 4 digits
    this.bankAccount.accountNumber = await bcrypt.hash(
      this.bankAccount.accountNumber,
      10
    ); // Hash the full account number
  }

  if (this.isModified("bankAccount.routingNumber")) {
    this.bankAccount.last4Routing = this.bankAccount.routingNumber.slice(-4); // Store last 4 digits
    this.bankAccount.routingNumber = await bcrypt.hash(
      this.bankAccount.routingNumber,
      10
    ); // Hash the full routing number
  }

  next(); // Proceed to save the document
});

module.exports = mongoose.model("Account", AccountSchema);
