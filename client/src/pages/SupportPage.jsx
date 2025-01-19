import React from "react";

import { BiSolidBolt } from "react-icons/bi";
import { BiSolidShieldAlt2 } from "react-icons/bi";
import { BiSolidGroup } from "react-icons/bi";
import { BiSolidDisc } from "react-icons/bi";

function SupportPage() {
  return (
    <div>
      <section className="flex flex-col items-center gap-3 px-5 md:px-20 py-10 my-10">
        <h1 className="text-clampHead font-medium">Why Choose entrynest</h1>

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
}

export default SupportPage;
