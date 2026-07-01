"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

const AuthProvider = ({ children }) => {
  const { checkAuth } = useAuthStore();
  // const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("isCheckingAuth:", isCheckingAuth);
  // console.log("user:", user);
  return children;
};

export default AuthProvider;
