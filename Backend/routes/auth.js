const express = require("express");
const router = express.Router();
const User = require("../models/user");

// REGISTER User
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
});


// Simplified email-only authentication
router.post("/login", async (req, res) => {
    try {
      const { email } = req.body;
      
      // Validate email
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
  
      // Find or create user
      let user = await User.findOne({ email }) || 
                 await User.create({ email });
      
      res.json({ 
        userId: user._id,
        email: user.email
      });
      
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
module.exports = router;