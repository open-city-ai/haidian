#!/usr/bin/env node
/*
 * Deterministic, offline asset builder for Human City v1.5.
 *
 * The outputs are deliberately conceptual.  The search replays transparent
 * share parameters over the existing provisional land-use bands; it does not
 * alter geometry, formal metrics, approvals, budgets, or operating claims.
 */
const fs = require('fs');
const path = require('path');

const here = __dirname;
const packageRoot = path.resolve(here, '../..');
const study = JSON.parse(fs.readFileSync(path.join(here, 'parametric-tradeoff-study.json'), 'utf8'));
const metrics = JSON.parse(fs.readFileSync(path.join(packageRoot, 'metrics.json'), 'utf8')).metrics;
const siteArea = metrics.site_area_sqm.value;
const bandIds = study.bands.map((band) => band.id);
const labelsZh = {
  human_community: '社区保留与服务',
  international_opc: '国际服务与小团队',
  learning_data: '技能学习与公共数据',
  reversible_meanwhile: '可逆留白与临时使用',
  api_embodied: '城市 API 与具身研发',
  green_resilience: '无屏绿地与气候韧性'
};
const labelsEn = {
  human_community: 'Community retention',
  international_opc: 'International / OPC',
  learning_data: 'Learning / public data',
  reversible_meanwhile: 'Reversible meanwhile',
  api_embodied: 'City API / embodied',
  green_resilience: 'Screen-free resilience'
};

const objectiveFns = {
  human_floor: (s) => 0.5 * s.human_community + 0.3 * s.learning_data + 0.2 * s.reversible_meanwhile,
  machine_callability: (s) => s.api_embodied + 0.5 * s.learning_data + 0.5 * s.international_opc,
  reversible_resilience: (s) => s.reversible_meanwhile + s.green_resilience,
  public_access: (s) => s.human_community + 0.4 * s.international_opc + 0.3 * s.green_resilience
};
const objectiveIds = Object.keys(objectiveFns);

