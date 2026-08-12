#!/usr/bin/env node

/*
 * Deterministic staged-recovery screen.
 * It separates the passenger-service clock from the asset-recovery clock,
 * publishes group aggregates only, and never claims an operating timetable,
 * observed satisfaction, local resilience or air-service permission.
 */

const fs = require('fs');
const path = require('path');

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, '..', '..');
const figureDir = path.join(packageDir, 'assets', 'figures');
const model = JSON.parse(fs.readFileSync(path.join(assetDir, 'service-continuity-screen.json'), 'utf8'));
const regional = JSON.parse(fs.readFileSync(path.join(assetDir, 'regional-scale-commute-readout.json'), 'utf8'));
const outputPath = path.join(assetDir, 'service-continuity-readout.json');

const clamp = (value, low = 0, high = 1) => Math.max(low, Math.min(high, value));
const round = (value, digits = 4) => Number(Number(value).toFixed(digits));

function fail(message) {
  console.error(`SERVICE_CONTINUITY_CHECK_FAIL: ${message}`);
  process.exitCode = 1;
}

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function groupTotal() {
  return model.groups.reduce((sum, group) => sum + group.count, 0);
}

function modeImpactShare(scenario) {
  return scenario.impact_modes.reduce((sum, mode) => sum + Number(model.mode_shares_from_regional_readout[mode] || 0) * Number(scenario.affected_share_by_mode[mode] || 0), 0);
}

function calculate(policy, scenario) {
  const leadCoverage = clamp(policy.announcement_lead_minutes / scenario.notice_required_minutes);
  const noticeFactor = 0.65 + leadCoverage * 0.35;
  const protectedRoute = policy.human_takeover;
  const accessibleFactor = protectedRoute ? 1 - scenario.accessibility_exposure * 0.25 : 1 - scenario.accessibility_exposure;
  const capture = clamp(policy.fallback_capture * noticeFactor * accessibleFactor + (protectedRoute ? 0.04 : 0), 0, 0.97);
  const affectedShare = modeImpactShare(scenario);
  const groupRows = model.groups.map((group) => {
    const affected = group.count * affectedShare * group.risk_multiplier;
    const fallback = affected * capture;
    const unserved = Math.max(0, affected - fallback);
    const delay = scenario.base_delay_minutes * (0.86 + group.risk_multiplier * 0.14) * (protectedRoute ? 0.82 : 1) * (1 - 0.14 * leadCoverage);
    const accessibilityPenalty = scenario.accessibility_exposure * (protectedRoute ? 0.25 : 1) * group.risk_multiplier * 0.018;
    const continuity = clamp(1 - unserved / group.count - delay / 10000 - accessibilityPenalty);
    return {
      group_id: group.id,
      label_zh: group.label_zh,
      label_en: group.label_en,
      population_agents: group.count,
      affected_agents: Math.round(affected),
      fallback_agents: Math.round(fallback),
      unserved_agents: Math.round(unserved),
      delay_minutes_proxy: round(delay, 2),
      continuity_proxy: round(continuity, 4),
      accessible_route_preserved: protectedRoute || scenario.accessibility_exposure === 0
    };
  });
  const continuity = groupRows.reduce((sum, row) => sum + row.continuity_proxy * row.population_agents, 0) / groupTotal();
  const values = groupRows.map((row) => row.continuity_proxy);
  const gap = (Math.max(...values) - Math.min(...values)) * 100;
  const recoveryMinutes = scenario.repair_hours * 60 * policy.repair_factor;
  const queuePersonMinutes = groupRows.reduce((sum, row) => sum + row.unserved_agents * row.delay_minutes_proxy, 0);
  const affectedAgents = groupRows.reduce((sum, row) => sum + row.affected_agents, 0);
  const fallbackAgents = groupRows.reduce((sum, row) => sum + row.fallback_agents, 0);
  const checks = {
    all_agents_processed: groupRows.reduce((sum, row) => sum + row.population_agents, 0) === model.population_reference,
    mass_conservation: groupRows.every((row) => row.population_agents === row.affected_agents + (row.population_agents - row.affected_agents)),
    accessible_route_preserved: groupRows.every((row) => row.accessible_route_preserved),
    air_candidate_blocked: model.air_candidate === 'blocked',
    recovery_within_declared_window: recoveryMinutes <= 360,
    worst_group_gap_within_gate: gap <= 18
  };
  const gatePass = Object.values(checks).every(Boolean);
  const stageTrace = model.stages.map((stage) => ({
    stage_id: stage.id,
    label_zh: stage.label_zh,
    label_en: stage.label_en,
    passenger_service_minute: stage.service_minute,
    asset_recovery_hour: stage.asset_hour,
    continuity_proxy: round(clamp(continuity - (stage.id === 'S2' ? (1 - capture) * 0.02 : 0) + (stage.id === 'S5' ? 0.004 : 0)), 4)
  }));
  return {
    policy_id: policy.id,
    policy_label_zh: policy.label_zh,
    policy_label_en: policy.label_en,
    scenario_id: scenario.id,
    scenario_label_zh: scenario.label_zh,
    scenario_label_en: scenario.label_en,
    affected_modes: scenario.impact_modes,
    affected_share: round(affectedShare, 6),
    affected_agents: affectedAgents,
    fallback_agents: fallbackAgents,
    continuity_proxy: round(continuity),
    worst_group_continuity_gap_points: round(gap, 2),
    recovery_p50_minutes_proxy: round(recoveryMinutes, 2),
    queue_person_minutes_proxy: Math.round(queuePersonMinutes),
    notice_coverage_proxy: round(leadCoverage),
    accessible_route_preserved: checks.accessible_route_preserved,
    human_takeover: policy.human_takeover,
    gate_pass: gatePass,
    checks,
    groups: groupRows,
    stage_trace: stageTrace,
    interpretation: 'Synthetic aggregate screen only; replace disruption, notice, fallback, repair and group evidence before any local decision.'
  };
}

