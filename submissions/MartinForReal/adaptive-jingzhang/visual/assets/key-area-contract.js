"use strict";

// The one place the key-area plate contract is written down.
//
// Nine focused tests share it. Restating the fifteen semantic plates, the thirty file
// paths, or the five concepts in each of those files would let two of them disagree, and
// then a green run would mean nothing. Only this module is allowed to say what the
// architecture is; the tests say whether the package matches it.
//
// This module holds no test logic and reads no registry. It is the contract, not a check.

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const zlib = require("node:zlib");

const ASSETS = __dirname;
const PACKAGE_ROOT = path.resolve(ASSETS, "..", "..");

// Five concepts per area, in publication order. The number is part of the file name and
// the plate id, so it is the join between the registry, the raster on disk, the viewer
// anchor, and the PDF placement.
const CONCEPTS = [
  { concept_id: "01", slug: "situation-claim-limits" },
  { concept_id: "02", slug: "program-flows" },
  { concept_id: "03", slug: "reversible-module-sections" },
  { concept_id: "04", slug: "access-operations-seasons" },
  { concept_id: "05", slug: "governance-stop-evidence" },
];

// Concept 02 is the program-and-flow plan and must dominate its board; concept 03 is the
// keyed section set and comes second. The remaining three are support panels. These are
// the shares an A0 layout has to honour, not a preference.
const A0_RANK = {
  "02": { visual_rank: 1, min_area_fraction: 0.3 },
  "03": { visual_rank: 2, min_area_fraction: 0.2 },
};
const A0_SUPPORT_MAX_AREA_FRACTION = 0.15;

const AREAS = [
  {
    prefix: "ZZY",
    file_slug: "zhongzhiyuan",
    area_feature_id: "PROV-KEY-001",
    area_id: "zhongzhiyuan_ai_acceleration_area",
    plan_id: "ZZY-PLAN-01",
    section_ids: ["ZZY-SEC-A", "ZZY-SEC-B"],
    component_prefix: "Z-C",
    route_prefix: "Z-R",
    georeferenced: true,
    spatial_mode: "provisional_extent",
  },
  {
    prefix: "AIO",
    file_slug: "ai-origin-community",
    area_feature_id: "PROV-KEY-002",
    area_id: "beijing_ai_origin_community",
    plan_id: "AIO-PLAN-01",
    section_ids: ["AIO-SEC-A", "AIO-SEC-B"],
    component_prefix: "O-C",
    route_prefix: "O-R",
    georeferenced: true,
    spatial_mode: "provisional_extent",
  },
  {
    // Dazhongsi carries no position claim at all, so its "plan" is a topology diagram and
    // its spatial mode is a different kind from the other two. A test that treated the
    // three areas identically here would be asking Dazhongsi to draw something the package
    // has no evidence for.
    prefix: "DZS",
    file_slug: "dazhongsi",
    area_feature_id: "PROV-KEY-003",
    area_id: "dazhongsi_ai_industry_cluster",
    plan_id: "DZS-TOPO-01",
    section_ids: ["DZS-SEC-A", "DZS-SEC-B"],
    component_prefix: "D-C",
    route_prefix: "D-R",
    georeferenced: false,
    spatial_mode: "not_to_scale_topology",
  },
];

const LANGUAGES = ["zh", "en"];

function plateId(area, concept) {
  return `${area.prefix}-${concept.concept_id}`;
}

function artifactId(area, concept, language) {
  return `${plateId(area, concept)}-${language}`;
}

// The Chinese base raster and its English twin are separate files. `.en.png` rather than a
// parallel directory keeps the pair adjacent on disk, so a missing twin is visible to a
// reader listing the folder rather than only to this suite.
function plateFile(area, concept, language) {
  const stem = `assets/figures/key-area-${area.file_slug}-${concept.concept_id}-${concept.slug}`;
  return language === "en" ? `${stem}.en.png` : `${stem}.png`;
}

// Every artifact the package must publish, in a stable order: area, then concept, then
// Chinese before English.
function expectedArtifacts() {
  const artifacts = [];
  for (const area of AREAS) {
    for (const concept of CONCEPTS) {
      for (const language of LANGUAGES) {
        artifacts.push({
          artifact_id: artifactId(area, concept, language),
          plate_id: plateId(area, concept),
          language,
          translation_of: language === "en" ? artifactId(area, concept, "zh") : null,
          file: plateFile(area, concept, language),
          area,
          concept,
        });
      }
    }
  }
  return artifacts;
}

// The superseded architecture: one combined bilingual infographic per plate, ten per area.
// Named here so the inventory test can say "these exact files must be gone" instead of
// guessing from a glob what was supposed to be deleted.
function rejectedArtifacts() {
  const files = [];
  for (const prefix of ["ZY", "AO", "DZ"]) {
    for (let index = 1; index <= 10; index += 1) {
      files.push(`assets/figures/areas/${prefix}-P${String(index).padStart(2, "0")}.png`);
    }
  }
  return files;
}

