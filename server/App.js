//only command to run after getting all this to your branch is: npm i , and make sure you run this while you are in server folder

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
 const dotenv = require("dotenv");
 const bodyParser = require("body-parser");
 const transactionRoutes = require("./routes/transactionsRoutes");


const app = express();
const PORT = process.env.PORT || 4000;

//middleware to parse incoming JSON requests
app.use(bodyParser.json());

//use the transaction routes
app.use("/api", transactionRoutes);

//start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})