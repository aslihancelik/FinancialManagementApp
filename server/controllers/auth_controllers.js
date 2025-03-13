const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/auth_models"); // Import User model
//const hashedPassword = require("../models/auth_models");
// Signup Controller
const signup = async (req, res) => {
  console.log("Signup function hit"); // Add this line to track
  try {
    const { firstName, lastName, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
   // Create new user 
const newUser = new User ({
  firstName,
  lastName,
  email,
  password: hashedPassword,
}); 
await newUser.save();
res.status(201).json({ message: "User signed up successfully", user: newUser });
} catch (error) {
console.error("Signup error:", error);
res.status(500).json({ message: "Error signing up", error });
}
};

// Login Controller
// Login Controller
const login = async (req, res) => {
  console.log("Login function hit"); // Add this line to track
  const { email, password } = req.body;
  try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Compare password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Incorrect password" });
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Error logging in", error });
    }
  };
  
module.exports = { signup, login };
