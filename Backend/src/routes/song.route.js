const express = require("express");
const multer = require("multer");
const uploadFile = require("../service/imagekitStorage.service");
const songModel = require('../models/song.model');

const router = express.Router();
const upload = multer({ Storage: multer.memoryStorage() });

router.post("/songs", upload.single("audio"), async (req, res) => {
  // write your logic
  console.log(req.body);
  console.log(req.file);

  // here upload file
  const FileData = await uploadFile(req.file);
  console.log("fileData url================>", FileData.url);

  // here create song post in database mongoose
  const song = await songModel.create({
    title : req.body.title,
    artist : req.body.artist,
    mood : req.body.mood,
    url : FileData.url,
  });

  res.status(201).json({
    message: "Song uploaded successful",
    song: song,
  });
});

router.get("/songs", (req, res) => {
  // write your logic
  res.send("hello this is from songs");
});

module.exports = router;
