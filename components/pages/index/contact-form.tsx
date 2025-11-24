"use client";

import { CalendarGrid } from "@/components/ui/calendar-grid";
import { FormInput } from "@/components/ui/form-input";

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
      <div className="border">
        <div className="text-muted-foreground border-b px-4 py-2 text-xs uppercase tracking-widest">
          Project Type
        </div>
        <div className="flex md:grid md:grid-cols-4">
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
              onClick={() => onFormDataChange({ projectType: type })}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Date & Time row */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Calendar */}
        <CalendarGrid
          selectedDate={selectedDate}
          onSelectDate={(date) => onFormDataChange({ selectedDate: date })}
        />

        {/* Time slots */}
        <div className="border-border self-start border-t border-r border-l">
          <div className="border-border text-muted-foreground border-b px-4 py-2 text-xs uppercase tracking-widest">
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
                  onClick={() => onFormDataChange({ selectedTime: time })}
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
        <label className="border-border text-muted-foreground border-b px-4 py-2 text-xs uppercase tracking-widest">
          Message
        </label>
        <textarea
          className="text-foreground placeholder:text-foreground/40 min-h-32 resize-none bg-transparent px-4 py-3 text-sm focus:outline-none"
          placeholder="Tell me about your project..."
          rows={4}
          value={message}
          onChange={(e) => onFormDataChange({ message: e.target.value })}
        />
      </div>
    </form>
  );
}