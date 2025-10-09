import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import MoodContext from "../context/MoodContext";

const Login = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const { loginUser } = useContext(MoodContext);

  // const navigate = useNavigate();

  const submitHandler = async(data) => {
    console.log("Login data==================> ", data);

    await loginUser(data);
    
    reset();
    // navigate("/");
  };
  return (
    <div className="formContainer">
      <div className="card">
        <div className="headingFirstPart">
          <div className="heading">WelCome to Feelify</div>
          <p>
            Feelify is an AI-driven music app that detects your facial
            expressions and suggests songs based on your mood. It recognizes
            emotions like happiness, sadness, or calmness and curates
            personalized playlists instantly, creating a unique and emotional
            music experience that connects technology with human feelings.
          </p>
        </div>
        <div className="formSecondPart">
          <div className="heading">Login User</div>
          <form onSubmit={handleSubmit(submitHandler)} className="loginForm">
            {/* User Email */}
            <div className="userEmail">
              <label className="label"> Email : </label>
              <input
                {...register("email", { required: " Email is required" })}
                type="email"
                placeholder="ex- abc@gmail.com"
                className="inputStyle"
              />
              {errors.email && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* User Password */}
            <div className="userPassword">
              <label className="label"> Password : </label>
              <input
                {...register("password", { required: " Password is required" })}
                type="password"
                placeholder="••••••••••••••••"
                className="inputStyle"
              />
              {errors.password && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Form */}
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
              Log in
            </button>
          </form>
          <div className="thirdPart">
            <div className="headings">New here then </div>
            <NavLink to={"/api/user/auth/register"}>Register</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
