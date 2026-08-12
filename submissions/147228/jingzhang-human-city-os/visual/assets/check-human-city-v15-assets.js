#!/usr/bin/env node
/* Read-only deterministic checks for the v1.5-v2.5 spatial, search, delivery, scorecard, brief-alignment, public-culture, city-API, connector, conversion, and evidence-crosswalk assets. */
const fs = require('fs');
const path = require('path');

const here = __dirname;
const root = path.resolve(here, '../..');
const checks = [];
let ok = true;
function check(id, pass, detail) {
  checks.push({ id, status: pass ? 'PASS' : 'FAIL', detail });
  if (!pass) ok = false;
}
function read(name) { return JSON.parse(fs.readFileSync(path.join(here, name), 'utf8')); }
function readText(rel) { return fs.readFileSync(path.join(root, rel), 'utf8'); }
function exists(rel) { return fs.existsSync(path.join(root, rel)); }
function round(value) { return Math.round(value * 1e6) / 1e6; }
function svgRectOverflow(rel) {
  const content = fs.readFileSync(path.join(root, rel), 'utf8');
  const viewBox = content.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  if (!viewBox) return ['missing viewBox'];
  const [, viewWidth, viewHeight] = viewBox.map(Number);
  const overflow = [];
  for (const match of content.matchAll(/<rect x="(-?\d+(?:\.\d+)?)" y="(-?\d+(?:\.\d+)?)" width="(\d+(?:\.\d+)?)" height="(\d+(?:\.\d+)?)"/g)) {
    const [, x, y, width, height] = match.map(Number);
    if (x < 0 || y < 0 || x + width > viewWidth || y + height > viewHeight) overflow.push(match[0]);
  }
  return overflow;
}

