const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const authenticateUser = async (req, res, next) => {
  try {
    let token;

    console.log("Authorization Header:", req.headers.authorization);

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log("Extracted Token:", token);
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.id).select("-password");
    console.log("Authenticated User:", user);

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

module.exports = authenticateUser; // ✅ Default export
