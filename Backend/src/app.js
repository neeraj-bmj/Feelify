const express = require("express");
const songRoute = require("./routes/song.route");
const cors = require("cors");

const app = express();
app.use(cors());    
app.use(express.json());
app.use("/api", songRoute);

module.exports = app;
