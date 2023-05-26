import React, { useState } from 'react';
import './App.css';
import { fetch } from 'whatwg-fetch';

function App() {
  const [selectedFile, setSelectedFile] = useState();

  const [prediction, setPrediction] = useState();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handlePredictClick = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile)
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: formData
    });
    console.log(response)
    const result = await response.text();
    setPrediction(result);
  }


  return (
    <div className="App">
      <h1>Deep CNN Waste Classification</h1>
      <h2>Upload an image to get started</h2>

      <div className="upload-form">
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleFileSelect}
        />

        {selectedFile &&
          <div className="selected-image">
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
          </div>
        }


        <button onClick={handlePredictClick}>Predict</button>
      </div>
      
        {prediction && 
        <div className="prediction-result">
          <div className="result-card">
            <div style={{marginBottom : "5px"}}>
              <b>Prediction Result </b>
            </div>
              <div className="result-text">
                The image is classified as {prediction}
              </div>
          </div>
       </div>
       }
    </div>
  );
}

export default App;
