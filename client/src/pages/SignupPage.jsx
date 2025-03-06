import React, { useState } from "react";
import { toast } from "react-toastify";
import { fg } from "../constants/assests";
import JobseekerForm from "../components/jobseekerform";
import EmployerForm from "../components/employerform";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

function SignupPage() {
  const [toggle, setToggle] = useState("jobseeker");
  const navigate = useNavigate();
  const signup = useAuthStore();

  // Job Seeker State
  const [jsfirstname, setJsfirstname] = useState("");
  const [jslastname, setJslastname] = useState("");
  const [jsemail, setJsemail] = useState("");
  const [jspassword, setJspassword] = useState("");
  const [jsconfirmpassword, setJsconfirmpassword] = useState("");

  // Employer State
  const [emfirstname, setEmfirstname] = useState("");
  const [emlastname, setEmlastname] = useState("");
  const [workemail, setWorkemail] = useState("");
  const [empassword, setEmpassword] = useState("");
  const [emconfirmpassword, setEmconfirmpassword] = useState("");

  const [error, setError] = useState(null);

  const handleSignupComplete = async () => {
    const role = toggle; // Get the selected role
    const userData = {
      firstname: toggle === "jobseeker" ? jsfirstname : emfirstname,
      lastname: toggle === "jobseeker" ? jslastname : emlastname,
      email: toggle === "jobseeker" ? jsemail : workemail,
      password: toggle === "jobseeker" ? jspassword : empassword,
      confirmPassword:
        toggle === "jobseeker" ? jsconfirmpassword : emconfirmpassword,
      role, // Include the role in the signup data
    };

    // Validate password match
    if (userData.password !== userData.confirmPassword) {
      setError(
        "Passwords do not match. Please ensure both passwords are identical."
      );
      toast.error("Passwords do not match");
      return;
    }

    // Send signup request to the backend
    try {
      const response = await axios.post("/api/auth/signup", userData);
      setError("");
      toast.success(
        "Signup successful! Please check your email for verification. If you do not see it, please check your spam folder."
      );
      navigate("/jobs"); // Redirect to jobs page after successful signup
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message);
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex md:flex-row w-full mt-10 justify-center items-center my-10 h-full bg-white rounded-xl">
      <div className="hidden md:flex h-screen w-1/2">
        <img src={fg} className="object-cover h-full w-full rounded-s-xl" />
      </div>

      <div className="flex flex-col w-full md:w-1/2 h-1/2 py-8 space-y-4">
        <div className="leading-tight justify-center text-center ">
          <h1 className="font-bold text-clampHeadSm">SIGNUP</h1>
          <p className="text-clampDesc">WELCOME TO THE NEST</p>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex w-fit rounded-xl">
            <button
              className={`text-clampText border-[1.5px] border-primaryStroke border-r-0 py-2 px-4 rounded-s-xl ${
                toggle === "jobseeker"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-primaryStroke"
              } transition ease-in-out duration-300`}
              onClick={() => {
                setToggle("jobseeker");
              }}
            >
              Job Seeker
            </button>

            <button
              className={`text-clampText border-[1.5px] border-primaryStroke py-2 px-4 rounded-r-xl ${
                toggle === "employer"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-primaryStroke"
              } transition ease-in-out duration-300`}
              onClick={() => {
                setToggle("employer");
              }}
            >
              Employer
            </button>
          </div>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="flex justify-center">
          {toggle === "jobseeker" ? (
            <JobseekerForm
              jsfirstname={jsfirstname}
              setJsfirstname={setJsfirstname}
              jslastname={jslastname}
              setJslastname={setJslastname}
              jsemail={jsemail}
              setJsemail={setJsemail}
              jspassword={jspassword}
              setJspassword={setJspassword}
              jsconfirmpassword={jsconfirmpassword}
              setJsconfirmpassword={setJsconfirmpassword}
              handleSignupComplete={() => handleSignupComplete()}
            />
          ) : (
            <EmployerForm
              emfirstname={emfirstname}
              setEmfirstname={setEmfirstname}
              emlastname={emlastname}
              setEmlastname={setEmlastname}
              workemail={workemail}
              setWorkemail={setWorkemail}
              empassword={empassword}
              setEmpassword={setEmpassword}
              emconfirmpassword={emconfirmpassword}
              setEmconfirmpassword={setEmconfirmpassword}
              handleSignupComplete={() => handleSignupComplete()}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
