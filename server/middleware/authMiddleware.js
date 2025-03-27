// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const authenticateUser = async (req, res, next) => { //  Middleware function
  try {
    let token;

    console.log("Authorization Header:", req.headers.authorization);

    if ( // Check if token is in the Authorization header
      req.headers.authorization && 
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log("Extracted Token:", token);
    }

    if (!token) { // Check if token is in the cookies
      return res
        .status(401)
        .json({ message: "Access denied: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.id).select("-password"); // Find user
    console.log("Authenticated User:", user);

    if (!user) { // Check if user exists
      return res
        .status(401)
        .json({ message: "User not found, authentication failed" });
    }

    req.user = user; // Set the user in the request object
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authenticateUser; //  Default export
