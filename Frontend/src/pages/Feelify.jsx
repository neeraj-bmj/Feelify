import { useState } from "react";
import FaceExpressionDetector from "../components/FaceExpressionDetector";
import MoodSongs from "../components/MoodSongs";

const Feelify = () => {
  const [Songs, setSongs] = useState([
    {
      title: "Into_You.mp3",
      artist: "Hiten",
      mood: "Default",
      url: "https://ik.imagekit.io/n33rajgupta/Feelify/14d5a7e4-779b-451c-a8a2-678adad54df5_gQsvAj8p1",
    },
  ]);
  return (
    <div>
      <FaceExpressionDetector setSongs={setSongs} />
      <MoodSongs Songs={Songs} />
    </div>
  );
};

export default Feelify;
