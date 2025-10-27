require("dotenv").config();
const app = require("./src/app.js");
const connectToDB = require("./src/db/db.js");
const { connectToRedis } = require("./src/db/redis.js");


async function main() {
  
  await connectToRedis();
  await connectToDB();

  app.listen(process.env.SERVER_PORT, (req, res) => {
    console.log("server is running on port 3000 https://feelify-9vpg.onrender.com");
  });
}

main();


