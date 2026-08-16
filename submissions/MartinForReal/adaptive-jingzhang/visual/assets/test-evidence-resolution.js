#!/usr/bin/env node
"use strict";

// Does every "see the evidence" actually lead somewhere?
//
// A reference like "see the drawings" costs a reviewer an afternoon and proves nothing. The
// package uses locators that name one thing each — a section, a viewer anchor, an A0 board
// placement — and this test resolves all of them against the registries that define those
// targets. A locator that does not resolve is a claim with no support behind it, whatever
// it looks like on the page.
//
// It also checks two subtler failures. Three areas citing the same evidence set means the
// evidence was written once and pasted, so it cannot be about any particular place. And
// Dazhongsi, which has no building stock and no phasing programme, must not borrow either.
//
// Read-only. Usage: node test-evidence-resolution.js

const contract = require("./key-area-contract.js");

const {
  AREAS, DZS_EXCLUDED_EVIDENCE, parseEvidenceLocator, EVIDENCE_LOCATOR_KINDS,
  exists, readJson, harness, cli,
} = contract;

const REGISTRY = "visual/assets/area-plates.json";
const DESIGN = "visual/assets/key-area-design.json";
const ACTIONS = "visual/assets/action-governance.json";

// Builds the set of targets each locator kind is allowed to name. Everything here comes
// from a file other than the one being checked, so a broken reference cannot be repaired
// by the record that made it.
function buildIndex(fail) {
  const index = Object.fromEntries(EVIDENCE_LOCATOR_KINDS.map((kind) => [kind, new Set()]));

  for (const area of AREAS) index.area.add(area.area_feature_id);

  if (exists(DESIGN)) {
    for (const area of readJson(DESIGN).areas ?? []) {
      if (area.plan?.id) index.drawing.add(area.plan.id);
      for (const section of area.sections ?? []) index.section.add(section.id);
      for (const component of area.components ?? []) index.component.add(component.id);
      for (const route of area.routes ?? []) index.route.add(route.id);
    }
  } else {
    fail(`${DESIGN} does not exist; no drawing, section, component or route id resolves`);
  }

  if (exists(REGISTRY)) {
    for (const record of readJson(REGISTRY).artifacts ?? []) {
      // Both forms resolve. `plate:ZZY-02-zh` names one raster; `plate:ZZY-02` names
      // the semantic plate, which is what a reference printed on both the Chinese
      // and the English sheet has to mean.
      index.plate.add(record.artifact_id);
      if (record.plate_id) index.plate.add(record.plate_id);
      const placements = record.placements ?? {};
      if (placements.viewer_file && placements.viewer_anchor) {
        index.viewer.add(`${placements.viewer_file}#${placements.viewer_anchor}`);
      }
      if (placements.a3?.page && placements.a3?.placement_id) {
        index.a3.add(`page-${String(placements.a3.page).padStart(2, "0")}#${placements.a3.placement_id}`);
      }
      if (placements.a0?.page && placements.a0?.placement_id) {
        index.a0.add(`board-${placements.a0.page}#${placements.a0.placement_id}`);
      }
    }
  } else {
    fail(`${REGISTRY} does not exist; no plate, viewer anchor or PDF placement resolves`);
  }

  if (exists("sources.json")) {
    for (const source of readJson("sources.json").sources ?? []) index.source.add(source.id);
  }
  if (exists("standard_matrix.json")) {
    for (const standard of readJson("standard_matrix.json").standards ?? []) index.standard.add(standard.standard_id);
  }
  if (exists("metrics.json")) {
    for (const key of Object.keys(readJson("metrics.json").metrics ?? {})) index.metric.add(key);
  }
  if (exists("assumptions.json")) {
    for (const assumption of readJson("assumptions.json").assumptions ?? []) {
      index.data.add(`assumptions.json#${assumption.id}`);
    }
  }

  return index;
}

// Walks a value tree and yields every `evidence_refs` array it finds, with the path that
// reached it. Evidence is scattered across plans, sections, chains, envelopes and actions,
// and listing those places by hand would guarantee one gets forgotten.
function collectEvidence(value, path, found) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectEvidence(item, `${path}[${index}]`, found));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      const next = path ? `${path}.${key}` : key;
      if (key === "evidence_refs") found.push({ path: next, refs: item });
      else collectEvidence(item, next, found);
    }
  }
  return found;
}

