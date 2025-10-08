import { Route, Routes } from "react-router-dom";
import Feelify from "../pages/Feelify";
// import User_Profile from "../pages/User_Profile";
import PageNotFound from "../pages/PageNotFound";
// import UserProfilePage from "../pages/UserProfileDataPage";

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Feelify/>} />
        {/* <Route path="/user_profile" element={<User_Profile/>} /> */}
        {/* <Route path="/user_profile" element={<UserProfilePage/>} /> */}
        <Route path="*" element={<PageNotFound/>} />

      </Routes>
    </div>
  );
};

export default MainRoutes;

