const { createClient } = require("redis");

const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

const connectToRedis = async () => {
  try {
    await redisClient.connect();
    console.log("connected to Redis...");
  } catch (err) {
    console.log("Error connect to Redis =======>", err);
  }
};

module.exports = {
  redisClient,
  connectToRedis,
};
