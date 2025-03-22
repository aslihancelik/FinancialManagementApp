// Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const goalRoutes = require("./routes/goalroutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config(); // Load environment variables

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Enables form data parsing
app.use(
  cors({
    origin: "http://localhost:5174", // Allow frontend requests
    credentials: true,
  })
);
// ✅ Only use JSON parser for non-DELETE requests
app.use((req, res, next) => {
  if (req.method !== "DELETE") {
    bodyParser.json()(req, res, next);
  } else {
    next();
  }
});

// ✅ API Routes
app.use("/api/auth", authRoutes); // ✅ Authentication Routes
app.use("/api/goals", goalRoutes); // ✅ Goals Routes

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
