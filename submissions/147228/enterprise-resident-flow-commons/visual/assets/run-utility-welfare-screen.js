#!/usr/bin/env node
'use strict';

/*
 * Persist and render the readable decomposition of the regional utility proxy.
 * The regional runner remains the sole source of numeric values; this script
 * only checks parity, reduces aggregate fields and draws the bilingual board.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, '..', '..');
const contractPath = path.join(assetDir, 'utility-welfare-screen.json');
const regionalReadoutPath = path.join(assetDir, 'regional-scale-commute-readout.json');
const outputPath = path.join(assetDir, 'utility-welfare-readout.json');
const runnerPath = path.join(assetDir, 'run-regional-commute-simulation.js');
const figureDir = path.join(packageDir, 'assets', 'figures');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(Number(value) * factor) / factor;
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatNumber(value, digits = 2) {
  return Number(value).toLocaleString('en-US', {minimumFractionDigits: digits, maximumFractionDigits: digits});
}

function shortPolicy(policyId, lang) {
  const labels = {
    O1_transit_priority: ['O1 公交优先', 'O1 transit'],
    O2_equity_balanced: ['O2 公平平衡', 'O2 equity'],
    O3_active_first: ['O3 慢行优先', 'O3 active-first'],
    O4_capacity_balanced: ['O4 容量平衡', 'O4 capacity']
  };
  return labels[policyId]?.[lang === 'zh' ? 0 : 1] || policyId;
}

function compactComponents(readout) {
  return {
    mean_components: readout.mean_components,
    total_disutility: readout.total_disutility,
    reconstructed_score: readout.reconstructed_score,
    by_group: readout.by_group
  };
}

const contract = readJson(contractPath);
const failures = [];
const componentIds = contract.components.map((component) => component.id);
const run = spawnSync(process.execPath, [runnerPath], {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024
});
if (run.error) failures.push(`regional runner error: ${run.error.message}`);
if (run.status !== 0) failures.push(`regional runner exited with status ${run.status}`);

let generated;
let persisted;
try {
  generated = JSON.parse(run.stdout);
} catch (error) {
  failures.push(`cannot parse regional runner stdout: ${error.message}`);
}
try {
  persisted = readJson(regionalReadoutPath);
} catch (error) {
  failures.push(`cannot parse regional compact readout: ${error.message}`);
}

if (generated && persisted) {
  if (JSON.stringify(generated.optimization_search) !== JSON.stringify(persisted.optimization_search)) {
    failures.push('regional compact readout is stale; run regional-readout-audit --sync after the runner changes');
  }
}

function checkComponentReadout(readout, expectedScore, label) {
  if (!readout || !readout.mean_components || !readout.by_group) {
    failures.push(`${label}: missing component readout`);
    return;
  }
  if (JSON.stringify(Object.keys(readout.mean_components)) !== JSON.stringify(componentIds)) {
    failures.push(`${label}: component order does not match the contract`);
  }
  const reconstructed = Number(readout.reconstructed_score);
  if (Math.abs(reconstructed - Number(expectedScore)) > contract.hard_checks.component_reconstruction_error_max_points) {
    failures.push(`${label}: reconstructed score is not within the declared error bound`);
  }
  for (const [groupId, group] of Object.entries(readout.by_group)) {
    if (sum(Object.values(group.mean_components)) < 0) failures.push(`${label}/${groupId}: negative disutility`);
  }
}

let candidates = [];
let selected;
if (generated) {
  candidates = generated.optimization_search.ranked_candidates || [];
  selected = generated.selected_policy_readout;
  if (candidates.length !== contract.candidate_set.length) failures.push('candidate count does not match the contract');
  for (const candidate of candidates) {
    checkComponentReadout(candidate.satisfaction_component_readout, candidate.satisfaction_proxy, candidate.policy_id);
    if (candidate.agents_processed !== contract.population_reference || !candidate.all_agents_processed || !candidate.mass_conservation) {
      failures.push(`${candidate.policy_id}: population or mass gate failed`);
    }
    if (candidate.air_candidate !== contract.hard_checks.air_candidate) failures.push(`${candidate.policy_id}: air candidate is not blocked`);
    if (candidate.privacy_check !== contract.hard_checks.privacy_check) failures.push(`${candidate.policy_id}: privacy check failed`);
  }
  checkComponentReadout(selected?.satisfaction_component_readout, selected?.satisfaction_proxy, 'selected policy');
  if (selected?.policy_id !== generated.optimization_search.selected_policy) failures.push('selected policy is inconsistent with candidate ranking');
  if (!Object.values(generated.checks || {}).every(Boolean)) failures.push('regional runner contains a failed check');
}

const selectedComponents = selected?.satisfaction_component_readout || {mean_components: {}, by_group: {}};
const groups = Object.entries(selectedComponents.by_group).map(([id, value]) => ({id, ...value}));
const candidateSummary = candidates.map((candidate) => ({
  rank: candidate.rank,
  policy_id: candidate.policy_id,
  label_zh: shortPolicy(candidate.policy_id, 'zh'),
  label_en: shortPolicy(candidate.policy_id, 'en'),
  satisfaction_proxy: candidate.satisfaction_proxy,
  reconstructed_score: candidate.satisfaction_component_readout?.reconstructed_score,
  hard_gate_pass: candidate.hard_gate_pass,
  agents_processed: candidate.agents_processed,
  max_mode_load_ratio: candidate.max_mode_load_ratio,
  worst_group_satisfaction_p10_proxy: candidate.worst_group_satisfaction_p10_proxy,
  component_readout: compactComponents(candidate.satisfaction_component_readout)
}));

const checks = {
  regional_runner_exit_zero: run.status === 0,
  regional_compact_readout_parity: generated && persisted && JSON.stringify(generated.optimization_search) === JSON.stringify(persisted.optimization_search),
  candidate_set_complete: candidates.length === contract.candidate_set.length,
  all_candidates_reconstructed: candidates.length > 0 && candidates.every((candidate) => Math.abs(candidate.satisfaction_component_readout.reconstructed_score - candidate.satisfaction_proxy) <= contract.hard_checks.component_reconstruction_error_max_points),
  selected_policy_reconstructed: Boolean(selected && Math.abs(selected.satisfaction_component_readout.reconstructed_score - selected.satisfaction_proxy) <= contract.hard_checks.component_reconstruction_error_max_points),
  all_agents_processed: candidates.length > 0 && candidates.every((candidate) => candidate.agents_processed === contract.population_reference && candidate.all_agents_processed),
  mass_conservation: candidates.length > 0 && candidates.every((candidate) => candidate.mass_conservation),
  air_candidate_blocked: candidates.length > 0 && candidates.every((candidate) => candidate.air_candidate === contract.hard_checks.air_candidate),
  privacy_aggregate_only: candidates.length > 0 && candidates.every((candidate) => candidate.privacy_check === contract.hard_checks.privacy_check)
};
for (const [name, passed] of Object.entries(checks)) if (!passed && !failures.includes(name)) failures.push(name);

function renderBoard(lang) {
  const zh = lang === 'zh';
  const width = 1600;
  const height = 1000;
  const title = zh ? '把“满意度代理”拆开看：每一分都能回到出行代价' : 'Decompose the utility proxy: every point traces to a travel cost';
  const subtitle = zh
    ? 'O4 合成代理分 66.44 · 组成项回算 66.44 · 六类群体 × 七项代价'
    : 'O4 synthetic proxy 66.44 · reconstructed 66.44 · six groups × seven cost components';
  const scoreLabel = zh ? 'O4 合成代理分' : 'O4 synthetic proxy';
  const scoreBoundary = zh ? '居民满意度调查：0 份，尚未运行' : 'Resident satisfaction responses: 0, not run';
  const componentTitle = zh ? '群体组成项。条越长，代理代价越高' : 'Group components. Longer means higher proxy disutility';
  const candidateTitle = zh ? '候选复核。分数与硬门一起看' : 'Candidate check. Read score with hard gates';
  const footer = zh
    ? '合成聚合屏查，不是居民满意度、员工偏好、公众接受度或现场运营绩效。正式决策前需补齐分组调查、15 分钟 OD、等待/登乘、路缘冲突、无障碍走查和可靠性记录。'
    : 'Synthetic aggregate screen, not resident satisfaction, employee preference, public acceptance or field operating performance. Local decisions still require grouped responses, 15-minute OD, wait/boarding, curb-conflict, accessibility and reliability evidence.';
  const groupLabels = {
    enterprise_employee: zh ? '企业员工' : 'enterprise employees',
    resident_worker: zh ? '居民工作者' : 'resident workers',
    carer_or_child: zh ? '照护者 / 儿童' : 'carers / children',
    visitor_service: zh ? '访客 / 服务' : 'visitors / service',
    logistics_and_maintenance: zh ? '物流 / 维护' : 'logistics / maintenance',
    night_worker: zh ? '夜班工作者' : 'night workers'
  };
  const chartX = 325;
  const chartY = 270;
  const chartWidth = 650;
  const rowGap = 63;
  const maxDisutility = 42;
  const scale = chartWidth / maxDisutility;
  const groupMarkup = groups.map((group, index) => {
    const y = chartY + index * rowGap;
    let x = chartX;
    const segments = contract.components.map((component) => {
      const value = Number(group.mean_components[component.id] || 0);
      const segmentWidth = value * scale;
      const rect = `<rect x="${x.toFixed(1)}" y="${y}" width="${Math.max(segmentWidth, 0).toFixed(1)}" height="28" fill="${component.color}"/>`;
      x += segmentWidth;
      return rect;
    }).join('');
    return `<text x="72" y="${y + 20}" class="group">${esc(groupLabels[group.id] || group.id)}</text><rect x="${chartX}" y="${y}" width="${chartWidth}" height="28" rx="6" fill="#123047"/>${segments}<text x="${chartX + chartWidth + 22}" y="${y + 20}" class="score">${formatNumber(group.reconstructed_score, 2)}</text><text x="${chartX + chartWidth + 82}" y="${y + 20}" class="muted">${zh ? '代理分' : 'proxy'}</text>`;
  }).join('');
  const candidateMarkup = candidateSummary.map((candidate, index) => {
    const y = 285 + index * 82;
    const barWidth = Math.max(0, Number(candidate.satisfaction_proxy) * 2.1);
    const gate = candidate.hard_gate_pass ? (zh ? '硬门通过' : 'GATE PASS') : (zh ? '硬门未通过' : 'GATE FAIL');
    const gateColor = candidate.hard_gate_pass ? '#55D6BE' : '#FF9F68';
    return `<text x="1118" y="${y}" class="candidate">${esc(zh ? candidate.label_zh : candidate.label_en)}</text><rect x="1118" y="${y + 15}" width="220" height="18" rx="9" fill="#123047"/><rect x="1118" y="${y + 15}" width="${barWidth.toFixed(1)}" height="18" rx="9" fill="${candidate.policy_id === selected.policy_id ? '#55D6BE' : '#69A7FF'}"/><text x="1355" y="${y + 30}" class="score">${formatNumber(candidate.satisfaction_proxy, 2)}</text><text x="1460" y="${y + 30}" class="gate" fill="${gateColor}">${gate}</text><text x="1118" y="${y + 56}" class="muted">${zh ? '回算' : 'reconstructed'} ${formatNumber(candidate.reconstructed_score, 2)} · ${zh ? '峰值负荷' : 'peak load'} ${formatNumber(candidate.max_mode_load_ratio, 2)}×</text>`;
  }).join('');
  const legend = contract.components.map((component, index) => {
    const x = 72 + (index % 4) * 250;
    const y = 760 + Math.floor(index / 4) * 34;
    return `<rect x="${x}" y="${y - 14}" width="14" height="14" rx="3" fill="${component.color}"/><text x="${x + 24}" y="${y - 2}" class="legend">${esc(zh ? component.label_zh : component.label_en)}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}"><rect width="${width}" height="${height}" fill="#061521"/><rect x="48" y="38" width="1004" height="112" rx="20" fill="#0B2438" stroke="#1C4C61"/><text x="72" y="83" class="title">${esc(title)}</text><text x="72" y="119" class="subtitle">${esc(subtitle)}</text><rect x="1090" y="38" width="462" height="112" rx="20" fill="#123047" stroke="#55D6BE" stroke-width="2"/><text x="1118" y="72" class="kicker">${esc(scoreLabel)}</text><text x="1118" y="127" class="hero">66.44</text><text x="1320" y="121" class="score-note">${esc(zh ? '重构误差 ≤ 0.05' : 'reconstruction error ≤ 0.05')}</text><text x="72" y="206" class="section">${esc(componentTitle)}</text><text x="72" y="232" class="muted">${esc(zh ? '单位：每名合成代理的代理点；分数 = 100 − 各项代价之和' : 'Unit: proxy points per synthetic agent; score = 100 − sum of component costs')}</text><line x1="${chartX}" y1="248" x2="${chartX + chartWidth}" y2="248" stroke="#31536A"/><text x="${chartX}" y="244" class="axis">0</text><text x="${chartX + chartWidth / 2 - 12}" y="244" class="axis">21</text><text x="${chartX + chartWidth - 18}" y="244" class="axis">42</text>${groupMarkup}<text x="1005" y="${chartY + 20}" class="axis">${esc(zh ? '得分' : 'score')}</text><rect x="1088" y="190" width="464" height="455" rx="20" fill="#0B2438" stroke="#1C4C61"/><text x="1118" y="232" class="section">${esc(candidateTitle)}</text>${candidateMarkup}<text x="72" y="734" class="section">${esc(zh ? '组成项图例' : 'Component legend')}</text>${legend}<rect x="48" y="858" width="1504" height="90" rx="18" fill="#0B2438" stroke="#A65F55"/><text x="72" y="891" class="boundary">${esc(zh ? '边界' : 'BOUNDARY')}</text><text x="165" y="891" class="footer">${esc(scoreBoundary)}</text><text x="72" y="925" class="footer">${esc(footer)}</text><style>.title{font:800 30px Arial,sans-serif;fill:#EAF8FA}.subtitle{font:500 17px Arial,sans-serif;fill:#A7C9D3}.kicker{font:700 15px Arial,sans-serif;fill:#8EBAC7;letter-spacing:1px}.hero{font:800 54px Arial,sans-serif;fill:#55D6BE}.score-note{font:700 15px Arial,sans-serif;fill:#D7F8F1}.section{font:800 19px Arial,sans-serif;fill:#DDEFF2}.muted{font:500 13px Arial,sans-serif;fill:#86A9B8}.group{font:700 15px Arial,sans-serif;fill:#DDEFF2}.score{font:800 17px Arial,sans-serif;fill:#EAF8FA}.axis{font:500 12px Arial,sans-serif;fill:#7394A5}.candidate{font:700 16px Arial,sans-serif;fill:#DDEFF2}.gate{font:800 12px Arial,sans-serif}.legend{font:600 14px Arial,sans-serif;fill:#C5DDE2}.boundary{font:800 13px Arial,sans-serif;fill:#FF9F68;letter-spacing:1px}.footer{font:500 13px Arial,sans-serif;fill:#C5DDE2}</style></svg>`;
}

if (failures.length) {
  console.error(JSON.stringify({runner: 'run-utility-welfare-screen.js', status: 'FAIL', failures}, null, 2));
  process.exit(1);
}

const output = {
  schema_version: contract.schema_version,
  screen_id: contract.screen_id,
  status: contract.status,
  source_runner: contract.source_runner,
  model_version: generated.model_version,
  population_reference: contract.population_reference,
  selected_policy: selected.policy_id,
  selected_score: selected.satisfaction_proxy,
  selected_reconstructed_score: selected.satisfaction_component_readout.reconstructed_score,
  formula: contract.formula,
  component_units: contract.component_units,
  component_order: componentIds,
  selected_component_readout: compactComponents(selected.satisfaction_component_readout),
  groups,
  candidate_summary: candidateSummary,
  observed_satisfaction_responses: contract.observed_satisfaction_responses,
  observed_satisfaction_status: contract.observed_satisfaction_status,
  aggregate_only: contract.aggregate_only,
  hard_checks: contract.hard_checks,
  checks,
  calibration_required_before_local_decision: contract.calibration_required_before_local_decision,
  source_boundaries: contract.source_boundaries,
  interpretation: contract.interpretation
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(path.join(figureDir, 'utility-welfare-board.svg'), renderBoard('zh'));
fs.writeFileSync(path.join(figureDir, 'utility-welfare-board.en.svg'), renderBoard('en'));
console.log(JSON.stringify({runner: 'run-utility-welfare-screen.js', status: 'PASS', selected_policy: output.selected_policy, selected_score: output.selected_score, reconstructed_score: output.selected_reconstructed_score, checks: output.checks}, null, 2));
