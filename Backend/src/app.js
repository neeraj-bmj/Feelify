const express = require("express");
const songRoute = require("./routes/song.route");



const app = express();
app.use(express.json());
app.use("/api", songRoute);







module.exports = app;