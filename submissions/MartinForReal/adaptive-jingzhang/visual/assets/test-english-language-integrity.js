#!/usr/bin/env node
"use strict";

// Does the English package read as English?
//
// Both languages are generated from the same registries, and the generator used to put
// Chinese punctuation into English strings: route labels came out as "（step-free
// throughout）" with fullwidth brackets and a seasonal label came out as "Winter
// operation：" with a fullwidth colon. Nothing failed, because nothing was looking. This
// test looks. It rejects CJK characters and fullwidth punctuation across the English
// publication surfaces and across every English string held in the package registries, and
// it licenses the places where Chinese is deliberate — the two bilingual brand pairs, the
// two language links, the Chinese section names quoted inside the evidence locators, and
// the two official spellings of the Dazhongsi area name — only in the context that makes
// each one legible to an English reader. The same characters anywhere else still fail.
//
// The English A0 and A3 boards are drawn from the registry strings scanned here, so the
// scan reaches them through their source; the text actually embedded in the four PDFs is
// audited separately with an independent PDF reader.
//
// Everything this test expects is written here rather than imported from the builders or
// from the shared contract module. The canonical title, the thirteen section headings and
// every licensed phrase are pinned as literals. A builder that changes one of them has to
// change this file too, deliberately, which is the only way the test can still fail when
// the thing it is testing is wrong.
//
// Read-only. Usage: node test-english-language-integrity.js

const fs = require("fs");
const path = require("path");

const contract = require("./key-area-contract.js");

const { PACKAGE_ROOT, exists, readText, readJson, pdfDocument, harness, cli } = contract;

// The three English surfaces a reader actually reads: the authored proposal, the report the
// repository renderer publishes from it, and the standalone English viewer.
const SURFACES = ["proposal.en.md", "report/proposal.en.html", "visual/index.en.html"];

// These are publications too. Registry strings are inputs; page-local extracted text is
// what a juror actually reads. The A0 and A3 English PDFs must therefore pass the same
// language gate through their own /Page /Contents /Resources and /ToUnicode mappings.
const PDF_SURFACES = ["drawings/a0-boards.en.pdf", "drawings/a3-booklet.en.pdf"];

// Rejected wholesale on an English surface. The ranges cover Chinese and Japanese script
// together with the fullwidth and ideographic punctuation that the generator leaked.
const REJECTED_RANGES = [
  ["CJK symbols and punctuation", 0x3000, 0x303f],
  ["hiragana and katakana", 0x3040, 0x30ff],
  ["CJK ideograph extension A", 0x3400, 0x4dbf],
  ["CJK unified ideograph", 0x4e00, 0x9fff],
  ["CJK compatibility ideograph", 0xf900, 0xfaff],
  ["halfwidth and fullwidth form", 0xff01, 0xffee],
  ["astral CJK ideograph", 0x20000, 0x2fa1f],
  ["astral CJK ideograph", 0x30000, 0x323af],
];

// Named individually because these are the characters that actually leaked. A range check
// alone reports a code point; a name says what the reader would have seen on the page.
const NAMED_PUNCTUATION = new Map([
  ["　", "ideographic space"],
  ["、", "ideographic comma"],
  ["。", "ideographic full stop"],
  ["！", "fullwidth exclamation mark"],
  ["（", "fullwidth left parenthesis"],
  ["）", "fullwidth right parenthesis"],
  ["，", "fullwidth comma"],
  ["：", "fullwidth colon"],
  ["；", "fullwidth semicolon"],
  ["？", "fullwidth question mark"],
]);

// Each licence removes the Chinese together with the context that earns it, so the same
// characters written anywhere else survive the removal and are reported.
const TEXT_LICENCES = [
  {
    name: "bilingual open-season brand pair",
    pattern: /ADAPTIVE JING-ZHANG OPEN SEASON \/ 京张应变开放季/g,
  },
  {
    name: "bilingual identity brand pair",
    pattern: /ADAPTIVE JING-ZHANG \/ 京张应变/g,
  },
  {
    name: "report language link to the Chinese proposal",
    pattern: /<a href="proposal\.html">阅读中文版本<\/a>/g,
  },
  {
    name: "viewer language link to the Chinese viewer",
    pattern: /<a href="index\.html" lang="zh-CN">中文<\/a>/g,
  },
];

