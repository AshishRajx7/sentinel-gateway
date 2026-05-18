const express = require("express");

const userService = require("../services/userService");

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await userService.getUsers();

    res.json({
      success: true,
      traceId: req.traceId,
      ...users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      traceId: req.traceId,
      error: error.message,
    });
  }
});

router.get("/payments", async (req, res) => {
  res.json({
    success: true,
    service: "payment-service",
    traceId: req.traceId,
  });
});

router.get("/analytics", async (req, res) => {
  res.json({
    success: true,
    service: "analytics-service",
    traceId: req.traceId,
  });
});

module.exports = router;