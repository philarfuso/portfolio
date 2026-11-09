import type { Metadata } from "next";

import { SelectedWork } from "@/components/selected-work";
import { SiteHeader } from "@/components/site-header";
import { portfolioProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected web and mobile work by Phil Arfuso, including multi-market platforms, production apps, and client websites.",
};

export default function WorkPage() {
  return (
    <main className="st-work-page" id="main-content" tabIndex={-1}>
      <section className="st-work-hero" aria-labelledby="work-page-title">
        <SiteHeader current="work" tone="paper" />

        <div
          className="studio-shell st-work-intro"
          data-reveal-group
          data-reveal-stagger="95"
        >
          <p className="studio-label" data-reveal="soft">Portfolio</p>
          <h1 id="work-page-title" data-reveal="left">Work</h1>
          <p data-reveal="right">
            A selection of products, platforms, and client work that shows how
            I think, build, and ship across web and mobile.
          </p>
        </div>
      </section>

      <SelectedWork
        anchorId="projects"
        projects={portfolioProjects}
        showHeading={false}
        title="Portfolio projects"
        variant="index"
      />
    </main>
  );
}
