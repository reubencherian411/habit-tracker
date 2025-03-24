const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Habit Schema
const habitSchema = new mongoose.Schema({
    name: String,
    streak: { type: Number, default: 1 },
    completed: { type: Number, default: 0 },
});
const Habit = mongoose.model("Habit", habitSchema);

// ✅ Add a new habit
router.post("/add", async (req, res) => {
    try {
        const { name } = req.body;
        const newHabit = new Habit({ name });
        await newHabit.save();
        res.status(201).json({ message: "Habit added successfully", habit: newHabit });
    } catch (error) {
        res.status(500).json({ message: "Error adding habit", error });
    }
});

// ✅ Get all habits
router.get("/", async (req, res) => {
    try {
        const habits = await Habit.find();
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ message: "Error fetching habits", error });
    }
});

module.exports = router;
