import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync("src/app/work/domani/page.tsx", "utf8");
const content = readFileSync("src/content/case-studies/domani.ts", "utf8");
const themes = readFileSync("src/app/case-study-themes.css", "utf8");
const loop = readFileSync(
  "src/components/case-study/domani-planning-loop.tsx",
  "utf8",
);
const projects = readFileSync("src/content/projects.ts", "utf8");

test("Domani case study keeps shipped features separate from exploration", () => {
  assert.match(content, /Intentional task rollover/);
  assert.match(content, /Progress analytics/);
  assert.match(content, /exploring: \["Nested checklists", "Bullet lists", "Planning templates"\]/);
});

test("Domani evidence retains its snapshot and limitations", () => {
  assert.match(content, /September 2, 2026/);
  assert.match(content, /66 registered accounts; 63 remained active/);
  assert.match(content, /641/);
  assert.match(content, /current task records/);
  assert.match(content, /31 \/ 9/);
  assert.match(page, /study\.evidence\.metrics\.map/);
  assert.match(page, /study\.evidence\.caveats\.map/);
  assert.match(content, /89/);
  assert.match(content, /recorded lifetime transactions/);
  assert.match(content, /not a recoverable lifetime creation total/);
  assert.match(content, /One App Store transaction could not be matched/);
  assert.match(content, /No conversion rate is shown/);
  assert.doesNotMatch(content, /downloads/i);
  assert.match(page, /Production Supabase, PostHog, and RevenueCat webhook ledger/);
});

test("Domani uses approved real production media with an informative alternative", () => {
  assert.equal(existsSync("public/images/domani/today-screen.png"), true);
  assert.match(page, /today-screen\.png/);
  assert.match(page, /alt=\{study\.media\.alt\}/);
  assert.match(content, /real public product media/i);
});

test("Domani route integrates its planning principles with real product media", () => {
  assert.match(projects, /route: "\/work\/domani"/);
  assert.doesNotMatch(page, /DomaniPlanningLoop/);
  assert.doesNotMatch(page, /DomaniOwnershipFlow/);
  assert.match(page, /aria-label="The daily planning loop"/);
  assert.match(page, /study\.principles\.map/);
  assert.match(loop, /className="sr-only"/);
  assert.match(loop, /<figcaption/);
});

test("Domani credits shared ownership accurately", () => {
  assert.match(projects, /scope: \["Technical architecture", "Mobile development", "Release operations"\]/);
  assert.doesNotMatch(projects, /App design/);
  assert.match(content, /eyebrow: "Why we made it"/);
  assert.match(content, /title: "We wanted planning to feel lighter"/);
  assert.match(content, /Most productivity apps we tried/);
  assert.doesNotMatch(content, /Why I made it|I wanted planning to feel lighter|Mobile development \/ Design/);
  assert.match(content, /friend who is a UX designer/);
  assert.match(content, /make the product and design decisions together/);
  assert.doesNotMatch(content, /Independent ownership|I conceived Domani/);
});

test("Domani uses its project-scoped botanical case-study theme", () => {
  assert.match(page, /SiteHeader current="work" tone="paper"/);
  assert.match(page, /id="product-view"/);
  assert.match(themes, /\.case-study-domani\s*\{/);
  assert.match(themes, /--case-ink: #17352f/);
  assert.match(themes, /--case-highlight: #d7aa5f/);
  assert.match(page, /study\.ownership\.body/);
  assert.match(page, /id="evidence"/);
});
