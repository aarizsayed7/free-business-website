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
  for (const [list, fields] of [["services", ["title"]], ["hours", ["days", "time"]], ["gallery", ["src", "alt"]], ["testimonials", ["name", "text"]], ["faq", ["q", "a"]]]) {
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

// FAQ content must be rendered as text, even when configuration contains HTML.
const children = {};
const nodes = {};
function node(tag) {
  return {
    tagName: tag,
    children: [],
    attributes: {},
    appendChild(child) { this.children.push(child); return child; },
    setAttribute(key, value) { this.attributes[key] = value; },
    addEventListener() {},
    classList: { add() {} },
    style: { setProperty() {} },
    get textContent() { return this.children.map((child) => child.nodeType === 3 ? child.textContent : child.textContent || "").join(""); },
    set textContent(value) { this.children = [{ textContent: String(value), nodeType: 3 }]; },
    hidden: false,
  };
}
const faqConfig = { q: "<img src=x onerror=alert(1)>", a: "<script>alert(1)</script>" };
const document = {
  documentElement: node("html"),
  head: node("head"),
  title: "",
  createElement(tag) { return node(tag); },
  createTextNode(text) { return { textContent: String(text), nodeType: 3 }; },
  getElementById(id) { return nodes[id] || (nodes[id] = node(id)); },
  querySelector() { return node("meta"); },
  querySelectorAll() { return []; },
};
const sandbox = {
  window: { SITE: { business: {}, contact: {}, faq: [faqConfig] } },
  document,
  location: { href: "https://example.test/" },
  URL,
  encodeURIComponent,
  JSON,
  Object,
  Array,
  String,
  Date,
};
vm.runInNewContext(readFileSync(new URL("app.js", root), "utf8"), sandbox);
if (!nodes["faq-list"]?.children[0]) throw new Error("FAQ question interpreted as HTML");
const details = nodes["faq-list"].children[0];
const summary = details.children[0];
const answer = details.children[1].children[0];
if (summary.textContent !== faqConfig.q || summary.children?.some((child) => child.tagName === "img")) {
  throw new Error("FAQ question interpreted as HTML");
}
if (answer.textContent !== faqConfig.a || answer.children?.some((child) => child.tagName === "script")) {
  throw new Error("FAQ answer interpreted as HTML");
}
const faqJsonLd = document.head.children.find((child) => child.type === "application/ld+json" && child.textContent.includes('"FAQPage"'));
if (!faqJsonLd) throw new Error("FAQPage JSON-LD was not added");
if (!labelKeys.includes("faq")) throw new Error('Missing translation key "faq"');
