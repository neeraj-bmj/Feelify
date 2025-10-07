import axios from "axios";
import { useEffect, useState } from "react";
import MoodContext from "./MoodContext";


const MoodContextWrapper = (props) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [mood, setMood] = useState("default");

  // This is for / router for all songs on home page.
  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      axios.get(`http://localhost:3000/`).then((response) => {
        console.log("All Songs Fetched successfully", response.data);
        setSongs(response.data.songs || []);
      });
    } catch (err) {
      setError(err);
      setSongs([]);
      console.error("there was an error!", err);
    } finally{
      setLoading(false);
    }
  },[]);

  

  const FetchData = async(mood)=>{
     try {
      await axios.get(`http://localhost:3000/songs?mood="${mood}"`).then((response) => {
      console.log("Mood Songs Fetched successfully", response.data.songs);
      setSongs(response.data.songs);
    });
    }  catch (err) {
      setError(err);
      setSongs([]);
      console.error("there was an error!", err);
    } finally{
      setLoading(false);
    }
  }

  // This is for / router for all mood expression songs on home page.
  useEffect(() => {
    FetchData(mood);
    
  }, [mood]);

  return (
    <MoodContext.Provider
      value={{songs, setSongs, loading, error, setLoading, user, setUser, mood, setMood,
      }}
    >
      {props.children}
    </MoodContext.Provider>
  );
};

export default MoodContextWrapper;
