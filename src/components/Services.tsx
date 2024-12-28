"use client";

import Link from "next/link";

import { Service } from "../utils/interface";
import { SlideIn, Transition } from "./ui/Transitions";
import { SectionHeading } from "./ui/Typography";
import { HoverImage } from "./ui/HoverImage";

interface ServiceProps {
  services: Service[];
}

function Services({ services }: ServiceProps) {
  return (
    <section className="px-2 py-20 relative" id="services">
      <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10 opacity-50" />
      <SectionHeading className="md:pl-16 overflow-hidden tracking-tighter">
        <SlideIn className="text-white/40">Here&apos;s how</SlideIn> <br />
        <SlideIn>I can help you</SlideIn>
      </SectionHeading>
      <div className="mx-auto pt-10">
        {services.map((service) => (
          <Transition key={service._id}>
            <HoverImage
              heading={service.name}
              price={service.charge}
              imgSrc={service.image.url}
              subheading={service.desc}
            />
          </Transition>
        ))}
      </div>
      <Transition className="flex items-center py-10 md:hidden">
        <Link
          href={"#contact"}
          className="p-4 rounded-full border border-white/50"
        >
          <span>Discuss the project</span>
        </Link>
      </Transition>
    </section>
  );
}

export default Services;
