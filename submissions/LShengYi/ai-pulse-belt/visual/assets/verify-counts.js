#!/usr/bin/env node
/**
 * verify-counts.js — 评审可以自己重算：零依赖计数重算器。
 *
 * The package claims its spatial counts are "known, directly recomputable from
 * the submitted geometry". This checker does exactly that — it reads the nine
 * geometry/*.geojson layers in the package and independently counts features,
 * then compares each count against metrics.json. It does NOT call any of the
 * package's generation scripts, needs no Python and no network.
 *
 * Scope is deliberately limited to pure counts (feature counts and distinct
 * code counts). Areas/ratios need projection (EPSG:4548) and are recomputed by
 * the generator chain; a zero-dependency recomputer that faked projection
 * would be exactly the kind of "检查测了方便测的东西" this package records in
 * its own errata. Exit code: 0 = all counts reproduce, 1 = any mismatch.
 *
 * Usage:  node verify-counts.js
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const GEOMETRY = path.join(ROOT, "geometry");

const METRICS = JSON.parse(fs.readFileSync(path.join(ROOT, "metrics.json"), "utf8")).metrics;

// metric_id -> { file, count: "features" | "distinct", property }
const CHECKS = [
  { metric: "key_area_count", file: "key_areas.geojson", count: "features" },
  { metric: "land_parcel_count", file: "land_use.geojson", count: "features" },
  { metric: "land_use_class_count", file: "land_use.geojson", count: "distinct", property: "land_use_code" },
  { metric: "building_count", file: "buildings.geojson", count: "features" },
  { metric: "green_space_count", file: "green_space.geojson", count: "features" },
  { metric: "public_space_node_count", file: "public_space.geojson", count: "features" },
  { metric: "road_segment_count", file: "roads.geojson", count: "features" },
  { metric: "phasing_zone_count", file: "phasing.geojson", count: "features" },
  { metric: "constraint_zone_count", file: "constraints.geojson", count: "features" },
];

const failures = [];
const rows = [];

for (const c of CHECKS) {
  const fpath = path.join(GEOMETRY, c.file);
  let geojson;
  try {
    geojson = JSON.parse(fs.readFileSync(fpath, "utf8"));
  } catch (e) {
    failures.push(`${c.metric}: cannot read ${c.file}`);
    continue;
  }
  const feats = geojson.features || [];
  const computed =
    c.count === "distinct"
      ? new Set(feats.map((f) => f.properties && f.properties[c.property])).size
      : feats.length;
  const declared = METRICS[c.metric] && METRICS[c.metric].value;
  const ok = declared === computed;
  rows.push({ metric: c.metric, file: c.file, declared, computed, ok });
  if (!ok) failures.push(`${c.metric}: declared ${declared} != recomputed ${computed} (${c.file})`);
}

console.log("metric                  declared  recomputed  file");
for (const r of rows) {
  console.log(
    `${r.metric.padEnd(22)} ${String(r.declared).padStart(7)}  ${String(r.computed).padStart(9)}  ${r.ok ? "OK  " : "FAIL"} ${r.file}`
  );
}

if (failures.length) {
  console.error("VERIFY-COUNT FAIL:");
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log(`VERIFY-COUNT OK: ${rows.length}/${rows.length} counts reproduce from geometry`);
process.exit(0);
