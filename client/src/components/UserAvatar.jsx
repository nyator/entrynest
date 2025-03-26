import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

import { hover } from "../constants/styles";

import { IoPersonCircleSharp } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";

const UserAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      useAuthStore.setState({ isCheckingAuth: false });
      useAuthStore.setState({ isAuthenticated: false });
      useAuthStore.setState({ user: null });
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div
          className={`w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white ${hover}`}
        >
          {[user?.firstname?.charAt(0), user?.lastname?.charAt(0)] || "U"}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ">
          <div className="block px-4 py-2 pb-4 text-sm text-black/70 leading-tight">
            <p>
              {user?.firstname} {user?.lastname}
            </p>
            <p className=" text-clampSm text-black/50">{user?.email}</p>
          </div>
          <div className="border border-gray/40">
            <button
              onClick={() => navigate("/profile")}
              className="block text-start w-full px-4 py-4 text-sm text-gray-700 hover:bg-primary/20 transform-all ease-in-out duration-300 border-b border-gray/40"
            >
              <IoPersonCircleSharp className="inline-block mr-2 size-6 text-black/50" />
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="block text-start rounded-b-md w-full px-4 py-4 text-sm text-gray-700 hover:bg-primary/20 transform-all ease-in-out duration-300"
            >
              <TbLogout2 className="inline-block mr-2 size-6 text-black/50" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
