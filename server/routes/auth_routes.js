const express = require("express");
const router = express.Router();
const { signup, login, logout, updateUser }  = require("../controllers/auth_controllers");

//console.log("Auth routes registered");  // Add this line

router.post("/signup", signup); //http://localhost:3000/auth/signup make sure Auth Bearer token is blank, no "," after password
router.post("/login", login); //localhost:3000/auth/login to get a token
router.post("/logout", logout); //localhost:3000/auth/logout
router.put("/update/:userId", updateUser); //localhost:3000/auth/update/:userId



module.exports = router;
