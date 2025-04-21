const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Habit = require('../models/habit');
const User = require('../models/user');
const authCheck = require('../middleware/auth');

// Middleware to verify userId
const verifyUser = async (req, res, next) => {
  try {
    const userId = req.query.userId || req.body.userId;
    if (!userId) {
      return res.status(401).json({ error: "User ID required" });
    }

    // Verify user exists (using your existing User model)
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Authentication check failed" });
  }
};

// Apply to all routes
router.use(verifyUser);

// Get all habits for a user
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.query.userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch habits" });
  }
});

// Add new habit
router.post('/add', async (req, res) => {
  try {
    const { name, userId } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Habit name required" });
    }

    const newHabit = new Habit({
      name,
      userId,
      progress: [false, false, false, false, false, false, false],
      isFavorite: false
    });

    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to add habit",
      details: error.message 
    });
  }
});

// Update habit progress
router.patch('/:id/progress', authCheck, async (req, res) => {
  try {
    const { dayIndex, isDone, userId } = req.body;
    
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId },
      { $set: { [`progress.${dayIndex}`]: isDone } },
      { new: true }
    );

    if (!habit) return res.status(404).json({ error: 'Habit not found' });
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// In your DELETE route
router.delete('/:id', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Validate input
    if (!userId) return res.status(400).json({ error: "User ID required" });
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid habit ID" });
    }

    const deletedHabit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId
    });

    if (!deletedHabit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    res.json({ message: "Habit deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Ensure JSON response
  }
});

// Toggle favorite status
router.patch('/:id/favorite', authCheck, async (req, res) => {
  try {
    const { userId } = req.body;
    
    const habit = await Habit.findOne({ _id: req.params.id, userId });
    if (!habit) return res.status(404).json({ error: 'Habit not found' });

    habit.isFavorite = !habit.isFavorite;
    await habit.save();
    
    res.json({ 
      success: true,
      isFavorite: habit.isFavorite 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;