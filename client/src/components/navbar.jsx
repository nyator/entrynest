import React, { useState } from "react";
import { Link } from "react-router";

import { logo } from "../constants/assests";
import Button from "../elements/button";

const navLinks = [
  { title: "Find Job", href: "/#jobs", id: 1 },
  { title: "Find Talent", href: "/#talents", id: 2 },
  { title: "Community", href: "/community", id: 3 },
  { title: "Support", href: "/support", id: 4 },
];

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  
  return (
    <>
      <div className="flex items-center justify-between">
        <img src={logo} alt="" className="" />

        <div className="flex flex-row gap-8 ">
          {navLinks.map((items) => {
            return (
              <a href={items.href} key={items.id} className="">
                {items.title}
              </a>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Button text="Login" className=""/>
          <Button text="SignUp" className="text-white bg-blue-400"/>
        </div>
      </div>
    </>
  );
};

export default Navbar;
