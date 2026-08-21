#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const atlas = JSON.parse(fs.readFileSync(path.join(root, 'visual/assets/ai-era-g0-journey-atlas.json'), 'utf8'));
const fail = (message) => {
  console.error(`FAIL ${message}`);
  process.exit(1);
};

if (atlas.status.gate !== 'G0' || atlas.status.decision !== 'HOLD') fail('G0/HOLD boundary drift');
if (atlas.status.authorizations !== 0 || atlas.status.field_data !== false) fail('authorization or field boundary drift');
if (atlas.status.baseline !== 'unknown' || atlas.status.result_status !== 'not_run') fail('baseline/result boundary drift');
if (atlas.status.performance_results !== null || atlas.status.operational_status !== 'not_authorized_not_run') fail('performance/operational boundary drift');
if (atlas.route_cards.length !== 4) fail('route count drift');
if (atlas.journey_steps.map((item) => item.id).join('|') !== 'J-01|J-02|J-03|J-04|J-05') fail('journey order drift');
if (atlas.writeback_fields.length < 8) fail('writeback fields incomplete');
console.log('PASS AI-era G0 journey atlas: four routes, five-step receipt, G0/HOLD and zero field claims');