// Required on every artifact record. A field that is present but empty fails the same way
// a missing one does, because a reader cannot act on either.
const ARTIFACT_FIELDS = [
  "artifact_id", "plate_id", "language", "translation_of", "file", "sha256", "bytes",
  "width_px", "height_px", "area_feature_id", "area_id", "concept_id", "concept_slug",
  "title", "alt_text", "extended_description", "georeferenced", "spatial_mode",
  "scale_mode", "north_arrow", "claim_status", "drawing_ids", "component_ids",
  "route_ids", "status", "evidence_refs", "placements", "semantic_fingerprint",
  "geometry_fingerprint",
];

// Fields that must be byte-identical across a zh/en pair. Everything a reader could use to
// audit the drawing has to say the same thing in both languages; only the language strings
// and the layout that carries them may differ.
const PAIR_INVARIANT_FIELDS = [
  "plate_id", "area_feature_id", "area_id", "concept_id", "concept_slug",
  "georeferenced", "spatial_mode", "scale_mode", "north_arrow", "claim_status",
  "drawing_ids", "component_ids", "route_ids", "status", "evidence_refs",
  "semantic_fingerprint", "geometry_fingerprint",
];

// No artifact may claim to be verified, surveyed, or professionally audited. Nothing in
// this package has been through any of those, and a status field is exactly where such a
// claim would slip in unnoticed.
const REQUIRED_STATUS = {
  verified: false,
  accessibility_gate: "G5:pending",
  survey: "pending",
  professional_audit: "pending",
  authorization_state: "not_authorized",
  funding_state: "unfunded",
};

// The seven roles a step-free chain has to connect, in order. A chain that skips the
// toilet direction or the staffed service is not a chain a disabled visitor can use.
const CHAIN_NODE_ROLES = [
  "arrival", "decision", "rest", "toilet_direction", "staffed_service",
  "principal_program", "exit",
];

const CHAIN_STATUS = {
  proposed: true,
  verified: false,
  accessibility_gate: "G5:pending",
  survey: "pending",
  professional_audit: "pending",
};

const CHAIN_EQUIVALENTS = ["tactile", "visual_contrast", "audio", "staffed", "paper", "telephone"];

const OPERATING_MODES = ["day", "night", "event", "snow", "maintenance", "power_failure", "digital_failure"];

const OPERATING_MODE_FIELDS = ["route_availability", "manual_fallback", "stop_action", "recovery_condition"];

// Seasonal and operational subjects plate 04 has to show spatially. Snow storage is listed
// separately because it carries a spatial exclusion, not just a description.
const SEASONAL_TOPICS = [
  "drainage_ice", "shelter", "sun_wind", "night_noise", "cleaning_waste",
  "service_access", "equipment_power_failure", "removal_restoration",
];

const PILOT_DAYS = 90;

// A dimension is either a module the proposal itself proposes, a value read off the
// geometry already in the package, or openly pending. There is no fourth kind: a number
// taken from a standard or inferred from a site photograph would be an invented dimension.
const DIMENSION_BASIS_TYPES = ["proposed_module", "geometry_derived", "pending"];

const DIMENSION_FIELDS = ["id", "label_zh", "label_en", "value", "unit", "basis_type", "source_ref", "status"];

// A dimension printed on a section is held to a stricter contract than the vocabulary
// above, because a section is read as construction: every number on it is a quantity in
// metres that someone could build to. Two kinds are admissible and there is no third.
//
//   proposed_module — a finite positive quantity this proposal itself proposes, stated in
//     metres, sourced to the drawing that proposes it, and carrying `not_verified` in its
//     status so the number can never be mistaken for a measurement.
//   pending — value null, still in metres, sourced to the assumption or the profession that
//     would resolve it, and carrying the trigger that would force this section to be redrawn.
//
// `geometry_derived` is rejected outright on a section, and not merely for the angular
// units that exposed the problem. The only geometry this package holds is a provisional
// rough extent that is explicitly not a survey; a span read off it and printed as a section
// dimension turns a disclaimed polygon into a construction quantity, whatever unit it wears.
// Converting those degrees to metres would have satisfied a unit check and kept the fault.
const SECTION_DIMENSION_BASIS_TYPES = ["proposed_module", "pending"];
const SECTION_DIMENSION_UNIT = "m";
const SECTION_DIMENSION_STATUS_PREFIX = { proposed_module: "proposed_", pending: "pending_" };
const SECTION_DIMENSION_UNVERIFIED_MARKER = "not_verified";
// A proposed module is sourced to the drawing that proposes it; a pending dimension is
// sourced to the registered assumption that stands in for the evidence nobody holds yet.
const SECTION_DIMENSION_PROPOSED_SOURCE_RE = /^drawing:[A-Z0-9-]+$/;
const SECTION_DIMENSION_PENDING_SOURCE_RE = /^data:assumptions\.json#A-[A-Z]+-\d{3}$/;
// Without a stated trigger a pending dimension is an indefinite blank rather than a
// commitment to recompute, so both languages of the trigger are required on every one.
const SECTION_DIMENSION_PENDING_FIELDS = ["recalculation_trigger_zh", "recalculation_trigger_en"];

