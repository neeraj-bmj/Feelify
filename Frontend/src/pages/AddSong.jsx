// import React, { useContext } from "react";
import { useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-toastify";
import "./AddSong.css";
import MoodContext from "../context/MoodContext";
import { useContext } from "react";
// import { useNavigate } from "react-router-dom";

function AddSong() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // const navigate =useNavigate()
  const { addSong } = useContext(MoodContext);

  // Submit handler
  const onSubmit = async (data) => {
    // const onSubmit = async (data) => {
    console.log("title==========", data.title);
    console.log("artist=========", data.artist);
    console.log("mood=========", data.mood);
    console.log("audio=========", data.audio[0]);

    await addSong(data);
    reset(); // clear form

    // try {
    // const res = await axios.post("http://localhost:3000/api/songs",
    //   {
    //     title : data.title,
    //     artist : data.artist,
    //     mood : data.mood,
    //     audio : data.audio,
    //   },{
    //     headers: {
    //     "Content-Type": "multipart/form-data",
    //     },
    //   }).then((response)=>{
    //     console.log("response ======>", response);
    //   })
    // .catch(err=>{
    //   console.log("error =======>", err);
    // });

    // console.log("Response from backend:", res.data);

    //   toast.success("Music uploaded successfully ✅");
    //   reset(); // clear form
    //   navigate("/")
    // } catch (err) {
    //   console.error("Error sending data:", err);
    //   toast.error("Failed to uploaded Music ❌");
    // }
  };

  return (
    <div className="container">
      {/* container box */}
      <div className="addMusicForm">
        {/* first */}
        <div className="first">
          <div className="heading">
            FEEL <br /> <span> THE MUSIC</span> <br /> WITH HEART <br />{" "}
            <span>ON FEELIFY.</span>
          </div>
        </div>

        {/* second */}
        <form className="second" onSubmit={handleSubmit(onSubmit)}>
          {/* Music Title */}
          <div className="musicTitle">
            <label className="label">Music Title:</label>
            <input
              {...register("title", { required: "Music Title is required" })}
              type="text"
              placeholder="Enter Music Title Name"
              className="inputStyle"
            />
            {errors.title && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Artist Name */}
          <div className="artistName">
            <label>Music Artist : </label>
            <input
              {...register("artist", {
                required: "Artist Name is required",
              })}
              type="text"
              placeholder="Enter Music Artist Name"
              className="inputStyle"
            />
            {errors.artist && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {errors.artist.message}
              </p>
            )}
          </div>

          {/* Music mood  */}
          <div className="musicMood">
            <label>Music mood :</label>
            <select
              {...register("mood", { required: "Please Select Music mood." })}
              className="inputStyle"
            >
              <option value="">-- Select Name --</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="neutral">Neutral</option>
              <option value="surprise">Surprise</option>
              <option value="angry">Angry</option>
              <option value="fearful">Fearful</option>
              <option value="disgusted">Disgusted</option>
            </select>

            {errors.mood && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {errors.mood.message}
              </p>
            )}
          </div>

          {/* Select audio file */}
          <div className="musicAudio">
            <label>Upload Audio File:</label>
            <input
              type="file"
              className="inputStyle"
              accept="audio/*"
              {...register("audio", {
                required: "Please upload an audio song file",
              })}
            />

            {errors.audio && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {errors.audio.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 15px",
              backgroundColor: "#6B3F69",
              color: "#fff",
              border: "none",
              borderRadius: "2rem",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSong;


/*

  // MAIN ROUTES
    import AddSong from "../pages/AddSong";
    <Route path="/add_songs" element={<AddSong/>} />


  // IN CONTEXT PROVIDER
   addSong,


  // This is the function for add a song
  const addSong = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("artist", data.artist);
      formData.append("mood", data.mood);
      formData.append("audio", data.audio[0]); // file input gives array

      const response = await axios.post(
        "http://localhost:3000/add_songs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Song uploaded successfully:", response.data);
      setSongs((prev) => [...prev, response.data.song]); // update state
    } catch (err) {
      setError(err);
      setSongs([]);
      console.error("there was an error!", err);
    } finally {
      setLoading(false);
    }
  };



*/
