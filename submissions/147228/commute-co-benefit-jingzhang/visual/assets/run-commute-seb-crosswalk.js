const fs = require('fs');
const path = require('path');

const root = __dirname;
const crosswalkPath = path.join(root, 'commute-seb-crosswalk.json');
const atlasPath = path.join(root, 'commute-service-equivalence-atlas.json');
const contractPath = path.join(root, 'responsibility-acceptance-contract.json');
const evidencePath = path.join(root, 'commute-seb-crosswalk-evidence.json');
const expectedIds = ['AC-01-LEAVE', 'AC-02-FEEDER', 'AC-03-ARRIVE', 'AC-04-MIDDAY', 'AC-05-RETURN', 'AC-06-REVIEW'];
const roleTokens = [
  '交通与属地管理角色',
  '企业交通与接驳运营角色',
  '社区、无障碍与人工服务角色',
  '维护、数据保护与独立复核角色'
];
const validLocalGates = new Set(['P0', 'P1', 'P2']);
const validSebGates = new Set(['G0', 'G1', 'G2', 'G3']);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function validateCandidate(crosswalk, atlas, contract) {
  const errors = [];
  if (crosswalk.document_type !== 'optional_service_equivalence_crosswalk') errors.push('DOCUMENT_TYPE_INVALID');
  if (crosswalk.adoption?.mode !== 'component_level_opt_in') errors.push('ADOPTION_MODE_INVALID');
  if (crosswalk.adoption?.spec_version !== '0.5.0') errors.push('SEB_VERSION_INVALID');
  if (crosswalk.adoption?.license !== 'CC-BY-SA-4.0') errors.push('SEB_LICENSE_INVALID');
  if (crosswalk.adoption?.source_id !== 'SEB-V0.5.0') errors.push('SEB_SOURCE_ID_INVALID');
  if (!Array.isArray(crosswalk.adoption?.adopter_lexicon) || crosswalk.adoption.adopter_lexicon.length !== roleTokens.length) errors.push('ADOPTER_LEXICON_INVALID');
  if (JSON.stringify(crosswalk.nodes.map((node) => node.node_id)) !== JSON.stringify(expectedIds)) errors.push('NODE_ORDER_INVALID');
  if (crosswalk.nodes.length !== expectedIds.length) errors.push('NODE_COUNT_INVALID');
  const atlasById = new Map(atlas.nodes.map((node) => [node.id, node]));
  const phases = new Set(contract.phases.map((phase) => phase.id));
  for (const node of crosswalk.nodes) {
    const source = atlasById.get(node.node_id);
    if (!source) {
      errors.push(`${node.node_id}:SOURCE_NODE_MISSING`);
      continue;
    }
    if (!node.scenario_source_ref.includes(`commute-service-equivalence-atlas.json#nodes[${node.node_id}]`)) errors.push(`${node.node_id}:SOURCE_ALIGNMENT_MISMATCH`);
    if (!node.local_gate_source_ref.includes(`responsibility-acceptance-contract.json#phases[${node.local_gate_id}]`)) errors.push(`${node.node_id}:GATE_SOURCE_ALIGNMENT_MISMATCH`);
    if (!phases.has(node.local_gate_id) || !validLocalGates.has(node.local_gate_id)) errors.push(`${node.node_id}:GATE_ID_INVALID`);
    if (!validSebGates.has(node.seb_gate_id)) errors.push(`${node.node_id}:SEB_GATE_ID_INVALID`);
    if (node.operating_mode !== 'contract_check_only') errors.push(`${node.node_id}:OPERATING_MODE_MISSING`);
    if (!node.ai_off_path?.zh || !node.ai_off_path?.en || /模型|model|AI|app|network|网络/.test(`${node.ai_off_path.zh} ${node.ai_off_path.en}`) && node.ai_off_path.zh.length < 20) errors.push(`${node.node_id}:AI_OFF_PATH_DEPENDENCY`);
    if (!node.human_handoff?.zh || !node.human_handoff?.en || !roleTokens.some((token) => node.human_handoff.zh.includes(token))) errors.push(`${node.node_id}:HUMAN_HANDOFF_ROLE_MISSING`);
    if (!node.responsible_role?.zh || !node.responsible_role?.en || !roleTokens.some((token) => node.responsible_role.zh.includes(token))) errors.push(`${node.node_id}:RESPONSIBLE_ROLE_MISSING`);
    if (node.ai_off_path.zh === source.ai_option || node.ai_off_path.en === source.ai_option) errors.push(`${node.node_id}:AI_OFF_PATH_DEPENDENCY`);
  }
  if (crosswalk.boundary?.decision !== 'HOLD') errors.push('BOUNDARY_DECISION_INVALID');
  if (crosswalk.boundary?.field_state !== 'not_authorized_not_run') errors.push('FIELD_STATE_INVALID');
  if (crosswalk.boundary?.operational_status !== 'not_authorized_not_run') errors.push('OPERATIONAL_STATUS_INVALID');
  if (crosswalk.boundary?.authorization !== 0 || crosswalk.boundary?.field_observations !== 0) errors.push('BOUNDARY_COUNTS_INVALID');
  if (crosswalk.boundary?.local_baseline !== 'unknown' || crosswalk.boundary?.performance_results !== null) errors.push('BOUNDARY_EVIDENCE_INVALID');
  if (crosswalk.boundary?.public_rank_claim !== false || crosswalk.boundary?.formal_score_claim !== false) errors.push('BOUNDARY_CLAIM_INVALID');
  if (!Array.isArray(crosswalk.negative_fixtures) || crosswalk.negative_fixtures.length !== 5) errors.push('NEGATIVE_FIXTURE_COUNT_INVALID');
  return errors;
}