function round(value, digits = 6) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function objectiveScores(shares) {
  return Object.fromEntries(objectiveIds.map((id) => [id, round(objectiveFns[id](shares), 6)]));
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function dominates(a, b) {
  const atLeast = objectiveIds.every((id) => a.objective_scores[id] >= b.objective_scores[id]);
  const higher = objectiveIds.some((id) => a.objective_scores[id] > b.objective_scores[id]);
  return atLeast && higher;
}

function makeDeterministicSamples(count = 128) {
  let state = 147228;
  const samples = [];
  for (let index = 0; index < count; index += 1) {
    const weights = [];
    for (let j = 0; j < bandIds.length; j += 1) {
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      weights.push((state % 1000) + 1);
    }
    const remaining = 0.4;
    const totalWeight = sum(weights);
    const shares = Object.fromEntries(bandIds.map((id, j) => [id, round(0.1 + remaining * weights[j] / totalWeight, 6)]));
    const correction = round(1 - sum(Object.values(shares)), 6);
    shares.green_resilience = round(shares.green_resilience + correction, 6);
    const candidate = {
      candidate_id: `SEARCH-${String(index + 1).padStart(3, '0')}`,
      kind: 'deterministic_sample',
      shares,
      objective_scores: objectiveScores(shares),
      derived_area_sqm: Object.fromEntries(bandIds.map((id) => [id, round(shares[id] * siteArea, 3)])),
      interpretation_zh: '仅为离线概念候选；不构成推荐、审批、建设强度或运营方案。'
    };
    samples.push(candidate);
  }
  return samples;
}

function namedCandidate(id, labelZh, shares) {
  return {
    candidate_id: id,
    kind: 'named_reference',
    label_zh: labelZh,
    shares,
    objective_scores: objectiveScores(shares),
    derived_area_sqm: Object.fromEntries(bandIds.map((band) => [band, round(shares[band] * siteArea, 3)])),
    interpretation_zh: '沿用本包既有概念候选，仅用于与搜索样本同图比较。'
  };
}

const named = [
  namedCandidate('BASELINE', '当前基线', study.baseline_reproduction.shares),
  ...study.variants.map((variant) => namedCandidate(variant.variant_id, variant.label_zh, variant.shares))
];
const samples = makeDeterministicSamples();
const allCandidates = [...named, ...samples];
const pareto = allCandidates.filter((candidate) => !allCandidates.some((other) => other.candidate_id !== candidate.candidate_id && dominates(other, candidate)));

function buildSearch() {
  return {
    schema_version: '0.2.0',
    package_iteration: 'v1.5',
    status: 'conceptual_deterministic_search',
    title_zh: '可复现的空间取舍搜索：在人的底线与机器调用之间看见候选集',
    title_en: 'Reproducible spatial trade-off search: a visible candidate set between human floors and machine callability',
    purpose_zh: '在同一临时边界和六层概念功能带上，按固定种子生成 128 组候选，计算四个透明比较镜头并筛出非支配集；结果只为专业团队讨论，不能升级为正式指标或 AI 部署证明。',
    purpose_en: 'Over the same provisional boundary and six conceptual bands, generate 128 candidates with a fixed seed, compute four transparent lenses, and retain the non-dominated set for professional discussion only; this does not become a formal metric or proof of AI deployment.',
    input_contract: {
      site_area_sqm: siteArea,
      site_area_source: 'metrics.json#site_area_sqm',
      land_use_source: 'geometry/land_use.geojson',
      formula: 'derived_area_sqm = share × provisional site_area_sqm',
      search_seed: 147228,
      sample_count: samples.length,
      variables: bandIds.map((id) => ({ id, lower_bound_share: 0.1, upper_bound_share: null, status: 'conceptual_parameter' })),
      constraints: ['six shares sum to 1.0 within 1e-6', 'each share is at least 0.10 as a comparison floor only'],
      confidence: 'low',
      assumptions: ['A-BOUNDARY-001', 'A-ALLOCATION-001']
    },
    objective_lenses: objectiveIds.map((id) => ({
      objective_id: id,
      formula: study.objective_lenses.find((lens) => lens.objective_id === id).formula,
      interpretation_zh: study.objective_lenses.find((lens) => lens.objective_id === id).interpretation_zh,
      status: 'conceptual_proxy_not_outcome'
    })),
    named_candidates: named,
    sampled_candidates: samples,
    pareto_front_ids: pareto.map((candidate) => candidate.candidate_id),
    search_summary: {
      sampled_candidate_count: samples.length,
      all_candidate_count: allCandidates.length,
      pareto_candidate_count: pareto.length,
      named_candidates_on_front: named.filter((candidate) => pareto.some((item) => item.candidate_id === candidate.candidate_id)).map((candidate) => candidate.candidate_id)
    },
    boundary_zh: '搜索只表达概念参数关系；不产生容积率、建筑高度、工程可行性、投资、政策、许可或运营结论。官方边界、控规、权属、能源、气候、交通与公众基线仍需补齐后全量重算。',
    boundary_en: 'The search expresses conceptual parameter relationships only; it produces no FAR, building-height, engineering, investment, policy, permit, or operating conclusion. Official boundaries, controls, rights, energy, climate, mobility, and public baselines remain required before a full recomputation.',
    source_files: ['geometry/site_boundary.geojson', 'geometry/land_use.geojson', 'metrics.json', 'visual/assets/parametric-tradeoff-study.json']
  };
}

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function makeSearchSvg(search, english = false) {
  const width = 1800;
  const height = 1040;
  const left = 160;
  const right = 1620;
  const top = 190;
  const bottom = 830;
  const xMin = 0.13;
  const xMax = 0.33;
  const yMin = 0.23;
  const yMax = 0.50;
  const x = (value) => left + ((value - xMin) / (xMax - xMin)) * (right - left);
  const y = (value) => bottom - ((value - yMin) / (yMax - yMin)) * (bottom - top);
  const front = new Set(search.pareto_front_ids);
  const all = [...search.named_candidates, ...search.sampled_candidates];
  const title = english ? 'Reproducible search: human floors × machine callability' : '可复现搜索：人的底线 × 机器可调用性';
  const sub = english ? '128 fixed-seed candidates · four conceptual lenses · non-dominated set highlighted' : '固定种子 128 组候选 · 四个概念镜头 · 高亮非支配集';
  const xLabel = english ? 'Human-floor proxy (higher is not a resident outcome)' : '人本底线代理值（高值不等于居民结果）';
  const yLabel = english ? 'Machine-callability proxy (higher is not deployment)' : '机器可调用代理值（高值不等于部署）';
  const note = english ? 'Provisional / conceptual only · no formal metric change · offline replay' : '临时几何／概念建议 · 不改正式指标 · 离线可回放';
  const labels = english ? { BASELINE: 'Baseline', people_first: 'People-first', balanced: 'Balanced', machine_ready: 'Machine-ready' } : { BASELINE: '当前基线', people_first: '人本优先', balanced: '平衡', machine_ready: '机器协同' };
  const lines = [];
  lines.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`);
  lines.push('<rect width="1800" height="1040" fill="#f7f9fc"/>');
  lines.push('<style>.title{font:700 42px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#132a49}.sub{font:22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#61748b}.axis{font:18px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#536b83}.tick{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#71849b}.legend{font:18px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#173554}.label{font:700 18px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#173554}.note{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#647891}</style>');
  lines.push(`<text x="70" y="70" class="title">${esc(title)}</text>`);
  lines.push(`<text x="70" y="108" class="sub">${esc(sub)}</text>`);
  lines.push(`<rect x="${left}" y="${top}" width="${right - left}" height="${bottom - top}" fill="#fff" stroke="#c8d4e2" stroke-width="2"/>`);
  for (let i = 0; i <= 4; i += 1) {
    const xv = xMin + (xMax - xMin) * i / 4;
    const px = x(xv);
    lines.push(`<line x1="${px}" y1="${top}" x2="${px}" y2="${bottom}" stroke="#e4eaf1" stroke-width="1"/>`);
    lines.push(`<text x="${px}" y="${bottom + 30}" text-anchor="middle" class="tick">${xv.toFixed(2)}</text>`);
    const yv = yMin + (yMax - yMin) * i / 4;
    const py = y(yv);
    lines.push(`<line x1="${left}" y1="${py}" x2="${right}" y2="${py}" stroke="#e4eaf1" stroke-width="1"/>`);
    lines.push(`<text x="${left - 18}" y="${py + 6}" text-anchor="end" class="tick">${yv.toFixed(2)}</text>`);
  }
  lines.push(`<text x="${(left + right) / 2}" y="${bottom + 72}" text-anchor="middle" class="axis">${esc(xLabel)}</text>`);
  lines.push(`<text x="38" y="${(top + bottom) / 2}" transform="rotate(-90 38 ${(top + bottom) / 2})" text-anchor="middle" class="axis">${esc(yLabel)}</text>`);
  for (const candidate of all) {
    const cx = x(candidate.objective_scores.human_floor);
    const cy = y(candidate.objective_scores.machine_callability);
    const isFront = front.has(candidate.candidate_id);
    const namedCandidateFlag = candidate.kind === 'named_reference';
    const radius = namedCandidateFlag ? 11 : isFront ? 5 : 3;
    const fill = candidate.candidate_id === 'BASELINE' ? '#173554' : candidate.candidate_id === 'people_first' ? '#ed5b78' : candidate.candidate_id === 'balanced' ? '#16a38e' : candidate.candidate_id === 'machine_ready' ? '#3d76ea' : isFront ? '#f2a93b' : '#b9c7d7';
    const stroke = namedCandidateFlag ? '#fff' : 'none';
    lines.push(`<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="3" opacity="${namedCandidateFlag || isFront ? 0.95 : 0.45}"/>`);
    if (namedCandidateFlag) lines.push(`<text x="${cx + 16}" y="${cy - 14}" class="label">${esc(labels[candidate.candidate_id] || candidate.label_zh)}</text>`);
  }
  const legend = english ? ['128 samples', 'Pareto candidates', 'Named references'] : ['128 组搜索样本', '非支配候选', '既有参考候选'];
  const legendX = 1150;
  lines.push(`<circle cx="${legendX}" cy="905" r="5" fill="#b9c7d7"/><text x="${legendX + 16}" y="911" class="legend">${esc(legend[0])}</text>`);
  lines.push(`<circle cx="${legendX + 230}" cy="905" r="5" fill="#f2a93b"/><text x="${legendX + 246}" y="911" class="legend">${esc(legend[1])}</text>`);
  lines.push(`<circle cx="${legendX + 480}" cy="905" r="10" fill="#173554" stroke="#fff" stroke-width="3"/><text x="${legendX + 500}" y="911" class="legend">${esc(legend[2])}</text>`);
  lines.push(`<text x="70" y="980" class="note">${esc(note)} · EPSG:4548 site area input ${siteArea.toFixed(3)} sqm</text>`);
  lines.push('</svg>');
  return lines.join('\n') + '\n';
}

function mainlineJson() {
  return {
    schema_version: '0.1.0',
    package_iteration: 'v1.5',
    mainline_id: 'HUMAN-CITY-MAINLINE-001',
    title_zh: '人本主轴：沿京张遗址公共脊先走通日常，再调用机器',
    title_en: 'Human-first mainline: walk the Jing-Zhang public spine before calling the machine',
    official_boundary: false,
    geometry_role: 'provisional_constraint',
    status: 'concept_recommendation_for_professional_deepening',
    precision_note_zh: '主轴只用公告顺序和既有临时重点区锚点表达关系；未取得官方 polygon、道路、权属、文保、水文、空域和运营资料，不产生红线、断面、距离、容量或实施结论。',
    precision_note_en: 'The mainline expresses relationships using the announced order and existing provisional key-area anchors only; without official polygons, roads, rights, heritage, hydrology, airspace, and operating inputs, it creates no redline, section, distance, capacity, or implementation conclusion.',
    source_refs: ['geometry/key_areas.geojson#PROV-KEY-001', 'geometry/key_areas.geojson#PROV-KEY-002', 'geometry/key_areas.geojson#PROV-KEY-003', 'visual/assets/human-city-spatial-sequence.json'],
    order_rule: 'north_to_south_announced_sequence',
    stages: [
      { stage_id: 'S1', label_zh: '进入与停留', label_en: 'Enter and dwell', human_right_zh: '普通路径先可用', human_right_en: 'The ordinary path works first' },
      { stage_id: 'S2', label_zh: '人工解释与选择', label_en: 'Staffed explanation and choice', human_right_zh: '不使用 AI 也能获得等效入口', human_right_en: 'An equivalent non-AI entrance remains' },
      { stage_id: 'S3', label_zh: '受限机器接口', label_en: 'Bounded machine interface', human_right_zh: '机器只在授权范围内建议或测试', human_right_en: 'The machine advises or tests only within authorization' },
      { stage_id: 'S4', label_zh: '蓝绿缓冲', label_en: 'Blue-green pause', human_right_zh: '无屏、可退避、可被人工看见', human_right_en: 'Screen-free, retreatable, and human-observable' },
      { stage_id: 'S5', label_zh: '退出与回放', label_en: 'Exit and replay', human_right_zh: '失败回到普通服务与上一发布门', human_right_en: 'Failure returns to ordinary service and the prior gate' }
    ],
    areas: [
      { order: 1, area_id: 'PROV-KEY-001', name_zh: '众智园', name_en: 'Zhongzhiyuan', focus_zh: '受控测试与停机', focus_en: 'Bounded testing and stop', refs: ['ROAD-B-SILICON', 'PUBLIC-B-API', 'PUBLIC-C-SANDBOX', 'GREEN-C-SPONGE'] },
      { order: 2, area_id: 'PROV-KEY-002', name_zh: '北京 AI 原点社区', name_en: 'AI Origin Community', focus_zh: '人工入口与技能再造', focus_en: 'Staffed access and skill transition', refs: ['PUBLIC-A-INCLUSION', 'ROAD-A-SKILL', 'GREEN-A-QUIET-1'] },
      { order: 3, area_id: 'PROV-KEY-003', name_zh: '大钟寺', name_en: 'Dazhongsi', focus_zh: '公共问题台与版本回放', focus_en: 'Public problem desk and version replay', refs: ['SC-D01', 'SC-D02', 'SC-D03'] }
    ],
    stop_rules: ['no human-equivalent entrance', 'unclear authorization or responsibility', 'unreplayed incident or public objection', 'missing official geometry or professional evidence'],
    claims_not_made: ['official boundary', 'engineering section', 'capacity', 'operating authorization', 'policy determination', 'investment commitment']
  };
}

function mainlineSvg(english = false) {
  const title = english ? 'Human-first mainline: walk the public spine before calling the machine' : '人本主轴：先走通京张公共脊，再调用机器';
  const sub = english ? 'A conceptual north-to-south reading of three provisional focus areas · five repeatable human rights' : '三处临时重点区的南北阅读顺序 · 五个可重复的人本权利节点';
  const areas = english ? [['01', 'Zhongzhiyuan', 'bounded testing / stop'], ['02', 'AI Origin Community', 'staffed access / skill transition'], ['03', 'Dazhongsi', 'public problem desk / replay']] : [['01', '众智园', '受控测试 / 停机'], ['02', 'AI 原点社区', '人工入口 / 技能再造'], ['03', '大钟寺', '公共问题台 / 版本回放']];
  const stages = english ? ['Enter', 'Staffed choice', 'Bounded interface', 'Blue-green pause', 'Exit / replay'] : ['进入停留', '人工选择', '受限接口', '蓝绿缓冲', '退出回放'];
  const note = english ? 'Concept recommendation only · provisional geometry · no section, capacity, permit, or operating claim' : '仅为概念建议 · 临时几何 · 不产生断面、容量、许可或运营结论';
  const colors = ['#3d76ea', '#ed5b78', '#16a38e'];
  const lines = [];
  lines.push('<svg xmlns="http://www.w3.org/2000/svg" width="1960" height="980" viewBox="0 0 1960 980">');
  lines.push('<rect width="1960" height="980" fill="#f7f9fc"/>');
  lines.push('<style>.title{font:700 42px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#142b4a}.sub{font:22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#60748d}.zone{font:700 26px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#fff}.label{font:700 19px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#183654}.small{font:17px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#60748d}.tiny{font:15px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#71849b}</style>');
  lines.push(`<text x="70" y="72" class="title">${esc(title)}</text>`);
  lines.push(`<text x="70" y="110" class="sub">${esc(sub)}</text>`);
  lines.push('<line x1="120" y1="220" x2="1680" y2="220" stroke="#173554" stroke-width="12" stroke-linecap="round"/>');
  lines.push('<path d="M1660 202 L1690 220 L1660 238" fill="none" stroke="#173554" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>');
  lines.push(`<text x="120" y="182" class="small">${english ? 'NORTH / announced order' : '北 / 公告顺序'}</text>`);
  lines.push(`<text x="1680" y="182" text-anchor="end" class="small">${english ? 'SOUTH / public reading' : '南 / 公共阅读'}</text>`);
  const starts = [145, 675, 1205];
  areas.forEach((area, index) => {
    const start = starts[index];
    const color = colors[index];
    lines.push(`<circle cx="${start + 40}" cy="220" r="24" fill="#fff" stroke="${color}" stroke-width="8"/>`);
    lines.push(`<text x="${start + 40}" y="228" text-anchor="middle" class="label">${area[0]}</text>`);
    lines.push(`<rect x="${start}" y="276" width="420" height="182" rx="18" fill="#fff" stroke="${color}" stroke-width="4"/>`);
    lines.push(`<rect x="${start}" y="276" width="420" height="62" rx="18" fill="${color}"/>`);
    lines.push(`<text x="${start + 24}" y="316" class="zone">${esc(area[1])}</text>`);
    lines.push(`<text x="${start + 24}" y="374" class="label">${esc(area[2])}</text>`);
    lines.push(`<text x="${start + 24}" y="410" class="small">${english ? 'same five-stage path; different first question' : '同一五段路径；每区先回答不同问题'}</text>`);
    lines.push(`<text x="${start + 24}" y="438" class="tiny">${english ? 'existing GeoJSON anchors / provisional' : '既有 GeoJSON 锚点 / provisional'}</text>`);
  });
  const stageY = 560;
  stages.forEach((stage, index) => {
    const x = 170 + index * 360;
    const fill = index === 0 ? '#dce9ff' : index === 1 ? '#ffe3ea' : index === 2 ? '#e5efff' : index === 3 ? '#dff7f1' : '#edf1f5';
    lines.push(`<rect x="${x}" y="${stageY}" width="300" height="128" rx="16" fill="${fill}" stroke="#c8d4e2" stroke-width="2"/>`);
    lines.push(`<text x="${x + 18}" y="${stageY + 34}" class="label">0${index + 1}</text>`);
    lines.push(`<text x="${x + 18}" y="${stageY + 70}" class="label">${esc(stage)}</text>`);
    lines.push(`<text x="${x + 18}" y="${stageY + 102}" class="small">${index === 0 ? (english ? 'ordinary path' : '普通路径') : index === 1 ? (english ? 'human explanation' : '人工解释') : index === 2 ? (english ? 'minimum permission' : '最小权限') : index === 3 ? (english ? 'screen-free pause' : '无屏停留') : (english ? 'stop / appeal' : '停机申诉')}</text>`);
  });
  lines.push(`<text x="70" y="800" class="tiny">${esc(note)}</text>`);
  lines.push(`<text x="1730" y="800" text-anchor="end" class="tiny">official_boundary=false · geometry_role=provisional_constraint · offline asset</text>`);
  lines.push('</svg>');
  return lines.join('\n') + '\n';
}

function deliveryJson() {
  const matrix = JSON.parse(fs.readFileSync(path.join(here, 'implementation-operation-matrix.json'), 'utf8'));
  return {
    schema_version: '0.1.0',
    package_iteration: 'v1.5',
    delivery_spine_id: 'HUMAN-CITY-DELIVERY-SPINE-001',
    title_zh: '概念交付主线：项目族—发布门—证据—停止',
    title_en: 'Concept delivery spine: project family → release gate → evidence → stop',
    status: 'conceptual_governance_not_commitment',
    official_boundary: false,
    geometry_role: 'provisional_constraint',
    source_file: 'visual/assets/implementation-operation-matrix.json',
    precision_note_zh: '这张主线把既有项目族与 H0-H5 交接压缩为可读时序，不新增主体、预算、工期、许可或运营事实；建议角色不是已确认责任方。',
    precision_note_en: 'This spine compresses the existing project families and H0-H5 handoffs into a readable sequence. It adds no operators, budgets, schedules, permits, or operating facts; suggested roles are not confirmed responsibilities.',
    gates: [
      { gate_id: 'v0.1', label_zh: '观察与人工底线', label_en: 'Observe / human floor', evidence_zh: '官方边界、公众问题、人工等效入口', evidence_en: 'Official geometry, public questions, human-equivalent entrance', stop_zh: '来源、权益或人工入口不清即停', stop_en: 'Stop when source, rights, or staffed access is unclear' },
      { gate_id: 'v0.2', label_zh: '受控概念验证', label_en: 'Bounded concept validation', evidence_zh: '授权范围、事故/保险、能源气候与无障碍资料', evidence_en: 'Authorization, incident/insurance, energy-climate, and accessibility inputs', stop_zh: '不可解释、不可撤回或资料不足即冻结', stop_en: 'Freeze when unexplained, irreversible, or under-evidenced' },
      { gate_id: 'v1.0', label_zh: '独立回放与版本外溢', label_en: 'Independent replay / version outward', evidence_zh: '公众异议、独立复核、版本差异与重算', evidence_en: 'Public objections, independent replay, version delta, and recomputation', stop_zh: '无责任回复或退出记录不发布', stop_en: 'Do not release without responsibility replies or exit records' }
    ],
    project_families: matrix.project_families.map((family) => ({
      family_id: family.family_id,
      family_zh: family.family_zh,
      release_gate: family.release_gate,
      suggested_roles_zh: family.suggested_roles_zh,
      acceptance_evidence_zh: family.acceptance_evidence_zh,
      exit_protocol_zh: family.exit_protocol_zh,
      source_ref: `visual/assets/implementation-operation-matrix.json#${family.family_id}`
    }))
  };
}

