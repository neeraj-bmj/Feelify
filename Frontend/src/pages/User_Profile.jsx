// import React, { useContext } from "react";
import "./User_Profile.css";

const User_Profile = ({userProfileData}) => {
  // Default / Dummy placeholder user when none provided
  const fallbackUser = {
    fullName : {
    firstName: "Hp ",
    lastName: "probook",
    },
    userName: "hello",
    email: "abc@gmail.com",
    profilePhoto: "",
  };

  // console.log("userProfileData ============>",userProfileData);

  const u = { ...fallbackUser, ...(userProfileData || {}) };

  const initials = `${(u.fullName.firstName || "").charAt(0) || ""}${
    (u.fullName.lastName || "").charAt(0) || ""
  }`.toUpperCase();

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="avatar-area">
          {u.profilePhoto ? (
            <img
              src={u.profilePhoto}
              alt={`${u.fullName.firstName} ${u.fullName.lastName}`}
              className="avatar-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "";
              }}
            />
          ) : (
            <div className="avatar-fallback">{initials}</div>
          )}
        </div>

        <div className="profile-info">
          <h2 className="name">
            {" "}
            {u.fullName.firstName} {u.fullName.lastName}{" "}
          </h2>
          <p className="username">@{u.userName}</p>

          <div className="fields">
            <label>E - mail : </label>
            <div className="value">{u.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_Profile;
