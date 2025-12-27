const { redisClient } = require("../db/redis");
// Using Token Bucket ❌
// Using Fixed Window ❌
// Using Sliding Window ✅

// total time 60 minute 100 request
const windowSize = 3600; // 3600 second = 1 hour
const MaxRequest = 100; // 1 hours me 100 request 

const rateLimiterSlidingWindow = async (req, res, next) => {
  try { 
    const key = `IP:${req.ip}`;
    const current_time = Date.now()/1000;  // Date.now() give time in milisecond but divided by 1000 convert in second
    const window_time = current_time - windowSize;
    // 2:20 pm - 1 hour = 1:20 pm



    // await redisClient.zRemRangeByScore(key, 0, window_time); // yaha per z shorted set ke liye hota hai
    // await redisClient.zremrangebyscore(key, 0, window_time); // yaha per z shorted set ke liye hota hai
    await redisClient.ZREMRANGEBYSCORE(key, 0, window_time); // yaha per z shorted set ke liye hota hai
    // const numberOfRequest = await redisClient.zCard(key);  // total number of value
    // const numberOfRequest = await redisClient.zcard(key);  // total number of value
    const numberOfRequest = await redisClient.ZCARD(key);  // total number of value

    if(numberOfRequest >= MaxRequest){
      console.log("Numeber of Request Execeeded");
      return res.status(429).json({
        success: false,
        message: "Too many requests — please try again later.",
      });
    }

    // await redisClient.zAdd(key, [{ 
    // await redisClient.zadd(key, [{
    await redisClient.ZADD(key, [{
        score : current_time,
        value : `${current_time}: ${Math.random()}`
    }]); // Request is added


    // key TTL hai usko increase karna hai
    await redisClient.expire(key, windowSize);

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
  rateLimiterSlidingWindow,
};
