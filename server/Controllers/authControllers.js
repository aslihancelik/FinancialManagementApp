const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// ✅ Generate JWT Token and store in a cookie
const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

  // ✅ Set JWT as HttpOnly Cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents access from JavaScript (more secure)
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // Expires in 30 days
  });

  return token;
};

// ✅ Register User (Signup)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      const token = generateToken(res, user._id); // ✅ Set JWT cookie

      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token, // ✅ Send token in response (for frontend storage)
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Register User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    // ✅ Compare Passwords
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(res, user._id); // ✅ Set JWT cookie

      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token, // ✅ Send token in response
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Logged-in User Profile (Protected)
exports.getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    res.status(200).json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    console.error("Get User Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Logout User (Clear Cookie)
exports.logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
