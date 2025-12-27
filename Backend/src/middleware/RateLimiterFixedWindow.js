const { redisClient } = require("../db/redis");
// Using Token Bucket ❌
// Using Fixed Window ✅
// Using Sliding Window ❌

// total time 60 minute 100 request
const windowSize = 360; // 3600 second = 1 hour
const MaxRequest = 100; // 1 hours me 100 request

const rateLimiterFixedWindow = async (req, res, next) => {
  try {
    const ip = req.ip;
    console.log("ip =========>", ip); // localhost ka ip      ::1

    // yaha per ip ki value increase hogi every request per
    const numberOfRequest = await redisClient.incr(ip);

    if (numberOfRequest === 1) {
      await redisClient.expire(ip, windowSize); // yaha per jitna windowSize ka value hoga utne second baad redis me store ip expire ho jyaga
    }

    if (numberOfRequest > MaxRequest) {
      return res.status(429).json({
        success: false,
        message: "Too many requests — please try again later.",
      });
    }

    console.log("Number of Request ==============>", numberOfRequest);
    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    res.status(500).json({ 
        success: false, 
        message: "Server error in rate limiter" 
    });
  }
};

module.exports = {
    rateLimiterFixedWindow
};
