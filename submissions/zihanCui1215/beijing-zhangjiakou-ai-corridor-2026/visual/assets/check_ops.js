#!/usr/bin/env node
/* check_ops.js — validates operations.json anchors and entry/exit conditions. */
'use strict';
const fs = require('fs');
const path = require('path');

const PKG = path.normalize(path.join(__dirname, '..', '..'));

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(PKG, rel), 'utf-8'));
}

function main() {
  const ops = load('visual/assets/operations.json');
  let ok = 0, fail = 0;

  // honor wall: 3 components
  const comps = ops.honor_display_system.components;
  if (comps.length !== 3) {
    console.log(`[FAIL] honor components: expected 3, got ${comps.length}`); fail++;
  } else {
    console.log('[PASS] honor_display_system: 3 components (wall_panel / digital_mirror / removal_service)'); ok++;
  }
  for (const c of comps) {
    const a = c.anchor;
    if (a.includes('#public_plaza_beijing_ai_o')) {
      const ps = load('geometry/public_space.geojson');
      const ids = new Set(ps.features.map(f => f.properties.id));
      if (ids.has('public_plaza_beijing_ai_o')) {
        console.log('[PASS] wall_panel anchor resolves in public_space.geojson'); ok++;
      } else {
        console.log('[FAIL] wall_panel anchor'); fail++;
      }
    }
  }

  // cadences: four tiers
  const cad = ops.developer_community_operation.cadences;
  const wantCycles = ['weekly', 'monthly', 'quarterly', 'annual'];
  if (cad.map(c => c.cycle).join(',') === wantCycles.join(',')) {
    console.log('[PASS] cadences: weekly/monthly/quarterly/annual with owners'); ok++;
  } else {
    console.log('[FAIL] cadences'); fail++;
  }
  if (cad.every(c => String(c.id || '').startsWith('OPS-') && c.what_zh && c.owner)) {
    ok++;
  } else {
    console.log('[FAIL] cadence fields'); fail++;
  }

  // conversion path: 5 ordered steps with entry/exit
  const pathSteps = ops.developer_community_operation.conversion_path;
  const steps = pathSteps.map(s => s.step);
  const sorted = [...steps].sort((a, b) => a - b);
  if (steps.join(',') === sorted.join(',') && pathSteps.length === 5 &&
      pathSteps.every(s => s.entry && s.exit)) {
    console.log('[PASS] conversion_path: 5 steps with entry/exit'); ok++;
  } else {
    console.log(`[FAIL] conversion_path steps: ${steps.join(',')}`); fail++;
  }

  console.log(`\n=== check_ops.js: ${ok} PASS, ${fail} FAIL ===`);
  process.exit(fail ? 1 : 0);
}

main();
