import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoadingToast = () => {
  React.useEffect(() => {
    const id = toast.loading("Loading...", {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
    });
    return () => {
      toast.dismiss(id);
    };
  }, []);

  return <ToastContainer limit={5} />;
};

export default LoadingToast;
