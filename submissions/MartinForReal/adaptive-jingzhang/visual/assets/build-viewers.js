#!/usr/bin/env node
"use strict";

// Regenerates the content sections of the offline viewers from the bilingual record.
//
// The viewers were hand-authored in each language, and they drifted. Two sections drifted
// loudly: the English one listed a different set of renewal actions than the Chinese one and
// gave all three key areas roles that no registry record supports. Four more drifted quietly,
// which is worse, because nothing looked wrong on either page on its own — the Chinese AI
// section carried ten scenario titles and none of the six clauses the English one spelled
// out; the Chinese review gates were merged into two cards against four in English; the
// source and assumption lists were different lengths; and the Chinese source list was written
// in English. A seventh section did not exist at all in either language: the taskbook asks
// how this proposal relates to five named counterparts and neither viewer answered. An eighth
// was the last hand-authored table on either page, and it drifted in all three ways at once:
// three rows in Chinese against four in English, Chinese cells still carrying untranslated
// English headings, and a coverage claim that all mandatory standards were addressed when the
// standard matrix marks two of eleven as data gaps.
//
// All eight are now generated, so a wording only ever exists once and neither language can
// move without the other. Two further paragraphs are stamped in place from a record — the
// hero lede and the zero-jitter comparison in the metrics section — because their wording has
// to track a record rather than an author. Every `<img>` on the finished page is stamped as
// well, from the raster it names rather than from a record, for the reason given at
// `stampImages`. The stylesheet, navigation, and every other section stay exactly as
// authored: this script replaces eight elements, fills two paragraphs and normalises the
// image tags, it does not rebuild the page.
//
// The regional section prints only what its record holds, which is only what the taskbook
// supports: a potential relationship, the evidence still required, the review level that
// would receive it, and the limit of the claim. There is no source in this package for an
// agreement, a route, an investment or a commitment involving any of the five, so the builder
// has no column to put one in.
//
// Each key-area card now also carries the five plates of its area: the language-matched
// raster, an anchor a reviewer can link to, a caption written from the design record, the
// registered long description behind a native disclosure, and a direct link to the
// full-resolution PNG. A viewer only ever serves its own language's rasters and its own
// language's descriptions, so an English reader is never sent a Chinese drawing and never
// sent a Chinese description of one.
//
// Usage: node build-viewers.js [--check]

const fs = require("node:fs");
const path = require("node:path");
const contract = require("./key-area-contract.js");

const ASSETS = __dirname;
const PACKAGE_ROOT = path.resolve(ASSETS, "..", "..");
const SOURCE = path.join(ASSETS, "regeneration-source.json");
const PLATES = path.join(ASSETS, "area-plates.json");
const DESIGN = path.join(ASSETS, "key-area-design.json");
const ABLATION = path.join(ASSETS, "physarum-zero-jitter-ablation.json");

// The three registries the task-coverage table counts. They are read rather than summarised
// so that the published counts cannot drift from the records they claim to describe.
const COMPLIANCE = path.join(PACKAGE_ROOT, "compliance_matrix.json");
const STANDARDS = path.join(PACKAGE_ROOT, "standard_matrix.json");
const DEPTH = path.join(PACKAGE_ROOT, "design_depth_matrix.json");

const TARGETS = [
  { language: "zh", file: path.join(PACKAGE_ROOT, "visual", "index.html") },
  { language: "en", file: path.join(PACKAGE_ROOT, "visual", "index.en.html") },
];

// The viewers sit one directory below the package root, so a registered raster path is
// reached from here by stepping back up. The registered path itself is never rewritten,
// only prefixed, so a reader searching for it in the page still finds it verbatim.
const RASTER_PREFIX = "../";

// Reused from the existing stylesheet so the generated block needs no new CSS.
const ACCENTS = ["accent-teal", "accent-coral", "accent-violet"];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// How many times a literal appears. Used where "present" is not the question — an id that
// appears twice is a different fault from an id that appears once.
function occurrences(haystack, needle) {
  let count = 0;
  let at = haystack.indexOf(needle);
  while (at !== -1) {
    count += 1;
    at = haystack.indexOf(needle, at + needle.length);
  }
  return count;
}

// The accessible name a `aria-labelledby` pointer actually produces: the text of the element
// that carries the id, with its markup removed and its entities read back. An id that names no
// element, or a heading with no text in it, yields `null`, which the caller reports rather than
// treats as a name. Headings never nest an element of their own tag, so the first matching
// close tag is the right one.
function labelledText(html, id) {
  const found = html.match(new RegExp(`<([a-z][a-z0-9]*)\\b[^>]*\\sid="${id}"[^>]*>([\\s\\S]*?)</\\1>`, "i"));
  if (!found) return null;
  const text = found[2]
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, "\"")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  return text === "" ? null : text;
}

// Picks the value for one language out of a record that stores both as `<field>_zh` and
// `<field>_en`. A missing key is an authoring error, not something to paper over with an
// empty string, because an empty label would silently ship a blank cell.
function pick(record, field, language) {
  const key = `${field}_${language}`;
  if (!(key in record) || record[key] === null || record[key] === undefined) {
    throw new Error(`record is missing ${key}`);
  }
  return record[key];
}

// Locates a top-level <section> by its id and returns its bounds. Sections are not nested
// in these viewers; if that ever changes the naive end-tag scan would cut in the wrong
// place, so the assumption is checked rather than trusted.
function findSection(html, id) {
  const open = new RegExp(`<section[^>]*\\bid="${id}"[^>]*>`);
  const match = open.exec(html);
  if (!match) throw new Error(`no <section id="${id}"> found`);
  const start = match.index;
  const bodyStart = start + match[0].length;
  const end = html.indexOf("</section>", bodyStart);
  if (end === -1) throw new Error(`<section id="${id}"> is never closed`);
  if (html.slice(bodyStart, end).includes("<section")) {
    throw new Error(`<section id="${id}"> contains a nested section; the replacement bounds are unsafe`);
  }
  return { start, end: end + "</section>".length };
}

function replaceSection(html, id, replacement) {
  const bounds = findSection(html, id);
  return html.slice(0, bounds.start) + replacement + html.slice(bounds.end);
}

// Every generated table is a review instrument, so it is built for a reader who cannot see
// its shape. `<thead>` and `<tbody>` separate the header row from the data; `scope` says which
// cells each header governs; and `aria-labelledby` points at the heading already standing
// above the table rather than repeating it in a `<caption>`, which a sighted reader would then
// meet twice. The first cell of every row is the record id, and that is what makes it the row
// header: a screen reader reaching a stop rule then says which scenario the rule belongs to,
// instead of reading out a sentence with nothing attached to it.
//
// A table is also the part of these pages a narrow viewport cannot honestly reflow. Squeezing
// an eight-column register into 343 CSS pixels gave columns one to four characters wide and a
// document tens of thousands of pixels tall, so each table is wrapped in its own scroll
// container instead: the table keeps a minimum width proportional to its column count, and the
// container scrolls sideways within the page rather than dragging the page sideways with it.
// The container is a labelled region and is focusable, because a scroll area only reachable by
// pointer is one a keyboard reader cannot read the right-hand columns of. It takes the same
// accessible name as the table it holds, which is the heading already standing above both.
function table(labelledBy, headers, rows) {
  const head = headers.map((cell) => `<th scope="col">${escapeHtml(cell)}</th>`).join("");
  const body = rows
    .map(([first, ...rest]) => `<tr><th scope="row">${escapeHtml(first)}</th>`
      + rest.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")
      + `</tr>`)
    .join("");
  return `<div class="table-scroll" role="region" tabindex="0" aria-labelledby="${labelledBy}">`
    + `<table class="table" style="--table-columns:${headers.length}" aria-labelledby="${labelledBy}">`
    + `<thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`
    + `</div>`;
}

