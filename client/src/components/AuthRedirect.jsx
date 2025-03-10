import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AuthRedirect = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      if (
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/forgot-password" ||
        location.pathname === "/verify-email"
      ) {
        navigate("/jobs");
      }
    }
  }, [user, navigate, location.pathname]);

  return null;
};

export default AuthRedirect;
