import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [component, projects, memx, domani, iffers, css] = await Promise.all([
  read("src/components/case-study/case-study-navigator.tsx"),
  read("src/content/projects.ts"),
  read("src/app/work/memx/page.tsx"),
  read("src/app/work/domani/page.tsx"),
  read("src/app/work/iffers-pictures/page.tsx"),
  read("src/app/globals.css"),
]);

test("case studies use one project-registry-driven navigator", () => {
  assert.match(component, /featuredProjects/);
  assert.match(component, /currentProjectId/);
  assert.match(
    component,
    /\(currentIndex - 1 \+ featuredProjects\.length\) % featuredProjects\.length/,
  );
  assert.match(component, /\(currentIndex \+ 1\) % featuredProjects\.length/);
  assert.match(component, /href=\{`\/#\$\{currentProject\.id\}`\}/);
  assert.match(component, /^"use client";/);
  assert.match(component, /useState\(false\)/);
  assert.match(component, /aria-expanded=\{isOpen\}/);
  assert.match(component, /event\.key === "Escape"/);
  assert.match(component, /pointerdown/);
  assert.match(component, /setIsOpen\(\(open\) => !open\)/);
  assert.match(component, /aria-label="Case study destinations"/);
  assert.match(component, /Previous case/);
  assert.match(component, /All work/);
  assert.match(component, /Next case/);
  assert.match(component, /function NavigatorArrow/);
  assert.match(component, /viewBox="0 0 16 16"/);
  assert.doesNotMatch(component, />\s*[←→]\s*</);
  assert.match(projects, /id: "memx"/);
  assert.match(projects, /id: "domani"/);
  assert.match(projects, /id: "iffers-pictures"/);
});

test("every case study has enhanced navigation and a server-rendered continuation", () => {
  assert.match(memx, /CaseStudyNavigator currentProjectId="memx"/);
  assert.match(domani, /CaseStudyNavigator currentProjectId="domani"/);
  assert.match(iffers, /CaseStudyNavigator currentProjectId="iffers-pictures"/);

  for (const page of [memx, domani, iffers]) {
    assert.match(page, /CaseStudyFooter currentProjectId=/);
  }
});

test("the navigator is fixed, responsive, accessible, and theme-aware", () => {
  assert.match(css, /\.case-navigator\s*\{[\s\S]*?position: fixed/);
  assert.match(css, /z-index: 40/);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
  assert.match(css, /env\(safe-area-inset-right\)/);
  assert.match(css, /--case-paper/);
  assert.match(css, /--case-ink/);
  assert.doesNotMatch(css, /\.case-navigator\[data-open="true"\] \.case-navigator-trigger\s*\{[^}]*visibility: hidden/);
  assert.match(css, /\.case-navigator\s*\{[\s\S]*?width: 54px/);
  assert.match(css, /width: min\(430px/);
  assert.match(css, /\.case-navigator-link\s*\{[\s\S]*?min-height: 52px/);
  assert.match(css, /\.case-navigator-arrow\s*\{[\s\S]*?width: 14px/);
  assert.match(css, /border-radius: 999px/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media print/);
});
