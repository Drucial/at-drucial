export function FormInput({
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
      <label className="border-border text-muted-foreground border-b px-4 py-2 text-xs uppercase tracking-widest">
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