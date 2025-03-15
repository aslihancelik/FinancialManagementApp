//only command to run after getting all this to your branch is: npm i , and make sure you run this while you are in server folder

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

//npm install express mongoose dotenv

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const accountRoutes = require("./routes/account_routes"); // Adjust the path as needed

// Load Environment variables from .env file
dotenv.config();

const app = express();


// Connect to MongoDB

const PORT = process.env.PORT || 3000; // Use default port 3000 if process.env.PORT is not set
const DBNAME = process.env.DBNAME;
const DB_URL = process.env.DB_URL;
console.log(DB_URL);

// mongoose.connect(DB_URL + DBNAME);
// const db = mongoose.connection;
// db.once("open", () => {
//   console.log("connected to the DB", DBNAME);
// });

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


mongoose.connect(DB_URL + DBNAME, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
  })
  .then(() => console.log("Connected to MongoDB: ", DBNAME))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Use account routes
app.use("/api", accountRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



