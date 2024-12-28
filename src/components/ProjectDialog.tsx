"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";

import { Project } from "../utils/interface";
import { ExternalLink, Github, XMark } from "./ui/Icons";

interface DialogProps {
  selectedProject: Project;
  setSelectedProject: Dispatch<SetStateAction<Project | null>>;
}

const ProjectDialog = ({
  selectedProject,
  setSelectedProject,
}: DialogProps) => {
  return (
    <motion.div
      layoutId={selectedProject._id}
      className="fixed inset-0 z-50 grid place-items-center"
      onClick={(e) => e.target === e.currentTarget && setSelectedProject(null)}
    >
      <div className="bg-black w-11/12 md:w-1/2 h-4/5 md:h-[90%] overflow-hidden rounded-xl">
        <div className="relative ">
          <button
            className="absolute top-4 right-4 bg-black size-8 rounded-full border border-white/40 grid place-items-center text-white"
            onClick={() => setSelectedProject(null)}
          >
            <XMark />
          </button>
          <img
            src={selectedProject.image.url}
            width={300}
            height={300}
            alt={selectedProject.title}
            className="w-full h-full aspect-video md:aspect-[12/6] object-cover object-center"
          />
          <div className="p-3">
            <div className="flex items-center justify-between">
              <h5 className="text-4xl font-bold">{selectedProject.title}</h5>
              <div className="flex items-center gap-4">
                <Link href={selectedProject.githuburl}>
                  <Github />
                </Link>
                <Link href={selectedProject.liveurl}>
                  <ExternalLink />
                </Link>
              </div>
            </div>
            <div className="py-3 flex items-center gap-4">
              {selectedProject.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 border border-white/40 rounded-2xl text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-white/50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium, tempora. Officiis eveniet harum nemo sed sint
              distinctio fugiat earum cumque aliquid in magnam nam odio
              molestias architecto veniam, asperiores voluptates?
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDialog;