function run() {
  return harness("KA-EVI", "every evidence reference resolves to one named target", (fail) => {
    const index = buildIndex(fail);

    const sites = [];
    for (const file of [REGISTRY, DESIGN, ACTIONS]) {
      if (!exists(file)) {
        fail(`${file} does not exist`);
        continue;
      }
      for (const site of collectEvidence(readJson(file), "", [])) sites.push({ file, ...site });
    }
    if (sites.length === 0) fail("no record in the package cites any evidence");

    let resolved = 0;
    const unresolved = [];
    for (const site of sites) {
      if (!Array.isArray(site.refs) || site.refs.length === 0) {
        fail(`${site.file} ${site.path} cites no evidence`);
        continue;
      }
      for (const ref of site.refs) {
        const locator = parseEvidenceLocator(ref);
        if (!locator) {
          unresolved.push(`${site.file} ${site.path}: ${JSON.stringify(ref)} is not a locator`);
          continue;
        }
        if (!index[locator.kind].has(locator.target)) {
          unresolved.push(`${site.file} ${site.path}: ${ref} names no ${locator.kind} that exists`);
          continue;
        }
        resolved += 1;
      }
    }
    for (const problem of unresolved) fail(problem);

    // Evidence gathered per area, so a set pasted across all three shows up as an exact
    // duplicate rather than as three plausible-looking lists.
    const perArea = new Map();
    if (exists(REGISTRY)) {
      for (const record of readJson(REGISTRY).artifacts ?? []) {
        const bucket = perArea.get(record.area_feature_id) ?? new Set();
        for (const ref of record.evidence_refs ?? []) bucket.add(ref);
        perArea.set(record.area_feature_id, bucket);
      }
    }
    const signatures = new Map();
    for (const [areaId, bucket] of perArea) {
      const signature = [...bucket].sort().join("|");
      const seen = signatures.get(signature);
      if (seen) fail(`${areaId} cites exactly the same evidence set as ${seen}, so neither set is about a place`);
      else signatures.set(signature, areaId);
    }

    // Dazhongsi may not reach for another area's drawings, and may not cite the categories
    // it has no standing to cite.
    const dzs = AREAS.find((area) => area.prefix === "DZS");
    const otherAreaTargets = new Set();
    if (exists(DESIGN)) {
      for (const area of readJson(DESIGN).areas ?? []) {
        if (area.area_feature_id === dzs.area_feature_id) continue;
        if (area.plan?.id) otherAreaTargets.add(area.plan.id);
        for (const section of area.sections ?? []) otherAreaTargets.add(section.id);
        for (const component of area.components ?? []) otherAreaTargets.add(component.id);
        for (const route of area.routes ?? []) otherAreaTargets.add(route.id);
      }
    }
    const dzsCited = perArea.get(dzs.area_feature_id) ?? new Set();
    for (const ref of dzsCited) {
      const locator = parseEvidenceLocator(ref);
      if (locator && otherAreaTargets.has(locator.target)) {
        fail(`Dazhongsi cites ${ref}, which belongs to another area`);
      }
    }

    if (exists(DESIGN)) {
      const design = (readJson(DESIGN).areas ?? []).find((area) => area.area_feature_id === dzs.area_feature_id);
      const excluded = design?.excluded_evidence ?? [];
      for (const category of DZS_EXCLUDED_EVIDENCE) {
        if (!excluded.some((entry) => entry.category === category)) {
          fail(`Dazhongsi does not declare that it excludes ${category} evidence`);
        }
      }
      // A declared exclusion that the record then cites anyway is worse than no exclusion,
      // because it reads as a considered judgement.
      for (const entry of excluded) {
        for (const ref of entry.excluded_refs ?? []) {
          if (dzsCited.has(ref)) fail(`Dazhongsi excludes ${ref} as ${entry.category} evidence and cites it anyway`);
        }
      }
    }

    return {
      sites: sites.length,
      resolved,
      unresolved: unresolved.length,
      index_sizes: Object.fromEntries(Object.entries(index).map(([kind, set]) => [kind, set.size])),
    };
  });
}

if (require.main === module) cli(run());

module.exports = { run };
