import React, { useState } from "react";
import InputField from "../elements/inputField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BiLoaderCircle } from "react-icons/bi";

async function signup(firstname, lastname, email, password, role) {
  try {
    const response = await axios.post("/auth/signup", {
      firstname,
      lastname,
      email,
      password,
      role, // Ensure the role is included in the request
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
}

function JobseekerForm({
  jsfirstname,
  setJsfirstname,
  jslastname,
  setJslastname,
  jsemail,
  setJsemail,
  jspassword,
  setJspassword,
  jsconfirmpassword,
  setJsconfirmpassword,
}) {
  const [signupError, setSignupError] = useState(""); // Initialize signupError state
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); // Add useNavigate hook
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    if (!jsfirstname || !jslastname || !jsemail || !jspassword || !jsconfirmpassword) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (jspassword !== jsconfirmpassword) {
      setSignupError("Passwords do not match.");
      toast.error("Passwords do not match");
      setLoading(false); // Set loading to false
      return;
    }

    const loadingToastId = toast.loading("Processing...");

    try {
      await signup(jsfirstname, jslastname, jsemail, jspassword, "jobseeker");
      toast.success(
        "Signup successful! Check your email for verification Code."
      );
      navigate("/verify-email"); // Navigate to verification page
    } catch (error) {
      setSignupError(error.response?.data?.message || "Signup failed"); // Set error message
      console.log("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false); // Set loading to false
      toast.dismiss(loadingToastId); // Dismiss only the loading toast
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) {
      toast.warning(`Please wait ${resendCooldown} seconds before requesting a new code`);
      return;
    }

    if (!jsemail) {
      toast.error("Email not found. Please try signing up again.");
      return;
    }

    setIsResending(true);
    try {
      await axios.post("/resend-verification", { email: jsemail });
      toast.success("New verification code sent to your email");
      setResendCooldown(60);
    } catch (error) {
      console.error("Resend verification error:", error);
      toast.error(error.response?.data?.message || "Failed to send new verification code");
    } finally {
      setIsResending(false);
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
                value={jsfirstname}
                onChange={(e) => setJsfirstname(e.target.value)}
              />
            </label>
          </div>
          <div className="w-full">
            <label className="text-clampText">
              Last Name
              <InputField
                placeholder="Last Name"
                value={jslastname}
                onChange={(e) => setJslastname(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-clampText">
            Email
            <InputField
              placeholder="Type email"
              value={jsemail}
              onChange={(e) => setJsemail(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label className="text-clampText">
            Create a password
            <InputField
              type="password"
              placeholder="Type password"
              value={jspassword}
              onChange={(e) => setJspassword(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label className="text-clampText">
            Confirm password
            <InputField
              type="password"
              placeholder="Confirm password"
              value={jsconfirmpassword}
              onChange={(e) => setJsconfirmpassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          {signupError && (
          <div className="text-red-600 text-[0.60rem] mt-2 text-center">{signupError}</div>
        )}
          <button
            type="submit"
            className="w-full bg-primary text-white font-medium py-2  flex justify-center items-center rounded-xl"
          >
            {loading ? (
              <BiLoaderCircle className="font-bold text-2xl text-center items-center animate-spin" />
            ) : (
              "Signup"
            )}
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

export default JobseekerForm;
