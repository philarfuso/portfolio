import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [
  layout,
  home,
  header,
  notFound,
  icon,
  openGraphImage,
  css,
  contact,
  resume,
  memx,
  domani,
  iffers,
  work,
] = await Promise.all([
  read("src/app/layout.tsx"),
  read("src/app/page.tsx"),
  read("src/components/site-header.tsx"),
  read("src/app/not-found.tsx"),
  read("src/app/icon.tsx"),
  read("src/app/opengraph-image.tsx"),
  read("src/app/globals.css"),
  read("src/app/contact/page.tsx"),
  read("src/app/resume/page.tsx"),
  read("src/app/work/memx/page.tsx"),
  read("src/app/work/domani/page.tsx"),
  read("src/app/work/iffers-pictures/page.tsx"),
  read("src/app/work/page.tsx"),
]);

test("every route provides a keyboard skip target", () => {
  assert.match(layout, /className="skip-link" href="#main-content"/);
  for (const route of [home, contact, resume, memx, domani, iffers, work, notFound]) {
    assert.match(route, /id="main-content"/);
  }
  assert.match(css, /\.skip-link:focus/);
});

test("the primary navigation links to the work index", () => {
  assert.match(header, /"work" \| "resume" \| "consulting" \| "contact"/);
  assert.match(header, /id: "work"/);
  assert.match(work, /current="work"/);
  for (const route of [memx, domani, iffers]) {
    assert.match(route, /<SiteHeader tone=/);
    assert.doesNotMatch(route, /current="work"/);
  }
});

test("the homepage ends with a useful next step", () => {
  assert.match(home, /className="home-close"/);
  assert.match(home, /Working on something tricky/);
  assert.match(home, /href="\/contact"/);
  assert.match(css, /\.home-close/);
});

test("browser identity and missing-page treatment are branded", () => {
  assert.match(layout, /openGraph:/);
  assert.match(layout, /twitter:/);
  assert.match(layout, /Full-Stack Developer for Web & Mobile/);
  assert.match(layout, /software that works well and feels good to use/);
  assert.doesNotMatch(layout, /Frontend roots|building useful things/);
  assert.match(icon, /ImageResponse/);
  assert.match(openGraphImage, /I build software that works well and feels good to use/);
  assert.match(openGraphImage, /Full-stack developer/);
  assert.match(openGraphImage, /Web &amp; mobile/);
  assert.match(notFound, /Looks like this one wandered off/);
  assert.match(css, /\.not-found-page/);
});

test("SiteBehaviour analytics loads once across the application", () => {
  assert.match(layout, /import Script from "next\/script"/);
  assert.match(layout, /shouldEnableSiteBehaviour/);
  assert.match(layout, /siteBehaviourEnabled \? \(/);
  assert.match(layout, /id="sitebehaviour-bootstrap" strategy="afterInteractive"/);
  assert.match(layout, /createSiteBehaviourBootstrap\(siteBehaviourSecret\)/);
});

test("external links disclose new-tab behavior and isolate their opener", () => {
  assert.match(contact, /noopener noreferrer/);
  assert.match(contact, /opens in a new tab/);
  assert.match(iffers, /noopener noreferrer/);
  assert.match(iffers, /opens in a new tab/);
  assert.match(resume, /noopener noreferrer/);
});
