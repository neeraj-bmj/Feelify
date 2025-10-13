const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const songRoute = require("./routes/song.route");
const userRoute = require("./routes/user.route");
const path = require('path');

const app = express();
app.use(cors());

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname , "../public")));

// routes
app.use("/", songRoute);
app.use("/api/user/auth", userRoute);

// create wild Card
app.get("*name", (req, res)=>{
  res.sendFile(path.join(__dirname, "../public/index.html"));
})

// cors middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your React frontend URL
    credentials: true, // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
  })
);

module.exports = app;
