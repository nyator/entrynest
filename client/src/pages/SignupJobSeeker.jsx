import React, { useState } from "react";
import InputField from "../elements/inputField";
import Button from "../elements/button";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LoadingBar from "../components/LoadingToast";

function SignupJobSeeker() {
  const { signup } = useAuthStore();
  const navigate = useNavigate(); // Initialize navigate
  const [role, setRole] = useState("jobseeker");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = { firstname, lastname, email, password, role };
    try {
      await signup(userData);
      toast.success("Signup successful! Please verify your email.");
      navigate("/verify-email"); // Redirect to email verification page
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-11/12 flex flex-col mx-auto px-5 md:px-20 py-7 -center md:py-20 my-10 gap-9 rounded-xl">
      {loading && <LoadingBar />}
      <div>
        <h1 className="text-clampHeadSm font-black">SIGNUP</h1>
        <p className="text-clampText">
          CONTINUE{" "}
          <span className="font-SatoshiBold bg-primary/50">
            JOB SEEKER ACCOUNT{" "}
          </span>
          SETUP
        </p>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between md:gap-20 lg:gap-35">
        <div className=" md:w-6/12 space-y-5 ">
          <div className="md:space-y-2">
            <h1 className="text-clampText">First Name</h1>
            <InputField
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="md:space-y-2">
            <h1 className="text-clampText">Last Name</h1>
            <InputField
              placeholder="Last Name"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="md:space-y-2">
            <h1 className="text-clampText">Email</h1>
            <InputField
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="md:w-6/12 space-y-5 ">
          <div className="md:space-y-2">
            <h1 className="text-clampText">Password</h1>
            <InputField
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <Button
          text="Complete Setup"
          className="text-white bg-primary"
          onClick={handleSignup}
        />
      </div>
    </div>
  );
}

export default SignupJobSeeker;
