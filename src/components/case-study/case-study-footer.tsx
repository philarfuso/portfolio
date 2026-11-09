import Link from "next/link";
import { featuredProjects } from "@/content/projects";

export function CaseStudyFooter({ currentProjectId }: { currentProjectId: string }) {
  const index = featuredProjects.findIndex((project) => project.id === currentProjectId);
  const next = index >= 0 ? featuredProjects[(index + 1) % featuredProjects.length] : undefined;
  return (
    <footer className="studio-case-footer studio-shell" aria-label="Continue exploring">
      <div>
        <p className="studio-label">Keep exploring</p>
        {next?.route ? <Link className="studio-case-next" href={next.route}>Next: {next.name} <span aria-hidden="true">↗</span></Link> : null}
      </div>
      <nav aria-label="Portfolio destinations">
        <Link className="studio-link" href="/work">All work <span aria-hidden="true">↗</span></Link>
        <Link className="studio-link" href="/contact">Say hello <span aria-hidden="true">↗</span></Link>
      </nav>
    </footer>
  );
}
