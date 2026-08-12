'use strict';

/*
 * Deterministic service-denominator contract screen.
 * It verifies that transport intensity claims stay blocked until a service
 * unit, non-AI comparison, whole-system boundary, time window, completion
 * rule, group breakdown, dated evidence and accountable role are present.
 * It does not calculate local energy, carbon, cost, staffing or performance.
 */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const modelPath = path.join(root, 'resource-denominator-screen.json');
const outputPath = path.join(root, 'resource-denominator-readout.json');
const model = JSON.parse(fs.readFileSync(modelPath, 'utf8'));

function fail(message) {
  console.error(`RESOURCE_DENOMINATOR_CHECK_FAIL: ${message}`);
  process.exitCode = 1;
}

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrap(value, width) {
  const chars = Array.from(String(value));
  const lines = [];
  for (let index = 0; index < chars.length; index += width) lines.push(chars.slice(index, index + width).join(''));
  return lines.length ? lines : [''];
}

function textLines(x, y, values, className, lineHeight, fill) {
  return values.map((value, index) => `<text x="${x}" y="${y + index * lineHeight}" class="${className}"${fill ? ` fill="${fill}"` : ''}>${esc(value)}</text>`).join('');
}

const requiredFields = [
  'service_unit_zh', 'service_unit_en',
  'non_ai_baseline_zh', 'non_ai_baseline_en',
  'whole_system_boundary_zh', 'whole_system_boundary_en',
  'time_window_zh', 'time_window_en',
  'completion_rule_zh', 'completion_rule_en',
  'groups_zh', 'groups_en',
  'owner_needed_zh', 'owner_needed_en'
];

