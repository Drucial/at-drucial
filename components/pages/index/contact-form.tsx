"use client";

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
};

export function ContactForm({ formData, onFormDataChange }: ContactFormProps) {
  const {
    name,
    email,
    projectType,
    selectedDate,
    selectedTime,
    message,
  } = formData;

  return (
    <form className="space-y-8">
      {/* Name & Email row */}
      <div className="grid gap-8 md:grid-cols-2 md:gap-0">
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
      </div>

      {/* Project Type */}
      <ProjectTypeSelector
        projectType={projectType}
        onSelectProjectType={(type) => onFormDataChange({ projectType: type })}
      />

      {/* Date & Time row */}
      <div className="grid gap-8 md:grid-cols-2">
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
      </div>

      {/* Message */}
      <FormTextarea
        label="Message"
        placeholder="Tell me about your project..."
        value={message}
        onChange={(e) => onFormDataChange({ message: e.target.value })}
      />
    </form>
  );
}