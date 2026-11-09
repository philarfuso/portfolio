import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync("src/app/work/memx/page.tsx", "utf8");
const content = readFileSync("src/content/case-studies/memx.ts", "utf8");
const diagrams = readFileSync(
  "src/components/case-study/memx-diagrams.tsx",
  "utf8",
);
const projects = readFileSync("src/content/projects.ts", "utf8");

test("MEMX case study preserves the approved market scale", () => {
  assert.match(content, /One equities market and two options markets/);
  assert.match(content, /One crypto market and four equities markets/);
  assert.match(content, /total: "8"/);
  assert.match(page, /study\.scale\.total/);
});

test("MEMX framing leads with the breadth of the work", () => {
  assert.match(content, /Member and operations tools/);
  assert.match(content, /Reusable frontend systems/);
  assert.match(content, /APIs, data, and production delivery/);
  assert.match(page, /study\.hero\.contributions\.map/);
  assert.match(projects, /Portal tooling/);
  assert.match(projects, /Full-stack systems/);
  assert.match(projects, /Production platform/);
});

test("MEMX case study explains the portal tools before the architecture", () => {
  assert.match(content, /title: "What I built"/);
  assert.match(content, /Ports/);
  assert.match(content, /Risk settings/);
  assert.match(content, /Institution switching/);
  assert.match(content, /Exchange members/);
  assert.match(content, /Market operations/);
  assert.match(page, /id="portal-tools"/);
});

test("MEMX case study attributes the shared architecture accurately", () => {
  assert.match(
    content,
    /my manager established the database-driven market architecture/,
  );
  assert.match(content, /I built the frontend system around it/);
});

test("MEMX case study reflects the completed tenure", () => {
  assert.match(content, /December 2019 to August 2026/);
  assert.match(content, /At MEMX, I built portal tools/);
  assert.doesNotMatch(content, /2019.+present|I now|I work on the portal/);
});

test("MEMX diagrams explain real relationships without private market data", () => {
  assert.match(diagrams, /Database configuration/);
  assert.match(diagrams, /Market-specific classes/);
  assert.match(diagrams, /sanitized request/i);
  assert.doesNotMatch(diagrams, /order book|matching engine|price|quantity/i);
  assert.match(diagrams, /configurationInputs\.map/);
  assert.match(diagrams, /Both feed shared platform context/);
  assert.match(page, /id="configuration"/);
  assert.match(diagrams, /id="configuration-diagram"/);
});

test("MEMX case study does not showcase the live IPO feature", () => {
  assert.doesNotMatch(content, /IPO|WebSocket/i);
  assert.doesNotMatch(page, /realtime|MemxRealtimeDiagram/i);
  assert.doesNotMatch(diagrams, /IPO|WebSocket|MemxRealtimeDiagram/i);
});

test("MEMX case study ends without a generic production-work section", () => {
  assert.doesNotMatch(content, /practice:\s*\{/);
  assert.doesNotMatch(page, /case-practice|study\.practice/);
});

test("MEMX route is discoverable and diagrams have text alternatives", () => {
  assert.match(projects, /route: "\/work\/memx"/);
  assert.match(page, /MemxConfigurationDiagram/);
  assert.match(diagrams, /<figcaption>/);
  assert.match(diagrams, /className="sr-only"/);
});
