const express = require("express");
const router = express.Router();
const User = require("../models/User");

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

// LOGIN User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
});

module.exports = router;
