#!/usr/bin/env node
"use strict";

// Are the right thirty rasters on disk, and is the rejected architecture actually gone?
//
// The superseded design published ten combined bilingual infographics per area. Deleting
// the registry rows that pointed at them would have left thirty orphaned PNGs in the
// package, which is why this test names the old files explicitly rather than trusting that
// whatever is in `assets/figures/` is current.
//
// Read-only. Usage: node test-key-area-inventory.js

const fs = require("node:fs");
const path = require("node:path");
const contract = require("./key-area-contract.js");

const {
  PACKAGE_ROOT, CONCEPTS, AREAS, expectedArtifacts, rejectedArtifacts,
  exists, pngSize, harness, cli,
} = contract;

// ---------------------------------------------------------------------------
// The oracle
//
// Everything above this line comes from the same module the builders read, so on
// its own this file can only prove that the package agrees with the contract —
// never that the contract still says what was approved. An edit that renamed a
// concept in `key-area-contract.js` and re-ran the builders would move the
// registry, the rasters and this test together, and all of it would stay green.
//
// The tables below are therefore written out by hand: three areas, five concepts,
// fifteen plate ids and thirty file paths, spelled in full rather than composed
// by the same rule the contract composes them with. A coordinated drift has to
// contradict this list to land, and contradicting it is a test failure.
//
// Only the plumbing above (harness, cli, exists, pngSize, PACKAGE_ROOT) is reused;
// none of the approved inventory is.
// ---------------------------------------------------------------------------

const APPROVED_AREAS = [
  {
    prefix: "ZZY",
    file_slug: "zhongzhiyuan",
    area_id: "zhongzhiyuan_ai_acceleration_area",
    area_feature_id: "PROV-KEY-001",
    georeferenced: true,
    spatial_mode: "provisional_extent",
  },
  {
    prefix: "AIO",
    file_slug: "ai-origin-community",
    area_id: "beijing_ai_origin_community",
    area_feature_id: "PROV-KEY-002",
    georeferenced: true,
    spatial_mode: "provisional_extent",
  },
  {
    // Dazhongsi is the one area published without georeference. If a contract
    // edit ever flips these two fields the plates stop being allowed to say what
    // they say, so the approved values are pinned here and not only asserted
    // against the module that would have been edited.
    prefix: "DZS",
    file_slug: "dazhongsi",
    area_id: "dazhongsi_ai_industry_cluster",
    area_feature_id: "PROV-KEY-003",
    georeferenced: false,
    spatial_mode: "not_to_scale_topology",
  },
];

const APPROVED_CONCEPTS = [
  { concept_id: "01", slug: "situation-claim-limits" },
  { concept_id: "02", slug: "program-flows" },
  { concept_id: "03", slug: "reversible-module-sections" },
  { concept_id: "04", slug: "access-operations-seasons" },
  { concept_id: "05", slug: "governance-stop-evidence" },
];

const APPROVED_PLATE_IDS = [
  "ZZY-01", "ZZY-02", "ZZY-03", "ZZY-04", "ZZY-05",
  "AIO-01", "AIO-02", "AIO-03", "AIO-04", "AIO-05",
  "DZS-01", "DZS-02", "DZS-03", "DZS-04", "DZS-05",
];

