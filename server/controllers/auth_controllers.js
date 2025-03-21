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

  //logout
  const logout = (req, res) => {
    try {
      res.clearCookie("token", {httpOnly: true, secure: true, sameSite: "Strict"});
      res.status(200).json({ message: "User successfully logged out"});
     } catch (error) {
    console.log("Logout error:", error);
    res.status(500).json({ message: "Error logginout", error });
     }
  };

    const updateUser = async (req, res) => {
      console.log("Update function hit"); // Debugging log
    
      try {
        const { userId } = req.params; // Get user ID from URL params
        const { firstName, lastName, email, password } = req.body; // Data from request body
    
        // Find the user by ID
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
    
        // Prepare an update object
        const updates = {};
        if (firstName) updates.firstName = firstName;
        if (lastName) updates.lastName = lastName;
        if (email) updates.email = email;
    
        // If password is being updated, hash the new password
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          updates.password = hashedPassword;
        }
    
        // Update the user in the database
        user = await User.findByIdAndUpdate(userId, updates, { new: true });
    
        res.status(200).json({ message: "User updated successfully", user });
      } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Error updating user", error });
      }
    };
    

 
  
module.exports = { signup, login, logout, updateUser };
