const fs = require('fs');
const path = require('path');

const here = __dirname;
const input = JSON.parse(fs.readFileSync(path.join(here, 'mobility-responsibility-transfer.json'), 'utf8'));
const requiredClasses = input.cost_classes.map((item) => item.id);
const errorsFor = (asset) => {
  const errors = [];
  if (!asset.receiver_role) errors.push('missing_receiver_role');
  if (!asset.non_ai_equivalent) errors.push('missing_non_ai_equivalent');
  if (!asset.affected_groups?.length) errors.push('missing_affected_group_observer');
  if (!asset.failure_denominator?.include_failed_attempts) errors.push('failed_attempts_excluded');
  if (!asset.stop_evidence?.length) errors.push('missing_stop_evidence');
  if (!asset.recovery_evidence?.length) errors.push('missing_recovery_evidence');
  return errors;
};
const clone = (value) => JSON.parse(JSON.stringify(value));
const removePath = (value, dottedPath) => {
  const parts = dottedPath.split('.');
  let cursor = value;
  for (let index = 0; index < parts.length - 1; index += 1) cursor = cursor[parts[index]];
  delete cursor[parts[parts.length - 1]];
};
const checks = {
  eight_interfaces_present: input.mobility_interfaces.length === 8,
  seven_cost_classes_present: input.cost_classes.length === 7,
  all_cost_classes_used: requiredClasses.every((id) => input.mobility_interfaces.some((asset) => asset.cost_classes.includes(id))),
  all_assets_have_receiver: input.mobility_interfaces.every((asset) => Boolean(asset.receiver_role)),
  all_assets_have_non_ai_equivalent: input.mobility_interfaces.every((asset) => Boolean(asset.non_ai_equivalent)),
  all_assets_have_group_observer: input.mobility_interfaces.every((asset) => Array.isArray(asset.affected_groups) && asset.affected_groups.length >= 3),
  failed_and_withdrawn_are_in_denominator: input.mobility_interfaces.every((asset) => asset.failure_denominator.include_failed_attempts && asset.failure_denominator.include_withdrawals),
  all_assets_have_stop_and_recovery_evidence: input.mobility_interfaces.every((asset) => asset.stop_evidence.length >= 2 && asset.recovery_evidence.length >= 2),
  all_transfer_states_fail_closed: input.mobility_interfaces.every((asset) => asset.field_status === 'unknown' && asset.transfer_status.includes('not_run')),
  originator_accountability_retained: input.transfer_rules.originator_remains_accountable_until.includes('dated receiver acceptance'),
  no_personal_trace_requirement: input.transfer_rules.personal_traces_required === false,
  no_real_receipt_or_authorization_claim: input.transfer_rules.field_receipts === 0 && input.transfer_rules.accepted_transfers === 0 && input.transfer_rules.real_operating_authorizations === 0,
  air_candidate_blocked: input.transfer_rules.air_candidate === 'blocked_outside_transfer_denominator' && input.mobility_interfaces.at(-1).transfer_status.startsWith('blocked')
};
const fixtureResults = input.negative_fixtures.map((fixture) => {
  const modified = clone(input.mobility_interfaces[Number(fixture.id.slice(-2)) - 1] || input.mobility_interfaces[0]);
  removePath(modified, fixture.remove_path);
  const errors = errorsFor(modified);
  return { id: fixture.id, expected_error: fixture.expected_error, detected: errors.includes(fixture.expected_error) };
});
checks.negative_fixtures_reject_missing_fields = fixtureResults.every((item) => item.detected);
const allPass = Object.values(checks).every(Boolean);
const output = {
  screen_id: input.screen_id,
  status: allPass ? 'MOBILITY_RESPONSIBILITY_TRANSFER_PASS' : 'MOBILITY_RESPONSIBILITY_TRANSFER_REVIEW',
  check_count: Object.keys(checks).length,
  checks,
  summary: {
    interface_count: input.mobility_interfaces.length,
    cost_class_count: input.cost_classes.length,
    cost_class_coverage: Object.fromEntries(requiredClasses.map((id) => [id, input.mobility_interfaces.filter((asset) => asset.cost_classes.includes(id)).length])),
    transfer_ready_count: 0,
    field_receipts: input.transfer_rules.field_receipts,
    accepted_transfers: input.transfer_rules.accepted_transfers,
    real_operating_authorizations: input.transfer_rules.real_operating_authorizations,
    failed_attempts_in_denominator: input.transfer_rules.failed_attempts_in_denominator,
    withdrawals_in_denominator: input.transfer_rules.withdrawals_in_denominator,
    air_candidate: input.transfer_rules.air_candidate,
    fixture_results: fixtureResults
  },
  interpretation_zh: '移交屏证明的是字段、拒收和失败分母可以离线复核，不证明责任角色已经任命、预算已经落实或服务已经运行。',
  interpretation_en: 'The transfer screen proves that fields, refusal and failed-attempt denominators are reviewable offline; it does not prove that roles are appointed, budgets are funded or services are operating.'
};
fs.writeFileSync(path.join(here, 'mobility-responsibility-transfer-readout.json'), `${JSON.stringify(output, null, 2)}\n`);
if (!allPass) {
  console.error(JSON.stringify(output, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(output, null, 2));
console.error('MOBILITY_RESPONSIBILITY_TRANSFER_PASS: eight interfaces, seven cost classes and fail-closed fixtures passed');
