"use client";

import type { MotionValue } from "motion/react";
import { motion, useMotionValue, useTransform } from "motion/react";

import { CalendarGrid } from "@/components/ui/calendar-grid";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/components/ui/form-textarea";
import type { ProjectType } from "@/components/ui/project-type-selector";
import { ProjectTypeSelector } from "@/components/ui/project-type-selector";
import type { TimeSlot } from "@/components/ui/time-slot-picker";
import { TimeSlotPicker } from "@/components/ui/time-slot-picker";

export type ContactFormData = {
  name: string;
  email: string;
  projectType: ProjectType | null;
  selectedDate: number | null;
  selectedTime: TimeSlot | null;
  message: string;
};

type ContactFormProps = {
  formData: ContactFormData;
  onFormDataChange: (data: Partial<ContactFormData>) => void;
  scrollYProgress?: MotionValue<number>;
};

export function ContactForm({
  formData,
  onFormDataChange,
  scrollYProgress,
}: ContactFormProps) {
  const {
    name,
    email,
    projectType,
    selectedDate,
    selectedTime,
    message,
  } = formData;

  // Default motion value for when scrollYProgress isn't provided
  const defaultProgress = useMotionValue(1);
  const progress = scrollYProgress ?? defaultProgress;

  // Staggered row animations with exponential Y offset
  const row1Opacity = useTransform(progress, [0.15, 0.35], [0, 1]);
  const row1Y = useTransform(progress, [0.15, 0.35], [80, 0]);

  const row2Opacity = useTransform(progress, [0.2, 0.4], [0, 1]);
  const row2Y = useTransform(progress, [0.2, 0.4], [120, 0]);

  const row3Opacity = useTransform(progress, [0.25, 0.45], [0, 1]);
  const row3Y = useTransform(progress, [0.25, 0.45], [160, 0]);

  const row4Opacity = useTransform(progress, [0.3, 0.5], [0, 1]);
  const row4Y = useTransform(progress, [0.3, 0.5], [200, 0]);

  return (
    <form className="space-y-8">
      {/* Name & Email row */}
      <motion.div
        className="grid gap-8 md:grid-cols-2 md:gap-0"
        style={{ opacity: row1Opacity, y: row1Y }}
      >
        <FormInput
          required
          label="Name"
          placeholder="Your name"
          value={name}
          onChange={(e) => onFormDataChange({ name: e.target.value })}
        />
        <FormInput
          required
          label="Email"
          placeholder="your@email.com"
          type="email"
          value={email}
          onChange={(e) => onFormDataChange({ email: e.target.value })}
        />
      </motion.div>

      {/* Project Type */}
      <motion.div style={{ opacity: row2Opacity, y: row2Y }}>
        <ProjectTypeSelector
          projectType={projectType}
          onSelectProjectType={(type) =>
            onFormDataChange({ projectType: type })
          }
        />
      </motion.div>

      {/* Date & Time row */}
      <motion.div
        className="grid gap-8 md:grid-cols-2"
        style={{ opacity: row3Opacity, y: row3Y }}
      >
        {/* Calendar */}
        <CalendarGrid
          selectedDate={selectedDate}
          onSelectDate={(date) => onFormDataChange({ selectedDate: date })}
        />

        {/* Time slots */}
        <TimeSlotPicker
          selectedTime={selectedTime}
          onSelectTime={(time) => onFormDataChange({ selectedTime: time })}
        />
      </motion.div>

      {/* Message */}
      <motion.div style={{ opacity: row4Opacity, y: row4Y }}>
        <FormTextarea
          label="Message"
          placeholder="Tell me about your project..."
          value={message}
          onChange={(e) => onFormDataChange({ message: e.target.value })}
        />
      </motion.div>
    </form>
  );
}