// Dazhongsi's four performance positions. The sequence is the claim; the geography is not.
const DZS_POSITIONS = ["arrive", "transfer", "stay", "repair"];

const DZS_POSITION_ASSIGNMENT = "to_be_assigned_by_survey";

// Nothing in the package may show or imply any of these for Dazhongsi. The list is the
// audit finding written as a test input, so a future edit that reintroduces one is caught
// by name rather than by a reviewer noticing.
const DZS_FORBIDDEN_TERMS_EN = [
  "station entrance", "entrance to the station", "track", "railway line", "road centreline",
  "crossing", "parcel", "gate", "ground-floor", "ground floor", "load-bearing structure",
  "surveyed distance", "storey", "floor level",
];
const DZS_FORBIDDEN_TERMS_ZH = [
  "车站出入口", "站厅", "轨道线位", "道路中线", "过街", "地块红线", "闸机",
  "首层", "承重结构", "实测距离", "层高",
];

// The exact disclosure every Dazhongsi surface has to carry, in both languages. Held as an
// exact string because a paraphrase is how a discrepancy quietly becomes a footnote.
const DZS_DISCLOSURE_ZH =
  "Issue #1029 记录临时范围与车站参照之间存在约 2.26 公里的质疑偏差；本图不建立车站空间关系。";
const DZS_DISCLOSURE_EN =
  "Issue #1029 records a questioned discrepancy of approximately 2.26 km between the provisional extent and the station reference; this drawing establishes no station relationship.";

// Official station evidence, if it ever arrives, invalidates the diagram rather than
// confirming it. Recording that as a named consequence stops a later reader from treating
// the topology as a prediction that turned out right.
const DZS_EVIDENCE_CONSEQUENCE = "invalidate_and_redesign_lab_3";

// Protected properties of the Dazhongsi geometry feature. These come from the upstream
// baseline and describe how little the polygon claims; a design edit here would turn a
// provisional constraint into an assertion about official boundaries.
const DZS_GEOMETRY_CONTRACT = {
  official_boundary: false,
  geometry_role: "provisional_constraint",
  boundary_precision: "provisional_rough",
};

// Fields of the Dazhongsi geometry feature whose only job is to refuse a claim. The
// forbidden-term sweep hunts assertions, and "no entrance, road, crossing, parcel, distance,
// or positive station relationship is drawn or claimed" is the opposite of one — reading it
// as a violation would push the package towards deleting its own disclaimer. They are
// therefore exempt from the sweep, and the exemption is paid for: each field below is
// separately required to exist, so the sweep cannot be dodged by inventing a new field name.
const DZS_GEOMETRY_DISCLAIMER_FIELDS = [
  "usage_note", "warning_zh", "warning_en", "non_station_note_zh", "non_station_note_en",
];

// What the exempted disclaimer has to actually say. Without these the fields above could be
// emptied to whitespace and still pass.
const DZS_GEOMETRY_REQUIRED = {
  positional_claim: "void",
  non_station_source_id: "ISSUE-1029",
};

const ACTION_IDS = Array.from({ length: 12 }, (unused, index) => `P${String(index).padStart(2, "0")}`);

// Every action field the brief requires. `authorized_target` is checked separately because
// its contract is that it must be null, not that it must be filled in.
const ACTION_FIELDS = [
  "project_id", "name_zh", "name_en", "phase", "scope_zh", "scope_en", "area_ids",
  "phase_relation", "operator_role", "maintainer_role", "accessibility_steward_role",
  "data_steward_role", "stop_authority_role",
  "beneficiary_zh", "beneficiary_en", "worst_affected_zh", "worst_affected_en",
  "metric_zh", "metric_en", "proposed_target_zh", "proposed_target_en",
  "stop_trigger_zh", "stop_trigger_en", "rollback_zh", "rollback_en",
  "physical_restoration_zh", "physical_restoration_en", "restoration_capacity_state",
  "residual_liability_zh", "residual_liability_en",
  "non_digital_fallback_zh", "non_digital_fallback_en",
  "funding_state", "authorization_state", "blocked_by", "evidence_refs",
  "pilot_start_allowed",
];

// The five roles an action has to name. A pilot with no named stop authority is a pilot
// nobody can stop, which is the specific failure this list exists to make visible.
const ACTION_ROLE_FIELDS = [
  "operator_role", "maintainer_role", "accessibility_steward_role",
  "data_steward_role", "stop_authority_role",
];

