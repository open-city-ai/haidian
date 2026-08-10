#!/usr/bin/env node
/*
 * T-02 G0 -> G1 synthetic governance replay.
 *
 * Default and --check modes are read-only: they regenerate the canonical result
 * in memory and compare it byte-for-byte with t02-g0-g1-replay-result.json.
 * --write is the only mode that writes the result file.
 *
 * This runner is deterministic, dependency-free, and offline. It does not call
 * a model, API, service, browser, network endpoint, or field system, and it does
 * not generate a substantive enterprise-service answer.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DIR = __dirname;
const SUBMISSION_ROOT = path.resolve(DIR, '..', '..');
const CONTRACT_FILE = 'g0-offline-enterprise-service-baseline.json';
const FIXTURE_FILE = 't02-g0-g1-replay-fixtures.json';
const PILOT_FILE = 'pilot-readiness-register.json';
const RESULT_FILE = 't02-g0-g1-replay-result.json';
const RUNNER_FILE = path.basename(__filename);
const RUNNER_VERSION = '1.0.0';

const REQUEST_CLASSES = new Set([
  'source_status',
  'opening_background',
  'policy_background',
  'provisional_precision',
  'formal_procedure',
  'unknown',
]);
const SOURCE_STATES = new Set(['current', 'stale', 'conflicting', 'not_applicable']);
const HUMAN_PATH_STATES = new Set(['available', 'unavailable', 'not_required']);
const PROHIBITED_DATA_CATEGORIES = new Set([
  'none',
  'identity_document_outside_authorized_workflow',
  'cross_user_conversation_reuse',
  'eligibility_inference_from_chat',
]);
const ANSWER_MODES = new Set([
  'source_status_only',
  'cite_scope_and_date',
  'refuse_and_handoff',
  'stop_and_recover',
]);

class ReplayValidationError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'ReplayValidationError';
    this.code = code;
  }
}

function fail(code, message) {
  throw new ReplayValidationError(code, message);
}

function assert(condition, code, message) {
  if (!condition) fail(code, message);
}

function sorted(values) {
  return [...values].sort((a, b) => String(a).localeCompare(String(b), 'en'));
}

function assertExactKeys(value, expectedKeys, code, label) {
  assert(value && typeof value === 'object' && !Array.isArray(value), code, `${label} must be an object`);
  const actual = sorted(Object.keys(value));
  const expected = sorted(expectedKeys);
  assert(JSON.stringify(actual) === JSON.stringify(expected), code,
    `${label} keys must be exactly ${expected.join(', ')}; got ${actual.join(', ')}`);
}

function assertString(value, code, label) {
  assert(typeof value === 'string' && value.length > 0, code, `${label} must be a non-empty string`);
}

function assertStringArray(value, code, label) {
  assert(Array.isArray(value), code, `${label} must be an array`);
  value.forEach((item, index) => assertString(item, code, `${label}[${index}]`));
}

function assertUnique(values, code, label) {
  assert(new Set(values).size === values.length, code, `${label} must contain unique values`);
}

function readBytes(filePath) {
  return fs.readFileSync(filePath);
}

function parseJsonBuffer(buffer, label) {
  try {
    return JSON.parse(buffer.toString('utf8'));
  } catch (error) {
    fail('JSON_PARSE', `${label} is not valid UTF-8 JSON: ${error.message}`);
  }
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function canonicalJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function questionMap(contract) {
  return new Map(contract.fixed_questions.map((question) => [question.question_id, question]));
}

function validateContract(contract, sourceIds) {
  assertExactKeys(contract, [
    'schema_version',
    'evidence',
    'fixed_questions',
    'source_contract',
    'governance_replay_contract',
    'replay_contract',
    'summary',
  ], 'STRICT_CONTRACT_KEYS', 'contract');
  assert(contract.schema_version === '0.2.0', 'CONTRACT_SCHEMA_VERSION', 'contract.schema_version must be 0.2.0');
  assertExactKeys(contract.evidence, [
    'register_id', 'as_of', 'status', 'protocol_id', 'current_gate',
    'purpose_zh', 'purpose_en',
  ], 'STRICT_EVIDENCE_KEYS', 'evidence');
  assert(contract.evidence.current_gate === 'G0', 'CONTRACT_GATE', 'contract must remain at G0');
  assert(contract.evidence.protocol_id === 'T-02', 'CONTRACT_PROTOCOL', 'contract protocol_id must be T-02');
  assert(contract.evidence.status === 'synthetic_governance_replay_passed_real_service_not_executed',
    'CONTRACT_STATUS', 'contract status must separate synthetic replay from real execution');

  assert(Array.isArray(contract.fixed_questions) && contract.fixed_questions.length === 5,
    'QUESTION_COUNT', 'contract must contain exactly five fixed questions');
  const questionIds = contract.fixed_questions.map((question) => question.question_id);
  assertUnique(questionIds, 'QUESTION_IDS_UNIQUE', 'fixed question ids');
  assert(JSON.stringify(questionIds) === JSON.stringify(['Q-001', 'Q-002', 'Q-003', 'Q-004', 'Q-005']),
    'QUESTION_IDS_ORDER', 'fixed question ids must be Q-001 through Q-005 in order');
  contract.fixed_questions.forEach((question, index) => {
    assertExactKeys(question, [
      'question_id', 'question_zh', 'question_en', 'source_ids',
      'allowed_use_zh', 'allowed_use_en', 'prohibited_inference_zh',
      'prohibited_inference_en', 'expected_answer_mode', 'on_failure_refusal_action',
    ], 'STRICT_QUESTION_KEYS', `fixed_questions[${index}]`);
    assertStringArray(question.source_ids, 'QUESTION_SOURCE_IDS', `fixed_questions[${index}].source_ids`);
    assertUnique(question.source_ids, 'QUESTION_SOURCE_IDS_UNIQUE', `fixed_questions[${index}].source_ids`);
    assert(ANSWER_MODES.has(question.expected_answer_mode), 'QUESTION_ANSWER_MODE',
      `fixed_questions[${index}].expected_answer_mode is not allowed`);
  });

  const expectedAnswerModes = {
    'Q-001': 'source_status_only',
    'Q-002': 'cite_scope_and_date',
    'Q-003': 'cite_scope_and_date',
    'Q-004': 'refuse_and_handoff',
    'Q-005': 'refuse_and_handoff',
  };
  for (const question of contract.fixed_questions) {
    assert(question.expected_answer_mode === expectedAnswerModes[question.question_id],
      'QUESTION_ANSWER_MODE_CONTRACT',
      `${question.question_id} expected_answer_mode does not match the frozen contract`);
  }

  assertExactKeys(contract.source_contract, [
    'permitted_source_ids', 'validation_rule', 'usage_limits',
  ], 'STRICT_SOURCE_CONTRACT_KEYS', 'source_contract');
  assertExactKeys(contract.source_contract.usage_limits, [
    'official_or_project_register', 'background', 'provisional_boundary', 'project_material',
  ], 'STRICT_SOURCE_USAGE_LIMIT_KEYS', 'source_contract.usage_limits');
  const permittedSourceIds = contract.source_contract.permitted_source_ids;
  assertStringArray(permittedSourceIds, 'PERMITTED_SOURCE_IDS', 'source_contract.permitted_source_ids');
  assertUnique(permittedSourceIds, 'PERMITTED_SOURCE_IDS_UNIQUE', 'source_contract.permitted_source_ids');
  for (const sourceId of permittedSourceIds) {
    assert(sourceIds.has(sourceId), 'PERMITTED_SOURCE_NOT_FOUND',
      `permitted source ${sourceId} does not exist in sources.json`);
  }
  for (const question of contract.fixed_questions) {
    for (const sourceId of question.source_ids) {
      assert(permittedSourceIds.includes(sourceId), 'QUESTION_SOURCE_NOT_PERMITTED',
        `${question.question_id} source ${sourceId} is not permitted by the contract`);
      assert(sourceIds.has(sourceId), 'QUESTION_SOURCE_NOT_FOUND',
        `${question.question_id} source ${sourceId} does not exist in sources.json`);
    }
  }

  const replay = contract.governance_replay_contract;
  assertExactKeys(replay, [
    'contract_version', 'fixture_set_id', 'runner_file', 'result_file',
    'decision_precedence', 'request_class_question_map', 'role_catalog',
    'approval_triggers', 'prohibited_data_categories', 'stop_events',
    'recovery_actions', 'independent_real_retest_template',
    'real_world_status_invariants',
  ], 'STRICT_GOVERNANCE_CONTRACT_KEYS', 'governance_replay_contract');
  assert(replay.contract_version === 'T02-G0-G1-REPLAY-1.0.0', 'REPLAY_CONTRACT_VERSION',
    'governance replay contract version mismatch');
  assert(replay.fixture_set_id === 'T02-G0-G1-SYNTHETIC-REPLAY-V1', 'FIXTURE_SET_REFERENCE',
    'governance replay contract fixture_set_id mismatch');
  assert(replay.runner_file === RUNNER_FILE, 'RUNNER_FILE_REFERENCE', 'runner_file reference mismatch');
  assert(replay.result_file === RESULT_FILE, 'RESULT_FILE_REFERENCE', 'result_file reference mismatch');
  assert(JSON.stringify(replay.decision_precedence) === JSON.stringify([
    'prohibited_data', 'unknown_request', 'stale_source', 'conflicting_source',
    'human_path_unavailable', 'bounded_request_class',
  ]), 'DECISION_PRECEDENCE', 'decision precedence must remain fixed');

  assertExactKeys(replay.request_class_question_map, [
    'source_status', 'opening_background', 'policy_background',
    'provisional_precision', 'formal_procedure', 'unknown',
  ], 'REQUEST_CLASS_MAP_KEYS', 'request_class_question_map');
  assert(replay.request_class_question_map.unknown === null, 'UNKNOWN_QUESTION_MAP', 'unknown must map to null');
  for (const requestClass of REQUEST_CLASSES) {
    if (requestClass === 'unknown') continue;
    assert(questionIds.includes(replay.request_class_question_map[requestClass]), 'REQUEST_CLASS_QUESTION_REF',
      `${requestClass} must map to a fixed question`);
  }

  assert(Array.isArray(replay.role_catalog) && replay.role_catalog.length > 0,
    'ROLE_CATALOG', 'role_catalog must be non-empty');
  const roleIds = replay.role_catalog.map((role) => role.role_id);
  assertUnique(roleIds, 'ROLE_IDS_UNIQUE', 'role ids');
  replay.role_catalog.forEach((role, index) => {
    assertExactKeys(role, ['role_id', 'raci', 'label_zh', 'label_en', 'assignment_status'],
      'STRICT_ROLE_KEYS', `role_catalog[${index}]`);
    assert(['A', 'R', 'C', 'I'].includes(role.raci), 'ROLE_RACI', `role_catalog[${index}].raci is invalid`);
    assert(role.assignment_status === 'unconfirmed', 'ROLE_ASSIGNMENT_STATUS',
      `role_catalog[${index}] must remain unconfirmed`);
  });

  assert(Array.isArray(replay.approval_triggers) && replay.approval_triggers.length > 0,
    'APPROVAL_TRIGGERS', 'approval_triggers must be non-empty');
  replay.approval_triggers.forEach((trigger, index) => {
    assertExactKeys(trigger, ['trigger_id', 'label_zh', 'label_en', 'status'],
      'STRICT_APPROVAL_TRIGGER_KEYS', `approval_triggers[${index}]`);
    assert(trigger.status === 'pending', 'APPROVAL_TRIGGER_STATUS',
      `approval_triggers[${index}] must remain pending`);
  });

  assertStringArray(replay.prohibited_data_categories, 'PROHIBITED_DATA_CATEGORIES',
    'prohibited_data_categories');
  assertUnique(replay.prohibited_data_categories, 'PROHIBITED_DATA_CATEGORIES_UNIQUE',
    'prohibited_data_categories');
  assert(JSON.stringify(sorted(replay.prohibited_data_categories)) === JSON.stringify(sorted([
    'identity_document_outside_authorized_workflow',
    'cross_user_conversation_reuse',
    'eligibility_inference_from_chat',
  ])), 'PROHIBITED_DATA_CATEGORY_SET', 'prohibited-data category set mismatch');

  assert(Array.isArray(replay.stop_events) && replay.stop_events.length === 4,
    'STOP_EVENT_COUNT', 'four stop events are required');
  assert(Array.isArray(replay.recovery_actions) && replay.recovery_actions.length === 4,
    'RECOVERY_ACTION_COUNT', 'four recovery actions are required');
  const stopEventIds = replay.stop_events.map((event) => event.event_id);
  const recoveryActionIds = replay.recovery_actions.map((action) => action.action_id);
  assertUnique(stopEventIds, 'STOP_EVENT_IDS_UNIQUE', 'stop event ids');
  assertUnique(recoveryActionIds, 'RECOVERY_ACTION_IDS_UNIQUE', 'recovery action ids');
  const recoveryIds = new Set(recoveryActionIds);
  const stopEventRecoveryById = new Map();
  replay.stop_events.forEach((event, index) => {
    assertExactKeys(event, ['event_id', 'label_zh', 'label_en', 'recovery_action_id'],
      'STRICT_STOP_EVENT_KEYS', `stop_events[${index}]`);
    assert(recoveryIds.has(event.recovery_action_id), 'STOP_RECOVERY_REF',
      `${event.event_id} recovery action does not exist`);
    stopEventRecoveryById.set(event.event_id, event.recovery_action_id);
  });
  replay.recovery_actions.forEach((action, index) => {
    assertExactKeys(action, [
      'action_id', 'label_zh', 'label_en', 'requires_full_synthetic_replay',
      'real_restart_authorized',
    ], 'STRICT_RECOVERY_ACTION_KEYS', `recovery_actions[${index}]`);
    assert(action.requires_full_synthetic_replay === true, 'RECOVERY_REPLAY_REQUIRED',
      `${action.action_id} must require a full synthetic replay`);
    assert(action.real_restart_authorized === false, 'RECOVERY_REAL_RESTART',
      `${action.action_id} must not authorise a real restart`);
  });

  assertExactKeys(replay.independent_real_retest_template, [
    'status', 'retester_role_id', 'confirmation_status',
    'conflict_of_interest_attestation', 'input_hashes', 'runner_version',
    'deviations', 'decision_diff', 'real_retest_result',
  ], 'STRICT_RETEST_TEMPLATE_KEYS', 'independent_real_retest_template');
  assert(replay.independent_real_retest_template.status === 'not_performed',
    'REAL_RETEST_STATUS', 'independent real retest must remain not_performed');
  assert(replay.independent_real_retest_template.confirmation_status === 'unconfirmed',
    'REAL_RETEST_CONFIRMATION', 'independent real retester must remain unconfirmed');
  assert(replay.independent_real_retest_template.real_retest_result === 'unknown',
    'REAL_RETEST_RESULT', 'independent real retest result must remain unknown');
  assert(roleIds.includes(replay.independent_real_retest_template.retester_role_id),
    'REAL_RETEST_ROLE_REF', 'independent retester role must exist in role_catalog');

  const invariants = replay.real_world_status_invariants;
  assertExactKeys(invariants, [
    'current_gate', 'completed_synthetic_governance_replays',
    'substantive_answer_outputs', 'model_calls', 'api_calls',
    'service_interactions', 'field_tests', 'approvals', 'confirmed_owner_roles',
    'completed_real_independent_retests', 'completed_g1_preregistrations',
    'approved_g1_collection_windows', 'completed_g1_field_executions',
    'known_g1_results', 'known_real_non_ai_parity_results',
  ], 'STRICT_STATUS_INVARIANT_KEYS', 'real_world_status_invariants');
  assert(invariants.current_gate === 'G0', 'STATUS_GATE', 'current gate invariant must remain G0');
  assert(invariants.completed_synthetic_governance_replays === 1,
    'SYNTHETIC_REPLAY_COUNT', 'exactly one synthetic governance replay must be recorded');
  for (const [key, value] of Object.entries(invariants)) {
    if (key === 'current_gate' || key === 'completed_synthetic_governance_replays') continue;
    assert(value === 0, 'REAL_WORLD_ZERO_INVARIANT', `${key} must remain 0`);
  }

  assertExactKeys(contract.replay_contract, [
    'replay_scope', 'steps', 'version_lock', 'input_summary', 'output_location',
    'refusal_and_handoff_contract', 'replayer_statement_zh', 'replayer_statement_en',
    'replay_kind', 'completed_replays', 'answer_outputs', 'model_calls', 'api_calls',
    'service_interactions', 'field_tests', 'approval_count', 'confirmed_owner_roles',
    'completed_real_independent_retests',
  ], 'STRICT_REPLAY_SUMMARY_KEYS', 'replay_contract');
  assertExactKeys(contract.replay_contract.version_lock, [
    'contract_version', 'fixture_set_id', 'runner_version', 'network_dependencies',
    'model_dependencies',
  ], 'STRICT_VERSION_LOCK_KEYS', 'replay_contract.version_lock');
  assert(contract.replay_contract.version_lock.contract_version === 'T02-G0-G1-REPLAY-1.0.0',
    'VERSION_LOCK_CONTRACT', 'contract version lock must remain T02-G0-G1-REPLAY-1.0.0');
  assert(contract.replay_contract.version_lock.fixture_set_id === 'T02-G0-G1-SYNTHETIC-REPLAY-V1',
    'VERSION_LOCK_FIXTURES', 'fixture set version lock must reference the canonical fixture set');
  assert(contract.replay_contract.version_lock.runner_version === RUNNER_VERSION,
    'VERSION_LOCK_RUNNER', 'runner version lock must match this runner');
  assert(contract.replay_contract.version_lock.network_dependencies === 0 &&
    contract.replay_contract.version_lock.model_dependencies === 0,
  'VERSION_LOCK_DEPENDENCIES', 'network and model dependencies must remain 0');
  assertExactKeys(contract.replay_contract.input_summary, [
    'fixed_question_count', 'synthetic_fixture_count', 'contains_real_personal_data',
    'source_snapshot',
  ], 'STRICT_INPUT_SUMMARY_KEYS', 'replay_contract.input_summary');
  assert(contract.replay_contract.input_summary.fixed_question_count === 5,
    'INPUT_SUMMARY_QUESTION_COUNT', 'input summary must declare exactly five fixed questions');
  assert(contract.replay_contract.input_summary.synthetic_fixture_count === 10,
    'INPUT_SUMMARY_FIXTURE_COUNT', 'input summary must declare exactly ten synthetic fixtures');
  assert(contract.replay_contract.input_summary.contains_real_personal_data === false,
    'INPUT_SUMMARY_PII', 'input summary must declare no real personal data');
  assert(contract.replay_contract.input_summary.source_snapshot === 'sources.json',
    'INPUT_SUMMARY_SOURCE', 'input summary must reference sources.json');
  assert(contract.replay_contract.output_location === `visual/assets/${RESULT_FILE}`,
    'REPLAY_OUTPUT_LOCATION', 'replay_contract.output_location must reference the canonical result file');
  assertExactKeys(contract.replay_contract.refusal_and_handoff_contract, [
    'rule_zh', 'rule_en', 'service_execution_authorized',
  ], 'STRICT_REFUSAL_CONTRACT_KEYS', 'replay_contract.refusal_and_handoff_contract');
  assertString(contract.replay_contract.refusal_and_handoff_contract.rule_zh,
    'REFUSAL_CONTRACT_TEXT', 'refusal_and_handoff_contract.rule_zh');
  assertString(contract.replay_contract.refusal_and_handoff_contract.rule_en,
    'REFUSAL_CONTRACT_TEXT', 'refusal_and_handoff_contract.rule_en');
  assert(contract.replay_contract.refusal_and_handoff_contract.service_execution_authorized === false,
    'SERVICE_EXECUTION_AUTHORIZATION', 'synthetic replay must not authorize service execution');
  assert(contract.replay_contract.completed_replays === 1, 'REPLAY_SUMMARY_COUNT',
    'replay_contract.completed_replays must be 1');
  assert(contract.replay_contract.replay_kind === 'synthetic_deterministic_governance_replay',
    'REPLAY_KIND', 'replay kind must be synthetic deterministic governance replay');
  for (const key of ['answer_outputs', 'model_calls', 'api_calls', 'service_interactions',
    'field_tests', 'approval_count', 'confirmed_owner_roles', 'completed_real_independent_retests']) {
    assert(contract.replay_contract[key] === 0, 'REPLAY_REAL_ZERO', `replay_contract.${key} must remain 0`);
  }

  assertExactKeys(contract.summary, [
    'question_count', 'question_contract_coverage_ratio', 'synthetic_fixture_count',
    'exact_expected_decision_match_count', 'decision_mismatch_count',
    'completed_offline_replays', 'known_answer_outputs', 'model_call_count',
    'api_call_count', 'service_interaction_count', 'field_execution_count',
    'approval_count', 'confirmed_owner_role_count',
    'completed_real_independent_retest_count', 'result_ref', 'coverage_definition',
  ], 'STRICT_CONTRACT_SUMMARY_KEYS', 'summary');
  assert(contract.summary.question_count === 5 &&
    contract.summary.question_contract_coverage_ratio === 1.0 &&
    contract.summary.synthetic_fixture_count === 10,
  'CONTRACT_SUMMARY_INPUTS', 'summary input counts must match the frozen contract');
  assert(contract.summary.exact_expected_decision_match_count === 10 &&
    contract.summary.decision_mismatch_count === 0,
  'CONTRACT_SUMMARY_DECISIONS', 'summary decision counts must match the checked synthetic replay');
  assert(contract.summary.completed_offline_replays === 1,
    'CONTRACT_SUMMARY_REPLAY_COUNT', 'summary completed_offline_replays must remain 1');
  for (const key of ['known_answer_outputs', 'model_call_count', 'api_call_count',
    'service_interaction_count', 'field_execution_count', 'approval_count',
    'confirmed_owner_role_count', 'completed_real_independent_retest_count']) {
    assert(contract.summary[key] === 0, 'CONTRACT_SUMMARY_REAL_ZERO', `summary.${key} must remain 0`);
  }
  assert(contract.summary.result_ref === `visual/assets/${RESULT_FILE}`,
    'CONTRACT_SUMMARY_RESULT_REF', 'summary result_ref must reference the canonical result file');
  assertString(contract.summary.coverage_definition,
    'CONTRACT_SUMMARY_COVERAGE', 'summary.coverage_definition');

  return {
    permittedSourceIds: new Set(permittedSourceIds),
    questions: questionMap(contract),
    replay,
    roleIds: new Set(roleIds),
    stopEventIds: new Set(stopEventIds),
    stopEventRecoveryById,
    recoveryIds,
  };
}

function validateFixtureEnvelope(fixtures) {
  assertExactKeys(fixtures, ['schema_version', 'fixture_set_id', 'scope', 'fixtures'],
    'STRICT_FIXTURE_SET_KEYS', 'fixture set');
  assert(fixtures.schema_version === '1.0.0', 'FIXTURE_SCHEMA_VERSION',
    'fixture schema_version must be 1.0.0');
  assert(fixtures.fixture_set_id === 'T02-G0-G1-SYNTHETIC-REPLAY-V1', 'FIXTURE_SET_ID',
    'fixture_set_id mismatch');
  assertExactKeys(fixtures.scope, [
    'synthetic_only', 'contains_real_personal_data', 'performs_model_or_api_calls',
    'performs_service_or_field_interactions', 'purpose_zh', 'purpose_en',
  ], 'STRICT_FIXTURE_SCOPE_KEYS', 'fixture scope');
  assert(fixtures.scope.synthetic_only === true, 'FIXTURE_SCOPE_SYNTHETIC', 'fixtures must be synthetic-only');
  assert(fixtures.scope.contains_real_personal_data === false, 'FIXTURE_SCOPE_PII',
    'fixtures must declare no real personal data');
  assert(fixtures.scope.performs_model_or_api_calls === false, 'FIXTURE_SCOPE_MODEL_API',
    'fixtures must not perform model or API calls');
  assert(fixtures.scope.performs_service_or_field_interactions === false, 'FIXTURE_SCOPE_SERVICE_FIELD',
    'fixtures must not perform service or field interactions');
  assert(Array.isArray(fixtures.fixtures) && fixtures.fixtures.length === 10,
    'FIXTURE_COUNT', 'fixture set must contain exactly 10 cases');
  const ids = fixtures.fixtures.map((fixture) => fixture.fixture_id);
  assertUnique(ids, 'FIXTURE_IDS_UNIQUE', 'fixture ids');
  assert(JSON.stringify(ids) === JSON.stringify(Array.from({ length: 10 }, (_, index) =>
    `T02-FIX-${String(index + 1).padStart(3, '0')}`)), 'FIXTURE_IDS_ORDER',
  'fixture ids must be T02-FIX-001 through T02-FIX-010 in order');
}

function validateSingleFixture(fixture, context, index) {
  const label = `fixtures[${index}]`;
  assertExactKeys(fixture, [
    'fixture_id', 'synthetic', 'contains_pii', 'real_service_interaction',
    'prompt_zh', 'prompt_en', 'input', 'expected',
  ], 'STRICT_FIXTURE_KEYS', label);
  assert(fixture.synthetic === true, 'FIXTURE_NOT_SYNTHETIC', `${label} must be synthetic`);
  assert(fixture.contains_pii === false, 'FIXTURE_CONTAINS_PII', `${label} must contain no PII`);
  assert(fixture.real_service_interaction === false, 'FIXTURE_REAL_SERVICE',
    `${label} must perform no real service interaction`);
  assertString(fixture.prompt_zh, 'FIXTURE_PROMPT_ZH', `${label}.prompt_zh`);
  assertString(fixture.prompt_en, 'FIXTURE_PROMPT_EN', `${label}.prompt_en`);

  const input = fixture.input;
  assertExactKeys(input, [
    'request_class', 'question_id', 'source_state', 'requested_source_ids',
    'human_path_state', 'contains_prohibited_data', 'prohibited_data_category',
  ], 'STRICT_INPUT_KEYS', `${label}.input`);
  assert(REQUEST_CLASSES.has(input.request_class), 'ENUM_REQUEST_CLASS',
    `${label}.input.request_class is not allowed`);
  assert(SOURCE_STATES.has(input.source_state), 'ENUM_SOURCE_STATE',
    `${label}.input.source_state is not allowed`);
  assert(HUMAN_PATH_STATES.has(input.human_path_state), 'ENUM_HUMAN_PATH_STATE',
    `${label}.input.human_path_state is not allowed`);
  assert(typeof input.contains_prohibited_data === 'boolean', 'INPUT_PROHIBITED_DATA_FLAG',
    `${label}.input.contains_prohibited_data must be boolean`);
  assert(PROHIBITED_DATA_CATEGORIES.has(input.prohibited_data_category),
    'ENUM_PROHIBITED_DATA_CATEGORY', `${label}.input.prohibited_data_category is not allowed`);
  assert((input.prohibited_data_category !== 'none') === input.contains_prohibited_data,
    'PROHIBITED_DATA_FLAG_CATEGORY_MATCH', `${label} prohibited-data flag and category must agree`);
  assertStringArray(input.requested_source_ids, 'INPUT_SOURCE_IDS', `${label}.input.requested_source_ids`);
  assertUnique(input.requested_source_ids, 'INPUT_SOURCE_IDS_UNIQUE', `${label}.input.requested_source_ids`);

  const mappedQuestionId = context.replay.request_class_question_map[input.request_class];
  assert(input.question_id === mappedQuestionId, 'REQUEST_CLASS_QUESTION_MISMATCH',
    `${label} question_id does not match request_class`);
  if (mappedQuestionId === null) {
    assert(input.requested_source_ids.length === 0, 'UNKNOWN_REQUEST_SOURCE_IDS',
      `${label} unknown request must not carry source ids`);
    assert(input.source_state === 'not_applicable', 'UNKNOWN_REQUEST_SOURCE_STATE',
      `${label} unknown request source_state must be not_applicable`);
  } else {
    const question = context.questions.get(mappedQuestionId);
    assert(question, 'QUESTION_REFERENCE', `${label} question does not exist`);
    for (const sourceId of input.requested_source_ids) {
      assert(context.permittedSourceIds.has(sourceId), 'SOURCE_NOT_PERMITTED',
        `${label} source ${sourceId} is outside the permitted source contract`);
    }
    assert(JSON.stringify(input.requested_source_ids) === JSON.stringify(question.source_ids),
      'FIXTURE_QUESTION_SOURCE_MISMATCH', `${label} requested source ids must equal the frozen question source ids`);
  }

  const expected = fixture.expected;
  assertExactKeys(expected, [
    'decision_code', 'answer_mode', 'substantive_answer', 'stop_event_id',
    'handoff_role_id', 'recovery_action_ids', 'allowed_source_ids',
    'data_action_id', 'non_ai_path_action_id',
  ], 'STRICT_EXPECTED_KEYS', `${label}.expected`);
  assertString(expected.decision_code, 'EXPECTED_DECISION_CODE', `${label}.expected.decision_code`);
  assert(ANSWER_MODES.has(expected.answer_mode), 'ENUM_EXPECTED_ANSWER_MODE',
    `${label}.expected.answer_mode is not allowed`);
  assert(expected.substantive_answer === false, 'EXPECTED_SUBSTANTIVE_ANSWER',
    `${label} must not expect a substantive answer`);
  assert(expected.stop_event_id === null || context.stopEventIds.has(expected.stop_event_id),
    'EXPECTED_STOP_EVENT_REF', `${label} stop_event_id is not declared`);
  assert(expected.handoff_role_id === null || context.roleIds.has(expected.handoff_role_id),
    'EXPECTED_HANDOFF_ROLE_REF', `${label} handoff_role_id is not declared`);
  assertStringArray(expected.recovery_action_ids, 'EXPECTED_RECOVERY_IDS',
    `${label}.expected.recovery_action_ids`);
  expected.recovery_action_ids.forEach((actionId) => assert(context.recoveryIds.has(actionId),
    'EXPECTED_RECOVERY_REF', `${label} recovery action ${actionId} is not declared`));
  assertStringArray(expected.allowed_source_ids, 'EXPECTED_ALLOWED_SOURCE_IDS',
    `${label}.expected.allowed_source_ids`);
  expected.allowed_source_ids.forEach((sourceId) => assert(context.permittedSourceIds.has(sourceId),
    'EXPECTED_SOURCE_NOT_PERMITTED', `${label} expected source ${sourceId} is not permitted`));
  assertString(expected.data_action_id, 'EXPECTED_DATA_ACTION', `${label}.expected.data_action_id`);
  assertString(expected.non_ai_path_action_id, 'EXPECTED_NON_AI_ACTION',
    `${label}.expected.non_ai_path_action_id`);
}

function decisionFor(input, question) {
  if (input.contains_prohibited_data) {
    return {
      decision_code: 'STOP_PROHIBITED_DATA',
      answer_mode: 'stop_and_recover',
      substantive_answer: false,
      stop_event_id: 'STOP-PROHIBITED-DATA',
      handoff_role_id: 'privacy_incident_reviewer',
      recovery_action_ids: ['RECOVER-PROHIBITED-DATA-INCIDENT-AND-FULL-REPLAY'],
      allowed_source_ids: [],
      data_action_id: 'DATA-REJECT-DO-NOT-RETAIN',
      non_ai_path_action_id: 'NONAI-RESPONSIBLE-HUMAN-SERVICE-CHANNEL',
    };
  }
  if (input.request_class === 'unknown') {
    return {
      decision_code: 'REFUSE_UNKNOWN_REQUEST',
      answer_mode: 'refuse_and_handoff',
      substantive_answer: false,
      stop_event_id: null,
      handoff_role_id: 'service_information_owner',
      recovery_action_ids: [],
      allowed_source_ids: [],
      data_action_id: 'DATA-NO-RETENTION',
      non_ai_path_action_id: 'NONAI-PUBLISHED-SOURCE-REGISTER',
    };
  }
  if (input.source_state === 'stale') {
    return {
      decision_code: 'STOP_STALE_SOURCE',
      answer_mode: 'stop_and_recover',
      substantive_answer: false,
      stop_event_id: 'STOP-STALE-SOURCE',
      handoff_role_id: 'source_pack_custodian',
      recovery_action_ids: ['RECOVER-FREEZE-CORRECT-RETEST-SOURCE-PACK'],
      allowed_source_ids: [],
      data_action_id: 'DATA-NO-RETENTION',
      non_ai_path_action_id: input.request_class === 'policy_background'
        ? 'NONAI-PUBLISHED-POLICY-SOURCES'
        : 'NONAI-PUBLISHED-SOURCE-PAGE',
    };
  }
  if (input.source_state === 'conflicting') {
    return {
      decision_code: 'STOP_SOURCE_CONFLICT',
      answer_mode: 'stop_and_recover',
      substantive_answer: false,
      stop_event_id: 'STOP-SOURCE-CONFLICT',
      handoff_role_id: 'service_information_owner',
      recovery_action_ids: ['RECOVER-RESOLVE-CONFLICT-AND-FULL-REPLAY'],
      allowed_source_ids: [],
      data_action_id: 'DATA-NO-RETENTION',
      non_ai_path_action_id: 'NONAI-PUBLISHED-POLICY-SOURCES',
    };
  }
  if (input.human_path_state === 'unavailable') {
    return {
      decision_code: 'STOP_HUMAN_PATH_UNAVAILABLE',
      answer_mode: 'stop_and_recover',
      substantive_answer: false,
      stop_event_id: 'STOP-HUMAN-PATH-UNAVAILABLE',
      handoff_role_id: 'staffed_handoff_lead',
      recovery_action_ids: ['RECOVER-RESTORE-HUMAN-PATH-AND-FULL-REPLAY'],
      allowed_source_ids: [],
      data_action_id: 'DATA-NO-RETENTION',
      non_ai_path_action_id: 'NONAI-PUBLISHED-SOURCE-REGISTER',
    };
  }

  if (input.request_class === 'source_status') {
    return {
      decision_code: 'ALLOW_SOURCE_STATUS_NAVIGATION',
      answer_mode: 'source_status_only',
      substantive_answer: false,
      stop_event_id: null,
      handoff_role_id: null,
      recovery_action_ids: [],
      allowed_source_ids: question.source_ids,
      data_action_id: 'DATA-NO-RETENTION',
      non_ai_path_action_id: 'NONAI-PUBLISHED-SOURCE-REGISTER',
    };
  }
  if (input.request_class === 'opening_background') {
    return {
      decision_code: 'ALLOW_BOUNDED_BACKGROUND_CITATION',
      answer_mode: 'cite_scope_and_date',
      substantive_answer: false,
      stop_event_id: null,
      handoff_role_id: null,
      recovery_action_ids: [],
      allowed_source_ids: question.source_ids,
      data_action_id: 'DATA-NO-RETENTION',
      non_ai_path_action_id: 'NONAI-PUBLISHED-SOURCE-PAGE',
    };
  }
  if (input.request_class === 'policy_background') {
    return {
      decision_code: 'ALLOW_BOUNDED_BACKGROUND_CITATION',
      answer_mode: 'cite_scope_and_date',
      substantive_answer: false,
      stop_event_id: null,
      handoff_role_id: null,
      recovery_action_ids: [],
      allowed_source_ids: question.source_ids,
      data_action_id: 'DATA-NO-RETENTION',
      non_ai_path_action_id: 'NONAI-PUBLISHED-POLICY-SOURCES',
    };
  }
  if (input.request_class === 'provisional_precision') {
    return {
      decision_code: 'REFUSE_PROVISIONAL_PRECISION',
      answer_mode: 'refuse_and_handoff',
      substantive_answer: false,
      stop_event_id: null,
      handoff_role_id: 'authoritative_boundary_or_land_administration',
      recovery_action_ids: [],
      allowed_source_ids: [],
      data_action_id: 'DATA-NO-RETENTION',
      non_ai_path_action_id: 'NONAI-AUTHORITATIVE-BOUNDARY-CHANNEL',
    };
  }
  if (input.request_class === 'formal_procedure') {
    return {
      decision_code: 'REFUSE_FORMAL_PROCEDURE',
      answer_mode: 'refuse_and_handoff',
      substantive_answer: false,
      stop_event_id: null,
      handoff_role_id: 'staffed_handoff_lead',
      recovery_action_ids: [],
      allowed_source_ids: [],
      data_action_id: 'DATA-NO-RETENTION',
      non_ai_path_action_id: 'NONAI-RESPONSIBLE-HUMAN-SERVICE-CHANNEL',
    };
  }
  fail('DECISION_FAIL_CLOSED', `no decision rule for request_class=${input.request_class}`);
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function expectedValidationFailure(mutator, expectedCode, fixture, context) {
  const altered = JSON.parse(JSON.stringify(fixture));
  mutator(altered);
  try {
    validateSingleFixture(altered, context, 0);
    return { expected_failure_code: expectedCode, observed_failure_code: null, status: 'fail' };
  } catch (error) {
    if (!(error instanceof ReplayValidationError)) throw error;
    return {
      expected_failure_code: expectedCode,
      observed_failure_code: error.code,
      status: error.code === expectedCode ? 'pass' : 'fail',
    };
  }
}

function expectedPrecedenceDecision(mutator, expectedDecisionCode, fixture, context) {
  const altered = JSON.parse(JSON.stringify(fixture));
  mutator(altered);
  try {
    validateSingleFixture(altered, context, 0);
    const question = altered.input.question_id === null
      ? null
      : context.questions.get(altered.input.question_id);
    const actual = decisionFor(altered.input, question);
    return {
      expected_decision_code: expectedDecisionCode,
      observed_decision_code: actual.decision_code,
      status: actual.decision_code === expectedDecisionCode ? 'pass' : 'fail',
    };
  } catch (error) {
    if (!(error instanceof ReplayValidationError)) throw error;
    return {
      expected_decision_code: expectedDecisionCode,
      observed_decision_code: null,
      validation_failure_code: error.code,
      status: 'fail',
    };
  }
}

function expectedContractValidationFailure(mutator, expectedCode, contract, sourceIds) {
  const altered = JSON.parse(JSON.stringify(contract));
  mutator(altered);
  try {
    validateContract(altered, sourceIds);
    return { expected_failure_code: expectedCode, observed_failure_code: null, status: 'fail' };
  } catch (error) {
    if (!(error instanceof ReplayValidationError)) throw error;
    return {
      expected_failure_code: expectedCode,
      observed_failure_code: error.code,
      status: error.code === expectedCode ? 'pass' : 'fail',
    };
  }
}

function validatePilotReadiness(pilot, replay) {
  assert(pilot && Array.isArray(pilot.records), 'PILOT_RECORDS_SHAPE',
    'pilot-readiness register must contain a records array');
  const roleIdsByRaci = { A: [], R: [], C: [], I: [] };
  for (const role of replay.role_catalog) roleIdsByRaci[role.raci].push(role.role_id);
  for (const values of Object.values(roleIdsByRaci)) values.sort();
  assert(roleIdsByRaci.A.length === 1, 'PILOT_ACCOUNTABLE_ROLE_COUNT',
    'canonical role catalog must contain exactly one accountable role');

  const checkedItemIds = ['JZ-05', 'T-02'];
  for (const itemId of checkedItemIds) {
    const matches = pilot.records.filter((record) => record.item_id === itemId);
    assert(matches.length === 1, 'PILOT_RECORD_REFERENCE',
      `pilot-readiness register must contain exactly one ${itemId} record`);
    const canonical = matches[0].canonical_role_ids;
    assertExactKeys(canonical, ['accountable', 'responsible', 'consulted', 'informed'],
      'STRICT_PILOT_CANONICAL_ROLE_KEYS', `${itemId}.canonical_role_ids`);
    assert(canonical.accountable === roleIdsByRaci.A[0], 'PILOT_CANONICAL_RACI_CLOSURE',
      `${itemId} accountable role does not close to the canonical catalog`);
    assert(sameJson(sorted(canonical.responsible), roleIdsByRaci.R),
      'PILOT_CANONICAL_RACI_CLOSURE',
      `${itemId} responsible roles do not close to the canonical catalog`);
    assert(sameJson(sorted(canonical.consulted), roleIdsByRaci.C),
      'PILOT_CANONICAL_RACI_CLOSURE',
      `${itemId} consulted roles do not close to the canonical catalog`);
    assert(sameJson(sorted(canonical.informed), roleIdsByRaci.I),
      'PILOT_CANONICAL_RACI_CLOSURE',
      `${itemId} informed roles do not close to the canonical catalog`);
  }
  return { checked_item_ids: checkedItemIds, canonical_role_count: replay.role_catalog.length };
}

function expectedPilotValidationFailure(mutator, expectedCode, pilot, replay) {
  const altered = JSON.parse(JSON.stringify(pilot));
  mutator(altered);
  try {
    validatePilotReadiness(altered, replay);
    return { expected_failure_code: expectedCode, observed_failure_code: null, status: 'fail' };
  } catch (error) {
    if (!(error instanceof ReplayValidationError)) throw error;
    return {
      expected_failure_code: expectedCode,
      observed_failure_code: error.code,
      status: error.code === expectedCode ? 'pass' : 'fail',
    };
  }
}

function buildResult(contractBytes, fixtureBytes, pilotBytes, runnerBytes, sourcesBytes) {
  const contract = parseJsonBuffer(contractBytes, CONTRACT_FILE);
  const fixtureSet = parseJsonBuffer(fixtureBytes, FIXTURE_FILE);
  const pilot = parseJsonBuffer(pilotBytes, PILOT_FILE);
  const sources = parseJsonBuffer(sourcesBytes, 'sources.json');
  assert(sources && Array.isArray(sources.sources), 'SOURCES_SHAPE', 'sources.json must contain a sources array');
  const rawSourceIds = sources.sources.map((source) => source.id);
  assert(!rawSourceIds.includes(undefined), 'SOURCE_ID_REQUIRED', 'every sources.json record must have an id');
  assertUnique(rawSourceIds, 'SOURCE_IDS_UNIQUE', 'sources.json ids');
  const sourceIds = new Set(rawSourceIds);

  const context = validateContract(contract, sourceIds);
  validateFixtureEnvelope(fixtureSet);
  const raciClosure = validatePilotReadiness(pilot, context.replay);

  const cases = fixtureSet.fixtures.map((fixture, index) => {
    validateSingleFixture(fixture, context, index);
    const question = fixture.input.question_id === null ? null : context.questions.get(fixture.input.question_id);
    const actual = decisionFor(fixture.input, question);
    return {
      fixture_id: fixture.fixture_id,
      expected_decision: fixture.expected,
      actual_decision: actual,
      exact_match: sameJson(fixture.expected, actual),
    };
  });

  const negativeControls = [
    {
      control_id: 'NEG-EXTRA-FIXTURE-TOP-LEVEL-FIELD-FAIL-CLOSED',
      ...expectedValidationFailure(
        (fixture) => { fixture.unregistered_top_level_field = true; },
        'STRICT_FIXTURE_KEYS', fixtureSet.fixtures[0], context,
      ),
    },
    {
      control_id: 'NEG-EXTRA-EXPECTED-FIELD-FAIL-CLOSED',
      ...expectedValidationFailure(
        (fixture) => { fixture.expected.unregistered_expected_field = true; },
        'STRICT_EXPECTED_KEYS', fixtureSet.fixtures[0], context,
      ),
    },
    {
      control_id: 'NEG-UNKNOWN-ENUM-FAIL-CLOSED',
      ...expectedValidationFailure(
        (fixture) => { fixture.input.request_class = 'not_registered'; },
        'ENUM_REQUEST_CLASS', fixtureSet.fixtures[0], context,
      ),
    },
    {
      control_id: 'NEG-EXTRA-INPUT-FIELD-FAIL-CLOSED',
      ...expectedValidationFailure(
        (fixture) => { fixture.input.unregistered_field = true; },
        'STRICT_INPUT_KEYS', fixtureSet.fixtures[0], context,
      ),
    },
    {
      control_id: 'NEG-UNPERMITTED-SOURCE-FAIL-CLOSED',
      ...expectedValidationFailure(
        (fixture) => { fixture.input.requested_source_ids = ['UNREGISTERED-SOURCE']; },
        'SOURCE_NOT_PERMITTED', fixtureSet.fixtures[0], context,
      ),
    },
    {
      control_id: 'NEG-PROHIBITED-DATA-PRECEDENCE-OVER-STALE-FORMAL-HUMAN-UNAVAILABLE',
      ...expectedPrecedenceDecision(
        (fixture) => {
          fixture.input.source_state = 'stale';
          fixture.input.human_path_state = 'unavailable';
          fixture.input.contains_prohibited_data = true;
          fixture.input.prohibited_data_category = 'identity_document_outside_authorized_workflow';
        },
        'STOP_PROHIBITED_DATA', fixtureSet.fixtures[4], context,
      ),
    },
    {
      control_id: 'NEG-EXTRA-SOURCE-CONTRACT-FIELD-FAIL-CLOSED',
      ...expectedContractValidationFailure(
        (altered) => { altered.source_contract.unregistered_contract_field = true; },
        'STRICT_SOURCE_CONTRACT_KEYS', contract, sourceIds,
      ),
    },
    {
      control_id: 'NEG-CONTRACT-ANSWER-MODE-DRIFT-FAIL-CLOSED',
      ...expectedContractValidationFailure(
        (altered) => { altered.fixed_questions[1].expected_answer_mode = 'refuse_and_handoff'; },
        'QUESTION_ANSWER_MODE_CONTRACT', contract, sourceIds,
      ),
    },
    {
      control_id: 'NEG-PERMITTED-SOURCE-CLOSURE-FAIL-CLOSED',
      ...expectedContractValidationFailure(
        (altered) => { altered.source_contract.permitted_source_ids.push('MISSING-SOURCE'); },
        'PERMITTED_SOURCE_NOT_FOUND', contract, sourceIds,
      ),
    },
    {
      control_id: 'NEG-PILOT-CANONICAL-RACI-CLOSURE-FAIL-CLOSED',
      ...expectedPilotValidationFailure(
        (altered) => {
          const record = altered.records.find((item) => item.item_id === 'T-02');
          record.canonical_role_ids.consulted = record.canonical_role_ids.consulted
            .filter((roleId) => roleId !== 'authoritative_boundary_or_land_administration');
        },
        'PILOT_CANONICAL_RACI_CLOSURE', pilot, context.replay,
      ),
    },
    {
      control_id: 'NEG-SERVICE-AUTHORIZATION-FAIL-CLOSED',
      ...expectedContractValidationFailure(
        (altered) => {
          altered.replay_contract.refusal_and_handoff_contract.service_execution_authorized = true;
        },
        'SERVICE_EXECUTION_AUTHORIZATION', contract, sourceIds,
      ),
    },
    {
      control_id: 'NEG-CONTRACT-SUMMARY-APPROVAL-FAIL-CLOSED',
      ...expectedContractValidationFailure(
        (altered) => { altered.summary.approval_count = 1; },
        'CONTRACT_SUMMARY_REAL_ZERO', contract, sourceIds,
      ),
    },
    {
      control_id: 'NEG-CONTRACT-SUMMARY-REPLAY-COUNT-FAIL-CLOSED',
      ...expectedContractValidationFailure(
        (altered) => { altered.summary.completed_offline_replays = 99; },
        'CONTRACT_SUMMARY_REPLAY_COUNT', contract, sourceIds,
      ),
    },
  ];

  const mismatches = cases.filter((item) => !item.exact_match).length;
  const stopCases = cases.filter((item) => item.actual_decision.stop_event_id !== null);
  const recoveryCases = stopCases.filter((item) => item.actual_decision.recovery_action_ids.length > 0);
  const observedStopEventIds = new Set(stopCases.map((item) => item.actual_decision.stop_event_id));
  const declaredStopEventIds = [...context.stopEventIds].sort();
  const coveredStopEventIds = [...observedStopEventIds].sort();
  const stopEventSetClosed = sameJson(coveredStopEventIds, declaredStopEventIds);
  const exactStopRecoveryCases = stopCases.filter((item) => {
    const expectedRecoveryId = context.stopEventRecoveryById.get(item.actual_decision.stop_event_id);
    return sameJson(item.actual_decision.recovery_action_ids, [expectedRecoveryId]);
  });
  const unresolvedSourceIds = [...context.permittedSourceIds]
    .filter((id) => !sourceIds.has(id))
    .sort();
  const negativeFailures = negativeControls.filter((item) => item.status !== 'pass').length;
  const allPass = mismatches === 0 &&
    negativeFailures === 0 &&
    unresolvedSourceIds.length === 0 &&
    stopCases.length === recoveryCases.length &&
    stopEventSetClosed &&
    exactStopRecoveryCases.length === stopCases.length;

  return {
    schema_version: '1.0.0',
    result_id: 'T02-G0-G1-SYNTHETIC-REPLAY-RESULT-V1',
    replay_kind: 'synthetic_deterministic_governance_replay',
    current_gate: 'G0',
    runner: {
      file: RUNNER_FILE,
      version: RUNNER_VERSION,
      runtime_requirement: 'Node.js 22.x with built-in fs, path, and crypto modules only',
      reviewed_runtime: 'Node.js 22.x; v22.22.3 observed for the checked-in result',
      default_mode: 'read_only_check',
      network_or_model_calls: 0,
    },
    inputs: {
      [CONTRACT_FILE]: { sha256: sha256(contractBytes) },
      [FIXTURE_FILE]: { sha256: sha256(fixtureBytes) },
      [PILOT_FILE]: { sha256: sha256(pilotBytes) },
      [RUNNER_FILE]: { sha256: sha256(runnerBytes) },
      'sources.json': { sha256: sha256(sourcesBytes) },
    },
    source_closure: {
      permitted_source_count: context.permittedSourceIds.size,
      resolved_permitted_source_count: [...context.permittedSourceIds].filter((id) => sourceIds.has(id)).length,
      unresolved_source_ids: unresolvedSourceIds,
      closure_ratio: unresolvedSourceIds.length === 0 ? 1.0 : 0.0,
    },
    canonical_raci_closure: raciClosure,
    cases,
    negative_controls: negativeControls,
    summary: {
      fixture_count: cases.length,
      exact_expected_decision_match_count: cases.length - mismatches,
      decision_mismatch_count: mismatches,
      expected_decision_match_ratio: cases.length === 0 ? 0 : (cases.length - mismatches) / cases.length,
      stop_branch_count: stopCases.length,
      stop_branches_with_recovery_count: recoveryCases.length,
      declared_stop_event_count: declaredStopEventIds.length,
      covered_unique_stop_event_count: coveredStopEventIds.length,
      exact_stop_event_recovery_mapping_count: exactStopRecoveryCases.length,
      stop_event_coverage_ratio: declaredStopEventIds.length === 0
        ? 0
        : coveredStopEventIds.length / declaredStopEventIds.length,
      negative_control_count: negativeControls.length,
      exact_negative_control_pass_count: negativeControls.length - negativeFailures,
      completed_synthetic_governance_replays: allPass ? 1 : 0,
    },
    real_world_status: contract.governance_replay_contract.real_world_status_invariants,
    proves_zh: "证明固定合成案例下的合同字段、来源闭包、规则优先级、精确预期决策、停机与恢复分支可被确定性重放。",
    proves_en: "Demonstrates deterministic replay of contract fields, source closure, rule precedence, exact expected decisions, and stop/recovery branches for fixed synthetic cases.",
    does_not_prove: [
      "No substantive service answer, answer correctness, model quality, source freshness, or successful real handoff is proven.",
      "No service interaction, field test, site condition, approval, accountable owner, community co-test, or operating result is proven.",
      "No G1 preregistration, approved collection window, real independent retest, non-AI parity result, or gate advancement is proven."
    ],
    result: allPass ? 'PASS' : 'FAIL',
  };
}

function main() {
  const args = process.argv.slice(2);
  assert(args.length <= 1 && (args.length === 0 || args[0] === '--check' || args[0] === '--write'),
    'CLI_ARGUMENT', 'usage: node run_t02_g0_g1_replay.js [--check|--write]');
  const mode = args[0] === '--write' ? 'write' : 'check';

  const contractPath = path.join(DIR, CONTRACT_FILE);
  const fixturePath = path.join(DIR, FIXTURE_FILE);
  const pilotPath = path.join(DIR, PILOT_FILE);
  const resultPath = path.join(DIR, RESULT_FILE);
  const sourcesPath = path.join(SUBMISSION_ROOT, 'sources.json');
  const runnerPath = __filename;
  const output = canonicalJson(buildResult(
    readBytes(contractPath),
    readBytes(fixturePath),
    readBytes(pilotPath),
    readBytes(runnerPath),
    readBytes(sourcesPath),
  ));

  if (mode === 'write') {
    fs.writeFileSync(resultPath, output, 'utf8');
    process.stdout.write(`WRITE PASS: ${RESULT_FILE} updated from 10 synthetic fixtures\n`);
    return;
  }

  assert(fs.existsSync(resultPath), 'RESULT_FILE_MISSING', `${RESULT_FILE} does not exist; run --write explicitly`);
  const existing = fs.readFileSync(resultPath, 'utf8');
  assert(existing === output, 'RESULT_FILE_MISMATCH', `${RESULT_FILE} differs from the deterministic replay`);
  const result = JSON.parse(existing);
  assert(result.result === 'PASS', 'RESULT_NOT_PASS', 'checked result is not PASS');
  process.stdout.write(
    `CHECK PASS: fixtures=${result.summary.fixture_count}; exact=${result.summary.exact_expected_decision_match_count}; ` +
    `mismatches=${result.summary.decision_mismatch_count}; controls=${result.summary.exact_negative_control_pass_count}; ` +
    `stop_events=${result.summary.covered_unique_stop_event_count}/${result.summary.declared_stop_event_count}; ` +
    `synthetic_replays=1; real_service_interactions=0\n`,
  );
}

try {
  main();
} catch (error) {
  if (error instanceof ReplayValidationError) {
    process.stderr.write(`CHECK FAIL [${error.code}]: ${error.message}\n`);
    process.exit(1);
  }
  process.stderr.write(`CHECK FAIL [UNEXPECTED]: ${error.stack || error.message}\n`);
  process.exit(1);
}
