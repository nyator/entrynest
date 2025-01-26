import React, { useState } from "react";

import { fg } from "../constants/assests";

import JobseekerForm from "../components/jobseekerform";
import EmployerForm from "../components/employerform";

function SignupPage() {
  const [toggle, setToggle] = useState("jobseeker");

  const [jsfirstname, setJsfirstname] = useState('');
  const [jslastname, setJslastname] = useState('');
  const [jsemail, setJsemail] = useState('');
  const [jspassword, setJspassword] = useState('');
  const [jsconfirmpassword, setJsconfirmpassword] = useState('');

  return (
    <div className="flex  md:flex-row w-full mt-10 justify-center items-center my-10 h-full bg-white rounded-xl">
      <div className="hidden md:flex h-screen w-1/2">
        <img src={fg} className="object-cover h-full w-full rounded-s-xl" />
      </div>

      <div className="flex flex-col w-full md:w-1/2 h-1/2 py-8 space-y-4">
        <div className="leading-tight justify-center text-center ">
          <h1 className="font-bold text-clampHeadSm">SIGNUP</h1>
          <p className="text-clampDesc">WELCOME TO THE NEST</p>
        </div>

        <div className=" flex justify-center items-center">
          <div className="flex w-fit rounded-xl">
            <button
              className={`text-clampText border-[1.5px] border-primaryStroke border-r-0 py-2 px-4 rounded-s-xl  ${
                toggle === "jobseeker"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-primaryStroke"
              } transition ease-in-out duration-300`}
              onClick={() => setToggle("jobseeker")}
            >
              Job Seeker
            </button>

            <button
              className={`text-clampText border-[1.5px] border-primaryStroke py-2 px-4 rounded-r-xl ${
                toggle === "employer"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-primaryStroke"
              } transition ease-in-out duration-300`}
              onClick={() => setToggle("employer")}
            >
              Employer
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          {toggle === "jobseeker" ? <JobseekerForm 
          jsfirstname={jsfirstname} setJsfirstname={setJsfirstname}
          jslastname={jslastname} setJslastname={setJslastname}
          jsemail={jsemail} setJsemail={setJsemail}
          jspassword={jspassword} setJspassword={setJspassword}
          jsconfirmpassword={jsconfirmpassword} setJsconfirmpassword={setJsconfirmpassword}
           /> : 
          <EmployerForm />
          }
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