// The locator tail of an evidence note quotes the section names it points at. Quoting a
// Chinese heading verbatim is what makes the reference checkable, so the quotation is
// licensed; prose before the marker is not.
const LOCATOR_MARKER = "Exact references:";

// The two Chinese spellings are evidence, not stray translated prose. Only the complete
// provenance sentence or a spelling joined to its pinned source id earns a licence in an
// English PDF. A bare token, a token on another page, or a new surrounding claim remains
// visible to the CJK scan.
const PDF_SPELLING_PROVENANCE_LICENCES = [
  {
    name: "Dazhongsi spelling provenance sentence",
    pattern: /Both official spellings\s+集聚\s+and\s+聚集\s+appear in public material for the Dazhongsi area name\./g,
  },
  {
    name: "official-announcement spelling provenance row",
    pattern: /集聚\s+(?:official announcement wording as transcribed in the source registry\s+)?OFFICIAL-ANNOUNCEMENT/g,
  },
  {
    name: "agent-taskbook spelling provenance row",
    pattern: /聚集\s+(?:agent taskbook wording and the submitted key-area attribute name\s+)?AGENT-TASKBOOK/g,
  },
];

const CANONICAL_TITLE_EN = "Adaptive Jing-Zhang: Disagreement Atlas and Reversible City";
const SUPERSEDED_TITLE_EN = "Adaptive Jing-Zhang: The Disagreement Atlas and Reversible City";

const SECTION_HEADINGS_EN = [
  "Design Basis and Source List",
  "Three-Level Scope Framework",
  "Coordinated Research Area: Industry and Future City Research",
  "Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design",
  "Detailed Design of Key Areas",
  "AI Innovation Ecosystem, Personas, and AI+ Scenarios",
  "Land Use, Building Scale, and Retain-Renovate-Demolish Strategy",
  "Transport, Rail, Municipal Infrastructure, and Public Services",
  "Blue-Green Network, Public Space, and Urban Character",
  "Renewal Projects, Implementation Policy, and Phasing",
  "Metrics, Area Recalculation, and Compliance Matrix",
  "Risk, Copyright, and Compliance",
  "References",
];

// Left in a draft these read as finished text and say nothing.
const PLACEHOLDER_TOKENS = ["TODO", "TBD", "FIXME", "XXX", "Lorem ipsum", "lorem ipsum"];

const MAX_REPORTED_PER_SURFACE = 8;

function classify(character) {
  const named = NAMED_PUNCTUATION.get(character);
  if (named) return named;
  const code = character.codePointAt(0);
  for (const [name, low, high] of REJECTED_RANGES) {
    if (code >= low && code <= high) return name;
  }
  return null;
}

function offenders(text) {
  const found = [];
  for (let index = 0; index < text.length;) {
    const character = String.fromCodePoint(text.codePointAt(index));
    const kind = classify(character);
    if (kind) found.push({ index, character, kind });
    index += character.length;
  }
  return found;
}

function lineOf(text, index) {
  let line = 1;
  for (let cursor = 0; cursor < index; cursor += 1) if (text[cursor] === "\n") line += 1;
  return line;
}

function excerpt(text, index) {
  const from = Math.max(0, index - 40);
  const to = Math.min(text.length, index + 40);
  return text.slice(from, to).replace(/\s+/g, " ").trim();
}

function codePoint(character) {
  return `U+${character.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`;
}

// Blanking rather than deleting keeps every later offset equal to the offset in the file,
// so a reported line number points at the line a person would open.
function blank(text, pattern, counter, key) {
  return text.replace(pattern, (match) => {
    counter.set(key, (counter.get(key) ?? 0) + 1);
    return " ".repeat(match.length);
  });
}

