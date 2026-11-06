import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { exportConsultingKit, kitVersion } from "../scripts/export-consulting-kit.mjs";
import { consulting } from "../src/content/consulting.ts";
import { profile } from "../src/content/profile.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const script = path.join(root, "scripts/export-consulting-kit.mjs");
const expectedFiles = [
  "00-start-here.md", "01-positioning.md", "02-service-menu-pricing.md", "03-contract-applications.md",
  "04-agency-outreach.md", "05-ownership-outreach.md", "06-assessment-outreach.md", "07-follow-ups.md",
  "08-discovery-notes.md", "09-proposal-implementation.md", "10-proposal-ownership.md",
  "11-proposal-assessment.md", "12-assessment-follow-on.md", "13-operating-guide.md",
];

async function workspace(t) {
  const directory = await mkdtemp(path.join(os.tmpdir(), "consulting-kit-test-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

function runScript(args, location = script) {
  return spawnSync(process.execPath, [location, ...args], { encoding: "utf8", env: { ...process.env, HTTP_PROXY: "http://127.0.0.1:1", HTTPS_PROXY: "http://127.0.0.1:1" } });
}

async function fixtureRepository(directory) {
  const fixture = path.join(directory, "fixture-repo");
  await mkdir(path.join(fixture, "scripts"), { recursive: true });
  await mkdir(path.join(fixture, "src/content"), { recursive: true });
  await cp(script, path.join(fixture, "scripts/export-consulting-kit.mjs"));
  await cp(path.join(root, "src/content/consulting.ts"), path.join(fixture, "src/content/consulting.ts"));
  await cp(path.join(root, "src/content/profile.ts"), path.join(fixture, "src/content/profile.ts"));
  await cp(path.join(root, "consulting-kit"), path.join(fixture, "consulting-kit"), { recursive: true });
  return fixture;
}

test("offline export produces all editable categories, current catalog values and verified manifest", async (t) => {
  const directory = await workspace(t);
  const output = path.join(directory, "private", "kit");
  const result = await exportConsultingKit(output);
  assert.equal(result.files, expectedFiles.length);
  assert.deepEqual((await readdir(output)).sort(), [...expectedFiles, "manifest.json"].sort());
  const manifest = JSON.parse(await readFile(path.join(output, "manifest.json"), "utf8"));
  assert.equal(manifest.version, kitVersion);
  assert.deepEqual(manifest.offers, consulting.offers.map(({ id, name }) => ({ id, name })));
  for (const { name, sha256 } of manifest.files) {
    const content = await readFile(path.join(output, name), "utf8");
    assert.match(content, /DRAFT/);
    assert.doesNotMatch(content, /\{\{/);
    assert.equal(createHash("sha256").update(content).digest("hex"), sha256);
  }
  const menu = await readFile(path.join(output, "02-service-menu-pricing.md"), "utf8");
  for (const offer of consulting.offers) assert.ok(menu.includes(offer.name));
  const profileDraft = await readFile(path.join(output, "01-positioning.md"), "utf8");
  assert.ok(profileDraft.includes(profile.consulting.email));
  assert.match(menu, /\[\[RATE_HYPOTHESIS\]\]/);
  for (const name of expectedFiles.filter((name) => name.includes("proposal"))) {
    const proposal = await readFile(path.join(output, name), "utf8");
    for (const section of ["Client", "ependencies", "cceptance", "ayment", "hange"]) assert.ok(proposal.toLowerCase().includes(section.toLowerCase()), `${name}: ${section}`);
  }
});

test("empty existing output works, repeated export preserves personalized files", async (t) => {
  const directory = await workspace(t);
  const output = path.join(directory, "kit");
  await mkdir(output);
  await exportConsultingKit(output);
  const personalPath = path.join(output, "01-positioning.md");
  await writeFile(personalPath, "PRIVATE_SYNTHETIC_DRAFT_DO_NOT_OVERWRITE");
  await assert.rejects(exportConsultingKit(output), /empty|overwritten/);
  assert.equal(await readFile(personalPath, "utf8"), "PRIVATE_SYNTHETIC_DRAFT_DO_NOT_OVERWRITE");
  assert.equal((await readdir(directory)).filter((name) => name.startsWith(".consulting-kit-")).length, 0);
});

test("entire repository and nonexistent descendants are rejected without creating output", async () => {
  for (const output of [root, path.dirname(root), path.join(root, "public", "new-private-kit"), path.join(root, "docs", "new-private-kit"), path.join(root, ".next", "new-private-kit")]) {
    await assert.rejects(exportConsultingKit(output), /outside the entire portfolio checkout/);
  }
});

test("realpath checks reject symlink or junction ancestors pointing into the repository", async (t) => {
  const directory = await workspace(t);
  const alias = path.join(directory, "repo-alias");
  await symlink(root, alias, process.platform === "win32" ? "junction" : "dir");
  await assert.rejects(exportConsultingKit(path.join(alias, "docs", "missing", "kit")), /outside the entire portfolio checkout/);
});

test("empty docs/public/build destinations and in-checkout aliases to outside remain forbidden", async (t) => {
  const directory = await workspace(t);
  const fixture = await fixtureRepository(directory);
  const fixtureScript = path.join(fixture, "scripts/export-consulting-kit.mjs");
  for (const name of ["docs", "public", "build"]) {
    const output = path.join(fixture, name, "empty");
    await mkdir(output, { recursive: true });
    const result = runScript(["--output", output], fixtureScript);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /outside the entire portfolio checkout/);
    assert.deepEqual(await readdir(output), []);
  }
  const outside = path.join(directory, "outside");
  await mkdir(outside);
  const alias = path.join(fixture, "output-alias");
  await symlink(outside, alias, process.platform === "win32" ? "junction" : "dir");
  const result = runScript(["--output", alias], fixtureScript);
  assert.equal(result.status, 1);
  assert.deepEqual(await readdir(outside), []);
});

test("an external directory alias exports to its real empty destination", async (t) => {
  const directory = await workspace(t);
  const output = path.join(directory, "actual");
  const alias = path.join(directory, "alias");
  await mkdir(output);
  await symlink(output, alias, process.platform === "win32" ? "junction" : "dir");
  await exportConsultingKit(alias);
  assert.ok((await readdir(output)).includes("manifest.json"));
});

test("invalid arguments, file destinations and dangling links fail without altering existing data", async (t) => {
  const directory = await workspace(t);
  for (const args of [[], ["--output"], ["--unknown", path.join(directory, "kit")], ["--output", path.join(directory, "kit"), "--extra"]]) {
    const result = runScript(args);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Usage:/);
  }
  await assert.rejects(exportConsultingKit(""), /explicit output/);
  const file = path.join(directory, "file");
  await writeFile(file, "keep me");
  await assert.rejects(exportConsultingKit(file), /must be a directory/);
  assert.equal(await readFile(file, "utf8"), "keep me");
  const dangling = path.join(directory, "dangling");
  await symlink(path.join(directory, "missing"), dangling, process.platform === "win32" ? "junction" : "dir");
  await assert.rejects(exportConsultingKit(dangling), /dangling/);
  assert.deepEqual((await readdir(directory)).sort(), ["dangling", "file"]);
});

test("broken catalog references fail before creating a misleading partial pack", async (t) => {
  const directory = await workspace(t);
  const fixture = await fixtureRepository(directory);
  await writeFile(path.join(fixture, "consulting-kit", "99-invalid.md"), "{{offer:missing:name}}");
  const output = path.join(directory, "kit");
  const result = runScript(["--output", output], path.join(fixture, "scripts/export-consulting-kit.mjs"));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unknown catalog reference/);
  assert.deepEqual((await readdir(directory)).sort(), ["fixture-repo"]);
});

test("catalog and template changes do not alter earlier personalized exports", async (t) => {
  const directory = await workspace(t);
  const fixture = await fixtureRepository(directory);
  const fixtureScript = path.join(fixture, "scripts/export-consulting-kit.mjs");
  const first = path.join(directory, "first");
  assert.equal(runScript(["--output", first], fixtureScript).status, 0);
  const oldPath = path.join(first, "01-positioning.md");
  await writeFile(oldPath, "MY_PRIVATE_SYNTHETIC_PERSONALIZED_DRAFT");
  const catalogPath = path.join(fixture, "src/content/consulting.ts");
  const oldCatalog = await readFile(catalogPath, "utf8");
  await writeFile(catalogPath, oldCatalog.replace(consulting.positioning, "Revised synthetic positioning"));
  await writeFile(path.join(fixture, "consulting-kit", "01-positioning.md"), "# Changed template — {{positioning}}");
  const second = path.join(directory, "second");
  assert.equal(runScript(["--output", second], fixtureScript).status, 0);
  assert.equal(await readFile(oldPath, "utf8"), "MY_PRIVATE_SYNTHETIC_PERSONALIZED_DRAFT");
  assert.match(await readFile(path.join(second, "01-positioning.md"), "utf8"), /Changed template — Revised synthetic positioning/);
});

test("export excludes unrelated private files and secret environment values", async (t) => {
  const directory = await workspace(t);
  const fixture = await fixtureRepository(directory);
  const fileSentinel = "SYNTHETIC_PRIVATE_FILE_VALUE_7d918c";
  const environmentSentinel = "SYNTHETIC_SECRET_ENV_VALUE_824bc1";
  await writeFile(path.join(fixture, ".private-notes.txt"), fileSentinel);
  const output = path.join(directory, "private-output");
  const result = spawnSync(process.execPath, [path.join(fixture, "scripts/export-consulting-kit.mjs"), "--output", output], {
    encoding: "utf8",
    env: { ...process.env, CONSULTING_TEST_SECRET: environmentSentinel },
  });
  assert.equal(result.status, 0, result.stderr);
  for (const name of await readdir(output)) {
    const content = await readFile(path.join(output, name), "utf8");
    assert.ok(!content.includes(fileSentinel), `private file leaked into ${name}`);
    assert.ok(!content.includes(environmentSentinel), `secret environment value leaked into ${name}`);
  }
});
