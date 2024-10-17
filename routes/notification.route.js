const express = require('express');
const { notifyUsersOfPendingHabits } = require('../services/notificationService');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /notifications/send-reminders:
 *   post:
 *     summary: Manually trigger notifications for users with pending habits
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reminder notifications sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reminder notifications sent!
 *       500:
 *         description: Internal server error while sending notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error sending notifications
 *                 error:
 *                   type: string
 *                   example: Details of the error
 */
router.post('/send-reminders', protect, async (req, res) => {
  try {
    await notifyUsersOfPendingHabits();
    res.json({ message: 'Reminder notifications sent!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending notifications', error });
  }
});

module.exports = router;