// A role may honestly be unassigned. It may not be blank, and it may not be a placeholder
// that reads as if someone will fill it in later.
const HONEST_UNASSIGNED = "unassigned";
const ROLE_NOT_APPLICABLE = "not_applicable";
const FORBIDDEN_PLACEHOLDERS = ["TBD", "tbd", "TODO", "todo", "N/A", "n/a", "待定", "待补"];

// Whether an action may start, derived rather than asserted. The package cannot authorize
// itself, so every one of these conditions is currently unmet and the honest answer for
// all twelve actions is false; deriving it means a later edit that quietly flips one
// has to flip a real precondition first.
function computePilotStartAllowed(action) {
  const blockers = [];
  for (const field of ACTION_ROLE_FIELDS) {
    const role = action[field];
    if (!role || role === HONEST_UNASSIGNED) blockers.push(`${field}:${role || "missing"}`);
  }
  if (action.funding_state !== "funded") blockers.push(`funding_state:${action.funding_state ?? "missing"}`);
  if (action.authorization_state !== "authorized") {
    blockers.push(`authorization_state:${action.authorization_state ?? "missing"}`);
  }
  // No threshold in this package has been approved by anyone with the standing to approve
  // one, so a non-null authorized target would itself be the defect.
  if (action.authorized_target === null || action.authorized_target === undefined) {
    blockers.push("authorized_target:pending");
  }
  if (action.restoration_capacity_state !== "confirmed") {
    blockers.push(`restoration_capacity_state:${action.restoration_capacity_state ?? "missing"}`);
  }
  for (const gate of action.blocked_by ?? []) blockers.push(`gate:${gate}`);
  return { allowed: blockers.length === 0, blockers };
}

const GATE_PATTERN = /^D(0[1-9]|1[0-7])$/;

// Evidence locators. A reference that names only a document sends a reviewer hunting; these
// name the exact drawing, the exact viewer anchor, or the exact page and placement, so a
// claim can be checked in one step or shown not to resolve at all.
//
//   area:PROV-KEY-001            drawing:ZZY-PLAN-01        section:ZZY-SEC-A
//   component:Z-C01              route:Z-R01                plate:ZZY-02-zh
//   viewer:index.html#anchor     a3:page-07#A3-P07-S2       a0:board-2#A0-B2-P1
//   source:SITE-PACKAGE          standard:STD-01            metric:green_ratio
//   data:assumptions.json#A-01
const EVIDENCE_LOCATOR_KINDS = [
  "area", "drawing", "section", "component", "route", "plate", "viewer",
  "a3", "a0", "source", "standard", "metric", "data",
];
const EVIDENCE_LOCATOR_RE = new RegExp(`^(${EVIDENCE_LOCATOR_KINDS.join("|")}):(\\S+)$`);

function parseEvidenceLocator(locator) {
  if (typeof locator !== "string") return null;
  const match = EVIDENCE_LOCATOR_RE.exec(locator);
  return match ? { kind: match[1], target: match[2] } : null;
}

// Evidence categories Dazhongsi may never cite. The package has no building stock, no
// phasing programme, and no station position for Lab 3, so a reference of any of these
// kinds would be borrowed from somewhere it does not apply.
const DZS_EXCLUDED_EVIDENCE = ["buildings", "phasing", "station_position"];

function readText(relative) {
  return fs.readFileSync(path.join(PACKAGE_ROOT, relative), "utf8");
}

function readJson(relative) {
  return JSON.parse(readText(relative));
}

function exists(relative) {
  return fs.existsSync(path.join(PACKAGE_ROOT, relative));
}

function sha256File(relative) {
  return crypto.createHash("sha256").update(fs.readFileSync(path.join(PACKAGE_ROOT, relative))).digest("hex");
}

// PNG dimensions straight out of the IHDR chunk. Reading the header rather than trusting
// the registry is the point: a registry that recorded a size the file does not have would
// otherwise pass every check written against the registry.
function pngSize(relative) {
  const buffer = fs.readFileSync(path.join(PACKAGE_ROOT, relative));
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(signature)) return null;
  if (buffer.toString("latin1", 12, 16) !== "IHDR") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), bytes: buffer.length };
}

// The drawing builder embeds the concatenated PNG IDAT bytes directly as the compressed
// PDF image stream. Returning those bytes (rather than a hash copied from a registry) lets
// publication tests prove the image a page actually paints is byte-for-byte the source
// raster a placement declares.
function pngIdatPayload(relative) {
  const buffer = fs.readFileSync(path.join(PACKAGE_ROOT, relative));
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buffer.length < 8 || !buffer.subarray(0, 8).equals(signature)) {
    throw new Error(`${relative} is not a PNG`);
  }
  const chunks = [];
  let offset = 8;
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    const chunkEnd = dataEnd + 4;
    if (chunkEnd > buffer.length) throw new Error(`${relative} has a truncated ${type || "PNG"} chunk`);
    if (type === "IDAT") chunks.push(buffer.subarray(dataStart, dataEnd));
    offset = chunkEnd;
    if (type === "IEND") break;
  }
  if (chunks.length === 0) throw new Error(`${relative} has no IDAT payload`);
  return Buffer.concat(chunks);
}

