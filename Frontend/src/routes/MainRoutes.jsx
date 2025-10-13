import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Loader from "../components/Loader";
const Feelify = lazy(()=>import("../pages/Feelify"));
const AddSong = lazy(()=>import("../pages/AddSong"));
const PageNotFound = lazy(()=>import("../pages/PageNotFound"));
const Login = lazy(()=>import("../pages/Login"));
const Register = lazy(()=>import("../pages/Register"));
const UserProfileContainer = lazy(()=>import("../pages/UserProfileContainer"));


const MainRoutes = () => {
  return (
    <div>
      <Suspense fallback={<Loader/>}>
       <Routes>
         <Route path="/" element={<Feelify/>} />
         <Route path="/add_songs" element={<AddSong/>} />
         <Route path="/api/user/auth/register" element={<Register/>} />
         <Route path="/api/user/auth/login" element={<Login/>} />
         {/* <Route path="/user_profile" element={<User_Profile/>} /> */}
         <Route path="/user_profile" element={<UserProfileContainer/>} />
         <Route path="*" element={<PageNotFound/>} />
       </Routes>
      </Suspense>
    </div>
  );
};

export default MainRoutes;

