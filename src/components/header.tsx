"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { SocialHandle } from "../utils/interface";
import { TextReveal } from "./ui/Typography";
import { useMediaQuery } from "../utils/useMediaQuery";
import Link from "next/link";
import { ArrowUpRight } from "./ui/Icons";
import { Transition } from "./ui/Transitions";

interface HeaderProps {
  social: SocialHandle[];
}
const Header = ({ social }: HeaderProps) => {
  const [isActive, setIsActive] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const MotionLink = motion.create(Link);

  const variants = {
    open: {
      clipPath: `inset(0% 0% 0% 0% round ${isMobile ? 0 : "24px"})`,
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      clipPath: `inset(5% 12% 93% 85% round ${isMobile ? 0 : "24px"})`,
      transition: {
        duration: 0.75,
        delay: 0.35,
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.header className="fixed top-0 md:mt-12 md:mr-12 right-0 z-20">
      <Transition className="fixed md:top-8 top-6 md:left-8 left-6 z-30 ">
        <Link href={"/"}>
          <TextReveal className="font-semibold ">ThePortfolio</TextReveal>
        </Link>
      </Transition>
      <motion.div
        initial={false}
        animate={isActive ? "open" : "closed"}
        variants={variants}
        className="absolute top-0 right-0 md:-top-6 md:-right-6 w-dvw md:w-[480px] h-dvh md:h-[calc(100dvh_-_2.5rem)] bg-primary"
      >
        {isActive && (
          <nav className="flex justify-between flex-col w-full h-full px-10 pt-[100px] pb-[50px]">
            <div className="flex gap-2 flex-col">
              {navLinks.map((link, i) => {
                const { title, href } = link;
                return (
                  <div
                    key={`b_${i}`}
                    className=""
                    onClick={() => setIsActive(false)}
                  >
                    <Link
                      href={href}
                      className="flex flex-wrap overflow-hidden"
                    >
                      <motion.div
                        variants={perspective}
                        custom={i}
                        initial="initial"
                        animate="enter"
                        whileHover="whileHover"
                        whileTap="whileHover"
                        exit="exit"
                        className="text-5xl text-background flex items-center justify-between"
                      >
                        <motion.span
                          variants={{
                            initial: { x: -20 },
                            whileHover: { x: 0 },
                          }}
                        >
                          <ArrowUpRight />
                        </motion.span>
                        <motion.span
                          variants={{
                            initial: { x: 0 },
                            whileHover: { x: 20 },
                          }}
                        >
                          {title}
                        </motion.span>
                      </motion.div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <motion.div className="flex flex-wrap">
              {social.map((link, i) => {
                const { platform, _id, url } = link;
                return (
                  <MotionLink
                    href={url}
                    target="_blank"
                    className=" w-1/2 mt-1 text-background"
                    variants={slideIn}
                    custom={i}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    key={_id}
                  >
                    <TextReveal>{platform}</TextReveal>
                  </MotionLink>
                );
              })}
            </motion.div>
          </nav>
        )}
      </motion.div>
      <Button
        isActive={isActive}
        toggleMenu={() => {
          setIsActive(!isActive);
        }}
      />
    </motion.header>
  );
};

export default Header;

function Button({
  isActive,
  toggleMenu,
}: {
  isActive: boolean;
  toggleMenu: () => void;
}) {
  return (
    <div className="absolute md:top-0 top-4 right-4 md:right-0 w-[100px] h-10 rounded-full overflow-hidden cursor-pointer">
      <motion.div
        className="relative w-full h-full"
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="bg-primary h-full w-full grid place-items-center text-black"
          onClick={() => {
            toggleMenu();
          }}
        >
          <TextReveal>Menu</TextReveal>
        </motion.div>
        <motion.div
          className="bg-black h-full w-full grid place-items-center"
          onClick={() => {
            toggleMenu();
          }}
        >
          <TextReveal>Close</TextReveal>
        </motion.div>
      </motion.div>
    </div>
  );
}

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Services",
    href: "#services",
  },
  {
    title: "Projects",
    href: "#projects",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

const perspective = {
  initial: {
    y: 50,
  },
  enter: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
      opacity: { duration: 0.35 },
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};

const slideIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};
