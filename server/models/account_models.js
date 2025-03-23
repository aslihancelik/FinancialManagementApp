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
      //used to distinguish between creedit card and bank account
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
    },
  },
  { timestamps: true }
);

// Encrypt sensitive data before saving to the database
AccountSchema.pre("save", async function (next) {
  // Encrypt credit card number if it has been modified
  if (this.isModified("creditCard.number")) {
    this.creditCard.number = await bcrypt.hash(this.creditCard.number, 10);
  }

  // Encrypt bank account number if it has been modified
  if (this.isModified("bankAccount.accountNumber")) {
    this.bankAccount.accountNumber = await bcrypt.hash(
      this.bankAccount.accountNumber,
      10
    );
  }

  if (this.isModified("bankAccount.routingNumber")) {
    this.bankAccount.routingNumber = await bcrypt.hash(
      this.bankAccount.routingNumber,
      10
    );
  }
  next(); // Proceed to save the document
});


module.exports = mongoose.model("Account", AccountSchema);
