const fs = require('fs');
const path = require('path');

const here = __dirname;
const input = JSON.parse(fs.readFileSync(path.join(here, 'mobility-failure-governance.json'), 'utf8'));
const transfer = JSON.parse(fs.readFileSync(path.join(here, 'mobility-responsibility-transfer.json'), 'utf8'));
const requiredAxes = ['service_state', 'group_impact', 'evidence_confidence', 'human_decision', 'release_state'];
const requiredRecordFields = input.record_schema.required_fields;
const checks = {
  eight_interfaces_reused: input.scope.interfaces.length === 8 && transfer.mobility_interfaces.length === 8,
  five_governance_axes_present: requiredAxes.every((id) => input.axes.some((axis) => axis.id === id)),
  six_failure_classes_present: input.failure_classes.length === 6,
  every_failure_has_group_observer: input.failure_classes.every((failure) => failure.affected_groups.length >= 2 && failure.group_observer_role),
  every_failure_has_interface: input.failure_classes.every((failure) => failure.interface_ids.length >= 1),
  record_schema_complete: ['record_id', 'version', 'prior_record_id', 'affected_groups', 'evidence_refs', 'human_decision', 'appeal_window', 'correction_of', 'retirement_reason', 'privacy_mode'].every((field) => requiredRecordFields.includes(field)),
  append_only_and_correction_rules: input.record_schema.version_rule.includes('immutable prior') && input.record_schema.correction_rule.includes('appends a new version'),
  appeal_pauses_release: input.record_schema.appeal_rule.includes('pauses release') && input.governance_rules.appeals_can_pause_release === true,
  retirement_has_successor_rule: input.record_schema.retirement_rule.includes('successor') && input.governance_rules.retirement_needs_successor_or_ground_fallback === true,
  four_writeback_carriers_present: input.writeback_carriers.length === 4 && input.writeback_carriers.every((carrier) => carrier.receiver_role && carrier.required_fields.length >= 3),
  no_personal_trace_requirement: input.governance_rules.personal_traces_required === false,
  no_field_incident_claim: input.governance_rules.field_incident_count === 0 && input.governance_rules.field_receipt_count === 0 && input.governance_rules.synthetic_records_count === 0,
  air_candidate_blocked: input.governance_rules.air_candidate.includes('blocked'),
  negative_fixtures_reject_missing_fields: input.negative_fixtures.every((fixture) => requiredRecordFields.includes(fixture.missing_field) && fixture.expected_error),
  no_operating_authorization_claim: input.governance_rules.operating_authorization_count === 0
};
const passed = Object.values(checks).every(Boolean);
const output = {
  screen_id: input.screen_id,
  status: passed ? 'MOBILITY_FAILURE_GOVERNANCE_PASS' : 'MOBILITY_FAILURE_GOVERNANCE_REVIEW',
  check_count: Object.keys(checks).length,
  checks,
  summary: {
    interface_count: input.scope.interfaces.length,
    failure_class_count: input.failure_classes.length,
    governance_axis_count: input.axes.length,
    writeback_carrier_count: input.writeback_carriers.length,
    synthetic_records: input.governance_rules.synthetic_records_count,
    field_incidents: input.governance_rules.field_incident_count,
    appeals_recorded: 0,
    corrections_recorded: 0,
    retired_releases: 0,
    operating_authorizations: input.governance_rules.operating_authorization_count,
    air_candidate: input.governance_rules.air_candidate,
    fixture_results: input.negative_fixtures.map((fixture) => ({
      id: fixture.id,
      expected_error: fixture.expected_error,
      detected: requiredRecordFields.includes(fixture.missing_field)
    }))
  },
  interpretation_zh: '这是交通失败治理协议的离线结构回放，不是事故台账、居民申诉结果、服务质量或运营授权。',
  interpretation_en: 'This is an offline structural replay of a transport failure-governance protocol, not an incident ledger, resident appeal result, service-quality result or operating authorization.'
};
fs.writeFileSync(path.join(here, 'mobility-failure-governance-readout.json'), `${JSON.stringify(output, null, 2)}\n`);
if (!passed) {
  console.error(JSON.stringify(output, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(output, null, 2));
