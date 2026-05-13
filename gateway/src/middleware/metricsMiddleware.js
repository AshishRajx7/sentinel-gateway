const {
  httpRequestCounter,
} = require("../utils/metrics");

const metricsMiddleware = (req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    });
  });

  next();
};

module.exports = metricsMiddleware;