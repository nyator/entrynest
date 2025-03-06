import React, { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import InputField from "../elements/inputField";
import "react-toastify/dist/ReactToastify.css"; // Import the toastify CSS

const ForgotPasswordPage = () => {
  const emailRef = useRef(null);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    try {
      await axios.post("http://localhost:3000/api/auth/forgot-password", {
        email,
      });
      toast.success("Password reset link sent to your email.");
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === "User not found") {
        toast.error("No user found with this email address.");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to send password reset link."
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div className="max-w-md w-full bg-gray-800 bg-opacity-50 rounded-2xl shadow-xl overflow-hidden mx-auto">
        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md h-4/5">
          <div className="flex flex-col w-full h-full justify-center items-center">
            <h1 className="font-bold text-clampHeadSm">Forgot Password</h1>
            <form
              onSubmit={handleForgotPassword}
              className="space-y-4 md:space-y-6 w-full"
            >
              <div className="flex flex-col">
                <InputField
                  placeholder="Enter Valid Email Address"
                  ref={emailRef}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-medium py-2 rounded-xl"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
