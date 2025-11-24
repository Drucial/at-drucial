"use client";

import { forwardRef } from "react";

import { motion } from "motion/react";

import { useDirectionalHover } from "@/hooks/use-directional-hover";

import type { ContactFormData } from "./contact-form";

type EmailPreviewProps = {
  formData: ContactFormData;
  onSubmit?: (e: React.FormEvent) => void;
};

export const EmailPreview = forwardRef<HTMLDivElement, EmailPreviewProps>(
  ({ formData, onSubmit }, ref) => {
    const { name, email, projectType, selectedDate, selectedTime, message } =
      formData;

    // Format date for preview
    const today = new Date();
    const formattedDate = selectedDate
      ? `${today.toLocaleString("default", { month: "long" })} ${selectedDate}, ${today.getFullYear()}`
      : null;

    const {
      ref: submitRef,
      bgX,
      bgY,
      handlers,
    } = useDirectionalHover<HTMLButtonElement>();

    return (
      <div ref={ref} className="flex flex-1 flex-col">
        <div className="flex-1">
          {/* Email header */}
          <div className="border-border space-y-2 border-b p-6 md:p-8">
            <div className="flex gap-2 text-xs">
              <span className="text-foreground/40">From:</span>
              <span className="text-muted-foreground">
                {name || "Your Name"} &lt;{email || "your@email.com"}&gt;
              </span>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="text-foreground/40">To:</span>
              <span className="text-muted-foreground">hello@drucial.com</span>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="text-foreground/40">Subject:</span>
              <span className="text-muted-foreground">
                {projectType
                  ? `${projectType} Project Inquiry`
                  : "New Project Inquiry"}
              </span>
            </div>
          </div>

          {/* Email body */}
          <div className="text-muted-foreground flex-1 p-6 leading-relaxed md:p-8">
            <p className="mb-4">Hi Drucial,</p>

            <p className="mb-4 whitespace-pre">
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
            onClick={onSubmit}
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
      </div>
    );
  }
);

EmailPreview.displayName = "EmailPreview";
