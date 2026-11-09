import Image from "next/image";
import Link from "next/link";
import { featuredProjects, type FeaturedProject } from "@/content/projects";
import { domaniCaseStudy } from "@/content/case-studies/domani";

type SelectedWorkProps = {
  anchorId?: string;
  description?: string;
  projects?: readonly FeaturedProject[];
  showHeading?: boolean;
  title?: string;
  variant?: "featured" | "index";
};

function ProjectArtwork({ artwork }: Pick<FeaturedProject, "artwork">) {
  if (artwork === "memx") {
    return (
      <figure className="st-project-media st-project-media-memx" data-reveal="soft">
        <div className="st-market-art" aria-hidden="true">
          <span className="st-market-orbit" />
          <p>One platform.<br /><strong>Many markets.</strong></p>
          <div><span>Member tools</span><span>Trading tools</span><span>Operations tools</span></div>
        </div>
        <figcaption>Conceptual platform illustration</figcaption>
      </figure>
    );
  }
  if (artwork === "domani") {
    return (
      <figure className="st-project-media st-project-media-domani" data-reveal="soft">
        <div className="st-product-halo" aria-hidden="true" />
        <Image
          className="st-product-screen"
          src="/images/domani/today-screen.png"
          alt={domaniCaseStudy.media.alt}
          width={1008}
          height={2126}
          sizes="(max-width: 760px) 190px, 240px"
        />
        <div className="st-product-note" aria-hidden="true">A little clarity<br />for tomorrow.</div>
        <figcaption>Production app · demonstration content</figcaption>
      </figure>
    );
  }
  return (
    <figure className="st-project-media st-project-media-iffers" data-reveal="soft">
      <div className="st-site-window">
        <div className="st-site-toolbar" aria-hidden="true"><span>● ● ●</span>ifferspictures.com</div>
        <div className="st-site-photo">
          <Image
            src="/images/iffers-pictures/maternity-session.jpg"
            alt="Client photography displayed in an Iffer’s Pictures website composition."
            width={1080}
            height={720}
            sizes="(max-width: 760px) 80vw, 42vw"
          />
          <div className="st-site-title" aria-hidden="true"><span>Iffer’s Pictures</span><p>Heartfelt moments,<br />beautifully captured.</p></div>
        </div>
      </div>
      <div className="st-site-mobile" aria-hidden="true">
        <span>IP <i>Menu</i></span>
        <Image src="/images/iffers-pictures/family-session.jpg" alt="" width={1080} height={720} sizes="(max-width: 760px) 25vw, 12vw" />
        <p>Sessions for every chapter.</p>
      </div>
      <figcaption>Responsive client website · client photography</figcaption>
    </figure>
  );
}

export function SelectedWork({
  anchorId = "work",
  description = "Full-stack platforms, mobile products, and client websites—work spanning architecture, interface design, and production delivery.",
  projects = featuredProjects,
  showHeading = true,
  title = "Selected work",
  variant = "featured",
}: SelectedWorkProps = {}) {
  const titleId = `${anchorId}-title`;
  const ProjectHeading = showHeading ? "h3" : "h2";
  return (
    <section className={`st-selected-work st-selected-work-${variant}`} aria-label={showHeading ? undefined : title} aria-labelledby={showHeading ? titleId : undefined}>
      <div className="studio-shell">
        {showHeading ? (
          <header className="st-work-heading" id={anchorId}>
            <div data-reveal="soft"><p className="studio-label">A few things I’ve helped build</p><h2 className="studio-title" id={titleId}>{title}</h2></div>
            <p data-reveal="soft">{description}</p>
          </header>
        ) : null}
        <div className="st-projects" id={showHeading ? undefined : anchorId}>
          {projects.map((project) => (
            <article className={`st-project st-project-${project.id}`} id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}>
              <div className="st-project-copy">
                <p className="studio-label" data-reveal="soft">{project.discipline}</p>
                <ProjectHeading id={`${project.id}-title`} data-reveal="soft">{project.name}</ProjectHeading>
                <p className="st-project-role" data-reveal="soft">{project.role}</p>
                <p className="st-project-summary" data-reveal="soft">{project.summary}</p>
                <ul className="st-project-scope" aria-label={`${project.name} scope`} data-reveal="soft">
                  {project.scope.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {project.route ? <Link className="studio-link" data-reveal="soft" href={project.route}>View case study <span aria-hidden="true">↗</span></Link> : null}
              </div>
              <ProjectArtwork artwork={project.artwork} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
