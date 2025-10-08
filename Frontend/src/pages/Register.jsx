import React from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = (data) => {
    console.log("Register data==================> ", data);
    reset();
    toast.success("Now, you are registered.")
    navigate("/");
  };
  return (
    <div className="formContainers">
      <div className="cards">
        <div className="headingFirstPartHere">
          <div className="headingFirst">WelCome to Register Page</div>
          <p>
            Feelify is an AI-powered music app that understands your emotions
            through facial expressions and recommends songs that match your
            mood. Register now to personalize your experience and let Feelify
            create the perfect playlist for every feeling — because your mood
            deserves its own soundtrack.
          </p>
        </div>
        <div className="formSecondPartHere">
          <div className="headingRegister"> Register User </div>
          <form onSubmit={handleSubmit(submitHandler)} className="loginForms">
            
            {/* User First Name */}
            <div className=" userFirstName ">
              <label className="label"> First Name : </label>
              <input
                {...register("firstName", { required: " First Name is required" })}
                type="text"
                placeholder="ex- Neeraj"
                className="formInputStyle"
              />
              {errors.firstName && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* User Last Name */}
            <div className=" userLastName ">
              <label className="label"> Last Name : </label>
              <input
                {...register("lastName", { required: " Last Name is required" })}
                type="text"
                placeholder="ex- Gupta"
                className="formInputStyle"
              />
              {errors.lastName && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* UserName */}
            <div className=" userName ">
              <label className="label"> Username : </label>
              <input
                {...register("userName", { required: " Username Name is required" })}
                type="text"
                placeholder="ex- @coder"
                className="formInputStyle"
              />
              {errors.userName && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* User Email */}
            <div className="userEmail">
              <label className="label"> Email : </label>
              <input
                {...register("email", { required: " Email is required" })}
                type="email"
                placeholder="ex- abc@gmail.com"
                className="formInputStyle"
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
                {...register("passwrod", { required: " Password is required" })}
                type="password"
                placeholder="••••••••••••••••"
                className="formInputStyle"
              />
              {errors.password && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Register Form Submit Form */}
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
                fontSize: "1rem",
              }}
            >
              Sign Up
            </button>
          </form>
          <div className="ThirdPart">
            <div className="headingBottom">Already have account </div>
            <NavLink to={"/api/user/auth/login"}>Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
