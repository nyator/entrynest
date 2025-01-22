import Button from "../elements/button";
import { logoHeadLeft, to } from "../constants/assests";
import { logoHeadRight } from "../constants/assests";
import { shadowBox } from "../constants/styles";

import { LiaLaptopCodeSolid } from "react-icons/lia";
import { BsVectorPen } from "react-icons/bs";

const LandingPage = () => {
  return (
    <>
      <section className="mx-auto mt-20 mb-5 sm:my-20 md:w-5/6">
        <div className="flex flex-col text-center ">
          <h1 className="text-clampHead font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#af00ce]">
            Explore Jobs Category
          </h1>
          <p className="text-clampHeadM">
            Search through a variety of job categories to find the perfect
            match.{" "}
          </p>
        </div>
        <div className="flex justify-around sm:justify-center w-full space-x-3 mt-4">
          <div className={`${shadowBox} bg-mblack flex flex-row items-center px-3 py-5 md:p-7 w-fit rounded-l-xl space-x-3 md:space-x-6`}>
            <div className="rounded-full bg-grayStroke border-gray border-[1px] p-1 h-fit w-fit">
              <BsVectorPen className="text-white"/>
            </div>
            <div className="text-white leading-tight">
              <h1 className="text-clampHeadM">Finance & Accounting</h1>
              <p className="text-clampDesc font-light">View available opportunities...</p>
            </div>
          </div>
          <div className={`${shadowBox} bg-white flex flex-row items-center px-3 py-5 md:p-7 w-fit rounded-r-xl space-x-3 md:space-x-6`}>
            <div className="rounded-full bg-mblack border-gray border-[1px] p-1 h-fit w-fit">
              <LiaLaptopCodeSolid className="text-white"/>
            </div>
            <div className="text-mblack leading-tight">
              <h1 className="text-clampHeadM">Development & IT</h1>
              <p className="text-clampDesc font-light">View available opportunities...</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="flex flex-col justify-center items-center gap-3 bg-primary px-5 md:px-20 py-10 my-5 overflow-hidden rounded-xl ">
          <div className="flex gap-[0.5px] font-thin text-clampDesc text-center text-gray flex-row">
            <p>#internship</p>
            <p>#mentorship</p>
            <p>#entry level</p>
          </div>

          <div className="flex flex-col md:items-start items-center justify-start gap-3 z-10">
            <h1 className="text-clampHead font-black leading-tight text-white text-center md:text-left">
              Discover The Right Starting Point With “entrynest”
            </h1>
            <div className="gap-2 flex flex-row">
              <Button
                text="Find Jobs"
                className="border-primaryStroke bg-white text-primaryStroke"
                Link="/"
              />

              <Button
                text="Learn More"
                className="border-white text-white"
                Link="/support"
              />
            </div>
          </div>
          <img
            src={logoHeadLeft}
            className="absolute bottom-0 left-0 size-48 sm:size-64 z-0 object-fill"
          />
          <img
            src={logoHeadRight}
            className="absolute bottom-0 right-0 sm:visible invisible size-64 z-0 object-fill"
          />
        </div>
      </section>

      <section className="mx-auto my-5 sm:my-20 w-5/6 ">
        <div className="flex flex-col text-center ">
          <h1 className="text-clampHead font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#af00ce]">
            Your Career, Your Future!
          </h1>
          <p className="text-clampHeadM">
            Explore opportunities designed to launch your career.
          </p>
        </div>
      </section>

      <section className="flex flex-col-reverse sm:flex-row-reverse space-y-5 gap-3 items-center justify-evenly my-5 sm:my-20">
        <div>
          <h1 className="text-clampHeadXs font-medium">Find Your</h1>
          <h1 className="text-clampHeadXs font-medium bg-grayStroke border-black border-t-2 border-b-2 pl-2 text-white">
            Talents
          </h1>
          <h1 className="text-clampHeadXs font-medium">With Us</h1>
        </div>
        <div className="bg-mblack text-white p-10 rounded-xl">
          <h1 className="text-clampHeadSm font-medium">
            Get The Right Candidate
          </h1>
          <p className="">
            Easily post internships and jobs that attract top talent.
          </p>
          <Button
            text="Signup now"
            className="text-black bg-white border-none mt-2"
            Link="/join_signup"
          />
        </div>
        <img
          src={to}
          className="w-full h-56 sm:size-56 object-cover rounded-xl bg-blend-luminosity"
        />
      </section>
    </>
  );
};

export default LandingPage;
