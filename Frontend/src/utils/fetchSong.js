  import axios from "axios";
  
  // This is for / router for all songs on home page.

 export async function fetchSong({setLoading, setError, setSongs}) {
    try {
      setLoading(true);
      setError(null);
      await axios.get(`https://feelify-9vpg.onrender.com/`).then((response) => {
        // console.log("All Songs Fetched successfully", response.data);
        setSongs(response.data.songs || []);
      });
    } catch (err) {
      setError(err);
      setSongs([]);
      console.error("there was an error!", err);
    } finally {
      setLoading(false);
    }
  }