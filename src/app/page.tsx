import Link from "next/link";
import { HeroArtwork } from "@/components/hero-artwork";
import { SelectedWork } from "@/components/selected-work";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/content/profile";
import { featuredProjects } from "@/content/projects";

export default function Home() {
  return (
    <main className="portfolio-home st-home" id="main-content" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        <SiteHeader />

        <div className="hero-stage">
          <HeroArtwork />

          <div className="hero-copy">
            <h1 id="hero-title" aria-label="Hey, I’m Phil">
              <span aria-hidden="true">Hey, I’m Phil.</span>
            </h1>
            <p className="hero-positioning">
              Full-stack developer <span aria-hidden="true">·</span> web &amp; mobile
            </p>
            <p className="hero-intro">
              I enjoy building software, solving difficult problems, and
              creating better experiences for the people using it.
            </p>
            <p className="hero-availability">
              <span>
                <Link href="/consulting">{profile.consulting.availability}</Link> <span aria-hidden="true">·</span>
              </span>{" "}
              <a href={`mailto:${profile.consulting.email}`}>
                {profile.consulting.email}
              </a>
            </p>

            <div className="hero-actions" aria-label="Portfolio actions">
              <a className="st-hero-action" href="#work">
                Explore my work <span aria-hidden="true">→</span>
              </a>
              <a className="st-hero-resume" href="/resume.pdf" download>
                Resume <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <nav
          className="st-project-rail"
          data-reveal-group
          data-reveal-stagger="60"
          aria-label="Selected work"
        >
          {featuredProjects.map((project) => (
            <a data-reveal="soft" href={`#${project.id}`} key={project.name}>
              <span className="st-project-rail-label">
                <span>{project.name}</span>
                <span aria-hidden="true">·</span>
                <span>{project.discipline}</span>
              </span>
            </a>
          ))}
        </nav>
      </section>
      <SelectedWork />
      <section className="st-home-close" aria-labelledby="home-close-title">
        <div className="studio-shell st-home-close-inner">
          <div className="st-home-close-copy">
            <p className="studio-label" data-reveal="soft">What’s next</p>
            <h2 className="studio-title" id="home-close-title" data-reveal="soft">Working on something tricky?</h2>
            <p data-reveal="soft">I build polished web and mobile products from interface to infrastructure. Tell me what you’re working on.</p>
          </div>
          <div className="st-close-actions" data-reveal="soft">
            <Link className="studio-button" href="/contact">Say hello <span aria-hidden="true">↗</span></Link>
            <a className="studio-link" href={`mailto:${profile.consulting.email}`}>{profile.consulting.email}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
