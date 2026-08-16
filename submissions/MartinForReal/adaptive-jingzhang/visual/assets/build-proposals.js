#!/usr/bin/env node
"use strict";

// Regenerates the two proposal bodies from the bilingual source of truth.
//
// Six deterministic corrections are applied:
//   1. Evidence-marker migration. The trusted repository renderer understands only
//      source/standard/depth/data/metric, so [assumption:ID] survives into the
//      rendered HTML as literal bracket text. Each ID is already registered in
//      assumptions.json, so the marker is rewritten to [data:assumptions.json#ID].
//      No assumption is removed, renamed, or reworded.
//   2. Method naming. The prose is renamed to the computation actually performed.
//   3. Section headings. The validator matches required sections by containment, so
//      each H2 is replaced by the canonical bilingual heading for its position.
//   4. Key-area register. The component IDs, route IDs, per-entry evidence references,
//      winter and maintenance duties, and the one Phase 1 envelope per area were only
//      in the registry, so a reader of the document could not check any of them. They
//      are now written into the body of the key-area section.
//   5. Action governance register. Every P00-P11 action is written into the body as one
//      row of a single decision table: the action, its phase, the accountable role, the
//      observed metric, the stop condition, the rollback, and the D gate that blocks it.
//      The remaining eight clauses — maintainer, beneficiary, worst-affected group,
//      proposed target, stop authority, physical restoration, residual liability, and
//      non-digital fallback — stay in action-governance.json, which this script requires
//      to carry all twelve for every action before it will print any of them.
//   6. Key-area plate architecture. The fifteen plates are the spatial argument of the
//      proposal, and a reader could previously find their ids nowhere in the body. Each
//      plate is now named in the paragraph that makes its own argument, written from
//      key-area-design.json, and the Dazhongsi claim limit carries the exact registered
//      Issue #1029 disclosure sentence rather than a paraphrase of it.
//
// The script is idempotent: running it on already-corrected files changes nothing
// and reports zero replacements.
//
// Usage: node build-proposals.js [--check]
//   --check  report what would change and exit 1 if anything would, without writing.

const fs = require("node:fs");
const path = require("node:path");
const contract = require("./key-area-contract.js");

const ASSETS = __dirname;
const PACKAGE_ROOT = path.resolve(ASSETS, "..", "..");
const SOURCE = path.join(ASSETS, "regeneration-source.json");
const GOVERNANCE = path.join(ASSETS, "action-governance.json");
const DESIGN = path.join(ASSETS, "key-area-design.json");

// The three `##` sections whose generated `###` register is written by this script. Position
// is the key everywhere else in this file, so it is the key here too.
const AREA_REGISTER_ORDER = 5;
const GOVERNANCE_REGISTER_ORDER = 10;
// The taskbook asks about regional synergy under its industry-and-future-city dimension, and
// that is the chapter this proposal answers that dimension in, so the matrix goes there
// rather than into a section of its own where a reader looking for the answer would not be.
const REGIONAL_SYNERGY_ORDER = 3;

// The bilingual fields every action must carry into the body. Listing them here rather
// than deriving them from whatever happens to be in the record means an action that quietly
// loses a field fails the build instead of shipping a shorter table than its neighbours.
const GOVERNANCE_FIELDS = [
  "operator_role",
  "maintainer",
  "beneficiary",
  "worst_affected",
  "metric",
  "proposed_target",
  "stop_trigger",
  "stop_authority",
  "rollback",
  "physical_restoration",
  "residual_liability",
  "non_digital_fallback",
];

// The four of those twelve that are printed in the proposal, in column order. The other
// eight are still required of the record above; they are simply read in the record rather
// than in the body, because a twenty-column table is not a governance instrument, it is a
// wall a reviewer skips. Splitting the list in two keeps that a stated editorial decision
// instead of an accident of which fields a template happened to reference.
const GOVERNANCE_ROW_FIELDS = ["operator_role", "metric", "stop_trigger", "rollback"];

const TARGETS = [
  { language: "zh", file: path.join(PACKAGE_ROOT, "proposal.md") },
  { language: "en", file: path.join(PACKAGE_ROOT, "proposal.en.md") },
];

// The five plate concepts, named once in both languages. The viewer builder captions the
// same fifteen plates, so it imports this table instead of keeping a second copy that could
// drift; the ids and file names themselves come from the key-area contract, not from here.
const PLATE_CONCEPT_LABELS = {
  "01": { zh: "现状、主张与限度", en: "situation, claim and limits" },
  "02": { zh: "项目与流线", en: "program and flows" },
  "03": { zh: "可逆模块剖面", en: "reversible module sections" },
  "04": { zh: "到达、运行与季节", en: "access, operations and seasons" },
  "05": { zh: "治理、停止与证据", en: "governance, stop and evidence" },
};

// How the drawings of an area stand in relation to the ground. Neither mode is a boundary.
const SPATIAL_MODE_LABELS = {
  provisional_extent: { zh: "临时工作范围", en: "provisional working extent" },
  not_to_scale_topology: { zh: "非比例、非定位拓扑", en: "not-to-scale, non-georeferenced topology" },
};

function readSource() {
  return JSON.parse(fs.readFileSync(SOURCE, "utf8"));
}

function readGovernance() {
  return JSON.parse(fs.readFileSync(GOVERNANCE, "utf8"));
}

