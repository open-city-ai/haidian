#!/usr/bin/env node
/*
 * check_osm.js — recompute the site cross-check from the geometry, not from prose.
 *
 *     node visual/assets/check_osm.js        (run from the submission directory)
 *
 * The 412.5 m in this proposal is its loudest number: two independent routes to
 * the same object — a boundary inferred from the announcement's 四至 text, and a
 * park somebody actually surveyed and put in OpenStreetMap — do not close, and
 * the size of the gap is the finding. The package cited that number about eight
 * times while shipping only the answer. `osm_reference.json` carried derived
 * scalars, no coordinates and no script; the generator lives in `analysis/`,
 * which is not in the package. So the single number this submission leans on
 * hardest was the one number in it a reviewer could not check.
 *
 * That is precisely the defect this package spends its length reporting in
 * other people's work. This file closes it. `osm_reference.json` now ships the
 * OSM way geometry and the two provisional rings the readings come from, and
 * this script re-projects them into EPSG:4548 itself and recomputes every
 * scalar in that file — the park area, the rail length and the segment count,
 * both coverage figures, both nearest distances, the length of rail inside the
 * provisional boundary, and the 1,116.7 m from this proposal's own spine to the
 * surveyed park, which is the reading that counts against it.
 *
 * Zero dependencies, no network, no Python, no trust in the author's toolchain.
 * Exit 0 = every scalar reproduced. 1 = at least one did not; do not cite it.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const ROOT = path.resolve(HERE, '..', '..');
const REF = path.join(HERE, 'osm_reference.json');

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (err) {
    console.error(`cannot read ${p}: ${err.message}`);
    process.exit(2);
  }
}

const ref = readJson(REF);

/* ---- EPSG:4548 forward projection ---------------------------------------
 * CGCS2000 / 3-degree Gauss-Kruger CM 117E. Transverse Mercator, k0 = 1,
 * lat0 = 0, false easting 500000. Ellipsoid CGCS2000: a = 6378137,
 * 1/f = 298.257222101. Re-implemented here rather than imported, for the same
 * reason verify.js re-implements it: a check that depends on the toolchain it
 * is checking proves nothing. The two implementations are deliberately
 * identical in form, so agreeing with each other is not the claim — agreeing
 * with the shipped scalars is.
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

const projectPath = (coords) => coords.map(([lon, lat]) => project(lon, lat));

/* ---- planar primitives ---------------------------------------------------
 * Everything below works on projected metres. Shapely does all of this with
 * one method call each; written out, it is about a hundred lines, and a
 * hundred lines a reviewer can read beats a library they must install.
 */
