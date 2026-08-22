#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const contractPath = path.join(__dirname, 'ai-era-pilot-dossier.json');
const runnerPath = path.join(__dirname, 'run-ai-era-pilot-dossier.js');
const original = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const clone = (value) => JSON.parse(JSON.stringify(value));

function run(candidate) {
  const tempPath = path.join(os.tmpdir(), `ai-era-pilot-${process.pid}-${Math.random().toString(16).slice(2)}.json`);
  fs.writeFileSync(tempPath, JSON.stringify(candidate));
  const result = spawnSync(process.execPath, [runnerPath, tempPath], { encoding: 'utf8' });
  fs.unlinkSync(tempPath);
  return result.status === 0;
}

if (!run(original)) throw new Error('positive control did not pass');

const fixtures = [];
const released = clone(original); released.decision = 'RELEASE'; fixtures.push(['released-without-evidence', released]);
const observed = clone(original); observed.field_observation_count = 1; fixtures.push(['fabricated-field-observation', observed]);
const official = clone(original); official.official_boundary = true; fixtures.push(['fabricated-official-boundary', official]);
const fixed = clone(original); fixed.dimension_rule.must_recalculate = false; fixtures.push(['fixed-dimensions', fixed]);
const capacity = clone(original); capacity.spatial_dossier.plan_1_500.release_capacity = 42; fixtures.push(['invented-capacity', capacity]);
const narrow = clone(original); narrow.spatial_dossier.plan_1_500.modules[0].width_m = 0; fixtures.push(['invalid-route-width', narrow]);
const owner = clone(original); owner.delivery_contract.raci[0].status = 'confirmed'; fixtures.push(['invented-owner', owner]);
const capex = clone(original); capex.delivery_contract.capex_design_estimate_cny.lower = 100000; fixtures.push(['broken-capex-formula', capex]);
const missingSla = clone(original); missingSla.delivery_contract.service_level_targets.pop(); fixtures.push(['missing-sla', missingSla]);
const observedSla = clone(original); observedSla.delivery_contract.service_level_targets[0].basis = 'field_observed'; fixtures.push(['observed-sla-claim', observedSla]);
const noRollback = clone(original); noRollback.delivery_contract.rollback = ''; fixtures.push(['missing-rollback', noRollback]);
const fakeWalkthrough = clone(original); fakeWalkthrough.field_acceptance.status = 'pass'; fixtures.push(['fabricated-public-walkthrough', fakeWalkthrough]);

const unexpected = fixtures.filter(([, fixture]) => run(fixture)).map(([name]) => name);
if (unexpected.length) throw new Error(`negative fixtures unexpectedly passed: ${unexpected.join(', ')}`);

console.log(JSON.stringify({ status: 'PASS', positive_controls: 1, negative_fixtures: fixtures.length, rejected: fixtures.map(([name]) => name) }, null, 2));
