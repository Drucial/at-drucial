"use client";

import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import type { MotionValue } from "motion/react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { z } from "zod";

import { CalendarGrid } from "@/components/ui/calendar-grid";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/components/ui/form-textarea";
import type { ProjectType } from "@/components/ui/project-type-selector";
import { ProjectTypeSelector } from "@/components/ui/project-type-selector";
import type { TimeSlot } from "@/components/ui/time-slot-picker";
import { TimeSlotPicker } from "@/components/ui/time-slot-picker";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  projectType: z.string().nullable(),
  selectedDate: z.number().nullable(),
  selectedTime: z.string().nullable(),
  message: z.string(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

type ContactFormProps = {
  formData: ContactFormData;
  onFormDataChange: (data: Partial<ContactFormData>) => void;
  scrollYProgress?: MotionValue<number>;
  isMobile?: boolean;
};

export function ContactForm({
  formData,
  onFormDataChange,
  scrollYProgress,
  isMobile = false,
}: ContactFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: formData,
    mode: "onBlur",
  });

  // Refs for mobile element-based scroll tracking
  const nameRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const row4Ref = useRef<HTMLDivElement>(null);

  // Default motion value for when scrollYProgress isn't provided
  const defaultProgress = useMotionValue(1);
  const progress = scrollYProgress ?? defaultProgress;

  // Desktop: staggered field animations based on section scroll
  // Note: form wrapper fades in at 0.4-0.8, so start after that
  // Name & Email animate together (same row on desktop)
  const nameOpacityDesktop = useTransform(progress, [0.45, 0.55], [0, 1]);
  const nameYDesktop = useTransform(progress, [0.45, 0.55], [40, 0]);

  const emailOpacityDesktop = useTransform(progress, [0.45, 0.55], [0, 1]);
  const emailYDesktop = useTransform(progress, [0.45, 0.55], [40, 0]);

  const row2OpacityDesktop = useTransform(progress, [0.55, 0.65], [0, 1]);
  const row2YDesktop = useTransform(progress, [0.55, 0.65], [50, 0]);

  const row3OpacityDesktop = useTransform(progress, [0.65, 0.75], [0, 1]);
  const row3YDesktop = useTransform(progress, [0.65, 0.75], [60, 0]);

  const row4OpacityDesktop = useTransform(progress, [0.75, 0.85], [0, 1]);
  const row4YDesktop = useTransform(progress, [0.75, 0.85], [70, 0]);

  // Mobile: element-based scroll tracking for each field (progressive stagger)
  const { scrollYProgress: nameProgress } = useScroll({
    target: nameRef,
    offset: ["start end", "start 0.85"],
  });
  const nameOpacityMobile = useTransform(nameProgress, [0, 1], [0, 1]);
  const nameYMobile = useTransform(nameProgress, [0, 1], [20, 0]);

  const { scrollYProgress: emailProgress } = useScroll({
    target: emailRef,
    offset: ["start end", "start 0.8"],
  });
  const emailOpacityMobile = useTransform(emailProgress, [0, 1], [0, 1]);
  const emailYMobile = useTransform(emailProgress, [0, 1], [25, 0]);

  const { scrollYProgress: row2Progress } = useScroll({
    target: row2Ref,
    offset: ["start end", "start 0.75"],
  });
  const row2OpacityMobile = useTransform(row2Progress, [0, 1], [0, 1]);
  const row2YMobile = useTransform(row2Progress, [0, 1], [30, 0]);

  const { scrollYProgress: row3Progress } = useScroll({
    target: row3Ref,
    offset: ["start end", "start 0.65"],
  });
  const row3OpacityMobile = useTransform(row3Progress, [0, 1], [0, 1]);
  const row3YMobile = useTransform(row3Progress, [0, 1], [35, 0]);

  const { scrollYProgress: row4Progress } = useScroll({
    target: row4Ref,
    offset: ["start end", "start 0.55"],
  });
  const row4OpacityMobile = useTransform(row4Progress, [0, 1], [0, 1]);
  const row4YMobile = useTransform(row4Progress, [0, 1], [40, 0]);

  // Select mobile or desktop values
  const nameOpacity = isMobile ? nameOpacityMobile : nameOpacityDesktop;
  const nameY = isMobile ? nameYMobile : nameYDesktop;
  const emailOpacity = isMobile ? emailOpacityMobile : emailOpacityDesktop;
  const emailY = isMobile ? emailYMobile : emailYDesktop;
  const row2Opacity = isMobile ? row2OpacityMobile : row2OpacityDesktop;
  const row2Y = isMobile ? row2YMobile : row2YDesktop;
  const row3Opacity = isMobile ? row3OpacityMobile : row3OpacityDesktop;
  const row3Y = isMobile ? row3YMobile : row3YDesktop;
  const row4Opacity = isMobile ? row4OpacityMobile : row4OpacityDesktop;
  const row4Y = isMobile ? row4YMobile : row4YDesktop;

  // Create register handlers that also sync to parent
  const nameRegister = register("name");
  const emailRegister = register("email");
  const messageRegister = register("message");

  return (
    <form className="space-y-8">
      {/* Name & Email row */}
      <div className="grid gap-8 md:grid-cols-2 md:gap-0">
        <motion.div ref={nameRef} style={{ opacity: nameOpacity, y: nameY }}>
          <FormInput
            {...nameRegister}
            error={errors.name?.message}
            label="Name"
            placeholder="Your name"
            onChange={(e) => {
              nameRegister.onChange(e);
              onFormDataChange({ name: e.target.value });
            }}
          />
        </motion.div>
        <motion.div ref={emailRef} style={{ opacity: emailOpacity, y: emailY }}>
          <FormInput
            {...emailRegister}
            error={errors.email?.message}
            label="Email"
            placeholder="your@email.com"
            type="email"
            onChange={(e) => {
              emailRegister.onChange(e);
              onFormDataChange({ email: e.target.value });
            }}
          />
        </motion.div>
      </div>

      {/* Project Type */}
      <motion.div ref={row2Ref} style={{ opacity: row2Opacity, y: row2Y }}>
        <Controller
          control={control}
          name="projectType"
          render={({ field }) => (
            <ProjectTypeSelector
              projectType={field.value as ProjectType | null}
              onSelectProjectType={(type) => {
                field.onChange(type);
                onFormDataChange({ projectType: type });
              }}
            />
          )}
        />
      </motion.div>

      {/* Date & Time row */}
      <motion.div
        ref={row3Ref}
        className="grid gap-8 md:grid-cols-2"
        style={{ opacity: row3Opacity, y: row3Y }}
      >
        {/* Calendar */}
        <Controller
          control={control}
          name="selectedDate"
          render={({ field }) => (
            <CalendarGrid
              selectedDate={field.value}
              onSelectDate={(date) => {
                field.onChange(date);
                onFormDataChange({ selectedDate: date });
              }}
            />
          )}
        />

        {/* Time slots */}
        <Controller
          control={control}
          name="selectedTime"
          render={({ field }) => (
            <TimeSlotPicker
              selectedTime={field.value as TimeSlot | null}
              onSelectTime={(time) => {
                field.onChange(time);
                onFormDataChange({ selectedTime: time });
              }}
            />
          )}
        />
      </motion.div>

      {/* Message */}
      <motion.div ref={row4Ref} style={{ opacity: row4Opacity, y: row4Y }}>
        <FormTextarea
          {...messageRegister}
          error={errors.message?.message}
          label="Message"
          placeholder="Tell me about your project..."
          onChange={(e) => {
            messageRegister.onChange(e);
            onFormDataChange({ message: e.target.value });
          }}
        />
      </motion.div>
    </form>
  );
}