const APPROVED_FILES = [
  "assets/figures/key-area-zhongzhiyuan-01-situation-claim-limits.png",
  "assets/figures/key-area-zhongzhiyuan-01-situation-claim-limits.en.png",
  "assets/figures/key-area-zhongzhiyuan-02-program-flows.png",
  "assets/figures/key-area-zhongzhiyuan-02-program-flows.en.png",
  "assets/figures/key-area-zhongzhiyuan-03-reversible-module-sections.png",
  "assets/figures/key-area-zhongzhiyuan-03-reversible-module-sections.en.png",
  "assets/figures/key-area-zhongzhiyuan-04-access-operations-seasons.png",
  "assets/figures/key-area-zhongzhiyuan-04-access-operations-seasons.en.png",
  "assets/figures/key-area-zhongzhiyuan-05-governance-stop-evidence.png",
  "assets/figures/key-area-zhongzhiyuan-05-governance-stop-evidence.en.png",
  "assets/figures/key-area-ai-origin-community-01-situation-claim-limits.png",
  "assets/figures/key-area-ai-origin-community-01-situation-claim-limits.en.png",
  "assets/figures/key-area-ai-origin-community-02-program-flows.png",
  "assets/figures/key-area-ai-origin-community-02-program-flows.en.png",
  "assets/figures/key-area-ai-origin-community-03-reversible-module-sections.png",
  "assets/figures/key-area-ai-origin-community-03-reversible-module-sections.en.png",
  "assets/figures/key-area-ai-origin-community-04-access-operations-seasons.png",
  "assets/figures/key-area-ai-origin-community-04-access-operations-seasons.en.png",
  "assets/figures/key-area-ai-origin-community-05-governance-stop-evidence.png",
  "assets/figures/key-area-ai-origin-community-05-governance-stop-evidence.en.png",
  "assets/figures/key-area-dazhongsi-01-situation-claim-limits.png",
  "assets/figures/key-area-dazhongsi-01-situation-claim-limits.en.png",
  "assets/figures/key-area-dazhongsi-02-program-flows.png",
  "assets/figures/key-area-dazhongsi-02-program-flows.en.png",
  "assets/figures/key-area-dazhongsi-03-reversible-module-sections.png",
  "assets/figures/key-area-dazhongsi-03-reversible-module-sections.en.png",
  "assets/figures/key-area-dazhongsi-04-access-operations-seasons.png",
  "assets/figures/key-area-dazhongsi-04-access-operations-seasons.en.png",
  "assets/figures/key-area-dazhongsi-05-governance-stop-evidence.png",
  "assets/figures/key-area-dazhongsi-05-governance-stop-evidence.en.png",
];

const APPROVED_ARTIFACT_IDS = APPROVED_PLATE_IDS.flatMap(
  (plateId) => [`${plateId}-zh`, `${plateId}-en`]);

/**
 * Compare a produced list against the approved one in both directions, so that
 * neither a dropped entry nor an added one can pass as a match.
 */
function compareSets(fail, label, produced, approved) {
  const producedSet = new Set(produced);
  const approvedSet = new Set(approved);
  for (const value of approvedSet) {
    if (!producedSet.has(value)) fail(`${label}: the contract no longer produces approved entry ${value}`);
  }
  for (const value of producedSet) {
    if (!approvedSet.has(value)) fail(`${label}: the contract produces ${value}, which was never approved`);
  }
  if (produced.length !== approved.length) {
    fail(`${label}: the contract produces ${produced.length} entries, expected ${approved.length}`);
  }
}

/**
 * The whole approved inventory, checked against whatever the contract currently
 * says. This is the half of the test that survives a coordinated rewrite of the
 * contract module, because it does not read that module for its expectations.
 */
function checkAgainstOracle(fail) {
  compareSets(fail, "area prefixes", AREAS.map((area) => area.prefix),
    APPROVED_AREAS.map((area) => area.prefix));
  for (const approved of APPROVED_AREAS) {
    const actual = AREAS.find((area) => area.prefix === approved.prefix);
    if (!actual) continue;
    for (const field of ["file_slug", "area_id", "area_feature_id", "georeferenced", "spatial_mode"]) {
      if (actual[field] !== approved[field]) {
        fail(`area ${approved.prefix} ${field} is ${JSON.stringify(actual[field])}, `
          + `approved value is ${JSON.stringify(approved[field])}`);
      }
    }
  }

  compareSets(fail, "concept ids", CONCEPTS.map((concept) => concept.concept_id),
    APPROVED_CONCEPTS.map((concept) => concept.concept_id));
  for (const approved of APPROVED_CONCEPTS) {
    const actual = CONCEPTS.find((concept) => concept.concept_id === approved.concept_id);
    if (!actual) continue;
    if (actual.slug !== approved.slug) {
      fail(`concept ${approved.concept_id} slug is ${actual.slug}, approved slug is ${approved.slug}`);
    }
  }
  // Five concepts per area is the shape the boards and the booklet are built to.
  for (const approved of APPROVED_AREAS) {
    const plates = APPROVED_PLATE_IDS.filter((id) => id.startsWith(`${approved.prefix}-`));
    if (plates.length !== 5) {
      fail(`the oracle lists ${plates.length} plates for ${approved.prefix}, expected 5`);
    }
  }

  const produced = expectedArtifacts();
  compareSets(fail, "plate ids", [...new Set(produced.map((a) => a.plate_id))], APPROVED_PLATE_IDS);
  compareSets(fail, "artifact ids", produced.map((a) => a.artifact_id), APPROVED_ARTIFACT_IDS);
  compareSets(fail, "artifact files", produced.map((a) => a.file), APPROVED_FILES);

  // Each approved path must exist on disk under its approved name, independently
  // of what the registry believes it called things.
  for (const file of APPROVED_FILES) {
    if (!exists(file)) fail(`approved plate raster ${file} does not exist`);
  }
  return {
    approved_areas: APPROVED_AREAS.length,
    approved_concepts: APPROVED_CONCEPTS.length,
    approved_plate_ids: APPROVED_PLATE_IDS.length,
    approved_files: APPROVED_FILES.length,
  };
}

