import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logoSvg from "../assets/react.svg";
import MoodContext from "../context/MoodContext";

const Navbar = () => {
  const { user, fetchUserPofile } = useContext(MoodContext);
  const User = localStorage.getItem("user");

  useEffect(() => {
    const User = localStorage.getItem("user");
  }, [user]);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((v) => !v);

  const handleUserProfile = () => {
    fetchUserPofile();
    navigate("user_profile");
  };

  return (
    <div className="navbar">
      <div className="logo-first-heading poppins-semibold">FeeliFy</div>

      {/* Menu button for small screens - uses remix icons via CDN already included in project */}
      <button
        className={`menu-button poppins-semibold ${open ? "open" : ""}`}
        onClick={toggleMenu}
        aria-expanded={open}
        aria-controls="main-navigation" >
              <i className="ri-menu-line" aria-hidden="true"></i>
              <span className="visually-hidden">Toggle menu</span>
      </button>

      <div className={`part-second ${open ? "open" : ""}`} id="main-navigation">
        <NavLink to="/" className={(e) => e.isActive ? "active_link poppins-semibold" : "poppins-semibold" }>
          Home
        </NavLink>

        {
          // here check condition if user not available show login otherwise Add_Music
          !User ? (
            <NavLink to="/api/user/auth/login" className={(e) => e.isActive ? "active_link  poppins-semibold" : "poppins-semibold" } >
              {" "} Login {" "}
            </NavLink>
          ) : (
            <NavLink to="/add_songs" className={(e) => e.isActive ? "active_link  poppins-semibold" : "poppins-semibold" } >
              Add Music
            </NavLink>
          )
        }

        {
          // here check condition if user not available show get strted Register Route otherwise User Profile
          !User ? (
            <NavLink to="/api/user/auth/register" className={(e) => e.isActive ? "active_link  poppins-semibold" : "poppins-semibold"}>
              {" "} Get Started{" "}
            </NavLink>
          ) : (
            <button onClick={handleUserProfile} className="user_profile">
              <img src={logoSvg} alt="user_profile_logo" />
            </button>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
