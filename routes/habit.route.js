const express = require('express');
const {
  createHabit,
  getHabits,
  updateHabit,
  completeHabit,
  resetProgress,
  deleteHabit,
} = require('../controllers/habit.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Habits
 *   description: Habit management API
 */

/**
 * @swagger
 * /habits:
 *   post:
 *     summary: Create a new habit
 *     tags: [Habits]
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
 *                 example: Morning Run
 *               description:
 *                 type: string
 *                 example: Run for 30 minutes every morning
 *               frequency:
 *                 type: string
 *                 example: daily
 *     responses:
 *       201:
 *         description: Habit created successfully
 *       400:
 *         description: Bad request, invalid input
 *   get:
 *     summary: Get all habits of the logged-in user
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all habits
 *       401:
 *         description: Unauthorized
 */
router.route('/').post(protect, createHabit).get(protect, getHabits);

/**
 * @swagger
 * /habits/{id}:
 *   put:
 *     summary: Update a habit
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the habit to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Morning Run
 *               description:
 *                 type: string
 *                 example: Updated description for the habit
 *               frequency:
 *                 type: string
 *                 example: daily
 *     responses:
 *       200:
 *         description: Habit updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a habit
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the habit to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Habit deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Habit not found
 */
router.route('/:id').put(protect, updateHabit).delete(protect, deleteHabit);

/**
 * @swagger
 * /habits/{id}/complete:
 *   post:
 *     summary: Mark a habit as complete
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the habit to mark as complete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Habit marked as complete
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.route('/:id/complete').post(protect, completeHabit);

/**
 * @swagger
 * /habits/{id}/reset:
 *   post:
 *     summary: Reset the progress of a habit
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the habit to reset
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Habit progress reset
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.route('/:id/reset').post(protect, resetProgress);

module.exports = router;
