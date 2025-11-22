"use client";

import { useRef, useState } from "react";

import { motion, useScroll, useTransform } from "motion/react";

import { HEADER_HEIGHT } from "@/components/layout/header";
import { useDirectionalHover } from "@/hooks/use-directional-hover";

const PROJECT_TYPES = ["Design", "Development", "Both", "Other"] as const;

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];

type TimeSlot = (typeof TIME_SLOTS)[number];

function FormInput({
  label,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="border-border flex flex-col border">
      <label className="border-border text-muted-foreground border-b px-4 py-2 text-xs tracking-widest uppercase">
        {label}
      </label>
      <input
        className="text-foreground placeholder:text-foreground/40 bg-transparent px-4 py-3 text-sm focus:outline-none"
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function CalendarGrid({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: number | null;
  onSelectDate: (day: number) => void;
}) {
  // Simple calendar for current month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthName = today.toLocaleString("default", { month: "long" });

  const days = [];
  // Add empty cells for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  // Add the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="border-border border">
      <div className="border-border flex items-stretch border-b text-xs tracking-widest uppercase">
        <span className="text-muted-foreground flex-1 px-4 py-2">
          Select Date
        </span>
        <span className="border-border text-muted-foreground/50 border-l px-4 py-2">
          {monthName} {currentYear}
        </span>
      </div>
      <div className="grid grid-cols-7">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div
            key={i}
            className={`border-border text-muted-foreground border-b p-2 text-center text-xs ${i < 6 ? "border-r" : ""}`}
          >
            {day}
          </div>
        ))}
        {days.map((day, i) => (
          <button
            key={i}
            disabled={day === null || day < today.getDate()}
            type="button"
            className={`border-border p-2 text-center text-sm transition-colors ${
              (i + 1) % 7 !== 0 ? "border-r" : ""
            } ${
              i < days.length - 7 ||
              (days.length % 7 !== 0 && i < days.length - (days.length % 7))
                ? "border-b"
                : ""
            } ${
              day === null
                ? "cursor-default"
                : day === selectedDate
                  ? "bg-foreground text-background"
                  : day < today.getDate()
                    ? "text-foreground/30 cursor-not-allowed"
                    : "text-foreground/60 hover:bg-muted hover:text-foreground"
            }`}
            onClick={() => day && onSelectDate(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TheConnection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [message, setMessage] = useState("");

  // Format date for preview
  const today = new Date();
  const formattedDate = selectedDate
    ? `${today.toLocaleString("default", { month: "long" })} ${selectedDate}, ${today.getFullYear()}`
    : null;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll animations
  const rightOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0.2, 0.35], [100, 0]);
  const formOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const formY = useTransform(scrollYProgress, [0.25, 0.4], [60, 0]);

  const {
    ref: submitRef,
    bgX,
    bgY,
    handlers,
  } = useDirectionalHover<HTMLButtonElement>();

  return (
    <section
      ref={sectionRef}
      className="bg-background text-foreground relative grid grid-cols-12 overflow-x-hidden"
      style={{ minHeight: `calc(100svh - ${HEADER_HEIGHT / 2}px)` }}
    >
      {/* Left column - Form */}
      <motion.div
        className="col-span-7 flex flex-col justify-center p-8"
        style={{ opacity: formOpacity, y: formY }}
      >
        {/* Header */}
        <h3 className="text-8xl leading-none font-bold tracking-tight">
          The Conversation
        </h3>

        <form className="space-y-8">
          {/* Name & Email row */}
          <div className="grid grid-cols-2 gap-0">
            <FormInput
              required
              label="Name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormInput
              required
              label="Email"
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Project Type */}
          <div className="border-border border">
            <div className="border-border text-muted-foreground border-b px-4 py-2 text-xs tracking-widest uppercase">
              Project Type
            </div>
            <div className="grid grid-cols-4">
              {PROJECT_TYPES.map((type, i) => (
                <button
                  key={type}
                  type="button"
                  className={`border-border relative overflow-hidden px-4 py-3 text-sm transition-colors ${
                    i < PROJECT_TYPES.length - 1 ? "border-r" : ""
                  } ${
                    projectType === type
                      ? "bg-foreground text-background"
                      : "hover:text-foreground text-muted-foreground"
                  }`}
                  onClick={() => setProjectType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time row */}
          <div className="grid grid-cols-2 gap-8">
            {/* Calendar */}
            <CalendarGrid
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />

            {/* Time slots */}
            <div className="border-border self-start border-t border-r border-l">
              <div className="border-border text-muted-foreground border-b px-4 py-2 text-xs tracking-widest uppercase">
                Select Time
              </div>
              <div className="grid grid-cols-2">
                {TIME_SLOTS.map((time, i) => {
                  const isLastCol = i % 2 === 1;

                  return (
                    <button
                      key={time}
                      type="button"
                      className={`border-border relative overflow-hidden border-b px-4 py-3 text-sm transition-colors ${
                        !isLastCol ? "border-r" : ""
                      } ${
                        selectedTime === time
                          ? "bg-foreground text-background"
                          : "hover:text-foreground text-muted-foreground"
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="border-border flex flex-col border">
            <label className="border-border text-muted-foreground border-b px-4 py-2 text-xs tracking-widest uppercase">
              Message
            </label>
            <textarea
              className="text-foreground placeholder:text-foreground/40 min-h-32 resize-none bg-transparent px-4 py-3 text-sm focus:outline-none"
              placeholder="Tell me about your project..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </form>
      </motion.div>

      {/* Right column - Live message preview */}
      <motion.div
        className="border-border col-span-5 flex flex-col border-l"
        style={{ opacity: rightOpacity, x: rightX }}
      >
        <div className="flex-1">
          {/* Email header */}
          <div className="border-border space-y-2 border-b p-4">
            <div className="flex gap-2 text-xs">
              <span className="text-foreground/40">From:</span>
              <span className="text-foreground/80">
                {name || "Your Name"} &lt;{email || "your@email.com"}&gt;
              </span>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="text-foreground/40">To:</span>
              <span className="text-foreground/80">hello@drucial.com</span>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="text-foreground/40">Subject:</span>
              <span className="text-foreground/80">
                {projectType
                  ? `${projectType} Project Inquiry`
                  : "New Project Inquiry"}
              </span>
            </div>
          </div>

          {/* Email body */}
          <div className="text-foreground/60 p-4 text-sm leading-relaxed">
            <p className="mb-4">Hi Drucial,</p>

            <p className="mb-4">
              {message || "I'd like to discuss a potential project with you..."}
            </p>

            {(selectedDate || selectedTime) && (
              <p className="mb-4">
                I&apos;m available to chat on{" "}
                <span className="text-foreground">
                  {formattedDate || "___"}
                </span>
                {selectedTime && (
                  <>
                    {" "}
                    at <span className="text-foreground">{selectedTime}</span>
                  </>
                )}
                .
              </p>
            )}

            <p className="mb-4">Looking forward to hearing from you.</p>

            <p>
              Best,
              <br />
              <span className="text-foreground">{name || "___"}</span>
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-auto">
          <button
            ref={submitRef}
            className="hover:bg-foreground hover:text-background border-border relative w-full overflow-hidden border-t py-4 text-sm font-medium tracking-widest uppercase transition-colors"
            type="submit"
            onMouseEnter={handlers.onMouseEnter}
            onMouseLeave={handlers.onMouseLeave}
          >
            <motion.div
              className="bg-foreground absolute inset-0"
              style={{ translateX: bgX, translateY: bgY }}
            />
            <span className="relative z-10">Send Request</span>
          </button>
        </div>
      </motion.div>

      {/* Full-width footer */}
      <div className="border-border col-span-12 grid grid-cols-12 border-t">
        <div className="col-span-7 px-8 py-4"></div>
        <div className="col-span-5 flex items-center justify-center px-8 py-4">
          <p className="text-foreground/40 text-xs">
            I&apos;ll respond within 24 hours. For urgent inquiries, reach out
            directly at{" "}
            <a
              className="text-foreground/60 hover:text-foreground underline"
              href="mailto:hello@drucial.com"
            >
              hello@drucial.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
