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
      {/* Top row - Title bar */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-b px-6 py-4 md:px-8 lg:px-12"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="font-mono text-sm tracking-widest uppercase">
          Curriculum Vitae
        </span>
        <span className="text-muted-foreground font-mono text-sm">
          {resume.location}
        </span>
      </motion.div>

      {/* Main content - Name grid */}
      <div className="grid flex-1 md:grid-cols-2 md:divide-x">
        {/* Left - Name */}
        <div className="flex flex-col justify-center p-6 md:p-8 lg:p-12">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-muted-foreground mb-2 font-mono text-sm tracking-widest uppercase">
              {resume.title}
            </p>
            <h1
              className="leading-[0.9] tracking-tighter"
              style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}
            >
              {resume.name.split(" ")[0]}
              <br />
              <span className="text-muted-foreground">
                {resume.name.split(" ")[1]}
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Right - Intro */}
        <div className="flex flex-col justify-between border-t p-6 md:border-t-0 md:p-8 lg:p-12">
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

          {/* Contact links at bottom */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 pt-6 md:mt-0"
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

      {/* Bottom row - About preview */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="border-t p-6 md:p-8 lg:p-12"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          {resume.about[0]}
        </p>
      </motion.div>
    </section>
  );
}
