import { useState } from "react";
import "./MoodSongs.css"

const MoodSongs = () => {
  const [
    Songs,
    // setSongs
  ] = useState([
    {
      title: "Into_you.mp3",
      aritst: "Hiten",
      url: "https://neerajgupta.netlify.app",
    },
    {
      title: "Feel_for_you.mp3",
      aritst: "Shubh",
      url: "https://elite-series.netlify.app",
    },
    {
      title: "Tum_hi_ho.mp3",
      aritst: "Arijit Singh",
      url: "https://weathers-neeraj.netlify.app",
    },
  ]);

  return (
    <div className="Mood-Songs">
      <h1 className="Heading">Recomended Songs</h1>
      <div className="single-song-group">
        {Songs.map((song, index) => (
          <div className="group" key={index}>
            <div className="titleArtist">
              <div className="title">{song.title}</div>
              <div className="artist">{song.aritst}</div>
            </div>
            <div className="play-pause-icon">
              <i className="ri-play-fill"></i>
              <i className="ri-pause-line"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSongs;
