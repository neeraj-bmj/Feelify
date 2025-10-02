import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import "./FaceExpressionDetector.css"
import axios from "axios";

export default function FaceExpressionDetector({setSongs}) {
  const videoRef = useRef();

  // here this is load models
  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  // here this is take permission from user to video if user agree then stream ortherwise give error
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  // here
  async function detectMood(){
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    let mostProableExpression = 0;
    let _expression = "";
    // here if detection nhi ho paya then console No face detected
    if (!detections || detections.length === 0) {
      console.log("No Face Detected");
      return;
    }
    // here jo bhi expression jyda aayega usko print kar dega
    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProableExpression) {
        mostProableExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }
    // console.log(detections[0].expressions);
    console.log(_expression);
    axios.get(`http://localhost:3000/api/songs?mood="${_expression}"`)
    .then((response)=>{
      console.log("Songs Fetched successfully", response.data);
      setSongs(response.data.songs);
    })

  };

  useEffect(() => {
    // here calling functions to load models then start video
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="video-Container" style={{ position: "relative" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        // style={{ width: "720px", height: "560px" }}
        className="user-Video"
      />

      <button onClick={detectMood} className="detect-Btn">Detect Mood</button>
    </div>
  );
}
