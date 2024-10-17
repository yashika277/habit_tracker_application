const Habit = require('../models/habit.model');

// Create a new habit
const createHabit = async (req, res) => {
  const { name, description, frequency } = req.body;

  const habit = new Habit({
    name,
    description,
    frequency,
    user: req.user._id, // Get user ID from token
  });

  try {
    const createdHabit = await habit.save();
    res.status(201).json(createdHabit);
  } catch (error) {
    res.status(400).json({ message: 'Error creating habit', error });
  }
};

// Get all habits for a user
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching habits', error });
  }
};

// Update a habit
const updateHabit = async (req, res) => {
  const { id } = req.params;
  const { name, description, frequency } = req.body;

  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      id,
      { name, description, frequency },
      { new: true }
    );

    if (!updatedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json(updatedHabit);
  } catch (error) {
    res.status(400).json({ message: 'Error updating habit', error });
  }
};

// Mark habit as completed for the day/week
const completeHabit = async (req, res) => {
  const { id } = req.params;

  try {
    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    const today = new Date();
    const lastCompleted = habit.lastCompleted || new Date(0);

    // Check if the habit is being completed within the required frequency
    if (habit.frequency === 'daily' && today.getDate() !== lastCompleted.getDate()) {
      habit.streak += 1;
    } else if (habit.frequency === 'weekly' && today.getWeek() !== lastCompleted.getWeek()) {
      habit.streak += 1;
    } else {
      return res.status(400).json({ message: `Habit already completed for this ${habit.frequency}` });
    }

    habit.progress = true;
    habit.lastCompleted = today;

    const updatedHabit = await habit.save();
    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: 'Error completing habit', error });
  }
};

// Reset progress for the next day/week
const resetProgress = async (req, res) => {
  const { id } = req.params;

  try {
    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    habit.progress = false;

    const updatedHabit = await habit.save();
    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: 'Error resetting habit progress', error });
  }
};

// Delete a habit
const deleteHabit = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHabit = await Habit.findByIdAndDelete(id);

    if (!deletedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting habit', error });
  }
};

module.exports = { createHabit, getHabits, updateHabit, completeHabit, resetProgress, deleteHabit };
