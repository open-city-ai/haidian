#!/usr/bin/env node
"use strict";

// Rewrites the reference arrays of the two evidence matrices from `evidence-map.json`.
//
// Both matrices were hand-maintained and had collapsed into a blanket citation: every one
// of the 23 requirements listed all nine geometry layers and the same ten sources, and all
// 15 depth items carried an identical source, assumption, and self-check set. A reader
// could not use that to check a single requirement, because it said the same thing about
// every requirement. The map narrows each row to the references that actually support it,
// and this builder is what stops the narrow version from drifting back.
//
// Identity is never generated. `requirement_id`, `title_zh`, `professional_dimension`,
// `required`, `status`, and `completeness_limited_by` are carried through from the existing
// matrices untouched — those titles are authored, they have no upstream source, and
// retyping them here would silently invent an official wording.
//
// Four things are enforced, and a failure in any of them is a build failure rather than a
// warning, because a matrix that quietly kept a blanket row is worse than no matrix:
//   * Complete. Every id in the matrix must appear in the map and vice versa, so a row
//     cannot keep its old blanket references by being left out of the map.
//   * Resolvable. Every reference is looked up in the artifact it names — the heading must
//     exist in the proposal, the layer and drawing files must exist, the metric, source,
//     assumption, self-check, plate, component, route, envelope, and action ids must exist
//     in their registries, and each viewer anchor must exist in both viewers.
//   * Non-empty. Every array the validator requires is present and non-empty.
//   * Distinct. No two rows may share an identical reference profile, and no single id may
//     appear on every row. Both are the shape a blanket citation takes.
//
// Usage: node build-matrices.js [--check]

const fs = require("node:fs");
const path = require("node:path");

const ASSETS = __dirname;
const PACKAGE_ROOT = path.resolve(ASSETS, "..", "..");

const MAP = path.join(ASSETS, "evidence-map.json");
const COMPLIANCE = path.join(PACKAGE_ROOT, "compliance_matrix.json");
const DEPTH = path.join(PACKAGE_ROOT, "design_depth_matrix.json");

// Carried through from the existing rows, never written from the map.
const COMPLIANCE_IDENTITY = ["requirement_id", "title_zh", "mandatory"];
const DEPTH_IDENTITY = ["item_id", "title_zh", "professional_dimension", "required", "status"];

// The arrays the validator requires, in the order they are emitted.
const COMPLIANCE_ARRAYS = [
  "report_sections",
  "geojson_layers",
  "metrics",
  "drawings",
  "visual_sections",
  "source_ids",
  "assumption_ids",
  "self_check_ids",
];
const DEPTH_ARRAYS = [
  "proposal_sections",
  "drawing_refs",
  "geometry_refs",
  "metric_refs",
  "source_ids",
  "assumption_ids",
  "self_check_ids",
];

// Extra reference kinds. The validator does not require them and does not reject them; they
// are what makes a row checkable at the level of a single plate or a single route.
const EXTRA_ARRAYS = ["plate_refs", "component_refs", "route_refs", "envelope_refs", "action_refs"];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function readText(file) {
  return fs.readFileSync(file, "utf8");
}

