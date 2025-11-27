import { resume } from "@/data/resume";

export function CVEducation() {
  return (
    <section className="grid border-x md:grid-cols-[1fr_2fr] md:divide-x">
      {/* Left - Label */}
      <div className="border-b p-6 md:border-b-0 md:p-8 lg:p-12">
        <h2
          className="text-muted-foreground font-bold tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          Education
        </h2>
      </div>

      {/* Right - Content */}
      <div className="p-6 md:p-8 lg:p-12">
        <h3 className="mb-4 text-xl font-semibold tracking-tight">
          {resume.education.title}
        </h3>
        <ul className="text-muted-foreground space-y-3 text-sm">
          {resume.education.description.map((point, i) => (
            <li key={i} className="flex gap-3">
              <span className="bg-muted-foreground/30 mt-1.5 block size-1.5 shrink-0 rounded-full" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
