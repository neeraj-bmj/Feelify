import { Route, Routes } from "react-router-dom";
import Feelify from "../pages/Feelify";
import PageNotFound from "../pages/PageNotFound";

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Feelify/>} />
        <Route path="*" element={<PageNotFound/>} />

      </Routes>
    </div>
  );
};

export default MainRoutes;

