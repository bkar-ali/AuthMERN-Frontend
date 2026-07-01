"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import ProtectedRoutes from "../providers/ProtectedRoutes";

import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { ImSpinner6 } from "react-icons/im";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, login, error } = useAuthStore();

  const handelLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    // if (!user) return;
    // if (!user.isVerified) {
    //   router.replace("/verify-email");
    // } else {
    //   router.replace("/dashboard");
    // }
  };

  return (
    <ProtectedRoutes>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Welcome Back
          </h2>
          <form onSubmit={handelLogin}>
            <Input
              icon={MdOutlineMail}
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Pass Hide And Show */}
            <div className="relative">
              <Input
                icon={CiLock}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 cursor-pointer text-green-600 hover:text-green-400 transition duration-200"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            {/* Pass Hide And Show */}

            {/* Forget Password */}
            <div className="flex items-center mb-6">
              <Link
                href="/forgetPassword"
                className="text-sm text-green-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            {/* Forget Password */}
            {error && (
              <p className="text-red-500 font-semibold mb-2">{error}</p>
            )}
            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <ImSpinner6 className="w-6 h-6 animate-spin  mx-auto" />
              ) : (
                "Login"
              )}
            </motion.button>
            {/* Submit Button */}
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-green-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </ProtectedRoutes>
  );
};

export default Page;
