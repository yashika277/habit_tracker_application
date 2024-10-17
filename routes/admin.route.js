const express = require('express');
const { getAllUsersWithHabits, createHabitTemplate, getHabitTemplates } = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth.middleware');
const { checkAdmin } = require('../middleware/role.middleware');

const router = express.Router();

/**
 * @swagger
 * /admin/users-habits:
 *   get:
 *     summary: Get all users and their habit completion stats
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users and their habit completion stats
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 */
router.get('/users-habits', protect, checkAdmin, getAllUsersWithHabits);

/**
 * @swagger
 * /admin/habit-templates:
 *   post:
 *     summary: Create a habit template
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Daily Meditation
 *               description:
 *                 type: string
 *                 example: Meditate for 10 minutes every day.
 *     responses:
 *       201:
 *         description: Habit template created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 */
router.post('/habit-templates', protect, checkAdmin, createHabitTemplate);

/**
 * @swagger
 * /admin/habit-templates:
 *   get:
 *     summary: Get all habit templates
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of habit templates
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 */
router.get('/habit-templates', protect, checkAdmin, getHabitTemplates);

module.exports = router;
