import { Route, Routes } from "react-router-dom";
import Feelify from "../pages/Feelify";
// import AddSong from "../pages/AddSong";
// import User_Profile from "../pages/User_Profile";
import PageNotFound from "../pages/PageNotFound";
// import UserProfilePage from "../pages/UserProfileDataPage";

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Feelify/>} />
        <Route path="/" element={""} />
        {/* <Route path="/user/login" element={""} />
        <Route path="/user/register" element={""} />
        <Route path="/add_songs" element={<AddSong/>} /> */}
        {/* <Route path="/user_profile" element={<User_Profile/>} /> */}
        {/* <Route path="/user_profile" element={<UserProfilePage/>} /> */}
        <Route path="*" element={<PageNotFound/>} />

      </Routes>
    </div>
  );
};

export default MainRoutes;

