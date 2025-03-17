const mongoose = require("mongoose");
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
    plaid: {
      accessToken: String, //Plaid access token
      itemId: String, //Plaid item ID
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", AccountSchema);
