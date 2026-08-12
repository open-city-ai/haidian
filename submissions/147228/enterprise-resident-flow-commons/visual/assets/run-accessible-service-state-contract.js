const fs = require('fs');
const path = require('path');

const here = __dirname;
const input = JSON.parse(fs.readFileSync(path.join(here, 'accessible-service-state-contract.json'), 'utf8'));
const requiredPublic = ['UNKNOWN', 'READY', 'DEGRADED', 'CLOSED'];
const requiredEvidence = ['dated_segment_audit', 'current_state_confirmation', 'accessible_alternative', 'handoff_contact'];
const checks = {
  public_states_complete: requiredPublic.every((state) => input.public_states.includes(state)),
  route_contracts_present: input.route_contracts.length === 3,
  route_states_fail_closed: input.route_contracts.every((route) => route.state === 'UNKNOWN'),
  route_evidence_declared: input.route_contracts.every((route) => route.evidence_needed.length >= 4),
  first_route_has_publish_gate: requiredEvidence.every((item) => input.route_contracts[0].evidence_needed.includes(item)),
  every_route_has_stop_rules: input.route_contracts.every((route) => route.stop_if.length >= 3),
  expiry_downgrades_unknown: input.rules.expired_confirmation_becomes === 'UNKNOWN',
  no_local_audit_claim: input.rules.local_audits_completed === 0 && input.rules.operating_authorizations === 0,
  no_personal_trace_requirement: input.rules.personal_traces_required === false,
  ai_release_blocked: input.rules.ai_cannot.includes('publish_READY_without_owner'),
  air_excluded: input.air_candidate.status === 'excluded',
  all_operations_not_run: input.route_contracts.every((route) => route.operational_status === 'not_authorized_not_run')
};
const output = {
  screen_id: input.screen_id,
  status: Object.values(checks).every(Boolean) ? 'ACCESSIBLE_SERVICE_STATE_CONTRACT_PASS' : 'ACCESSIBLE_SERVICE_STATE_CONTRACT_REVIEW',
  check_count: Object.keys(checks).length,
  checks,
  readout: {
    public_route_states: input.route_contracts.map((route) => ({ id: route.id, state: route.state })),
    local_audits_completed: input.rules.local_audits_completed,
    operating_authorizations: input.rules.operating_authorizations,
    published_claims: 0,
    interpretation_zh: '这是无障碍服务状态契约的离线结构回放，不是现场可达率、设备可用率、人员配置或公众满意度结果。',
    interpretation_en: 'This is an offline structural replay of an accessible-service state contract, not a field accessibility rate, equipment availability, staffing or satisfaction result.'
  }
};
fs.writeFileSync(path.join(here, 'accessible-service-state-readout.json'), `${JSON.stringify(output, null, 2)}\n`);
if (!Object.values(checks).every(Boolean)) {
  console.error(JSON.stringify(output, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(output, null, 2));
