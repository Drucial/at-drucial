import { BookOpenIcon, BrainIcon, PaletteIcon, WrenchIcon } from "lucide-react";

import { SMALL_HEADER_HEIGHT } from "@/components/layout/header";
import { resume } from "@/data/resume";

const skillIcons: Record<string, typeof WrenchIcon> = {
  wrench: WrenchIcon,
  palette: PaletteIcon,
  brain: BrainIcon,
  book: BookOpenIcon,
};

export default function CVPage() {
  return (
    <main
      className="border-x px-6 py-12 md:px-8 lg:px-12"
      style={{ minHeight: `calc(100vh - ${SMALL_HEADER_HEIGHT}px)` }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <hgroup>
            <p>{resume.location}</p>
            <h1 className="text-7xl md:text-8xl lg:text-9xl">{resume.name}</h1>
            <p>{resume.title}</p>
          </hgroup>
          <p className="text-muted-foreground mt-6 text-lg">{resume.intro}</p>
          <p className="mt-2 text-lg">
            Currently creating{" "}
            <a
              className="text-primary hover:underline"
              href={resume.currentProject.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {resume.currentProject.name}
            </a>{" "}
            from the ground up.
          </p>
        </header>

        {/* About */}
        <section className="mb-12">
          <h2 className="mb-4">About Me</h2>
          <div className="text-muted-foreground space-y-4">
            {resume.about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="mb-6">Experience</h2>
          <div className="space-y-8">
            {resume.experience.map((job) => (
              <article key={`${job.company}-${job.period}`}>
                <div className="mb-2 flex flex-col justify-between gap-1 md:flex-row md:items-baseline">
                  <h3>{job.title}</h3>
                  <span className="text-muted-foreground text-sm">
                    {job.period}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3 text-lg">
                  {job.company}
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-1">
                  {job.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-12">
          <h2 className="mb-6">Projects</h2>
          <div className="space-y-8">
            {resume.projects.map((project) => (
              <article key={project.name}>
                <div className="mb-2 flex flex-col justify-between gap-1 md:flex-row md:items-baseline">
                  <h3>
                    {project.url ? (
                      <a
                        className="hover:text-primary transition-colors"
                        href={project.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <span className="text-muted-foreground text-sm">
                    {project.role}
                  </span>
                </div>
                <ul className="text-muted-foreground list-inside list-disc space-y-1">
                  {project.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="mb-6">Skills</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {resume.skills.map((category) => {
              const Icon = skillIcons[category.icon] || WrenchIcon;

              return (
                <div key={category.name}>
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="text-muted-foreground size-5" />
                    <h4>{category.name}</h4>
                  </div>
                  <ul className="text-muted-foreground space-y-1">
                    {category.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <h2 className="mb-4">Education</h2>
          <h3 className="mb-3">{resume.education.title}</h3>
          <ul className="text-muted-foreground list-inside list-disc space-y-1">
            {resume.education.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section>
          <h2 className="mb-4">Contact</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {resume.contact.map((link) => (
              <a
                key={link.label}
                className="text-muted-foreground hover:text-primary transition-colors"
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.display}
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
