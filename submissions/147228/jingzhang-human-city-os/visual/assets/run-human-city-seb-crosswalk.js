const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const input = JSON.parse(fs.readFileSync(path.join(__dirname, 'human-city-seb-crosswalk.json'), 'utf8'));
const tabletop = JSON.parse(fs.readFileSync(path.join(__dirname, 'human-city-public-service-tabletop-v1.json'), 'utf8'));
const ordinary = JSON.parse(fs.readFileSync(path.join(__dirname, 'human-city-ordinary-journey.json'), 'utf8'));
const releaseLedger = JSON.parse(fs.readFileSync(path.join(__dirname, 'release-gate-ledger.json'), 'utf8'));
const spatial = JSON.parse(fs.readFileSync(path.join(__dirname, 'human-city-spatial-decision.json'), 'utf8'));
const evidencePath = path.join(__dirname, 'human-city-seb-crosswalk-evidence.json');
const fail = (message) => { throw new Error(`Human City SEB crosswalk: ${message}`); };
const assert = (condition, message) => { if (!condition) fail(message); };
const same = (a, b, message) => { if (JSON.stringify(a) !== JSON.stringify(b)) fail(message); };

const forbiddenAiOffPath = ['线上办理', '在线办理', '网上办理', '扫码', '二维码', '小程序', '下载应用', '关注公众号', '注册账户', '登录账号', 'online service', 'scan the qr', 'download the app', 'register an account'];
const roleTokens = ['人员', '值守', '岗位', '主持人', '代表', '专员', '维护者', '服务员', 'operator', 'officer', 'steward', 'attendant', 'staff'];
const scenarioById = new Map(tabletop.scenario_registry.map((item) => [item.id, item]));
const bindingByScenario = new Map(ordinary.replay_bindings.map((item) => [item.scenario_id, item]));
const releaseById = new Map(releaseLedger.releases.map((item) => [item.release_id, item]));

function bilingual(value, label) {
  assert(value && typeof value === 'object', `${label} must be an object`);
  assert(typeof value.zh === 'string' && value.zh.trim(), `${label}.zh missing`);
  assert(typeof value.en === 'string' && value.en.trim(), `${label}.en missing`);
}

function hasRole(value) {
  const text = `${value.zh} ${value.en}`.toLowerCase();
  const adopterTokens = input.adoption.adopter_lexicon || [];
  return [...roleTokens, ...adopterTokens].some((token) => text.includes(token.toLowerCase()));
}

function evaluateNode(node) {
  bilingual(node.ai_off_path, `${node.node_id}.ai_off_path`);
  bilingual(node.human_handoff, `${node.node_id}.human_handoff`);
  bilingual(node.responsible_role, `${node.node_id}.responsible_role`);
  if (forbiddenAiOffPath.some((token) => `${node.ai_off_path.zh} ${node.ai_off_path.en}`.toLowerCase().includes(token.toLowerCase()))) {
    return { pass: false, fail_code: 'AI_OFF_PATH_DEPENDENCY' };
  }
  if (!hasRole(node.human_handoff)) return { pass: false, fail_code: 'HUMAN_HANDOFF_ROLE_MISSING' };
  if (!['G0', 'G1', 'G2', 'G3'].includes(node.seb_gate_id)) return { pass: false, fail_code: 'GATE_ID_INVALID' };
  if (typeof node.operating_mode !== 'string' || !node.operating_mode.trim()) return { pass: false, fail_code: 'OPERATING_MODE_MISSING' };
  if (!node.responsible_role.zh.includes('待指定') && !node.responsible_role.en.toLowerCase().includes('not assigned')) {
    return { pass: false, fail_code: 'RESPONSIBLE_ROLE_BOUNDARY_MISSING' };
  }
  return { pass: true, fail_code: null };
}

