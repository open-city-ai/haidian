#!/usr/bin/env node

/*
 * Recompute the provisional spatial relation readout from package GeoJSON.
 * This proves a reproducible relational check, not a route, field survey,
 * engineering dimension, official score, or professional approval.
 */
const fs = require("fs");
const path = require("path");

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, "../..");
const readAsset = (name) => JSON.parse(fs.readFileSync(path.join(assetDir, name), "utf8"));
const readGeo = (relative) => JSON.parse(fs.readFileSync(path.join(packageDir, relative), "utf8"));
const readout = readAsset("ai-era-provisional-spatial-readout.json");
const interfacePlans = readAsset("ai-era-spatial-interface-plans.json");
const sourceFiles = ["geometry/roads.geojson", "geometry/public_space.geojson", "geometry/constraints.geojson", "geometry/green_space.geojson"];
const byId = new Map();
for (const file of sourceFiles) {
  for (const feature of readGeo(file).features) byId.set(feature.id, feature);
}

const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };
const vertices = (geometry) => {
  const result = [];
  const visit = (value) => {
    if (typeof value[0] === "number") result.push(value);
    else value.forEach(visit);
  };
  visit(geometry.coordinates);
  return result;
};
const geodesicMeters = (a, b) => {
  const radius = 6371008.8;
  const radians = Math.PI / 180;
  const dLat = (b[1] - a[1]) * radians;
  const dLon = (b[0] - a[0]) * radians;
  const x = Math.sin(dLat / 2) ** 2
    + Math.cos(a[1] * radians) * Math.cos(b[1] * radians) * Math.sin(dLon / 2) ** 2;
  return 2 * radius * Math.asin(Math.sqrt(x));
};
const minimumVertexSeparation = (fromId, toId) => {
  const from = byId.get(fromId);
  const to = byId.get(toId);
  expect(from, `missing source feature ${fromId}`);
  expect(to, `missing target feature ${toId}`);
  if (!from || !to) return null;
  let minimum = Number.POSITIVE_INFINITY;
  for (const a of vertices(from.geometry)) {
    for (const b of vertices(to.geometry)) minimum = Math.min(minimum, geodesicMeters(a, b));
  }
  return Math.round(minimum / 10) * 10;
};

expect(readout.status === "concept_only", "readout must remain concept_only");
expect(readout.derivation.official_boundary === false, "readout must disclose official_boundary=false");
expect(readout.plans.length === 3, `plans=${readout.plans.length}, expected 3`);
const interfaceById = new Map(interfacePlans.plans.map((plan) => [plan.plan_id, plan]));
let segmentCount = 0;
for (const plan of readout.plans) {
  const interfacePlan = interfaceById.get(plan.plan_id);
  expect(interfacePlan, `${plan.plan_id} missing from ai-era-spatial-interface-plans.json`);
  expect(plan.anchor_refs.length === 4, `${plan.plan_id} must have four anchor refs`);
  expect(plan.segment_readouts.length === 3, `${plan.plan_id} must have three segment readouts`);
  if (interfacePlan) {
    expect(JSON.stringify(plan.anchor_refs) === JSON.stringify(interfacePlan.anchor_sequence), `${plan.plan_id} anchor sequence drift`);
  }
  for (const segment of plan.segment_readouts) {
    const actual = minimumVertexSeparation(segment.from, segment.to);
    expect(actual === segment.minimum_vertex_separation_m, `${plan.plan_id} ${segment.from}->${segment.to}: stored=${segment.minimum_vertex_separation_m}, recomputed=${actual}`);
    segmentCount += 1;
  }
  expect(plan.functional_band_count === 4, `${plan.plan_id} functional_band_count must be 4`);
  expect(plan.human_fallback_count === 4, `${plan.plan_id} human_fallback_count must be 4`);
}

const result = {
  ok: errors.length === 0,
  checks: { areas: readout.plans.length, segments: segmentCount, anchors_per_area: 4, rounding_m: 10 },
  boundary: "provisional geometry relation only; not a route, field result, official score, or engineering dimension",
  errors
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.ok ? 0 : 1;
