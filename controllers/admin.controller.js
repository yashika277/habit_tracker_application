const User = require('../models/user.model');
const Habit = require('../models/habit.model');
const HabitTemplate = require('../models/habitTemplate.model');

// Admin: Get all users and their habit stats
const getAllUsersWithHabits = async (req, res) => {
    try {
        const users = await User.find().select('username email role');
        const userHabits = await Promise.all(users.map(async (user) => {
            const habits = await Habit.find({ user: user._id }).select('name streak progress');
            return { user, habits };
        }));

        res.json(userHabits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users or habits', error });
    }
};

// Admin: Create habit template
const createHabitTemplate = async (req, res) => {
    const { name, description, frequency } = req.body;

    try {
        const habitTemplate = await HabitTemplate.create({
            name,
            description,
            frequency,
        });

        res.status(201).json(habitTemplate);
    } catch (error) {
        res.status(500).json({ message: 'Error creating habit template', error });
    }
};

// Admin: Get all habit templates
const getHabitTemplates = async (req, res) => {
    try {
        const templates = await HabitTemplate.find();
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching habit templates', error });
    }
};

module.exports = {
    getAllUsersWithHabits,
    createHabitTemplate,
    getHabitTemplates,
};
