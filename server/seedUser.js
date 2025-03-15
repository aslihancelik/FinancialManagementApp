//run node seedUser.js
 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");

dotenv.config(); // This should be at the top


// Connect to MongoDB
const DB_URL = process.env.DB_URL;
const DBNAME = process.env.DBNAME;

// Connect to MongoDB
mongoose.connect(DB_URL + DBNAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Seed a user
const seedUser = async () => {
  try {
    const user = new User({
      // Add user properties as required by your schema
      username: "testuser",
      email: "testuser@example.com",
      password: "hashedpassword123", // Make sure to hash the password in a real scenario
    });

    await user.save();
    console.log("User seeded successfully");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding user:", error);
    mongoose.disconnect();
  }
};

seedUser();
