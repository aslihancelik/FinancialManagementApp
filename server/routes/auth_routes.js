const express = require("express");
const router = express.Router();
const { signup, login, logout, updateUser }  = require("../controllers/auth_controllers");

//console.log("Auth routes registered");  // Add this line

router.post("/signup", signup); //localhost:3000/auth/signup 
router.post("/login", login); //localhost:3000/auth/login
router.post("/logout", logout); //localhost:3000/auth/logout
router.put("/update/:userId", updateUser); //localhost:3000/auth/update/:userId



module.exports = router;
