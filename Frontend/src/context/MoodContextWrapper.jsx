import axios from "axios";
import { useEffect, useState } from "react";
import MoodContext from "./MoodContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUserLocal, registerUserLocal } from "../utils/Auth";
import { fetchUserPofile } from "../utils/fetchUserPofile";
import { fetchSong } from "../utils/fetchSong";

const MoodContextWrapper = (props) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfileData, setUserProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [mood, setMood] = useState("default");

  const navigate = useNavigate();


// here fetch song and fetchUserProfile
  useEffect(() => {
    fetchSong({setLoading, setError, setSongs});
    fetchUserPofile({setLoading, setError,setUserProfileData, setUser});
  }, []);

  const FetchData = async (mood) => {
    try {
      await axios
        .get(`https://feelify-9vpg.onrender.com/songs?mood=${mood}`)
        .then((response) => {
          // console.log("Mood Songs Fetched successfully", response.data.songs);
          setSongs(response.data.songs);
        });
    } catch (err) {
      setError(err);
      setSongs([]);
      console.error("there was an error!", err);
    } finally {
      setLoading(false);
    }
  };

  // This is for / router for all mood expression songs on home page.
  useEffect(() => {
    FetchData(mood);
  }, [mood]);

  // This is for register User for /api/user/auth/register route
  const registerUser = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "https://feelify-9vpg.onrender.com/api/user/auth/register",
        {
          fullName: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
          userName: data.userName,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("user registered  successfully:", response.data);
      setUser(response.data.user || null); // update state

      // Store token in localStorage and also cookie
      localStorage.setItem("token", response.data.token);
      cookieStore.set("token", response.data.token);

      registerUserLocal(
        response.data.user.userName,
        response.data.user.email,
        response.data.user.password || ""
      ); // set user in Local Storage
      toast.success("User registered Successful.");
      navigate("/");
    } catch (err) {
      setError(err);
      setUser(null);
      toast.error("Error in user registered.");
      console.error("there was an error!", err);
    } finally {
      setLoading(false);
    }
  };

  // This is for login User for /api/user/auth/login route

  const loginUser = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "https://feelify-9vpg.onrender.com/api/user/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("user logged in  successfully:", response.data);
      setUser(response.data.isUserAvailable || null); // update state

      // Store token in localStorage and also cookie
      localStorage.setItem("token", response.data.token);
      cookieStore.set("token", response.data.token);

      // set user in Local Storage to verify
      loginUserLocal(
        response.data.isUserAvailable.email,
        response.data.isUserAvailable.password || ""
      );

      toast.success("Logged in Successful.");
      navigate("/");
    } catch (err) {
      setError(err);
      setUser(null);
      toast.error("Error in user Login.");
      console.error("there was an error!", err);
    } finally {
      setLoading(false);
    }
  };

  // This is for show user_profile data for https://feelify-9vpg.onrender.com/api/user/auth/user_profile
  // AND
  // This is for auto login effect
  // if user refresh page then automatic login if token available in localStorage


  // Logout handler
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("User Logout");
    setUser(null);
    toast.success("Logout successfully.🎉")
    navigate("/api/user/auth/login");
  };

   // This is the function for add a song protected route
  const addSong = async (data) => {
    try {
      setLoading(true);
      setError(null);   
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("artist", data.artist);
      formData.append("mood", data.mood);
      formData.append("audio", data.audio[0]); // file input gives array

      // token from local Storage
      const token = localStorage.getItem("token");
      // OR
      // const token = cookieStore.getItem("token");
      // console.log("token moodcontext==========>", token);
      const headers = token ? { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } : {};

      const response = await axios.post(
        "https://feelify-9vpg.onrender.com/add_songs",
        formData,
        {
          headers,
        }
      );

      console.log("Song uploaded successfully:", response.data);
      toast.success("Song uploaded successfully!");
      setSongs((prev) => [...prev, response.data.song]); // update state
    } catch (err) {
      setError(err);
      setSongs([]);
      toast.error("Something went wrong!");
      // console.error("there was an error!", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <MoodContext.Provider
      value={{
        addSong,
        songs,
        setSongs,
        loading,
        error,
        setLoading,
        registerUser,
        loginUser,
        logoutUser,
        userProfileData,
        fetchUserPofile,
        user,
        setUser,
        mood,
        setMood,
      }}
    >
      {props.children}
    </MoodContext.Provider>
  );
};

export default MoodContextWrapper;
