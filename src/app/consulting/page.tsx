import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { consulting, consultingMailto } from "@/content/consulting";
import { profile } from "@/content/profile";
import { portfolioProjects } from "@/content/projects";
import "./consulting.css";

const title = "Full-stack engineering & software consulting";

export const metadata: Metadata = {
  title,
  description: consulting.description,
  alternates: { canonical: "/consulting" },
  openGraph: {
    title: `${title} | Phil Arfuso`,
    description: consulting.description,
    url: "/consulting",
    type: "website",
    images: [{ url: "/opengraph-image", alt: "Phil Arfuso — web and mobile development" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Phil Arfuso`,
    description: consulting.description,
    images: ["/opengraph-image"],
  },
};

export default function ConsultingPage() {
  const proof = consulting.proof.flatMap((item) => {
    const project = portfolioProjects.find((entry) => entry.id === item.projectId);
    return project?.route ? [{ ...item, project }] : [];
  });

  return (
    <main className="consulting-page" id="main-content" tabIndex={-1}>
      <section className="consulting-hero" aria-labelledby="consulting-title">
        <SiteHeader current="consulting" />

        <div className="consulting-hero-main">
          <div>
            <p className="consulting-eyebrow">Independent engineering / Phil Arfuso</p>
            <h1 id="consulting-title">Senior engineering.<br />Steady progress.</h1>
          </div>
          <div className="consulting-hero-intro">
            <p className="consulting-positioning">{consulting.positioning}</p>
            <p className="consulting-lead">{consulting.description}</p>
            <a className="primary-action" href={consultingMailto()}>
              Tell me what you’re building <span aria-hidden="true">↗</span>
            </a>
            <p className="consulting-availability">{profile.consulting.availability}</p>
          </div>
        </div>

        <nav className="consulting-offer-index" aria-label="Ways to work together">
          {consulting.offers.map((offer, index) => (
            <a href={`#${offer.id}`} key={offer.id}>
              <span className="consulting-index-number">0{index + 1}</span>
              <span>{offer.shortName}</span>
              <span aria-hidden="true">↓</span>
            </a>
          ))}
        </nav>
      </section>

      <section className="consulting-paper consulting-services" aria-labelledby="services-title">
        <div className="consulting-section-heading">
          <p className="consulting-eyebrow">01 / Ways to work together</p>
          <h2 id="services-title">The right help.<br />A defined scope.</h2>
          <p>A delivery gap, a product that needs ownership, or a technical question worth answering first. Start where the work needs you.</p>
        </div>

        <div className="consulting-offers">
          {consulting.offers.map((offer, index) => (
            <article className="consulting-offer" id={offer.id} key={offer.id} aria-labelledby={`${offer.id}-title`}>
              <div className="consulting-offer-title">
                <span className="consulting-index-number">0{index + 1}</span>
                <h3 id={`${offer.id}-title`}>{offer.name}</h3>
              </div>
              <div className="consulting-offer-body">
                <p className="consulting-offer-problem">{offer.problem}</p>
                <p>{offer.description}</p>
                <div className="consulting-offer-details">
                  <div>
                    <h4>What you get</h4>
                    <ul>{offer.outputs.map((output) => <li key={output}>{output}</li>)}</ul>
                  </div>
                  <div>
                    <h4>How we work</h4>
                    <p>{offer.collaboration}</p>
                  </div>
                </div>
                <p className="consulting-boundary">{offer.boundary}</p>
                <a className="consulting-text-link" href={consultingMailto(offer.id)}>
                  Discuss {offer.shortName.toLowerCase()} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {proof.length > 0 ? (
        <section className="consulting-paper consulting-experience" aria-labelledby="experience-title">
          <div className="consulting-section-heading">
            <p className="consulting-eyebrow">02 / Selected experience</p>
            <h2 id="experience-title">Built in practice.</h2>
            <p>Enterprise systems, an independently owned product, and client delivery. A few examples of the work behind the offering.</p>
          </div>
          <div className="consulting-proof-grid">
            {proof.map((item) => (
              <article className="consulting-proof" key={item.projectId}>
                <p className="consulting-proof-context">{item.relevance}</p>
                <h3>{item.project.name}</h3>
                <p>{item.contribution}</p>
                <Link className="consulting-text-link" href={item.project.route}>
                  Read the case study <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="consulting-process" aria-labelledby="process-title">
        <div className="consulting-section-heading">
          <p className="consulting-eyebrow">03 / A practical process</p>
          <h2 id="process-title">Clarity first.<br />Then forward.</h2>
          <p>No elaborate pitch required. We start with the context, agree what useful progress looks like, and keep the work visible.</p>
        </div>
        <ol className="consulting-process-steps">
          {consulting.process.map((step, index) => (
            <li key={step.title}>
              <span className="consulting-index-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="consulting-paper consulting-faq" aria-labelledby="faq-title">
        <div>
          <p className="consulting-eyebrow">04 / A few useful answers</p>
          <h2 id="faq-title">Before we talk.</h2>
        </div>
        <div className="consulting-questions">
          {consulting.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="consulting-close" aria-labelledby="consulting-close-title">
        <p className="consulting-eyebrow">Have something in mind?</p>
        <h2 id="consulting-close-title">Let’s find your<br />next step.</h2>
        <p>Send a little context about your product, where you need help, and your timing. We can work out the shape of the engagement from there.</p>
        <a className="consulting-email" href={consultingMailto()}>{profile.consulting.email}<span aria-hidden="true">↗</span></a>
        <div className="consulting-footer-meta">
          <p>{consulting.business} <span aria-hidden="true">·</span> {profile.location}</p>
          <Link href="/contact">Other ways to say hello <span aria-hidden="true">↗</span></Link>
        </div>
      </footer>
    </main>
  );
}
