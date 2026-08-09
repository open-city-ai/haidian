#!/usr/bin/env node
/*
 * Independent recomputation of this submission's class-1 metrics.
 *
 *     node visual/assets/verify.js        (run from the submission directory)
 *
 * The proposal claims that a number nobody can recompute is not evidence. This
 * file is that claim made testable by a reviewer with nothing but Node and the
 * files in this package: no network, no dependencies, no Python, no trust in
 * the author's toolchain. It re-projects the submitted GeoJSON into
 * EPSG:4548 itself, recomputes every metric marked `known`, and compares.
 *
 * Exit code 0 = every metric reproduced within tolerance. 1 = a mismatch.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const read = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));

/* ---- EPSG:4548 forward projection ---------------------------------------
 * CGCS2000 / 3-degree Gauss-Kruger CM 117E. Transverse Mercator, k0 = 1,
 * lat0 = 0, false easting 500000. Ellipsoid CGCS2000: a = 6378137,
 * 1/f = 298.257222101. Standard series expansion, metre accuracy is far
 * beyond what provisional boundaries justify.
 */
const A = 6378137.0;
const F = 1 / 298.257222101;
const E2 = 2 * F - F * F;
const LON0 = (117 * Math.PI) / 180;
const K0 = 1.0;
const FE = 500000.0;

function project(lon, lat) {
  const phi = (lat * Math.PI) / 180;
  const lam = (lon * Math.PI) / 180;
  const ep2 = E2 / (1 - E2);
  const N = A / Math.sqrt(1 - E2 * Math.sin(phi) ** 2);
  const T = Math.tan(phi) ** 2;
  const C = ep2 * Math.cos(phi) ** 2;
  const Ad = (lam - LON0) * Math.cos(phi);

  const e2 = E2;
  const M =
    A *
    ((1 - e2 / 4 - (3 * e2 ** 2) / 64 - (5 * e2 ** 3) / 256) * phi -
      ((3 * e2) / 8 + (3 * e2 ** 2) / 32 + (45 * e2 ** 3) / 1024) * Math.sin(2 * phi) +
      ((15 * e2 ** 2) / 256 + (45 * e2 ** 3) / 1024) * Math.sin(4 * phi) -
      ((35 * e2 ** 3) / 3072) * Math.sin(6 * phi));

  const x =
    K0 *
      N *
      (Ad +
        ((1 - T + C) * Ad ** 3) / 6 +
        ((5 - 18 * T + T * T + 72 * C - 58 * ep2) * Ad ** 5) / 120) +
    FE;
  const y =
    K0 *
    (M +
      N *
        Math.tan(phi) *
        ((Ad * Ad) / 2 +
          ((5 - T + 9 * C + 4 * C * C) * Ad ** 4) / 24 +
          ((61 - 58 * T + T * T + 600 * C - 330 * ep2) * Ad ** 6) / 720));
  return [x, y];
}

/* ---- planar geometry ---------------------------------------------------- */
function ringArea(ring) {
  // Shoelace on projected coordinates; sign gives orientation.
  let s = 0;
  for (let i = 0, n = ring.length; i < n; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % n];
    s += x1 * y2 - x2 * y1;
  }
  return s / 2;
}

function polygonArea(rings) {
  // First ring is the exterior, the rest are holes.
  return rings.reduce(
    (acc, ring, i) => acc + (i === 0 ? Math.abs(ringArea(ring)) : -Math.abs(ringArea(ring))),
    0,
  );
}

function projectRing(ring) {
  return ring.map(([lon, lat]) => project(lon, lat));
}

function geomArea(geom) {
  if (geom.type === 'Polygon') return polygonArea(geom.coordinates.map(projectRing));
  if (geom.type === 'MultiPolygon')
    return geom.coordinates.reduce((a, poly) => a + polygonArea(poly.map(projectRing)), 0);
  return 0;
}

function geomLength(geom) {
  const line = (coords) => {
    const p = projectRing(coords);
    let d = 0;
    for (let i = 1; i < p.length; i++)
      d += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]);
    return d;
  };
  if (geom.type === 'LineString') return line(geom.coordinates);
  if (geom.type === 'MultiLineString') return geom.coordinates.reduce((a, c) => a + line(c), 0);
  return 0;
}

const layerArea = (file) =>
  read(`geometry/${file}`).features.reduce((a, f) => a + geomArea(f.geometry), 0);

/* ---- recompute and compare --------------------------------------------- */
const metrics = read('metrics.json').metrics;

const site = layerArea('site_boundary.geojson');
const spine = (() => {
  const f = read('geometry/roads.geojson').features.find((x) => x.properties.id === 'ROAD-001');
  return f ? geomLength(f.geometry) : 0;
})();
const publicFeatures = read('geometry/public_space.geojson').features;

const computed = {
  site_area_sqm: site,
  green_ratio: layerArea('green_space.geojson') / site,
  public_space_ratio: publicFeatures.reduce((a, f) => a + geomArea(f.geometry), 0) / site,
  building_footprint_area_sqm: layerArea('buildings.geojson'),
  key_area_count: read('geometry/key_areas.geojson').features.length,
  leveling_spine_length_m: spine,
  benchmark_count: publicFeatures.filter((f) => f.properties.benchmark_id).length,
};

// Areas are compared with a relative tolerance: this file re-implements the
// projection independently, so agreement to 1e-4 is the meaningful claim, not
// bit-identity with the authoring toolchain.
const TOL = { ratio: 1e-4, relative: 1e-4, exact: 0 };
const kind = (name) =>
  name.endsWith('_count') ? 'exact' : name.endsWith('_ratio') ? 'ratio' : 'relative';

let failed = 0;
const rows = [];
for (const [name, value] of Object.entries(computed)) {
  const declared = metrics[name];
  if (!declared || declared.status !== 'known') continue;
  const expected = declared.value;
  const k = kind(name);
  const diff = Math.abs(value - expected);
  const ok = k === 'exact' ? diff === 0 : diff <= Math.max(Math.abs(expected) * TOL[k], 1e-9);
  if (!ok) failed++;
  rows.push({
    metric: name,
    declared: expected,
    recomputed: k === 'exact' ? value : Number(value.toFixed(6)),
    'rel.diff': k === 'exact' ? (diff === 0 ? '0' : String(diff)) : (diff / Math.abs(expected || 1)).toExponential(2),
    result: ok ? 'PASS' : 'FAIL',
  });
}

console.log('Independent recomputation of class-1 metrics');
console.log('  projection re-implemented in this file (EPSG:4548), no dependencies\n');
console.table(rows);

// Structural claims the proposal makes about the geometry, checked here too.
const seam = publicFeatures.filter((f) => f.properties.is_seam_point).length;
const withJur = publicFeatures.filter(
  (f) => (f.properties.jurisdictions || []).length > 0,
).length;
console.log(`\nbenchmarks declaring a jurisdiction: ${withJur}/${publicFeatures.length}`);
console.log(`benchmarks crossing a jurisdictional boundary: ${seam}/${publicFeatures.length}`);

const provisional = read('geometry/site_boundary.geojson').features.every(
  (f) => f.properties.official_boundary === false,
);
console.log(`site boundary labelled provisional (official_boundary=false): ${provisional}`);

console.log(
  failed === 0
    ? '\nAll class-1 metrics reproduced independently.'
    : `\n${failed} metric(s) did NOT reproduce — do not cite them.`,
);
process.exit(failed === 0 ? 0 : 1);
