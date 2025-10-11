const express = require("express");
const multer = require("multer");
const songModel = require('../models/song.model');
const { authUserMiddleware } = require("../middleware/auth.middleware");
const songController = require("../controller/song.controller")

const router = express.Router();
const upload = multer({ Storage: multer.memoryStorage() });

//  Here Upload songs only auth user
// POST    /add_songs
router.post("/add_songs", authUserMiddleware ,upload.single("audio"), songController.createSongPost );

// All Songs Here
// GET   /
router.get("/", songController.fetchAllSongs);

// GET   /songs
router.get("/songs", songController.fetchAllSongsByMood);

module.exports = router;
