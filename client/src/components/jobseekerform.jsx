import React from "react";
import InputField from "../elements/inputField";
import Button from "../elements/button";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

const [signupError, setSignupError] = useState("");
const handleSignup = async (e) => {
  e.preventDefault();
    setSignupError(""); // Reset error state before signup attempt
    

    try {
      await signup(jsfirstname, jslastname, jsemail, jspassword);
      navigate("/verify-email");
  } catch (error) {
    setSignupError(error.response?.data?.message || "Signup failed"); // Set error message
    console.log(error);

    }
  };

  return (
    <div className="space-y-4 md:space-y-7 w-4/5">
      <form onSubmit={handleSignup} className="space-y-4 md:space-y-7 items-center"> 
        {signupError && <p className="text-red-500">{signupError}</p>} {/* Display error message */}
        <div className="flex sm:flex-row flex-col justify-between gap-4">
          <div className="w-full">
            <label className="text-clampText">First Name</label>
            <InputField
              type="text"
              placeholder="First Name"
              value={jsfirstname}
              onChange={(e) => setJsfirstname(e.target.value)}
            />
            {/* {error.firstname && <p className="text-red-500">{error.firstname}</p>} */}
          </div>
          <div className="w-full">
            <label className="text-clampText">Last Name</label>
            <InputField
              type="text"
              placeholder="Last Name"
              value={jslastname}
              onChange={(e) => setJslastname(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-clampText">Email</label>
          <InputField
            type="email"
            placeholder="Type email"
            value={jsemail}
            onChange={(e) => setJsemail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-clampText">Create a password</label>
          <InputField
            type="password"
            placeholder="Type password"
            value={jspassword}
            onChange={(e) => setJspassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-clampText">Confirm password</label>
          <InputField
            type="password"
            placeholder="Confirm password"
            value={jsconfirmpassword}
            onChange={(e) => setJsconfirmpassword(e.target.value)}
          />
        </div>
        <div>
          <Button
            type="submit"
            text="Signup"
            className="w-full bg-primary text-white font-medium py-2 rounded-xl"
          />
        </div>
      </form>

      <div className="flex items-center justify-between text-gray">
        <div className="w-2/5 h-[1.5px] bg-gray"></div>or
        <div className="w-2/5 h-[1.5px] bg-gray"></div>
      </div>

      <Link to={""} className="flex items-center justify-center">
        <div className="flex w-fit items-center gap-2 rounded-full text-clampInputText bg-gray border border-grayStroke px-[20px] py-[10px]">
          <FcGoogle className="size-6" />
          Signup with Google
        </div>
      </Link>

      <div className="flex justify-center items-center">
        <p className="font-SatoshiMedium">
          Have an account ?{"  "}
          <Link to="/join_login">
            <span className="font-medium underline">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default JobseekerForm;
