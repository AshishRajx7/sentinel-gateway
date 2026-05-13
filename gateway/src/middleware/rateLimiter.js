const redis = require("../config/redis");

const WINDOW_SIZE = parseInt(process.env.RATE_LIMIT_WINDOW) || 60;
const MAX_REQUESTS =
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 20;

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;

    const redisKey = `rate_limit:${ip}`;

    const currentRequests = await redis.incr(redisKey);

    if (currentRequests === 1) {
      await redis.expire(redisKey, WINDOW_SIZE);
    }

    const ttl = await redis.ttl(redisKey);

    if (currentRequests > MAX_REQUESTS) {
      return res.status(429).json({
        success: false,
        message: "Too many requests",
        traceId: req.traceId,
        retryAfter: ttl,
      });
    }

    res.setHeader(
      "x-rate-limit-remaining",
      MAX_REQUESTS - currentRequests
    );

    next();
  } catch (error) {
    console.error("Rate limiter error:", error.message);

    next();
  }
};

module.exports = rateLimiter;