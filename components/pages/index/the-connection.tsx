"use client";

import { useRef, useState } from "react";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

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

function SelectableCell({
  children,
  isSelected,
  onSelect,
}: {
  children: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { ref, bgX, bgY, handlers } = useDirectionalHover<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      className={`relative overflow-hidden border border-neutral-800 px-4 py-3 text-sm transition-colors ${
        isSelected
          ? "bg-foreground text-background"
          : "hover:text-foreground text-neutral-500"
      }`}
      type="button"
      onClick={onSelect}
      onMouseEnter={handlers.onMouseEnter}
      onMouseLeave={handlers.onMouseLeave}
    >
      {!isSelected && (
        <motion.div
          className="bg-muted absolute inset-0"
          style={{ translateX: bgX, translateY: bgY }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function FormInput({
  label,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col border border-neutral-800">
      <label className="border-b border-neutral-800 px-4 py-2 text-xs tracking-widest text-neutral-500 uppercase">
        {label}
      </label>
      <input
        className="bg-transparent px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none"
        placeholder={placeholder}
        required={required}
        type={type}
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
    <div className="border border-neutral-800">
      <div className="border-b border-neutral-800 px-4 py-2 text-xs tracking-widest text-neutral-500 uppercase">
        {monthName} {currentYear}
      </div>
      <div className="grid grid-cols-7">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div
            key={i}
            className="border-b border-r border-neutral-800 p-2 text-center text-xs text-neutral-600 last:border-r-0"
          >
            {day}
          </div>
        ))}
        {days.map((day, i) => (
          <button
            key={i}
            className={`border-b border-r border-neutral-800 p-2 text-center text-sm transition-colors last:border-r-0 ${
              day === null
                ? "cursor-default"
                : day === selectedDate
                  ? "bg-foreground text-background"
                  : day < today.getDate()
                    ? "cursor-not-allowed text-neutral-700"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
            } ${i >= days.length - (days.length % 7 || 7) ? "border-b-0" : ""}`}
            disabled={day === null || day < today.getDate()}
            type="button"
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
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll animations
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const titleX = useTransform(scrollYProgress, [0.1, 0.25], [-50, 0]);
  const formOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const formY = useTransform(scrollYProgress, [0.15, 0.3], [60, 0]);

  const { ref: submitRef, bgX, bgY, handlers } = useDirectionalHover<HTMLButtonElement>();

  return (
    <section
      ref={sectionRef}
      className="bg-background text-foreground relative grid grid-cols-12 gap-x-8 px-6 md:px-8 lg:px-12"
      style={{ minHeight: `calc(100svh - ${HEADER_HEIGHT}px)` }}
    >
      {/* Left column - Vertical text */}
      <motion.div
        className="col-span-2 flex items-center justify-center border-r border-neutral-800"
        style={{ opacity: titleOpacity, x: titleX }}
      >
        <h2
          className="text-[clamp(3rem,8vw,6rem)] font-bold tracking-tighter text-neutral-800"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          CONNECT
        </h2>
      </motion.div>

      {/* Right column - Form */}
      <motion.div
        className="col-span-10 flex flex-col justify-center py-16 pl-8"
        style={{ opacity: formOpacity, y: formY }}
      >
        {/* Header */}
        <div className="mb-12">
          <h3 className="mb-2 text-4xl font-bold tracking-tight">
            Schedule a Conversation
          </h3>
          <p className="text-neutral-500">
            Let&apos;s discuss your next project. Pick a time that works for you.
          </p>
        </div>

        <form className="space-y-8">
          {/* Name & Email row */}
          <div className="grid grid-cols-2 gap-0">
            <FormInput label="Name" placeholder="Your name" required />
            <FormInput
              label="Email"
              placeholder="your@email.com"
              required
              type="email"
            />
          </div>

          {/* Project Type */}
          <div>
            <div className="mb-3 text-xs tracking-widest text-neutral-500 uppercase">
              Project Type
            </div>
            <div className="grid grid-cols-4 gap-0">
              {PROJECT_TYPES.map((type) => (
                <SelectableCell
                  key={type}
                  isSelected={projectType === type}
                  onSelect={() => setProjectType(type)}
                >
                  {type}
                </SelectableCell>
              ))}
            </div>
          </div>

          {/* Date & Time row */}
          <div className="grid grid-cols-2 gap-8">
            {/* Calendar */}
            <div>
              <div className="mb-3 text-xs tracking-widest text-neutral-500 uppercase">
                Select Date
              </div>
              <CalendarGrid
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>

            {/* Time slots */}
            <div>
              <div className="mb-3 text-xs tracking-widest text-neutral-500 uppercase">
                Select Time
              </div>
              <div className="grid grid-cols-2 gap-0">
                {TIME_SLOTS.map((time) => (
                  <SelectableCell
                    key={time}
                    isSelected={selectedTime === time}
                    onSelect={() => setSelectedTime(time)}
                  >
                    {time}
                  </SelectableCell>
                ))}
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col border border-neutral-800">
            <label className="border-b border-neutral-800 px-4 py-2 text-xs tracking-widest text-neutral-500 uppercase">
              Message
            </label>
            <textarea
              className="min-h-32 resize-none bg-transparent px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none"
              placeholder="Tell me about your project..."
              rows={4}
            />
          </div>

          {/* Submit */}
          <button
            ref={submitRef}
            className="relative w-full overflow-hidden border border-neutral-800 py-4 text-sm font-medium tracking-widest uppercase transition-colors hover:bg-foreground hover:text-background"
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
        </form>

        {/* Footer note */}
        <p className="mt-8 text-xs text-neutral-600">
          I&apos;ll respond within 24 hours. For urgent inquiries, reach out directly
          at{" "}
          <a
            className="text-neutral-400 underline hover:text-neutral-200"
            href="mailto:hello@drucial.com"
          >
            hello@drucial.com
          </a>
        </p>
      </motion.div>
    </section>
  );
}
