"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";

import { cn } from "../../utils/cn";

interface ParallaxProps {
  children: ReactNode;
  baseVelocity: number;
  className?: string;
  wrapperClassName?: string;
}

export function ParallaxText({
  children,
  baseVelocity,
  className,
  wrapperClassName,
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 70,
    stiffness: 200,
  });
  const skewVelocity = useSpring(scrollVelocity, {
    stiffness: 80,
    damping: 45,
  });

  const skewVelocityFactor = useTransform(
    skewVelocity,
    [-1000, 1000],
    [-30, 30]
  );

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    const adjustedBaseVelocity = baseVelocity * 0.1;
    let moveBy =
      directionFactor.current * adjustedBaseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn("w-full overflow-hidden", wrapperClassName)}>
      <motion.div
        className={cn(
          "w-max flex items-center justify-center gap-2 md:py-3 py-1",
          className
        )}
        style={{ x, skew: skewVelocityFactor }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
