import React, { useState } from "react";
import "./LandingPage.css";
import { history } from "../../helpers/history";
import { useSelector } from "react-redux";
import WebcamOrFile from "../WebcamOrFile/WebcamOrFile";
import WebcamCapture from "../WebcamCapture/WebcamCapture";
import SizeForm from "../SizeForm/SizeForm";
import SizeChart from "../SizeChart/SizeChart";
import Loader from "../Loader/Loader";

function LandingPage() {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let [webcamIsOn, setWebcamIsOn] = useState(false);
  let [capture, setCapture] = useState(false);
  let [captureDone, setCaptureDone] = useState(false);
  let [input, setInput] = useState(false);
  let [inputDone, setInputDone] = useState(false);
  let [displayLoader, setDisplayLoader] = useState(false);

  const handleMeasureSize = (event) => {
    setInput(true);
    event.preventDefault();
    if (isAuthenticated) {
      setCapture(true);
    } else {
      history.push("/auth");
    }
  };

  const handleInputMeasure = (event) => {
    event.preventDefault();
    if (isAuthenticated){
        setInput(true);
    }
  }

  //helper fuction for closing the trial room pop-up
  const handleCleanUp = () => {
    setCapture(false);
    setWebcamIsOn(false);
    setCaptureDone(false);
    setDisplayLoader(false);
    setInput(false);
  };

  //closing the trial room pop-up
  const handleCaptureClose = (event) => {
    // event.preventDefault();
    handleCleanUp();

  };

  //event handler for switiching on the webcam
  const handleSwitichingOnWebCam = (event) => {
    event.preventDefault();
    setWebcamIsOn(true);
    setCapture(false);
  };

  const handleInputClose = (event) =>{
    // event.preventDefault();
    setInput(false);
  }

  return (
    <>
      <div className="landing-page-container">
        <div className="landing-page-overlay">
          <div className="landing-page-material">
            <div className="landing-page-title-container">
              <h1 className="title1">Virtual Trial Room</h1>
              <h2>and</h2>
              <h1 className="title1">Size Assist</h1>
            </div>

            <button
              onClick={handleMeasureSize}
              className="product-btn trial-room-btn"
            >
              Click / upload photo
            </button>
            <button
            className="input-Measure-Btn"
            onClick={handleInputMeasure}
            >Add measurements</button>
          </div>
        </div>
      </div>

      {(capture || webcamIsOn || captureDone || displayLoader || input) && (
        <div className="overlay-trial-room"></div>
      )}

      {input && (
        <SizeForm handleInputClose={handleInputClose}/>
      )}

      {capture && (
        <WebcamOrFile
          handleCaptureClose={handleCaptureClose}
          handleSwitichingOnWebCam={handleSwitichingOnWebCam}
        />
      )}
      {webcamIsOn && (
        <WebcamCapture
          handleCaptureClose={handleCaptureClose}
          handleCleanUp={handleCleanUp}
          setCaptureDone={setCaptureDone}
          setDisplayLoader={setDisplayLoader}
        />
      )}
      {displayLoader && <Loader />}
      {captureDone && <SizeChart handleCleanUp={handleCleanUp} />}
    </>
  );
}

export default LandingPage;
