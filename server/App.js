//only command to run after getting all this to your branch is: npm i , and make sure you run this while you are in server folder

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
 const dotenv = require("dotenv");
 const bodyParser = require("body-parser");
 const transactionRoutes = require("./routes/transactionsRoutes");


const app = express();
const PORT = process.env.PORT || 3000;

//middleware to parse incoming JSON requests
app.use(bodyParser.json());



// Enable CORS for all origins
// app.use(cors());

// Optionally, restrict allowed origins
app.use(cors({
    origin: "http://localhost:5173", // Allow requests only from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies and authorization headers if needed
}));


//use the transaction routes
app.use("/api", transactionRoutes);

//connect to MongoDB
mongoose.connect("mongodb://localhost:27017/financialApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("connected to MongoDB");
})
.catch((error) => {
    console.log("error connecting to MongoDB", error);
});
//start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})