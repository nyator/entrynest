import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      toast.dismiss(); // Dismiss any existing toasts
      toast.error("Please login to access this page");
    } else if (
      !isCheckingAuth &&
      allowedRoles &&
      !allowedRoles.includes(user?.role)
    ) {
      toast.dismiss(); // Dismiss any existing toasts
      toast.error("You do not have permission to access this page");
    }
  }, [isCheckingAuth, isAuthenticated, allowedRoles, user]);

  if (isCheckingAuth) {
    console.log("Checking authentication...");
    return <div>Loading...</div>; // or loading spinner
  }

  if (!isAuthenticated) {
    console.log("User is not authenticated");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    console.log(
      `User does not have permission to access this page. User role: ${user?.role}`
    );
    toast.error("You do not have permission to access this page");
    return <Navigate to="/" replace />;
  }

  console.log("User is authenticated and has permission to access this page");
  return (
    <>
      <Outlet />
      {console.log("Outlet rendered")}
    </>
  );
};

export default ProtectedRoute;
