import React, { useState } from "react";
import { Link } from "react-router";

import { logPhoto } from "../constants/assests";
import InputField from "../elements/inputField";
import Button from "../elements/button";
import { FcGoogle } from "react-icons/fc";

function SignupPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [toggle, setToggle] = useState("enabled");

  return (
    <div className="flex  md:flex-row w-full mt-10 justify-center items-center my-10 h-full bg-white rounded-xl">
      <div className="hidden md:flex h-screen w-1/2">
        <img
          src={logPhoto}
          className="object-cover h-full w-full rounded-s-xl"
        />
      </div>

      <div className="flex flex-col w-full md:w-1/2 h-1/2 py-8 space-y-4">
        <div className="leading-tight justify-center text-center ">
          <h1 className="font-bold text-clampHeadSm">SIGNUP</h1>
          <p className="text-clampDesc">WELCOME TO THE NEST</p>
        </div>

        {/* <div className="flex gap-2 items-center justify-center w-fit bg-green-700">
          <p>Job Seeker</p>
          <p>Employer</p>
        </div> */}

        <div className=" flex justify-center items-center">
          <div className="flex w-fit rounded-xl">
            <button
              className={`text-clampText border-[1.5px] border-primaryStroke border-r-0 py-2 px-4 rounded-s-xl  ${
                toggle === "enabled"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-primaryStroke"
              } transition duration-300`}
              onClick={() => setToggle("enabled")}
            >
              Job Seeker
            </button>

            <button
              className={`text-clampText border-[1.5px] border-primaryStroke py-2 px-4 rounded-r-xl ${
                toggle === "disabled"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-primaryStroke"
              } transition duration-300`}
              onClick={() => setToggle("disabled")}
            >
              Employer
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="space-y-4 md:space-y-6 w-4/5 items-center">
            <div className="flex md:flex-row flex-col justify-between gap-4 bg-slate-500">
              <div>
                <h1>First Name</h1>
                <InputField
                  placeholder="First Name"
                  onChange={handlePasswordChange}
                />
              </div>
              <div>
                <h1>Last Name</h1>
                <InputField
                  placeholder="Last Name"
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <h1>Email</h1>
              <InputField
                placeholder="Type email"
                onChange={handlePasswordChange}
              />
            </div>

            <div className="flex flex-col">
              <h1>Create a password</h1>
              <InputField
                type="password"
                placeholder="Type password"
                onChange={handlePasswordChange}
              />
            </div>

            <Button
              text="Signup"
              className="w-full bg-primary text-white font-medium py-2 rounded-xl"
            />

            <div className="flex items-center justify-between">
              <div className="w-2/5 h-[1.5px] bg-gray"></div>or
              <div className="w-2/5 h-[1.5px] bg-gray"></div>
            </div>

            <Link to={""} className="flex items-center justify-center">
              <div className="flex w-fit items-center  gap-2 rounded-full text-clampInputText bg-gray border border-grayStroke px-[20px] py-[10px]">
                <FcGoogle className="size-6" />
                Signup with Google
              </div>
            </Link>

            <div className="flex justify-center items-center">
              <p className="font-SatoshiMedium ">
                Have an account ?{"  "}
                <Link to="/join_login">
                  <span className="font-medium underline">Login</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
