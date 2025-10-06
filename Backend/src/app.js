const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const songRoute = require("./routes/song.route");
const userRoute = require("./routes/user.route");

const app = express();
// app.use(cors());

// Middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", songRoute);
app.use("/api/user/auth", userRoute);

// cors middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

module.exports = app;
