const mongoose = require('mongoose');

const habitTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a habit name'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a habit description'],
  },
  frequency: {
    type: String,
    required: [true, 'Please add a habit frequency'],
    enum: ['daily', 'weekly', 'monthly'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('HabitTemplate', habitTemplateSchema);
