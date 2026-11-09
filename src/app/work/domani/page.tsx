import type { Metadata } from "next";
import Image from "next/image";
import { CaseStudyNavigator } from "@/components/case-study/case-study-navigator";
import { CaseStudyFooter } from "@/components/case-study/case-study-footer";
import { SiteHeader } from "@/components/site-header";
import { domaniCaseStudy as study, domaniSnapshotDate } from "@/content/case-studies/domani";

export const metadata: Metadata = {
  title: "Domani case study",
  description: "How Phil Arfuso co-owns and engineers Domani, a focused planning app for iOS and Android.",
};

export default function DomaniCaseStudyPage() {
  return (
    <main className="case-study case-study-domani sc-page" id="main-content" tabIndex={-1}>
      <section className="sc-hero sc-domani-hero" aria-labelledby="domani-title">
        <SiteHeader current="work" tone="paper" />
        <div className="sc-hero-layout studio-shell">
          <div className="sc-hero-copy">
            <p className="studio-label" data-reveal="soft">{study.hero.kicker} / Domani</p>
            <h1 id="domani-title" data-reveal="soft">{study.hero.title}</h1>
            <p className="sc-lede" data-reveal="soft">{study.hero.lede}</p>
            <p className="sc-ownership-intro" data-reveal="soft">I co-own Domani with a UX designer. We make product and design decisions together.</p>
          </div>
          <figure className="sc-phone-stage" id="product-view" data-reveal="scale">
            <Image src="/images/domani/today-screen.png" alt={study.media.alt} width={1008} height={2126} sizes="(max-width: 760px) 72vw, 26vw" priority />
            <figcaption>Real public product media. Demonstration content only; no user records are shown.</figcaption>
          </figure>
        </div>
        <dl className="sc-meta studio-shell">{study.hero.meta.map((item) => <div data-reveal="soft" key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
      </section>

      <section className="sc-section sc-split studio-shell" aria-labelledby="domani-origin-title">
        <header data-reveal="soft"><p className="studio-label">{study.origin.eyebrow}</p><h2 id="domani-origin-title">{study.origin.title}</h2></header>
        <div className="sc-prose">{study.origin.body.map((paragraph) => <p data-reveal="soft" key={paragraph}>{paragraph}</p>)}</div>
      </section>

      <section className="sc-section sc-domani-product studio-shell" aria-labelledby="domani-media-title">
        <header className="sc-split">
          <div data-reveal="soft"><p className="studio-label">{study.media.eyebrow}</p><h2 id="domani-media-title">{study.media.title}</h2><a className="studio-link" href="#product-view">See the product screen <span aria-hidden="true">↑</span></a></div>
          <p className="sc-prose" data-reveal="soft">{study.media.body}</p>
        </header>
        <ol className="sc-principles" aria-label="The daily planning loop">
          {study.principles.map((principle) => <li data-reveal="soft" key={principle.title}><span className="studio-label">{principle.label}</span><h3>{principle.title}</h3><p>{principle.body}</p></li>)}
        </ol>
      </section>

      <section className="sc-section studio-shell" aria-labelledby="domani-ownership-title">
        <header className="sc-split">
          <div data-reveal="soft"><p className="studio-label">{study.ownership.eyebrow}</p><h2 id="domani-ownership-title">{study.ownership.title}</h2></div>
          <p className="sc-prose" data-reveal="soft">{study.ownership.body}</p>
        </header>
        <section className="sc-boundary" aria-labelledby="domani-boundary-title">
          <header data-reveal="soft"><p className="studio-label">{study.boundary.eyebrow}</p><h3 id="domani-boundary-title">{study.boundary.title}</h3></header>
          <div className="sc-boundary-columns">
            <div data-reveal="soft"><h4>Shipped</h4><ul>{study.boundary.shipped.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div data-reveal="soft"><h4>Exploring</h4><ul>{study.boundary.exploring.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </section>
      </section>

      <section className="sc-section sc-evidence studio-shell" id="evidence" aria-labelledby="domani-evidence-title">
        <div className="sc-inset">
          <header className="sc-split">
            <div data-reveal="soft"><p className="studio-label">{study.evidence.eyebrow} / {domaniSnapshotDate}</p><h2 id="domani-evidence-title">{study.evidence.title}</h2></div>
            <p className="sc-prose" data-reveal="soft">{study.evidence.body}</p>
          </header>
          <div className="sc-metrics" aria-label={`Production metrics as of ${domaniSnapshotDate}`}>
            {study.evidence.metrics.map((metric) => <article data-reveal="soft" key={metric.label}><strong>{metric.value}</strong><h3>{metric.label}</h3><p>{metric.detail}</p></article>)}
          </div>
          <p className="sc-source" data-reveal="soft">Production Supabase, PostHog, and RevenueCat webhook ledger / {domaniSnapshotDate}</p>
          <aside className="sc-evidence-limits" data-reveal="soft"><h3>These numbers show early, real product use</h3><ul>{study.evidence.caveats.map((caveat) => <li key={caveat}>{caveat}</li>)}</ul></aside>
        </div>
      </section>
      <CaseStudyFooter currentProjectId="domani" />
      <CaseStudyNavigator currentProjectId="domani" />
    </main>
  );
}
