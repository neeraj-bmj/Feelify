const songModel =require("../models/song.model");
const uploadFile = require("../service/imagekitStorage.service");


// This is for song post create and upload to imagekit cloud service provider
async function createSongPost(req, res){
//   console.log("req.file================>", req.file);
  // here upload file
  const FileData = await uploadFile(req.file); 
//   console.log("fileData url================>", FileData.url);

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
}

// This is for fetch all songs
async function fetchAllSongs(req, res){ 
    // write your logic
    const songs = await songModel.find()
    
    res.status(200).json({
        message : "song fetched successfully.",
        songs : songs,
    })
}


// This is for fetch all songs by mood
async function fetchAllSongsByMood(req, res) { 
// write your logic
const { mood } = req.query;
  const songs = await songModel.find({
    mood : mood ,
  })

  res.status(200).json({
    message : "song fetched successfully.",
    songs : songs,
  })
}


module.exports = {
    createSongPost,
    fetchAllSongs,
    fetchAllSongsByMood,
}