import React, { createContext, useContext, useEffect } from "react";
import { useAuthStore } from "../store/authStore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ isCheckingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