// Both matrices round-trip byte-exactly through this, so a run that changes no references
// changes no bytes and `--check` is a real idempotence check rather than a reformat.
function serialize(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

// Builds the lookup tables every reference is checked against. Each one reads the artifact
// the reference claims to point at, so a citation cannot resolve against a list of names
// that was itself copied from the matrix.
function buildResolvers(failures) {
  const has = (file) => fs.existsSync(path.join(PACKAGE_ROOT, ...file.split("/")));

  const proposalFile = path.join(PACKAGE_ROOT, "proposal.md");
  const headings = new Set();
  if (fs.existsSync(proposalFile)) {
    for (const line of readText(proposalFile).split("\n")) {
      const match = /^#{1,6}\s+(.*?)\s*$/.exec(line);
      if (match) headings.add(match[1]);
    }
  } else {
    failures.push("proposal.md is missing; no section reference can be resolved");
  }

  const metricsFile = path.join(PACKAGE_ROOT, "metrics.json");
  const metrics = fs.existsSync(metricsFile) ? new Set(Object.keys(readJson(metricsFile).metrics ?? {})) : new Set();

  const sourcesFile = path.join(PACKAGE_ROOT, "sources.json");
  const sources = fs.existsSync(sourcesFile)
    ? new Set((readJson(sourcesFile).sources ?? []).map((record) => record.id))
    : new Set();

  const assumptionsFile = path.join(PACKAGE_ROOT, "assumptions.json");
  const assumptions = fs.existsSync(assumptionsFile)
    ? new Set((readJson(assumptionsFile).assumptions ?? []).map((record) => record.id))
    : new Set();

  const selfCheckFile = path.join(PACKAGE_ROOT, "self_check.json");
  const selfChecks = fs.existsSync(selfCheckFile)
    ? new Set((readJson(selfCheckFile).checks ?? []).map((record) => record.check_id))
    : new Set();

  // Rows cite the semantic plate, not one of its two language rasters. A row that
  // named `ZZY-02-zh` would be citing a file rather than a drawing, and would
  // silently stop applying to the English reader.
  const platesFile = path.join(ASSETS, "area-plates.json");
  const plates = fs.existsSync(platesFile)
    ? new Set((readJson(platesFile).semantic_plates ?? []).map((plate) => plate.plate_id))
    : new Set();

  const components = new Set();
  const routes = new Set();
  const envelopes = new Set();
  const sourceRecordFile = path.join(ASSETS, "regeneration-source.json");
  if (fs.existsSync(sourceRecordFile)) {
    for (const area of readJson(sourceRecordFile).areas ?? []) {
      for (const component of area.components ?? []) components.add(component.id);
      for (const route of area.routes ?? []) routes.add(route.id);
      if (area.phase1_envelope?.id) envelopes.add(area.phase1_envelope.id);
    }
  }

  const actionsFile = path.join(ASSETS, "action-governance.json");
  const actions = fs.existsSync(actionsFile)
    ? new Set((readJson(actionsFile).actions ?? []).map((action) => action.id))
    : new Set();

  // A viewer anchor has to exist in both viewers. One that exists only in the Chinese page
  // would send an English reader to a section that is not there.
  const viewers = [
    { file: path.join(PACKAGE_ROOT, "visual", "index.html"), label: "visual/index.html" },
    { file: path.join(PACKAGE_ROOT, "visual", "index.en.html"), label: "visual/index.en.html" },
  ].map((viewer) => ({ ...viewer, html: fs.existsSync(viewer.file) ? readText(viewer.file) : null }));

  return {
    report_sections: {
      kind: "proposal.md heading",
      test: (value) => headings.has(value),
    },
    proposal_sections: {
      kind: "proposal.md heading",
      test: (value) => headings.has(value),
    },
    geojson_layers: { kind: "geometry file", test: has },
    geometry_refs: { kind: "geometry file", test: has },
    drawings: { kind: "drawing file", test: has },
    drawing_refs: { kind: "drawing file", test: has },
    metrics: { kind: "metrics.json field", test: (value) => metrics.has(value) },
    metric_refs: { kind: "metrics.json field", test: (value) => metrics.has(value) },
    source_ids: { kind: "sources.json id", test: (value) => sources.has(value) },
    assumption_ids: { kind: "assumptions.json id", test: (value) => assumptions.has(value) },
    self_check_ids: { kind: "self_check.json check_id", test: (value) => selfChecks.has(value) },
    plate_refs: { kind: "area-plates.json plate id", test: (value) => plates.has(value) },
    component_refs: { kind: "regeneration-source.json component id", test: (value) => components.has(value) },
    route_refs: { kind: "regeneration-source.json route id", test: (value) => routes.has(value) },
    envelope_refs: { kind: "regeneration-source.json envelope id", test: (value) => envelopes.has(value) },
    action_refs: { kind: "action-governance.json action id", test: (value) => actions.has(value) },
    visual_sections: {
      kind: "viewer anchor present in both viewers",
      test: (value) => {
        const anchor = value.split("#")[1];
        if (!anchor) return false;
        return viewers.every((viewer) => viewer.html !== null && viewer.html.includes(`id="${anchor}"`));
      },
    },
  };
}

// Reads one array off a map entry and checks every value against its resolver. An entry
// that is present but empty is a failure: an empty array would fail the submission
// validator later, and there is no reference set worth publishing that has nothing in it.
function collect(entry, key, resolvers, label, required, failures, counters) {
  const value = entry[key];
  if (value === undefined) {
    if (required) failures.push(`${label}: the evidence map has no ${key}`);
    return null;
  }
  if (!Array.isArray(value) || value.length === 0 || !value.every((item) => typeof item === "string" && item)) {
    failures.push(`${label}: ${key} must be a non-empty array of non-empty strings`);
    return null;
  }
  const seen = new Set();
  for (const item of value) {
    if (seen.has(item)) failures.push(`${label}: ${key} lists ${item} twice`);
    seen.add(item);
    const resolver = resolvers[key];
    if (!resolver) continue;
    counters.checked += 1;
    if (resolver.test(item)) counters.resolved += 1;
    else failures.push(`${label}: ${key} cites ${item}, which is not a ${resolver.kind}`);
  }
  return value;
}

function joinIds(values) {
  return values.join("、");
}

// The prose summary states the same references the arrays carry, so a reader who only reads
// the sentence still gets named evidence. Long lists are cut off with a pointer to the count
// rather than being silently truncated.
function summarize(note, refs, language) {
  const zh = language === "zh";
  const parts = [];
  const add = (labelZh, labelEn, values, cap) => {
    if (!values || values.length === 0) return;
    const shown = cap && values.length > cap ? values.slice(0, cap) : values;
    const tail = shown.length < values.length
      ? (zh ? `等 ${values.length} 项` : ` and ${values.length - shown.length} more of ${values.length}`)
      : "";
    parts.push(`${zh ? labelZh : labelEn}${zh ? joinIds(shown) : shown.join(", ")}${tail}`);
  };
  add("章节 ", "sections ", refs.sections);
  add("图纸 ", "drawings ", refs.drawings);
  add("图层 ", "layers ", refs.layers);
  add("指标 ", "metrics ", refs.metrics);
  add("来源 ", "sources ", refs.sources);
  add("假设 ", "assumptions ", refs.assumptions);
  add("自检 ", "self-checks ", refs.selfChecks);
  add("图版 ", "plates ", refs.plates, 6);
  add("构件 ", "components ", refs.components, 6);
  add("路径 ", "routes ", refs.routes, 6);
  add("范围 ", "envelopes ", refs.envelopes, 6);
  add("行动 ", "actions ", refs.actions, 6);
  const body = zh ? `${parts.join("；")}。` : `${parts.join("; ")}.`;
  return zh ? `${note} 确切依据：${body}` : `${note} Exact references: ${body}`;
}

// The two shapes a blanket citation takes. Rows that all say the same thing, and an id that
// is on every row — both mean the matrix stopped distinguishing between requirements.
function checkDistinct(rows, arrays, label, failures) {
  const profiles = new Map();
  for (const row of rows) {
    const profile = JSON.stringify(arrays.map((key) => row[key] ?? []));
    if (profiles.has(profile)) {
      failures.push(`${label}: ${row.id} and ${profiles.get(profile)} carry an identical reference profile`);
    }
    profiles.set(profile, row.id);
  }
  for (const key of arrays) {
    // Only a reference kind that every row carries can be blanket. An optional kind that
    // some rows use is a different situation: one row is allowed to be the union — the
    // detailed-design item legitimately cites all 15 plates — and flagging that as blanket
    // would push the map towards citing less than the row actually rests on.
    const present = rows.filter((row) => Array.isArray(row[key]) && row[key].length > 0);
    if (present.length !== rows.length || rows.length < 2) continue;
    const universal = rows[0][key].filter((value) => rows.every((row) => row[key].includes(value)));
    for (const value of universal) {
      failures.push(`${label}: every row cites ${value} in ${key}; a reference on every row distinguishes nothing`);
    }
  }
}

function main(argv) {
  const checkOnly = argv.includes("--check");
  const failures = [];
  const counters = { checked: 0, resolved: 0 };
  const map = readJson(MAP);
  const resolvers = buildResolvers(failures);

  const complianceDoc = readJson(COMPLIANCE);
  const depthDoc = readJson(DEPTH);

  const mapCompliance = new Map(map.compliance.map((entry) => [entry.requirement_id, entry]));
  const mapDepth = new Map(map.design_depth.map((entry) => [entry.item_id, entry]));

  // Set equality both ways. A requirement missing from the map would otherwise keep its
  // blanket references, and a map entry for a requirement that no longer exists would be a
  // reference nobody reads.
  for (const requirement of complianceDoc.requirements) {
    if (!mapCompliance.has(requirement.requirement_id)) {
      failures.push(`compliance: requirement ${requirement.requirement_id} has no entry in the evidence map`);
    }
  }
  for (const id of mapCompliance.keys()) {
    if (!complianceDoc.requirements.some((item) => item.requirement_id === id)) {
      failures.push(`compliance: the evidence map has an entry for ${id}, which is not in the matrix`);
    }
  }
  for (const item of depthDoc.items) {
    if (!mapDepth.has(item.item_id)) {
      failures.push(`design depth: item ${item.item_id} has no entry in the evidence map`);
    }
  }
  for (const id of mapDepth.keys()) {
    if (!depthDoc.items.some((item) => item.item_id === id)) {
      failures.push(`design depth: the evidence map has an entry for ${id}, which is not in the matrix`);
    }
  }

  const complianceRows = complianceDoc.requirements.map((requirement) => {
    const id = requirement.requirement_id;
    const entry = mapCompliance.get(id);
    const label = `compliance ${id}`;
    const row = {};
    for (const key of COMPLIANCE_IDENTITY) row[key] = requirement[key];
    if (requirement.mandatory !== true) failures.push(`${label}: mandatory is not true in the existing matrix`);
    if (!entry) return { ...row, id };
    for (const key of COMPLIANCE_ARRAYS) {
      const value = collect(entry, key, resolvers, label, true, failures, counters);
      row[key] = value ?? requirement[key];
    }
    for (const key of EXTRA_ARRAYS) {
      const value = collect(entry, key, resolvers, label, false, failures, counters);
      if (value) row[key] = value;
    }
    for (const language of ["zh", "en"]) {
      const note = entry[`note_${language}`];
      if (typeof note !== "string" || !note.trim()) {
        failures.push(`${label}: the evidence map has no note_${language}`);
      }
      row[`evidence_note_${language}`] = summarize(note ?? "", {
        sections: row.report_sections,
        drawings: row.drawings,
        layers: row.geojson_layers,
        metrics: row.metrics,
        sources: row.source_ids,
        assumptions: row.assumption_ids,
        selfChecks: row.self_check_ids,
        plates: row.plate_refs,
        components: row.component_refs,
        routes: row.route_refs,
        envelopes: row.envelope_refs,
        actions: row.action_refs,
      }, language);
    }
    return { ...row, id };
  });

  const depthRows = depthDoc.items.map((item) => {
    const id = item.item_id;
    const entry = mapDepth.get(id);
    const label = `design depth ${id}`;
    const row = {};
    for (const key of DEPTH_IDENTITY) row[key] = item[key];
    if (item.required !== true) failures.push(`${label}: required is not true in the existing matrix`);
    if (item.status !== "complete") failures.push(`${label}: status is not complete in the existing matrix`);
    if (!entry) return { ...row, id };
    for (const key of DEPTH_ARRAYS) {
      const value = collect(entry, key, resolvers, label, true, failures, counters);
      row[key] = value ?? item[key];
    }
    for (const key of EXTRA_ARRAYS) {
      const value = collect(entry, key, resolvers, label, false, failures, counters);
      if (value) row[key] = value;
    }
    // Carried through verbatim: this names the professional evidence the package does not
    // hold, and regenerating that wording from a map would be inventing the gap.
    if (item.completeness_limited_by !== undefined) {
      row.completeness_limited_by = item.completeness_limited_by;
    }
    for (const language of ["zh", "en"]) {
      const note = entry[`note_${language}`];
      if (typeof note !== "string" || !note.trim()) {
        failures.push(`${label}: the evidence map has no note_${language}`);
      }
      row[`evidence_summary_${language}`] = summarize(note ?? "", {
        sections: row.proposal_sections,
        drawings: row.drawing_refs,
        layers: row.geometry_refs,
        metrics: row.metric_refs,
        sources: row.source_ids,
        assumptions: row.assumption_ids,
        selfChecks: row.self_check_ids,
        plates: row.plate_refs,
        components: row.component_refs,
        routes: row.route_refs,
        envelopes: row.envelope_refs,
        actions: row.action_refs,
      }, language);
    }
    return { ...row, id };
  });

  checkDistinct(complianceRows, [...COMPLIANCE_ARRAYS, ...EXTRA_ARRAYS], "compliance", failures);
  checkDistinct(depthRows, [...DEPTH_ARRAYS, ...EXTRA_ARRAYS], "design depth", failures);

  const strip = (rows) => rows.map(({ id, ...rest }) => rest);
  const outputs = [
    {
      file: COMPLIANCE,
      label: "compliance_matrix.json",
      value: { schema_version: complianceDoc.schema_version, requirements: strip(complianceRows) },
    },
    {
      file: DEPTH,
      label: "design_depth_matrix.json",
      value: { schema_version: depthDoc.schema_version, items: strip(depthRows) },
    },
  ];

  let changedFiles = 0;
  const results = [];
  for (const output of outputs) {
    const text = serialize(output.value);
    const original = readText(output.file);
    const changed = text !== original;
    if (changed) changedFiles += 1;
    // A failed run never writes. A matrix that is half narrowed and half blanket would be
    // harder to notice than one that was left alone.
    if (changed && !checkOnly && failures.length === 0) fs.writeFileSync(output.file, text, "utf8");
    results.push({ file: output.label, changed, bytes: Buffer.byteLength(text, "utf8") });
  }

  const report = {
    status: failures.length === 0 ? "PASS" : "FAIL",
    exit_code: failures.length === 0 ? (checkOnly && changedFiles > 0 ? 1 : 0) : 1,
    mode: checkOnly ? "check" : "write",
    changed_files: changedFiles,
    requirements: complianceRows.length,
    design_depth_items: depthRows.length,
    references_checked: counters.checked,
    references_resolved: counters.resolved,
    references_unresolved: counters.checked - counters.resolved,
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

module.exports = { buildResolvers, summarize, checkDistinct, serialize };