// The id of the heading a table is labelled by. Derived from the record id, because three key
// areas each carry a components table and a routes table: a fixed pair of ids would be
// declared six times over, and an `aria-labelledby` with six possible targets names nothing.
function headingId(kind, subject) {
  return `${kind}-${String(subject).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

// The anchor a reviewer, a board and the plate registry all use to point at the same
// drawing. Derived from the contract rather than written out thirty times.
function plateAnchor(area, concept, language) {
  return `plate-${area.prefix.toLowerCase()}-${concept.concept_id}-${language}`;
}

// The caption states what the drawing may be read as claiming. Everything in it comes from
// key-area-design.json; the Dazhongsi caption quotes the registered disclosure exactly.
function plateCaption(concept, design, language) {
  const zh = language === "zh";
  if (concept.concept_id === "01") {
    const parts = [pick(design.plan, "condition", language)];
    if (design.disclosure_zh || design.disclosure_en) parts.push(pick(design, "disclosure", language));
    return parts.join(zh ? "" : " ");
  }
  if (concept.concept_id === "02") {
    const elements = design.plan.elements.length;
    const cuts = design.plan.cut_keys.map((cut) => `${cut.key}→${cut.section_id}`).join(" ");
    return zh
      ? `${design.plan.id}：${elements} 个构成元素，剖切号 ${cuts}。`
      : `${design.plan.id}: ${elements} elements, cuts keyed ${cuts}.`;
  }
  if (concept.concept_id === "03") {
    const dimensions = design.sections.flatMap((section) => section.dimensions);
    const counted = (basis) => dimensions.filter((entry) => entry.basis_type === basis).length;
    return zh
      ? `${design.sections.map((section) => section.id).join(" / ")}：共 ${dimensions.length} 项尺寸，`
        + `${counted("proposed_module")} 项 proposed_module（以米计、未经核验）、`
        + `${counted("pending")} 项 pending（以米计、取值留空、附复算触发条件）。`
      : `${design.sections.map((section) => section.id).join(" / ")}: ${dimensions.length} dimensions — `
        + `${counted("proposed_module")} proposed_module, in metres and unverified, and `
        + `${counted("pending")} pending, left null in metres with a recalculation trigger.`;
  }
  if (concept.concept_id === "04") {
    const chain = design.step_free_chain;
    const seasonal = design.seasonal_operations;
    return zh
      ? `${chain.id}：${chain.nodes.length} 个节点 / ${chain.segments.length} 段，`
        + `${Object.keys(chain.equivalents).length} 类等效渠道，${chain.operating_modes.length} 种运行工况；`
        + `无障碍闸口 ${chain.status.accessibility_gate}；试点 ${seasonal.pilot.days} 天，`
        + `sufficient_for_year_round 为 false。`
      : `${chain.id}: ${chain.nodes.length} nodes across ${chain.segments.length} segments, `
        + `${Object.keys(chain.equivalents).length} equivalent channels, ${chain.operating_modes.length} operating modes; `
        + `accessibility gate ${chain.status.accessibility_gate}; a ${seasonal.pilot.days}-day pilot with `
        + `sufficient_for_year_round false.`;
  }
  const envelope = design.phase1_envelope;
  const thresholds = design.seasonal_operations.thresholds;
  return zh
    ? `${envelope.id}：not_authorized、unfunded，受 ${envelope.blocked_by.join(" ")} 阻断；`
      + `${thresholds.length} 项季节阈值（${thresholds.map((entry) => entry.id).join(" ")}）的 approved_threshold 均为空、`
      + `pilot_start_allowed 均为 false。`
    : `${envelope.id}: not_authorized, unfunded, blocked by ${envelope.blocked_by.join(" ")}; its `
      + `${thresholds.length} seasonal thresholds (${thresholds.map((entry) => entry.id).join(" ")}) all hold `
      + `approved_threshold null and pilot_start_allowed false.`;
}

// The id of the node that describes one plate at length. Derived the same way the anchor is,
// so the `aria-describedby` on the image and the `id` on the paragraph cannot drift apart and
// no two plates can ever claim the same description.
function plateDescriptionId(area, concept, language) {
  return `${plateAnchor(area, concept, language)}-description`;
}

// The five plates of one area, in contract order.
//
// Everything a reader who cannot see the drawing is given comes from the plate registry: the
// title, the short alt text, and the long description. The registry is written by the plate
// builder, which runs before this one, so a missing record means the two builders disagree
// about what exists and the build stops rather than inventing a substitute — a synthesised
// alt text would describe what this script assumes the drawing shows, not what it shows.
//
// The long description is too long to sit in an `alt` attribute and too important to drop, so
// it goes in a `<details>` a sighted reader can open and `aria-describedby` points the image
// at it. `<details>` is used rather than a scripted disclosure because it is keyboard
// operable and announced as a disclosure without any JavaScript, and these viewers must work
// from a file:// URL with nothing loaded from a network.
//
// The PNG is also linked directly. A plate is 1800 × 1200 and the card shows it at card
// width; a reviewer who needs to read a dimension string on the drawing needs the file, not a
// scaled copy of it.
function plateFigures(contractArea, design, language, labels, records) {
  return contract.CONCEPTS.map((concept) => {
    const plateId = contract.plateId(contractArea, concept);
    const artifactId = contract.artifactId(contractArea, concept, language);
    const record = records.get(artifactId);
    if (!record) throw new Error(`the plate registry has no record for ${artifactId}`);
    for (const field of ["title", "alt_text", "extended_description", "width_px", "height_px"]) {
      if (record[field] === null || record[field] === undefined || record[field] === "") {
        throw new Error(`${artifactId} has no ${field} in the plate registry`);
      }
    }
    if (record.language !== language) {
      throw new Error(`${artifactId} is registered as ${record.language}, not ${language}`);
    }
    const source = contract.plateFile(contractArea, concept, language);
    if (record.file !== source) {
      throw new Error(`${artifactId} is registered at ${record.file}, expected ${source}`);
    }
    const href = `${RASTER_PREFIX}${source}`;
    const descriptionId = plateDescriptionId(contractArea, concept, language);
    const linkLabel = `${pick(labels, "plate_full_resolution", language)} · ${plateId} · `
      + `${record.width_px} × ${record.height_px} px`;
    // The caption is flow content, so the description and the link live inside it: a
    // `<figcaption>` has to be the first or last child of its `<figure>`, and putting them
    // after it as siblings would make the caption neither.
    return `<figure class="figure" id="${plateAnchor(contractArea, concept, language)}">`
      + `<img src="${escapeHtml(href)}" width="${record.width_px}" height="${record.height_px}"`
      + ` alt="${escapeHtml(record.alt_text)}" aria-describedby="${descriptionId}">`
      + `<figcaption class="caption">`
      + `<p class="plate-title"><strong>${escapeHtml(record.title)}</strong> — ${escapeHtml(plateCaption(concept, design, language))}</p>`
      + `<details class="plate-note">`
      + `<summary>${escapeHtml(pick(labels, "drawing_plate_description", language))}</summary>`
      + `<p id="${descriptionId}">${escapeHtml(record.extended_description)}</p>`
      + `</details>`
      + `<p class="plate-link"><a href="${escapeHtml(href)}">${escapeHtml(linkLabel)}</a></p>`
      + `</figcaption></figure>`;
  }).join("");
}

function areaCard(area, labels, language, context, index) {
  const accent = ACCENTS[index % ACCENTS.length];
  const parts = [];
  parts.push(`<h3>${escapeHtml(pick(area, "name", language))}</h3>`);

  // The role is the wording the two viewers previously disagreed about, so it is printed
  // verbatim from the registry rather than paraphrased into a card subtitle.
  const role = pick(area, "role", language);
  const meta = [
    `${pick(labels, "role_label", language)}: ${role}`,
    `${pick(labels, "official_area", language)}: ${area.official_area_ha} ha`,
    area.lab,
  ];
  if (area.georeferenced === false) meta.push(pick(labels, "non_georeferenced", language));
  parts.push(`<p class="status">${escapeHtml(meta.join(" · "))}</p>`);
  parts.push(`<p>${escapeHtml(pick(area, "distinct_task", language))}</p>`);

  // An area whose position is disputed states that on its own card, next to its content,
  // rather than in a footnote a reader may never reach.
  if (area.georeferenced === false) {
    parts.push(`<div class="gate"><strong>${escapeHtml(pick(labels, "non_georeferenced", language))}</strong>`
      + `<p>${escapeHtml(pick(area, "non_station_note", language))}</p></div>`);
  }

  // A table is named by the heading above it, and three cards printing the same two headings
  // gave six tables three accessible names between them: a reader moving between tables by name
  // met "Components" three times with nothing to tell them apart. The area name is therefore
  // part of the heading itself rather than only of the card it sits in, so the name a table
  // exposes is the name a reader would use to refer to it.
  const areaName = pick(area, "name", language);
  const componentsHeading = headingId("components", area.id);
  parts.push(`<h4 id="${componentsHeading}">${escapeHtml(`${areaName} · ${pick(labels, "components_heading", language)}`)}</h4>`);
  parts.push(table(
    componentsHeading,
    [
      pick(labels, "col_id", language),
      pick(labels, "col_name", language),
      pick(labels, "col_description", language),
      pick(labels, "col_evidence", language),
      pick(labels, "col_blocked", language),
    ],
    area.components.map((component) => [
      component.id,
      pick(component, "name", language),
      pick(component, "description", language),
      component.evidence_ref,
      component.blocked_by,
    ]),
  ));

  const routesHeading = headingId("routes", area.id);
  parts.push(`<h4 id="${routesHeading}">${escapeHtml(`${areaName} · ${pick(labels, "routes_heading", language)}`)}</h4>`);
  parts.push(table(
    routesHeading,
    [
      pick(labels, "col_id", language),
      pick(labels, "col_name", language),
      pick(labels, "col_description", language),
      pick(labels, "col_evidence", language),
      pick(labels, "col_blocked", language),
    ],
    area.routes.map((route) => {
      if (route.step_free !== true) {
        throw new Error(`${route.id} is published as a step-free chain but is not marked step_free`);
      }
      return [
        route.id,
        `${pick(route, "name", language)} (${pick(labels, "step_free", language)})`,
        pick(route, "description", language),
        route.evidence_ref,
        route.blocked_by,
      ];
    }),
  ));

  parts.push(`<p><strong>${escapeHtml(pick(labels, "winter", language))}:</strong> `
    + `${escapeHtml(pick(area, "winter", language))}</p>`);
  parts.push(`<p><strong>${escapeHtml(pick(labels, "maintenance", language))}:</strong> `
    + `${escapeHtml(pick(area, "maintenance", language))}</p>`);

  const envelope = area.phase1_envelope;
  const states = [
    envelope.id,
    envelope.reversible ? pick(labels, "reversible", language) : null,
    envelope.authorization_state === "not_authorized"
      ? pick(labels, "not_authorized", language)
      : envelope.authorization_state,
    envelope.funding_state === "unfunded" ? pick(labels, "unfunded", language) : envelope.funding_state,
    `${pick(labels, "col_blocked", language)}: ${envelope.blocked_by}`,
  ].filter(Boolean);
  parts.push(`<p><strong>${escapeHtml(pick(labels, "envelope", language))}:</strong> `
    + `${escapeHtml(pick(envelope, "description", language))}</p>`);
  parts.push(states.map((state) => `<span class="pill">${escapeHtml(state)}</span>`).join(""));

  const sheet = context.designAreas.get(area.id);
  const contractArea = contract.AREAS.find((entry) => entry.area_feature_id === area.id);
  // The register and the spatial record are joined on the feature id, so an area present in
  // one and missing from the other stops the build instead of shipping a card with no plates.
  if (!sheet) throw new Error(`${DESIGN} declares nothing for ${area.id}`);
  if (!contractArea) throw new Error(`${area.id} has no entry in the key-area contract`);
  parts.push(`<h4>${escapeHtml(pick(labels, "plates", language))}</h4>`);
  parts.push(plateFigures(contractArea, sheet, language, labels, context.records));

  return `<article class="card ${accent}">${parts.join("")}</article>`;
}

function areasSection(source, language, context) {
  const labels = source.ui_labels;
  const block = labels.areas;
  const cards = source.areas
    .map((area, index) => areaCard(area, labels, language, context, index))
    .join("");
  // The overview figure is carried through from the hand-authored section so regenerating
  // does not leave the rendered key-area image referenced by nothing.
  const figure = `<figure class="figure">`
    + `<img src="${escapeHtml(pick(block, "figure_src", language))}" alt="${escapeHtml(pick(block, "figure_alt", language))}">`
    + `<figcaption class="caption">${escapeHtml(pick(block, "figure_caption", language))}</figcaption>`
    + `</figure>`;
  return `<section class="section" id="areas">`
    + `<span class="eyebrow">${escapeHtml(pick(block, "eyebrow", language))}</span>`
    + `<h2>${escapeHtml(pick(block, "heading", language))}</h2>`
    + `<p class="intro">${escapeHtml(pick(block, "intro", language))}</p>`
    + figure
    + cards
    + `</section>`;
}

function projectsSection(source, language) {
  const labels = source.ui_labels;
  const block = labels.projects;
  const pills = source.projects
    .map((project) => `<span class="pill">${escapeHtml(`${project.id} ${pick(project, "name", language)}`)}</span>`)
    .join("");
  const rows = source.projects.map((project) => [project.id, pick(project, "name", language), project.phase]);
  return `<section class="section" id="projects">`
    + `<span class="eyebrow">${escapeHtml(pick(block, "eyebrow", language))}</span>`
    + `<h2 id="projects-heading">${escapeHtml(pick(block, "heading", language))}</h2>`
    + `<div>${pills}</div>`
    + `<p class="intro">${escapeHtml(pick(block, "intro", language))}</p>`
    + table(
      "projects-heading",
      [pick(labels, "col_id", language), pick(labels, "col_name", language), pick(labels, "col_phase", language)],
      rows,
    )
    + `</section>`;
}

// The ten AI scenarios, as a matrix rather than ten paragraphs.
//
// The six clauses are the whole point of a scenario record: a scenario with no named operator
// or no stop rule is a proposal to deploy something with nobody answerable for it. The Chinese
// viewer used to print the ten titles and none of the six, so a Chinese reader met ten
// promises and no contract. Printing them as columns rather than as a sentence also makes the
// gap visible down a column: a reviewer scanning "stop rule" sees at once whether all ten have
// one, which is a question no amount of prose answers.
//
// The dark cards above the table are kept as an index of the ten, exactly as the actions
// section keeps its pills above its table, and carry only the id and the title they share
// with the row below.
function aiSection(source, language) {
  const block = source.ui_labels.ai;
  const sections = source.viewer_sections;
  const fields = sections.scenario_fields;
  const cards = sections.scenarios
    .map((scenario) => `<div class="scenario"><b>${escapeHtml(scenario.id)}</b>`
      + `${escapeHtml(pick(scenario, "name", language))}</div>`)
    .join("");
  const gates = sections.non_tradeable_gates;
  return `<section class="section" id="ai">`
    + `<span class="eyebrow">${escapeHtml(pick(block, "eyebrow", language))}</span>`
    + `<h2 id="ai-heading">${escapeHtml(pick(block, "heading", language))}</h2>`
    + `<div class="scenario-grid">${cards}</div>`
    + `<p class="intro">${escapeHtml(pick(block, "intro", language))}</p>`
    + table(
      "ai-heading",
      [
        pick(block, "col_id", language),
        pick(block, "col_scenario", language),
        ...fields.map((field) => pick(sections.scenario_field_labels, field, language)),
      ],
      sections.scenarios.map((scenario) => [
        scenario.id,
        pick(scenario, "name", language),
        ...fields.map((field) => pick(scenario, field, language)),
      ]),
    )
    + `<div class="gate"><strong>${escapeHtml(pick(block, "gate_heading", language))}</strong>`
    + `<p>${escapeHtml(pick(gates, "list", language))}</p>`
    + `<p>${escapeHtml(pick(gates, "rule", language))}</p></div>`
    + `</section>`;
}

// The four review gates. They were four named cards in English and two merged cards labelled
// `1–2` and `3–4` in Chinese, which is not a translation: a Chinese reader could not cite a
// gate by name because the page had given none. Both now print the same four ids.
function checkSection(source, language) {
  const block = source.ui_labels.check;
  const cards = source.viewer_sections.review_gates
    .map((gate) => `<div class="card"><h3>${escapeHtml(`${gate.id} ${pick(gate, "name", language)}`)}</h3>`
      + `<p>${escapeHtml(pick(gate, "definition", language))}</p></div>`)
    .join("");
  return `<section class="section" id="check">`
    + `<span class="eyebrow">${escapeHtml(pick(block, "eyebrow", language))}</span>`
    + `<h2>${escapeHtml(pick(block, "heading", language))}</h2>`
    + `<div class="grid-2">${cards}</div>`
    + `<p class="intro">${escapeHtml(pick(block, "intro", language))}</p>`
    + `</section>`;
}

// The six source families, each with the claim it can support.
//
// The Chinese list was six lines of English naming authors and issue numbers and saying
// nothing about what any of them proves. A citation with no statement of what it supports is
// an invitation to read it as supporting whatever stands next to it, so the second column is
// the load-bearing one and neither language may ship the list without it.
function sourcesSection(source, language) {
  const block = source.ui_labels.sources;
  return `<section class="section" id="sources">`
    + `<span class="eyebrow">${escapeHtml(pick(block, "eyebrow", language))}</span>`
    + `<h2 id="sources-heading">${escapeHtml(pick(block, "heading", language))}</h2>`
    + `<p class="intro">${escapeHtml(pick(block, "intro", language))}</p>`
    + table(
      "sources-heading",
      [
        pick(block, "col_id", language),
        pick(block, "col_family", language),
        pick(block, "col_supports", language),
      ],
      source.viewer_sections.source_families.map((family) => [
        family.id,
        pick(family, "name", language),
        pick(family, "supports", language),
      ]),
    )
    + `</section>`;
}

// The six assumptions. Numbered so that each can be refuted on its own — an unnumbered bullet
// list can only be agreed with or dismissed whole. The two languages carried four and six.
function assumptionsSection(source, language) {
  const block = source.ui_labels.assumptions;
  return `<section class="section" id="assumptions">`
    + `<span class="eyebrow">${escapeHtml(pick(block, "eyebrow", language))}</span>`
    + `<h2 id="assumptions-heading">${escapeHtml(pick(block, "heading", language))}</h2>`
    + `<p class="intro">${escapeHtml(pick(block, "intro", language))}</p>`
    + table(
      "assumptions-heading",
      [pick(block, "col_id", language), pick(block, "col_limit", language)],
      source.viewer_sections.assumption_limits.map((entry) => [entry.id, pick(entry, "limit", language)]),
    )
    + `</section>`;
}

// The four counts the task-coverage table publishes, each recomputed from the registry it
// names. A number retyped into a page can be wrong for years without anything failing, and
// this table had exactly that defect: it told both readers that every mandatory standard was
// addressed while the standard matrix marks two of eleven as data gaps.
function taskCounts(ablation) {
  const requirements = readJson(COMPLIANCE).requirements ?? [];
  const standards = readJson(STANDARDS).standards ?? [];
  const depth = readJson(DEPTH).items ?? [];
  const edges = ablation.edges ?? [];
  if (requirements.length === 0 || standards.length === 0 || depth.length === 0 || edges.length === 0) {
    throw new Error("a record the task-coverage table counts is empty");
  }
  const counts = {
    numbered_requirements: requirements.filter((record) => !record.requirement_id.startsWith("agent.")).length,
    agent_tasks: requirements.filter((record) => record.requirement_id.startsWith("agent.")).length,
    standards_total: standards.length,
    standards_addressed: standards.filter((record) => record.review_status === "addressed").length,
    standards_data_gap: standards.filter((record) => record.review_status === "data_gap").length,
    depth_items: depth.length,
    depth_limited: depth.filter((record) => (record.completeness_limited_by ?? []).length > 0).length,
    ablation_seeds: ablation.seeds,
    ablation_edges: edges.length,
  };
  // Every standard is either addressed or a declared gap. If a third review_status ever
  // appears, "of N standards, A are addressed and G are data gaps" stops being a complete
  // account of the matrix, and a partial account read as a complete one is the overclaim this
  // table is being rewritten to remove.
  if (counts.standards_addressed + counts.standards_data_gap !== counts.standards_total) {
    throw new Error("standard_matrix.json carries a review_status the task-coverage wording does not account for");
  }
  for (const [name, value] of Object.entries(counts)) {
    if (!Number.isInteger(value)) throw new Error(`the recomputed task-coverage count ${name} is not an integer`);
  }
  return counts;
}

// Fills `{0}`, `{1}` … from the row's own list of count names, so a record cannot quietly
// reorder the numbers it substitutes, and a placeholder with no count behind it stops the
// build rather than reaching a reader as literal braces.
function fillCounts(template, names, counts) {
  if (!Array.isArray(names)) throw new Error("a task-coverage row declares no counts list");
  return template.replace(/\{(\d+)\}/g, (unused, index) => {
    const name = names[Number(index)];
    if (name === undefined) throw new Error(`a task-coverage template uses {${index}} but declares no count for it`);
    if (!(name in counts)) throw new Error(`no recomputed task-coverage count is named ${name}`);
    return String(counts[name]);
  });
}

// The task-coverage table. Its counts come from `taskCounts`, its wording from the record, and
// its structure from the same `table` helper as every other generated table, which is what
// closes the last three parity gaps on these pages at once: the Chinese table had three rows to
// the English four, left four English fragments sitting in Chinese cells, and carried none of
// the header semantics the generated tables give a reader who cannot see the shape.
function tasksSection(source, language, counts) {
  const block = source.ui_labels.tasks;
  const coverage = source.viewer_sections.task_coverage;
  return `<section class="section" id="tasks">`
    + `<span class="eyebrow">${escapeHtml(pick(block, "eyebrow", language))}</span>`
    + `<h2 id="tasks-heading">${escapeHtml(pick(block, "heading", language))}</h2>`
    + `<p class="intro">${escapeHtml(pick(block, "intro", language))}</p>`
    + table(
      "tasks-heading",
      [
        pick(block, "col_object", language),
        pick(block, "col_coverage", language),
        pick(block, "col_evidence", language),
      ],
      coverage.rows.map((row) => [
        `${row.id} ${pick(row, "name", language)}`,
        fillCounts(pick(row, "coverage", language), row.counts, counts),
        pick(row, "evidence", language),
      ]),
    )
    + `</section>`;
}

// The regional-synergy matrix the taskbook asks for and neither viewer had.
//
// Its four columns are chosen to be answerable from the taskbook alone. The taskbook names
// five counterparts and asks about innovation synergy; it supplies no agreement, no route, no
// investment, no commitment and no geography, and this package holds nothing else about any
// of the five. So each row states a relationship this proposal could offer, the evidence that
// would have to arrive before the relationship is more than an offer, the review route that
// would first have to be confirmed before any body received that evidence, and the limit of
// what the row claims. Naming a receiving authority outright would be a claim about
// institutional arrangements this package has not seen, so the column is modal throughout.
// The record's own provenance and the fact that the English names are working translations of
// Chinese-only taskbook entries are printed under the table rather than left to a reader to
// assume.
function regionalSection(source, language) {
  const block = source.ui_labels.regional;
  const synergy = source.regional_synergy;
  return `<section class="section" id="regional">`
    + `<span class="eyebrow">${escapeHtml(pick(block, "eyebrow", language))}</span>`
    + `<h2 id="regional-heading">${escapeHtml(pick(block, "heading", language))}</h2>`
    + `<p class="intro">${escapeHtml(pick(block, "intro", language))}</p>`
    + table(
      "regional-heading",
      [
        pick(block, "col_partner", language),
        pick(block, "col_relationship", language),
        pick(block, "col_evidence", language),
        pick(block, "col_review", language),
        pick(block, "col_limit", language),
      ],
      synergy.partners.map((partner) => [
        `${partner.id} ${pick(partner, "name", language)}`,
        ...synergy.columns.map((column) => pick(partner, column, language)),
      ]),
    )
    + `<p class="status">${escapeHtml(`${synergy.source_ref} · ${synergy.evidence_state}`)}</p>`
    + `<p>${escapeHtml(pick(synergy, "translation_note", language))}</p>`
    + `</section>`;
}

// Rewrites the opening paragraph of the hero from the bilingual record. The two viewers
// had put the same idea in different places — the Chinese one inside the lede, the English
// one in a bare paragraph after it — and the English one still named the generator after
// the lineage instead of the computation. Both are now one paragraph written from one
// record, and a hand-authored method paragraph directly after the lede is absorbed into it.
// The match stops at the first `</p>`, so the surrounding hero markup is untouched.
function stampHero(html, hero, language) {
  const lede = `<p class="lede">${escapeHtml(hero[`motto_${language}`])}<br>${escapeHtml(hero[`method_${language}`])}</p>`;
  const pattern = /<p class="lede">.*?<\/p>(\s*<p>(?!<a )[^]*?<\/p>)?/;
  const found = html.match(pattern);
  if (!found) throw new Error(`the ${language} viewer has no <p class="lede"> to stamp`);
  if (found[0] === lede) return { html, changed: false };
  return { html: html.replace(pattern, lede), changed: true };
}

// The viewers published the persistence and disagreement thresholds and the 64-run
// denominator, but nothing about what happens when the declared jitter is removed. A reader
// of the offline package therefore saw the result without the comparison that qualifies it,
// while the proposal carried both. This paragraph closes that gap.
//
// Every number is recomputed from the twenty-four edge records rather than copied from the
// summary the record also carries, because a summary and its own edges can disagree and the
// reader-facing sentence should not be the last place that shows up. The two closing
// sentences are the record's own `not_a_finding` wording, quoted rather than paraphrased.
function zeroJitterSentence(ablation, language) {
  const edges = ablation.edges ?? [];
  if (edges.length === 0) throw new Error("the ablation record carries no edges");
  const changed = edges.filter((edge) => edge.primary_status !== edge.zero_jitter_status).length;
  const primaryPersistent = edges.filter((edge) => edge.primary_status === "persistent_candidate").length;
  const zeroPersistent = edges.filter((edge) => edge.zero_jitter_status === "persistent_candidate").length;
  const zeroBand = edges.filter((edge) => edge.zero_jitter_status === "disagreement_candidate").length;
  const largest = edges.reduce((most, edge) => Math.max(most, Math.abs(edge.delta)), 0);
  const seeds = ablation.seeds;
  if (!Number.isInteger(seeds)) throw new Error("the ablation record declares no seed count");
  const graph = ablation.summary?.zero_jitter_persistence_graph;
  if (typeof graph !== "string" || graph === "") {
    throw new Error("the ablation record does not state what the zero-jitter persistence graph is");
  }
  // A graph that stopped being connected is a different finding and must not be published in
  // wording written for the connected case.
  const connected = graph === "connected";
  const note = ablation[`not_a_finding_${language}`];
  if (typeof note !== "string" || note === "") {
    throw new Error(`the ablation record has no not_a_finding_${language}`);
  }
  if (language === "zh") {
    return `零抖动对照：把每条边的 jitter 置零后重跑同一组 ${seeds} 个种子，`
      + `${edges.length} 条候选边中有 ${changed} 条改变状态，最大频率变化 ${largest}；`
      + `持续边由 ${primaryPersistent} 条变为 ${zeroPersistent} 条，分歧带变为 ${zeroBand} 条，`
      + `${connected ? "持续图仍然连通" : `持续图为 ${graph}`}。`
      + `分歧带是这套判据在带抖动条件下的产物，不是被观测到的城市争议；jitter 是声明的扰动项，不是测量误差。`
      + note;
  }
  return `Zero-jitter comparison: rerunning the same ${seeds} seeds with the per-edge jitter set to zero `
    + `changes the status of ${changed} of the ${edges.length} candidate edges, with a largest frequency `
    + `change of ${largest}; persistent edges rise from ${primaryPersistent} to ${zeroPersistent}, the `
    + `disagreement band falls to ${zeroBand} edges, and `
    + `${connected ? "the persistence graph stays connected" : `the persistence graph is ${graph}`}. `
    + `The disagreement band is a product of this rule set under jitter, not an observed dispute in the `
    + `city, and the jitter is a declared perturbation rather than measurement error. `
    + note;
}

// Fills the one paragraph the metrics section reserves for the comparison. The slot is
// authored in the page and the wording is written here, the same division `stampHero` uses:
// a missing slot is a fault in the page and stops the build, rather than being silently
// created somewhere this script guesses at.
function stampZeroJitter(html, sentence, language) {
  const pattern = /<p class="intro" id="zero-jitter">[^]*?<\/p>/;
  const found = html.match(pattern);
  if (!found) throw new Error(`the ${language} viewer has no <p class="intro" id="zero-jitter"> to stamp`);
  const filled = `<p class="intro" id="zero-jitter">${escapeHtml(sentence)}</p>`;
  if (found[0] === filled) return { html, changed: false };
  return { html: html.replace(pattern, filled), changed: true };
}

// The intrinsic size of a raster, read out of the file rather than out of a record.
//
// A PNG states its own dimensions in the IHDR chunk, which is always the first chunk and
// always at a fixed offset, so twenty-four bytes are enough and none of the image data has to
// be read to learn how much room it needs. A file that is not a PNG, or is truncated before
// its header, stops the build: guessing a size would be worse than not declaring one.
function pngSize(absolute) {
  const header = Buffer.alloc(24);
  const handle = fs.openSync(absolute, "r");
  let read = 0;
  try {
    read = fs.readSync(handle, header, 0, 24, 0);
  } finally {
    fs.closeSync(handle);
  }
  if (read !== 24) throw new Error(`${absolute} is too short to carry a PNG header`);
  if (header.toString("hex", 0, 8) !== "89504e470d0a1a0a") throw new Error(`${absolute} is not a PNG`);
  if (header.toString("latin1", 12, 16) !== "IHDR") throw new Error(`${absolute} does not begin with an IHDR chunk`);
  const size = { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
  if (size.width === 0 || size.height === 0) throw new Error(`${absolute} declares a zero dimension`);
  return size;
}

// The attributes this builder owns on an image. They are stripped and rewritten rather than
// patched, so no page can end up carrying two of any of them and both languages emit them in
// the same order whatever the section builder happened to write.
const IMAGE_ATTRIBUTES = /\s(?:width|height|loading|decoding|fetchpriority)="[^"]*"/g;

// Tells every image what it is before it arrives.
//
// Twenty rasters were being published with no intrinsic size on fifteen of them and no
// loading or decoding policy on any: the browser had to fetch each file before it knew how
// much room to keep for it, so the text under the reader's finger moved every time one
// landed, and all twenty were fetched at once on a phone that would only ever show the first.
// Both are properties of the file, not opinions about it, so both are taken from the file:
// the width and height are read out of the PNG header, and a size already declared in the
// markup is compared against it rather than trusted, which is what makes the plate registry's
// 1800 × 1200 an assertion this build checks instead of a number nobody has opened the file
// to confirm.
//
// The loading policy is the one judgement here, and the fold is where it is made. The hero
// raster sits inside the header, on screen before the reader scrolls and the image the page
// is measured by; deferring it would trade a visible delay for a request that is made a
// moment later anyway, so it is fetched eagerly and marked as the priority one. Everything
// below the header is lazy, because a reader who stops at the metrics should not have paid to
// download thirty drawings of three key areas. Every image decodes asynchronously: an offline
// page that blocks its main thread to decode a 1800 × 1200 plate is a page that stops
// scrolling while it does so.
//
// Nothing here may introduce a request the package does not contain, so a `src` that names a
// scheme or a protocol-relative host stops the build rather than being stamped and shipped.
function stampImages(html, viewerFile) {
  const directory = path.dirname(viewerFile);
  const fold = html.indexOf("</header>");
  if (fold === -1) throw new Error(`${viewerFile} has no </header>, so the fold is unknown`);
  const stamped = [];
  const output = html.replace(/<img\b[^>]*>/g, (tag, at) => {
    const src = (tag.match(/\ssrc="([^"]*)"/) || [])[1];
    if (src === undefined) throw new Error(`${viewerFile} carries an <img> with no src`);
    if (/^[a-z][a-z0-9+.-]*:/i.test(src) || src.startsWith("//")) {
      throw new Error(`${viewerFile} loads ${src}, which is not a file inside this package`);
    }
    const absolute = path.resolve(directory, src);
    if (!fs.existsSync(absolute)) throw new Error(`${viewerFile} references ${src}, which does not exist`);
    const size = pngSize(absolute);
    for (const [name, actual] of [["width", size.width], ["height", size.height]]) {
      const declared = (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1];
      if (declared !== undefined && Number(declared) !== actual) {
        throw new Error(`${viewerFile} declares ${name} ${declared} for ${src}, whose file is ${actual} px`);
      }
    }
    const aboveFold = at < fold;
    stamped.push({ src, above_fold: aboveFold, width: size.width, height: size.height });
    const policy = aboveFold
      ? ` loading="eager" fetchpriority="high" decoding="async"`
      : ` loading="lazy" decoding="async"`;
    // Inserted directly after `src`, so a reader searching the source for a filename finds
    // what the page expects of it in the same place.
    return tag
      .replace(IMAGE_ATTRIBUTES, "")
      .replace(/(\ssrc="[^"]*")/, `$1 width="${size.width}" height="${size.height}"${policy}`);
  });
  const above = stamped.filter((image) => image.above_fold);
  // One image above the fold is the design of these pages. Two would mean either that the
  // header grew a second raster or that the fold moved, and both change which image the page
  // is judged by — a decision that belongs to whoever edits the header, not to this stamp.
  if (above.length !== 1) {
    throw new Error(`${viewerFile} places ${above.length} images above the fold, expected exactly the hero`);
  }
  return { html: output, images: stamped };
}

function main(argv) {
  const checkOnly = argv.includes("--check");
  const source = readJson(SOURCE);
  const design = readJson(DESIGN);
  // Written by the ablation builder, which runs before this one. The comparison is required
  // rather than optional: a viewer that publishes the persistence thresholds without it shows
  // the result and withholds the test of it.
  if (!fs.existsSync(ABLATION)) throw new Error(`${ABLATION} does not exist; run build-ablation.js first`);
  const ablation = readJson(ABLATION);
  // The plate registry is produced by the plate builder, which runs before this one. It is
  // the only place the published title, alt text and long description of a drawing exist, so
  // it is required rather than optional: without it this script would have to describe
  // drawings it has never read. The raster paths and anchors still come from the contract and
  // must not move when a registry is regenerated.
  if (!fs.existsSync(PLATES)) throw new Error(`${PLATES} does not exist; run build-plates.js first`);
  const registry = readJson(PLATES);
  const context = {
    designAreas: new Map(design.areas.map((area) => [area.area_feature_id, area])),
    records: new Map((registry.artifacts ?? []).map((record) => [record.artifact_id, record])),
  };
  const artifacts = contract.expectedArtifacts();
  // Recomputed once, before either page is built, because both pages must publish the same
  // counts and a per-page recount would let them disagree.
  const counts = taskCounts(ablation);

  const failures = [];
  const results = [];
  let changedFiles = 0;

  for (const target of TARGETS) {
    const original = fs.readFileSync(target.file, "utf8");
    const hero = stampHero(original, source.viewer_hero, target.language);
    const sentence = zeroJitterSentence(ablation, target.language);
    const comparison = stampZeroJitter(hero.html, sentence, target.language);
    // Built first and spliced second, so the generated markup is also available on its own.
    // Every table on these pages is now emitted here, so the structural checks below cover all
    // of them rather than all but one.
    const generated = [
      ["areas", areasSection(source, target.language, context)],
      ["projects", projectsSection(source, target.language)],
      ["ai", aiSection(source, target.language)],
      ["check", checkSection(source, target.language)],
      ["tasks", tasksSection(source, target.language, counts)],
      ["regional", regionalSection(source, target.language)],
      ["sources", sourcesSection(source, target.language)],
      ["assumptions", assumptionsSection(source, target.language)],
    ];
    let output = comparison.html;
    for (const [id, markup] of generated) output = replaceSection(output, id, markup);
    const generatedMarkup = generated.map(([, markup]) => markup).join("");
    // Stamped last, over the finished page, so the hand-authored figures and the generated
    // ones are told the same thing by the same rule. Doing it per section would leave the
    // four images the sections do not own — the hero among them — as the only ones on the
    // page with no size and no loading policy, which is the state this closes.
    const images = stampImages(output, target.file);
    output = images.html;
    const changed = output !== original;
    if (changed) changedFiles += 1;
    if (changed && !checkOnly) fs.writeFileSync(target.file, output, "utf8");

    const relative = path.relative(PACKAGE_ROOT, target.file).split(path.sep).join("/");
    for (const project of source.projects) {
      if (!output.includes(project.id)) failures.push(`${relative} does not list action ${project.id}`);
      if (!output.includes(project[`name_${target.language}`])) {
        failures.push(`${relative} does not use the registry title for ${project.id}`);
      }
    }
    for (const area of source.areas) {
      if (!output.includes(area[`role_${target.language}`])) {
        failures.push(`${relative} does not use the registry role for ${area.id}`);
      }
    }
    // A viewer carrying the other language's wording would mean the sections were
    // generated from the wrong column of the record.
    const other = target.language === "zh" ? "en" : "zh";
    for (const area of source.areas) {
      if (output.includes(area[`distinct_task_${other}`])) {
        failures.push(`${relative} carries the ${other} task text for ${area.id}`);
      }
    }

    // The six sections generated from `viewer_sections` and `regional_synergy` have to carry
    // every registered id and, for the records whose whole purpose is the clause, the clause
    // itself. Containment is enough here only because the ids are unique tokens: a scenario
    // missing from one language and present in the other is the exact fault these sections
    // shipped with, and the id is what makes that visible.
    const sections = source.viewer_sections;
    for (const scenario of sections.scenarios) {
      if (!output.includes(scenario.id)) failures.push(`${relative} does not list scenario ${scenario.id}`);
      for (const field of sections.scenario_fields) {
        if (!output.includes(escapeHtml(pick(scenario, field, target.language)))) {
          failures.push(`${relative} does not carry the ${field} of ${scenario.id}`);
        }
      }
      // A stop rule printed in the wrong language is a stop rule the reader of this page
      // cannot act on, and it is what a copy-paste between the two viewers looks like.
      if (output.includes(escapeHtml(scenario[`stop_rule_${other}`]))) {
        failures.push(`${relative} carries the ${other} stop rule of ${scenario.id}`);
      }
    }
    for (const [records, what] of [
      [sections.review_gates, "review gate"],
      [sections.source_families, "source family"],
      [sections.assumption_limits, "assumption"],
      [sections.task_coverage.rows, "task-coverage row"],
      [source.regional_synergy.partners, "synergy counterpart"],
    ]) {
      for (const record of records) {
        if (!output.includes(record.id)) failures.push(`${relative} does not list ${what} ${record.id}`);
      }
    }
    for (const family of sections.source_families) {
      if (!output.includes(escapeHtml(pick(family, "supports", target.language)))) {
        failures.push(`${relative} lists ${family.id} without saying what it supports`);
      }
    }
    for (const entry of sections.assumption_limits) {
      if (!output.includes(escapeHtml(pick(entry, "limit", target.language)))) {
        failures.push(`${relative} does not carry the limit of ${entry.id}`);
      }
    }
    // A coverage cell is the one place this package tells a reviewer how much of the brief it
    // answers, so it is checked with the counts already substituted: the sentence on the page
    // has to be the sentence the registries produce, not the template it was written from.
    for (const row of sections.task_coverage.rows) {
      for (const column of sections.task_coverage.columns) {
        const filled = fillCounts(pick(row, column, target.language), row.counts, counts);
        if (!output.includes(escapeHtml(filled))) {
          failures.push(`${relative} does not carry the recomputed ${column} of ${row.id}`);
        }
      }
      if (output.includes(escapeHtml(fillCounts(row[`coverage_${other}`], row.counts, counts)))) {
        failures.push(`${relative} carries the ${other} coverage text of ${row.id}`);
      }
    }
    // Each synergy row may say only these four things, and it has to say all four: a
    // counterpart named with no claim limit next to it reads as a relationship that exists.
    for (const partner of source.regional_synergy.partners) {
      for (const column of source.regional_synergy.columns) {
        if (!output.includes(escapeHtml(pick(partner, column, target.language)))) {
          failures.push(`${relative} does not carry the ${column} of ${partner.id}`);
        }
      }
    }
    if (!output.includes(escapeHtml(source.regional_synergy.source_ref))) {
      failures.push(`${relative} publishes the synergy matrix without naming what it is drawn from`);
    }

    // A table labelled by a heading the page does not declare has no accessible name at all,
    // and one labelled by an id two elements share has an ambiguous one, so the pointer is
    // resolved against the finished page rather than assumed. Counting the structural parts
    // rather than looking for them catches the case a containment test cannot: one table built
    // the old way among twelve.
    //
    // The opening markup is matched whole, so a table that skipped the scroll container, lost
    // its column count or disagreed with its container about which heading names it is not a
    // table this loop can see — and the count comparison below is what turns that invisibility
    // into a failure rather than a smaller number of tables checked.
    const generatedTables = [...generatedMarkup.matchAll(
      /<div class="table-scroll" role="region" tabindex="0" aria-labelledby="([^"]+)">\s*<table class="table" style="--table-columns:(\d+)" aria-labelledby="([^"]+)">([\s\S]*?)<\/table>/g,
    )];
    const tables = occurrences(generatedMarkup, `<table class="table"`);
    if (generatedTables.length !== tables) {
      failures.push(`${relative} generates ${tables} tables, ${generatedTables.length} of them inside a labelled `
        + `scroll region with a declared column count`);
    }
    for (const [, region, columns, target, inner] of generatedTables) {
      if (region !== target) {
        failures.push(`${relative} puts a table labelled by ${target} in a region labelled by ${region}`);
      }
      const declared = occurrences(output, `id="${target}"`);
      if (declared !== 1) {
        failures.push(`${relative} labels a table by ${target}, which ${declared} elements declare`);
      }
      const headers = occurrences(inner, `<th scope="col">`);
      if (Number(columns) !== headers) {
        failures.push(`${relative} declares ${columns} columns for ${target} and prints ${headers} of them`);
      }
    }
    // A unique id is not a unique name. Six key-area tables labelled by six distinct ids still
    // announced themselves as "Components" three times and "Proposed step-free chains" three
    // times, which leaves a reader listing the tables of the page unable to tell which area
    // each belongs to. Every generated table on the page must therefore resolve to a name no
    // other generated table on that page resolves to.
    const names = new Map();
    for (const [, , , target] of generatedTables) {
      const name = labelledText(output, target);
      if (name === null) {
        failures.push(`${relative} labels a table by ${target}, which carries no text to name it with`);
        continue;
      }
      names.set(name, [...(names.get(name) ?? []), target]);
    }
    for (const [name, pointers] of names) {
      if (pointers.length > 1) {
        failures.push(`${relative} gives ${pointers.length} tables the same accessible name `
          + `${JSON.stringify(name)} (${pointers.join(", ")})`);
      }
    }
    for (const [needle, what] of [
      ["<thead>", "a header row group"],
      ["<tbody>", "a body row group"],
    ]) {
      const found = occurrences(generatedMarkup, needle);
      if (found !== tables) {
        failures.push(`${relative} generates ${tables} tables but ${found} with ${what}`);
      }
    }
    const unscoped = occurrences(generatedMarkup, "<th>");
    if (unscoped !== 0) failures.push(`${relative} generates ${unscoped} header cells with no scope`);
    if (!output.includes(escapeHtml(source.viewer_hero[`method_${target.language}`]))) {
      failures.push(`${relative} does not carry the hero method sentence from the bilingual record`);
    }
    // The comparison must survive section replacement, and it must be this page's own
    // language: a Chinese reader sent an English ablation sentence is not being told the
    // result, only shown it.
    if (!output.includes(escapeHtml(sentence))) {
      failures.push(`${relative} does not carry the zero-jitter comparison written from the ablation record`);
    }
    if (output.includes(escapeHtml(zeroJitterSentence(ablation, target.language === "zh" ? "en" : "zh")))) {
      failures.push(`${relative} carries the other language's zero-jitter comparison`);
    }
    // Every plate of this language must be reachable and shown here, and no raster of the
    // other language may appear: the Chinese path is not a substring of the English one, so
    // plain containment is exact in both directions.
    //
    // The non-visual half of a plate is checked the same way. An `aria-describedby` that
    // points at nothing, or at a node that also describes another drawing, is worse than no
    // description at all, because a screen reader announces it as if it belonged here — so
    // the description id is counted, not merely looked for.
    for (const artifact of artifacts) {
      const anchor = plateAnchor(artifact.area, artifact.concept, artifact.language);
      const descriptionId = plateDescriptionId(artifact.area, artifact.concept, artifact.language);
      const record = context.records.get(artifact.artifact_id);
      if (artifact.language === target.language) {
        if (!output.includes(`id="${anchor}"`)) failures.push(`${relative} has no anchor ${anchor}`);
        if (!output.includes(artifact.file)) failures.push(`${relative} never references ${artifact.file}`);
        const described = occurrences(output, `id="${descriptionId}"`);
        if (described !== 1) {
          failures.push(`${relative} carries ${described} nodes with id ${descriptionId}, expected exactly one`);
        }
        if (!output.includes(`aria-describedby="${descriptionId}"`)) {
          failures.push(`${relative} does not point ${artifact.artifact_id} at its long description`);
        }
        if (!output.includes(`href="${RASTER_PREFIX}${artifact.file}"`)) {
          failures.push(`${relative} offers no full-resolution link to ${artifact.file}`);
        }
        if (record && !output.includes(escapeHtml(record.extended_description))) {
          failures.push(`${relative} does not carry the registered long description of ${artifact.artifact_id}`);
        }
        if (record && !output.includes(`alt="${escapeHtml(record.alt_text)}"`)) {
          failures.push(`${relative} does not carry the registered alt text of ${artifact.artifact_id}`);
        }
      } else {
        if (output.includes(`id="${anchor}"`)) failures.push(`${relative} carries the ${artifact.language} anchor ${anchor}`);
        if (output.includes(artifact.file)) {
          failures.push(`${relative} references the ${artifact.language} raster ${artifact.file}`);
        }
        if (output.includes(descriptionId)) {
          failures.push(`${relative} carries the ${artifact.language} description id ${descriptionId}`);
        }
        if (record && output.includes(escapeHtml(record.extended_description))) {
          failures.push(`${relative} carries the ${artifact.language} long description of ${artifact.artifact_id}`);
        }
      }
    }
    // The Dazhongsi limit is quoted rather than paraphrased, and only in this page's own
    // language: a reader of the English viewer is not asked to read a Chinese footnote.
    const otherLanguage = target.language === "zh" ? "en" : "zh";
    const disclosures = { zh: contract.DZS_DISCLOSURE_ZH, en: contract.DZS_DISCLOSURE_EN };
    if (!output.includes(escapeHtml(disclosures[target.language]))) {
      failures.push(`${relative} does not carry the Issue #1029 disclosure in ${target.language}`);
    }
    if (output.includes(escapeHtml(disclosures[otherLanguage]))) {
      failures.push(`${relative} carries the ${otherLanguage} Issue #1029 disclosure`);
    }
    // The stamp has already refused anything it could not measure, so what is left to prove
    // is that the measurement survived into the markup a reader receives. It is read back off
    // the finished page rather than off the stamp's own list, because a report that agreed
    // with the function that produced it would say nothing about the file being written.
    const published = [...output.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag);
    if (published.length !== images.images.length) {
      failures.push(`${relative} publishes ${published.length} images and stamped ${images.images.length}`);
    }
    const eager = published.filter((tag) => tag.includes(`loading="eager"`));
    const lazy = published.filter((tag) => tag.includes(`loading="lazy"`));
    if (eager.length !== 1) {
      failures.push(`${relative} fetches ${eager.length} images eagerly, expected exactly the hero`);
    }
    if (eager.length + lazy.length !== published.length) {
      failures.push(`${relative} publishes ${published.length} images and declares loading on ${eager.length + lazy.length}`);
    }
    for (const tag of published) {
      const src = (tag.match(/\ssrc="([^"]*)"/) || [])[1] ?? "an image";
      if (!tag.includes(`decoding="async"`)) failures.push(`${relative} decodes ${src} on the main thread`);
      if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) {
        failures.push(`${relative} publishes ${src} without an intrinsic size`);
      }
    }
    if (eager.length === 1 && !eager[0].includes(`fetchpriority="high"`)) {
      failures.push(`${relative} fetches the hero eagerly without claiming the priority that justifies it`);
    }

    results.push({
      file: relative,
      language: target.language,
      changed,
      hero_stamped: hero.changed,
      zero_jitter_stamped: comparison.changed,
      generated_tables: tables,
      distinct_table_names: names.size,
      images: published.length,
      eager_images: eager.length,
      lazy_images: lazy.length,
    });

  }

  const report = {
    status: failures.length === 0 ? "PASS" : "FAIL",
    exit_code: failures.length === 0 ? (checkOnly && changedFiles > 0 ? 1 : 0) : 1,
    mode: checkOnly ? "check" : "write",
    changed_files: changedFiles,
    areas: source.areas.length,
    projects: source.projects.length,
    scenarios: source.viewer_sections.scenarios.length,
    review_gates: source.viewer_sections.review_gates.length,
    source_families: source.viewer_sections.source_families.length,
    assumptions: source.viewer_sections.assumption_limits.length,
    task_coverage_rows: source.viewer_sections.task_coverage.rows.length,
    task_coverage_counts: counts,
    synergy_counterparts: source.regional_synergy.partners.length,
    plates_shown: artifacts.length / contract.LANGUAGES.length,
    registry_titles_available: context.records.size,
    failures,
    results,
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  return report.exit_code;
}

if (require.main === module) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (error) {
    process.stdout.write(`${JSON.stringify({
      status: "FAIL",
      exit_code: 2,
      error_type: "build_error",
      error: error instanceof Error ? error.message : String(error),
    }, null, 2)}\n`);
    process.exitCode = 2;
  }
}

module.exports = {
  findSection,
  replaceSection,
  headingId,
  areasSection,
  projectsSection,
  aiSection,
  checkSection,
  sourcesSection,
  assumptionsSection,
  regionalSection,
  plateAnchor,
  plateDescriptionId,
  plateFigures,
  zeroJitterSentence,
  stampZeroJitter,
  pngSize,
  stampImages,
};
