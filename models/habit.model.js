const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  frequency: {
    type: String,
    required: true, // e.g., "daily", "weekly"
  },
  progress: {
    type: Boolean,
    default: false, // Track if the habit has been completed for the current period
  },
  streak: {
    type: Number,
    default: 0, // Track the streak of consecutive days/weeks the habit was completed
  },
  lastCompleted: {
    type: Date, // Last date when the habit was completed
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Habit = mongoose.model('Habit', HabitSchema);

module.exports = Habit;
