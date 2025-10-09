import axios from "axios";
import { useEffect, useState } from "react";
import MoodContext from "./MoodContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerUserLocal } from "../utils/Auth";

const MoodContextWrapper = (props) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [mood, setMood] = useState("default");

  const navigate = useNavigate()

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
    } finally {
      setLoading(false);
    }
  }, []);

  const FetchData = async (mood) => {
    try {
      await axios
        .get(`http://localhost:3000/songs?mood="${mood}"`)
        .then((response) => {
          console.log("Mood Songs Fetched successfully", response.data.songs);
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
        "http://localhost:3000/api/user/auth/register",
        {
          fullName : {
            firstName : data.firstName,
            lastName : data.lastName
          },
          userName : data.userName,
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
      setUser(response.data.user); // update state 
      registerUserLocal(  response.data.user.userName, response.data.user.email, response.data.user.password)  // set user in Local Storage
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
        "http://localhost:3000/api/user/auth/login",
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
      setUser(response.data.user); // update state
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

  return (
    <MoodContext.Provider
      value={{
        songs,
        setSongs,
        loading,
        error,
        setLoading,
        registerUser,
        loginUser,
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
