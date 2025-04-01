const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const goalRoutes = require("./Routes/goalRoutes");
const authRoutes = require("./routes/authRoutes");
const createBillRoutes = require("./routes/bills_routes"); // <-- Import bills routes
const accountRoutes = require("./routes/account_routes"); // Adjust the path as needed
const transactionRoutes = require("./routes/transactionsRoutes");

// Load Environment variables from .env file
dotenv.config();

// Function to check for required environment variables
const checkEnvVars = (vars) => {
  vars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.error(`❌ Missing required environment variable: ${envVar}`);
      process.exit(1); // Exit the app if a required environment variable is missing
    }
  });
};

// Check required environment variables early in the application lifecycle
checkEnvVars(["DB_URL", "DBNAME", "JWT_SECRET"]);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000; // Default to port 3000 if not set
const DBNAME = process.env.DBNAME; // Database name
const DB_URL = process.env.DB_URL; // Base database URL


// ✅ Middleware
app.use(express.json()); // Express built-in JSON parser (replaces body-parser.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Enables form data parsing
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5174", // Allow frontend requests
    credentials: true,
  })
);

// ✅ API Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/goals", goalRoutes); // Goals routes
app.use("/bills", createBillRoutes);
app.use("/api", accountRoutes);   //Account Routes
app.use("/api", transactionRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});

// Connect to MongoDB
const MONGO_URI = DB_URL + DBNAME; // Combine DB URL and name
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`✅ Connected to MongoDB: ${DBNAME}`))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


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


