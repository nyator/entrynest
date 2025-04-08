import React from "react";
import "../styles/LoadingScreen.css"; // Import CSS for loading animation

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-5/6">
      <div className="flex flex-col items-center">
        <div className="spinner"></div>
        <h1 className="text-2xl font-bold mt-4">Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
