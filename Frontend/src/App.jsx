import { useState } from 'react';
import FaceExpressionDetector from './components/FaceExpressionDetector'
import MoodSongs from './components/MoodSongs';


const App = () => {
  const [
    Songs,
    setSongs
  ] = useState([
    // {
    //   title: "Into_you.mp3",
    //   aritst: "Hiten",
    //   url: "https://neerajgupta.netlify.app",
    // },
    // {
    //   title: "Feel_for_you.mp3",
    //   aritst: "Shubh",
    //   url: "https://elite-series.netlify.app",
    // },
    // {
    //   title: "Tum_hi_ho.mp3",
    //   aritst: "Arijit Singh",
    //   url: "https://weathers-neeraj.netlify.app",
    // },
  ]);



  return (
    <div>
      <FaceExpressionDetector setSongs={setSongs}/>
      <MoodSongs Songs={Songs}/>
    </div>
  )
}

export default App