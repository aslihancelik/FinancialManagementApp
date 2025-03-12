//only command to run after getting all this to your branch is: npm i , and make sure you run this while you are in server folder

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

//npm install express mongoose dotenv

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const accountRoutes = require("./routes/accountRoutes"); // Adjust the path as needed

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use account routes
app.use("/api", accountRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
