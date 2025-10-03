const express = require("express");
const router = express.Router();

// Import individual route modules
const taskRoutes = require("./tasks");
const habitRoutes = require("./habits");
const userRoutes = require("./users");
const habitLogRoutes = require("./habitLogs");

// API Routes
router.use("/tasks", taskRoutes);
router.use("/habits", habitRoutes);
router.use("/users", userRoutes);
router.use("/habit-logs", habitLogRoutes);

// Root API route - API information
router.get("/", (req, res) => {
  res.json({
    message: "TrackStar API - Personal Task & Habit Tracker",
    version: "1.0.0",
    endpoints: {
      documentation: "/api-docs",
      users: "/api/users",
      tasks: "/api/tasks",
      habits: "/api/habits",
      habitLogs: "/api/habit-logs",
    },
    status: "operational",
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version,
  });
});

module.exports = router;
