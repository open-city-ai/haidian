#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const source = path.join(__dirname, 'human-city-pilot-dossier.json');
const runner = path.join(__dirname, 'run-human-city-pilot-dossier.js');
const original = JSON.parse(fs.readFileSync(source, 'utf8'));
const clone = (x) => JSON.parse(JSON.stringify(x));
function run(candidate) {
  const p = path.join(os.tmpdir(), `human-city-pilot-${process.pid}-${Math.random().toString(16).slice(2)}.json`);
  fs.writeFileSync(p, JSON.stringify(candidate));
  const result = spawnSync(process.execPath, [runner, p], {encoding:'utf8'});
  fs.unlinkSync(p);
  return result.status === 0;
}
if (!run(original)) throw new Error('positive control failed');
const fixtures = [];
const release = clone(original); release.decision='RELEASE'; fixtures.push(['release-without-evidence',release]);
const observed = clone(original); observed.field_observation_count=1; fixtures.push(['fabricated-field-observation',observed]);
const official = clone(original); official.official_boundary=true; fixtures.push(['fabricated-official-boundary',official]);
const fixed = clone(original); fixed.dimension_rule.must_recalculate=false; fixtures.push(['fixed-dimensions',fixed]);
const narrow = clone(original); narrow.spatial_dossier.plan_1_500.modules[0].width_m=0.8; fixtures.push(['narrow-ordinary-route',narrow]);
const crossing = clone(original); crossing.spatial_dossier.plan_1_500.ordinary_machine_crossings=1; fixtures.push(['unresolved-machine-crossing',crossing]);
const counter = clone(original); counter.spatial_dossier.detail_1_50.elements[0].target_m=1.1; fixtures.push(['uncalibrated-counter',counter]);
const owner = clone(original); owner.delivery_contract.raci[0].status='confirmed'; fixtures.push(['invented-owner',owner]);
const schedule = clone(original); schedule.delivery_contract.schedule[2].predecessors=[]; fixtures.push(['broken-dependency',schedule]);
const capex = clone(original); capex.delivery_contract.capex_design_estimate_cny.lower=100000; fixtures.push(['broken-capex-formula',capex]);
const sla = clone(original); sla.delivery_contract.service_level_targets[0].basis='field_observed'; fixtures.push(['invented-sla-result',sla]);
const rollback = clone(original); rollback.delivery_contract.rollback=''; fixtures.push(['missing-rollback',rollback]);
const field = clone(original); field.field_acceptance.status='pass'; fixtures.push(['fabricated-walkthrough',field]);
const unexpected = fixtures.filter(([,x]) => run(x)).map(([name]) => name);
if (unexpected.length) throw new Error(`negative fixtures passed: ${unexpected.join(', ')}`);
console.log(JSON.stringify({status:'PASS',positive_controls:1,negative_fixtures:fixtures.length,rejected:fixtures.map(([name])=>name)},null,2));
