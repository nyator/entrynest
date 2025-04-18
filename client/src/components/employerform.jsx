import React, { useState } from "react";
import InputField from "../elements/inputField";
import Button from "../elements/button";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingBar from "./LoadingToast"; // Import the LoadingBar component

async function signup(firstname, lastname, email, password, role) {
  try {
    const response = await axios.post("/auth/signup", {
      // Ensure the URL is correct
      firstname,
      lastname,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

function EmployerForm({
  emfirstname,
  setEmfirstname,
  emlastname,
  setEmlastname,
  workemail,
  setWorkemail,
  empassword,
  setEmpassword,
  emconfirmpassword,
  setEmconfirmpassword,
}) {
  const [signupError, setSignupError] = useState(""); // Initialize signupError state
  const [loading, setLoading] = useState(false); // Add loading state
  const [isMentor, setIsMentor] = useState(false); // Add state for mentor checkbox
  const navigate = useNavigate(); // Add useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!emfirstname || !emlastname || !workemail || !empassword || !emconfirmpassword) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (empassword !== emconfirmpassword) {
      setSignupError("Passwords do not match.");
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    const role = isMentor ? "mentor" : "employer";
    const payload = { firstname: emfirstname, lastname: emlastname, email: workemail, password: empassword, role };

    console.log("Signup payload:", payload); // Debug the payload

    const loadingToastId = toast.loading("Processing...");

    try {
      await signup(emfirstname, emlastname, workemail, empassword, role);
      toast.success("Signup successful! Check your email for verification Code.");
      navigate(role === "mentor" ? "/mentor-dashboard" : "/jobs");
    } catch (error) {
      setSignupError(error.response?.data?.message || "Signup failed");
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <div className="space-y-4 md:space-y-7 w-4/5 items-center">
      <form
        id="2"
        className="space-y-4 md:space-y-7 items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex sm:flex-row flex-col justify-between gap-4">
          <div className="w-full">
            <label className="text-clampText">
              First Name
              <InputField
                placeholder="First Name"
                value={emfirstname}
                onChange={(e) => setEmfirstname(e.target.value)}
              />
            </label>
          </div>
          <div className="w-full">
            <label className="text-clampText">
              Last Name
              <InputField
                placeholder="Last Name"
                value={emlastname}
                onChange={(e) => setEmlastname(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="mentorCheckbox"
            checked={isMentor}
            onChange={(e) => setIsMentor(e.target.checked)}
          />
          <label htmlFor="mentorCheckbox" className="text-clampText">
            I want to be a mentor
          </label>
        </div>

        <div className="flex flex-col">
          <label className="text-clampText">
            Work Email
            <InputField
              placeholder="Type email"
              value={workemail}
              onChange={(e) => setWorkemail(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label className="text-clampText">
            Create a password
            <InputField
              type="password"
              placeholder="Type password"
              value={empassword}
              onChange={(e) => setEmpassword(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label className="text-clampText">
            Confirm password
            <InputField
              type="password"
              placeholder="Confirm password"
              value={emconfirmpassword}
              onChange={(e) => setEmconfirmpassword(e.target.value)}
            />
          </label>
        </div>

        <div>
          {signupError && (
            <div className="text-red-600 text-[0.60rem] mt-2 text-center">
              {signupError}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-primary text-white font-medium py-2 rounded-xl"
          >
            Signup
          </button>
        </div>
      </form>
      <div className="flex items-center justify-between text-gray">
        <div className="w-2/5 h-[1.5px] bg-gray"></div>or
        <div className="w-2/5 h-[1.5px] bg-gray"></div>
      </div>

      {/* <Link to={""} className="flex items-center justify-center">
        <div className="flex w-fit items-center  gap-2 rounded-full text-clampInputText bg-gray border border-grayStroke px-[20px] py-[10px]">
          <FcGoogle className="size-6" />
          Signup with Google
        </div>
      </Link> */}

      <div className="flex justify-center items-center">
        <p className="font-SatoshiMedium ">
          Have an account ?{"  "}
          <Link to="/login">
            <span className="font-medium underline">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default EmployerForm;
