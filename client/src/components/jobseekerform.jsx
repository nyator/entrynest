import React from "react";
import InputField from "../elements/inputField";
import Button from "../elements/button";
import { FcGoogle } from "react-icons/fc";

import { Link } from "react-router-dom";

function JobseekerForm({ firstname }) {

  return (
    <form id="1" className="space-y-4 md:space-y-7 w-4/5 items-center">
      <div className="flex sm:flex-row flex-col justify-between gap-4">
        <div className="w-full">
          <h1 className="text-clampText">First Name</h1>
          <InputField
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          {/* {errors.firstname && <p className="text-red-500">{errors.firstname}</p>} */}
        </div>
        <div className="w-full">
          <h1 className="text-clampText">Last Name</h1>
          <InputField placeholder="Last Name" />
          {/* {errors.lastname && <p className="text-red-500">{errors.lastname}</p>} */}
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="text-clampText">Email</h1>
        <InputField placeholder="Type email" />
        {/* {errors.email && <p className="text-red-500">{errors.email}</p>} */}
      </div>

      <div className="flex flex-col">
        <h1 className="text-clampText">Create a password</h1>
        <InputField type="password" placeholder="Type password" />{" "}
      </div>

      <div className="flex flex-col">
        <h1 className="text-clampText">Confirm password</h1>
        <InputField type="password" placeholder="Confirm password" />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div>
        <Button
          type="submit"
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

export default JobseekerForm;
