#!/usr/bin/env node
/*
 * verify_covenants.js — third-party verification for the
 * jingzhang-decommissioning-line submission. Zero dependencies.
 *
 * Run from the submission root:
 *   node visual/assets/verify_covenants.js
 *
 * Recomputes, from the submitted GeoJSON alone:
 *   1. covenant field completeness on all lifecycle nodes (the proposal's
 *      own admission rule applied to its own features);
 *   2. lifecycle node / station plaza / suture counts;
 *   3. polygon areas via a local equal-area projection, compared against
 *      each feature's area_sqm_declared and against metrics.json;
 *   4. land-use partition closure: sum(land_use areas) vs site area;
 *   5. the suture max-gap reading, including the UNFAVORABLE result the
 *      proposal itself reports (max gap ~1.55 km > its own 800 m standard).
 *
 * Every assertion is two-sided: a count that is too high fails just like
 * one that is too low. If any check fails, that is a defect of the
 * proposal, not of this script.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const load = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));

// Local equal-area projection (sinusoidal about site mid-latitude).
// Adequate for a ~1.3 x 9.7 km extent: relative area error << 0.3% vs
// EPSG:4548, which is inside every tolerance used below.
const R = 6378137.0, LAT0 = 39.98 * Math.PI / 180;
function ringArea(ring) {
  let a = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const [lon1, lat1] = ring[i], [lon2, lat2] = ring[i + 1];
    const x1 = R * (lon1 * Math.PI / 180) * Math.cos(lat1 * Math.PI / 180);
    const y1 = R * (lat1 * Math.PI / 180);
    const x2 = R * (lon2 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180);
    const y2 = R * (lat2 * Math.PI / 180);
    a += x1 * y2 - x2 * y1;
  }
  return Math.abs(a / 2);
}
function polyArea(geom) {
  if (geom.type === 'Polygon') {
    return geom.coordinates.reduce((s, ring, i) => s + (i === 0 ? 1 : -1) * ringArea(ring), 0);
  }
  if (geom.type === 'MultiPolygon') {
    return geom.coordinates.reduce((s, poly) =>
      s + poly.reduce((t, ring, i) => t + (i === 0 ? 1 : -1) * ringArea(ring), 0), 0);
  }
  return 0;
}

let failures = 0;
function check(name, ok, detail) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures++;
}
function near(a, b, relTol) { return Math.abs(a - b) <= relTol * Math.max(Math.abs(b), 1); }

const site = load('geometry/site_boundary.geojson');
const landUse = load('geometry/land_use.geojson');
const pub = load('geometry/public_space.geojson');
const roads = load('geometry/roads.geojson');
const metrics = load('metrics.json').metrics;

// --- 1. covenant completeness (two-sided) ---
const REQUIRED_FIELDS = ['install_date', 'decommission_by', 'removal_custodian',
  'deposit_status', 'restoration_standard'];
const nodes = pub.features.filter(f => f.properties.node_role === 'lifecycle_node');
const complete = nodes.filter(f => {
  const s = f.properties.covenant_schema || {};
  return REQUIRED_FIELDS.every(k => s[k] === 'required');
});
check('lifecycle nodes carry all 5 covenant fields',
  nodes.length === 12 && complete.length === 12,
  `${complete.length}/${nodes.length} complete (expected exactly 12/12)`);
check('metrics.covenant_field_completeness_ratio matches',
  near(complete.length / nodes.length, metrics.covenant_field_completeness_ratio.value, 1e-9),
  `recomputed ${complete.length / nodes.length}`);

// --- 2. counts (two-sided) ---
const plazas = pub.features.filter(f => f.properties.node_role === 'station_plaza');
check('station plazas == 3', plazas.length === 3, `found ${plazas.length}`);
const sutures = roads.features.filter(f => (f.properties.label_zh || '').includes('缝合口'));
check('sutures == 8', sutures.length === 8, `found ${sutures.length}`);
check('metrics.lifecycle_node_count matches', metrics.lifecycle_node_count.value === nodes.length);
check('metrics.suture_count matches', metrics.suture_count.value === sutures.length);

// --- 3. areas vs declared and vs metrics ---
const siteFeat = site.features[0];
const siteArea = polyArea(siteFeat.geometry);
check('site area ≈ declared', near(siteArea, siteFeat.properties.area_sqm_declared, 0.003),
  `recomputed ${(siteArea / 1e6).toFixed(3)} km² vs declared ${(siteFeat.properties.area_sqm_declared / 1e6).toFixed(3)} km²`);
check('site area ≈ metrics.site_area_sqm', near(siteArea, metrics.site_area_sqm.value, 0.003));

let declMismatch = 0;
for (const f of landUse.features) {
  const a = polyArea(f.geometry);
  if (!near(a, f.properties.area_sqm_declared, 0.005)) declMismatch++;
}
check('every land-use polygon area ≈ its declared value', declMismatch === 0,
  `${declMismatch} mismatches of ${landUse.features.length}`);

// --- 4. partition closure ---
const luSum = landUse.features.reduce((s, f) => s + polyArea(f.geometry), 0);
check('sum(land_use) ≈ site area (no gaps, no overlaps)', near(luSum, siteArea, 0.001),
  `sum ${(luSum / 1e6).toFixed(4)} km² vs site ${(siteArea / 1e6).toFixed(4)} km²`);

// --- 5. suture gap reading (expects the proposal's unfavorable result) ---
const lats = sutures.map(f => {
  const c = f.geometry.type === 'LineString' ? f.geometry.coordinates : f.geometry.coordinates[0];
  return c[0][1];
}).sort((a, b) => a - b);
let maxGap = 0;
for (let i = 1; i < lats.length; i++) {
  maxGap = Math.max(maxGap, (lats[i] - lats[i - 1]) * Math.PI / 180 * R);
}
console.log(`INFO  max suture gap = ${(maxGap / 1000).toFixed(2)} km (proposal's own standard: <= 0.8 km)`);
check('proposal honestly reports its suture-gap shortfall (gap > 800 m must be true, ~1.55 km)',
  maxGap > 800 && near(maxGap, 1550, 0.05),
  `if this fails, the prose in chapter 9 no longer matches the geometry`);

console.log(failures === 0
  ? '\nALL CHECKS PASSED — figures in proposal.md are reproducible from the submitted geometry.'
  : `\n${failures} CHECK(S) FAILED — treat as defects of the proposal.`);
process.exit(failures === 0 ? 0 : 1);
