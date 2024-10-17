const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Habit = require('../models/habit.model');
const User = require('../models/user.model');

// Create transporter for nodemailer (configure it with your email provider)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or any other service provider (e.g., SMTP settings)
  auth: {
    user: process.env.EMAIL_USER,  // Your email
    pass: process.env.EMAIL_PASS,  // Your email password
  },
});

// Function to send email notifications
const sendReminderEmail = async (user, habits) => {
  const habitNames = habits.map((habit) => habit.name).join(', ');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Habit Tracker Reminder: Pending Habits for Today',
    text: `Hi ${user.username},\n\nYou have pending habits to complete today: ${habitNames}.\n\nStay consistent and keep up the good work!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${user.email}`);
  } catch (error) {
    console.error(`Error sending email to ${user.email}:`, error);
  }
};

// Function to check and notify users with pending habits
const notifyUsersOfPendingHabits = async () => {
  try {
    const users = await User.find();  // Find all users

    for (const user of users) {
      // Find user's pending habits (habits not completed today)
      const habits = await Habit.find({
        user: user._id,
        progress: false,
        frequency: 'daily',
      });

      if (habits.length > 0) {
        await sendReminderEmail(user, habits);  // Send email for pending habits
      }
    }
  } catch (error) {
    console.error('Error fetching users or habits:', error);
  }
};

// Schedule the job to run every day at 8:00 AM
const scheduleDailyReminders = () => {
  cron.schedule('0 8 * * *', () => {
    console.log('Running daily habit reminder job...');
    notifyUsersOfPendingHabits();
  });
};

module.exports = { scheduleDailyReminders };