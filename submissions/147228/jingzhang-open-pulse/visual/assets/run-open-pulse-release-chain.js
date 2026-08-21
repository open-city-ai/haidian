const fs = require('fs');
const path = require('path');

const defaultPath = path.join(__dirname, 'open-pulse-release-chain.json');
const inputPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultPath;
const contract = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

function assertCondition(condition, label) {
  if (!condition) throw new Error(`FAIL ${label}`);
  console.log(`PASS ${label}`);
}

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
assertCondition(contract.ordinary_service_first.must_remain_available === true, 'ordinary_service_first');
assertCondition(contract.ordinary_service_first.no_app_route === true, 'no_app_route');

const stateIds = contract.states.map((state) => state.id);
assertCondition(JSON.stringify(stateIds) === JSON.stringify(['BASE', 'BOOST', 'BLACKOUT', 'BEQUEST']), 'four_public_states');
for (const state of contract.states) {
  assertCondition(state.meaning && state.ai_mode && state.release_condition, `state_${state.id}`);
}

assertCondition(contract.first_168h.length === 4, 'four_168h_horizons');
for (const horizon of contract.first_168h) {
  for (const field of ['id', 'window', 'owner_role', 'evidence', 'acceptance_checks', 'stop_conditions', 'public_artifact']) {
    assertCondition(horizon[field] !== undefined && horizon[field] !== '', `horizon_${horizon.id}_${field}`);
  }
}
assertCondition(contract.first_12_weeks.length === 6, 'six_12_week_windows');
for (const window of contract.first_12_weeks) {
  for (const field of ['id', 'gate', 'owner_role', 'evidence', 'stop_conditions', 'fallback']) {
    assertCondition(window[field] !== undefined && window[field] !== '', `window_${window.id}_${field}`);
  }
}
assertCondition(contract.review_dimensions.length === 7, 'seven_review_dimensions');
assertCondition(contract.review_dimensions.every((item) => Array.isArray(item.field_claims) && item.field_claims.length === 0), 'no_field_claims');
console.log('PASS release chain is fail-closed and non-authorizing');
