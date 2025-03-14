const express = require("express");
const router = express.Router();
const Transaction = require( "../models/Transaction");

//test just to make sure everything is going smoothly
router.get("/test", (req, res) => {
  //localhost:4000/api/test
  res.send("Hello World!");
});

module.exports = router;