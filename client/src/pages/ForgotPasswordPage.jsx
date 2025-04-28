import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import InputField from "../elements/inputField";
import { BiLoaderCircle } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css"; // Import the toastify CSS

const ForgotPasswordPage = () => {
  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = emailRef.current.value;

    try {
      await axios.post("http://localhost:3000/api/auth/forgot-password", {
        email,
      });
      setEmailSent(true);
      toast.success(
        "Password reset link has been sent to your email. Please check your inbox and spam folder."
      );
    } catch (error) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === "User not found"
      ) {
        toast.error("No user found with this email address.");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to send password reset link."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* <div className="max-w-md w-full bg-gray-800 bg-opacity-50 rounded-2xl shadow-xl overflow-hidden mx-auto"> */}
      {/* <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md h-4/5"> */}
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
        {emailSent ? (
          <div className="text-center space-y-4">
            <p className="text-green-500 font-medium">
              Password reset link has been sent to your email!
            </p>
            <p className="text-black/50 text-sm">
              Please check your inbox and spam folder for the reset link. The
              link will expire in 1 hour.
            </p>
            <button
              onClick={() => setEmailSent(false)}
              className="text-primary bg-primary/10 px-4 py-2 rounded-xl hover:text-primary/80 transition-colors"
            >
              Send another reset link
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleForgotPassword}
            className="space-y-4 md:space-y-6 w-full"
          >
            <div className="flex flex-col">
              <InputField
                placeholder="Enter Valid Email Address"
                ref={emailRef}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-medium py-2 rounded-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <BiLoaderCircle className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default ForgotPasswordPage;
