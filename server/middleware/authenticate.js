// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const User = require('../models/auth_models');  // Adjust path to your User model

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the JWT token
    const user = await User.findById(decoded.id);  // Find the user by ID from the token

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;  // Attach the user to the request
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error });  // Handle errors
  }
};

module.exports = authenticateUser;