function makeBoard(language) {
  const zh = language === 'zh';
  const title = zh ? '交通资源分母合同：没有分母，不发布强度值' : 'MOBILITY RESOURCE DENOMINATOR: NO INTENSITY CLAIM WITHOUT A LOCKED UNIT';
  const subtitle = zh
    ? '5 个压力场景 × 8 个发布前条件 · 3,122,000 只是合成参考，不是本地人口'
    : '5 stress cases × 8 pre-publication conditions · 3,122,000 is a synthetic reference, not a local population count';
  const contracts = model.scenario_contracts;
  const rows = contracts.map((item, index) => {
    const y = 455 + index * 170;
    const label = zh ? item.label_zh : item.label_en;
    const unit = zh ? item.service_unit_zh : item.service_unit_en;
    const baseline = zh ? item.non_ai_baseline_zh : item.non_ai_baseline_en;
    const owner = zh ? item.owner_needed_zh : item.owner_needed_en;
    return `<g><rect x="90" y="${y}" width="1440" height="140" rx="20" fill="${index % 2 === 0 ? '#f4fafb' : '#e8f2f4'}" stroke="#b5d3d7" stroke-width="2"/><circle cx="128" cy="${y + 38}" r="22" fill="#f0b45c"/><text x="128" y="${y + 45}" text-anchor="middle" class="sans number" fill="#102d43">${index + 1}</text><text x="170" y="${y + 35}" class="sans rowTitle" fill="#102d43">${esc(label)}</text>${textLines(170, y + 68, wrap((zh ? '单位：' : 'UNIT: ') + unit, zh ? 38 : 58), 'sans rowText', 23, '#29465a')}${textLines(170, y + 112, wrap((zh ? '对照：' : 'BASELINE: ') + baseline, zh ? 45 : 65), 'sans rowSmall', 19, '#607b86')}<rect x="1165" y="${y + 24}" width="325" height="40" rx="20" fill="#fff0d8"/><text x="1327" y="${y + 51}" text-anchor="middle" class="sans status" fill="#985f00">DENOMINATOR NOT LOCKED</text>${textLines(1168, y + 94, wrap((zh ? '责任：' : 'OWNER: ') + owner, zh ? 25 : 34), 'sans owner', 18, '#47636f')}</g>`;
  }).join('');
  const gateLabels = zh
    ? ['服务单位', '非 AI 对照', '系统边界', '时间窗口', '完成规则', '分组拆分', '有日期证据', '责任确认']
    : ['service unit', 'non-AI baseline', 'system boundary', 'time window', 'completion rule', 'group split', 'dated evidence', 'owner acceptance'];
  const gates = gateLabels.map((label, index) => {
    const x = 1610 + (index % 2) * 350;
    const y = 455 + Math.floor(index / 2) * 105;
    return `<g><rect x="${x}" y="${y}" width="300" height="70" rx="35" fill="#3d2b32" stroke="#ff9b8e" stroke-width="2"/><circle cx="${x + 34}" cy="${y + 35}" r="14" fill="#ff9b8e"/><text x="${x + 34}" y="${y + 41}" text-anchor="middle" class="sans gateNo" fill="#3d2b32">${index + 1}</text><text x="${x + 62}" y="${y + 42}" class="sans gateLabel" fill="#ffe7e3">${esc(label)}</text></g>`;
  }).join('');
  const flow = (zh ? ['声明单位', '锁定对照', '划清边界', '收集证据', '发布或停'] : ['declare unit', 'lock baseline', 'bound system', 'collect evidence', 'publish or stop']).map((label, index) => {
    const x = 160 + index * 450;
    const arrow = index < 4 ? `<path d="M${x + 275} 1430 H${x + 390} l-18 -12 M${x + 390} 1430 l-18 12" fill="none" stroke="#70e1c3" stroke-width="4"/>` : '';
    return `<g><rect x="${x}" y="1390" width="275" height="78" rx="39" fill="#123a4f" stroke="#4b8991" stroke-width="2"/><text x="${x + 137}" y="1438" text-anchor="middle" class="sans flow" fill="#f4fbfb">${esc(label)}</text>${arrow}</g>`;
  }).join('');
  const blocked = zh ? '当前强度值 0 · 本地计量 0 · 运行授权 0 · 空中出行 BLOCKED' : 'CURRENT INTENSITY CLAIMS 0 · LOCAL MEASUREMENTS 0 · OPERATING AUTHORIZATIONS 0 · AIR BLOCKED';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1550" viewBox="0 0 2400 1550" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}. ${esc(blocked)}</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071a2c"/><stop offset="1" stop-color="#17485a"/></linearGradient><filter id="shadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#00111f" flood-opacity=".22"/></filter><style>.sans{font-family:"PingFang SC","Noto Sans CJK SC","Helvetica Neue",Arial,sans-serif}.title{font-size:52px;font-weight:900;letter-spacing:-2px}.muted{font-size:22px;font-weight:600}.number{font-size:20px;font-weight:900}.rowTitle{font-size:24px;font-weight:850}.rowText{font-size:17px;font-weight:650}.rowSmall{font-size:14px;font-weight:600}.status{font-size:13px;font-weight:900}.owner{font-size:13px;font-weight:650}.gateNo{font-size:14px;font-weight:900}.gateLabel{font-size:16px;font-weight:800}.flow{font-size:21px;font-weight:850}</style></defs><rect width="2400" height="1550" fill="url(#bg)"/><text x="90" y="75" class="sans" font-size="22" font-weight="900" letter-spacing="4" fill="#70e1c3">MOBILITY COMMONS / DENOMINATOR CONTRACT / v1.0</text><text x="90" y="150" class="sans title" fill="#f4fbfb">${esc(title)}</text><text x="90" y="198" class="sans muted" fill="#a8c2c7">${esc(subtitle)}</text><rect x="1950" y="58" width="370" height="62" rx="31" fill="#3e2d2d" stroke="#ff9b8e" stroke-width="2"/><text x="2135" y="97" text-anchor="middle" class="sans" font-size="17" font-weight="900" fill="#ffb1a5">DESIGN CONTRACT / NOT OPERATING</text><g filter="url(#shadow)"><rect x="90" y="250" width="490" height="105" rx="20" fill="#143c4c"/><rect x="605" y="250" width="490" height="105" rx="20" fill="#143c4c"/><rect x="1120" y="250" width="490" height="105" rx="20" fill="#143c4c"/><rect x="1635" y="250" width="685" height="105" rx="20" fill="#143c4c"/></g><text x="120" y="290" class="sans" font-size="18" fill="#a8c2c7">STRESS CONTRACTS</text><text x="120" y="335" class="sans" font-size="39" font-weight="900" fill="#70e1c3">${contracts.length}</text><text x="635" y="290" class="sans" font-size="18" fill="#a8c2c7">LOCKED CONTRACTS</text><text x="635" y="335" class="sans" font-size="39" font-weight="900" fill="#ffd37a">0</text><text x="1150" y="290" class="sans" font-size="18" fill="#a8c2c7">DATED LOCAL MEASUREMENTS</text><text x="1150" y="335" class="sans" font-size="39" font-weight="900" fill="#ffd37a">0 / UNKNOWN</text><text x="1665" y="290" class="sans" font-size="18" fill="#a8c2c7">SYNTHETIC POPULATION REFERENCE</text><text x="1665" y="335" class="sans" font-size="39" font-weight="900" fill="#70e1c3">${model.population_reference.synthetic_agents.toLocaleString('en-US')} / NOT LOCAL</text><rect x="90" y="390" width="1440" height="1030" rx="30" fill="#eaf4f5" filter="url(#shadow)"/><text x="130" y="435" class="sans" font-size="28" font-weight="900" fill="#102d43">${zh ? '五个压力场景：每个服务单位都要有对照和边界' : 'Five stress cases: every service unit needs a baseline and a boundary'}</text>${rows}<rect x="1580" y="390" width="740" height="1030" rx="30" fill="#102d43" filter="url(#shadow)"/><text x="1620" y="435" class="sans" font-size="28" font-weight="900" fill="#70e1c3">${zh ? '八道发布前条件' : 'Eight pre-publication conditions'}</text>${gates}<text x="1620" y="930" class="sans" font-size="20" font-weight="900" fill="#ffb1a5">${zh ? '缺一项，强度值保持阻断' : 'ANY MISSING FIELD BLOCKS INTENSITY'}</text>${textLines(1620, 980, wrap(zh ? model.contract_rules.rule_zh : model.contract_rules.rule_en, 31), 'sans', 20, '#d5e6e8')}<rect x="1620" y="1100" width="660" height="230" rx="24" fill="#173f53" stroke="#3e7d86" stroke-width="2"/><text x="1650" y="1140" class="sans" font-size="18" font-weight="900" fill="#70e1c3">${zh ? '发布前账面状态' : 'PRE-PUBLICATION STATUS'}</text>${textLines(1650, 1185, wrap(blocked, 35), 'sans', 24, '#f4fbfb')}${textLines(1650, 1260, wrap(zh ? '空中出行不进入任何分母或强度比较。' : 'Air mobility stays outside every denominator and intensity comparison.', 36), 'sans', 21, '#ffb1a5')}<text x="130" y="1485" class="sans" font-size="17" font-weight="800" fill="#a8c2c7">${esc(zh ? '合同字段齐全只说明准备记录已写清，不说明已测量、已获批或已经运行。' : 'Complete fields show that the preparation record is explicit; they do not show measurement, approval or operation.')}</text>${flow}</svg>`;
}

const contracts = model.scenario_contracts;
const claims = model.claims;
const fieldsPresent = contracts.every((contract) => requiredFields.every((field) => typeof contract[field] === 'string' && contract[field].trim().length > 0));
const checks = {
  five_stress_contracts: contracts.length === 5,
  population_reference_is_synthetic: model.population_reference.synthetic_agents === 3122000 && model.population_reference.status === 'synthetic_reference_not_local_count',
  all_service_units_present: fieldsPresent,
  all_non_ai_baselines_present: contracts.every((contract) => contract.non_ai_baseline_zh && contract.non_ai_baseline_en),
  all_whole_system_boundaries_present: contracts.every((contract) => contract.whole_system_boundary_zh && contract.whole_system_boundary_en),
  all_time_windows_present: contracts.every((contract) => contract.time_window_zh && contract.time_window_en),
  all_completion_rules_present: contracts.every((contract) => contract.completion_rule_zh && contract.completion_rule_en),
  all_group_breakdowns_present: contracts.every((contract) => contract.groups_zh && contract.groups_en),
  all_owner_fields_present: contracts.every((contract) => contract.owner_needed_zh && contract.owner_needed_en),
  all_evidence_unknown: contracts.every((contract) => contract.evidence_status === 'unknown'),
  no_operating_authorization: model.contract_rules.current_local_measurements === 0 && model.contract_rules.current_operating_authorizations === 0,
  all_claims_blocked_until_evidence: claims.length === 3 && claims.every((claim) => claim.status === 'blocked_until_dated_evidence' && !Object.prototype.hasOwnProperty.call(claim, 'value')),
  no_personal_trace_requirement: model.contract_rules.personal_traces_required === false,
  air_candidate_fail_closed: model.air_candidate.status === 'blocked'
};
Object.entries(checks).forEach(([name, passed]) => { if (!passed) fail(name); });

const output = {
  version: model.version,
  screen_id: model.screen_id,
  generated_by: 'node visual/assets/run-resource-denominator-screen.js',
  status: model.status,
  population_reference: model.population_reference,
  summary: {
    stress_contract_count: contracts.length,
    locked_contract_count: 0,
    current_intensity_claims: model.contract_rules.current_published_intensity_claims,
    current_local_measurements: model.contract_rules.current_local_measurements,
    current_operating_authorizations: model.contract_rules.current_operating_authorizations,
    blocked_claim_count: claims.length,
    air_candidate: model.air_candidate.status
  },
  scenario_contracts: contracts.map((contract) => ({
    id: contract.id,
    stress_case: contract.stress_case,
    label_zh: contract.label_zh,
    label_en: contract.label_en,
    service_unit_zh: contract.service_unit_zh,
    service_unit_en: contract.service_unit_en,
    non_ai_baseline_zh: contract.non_ai_baseline_zh,
    non_ai_baseline_en: contract.non_ai_baseline_en,
    evidence_status: contract.evidence_status,
    operational_status: contract.operational_status,
    owner_needed_zh: contract.owner_needed_zh,
    owner_needed_en: contract.owner_needed_en
  })),
  claims,
  checks,
  interpretation: 'This screen keeps intensity and burden claims blocked until a dated, owned service denominator and a non-AI comparison exist. It is a contract audit, not a local performance result.'
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
const figureDir = path.join(root, '..', '..', 'assets', 'figures');
fs.writeFileSync(path.join(figureDir, 'resource-denominator-board.svg'), `${makeBoard('zh')}\n`, 'utf8');
fs.writeFileSync(path.join(figureDir, 'resource-denominator-board.en.svg'), `${makeBoard('en')}\n`, 'utf8');
console.log(JSON.stringify(output, null, 2));
if (Object.values(checks).every(Boolean)) console.error('RESOURCE_DENOMINATOR_CHECK_PASS: units, baselines, boundaries and fail-closed claims passed');
