import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { consulting, consultingMailto, type ConsultingOfferId } from "@/content/consulting";
import { profile } from "@/content/profile";
import { portfolioProjects } from "@/content/projects";
import { ConsultingProofVisual } from "./consulting-proof-visual";
import { ConsultingStudioMotion } from "./consulting-studio-motion";
import "./consulting.css";
import "./consulting-studio-motion.css";

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

const servicePresentation: Record<ConsultingOfferId, { title: string; summary: string; action: string }> = {
  implementation: { title: "Project development", summary: "For a new feature, an application build, or extra development capacity for your agency.", action: "Discuss project work" },
  ownership: { title: "Ongoing engineering", summary: "Keep an existing product moving with regular development, maintenance, and technical decisions.", action: "Discuss ongoing support" },
  assessment: { title: "Technical assessment", summary: "Review an existing application or investigate a technical concern before deciding what to build or change.", action: "Discuss an assessment" },
};

export default function ConsultingPage() {
  const proof = consulting.proof.flatMap((item) => {
    const project = portfolioProjects.find((entry) => entry.id === item.projectId);
    return project?.route ? [{ ...item, project }] : [];
  });

  return (
    <main className="consulting-page" id="main-content" tabIndex={-1}>
      <ConsultingStudioMotion />
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
          {consulting.offers.map((offer) => (
            <a href={`#${offer.id}`} key={offer.id}>
              <span>{servicePresentation[offer.id].title}</span>
              <span aria-hidden="true">↓</span>
            </a>
          ))}
        </nav>
      </section>

      <div className="consulting-body">
        <section className="consulting-section consulting-services" aria-labelledby="services-title">
          <header className="consulting-section-heading">
            <p className="consulting-eyebrow">Ways to work together</p>
            <h2 id="services-title">What do you need help with?</h2>
            <p>Bring a defined piece of work, add ongoing engineering support, or start with a review of your application.</p>
          </header>

          <div className="consulting-offers">
            {consulting.offers.map((offer) => (
              <article className="consulting-offer" id={offer.id} key={offer.id} aria-labelledby={`${offer.id}-title`}>
                <div className="consulting-offer-intro">
                  <h3 id={`${offer.id}-title`}>{servicePresentation[offer.id].title}</h3>
                  <p>{servicePresentation[offer.id].summary}</p>
                </div>
                <div className="consulting-offer-body">
                  <h4>Typical deliverables</h4>
                  <ul>{offer.outputs.map((output) => <li key={output}>{output}</li>)}</ul>
                  <details className="consulting-scope">
                    <summary>Scope and working arrangement <span aria-hidden="true">+</span></summary>
                    <div>
                      <p>{offer.description}</p>
                      <p>{offer.collaboration}</p>
                      <p>{offer.boundary}</p>
                    </div>
                  </details>
                  <a className="consulting-text-link" href={consultingMailto(offer.id)}>
                    {servicePresentation[offer.id].action} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {proof.length > 0 ? (
          <section className="consulting-section consulting-experience" aria-labelledby="experience-title">
            <header className="consulting-section-heading">
              <h2 id="experience-title">Relevant experience</h2>
              <p>Examples from an enterprise platform, a product I co-own, and a client website.</p>
            </header>
            <div className="consulting-proof-list">
              {proof.map((item) => (
                <article className="consulting-proof" key={item.projectId}>
                  <ConsultingProofVisual projectId={item.projectId} />
                  <div>
                    <h3>{item.project.name}</h3>
                    <p className="consulting-proof-role">{item.project.role}</p>
                  </div>
                  <p className="consulting-proof-contribution">{item.contribution}</p>
                  <Link className="consulting-text-link" href={item.project.route} aria-label={`Read the ${item.project.name} case study`}>
                    Case study <span aria-hidden="true">↗</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="consulting-section consulting-start" aria-labelledby="start-title">
          <header className="consulting-section-heading">
            <p className="consulting-eyebrow">Getting started</p>
            <h2 id="start-title">How we’d work together</h2>
          </header>
          <div className="consulting-start-layout">
            <ol className="consulting-process-steps" aria-label="How an engagement starts">
              {consulting.process.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
            <aside className="consulting-practical" aria-labelledby="practical-title">
              <h3 id="practical-title">A few practical questions</h3>
              <div className="consulting-questions">
                {consulting.faq.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}<span aria-hidden="true">+</span></summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>

      <footer className="consulting-close" aria-labelledby="consulting-close-title">
        <p className="consulting-eyebrow">Let’s talk</p>
        <h2 id="consulting-close-title">Tell me what<br />you’re working on.</h2>
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
