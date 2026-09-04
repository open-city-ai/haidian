const fs = require('fs');
const path = require('path');

const defaultPath = path.join(__dirname, 'open-pulse-release-chain.json');
const inputPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultPath;
const contract = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

function assertCondition(condition, label) {
  if (!condition) throw new Error(`FAIL ${label}`);
  console.log(`PASS ${label}`);
}

function assertNonEmptyString(value, label) {
  assertCondition(typeof value === 'string' && value.trim() !== '', label);
}

function assertNonEmptyStringArray(value, label) {
  assertCondition(
    Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'string' && item.trim() !== ''),
    label,
  );
}

function assertUniqueIds(items, label) {
  const ids = items.map((item) => item && item.id);
  assertCondition(
    ids.every((id) => typeof id === 'string' && id.trim() !== '') && new Set(ids).size === ids.length,
    label,
  );
}

assertCondition(contract && typeof contract === 'object' && !Array.isArray(contract), 'contract_object');
assertNonEmptyString(contract.contract_id, 'contract_id');
assertNonEmptyString(contract.version, 'contract_version');

const requiredBoundary = {
  official_boundary: false,
  authorization: 0,
  field_observations: 0,
  local_baseline: 'unknown',
  operational_status: 'not_authorized_not_run',
  performance_results: null,
  public_rank_claim: false,
};
for (const [key, value] of Object.entries(requiredBoundary)) {
  assertCondition(contract.boundary[key] === value, `boundary_${key}`);
}
assertCondition(contract.default_decision === 'HOLD', 'default_decision_hold');
assertCondition(contract.claim_level === 'design_contract_only', 'design_only_claim_level');
assertCondition(contract.ordinary_service_first && typeof contract.ordinary_service_first === 'object', 'ordinary_service_object');
assertNonEmptyStringArray(contract.ordinary_service_first.base_modes, 'ordinary_service_base_modes');
assertCondition(new Set(contract.ordinary_service_first.base_modes).size === contract.ordinary_service_first.base_modes.length, 'ordinary_service_unique_modes');
for (const requiredMode of ['walking', 'staffed_service', 'handcart_delivery']) {
  assertCondition(contract.ordinary_service_first.base_modes.includes(requiredMode), `ordinary_service_mode_${requiredMode}`);
}
assertCondition(contract.ordinary_service_first.must_remain_available === true, 'ordinary_service_first');
assertCondition(contract.ordinary_service_first.no_app_route === true, 'no_app_route');
assertNonEmptyString(contract.ordinary_service_first.acceptance, 'ordinary_service_acceptance');

assertCondition(Array.isArray(contract.states), 'states_array');
const stateIds = contract.states.map((state) => state.id);
assertCondition(JSON.stringify(stateIds) === JSON.stringify(['BASE', 'BOOST', 'BLACKOUT', 'BEQUEST']), 'four_public_states');
assertUniqueIds(contract.states, 'unique_state_ids');
const expectedStateModes = {
  BASE: 'off',
  BOOST: 'reversible_assist',
  BLACKOUT: 'off',
  BEQUEST: 'archived',
};
for (const state of contract.states) {
  assertCondition(state && typeof state === 'object', `state_${state.id}_object`);
  assertNonEmptyString(state.meaning, `state_${state.id}_meaning`);
  assertNonEmptyString(state.ai_mode, `state_${state.id}_ai_mode`);
  assertNonEmptyString(state.release_condition, `state_${state.id}_release_condition`);
  assertCondition(state.ai_mode === expectedStateModes[state.id], `state_${state.id}_mode_mapping`);
}

assertCondition(Array.isArray(contract.first_168h), 'first_168h_array');
assertCondition(contract.first_168h.length === 4, 'four_168h_horizons');
assertUniqueIds(contract.first_168h, 'unique_168h_ids');
const expectedHorizons = ['0-24h', '24-72h', '72-120h', '120-168h'];
for (const horizon of contract.first_168h) {
  assertCondition(horizon && typeof horizon === 'object', 'horizon_object');
  assertNonEmptyString(horizon.id, `horizon_${horizon.id}_id`);
  assertNonEmptyString(horizon.window, `horizon_${horizon.id}_window`);
  assertNonEmptyString(horizon.owner_role, `horizon_${horizon.id}_owner_role`);
  assertNonEmptyStringArray(horizon.evidence, `horizon_${horizon.id}_evidence`);
  assertNonEmptyStringArray(horizon.acceptance_checks, `horizon_${horizon.id}_acceptance_checks`);
  assertNonEmptyStringArray(horizon.stop_conditions, `horizon_${horizon.id}_stop_conditions`);
  assertNonEmptyString(horizon.public_artifact, `horizon_${horizon.id}_public_artifact`);
}
assertCondition(
  JSON.stringify(contract.first_168h.map((horizon) => horizon.window)) === JSON.stringify(expectedHorizons),
  'four_168h_windows',
);
assertCondition(Array.isArray(contract.first_12_weeks), 'first_12_weeks_array');
assertCondition(contract.first_12_weeks.length === 6, 'six_12_week_windows');
assertUniqueIds(contract.first_12_weeks, 'unique_12_week_ids');
for (const window of contract.first_12_weeks) {
  assertCondition(window && typeof window === 'object', 'window_object');
  for (const field of ['id', 'gate', 'owner_role', 'evidence', 'stop_conditions', 'fallback']) {
    assertNonEmptyString(window[field], `window_${window.id}_${field}`);
  }
}
assertCondition(Array.isArray(contract.review_dimensions), 'review_dimensions_array');
assertCondition(contract.review_dimensions.length === 7, 'seven_review_dimensions');
assertUniqueIds(contract.review_dimensions, 'unique_review_dimension_ids');
assertCondition(contract.review_dimensions.every((item) => {
  return item && typeof item === 'object'
    && typeof item.id === 'string' && item.id.trim() !== ''
    && typeof item.question === 'string' && item.question.trim() !== ''
    && Array.isArray(item.field_claims) && item.field_claims.length === 0;
}), 'review_dimensions_are_claim_free');
console.log('PASS release chain is fail-closed and non-authorizing');
