import React, { useContext } from "react";
import User_Profile from "./User_Profile";
import MoodContext from "../context/MoodContext";

function UserProfilePage() {
  const { user, loading, userProfileData } = useContext(MoodContext);

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading user profile...</h3>;
  }

  // There is data show on refresh because
  // There is no available auto login features on refresh or revisit
  if (!user) {
    return <h3 style={{ textAlign: "center" }}>No user data found</h3>;
  }

  return <User_Profile userProfileData={userProfileData} />;
}

export default UserProfilePage;
