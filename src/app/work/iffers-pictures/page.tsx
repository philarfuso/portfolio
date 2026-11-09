import type { Metadata } from "next";
import Image from "next/image";
import { CaseStudyNavigator } from "@/components/case-study/case-study-navigator";
import { CaseStudyFooter } from "@/components/case-study/case-study-footer";
import { IffersGallery } from "@/components/case-study/iffers-gallery";
import { SiteHeader } from "@/components/site-header";
import { iffersPicturesCaseStudy as study } from "@/content/case-studies/iffers-pictures";

export const metadata: Metadata = {
  title: "Iffer’s Pictures case study",
  description: "How Phil Arfuso turned an open-ended business need into a complete production website for Iffer’s Pictures.",
};

export default function IffersPicturesCaseStudyPage() {
  return (
    <main className="case-study case-study-iffers sc-page" id="main-content" tabIndex={-1}>
      <section className="sc-hero sc-iffers-hero" aria-labelledby="iffers-title">
        <SiteHeader current="work" tone="paper" />
        <div className="sc-hero-layout studio-shell">
          <div className="sc-hero-copy"><p className="studio-label" data-reveal="soft">{study.hero.kicker} / Iffer’s Pictures</p><h1 id="iffers-title" data-reveal="soft">{study.hero.title}</h1><p className="sc-lede" data-reveal="soft">{study.hero.lede}</p></div>
          <div className="sc-hero-photos" aria-label="Selected Iffer’s Pictures photography">
            <figure className="sc-hero-photo-main" data-reveal="scale"><Image src="/images/iffers-pictures/maternity-session.jpg" alt="Expectant mother in a pale pink dress standing in a tree-lined garden." width={1080} height={720} sizes="(max-width: 760px) calc(100vw - 48px), 45vw" priority /><figcaption>Maternity / environment</figcaption></figure>
            <figure className="sc-hero-photo-detail" data-reveal="scale"><Image src="/images/iffers-pictures/engagement-detail.jpg" alt="Engaged couple holding hands in front of softly lit holiday greenery." width={2048} height={1365} sizes="(max-width: 760px) 52vw, 24vw" /><figcaption>Engagement / detail</figcaption></figure>
          </div>
        </div>
        <dl className="sc-meta studio-shell">{study.hero.meta.map((item) => <div data-reveal="soft" key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
      </section>

      <section className="sc-section sc-split studio-shell" aria-labelledby="iffers-origin-title">
        <header data-reveal="soft"><p className="studio-label">{study.origin.eyebrow}</p><h2 id="iffers-origin-title">{study.origin.title}</h2></header>
        <div className="sc-prose"><p data-reveal="soft">{study.origin.body}</p><aside className="sc-delivery" data-reveal="soft" aria-label="Project delivery summary"><p className="studio-label">{study.origin.calloutLabel}</p><p>{study.origin.callout}</p></aside></div>
      </section>

      <section className="sc-section studio-shell" aria-labelledby="iffers-process-title">
        <header className="sc-section-intro" data-reveal="soft"><p className="studio-label">Design and development</p><h2 id="iffers-process-title">From requirements to implementation</h2></header>
        <ol className="sc-principles">{study.principles.map((principle) => <li data-reveal="soft" key={principle.title}><h3>{principle.title}</h3><p>{principle.body}</p></li>)}</ol>
      </section>

      <section className="sc-section sc-photography studio-shell" aria-labelledby="iffers-media-title">
        <header className="sc-split"><div data-reveal="soft"><p className="studio-label">{study.media.eyebrow}</p><h2 id="iffers-media-title">{study.media.title}</h2></div><p className="sc-prose" data-reveal="soft">{study.media.body}</p></header>
        <IffersGallery />
        <p className="sc-source" data-reveal="soft">{study.media.sourceNote}</p>
      </section>

      <section className="sc-section sc-split studio-shell" id="ownership" aria-labelledby="iffers-ownership-title">
        <header data-reveal="soft"><p className="studio-label">{study.ownership.eyebrow}</p><h2 id="iffers-ownership-title">{study.ownership.title}</h2><p>{study.ownership.body}</p></header>
        <ul className="sc-scope" aria-label="Phil’s project scope">{study.ownership.scope.map((item) => <li data-reveal="soft" key={item}>{item}</li>)}</ul>
      </section>

      <section className="sc-section studio-shell" id="live-site" aria-labelledby="iffers-proof-title">
        <div className="sc-proof sc-split">
          <article data-reveal="soft"><p className="studio-label">{study.proof.eyebrow}</p><h2 id="iffers-proof-title">{study.proof.title}</h2><p>{study.proof.body}</p></article>
          <a className="sc-live-link" data-reveal="soft" href={study.publicUrl} target="_blank" rel="noopener noreferrer" aria-label={`${study.proof.linkLabel} (opens in a new tab)`}><span className="studio-label">ifferspictures.com</span><strong>{study.proof.linkLabel}<span aria-hidden="true">↗</span></strong><small>Opens the original project in a new tab.</small></a>
        </div>
      </section>
      <CaseStudyFooter currentProjectId="iffers-pictures" />
      <CaseStudyNavigator currentProjectId="iffers-pictures" />
    </main>
  );
}
