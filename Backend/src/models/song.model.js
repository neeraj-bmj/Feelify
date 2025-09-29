const express = require("express");
const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  url: String,
});

const songModel = mongoose.model("song", songSchema);

module.exports = songModel;
