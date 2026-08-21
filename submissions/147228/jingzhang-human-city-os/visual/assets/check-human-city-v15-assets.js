#!/usr/bin/env node
/* Read-only deterministic checks for retained v1.5-v2.0 evidence and the focused v2.8 bilingual review surface. */
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
const proposalFigureCounts = {
  zh: (proposalZh.match(/^!\[/gm) || []).length,
  en: (proposalEn.match(/^!\[/gm) || []).length
};
const retainedV15Assets = v15DataRefs.every((ref) => exists(ref)) && v15FigureStems.every((stem) => exists(`${stem}.svg`) && exists(`${stem}.en.svg`));
const focusedBilingualRefs = proposalFigureCounts.zh === 18 && proposalFigureCounts.en === 18 && proposalZh.includes('visual/assets/parametric-search.json') && proposalEn.includes('visual/assets/parametric-search.json') && proposalZh.includes('assets/figures/parametric-tradeoff-study.png') && proposalEn.includes('assets/figures/parametric-tradeoff-study.en.png');
const overviewBilingualRefs = proposalZh.includes('assets/figures/site-overview.png') && proposalEn.includes('assets/figures/site-overview.en.png');
const spatialDetailBilingualRefs = exists('visual/assets/spatial-proof-v17.json') && proposalZh.includes('assets/figures/key-areas.png') && proposalEn.includes('assets/figures/key-areas.en.png');
const scorecardBilingualRefs = exists('visual/assets/formal-scorecard-readback-v18.json') && proposalZh.includes('assets/figures/reviewer-scorecard-map.png') && proposalEn.includes('assets/figures/reviewer-scorecard-map.en.png');
const briefBilingualRefs = exists('visual/assets/brief-alignment-atlas-v19.json') && proposalZh.includes('assets/figures/brief-alignment-atlas.png') && proposalEn.includes('assets/figures/brief-alignment-atlas.en.png');
const publicCultureBilingualRefs = proposalZh.includes('visual/assets/public-culture-operations-atlas-v20.json') && proposalEn.includes('visual/assets/public-culture-operations-atlas-v20.json') && proposalZh.includes('assets/figures/public-culture-operations-atlas.png') && proposalEn.includes('assets/figures/public-culture-operations-atlas.en.png');
check('SPATIAL_PROOF_V17_SCHEMA', spatialProofV17.package_iteration === 'v1.7' && spatialProofV17.display_method.metric_crs === 'EPSG:4548' && spatialProofV17.display_method.display_aspect_rule.includes('pixel'), `iteration=${spatialProofV17.package_iteration}; crs=${spatialProofV17.display_method.metric_crs}`);
check('BILINGUAL_AUDIT_ITERATION', bilingualAudit.package_iteration === 'v2.8-candidate', `audit=${bilingualAudit.package_iteration}`);
check('BILINGUAL_AUDIT_SCOPE', ['18 张评审图', '三层范围', '六个空间单元', '三处重点区', '四条受限廊道', 'G0—G3'].every((marker) => bilingualAudit.scope.join(' ').includes(marker)), 'the focused v2.8 bilingual scope names the review figures, scales, spatial structure, and progression gates');
check('BILINGUAL_V15_REFS', retainedV15Assets && focusedBilingualRefs, `retained v1.5 assets exist; focused proposal figures zh=${proposalFigureCounts.zh}, en=${proposalFigureCounts.en}`);
check('BILINGUAL_V16_REFS', overviewBilingualRefs, 'the current overview occurs in both proposal languages');
check('BILINGUAL_V17_REFS', spatialDetailBilingualRefs, 'retained spatial proof exists and the current key-area detail occurs in both proposal languages');
check('SCORECARD_READBACK_V18_SCHEMA', scorecardReadback.package_iteration === 'v1.8' && scorecardReadback.not_a_score === true && scorecardReadback.source_contract.official_jury_rubric === false && scorecardReadback.dimensions.length === 7 && JSON.stringify(scorecardReadback.dimensions.map((d) => d.workflow_weight_percent)) === JSON.stringify([20, 10, 15, 20, 10, 10, 15]) && scorecardReadback.figure_refs.every((rel) => exists(rel)), `iteration=${scorecardReadback.package_iteration}; dimensions=${scorecardReadback.dimensions.length}; not_a_score=${scorecardReadback.not_a_score}`);
check('SCORECARD_READBACK_V18_REFS', scorecardBilingualRefs, 'retained scorecard evidence and the current review map resolve in both proposal languages');
check('BRIEF_ALIGNMENT_V19_SCHEMA', briefAlignment.package_iteration === 'v1.9' && briefAlignment.status === 'conceptual_alignment_evidence_not_official_score' && briefAlignment.spatial_structure.official_boundary === false && briefAlignment.spatial_structure.geometry_role === 'provisional_constraint' && briefAlignment.taskbook_positioning.length === 3 && briefAlignment.taskbook_functions.length === 5 && briefAlignment.spatial_structure.areas.length === 3 && briefAlignment.spatial_structure.wings.length === 2 && briefAlignment.differentiation_chains.length === 4, `iteration=${briefAlignment.package_iteration}; positions=${briefAlignment.taskbook_positioning.length}; functions=${briefAlignment.taskbook_functions.length}; areas=${briefAlignment.spatial_structure.areas.length}; wings=${briefAlignment.spatial_structure.wings.length}; chains=${briefAlignment.differentiation_chains.length}`);
check('BRIEF_ALIGNMENT_V19_REFS', briefBilingualRefs, 'retained alignment evidence and the current brief board resolve in both proposal languages');
check('PUBLIC_CULTURE_V20_SCHEMA', publicCultureOperations.package_iteration === 'v2.0' && publicCultureOperations.status === 'conceptual_public_space_culture_operation_evidence' && publicCultureOperations.boundary.official_boundary === false && publicCultureOperations.boundary.geometry_role === 'provisional_constraint' && publicCultureOperations.landmarks.length === 3 && publicCultureOperations.annual_rhythm.length === 4 && publicCultureOperations.project_families.length === 5 && publicCultureOperations.cultural_grammar.name_zh === '钢轨—时间—接口', `iteration=${publicCultureOperations.package_iteration}; landmarks=${publicCultureOperations.landmarks.length}; seasons=${publicCultureOperations.annual_rhythm.length}; families=${publicCultureOperations.project_families.length}`);
check('PUBLIC_CULTURE_V20_REFS', publicCultureBilingualRefs, 'public-space, culture, and annual-operation evidence resolves in both proposal languages');
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
  interpretation_zh: 'PASS 只证明保留证据与 v2.8 双语评审入口的文件、图件、引用和声明边界可回接；不证明官方评分、现场绩效、批准或实施。',
  interpretation_en: 'PASS proves only that retained evidence and the focused v2.8 bilingual review surface resolve by file, figure, reference, and stated boundary; it does not prove official scoring, field performance, approval, or implementation.'
};
console.log(JSON.stringify(evidence, null, 2));
process.exit(ok ? 0 : 1);
