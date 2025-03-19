const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

exports.protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Check if Authorization header exists
    console.log("Authorization Header:", req.headers.authorization);

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log("Extracted Token:", token); // ✅ Log extracted token
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied: No token provided" });
    }

    // ✅ Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // ✅ Log decoded token

    // ✅ Check if User Exists in Database
    const user = await User.findById(decoded.id).select("-password");
    console.log("Authenticated User:", user); // ✅ Log authenticated user

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, authentication failed" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};