function run() {
  return harness("KA-INV", "exactly thirty key-area rasters exist as fifteen zh/en pairs", (fail) => {
    const oracle = checkAgainstOracle(fail);

    const expected = expectedArtifacts();
    if (expected.length !== 30) fail(`the contract itself yields ${expected.length} artifacts, expected 30`);

    const plateIds = new Set(expected.map((artifact) => artifact.plate_id));
    if (plateIds.size !== 15) fail(`the contract yields ${plateIds.size} semantic plates, expected 15`);

    const missing = [];
    const notPng = [];
    const sizes = {};
    for (const artifact of expected) {
      if (!exists(artifact.file)) {
        missing.push(artifact.file);
        continue;
      }
      const size = pngSize(artifact.file);
      if (!size) {
        notPng.push(artifact.file);
        continue;
      }
      sizes[artifact.artifact_id] = `${size.width}x${size.height}`;
      if (size.width < 1200 || size.height < 800) {
        // A raster too small to read at A0 is not a drawing, whatever the registry says.
        fail(`${artifact.file} is ${size.width}x${size.height}, too small to carry a keyed plan`);
      }
    }
    for (const file of missing) fail(`required plate raster ${file} does not exist`);
    for (const file of notPng) fail(`${file} exists but is not a PNG`);

    // Each zh/en pair must be two distinct files. One file served under two names would
    // mean the English reader is looking at Chinese labels.
    for (const area of AREAS) {
      for (const concept of CONCEPTS) {
        const zh = contract.plateFile(area, concept, "zh");
        const en = contract.plateFile(area, concept, "en");
        if (!exists(zh) || !exists(en)) continue;
        const zhBytes = fs.readFileSync(path.join(PACKAGE_ROOT, zh));
        const enBytes = fs.readFileSync(path.join(PACKAGE_ROOT, en));
        if (zhBytes.equals(enBytes)) {
          fail(`${zh} and ${en} are byte-identical, so one language was never rendered`);
        }
      }
    }

    const survivors = rejectedArtifacts().filter((file) => exists(file));
    for (const file of survivors) {
      fail(`rejected combined-infographic plate ${file} is still present and must be deleted`);
    }

    // The whole rejected directory has to go, not just the files anyone remembered.
    const rejectedDirectory = path.join(PACKAGE_ROOT, "assets", "figures", "areas");
    let strays = [];
    if (fs.existsSync(rejectedDirectory)) {
      strays = fs.readdirSync(rejectedDirectory);
      fail(`assets/figures/areas/ still exists with ${strays.length} entries; the rejected architecture must be removed`);
    }

    // Nothing may sit in the figures directory under the key-area prefix that the contract
    // does not name, so a half-finished rename cannot ship alongside the real set.
    const figures = path.join(PACKAGE_ROOT, "assets", "figures");
    const declared = new Set(expected.map((artifact) => artifact.file.split("/").pop()));
    const undeclared = fs.existsSync(figures)
      ? fs.readdirSync(figures).filter((name) => name.startsWith("key-area-") && !declared.has(name))
      : [];
    for (const name of undeclared) fail(`assets/figures/${name} is a key-area raster the contract does not declare`);

    return {
      oracle,
      expected_artifacts: expected.length,
      semantic_plates: plateIds.size,
      present: expected.length - missing.length,
      missing,
      rejected_survivors: survivors,
      rejected_directory_entries: strays.length,
      undeclared,
      sizes,
    };
  });
}

if (require.main === module) cli(run());

module.exports = { run };
