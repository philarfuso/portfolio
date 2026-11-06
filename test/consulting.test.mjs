import assert from "node:assert/strict";
import test from "node:test";
import { consulting, consultingMailto } from "../src/content/consulting.ts";
import { profile } from "../src/content/profile.ts";
import { portfolioProjects } from "../src/content/projects.ts";
import { publicRouteUrls } from "../src/lib/public-routes.ts";

test("offer-specific email drafts preserve recipient, subject, and optional prompts", () => {
  for (const offer of consulting.offers) {
    const url = new URL(consultingMailto(offer.id));
    assert.equal(url.protocol, "mailto:");
    assert.equal(url.pathname, profile.consulting.email);
    assert.equal(url.searchParams.get("subject"), `Consulting: ${offer.name}`);
    assert.match(url.searchParams.get("body"), /Timing:\nExpected scope or capacity:/);
    assert.equal(url.searchParams.size, 2);
  }
  assert.equal(new URL(consultingMailto()).pathname, profile.consulting.email);
});

test("consulting proof resolves only to published case-study routes", () => {
  for (const proof of consulting.proof) {
    const project = portfolioProjects.find((item) => item.id === proof.projectId);
    assert.ok(project?.route?.startsWith("/work/"));
    assert.ok(proof.contribution.length > 0);
  }
});

test("public route discovery follows the configured origin and includes only current routes", () => {
  const paths = ["/", "/work", "/resume", "/consulting", "/contact", "/work/memx", "/work/domani", "/work/iffers-pictures"];
  for (const value of ["www.example.test", " https://example.test/ ", "http://localhost:3109"]) {
    const urls = publicRouteUrls(value);
    assert.deepEqual(urls.map((url) => new URL(url).pathname), paths);
    assert.equal(new Set(urls).size, urls.length);
    assert.equal(new Set(urls.map((url) => new URL(url).origin)).size, 1);
  }
});
