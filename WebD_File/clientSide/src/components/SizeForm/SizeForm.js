import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputSize } from "../../redux/actions/authAction";

import "./SizeForm.css";

function SizeForm(props) {
  let [chest, setChest] = useState("");
  let [frontal, setFrontal] = useState("");
  let [shoulder, setShoulder] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  const handleSizeInput = (event) => {
    event.preventDefault();

    const measurements = {
      chest,
      frontal,
      shoulder,
    };

    dispatch(inputSize(measurements));
    props.handleInputClose();
    clearInputFields();
  };

  const clearInputFields = () => {
    setChest("");
    setFrontal("");
    setShoulder("");
  };

  console.log(chest);
  return (
    <div className="image-upload-options-container-wrap">
      <button onClick={props.handleInputClose} className="cancel-btn size-form-cancel-btn">
        <i className="fas fa-times"></i>
      </button>
      <form className="measurement-form">
        <center>
          <h1>Input your measurements.</h1>
          <input
            type="number"
            placeholder="Chest"
            value={chest}
            onChange={(event) => setChest(event.target.value)}
          />
          <input
            type="number"
            placeholder="Frontal Length"
            value={frontal}
            onChange={(event) => setFrontal(event.target.value)}
          />
          <input
            type="number"
            placeholder="Shoulder Length"
            value={shoulder}
            onChange={(event) => setShoulder(event.target.value)}
          />
        </center>
        <center>
          <button className="submit-button" onClick={handleSizeInput}>
            Submit
          </button>
        </center>
      </form>
    </div>
  );
}

export default SizeForm;
