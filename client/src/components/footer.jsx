import React from "react";
import { Link } from "react-router";

import { logo } from "../constants/assests";
import Button from "../elements/button";

function Footer() {
  return (
    <>
      <div className="flex items-start justify-between">
        <div className="flex flex-col justify-center">
          <img src={logo} alt="logo" />
          <p className="text-[10px]">copyright@2025 UPSA</p>
        </div>

        <div className="w-9/12 space-y-4">
          <div className="flex justify-start space-x-20">
            <Link to={"/"}>
              <p>Option 1</p>
            </Link>
            <Link to={"/"}>
              <p>Option 2</p>
            </Link>
            <Link to={"/"}>
              <p>Option 3</p>
            </Link>
            <Button text="Button"/>
          </div>
          <div>
            <p className="text-sm">
              email us:
              <span className="font-bold"> entrynest@gmail.com</span>
            </p>
          </div>
          <div className="h-[2px] w-full bg-[#D9D9D9]"></div>
          <div className="flex text-sm space-x-10">
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
