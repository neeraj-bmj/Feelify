require("dotenv").config();
const app = require("./src/app.js");
const connectToDB = require("./src/db/db.js");


connectToDB()




app.listen(3000, (req, res) => {
  console.log("server is running on port http://localhost:3000");
});