const search = read('parametric-search.json');
const mainline = read('human-city-mainline.json');
const delivery = read('human-city-delivery-spine.json');
const bilingualAudit = read('bilingual-equivalence-audit.json');
const spatialProofV17 = read('spatial-proof-v17.json');
const scorecardReadback = read('formal-scorecard-readback-v18.json');
const briefAlignment = read('brief-alignment-atlas-v19.json');
const publicCultureOperations = read('public-culture-operations-atlas-v20.json');
const cityApiSequence = read('city-api-sequence-v23.json');
const cityApiEvidence = read('city-api-sequence-v23-evidence.json');
const publicSpaceConnectorV25 = read('public-space-connector-atlas-v25.json');
const developerConversionV25 = read('developer-community-conversion-v25.json');
const metrics = read('../../metrics.json').metrics;
const objectiveFns = {
  human_floor: (s) => 0.5 * s.human_community + 0.3 * s.learning_data + 0.2 * s.reversible_meanwhile,
  machine_callability: (s) => s.api_embodied + 0.5 * s.learning_data + 0.5 * s.international_opc,
  reversible_resilience: (s) => s.reversible_meanwhile + s.green_resilience,
  public_access: (s) => s.human_community + 0.4 * s.international_opc + 0.3 * s.green_resilience
};
const samples = search.sampled_candidates || [];
check('SEARCH_STATUS', search.status === 'conceptual_deterministic_search', `status=${search.status}`);
check('SEARCH_SAMPLE_COUNT', samples.length === 128, `samples=${samples.length}`);
check('SITE_AREA_RECONNECT', Math.abs(search.input_contract.site_area_sqm - metrics.site_area_sqm.value) < 1e-9, `search=${search.input_contract.site_area_sqm}; metrics=${metrics.site_area_sqm.value}`);
check('SEARCH_BOUNDARY', search.input_contract.confidence === 'low' && search.boundary_zh.includes('不产生容积率'), 'low confidence and no formal-control claim');
check('SHARES_SUM', samples.every((candidate) => Math.abs(Object.values(candidate.shares).reduce((a, b) => a + b, 0) - 1) < 1e-6), 'all samples sum to one');
check('SHARE_FLOORS', samples.every((candidate) => Object.values(candidate.shares).every((share) => share >= 0.1)), 'all conceptual floors are met');
check('OBJECTIVES_REPLAY', samples.every((candidate) => Object.entries(objectiveFns).every(([id, fn]) => round(fn(candidate.shares)) === candidate.objective_scores[id])), 'all four objective formulas replay');
check('PARETO_IDS_RESOLVE', (search.pareto_front_ids || []).every((id) => [...(search.named_candidates || []), ...samples].some((candidate) => candidate.candidate_id === id)), `pareto=${(search.pareto_front_ids || []).length}`);
check('MAINLINE_SHAPE', mainline.official_boundary === false && mainline.geometry_role === 'provisional_constraint' && mainline.stages.length === 5 && mainline.areas.length === 3, `stages=${mainline.stages.length}; areas=${mainline.areas.length}`);
check('DELIVERY_SHAPE', delivery.status === 'conceptual_governance_not_commitment' && delivery.project_families.length === 5 && delivery.gates.length === 3, `families=${delivery.project_families.length}; gates=${delivery.gates.length}`);
const proposalZh = readText('proposal.md');
const proposalEn = readText('proposal.en.md');
const v15DataRefs = [
  'visual/assets/human-city-mainline.json',
  'visual/assets/parametric-search.json',
  'visual/assets/human-city-delivery-spine.json'
];
const v15FigureStems = [
  'assets/figures/human-city-mainline',
  'assets/figures/parametric-search',
  'assets/figures/human-city-delivery-spine'
];
const v15BilingualRefs = v15DataRefs.every((ref) => proposalZh.includes(ref) && proposalEn.includes(ref)) && v15FigureStems.every((stem) => proposalZh.includes(`${stem}.svg`) && proposalEn.includes(`${stem}.en.svg`));
const v16BilingualRefs = proposalZh.includes('visual/assets/spatial-proof-v16.json') && proposalEn.includes('visual/assets/spatial-proof-v16.json') && proposalZh.includes('assets/figures/site-overview.png') && proposalEn.includes('assets/figures/site-overview.en.png');
const v17BilingualRefs = proposalZh.includes('visual/assets/spatial-proof-v17.json') && proposalEn.includes('visual/assets/spatial-proof-v17.json') && proposalZh.includes('图 20') && proposalEn.includes('Figure 20');
const v18BilingualRefs = proposalZh.includes('visual/assets/formal-scorecard-readback-v18.json') && proposalEn.includes('visual/assets/formal-scorecard-readback-v18.json') && proposalZh.includes('图 21') && proposalEn.includes('Figure 21') && proposalZh.includes('assets/figures/reviewer-scorecard-map.png') && proposalEn.includes('assets/figures/reviewer-scorecard-map.en.png');
const v19BilingualRefs = proposalZh.includes('visual/assets/brief-alignment-atlas-v19.json') && proposalEn.includes('visual/assets/brief-alignment-atlas-v19.json') && proposalZh.includes('图 22') && proposalEn.includes('Figure 22') && proposalZh.includes('assets/figures/brief-alignment-atlas.png') && proposalEn.includes('assets/figures/brief-alignment-atlas.en.png');
const v20BilingualRefs = proposalZh.includes('visual/assets/public-culture-operations-atlas-v20.json') && proposalEn.includes('visual/assets/public-culture-operations-atlas-v20.json') && proposalZh.includes('图 23') && proposalEn.includes('Figure 23') && proposalZh.includes('assets/figures/public-culture-operations-atlas.png') && proposalEn.includes('assets/figures/public-culture-operations-atlas.en.png');
const v23BilingualRefs = proposalZh.includes('visual/assets/city-api-sequence-v23.json') && proposalEn.includes('visual/assets/city-api-sequence-v23.json') && proposalZh.includes('图 26') && proposalEn.includes('Figure 26') && proposalZh.includes('assets/figures/city-api-sequence-v23.png') && proposalEn.includes('assets/figures/city-api-sequence-v23.en.png');
const v25BilingualRefs = proposalZh.includes('visual/assets/public-space-connector-atlas-v25.json') && proposalEn.includes('visual/assets/public-space-connector-atlas-v25.json') && proposalZh.includes('visual/assets/developer-community-conversion-v25.json') && proposalEn.includes('visual/assets/developer-community-conversion-v25.json') && proposalZh.includes('图 27') && proposalEn.includes('Figure 27') && proposalZh.includes('assets/figures/public-space-operations-v25.png') && proposalEn.includes('assets/figures/public-space-operations-v25.en.png');
check('SPATIAL_PROOF_V17_SCHEMA', spatialProofV17.package_iteration === 'v1.7' && spatialProofV17.display_method.metric_crs === 'EPSG:4548' && spatialProofV17.display_method.display_aspect_rule.includes('pixel'), `iteration=${spatialProofV17.package_iteration}; crs=${spatialProofV17.display_method.metric_crs}`);
check('BILINGUAL_AUDIT_ITERATION', bilingualAudit.package_iteration === 'v2.5', `audit=${bilingualAudit.package_iteration}`);
check('BILINGUAL_AUDIT_SCOPE', ['图 16', '图 17', '图 18', '图 19', '图 20', '图 21', '图 22', '图 23', '图 26', '图 27'].every((label) => bilingualAudit.scope.join(' ').includes(label)) && ['human-city-mainline', 'parametric-search', 'human-city-delivery-spine', 'spatial-proof-v16', 'spatial-proof-v17', 'formal-scorecard-readback-v18', 'reviewer-scorecard-map', 'brief-alignment-atlas-v19', 'public-culture-operations-atlas-v20', 'city-api-sequence-v23', 'public-space-operations-v25'].every((name) => bilingualAudit.scope.join(' ').includes(name)), 'v1.5 mainline/search/delivery, v1.6 maps, v1.7 display atlas, v1.8 scorecard readback, v1.9 brief alignment, v2.0 public-culture operation, v2.3 city-API sequence, and v2.5 connector/conversion board are named in the audit scope');
check('BILINGUAL_V15_REFS', v15BilingualRefs, 'v1.5 data and figure references occur in both proposal languages');
check('BILINGUAL_V16_REFS', v16BilingualRefs, 'v1.6 spatial proof record and core overview occur in both proposal languages');
check('BILINGUAL_V17_REFS', v17BilingualRefs, 'v1.7 spatial proof record and Figure 20 occur in both proposal languages');
check('SCORECARD_READBACK_V18_SCHEMA', scorecardReadback.package_iteration === 'v1.8' && scorecardReadback.not_a_score === true && scorecardReadback.source_contract.official_jury_rubric === false && scorecardReadback.dimensions.length === 7 && JSON.stringify(scorecardReadback.dimensions.map((d) => d.workflow_weight_percent)) === JSON.stringify([20, 10, 15, 20, 10, 10, 15]) && scorecardReadback.figure_refs.every((rel) => exists(rel)), `iteration=${scorecardReadback.package_iteration}; dimensions=${scorecardReadback.dimensions.length}; not_a_score=${scorecardReadback.not_a_score}`);
check('SCORECARD_READBACK_V18_REFS', v18BilingualRefs, 'v1.8 scorecard readback and Figure 21 occur in both proposal languages');
check('BRIEF_ALIGNMENT_V19_SCHEMA', briefAlignment.package_iteration === 'v1.9' && briefAlignment.status === 'conceptual_alignment_evidence_not_official_score' && briefAlignment.spatial_structure.official_boundary === false && briefAlignment.spatial_structure.geometry_role === 'provisional_constraint' && briefAlignment.taskbook_positioning.length === 3 && briefAlignment.taskbook_functions.length === 5 && briefAlignment.spatial_structure.areas.length === 3 && briefAlignment.spatial_structure.wings.length === 2 && briefAlignment.differentiation_chains.length === 4, `iteration=${briefAlignment.package_iteration}; positions=${briefAlignment.taskbook_positioning.length}; functions=${briefAlignment.taskbook_functions.length}; areas=${briefAlignment.spatial_structure.areas.length}; wings=${briefAlignment.spatial_structure.wings.length}; chains=${briefAlignment.differentiation_chains.length}`);
check('BRIEF_ALIGNMENT_V19_REFS', v19BilingualRefs && exists('assets/figures/brief-alignment-atlas.png') && exists('assets/figures/brief-alignment-atlas.en.png'), 'v1.9 alignment board and Figure 22 occur in both proposal languages');
check('PUBLIC_CULTURE_V20_SCHEMA', publicCultureOperations.package_iteration === 'v2.0' && publicCultureOperations.status === 'conceptual_public_space_culture_operation_evidence' && publicCultureOperations.boundary.official_boundary === false && publicCultureOperations.boundary.geometry_role === 'provisional_constraint' && publicCultureOperations.landmarks.length === 3 && publicCultureOperations.annual_rhythm.length === 4 && publicCultureOperations.project_families.length === 5 && publicCultureOperations.cultural_grammar.name_zh === '钢轨—时间—接口', `iteration=${publicCultureOperations.package_iteration}; landmarks=${publicCultureOperations.landmarks.length}; seasons=${publicCultureOperations.annual_rhythm.length}; families=${publicCultureOperations.project_families.length}`);
check('PUBLIC_CULTURE_V20_REFS', v20BilingualRefs && exists('assets/figures/public-culture-operations-atlas.png') && exists('assets/figures/public-culture-operations-atlas.en.png'), 'v2.0 public-space/culture/operation board and Figure 23 occur in both proposal languages');
check('CITY_API_V23_SCHEMA', cityApiSequence.package_iteration === 'v2.3' && cityApiSequence.status === 'conceptual_sequence_evidence' && cityApiSequence.steps.length === 6 && cityApiSequence.official_boundary === false && cityApiSequence.geometry_role === 'provisional_constraint' && cityApiSequence.operational_status === 'not_authorized_not_run' && cityApiSequence.performance_results === null && cityApiSequence.not_a_score === true, `iteration=${cityApiSequence.package_iteration}; steps=${cityApiSequence.steps.length}; boundary=${cityApiSequence.official_boundary}`);
check('CITY_API_V23_EVIDENCE', cityApiEvidence.status === 'PASS' && cityApiEvidence.not_a_score === true && cityApiEvidence.checks.length >= 10, `status=${cityApiEvidence.status}; checks=${cityApiEvidence.checks.length}`);
check('CITY_API_V23_REFS', v23BilingualRefs && ['assets/figures/city-api-sequence-v23.png', 'assets/figures/city-api-sequence-v23.en.png'].every(exists), 'v2.3 city-API board and Figure 26 occur in both proposal languages');
check('PUBLIC_SPACE_CONNECTOR_V25_SCHEMA', publicSpaceConnectorV25.package_iteration === 'v2.5' && publicSpaceConnectorV25.status === 'conceptual_public_space_connector_evidence' && publicSpaceConnectorV25.boundary.official_boundary === false && publicSpaceConnectorV25.boundary.geometry_role === 'provisional_constraint' && publicSpaceConnectorV25.boundary.operational_status === 'not_authorized_not_run' && publicSpaceConnectorV25.boundary.performance_results === null && publicSpaceConnectorV25.directional_strategies.length === 2 && publicSpaceConnectorV25.public_space_components.length === 5 && publicSpaceConnectorV25.honour_display_system.panels.length === 3 && publicSpaceConnectorV25.not_a_score === true, `iteration=${publicSpaceConnectorV25.package_iteration}; directions=${publicSpaceConnectorV25.directional_strategies.length}; components=${publicSpaceConnectorV25.public_space_components.length}`);
check('DEVELOPER_CONVERSION_V25_SCHEMA', developerConversionV25.package_iteration === 'v2.5' && developerConversionV25.status === 'conceptual_global_activity_and_conversion_evidence' && developerConversionV25.boundary.official_boundary === false && developerConversionV25.boundary.geometry_role === 'provisional_constraint' && developerConversionV25.boundary.operational_status === 'not_authorized_not_run' && developerConversionV25.boundary.performance_results === null && developerConversionV25.conversion_chain.length === 4 && developerConversionV25.annual_activity_system.length === 4 && developerConversionV25.not_a_score === true, `iteration=${developerConversionV25.package_iteration}; stages=${developerConversionV25.conversion_chain.length}; seasons=${developerConversionV25.annual_activity_system.length}`);
check('PUBLIC_SPACE_CONNECTOR_V25_REFS', v25BilingualRefs && ['assets/figures/public-space-operations-v25.png', 'assets/figures/public-space-operations-v25.en.png'].every(exists), 'v2.5 public-space connector/conversion board and Figure 27 occur in both proposal languages');
for (const rel of ['assets/figures/human-city-mainline.svg', 'assets/figures/human-city-mainline.en.svg']) {
  const overflow = svgRectOverflow(rel);
  check(`SVG_RECT_FITS_${rel}`, overflow.length === 0, overflow.length === 0 ? 'all positioned rectangles fit viewBox' : `overflow=${overflow.join(' | ')}`);
}
for (const rel of [
  'assets/figures/human-city-mainline.svg',
  'assets/figures/human-city-mainline.en.svg',
  'assets/figures/parametric-search.svg',
  'assets/figures/parametric-search.en.svg',
  'assets/figures/human-city-delivery-spine.svg',
  'assets/figures/human-city-delivery-spine.en.svg'
]) check(`FILE_${rel}`, exists(rel), rel);

const evidence = {
  schema_version: '0.1.0',
  generated_by: 'visual/assets/check-human-city-v15-assets.js',
  status: ok ? 'PASS' : 'FAIL',
  checks,
  interpretation_zh: 'PASS 只证明 v1.5 图件、候选搜索、交付主线、v1.6 空间证据、v1.7 放大/回读图、v1.8 七维评审回读、v1.9 任务书—空间响应、v2.0 公共空间—文化—运营、v2.3 城市 API 六步序列、v2.4 证据交叉索引与 v2.5 公共空间连接/社群转化资产的结构、边界与回接可读；不证明官方评分、现场绩效、批准或实施。',
  interpretation_en: 'PASS proves only that v1.5 figures, search, delivery spine, v1.6 spatial evidence, v1.7 zoom/readback figures, v1.8 scorecard readback, v1.9 brief alignment, v2.0 public-space/culture/operation, v2.3 city-API sequence, v2.4 evidence crosswalk, and v2.5 connector/conversion assets resolve structurally with declared boundaries; it does not prove official scoring, field performance, approval, or implementation.'
};
console.log(JSON.stringify(evidence, null, 2));
process.exit(ok ? 0 : 1);
