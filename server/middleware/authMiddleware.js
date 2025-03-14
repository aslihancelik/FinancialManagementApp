const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

exports.protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Extract Bearer Token from Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied: No token provided" });
    }

    // ✅ Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check if User Exists in Database
    const user = await User.findById(decoded.id).select("-password");
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
