const express = require("express");
const songRoute = require("./routes/song.route");
const userRoute = require("./routes/user.route");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api", songRoute);
app.use("/api/user/auth", userRoute);



module.exports = app;
