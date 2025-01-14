import React, { useState } from "react";
import { Link } from "react-router";

import { logo } from "../constants/assests";
import Button from "../elements/button";
import { CgMenuMotion } from "react-icons/cg";
import { AiFillCloseCircle } from "react-icons/ai";

const navLinks = [
  { title: "Find Job", href: "/find_job", id: 1 },
  { title: "Find Talent", href: "/find_talent", id: 2 },
  { title: "Community", href: "/community", id: 3 },
  { title: "Support", href: "/support", id: 4 },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <div className="md:flex hidden items-center justify-between">
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
          <Button text="Login" className="" />
          <Button text="SignUp" className="text-white bg-blue-400" />
        </div>
      </div>

      {/* MOBILE */}

      <div className="md:hidden flex items-center justify-between">
        <img src={logo} alt="" className="" />

        <button
          onClick={toggleMenu}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {!open ? (
            <CgMenuMotion className="size-7 hover:size-6 transition-all ease-in-out duration-200" />
          ) : (
            <AiFillCloseCircle className="size-7 hover:size-6 transition-all ease-in-out duration-200" />
          )}
        </button>
      

      {open && (
        <>
          <div
            className={`fixed top-16 left-0 w-full bg-slate-400 transition-all duration-1000 ease-in-out overflow-hidden ${
              open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-8 w-full bg-slate-400">
              {navLinks.map((items) => {
                return (
                  <a href={items.href} key={items.id} className="">
                    {items.title}
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}
      </div>
    </>
  );
};

export default Navbar;
