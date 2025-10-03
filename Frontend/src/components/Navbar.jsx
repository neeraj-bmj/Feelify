import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"
import logoSvg from "../assets/react.svg"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-first-heading poppins-semibold">FeeliFy</div>
      <div className="part-second">
        <NavLink to="/" className={(e) => (e.isActive ? "active_link poppins-semibold" : "poppins-semibold")} >Home</NavLink>
        <NavLink to="/add_music" className={(e) => (e.isActive ? "active_link  poppins-semibold" : "poppins-semibold")} >Add Music</NavLink>
        <NavLink to="user_profile" className="user_profile" >
          <img src={logoSvg} alt="user_profile_logo" />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