// Minimal page-aware PDF reader for the deterministic drawing builder. A global stream
// search is not enough: an image or a text stream may exist in the file without being
// reachable from any /Page. Resolve the classic xref, walk the page tree, follow each
// page's /Contents and /Resources, and only then inspect shown text and `Do` operators.
function pdfClassicObjects(buffer, label) {
  const latin = buffer.toString("latin1");
  const startAt = latin.lastIndexOf("startxref");
  if (startAt < 0) throw new Error(`${label} has no startxref`);
  const start = /^startxref\s+(\d+)\s+%%EOF\s*$/.exec(latin.slice(startAt));
  if (!start) throw new Error(`${label} has a malformed startxref trailer`);
  const xrefOffset = Number(start[1]);
  if (!Number.isSafeInteger(xrefOffset) || latin.slice(xrefOffset, xrefOffset + 4) !== "xref") {
    throw new Error(`${label} startxref does not resolve to a classic xref table`);
  }

  const xref = latin.slice(xrefOffset);
  const header = /^xref\r?\n0\s+(\d+)\r?\n/.exec(xref);
  if (!header) throw new Error(`${label} does not use the deterministic xref 0..N layout`);
  const size = Number(header[1]);
  const entries = [];
  let cursor = header[0].length;
  for (let id = 0; id < size; id += 1) {
    const lineEnd = xref.indexOf("\n", cursor);
    if (lineEnd < 0) throw new Error(`${label} xref ends before object ${id}`);
    const line = xref.slice(cursor, lineEnd).replace(/\r$/, "");
    const entry = /^(\d{10})\s+(\d{5})\s+([nf])\s*$/.exec(line);
    if (!entry) throw new Error(`${label} has a malformed xref entry for object ${id}`);
    if (entry[3] === "n") entries.push({ id, offset: Number(entry[1]) });
    cursor = lineEnd + 1;
  }

  const active = entries.filter((entry) => entry.id > 0).sort((left, right) => left.offset - right.offset);
  const objects = new Map();
  for (let index = 0; index < active.length; index += 1) {
    const entry = active[index];
    const end = active[index + 1]?.offset ?? xrefOffset;
    const region = latin.slice(entry.offset, end);
    const objectHeader = `${entry.id} 0 obj`;
    if (!region.startsWith(objectHeader)) {
      throw new Error(`${label} xref offset for object ${entry.id} does not resolve`);
    }
    const headerEnd = region.indexOf("\n");
    const objectEnd = region.lastIndexOf("\nendobj");
    if (headerEnd < 0 || objectEnd < headerEnd) throw new Error(`${label} object ${entry.id} is not closed`);
    const bodyStart = headerEnd + 1;
    const body = region.slice(bodyStart, objectEnd);
    let marker = "stream\n";
    let streamAt = body.indexOf(marker);
    if (streamAt < 0) {
      marker = "stream\r\n";
      streamAt = body.indexOf(marker);
    }
    if (streamAt < 0) {
      objects.set(entry.id, { id: entry.id, dictionary: body.trim(), stream: null });
      continue;
    }
    const dictionary = body.slice(0, streamAt).trim();
    const length = /\/Length\s+(\d+)\b/.exec(dictionary);
    if (!length) throw new Error(`${label} stream object ${entry.id} has no direct /Length`);
    const payloadStart = entry.offset + bodyStart + streamAt + marker.length;
    const payloadEnd = payloadStart + Number(length[1]);
    if (payloadEnd > end) throw new Error(`${label} stream object ${entry.id} exceeds its xref extent`);
    const closing = buffer.toString("latin1", payloadEnd, Math.min(payloadEnd + 12, buffer.length));
    if (!/^\r?\nendstream/.test(closing)) {
      throw new Error(`${label} stream object ${entry.id} does not end at its declared /Length`);
    }
    objects.set(entry.id, {
      id: entry.id,
      dictionary,
      stream: buffer.subarray(payloadStart, payloadEnd),
    });
  }

  const trailer = /trailer\s*<<[\s\S]*?\/Root\s+(\d+)\s+0\s+R[\s\S]*?>>/.exec(xref.slice(cursor));
  if (!trailer) throw new Error(`${label} trailer declares no /Root`);
  return { objects, rootId: Number(trailer[1]), xrefOffset, latin };
}

function pdfObjectType(dictionary) {
  return (/\/Type\s*\/([A-Za-z0-9]+)/.exec(dictionary) ?? [])[1] ?? null;
}

function pdfRef(dictionary, key) {
  const match = new RegExp(`/${key}\\s+(\\d+)\\s+0\\s+R\\b`).exec(dictionary);
  return match ? Number(match[1]) : null;
}

