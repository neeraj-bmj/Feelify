const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({ Storage: multer.memoryStorage() });

router.post("/songs", upload.single("audio") ,(req, res) => {
  // write your logic
  console.log(req.body);
  console.log(req.file); 
  res.status(201).json({
    message: "Song uploaded successful",
    song : req.file,
  });
});

router.get("/songs", (req, res) => {
  // write your logic
  res.send("hello this is from songs");
});

module.exports = router;
