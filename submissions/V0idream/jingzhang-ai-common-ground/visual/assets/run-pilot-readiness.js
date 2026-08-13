const fs = require('fs');
const path = require('path');

const root = __dirname;
const plan = JSON.parse(fs.readFileSync(path.join(root, 'pilot-operations-plan.json'), 'utf8'));
const fixture = JSON.parse(fs.readFileSync(path.join(root, 'synthetic-inclusive-journeys.json'), 'utf8'));
const target = plan.concept_targets_not_field_results;
const gateOrder = plan.hard_gates;

function decision(item) {
  const gatesPass = gateOrder.every((key) => item.gates[key] === true);
  const channelsPass = item.required_channels.every((key) => item.available_channels.includes(key));
  const handoffPass = item.human_handoff === true && item.handoff_seconds <= target.human_handoff_seconds_max;
  const receiptPass = item.receipt_field_count >= target.proof_receipt_required_field_count;
  return gatesPass && channelsPass && handoffPass && receiptPass && item.ordinary_service_open
    ? 'proof_ready'
    : 'return_for_retranslation';
}

const zoneArea = plan.module.zones.reduce((sum, zone) => sum + zone.area_sqm, 0);
const planChecks = {
  module_area_balances: Math.abs(zoneArea - plan.module.area_sqm) < 1e-9,
  five_operating_states: plan.states.length === 5,
  six_non_compensatory_gates: gateOrder.length === 6,
  three_exit_decisions: plan.decision_options.length === 3,
  eight_receipt_fields: plan.proof_receipt_fields.length === 8,
  ordinary_service_target_is_one: target.ordinary_service_availability_ratio === 1,
  two_minute_handoff_is_target_only: target.human_handoff_seconds_max === 120 && plan.status.includes('unmeasured'),
  synthetic_case_count_matches_target: fixture.journeys.length === target.synthetic_inclusion_journeys_required
};
const results = fixture.journeys.map((item) => {
  const actual = decision(item);
  return {journey_id: item.journey_id, persona: item.persona, decision: actual, expected: item.expected, pass: actual === item.expected};
});
const evidence = {
  generated_by: 'visual/assets/run-pilot-readiness.js',
  network_access: false,
  synthetic_only: true,
  real_participants: 0,
  field_pilot_status: 'not_started',
  authorization_status: plan.authorization_status,
  plan_checks: planChecks,
  plan_check_pass_count: Object.values(planChecks).filter(Boolean).length,
  plan_check_count: Object.keys(planChecks).length,
  journey_result_count: results.length,
  journey_pass_count: results.filter((item) => item.pass).length,
  results
};
fs.writeFileSync(path.join(root, 'pilot-readiness-evidence.json'), JSON.stringify(evidence, null, 2) + '\n');
if (evidence.plan_check_pass_count !== evidence.plan_check_count || evidence.journey_pass_count !== evidence.journey_result_count) process.exitCode = 1;
console.log(`Translation Grounds pilot readiness: ${evidence.plan_check_pass_count}/${evidence.plan_check_count} plan checks; ${evidence.journey_pass_count}/${evidence.journey_result_count} synthetic journeys as expected`);
