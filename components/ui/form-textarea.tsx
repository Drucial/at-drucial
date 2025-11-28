import { forwardRef } from "react";

type FormTextareaProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  name?: string;
  rows?: number;
};

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  function FormTextarea(
    {
      label,
      placeholder,
      required,
      value,
      error,
      onChange,
      onBlur,
      name,
      rows = 4,
    },
    ref
  ) {
    return (
      <div
        className={`border-border flex flex-col border transition-colors ${error ? "border-red-500/50" : ""}`}
      >
        <label className="border-border text-muted-foreground relative flex items-center justify-between border-b px-4 py-2 text-xs tracking-widest uppercase">
          {label}
          <span
            className={`absolute top-1/2 right-2 text-red-500 transition-all duration-200 ${
              error
                ? "-translate-y-1/2 opacity-100"
                : "pointer-events-none -translate-y-full opacity-0"
            }`}
          >
            {error}
          </span>
        </label>
        <textarea
          ref={ref}
          className="text-foreground placeholder:text-foreground/40 min-h-32 resize-none bg-transparent px-4 py-3 text-sm focus:outline-none"
          name={name}
          placeholder={placeholder}
          required={required}
          rows={rows}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
    );
  }
);
