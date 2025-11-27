const PROJECT_TYPES = ["Design", "Development", "Both", "Other"] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export function ProjectTypeSelector({
  projectType,
  onSelectProjectType,
}: {
  projectType: ProjectType | null;
  onSelectProjectType: (type: ProjectType) => void;
}) {
  return (
    <div className="border">
      <div className="text-muted-foreground border-b px-4 py-2 text-xs tracking-widest uppercase">
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
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onSelectProjectType(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
