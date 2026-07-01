import { create } from "zustand";
import axios from "axios";
import { getStrength } from "../utils/PasswordStrength";

const apiUrl = "https://authmern-backend-production.up.railway.app/api/auth";
// const apiUrl = "http://localhost:5000/api/auth"; // Change this to your backend URL

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false, // User Is Loged in ?
  error: null,
  isLoading: false,
  isCheckingAuth: true, // When webiste open check if user Loged in
  message: null,
  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }

      if (getStrength(password) <= 3) {
        throw new Error("Password must be strong");
      }
      const res = await axios.post(`${apiUrl}/signup`, {
        email,
        password,
        name,
      });
      set({ user: res.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Signup failed",
        isLoading: false,
      });

      throw error;
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${apiUrl}/verify-email`, { code });
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Error Verifying email",
        isLoading: false,
      });

      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const res = await axios.get(`${apiUrl}/checkAuth`);
      set({
        user: res.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        error: null,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Login failed",
        isLoading: false,
      });

      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${apiUrl}/logout`);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Logout failed",
        isLoading: false,
      });
    }
  },
  forgetPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${apiUrl}/forget-password`, { email });
      set({
        message: res.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to send password reset email",
        isLoading: false,
      });
    }
  },
  resetPassword: async (token, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      if (getStrength(newPassword) < 3) {
        throw new Error("Password must be strong");
      }
      const res = await axios.post(`${apiUrl}/reset-password/${token}`, {
        newPassword,
      });
      set({ message: res.data.message, isLoading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to reset password",
        isLoading: false,
      });
      throw error;
    }
  },
}));