function packageJsonFiles() {
  const files = [];
  (function walk(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(absolute);
      else if (entry.name.endsWith(".json")) files.push(path.relative(PACKAGE_ROOT, absolute).split(path.sep).join("/"));
    }
  })(PACKAGE_ROOT);
  return files;
}

// An English registry string is one written under an `en` or `*_en` key, or one held by a
// record that declares itself English. A Chinese field inside an English record stays
// Chinese, so it is not collected.
function isEnglishLanguage(value) {
  return typeof value === "string" && /^en(?:[-_][A-Za-z0-9]+)*$/i.test(value);
}

function collectEnglishStrings(file, root) {
  const collected = [];
  (function walk(node, pointer, key, insideEnglishRecord, owner) {
    if (typeof node === "string") {
      const english = isEnglishLanguage(key) || /_en(?:[-_][A-Za-z0-9]+)*$/i.test(key ?? "") || insideEnglishRecord;
      if (english) collected.push({ file, pointer, value: node, owner });
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((item, index) => walk(item, `${pointer}[${index}]`, key, insideEnglishRecord, owner));
      return;
    }
    if (node && typeof node === "object") {
      const english = insideEnglishRecord || [node.language, node.lang, node.locale].some(isEnglishLanguage);
      for (const [childKey, value] of Object.entries(node)) {
        if (english && (childKey === "zh" || /_zh$/.test(childKey))) continue;
        walk(value, `${pointer}.${childKey}`, childKey, english, node);
      }
    }
  })(root, "", null, false, null);
  return collected;
}