function pdfRefs(dictionary, key) {
  const array = new RegExp(`/${key}\\s*\\[([^\\]]*)\\]`).exec(dictionary);
  if (array) return [...array[1].matchAll(/(\d+)\s+0\s+R/g)].map((match) => Number(match[1]));
  const single = pdfRef(dictionary, key);
  return single === null ? [] : [single];
}

function pdfNestedDictionary(dictionary, key) {
  const marker = new RegExp(`/${key}\\b`).exec(dictionary);
  if (!marker) return null;
  const start = dictionary.indexOf("<<", marker.index + marker[0].length);
  if (start < 0) return null;
  let depth = 0;
  for (let index = start; index + 1 < dictionary.length; index += 1) {
    const pair = dictionary.slice(index, index + 2);
    if (pair === "<<") {
      depth += 1;
      index += 1;
    } else if (pair === ">>") {
      depth -= 1;
      if (depth === 0) return dictionary.slice(start + 2, index);
      index += 1;
    }
  }
  return null;
}

function pdfResourceEntries(dictionary, key) {
  const nested = pdfNestedDictionary(dictionary, key);
  const entries = new Map();
  if (nested === null) return entries;
  for (const match of nested.matchAll(/\/([A-Za-z0-9_.-]+)\s+(\d+)\s+0\s+R/g)) {
    entries.set(match[1], Number(match[2]));
  }
  return entries;
}

function pdfInflate(object, label) {
  if (!object || object.stream === null) throw new Error(`${label} does not resolve to a stream object`);
  if (/\/Filter\s*\/FlateDecode\b/.test(object.dictionary)) return zlib.inflateSync(object.stream);
  if (/\/Filter\b/.test(object.dictionary)) throw new Error(`${label} uses an unsupported stream filter`);
  return object.stream;
}

