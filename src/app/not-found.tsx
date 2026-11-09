import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page could not be found.",
};

export default function NotFound() {
  return (
    <main className="st-not-found" id="main-content" tabIndex={-1}>
      <SiteHeader tone="paper" />
      <div className="st-not-found-layout" data-reveal-group data-reveal-stagger="110">
        <div className="st-not-found-code" data-reveal="scale" aria-hidden="true">
          404
        </div>
        <div className="st-not-found-copy" data-reveal="right" data-reveal-group data-reveal-stagger="75">
          <p data-reveal="soft">That route doesn’t go anywhere.</p>
          <h1 data-reveal="soft">Looks like this one wandered off</h1>
          <div className="st-not-found-actions" data-reveal="soft">
            <Link className="studio-button" href="/">
              Back home
            </Link>
            <Link className="studio-link" href="/#work">
              Browse work
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
