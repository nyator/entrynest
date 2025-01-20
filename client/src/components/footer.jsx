import React from "react";
import { Link } from "react-router";

import { logo } from "../constants/assests";
import Button from "../elements/button";

function Footer() {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
        <div className="flex flex-col items-center">
          <img src={logo} alt="logo" />
          <p className="text-[10px]">copyright@2025 UPSA</p>
        </div>

        <div className="w-11/12 sm:w-10/12 space-y-4">
          <div className="flex justify-center sm:justify-normal gap-5 sm:gap-10 md:gap-20">
            <Link to={"/"}>
              <p className="text-clampText">Option 1</p>
            </Link>
            <Link to={"/"}>
              <p className="text-clampText">Option 2</p>
            </Link>
            <Link to={"/"}>
              <p className="text-clampText">Option 3</p>
            </Link>
            <Button text="Button" className="text-clampText" Link={"/"} />
          </div>
          <div>
            <p className="text-center sm:text-start text-sm">
              email us:
              <span className="font-bold"> entrynest@gmail.com</span>
            </p>
          </div>
          <div className="h-[2px] w-full bg-[#D9D9D9]"></div>
          <div className="flex justify-center sm:justify-normal text-clampText space-x-10">
            <Link to="">
              <p>User Agreement</p>
            </Link>
            <Link to="">
              <p>Privacy</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
