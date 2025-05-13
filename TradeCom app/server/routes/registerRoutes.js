
const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/registerController");

 const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/registerController');

router.post('/api/register', registerUser);

module.exports = router;     

router.post("/", registerUser);

module.exports = router;



const express = require("express");

const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const userData = req.body;

    // Set free trial (for paid accounts only)
    if (userData.accountType !== "normal") {
      const today = new Date();
      userData.trialExpiresAt = new Date(today.setMonth(today.getMonth() + 2));
    } else {
      userData.status = "active";
    }

    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
   res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;





  