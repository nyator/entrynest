import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoadingToast = () => {
  React.useEffect(() => {
    const id = toast.loading("Loading...");
    return () => toast.dismiss(id);
  }, []);

  return <ToastContainer />;
};

export default LoadingToast;
