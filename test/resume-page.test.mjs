import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(
  new URL("../src/app/resume/page.tsx", import.meta.url),
  "utf8",
);
const content = await readFile(
  new URL("../src/content/resume.ts", import.meta.url),
  "utf8",
);
const header = await readFile(
  new URL("../src/components/site-header.tsx", import.meta.url),
  "utf8",
);
const css = await readFile(
  new URL("../src/app/studio-pages.css", import.meta.url),
  "utf8",
);
const pdf = await readFile(new URL("../public/resume.pdf", import.meta.url));

test("resume navigation opens the web resume", () => {
  assert.match(header, /id: "resume", label: "Resume", href: "\/resume"/);
  assert.match(page, /<SiteHeader current="resume" tone="paper"/);
  assert.match(page, /id="main-content"/);
});

test("web resume includes the supplied experience and technologies", () => {
  assert.match(content, /Senior Full Stack Engineer/);
  assert.match(content, /Front-End Engineer/);
  assert.match(content, /Lead Front-End Developer/);
  assert.match(content, /Co-Founder & Sole Developer/);
  assert.match(content, /React Native/);
  assert.match(content, /PostgreSQL/);
  assert.match(content, /Playwright/);
  assert.match(page, /resume\.experience\.map/);
  assert.match(page, /resume\.ventures\.map/);
});

test("multi-role companies show their complete tenure", () => {
  assert.match(content, /tenure: "6 yrs 9 mos"/);
  assert.match(content, /tenure: "1 yr 10 mos"/);
  assert.match(content, /January 2023 to August 2026/);
  assert.match(content, /December 2019 to December 2022/);
  assert.match(page, /className="st-resume-company-tenure"/);
  assert.match(page, /<span>Total tenure<\/span>/);
  assert.match(css, /\.st-resume-company-tenure/);
});

test("resume keeps a valid downloadable PDF", () => {
  assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
  assert.match(page, /href="\/resume\.pdf"/);
  assert.match(page, /download="Phil-Arfuso-Resume\.pdf"/);
});

test("resume layout has desktop and mobile treatments", () => {
  assert.match(css, /\.st-resume-hero/);
  assert.match(css, /\.st-resume-technology-grid/);
  assert.match(css, /\.st-resume-company/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(
    css,
    /@media \(max-width: 760px\)[\s\S]*?\.st-resume-company-tenure\s*\{[\s\S]*?grid-column: 2;[\s\S]*?grid-row: 1 \/ 3;/,
  );
});
