#!/usr/bin/env node
"use strict";

// If a reviewer opens the English booklet, do they find all fifteen English drawings — and
// can a reviewer who cannot see them find out what they show?
//
// Thirty rasters can exist on disk, be registered correctly, and still be unpublished —
// referenced by a viewer that never loads them, or placed on a board that was never
// printed. This test walks the other direction: from each artifact to the viewer that shows
// it, the PDF page that carries it, and the proposal that cites it, and it checks the two
// languages never cross.
//
// The non-visual half of publication is checked the same way and to the same standard. A
// drawing that reaches a screen reader as "image" has not been published to the person using
// it, so every plate is required to carry the registered alt text verbatim, to point at a
// long description that exists exactly once, and to offer the 1800 × 1200 file itself —
// a reviewer who needs to read a dimension string cannot do it in a card-width copy.
//
// Everything this test expects is written here rather than imported from the builders. The
// id pattern, the raster prefix and the two link labels are stated as an oracle: if a
// builder changes them, this test is supposed to fail, which it cannot do if it reads its
// expectation from the thing it is testing.
//
// Page counts are read from the PDFs themselves rather than from the registry, because a
// registry describing sixteen pages of a ten-page booklet is exactly the drift this is for.
//
// Read-only. Usage: node test-publication-parity.js

const contract = require("./key-area-contract.js");

const {
  expectedArtifacts,
  exists,
  readText,
  readJson,
  pdfDocument,
  pdfDocumentBuffer,
  pngIdatPayload,
  harness,
  cli,
} = contract;

const REGISTRY = "visual/assets/area-plates.json";
const PLACEMENTS = "visual/assets/drawing-placements.json";
const LABELS = "visual/assets/regeneration-source.json";

// The four printed surfaces and the shape each must have. Sixteen A3 pages and four A0
// boards is the published extent; a booklet that grew content without growing pages has put
// two drawings where one fits.
const SHEETS = [
  { sheet: "a3", language: "zh", file: "drawings/a3-booklet.pdf", pages: 16 },
  { sheet: "a3", language: "en", file: "drawings/a3-booklet.en.pdf", pages: 16 },
  { sheet: "a0", language: "zh", file: "drawings/a0-boards.pdf", pages: 4 },
  { sheet: "a0", language: "en", file: "drawings/a0-boards.en.pdf", pages: 4 },
];

const VIEWERS = { zh: "visual/index.html", en: "visual/index.en.html" };
const DOCUMENTS = { zh: ["proposal.md", "report/proposal.html"], en: ["proposal.en.md", "report/proposal.en.html"] };

// The viewers sit one directory below the package root, so this is the prefix a registered
// raster path must carry to be reachable from a viewer opened over file://.
const RASTER_PREFIX = "../";

// The id a figure carries and the id its long description carries. Stated here so that a
// builder which renamed either would be caught rather than followed.
function figureId(area, concept, language) {
  return `plate-${area.prefix.toLowerCase()}-${concept.concept_id}-${language}`;
}

function descriptionId(area, concept, language) {
  return `${figureId(area, concept, language)}-description`;
}

// What each language calls the two things a reader has to recognise: the disclosure that
// opens the long description, and the link to the full-size file. Pinned, and also required
// to still be what the label registry holds, so the two cannot drift apart silently.
const FULL_RESOLUTION_LABEL = { zh: "原图 PNG", en: "Full-resolution PNG" };
const DESCRIPTION_LABEL = { zh: "图面说明", en: "Plate description" };

const OTHER = { zh: "en", en: "zh" };

function escapeForRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// The entities the viewers emit, plus numeric references, so a registered string can be
// compared with what a reader is actually given rather than with its escaped form.
function decodeEntities(value) {
  return value
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number(decimal)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

// The markup of one element, from its opening tag to the close that matches it. Depth is
// tracked rather than assumed, because a naive scan for the first close tag would cut a
// nested element short and quietly hide whatever came after it.
function sliceElement(html, tag, start) {
  const token = new RegExp(`<${tag}\\b|</${tag}>`, "g");
  token.lastIndex = start;
  let depth = 0;
  let match = token.exec(html);
  while (match) {
    if (match[0][1] === "/") {
      depth -= 1;
      if (depth === 0) return html.slice(start, match.index + match[0].length);
    } else {
      depth += 1;
    }
    match = token.exec(html);
  }
  return null;
}

function openingTag(fragment) {
  const end = fragment.indexOf(">");
  return end === -1 ? fragment : fragment.slice(0, end + 1);
}

function attribute(tag, name) {
  const match = new RegExp(`\\b${name}="([^"]*)"`).exec(tag);
  return match ? match[1] : null;
}

function occurrences(haystack, needle) {
  return (haystack.match(new RegExp(escapeForRegExp(needle), "g")) ?? []).length;
}

// Visible text, with markup removed and runs of whitespace collapsed. Used where the
// question is what a reader hears or reads, not how it was marked up.
function textOf(fragment) {
  return decodeEntities(fragment.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function blankMarkup(value) {
  return value.replace(/[^\r\n]/g, " ");
}

// Comments and templates are bytes in an HTML file but are not the publication a browser
// presents. Blank rather than delete them so diagnostics can still use offsets from the
// original source. A noscript fallback is intentionally left active: these offline viewers
// contain no script, so a browser would render it.
function stripInactiveMarkup(html) {
  let rendered = html.replace(/<!--[\s\S]*?-->/g, blankMarkup);
  for (const tag of ["template"]) {
    let match;
    const opening = new RegExp(`<${tag}\\b[^>]*>`, "i");
    while ((match = opening.exec(rendered)) !== null) {
      const element = sliceElement(rendered, tag, match.index);
      const length = element === null ? match[0].length : element.length;
      rendered = `${rendered.slice(0, match.index)}${blankMarkup(rendered.slice(match.index, match.index + length))}${rendered.slice(match.index + length)}`;
    }
  }
  return rendered;
}

const VOID_ELEMENTS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);

function hiddenOpeningTag(tag) {
  const hiddenAttribute = /\shidden(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?(?=\s|\/?>)/i.test(tag);
  const ariaHidden = attribute(tag, "aria-hidden")?.toLowerCase() === "true";
  const style = decodeEntities(attribute(tag, "style") ?? "");
  const inlineHidden = /(?:^|;)\s*(?:display\s*:\s*none|visibility\s*:\s*hidden|content-visibility\s*:\s*hidden)\s*(?:;|$)/i.test(style);
  const classes = (attribute(tag, "class") ?? "").split(/\s+/);
  const hiddenClass = classes.some((name) => ["hidden", "visually-hidden", "sr-only"].includes(name));
  return hiddenAttribute || ariaHidden || inlineHidden || hiddenClass;
}

// Remove containers whose descendants are not rendered, then remove explicit hidden
// subtrees. This is intentionally a small parser for the deterministic static viewers, not
// a general HTML implementation. It closes the important loophole: a commented or hidden
// copy of a figure cannot make publication checks green.
function visibleMarkup(html) {
  let rendered = stripInactiveMarkup(html);
  for (const tag of ["head", "script", "style"]) {
    let match;
    const opening = new RegExp(`<${tag}\\b[^>]*>`, "i");
    while ((match = opening.exec(rendered)) !== null) {
      const element = sliceElement(rendered, tag, match.index);
      const length = element === null ? match[0].length : element.length;
      rendered = `${rendered.slice(0, match.index)}${blankMarkup(rendered.slice(match.index, match.index + length))}${rendered.slice(match.index + length)}`;
    }
  }

  let hidden;
  const opening = /<([A-Za-z][A-Za-z0-9:-]*)\b[^>]*>/g;
  while ((hidden = opening.exec(rendered)) !== null) {
    if (!hiddenOpeningTag(hidden[0])) continue;
    const tag = hidden[1].toLowerCase();
    const element = VOID_ELEMENTS.has(tag) ? hidden[0] : sliceElement(rendered, tag, hidden.index);
    const length = element === null ? hidden[0].length : element.length;
    rendered = `${rendered.slice(0, hidden.index)}${blankMarkup(rendered.slice(hidden.index, hidden.index + length))}${rendered.slice(hidden.index + length)}`;
    opening.lastIndex = 0;
  }
  return rendered;
}

function visibleDocumentText(file, source) {
  if (/\.html$/i.test(file)) return textOf(visibleMarkup(source));
  return source.replace(/<!--[\s\S]*?-->/g, blankMarkup);
}

// One-page deterministic PDF used only as a parser control. Object 7 carries a convincing
// detached `/Im0 Do`; only object 5 is the page's /Contents. This is the exact distinction
// the former global stream scan could not make.
function pdfVisibilityFixture({ drawOnPage, resourceOnPage }) {
  const stream = (dictionary, payload) => {
    const bytes = Buffer.isBuffer(payload) ? payload : Buffer.from(payload, "latin1");
    return Buffer.concat([
      Buffer.from(`<< ${dictionary}${dictionary ? " " : ""}/Length ${bytes.length} >>\nstream\n`, "latin1"),
      bytes,
      Buffer.from("\nendstream", "latin1"),
    ]);
  };
  const objects = [
    null,
    Buffer.from("<< /Type /Catalog /Pages 2 0 R >>", "latin1"),
    Buffer.from("<< /Type /Pages /Kids [3 0 R] /Count 1 >>", "latin1"),
    Buffer.from("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 10 10] /Resources 4 0 R /Contents 5 0 R >>", "latin1"),
    Buffer.from(resourceOnPage ? "<< /XObject << /Im0 6 0 R >> >>" : "<< >>", "latin1"),
    stream("", drawOnPage ? "q /Im0 Do Q" : "q Q"),
    stream("/Type /XObject /Subtype /Image /Width 1 /Height 1 /ColorSpace /DeviceRGB /BitsPerComponent 8", Buffer.from("rgb", "latin1")),
    stream("", "/Im0 Do"),
  ];
  const chunks = [Buffer.from("%PDF-1.7\n", "latin1")];
  const offsets = new Array(objects.length).fill(0);
  let offset = chunks[0].length;
  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = offset;
    const body = Buffer.concat([
      Buffer.from(`${id} 0 obj\n`, "latin1"),
      objects[id],
      Buffer.from("\nendobj\n", "latin1"),
    ]);
    chunks.push(body);
    offset += body.length;
  }
  const xrefOffset = offset;
  const xref = [`xref\n0 ${objects.length}\n`, "0000000000 65535 f \n"];
  for (let id = 1; id < objects.length; id += 1) {
    xref.push(`${String(offsets[id]).padStart(10, "0")} 00000 n \n`);
  }
  chunks.push(Buffer.from(xref.join(""), "latin1"));
  chunks.push(Buffer.from(
    `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`,
    "latin1",
  ));
  return Buffer.concat(chunks);
}

// Every id declared in a document, and every in-page link, so an anchor that points at
// nothing and an id that two elements share are both visible.
function documentShape(html) {
  const ids = [...html.matchAll(/\bid="([^"]*)"/g)].map((match) => match[1]);
  const sections = [...html.matchAll(/<section\b[^>]*>/g)].map((match) => attribute(match[0], "id") ?? "(none)");
  return {
    ids,
    sections,
    hashLinks: [...html.matchAll(/href="#([^"]*)"/g)].map((match) => match[1]),
    counts: {
      figure: occurrences(html, "<figure"),
      img: occurrences(html, "<img"),
      details: occurrences(html, "<details"),
      summary: occurrences(html, "<summary"),
      described: occurrences(html, "aria-describedby="),
      h1: occurrences(html, "<h1"),
      section: sections.length,
    },
  };
}

// A viewer has to open from a memory stick with the network unplugged. Anything with a
// scheme, anything protocol-relative, and any script at all would make that untrue.
function remoteReferences(html) {
  const found = [];
  for (const match of html.matchAll(/\b(?:src|href|action|data|poster)="([^"]*)"/g)) {
    const value = match[1];
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value) && !value.startsWith("#")) found.push(value);
    else if (value.startsWith("//")) found.push(value);
  }
  for (const match of html.matchAll(/url\(\s*['"]?([a-zA-Z][a-zA-Z0-9+.-]*:|\/\/)/g)) found.push(`url(${match[1]}`);
  for (const match of html.matchAll(/@import\s+[^;]+/g)) found.push(match[0].slice(0, 40));
  for (const match of html.matchAll(/<(script|iframe|object|embed|form)\b/g)) found.push(`<${match[1]}>`);
  return found;
}

function run() {
  return harness("KA-PUB", "all thirty artifacts are published, described and reachable in the right language", (fail) => {
    const artifacts = expectedArtifacts();
    const mutationControls = {};

    const visibilityControl = visibleMarkup(
      "<!-- <figure id=\"comment-only\">COMMENT_ONLY</figure> -->" +
      "<template><figure id=\"template-only\">TEMPLATE_ONLY</figure></template>" +
      "<div hidden><figure id=\"hidden-only\">HIDDEN_ONLY</figure></div>" +
      "<figure id=\"visible-control\">VISIBLE_CONTROL</figure>",
    );
    mutationControls.visible_html = occurrences(visibilityControl, "VISIBLE_CONTROL");
    if (visibilityControl.includes("COMMENT_ONLY") || visibilityControl.includes("TEMPLATE_ONLY") || visibilityControl.includes("HIDDEN_ONLY")) {
      fail("the visible-HTML mutation control lets commented, templated or hidden figures satisfy publication");
    }
    if (mutationControls.visible_html !== 1) {
      fail("the visible-HTML control removed a rendered figure together with hidden metadata");
    }

    const drawnControl = pdfDocumentBuffer(
      pdfVisibilityFixture({ drawOnPage: true, resourceOnPage: true }),
      "<drawn-page-control>",
    );
    const detachedControl = pdfDocumentBuffer(
      pdfVisibilityFixture({ drawOnPage: false, resourceOnPage: true }),
      "<detached-stream-mutation>",
    );
    const unresolvedControl = pdfDocumentBuffer(
      pdfVisibilityFixture({ drawOnPage: true, resourceOnPage: false }),
      "<missing-page-resource-mutation>",
    );
    mutationControls.pdf_draws = drawnControl.page_details[0]?.xobject_draws.length ?? -1;
    mutationControls.detached_draws = detachedControl.page_details[0]?.xobject_draws.length ?? -1;
    mutationControls.unresolved_xobjects = unresolvedControl.page_details[0]?.unresolved_xobjects.length ?? -1;
    if (mutationControls.pdf_draws !== 1 || !drawnControl.page_details[0].xobject_draws[0].image_stream.equals(Buffer.from("rgb"))) {
      fail("the drawn-page control does not resolve the image stream reached through /Page /Contents and /Resources");
    }
    if (mutationControls.detached_draws !== 0) {
      fail("a detached content stream can still masquerade as a page-visible image draw");
    }
    if (mutationControls.unresolved_xobjects !== 1) {
      fail("a page `Do` whose resource is missing does not reach the unresolved-XObject check");
    }

    const measured = {};
    const pdfByFile = new Map();
    for (const sheet of SHEETS) {
      if (!exists(sheet.file)) {
        fail(`${sheet.file} does not exist`);
        continue;
      }
      const document = pdfDocument(sheet.file);
      pdfByFile.set(sheet.file, document);
      measured[sheet.file] = document.pages;
      if (document.pages !== sheet.pages) {
        fail(`${sheet.file} has ${document.pages} pages, expected ${sheet.pages}`);
      }
      if (document.page_details.length !== sheet.pages) {
        fail(`${sheet.file} resolves ${document.page_details.length} page-tree leaves, expected ${sheet.pages}`);
      }
      if (document.font_file2 < 1) fail(`${sheet.file} embeds no font programme`);
      for (const page of document.page_details) {
        for (const name of page.unresolved_xobjects) {
          fail(`${sheet.file} page ${page.number} draws /${name} but its /Page resources do not resolve that XObject`);
        }
      }
    }

    if (!exists(PLACEMENTS)) return fail(`${PLACEMENTS} does not exist; no PDF placement is registered`);
    const sheetByKey = new Map((readJson(PLACEMENTS).sheets ?? []).map((sheet) => [`${sheet.sheet}:${sheet.language}`, sheet]));

    for (const sheet of SHEETS) {
      const declared = sheetByKey.get(`${sheet.sheet}:${sheet.language}`);
      if (!declared) {
        fail(`${PLACEMENTS} declares no ${sheet.sheet.toUpperCase()} sheet for ${sheet.language}`);
        continue;
      }
      if (declared.file !== sheet.file) {
        fail(`${PLACEMENTS} points the ${sheet.language} ${sheet.sheet.toUpperCase()} sheet at ${declared.file}, expected ${sheet.file}`);
      }
      if (declared.pages !== sheet.pages) {
        fail(`${PLACEMENTS} declares ${declared.pages} pages for ${sheet.file}, expected ${sheet.pages}`);
      }

      const placements = declared.placements ?? [];
      const seen = new Set();
      for (const placement of placements) {
        if (seen.has(placement.placement_id)) fail(`${sheet.file} reuses placement id ${placement.placement_id}`);
        seen.add(placement.placement_id);
        if (!(placement.page >= 1 && placement.page <= sheet.pages)) {
          fail(`${sheet.file} places ${placement.placement_id} on page ${placement.page}, outside 1-${sheet.pages}`);
        }
      }

      // Fifteen artifacts per language, each appearing exactly once on each sheet.
      const carried = placements.map((placement) => placement.artifact_id).filter(Boolean);
      const expectedIds = artifacts.filter((artifact) => artifact.language === sheet.language).map((a) => a.artifact_id);
      for (const id of expectedIds) {
        const times = carried.filter((entry) => entry === id).length;
        if (times !== 1) fail(`${sheet.file} carries ${id} ${times} times, expected once`);
      }
      for (const id of new Set(carried)) {
        if (!expectedIds.includes(id)) fail(`${sheet.file} carries ${id}, which is not a ${sheet.language} artifact`);
      }
    }

    if (!exists(REGISTRY)) return fail(`${REGISTRY} does not exist`);
    const records = new Map((readJson(REGISTRY).artifacts ?? []).map((record) => [record.artifact_id, record]));

    // The wording the viewers are required to use must also be the wording the label
    // registry holds, or the two are free to drift and only one of them is checked.
    if (exists(LABELS)) {
      const labels = readJson(LABELS).ui_labels ?? {};
      for (const language of ["zh", "en"]) {
        if (labels[`plate_full_resolution_${language}`] !== FULL_RESOLUTION_LABEL[language]) {
          fail(`${LABELS} calls the ${language} full-resolution link ${JSON.stringify(labels[`plate_full_resolution_${language}`])}, expected ${JSON.stringify(FULL_RESOLUTION_LABEL[language])}`);
        }
        if (labels[`drawing_plate_description_${language}`] !== DESCRIPTION_LABEL[language]) {
          fail(`${LABELS} calls the ${language} plate description ${JSON.stringify(labels[`drawing_plate_description_${language}`])}, expected ${JSON.stringify(DESCRIPTION_LABEL[language])}`);
        }
      }
    } else {
      fail(`${LABELS} does not exist; the viewer labels have no registry`);
    }

    const viewerText = {};
    const viewerActive = {};
    const viewerShape = {};
    for (const [language, file] of Object.entries(VIEWERS)) {
      if (!exists(file)) {
        fail(`${file} does not exist`);
        continue;
      }
      const source = readText(file);
      viewerActive[language] = stripInactiveMarkup(source);
      viewerText[language] = visibleMarkup(source);
      viewerShape[language] = documentShape(viewerText[language]);
    }
    const documentText = {};
    for (const [language, files] of Object.entries(DOCUMENTS)) {
      documentText[language] = [];
      for (const file of files) {
        if (!exists(file)) {
          fail(`${file} does not exist`);
          continue;
        }
        const source = readText(file);
        documentText[language].push({ file, text: visibleDocumentText(file, source) });
      }
    }

    // One document at a time: nothing loaded from a network, one top-level heading, no id
    // used twice, no in-page link that lands nowhere, and no image without a description.
    for (const [language, file] of Object.entries(VIEWERS)) {
      const html = viewerText[language];
      const shape = viewerShape[language];
      if (html === undefined) continue;

      for (const reference of new Set(remoteReferences(viewerActive[language] ?? html))) {
        fail(`${file} reaches outside the package for ${reference}`);
      }
      if (shape.counts.h1 !== 1) fail(`${file} has ${shape.counts.h1} <h1> elements, expected exactly one`);
      for (const id of new Set(shape.ids.filter((value, index) => shape.ids.indexOf(value) !== index))) {
        fail(`${file} declares id ${id} more than once`);
      }
      for (const target of new Set(shape.hashLinks)) {
        if (!shape.ids.includes(target)) fail(`${file} links to #${target}, which no element declares`);
      }
      for (const match of html.matchAll(/<img\b[^>]*>/g)) {
        const alt = attribute(match[0], "alt");
        const hidden = attribute(match[0], "aria-hidden") === "true";
        if (alt === null) fail(`${file} carries an <img> with no alt attribute: ${match[0].slice(0, 90)}`);
        else if (alt.trim() === "" && !hidden) fail(`${file} carries an <img> with an empty alt and no aria-hidden: ${match[0].slice(0, 90)}`);
      }
    }

    // Both languages must be the same document in two languages, not two documents. The
    // section sequence is the reader's route through the argument, so a section present in
    // one language and absent in the other is a different proposal, not a translation.
    if (viewerShape.zh && viewerShape.en) {
      const zh = viewerShape.zh;
      const en = viewerShape.en;
      if (zh.sections.join(" ") !== en.sections.join(" ")) {
        fail(`the viewers run different sections: ${VIEWERS.zh} has [${zh.sections.join(" ")}], ${VIEWERS.en} has [${en.sections.join(" ")}]`);
      }
      for (const key of Object.keys(zh.counts)) {
        if (zh.counts[key] !== en.counts[key]) {
          fail(`the viewers disagree on ${key}: ${zh.counts[key]} in ${VIEWERS.zh}, ${en.counts[key]} in ${VIEWERS.en}`);
        }
      }
    }

    // Nothing may be described twice. Two plates sharing an alt text or a long description
    // is a copy-paste that tells a screen-reader user about the wrong drawing.
    const altSeen = new Map();
    const descriptionSeen = new Map();
    for (const artifact of artifacts) {
      const record = records.get(artifact.artifact_id);
      if (!record) continue;
      for (const [field, store] of [["alt_text", altSeen], ["extended_description", descriptionSeen]]) {
        const value = record[field];
        if (typeof value !== "string" || value.trim() === "") {
          fail(`${artifact.artifact_id} has no ${field} in ${REGISTRY}`);
          continue;
        }
        if (store.has(value)) fail(`${artifact.artifact_id} and ${store.get(value)} share the same ${field}`);
        else store.set(value, artifact.artifact_id);
      }
      if (record.alt_text === record.extended_description) {
        fail(`${artifact.artifact_id} uses one string as both its alt text and its long description`);
      }
      // The two say different things rather than one being a cut of the other. Length is
      // deliberately not compared: an alt text describing a dense information graphic is
      // often the longer of the two, and in Chinese it is longer again for the same content.
      if (typeof record.alt_text === "string" && typeof record.extended_description === "string") {
        if (record.extended_description.length < 60) {
          fail(`${artifact.artifact_id} has a long description of only ${record.extended_description.length} characters`);
        }
        if (record.alt_text.includes(record.extended_description) || record.extended_description.includes(record.alt_text)) {
          fail(`${artifact.artifact_id} repeats its alt text inside its long description rather than adding to it`);
        }
      }
    }

    let describedPlates = 0;
    for (const artifact of artifacts) {
      const record = records.get(artifact.artifact_id);
      if (!record) {
        fail(`${REGISTRY} has no record for ${artifact.artifact_id}`);
        continue;
      }
      const language = artifact.language;
      const expectedViewer = VIEWERS[language];
      const anchor = figureId(artifact.area, artifact.concept, language);
      const described = descriptionId(artifact.area, artifact.concept, language);

      if (record.placements?.viewer_file !== expectedViewer) {
        fail(`${artifact.artifact_id} is registered to viewer ${record.placements?.viewer_file}, expected ${expectedViewer}`);
      }
      if (record.placements?.viewer_anchor !== anchor) {
        fail(`${artifact.artifact_id} is registered at anchor ${record.placements?.viewer_anchor}, expected ${anchor}`);
      }

      const html = viewerText[language];
      if (html === undefined) continue;

      // The figure itself: found once, by the id a reviewer would link to.
      const figureCount = occurrences(html, `<figure class="figure" id="${anchor}">`);
      if (figureCount !== 1) {
        fail(`${expectedViewer} carries ${figureCount} figures with id ${anchor}, expected exactly one`);
        continue;
      }
      const figure = sliceElement(html, "figure", html.indexOf(`<figure class="figure" id="${anchor}">`));
      if (!figure) {
        fail(`${expectedViewer} never closes the figure ${anchor}`);
        continue;
      }

      const images = [...figure.matchAll(/<img\b[^>]*>/g)];
      if (images.length !== 1) {
        fail(`${anchor} in ${expectedViewer} contains ${images.length} images, expected exactly one`);
        continue;
      }
      const image = images[0][0];

      if (attribute(image, "src") !== `${RASTER_PREFIX}${record.file}`) {
        fail(`${anchor} shows ${attribute(image, "src")}, expected ${RASTER_PREFIX}${record.file}`);
      }
      if (record.file !== artifact.file) {
        fail(`${artifact.artifact_id} is registered at ${record.file}, expected ${artifact.file}`);
      }
      if (Number(attribute(image, "width")) !== record.width_px || Number(attribute(image, "height")) !== record.height_px) {
        fail(`${anchor} declares ${attribute(image, "width")} × ${attribute(image, "height")}, registered as ${record.width_px} × ${record.height_px}`);
      }
      const alt = attribute(image, "alt");
      if (alt === null || decodeEntities(alt) !== record.alt_text) {
        fail(`${anchor} carries alt ${JSON.stringify(alt === null ? null : decodeEntities(alt))}, expected the registered ${JSON.stringify(record.alt_text)}`);
      }
      if (attribute(image, "aria-hidden") === "true") {
        fail(`${anchor} hides its drawing from assistive technology`);
      }

      // The long description: pointed at, present once in the whole document, inside this
      // figure, verbatim, and behind a disclosure a keyboard can open.
      if (attribute(image, "aria-describedby") !== described) {
        fail(`${anchor} points aria-describedby at ${attribute(image, "aria-describedby")}, expected ${described}`);
      }
      const descriptionNodes = occurrences(html, `id="${described}"`);
      if (descriptionNodes !== 1) {
        fail(`${expectedViewer} carries ${descriptionNodes} nodes with id ${described}, expected exactly one`);
      }
      if (!figure.includes(`id="${described}"`)) {
        fail(`the description ${described} sits outside the figure it describes`);
      } else {
        const at = figure.indexOf(`<p id="${described}">`);
        if (at === -1) {
          fail(`${described} is not a paragraph inside ${anchor}`);
        } else {
          const paragraph = sliceElement(figure, "p", at);
          const text = paragraph === null ? "" : decodeEntities(paragraph.replace(/^<p[^>]*>/, "").replace(/<\/p>$/, ""));
          if (text !== record.extended_description) {
            fail(`${described} reads ${JSON.stringify(text.slice(0, 80))}, expected the registered long description ${JSON.stringify(String(record.extended_description).slice(0, 80))}`);
          }
        }
        const details = figure.indexOf("<details");
        if (details === -1 || figure.indexOf(`id="${described}"`) < details) {
          fail(`${described} is not inside a <details> disclosure a keyboard can open`);
        } else {
          const disclosure = sliceElement(figure, "details", details);
          if (!disclosure || !disclosure.includes(`id="${described}"`)) {
            fail(`${described} is not inside the disclosure of its own figure`);
          }
          const summary = disclosure ? /<summary[^>]*>([\s\S]*?)<\/summary>/.exec(disclosure) : null;
          if (!summary) fail(`the disclosure holding ${described} has no <summary> to operate it`);
          else if (textOf(summary[1]) !== DESCRIPTION_LABEL[language]) {
            fail(`the disclosure holding ${described} is labelled ${JSON.stringify(textOf(summary[1]))}, expected ${JSON.stringify(DESCRIPTION_LABEL[language])}`);
          }
        }
        describedPlates += 1;
      }

      // The file itself, linked from the figure, labelled in this page's language.
      const anchors = [...figure.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)]
        .filter((match) => match[1] === `${RASTER_PREFIX}${record.file}`);
      if (anchors.length !== 1) {
        fail(`${anchor} offers ${anchors.length} links to ${RASTER_PREFIX}${record.file}, expected exactly one`);
      } else {
        const label = textOf(anchors[0][2]);
        if (!label.includes(FULL_RESOLUTION_LABEL[language])) {
          fail(`the full-resolution link of ${anchor} reads ${JSON.stringify(label)}, expected it to carry ${JSON.stringify(FULL_RESOLUTION_LABEL[language])}`);
        }
        if (label.includes(FULL_RESOLUTION_LABEL[OTHER[language]])) {
          fail(`the full-resolution link of ${anchor} carries the ${OTHER[language]} label`);
        }
        if (!label.includes(artifact.plate_id)) {
          fail(`the full-resolution link of ${anchor} does not name the plate ${artifact.plate_id}`);
        }
        if (!label.includes(`${record.width_px} × ${record.height_px} px`)) {
          fail(`the full-resolution link of ${anchor} does not state ${record.width_px} × ${record.height_px} px`);
        }
      }

      // The PDFs, cross-checked against the drawings registry rather than trusted twice.
      for (const kind of ["a3", "a0"]) {
        const declared = record.placements?.[kind];
        const sheet = sheetByKey.get(`${kind}:${language}`);
        if (!declared || !sheet) continue;
        const match = (sheet.placements ?? []).find((placement) => placement.artifact_id === artifact.artifact_id);
        if (!match) {
          fail(`${sheet.file} registers no placement for ${artifact.artifact_id}`);
          continue;
        }
        if (match.page !== declared.page || match.placement_id !== declared.placement_id) {
          fail(`${artifact.artifact_id} sits at ${kind} page ${declared.page}/${declared.placement_id} in the plate registry and ${match.page}/${match.placement_id} in the drawings registry`);
        }
        if (match.file !== record.file) {
          fail(`${sheet.file} registers ${artifact.artifact_id} with raster ${match.file}, expected ${record.file}`);
        }
        if (kind === "a0") {
          if (match.visual_rank !== declared.visual_rank) {
            fail(`${artifact.artifact_id} A0 visual rank disagrees: ${declared.visual_rank} vs ${match.visual_rank}`);
          }
          if (match.area_fraction !== declared.area_fraction) {
            fail(`${artifact.artifact_id} A0 area fraction disagrees: ${declared.area_fraction} vs ${match.area_fraction}`);
          }
        }

        // A placement record is not evidence that a PDF page paints anything. Resolve the
        // page through the PDF page tree, follow its /Contents and /Resources, and compare
        // the stream of the XObject actually reached by a `Do` operator with the original
        // PNG's concatenated IDAT payload. The builder deliberately carries that payload
        // byte-for-byte, so this proves the declared plate is the visible raster on the
        // declared page rather than an unattached image object elsewhere in the file.
        const document = pdfByFile.get(sheet.file);
        const sourcePayload = pngIdatPayload(record.file);
        const appearances = [];
        for (const page of document?.page_details ?? []) {
          for (const draw of page.xobject_draws) {
            if (draw.image_stream?.equals(sourcePayload)) appearances.push({ page, draw });
          }
        }
        if (appearances.length !== 1) {
          fail(`${sheet.file} visibly draws the PNG payload for ${artifact.artifact_id} ${appearances.length} times, expected exactly once`);
        } else {
          const appearance = appearances[0];
          if (appearance.page.number !== declared.page) {
            fail(`${sheet.file} visibly draws ${artifact.artifact_id} on page ${appearance.page.number}, declared page ${declared.page}`);
          }
          if (appearance.draw.width !== record.width_px || appearance.draw.height !== record.height_px) {
            fail(`${sheet.file} draws ${artifact.artifact_id} through a ${appearance.draw.width} × ${appearance.draw.height} image XObject, registered as ${record.width_px} × ${record.height_px}`);
          }
        }
      }
    }

    // Every plate has to be named in the prose of its own language, or the drawing arrives
    // without the argument it belongs to. Checked per plate rather than per artifact so the
    // pair reports once.
    for (const plateId of new Set(artifacts.map((artifact) => artifact.plate_id))) {
      for (const language of ["zh", "en"]) {
        for (const { file, text } of documentText[language] ?? []) {
          if (!text.includes(plateId)) fail(`${file} never mentions ${plateId}`);
        }
      }
    }

    // Neither viewer may serve the other language's rasters, ids or wording. The Chinese
    // path is not a substring of the English one, so plain containment is exact in both
    // directions.
    for (const artifact of artifacts) {
      const other = OTHER[artifact.language];
      const html = viewerText[other];
      if (html === undefined) continue;
      const record = records.get(artifact.artifact_id);
      if (html.includes(artifact.file)) {
        fail(`${VIEWERS[other]} references the ${artifact.language} raster ${artifact.file}`);
      }
      for (const id of [figureId(artifact.area, artifact.concept, artifact.language), descriptionId(artifact.area, artifact.concept, artifact.language)]) {
        if (html.includes(id)) fail(`${VIEWERS[other]} carries the ${artifact.language} id ${id}`);
      }
      if (record && typeof record.alt_text === "string" && html.includes(record.alt_text)) {
        fail(`${VIEWERS[other]} carries the ${artifact.language} alt text of ${artifact.artifact_id}`);
      }
      if (record && typeof record.extended_description === "string" && html.includes(record.extended_description)) {
        fail(`${VIEWERS[other]} carries the ${artifact.language} long description of ${artifact.artifact_id}`);
      }
    }

    return {
      pdf_pages: measured,
      artifacts: artifacts.length,
      described_plates: describedPlates,
      viewer_shape: {
        zh: viewerShape.zh?.counts ?? null,
        en: viewerShape.en?.counts ?? null,
      },
      mutation_controls: mutationControls,
    };
  });
}

if (require.main === module) cli(run());

module.exports = { run };