function ringArea(ring) {
  let s = 0;
  for (let i = 0, n = ring.length - 1; i < n; i++) {
    s += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  return Math.abs(s / 2);
}

function pathLength(pts) {
  let d = 0;
  for (let i = 1; i < pts.length; i++) d += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return d;
}

// Ray casting. The ring is closed, so the last vertex repeats the first.
function pointInRing([px, py], ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 2; i < ring.length - 1; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

const cross = (ox, oy, ax, ay, bx, by) => (ax - ox) * (by - oy) - (ay - oy) * (bx - ox);

function onSegment(p, q, r) {
  return (
    Math.min(p[0], r[0]) - 1e-9 <= q[0] &&
    q[0] <= Math.max(p[0], r[0]) + 1e-9 &&
    Math.min(p[1], r[1]) - 1e-9 <= q[1] &&
    q[1] <= Math.max(p[1], r[1]) + 1e-9
  );
}

// Touching counts as intersecting: for the disjointness test below, a shared
// boundary point is not disjoint, and calling it disjoint would silently turn a
// contact into a positive distance.
function segmentsIntersect(p1, p2, q1, q2) {
  const d1 = cross(q1[0], q1[1], q2[0], q2[1], p1[0], p1[1]);
  const d2 = cross(q1[0], q1[1], q2[0], q2[1], p2[0], p2[1]);
  const d3 = cross(p1[0], p1[1], p2[0], p2[1], q1[0], q1[1]);
  const d4 = cross(p1[0], p1[1], p2[0], p2[1], q2[0], q2[1]);
  if (((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0)) && d1 !== 0 && d2 !== 0 && d3 !== 0 && d4 !== 0) {
    return true;
  }
  if (d1 === 0 && onSegment(q1, p1, q2)) return true;
  if (d2 === 0 && onSegment(q1, p2, q2)) return true;
  if (d3 === 0 && onSegment(p1, q1, p2)) return true;
  if (d4 === 0 && onSegment(p1, q2, p2)) return true;
  return false;
}

function pointSegDist([px, py], [ax, ay], [bx, by]) {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

function segSegDist(a, b, c, d) {
  if (segmentsIntersect(a, b, c, d)) return 0;
  return Math.min(pointSegDist(a, c, d), pointSegDist(b, c, d), pointSegDist(c, a, b), pointSegDist(d, a, b));
}

const segmentsOf = (pts) => pts.slice(0, -1).map((p, i) => [p, pts[i + 1]]);

function pathDistance(ptsA, ptsB) {
  let best = Infinity;
  for (const [a, b] of segmentsOf(ptsA)) {
    for (const [c, d] of segmentsOf(ptsB)) {
      const v = segSegDist(a, b, c, d);
      if (v < best) best = v;
      if (best === 0) return 0;
    }
  }
  return best;
}

/* Two simple rings can stand in one of four relations, and the intersection
 * area follows from which one it is. General polygon clipping is not
 * implemented — it is several hundred lines and easy to get subtly wrong. If
 * the rings ever start crossing, this script says so and fails, rather than
 * returning a plausible-looking number nobody can check. Refusing is the
 * behaviour this package argues for everywhere else.
 */
function ringRelation(a, b) {
  for (const [p1, p2] of segmentsOf(a)) {
    for (const [q1, q2] of segmentsOf(b)) {
      if (segmentsIntersect(p1, p2, q1, q2)) return 'crossing';
    }
  }
  if (pointInRing(a[0], b)) return 'a_within_b';
  if (pointInRing(b[0], a)) return 'b_within_a';
  return 'disjoint';
}

// Length of a polyline falling inside a ring: split every segment at each
// boundary crossing, then keep the pieces whose midpoint is inside. Works for
// concave rings, which matters — PROV-SITE-001 is not convex.
function lengthInsideRing(pts, ring) {
  let total = 0;
  for (const [p, q] of segmentsOf(pts)) {
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    const ts = [0, 1];
    for (const [r, s] of segmentsOf(ring)) {
      const rx = s[0] - r[0];
      const ry = s[1] - r[1];
      const den = dx * ry - dy * rx;
      if (den === 0) continue; // parallel: a crossing here has zero measure
      const t = ((r[0] - p[0]) * ry - (r[1] - p[1]) * rx) / den;
      const u = ((r[0] - p[0]) * dy - (r[1] - p[1]) * dx) / den;
      if (t > 0 && t < 1 && u >= 0 && u <= 1) ts.push(t);
    }
    ts.sort((x, y) => x - y);
    for (let i = 1; i < ts.length; i++) {
      const mid = [p[0] + dx * (ts[i] + ts[i - 1]) / 2, p[1] + dy * (ts[i] + ts[i - 1]) / 2];
      if (pointInRing(mid, ring)) total += Math.hypot(dx, dy) * (ts[i] - ts[i - 1]);
    }
  }
  return total;
}

/* ---- load the shipped geometry ------------------------------------------ */
const geom = ref.geometry;
if (!geom || !Array.isArray(geom.osm_park) || !geom.osm_park.length) {
  console.error(
    'osm_reference.json carries no geometry block. Every number in it is then ' +
      'unrecomputable, which is the condition this script exists to prevent.',
  );
  process.exit(2);
}

const parkRings = geom.osm_park.map((w) => projectPath(w.ring));
const parkAreas = parkRings.map(ringArea);

const sel = ref.recompute.rail_selection;
const railWays = geom.osm_rail_query_result.filter(
  (w) => sel.values.includes((w.tags || {})[sel.tag]) && w.line.length >= sel.min_vertices,
);
const railPaths = railWays.map((w) => projectPath(w.line));

const provById = Object.fromEntries(geom.provisional_boundaries.map((b) => [b.id, b]));
const siteRing = projectPath(provById['PROV-SITE-001'].ring);
const researchRing = projectPath(provById['PROV-RESEARCH-001'].ring);

// The spine is already in the package. Reading it from geometry/roads.geojson
// rather than from a copy inside osm_reference.json means the two cannot drift:
// if the spine moves, this number moves with it or this check fails.
const spineFeature = readJson(path.join(ROOT, 'geometry', 'roads.geojson')).features.find(
  (f) => f.properties.id === 'ROAD-001',
);
const spinePath = projectPath(spineFeature.geometry.coordinates);

/* ---- the union assumptions, verified rather than assumed -----------------
 * The generator unions the park polygons and unions the rail lines. Summing is
 * only the same thing when the parts do not overlap, so summing without saying
 * so would quietly under-report an overlap as extra area or extra length. Both
 * conditions are asserted here, before the sums are used.
 */
const structural = [];
const check = (claim, ok, detail) => structural.push({ claim, result: ok ? 'PASS' : 'FAIL', detail: String(detail) });

let parkDisjoint = true;
for (let i = 0; i < parkRings.length; i++) {
  for (let j = i + 1; j < parkRings.length; j++) {
    if (ringRelation(parkRings[i], parkRings[j]) !== 'disjoint') parkDisjoint = false;
  }
}
check(
  'the park polygons are mutually disjoint, so their union area is their sum',
  parkDisjoint,
  `${parkRings.length} way(s): ${parkAreas.map((a) => (a / 1e4).toFixed(3) + ' ha').join(' + ')}`,
);

// Collinear overlap is the only way two distinct rail ways can share length
// without crossing, and it is exactly what unary_union would collapse.
let overlapping = 0;
const allRailSegs = railPaths.flatMap(segmentsOf);
for (let i = 0; i < allRailSegs.length; i++) {
  const [p, q] = allRailSegs[i];
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const len = Math.hypot(dx, dy);
  if (len === 0) continue;
  for (let j = i + 1; j < allRailSegs.length; j++) {
    const [r, s] = allRailSegs[j];
    if (pointSegDist(r, p, q) > 1e-6 || pointSegDist(s, p, q) > 1e-6) continue;
    const tr = ((r[0] - p[0]) * dx + (r[1] - p[1]) * dy) / (len * len);
    const ts = ((s[0] - p[0]) * dx + (s[1] - p[1]) * dy) / (len * len);
    const lo = Math.max(0, Math.min(tr, ts));
    const hi = Math.min(1, Math.max(tr, ts));
    if ((hi - lo) * len > 1e-6) overlapping++;
  }
}
check(
  'no two disused-rail segments overlap, so their union length is their sum',
  overlapping === 0,
  `${allRailSegs.length} segments, ${overlapping} overlapping pair(s)`,
);

/* ---- park against each provisional boundary ------------------------------ */
function parkAgainst(ring) {
  let interArea = 0;
  let distance = Infinity;
  const relations = [];
  for (let i = 0; i < parkRings.length; i++) {
    const rel = ringRelation(parkRings[i], ring);
    relations.push(rel);
    if (rel === 'a_within_b') {
      interArea += parkAreas[i];
      distance = 0;
    } else if (rel === 'b_within_a') {
      interArea += ringArea(ring);
      distance = 0;
    } else if (rel === 'crossing') {
      interArea = NaN; // general clipping is not implemented; see ringRelation
      distance = 0;
    } else {
      distance = Math.min(distance, pathDistance(parkRings[i], ring));
    }
  }
  return { interArea, distance, relations };
}

const vsSite = parkAgainst(siteRing);
const vsResearch = parkAgainst(researchRing);
check(
  'the park/boundary relations are ones this script can compute exactly',
  !Number.isNaN(vsSite.interArea) && !Number.isNaN(vsResearch.interArea),
  `site: ${vsSite.relations.join(', ')} · research: ${vsResearch.relations.join(', ')}`,
);

const parkArea = parkAreas.reduce((a, b) => a + b, 0);
const railLength = railPaths.reduce((a, p) => a + pathLength(p), 0);
const railInsideSite = railPaths.reduce((a, p) => a + lengthInsideRing(p, siteRing), 0);

const spineToPark = parkRings.reduce((best, r) => {
  if (spinePath.some((pt) => pointInRing(pt, r))) return 0;
  return Math.min(best, pathDistance(spinePath, r));
}, Infinity);

/* ---- recompute against every declared scalar ----------------------------
 * The declared values are rounded, so the honest tolerance is half a unit in
 * the last published place — not an arbitrary epsilon, and not a relative
 * tolerance that would let 412.5 drift to 413. The raw recomputation is
 * printed beside it so a reader can see how much room was actually used.
 */
const at = (dotted) => dotted.split('.').reduce((o, k) => o[k], ref);
const rows = [];
let failed = structural.filter((s) => s.result === 'FAIL').length;

const compare = (key, value, dp) => {
  const declared = at(key);
  const tol = 0.5 * 10 ** -dp;
  const diff = Math.abs(value - declared);
  const ok = diff <= tol * (1 + 1e-9);
  if (!ok) failed++;
  rows.push({
    scalar: key,
    declared,
    recomputed: Number(value.toFixed(Math.max(dp, 4))),
    rounded: Number(value.toFixed(dp)),
    'diff': Number(diff.toPrecision(3)),
    'tol (½ ulp)': tol,
    result: ok ? 'PASS' : 'FAIL',
  });
};

compare('osm_park_area_ha', parkArea / 1e4, 2);
compare('osm_disused_rail_segments', railWays.length, 0);
compare('osm_disused_rail_length_m', railLength, 1);
compare('park_vs_provisional_site.intersection_ha', vsSite.interArea / 1e4, 3);
compare('park_vs_provisional_site.coverage_pct', (vsSite.interArea / parkArea) * 100, 2);
compare('park_vs_provisional_site.nearest_distance_m', vsSite.distance, 1);
compare('park_vs_provisional_research.coverage_pct', (vsResearch.interArea / parkArea) * 100, 2);
compare('park_vs_provisional_research.nearest_distance_m', vsResearch.distance, 1);
compare('rail_inside_provisional_site_m', railInsideSite, 1);
compare('submitted_spine_to_park_m', spineToPark, 1);

/* ---- claims about the file itself ---------------------------------------
 * ODbL is not decoration. The file now redistributes extracted OSM
 * coordinates, so attribution and the share-alike licence have to be present
 * in the file that carries them, and the grading has to stay background_only:
 * a crowd-sourced reading that locates an uncertainty is not a boundary.
 */
check('OSM attribution travels with the geometry', /OpenStreetMap contributors/.test(ref.attribution || ''), ref.attribution);
check('the geometry is licensed ODbL 1.0', ref.license === 'ODbL 1.0', `${ref.license} — ${ref.license_note || 'no note'}`);
check('the reading stays graded background_only', ref.evidence_class === 'background_only', String(ref.evidence_class));
check(
  'both provisional rings are still labelled unofficial',
  geom.provisional_boundaries.every((b) => b.official_boundary === false),
  geom.provisional_boundaries.map((b) => `${b.id}=${b.official_boundary}`).join(', '),
);

// A geometry block that had been simplified would put an unstated error into
// every distance above. It is not simplified, and the file has to keep saying so.
check(
  'geometry is shipped unsimplified at the precision Overpass returned',
  /^none\b/.test(geom.simplification || '') && /tolerance 0\s*m/.test(geom.simplification || '') &&
    geom.decimal_places === 7,
  `${geom.vertex_count} vertices, ${geom.decimal_places} dp, simplification: ${geom.simplification}`,
);

// The projection declared in the data and the projection implemented here must
// be the same one, or the table above compares two different maps.
const p = ref.recompute.projection;
check(
  'the declared projection is the one this script implements',
  p.epsg === 4548 && p.ellipsoid_a === A && p.inverse_flattening === 1 / F && p.central_meridian_deg === 117 &&
    p.scale_factor === K0 && p.false_easting === FE,
  `EPSG:${p.epsg} ${p.name}`,
);

/* ---- report -------------------------------------------------------------- */
console.log('Site cross-check, recomputed from the shipped geometry');
console.log(`  data      ${path.relative(process.cwd(), REF)}`);
console.log(`  spine     ${path.relative(process.cwd(), path.join(ROOT, 'geometry/roads.geojson'))}#ROAD-001`);
console.log(`  source    ${ref.source}, retrieved ${ref.retrieved} — ${ref.attribution}, ${ref.license}`);
console.log(`  geometry  ${geom.osm_park.length} park way(s), ${railWays.length} of ` +
            `${geom.osm_rail_query_result.length} rail ways selected by ${sel.tag} in {${sel.values.join(', ')}}, ` +
            `2 provisional rings, ${geom.vertex_count} vertices, no simplification`);
console.log('  projection re-implemented in this file (EPSG:4548), no dependencies\n');
console.table(rows);

console.log('\nAssumptions the numbers rest on, asserted rather than described');
console.table(structural);

// The headline reading, spelled out. It is cited about eight times in the two
// proposal editions, and this is the only place it is derived.
console.log('\nThe closure that does not close');
console.log(`  route A   PROV-SITE-001, inferred from the announcement's 四至 text ` +
            `(${(ringArea(siteRing) / 1e6).toFixed(1)} km2, official_boundary=false)`);
console.log(`  route B   京张铁路遗址公园 as surveyed in OSM (${(parkArea / 1e4).toFixed(2)} ha, ` +
            `${geom.osm_park.map((w) => `${w.osm_type}/${w.osm_id}`).join(' + ')})`);
console.log(`  overlap   ${(vsSite.interArea / 1e4).toFixed(3)} ha — the two do not meet at all`);
console.log(`  gap       ${vsSite.distance.toFixed(1)} m between the nearest points`);
console.log(`  and       this proposal's own spine sits ${spineToPark.toFixed(1)} m from the same park`);
console.log('  neither route is adjudicated here. The official polygon settles it; until then the gap is the fact.\n');

console.log(
  failed === 0
    ? 'Every scalar in osm_reference.json reproduced from the geometry beside it.'
    : `${failed} claim(s) did NOT reproduce — do not cite them.`,
);
process.exit(failed === 0 ? 0 : 1);