// Both embedded fonts subset the same source face. They may share glyph ids, but a shared
// id must map to the same Unicode sequence. Destination strings are UTF-16BE and may be a
// surrogate pair, so retain their complete hex sequence instead of coercing it to a number.
function pdfToUnicode(inflated, cmap, conflicts) {
  const text = inflated.toString("latin1");
  const assign = (code, hex) => {
    const normalized = hex.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(cmap, code) && cmap[code] !== normalized) {
      conflicts.push(`glyph ${code} maps to both U+${cmap[code]} and U+${normalized}`);
      return;
    }
    cmap[code] = normalized;
  };
  for (const block of text.matchAll(/beginbfchar([\s\S]*?)endbfchar/g)) {
    for (const pair of block[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
      assign(parseInt(pair[1], 16), pair[2]);
    }
  }
  for (const block of text.matchAll(/beginbfrange([\s\S]*?)endbfrange/g)) {
    for (const row of block[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
      const low = parseInt(row[1], 16);
      const high = parseInt(row[2], 16);
      const base = parseInt(row[3], 16);
      for (let code = low; code <= high; code += 1) {
        assign(code, (base + code - low).toString(16).padStart(row[3].length, "0"));
      }
    }
  }
}

function pdfUtf16Be(hex) {
  const digits = hex.replace(/\s+/g, "");
  if (digits.length === 0 || digits.length % 4 !== 0) return null;
  const bytes = Buffer.from(digits, "hex");
  const littleEndian = Buffer.alloc(bytes.length);
  for (let index = 0; index < bytes.length; index += 2) {
    littleEndian[index] = bytes[index + 1];
    littleEndian[index + 1] = bytes[index];
  }
  return littleEndian.toString("utf16le");
}

function pdfDecodeShownText(hex, cmap, unmapped, fontName) {
  const digits = hex.replace(/\s+/g, "");
  let out = "";
  if (digits.length % 4 !== 0) unmapped.add(`${fontName ?? "no-font"}:malformed-${digits.length}`);
  for (let index = 0; index + 3 < digits.length; index += 4) {
    const code = parseInt(digits.slice(index, index + 4), 16);
    const mapped = cmap?.[code];
    const decoded = mapped === undefined ? null : pdfUtf16Be(mapped);
    if (decoded === null) {
      unmapped.add(`${fontName ?? "no-font"}:${code}`);
      continue;
    }
    out += decoded;
  }
  return out;
}

function pdfDocumentBuffer(buffer, label = "<pdf-buffer>") {
  const parsed = pdfClassicObjects(buffer, label);
  const { objects, latin } = parsed;
  const countOf = (pattern) => (latin.match(pattern) || []).length;
  const object = (id, purpose) => {
    const found = objects.get(id);
    if (!found) throw new Error(`${label} ${purpose} references missing object ${id}`);
    return found;
  };

  const catalog = object(parsed.rootId, "trailer /Root");
  if (pdfObjectType(catalog.dictionary) !== "Catalog") throw new Error(`${label} /Root is not a /Catalog`);
  const pagesRoot = pdfRef(catalog.dictionary, "Pages");
  if (pagesRoot === null) throw new Error(`${label} catalog declares no /Pages root`);

  const leaves = [];
  const visited = new Set();
  const walkPages = (id, inheritedResources = null, inheritedMediaBox = null) => {
    if (visited.has(id)) throw new Error(`${label} page tree visits object ${id} twice`);
    visited.add(id);
    const node = object(id, "page tree");
    const type = pdfObjectType(node.dictionary);
    const resourcesId = pdfRef(node.dictionary, "Resources") ?? inheritedResources;
    const mediaBox = (/\/MediaBox\s*\[[^\]]*\]/.exec(node.dictionary) ?? [])[0] ?? inheritedMediaBox;
    if (type === "Pages") {
      const kids = pdfRefs(node.dictionary, "Kids");
      if (kids.length === 0) throw new Error(`${label} /Pages object ${id} has no /Kids`);
      for (const kid of kids) walkPages(kid, resourcesId, mediaBox);
      return;
    }
    if (type !== "Page") throw new Error(`${label} page-tree kid ${id} is /${type ?? "untyped"}`);
    const contentsIds = pdfRefs(node.dictionary, "Contents");
    if (contentsIds.length === 0) throw new Error(`${label} /Page object ${id} has no /Contents`);
    if (resourcesId === null) throw new Error(`${label} /Page object ${id} has no /Resources`);
    leaves.push({ object_id: id, contents_ids: contentsIds, resources_id: resourcesId, media_box: mediaBox });
  };
  walkPages(pagesRoot);

  const cmapConflicts = [];
  const cmapCache = new Map();
  const mergedCmap = {};
  const cmapForFont = (fontId) => {
    if (cmapCache.has(fontId)) return cmapCache.get(fontId);
    const font = object(fontId, "font resource");
    const toUnicodeId = pdfRef(font.dictionary, "ToUnicode");
    if (toUnicodeId === null) {
      cmapCache.set(fontId, {});
      return {};
    }
    const cmap = {};
    pdfToUnicode(pdfInflate(object(toUnicodeId, "font /ToUnicode"), `${label} /ToUnicode ${toUnicodeId}`), cmap, cmapConflicts);
    for (const [code, value] of Object.entries(cmap)) {
      if (Object.prototype.hasOwnProperty.call(mergedCmap, code) && mergedCmap[code] !== value) {
        cmapConflicts.push(`glyph ${code} maps to both U+${mergedCmap[code]} and U+${value}`);
      } else {
        mergedCmap[code] = value;
      }
    }
    cmapCache.set(fontId, cmap);
    return cmap;
  };

  const documentUnmapped = new Set();
  const pageDetails = [];
  for (let index = 0; index < leaves.length; index += 1) {
    const leaf = leaves[index];
    const resources = object(leaf.resources_id, `/Page ${leaf.object_id} /Resources`);
    const fonts = pdfResourceEntries(resources.dictionary, "Font");
    const xobjects = pdfResourceEntries(resources.dictionary, "XObject");
    const pageRuns = [];
    const pageUnmapped = new Set();
    const unresolved = new Set();
    const draws = [];
    let activeFont = null;
    for (const contentId of leaf.contents_ids) {
      const content = pdfInflate(object(contentId, `/Page ${leaf.object_id} /Contents`), `${label} content ${contentId}`).toString("latin1");
      const operations = /\/([A-Za-z0-9_.-]+)\s+[-+]?(?:\d+(?:\.\d*)?|\.\d+)\s+Tf\b|<([0-9A-Fa-f\s]*)>\s*Tj\b|\[([\s\S]*?)\]\s*TJ\b|\/([A-Za-z0-9_.-]+)\s+Do\b/g;
      for (const operation of content.matchAll(operations)) {
        if (operation[1] !== undefined) {
          activeFont = operation[1];
          continue;
        }
        if (operation[2] !== undefined || operation[3] !== undefined) {
          const fontId = activeFont === null ? null : fonts.get(activeFont);
          const cmap = fontId === undefined || fontId === null ? {} : cmapForFont(fontId);
          let shown = "";
          if (operation[2] !== undefined) {
            shown = pdfDecodeShownText(operation[2], cmap, pageUnmapped, activeFont);
          } else {
            for (const piece of operation[3].matchAll(/<([0-9A-Fa-f\s]*)>/g)) {
              shown += pdfDecodeShownText(piece[1], cmap, pageUnmapped, activeFont);
            }
          }
          pageRuns.push(shown);
          continue;
        }
        const name = operation[4];
        const imageId = xobjects.get(name);
        if (imageId === undefined) {
          unresolved.add(name);
          continue;
        }
        const image = object(imageId, `/Page ${leaf.object_id} XObject /${name}`);
        const width = Number((/\/Width\s+(\d+(?:\.\d+)?)\b/.exec(image.dictionary) ?? [])[1]);
        const height = Number((/\/Height\s+(\d+(?:\.\d+)?)\b/.exec(image.dictionary) ?? [])[1]);
        draws.push({
          name,
          object_id: imageId,
          subtype: (/\/Subtype\s*\/([A-Za-z0-9]+)/.exec(image.dictionary) ?? [])[1] ?? null,
          width,
          height,
          image_stream: image.stream,
        });
      }
    }
    for (const glyph of pageUnmapped) documentUnmapped.add(glyph);
    pageDetails.push({
      number: index + 1,
      ...leaf,
      runs: pageRuns.length,
      text: pageRuns.join("\n"),
      xobject_draws: draws,
      unresolved_xobjects: Array.from(unresolved).sort(),
      unmapped_glyphs: Array.from(pageUnmapped).sort(),
    });
  }

  return {
    path: label,
    bytes: buffer.length,
    pages: pageDetails.length,
    page_details: pageDetails,
    page_tree_object: pagesRoot,
    media_boxes: Array.from(new Set(pageDetails.map((page) => page.media_box).filter(Boolean))),
    font_file2: countOf(/\/FontFile2/g),
    to_unicode: countOf(/\/ToUnicode/g),
    cmap_entries: Object.keys(mergedCmap).length,
    cmap_conflicts: cmapConflicts,
    unmapped_glyphs: Array.from(documentUnmapped).sort(),
    runs: pageDetails.reduce((sum, page) => sum + page.runs, 0),
    text: pageDetails.map((page) => page.text).join("\n"),
  };
}

