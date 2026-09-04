#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(ROOT, relative), 'utf8'));
const readText = (relative) => fs.readFileSync(path.join(ROOT, relative), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validate(bundle) {
  const {deliverables, sources, context, candidates, figures} = bundle;
  const sourceIds = new Set(sources.sources.map((item) => item.id));

  assert(deliverables.status === 'design_candidate_not_authorized_not_run', 'deliverable status must remain design-only');
  assert(Array.isArray(deliverables.field_claims) && deliverables.field_claims.length === 0, 'field_claims must remain empty');
  assert(deliverables.case_transfer_cards.length === 6, 'exactly six selected case-transfer cards are required');
  assert(new Set(deliverables.case_transfer_cards.map((item) => item.source_id)).size === 6, 'case source IDs must be unique');
  for (const item of deliverables.case_transfer_cards) {
    assert(sourceIds.has(item.source_id), `missing source register entry: ${item.source_id}`);
    assert(item.transfer && item.do_not_transfer, `case must state transfer and non-transfer: ${item.source_id}`);
  }
  assert(deliverables.identity_direction.mark === 'two separable loops and one switch', 'identity mark changed without review');
  assert(deliverables.ecosystem_map.length === 6, 'six ecosystem handoff roles are required');
  assert(new Set(deliverables.ecosystem_map.map((item) => item.role)).size === 6, 'ecosystem roles must be unique');
  assert(deliverables.component_catalogue.length === 3, 'three area components are required');
  assert(deliverables.component_catalogue.every((item) => item.decision === 'HOLD'), 'all component decisions must remain HOLD');
  const dazhongsi = deliverables.component_catalogue.find((item) => item.area.startsWith('Dazhongsi'));
  assert(dazhongsi && dazhongsi.mapped_anchor.includes('external public-transfer anchor'), 'Dazhongsi must remain an external transfer anchor');
  assert(deliverables.annual_operating_calendar.map((item) => item.quarter).join(',') === 'Q1,Q2,Q3,Q4', 'annual calendar must cover Q1-Q4');
  assert(deliverables.annual_event_gate.current_decision === 'HOLD', 'annual event must remain HOLD');
  assert(deliverables.annual_event_gate.may_begin_only_after.includes('authorized real complete-trip audit'), 'annual event needs a real-audit gate');

  assert(context.metadata.source === 'OpenStreetMap via Overpass API', 'OSM source metadata is missing');
  assert(context.metadata.use_boundary.includes('not field verification'), 'OSM use boundary is missing');
  assert(context.features.length >= 100, 'mapped context unexpectedly sparse');
  assert(candidates.metadata.authorization === 0 && candidates.metadata.field_observations === 0, 'candidate metadata must keep field counts at zero');
  assert(candidates.metadata.decision === 'HOLD', 'candidate package must remain HOLD');
  assert(candidates.metadata.dazhongsi_geometry_conflict_km >= 2, 'Dazhongsi rough-boundary conflict was lost');
  assert(candidates.features.length === 12, 'expected three points plus one audit sequence for each of three areas');
  for (const feature of candidates.features) {
    const p = feature.properties;
    assert(p.geometry_role === 'design_candidate_not_field_verified', `invalid geometry role: ${p.id}`);
    assert(p.authorization === 0 && p.field_observations === 0 && p.decision === 'HOLD', `field boundary failed: ${p.id}`);
  }

  for (const [name, text] of Object.entries(figures)) {
    assert(text.includes('HOLD'), `${name} must display HOLD`);
  }
  assert(figures.spatialZh.includes('PROV-KEY-003') && figures.spatialEn.includes('PROV-KEY-003'), 'spatial boards must display the boundary conflict');
  assert(figures.taskZh.includes('现场观察=0') && figures.taskEn.includes('field observations = 0'), 'taskbook boards must display zero field observations');

  return {
    status: 'PASS',
    checks: 24,
    case_cards: deliverables.case_transfer_cards.length,
    ecosystem_roles: deliverables.ecosystem_map.length,
    components: deliverables.component_catalogue.length,
    mapped_context_features: context.features.length,
    candidate_features: candidates.features.length,
    field_observations: candidates.metadata.field_observations,
    decision: candidates.metadata.decision,
  };
}

function loadBundle() {
  return {
    deliverables: readJson('visual/assets/taskbook-deliverables.json'),
    sources: readJson('sources.json'),
    context: readJson('visual/assets/osm-mobility-context.json'),
    candidates: readJson('visual/assets/mobility-interface-candidates.json'),
    figures: {
      spatialZh: readText('assets/figures/mobility-spatial-insets.svg'),
      spatialEn: readText('assets/figures/mobility-spatial-insets.en.svg'),
      taskZh: readText('assets/figures/taskbook-deliverables.svg'),
      taskEn: readText('assets/figures/taskbook-deliverables.en.svg'),
    },
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function expectFailure(bundle, label) {
  try {
    validate(bundle);
  } catch (error) {
    return {label, rejected: true, reason: error.message};
  }
  throw new Error(`negative fixture was accepted: ${label}`);
}

const bundle = loadBundle();
if (process.argv.includes('--self-test')) {
  const fixtures = [];
  const fabricatedFieldwork = clone(bundle);
  fabricatedFieldwork.candidates.metadata.field_observations = 1;
  fixtures.push(expectFailure(fabricatedFieldwork, 'fabricated field observation'));
  const missingNonTransfer = clone(bundle);
  delete missingNonTransfer.deliverables.case_transfer_cards[0].do_not_transfer;
  fixtures.push(expectFailure(missingNonTransfer, 'missing non-transfer boundary'));
  const prematureEvent = clone(bundle);
  prematureEvent.deliverables.annual_event_gate.current_decision = 'OPEN';
  fixtures.push(expectFailure(prematureEvent, 'premature annual event'));
  console.log(JSON.stringify({status: 'PASS', negative_fixtures: fixtures}, null, 2));
} else {
  console.log(JSON.stringify(validate(bundle), null, 2));
}
