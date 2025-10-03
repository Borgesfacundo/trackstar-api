const express = require("express");
const router = express.Router();
const {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  createUser,
} = require("../controllers/userController");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           description: The user's email address
 *         username:
 *           type: string
 *           description: The user's username
 *         avatar:
 *           type: string
 *           description: URL to user's avatar image
 *         timezone:
 *           type: string
 *           description: The user's timezone
 *         isActive:
 *           type: boolean
 *           description: Whether the user account is active
 *         lastLogin:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         schema:
 *           type: string
 *         description: User ID (temporary for testing)
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: User not authenticated
 *       404:
 *         description: User not found
 */
router.get("/", getCurrentUser);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update current user profile
 *     tags: [Users]
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
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated user name
 *               username:
 *                 type: string
 *                 description: Updated username
 *               timezone:
 *                 type: string
 *                 description: Updated timezone
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *       400:
 *         description: Validation error or no valid updates
 *       401:
 *         description: User not authenticated
 *       404:
 *         description: User not found
 */
router.put("/", updateCurrentUser);

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete/deactivate current user account
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         schema:
 *           type: string
 *         description: User ID (temporary for testing)
 *     responses:
 *       200:
 *         description: User account deactivated successfully
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
 *         description: User not found
 */
router.delete("/", deleteCurrentUser);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create new user (OAuth callback)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - providerId
 *               - provider
 *               - name
 *               - email
 *             properties:
 *               providerId:
 *                 type: string
 *                 description: Provider's user ID
 *               provider:
 *                 type: string
 *                 enum: [github, google]
 *                 description: OAuth provider
 *               name:
 *                 type: string
 *                 description: User's full name
 *               email:
 *                 type: string
 *                 description: User's email address
 *               username:
 *                 type: string
 *                 description: User's username
 *               avatar:
 *                 type: string
 *                 description: URL to user's avatar
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *       200:
 *         description: User already exists - logged in successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post("/register", createUser);

module.exports = router;
