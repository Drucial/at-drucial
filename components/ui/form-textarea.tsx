export function FormTextarea({
  label,
  placeholder,
  required,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}) {
  return (
    <div className="border-border flex flex-col border">
      <label className="border-border text-muted-foreground border-b px-4 py-2 text-xs tracking-widest uppercase">
        {label}
      </label>
      <textarea
        className="text-foreground placeholder:text-foreground/40 min-h-32 resize-none bg-transparent px-4 py-3 text-sm focus:outline-none"
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
