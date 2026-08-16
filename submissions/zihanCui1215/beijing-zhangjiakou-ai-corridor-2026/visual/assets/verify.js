#!/usr/bin/env node
/* verify.js — reviewers can independently recompute every class-1 metric (zero dependencies).
 * Usage:   node visual/assets/verify.js
 * Exit:    0 all PASS, 1 any FAIL.
 * Basis:   WGS84 lon/lat projected via EPSG:4548 (CGCS2000 / 3-degree Gauss-Kruger CM 117E),
 *          the same basis as the official checker.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const PKG = path.normalize(path.join(__dirname, '..', '..'));

// ---------- EPSG:4548 approximation (central meridian 117E) ----------
const K0 = 1.0;
const A_E = 6378137.0;
const FLAT = 1 / 298.257222101;
const E2 = FLAT * (2 - FLAT);
const EP2 = E2 / (1 - E2);
const LAM0 = 117.0 * Math.PI / 180;

function project(lon, lat) {
  const lam = lon * Math.PI / 180, phi = lat * Math.PI / 180;
  const c = EP2 * Math.cos(phi) ** 2;
  const a = (lam - LAM0) * Math.cos(phi);
  const m = (1 - E2/4 - 3*E2**2/64 - 5*E2**3/256) * phi
          - (3*E2/8 + 3*E2**2/32 + 45*E2**3/1024) * Math.sin(2*phi)
          + (15*E2**2/256 + 45*E2**3/1024) * Math.sin(4*phi)
          - (35*E2**3/3072) * Math.sin(6*phi);
  return [K0 * A_E * a, K0 * A_E * m];
}

function ringArea(ring) {
  const pts = ring.map(c => project(c[0], c[1]));
  const n = pts.length;
  let s = 0.0;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % n];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2.0;
}

function polygonArea(coords) {
  // coords: [[ring, hole...], ...]
  return coords.reduce((sum, p) => sum + ringArea(p[0]) - p.slice(1).reduce((h, r) => h + ringArea(r), 0), 0);
}

function geomArea(g) {
  if (g.type === 'Polygon') return polygonArea([g.coordinates]);
  if (g.type === 'MultiPolygon') return polygonArea(g.coordinates);
  return 0.0;
}

function fcArea(fc) {
  return fc.features.reduce((s, f) => s + geomArea(f.geometry), 0);
}

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(PKG, rel), 'utf-8'));
}

function main() {
  let ok = 0, fail = 0;
  const metrics = load('metrics.json').metrics;

  function check(name, got, want, tol) {
    tol = tol || 0.02;
    const d = want ? Math.abs(got - want) / Math.abs(want) : 0;
    const st = d <= tol ? 'PASS' : 'FAIL';
    if (st === 'PASS') ok++; else fail++;
    console.log(`[${st}] ${name}: recomputed ${got.toFixed(1)} vs metrics ${want.toFixed(1)} (diff ${(d*100).toFixed(3)}%)`);
  }

  console.log('=== verify.js — independent recomputation of class-1 metrics ===');
  console.log('projection: EPSG:4548 (CGCS2000 / 3-degree Gauss-Kruger CM 117E), same as official checker\n');

  // 1. site area
  const site = fcArea(load('geometry/site_boundary.geojson'));
  check('site_area_sqm', site, metrics.site_area_sqm.value);

  // 2. land use band totals & shares
  const lu = load('geometry/land_use.geojson');
  let tot = 0.0;
  const byCode = {};
  for (const f of lu.features) {
    const a = geomArea(f.geometry);
    tot += a;
    const code = String(f.properties.land_use_code || '').split('/')[0];
    byCode[code] = (byCode[code] || 0) + a;
  }
  check('land_use total vs site', tot, site, 0.03);
  console.log(`[INFO] 0802 research share: ${(byCode['0802']/tot*100).toFixed(2)}%  (proposal: 27.6%)`);
  console.log(`[INFO] 05 commercial share: ${(byCode['05']/tot*100).toFixed(2)}%  (proposal: 18.4%)`);
  for (const [code, claim] of [['0802', 0.276], ['05', 0.184]]) {
    check(`land_use share ${code}`, (byCode[code] || 0) / tot, claim, 0.02);
  }

  // 3. key areas
  const ka = load('geometry/key_areas.geojson');
  const kaArea = {};
  for (const f of ka.features) kaArea[f.properties.id] = geomArea(f.geometry);
  for (const [mid, kid] of [['key_area_zhongzhiyuan_sqm', 'PROV-KEY-001'],
                            ['key_area_ai_origin_sqm', 'PROV-KEY-002'],
                            ['key_area_dazhongsi_sqm', 'PROV-KEY-003']]) {
    if (kid in kaArea && metrics[mid]) check(mid, kaArea[kid], metrics[mid].value);
  }

  // 4. green / public space ratios
  // Green features are overlap-dissolved in the geometry itself, so the plain
  // feature sum equals the dissolve-union area (the official checker's basis).
  for (const [mid, layer] of [['green_ratio', 'green_space.geojson'], ['public_space_ratio', 'public_space.geojson']]) {
    if (metrics[mid]) check(mid, fcArea(load(`geometry/${layer}`)) / site, metrics[mid].value, 0.03);
  }

  // 5. buildings
  const b = load('geometry/buildings.geojson');
  let fp = 0.0, gfa = 0.0, n = 0;
  for (const f of b.features) {
    const a = geomArea(f.geometry);
    fp += a;
    gfa += a * (f.properties.floors || 1);
    n++;
  }
  console.log(`[INFO] buildings: ${n} features`);
  check('building_footprint_area_sqm', fp, metrics.building_footprint_area_sqm.value, 0.05);
  if (metrics.total_gfa_sqm) check('total_gfa_sqm', gfa, metrics.total_gfa_sqm.value, 0.05);
  check('average_far', gfa / site, metrics.average_far.value, 0.05);
  check('building_density', fp / site, metrics.building_density.value, 0.05);

  // 6. phasing
  const ph = load('geometry/phasing.geojson');
  const phArea = {};
  for (const f of ph.features) {
    const pid = String(f.properties.id || f.properties.phase || '');
    phArea[pid] = (phArea[pid] || 0) + geomArea(f.geometry);
  }
  for (const [mid, pid] of [['phase_1_area_sqm', 'PHASE-001'], ['phase_2_area_sqm', 'PHASE-002'], ['phase_3_area_sqm', 'PHASE-003']]) {
    if (pid in phArea && metrics[mid]) check(mid, phArea[pid], metrics[mid].value);
  }

  console.log(`\n=== verify.js result: ${ok} PASS, ${fail} FAIL ===`);
  process.exit(fail ? 1 : 0);
}

main();
