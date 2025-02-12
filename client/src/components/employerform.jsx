import React, { useState } from "react";
import InputField from "../elements/inputField";
import Button from "../elements/button";
import { FcGoogle } from "react-icons/fc";

import { Link } from "react-router-dom";

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
  const handleSubmit = (e, handleNextStep) => {
    e.preventDefault();
    // Logic to handle multi-page form submission
    if (currentStep < totalSteps) {
      handleNextStep();
    } else {
      // Final submission logic
    }
  };

  return (
    <div className="space-y-4 md:space-y-7 w-4/5 items-center">
      <form
        id="2"
        className="space-y-4 md:space-y-7 items-center"
        onSubmit={(e) => handleSubmit(e, handleNextStep)}
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
  );
}

export default EmployerForm;
