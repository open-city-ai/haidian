#!/usr/bin/env node
'use strict';

/* Check the M-09 readiness contract without claiming a field pilot. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const contract = JSON.parse(fs.readFileSync(path.join(__dirname, 'mobility-pilot-readiness.json'), 'utf8'));
const tabletop = JSON.parse(fs.readFileSync(path.join(__dirname, 'mobility-tabletop-contract.json'), 'utf8'));
const checklist = JSON.parse(fs.readFileSync(path.join(__dirname, 'pilot-startup-checklist.json'), 'utf8'));
const errors = [];
const expectedIds = ['M09-R01', 'M09-R02', 'M09-R03', 'M09-R04'];
const scenarioIds = new Set(checklist.scenarios.map((item) => item.id));
const tabletopIds = new Set(tabletop.service_requests.map((item) => item.request_id));

function fail(message) { errors.push(message); }
function nonEmpty(value, label) {
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== 'string' || !item.trim())) {
    fail(`${label} must be a non-empty string array`);
  }
}
function hasText(value, label) {
  if (typeof value !== 'string' || !value.trim()) fail(`${label} must be non-empty text`);
}
function clone(value) { return JSON.parse(JSON.stringify(value)); }

if (contract.status !== 'conceptual_readiness_contract') fail('contract status must remain conceptual_readiness_contract');
if (!/not a field baseline|not_authorized_not_run|permit/i.test(contract.boundary)) fail('boundary must keep non-field and authorization limits visible');
if (contract.shared_rules.current_status !== 'not_authorized_not_run') fail('shared current status must remain not_authorized_not_run');
if (contract.cards.length !== expectedIds.length || contract.cards.map((item) => item.request_id).join('|') !== expectedIds.join('|')) fail('M-09 readiness card coverage/order mismatch');

const cardFailures = new Map();
for (const card of contract.cards) {
  const prefix = card.request_id || '(missing request id)';
  const localErrors = [];
  const requireText = (value, label) => { if (typeof value !== 'string' || !value.trim()) localErrors.push(`${prefix}.${label}`); };
  const requireList = (value, label) => { if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== 'string' || !item.trim())) localErrors.push(`${prefix}.${label}`); };
  requireText(card.service_group, 'service_group');
  requireList(card.spatial_anchors, 'spatial_anchors');
  requireText(card.baseline?.status, 'baseline.status');
  if (card.baseline?.status !== 'unknown') localErrors.push(`${prefix}.baseline.status must be unknown`);
  requireList(card.baseline?.source_refs, 'baseline.source_refs');
  requireText(card.baseline?.observation_unit, 'baseline.observation_unit');
  requireText(card.baseline?.time_window, 'baseline.time_window');
  requireText(card.sample_and_window?.sample_definition, 'sample_and_window.sample_definition');
  requireText(card.sample_and_window?.observation_period, 'sample_and_window.observation_period');
  requireText(card.sample_and_window?.sampling_method, 'sample_and_window.sampling_method');
  requireText(card.success_condition?.status, 'success_condition.status');
  if (card.success_condition?.status !== 'design_target_not_observed') localErrors.push(`${prefix}.success_condition.status must not claim an observation`);
  requireText(card.success_condition?.rule, 'success_condition.rule');
  requireText(card.success_condition?.threshold, 'success_condition.threshold');
  if (card.success_condition?.observed_value !== null) localErrors.push(`${prefix}.success_condition.observed_value must remain null`);
  requireList(card.stop_conditions, 'stop_conditions');
  requireText(card.accountability?.operating_owner_role, 'accountability.operating_owner_role');
  requireText(card.accountability?.independent_stop_reviewer_role, 'accountability.independent_stop_reviewer_role');
  if (card.accountability?.authorised_organisation !== 'unknown_until_authorized') localErrors.push(`${prefix}.accountability.authorised_organisation boundary`);
  requireText(card.human_equivalent?.route, 'human_equivalent.route');
  requireText(card.human_equivalent?.handover_record, 'human_equivalent.handover_record');
  requireList(card.data_contract?.minimum_data, 'data_contract.minimum_data');
  requireText(card.data_contract?.retention_rule, 'data_contract.retention_rule');
  requireText(card.data_contract?.deletion_owner_role, 'data_contract.deletion_owner_role');
  if (card.data_contract?.deletion_proof !== 'not_available_before_authorization') localErrors.push(`${prefix}.data_contract.deletion_proof boundary`);
  requireText(card.review_and_redress?.review_cycle, 'review_and_redress.review_cycle');
  requireText(card.review_and_redress?.appeal_entry, 'review_and_redress.appeal_entry');
  requireText(card.review_and_redress?.appeal_owner_role, 'review_and_redress.appeal_owner_role');
  requireText(card.review_and_redress?.response_rule, 'review_and_redress.response_rule');
  if (card.status !== 'not_authorized_not_run') localErrors.push(`${prefix}.status boundary`);
  requireList(card.source_refs, 'source_refs');
  for (const reference of [...(card.baseline?.source_refs || []), ...(card.source_refs || [])]) {
    if (!fs.existsSync(path.join(root, reference))) localErrors.push(`${prefix}.missing evidence ref ${reference}`);
  }
  for (const anchor of card.spatial_anchors || []) {
    const file = anchor.split('#')[0];
    if (!fs.existsSync(path.join(root, file))) localErrors.push(`${prefix}.missing spatial anchor ${anchor}`);
  }
  if (!tabletopIds.has(card.request_id)) localErrors.push(`${prefix} missing from mobility tabletop`);
  if (!scenarioIds.has('M-09')) localErrors.push('M-09 missing from pilot startup checklist');
  cardFailures.set(prefix, localErrors);
  errors.push(...localErrors);
}

const negativeCases = contract.negative_samples.map((sample) => {
  const source = contract.cards[0];
  const broken = clone(source);
  if (sample.mutates === 'accountability.operating_owner_role') delete broken.accountability.operating_owner_role;
  if (sample.mutates === 'success_condition.observed_value') broken.success_condition.observed_value = 0.9;
  if (sample.mutates === 'data_contract.deletion_proof') delete broken.data_contract.deletion_proof;
  const rejected = sample.mutates === 'accountability.operating_owner_role'
    ? !broken.accountability.operating_owner_role
    : sample.mutates === 'success_condition.observed_value'
      ? broken.success_condition.observed_value !== null
      : broken.data_contract.deletion_proof !== 'not_available_before_authorization';
  if (!rejected) fail(`${sample.id} did not reject its mutation`);
  return {id: sample.id, mutates: sample.mutates, expected: sample.expected, observed: rejected ? 'reject' : 'accept'};
});

const pass = errors.length === 0;
const result = {
  runner: 'run-mobility-pilot-readiness.js',
  contract_id: contract.contract_id,
  status: pass ? 'PASS' : 'FAIL',
  claim_boundary: contract.boundary,
  card_count: contract.cards.length,
  checks: {
    request_coverage: contract.cards.length === expectedIds.length && contract.cards.every((item, index) => item.request_id === expectedIds[index]),
    crosswalk_to_tabletop: contract.cards.every((item) => tabletopIds.has(item.request_id)),
    required_readiness_fields: errors.length === 0,
    unknown_baseline_and_null_observation: contract.cards.every((item) => item.baseline.status === 'unknown' && item.success_condition.observed_value === null),
    human_equivalent_and_redress: contract.cards.every((item) => Boolean(item.human_equivalent?.route && item.review_and_redress?.appeal_entry)),
    retention_deletion_boundary: contract.cards.every((item) => item.data_contract?.deletion_proof === 'not_available_before_authorization'),
    negative_samples_rejected: negativeCases.every((item) => item.observed === 'reject')
  },
  negative_samples: negativeCases,
  errors,
  next_action: 'Collect authorised, dated local baseline and freeze thresholds before any P1 request; otherwise remain in P0 and human/public-transport fallback.'
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = pass ? 0 : 1;
