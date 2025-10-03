const express = require("express");
const router = express.Router();
const {
  getAllHabitLogs,
  getHabitLogById,
  createHabitLog,
  updateHabitLog,
  deleteHabitLog,
  getHabitStats,
} = require("../controllers/habitLogController");

/**
 * @swagger
 * components:
 *   schemas:
 *     HabitLog:
 *       type: object
 *       required:
 *         - habitId
 *         - userId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the habit log
 *         habitId:
 *           type: string
 *           description: Reference to the habit
 *         userId:
 *           type: string
 *           description: Reference to the user
 *         completedDate:
 *           type: string
 *           format: date-time
 *           description: Date when the habit was completed
 *         completionCount:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           description: Number of times the habit was completed
 *         notes:
 *           type: string
 *           description: Optional notes about the completion
 *         mood:
 *           type: string
 *           enum: [excellent, good, okay, difficult, struggling]
 *           description: User's mood during completion
 *         difficulty:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: Difficulty rating (1-5)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /habit-logs:
 *   get:
 *     summary: Get all habit logs for current user
 *     tags: [Habit Logs]
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         schema:
 *           type: string
 *         description: User ID (temporary for testing)
 *       - in: query
 *         name: habitId
 *         schema:
 *           type: string
 *         description: Filter by specific habit ID
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter logs from this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter logs until this date
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 30
 *         description: Maximum number of logs to return
 *     responses:
 *       200:
 *         description: List of habit logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/HabitLog'
 *       401:
 *         description: User not authenticated
 */
router.get("/", getAllHabitLogs);

/**
 * @swagger
 * /habit-logs/{id}:
 *   get:
 *     summary: Get a habit log by ID
 *     tags: [Habit Logs]
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         schema:
 *           type: string
 *         description: User ID (temporary for testing)
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The habit log ID
 *     responses:
 *       200:
 *         description: Habit log details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/HabitLog'
 *       401:
 *         description: User not authenticated
 *       404:
 *         description: Habit log not found
 */
router.get("/:id", getHabitLogById);

/**
 * @swagger
 * /habit-logs:
 *   post:
 *     summary: Log a habit completion
 *     tags: [Habit Logs]
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         schema:
 *           type: string
 *         description: User ID (temporary for testing)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - habitId
 *             properties:
 *               habitId:
 *                 type: string
 *                 description: ID of the habit being logged
 *               completedDate:
 *                 type: string
 *                 format: date-time
 *                 description: Date of completion (defaults to now)
 *               completionCount:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *                 default: 1
 *                 description: Number of completions
 *               notes:
 *                 type: string
 *                 description: Optional notes
 *               mood:
 *                 type: string
 *                 enum: [excellent, good, okay, difficult, struggling]
 *                 description: User's mood
 *               difficulty:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Difficulty rating
 *     responses:
 *       201:
 *         description: Habit completion logged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/HabitLog'
 *                 message:
 *                   type: string
 *       400:
 *         description: Validation error or habit already logged for date
 *       401:
 *         description: User not authenticated
 *       404:
 *         description: Habit not found
 */
router.post("/", createHabitLog);

/**
 * @swagger
 * /habit-logs/{id}:
 *   put:
 *     summary: Update a habit log
 *     tags: [Habit Logs]
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         schema:
 *           type: string
 *         description: User ID (temporary for testing)
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The habit log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completionCount:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *               notes:
 *                 type: string
 *               mood:
 *                 type: string
 *                 enum: [excellent, good, okay, difficult, struggling]
 *               difficulty:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Habit log updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/HabitLog'
 *                 message:
 *                   type: string
 *       400:
 *         description: Validation error or no valid updates
 *       401:
 *         description: User not authenticated
 *       404:
 *         description: Habit log not found
 */
router.put("/:id", updateHabitLog);

/**
 * @swagger
 * /habit-logs/{id}:
 *   delete:
 *     summary: Delete a habit log
 *     tags: [Habit Logs]
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         schema:
 *           type: string
 *         description: User ID (temporary for testing)
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The habit log ID
 *     responses:
 *       200:
 *         description: Habit log deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: User not authenticated
 *       404:
 *         description: Habit log not found
 */
router.delete("/:id", deleteHabitLog);

/**
 * @swagger
 * /habit-logs/stats/{habitId}:
 *   get:
 *     summary: Get statistics for a specific habit
 *     tags: [Habit Logs]
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         schema:
 *           type: string
 *         description: User ID (temporary for testing)
 *       - in: path
 *         name: habitId
 *         schema:
 *           type: string
 *         required: true
 *         description: The habit ID
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           default: 30
 *         description: Number of days to analyze
 *     responses:
 *       200:
 *         description: Habit statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     habit:
 *                       type: object
 *                     period:
 *                       type: string
 *                     stats:
 *                       type: object
 *                       properties:
 *                         totalCompletions:
 *                           type: integer
 *                         totalDays:
 *                           type: integer
 *                         completionRate:
 *                           type: string
 *                         currentStreak:
 *                           type: integer
 *                         longestStreak:
 *                           type: integer
 *                         averageMood:
 *                           type: number
 *                         averageDifficulty:
 *                           type: number
 *       401:
 *         description: User not authenticated
 *       404:
 *         description: Habit not found
 */
router.get("/stats/:habitId", getHabitStats);

module.exports = router;
