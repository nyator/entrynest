import React, { useState } from "react";
import InputField from "../elements/inputField";
import Button from "../elements/button";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import LoadingBar from "../components/LoadingToast"; // Import the LoadingBar component

function SignupJobSeeker() {
  const { signup } = useAuthStore();
  const [role, setRole] = useState('jobseeker'); // Default role
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSignup = async(e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    const userData = { firstname, lastname, email, password, role };
    try {
      await signup(userData);
      toast.success("Signup successful!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Set loading to false
    }
  }

  return (
    <div className="bg-white w-11/12 flex flex-col mx-auto px-5 md:px-20 py-7 -center md:py-20 my-10 gap-9 rounded-xl">
      {loading && <LoadingBar />} {/* Conditionally render the loading bar */}
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
            <h1 className="text-clampText">Last Name</h1>
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
            <h1 className="text-clampText">Last Name</h1>
            <InputField
              placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="md:w-6/12 space-y-5 ">
          <div className="md:space-y-2">
            <h1 className="text-clampText">Last Name</h1>
            <InputField
              placeholder="Password" 
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="md:space-y-2">
            <h1 className="text-clampText">Last Name</h1>
            <InputField
              placeholder="Last Name"
            />
          </div>
          <div className="md:space-y-2">
            <h1 className="text-clampText">Last Name</h1>
            <InputField
              placeholder="Last Name" 
            />
          </div>
        </div>
      </div>

      <div>
        <Button text="Complete Setup" className="text-white bg-primary" onClick={handleSignup} />
      </div>
    </div>
  );
}

export default SignupJobSeeker;
