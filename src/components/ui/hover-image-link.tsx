"use client";

import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

import { useRef } from "react";
import { TextReveal } from "./typography";

interface LinkProps {
  heading: string;
  imgSrc: string;
  subheading: string;
  href: string;
  price: string;
}

export const HoverImageLink = ({
  heading,
  imgSrc,
  subheading,
  href,
  price,
}: LinkProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const MotionLink = motion(Link);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const rect = ref.current!.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <MotionLink
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-white/10 py-4 transition-colors duration-500 md:py-6 md:px-16 hover:bg-white/5"
    >
      <div>
        <div className="flex items-center justify-between">
          <h4 className="relative z-10 block text-2xl sm:text-4xl font-semibold md:font-bold md:text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl">
            {heading}
          </h4>
          <span className="md:text-2xl text-foreground/50 md:hidden">
            {price}
          </span>
        </div>
        <p className="relative z-10 mt-2 block md:text-base text-sm text-foreground/50 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </p>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64 max-md:hidden"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="z-10 md:p-4 grid justify-items-end gap-2 max-md:hidden"
      >
        <span className="md:text-2xl text-neutral-50 pr-1">{price}</span>
        <div className="border border-white/50 rounded-full py-2 px-4 text-white">
          <TextReveal>Discuss the project</TextReveal>
        </div>
      </motion.div>
    </MotionLink>
  );
};
