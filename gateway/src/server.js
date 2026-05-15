require("./tracing");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const rateLimiter = require("./middleware/rateLimiter"); 
const gatewayRoutes = require("./routes/gatewayRoutes");
const metricsMiddleware = require("./middleware/metricsMiddleware");
const { client } = require("./utils/metrics");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimiter); 
app.use(metricsMiddleware);
app.use("/api", gatewayRoutes);

app.use((req, res, next) => {
  req.traceId = uuidv4();

  res.setHeader("x-trace-id", req.traceId);

  next();
});

app.use(
  morgan((tokens, req, res) => {
    return JSON.stringify({
      traceId: req.traceId,
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      responseTime: tokens["response-time"](req, res) + " ms",
    });
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sentinel Gateway is running",
    traceId: req.traceId,
  });
});

const PORT = process.env.PORT || 8000;
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);

  const metrics = await client.register.metrics();

  res.send(metrics);
});
app.listen(PORT, () => {
  console.log(` Sentinel Gateway running on port ${PORT}`);
});