function run() {
  return harness("KA-EN", "the English surfaces and English registry strings are written in English", (fail) => {
    const detail = {
      surfaces: {},
      pdf_surfaces: {},
      registry_strings: 0,
      licences_used: {},
      pdf_licences_used: {},
      headings_checked: 0,
      mutation_controls: {},
    };

    // Focused controls make the two former false-pass routes executable. U+20000 is a
    // surrogate pair in JavaScript, and `en-US` used to fall outside the English-record
    // collector. If either control stops reaching the scanner, this test fails before it
    // can bless the package.
    const astralControl = offenders(`plain English ${String.fromCodePoint(0x20000)}`);
    detail.mutation_controls.astral_cjk = astralControl.length;
    if (astralControl.length !== 1 || astralControl[0].character.codePointAt(0) !== 0x20000) {
      fail("the astral-CJK mutation control did not reach the English character scanner");
    }
    const localeControl = collectEnglishStrings("<en-US-control>", {
      language: "en-US",
      note: String.fromCodePoint(0x20000),
    });
    detail.mutation_controls.en_us_record_strings = localeControl.length;
    if (!localeControl.some((entry) => entry.pointer === ".note" && offenders(entry.value).length === 1)) {
      fail("the en-US record mutation control did not reach the English character scanner");
    }

    // --- the published English surfaces -------------------------------------------------
    const licenceUse = new Map();
    for (const surface of SURFACES) {
      if (!exists(surface)) {
        fail(`${surface} does not exist; the English package is incomplete`);
        continue;
      }
      const original = readText(surface);
      let text = original;
      for (const licence of TEXT_LICENCES) text = blank(text, licence.pattern, licenceUse, licence.name);

      const found = offenders(text);
      detail.surfaces[surface] = { characters: original.length, offenders: found.length };
      for (const offender of found.slice(0, MAX_REPORTED_PER_SURFACE)) {
        fail(
          `${surface}:${lineOf(original, offender.index)} carries a ${offender.kind} ${offender.character} ` +
            `(${codePoint(offender.character)}) in "${excerpt(original, offender.index)}"`,
        );
      }
      if (found.length > MAX_REPORTED_PER_SURFACE) {
        fail(`${surface} carries ${found.length} characters that do not belong on an English surface`);
      }

      if (original.includes(SUPERSEDED_TITLE_EN)) {
        fail(`${surface} still calls the proposal "${SUPERSEDED_TITLE_EN}", which was superseded`);
      }
      for (const token of PLACEHOLDER_TOKENS) {
        if (original.includes(token)) fail(`${surface} still carries the placeholder token ${token}`);
      }
      for (const match of original.matchAll(/[A-Za-z0-9] +[,.;:!?](?=\s|$)/g)) {
        fail(`${surface}:${lineOf(original, match.index)} puts a space before punctuation in "${match[0]}"`);
      }
      for (const match of original.matchAll(/[a-z]  +[a-z]/g)) {
        fail(`${surface}:${lineOf(original, match.index)} runs two spaces inside a sentence at "${match[0]}"`);
      }
    }

    // A licence nobody uses is a hole in the test rather than a permission, so each one has
    // to be earned by an occurrence somewhere in the English surfaces.
    for (const licence of TEXT_LICENCES) {
      const used = licenceUse.get(licence.name) ?? 0;
      detail.licences_used[licence.name] = used;
      if (used === 0) {
        fail(`no English surface uses the ${licence.name} licence; it permits Chinese that nothing needs`);
      }
    }

    // --- the rendered English drawing pages ---------------------------------------------
    const pdfLicenceUse = new Map();
    for (const surface of PDF_SURFACES) {
      if (!exists(surface)) {
        fail(`${surface} does not exist; the English drawing package is incomplete`);
        continue;
      }
      const document = pdfDocument(surface);
      if (document.page_details.length !== document.pages) {
        fail(`${surface} resolves ${document.page_details.length} page-tree leaves for ${document.pages} declared pages`);
      }
      if (document.unmapped_glyphs.length > 0) {
        fail(`${surface} carries ${document.unmapped_glyphs.length} shown glyphs with no /ToUnicode mapping`);
      }

      let characters = 0;
      let foundCount = 0;
      for (const page of document.page_details) {
        if (page.text.trim() === "") fail(`${surface} page ${page.number} yields no extracted text`);
        characters += page.text.length;
        let scanned = page.text;
        for (const licence of PDF_SPELLING_PROVENANCE_LICENCES) {
          scanned = blank(scanned, licence.pattern, pdfLicenceUse, licence.name);
        }
        const found = offenders(scanned);
        foundCount += found.length;
        for (const offender of found.slice(0, MAX_REPORTED_PER_SURFACE)) {
          fail(
            `${surface}:page-${page.number} carries a ${offender.kind} ${offender.character} ` +
              `(${codePoint(offender.character)}) in "${excerpt(page.text, offender.index)}"`,
          );
        }
        if (found.length > MAX_REPORTED_PER_SURFACE) {
          fail(`${surface}:page-${page.number} carries ${found.length} characters that do not belong on an English drawing page`);
        }
      }
      detail.pdf_surfaces[surface] = {
        pages: document.page_details.length,
        characters,
        offenders: foundCount,
      };
    }
    for (const licence of PDF_SPELLING_PROVENANCE_LICENCES) {
      const used = pdfLicenceUse.get(licence.name) ?? 0;
      detail.pdf_licences_used[licence.name] = used;
      if (used === 0) {
        fail(`no English PDF page uses the ${licence.name} licence; it permits Chinese that no drawing needs`);
      }
    }

    // --- English strings held in the registries ------------------------------------------
    const files = packageJsonFiles();
    if (files.length === 0) fail("the package holds no JSON registries to scan");

    let locatorNotes = 0;
    let spellingProvenanceSeen = false;
    for (const file of files) {
      let root;
      try {
        root = readJson(file);
      } catch (error) {
        fail(`${file} is not readable JSON: ${error instanceof Error ? error.message : String(error)}`);
        continue;
      }
      for (const entry of collectEnglishStrings(file, root)) {
        detail.registry_strings += 1;
        // The one place the old title belongs is the record that retires it; everywhere else
        // it is the package still calling the proposal by a name it no longer has.
        const retiresTheOldTitle =
          file === "visual/assets/regeneration-source.json" &&
          entry.pointer.startsWith(".document_title.superseded_variants.en");
        if (!retiresTheOldTitle && entry.value.includes(SUPERSEDED_TITLE_EN)) {
          fail(`${file}${entry.pointer} still calls the proposal "${SUPERSEDED_TITLE_EN}", which was superseded`);
        }

        let scanned = entry.value;

        // A compliance or design-depth note quotes the Chinese section names it points at.
        // The quotation is only licensed after the locator marker; the English argument in
        // front of it has to be English.
        const isComplianceNote =
          file === "compliance_matrix.json" && /^\.requirements\[\d+\]\.evidence_note_en$/.test(entry.pointer);
        const isDepthNote =
          file === "design_depth_matrix.json" && /^\.items\[\d+\]\.evidence_summary_en$/.test(entry.pointer);
        if (isComplianceNote || isDepthNote) {
          locatorNotes += 1;
          const marker = scanned.indexOf(LOCATOR_MARKER);
          if (marker < 0) {
            fail(`${file}${entry.pointer} quotes Chinese section names without an "${LOCATOR_MARKER}" locator`);
          } else {
            const sections = (isComplianceNote ? entry.owner.report_sections : entry.owner.proposal_sections) ?? [];
            if (sections.length === 0) {
              fail(`${file}${entry.pointer} registers no sections, so nothing licenses the Chinese it quotes`);
            }
            let tail = scanned.slice(marker);
            for (const section of sections) tail = tail.split(section).join("");
            scanned = `${scanned.slice(0, marker)}${tail}`;
          }
        }

        // Both official spellings of the Dazhongsi area name are recorded on purpose, and
        // the record exists to show that the package did not silently pick one.
        if (file === "visual/assets/regeneration-source.json" && entry.pointer === ".spelling_provenance.note_en") {
          spellingProvenanceSeen = true;
          if (!scanned.includes("集聚") || !scanned.includes("聚集")) {
            fail(`${file}${entry.pointer} no longer shows both official spellings, so this licence should be removed`);
          }
          scanned = scanned.split("集聚").join("").split("聚集").join("");
        }

        const found = offenders(scanned);
        for (const offender of found.slice(0, MAX_REPORTED_PER_SURFACE)) {
          fail(
            `${file}${entry.pointer} carries a ${offender.kind} ${offender.character} ` +
              `(${codePoint(offender.character)}) in "${excerpt(entry.value, offender.index)}"`,
          );
        }
        if (found.length > MAX_REPORTED_PER_SURFACE) {
          fail(`${file}${entry.pointer} carries ${found.length} characters that do not belong in an English string`);
        }
      }
    }
    detail.locator_notes = locatorNotes;
    if (locatorNotes === 0) fail("no evidence note quotes a section locator; the locator licence permits nothing");
    if (!spellingProvenanceSeen) {
      fail("visual/assets/regeneration-source.json.spelling_provenance.note_en is gone; its licence should be removed");
    }

    // --- the title and the section headings ----------------------------------------------
    if (!CANONICAL_TITLE_EN.includes(" and ")) {
      fail("the pinned canonical English title does not join its two halves with \"and\"");
    }
    const source = "visual/assets/regeneration-source.json";
    if (!exists(source)) {
      fail(`${source} does not exist; nothing registers the English title or headings`);
      return detail;
    }
    const registry = readJson(source);
    const title = registry.document_title ?? {};
    if ((title.canonical ?? {}).en !== CANONICAL_TITLE_EN) {
      fail(`${source} registers the English title as "${(title.canonical ?? {}).en}", expected "${CANONICAL_TITLE_EN}"`);
    }
    const superseded = (title.superseded_variants ?? {}).en ?? [];
    if (!superseded.includes(SUPERSEDED_TITLE_EN)) {
      fail(`${source} does not register "${SUPERSEDED_TITLE_EN}" as superseded, so nothing keeps it out of the package`);
    }

    const registered = ((registry.section_headings ?? {}).headings ?? []).map((heading) => heading.en);
    detail.headings_checked = registered.length;
    if (registered.length !== SECTION_HEADINGS_EN.length) {
      fail(`${source} registers ${registered.length} English headings, expected ${SECTION_HEADINGS_EN.length}`);
    }
    SECTION_HEADINGS_EN.forEach((heading, index) => {
      if (registered[index] !== heading) {
        fail(`${source} heading ${index + 1} is "${registered[index]}", expected "${heading}"`);
      }
    });

    if (exists("proposal.en.md")) {
      const markdown = readText("proposal.en.md");
      const frontMatter = markdown.match(/^---\n([\s\S]*?)\n---\n/);
      if (!frontMatter) fail("proposal.en.md has no front matter, so it declares no title");
      else {
        const declared = frontMatter[1].match(/^title:\s*"(.*)"\s*$/m);
        if (!declared) fail("proposal.en.md front matter declares no quoted title");
        else if (declared[1] !== CANONICAL_TITLE_EN) {
          fail(`proposal.en.md is titled "${declared[1]}", expected "${CANONICAL_TITLE_EN}"`);
        }
        if (!/^language:\s*"en"\s*$/m.test(frontMatter[1])) {
          fail("proposal.en.md front matter does not declare language en");
        }
        const body = markdown.slice(frontMatter[0].length);
        const bodyTitles = body.match(/^# .*$/gm) ?? [];
        if (bodyTitles.length !== 0) {
          fail(`proposal.en.md repeats ${bodyTitles.length} top-level heading(s) in the body: ${bodyTitles.join(" | ")}`);
        }
        const bodyHeadings = (body.match(/^## .*$/gm) ?? []).map((line) => line.slice(3).trim());
        if (bodyHeadings.length !== SECTION_HEADINGS_EN.length) {
          fail(`proposal.en.md carries ${bodyHeadings.length} section headings, expected ${SECTION_HEADINGS_EN.length}`);
        }
        SECTION_HEADINGS_EN.forEach((heading, index) => {
          if (bodyHeadings[index] !== heading) {
            fail(`proposal.en.md heading ${index + 1} is "${bodyHeadings[index]}", expected "${heading}"`);
          }
        });
      }
    }

    if (exists("report/proposal.en.html")) {
      const report = readText("report/proposal.en.html");
      const titles = report.match(/<h1[^>]*>[\s\S]*?<\/h1>/g) ?? [];
      if (titles.length !== 1) fail(`report/proposal.en.html carries ${titles.length} top-level headings, expected one`);
      const reported = (titles[0] ?? "").replace(/<[^>]+>/g, "").trim();
      if (titles.length === 1 && reported !== CANONICAL_TITLE_EN) {
        fail(`report/proposal.en.html is titled "${reported}", expected "${CANONICAL_TITLE_EN}"`);
      }
      const reportHeadings = (report.match(/<h2[^>]*>[\s\S]*?<\/h2>/g) ?? []).map((element) =>
        element.replace(/<[^>]+>/g, "").trim(),
      );
      if (reportHeadings.length !== SECTION_HEADINGS_EN.length) {
        fail(
          `report/proposal.en.html carries ${reportHeadings.length} section headings, expected ${SECTION_HEADINGS_EN.length}`,
        );
      }
      SECTION_HEADINGS_EN.forEach((heading, index) => {
        if (reportHeadings[index] !== heading) {
          fail(`report/proposal.en.html heading ${index + 1} is "${reportHeadings[index]}", expected "${heading}"`);
        }
      });
    }

    if (exists("visual/index.en.html")) {
      const viewer = readText("visual/index.en.html");
      if (!/<html[^>]*\blang="en"/.test(viewer)) fail('visual/index.en.html does not declare lang="en"');
      const documentTitle = (viewer.match(/<title[^>]*>([\s\S]*?)<\/title>/) ?? [])[1] ?? "";
      if (!documentTitle.startsWith("Adaptive Jing-Zhang")) {
        fail(`visual/index.en.html is titled "${documentTitle}", which does not open with the English project name`);
      }
      if (!/<a href="index\.html" lang="zh-CN">/.test(viewer)) {
        fail("visual/index.en.html offers no link to the Chinese viewer");
      }
    }

    return detail;
  });
}

if (require.main === module) cli(run());

module.exports = { run };
