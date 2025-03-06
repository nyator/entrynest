import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <CircularProgress />
    </div>
  );
};

export default LoadingBar;
