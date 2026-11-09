import type { Metadata } from "next";
import { CaseStudyNavigator } from "@/components/case-study/case-study-navigator";
import { CaseStudyFooter } from "@/components/case-study/case-study-footer";
import { MemxConfigurationDiagram } from "@/components/case-study/memx-diagrams";
import { SiteHeader } from "@/components/site-header";
import { memxCaseStudy as study } from "@/content/case-studies/memx";

export const metadata: Metadata = {
  title: "MEMX case study",
  description: "How Phil Arfuso built member and operations tools across reusable interfaces, APIs, data, and production systems at MEMX.",
};

export default function MemxCaseStudyPage() {
  return (
    <main className="case-study case-study-memx sc-page" id="main-content" tabIndex={-1}>
      <section className="sc-hero sc-hero-ink" aria-labelledby="case-title">
        <SiteHeader current="work" tone="dark" />
        <div className="sc-hero-layout studio-shell">
          <div className="sc-hero-copy">
            <p className="studio-label" data-reveal="soft">{study.hero.kicker} / MEMX</p>
            <h1 id="case-title" data-reveal="soft">{study.hero.title}</h1>
            <p className="sc-lede" data-reveal="soft">{study.hero.lede}</p>
          </div>
          <aside className="sc-contributions" aria-label="Areas of contribution">
            <p className="studio-label" data-reveal="soft">Areas of contribution</p>
            <ul>
              {study.hero.contributions.map((contribution) => (
                <li data-reveal="soft" key={contribution.title}>
                  <h2>{contribution.title}</h2>
                  <p>{contribution.detail}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <dl className="sc-meta studio-shell">
          {study.hero.meta.map((item) => <div data-reveal="soft" key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
      </section>

      <section className="sc-section studio-shell sc-split" aria-labelledby="context-title">
        <header data-reveal="soft"><p className="studio-label">{study.context.eyebrow}</p><h2 id="context-title">{study.context.title}</h2></header>
        <div className="sc-prose">{study.context.body.map((paragraph) => <p data-reveal="soft" key={paragraph}>{paragraph}</p>)}</div>
      </section>

      <section className="sc-portal studio-shell" id="portal-tools" aria-labelledby="portal-title">
        <div className="sc-inset">
          <header className="sc-split">
            <div data-reveal="soft"><p className="studio-label">{study.portal.eyebrow}</p><h2 id="portal-title">{study.portal.title}</h2></div>
            <p className="sc-prose" data-reveal="soft">{study.portal.body}</p>
          </header>
          <div className="sc-audiences">
            {study.portal.audiences.map((audience) => <article data-reveal="soft" key={audience.title}><h3>{audience.title}</h3><p>{audience.body}</p></article>)}
          </div>
          <div className="sc-tools">
            {study.portal.groups.map((group) => <article data-reveal="soft" key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
          </div>
        </div>
      </section>

      <section className="sc-section studio-shell sc-split" aria-labelledby="progression-title">
        <header data-reveal="soft"><p className="studio-label">Role progression</p><h2 id="progression-title">From frontend ownership to full-stack delivery</h2></header>
        <div className="sc-narrative-list">{study.phases.map((phase) => <article data-reveal="soft" key={phase.title}><h3>{phase.title}</h3><p>{phase.body}</p></article>)}</div>
      </section>

      <section className="sc-section sc-configuration studio-shell" id="configuration" aria-labelledby="configuration-title">
        <header className="sc-split">
          <div data-reveal="soft"><p className="studio-label">{study.configuration.eyebrow}</p><h2 id="configuration-title">{study.configuration.title}</h2></div>
          <p className="sc-prose" data-reveal="soft">{study.configuration.body}</p>
        </header>
        <MemxConfigurationDiagram />
        <aside className="sc-scale" aria-label="Market implementation scale" data-reveal="soft">
          <p className="sc-scale-total"><strong>{study.scale.total}</strong><span>{study.scale.label}</span></p>
          {study.scale.groups.map((group) => <div key={group.label}><p><strong>{group.value}</strong> {group.label}</p><span>{group.detail}</span></div>)}
        </aside>
      </section>
      <CaseStudyFooter currentProjectId="memx" />
      <CaseStudyNavigator currentProjectId="memx" />
    </main>
  );
}
