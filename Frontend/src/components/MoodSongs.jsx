import { useState } from "react";
import "./MoodSongs.css"

const MoodSongs = ({Songs}) => {
  // console.log("Songs=================",Songs);
  const [IsPlay, setIsPlay] = useState(null);
  const handlePlayPause = (index)=>{
    if(IsPlay == index){
      setIsPlay(null)
    }else{
      setIsPlay(index)
    }
  }
  

  return (
    <div className="Mood-Songs">
      <h1 className="Heading">Recomended Songs</h1>
      <div className="single-song-group">
        {Songs.map((song, index) => (
          <div className="group" key={index}>
            <div className="titleArtist">
              <div className="title">{song.title}</div>
              <div className="artist">{song.artist}</div>
            </div>
            <div className="play-pause-icon">
              { IsPlay === index &&
              <audio src={song.url} controls autoPlay={IsPlay === index} style={{display : "none"}}></audio>
              }
              <button onClick={()=>handlePlayPause(index)}>
                {IsPlay === index ?
                 <i className="ri-pause-line"></i> 
                 :  
                 <i className="ri-play-fill"></i> 
                }
              </button>
              
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSongs;
