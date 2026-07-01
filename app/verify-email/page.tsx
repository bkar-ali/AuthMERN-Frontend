"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const Page = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyEmail, isLoading, error } = useAuthStore();
  const router = useRouter();

  const handelPasted = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    const newcode = [...code];
    pasted.split("").forEach((digit, index) => {
      newcode[index] = digit;
    });
    setCode(newcode);
    const nextIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handelChange = (index, value) => {
    // Remove spaces
    value = value.replace(/\s/g, "");

    // Allow only numbers
    if (/\D/.test(value)) return;

    const newCode = [...code];

    // Handle pasted conten
    if (value.length > 1) {
      // if Pasted Code More Than 6 Digits
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFocusIndex = newCode.findLastIndex((d) => d !== "");
      const focusIndex = lastFocusIndex < 5 ? lastFocusIndex + 1 : 5;
      //TODO  ?. --> Optional Chanining --> if ele not exsist Don't return error
      inputRefs.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handelKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handelSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const verificationCode = code.join("");
      try {
        await verifyEmail(verificationCode);
        toast.success("Email verified successfully");
        router.push("/dashboard");
      } catch (error) {
        console.log(error);
        toast.error("Invalid verification code. Please try again.");
      }

      console.log(`Verification code entered: ${verificationCode}`); // Debug log to check the code value
    },
    [verifyEmail, code, router],
  );

  //! Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((d) => d !== "")) {
      handelSubmit(new Event("submit"));
    }
  }, [code, handelSubmit]);

  return (
    // <div className="max-w-md w-full backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl p-10 rounded-2xl shadow-xl overflow-hidden"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        Verify Your Email
      </h2>
      <p className="text-center text-gray-300 mb-6">
        Enter the 6-digit code sent to your email address.
      </p>
      <form onSubmit={handelSubmit} className="space-y-6">
        <div className="flex justify-between">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={digit}
              onPaste={handelPasted}
              onChange={(e) => handelChange(index, e.target.value)}
              onKeyDown={(e) => handelKeyDown(index, e)}
              maxLength={1}
              className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading || code.some((digit) => !digit)}
          className="w-full bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </motion.button>
      </form>
    </motion.div>
    // </div>
  );
};

export default Page;
