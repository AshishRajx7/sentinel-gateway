const axios = require("axios");
const axiosRetry = require("axios-retry").default;
const CircuitBreaker = require("opossum");

const redis = require("../config/redis");

const api = axios.create({
  timeout: 3000,
});

axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});

const fetchUsers = async () => {
  const cacheKey = "users_cache";

  const cachedUsers = await redis.get(cacheKey);

  if (cachedUsers) {
    return {
      source: "cache",
      data: JSON.parse(cachedUsers),
    };
  }

  const response = await api.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  await redis.set(
  cacheKey,
  JSON.stringify(response.data),
  {
    EX: 60,
  }
);

  return {
    source: "service",
    data: response.data,
  };
};

const breaker = new CircuitBreaker(fetchUsers, {
  timeout: 5000,
  errorThresholdPercentage: 50,
  resetTimeout: 10000,
});

breaker.fallback(() => {
  return {
    source: "fallback",
    data: [],
    message: "User service temporarily unavailable",
  };
});

module.exports = {
  getUsers: () => breaker.fire(),
};