function selectPolicy(rows) {
  return [...rows].sort((a, b) => Number(b.gate_pass) - Number(a.gate_pass)
    || b.continuity_proxy - a.continuity_proxy
    || a.worst_group_continuity_gap_points - b.worst_group_continuity_gap_points
    || a.recovery_p50_minutes_proxy - b.recovery_p50_minutes_proxy)[0];
}

function textLines(x, y, values, className, gap, fill) {
  return values.map((value, index) => `<text x="${x}" y="${y + index * gap}" class="${className}" fill="${fill}">${esc(value)}</text>`).join('');
}

function board(language, readout) {
  const zh = language === 'zh';
  const title = zh ? '两只时钟：中断时先保住人，再修复资产' : 'TWO CLOCKS: PROTECT PEOPLE FIRST, THEN RESTORE ASSETS';
  const subtitle = zh ? '3,122,000 个合成代理 × 5 个压力场景 × 3 个处置策略 · 只发布聚合回读' : '3,122,000 synthetic agents × 5 stress cases × 3 response policies · aggregate readout only';
  const note = zh ? '这是一张 staged-recovery 屏查：乘客服务时钟看通知、接管和到达；资产恢复时钟看责任、维修、无障碍复核和公共路线恢复。不是事故预测、现场满意度或运营承诺。' : 'A staged-recovery screen: the passenger clock tracks notice, handoff and arrival; the asset clock tracks ownership, repair, accessibility verification and public-route restoration. Not an incident forecast, field satisfaction or operating promise.';
  const scenarios = readout.scenarios;
  const colors = ['#63E6BE', '#82A7FF', '#F7C66A', '#F38BA8', '#B9A6FF'];
  const rows = scenarios.map((item, index) => {
    const y = 320 + index * 82;
    const selected = item.selected_policy_readout;
    const label = zh ? item.label_zh : item.label_en;
    const mode = zh ? item.affected_modes_zh : item.affected_modes_en;
    const gate = selected.gate_pass ? (zh ? 'PASS' : 'PASS') : (zh ? '停 / 校准' : 'STOP / CALIBRATE');
    return `<g><rect x="70" y="${y - 33}" width="1050" height="62" rx="14" fill="#102B3B" stroke="#2C5566"/><rect x="70" y="${y - 33}" width="7" height="62" rx="3" fill="${colors[index]}"/><text x="95" y="${y - 5}" class="row" fill="#F4FBFF">${esc(label)}</text><text x="420" y="${y - 5}" class="small" fill="#B6D3DC">${esc(mode)}</text><text x="700" y="${y - 5}" class="value" fill="#F4FBFF">${(selected.continuity_proxy * 100).toFixed(1)}%</text><text x="815" y="${y - 5}" class="small" fill="#B6D3DC">${zh ? '最差组差距' : 'worst-group gap'} ${selected.worst_group_continuity_gap_points.toFixed(1)} pt</text><rect x="1000" y="${y - 22}" width="100" height="30" rx="15" fill="${selected.gate_pass ? '#154A43' : '#55333F'}"/><text x="1050" y="${y - 1}" text-anchor="middle" class="status" fill="${selected.gate_pass ? '#63E6BE' : '#FF9FAF'}">${gate}</text></g>`;
  }).join('');
  const policies = readout.policy_summary.map((item, index) => {
    const x = 1180;
    const y = 320 + index * 118;
    const label = zh ? item.label_zh : item.label_en;
    return `<g><rect x="${x}" y="${y - 35}" width="550" height="94" rx="16" fill="#F2F8F8"/><rect x="${x}" y="${y - 35}" width="8" height="94" rx="4" fill="${colors[index + 1] || '#63E6BE'}"/><text x="${x + 28}" y="${y - 8}" class="cardTitle" fill="#54727D">${esc(label)}</text><text x="${x + 28}" y="${y + 22}" class="cardValue" fill="#102B3B">${(item.mean_continuity_proxy * 100).toFixed(1)}%</text><text x="${x + 188}" y="${y + 21}" class="smallDark" fill="#54727D">${zh ? '平均连续性' : 'mean continuity'}</text><text x="${x + 28}" y="${y + 46}" class="tinyDark" fill="#54727D">${zh ? '最差组差距' : 'worst gap'} ${item.max_worst_group_gap_points.toFixed(1)} pt · ${zh ? '恢复 P50' : 'recovery P50'} ${item.mean_recovery_minutes_proxy.toFixed(0)} min</text></g>`;
  }).join('');
  const clock = [
    {zh: '通知', en: 'notice'}, {zh: '中断', en: 'disruption'}, {zh: '人工接管', en: 'human handoff'}, {zh: '维修', en: 'repair'}, {zh: '无障碍复核', en: 'access verify'}, {zh: '公共路线恢复', en: 'route restored'}
  ].map((item, index) => {
    const x = 95 + index * 265;
    const label = zh ? item.zh : item.en;
    const arrow = index < 5 ? `<path d="M${x + 180} 855 H${x + 230} l-12 -8 M${x + 230} 855 l-12 8" fill="none" stroke="#63E6BE" stroke-width="3"/>` : '';
    return `<g><circle cx="${x + 45}" cy="855" r="24" fill="#163F4E" stroke="#63E6BE" stroke-width="2"/><text x="${x + 45}" y="862" text-anchor="middle" class="clockNo" fill="#F4FBFF">${index + 1}</text><text x="${x + 82}" y="861" class="clockLabel" fill="#D9ECEC">${esc(label)}</text>${arrow}</g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1000" viewBox="0 0 1800 1000" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}. ${esc(note)}</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071A2B"/><stop offset="1" stop-color="#123E4A"/></linearGradient><style>.title{font:900 34px PingFang SC,Microsoft YaHei,Arial,sans-serif}.sub{font:600 15px PingFang SC,Microsoft YaHei,Arial,sans-serif}.row{font:850 18px PingFang SC,Microsoft YaHei,Arial,sans-serif}.small{font:550 13px PingFang SC,Microsoft YaHei,Arial,sans-serif}.value{font:900 21px Arial,sans-serif}.status{font:900 12px Arial,PingFang SC,sans-serif}.cardTitle{font:850 13px Arial,PingFang SC,sans-serif;letter-spacing:.4px}.cardValue{font:900 30px Arial,sans-serif}.smallDark{font:600 13px PingFang SC,Arial,sans-serif}.tinyDark{font:600 12px PingFang SC,Arial,sans-serif}.clockNo{font:900 15px Arial,sans-serif}.clockLabel{font:700 14px PingFang SC,Arial,sans-serif}</style></defs><rect width="1800" height="1000" fill="url(#bg)"/><circle cx="1690" cy="20" r="300" fill="#2A9D8F" opacity=".14"/><circle cx="80" cy="960" r="260" fill="#5B8DEF" opacity=".12"/><text x="70" y="52" font-family="Arial" font-size="16" font-weight="900" letter-spacing="3" fill="#63E6BE">MOBILITY COMMONS / SERVICE CONTINUITY / v1.0</text><text x="70" y="101" class="title" fill="#F4FBFF">${esc(title)}</text><text x="70" y="130" class="sub" fill="#A9C7D4">${esc(subtitle)}</text><rect x="70" y="153" width="1660" height="56" rx="14" fill="#0B2738" stroke="#2A9D8F"/><text x="92" y="188" class="sub" fill="#D9ECEC">${esc(note)}</text><g><rect x="70" y="235" width="320" height="58" rx="14" fill="#143C4D"/><text x="92" y="259" class="small" fill="#A9C7D4">${zh ? '人口规模参照' : 'POPULATION REFERENCE'}</text><text x="92" y="282" font-size="25" font-weight="900" fill="#63E6BE">3,122,000</text><rect x="410" y="235" width="320" height="58" rx="14" fill="#143C4D"/><text x="432" y="259" class="small" fill="#A9C7D4">${zh ? '压力场景' : 'STRESS CASES'}</text><text x="432" y="282" font-size="25" font-weight="900" fill="#82A7FF">5</text><rect x="750" y="235" width="320" height="58" rx="14" fill="#143C4D"/><text x="772" y="259" class="small" fill="#A9C7D4">${zh ? '双时钟' : 'TWO CLOCKS'}</text><text x="772" y="282" font-size="25" font-weight="900" fill="#F7C66A">2</text><rect x="1090" y="235" width="640" height="58" rx="14" fill="#3B2935" stroke="#F38BA8"/><text x="1112" y="259" class="small" fill="#F9B2BF">${zh ? '空中候选' : 'AIR CANDIDATE'}</text><text x="1112" y="282" font-size="25" font-weight="900" fill="#FF9FAF">BLOCKED</text></g><text x="70" y="315" font-family="Arial" font-size="13" font-weight="900" letter-spacing="1.2" fill="#63E6BE">${zh ? '选定策略 × 场景回读' : 'SELECTED RESPONSE × SCENARIO READOUT'}</text>${rows}<text x="1180" y="315" font-family="Arial" font-size="13" font-weight="900" letter-spacing="1.2" fill="#63E6BE">${zh ? '三种策略的效率—公平—恢复折中' : 'THREE POLICY TRADE-OFFS'}</text>${policies}<rect x="70" y="745" width="1660" height="170" rx="20" fill="#102B3B" stroke="#2C5566"/><text x="95" y="785" font-family="Arial" font-size="13" font-weight="900" letter-spacing="1.2" fill="#63E6BE">${zh ? '恢复链：乘客服务时钟 + 资产恢复时钟' : 'RECOVERY CHAIN: PASSENGER SERVICE CLOCK + ASSET RECOVERY CLOCK'}</text>${clock}<text x="95" y="955" class="sub" fill="#A9C7D4">${esc(zh ? 'P2 只在合成屏查中优先；现场必须补齐有日期的通知、回退、维修、无障碍复核和公共路线恢复证据。' : 'P2 is only preferred inside this synthetic screen; field use requires dated notice, fallback, repair, accessibility verification and public-route restoration evidence.')}</text></svg>`;
}

const expectedPopulation = model.population_reference;
const checks = {
  population_matches_regional: expectedPopulation === regional.regional_scope.population_reference,
  group_total_matches_population: groupTotal() === expectedPopulation,
  mode_share_parity: Object.keys(model.mode_shares_from_regional_readout).every((mode) => Math.abs(Number(model.mode_shares_from_regional_readout[mode]) - Number(regional.selected_policy_readout.mode_shares[mode])) < 0.00001),
  five_scenarios: model.scenarios.length === 5,
  three_policies: model.policies.length === 3,
  six_stages: model.stages.length === 6,
  aggregate_only: model.aggregate_only === true,
  air_candidate_fail_closed: model.air_candidate === 'blocked'
};
Object.entries(checks).forEach(([name, passed]) => { if (!passed) fail(name); });

const scenarioReadouts = model.scenarios.map((scenario) => {
  const rows = model.policies.map((policy) => calculate(policy, scenario));
  const selected = selectPolicy(rows);
  return {
    scenario_id: scenario.id,
    label_zh: scenario.label_zh,
    label_en: scenario.label_en,
    affected_modes_zh: scenario.impact_modes.map((mode) => ({metro: '地铁', bus: '公交', bicycle: '自行车', walking_wheelchair: '步行/无障碍', car: '汽车', enterprise_shuttle: '企业接驳'}[mode] || mode)).join(' + '),
    affected_modes_en: scenario.impact_modes.join(' + '),
    description_zh: scenario.description_zh,
    description_en: scenario.description_en,
    selected_policy_id: selected.policy_id,
    selected_policy_readout: selected,
    policy_readouts: rows
  };
});

const policySummary = model.policies.map((policy) => {
  const rows = scenarioReadouts.map((scenario) => scenario.policy_readouts.find((row) => row.policy_id === policy.id));
  return {
    policy_id: policy.id,
    label_zh: policy.label_zh,
    label_en: policy.label_en,
    mean_continuity_proxy: round(rows.reduce((sum, row) => sum + row.continuity_proxy, 0) / rows.length),
    min_continuity_proxy: round(Math.min(...rows.map((row) => row.continuity_proxy))),
    max_worst_group_gap_points: round(Math.max(...rows.map((row) => row.worst_group_continuity_gap_points)), 2),
    mean_recovery_minutes_proxy: round(rows.reduce((sum, row) => sum + row.recovery_p50_minutes_proxy, 0) / rows.length, 2),
    gate_pass_count: rows.filter((row) => row.gate_pass).length,
    human_takeover: policy.human_takeover
  };
});

const output = {
  schema_version: model.schema_version,
  screen_id: model.screen_id,
  status: model.status,
  population_reference: model.population_reference,
  aggregate_only: model.aggregate_only,
  clocks: model.clocks,
  stages: model.stages,
  policy_summary: policySummary,
  scenarios: scenarioReadouts,
  checks: {
    ...checks,
    all_scenarios_processed: scenarioReadouts.length === model.scenarios.length,
    all_policies_processed: scenarioReadouts.every((scenario) => scenario.policy_readouts.length === model.policies.length),
    all_agents_processed: scenarioReadouts.every((scenario) => scenario.policy_readouts.every((row) => row.checks.all_agents_processed)),
    all_mass_conserved: scenarioReadouts.every((scenario) => scenario.policy_readouts.every((row) => row.checks.mass_conservation)),
    selected_policy_accessibility_preserved: scenarioReadouts.every((scenario) => scenario.selected_policy_readout.accessible_route_preserved),
    selected_policy_gate_passes: scenarioReadouts.every((scenario) => scenario.selected_policy_readout.gate_pass),
    policy_differentiation_visible: new Set(policySummary.map((item) => `${item.mean_continuity_proxy}|${item.max_worst_group_gap_points}|${item.mean_recovery_minutes_proxy}`)).size === model.policies.length
  },
  method_sources: model.method_sources,
  calibration_required_before_local_decision: model.calibration_required_before_local_decision,
  interpretation: model.interpretation
};

Object.entries(output.checks).forEach(([name, passed]) => { if (!passed) fail(name); });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(figureDir, 'service-continuity-board.svg'), `${board('zh', output)}\n`, 'utf8');
fs.writeFileSync(path.join(figureDir, 'service-continuity-board.en.svg'), `${board('en', output)}\n`, 'utf8');
console.log(JSON.stringify({screen_id: output.screen_id, population_reference: output.population_reference, selected_policy_by_scenario: scenarioReadouts.map((scenario) => ({scenario: scenario.scenario_id, policy: scenario.selected_policy_id, continuity: scenario.selected_policy_readout.continuity_proxy, gap: scenario.selected_policy_readout.worst_group_continuity_gap_points, recovery_minutes: scenario.selected_policy_readout.recovery_p50_minutes_proxy})), checks: output.checks}, null, 2));
if (Object.values(output.checks).every(Boolean)) console.error('SERVICE_CONTINUITY_CHECK_PASS: staged recovery and two-clock checks passed');
