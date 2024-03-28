"use client";

import { useCursorVariants } from "@/utils/context";
import {
  useMotionValue,
  useSpring,
  motion,
  AnimationProps,
  Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";

export const Cursor = () => {
  const { variant } = useCursorVariants();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 100 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        // Update position only on animation frame
        cursorX.set(e.clientX - (variant === "PROJECT" ? 32 : 8)); // Adjust offset based on variant
        cursorY.set(e.clientY - (variant === "PROJECT" ? 32 : 8));
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [variant]);

  const variants: Variants = {
    DEFAULT: {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: "1px solid white",
    },
    PROJECT: {
      height: 100,
      width: 100,
      mixBlendMode: "unset",
    },
    BUTTON: {
      opacity: 0,
    },
    TEXT: {
      height: 100,
      width: 100,
      backgroundColor: "transparent",
      border: "1px solid white",
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 bg-white mix-blend-difference z-50 rounded-full pointer-events-none grid place-items-center max-md:hidden"
      variants={variants}
      animate={variant}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      {variant === "PROJECT" && (
        <div className="text-black">
          <ArrowUpRight size={28} />
        </div>
      )}
    </motion.div>
  );
};
