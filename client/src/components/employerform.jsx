import React from "react";
import InputField from "../elements/inputField";
import Button from "../elements/button";
import { FcGoogle } from "react-icons/fc";

import { Link } from "react-router-dom";

function EmployerForm() {
  return (
    <form id="2" className="space-y-4 md:space-y-7 w-4/5 items-center">
      <div className="flex sm:flex-row flex-col justify-between gap-4">
        <div className="w-full">
          <label className="text-clampText">First Name</label>
          <InputField
            placeholder="First Name"
            // onChange={handlePasswordChange}
          />
        </div>
        <div className="w-full">
          <label className="text-clampText">Last Name</label>
          <InputField
            placeholder="Last Name"
            //   onChange={handlePasswordChange}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-clampText">Work Email</label>
        <InputField
          placeholder="Type email"
          //  onChange={handlePasswordChange}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-clampText">Create a password</label>
        <InputField
          type="password"
          placeholder="Type password"
          // onChange={handlePasswordChange}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-clampText">Confirm password</label>
        <InputField
          type="password"
          placeholder="Confirm password"
          // onChange={handlePasswordChange}
        />
      </div>
      <div>
        <Button
          // onClick={handleSubmit}
          text="Signup"
          className="w-full bg-primary text-white font-medium py-2 rounded-xl "
        />
      </div>

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
    </form>
  );
}

export default EmployerForm;