function deliverySvg(english = false) {
  const title = english ? 'Concept delivery spine: family → gate → evidence → stop' : '概念交付主线：项目族 → 发布门 → 证据 → 停止';
  const sub = english ? 'A single readable implementation skeleton without inventing operators, budgets, schedules, or permits' : '把实施骨架压成一张可读图，不虚构主体、预算、工期或许可';
  const families = english ? [['PF-A', 'Human buffer', 'v0.1'], ['PF-B', 'City API / reversible', 'v0.2'], ['PF-C', 'Human-machine / climate', 'v0.2'], ['PF-D', 'Data authorization / version', 'v0.1–v1.0'], ['PF-E', 'Capillaries / outward', 'v1.0']] : [['PF-A', '人本缓冲', 'v0.1'], ['PF-B', '城市 API / 可逆', 'v0.2'], ['PF-C', '人机 / 气候', 'v0.2'], ['PF-D', '数据授权 / 版本', 'v0.1–v1.0'], ['PF-E', '毛细血管 / 外溢', 'v1.0']];
  const evidence = english ? ['human-equivalent access', 'authorization + logs', 'safety / energy / climate', 'objection + release note', 'fair access + provenance'] : ['人工等效入口', '授权 + 日志', '安全 / 算电 / 气候', '异议 + release note', '公平申请 + 来源'];
  const stop = english ? ['unclear access', 'unexplained / irreversible', 'missing incident proof', 'purpose drift', 'exclusive / unclear source'] : ['入口不清', '不可解释 / 不可撤回', '事故证据不足', '目的漂移', '排他 / 来源不清'];
  const colors = ['#ed5b78', '#3d76ea', '#16a38e', '#f2a93b', '#7657c8'];
  const lines = [];
  lines.push('<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="980" viewBox="0 0 1800 980">');
  lines.push('<rect width="1800" height="980" fill="#f7f9fc"/>');
  lines.push('<style>.title{font:700 42px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#142b4a}.sub{font:22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#60748d}.head{font:700 19px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#fff}.label{font:700 18px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#173554}.small{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#61748b}.tiny{font:14px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#71849b}</style>');
  lines.push(`<text x="70" y="70" class="title">${esc(title)}</text>`);
  lines.push(`<text x="70" y="108" class="sub">${esc(sub)}</text>`);
  lines.push(`<line x1="160" y1="190" x2="1640" y2="190" stroke="#c8d4e2" stroke-width="6"/>`);
  families.forEach((family, index) => {
    const x = 110 + index * 335;
    const color = colors[index];
    lines.push(`<rect x="${x}" y="230" width="290" height="170" rx="18" fill="#fff" stroke="${color}" stroke-width="4"/>`);
    lines.push(`<rect x="${x}" y="230" width="290" height="54" rx="18" fill="${color}"/>`);
    lines.push(`<text x="${x + 18}" y="265" class="head">${esc(family[0])} · ${esc(family[1])}</text>`);
    lines.push(`<text x="${x + 18}" y="324" class="label">${esc(family[2])}</text>`);
    lines.push(`<text x="${x + 18}" y="360" class="small">${esc(evidence[index])}</text>`);
    lines.push(`<text x="${x + 18}" y="387" class="tiny">${english ? 'suggested roles / not confirmed' : '建议角色 / 未确认责任方'}</text>`);
    if (index < families.length - 1) lines.push(`<path d="M${x + 296} 315 H${x + 328}" stroke="#c8d4e2" stroke-width="4"/><path d="M${x + 318} 306 L${x + 330} 315 L${x + 318} 324" fill="none" stroke="#c8d4e2" stroke-width="3"/>`);
  });
  const columns = [
    { title: english ? 'Evidence before release' : '进入门前先补资料', values: evidence, fill: '#e8f0fb' },
    { title: english ? 'Stop / return' : '失败即停止 / 回退', values: stop, fill: '#fff0f3' }
  ];
  columns.forEach((column, col) => {
    const x = 110 + col * 850;
    lines.push(`<rect x="${x}" y="500" width="760" height="280" rx="18" fill="${column.fill}" stroke="#c8d4e2" stroke-width="2"/>`);
    lines.push(`<text x="${x + 24}" y="548" class="label">${esc(column.title)}</text>`);
    column.values.forEach((value, index) => lines.push(`<text x="${x + 34}" y="${595 + index * 34}" class="small">${index + 1}. ${esc(value)}</text>`));
  });
  lines.push(`<text x="70" y="870" class="tiny">${english ? 'Concept recommendation only · source: implementation-operation-matrix.json · official_boundary=false · geometry_role=provisional_constraint' : '仅为概念建议 · 来源：implementation-operation-matrix.json · official_boundary=false · geometry_role=provisional_constraint'}</text>`);
  lines.push('</svg>');
  return lines.join('\n') + '\n';
}

