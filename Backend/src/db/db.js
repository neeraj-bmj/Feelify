const mongoose = require("mongoose");

async function connectToDB() {
  try {
    mongoose.connect(process.env.MONGO_URI).then((resolve) => {
      console.log("connected to mongodb...");
    });
  } catch (err) { 
    console.log("error in connected to Database", err);
  }
}

module.exports = connectToDB;
