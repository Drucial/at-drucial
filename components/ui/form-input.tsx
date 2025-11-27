import { forwardRef } from "react";

type FormInputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    {
      label,
      type = "text",
      placeholder,
      required,
      value,
      error,
      onChange,
      onBlur,
      name,
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
                : "-translate-y-full pointer-events-none opacity-0"
            }`}
          >
            {error}
          </span>
        </label>
        <input
          ref={ref}
          className="text-foreground placeholder:text-foreground/40 bg-transparent px-4 py-3 text-sm focus:outline-none"
          name={name}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
    );
  }
);
