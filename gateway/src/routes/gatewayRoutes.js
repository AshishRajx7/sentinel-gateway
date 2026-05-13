const express = require("express");

const router = express.Router();

router.get("/users", async (req, res) => {
  res.json({
    success: true,
    service: "user-service",
    traceId: req.traceId,
    data: [
      {
        id: 1,
        name: "Ashish",
      },
    ],
  });
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