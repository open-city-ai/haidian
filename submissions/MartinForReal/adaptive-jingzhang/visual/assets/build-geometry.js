#!/usr/bin/env node
"use strict";

// Stamps each key-area feature with the position claim its bilingual record makes.
//
// The three provisional polygons were drawn from public data and none of them is an
// official boundary. Issue #1029 additionally disputes where the Dazhongsi polygon sits,
// so that area is published as non-georeferenced: its coordinates stay in the file for
// continuity of the record, but the feature says on its face that its position carries
// no claim, and the design content for it never uses a position.
//
// Coordinates and area_sqm_declared are never touched — metrics depend on them, and
// moving a provisional polygon would replace one unevidenced position with another.
//
// Usage: node build-geometry.js [--check]

const fs = require("node:fs");
const path = require("node:path");

const ASSETS = __dirname;
const PACKAGE_ROOT = path.resolve(ASSETS, "..", "..");
const KEY_AREAS = path.join(PACKAGE_ROOT, "geometry", "key_areas.geojson");
const SOURCE = path.join(ASSETS, "regeneration-source.json");

// Written onto every feature, so the claim travels with the geometry rather than living
// only in prose a reviewer may never open.
const POSITIONAL_CLAIM = {
  georeferenced: "provisional",
  non_georeferenced: "void",
};

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function stampProperties(properties, area) {
  const stamped = { ...properties };
  stamped.georeferenced = area.georeferenced;
  stamped.positional_claim = area.georeferenced
    ? POSITIONAL_CLAIM.georeferenced
    : POSITIONAL_CLAIM.non_georeferenced;
  stamped.lab = area.lab;
  stamped.role_zh = area.role_zh;
  stamped.role_en = area.role_en;
  if (area.georeferenced === false) {
    stamped.non_station_note_zh = area.non_station_note_zh;
    stamped.non_station_note_en = area.non_station_note_en;
    stamped.non_station_source_id = area.source_id;
  }
  return stamped;
}

function main(argv) {
  const checkOnly = argv.includes("--check");
  const source = readJson(SOURCE);
  const original = fs.readFileSync(KEY_AREAS, "utf8");
  const collection = JSON.parse(original);
  const byId = new Map(source.areas.map((area) => [area.id, area]));

  const failures = [];
  const stamped = [];
  const features = collection.features.map((feature) => {
    const area = byId.get(feature.properties.id);
    if (!area) {
      failures.push(`${feature.properties.id} has geometry but no bilingual record`);
      return feature;
    }
    stamped.push({ id: area.id, georeferenced: area.georeferenced });
    return { ...feature, properties: stampProperties(feature.properties, area) };
  });

  for (const [id] of byId) {
    if (!collection.features.some((feature) => feature.properties.id === id)) {
      failures.push(`${id} is declared in the bilingual record but has no geometry`);
    }
  }

  // The polygon a run started with must be the polygon it ends with.
  const before = collection.features.map((feature) => JSON.stringify(feature.geometry));
  const after = features.map((feature) => JSON.stringify(feature.geometry));
  for (let index = 0; index < before.length; index += 1) {
    if (before[index] !== after[index]) {
      failures.push(`${collection.features[index].properties.id}: geometry was modified`);
    }
  }

  const next = { ...collection, features };
  const serialized = `${JSON.stringify(next, null, 2)}\n`;
  const changed = serialized !== original;
  if (changed && !checkOnly && failures.length === 0) {
    fs.writeFileSync(KEY_AREAS, serialized, "utf8");
  }

  const report = {
    status: failures.length === 0 ? "PASS" : "FAIL",
    exit_code: failures.length === 0 ? (checkOnly && changed ? 1 : 0) : 1,
    mode: checkOnly ? "check" : "write",
    changed,
    features: features.length,
    stamped,
    non_georeferenced: stamped.filter((item) => item.georeferenced === false).map((item) => item.id),
    failures,
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

module.exports = { stampProperties };