function checkContract() {
  assert(input.document_type === 'optional_service_equivalence_crosswalk', 'document type mismatch');
  assert(input.adoption.mode === 'component_level_opt_in', 'adoption must remain component-level opt-in');
  assert(input.adoption.spec_version === '0.5.0', 'SEB version must be 0.5.0');
  assert(input.adoption.license === 'CC-BY-SA-4.0', 'SEB attribution/license missing');
  assert(input.adoption.canonical_public_reference.includes('seb-spec.json'), 'canonical SEB reference missing');
  assert(Array.isArray(input.adoption.adopter_lexicon) && input.adoption.adopter_lexicon.length === 3, 'adopter lexicon missing');
  assert(input.adoption.adopter_lexicon.every((token) => input.adoption.adopter_lexicon_evidence[token]), 'adopter lexicon evidence missing');
  assert(input.adoption.scope_zh.includes('不新增仓库硬门禁'), 'hard-gate boundary missing');
  assert(input.boundary.decision === 'HOLD', 'decision must remain HOLD');
  assert(input.boundary.field_state === 'not_authorized_not_run', 'field state must remain not authorized');
  assert(input.boundary.operational_status === 'not_authorized_not_run', 'operational status must remain not authorized');
  assert(input.boundary.authorization === 0 && input.boundary.field_observations === 0, 'field state must remain zero');
  assert(input.boundary.local_baseline === 'unknown' && input.boundary.performance_results === null, 'baseline/performance boundary changed');
  assert(input.boundary.public_rank_claim === false && input.boundary.formal_score_claim === false, 'score/rank boundary changed');
  same(input.source_of_record.nodes, 'visual/assets/human-city-public-service-tabletop-v1.json#scenario_registry', 'node source of record mismatch');
  same(input.field_crosswalk.map((item) => item.seb_field), ['ai_off_path', 'human_handoff', 'gate_id', 'operating_mode', 'responsible_role'], 'field crosswalk coverage mismatch');
  assert(spatial.boundary.operational_status === input.boundary.operational_status, 'spatial boundary drift');
  assert(tabletop.status.tabletop_state === 'contract_check_only', 'tabletop is not contract-check-only');
  assert(input.nodes.length === 4, 'expected four mapped nodes');
  for (const node of input.nodes) {
    const source = scenarioById.get(node.node_id);
    assert(source && source.scenario_id === node.scenario_id, `${node.node_id} scenario source unresolved`);
    const binding = bindingByScenario.get(node.scenario_id);
    const release = releaseById.get(node.local_gate_id);
    assert((binding && binding.release_gate_id === node.local_gate_id) || release, `${node.node_id} release gate mismatch`);
    assert(release, `${node.node_id} local release gate is not registered`);
    assert(node.scenario_source_ref.includes(`[${node.node_id}]`), `${node.node_id} source ref missing`);
    same(node.ai_off_path, source.human_alternative, `${node.node_id} ai_off_path is not copied from source`);
    same(node.human_handoff, source.operator_role, `${node.node_id} human_handoff is not copied from source`);
    same(node.responsible_role, source.operator_role, `${node.node_id} responsible_role is not copied from source`);
    const result = evaluateNode(node);
    assert(result.pass, `${node.node_id} positive evaluation failed: ${result.fail_code}`);
  }
}

function applyMutation(node, mutation) {
  const copy = JSON.parse(JSON.stringify(node));
  if (mutation === 'ai_off_path_dependency') copy.ai_off_path = { zh: '转到线上办理', en: 'Use online service' };
  if (mutation === 'human_handoff_role_missing') copy.human_handoff = { zh: '公共服务平台', en: 'Public-service platform' };
  if (mutation === 'gate_id_invalid') copy.seb_gate_id = 'G4';
  if (mutation === 'operating_mode_missing') copy.operating_mode = '';
  if (mutation === 'source_alignment_changed') copy.responsible_role.zh = '未来授权的另一个值守角色（待指定）';
  return copy;
}

function checkFixtures() {
  const positiveResults = input.positive_fixtures.map((fixture) => {
    const node = input.nodes.find((item) => item.node_id === fixture.node_id);
    assert(node, `${fixture.id} node missing`);
    const result = evaluateNode(node);
    assert(result.pass && fixture.expected === 'PASS', `${fixture.id} should pass`);
    return { id: fixture.id, node_id: fixture.node_id, status: 'PASS' };
  });
  const negativeResults = input.negative_fixtures.map((fixture) => {
    const node = input.nodes.find((item) => item.node_id === fixture.node_id);
    assert(node, `${fixture.id} node missing`);
    const mutated = applyMutation(node, fixture.mutation);
    const source = scenarioById.get(node.node_id);
    const result = fixture.mutation === 'source_alignment_changed'
      ? { pass: JSON.stringify(mutated.responsible_role) === JSON.stringify(source.operator_role), fail_code: 'SOURCE_ALIGNMENT_MISMATCH' }
      : evaluateNode(mutated);
    assert(!result.pass && result.fail_code === fixture.expected_fail_code, `${fixture.id} expected ${fixture.expected_fail_code}, got ${result.fail_code}`);
    return { id: fixture.id, expected_fail_code: fixture.expected_fail_code, observed_fail_code: result.fail_code, status: 'REJECT' };
  });
  return { positiveResults, negativeResults };
}

function main() {
  if (process.argv.length !== 3 || process.argv[2] !== '--check') {
    console.error('Usage: node run-human-city-seb-crosswalk.js --check');
    process.exitCode = 2;
    return;
  }
  try {
    checkContract();
    const fixtures = checkFixtures();
    const result = {
      runner: 'run-human-city-seb-crosswalk.js',
      status: 'PASS',
      package_id: input.package_id,
      spec: `${input.adoption.spec_abbreviation} ${input.adoption.spec_version}`,
      execution_mode: 'read_only_contract_and_fixture_check',
      coverage: { mapped_nodes: input.nodes.length, field_crosswalk: input.field_crosswalk.length, positive_fixtures: input.positive_fixtures.length, negative_fixtures: input.negative_fixtures.length },
      positive_results: fixtures.positiveResults,
      negative_results: fixtures.negativeResults,
      claims: { service_equivalence: false, institutional_adoption: false, field_authorized: false, public_rank: false, official_score: false },
      limits: input.limits
    };
    fs.writeFileSync(evidencePath, `${JSON.stringify(result, null, 2)}\n`);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(JSON.stringify({ status: 'FAIL', error: error.message }, null, 2));
    process.exitCode = 1;
  }
}

main();