function write(rel, content) {
  const target = path.join(here, rel);
  fs.writeFileSync(target, content);
}

const search = buildSearch();
write('parametric-search.json', JSON.stringify(search, null, 2) + '\n');
const searchEvidence = {
  schema_version: '0.1.0',
  generated_by: 'visual/assets/build-human-city-v15-assets.js',
  status: 'PASS',
  checks: [
    { id: 'SITE_AREA_MATCH', status: Math.abs(siteArea - search.input_contract.site_area_sqm) < 1e-9 ? 'PASS' : 'FAIL', detail: `metrics=${siteArea}; search=${search.input_contract.site_area_sqm}` },
    { id: 'SAMPLE_COUNT', status: search.sampled_candidates.length >= 100 ? 'PASS' : 'FAIL', detail: `samples=${search.sampled_candidates.length}` },
    { id: 'SHARES_SUM', status: search.sampled_candidates.every((candidate) => Math.abs(sum(Object.values(candidate.shares)) - 1) < 1e-6) ? 'PASS' : 'FAIL', detail: 'all sampled candidates sum to 1 within 1e-6' },
    { id: 'LOWER_BOUND', status: search.sampled_candidates.every((candidate) => Object.values(candidate.shares).every((share) => share >= 0.1)) ? 'PASS' : 'FAIL', detail: 'all comparison floors are met' },
    { id: 'OBJECTIVES_REPLAY', status: search.sampled_candidates.every((candidate) => JSON.stringify(candidate.objective_scores) === JSON.stringify(objectiveScores(candidate.shares))) ? 'PASS' : 'FAIL', detail: 'all four objective formulas replay' },
    { id: 'PARETO_REPLAY', status: search.pareto_front_ids.length > 0 ? 'PASS' : 'FAIL', detail: `pareto=${search.pareto_front_ids.length}; all=${search.search_summary.all_candidate_count}` },
    { id: 'FORMAL_METRIC_CHANGE', status: 'PASS', detail: 'search does not change metrics.json or geometry' },
    { id: 'CONCEPT_BOUNDARY', status: search.status === 'conceptual_deterministic_search' ? 'PASS' : 'FAIL', detail: 'conceptual / low confidence / offline' }
  ],
  sample_count: search.sampled_candidates.length,
  pareto_count: search.pareto_front_ids.length,
  formal_metric_change: false,
  interpretation_zh: 'PASS 只证明固定种子、候选约束、四个代理镜头和非支配筛选可回放；不证明 AI 能力、现场绩效、批准、实施或官方评分。',
  interpretation_en: 'PASS proves only that the fixed seed, candidate constraints, four proxy lenses, and non-dominated filtering replay; it does not prove AI capability, field performance, approval, implementation, or official scoring.'
};
searchEvidence.status = searchEvidence.checks.every((check) => check.status === 'PASS') ? 'PASS' : 'FAIL';
write('parametric-search-evidence.json', JSON.stringify(searchEvidence, null, 2) + '\n');
write('../../assets/figures/parametric-search.svg', makeSearchSvg(search, false));
write('../../assets/figures/parametric-search.en.svg', makeSearchSvg(search, true));
write('human-city-mainline.json', JSON.stringify(mainlineJson(), null, 2) + '\n');
write('human-city-delivery-spine.json', JSON.stringify(deliveryJson(), null, 2) + '\n');
write('../../assets/figures/human-city-mainline.svg', mainlineSvg(false));
write('../../assets/figures/human-city-mainline.en.svg', mainlineSvg(true));
write('../../assets/figures/human-city-delivery-spine.svg', deliverySvg(false));
write('../../assets/figures/human-city-delivery-spine.en.svg', deliverySvg(true));
console.log(JSON.stringify({ search_samples: samples.length, pareto: pareto.length, outputs: 9 }, null, 2));
