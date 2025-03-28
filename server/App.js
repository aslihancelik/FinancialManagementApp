  require("dotenv").config();

 const express = require("express");
 const mongoose = require("mongoose");
 const cors = require("cors");
 const dotenv = require("dotenv");
 const cookieParser = require("cookie-parser");
 //const goalRoutes = require("./routes/goalRoutes");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/account_routes"); // Adjust the path as needed


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

 const app = express();
const PORT = process.env.PORT || 3000; // Default to port 3000 if not set
const DBNAME = process.env.DBNAME; // Database name
const DB_URL = process.env.DB_URL; // Base database URL

 app.use(express.json()); // Allows JSON data in requests
 //app.use(cors()); // Enables Cross-Origin Resource Sharing
 app.use(cookieParser());
 app.use(express.urlencoded({ extended: true })); // Enables form data parsing
 app.use(
   cors({
     origin: [ process.env.CORS_ORIGIN || "http://localhost:5173",  "http://localhost:5174"// Allow frontend requests
     ],
      credentials: true,
   })
 );

 // ✅ API Routes
app.use("/api/auth", authRoutes); // ✅ Authentication Routes
// app.use("/api/goals", goalRoutes); // ✅ Goals Routes
app.use("/api", accountRoutes);   //Account Routes

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

// Connect to MongoDB
//const MONGO_URI = DB_URL + DBNAME; // Combine DB URL and name
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`✅ Connected to MongoDB: ${DBNAME}`))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
 // Connect to MongoDB using MONGO_URI from .env
 //mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
 //  useUnifiedTopology: true,
 //})
  // .then(() => console.log("MongoDB Connected"))
   //.catch((err) => console.error("MongoDB Connection Error:", err));
   // ✅ Graceful Shutdown on SIGINT (Ctrl+C)
process.on("SIGINT", () => {
  console.log("🚶‍♂️ Shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("✅ MongoDB connection closed");
    process.exit(0);
  });
});

 
 // Import Routes
 //const authRoutes = require("./routes/auth_routes");
 //const createBillRoutes = require("./routes/bills_routes"); // <-- Import bills routes
 
 //app.use("/auth", authRoutes);
//app.use("/bills", createBillRoutes);
 
 // Error handling middleware
 //app.use((err, req, res, next) => {
  // console.error(err);
  // res.status(500).send("Something went wrong!"); // Generic error message for unexpected errors
 //});
 
 // Start the Server
 //const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 
 //http://localhost:3000/auth/