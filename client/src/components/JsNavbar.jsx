import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import UserAvatar from "./UserAvatar";

const navLinks = [
  { title: "Browse All Jobs", href: "/jobs", id: 1 },
  { title: "View Employers", href: "/view-employers", id: 2 },
  { title: "Resources", href: "/resources", id: 3 },
  //   { title: "Support", href: "/support", id: 4 },
];

const JsNavbar = () => {
  const { isAuthenticated } = useAuthStore(); // Use hook directly

  return (
    <>
      <div className="md:flex hidden items-center justify-between">
        <Link to="/">
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
      <div className="md:hidden flex items-center justify-between">
        <Link to="/">
          <img src="/logo.svg" alt="logo" />
        </Link>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default JsNavbar;
