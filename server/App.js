// Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const goalRoutes = require("./routes/goalroutes");
const authRoutes = require("./routes/authRoutes");
const createBillRoutes = require("./routes/bills_routes"); // <-- Import bills routes

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.json()); // Parse incoming JSON
app.use(cookieParser()); // Parse cookies
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(
  cors({
    origin: "http://localhost:5174", // Adjust to match your frontend port
    credentials: true,
  })
);

// ✅ API Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/goals", goalRoutes); // Goals routes
app.use("/bills", createBillRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
