import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { fr } from "../constants/assests";
import InputField from "../elements/inputField";
import { FcGoogle } from "react-icons/fc";

function LoginPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // console.log("Attempting to log in with Email:", email);
    // console.log("Attempting to log in with Password:", password);
    // console.log("Sending request to login API...");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      toast.success("Login successful");
      // console.log("Login successful. Response data:", response.data)

      // Handle successful login
      navigate("/jobs"); // Redirect to the dashboard page
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your email and password.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex md:flex-row w-full mt-10 justify-center items-center my-10 h-full bg-white rounded-xl">
      <div className="hidden md:flex h-screen w-1/2">
        <img src={fr} className="object-cover h-full w-full rounded-s-xl" />
      </div>

      <div className="flex flex-col w-full md:w-1/2 h-1/2 py-8">
        <div className="leading-tight justify-center text-center mb-10">
          <h1 className="font-bold text-clampHeadSm">LOGIN</h1>
          <p className="text-clampDesc">ENTER THE NEST</p>
        </div>

        <div className="flex justify-center">
          <div className="space-y-4 md:space-y-6 w-4/5 items-center">
            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
              <div className="flex flex-col">
                <h1 className="text-clampText">Email</h1>
                <InputField placeholder="Type email" ref={emailRef} />
              </div>

              <div className="flex flex-col">
                <h1 className="text-clampText">Password</h1>
                <InputField
                  type="password"
                  placeholder="Type password"
                  ref={passwordRef}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-medium py-2 rounded-xl"
                >
                  Login
                </button>
              </div>
            </form>

            <Link to="/forgot-password">
              <p className="text-mred text-sm text-center mt-4 md:mt-6">
                Forgot Password?
              </p>
            </Link>
            <div className="flex items-center justify-between text-gray">
              <div className="w-2/5 h-[1.5px] bg-gray"></div>or
              <div className="w-2/5 h-[1.5px] bg-gray"></div>
            </div>

            <Link to={""} className="flex items-center justify-center">
              <div className="flex w-fit items-center gap-2 rounded-full text-clampInputText bg-gray border border-grayStroke px-[20px] py-[10px]">
                <FcGoogle className="size-6" />
                Continue with Google
              </div>
            </Link>

            <div className="flex justify-center items-center">
              <p className="font-SatoshiMedium ">
                New to entrynest?{"  "}
                <Link to="/signup">
                  <span className="font-medium underline">Signup</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
