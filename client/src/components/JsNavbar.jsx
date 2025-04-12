import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import UserAvatar from "./UserAvatar";

import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const navLinks = [
  { title: "Jobs", href: "/jobs", id: 1 },
  { title: "Mentors", href: "/mentors", id: 2 },
  { title: "View Employers", href: "/view-employers", id: 3 },
  { title: "Resources", href: "/resources", id: 4 },
];

const JsNavbar = () => {
  const { isAuthenticated } = useAuthStore(); // Use hook directly
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      {/* DESKTOP */}
      <div className="md:flex hidden items-center justify-between">
        <Link to="/jobs">
          <img src="/logo.svg" alt="logo" />
        </Link>

        <div className="flex flex-row gap-8">
          {navLinks.map((item) => (
            <div key={item.id} className="hover:font-medium">
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  isActive ? "font-medium" : "text-black"
                }
              >
                {item.title}
              </NavLink>
            </div>
          ))}
        </div>
        <div>
          {isAuthenticated ? <UserAvatar /> : <Link to="/login">Login</Link>}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex items-center justify-between z-50">
        <Link to="/jobs">
          <img src="/logo.svg" alt="logo" />
        </Link>
        <div className="flex gap-4 justify-end">
          {isAuthenticated ? (
            <UserAvatar />
          ) : (
            <Link to="/login" className="text-primary" onClick={toggleMenu}>
              Login
            </Link>
          )}
          <button onClick={toggleMenu}>
            <IoMenu className="size-7 hover:scale-110 transition-all ease-in-out duration-200" />
          </button>
        </div>

        {open && (
          <div
            className={`fixed top-0 left-0 w-full h-full bg-white transition-all duration-1000 ease-in-out overflow-hidden z-50`}
          >
            <div className="flex justify-between w-11/12 mx-auto my-[31px]">
              <Link to="/jobs" onClick={toggleMenu}>
                <img src="/logo.svg" alt="logo" />
              </Link>

              <button onClick={toggleMenu}>
                <IoClose className="size-7 hover:size-6 transition-all ease-in-out duration-200" />
              </button>
            </div>

            <div className="flex flex-col w-11/12  mx-auto">
              {navLinks.map((item) => (
                <div
                  key={item.id}
                  className="items-center justify-start border-b-[1px] border-[#e3e3e3] py-5"
                >
                  <NavLink
                    to={item.href}
                    className="text-xl"
                    onClick={toggleMenu}
                  >
                    <div className="py-3 hover:text-primary">{item.title}</div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default JsNavbar;
