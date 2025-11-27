"use client";

import { motion } from "motion/react";

import { HEADER_HEIGHT, SMALL_HEADER_HEIGHT } from "@/components/layout/header";
import { useViewport } from "@/components/providers/viewport-provider";
import { resume } from "@/data/resume";

export function CVHero() {
  const { isMobile } = useViewport();

  return (
    <section
      className="grid border-x"
      style={{
        minHeight: isMobile
          ? `calc(100svh - ${SMALL_HEADER_HEIGHT}px)`
          : `calc(100svh - ${HEADER_HEIGHT}px)`,
      }}
    >
      {/* Mobile Layout */}
      <div className="flex flex-1 flex-col md:hidden">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 flex-col"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex w-max flex-1 items-end border-r p-6">
            <h1
              className="leading-[0.6] tracking-tighter"
              style={{ fontSize: "clamp(7.5rem, 25vw, 10rem)" }}
            >
              {resume.name.split(" ")[0]}
            </h1>
          </div>
          <div className="border-y py-2">
            <p className="text-muted-foreground my-3 text-center font-mono text-xs leading-none tracking-widest uppercase">
              {resume.title}
            </p>
          </div>
          <div className="w-max flex-1 self-end border-l p-6">
            <h1
              className="text-muted-foreground text-right leading-[0.8] tracking-tighter"
              style={{ fontSize: "clamp(7.5rem, 25vw, 10rem)" }}
            >
              {resume.name.split(" ")[1]}
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden flex-1 md:grid md:grid-cols-2 md:divide-x">
        {/* Left - Name */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 flex-col"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex w-max flex-1 items-end border-r p-8 lg:p-12">
            <h1
              className="leading-[0.6] tracking-tighter"
              style={{ fontSize: "clamp(8rem, 12vw, 12rem)" }}
            >
              {resume.name.split(" ")[0]}
            </h1>
          </div>
          <div className="border-y py-3">
            <p className="text-muted-foreground text-center font-mono text-sm leading-none tracking-widest uppercase">
              {resume.title}
            </p>
          </div>
          <div className="w-max flex-1 self-end border-l p-8 lg:p-12">
            <h1
              className="text-muted-foreground text-right leading-[0.8] tracking-tighter"
              style={{ fontSize: "clamp(8rem, 12vw, 12rem)" }}
            >
              {resume.name.split(" ")[1]}
            </h1>
          </div>
        </motion.div>

        {/* Right - Intro */}
        <div className="flex flex-col justify-between p-8 lg:p-12">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="max-w-md"
            initial={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed md:text-xl">
              {resume.intro}
            </p>
            <p className="text-muted-foreground mt-6">
              Currently building{" "}
              <a
                className="text-foreground hover:text-primary border-b border-current pb-0.5 transition-colors"
                href={resume.currentProject.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {resume.currentProject.name}
              </a>
            </p>
          </motion.div>

          {/* Contact links */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-x-6 gap-y-2 pt-6"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {resume.contact.slice(0, 3).map((link) => (
              <a
                key={link.label}
                className="text-muted-foreground hover:text-foreground font-mono text-sm transition-colors"
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.display}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
