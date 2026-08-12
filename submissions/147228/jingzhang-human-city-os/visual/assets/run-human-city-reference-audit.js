#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const directory = __dirname;
const packageRoot = path.resolve(directory, "../..");
const outputPath = path.join(directory, "human-city-reference-audit.json");
const packageFiles = {
  metrics: path.join(packageRoot, "metrics.json"),
  sources: path.join(packageRoot, "sources.json"),
  depth: path.join(packageRoot, "design_depth_matrix.json"),
  standards: path.join(packageRoot, "standard_matrix.json"),
  navigation: path.join(directory, "reviewer-navigation-index.json")
};

const metrics = JSON.parse(fs.readFileSync(packageFiles.metrics, "utf8"));
const sources = JSON.parse(fs.readFileSync(packageFiles.sources, "utf8"));
const depth = JSON.parse(fs.readFileSync(packageFiles.depth, "utf8"));
const standards = JSON.parse(fs.readFileSync(packageFiles.standards, "utf8"));
const navigation = JSON.parse(fs.readFileSync(packageFiles.navigation, "utf8"));
const registries = {
  metric: new Set(Object.keys(metrics.metrics || {})),
  source: new Set((sources.sources || []).map((entry) => entry.id)),
  // `depth:` is also used for an explicitly registered reviewer dimension
  // when the cited text is a rubric-facing evidence route rather than one of
  // the professional design-depth rows. Keep the alias package-local and
  // fail closed for every other unregistered reference.
  depth: new Set([
    ...(depth.items || []).map((entry) => entry.item_id),
    ...(navigation.rubric_dimensions || []).map((entry) => entry.dimension_id)
  ]),
  standard: new Set((standards.standards || []).map((entry) => entry.standard_id))
};
const geometryFeatureIds = new Map();

function packagePathResolves(relativePath) {
  if (typeof relativePath !== "string" || relativePath.length === 0) return false;
  const resolved = path.resolve(packageRoot, relativePath);
  if (resolved === packageRoot || !resolved.startsWith(`${packageRoot}${path.sep}`)) return false;
  return fs.existsSync(resolved) && fs.statSync(resolved).isFile();
}

function spatialRefResolves(ref) {
  const separator = ref.indexOf("#");
  if (separator <= 0 || separator === ref.length - 1) return false;
  const relativePath = ref.slice(0, separator);
  const featureId = ref.slice(separator + 1);
  if (!relativePath.endsWith(".geojson") || !packagePathResolves(relativePath)) return false;
  let featureIds = geometryFeatureIds.get(relativePath);
  if (!featureIds) {
    try {
      const geometry = JSON.parse(fs.readFileSync(path.resolve(packageRoot, relativePath), "utf8"));
      featureIds = new Set((geometry.features || []).flatMap((feature) => [
        feature.id,
        feature.properties?.id,
        feature.properties?.feature_id,
        feature.properties?.zone_id
      ].filter((value) => typeof value === "string" && value.length > 0)));
    } catch (_error) {
      featureIds = new Set();
    }
    geometryFeatureIds.set(relativePath, featureIds);
  }
  return featureIds.has(featureId);
}

function resolves(kind, reference) {
  if (kind === "data") return reference.includes("#") ? spatialRefResolves(reference) : packagePathResolves(reference);
  return registries[kind]?.has(reference) || false;
}

function extract(documentPath) {
  const source = fs.readFileSync(path.join(packageRoot, documentPath), "utf8");
  const matches = [...source.matchAll(/\[(metric|source|data|depth|standard):([^\]]+)\]/g)]
    .map((match) => ({ kind: match[1], reference: match[2], document: documentPath }));
  return { document: documentPath, total: matches.length, unique: new Set(matches.map((item) => `${item.kind}:${item.reference}`)).size, matches };
}

const documents = [extract("proposal.md"), extract("proposal.en.md")];
const matches = documents.flatMap((document) => document.matches);
const unresolved = matches.filter((item) => !resolves(item.kind, item.reference));
const byKind = Object.fromEntries(["metric", "source", "data", "depth", "standard"].map((kind) => {
  const entries = matches.filter((item) => item.kind === kind);
  const unique = new Set(entries.map((item) => item.reference));
  const missing = [...unique].filter((reference) => !resolves(kind, reference));
  return [kind, { total: entries.length, unique: unique.size, resolved: unique.size - missing.length, unresolved: missing }];
}));
const negativeSamples = [
  { id: "unknown-metric", reference: "metric:NOT-IN-METRICS", pass: !resolves("metric", "NOT-IN-METRICS") },
  { id: "unknown-spatial-feature", reference: "data:geometry/site_boundary.geojson#NOT-IN-GEOJSON", pass: !resolves("data", "geometry/site_boundary.geojson#NOT-IN-GEOJSON") },
  { id: "unknown-depth", reference: "depth:NOT-IN-REGISTERED-DEPTH", pass: !resolves("depth", "NOT-IN-REGISTERED-DEPTH") }
];

const result = {
  runner: "run-human-city-reference-audit.js",
  status: unresolved.length === 0 && negativeSamples.every((sample) => sample.pass) ? "PASS" : "FAIL",
  claim_level: "offline_inline_reference_resolution_only",
  network_calls: 0,
  documents: documents.map(({ document, total, unique }) => ({ document, total, unique })),
  references_total: matches.length,
  references_unique: new Set(matches.map((item) => `${item.kind}:${item.reference}`)).size,
  by_kind: byKind,
  unresolved,
  negative_samples: negativeSamples,
  scope_note: "Resolves only package-local metric/source/data/depth/standard markers; depth accepts design-depth item IDs and explicitly registered reviewer-dimension IDs. It does not verify the truth of a claim, the authority of a source, or field/operational performance."
};

fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
if (process.argv.includes("--check") && result.status !== "PASS") process.exit(1);