function pdfDocument(relative) {
  return pdfDocumentBuffer(fs.readFileSync(path.join(PACKAGE_ROOT, relative)), relative);
}

// Shared runner. Each test file exports `run()` and is also executable on its own, so a
// failure can be reproduced with one command instead of by rerunning the whole suite.
function harness(id, description, body) {
  const failures = [];
  let detail = null;
  try {
    detail = body((message) => failures.push(message)) ?? null;
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  }
  return { id, description, status: failures.length === 0 ? "PASS" : "FAIL", failures, detail };
}

function cli(result) {
  process.stdout.write(`${JSON.stringify({ ...result, exit_code: result.status === "PASS" ? 0 : 1 }, null, 2)}\n`);
  process.exitCode = result.status === "PASS" ? 0 : 1;
}

module.exports = {
  PACKAGE_ROOT,
  ASSETS,
  CONCEPTS,
  AREAS,
  LANGUAGES,
  A0_RANK,
  A0_SUPPORT_MAX_AREA_FRACTION,
  ARTIFACT_FIELDS,
  PAIR_INVARIANT_FIELDS,
  REQUIRED_STATUS,
  CHAIN_NODE_ROLES,
  CHAIN_STATUS,
  CHAIN_EQUIVALENTS,
  OPERATING_MODES,
  OPERATING_MODE_FIELDS,
  SEASONAL_TOPICS,
  PILOT_DAYS,
  DIMENSION_BASIS_TYPES,
  DIMENSION_FIELDS,
  SECTION_DIMENSION_BASIS_TYPES,
  SECTION_DIMENSION_UNIT,
  SECTION_DIMENSION_STATUS_PREFIX,
  SECTION_DIMENSION_UNVERIFIED_MARKER,
  SECTION_DIMENSION_PROPOSED_SOURCE_RE,
  SECTION_DIMENSION_PENDING_SOURCE_RE,
  SECTION_DIMENSION_PENDING_FIELDS,
  DZS_POSITIONS,
  DZS_POSITION_ASSIGNMENT,
  DZS_FORBIDDEN_TERMS_EN,
  DZS_FORBIDDEN_TERMS_ZH,
  DZS_DISCLOSURE_ZH,
  DZS_DISCLOSURE_EN,
  DZS_EVIDENCE_CONSEQUENCE,
  DZS_GEOMETRY_CONTRACT,
  DZS_GEOMETRY_DISCLAIMER_FIELDS,
  DZS_GEOMETRY_REQUIRED,
  ACTION_IDS,
  ACTION_FIELDS,
  ACTION_ROLE_FIELDS,
  HONEST_UNASSIGNED,
  ROLE_NOT_APPLICABLE,
  FORBIDDEN_PLACEHOLDERS,
  GATE_PATTERN,
  EVIDENCE_LOCATOR_KINDS,
  EVIDENCE_LOCATOR_RE,
  DZS_EXCLUDED_EVIDENCE,
  parseEvidenceLocator,
  computePilotStartAllowed,
  plateId,
  artifactId,
  plateFile,
  expectedArtifacts,
  rejectedArtifacts,
  readText,
  readJson,
  exists,
  sha256File,
  pngSize,
  pngIdatPayload,
  pdfDocumentBuffer,
  pdfDocument,
  harness,
  cli,
};
