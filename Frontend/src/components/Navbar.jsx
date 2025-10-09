import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logoSvg from "../assets/react.svg";
import MoodContext from "../context/MoodContext";

const Navbar = () => {
  const { user } = useContext(MoodContext);
  const User = localStorage.getItem("user");

  useEffect(() => {
    const User = localStorage.getItem("user");
  }, [user]);

  return (
    <div className="navbar">
      <div className="logo-first-heading poppins-semibold">FeeliFy</div>
      <div className="part-second">
        <NavLink to="/" className={(e) =>  e.isActive ? "active_link poppins-semibold" : "poppins-semibold"  } >
          Home
        </NavLink>
        <NavLink to="/add_songs" className={(e) =>   e.isActive ? "active_link  poppins-semibold" : "poppins-semibold" }>
          Add Music
        </NavLink>

        {
          // here check condition if user not available show login otherwise User Profile
          !User ? (
            <NavLink to="/api/user/auth/login" className={(e) =>  e.isActive ? "active_link  poppins-semibold" : "poppins-semibold" }>
              {" "} Login {" "}
            </NavLink>
          ) : (
            <NavLink to="user_profile" className="user_profile">
              <img src={logoSvg} alt="user_profile_logo" />
            </NavLink>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
