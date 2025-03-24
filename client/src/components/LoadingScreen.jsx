import React from "react";
import "../styles/LoadingScreen.css"; // Import CSS for loading animation

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingScreen;
