const express = require("express");
const multer = require("multer");
const uploadFile = require("../service/imagekitStorage.service");
const songModel = require('../models/song.model');
const { authUserMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();
const upload = multer({ Storage: multer.memoryStorage() });

//  Here Upload songs only auth user
// POST    /add_songs
router.post("/add_songs", authUserMiddleware ,upload.single("audio"), async (req, res) => {
  console.log("req.file================>", req.file);
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

// All Songs Here
// GET   /
router.get("/", async(req, res) => { 
  // write your logic
  const songs = await songModel.find()

  res.status(200).json({
    message : "song fetched successfully.",
    songs : songs,
  })
});

// GET   /songs
router.get("/songs", async(req, res) => { 
  // write your logic
  const { mood } = req.query;
  const songs = await songModel.find({
    mood : mood ,
  })

  res.status(200).json({
    message : "song fetched successfully.",
    songs : songs,
  })
});

module.exports = router;
