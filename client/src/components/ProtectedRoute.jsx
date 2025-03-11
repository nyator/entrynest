import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  console.log("ProtectedRoute - isCheckingAuth:", isCheckingAuth);
  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
  console.log("ProtectedRoute - user:", user);

  // Add this check first
  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  // Handle authentication
  if (!isAuthenticated) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" replace />;
  }

  // Handle authorization
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    toast.error("You do not have permission to access this page");
    return <Navigate to="/" replace />;
  }

  // Return outlet for nested routes
  return <Outlet />;
};

export default ProtectedRoute;