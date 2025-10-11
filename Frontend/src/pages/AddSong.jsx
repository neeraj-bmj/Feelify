import { useForm } from "react-hook-form";
import "./AddSong.css";
import MoodContext from "../context/MoodContext";
import { useContext } from "react";

function AddSong() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addSong } = useContext(MoodContext);

  // Submit handler
  const onSubmit = async (data) => {
    console.log("song Data =========>", data);
    console.log("title==========", data.title);
    console.log("artist=========", data.artist);
    console.log("mood=========", data.mood);
    console.log("audio=========", data.audio[0]);

    await addSong(data);
    reset(); // clear form

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

