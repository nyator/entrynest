import { Link } from "react-router";
import Button from "../elements/button";
import { logoHeadLeft } from "../constants/assests";
import { logoHeadRight } from "../constants/assests";

import { BiSolidBolt } from "react-icons/bi";
import { BiSolidShieldAlt2 } from "react-icons/bi";
import { BiSolidGroup } from "react-icons/bi";
import { BiSolidDisc } from "react-icons/bi";

const LandingPage = () => {
  return (
    <div>
      <banner className="relative flex flex-col justify-start items-start md:items-center gap-3 bg-primary px-5 md:px-20  pt-10 pb-28 overflow-hidden -z-10">
        <div className="flex gap-[0.5px] font-thin text-clampDesc text-center justify-start text-gray flex-col sm:flex-row z-50">
          <p>#internship</p>
          <p>#mentorship</p>
          <p>#entry level</p>
        </div>

        <div className="flex flex-col justify-start gap-3 z-50">
          <h1 className="text-clampHead text-white">
            Discover The Right Starting Point With “entrynest”
          </h1>
          <div className="gap-2 flex flex-col sm:flex-row">
            <Link to="">
              <Button
                text="Find Jobs"
                className="border-primaryStroke bg-white text-primaryStroke"
              />
            </Link>
            <Link to="">
              <Button text="Learn More" className="border-white text-white" />
            </Link>
          </div>
        </div>
        <img
          src={logoHeadLeft}
          className="absolute bottom-0 left-0 size-80 z-0 object-fill"
        />
        <img
          src={logoHeadRight}
          className="absolute bottom-0 right-0 sm:visible invisible size-80 z-0  object-fill"
        />
      </banner>

      <section className="flex flex-col items-center gap-3 px-5 md:px-20 pt-10 pb-28">
        <h1 className="text-clampHead">Why Choose entrynest</h1>

        <div className="grid grid-cols-2 gap-3 md:gap-8">
          
          <div className="bg-white border-black/10 border-[2px] px-1 md:px-10 py-3 md:py-12 rounded-lg flex flex-col gap-2 justify-center items-center">
            <div className="rounded-full bg-primary/10 border-primary/20 border-[1px] p-2 w-fit">
              <BiSolidBolt className="text-primary" />
            </div>
            <p className="text-center w-2/3 text-clampText">
              Career Growth Through Innovative Solutions
            </p>
          </div>

          <div className="bg-white border-black/10 border-[2px] px-1 md:px-10 py-3 md:py-12 rounded-lg flex flex-col gap-2 justify-center items-center">
            <div className="rounded-full bg-primary/10 border-primary/20 border-[1px] p-2 w-fit">
              <BiSolidShieldAlt2 className="text-primary" />
            </div>
            <p className="text-center w-2/3 text-clampText">
              Offering Insights into New Positions and Career Paths
            </p>
          </div>

          <div className="bg-white border-black/10 border-[2px] px-1 md:px-10 py-3 md:py-12 rounded-lg flex flex-col gap-2 justify-center items-center">
            <div className="rounded-full bg-primary/10 border-primary/20 border-[1px] p-2 w-fit">
              <BiSolidGroup className="text-primary" />
            </div>
            <p className="text-center w-2/3 text-clampText">
              Tailored Career Solutions for Starters
            </p>
          </div>

          <div className="bg-white border-black/10 border-[2px] px-1 md:px-10 py-3 md:py-12 rounded-lg flex flex-col gap-2 justify-center items-center">
            <div className="rounded-full bg-primary/10 border-primary/20 border-[1px] p-2 w-fit">
              <BiSolidDisc className="text-primary" />
            </div>
            <p className="text-center w-2/3 text-clampText">
              Transforming Career with Insights
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
