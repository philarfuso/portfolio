import Link from "next/link";
import { HeroArtwork } from "@/components/hero-artwork";
import { SelectedWork } from "@/components/selected-work";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/content/profile";
import { featuredProjects } from "@/content/projects";

export default function Home() {
  return (
    <main className="portfolio-home" id="main-content">
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
                {profile.consulting.availability} <span aria-hidden="true">·</span>
              </span>{" "}
              <a href={`mailto:${profile.consulting.email}`}>
                {profile.consulting.email}
              </a>
            </p>

            <div className="hero-actions" aria-label="Portfolio actions">
              <a className="primary-action" href="#work">
                Explore my work <span aria-hidden="true">→</span>
              </a>
              <a className="secondary-action" href="/resume.pdf" download>
                Resume <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <nav
          className="project-rail"
          data-reveal-group
          data-reveal-stagger="60"
          aria-label="Selected work"
        >
          {featuredProjects.map((project) => (
            <a data-reveal="soft" href={`#${project.id}`} key={project.name}>
              <span className="project-rail-label">
                <span>{project.name}</span>
                <span className="project-rail-divider" aria-hidden="true" />
                <span>{project.discipline}</span>
              </span>
            </a>
          ))}
        </nav>
      </section>
      <SelectedWork />
      <section
        className="home-close"
        data-reveal-group
        data-reveal-stagger="100"
        aria-labelledby="home-close-title"
      >
        <p data-reveal="soft">What’s next</p>
        <div data-reveal="left" data-reveal-group data-reveal-stagger="75">
          <h2 id="home-close-title" data-reveal="soft" aria-label="Working on something tricky">
            <span aria-hidden="true">Working on</span>
            <span aria-hidden="true">something tricky</span>
          </h2>
          <p data-reveal="soft">
            I build polished web and mobile products from interface to
            infrastructure. Tell me what you’re working on.
          </p>
          <Link className="primary-action" data-reveal="soft" href="/contact">
            Say hello
          </Link>
          <a
            className="home-close-email"
            data-reveal="soft"
            href={`mailto:${profile.consulting.email}`}
          >
            {profile.consulting.email}
          </a>
        </div>
      </section>
    </main>
  );
}
