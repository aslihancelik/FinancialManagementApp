
const mongoose = require("mongoose");
//define the transaction schema
const transactionSchema = new mongoose.Schema (
    {
        amount: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: false,        //you can fill this field if you like it, it is optional
        },
    },
    { timestamps: true}         //automatically adds createdAt and updatedAt fields
);

//create the transaction model based on the schema that we just created
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;