const express = require("express");
const router = express.Router();
const { signup, login }  = require("../controllers/auth_controllers");

//console.log("Auth routes registered");  // Add this line

router.post("/signup", signup); //localhost:3000/auth/signup 
router.post("/login", login); //localhost:3000/auth/login

module.exports = router;
