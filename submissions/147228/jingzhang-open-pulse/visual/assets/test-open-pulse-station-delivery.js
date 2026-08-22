#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const {spawnSync} = require('child_process');

const contractPath = path.join(__dirname, 'open-pulse-station-delivery-contract.json');
const runnerPath = path.join(__dirname, 'run-open-pulse-station-delivery.js');
const original = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const clone = (value) => JSON.parse(JSON.stringify(value));

function run(candidate) {
  const tempPath = path.join(os.tmpdir(), `open-pulse-delivery-${process.pid}-${Math.random().toString(16).slice(2)}.json`);
  fs.writeFileSync(tempPath, JSON.stringify(candidate));
  const result = spawnSync(process.execPath, [runnerPath, tempPath], {encoding: 'utf8'});
  fs.unlinkSync(tempPath);
  return result.status === 0;
}

if (!run(original)) throw new Error('positive control did not pass');

const fixtures = [];
const released = clone(original); released.decision = 'RELEASE'; fixtures.push(['released-without-evidence', released]);
const observed = clone(original); observed.field_observation_count = 1; fixtures.push(['fabricated-field-observation', observed]);
const fixedDimension = clone(original); fixedDimension.dimension_rule.must_recalculate = false; fixtures.push(['fixed-dimension', fixedDimension]);
const missingSection = clone(original); missingSection.stations[0].spatial_review.section_bands.pop(); fixtures.push(['missing-section-band', missingSection]);
const inventedCapacity = clone(original); inventedCapacity.stations[1].spatial_review.capacity_check.release_capacity = 80; fixtures.push(['invented-capacity', inventedCapacity]);
const confirmedOwner = clone(original); confirmedOwner.stations[2].spatial_review.ownership_interfaces[0].status = 'confirmed'; fixtures.push(['confirmed-owner', confirmedOwner]);
const inventedCost = clone(original); inventedCost.stations[0].delivery.cost_envelope_cny.lower = 100000; fixtures.push(['invented-cost', inventedCost]);
const noBlackout = clone(original); delete noBlackout.stations[1].spatial_review.frontage_states.BLACKOUT; fixtures.push(['missing-blackout', noBlackout]);
const noRollback = clone(original); noRollback.stations[2].delivery.rollback = ''; fixtures.push(['missing-rollback', noRollback]);
const observedSla = clone(original); observedSla.stations[0].delivery.service_level_targets[0].basis = 'field_observed'; fixtures.push(['observed-sla-claim', observedSla]);

const unexpected = fixtures.filter(([, fixture]) => run(fixture)).map(([name]) => name);
if (unexpected.length) throw new Error(`negative fixtures unexpectedly passed: ${unexpected.join(', ')}`);

console.log(JSON.stringify({status: 'PASS', positive_controls: 1, negative_fixtures: fixtures.length, rejected: fixtures.map(([name]) => name)}, null, 2));
