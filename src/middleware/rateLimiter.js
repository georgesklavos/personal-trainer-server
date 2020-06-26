const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 100,
  message: "You have exceeded the 100 requests in 15 minutes limit!",
});

module.exports = { rateLimiter };
