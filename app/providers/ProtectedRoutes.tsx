"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isCheckingAuth) return;

    if (!isAuthenticated) {
      router.replace("/login");
    } else if (!user?.isVerified) {
      router.push("/verify-email");
    } else {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router, isCheckingAuth, user?.isVerified]);

  if (isCheckingAuth) return <LoadingSpinner />;
  return children;
};

export default ProtectedRoutes;
