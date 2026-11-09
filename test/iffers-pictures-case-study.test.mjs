import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync("src/app/work/iffers-pictures/page.tsx", "utf8");
const content = readFileSync(
  "src/content/case-studies/iffers-pictures.ts",
  "utf8",
);
const gallery = readFileSync(
  "src/components/case-study/iffers-gallery.tsx",
  "utf8",
);
const projects = readFileSync("src/content/projects.ts", "utf8");
const themes = readFileSync("src/app/case-study-themes.css", "utf8");

const approvedPhotos = [
  "maternity-session.jpg",
  "family-session.jpg",
  "engagement-detail.jpg",
  "baby-shower-details.jpg",
];

test("Iffer’s Pictures explains the business problem and end-to-end delivery", () => {
  assert.match(content, /open-ended brief to a live, responsive website/);
  assert.match(content, /Turning business needs into a clear web experience/);
  assert.match(content, /Turn requirements into structure/);
  assert.match(content, /Create a reusable interface system/);
  assert.match(content, /From requirements to a live production site/);
  assert.doesNotMatch(content, /Christmas|sister-in-law|Unlike most PixelVerse Studios projects/);
  assert.doesNotMatch(page, /Gift \/ collaboration \/ authorship/);
});

test("Iffer’s Pictures uses only the approved production photography", () => {
  for (const photo of approvedPhotos) {
    assert.equal(
      existsSync(`public/images/iffers-pictures/${photo}`),
      true,
      `${photo} should exist`,
    );
    assert.match(content, new RegExp(photo.replace(".", "\\.")));
  }
  assert.match(gallery, /alt=\{image\.alt\}/);
  assert.match(gallery, /image\.id === "family" \? "eager" : "lazy"/);
  assert.match(gallery, /unoptimized=\{image\.id === "family"\}/);
  assert.match(content, /photography remains the client’s work/i);
});

test("Iffer’s Pictures avoids unsupported business-performance claims", () => {
  assert.doesNotMatch(content, /conversion|revenue|traffic|ranking|performance metric/i);
});

test("Iffer’s Pictures route and transparent public link are implemented", () => {
  assert.match(projects, /route: "\/work\/iffers-pictures"/);
  assert.match(content, /https:\/\/ifferspictures\.com/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /opens in a new tab/);
  assert.match(page, /IffersGallery/);
});

test("Iffer’s Pictures uses its project-scoped photographic theme", () => {
  assert.match(page, /SiteHeader current="work" tone="paper"/);
  assert.match(page, /study\.origin\.body/);
  assert.match(themes, /\.case-study-iffers\s*\{/);
  assert.match(themes, /--case-ink: #302925/);
  assert.match(themes, /--case-highlight: #98563d/);
  assert.doesNotMatch(themes, /CONTACT SHEET \/ PRODUCTION PHOTOGRAPHY/);
  assert.match(page, /id="ownership"/);
  assert.match(gallery, /id="selected-photography"/);
});
