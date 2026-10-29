import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const selectedWork = await readFile(
  new URL("../src/components/selected-work.tsx", import.meta.url),
  "utf8",
);
const projects = await readFile(
  new URL("../src/content/projects.ts", import.meta.url),
  "utf8",
);
const siteHeader = await readFile(
  new URL("../src/components/site-header.tsx", import.meta.url),
  "utf8",
);
const contactPage = await readFile(
  new URL("../src/app/contact/page.tsx", import.meta.url),
  "utf8",
);
const heroArtwork = await readFile(
  new URL("../src/components/hero-artwork.tsx", import.meta.url),
  "utf8",
);
const resume = await readFile(
  new URL("../public/resume.pdf", import.meta.url),
);
const profile = await readFile(
  new URL("../src/content/profile.ts", import.meta.url),
  "utf8",
);

test("landing page uses the approved conversational copy", () => {
  assert.match(page, /Hey, I’m Phil\./);
  assert.match(page, /Full-stack developer/);
  assert.match(page, /web &amp; mobile/);
  assert.match(
    page,
    /I enjoy building software, solving difficult problems, and[\s\S]*creating better experiences for the people using it\./,
  );
  assert.doesNotMatch(page, /works well and feels good to use|good time doing it/);
  assert.match(page, /Explore my work/);
  assert.match(page, /Resume/);
  assert.doesNotMatch(page, /solving messy problems|I try to/);
});

test("landing page shows consulting availability with a mailto link", () => {
  assert.match(profile, /Available for contract and consulting work/);
  assert.match(profile, /email: "phil@philstackcoding\.com"/);
  assert.match(page, /className="hero-availability"/);
  assert.match(page, /className="home-close-email"/);
  assert.equal(
    page.match(/href=\{`mailto:\$\{profile\.consulting\.email\}`\}/g)?.length,
    2,
  );
});

test("landing page keeps selected work centralized and linked", () => {
  assert.match(page, /featuredProjects/);
  assert.match(page, /aria-label="Selected work"/);
  assert.match(selectedWork, /title = "Selected work"/);
  assert.match(
    selectedWork,
    /Full-stack platforms, mobile products, and client websites—work spanning architecture, interface design, and production delivery\./,
  );
  assert.doesNotMatch(selectedWork, /A mix of work from my day job/);
  assert.match(page, /className="project-rail-label"/);
  assert.match(page, /className="project-rail-divider"/);
  assert.doesNotMatch(page, /aria-hidden="true">\/<\/span>/);
  assert.match(page, /<SelectedWork \/>/);
  assert.match(projects, /MEMX/);
  assert.match(projects, /Domani/);
  assert.match(projects, /Iffer’s Pictures/);
  assert.match(selectedWork, /ProjectArtwork/);
  assert.match(selectedWork, /iffers-browser-desktop/);
  assert.match(selectedWork, /iffers-browser-mobile/);
  assert.match(selectedWork, /Responsive client website/);
  assert.doesNotMatch(selectedWork, /Light[\s\S]*Composition[\s\S]*Story/);
  assert.doesNotMatch(selectedWork, /Full case study \/ next/);
  assert.doesNotMatch(selectedWork, /01 \/ Selected work/);
  assert.doesNotMatch(page, /04 \/ What’s next/);
  assert.doesNotMatch(contactPage, /03 \/ Contact/);
});

test("landing page includes responsive and reduced-motion treatment", () => {
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /min-height: 44px/);
  assert.match(css, /overflow-x: clip/);
});

test("hero artwork uses layered editorial objects and restrained parallax", () => {
  assert.match(heroArtwork, /^"use client";/);
  assert.match(heroArtwork, /requestAnimationFrame/);
  assert.match(heroArtwork, /prefers-reduced-motion: reduce/);
  assert.match(heroArtwork, /pointer: coarse/);
  assert.match(heroArtwork, /getBoundingClientRect/);
  assert.match(heroArtwork, /artwork-parallax/);
  assert.match(heroArtwork, /artwork-lamp/);
  assert.match(heroArtwork, /lamp-head/);
  assert.match(heroArtwork, /lamp-upper-arm-motion/);
  assert.match(heroArtwork, /lamp-head-motion/);
  assert.match(heroArtwork, /artwork-desk-plane/);
  assert.match(heroArtwork, /desk-edge-ghost/);
  assert.match(heroArtwork, /desk-edge-secondary/);
  assert.match(heroArtwork, /artwork-chessboard/);
  assert.doesNotMatch(heroArtwork, /artwork-mobile-chess/);
  assert.match(heroArtwork, /artwork-notepad/);
  assert.match(heroArtwork, /artwork-brush-oval/);
  assert.match(heroArtwork, /boardSquares/);
  assert.match(heroArtwork, /chess-fallen-piece/);
  assert.doesNotMatch(heroArtwork, /M235 171c10 5 20 5 25-2/);
  assert.doesNotMatch(heroArtwork, /node-connector-signal|panel-signal|ribbon/);
  assert.doesNotMatch(
    heroArtwork,
    /FRONTEND|BACKEND|DATA|SHIP|P\/01|F\/02|A\.0\.02/,
  );
  assert.match(css, /\.artwork-chessboard/);
  assert.match(css, /mobile-chess-sculpture-clean\.webp/);
  assert.match(css, /\.hero-stage::before/);
  assert.match(css, /\.brush-stroke/);
  assert.doesNotMatch(css, /\.artwork-panel-signals polygon/);
  assert.doesNotMatch(css, /\.node-connector-signal/);
  assert.doesNotMatch(css, /rotateX\(var\(--tilt-x\)\)/);
  assert.doesNotMatch(css, /\.hero::before/);
});

test("landing page uses the approved Trailhead palette", () => {
  assert.match(css, /--ink: #14272c/);
  assert.match(css, /--accent: #76b9da/);
  assert.match(css, /--accent-dark: #3e8b6f/);
  assert.match(css, /--paper: #f5f0e2/);
  assert.doesNotMatch(page, /PaletteSwitcher/);
  assert.doesNotMatch(css, /data-theme/);
});

test("selected work restores the bounded blueprint grid material", () => {
  assert.match(css, /--blueprint-surface: #1b4a56/);
  assert.match(css, /--blueprint-grid-minor:/);
  assert.match(css, /--blueprint-grid-major:/);
  assert.match(css, /6rem 6rem/);
  assert.match(css, /1\.5rem 1\.5rem/);
});

test("shared work badges and case-study links have restrained interaction states", () => {
  assert.match(css, /\.work-scope li:hover/);
  assert.match(css, /\.work-case-link:hover/);
  assert.match(css, /\.work-case-link:focus-visible/);
  assert.match(css, /\.work-case-link:active/);
  assert.match(css, /\.work-scope li\s*\{[\s\S]*?cursor: default/);
  assert.match(css, /\.work-scope li::before[\s\S]*?transform 560ms cubic-bezier/);
  assert.match(css, /\.work-case-link::before[\s\S]*?transform 600ms cubic-bezier/);
});

test("primary portfolio destinations are implemented", () => {
  assert.match(siteHeader, /href: "\/work"/);
  assert.match(siteHeader, /href: "\/resume"/);
  assert.match(siteHeader, /href: "\/contact"/);
  assert.doesNotMatch(siteHeader, /href: "\/about"/);
  assert.match(contactPage, /Say hello/);
  assert.equal(resume.subarray(0, 4).toString(), "%PDF");
});
