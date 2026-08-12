#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const packageRoot = path.resolve(__dirname, "..", "..");
const registerPath = path.join(__dirname, "spatial-lineage-register.json");
const manifestPath = path.join(packageRoot, "manifest.json");
const metricsPath = path.join(packageRoot, "metrics.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function sorted(values) {
  return [...new Set(values)].sort();
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function fail(message) {
  throw new Error(message);
}

function check() {
  const register = readJson(registerPath);
  const manifest = readJson(manifestPath);
  const metrics = readJson(metricsPath);
  const manifestByPath = new Map(
    (manifest.files || []).map((item) => [item.path, item])
  );
  const geometryDir = path.join(packageRoot, "geometry");
  const actualNames = fs.readdirSync(geometryDir)
    .filter((name) => name.endsWith(".geojson"))
    .sort();
  const registered = (register.layers || []).map((item) => item.path).sort();
  if (!sameJson(actualNames.map((name) => `geometry/${name}`), registered)) {
    fail(`geometry coverage mismatch: files=${actualNames.join(",")} register=${registered.join(",")}`);
  }
  if (register.declared_recalculation_crs !== "EPSG:4548") {
    fail("declared_recalculation_crs must remain EPSG:4548");
  }
  if (!JSON.stringify(metrics).includes(register.declared_recalculation_crs)) {
    fail("metrics.json does not contain the declared recalculation CRS reference");
  }
  const checks = [];
  for (const item of register.layers) {
    const absolute = path.join(packageRoot, item.path);
    if (!fs.existsSync(absolute)) fail(`missing geometry: ${item.path}`);
    const geojson = readJson(absolute);
    const features = Array.isArray(geojson.features) ? geojson.features : [];
    const layerValues = sorted(features.map((feature) => String(feature.properties?.layer || "")));
    const roleValues = sorted(features.map((feature) => String(feature.properties?.geometry_role || "")));
    const officialValues = sorted(features
      .filter((feature) => Object.prototype.hasOwnProperty.call(feature.properties || {}, "official_boundary"))
      .map((feature) => String(feature.properties.official_boundary)));
    const geometryTypes = sorted(features.map((feature) => String(feature.geometry?.type || "")));
    const actualSha = sha256(absolute);
    const manifestItem = manifestByPath.get(item.path);
    if (!manifestItem || manifestItem.sha256 !== actualSha) {
      fail(`manifest SHA mismatch: ${item.path}`);
    }
    if (actualSha !== item.sha256) fail(`register SHA mismatch: ${item.path}`);
    if (features.length !== item.feature_count) fail(`feature count mismatch: ${item.path}`);
    if (!sameJson(layerValues, sorted(item.layer_values))) fail(`layer value mismatch: ${item.path}`);
    if (!sameJson(roleValues, sorted(item.geometry_roles))) fail(`geometry role mismatch: ${item.path}`);
    if (!sameJson(officialValues, sorted(item.official_boundary_values))) fail(`official boundary mismatch: ${item.path}`);
    if (!sameJson(geometryTypes, sorted(item.geometry_types))) fail(`geometry type mismatch: ${item.path}`);
    if (Object.prototype.hasOwnProperty.call(geojson, "crs")) {
      fail(`current GeoJSON unexpectedly embeds CRS metadata: ${item.path}`);
    }
    checks.push({
      path: item.path,
      feature_count: features.length,
      geometry_types: geometryTypes,
      sha256: actualSha,
      embedded_crs: false,
      pass: true
    });
  }
  return {
    ok: true,
    register_id: register.register_id,
    geometry_layer_count: checks.length,
    declared_recalculation_crs: register.declared_recalculation_crs,
    embedded_crs_policy: "absent_in_current_geojson",
    checks
  };
}

const result = check();
if (process.argv.includes("--json")) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else {
  process.stdout.write(`PASS: ${result.geometry_layer_count} geometry layers, ${result.declared_recalculation_crs} formula reference, no embedded CRS claims\n`);
}
