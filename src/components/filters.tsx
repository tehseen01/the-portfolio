"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { Button, TextReveal, Transition } from "./ui";
import { useProjects } from "@/utils/project-context";

const Filters = () => {
  const { projects, setAppliedFilter, appliedFilter, sort, setSort } =
    useProjects();
  const techStack = projects.flatMap((filter) =>
    filter.techStack.map((val) => val.trim())
  );
  const filters = Array.from(new Set(techStack));

  return (
    <div className="flex items-center gap-4 py-8 justify-center max-md:flex-wrap">
      <Transition viewport={{ once: true }}>
        <Button
          className={cn(
            "border border-white/30 px-6 py-2 rounded-full relative",
            appliedFilter === "all" && "text-black border-transparent"
          )}
          onClick={() => setAppliedFilter("all")}
        >
          {appliedFilter === "all" && (
            <motion.span
              transition={{ type: "spring", bounce: 0.3 }}
              exit={{ type: "spring" }}
              layoutId="active-filter"
              className="absolute top-0 left-0 w-full h-full bg-primary -z-10 rounded-full"
            />
          )}
          <TextReveal>All</TextReveal>
        </Button>
      </Transition>
      {filters.map((filter, index) => (
        <Transition
          key={index}
          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
          viewport={{ once: true }}
        >
          <Button
            onClick={() => setAppliedFilter(filter)}
            animate={{ color: appliedFilter === filter ? "black" : "" }}
            transition={{ delay: 0.4 }}
            className="relative border border-white/20 px-3 py-2 rounded-full"
          >
            {appliedFilter === filter && (
              <motion.span
                transition={{ type: "spring", bounce: 0.3 }}
                exit={{ type: "spring" }}
                layoutId="active-filter"
                className="absolute top-0 left-0 w-full h-full bg-primary -z-10 rounded-full"
              />
            )}
            <TextReveal>{filter}</TextReveal>
          </Button>
        </Transition>
      ))}
      <Transition viewport={{ once: true }}>
        <Sort />
      </Transition>
    </div>
  );
};

export default Filters;

const Sort = () => {
  const { setSort, sort } = useProjects();

  return (
    <Button
      className="border border-white/20 px-4 py-2 rounded-full"
      onClick={() => setSort(true)}
    >
      <TextReveal>{sort ? "Sorted" : "Sort"}</TextReveal>
    </Button>
  );
};
