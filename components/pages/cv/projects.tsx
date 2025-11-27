import { resume } from "@/data/resume";

export function CVProjects() {
  return (
    <section className="border-x">
      {/* Header */}
      <div className="flex items-baseline justify-between border-b px-6 py-6 md:px-8 md:py-8 lg:px-12">
        <h2
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          Projects
        </h2>
        <span className="text-muted-foreground font-mono text-sm">
          Selected work
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
        {resume.projects.map((project) => (
          <div key={project.name} className="flex flex-col p-6 md:p-8 lg:p-12">
            <div className="mb-4">
              <h3 className="text-xl font-semibold tracking-tight">
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
              <p className="text-muted-foreground mt-1 font-mono text-xs">
                {project.role}
              </p>
            </div>
            <ul className="text-muted-foreground flex-1 space-y-2 text-sm">
              {project.description.slice(0, 2).map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
