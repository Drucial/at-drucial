import { BookOpenIcon, BrainIcon, PaletteIcon, WrenchIcon } from "lucide-react";

import { resume } from "@/data/resume";

const skillIcons: Record<string, typeof WrenchIcon> = {
  wrench: WrenchIcon,
  palette: PaletteIcon,
  brain: BrainIcon,
  book: BookOpenIcon,
};

export function CVSkills() {
  return (
    <section className="border-x">
      {/* Header */}
      <div className="border-b px-6 py-6 md:px-8 md:py-8 lg:px-12">
        <h2
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          Skills
        </h2>
      </div>

      {/* Skills Grid */}
      <div className="grid divide-y md:grid-cols-2 md:divide-y-0 lg:grid-cols-4">
        {resume.skills.map((category, index) => {
          const Icon = skillIcons[category.icon] || WrenchIcon;

          return (
            <div
              key={category.name}
              className={`p-6 md:p-8 lg:p-12 ${index < 2 ? "md:border-b lg:border-b-0" : ""} ${index % 2 === 0 ? "md:border-r lg:border-r-0" : ""} ${index > 0 ? "lg:border-l" : ""}`}
            >
              <div className="mb-4 flex items-center gap-3">
                <Icon className="text-muted-foreground size-5" />
                <h3 className="font-semibold">{category.name}</h3>
              </div>
              <ul className="text-muted-foreground space-y-1.5 text-sm">
                {category.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
