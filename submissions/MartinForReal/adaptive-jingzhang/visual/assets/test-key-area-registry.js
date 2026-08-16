#!/usr/bin/env node
"use strict";

// Does the plate registry describe the rasters that are actually on disk, and does it say
// the same auditable things in both languages?
//
// The registry is the only machine-readable account of what each drawing shows, what it
// claims, and where it is published. Two failure modes matter and both are checked here:
// a registry that drifts from the files (a recorded hash nobody recomputed), and a
// registry whose English half quietly says something different from its Chinese half.
//
// Read-only. Usage: node test-key-area-registry.js

const contract = require("./key-area-contract.js");

const {
  ARTIFACT_FIELDS, PAIR_INVARIANT_FIELDS, REQUIRED_STATUS, A0_RANK,
  A0_SUPPORT_MAX_AREA_FRACTION, expectedArtifacts, exists, readJson, sha256File,
  pngSize, harness, cli,
} = contract;

const REGISTRY = "visual/assets/area-plates.json";

function isFilled(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim() !== "";
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

function run() {
  return harness("KA-REG", "the plate registry is a thirty-record account that matches the rasters", (fail) => {
    if (!exists(REGISTRY)) return fail(`${REGISTRY} does not exist`);
    const registry = readJson(REGISTRY);

    const counts = registry.counts ?? {};
    const expectedCounts = { semantic_plates: 15, artifacts: 30, zh: 15, en: 15 };
    for (const [key, value] of Object.entries(expectedCounts)) {
      if (counts[key] !== value) fail(`counts.${key} is ${JSON.stringify(counts[key])}, expected ${value}`);
    }

    const records = registry.artifacts ?? [];
    if (records.length !== 30) fail(`the registry holds ${records.length} artifact records, expected 30`);

    const byId = new Map(records.map((record) => [record.artifact_id, record]));
    const expected = expectedArtifacts();
    for (const artifact of expected) {
      if (!byId.has(artifact.artifact_id)) fail(`the registry has no record for ${artifact.artifact_id}`);
    }
    for (const record of records) {
      if (!expected.some((artifact) => artifact.artifact_id === record.artifact_id)) {
        fail(`the registry declares ${record.artifact_id}, which the contract does not recognise`);
      }
    }

    const altTexts = new Map();
    const detail = {};
    for (const artifact of expected) {
      const record = byId.get(artifact.artifact_id);
      if (!record) continue;

      for (const field of ARTIFACT_FIELDS) {
        // `translation_of` is legitimately null on a Chinese base artifact, so it is the
        // one field whose emptiness carries meaning.
        if (field === "translation_of") continue;
        if (!isFilled(record[field])) fail(`${record.artifact_id} is missing ${field}`);
      }

      if (record.file !== artifact.file) {
        fail(`${record.artifact_id} points at ${record.file}, expected ${artifact.file}`);
      }
      if (record.plate_id !== artifact.plate_id) {
        fail(`${record.artifact_id} declares plate ${record.plate_id}, expected ${artifact.plate_id}`);
      }
      if (record.language !== artifact.language) {
        fail(`${record.artifact_id} declares language ${record.language}, expected ${artifact.language}`);
      }
      if (record.translation_of !== artifact.translation_of) {
        fail(`${record.artifact_id} declares translation_of ${JSON.stringify(record.translation_of)}, expected ${JSON.stringify(artifact.translation_of)}`);
      }
      // Every English record has to point at a Chinese artifact that exists, not at a name
      // that merely looks right.
      if (artifact.language === "en" && !byId.has(record.translation_of)) {
        fail(`${record.artifact_id} is a translation of ${record.translation_of}, which is not in the registry`);
      }
      if (record.area_feature_id !== artifact.area.area_feature_id) {
        fail(`${record.artifact_id} declares area feature ${record.area_feature_id}, expected ${artifact.area.area_feature_id}`);
      }
      if (record.concept_id !== artifact.concept.concept_id || record.concept_slug !== artifact.concept.slug) {
        fail(`${record.artifact_id} declares concept ${record.concept_id}/${record.concept_slug}, expected ${artifact.concept.concept_id}/${artifact.concept.slug}`);
      }
      if (record.georeferenced !== artifact.area.georeferenced) {
        fail(`${record.artifact_id} declares georeferenced ${record.georeferenced}, expected ${artifact.area.georeferenced}`);
      }
      if (record.spatial_mode !== artifact.area.spatial_mode) {
        fail(`${record.artifact_id} declares spatial_mode ${record.spatial_mode}, expected ${artifact.area.spatial_mode}`);
      }

      for (const [key, value] of Object.entries(REQUIRED_STATUS)) {
        if ((record.status ?? {})[key] !== value) {
          fail(`${record.artifact_id} status.${key} is ${JSON.stringify((record.status ?? {})[key])}, expected ${JSON.stringify(value)}`);
        }
      }

      // Alt text exists for a screen reader, so two drawings sharing one sentence is the
      // same defect as no alt text at all.
      if (typeof record.alt_text === "string") {
        const seen = altTexts.get(record.alt_text);
        if (seen) fail(`${record.artifact_id} repeats the alt text of ${seen}`);
        else altTexts.set(record.alt_text, record.artifact_id);
      }

      if (exists(artifact.file)) {
        const observed = pngSize(artifact.file);
        const hash = sha256File(artifact.file);
        if (record.sha256 !== hash) fail(`${record.artifact_id} records sha256 ${record.sha256}, file is ${hash}`);
        if (observed) {
          if (record.bytes !== observed.bytes) fail(`${record.artifact_id} records ${record.bytes} bytes, file is ${observed.bytes}`);
          if (record.width_px !== observed.width) fail(`${record.artifact_id} records width ${record.width_px}, file is ${observed.width}`);
          if (record.height_px !== observed.height) fail(`${record.artifact_id} records height ${record.height_px}, file is ${observed.height}`);
        }
      }

      const placements = record.placements ?? {};
      if (!isFilled(placements.viewer_anchor)) fail(`${record.artifact_id} has no viewer anchor`);
      if (!isFilled(placements.viewer_file)) fail(`${record.artifact_id} names no viewer file`);
      for (const [sheet, fields] of [["a3", ["page", "placement_id"]], ["a0", ["page", "placement_id", "visual_rank", "area_fraction"]]]) {
        const placement = placements[sheet];
        if (!placement) {
          fail(`${record.artifact_id} has no ${sheet.toUpperCase()} placement`);
          continue;
        }
        for (const field of fields) {
          if (!isFilled(placement[field])) fail(`${record.artifact_id} ${sheet.toUpperCase()} placement is missing ${field}`);
        }
      }

      // The board hierarchy the audit asked for, checked as numbers rather than as a
      // description of intent. Plate 02 dominates, plate 03 is second, the rest support.
      const a0 = placements.a0 ?? {};
      const rank = A0_RANK[record.concept_id];
      if (rank) {
        if (a0.visual_rank !== rank.visual_rank) {
          fail(`${record.artifact_id} has A0 visual_rank ${a0.visual_rank}, expected ${rank.visual_rank}`);
        }
        if (!(a0.area_fraction >= rank.min_area_fraction)) {
          fail(`${record.artifact_id} occupies ${a0.area_fraction} of its board, expected at least ${rank.min_area_fraction}`);
        }
      } else if (!(a0.area_fraction <= A0_SUPPORT_MAX_AREA_FRACTION)) {
        fail(`${record.artifact_id} is a support panel occupying ${a0.area_fraction}, expected at most ${A0_SUPPORT_MAX_AREA_FRACTION}`);
      } else if (typeof a0.visual_rank === "number" && a0.visual_rank < 3) {
        fail(`${record.artifact_id} is a support panel ranked ${a0.visual_rank}; only concepts 02 and 03 may rank above 2`);
      }

      detail[record.artifact_id] = {
        rank: a0.visual_rank ?? null,
        area_fraction: a0.area_fraction ?? null,
      };
    }

    // The pair invariants. Both languages have to agree about every fact a reviewer could
    // audit; only the strings a reader reads and the layout carrying them may differ.
    for (const artifact of expected.filter((item) => item.language === "en")) {
      const en = byId.get(artifact.artifact_id);
      const zh = byId.get(artifact.translation_of);
      if (!en || !zh) continue;
      for (const field of PAIR_INVARIANT_FIELDS) {
        const left = JSON.stringify(zh[field]);
        const right = JSON.stringify(en[field]);
        if (left !== right) fail(`${artifact.plate_id}: ${field} differs across the pair (${left} vs ${right})`);
      }
      // The two language strings must actually differ, or one of them was never written.
      for (const field of ["title", "alt_text", "extended_description"]) {
        if (zh[field] === en[field]) fail(`${artifact.plate_id}: ${field} is identical in both languages`);
      }
    }

    return { records: records.length, counts, placements: detail };
  });
}

if (require.main === module) cli(run());

module.exports = { run };
