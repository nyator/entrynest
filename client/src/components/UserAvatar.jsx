import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

import { hover } from "../constants/styles";

import { IoPersonCircleSharp } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";

const UserAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user?.avatar) {
      const avatarUrl = user.avatar.startsWith("http")
        ? user.avatar
        : `${import.meta.env.VITE_API_URL}${user.avatar}`;
      setAvatarUrl(avatarUrl);
    }
  }, [user?.avatar]);

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
        {user?.avatar ? (
          <img
            src={avatarUrl}
            alt={
              user?.firstname ? `${user.firstname}'s avatar` : "Default avatar"
            }
            className={`w-12 h-12 rounded-full object-cover border-2 border-gray ${hover}`}
          />
        ) : (
          <div
            className={`w-12 h-12 rounded-full shadow-sm bg-primary flex items-center justify-center text-white ${hover}`}
          >
            {user?.firstname && user?.lastname
              ? `${user.firstname[0]}${user.lastname[0]}`
              : "U"}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="block px-4 py-2  text-sm text-black/70 leading-tight">
            {user?.companyName && (
              <p className="text-clampSm bg-primary/50 text-white py-1 px-2 rounded-sm text-center">
                {user.companyName}
              </p>
            )}

            <p className="text-clampSm font-semibold text-black/80">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="text-clampSm text-black/50">{user?.email}</p>
            <p className="text-clampSm text-primary capitalize">{user.role}</p>
          </div>
          <div className="border border-gray/40">
            <button
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
              className="block text-start w-full px-4 py-4 text-sm text-gray-700 hover:bg-gray/30 transform-all ease-in-out duration-300 border-b border-gray/40"
            >
              <IoPersonCircleSharp className="inline-block mr-2 size-6 text-blue-400" />
              Edit Profile
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block text-start rounded-b-md w-full px-4 py-4 text-sm text-gray-700 hover:bg-gray/30 transform-all ease-in-out duration-300"
            >
              <TbLogout2 className="inline-block mr-2 size-5 text-red-600" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
