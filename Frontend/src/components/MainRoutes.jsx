import { Route, Routes } from "react-router-dom";
import Feelify from "../pages/Feelify";

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Feelify/>} />
        <Route path="/add_music" element={""} />
        <Route path="/user_profile" element={""} />
      </Routes>
    </div>
  );
};

export default MainRoutes;

