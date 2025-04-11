// routes/habits.js
const express = require('express');
const router = express.Router();
const Habit = require('../models/habit');

// Add habit
router.post('/add', async (req, res) => {
  try {
    const { name } = req.body;
    const newHabit = new Habit({ name }); // progress will default to [false, false...]
    await newHabit.save();
    res.json({ message: "Habit added successfully" });
  } catch (error) {
    console.error("Error adding habit:", error);
    res.status(500).json({ error: "Failed to add habit" });
  }
});

// Get all habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    console.error("Error fetching habits:", error);
    res.status(500).json({ error: "Failed to fetch habits" });
  }
});

// Update habit progress
router.post('/:id/update', async (req, res) => {
  try {
    const { dayIndex, isDone } = req.body;
    const habit = await Habit.findById(req.params.id);
    habit.progress[dayIndex] = isDone;
    await habit.save();
    res.json({ message: "Habit updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update progress" });
  }
});

router.delete('/delete/:id', async (req, res) => {
  console.log("DELETE route hit with ID:", req.params.id);
  try {
    const deletedHabit = await Habit.findByIdAndDelete(req.params.id);
    if (!deletedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
