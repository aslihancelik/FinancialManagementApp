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
app.use(express.json()); // Express built-in JSON parser (replaces body-parser.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Enables form data parsing
app.use(
  cors({
    origin: "http://localhost:5174", // Allow frontend requests
    credentials: true,
  })
);

// ✅ API Routes
app.use("/api/auth", authRoutes); // ✅ Authentication Routes
app.use("/api/goals", goalRoutes); // ✅ Goals Routes

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Check if all required environment variables are set
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1); // Exit the app if a required environment variable is missing
  }
});

// ✅ Graceful Shutdown on SIGINT (Ctrl+C)
process.on("SIGINT", () => {
  console.log("🚶‍♂️ Shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("✅ MongoDB connection closed");
    process.exit(0);
  });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
