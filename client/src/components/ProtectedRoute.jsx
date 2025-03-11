import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return null; // or loading spinner
  }

  if (!isAuthenticated) {
    toast.dismiss(); // Dismiss any existing toasts
    toast.error("Please login to access this page");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    toast.error("You do not have permission to access this page");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
