const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadFile = require("../service/imagekitStorage.service");

const upload = multer({ Storage: multer.memoryStorage() });

router.post("/songs", upload.single("audio"), async (req, res) => {
  // write your logic
  console.log(req.body);
  console.log(req.file);
  const FileData = await uploadFile(req.file);
  console.log("fileData url================>", FileData.url);
  res.status(201).json({
    message: "Song uploaded successful",
    song: FileData,
  });
});

router.get("/songs", (req, res) => {
  // write your logic
  res.send("hello this is from songs");
});

module.exports = router;
