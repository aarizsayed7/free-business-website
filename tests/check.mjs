// Checks every config and translation file. Run: node tests/check.mjs
// No dependencies. Exits with code 1 if anything is wrong.
import { readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";

const root = new URL("..", import.meta.url);
const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);

const en = JSON.parse(readFileSync(new URL("translations/en.json", root), "utf8"));
const labelKeys = Object.keys(en);

function loadConfig(file) {
  const sandbox = { window: {} };
  vm.runInNewContext(readFileSync(new URL(file, root), "utf8"), sandbox, { filename: file });
  return sandbox.window.SITE;
}

function checkConfig(file) {
  let S;
  try {
    S = loadConfig(file);
  } catch (e) {
    return fail(file, `does not run: ${e.message}`);
  }
  if (!S || typeof S !== "object") return fail(file, "must set window.SITE = { ... }");
  if (!S.business || !S.business.name) fail(file, "business.name is required");
  const c = S.contact || {};
  if (!c.phone && !c.whatsapp && !c.email) fail(file, "add at least one of contact.phone, contact.whatsapp, contact.email");
  if (c.whatsapp && !/^\d{8,15}$/.test(String(c.whatsapp))) fail(file, "contact.whatsapp must be digits only, with country code (e.g. 919876543210)");
  if (S.theme && S.theme.accent && !/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(S.theme.accent)) fail(file, "theme.accent must be a hex colour like #c2410c");
  for (const [list, fields] of [["services", ["title"]], ["hours", ["days", "time"]], ["gallery", ["src", "alt"]], ["testimonials", ["name", "text"]]]) {
    if (S[list] === undefined) continue;
    if (!Array.isArray(S[list])) { fail(file, `${list} must be a list [ ... ]`); continue; }
    S[list].forEach((item, i) => fields.forEach((f) => { if (!item || !item[f]) fail(file, `${list}[${i}].${f} is missing`); }));
  }
  for (const k of Object.keys(S.labels || {})) if (!labelKeys.includes(k)) fail(file, `labels.${k} is not a known label (see translations/en.json)`);
}

function checkTranslation(file) {
  let t;
  try {
    t = JSON.parse(readFileSync(new URL(file, root), "utf8"));
  } catch (e) {
    return fail(file, `is not valid JSON: ${e.message}`);
  }
  for (const k of labelKeys) if (!t[k] || typeof t[k] !== "string") fail(file, `missing "${k}"`);
  for (const k of Object.keys(t)) if (!labelKeys.includes(k)) fail(file, `unknown key "${k}"`);
}

const configs = ["site.config.js", ...readdirSync(new URL("examples", root)).filter((f) => f.endsWith(".js")).map((f) => `examples/${f}`)];
const translations = readdirSync(new URL("translations", root)).filter((f) => f.endsWith(".json")).map((f) => `translations/${f}`);
configs.forEach(checkConfig);
translations.forEach(checkTranslation);

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log(`✓ ${configs.length} config(s) and ${translations.length} translation(s) OK`);
