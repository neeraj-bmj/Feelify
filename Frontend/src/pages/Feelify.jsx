import { lazy, Suspense } from "react";
import Loader from "../components/Loader";
 const FaceExpressionDetector = lazy(()=>import("../components/FaceExpressionDetector"));
 const MoodSongs = lazy(()=>import("../components/MoodSongs"));

const Feelify = () => {
  return (
    <div>
      <Suspense fallback={<Loader/>}>
        <FaceExpressionDetector />
        <MoodSongs  />
      </Suspense>
    </div>
  );
};

export default Feelify;