function readDesign() {
  return JSON.parse(fs.readFileSync(DESIGN, "utf8"));
}

// Picks the value for one language out of a record storing both as `<field>_zh` and
// `<field>_en`. A missing key is an authoring error; an empty cell would ship silently.
function pick(record, field, language) {
  const key = `${field}_${language}`;
  if (!(key in record) || record[key] === null || record[key] === undefined) {
    throw new Error(`record is missing ${key}`);
  }
  return record[key];
}

// The renderer's `split_table_row` treats a backslash-escaped pipe as cell content and
// unescapes it, so an evidence reference keeps its own `|` separators verbatim instead of
// being rewritten into a different punctuation just to survive the table syntax.
function cell(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function markdownTable(headers, rows) {
  return [
    `| ${headers.map(cell).join(" | ")} |`,
    `|${headers.map(() => "---").join("|")}|`,
    ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
  ];
}

// A label table lookup that names the missing key. An unlabelled concept would otherwise
// print as `undefined` in the middle of a paragraph.
function labelFor(table, key, language, what) {
  const entry = table[key];
  if (!entry || !entry[language]) throw new Error(`no ${language} label for ${what} ${key}`);
  return entry[language];
}

// Chinese and English do not punctuate the same way, and a full-width mark inside an
// English sentence reads as a typesetting fault to exactly the reader it was written for.
// Every mark this file wraps around generated text is looked up here instead of being typed
// into the template, because a literal "（" in a template is invisible in review and only
// becomes visible in the English PDF. The English bracket carries its own leading space; the
// Chinese one must not, and the Chinese colon needs no space after it.
const PUNCTUATION = {
  zh: { open: "（", close: "）", colon: "：", colonGap: "", listSep: "、" },
  en: { open: " (", close: ")", colon: ":", colonGap: " ", listSep: ", " },
};

function marks(language) {
  const set = PUNCTUATION[language];
  if (!set) throw new Error(`no punctuation set for language ${language}`);
  return set;
}

// A colon plus whatever spacing that language puts after it.
function colonFor(language) {
  const { colon, colonGap } = marks(language);
  return `${colon}${colonGap}`;
}

// Chinese runs its lists together with an enumeration comma and needs no space between
// sentences; English needs both.
function listJoin(items, language) {
  return items.join(marks(language).listSep);
}

function sentences(parts, language) {
  return parts.filter(Boolean).join(language === "zh" ? "" : " ");
}

// One plate, written as the paragraph that makes its argument. Everything here is read out
// of key-area-design.json: no dimension, owner, budget, authority or position is introduced
// by this file, and a value the record leaves pending is reported as pending.
function plateParagraph(plateId, conceptId, design, language) {
  const zh = language === "zh";
  const lead = `**${plateId} · ${labelFor(PLATE_CONCEPT_LABELS, conceptId, language, "plate concept")}**`;
  const colon = colonFor(language);
  const plan = design.plan;
  const body = [];

  if (conceptId === "01") {
    const mode = labelFor(SPATIAL_MODE_LABELS, design.spatial_mode, language, "spatial mode");
    body.push(zh ? `空间表达方式：${mode}。` : `Spatial mode: ${mode}.`);
    body.push(pick(plan, "condition", language));
    // Three different reasons a drawing may not claim something, one per area: a separation
    // that must survive suspension, a list of unknowns, and a disputed position.
    if (design.separation) body.push(pick(design.separation, "note", language));
    if (design.not_claimed) {
      body.push(pick(design, "not_claimed_note", language));
      body.push(zh
        ? `明确不主张的项目共 ${design.not_claimed.length} 类：${listJoin(design.not_claimed, language)}。`
        : `${design.not_claimed.length} categories are explicitly not claimed: ${listJoin(design.not_claimed, language)}.`);
    }
    if (design.disclosure_zh || design.disclosure_en) {
      // The registered sentence, verbatim. Paraphrasing it here would leave the reader of
      // this page with a weaker limit than the one the record commits to.
      body.push(pick(design, "disclosure", language));
      body.push(pick(design, "evidence_consequence_note", language));
      const categories = design.excluded_evidence.map((entry) => entry.category);
      body.push(zh
        ? `本区据此排除 ${categories.length} 类证据：${listJoin(categories, language)}。`
        : `${categories.length} categories of evidence are excluded for that reason: ${listJoin(categories, language)}.`);
    }
    return `${lead}${colon}${sentences(body, language)}`;
  }

  if (conceptId === "02") {
    const elements = plan.elements.map((element) => element.id);
    const cuts = plan.cut_keys.map((cut) => (zh
      ? `${cut.key}—${cut.note_zh}（${cut.section_id}）`
      : `${cut.key} — ${cut.note_en} (${cut.section_id})`));
    return zh
      ? `${lead}：${plan.title_zh}。${plan.id} 落位 ${elements.length} 个构成元素（${elements.join(" ")}），`
        + `并以剖切号与两张剖面对应：${cuts.join("；")}。`
      : `${lead}: ${plan.title_en}. ${plan.id} sets out ${elements.length} elements (${elements.join(" ")}) `
        + `and keys two cuts to the sections: ${cuts.join("; ")}.`;
  }

  if (conceptId === "03") {
    const dimensions = design.sections.flatMap((section) => section.dimensions);
    const counted = (basis) => dimensions.filter((entry) => entry.basis_type === basis).length;
    const unlawful = dimensions.filter((entry) => entry.basis_type === "pending" && entry.value !== null);
    // A pending dimension carrying a number is a site fact nobody measured, so the build
    // stops rather than printing it as if it had a basis.
    if (unlawful.length > 0) {
      throw new Error(`${unlawful.map((entry) => entry.id).join(" ")} are pending but carry a value`);
    }
    // The prose below names two bases and reports a count for each. If a third ever appears
    // the counts would silently stop adding up to the total, so the build stops instead.
    const offBasis = dimensions.filter((entry) => !contract.SECTION_DIMENSION_BASIS_TYPES.includes(entry.basis_type));
    if (offBasis.length > 0) {
      throw new Error(`${offBasis.map((entry) => entry.id).join(" ")} carry a basis no section dimension may have`);
    }
    const titles = design.sections.map((section) => (zh
      ? `${section.title_zh}（${section.id}）`
      : `${section.title_en} (${section.id})`));
    return zh
      ? `${lead}：${titles.join(" 与 ")}。两张剖面共标注 ${dimensions.length} 项尺寸：`
        + `${counted("proposed_module")} 项为本方案自提模数（proposed_module），以米计且未经核验；`
        + `${counted("pending")} 项为 pending，以米计、取值全部留空，并各自注明复算触发条件。`
        + `剖面尺寸不接受第三种依据：自本包既有几何读出的跨度不得作为剖面尺寸使用。`
      : `${lead}: ${titles.join(" and ")}. The two sections carry ${dimensions.length} dimensions between them: `
        + `${counted("proposed_module")} are modules this proposal itself proposes (proposed_module), stated in metres and unverified, `
        + `and ${counted("pending")} are pending, left null in metres and each carrying the trigger that would recompute it. `
        + `A section dimension admits no third basis: a span read off the geometry already in this package may not be printed as one.`;
  }

  if (conceptId === "04") {
    const chain = design.step_free_chain;
    const seasonal = design.seasonal_operations;
    const nodes = chain.nodes.map((node) => pick(node, "name", language));
    const equivalents = Object.keys(chain.equivalents);
    const modes = chain.operating_modes.map((mode) => mode.mode);
    const snow = seasonal.snow_storage;
    const bays = snow.locations.map((location) => location.id);
    body.push(zh
      ? `${chain.id} 以 ${chain.nodes.length} 个节点（${listJoin(nodes, language)}）与 ${chain.segments.length} 段`
        + `构成一条建议的无障碍连续路径；状态为 proposed、verified=false，无障碍闸口 ${chain.status.accessibility_gate}，`
        + `测量与专业审核均为 pending。`
      : `${chain.id} runs ${chain.nodes.length} nodes (${listJoin(nodes, language)}) across ${chain.segments.length} segments `
        + `as a proposed step-free chain; it is proposed, verified=false, its accessibility gate is `
        + `${chain.status.accessibility_gate}, and survey and professional audit are both pending.`);
    if (chain.chain_note_zh || chain.chain_note_en) body.push(pick(chain, "chain_note", language));
    body.push(zh
      ? `等效渠道 ${equivalents.length} 类（${equivalents.join(" ")}）全部为 proposed_pending_audit；`
        + `运行工况 ${modes.length} 种（${modes.join(" ")}）各自声明可用性、人工替代、停止动作与恢复条件。`
      : `Its ${equivalents.length} equivalent channels (${equivalents.join(" ")}) are all proposed_pending_audit, and its `
        + `${modes.length} operating modes (${modes.join(" ")}) each declare availability, manual fallback, stop action `
        + `and recovery condition.`);
    body.push(zh
      ? `冬季工况以 ${seasonal.winter_section_ref} 为底图展开 ${seasonal.topics.length} 个专题；`
        + `融雪暂存位 ${bays.length} 处（${bays.join(" ")}）不与无障碍链路或导向条重叠——${snow.rule_zh}`
      : `The winter case is carried on ${seasonal.winter_section_ref} across ${seasonal.topics.length} topics, and the `
        + `${bays.length} snow storage bays (${bays.join(" ")}) overlap neither the step-free chain nor the guidance strip: `
        + `${snow.rule_en}`);
    body.push(zh
      ? `试点为 ${seasonal.pilot.days} 天，sufficient_for_year_round 为 false。`
      : `The pilot is ${seasonal.pilot.days} days and sufficient_for_year_round is false.`);
    body.push(pick(seasonal.pilot, "note", language));
    return `${lead}${colon}${sentences(body, language)}`;
  }

  if (conceptId === "05") {
    const envelope = design.phase1_envelope;
    const thresholds = design.seasonal_operations.thresholds;
    const listed = thresholds.map((threshold) => (zh
      ? `${threshold.id} ${threshold.label_zh}（${threshold.proposed_target_zh}）`
      : `${threshold.id} ${threshold.label_en} (${threshold.proposed_target_en})`));
    const unapproved = thresholds.filter(
      (threshold) => threshold.approved_threshold !== null || threshold.pilot_start_allowed !== false,
    );
    // An approved threshold or a permitted pilot start would be an authorisation this
    // package does not hold, so the sentence below may only be written while none exists.
    if (unapproved.length > 0) {
      throw new Error(`${unapproved.map((entry) => entry.id).join(" ")} claim an approved threshold or a permitted pilot start`);
    }
    body.push(zh
      ? `本区第一期只以可撤除信封 ${envelope.id} 表达。`
      : `Phase 1 in this area is expressed only as the removable envelope ${envelope.id}.`);
    body.push(zh ? `撤除：${envelope.removal_zh}` : `Removal: ${envelope.removal_en}`);
    body.push(zh ? `恢复：${envelope.restoration_zh}` : `Reinstatement: ${envelope.restoration_en}`);
    body.push(zh ? `剩余责任：${envelope.liability_zh}` : `Residual liability: ${envelope.liability_en}`);
    body.push(zh
      ? `该信封未获授权（not_authorized）、未获资金（unfunded），受 ${envelope.blocked_by.join(" ")} 阻断。`
      : `The envelope is not_authorized and unfunded, and is blocked by ${envelope.blocked_by.join(" ")}.`);
    body.push(zh
      ? `${thresholds.length} 项季节阈值——${listed.join("；")}——的 approved_threshold 均为空、pilot_start_allowed 均为 false；`
        + `在阈值获批之前不得开始试点。`
      : `Its ${thresholds.length} seasonal thresholds — ${listed.join("; ")} — all hold approved_threshold null and `
        + `pilot_start_allowed false; no pilot may start before a threshold is approved.`);
    return `${lead}${colon}${sentences(body, language)}`;
  }

  throw new Error(`no paragraph is written for plate concept ${conceptId}`);
}

// The five plates of one area, each beside the argument it carries.
function plateLines(area, design, labels, language) {
  const contractArea = contract.AREAS.find((entry) => entry.area_feature_id === area.id);
  if (!contractArea) throw new Error(`${area.id} has no entry in the key-area contract`);
  const lines = [`**${pick(labels, "plates", language)}**`, ""];
  for (const concept of contract.CONCEPTS) {
    lines.push(plateParagraph(contract.plateId(contractArea, concept), concept.concept_id, design, language), "");
  }
  return lines;
}

// One area: what it is for, what is in it, how it is reached step-free, what winter and
// maintenance do to it, what a single reversible Phase 1 pilot would occupy, and the five
// plates that carry the spatial argument for each of those.
function areaBlock(area, labels, language, design) {
  const lines = [];
  lines.push(`#### ${pick(area, "name", language)}`, "");

  const meta = [
    `${pick(labels, "role_label", language)}: ${pick(area, "role", language)}`,
    `${pick(labels, "official_area", language)}: ${area.official_area_ha} ha`,
    area.lab,
  ];
  if (area.georeferenced === false) meta.push(pick(labels, "non_georeferenced", language));
  lines.push(meta.join(" · "), "");
  lines.push(pick(area, "distinct_task", language), "");

  // An area whose position is disputed says so beside its own content, not in a footnote.
  if (area.georeferenced === false) {
    lines.push(`> **${pick(labels, "non_georeferenced", language)}** ${pick(area, "non_station_note", language)}`, "");
  }

  const headers = [
    pick(labels, "col_id", language),
    pick(labels, "col_name", language),
    pick(labels, "col_description", language),
    pick(labels, "col_evidence", language),
    pick(labels, "col_blocked", language),
  ];

  lines.push(`**${pick(labels, "components_heading", language)}**`, "");
  lines.push(...markdownTable(headers, area.components.map((component) => [
    component.id,
    pick(component, "name", language),
    pick(component, "description", language),
    component.evidence_ref,
    component.blocked_by.join(" "),
  ])), "");

  lines.push(`**${pick(labels, "routes_heading", language)}**`, "");
  lines.push(...markdownTable(headers, area.routes.map((route) => {
    // A chain published as step-free must be declared step-free in the record; otherwise
    // the table would assert continuity the registry never claimed.
    if (route.step_free !== true) {
      throw new Error(`${route.id} is published as a step-free chain but is not marked step_free`);
    }
    return [
      route.id,
      `${pick(route, "name", language)}${marks(language).open}${pick(labels, "step_free", language)}${marks(language).close}`,
      pick(route, "description", language),
      route.evidence_ref,
      route.blocked_by.join(" "),
    ];
  })), "");

  lines.push(`**${pick(labels, "winter", language)}${marks(language).colon}** ${pick(area, "winter", language)}`, "");
  lines.push(`**${pick(labels, "maintenance", language)}${marks(language).colon}** ${pick(area, "maintenance", language)}`, "");

  const envelope = area.phase1_envelope;
  const states = [
    envelope.reversible ? pick(labels, "reversible", language) : null,
    envelope.authorization_state === "not_authorized"
      ? pick(labels, "not_authorized", language)
      : envelope.authorization_state,
    envelope.funding_state === "unfunded" ? pick(labels, "unfunded", language) : envelope.funding_state,
    `${pick(labels, "col_blocked", language)}: ${envelope.blocked_by.join(" ")}`,
  ].filter(Boolean);
  lines.push(
    `**${pick(labels, "envelope", language)} ${envelope.id}${marks(language).colon}** ${pick(envelope, "description", language)}`
    + ` — ${states.join(" · ")}`,
    "",
  );
  lines.push(...plateLines(area, design, labels, language));
  return lines;
}

function areaRegisterBlock(source, design, language) {
  const labels = source.ui_labels;
  const block = source.proposal_blocks.area_register;
  const designAreas = new Map(design.areas.map((area) => [area.area_feature_id, area]));
  const concepts = contract.CONCEPTS.map(
    (concept) => `${concept.concept_id} ${labelFor(PLATE_CONCEPT_LABELS, concept.concept_id, language, "plate concept")}`,
  );
  const plates = contract.AREAS.length * contract.CONCEPTS.length;
  // The architecture, stated once, so that the fifteen ids below read as a set rather than
  // as decoration. The basis rule comes from the design record itself.
  const preamble = language === "zh"
    ? `重点区图版架构为 ${contract.AREAS.length} 个片区 × ${contract.CONCEPTS.length} 个主题 = ${plates} 张图版，`
      + `双语共 ${plates * contract.LANGUAGES.length} 件产物（每张图版一个中文件、一个英文件）。`
      + `五个主题依次为：${concepts.join("；")}。${design.basis_note_zh}`
    : `The key-area plate architecture is ${contract.AREAS.length} areas × ${contract.CONCEPTS.length} concepts = `
      + `${plates} plates, published as ${plates * contract.LANGUAGES.length} bilingual artifacts (one Chinese and one `
      + `English file per plate). The five concepts are ${concepts.join("; ")}. ${design.basis_note_en}`;
  const lines = [
    `### ${pick(block, "heading", language)}`,
    "",
    pick(block, "intro", language),
    "",
    preamble,
    "",
  ];
  for (const area of source.areas) {
    const designArea = designAreas.get(area.id);
    // The register and the design record are joined on the feature id, so an area present
    // in one and missing from the other stops the build instead of shipping a short block.
    if (!designArea) throw new Error(`${DESIGN} declares nothing for ${area.id}`);
    lines.push(...areaBlock(area, labels, language, designArea));
  }
  while (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
  return lines;
}

// The regional-synergy answer the taskbook asks for and this proposal did not give.
//
// `review_dimensions[3]` of the agent taskbook names five counterparts and asks whether the
// proposal shows innovation synergy with them. It publishes their names and nothing else, and
// this package holds no primary record of any of the five. That is the whole basis available,
// so the table has exactly the four columns a name can support: the relationship that could
// be proposed, the evidence that would have to arrive before it is more than a proposal, the
// review level that would receive that evidence, and what the row does not claim. A fifth
// column — a route, an investment, a distance, a signed arrangement — would have to be
// invented, and the table refuses to have somewhere to put one.
//
// Each row is required to carry all four before it is printed. A counterpart named with three
// filled cells and an empty claim limit reads as a relationship that already exists, which is
// precisely the reading this table is written to prevent.
function regionalSynergyBlock(source, language) {
  const block = source.proposal_blocks.regional_synergy;
  const labels = source.ui_labels.regional;
  const synergy = source.regional_synergy;
  const rows = synergy.partners.map((partner) => {
    for (const column of synergy.columns) {
      const value = partner[`${column}_${language}`];
      if (typeof value !== "string" || value.trim() === "") {
        throw new Error(`${partner.id} registers no ${column}_${language}`);
      }
    }
    return [
      `${partner.id} ${pick(partner, "name", language)}`,
      ...synergy.columns.map((column) => pick(partner, column, language)),
    ];
  });
  const provenance = sentences([
    `${pick(labels, "eyebrow", language)}${colonFor(language)}${synergy.source_ref}`
      + ` [source:${synergy.source_id}]${marks(language).open}${synergy.evidence_state}${marks(language).close}`,
    pick(block, "limit", language),
  ], language);
  const lines = [
    `### ${pick(block, "heading", language)}`,
    "",
    pick(block, "intro", language),
    "",
    ...markdownTable(
      [
        pick(labels, "col_partner", language),
        pick(labels, "col_relationship", language),
        pick(labels, "col_evidence", language),
        pick(labels, "col_review", language),
        pick(labels, "col_limit", language),
      ],
      rows,
    ),
    "",
    provenance,
  ];
  while (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
  return lines;
}

// One compact decision table, one row per action.
//
// This register used to print all twelve clauses of every action as a labelled two-column
// block, which came to 258 lines of the proposal — long enough that the seven facts a
// reviewer actually needs in order to hold someone to something were buried among the five
// they can look up. The record did not change: action-governance.json still holds every
// clause, and this function still refuses to print an action that has lost any of them.
// What changed is that the document now prints the accountability columns and names the
// record for the rest, rather than reproducing the record and being skipped.
function governanceBlock(source, governance, language) {
  const labels = governance.labels;
  const intro = source.proposal_blocks.governance_register;
  const projects = new Map(source.projects.map((project) => [project.id, project]));
  const lines = [
    `### ${pick(labels, "heading", language)}`,
    "",
    pick(intro, "intro", language),
    "",
    pick(governance, "boundary", language),
    "",
    pick(intro, "full_register", language),
    "",
  ];

  const rows = governance.actions.map((action) => {
    const project = projects.get(action.id);
    if (!project) throw new Error(`${action.id} has governance but no entry in the action registry`);
    if (project.phase !== action.phase) {
      throw new Error(`${action.id} is ${project.phase} in the action registry and ${action.phase} here`);
    }
    // Narrowing the table must not narrow the contract, so the full twelve are demanded of
    // the record here, at the point where four of them are taken out of it.
    for (const field of GOVERNANCE_FIELDS) {
      const value = action[`${field}_${language}`];
      if (typeof value !== "string" || value.trim() === "") {
        throw new Error(`${action.id} registers no ${field}_${language}`);
      }
    }
    // A row naming an action with no unresolved gate would read as a schedule rather than
    // as a blocked proposal, which is the one thing this register exists to prevent.
    if (!Array.isArray(action.blocked_by) || action.blocked_by.length === 0) {
      throw new Error(`${action.id} is published with no blocking gate`);
    }
    if (action.authorized_target !== null) {
      throw new Error(`${action.id} is published with a non-null authorized_target`);
    }
    return [
      `${action.id} ${pick(project, "name", language)}`,
      action.phase,
      ...GOVERNANCE_ROW_FIELDS.map((field) => pick(action, field, language)),
      action.blocked_by.join(" "),
    ];
  });

  lines.push(...markdownTable(
    [
      pick(labels, "col_action", language),
      pick(labels, "phase", language),
      ...GOVERNANCE_ROW_FIELDS.map((field) => pick(labels, field, language)),
      pick(labels, "blocked_by", language),
    ],
    rows,
  ), "");
  while (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
  return lines;
}

// Writes a generated `###` subsection at the end of the `##` section at `order`, replacing
// any earlier copy of itself. Position is the only stable key the proposal offers, and an
// existing block is removed before the new one is appended, so a rerun on already-generated
// text reproduces it byte for byte instead of stacking a second copy.
function upsertSubsection(text, sectionHeadings, order, language, blockLines) {
  const canonical = sectionHeadings.headings.find((heading) => heading.order === order);
  if (!canonical) throw new Error(`no canonical heading at order ${order}`);
  const parent = `## ${canonical[language]}`;
  const lines = text.split("\n");
  const start = lines.indexOf(parent);
  if (start === -1) throw new Error(`body is missing ${parent}`);

  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^## /.test(lines[index])) {
      end = index;
      break;
    }
  }

  const head = lines.slice(0, start + 1);
  let body = lines.slice(start + 1, end);
  const tail = lines.slice(end);

  const marker = blockLines[0];
  const at = body.indexOf(marker);
  if (at !== -1) {
    let stop = body.length;
    for (let index = at + 1; index < body.length; index += 1) {
      // Four-hash headings belong to the generated block; only a shallower heading ends it.
      if (/^#{1,3} /.test(body[index])) {
        stop = index;
        break;
      }
    }
    body = [...body.slice(0, at), ...body.slice(stop)];
  }
  while (body.length > 0 && body[body.length - 1].trim() === "") body.pop();

  return [...head, ...body, "", ...blockLines, "", ...tail].join("\n");
}

function migrateMarkers(text, migration) {
  const pattern = new RegExp(`\\[${migration.unsupported_kind}:([^\\]\\s]+)\\]`, "g");
  const seen = [];
  const migrated = text.replace(pattern, (whole, id) => {
    if (!migration.ids.includes(id)) {
      throw new Error(`unregistered ${migration.unsupported_kind} id ${id}`);
    }
    seen.push(id);
    return `[${migration.target_kind}:${migration.target_file}#${id}]`;
  });
  return { text: migrated, replaced: seen };
}

function applyTerminology(text, terminology, language) {
  const applied = [];
  let output = text;
  for (const entry of terminology) {
    for (const replacement of entry.replacements) {
      if (replacement.language !== language) continue;
      // A replacement whose result still contains its own trigger would re-fire on
      // every build and silently duplicate the inserted sentence, so reject it here
      // rather than discovering it as drifting prose later.
      if (replacement.to.includes(replacement.from)) {
        throw new Error(
          `${entry.id} (${replacement.language}) is not idempotent: its replacement text contains its own trigger`,
        );
      }
      if (!output.includes(replacement.from)) continue;
      const before = output;
      output = output.split(replacement.from).join(replacement.to);
      if (output !== before) applied.push(entry.id);
    }
  }
  return { text: output, applied };
}

// Replaces every H2 with the canonical heading for its position. The proposal keeps
// its own section order, so position is the only key available; a body whose H2 count
// differs from the canonical set is a structural change this script must not guess at.
function applyHeadings(text, sectionHeadings, language) {
  const canonical = [...sectionHeadings.headings].sort((a, b) => a.order - b.order);
  const lines = text.split("\n");
  const positions = [];
  let fenced = false;
  for (let index = 0; index < lines.length; index += 1) {
    if (/^\s*(```|~~~)/.test(lines[index])) fenced = !fenced;
    if (!fenced && /^## /.test(lines[index])) positions.push(index);
  }
  if (positions.length !== canonical.length) {
    throw new Error(
      `${language} body has ${positions.length} H2 headings, but the canonical set declares ${canonical.length}`,
    );
  }
  const rewritten = [];
  positions.forEach((line, index) => {
    const expected = `## ${canonical[index][language]}`;
    if (lines[line] === expected) return;
    rewritten.push({ order: canonical[index].order, from: lines[line].slice(3), to: canonical[index][language] });
    lines[line] = expected;
  });
  return { text: lines.join("\n"), rewritten };
}

// Stamps the front-matter title from the canonical record. The renderer emits the single
// <h1> from this line, so it is the one place the document is named; leaving it hand-typed
// is how the English title acquired an extra `The` that matched nothing else in the package.
// Only the value is rewritten — the key, the quoting, and every other front-matter line are
// left exactly as authored.
function applyFrontMatterTitle(text, documentTitle, language) {
  const key = documentTitle.front_matter_key;
  const canonical = documentTitle.canonical[language];
  const marker = "\n---\n";
  const end = text.startsWith("---\n") ? text.indexOf(marker, 4) : -1;
  if (end === -1) throw new Error(`${language} body has no front matter to stamp the title into`);
  const head = text.slice(0, end);
  const rest = text.slice(end);
  const pattern = new RegExp(`^${key}:\\s*"([^"]*)"$`, "m");
  const found = head.match(pattern);
  if (!found) throw new Error(`${language} front matter carries no quoted ${key}`);
  if (found[1] === canonical) return { text, rewritten: null };
  const superseded = documentTitle.superseded_variants?.[language] ?? [];
  // A title that is neither the canonical one nor a registered superseded variant is an
  // edit nobody declared. Rewriting it anyway would let this script quietly overwrite a
  // deliberate change, so it stops and names both strings instead.
  if (!superseded.includes(found[1])) {
    throw new Error(
      `${language} front-matter ${key} is "${found[1]}", which is neither canonical nor a registered superseded variant`,
    );
  }
  return { text: head.replace(pattern, `${key}: "${canonical}"`) + rest, rewritten: { from: found[1], to: canonical } };
}

// Drops the body-level H1. The renderer emits one <h1> from the front-matter title, so
// a body heading makes a second one. Front matter is left untouched.
function removeBodyTitle(text, documentTitle, language) {
  const marker = "\n---\n";
  const frontMatterEnd = text.startsWith("---\n") ? text.indexOf(marker, 4) : -1;
  const split = frontMatterEnd === -1 ? 0 : frontMatterEnd + marker.length;
  const head = text.slice(0, split);
  const bodyLines = text.slice(split).split("\n");
  const removed = [];
  let fenced = false;
  const kept = bodyLines.filter((line) => {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
    if (fenced || !/^# /.test(line)) return true;
    removed.push(line.slice(2));
    return false;
  });
  if (removed.length > documentTitle.expected_removals_per_file) {
    throw new Error(`${language} body carries ${removed.length} H1 headings; only one was expected`);
  }
  // Removing the heading line would otherwise leave a doubled blank line behind it.
  const body = kept.join("\n").replace(/^\n{2,}/, "\n");
  return { text: head + body, removed };
}

function main(argv) {
  const checkOnly = argv.includes("--check");
  const source = readSource();
  const governance = readGovernance();
  const design = readDesign();
  const results = [];
  const failures = [];
  let changedFiles = 0;

  // The registers are joined on action id, so a drift between the two registries would
  // otherwise surface as a silently short table rather than an error.
  const registryIds = source.projects.map((project) => project.id).sort();
  const governanceIds = governance.actions.map((action) => action.id).sort();
  if (registryIds.join(",") !== governanceIds.join(",")) {
    failures.push(
      `action registry [${registryIds.join(" ")}] and governance register [${governanceIds.join(" ")}] cover different actions`,
    );
  }

  for (const target of TARGETS) {
    const original = fs.readFileSync(target.file, "utf8");
    const migration = migrateMarkers(original, source.marker_migration);
    const terminology = applyTerminology(migration.text, source.terminology, target.language);
    const headings = applyHeadings(terminology.text, source.section_headings, target.language);
    const title = removeBodyTitle(headings.text, source.document_title, target.language);
    const frontMatter = applyFrontMatterTitle(title.text, source.document_title, target.language);

    const areaLines = areaRegisterBlock(source, design, target.language);
    const synergyLines = regionalSynergyBlock(source, target.language);
    const governanceLines = governanceBlock(source, governance, target.language);
    let output = upsertSubsection(
      frontMatter.text,
      source.section_headings,
      AREA_REGISTER_ORDER,
      target.language,
      areaLines,
    );
    output = upsertSubsection(
      output,
      source.section_headings,
      REGIONAL_SYNERGY_ORDER,
      target.language,
      synergyLines,
    );
    output = upsertSubsection(
      output,
      source.section_headings,
      GOVERNANCE_REGISTER_ORDER,
      target.language,
      governanceLines,
    );

    const relative = path.relative(PACKAGE_ROOT, target.file).split(path.sep).join("/");
    // A duplicated marker would mean the previous copy was not found and a second one was
    // appended, which is the one way this upsert can silently stop being idempotent.
    for (const marker of [areaLines[0], synergyLines[0], governanceLines[0]]) {
      const occurrences = output.split(`\n${marker}\n`).length - 1;
      if (occurrences !== 1) failures.push(`${relative} carries ${occurrences} copies of "${marker}"`);
    }

    const changed = output !== original;
    if (changed) changedFiles += 1;
    if (changed && !checkOnly) {
      fs.writeFileSync(target.file, output, "utf8");
    }
    results.push({
      file: relative,
      language: target.language,
      changed,
      markers_migrated: migration.replaced.length,
      distinct_marker_ids: Array.from(new Set(migration.replaced)).sort(),
      terminology_applied: Array.from(new Set(terminology.applied)).sort(),
      headings_rewritten: headings.rewritten,
      body_titles_removed: title.removed,
      front_matter_title_rewritten: frontMatter.rewritten,
      area_register_lines: areaLines.length,
      governance_register_lines: governanceLines.length,
      residual_unsupported_markers:
        (output.match(new RegExp(`\\[${source.marker_migration.unsupported_kind}:`, "g")) || []).length,
    });
  }

  const totalMigrated = results.reduce((sum, item) => sum + item.markers_migrated, 0);
  const residual = results.reduce((sum, item) => sum + item.residual_unsupported_markers, 0);
  if (residual !== 0) {
    failures.push(`${residual} unsupported markers remain after migration`);
  }
  const expectedTotal = source.marker_migration.expected_replacements * TARGETS.length;
  if (totalMigrated !== 0 && totalMigrated !== expectedTotal) {
    failures.push(`expected ${expectedTotal} migrations across both files, applied ${totalMigrated}`);
  }

  // Every canonical heading must survive verbatim in the file it belongs to, whether or
  // not this run was the one that wrote it.
  for (const target of TARGETS) {
    const body = fs.readFileSync(target.file, "utf8");
    const relative = path.relative(PACKAGE_ROOT, target.file).split(path.sep).join("/");
    const canonicalTitle = source.document_title.canonical[target.language];
    if (!body.includes(`${source.document_title.front_matter_key}: "${canonicalTitle}"`)) {
      failures.push(`${relative} does not carry the canonical front-matter title`);
    }
    for (const variant of source.document_title.superseded_variants?.[target.language] ?? []) {
      const occurrences = body.split(variant).length - 1;
      if (occurrences !== 0) failures.push(`${relative} still carries ${occurrences} superseded title variants`);
    }
    for (const heading of source.section_headings.headings) {
      if (!body.includes(`## ${heading[target.language]}`)) {
        failures.push(`${relative} is missing required section ## ${heading[target.language]}`);
      }
    }
    // Every registered component, route, and action must be readable in the body itself,
    // not only in a companion JSON a reviewer has to open separately.
    for (const area of source.areas) {
      for (const entry of [...area.components, ...area.routes]) {
        if (!body.includes(entry.id)) failures.push(`${relative} does not carry ${entry.id}`);
        // The reference sits in a table cell, so it is on the page in its escaped form;
        // the renderer unescapes it back to exactly the registry string.
        if (!body.includes(cell(entry.evidence_ref))) {
          failures.push(`${relative} does not carry the evidence reference for ${entry.id}`);
        }
      }
      if (!body.includes(area.phase1_envelope.id)) {
        failures.push(`${relative} does not carry envelope ${area.phase1_envelope.id}`);
      }
    }
    // Every plate id has to be readable in the body of both languages: the publication
    // parity test does not filter by language, and a plate named nowhere in the prose
    // arrives without the argument it belongs to.
    for (const contractArea of contract.AREAS) {
      for (const concept of contract.CONCEPTS) {
        const plate = contract.plateId(contractArea, concept);
        if (!body.includes(plate)) failures.push(`${relative} never mentions ${plate}`);
      }
    }
    // The Dazhongsi limit is quoted rather than paraphrased, so the exact registered
    // sentence must survive into the file, and only in that file's own language — a reader
    // of the English proposal is not asked to read a Chinese footnote.
    const other = target.language === "zh" ? "en" : "zh";
    const disclosures = { zh: contract.DZS_DISCLOSURE_ZH, en: contract.DZS_DISCLOSURE_EN };
    if (!body.includes(disclosures[target.language])) {
      failures.push(`${relative} does not carry the Issue #1029 disclosure in ${target.language}`);
    }
    if (body.includes(disclosures[other])) {
      failures.push(`${relative} carries the ${other} Issue #1029 disclosure`);
    }
    for (const action of governance.actions) {
      // The four printed clauses must be readable in the body. The other eight are checked
      // against the record inside governanceBlock, so narrowing the table did not turn any
      // of the twelve into something nothing verifies.
      for (const field of GOVERNANCE_ROW_FIELDS) {
        if (!body.includes(cell(action[`${field}_${target.language}`]))) {
          failures.push(`${relative} does not carry ${action.id} ${field}`);
        }
      }
      if (!body.includes(action.blocked_by.join(" "))) {
        failures.push(`${relative} does not carry the blocking gates of ${action.id}`);
      }
      // The register is now a summary of a larger record, so the body has to say where that
      // record is; otherwise the eight unprinted clauses are unreachable from the document.
      if (!body.includes("visual/assets/action-governance.json")) {
        failures.push(`${relative} does not name the record that holds the full governance contract`);
      }
    }
    // Text from the other language's column would mean the block was generated from the
    // wrong side of the record.
    for (const action of governance.actions) {
      if (body.includes(action[`operator_role_${other}`])) {
        failures.push(`${relative} carries the ${other} operator role for ${action.id}`);
      }
    }
  }

  const report = {
    status: failures.length === 0 ? "PASS" : "FAIL",
    exit_code: failures.length === 0 ? (checkOnly && changedFiles > 0 ? 1 : 0) : 1,
    mode: checkOnly ? "check" : "write",
    changed_files: changedFiles,
    total_markers_migrated: totalMigrated,
    total_headings_rewritten: results.reduce((sum, item) => sum + item.headings_rewritten.length, 0),
    actions_registered: governance.actions.length,
    areas_registered: source.areas.length,
    plates_cited: contract.AREAS.length * contract.CONCEPTS.length,
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
  migrateMarkers,
  applyTerminology,
  applyHeadings,
  upsertSubsection,
  areaRegisterBlock,
  governanceBlock,
  plateParagraph,
  plateLines,
  PLATE_CONCEPT_LABELS,
  SPATIAL_MODE_LABELS,
  GOVERNANCE_FIELDS,
  GOVERNANCE_ROW_FIELDS,
};
