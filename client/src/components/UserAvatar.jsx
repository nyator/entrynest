import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

import { hover } from "../constants/styles";

const UserAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const navigate = useNavigate();

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

  return (
    <div className="relative">
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
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="">
            <button
              onClick={handleLogout}
              className="block rounded-t-md w-full px-4 py-4 text-sm text-gray-700 hover:bg-primary/20 transform-all ease-in-out duration-300 border-b border-gray/40"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block rounded-b-md w-full px-4 py-4 text-sm text-gray-700 hover:bg-primary/20 transform-all ease-in-out duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
