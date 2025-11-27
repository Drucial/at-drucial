import { resume } from "@/data/resume";

export function CVExperience() {
  return (
    <section className="border-x">
      {/* Header */}
      <div className="flex items-baseline justify-between border-b px-6 py-6 md:px-8 md:py-8 lg:px-12">
        <h2
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          Experience
        </h2>
        <span className="text-muted-foreground font-mono text-sm">
          {resume.experience.length} roles
        </span>
      </div>

      {/* Jobs */}
      <div className="divide-y">
        {resume.experience.map((job, index) => (
          <div
            key={`${job.company}-${index}`}
            className="grid md:grid-cols-[1fr_2fr] md:divide-x"
          >
            {/* Left - Company & Period */}
            <div className="p-6 md:p-8 lg:p-12">
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                {job.company}
              </h3>
              <p className="text-muted-foreground mt-1 font-mono text-sm">
                {job.period}
              </p>
            </div>

            {/* Right - Role & Description */}
            <div className="p-6 pt-0 md:p-8 md:pt-8 lg:p-12 lg:pt-12">
              <h4 className="text-muted-foreground mb-4 font-medium">
                {job.title}
              </h4>
              <ul className="text-muted-foreground space-y-2 text-sm">
                {job.description.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="bg-muted-foreground/30 mt-1.5 block size-1.5 shrink-0 rounded-full" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
