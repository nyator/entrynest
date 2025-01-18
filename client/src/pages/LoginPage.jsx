import React from "react";
import { Link } from "react-router";

import { logPhoto } from "../constants/assests";
import InputField from "../elements/inputField";
import Button from "../elements/button";
import { FcGoogle } from "react-icons/fc";

function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex  md:flex-row w-full mt-10 justify-center items-center my-10 h-full bg-white rounded-xl">
      <div className="hidden md:flex h-screen w-1/2">
        <img
          src={logPhoto}
          // className="object-cover hidden md:flex h-1/2 md:w-1/2"
          className="object-cover h-full w-full rounded-s-xl"
        />
      </div>

      <div className="flex flex-col  w-full md:w-1/2 h-1/2 py-8">
        <div className="leading-tight justify-center text-center mb-10">
          <h1 className="font-bold text-clampHeadSm">LOGIN</h1>
          <p className="text-clampDesc">ENTER THE NEST</p>
        </div>

        <div className="flex justify-center">
          <div className="space-y-4 md:space-y-6 w-4/5 items-center">
            <div className="flex flex-col">
              <h1>Email</h1>
              <InputField
                placeholder="Type email"
                onChange={handlePasswordChange}
              />
            </div>

            <div className="flex flex-col">
              <h1>Password</h1>
              <InputField
                type="password"
                placeholder="Type password"
                onChange={handlePasswordChange}
              />
            </div>

            <Button
              text="Login"
              className="w-full bg-primary text-white font-medium py-2 rounded-xl"
            />

            <Link to="">
              <p className="text-mred text-sm text-center mt-4 md:mt-6">
                Forgot Password ?
              </p>
            </Link>
            <div className="flex items-center justify-between">
              <div className="w-2/5 h-[1.5px] bg-gray"></div>or
              <div className="w-2/5 h-[1.5px] bg-gray"></div>
            </div>

            <Link to={""} className="flex items-center justify-center">
              <div className="flex w-fit items-center  gap-2 rounded-full text-clampInputText bg-gray border border-grayStroke px-[20px] py-[10px]">
                <FcGoogle className="size-6" />
                Continue with Google
              </div>
            </Link>

            <div className="flex justify-center items-center">
              <p className="font-SatoshiMedium ">
                New to entrynest ?{"  "}
                <Link to="/join_signup">
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
