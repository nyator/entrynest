import React, { useState } from "react";
import { Link, NavLink } from "react-router";

import { logo } from "../constants/assests";
import Button from "../elements/button";

import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const navLinks = [
  { title: "Find Job", href: "/", id: 1 },
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
      {/* DESKTOP */}
      <div className="md:flex hidden items-center justify-between">
        <img src={logo} alt="" className="" />

        <div className="flex flex-row gap-8 ">
          {navLinks.map((items) => {
            return (
              <div className="hover:font-medium">
                <NavLink
                  to={items.href}
                  key={items.id}
                  className={({ isActive }) =>
                    isActive ? "font-medium" : "text-black"
                  }
                >
                  {items.title}
                </NavLink>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Link to="/join_login">
            <Button text="Login" className="" />
          </Link>
          <Link to="/join_signup">
            <Button text="SignUp" className="text-white bg-blue-400" />
          </Link>
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
            <IoMenu className="size-7 hover:size-6 transition-all ease-in-out duration-200" />
          ) : (
            <IoClose className="size-7 hover:size-6 transition-all ease-in-out duration-200" />
          )}
        </button>

        {open && (
          <>
            <div
              className={`fixed top-20 left-0 w-full h-full bg-white transition-all duration-1000 ease-in-out overflow-hidden 
            `}
            >
              <div className="flex flex-col w-11/12 mx-auto">
                {navLinks.map((items) => {
                  return (
                    <div
                      key={items.id}
                      className="items-center justify-start border-b-[1px] border-[#e3e3e3] py-5"
                    >
                      <a href={items.href} className="text-xl">
                        <div className="py-3">{items.title}</div>
                      </a>
                    </div>
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
