"use client";
import { motion } from "framer-motion";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-2xl`}
      style={{ top, left }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        // rotate: [0, 360],
      }}
      transition={{ delay, duration: 20, ease: "linear", repeat: Infinity }}
      aria-hidden="true" // This element is purely decorative and should be hidden from assistive technologies
    ></motion.div>
  );
};

export default FloatingShape;