function mutate(crosswalk, mutation) {
  const candidate = clone(crosswalk);
  if (mutation === 'ai_off_path_dependency') candidate.nodes[0].ai_off_path = {zh: '只能通过 AI 推荐完成', en: 'Only the AI recommendation can complete the task'};
  if (mutation === 'human_handoff_role_missing') candidate.nodes[1].human_handoff = {zh: '待定', en: 'TBD'};
  if (mutation === 'gate_id_invalid') candidate.nodes[2].local_gate_id = 'P9';
  if (mutation === 'operating_mode_missing') candidate.nodes[3].operating_mode = '';
  if (mutation === 'source_alignment_changed') candidate.nodes[4].scenario_source_ref = 'visual/assets/other.json#nodes[AC-05-RETURN]';
  return candidate;
}

function main() {
  const crosswalk = JSON.parse(fs.readFileSync(crosswalkPath, 'utf8'));
  const atlas = JSON.parse(fs.readFileSync(atlasPath, 'utf8'));
  const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  const errors = validateCandidate(crosswalk, atlas, contract);
  if (errors.length) {
    console.error(`FAIL ${errors.join('; ')}`);
    process.exit(1);
  }
  const fixtureResults = crosswalk.negative_fixtures.map((fixture) => {
    const fixtureErrors = validateCandidate(mutate(crosswalk, fixture.mutation), atlas, contract);
    return {id: fixture.id, mutation: fixture.mutation, expected_fail_code: fixture.expected_fail_code, rejected: fixtureErrors.some((error) => error.endsWith(fixture.expected_fail_code)), errors: fixtureErrors};
  });
  if (fixtureResults.some((result) => !result.rejected)) {
    console.error(`FAIL negative fixture regression ${JSON.stringify(fixtureResults)}`);
    process.exit(1);
  }
  const evidence = {
    schema_version: 'commute-seb-crosswalk-evidence-v1',
    crosswalk_id: 'COMMUTE-SEB-CROSSWALK-01',
    source_of_record: 'visual/assets/commute-service-equivalence-atlas.json',
    nodes_checked: crosswalk.nodes.length,
    role_fields_checked: crosswalk.nodes.length * 2,
    positive_controls: crosswalk.nodes.length,
    negative_controls: fixtureResults.length,
    negative_controls_rejected: fixtureResults.filter((result) => result.rejected).length,
    boundary: crosswalk.boundary,
    claims: {service_equivalence: false, adoption: false, field_authorized: false, public_rank: false, official_score: false},
    fixture_results: fixtureResults
  };
  fs.writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(JSON.stringify({ok: true, nodes: evidence.nodes_checked, fields: 5, positive_controls: evidence.positive_controls, negative_controls: evidence.negative_controls_rejected, decision: crosswalk.boundary.decision, official_score: false}, null, 2));
}

if (require.main === module) main();

module.exports = {validateCandidate, mutate};
