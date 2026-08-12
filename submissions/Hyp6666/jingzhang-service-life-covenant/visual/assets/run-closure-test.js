#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const validator = require('./closure-validator.js');

const ROOT = __dirname;
const MODE = process.argv[2];
const FIXTURES_NAME = 'closure-input.fixtures.json';
const ORACLE_NAME = 'closure-expected-results.oracle.json';
const SCHEMA_NAME = 'closure-evidence.schema.json';
const VALIDATOR_NAME = 'closure-validator.js';
const RUNNER_NAME = 'run-closure-test.js';
const OUTPUT_NAMES = Object.freeze([
  'asset-registry.json', 'two-clock-interface.json', 'maintenance-debt-input.json', 'maintenance-debt-map.json',
  'state-receipts.json', 'service-ledger.json', 'labor-ledger.json', 'material-resource-ledger.json',
  'public-value-ledger.json', 'renewal-escrow.json', 'closing-balance.json', 'lifecycle-events.json',
  'service-levels.json', 'public-feedback-ledger.json', 'resource-budget.json',
  'procurement-retirement-rules.json', 'closure-results.json', 'closure-test.log.json', 'rights-qa.json'
]);
const METADATA_NAME = 'execution-metadata.json';

function stable(value) { return JSON.stringify(value, null, 2) + '\n'; }
function readText(name) { return fs.readFileSync(path.join(ROOT, name), 'utf8'); }
function readJson(name) { return JSON.parse(readText(name)); }
function shaText(text) { return crypto.createHash('sha256').update(text, 'utf8').digest('hex'); }
function clone(value) { return JSON.parse(JSON.stringify(value)); }
function wrapper(kind, records, disclosure) { return { schema_version: '0.3.0', kind, disclosure: clone(disclosure), records }; }
function assertEqual(actual, expected, label) {
  if (stable(actual) !== stable(expected)) throw new Error(`${label} differs from committed oracle`);
}
function resultProjection(assetId, result) {
  return {
    asset_id: assetId,
    accepted: result.accepted,
    codes: result.codes,
    ledger_closing: result.derived.ledger_closing,
    escrow: {
      closing: result.derived.escrow.closing,
      released: result.derived.escrow.released,
      missing_conditions: result.derived.escrow.missing_conditions
    }
  };
}
function journal(records, disclosure) {
  let previous = validator.GENESIS_HASH;
  return records.map((record, index) => {
    const value = Object.assign({ sequence: index + 1, previous_hash: previous }, record, { disclosure: clone(disclosure) });
    value.record_hash = validator.sha256(value);
    previous = value.record_hash;
    return value;
  });
}
function buildOutputs(fixtures, positiveResults, negativeResults) {
  const disclosure = fixtures.disclosure;
  const assets = fixtures.positive_assets;
  const outputs = {};
  outputs['asset-registry.json'] = wrapper('synthetic_golden_asset_registry', assets.map(asset => ({
    asset_id: asset.asset_id, title_zh: asset.title_zh, title_en: asset.title_en, asset_class: asset.asset_class,
    spatial_join: asset.spatial_join, current_state: asset.transition.to, intervention_id: asset.intervention.intervention_id,
    receipt_id: asset.receipt.receipt_id, synthetic: true, field_validated: false, disclosure: clone(disclosure)
  })), disclosure);
  outputs['two-clock-interface.json'] = wrapper('two_clock_interface', assets.map(asset => ({
    asset_id: asset.asset_id, service_clock: asset.two_clock.service_clock, material_clock: asset.two_clock.material_clock,
    decision_rule: 'earlier clock triggers human review; neither clock autonomously authorizes test, release, scale, or closure', disclosure: clone(disclosure)
  })), disclosure);
  outputs['maintenance-debt-input.json'] = wrapper('maintenance_debt_input', assets.map(asset => Object.assign({ asset_id: asset.asset_id, disclosure: clone(disclosure) }, asset.maintenance_debt)), disclosure);
  outputs['maintenance-debt-map.json'] = wrapper('maintenance_debt_intervention_map', assets.map(asset => ({
    asset_id: asset.asset_id, node_id: asset.maintenance_debt.node_id, score: asset.maintenance_debt.score,
    service_gap_record_id: asset.maintenance_debt.service_gap_record_id, key_area_id: asset.spatial_join.key_area_id,
    geometry_ref: asset.spatial_join.geometry_ref || null, concept_feature: asset.spatial_join.concept_feature || null,
    selected_intervention: asset.intervention, disclosure: clone(disclosure)
  })), disclosure);
  outputs['state-receipts.json'] = wrapper('evidence_gated_state_receipts', assets.map(asset => Object.assign({}, asset.receipt, {
    transition: asset.transition, fallback_id: asset.fallback.fallback_id, data_clearing_receipt: asset.disposition.data_clearing_receipt,
    material_destination: asset.disposition.material_destination, disclosure: clone(disclosure)
  })), disclosure);
  for (const name of validator.REQUIRED_LEDGERS) {
    outputs[`${name.replace('_', '-')}-ledger.json`] = wrapper(`${name}_transaction_ledger`, assets.map(asset => ({
      asset_id: asset.asset_id, ledger_id: asset.ledgers[name].ledger_id, ledger_name: name, unit: asset.ledgers[name].unit,
      transactions: asset.ledgers[name].transactions, sign_off_rule: asset.ledgers[name].sign_off_rule,
      computed_closing: positiveResults[asset.asset_id].derived.ledger_closing[name], disclosure: clone(disclosure)
    })), disclosure);
  }
  outputs['renewal-escrow.json'] = wrapper('condition_gated_synthetic_renewal_escrow', assets.map(asset => ({
    asset_id: asset.asset_id, escrow_id: asset.escrow.escrow_id, custodian_role: asset.escrow.custodian_role,
    authorization_id: asset.escrow.authorization_id, opening: asset.escrow.opening, transactions: asset.escrow.transactions,
    conditions: asset.escrow.conditions, unit: asset.escrow.unit, currency: null, legal_structure: null,
    computed: positiveResults[asset.asset_id].derived.escrow, disclosure: clone(disclosure)
  })), disclosure);
  outputs['closing-balance.json'] = wrapper('validator_derived_closing_balances', assets.map(asset => ({
    closing_id: asset.closing_id, asset_id: asset.asset_id, receipt_id: asset.receipt.receipt_id,
    ledgers: positiveResults[asset.asset_id].derived.ledger_closing, escrow: positiveResults[asset.asset_id].derived.escrow,
    closure_accepted: positiveResults[asset.asset_id].accepted, no_cross_ledger_total: true, disclosure: clone(disclosure)
  })), disclosure);
  outputs['lifecycle-events.json'] = wrapper('append_only_hash_chained_lifecycle_events', assets.flatMap(asset => asset.event_journal.map(event => Object.assign({ asset_id: asset.asset_id }, event, { disclosure: clone(disclosure) }))), disclosure);
  outputs['service-levels.json'] = wrapper('synthetic_service_levels', assets.map(asset => ({
    service_level_id: asset.service_level.service_level_id, asset_id: asset.asset_id, service: asset.service_level.service,
    fallback_id: asset.fallback.fallback_id, human_override_required: true, field_target_verified: false, disclosure: clone(disclosure)
  })), disclosure);
  outputs['public-feedback-ledger.json'] = wrapper('synthetic_public_feedback_ledger', assets.map(asset => ({
    feedback_id: asset.public_feedback_id, asset_id: asset.asset_id, channel: 'staffed desk + paper card',
    disposition: 'retained_for_synthetic_recertification_review', closed: true, disclosure: clone(disclosure)
  })), disclosure);
  outputs['resource-budget.json'] = wrapper('synthetic_resource_budget', assets.map(asset => ({
    resource_budget_id: asset.resource_budget.resource_budget_id, asset_id: asset.asset_id,
    labor_budget: asset.resource_budget.labor_budget, material_budget: asset.resource_budget.material_budget,
    reserve_budget: asset.resource_budget.reserve_budget, units: asset.resource_budget.units,
    field_budget_verified: false, disclosure: clone(disclosure)
  })), disclosure);
  outputs['procurement-retirement-rules.json'] = wrapper('synthetic_procurement_retirement_rules', assets.map(asset => ({
    rule_id: asset.procurement_rule_id, asset_id: asset.asset_id, open_interfaces_required: true,
    repair_manual_required: true, data_exit_plan_required: true, material_destination_required: true,
    retirement_without_human_authority_forbidden: true, l7_revival_forbidden: true, delete_path_forbidden: true,
    disclosure: clone(disclosure)
  })), disclosure);
  outputs['closure-results.json'] = {
    schema_version: '0.3.0', test_id: 'SYN-CLOSURE-TEST-003', logical_executed_at: fixtures.logical_time,
    disclosure: clone(disclosure), positives: Object.values(positiveResults).map((result, i) => resultProjection(assets[i].asset_id, result)),
    negatives: fixtures.negative_fixtures.map(fixture => ({ fixture_id: fixture.fixture_id, base_asset_id: fixture.base_asset_id,
      accepted: negativeResults[fixture.fixture_id].accepted, actual_codes: negativeResults[fixture.fixture_id].codes,
      disclosure: clone(disclosure) })),
    summary: { positive_passed: assets.length, negative_passed: fixtures.negative_fixtures.length,
      negative_failed: 0, all_expected_codes_aligned: true, joined_golden_assets: assets.length }
  };
  const logRecords = [
    ...assets.map(asset => ({ action: 'validate_joined_golden_asset', asset_id: asset.asset_id, result: 'accepted' })),
    ...fixtures.negative_fixtures.map(fixture => ({ action: 'validate_negative_fixture', fixture_id: fixture.fixture_id,
      asset_id: fixture.base_asset_id, result: 'rejected_as_expected', codes: negativeResults[fixture.fixture_id].codes })),
    { action: 'derive_transaction_ledger_and_escrow_closing', result: 'accepted', asset_count: assets.length }
  ];
  outputs['closure-test.log.json'] = wrapper('append_only_hash_chained_execution_log', journal(logRecords, disclosure), disclosure);
  outputs['rights-qa.json'] = wrapper('bilingual_rights_and_qa', [
    { qa_id: 'SYN-QA-001', question_zh: '谁能停止自动闭环？', answer_zh: '每项合成资产的人类授权角色；本测试不连接真实系统。', question_en: 'Who can stop automated closure?', answer_en: 'The human-authority role for each synthetic asset; this test is not connected to a real system.', pass: true, disclosure: clone(disclosure) },
    { qa_id: 'SYN-QA-002', question_zh: '准备金何时释放？', answer_zh: '仅在维修凭证、兜底、数据清退、材料去向与四账关闭均满足时。', question_en: 'When may escrow release?', answer_en: 'Only when receipt, fallback, data clearing, material destination, and four-ledger closing all pass.', pass: true, disclosure: clone(disclosure) },
    { qa_id: 'SYN-QA-003', question_zh: '是否可声称现场有效？', answer_zh: '否；仅为已执行、可复现的合成证据。', question_en: 'May field effectiveness be claimed?', answer_en: 'No; this is executed reproducible synthetic evidence only.', pass: true, disclosure: clone(disclosure) }
  ], disclosure);
  return outputs;
}
function buildMetadata(inputTexts, outputTexts, fixtures) {
  const outputHashes = Object.fromEntries(Object.entries(outputTexts).map(([name, text]) => [name, shaText(text)]));
  return {
    schema_version: '0.3.0', execution_id: 'SYN-EXEC-003', logical_time: fixtures.logical_time,
    disclosure: clone(fixtures.disclosure), runtime_contract: 'Node.js built-ins only; zero network; validator independent from orchestrator',
    immutable_inputs: {
      [VALIDATOR_NAME]: shaText(inputTexts[VALIDATOR_NAME]), [RUNNER_NAME]: shaText(inputTexts[RUNNER_NAME]),
      [FIXTURES_NAME]: shaText(inputTexts[FIXTURES_NAME]), [ORACLE_NAME]: shaText(inputTexts[ORACLE_NAME]),
      [SCHEMA_NAME]: shaText(inputTexts[SCHEMA_NAME])
    },
    derived_outputs: outputHashes,
    deterministic_serialization: 'UTF-8 LF JSON, two-space indentation, generator-defined insertion order',
    modes: ['--write', '--check'], reproducible_command: 'node visual/assets/run-closure-test.js --check',
    check_contract: '--check performs no writes and compares validator-derived results with committed oracle and committed outputs'
  };
}
function run(mode) {
  if (!['--write', '--check'].includes(mode)) throw new Error('usage: node run-closure-test.js --write|--check');
  const inputTexts = Object.fromEntries([VALIDATOR_NAME, RUNNER_NAME, FIXTURES_NAME, ORACLE_NAME, SCHEMA_NAME].map(name => [name, readText(name)]));
  const fixtures = JSON.parse(inputTexts[FIXTURES_NAME]);
  const oracle = JSON.parse(inputTexts[ORACLE_NAME]);
  const positiveResults = {};
  for (const asset of fixtures.positive_assets) positiveResults[asset.asset_id] = validator.validateAsset(asset);
  const negativeResults = {};
  for (const fixture of fixtures.negative_fixtures) negativeResults[fixture.fixture_id] = validator.validateAsset(fixture.asset);
  const actualOracle = {
    schema_version: oracle.schema_version,
    positive: Object.fromEntries(fixtures.positive_assets.map(asset => [asset.asset_id, resultProjection(asset.asset_id, positiveResults[asset.asset_id])])),
    negative: Object.fromEntries(fixtures.negative_fixtures.map(fixture => [fixture.fixture_id, {
      accepted: negativeResults[fixture.fixture_id].accepted, codes: negativeResults[fixture.fixture_id].codes
    }]))
  };
  assertEqual(actualOracle, oracle, 'validator result');
  const outputs = buildOutputs(fixtures, positiveResults, negativeResults);
  const outputTexts = Object.fromEntries(OUTPUT_NAMES.map(name => [name, stable(outputs[name])]));
  const metadataText = stable(buildMetadata(inputTexts, outputTexts, fixtures));
  if (mode === '--write') {
    for (const [name, text] of Object.entries(outputTexts)) fs.writeFileSync(path.join(ROOT, name), text, 'utf8');
    fs.writeFileSync(path.join(ROOT, METADATA_NAME), metadataText, 'utf8');
  } else {
    for (const [name, expected] of [...Object.entries(outputTexts), [METADATA_NAME, metadataText]]) {
      const target = path.join(ROOT, name);
      if (!fs.existsSync(target)) throw new Error(`missing committed execution output: ${name}`);
      const actual = fs.readFileSync(target, 'utf8');
      if (actual !== expected) throw new Error(`mutation detected or stale output: ${name}; expected sha256=${shaText(expected)}, actual sha256=${shaText(actual)}`);
    }
  }
  process.stdout.write(stable({ mode, validator_module: VALIDATOR_NAME, immutable_fixture_sets: 2,
    joined_golden_assets: fixtures.positive_assets.length, negatives_rejected: fixtures.negative_fixtures.length,
    outputs_checked: OUTPUT_NAMES.length + 1, mutation_free_check: mode === '--check' }));
}
try { run(MODE); } catch (error) { process.stderr.write(String(error.stack || error) + '\n'); process.exit(1); }
