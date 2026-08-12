#!/usr/bin/env node
/* Deterministic package-only check for the v1.7 spatial evidence atlas. */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../..");
const assetRoot = path.join(root, "visual", "assets");
const figureRoot = path.join(root, "assets", "figures");
const atlasPath = path.join(assetRoot, "ai-era-spatial-atlas-v17.json");
const atlas = JSON.parse(fs.readFileSync(atlasPath, "utf8"));
const expectedAreas = ["PROV-KEY-001", "PROV-KEY-002", "PROV-KEY-003"];
const expectedOutputs = [
  "site-overview-v17.svg",
  "site-overview-v17.en.svg",
  "key-areas-v17.svg",
  "key-areas-v17.en.svg"
];
const checks = [];
const check = (name, ok, detail) => checks.push({ name, ok: Boolean(ok), detail });

check("iteration", atlas.package_iteration === "v1.7", atlas.package_iteration);
check("concept_status", atlas.status === "conceptual_spatial_evidence_atlas", atlas.status);
check("provisional_boundary", atlas.official_boundary === false && atlas.geometry_role === "provisional_constraint", `${atlas.official_boundary}/${atlas.geometry_role}`);
check("area_count", atlas.area_count === 3 && JSON.stringify(atlas.area_ids) === JSON.stringify(expectedAreas), `${atlas.area_count}/${atlas.area_ids.join(",")}`);
check("four_bands_each", Array.isArray(atlas.action_bands_per_area) && atlas.action_bands_per_area.every((item) => item.count === 4 && item.bands.length === 4), atlas.action_bands_per_area.map((item) => `${item.area_id}:${item.count}`).join(","));
check("scenario_nodes", atlas.scenario_node_count === 10, atlas.scenario_node_count);
check("non_operational_boundary", atlas.operational_status === "not_authorized_not_run" && atlas.performance_results === null && atlas.not_an_official_score === true, `${atlas.operational_status}/${atlas.performance_results}/${atlas.not_an_official_score}`);
check("output_registry", JSON.stringify(atlas.outputs) === JSON.stringify(expectedOutputs), atlas.outputs.join(","));

for (const output of expectedOutputs) {
  const file = path.join(figureRoot, output);
  const exists = fs.existsSync(file);
  const svg = exists ? fs.readFileSync(file, "utf8") : "";
  check(`svg:${output}`, exists && /viewBox="0 0 2200 1320"/.test(svg) && /official_boundary=false/.test(svg), exists ? `${svg.length} chars` : "missing");
}

for (const output of ["site-overview-v17.png", "site-overview-v17.en.png", "key-areas-v17.png", "key-areas-v17.en.png"]) {
  const file = path.join(figureRoot, output);
  const exists = fs.existsSync(file);
  let dimensions = "missing";
  if (exists) {
    const bytes = fs.readFileSync(file);
    const width = bytes.readUInt32BE(16);
    const height = bytes.readUInt32BE(20);
    dimensions = `${width}x${height}`;
    check(`png:${output}`, width === 2200 && height === 1320, dimensions);
  } else check(`png:${output}`, false, dimensions);
}

const failures = checks.filter((item) => !item.ok);
const result = { ok: failures.length === 0, checks, failure_count: failures.length, official_score: null, note: "package-only structural check; not an official score or field result" };
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.ok ? 0 : 1;
