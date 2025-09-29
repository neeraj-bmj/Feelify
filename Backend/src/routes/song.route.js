const express = require('express');
const router = express.Router();




router.get("/songs", (req, res)=>{
    // write your logic
    res.send("hello this is from songs")
    
})

module.exports = router;