const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
require('dotenv').config(); 
const app = express();

// Middleware
app.use(express.json()); // Allows JSON data in requests
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Connect to MongoDB using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Import Routes
const authRoutes = require("./routes/auth_routes");
const createBillRoutes = require("./routes/bills_routes"); // <-- Import bills routes

app.use("/auth", authRoutes);
app.use("/bills", createBillRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!"); // Generic error message for unexpected errors
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//http://localhost:3000/auth/
