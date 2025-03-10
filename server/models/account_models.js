const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
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

module.export = mongoose.model("Account", AccountSchema);
