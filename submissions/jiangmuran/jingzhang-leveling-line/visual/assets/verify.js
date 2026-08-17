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

const fabric = read('visual/assets/osm_fabric.json');
const computed = {
  site_area_sqm: site,
  green_ratio: layerArea('green_space.geojson') / site,
  // Two layers describe the same corridor and give different areas, because
  // the partition assigns the part inside the key areas to their dominant use.
  // Both are published, so both are recomputed here — a second number that
  // only the author can check is the thing this package argues against.
  green_ratio_in_partition: read('geometry/land_use.geojson').features
    .filter((f) => String(f.properties.land_use_code) === '1401')
    .reduce((a, f) => a + geomArea(f.geometry), 0) / site,
  public_space_ratio: publicFeatures.reduce((a, f) => a + geomArea(f.geometry), 0) / site,
  building_footprint_area_sqm: layerArea('buildings.geojson'),
  // The phases are disjoint increments, so the plain sum of their areas is
  // their union. A summed layer area that did not equal the published union
  // would mean the phases had started overlapping again.
  phasing_union_area_sqm: layerArea('phasing.geojson'),
  key_area_count: read('geometry/key_areas.geojson').features.length,
  leveling_spine_length_m: spine,
  benchmark_count: publicFeatures.filter((f) => f.properties.benchmark_id).length,

  // These eight are as recomputable from the shipped layers as the nine above,
  // and were outside this table because "class 1" was a category the prose
  // described and no file carried. An independent verifier that checks the
  // metrics someone remembered to list is checking the list, not the metrics.
  // `metric_class` is a field in metrics.json now, and structural claim 17
  // below asserts this table covers every metric that carries class 1.
  land_use_feature_count: read('geometry/land_use.geojson').features.length,
  road_feature_count: read('geometry/roads.geojson').features.length,
  phase_count: read('geometry/phasing.geojson').features.length,
  land_use_class_count: new Set(
    read('geometry/land_use.geojson').features.map((f) => String(f.properties.land_use_code)),
  ).size,
  industry_test_scenario_count: read('geometry/constraints.geojson').features.length,
  benchmark_first_order_count: publicFeatures.filter(
    (f) => f.properties.benchmark_order === 'first').length,
  benchmark_third_order_count: publicFeatures.filter(
    (f) => f.properties.benchmark_order === 'third').length,
  phased_share_of_design_scope: layerArea('phasing.geojson') / site,

  // The measured existing fabric, from the shipped `osm_fabric.json`. Two are
  // re-derived from that file's own components — density from length and area,
  // coverage from footprint and area — and four are the readings it carries,
  // checked here against the copies in metrics.json. Copying a number into a
  // second file is how two copies of one fact start to drift.
  //
  // Written out rather than spread in from a helper: the coverage gate reads
  // the keys of this literal, so a key it cannot see here is a metric nobody
  // can tell is covered.
  existing_street_length_m: fabric.streets.total_km * 1000,
  existing_street_density_m_per_sqm:
    (fabric.streets.total_km * 1000) / (fabric.boundary.area_km2 * 1e6),
  existing_junction_count: fabric.streets.junctions,
  existing_block_median_area_sqm: fabric.blocks.median_ha * 1e4,
  existing_oversized_built_block_count: fabric.blocks.oversized_built_count,
  existing_building_coverage_ratio:
    (fabric.buildings.footprint_km2 * 1e6) / (fabric.boundary.area_km2 * 1e6),
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

/* ---- structural claims, asserted rather than printed ---------------------
 * These used to be three console.log lines. They printed a number and never
 * touched the exit code, so `official_boundary` flipping to true — the single
 * most consequential attribute in the package — would have printed `true` and
 * still exited 0. A check that reports without refusing is the exact defect
 * this package spends its length reporting in other people's work, and it was
 * sitting in the file the proposal invites reviewers to run.
 */
const structural = [];
const check = (claim, ok, detail) => {
  if (!ok) failed++;
  structural.push({ claim, result: ok ? 'PASS' : 'FAIL', detail: String(detail) });
};

const prose = ['proposal.md', 'proposal.en.md']
  .map((f) => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n');

const seam = publicFeatures.filter((f) => f.properties.is_seam_point).length;
const withJur = publicFeatures.filter((f) => (f.properties.jurisdictions || []).length > 0).length;
check('every benchmark declares a jurisdiction', withJur === publicFeatures.length,
      `${withJur}/${publicFeatures.length}`);
check('every benchmark crosses a jurisdictional boundary', seam === publicFeatures.length,
      `${seam}/${publicFeatures.length}`);
check('site boundary is labelled provisional',
      read('geometry/site_boundary.geojson').features.every((f) => f.properties.official_boundary === false),
      'official_boundary must be false on every feature');

// The benchmark tiering the proposal states in prose, counted from the data.
const tiers = publicFeatures.filter((f) => f.properties.benchmark_id).reduce(
  (a, f) => ((a[f.properties.benchmark_order] = (a[f.properties.benchmark_order] || 0) + 1), a), {});
check('benchmark tiers are 1 origin / 2 first / 2 second / 3 third',
      tiers.origin === 1 && tiers.first === 2 && tiers.second === 2 && tiers.third === 3,
      JSON.stringify(tiers));

// "六类用地完整剖分（无重叠无缺口）" is a first-order conclusion in both
// editions and was checked by nothing shipped. Summed area equal to the site
// area is the closing condition: an overlap inflates the sum, a gap deflates
// it. It would still pass under a compensating overlap and gap of identical
// area, which is why the class count is asserted beside it rather than instead.
const landUse = read('geometry/land_use.geojson').features;
const landUseSum = landUse.reduce((a, f) => a + geomArea(f.geometry), 0);
const codes = [...new Set(landUse.map((f) => String(f.properties.land_use_code)))].sort();
check('land_use closes on the site area (no overlap, no gap)',
      Math.abs(landUseSum - site) <= site * 1e-9,
      `${landUseSum.toFixed(3)} vs site ${site.toFixed(3)}, delta ${(landUseSum - site).toExponential(2)} m2`);

// Area identity alone would survive a compensating overlap and gap of equal
// size, so it is not on its own a proof of partition. This tests membership
// directly: lay a deterministic lattice over the site and require every point
// inside the boundary to fall in exactly one parcel. No clipper and no
// dependency — just ray casting, which is thirty lines. The lattice is fixed
// rather than random so two runs give the same answer, and its spacing is
// reported, because the guarantee is "no defect larger than one cell", not
// "no defect".
const pointInRing = (ring, x, y) => {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};
const pointInGeom = (geom, x, y) => {
  const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
  for (const poly of polys) {
    if (!pointInRing(projectRing(poly[0]), x, y)) continue;
    if (poly.slice(1).some((hole) => pointInRing(projectRing(hole), x, y))) continue;
    return true;
  }
  return false;
};
const siteGeom = read('geometry/site_boundary.geojson').features[0].geometry;
const flat = projectRing(
  siteGeom.type === 'Polygon' ? siteGeom.coordinates[0] : siteGeom.coordinates[0][0]);
const [minX, maxX] = [Math.min(...flat.map((p) => p[0])), Math.max(...flat.map((p) => p[0]))];
const [minY, maxY] = [Math.min(...flat.map((p) => p[1])), Math.max(...flat.map((p) => p[1]))];
const STEP = 40; // metres
let tested = 0, gaps = 0, overlaps = 0;
for (let x = minX + STEP / 2; x < maxX; x += STEP) {
  for (let y = minY + STEP / 2; y < maxY; y += STEP) {
    if (!pointInGeom(siteGeom, x, y)) continue;
    tested++;
    const hits = landUse.filter((f) => pointInGeom(f.geometry, x, y)).length;
    if (hits === 0) gaps++;
    else if (hits > 1) overlaps++;
  }
}
check('every sampled point inside the site falls in exactly one parcel',
      gaps === 0 && overlaps === 0,
      `${tested} points on a ${STEP} m lattice: ${gaps} in no parcel, ${overlaps} in more than one`);

check(`land_use partitions into exactly ${codes.length} classes, and the prose says so`,
      new RegExp(`(${codes.length}|${['一', '二', '三', '四', '五', '六', '七', '八', '九'][codes.length - 1]})\\s*类用地完整剖分`).test(prose),
      `${codes.length} classes present: ${codes.join(', ')}`);

// A constraint boundary nobody cites is a boundary nobody can review, and a
// scenario citing someone else's boundary is worse than citing none.
for (const f of read('geometry/constraints.geojson').features) {
  check(`${f.properties.id} is cited in the proposal`, prose.includes(f.properties.id),
        `${f.properties.name_zh} — ${(geomArea(f.geometry) / 1e4).toFixed(2)} ha`);
}

// Every machine-readable citation resolves. Two of eleven distinct anchors used
// to name feature ids that do not exist (BUILDING-001, LANDUSE-001).
const anchors = new Set(
  [...prose.matchAll(/\[data:(geometry\/[a-z_]+\.geojson)#([A-Za-z0-9-]+)\]/g)].map((m) => `${m[1]}#${m[2]}`));
const dangling = [...anchors].filter(
  (a) => !read(a.split('#')[0]).features.some((f) => f.properties.id === a.split('#')[1]));
check('every [data:file#id] citation resolves to a shipped feature', dangling.length === 0,
      `${anchors.size} distinct anchors, ${dangling.length} dangling${dangling.length ? ': ' + dangling.join(', ') : ''}`);

// 369.3 ha is the key-area layer total. It was cited against PROV-KEY-001,
// which is 192.9 ha on its own — the figure is right, the anchor was not.
const keyAreas = read('geometry/key_areas.geojson').features;
const ha = (g) => geomArea(g) / 1e4;
const keyTotalHa = keyAreas.reduce((a, f) => a + ha(f.geometry), 0);
const key001Ha = ha(keyAreas.find((f) => f.properties.id === 'PROV-KEY-001').geometry);
check('the ~369.3 ha figure is the layer total, not one feature',
      Math.abs(keyTotalHa - 369.3) < 0.05 && Math.abs(key001Ha - 369.3) > 0.05,
      `layer ${keyTotalHa.toFixed(2)} ha, PROV-KEY-001 ${key001Ha.toFixed(2)} ha`);
const misattributed = [...prose.matchAll(/[^\n]*369\.3[^\n]*/g)].map((m) => m[0]).filter(
  (l) => l.includes('PROV-KEY-001') && !(l.includes('PROV-KEY-002') && l.includes('PROV-KEY-003')));
check('any line citing 369.3 ha names all three key areas, not one',
      misattributed.length === 0,
      misattributed.length ? misattributed[0].slice(0, 70) : 'no line attributes the total to one feature');

// The class-1 summary table must quote metrics.json, not a superseded value.
// It sat at 82,413 m2 — the footprint before the circles became rectangles —
// while the same document called that number superseded two hundred lines away.
// The check reads the table row rather than banning the old number outright,
// because naming a retired value beside its replacement is what a changelog is
// for; quoting it as current is the defect.
const quoted = [...prose.matchAll(/\[metric:building_footprint_area_sqm\]\s*\|\s*([\d,]+)\s*m²/g)]
  .map((m) => Number(m[1].replace(/,/g, '')));
const declaredFootprint = metrics.building_footprint_area_sqm.value;
check('every class-1 table row quotes the current building footprint',
      quoted.length === 2 && quoted.every((v) => Math.abs(v - declaredFootprint) < 1),
      `${quoted.length} row(s): ${quoted.join(', ')} against metrics.json ${declaredFootprint.toFixed(1)}`);

// The card table in the proposal is spliced from scenario_cards.json on every
// build, so the two cannot drift — unless someone edits between the markers.
// This closes that door from the reader's side rather than the author's.
const cards = read('visual/assets/scenario_cards.json').cards;
const tableIds = [...prose.matchAll(/^\| (S\d\d) \|/gm)].map((m) => m[1]);
// Two tables per edition now carry the cards: the card table itself and the
// verification table added with E265, which states for each card what "it
// worked" would mean and what it is compared against. The count below was
// `* 2` when there was one table, and raising it to `* 4` makes the check
// stricter rather than looser: every card must appear in BOTH tables in BOTH
// editions, so a card that gains a scenario and no way of finding out whether
// it helped fails here.
check('both card tables carry every card in scenario_cards.json, in both editions',
      tableIds.length === cards.length * 4 &&
      cards.every((c) => tableIds.filter((id) => id === c.id).length === 4),
      `${cards.length} cards, ${tableIds.length} table rows across two tables and both editions`);

check('floor_area_ratio stays unknown until official FAR controls exist',
      metrics.floor_area_ratio.status === 'unknown' && metrics.floor_area_ratio.value === null,
      `${metrics.floor_area_ratio.status} / ${metrics.floor_area_ratio.value}`);

// The claim on the reviewer's checklist is that this file recomputes *every*
// class-1 metric. Until metrics.json carried `metric_class`, that could not be
// checked: the category lived in three prose paragraphs, this table held nine
// entries, and eight equally recomputable metrics sat outside both. Now the
// coverage is asserted in both directions, so the claim fails loudly if either
// side gains a metric the other does not.
(() => {
  const declaredClass1 = Object.entries(metrics)
    .filter(([, v]) => v.metric_class === 1).map(([k]) => k).sort();
  const recomputedHere = Object.keys(computed).sort();
  const missing = declaredClass1.filter((k) => !recomputedHere.includes(k));
  const extra = recomputedHere.filter((k) => !declaredClass1.includes(k));
  check('this file recomputes every metric metrics.json marks class 1, and only those',
        missing.length === 0 && extra.length === 0,
        missing.length || extra.length
          ? `missing: [${missing}] not class 1: [${extra}]`
          : `${declaredClass1.length} class-1 metrics, all recomputed here`);
})();

console.log('\nStructural claims the proposal makes, asserted against the data');
console.table(structural);

console.log(
  failed === 0
    ? '\nAll class-1 metrics and structural claims reproduced independently.'
    : `\n${failed} claim(s) did NOT reproduce — do not cite them.`,
);
process.exit(failed === 0 ? 0 : 1);
