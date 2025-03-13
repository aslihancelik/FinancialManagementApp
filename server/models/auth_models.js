const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
//    // minlength: 6,
//     maxlength: 24,
//     match: [
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,24}$/,
//       "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
//  //   ],
  },
  isAdmin: { type: Boolean, default: false },
});

// Hash password before saving
//userSchema.pre("save", async function (next) {
 // if (!this.isModified("password")) return next();
 // const salt = await bcrypt.genSalt(10);
 // this.password = await bcrypt.hash(this.password, salt);
 // next();
//});

// Compare entered password with hashed password
//userSchema.methods.comparePassword = async function (enteredPassword) {
  //return await bcrypt.compare(enteredPassword, this.password);
//};

// Create and export the User model
const User = mongoose.model("User", userSchema, "AuthComponents");
module.exports = User;
