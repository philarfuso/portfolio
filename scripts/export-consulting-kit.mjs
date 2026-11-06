import { createHash } from "node:crypto";
import { lstat, mkdir, mkdtemp, readFile, readdir, realpath, rename, rm, rmdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { consulting } from "../src/content/consulting.ts";
import { profile } from "../src/content/profile.ts";

export const kitVersion = "1.0.0";
const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const templateDirectory = new URL("../consulting-kit/", import.meta.url);

function contains(parent, child) {
  const relative = path.relative(parent, child);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}

// Resolve the nearest real existing ancestor before considering missing segments.
// lstat also distinguishes a dangling symlink from an ordinary missing directory.
async function canonicalDestination(destination) {
  let current = path.resolve(destination);
  const missing = [];
  for (;;) {
    try {
      await lstat(current);
      return path.join(await realpath(current), ...missing);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      try {
        const entry = await lstat(current);
        if (entry.isSymbolicLink()) throw new Error("Output uses a dangling symbolic link.");
      } catch (entryError) {
        if (entryError.code !== "ENOENT") throw entryError;
      }
      const parent = path.dirname(current);
      if (parent === current) throw new Error("Cannot resolve output directory.");
      missing.unshift(path.basename(current));
      current = parent;
    }
  }
}

async function passesThroughCheckout(destination, root) {
  let current = destination;
  for (;;) {
    try {
      if (contains(root, await realpath(current))) return true;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    const parent = path.dirname(current);
    if (parent === current) return false;
    current = parent;
  }
}

function renderTemplate(source) {
  return source.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
    if (key === "positioning") return consulting.positioning;
    if (key === "business") return consulting.business;
    if (key === "email") return profile.consulting.email;
    const [, id, field] = /^offer:([^:]+):(name|description|collaboration|boundary|outputs)$/.exec(key) ?? [];
    const offer = consulting.offers.find((item) => item.id === id);
    if (!offer) throw new Error(`Unknown catalog reference: ${key}`);
    return field === "outputs" ? offer.outputs.map((item) => `- ${item}`).join("\n") : offer[field];
  });
}

export async function exportConsultingKit(output) {
  if (typeof output !== "string" || !output.trim()) throw new Error("Provide an explicit output directory with --output <directory>.");
  const lexicalDestination = path.resolve(output);
  const root = await realpath(repositoryRoot);
  const destination = await canonicalDestination(lexicalDestination);
  if (contains(root, destination) || contains(destination, root) || await passesThroughCheckout(lexicalDestination, root)) {
    throw new Error("Output must be outside the entire portfolio checkout, not an ancestor or an aliased in-checkout directory.");
  }
  let existing = false;
  try {
    const entry = await lstat(destination);
    if (!entry.isDirectory()) throw new Error("Output must be a directory.");
    if ((await readdir(destination)).length) throw new Error("Output directory must be empty; existing drafts will not be overwritten.");
    existing = true;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  // Render and validate everything before creating the destination or staging files.
  const names = (await readdir(templateDirectory)).filter((name) => name.endsWith(".md")).sort();
  if (!names.length) throw new Error("No consulting templates were found.");
  const documents = [];
  for (const name of names) {
    const templatePath = new URL(name, templateDirectory);
    if (!(await lstat(templatePath)).isFile()) throw new Error(`Template is not a regular file: ${name}`);
    const body = renderTemplate(await readFile(templatePath, "utf8"));
    documents.push({ name, text: `<!-- Consulting kit ${kitVersion} | DRAFT — review before use | Fill [[NAMED_FIELDS]] -->\n\n${body}` });
  }
  const manifest = {
    version: kitVersion,
    status: "DRAFT — review and personalize before use",
    unresolvedFieldSyntax: "[[NAMED_FIELD]]",
    offers: consulting.offers.map(({ id, name }) => ({ id, name })),
    files: documents.map(({ name, text }) => ({ name, sha256: createHash("sha256").update(text).digest("hex") })),
    note: "Offline editable copies. Exporting does not contact anyone, update a pipeline, reserve capacity, or record revenue. Earlier exports are independent copies.",
  };
  const parent = path.dirname(destination);
  await mkdir(parent, { recursive: true, mode: 0o700 });
  // Recheck after parent creation, including any pre-existing symbolic-link ancestors.
  if ((await canonicalDestination(destination)) !== destination) throw new Error("Output path changed while preparing the export; retry with a stable directory.");
  const staging = await mkdtemp(path.join(parent, ".consulting-kit-"));
  try {
    for (const { name, text } of documents) await writeFile(path.join(staging, name), text, { flag: "wx", mode: 0o600 });
    await writeFile(path.join(staging, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, { flag: "wx", mode: 0o600 });
    if (existing) await rmdir(destination); // Fails safely if anything was added after validation.
    await rename(staging, destination);
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
  return { destination, files: documents.length, version: kitVersion };
}

function parseArguments(args) {
  if (args.length !== 2 || args[0] !== "--output" || !args[1] || args[1].startsWith("--")) {
    throw new Error("Usage: npm run consulting:kit -- --output <empty-directory-outside-checkout>");
  }
  return args[1];
}

if (process.argv[1] && await realpath(process.argv[1]) === await realpath(fileURLToPath(import.meta.url))) {
  try {
    const result = await exportConsultingKit(parseArguments(process.argv.slice(2)));
    console.log(`Exported ${result.files} editable DRAFT documents (v${result.version}) to ${result.destination}`);
  } catch (error) {
    console.error(`Consulting kit: ${error.message}`);
    process.exitCode = 1;
  }
}
