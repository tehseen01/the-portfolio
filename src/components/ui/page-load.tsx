"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PageLoadProps {
  hideLoader: boolean;
  setHideLoader: (value: boolean) => void;
}

export const PageLoad = ({ setHideLoader }: PageLoadProps) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const count = setInterval(() => {
      if (counter < 100) {
        setCounter(counter + 2);
      } else {
        clearInterval(count);
      }
    }, 25);

    return () => {
      clearInterval(count);
    };
  }, [counter]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ delay: 2.5, duration: 1, type: "tween" }}
      onAnimationComplete={() => setHideLoader(false)}
      className="fixed top-0 left-0 z-[9999] w-full h-full bg-background"
    >
      <div className="p-4 md:p-10 flex flex-col md:justify-between max-md:gap-8 w-full h-full">
        <span className="font-semibold text-white/40">ThePortfolio</span>
        <div className="flex flex-col max-md:justify-between max-md:h-full">
          <p className="text-3xl md:text-5xl w-full md:w-2/5">
            I develop 3D visuals, user interfaces and web applications
          </p>
          <div className="flex justify-between items-end">
            <span className="text-white/30">Loading...</span>
            <motion.span className="md:text-9xl text-7xl font-semibold md:font-bold">
              {counter}%
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
