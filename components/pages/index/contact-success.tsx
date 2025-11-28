"use client";

import { motion } from "motion/react";

import { SMALL_HEADER_HEIGHT } from "@/components/layout/header";

type ContactSuccessProps = {
  name: string;
  onReset: () => void;
};

export function ContactSuccess({ name, onReset }: ContactSuccessProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="flex flex-1 flex-col"
      initial={{ opacity: 0 }}
      style={{ minHeight: `calc(100svh - ${SMALL_HEADER_HEIGHT}px)` }}
      transition={{ duration: 0.4 }}
    >
      {/* Mobile Layout */}
      <div className="flex flex-1 flex-col md:hidden">
        {/* Left - Celebratory Typography */}
        <div className="flex flex-1 flex-col justify-center p-6">
          {/* Staggered word reveal */}
          <div className="-space-y-2">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="overflow-hidden"
              initial={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span
                className="text-muted-foreground block font-mono text-xs tracking-widest uppercase"
                style={{ marginBottom: "0.5rem" }}
              >
                Consider yourself heard
              </span>
              <h2
                className="text-foreground/50 leading-[0.85] tracking-tighter"
                style={{ fontSize: "clamp(4rem, 18vw, 6rem)" }}
              >
                Message
              </h2>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="overflow-hidden"
              initial={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2
                className="text-foreground/50 leading-[0.85] tracking-tighter"
                style={{ fontSize: "clamp(4rem, 18vw, 6rem)" }}
              >
                Received
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Mobile Footer */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="border-t p-6"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-muted-foreground mb-4 text-sm">
            Thanks{name ? `, ${name}` : ""}! I&apos;ll be in touch within 24
            hours. Check your inbox for a confirmation.
          </p>
          <button
            className="text-foreground/60 hover:text-foreground text-sm underline transition-colors"
            type="button"
            onClick={onReset}
          >
            Send another message
          </button>
        </motion.div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden flex-1 md:grid md:grid-cols-[4fr_3fr] md:divide-x lg:grid-cols-[4fr_3fr]">
        {/* Left - Celebratory Typography */}
        <div className="flex flex-col justify-center p-8 lg:p-12">
          {/* Staggered word reveal with dynamic sizing */}
          <div className="-space-y-3">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="overflow-hidden"
              initial={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-muted-foreground mb-2 block font-mono text-sm tracking-widest uppercase">
                Consider yourself heard
              </span>
              <h2
                className="text-foreground/50 leading-[0.85] tracking-tighter"
                style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}
              >
                Message
              </h2>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="overflow-hidden"
              initial={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <h2
                className="text-foreground/50 leading-[0.85] tracking-tighter"
                style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}
              >
                Received
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Right - Confirmation */}
        <div className="flex flex-col justify-between p-8 lg:p-12">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="max-w-md"
            initial={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed md:text-xl">
              Thanks{name ? `, ${name}` : ""}! Your message is already making
              its way to my inbox.
            </p>
            <p className="text-muted-foreground mt-6">
              I&apos;ll get back to you within 24 hours. In the meantime,
              you&apos;ll find a confirmation waiting in your inbox.
            </p>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="pt-6"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              className="text-muted-foreground hover:text-foreground font-mono text-sm transition-colors"
              type="button"
              onClick={onReset}
            >
              ← Send another message
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
