import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

import { logo } from "../constants/assests";
import Button from "../elements/button";
import UserAvatar from "./UserAvatar";
import JsNavbar from "./JsNavbar";
import EmNavbar from "./EmNavbar";

import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import AdminNavbar from "./AdminNavbar";

const navLinks = [
  { title: "Find Job", href: "/", id: 1 },
  { title: "Find Talent", href: "/find_talent", id: 2 },
  { title: "Community", href: "/community", id: 3 },
  { title: "Support", href: "/support", id: 4 },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore(); // Use hook directly

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  if (user) {
    if (user.role === "jobseeker") {
      return <JsNavbar />;
    } else if (user.role === "employer") {
      return <EmNavbar />;
    } else if (user.role === "admin") {
      return <AdminNavbar />;
    }
  }

  return (
    <>
      {/* DESKTOP */}
      <div className="md:flex hidden items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>

        <div className="flex flex-row gap-8">
          {navLinks.map((items) => {
            return (
              <div key={items.id} className="hover:font-medium">
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
          {user ? (
            <UserAvatar />
          ) : (
            <>
              <Button
                text="Login"
                className="text-primaryStroke"
                Link="/login"
              />
              <Button
                text="SignUp"
                className="text-white bg-primary"
                Link="/signup"
              />
            </>
          )}
        </div>
      </div>

      {/* MOBILE */}

      <div className="md:hidden flex items-center justify-between z-50">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>

        <button onClick={toggleMenu}>
          <IoMenu className="size-7 hover:size-6 transition-all ease-in-out duration-200" />
        </button>

        {open && (
          <>
            <div
              className={`fixed top-0 left-0 w-full h-full bg-white transition-all duration-1000 ease-in-out overflow-hidden z-50
            `}
            >
              <div className="flex justify-between w-11/12 mx-auto my-[25px] ">
                <Link to="/" onClick={toggleMenu}>
                  <img src={logo} alt="logo" />
                </Link>

                <button onClick={toggleMenu}>
                  <IoClose className="size-7 hover:size-6 transition-all ease-in-out duration-200" />
                </button>
              </div>

              <div className="flex flex-col w-11/12 mx-auto">
                <div className="flex gap-4 justify-end">
                  {user ? (
                    <UserAvatar />
                  ) : (
                    <>
                      <Button
                        text="Login"
                        className="text-primary"
                        Link="/login"
                        onClick={toggleMenu}
                      />
                      <Button
                        text="SignUp"
                        className="text-white bg-primary"
                        Link="/signup"
                        onClick={toggleMenu}
                      />
                    </>
                  )}
                </div>
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
