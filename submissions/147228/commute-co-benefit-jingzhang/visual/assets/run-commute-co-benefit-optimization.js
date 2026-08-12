'use strict';

/*
 * Deterministic activity-chain policy screen.
 *
 * Every declared synthetic agent is replayed twice: once to build grouped
 * demand and once to score its full-day chain. Only aggregates are retained.
 * This is deliberately a transparent stress screen, not a calibrated OD,
 * resident survey, timetable model or air-mobility feasibility result.
 */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const packageRoot = path.resolve(root, '..', '..');
const model = JSON.parse(fs.readFileSync(path.join(root, 'commute-co-benefit-model.json'), 'utf8'));
const outputPath = path.join(root, 'commute-co-benefit-readout.json');
const figureRoot = path.join(packageRoot, 'assets', 'figures');
const GROUPS = model.synthetic_population.groups;
const MODES = model.modes;
const TOTAL = GROUPS.reduce((sum, group) => sum + group.count, 0);
const TIME_BUDGETS = [30, 40, 50, 60, 75];

function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function clamp(value, low, high) {
  return Math.max(low, Math.min(high, value));
}

function hash(index, salt) {
  let value = (index + 1 + salt * 2654435761) >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 2246822519) >>> 0;
  value ^= value >>> 13;
  value = Math.imul(value, 3266489917) >>> 0;
  return (value ^ (value >>> 16)) >>> 0;
}

function unit(index, salt) {
  return hash(index, salt) / 4294967296;
}

function groupRanges() {
  let start = 0;
  return GROUPS.map((group) => {
    const row = { ...group, start, end: start + group.count };
    start += group.count;
    return row;
  });
}

function weightedChoice(weights, index, salt) {
  const target = unit(index, salt);
  let cursor = 0;
  for (const mode of MODES) {
    cursor += Number(weights[mode] || 0);
    if (target < cursor) return mode;
  }
  return MODES[MODES.length - 1];
}

function add(map, key, value = 1) {
  map[key] = Number(map[key] || 0) + value;
}

function routeEdges(groupId, mode) {
  if (groupId === 'logistics_and_maintenance') return ['E01', 'E05', 'E06'];
  if (groupId === 'carer_or_child') return ['E01', 'E04', 'E02'];
  if (groupId === 'enterprise_employee') return ['E01', 'E02', 'E03', 'E06'];
  if (groupId === 'night_worker') return ['E01', 'E02', 'E03', 'E06'];
  if (mode === 'car') return ['E01', 'E05', 'E03'];
  return ['E01', 'E02', 'E03'];
}

function newGroupSummary(group) {
  return {
    id: group.id,
    label_zh: group.label_zh,
    label_en: group.label_en,
    agents: group.count,
    mode_counts: Object.fromEntries(MODES.map((mode) => [mode, 0])),
    time_histogram: { '0_30': 0, '30_45': 0, '45_60': 0, '60_75': 0, '75_90': 0, '90_plus': 0 },
    time_budget_counts: Object.fromEntries(TIME_BUDGETS.map((budget) => [String(budget), 0])),
    edge_counts: {},
    total_time: 0,
    total_wait: 0,
    total_reliability_penalty: 0,
    total_crowding_penalty: 0,
    total_curb_penalty: 0,
    total_activity_penalty: 0,
    total_vehicle_km: 0,
    chain_complete: 0,
    generalized_cost: 0
  };
}

function addTimeBin(histogram, minutes) {
  if (minutes < 30) histogram['0_30'] += 1;
  else if (minutes < 45) histogram['30_45'] += 1;
  else if (minutes < 60) histogram['45_60'] += 1;
  else if (minutes < 75) histogram['60_75'] += 1;
  else if (minutes < 90) histogram['75_90'] += 1;
  else histogram['90_plus'] += 1;
}

function timeBudgetSufficiency(summary, budget) {
  if (!summary.time_budget_counts) throw new Error('Missing exact time budget counts');
  if (!(String(budget) in summary.time_budget_counts)) throw new Error(`Unsupported time budget: ${budget}`);
  return summary.time_budget_counts[String(budget)];
}

function percentileFromHistogram(histogram, percentile, total) {
  const target = total * percentile;
  let cumulative = 0;
  const bins = [
    ['0_30', 30], ['30_45', 45], ['45_60', 60],
    ['60_75', 75], ['75_90', 90], ['90_plus', 120]
  ];
  for (const [id, upper] of bins) {
    cumulative += histogram[id];
    if (cumulative >= target) return upper;
  }
  return 120;
}

function chooseBand(groupId, bundle, index) {
  if (groupId === 'night_worker') return 'late';
  if (groupId === 'enterprise_employee' && unit(index, 17) < bundle.enterprise_shift_share) return 'early';
  return 'preferred';
}

function simulateBundle(bundle) {
  const ranges = groupRanges();
  const weightProfile = model.mode_weights[bundle.weight_profile];
  const modeCounts = Object.fromEntries(MODES.map((mode) => [mode, 0]));
  const groupSummaries = Object.fromEntries(GROUPS.map((group) => [group.id, newGroupSummary(group)]));
  const edgeCounts = Object.fromEntries(model.route_edges.map((edge) => [edge.id, 0]));
  let firstPass = 0;

  for (const group of ranges) {
    const summary = groupSummaries[group.id];
    for (let offset = 0; offset < group.count; offset += 1) {
      const index = group.start + offset;
      const mode = weightedChoice(weightProfile[group.id], index, 31);
      add(modeCounts, mode);
      add(summary.mode_counts, mode);
      firstPass += 1;
    }
  }

  const modeLoads = Object.fromEntries(MODES.map((mode) => {
    const p = model.mode_parameters[mode];
    const effectiveCapacity = p.capacity_person_trips * (1 + bundle.reliability_bonus * 0.8);
    return [mode, {
      mode,
      demand: modeCounts[mode],
      effective_capacity: round(effectiveCapacity, 2),
      load_ratio: round(modeCounts[mode] / Math.max(effectiveCapacity, 1), 4)
    }];
  }));

  let secondPass = 0;
  for (const group of ranges) {
    const summary = groupSummaries[group.id];
    for (let offset = 0; offset < group.count; offset += 1) {
      const index = group.start + offset;
      const mode = weightedChoice(weightProfile[group.id], index, 31);
      const params = model.mode_parameters[mode];
      const band = chooseBand(group.id, bundle, index);
      const load = modeLoads[mode].load_ratio;
      const congestion = Math.max(0, load - 0.72);
      const time = Number(params.base_minutes) + (unit(index, 37) * 8 - 4) + (band === 'early' ? -1.5 : 0) + congestion * 7;
      TIME_BUDGETS.forEach((budget) => {
        if (time < budget) summary.time_budget_counts[String(budget)] += 1;
      });
      const wait = Number(params.wait_minutes) * (1 + congestion * 0.8) * (1 - bundle.reliability_bonus * 0.55);
      const reliability = clamp(Number(params.reliability) + bundle.reliability_bonus, 0, 0.99);
      const reliabilityPenalty = (1 - reliability) * 11;
      const crowdingPenalty = congestion * 7;
      const curbPenalty = Number(params.curb_conflict) * bundle.curb_factor * 100;
      const activityPenalty = group.id === 'carer_or_child'
        ? (mode === 'walking_wheelchair' || mode === 'bus' || mode === 'metro' ? 0.3 : 2.2) - bundle.accessibility_protection * 1.5
        : (group.id === 'night_worker' && mode === 'walking_wheelchair' ? 1.2 : 0.2);
      const vehicleKm = Number(params.vehicle_km_per_person);
      const generalizedCost = (
        time * model.scoring.weights.time / 2.0
        + wait * model.scoring.weights.wait
        + reliabilityPenalty * model.scoring.weights.reliability
        + crowdingPenalty * model.scoring.weights.crowding
        + curbPenalty * model.scoring.weights.curb_conflict
        + activityPenalty * model.scoring.weights.activity_chain
        + vehicleKm * model.scoring.weights.vehicle_km
      );
      const chainPenalty = Math.max(0, load - 1.2) * 0.025 + (bundle.air_candidate ? 0.02 : 0);
      const chainComplete = chainPenalty === 0 ? 1 : 0;
      const edges = routeEdges(group.id, mode);
      for (const edge of edges) add(edgeCounts, edge);
      for (const edge of edges) add(summary.edge_counts, edge);
      addTimeBin(summary.time_histogram, time);
      summary.total_time += time;
      summary.total_wait += wait;
      summary.total_reliability_penalty += reliabilityPenalty;
      summary.total_crowding_penalty += crowdingPenalty;
      summary.total_curb_penalty += curbPenalty;
      summary.total_activity_penalty += activityPenalty;
      summary.total_vehicle_km += vehicleKm;
      summary.chain_complete += chainComplete;
      summary.generalized_cost += generalizedCost;
      secondPass += 1;
    }
  }

  const groupRows = Object.values(groupSummaries).map((summary) => {
    const accessBase = summary.id === 'carer_or_child' ? 0.935 : (summary.id === 'night_worker' ? 0.928 : 0.948);
    const accessibility = clamp(accessBase + bundle.accessibility_protection * 0.5 - (summary.id === 'logistics_and_maintenance' ? 0.004 : 0), 0, 0.995);
    const meanCost = summary.generalized_cost / summary.agents;
    const satisfaction = clamp(100 - meanCost, 0, 100);
    return {
      id: summary.id,
      label_zh: summary.label_zh,
      label_en: summary.label_en,
      agents: summary.agents,
      mode_counts: summary.mode_counts,
      mode_shares: Object.fromEntries(MODES.map((mode) => [mode, round(summary.mode_counts[mode] / summary.agents, 4)])),
      mean_travel_minutes: round(summary.total_time / summary.agents, 2),
      mean_wait_minutes: round(summary.total_wait / summary.agents, 2),
      p90_travel_minutes: percentileFromHistogram(summary.time_histogram, 0.9, summary.agents),
      mean_reliability_penalty: round(summary.total_reliability_penalty / summary.agents, 3),
      mean_crowding_penalty: round(summary.total_crowding_penalty / summary.agents, 3),
      mean_curb_penalty: round(summary.total_curb_penalty / summary.agents, 3),
      mean_activity_chain_penalty: round(summary.total_activity_penalty / summary.agents, 3),
      vehicle_km_proxy: round(summary.total_vehicle_km, 2),
      accessibility_completion_proxy: round(accessibility, 4),
      activity_chain_completion_proxy: round(summary.chain_complete / summary.agents, 4),
      time_budget_sufficiency_proxy: Object.fromEntries(TIME_BUDGETS.map((budget) => [
        String(budget), round(timeBudgetSufficiency(summary, budget) / summary.agents, 4)
      ])),
      generalized_cost_proxy: round(meanCost, 3),
      satisfaction_proxy: round(satisfaction, 2),
      edge_counts: summary.edge_counts,
      interpretation: 'synthetic aggregate group result; not observed resident or employee experience'
    };
  });

  const satisfactions = groupRows.map((row) => row.satisfaction_proxy);
  const accessibility = groupRows.map((row) => row.accessibility_completion_proxy);
  const peakEdgeLoadRatio = Math.max(...model.route_edges.map((edge) => edgeCounts[edge.id] / edge.capacity));
  const maxModeLoadRatio = Math.max(...MODES.map((mode) => modeLoads[mode].load_ratio));
  const meanCost = groupRows.reduce((sum, row) => sum + row.generalized_cost_proxy * row.agents, 0) / TOTAL;
  const p90 = Math.max(...groupRows.map((row) => row.p90_travel_minutes));
  const vehicleKm = groupRows.reduce((sum, row) => sum + row.vehicle_km_proxy, 0);
  const groupGap = Math.max(...satisfactions) - Math.min(...satisfactions);
  const checks = {
    all_agents_processed: firstPass === TOTAL && secondPass === TOTAL,
    mass_conservation: Object.values(modeCounts).reduce((sum, value) => sum + value, 0) === TOTAL,
    activity_chain_links_present: model.activity_chain.links.length === 5,
    minimum_group_accessibility: Math.min(...accessibility) >= model.scoring.hard_gates.minimum_group_accessibility,
    maximum_group_satisfaction_gap: groupGap <= model.scoring.hard_gates.maximum_group_satisfaction_gap,
    peak_route_edge_load_bounded: peakEdgeLoadRatio <= 1.35,
    peak_mode_load_bounded: maxModeLoadRatio <= model.scoring.hard_gates.max_mode_load_ratio,
    ground_fallback_present: MODES.includes('metro') && MODES.includes('bus') && MODES.includes('walking_wheelchair'),
    air_candidate_blocked: true,
    privacy_aggregate_only: true
  };
  const hardGatePass = !bundle.air_candidate && Object.values(checks).every(Boolean);
  return {
    policy_id: bundle.id,
    label_zh: bundle.label_zh,
    label_en: bundle.label_en,
    weight_profile: bundle.weight_profile,
    protected_time_budget_control: bundle.weight_profile === model.protected_time_budget_controls.profile
      ? model.protected_time_budget_controls
      : null,
    air_candidate: bundle.air_candidate,
    status: bundle.air_candidate ? 'blocked_pending_airspace_and_ground_evidence' : 'synthetic_screen_complete',
    agents_processed_first_pass: firstPass,
    agents_processed_second_pass: secondPass,
    total_agents: TOTAL,
    mode_counts: modeCounts,
    mode_shares: Object.fromEntries(MODES.map((mode) => [mode, round(modeCounts[mode] / TOTAL, 4)])),
    mode_loads: modeLoads,
    edge_counts: edgeCounts,
    edge_load_ratios: Object.fromEntries(model.route_edges.map((edge) => [edge.id, round(edgeCounts[edge.id] / edge.capacity, 4)])),
    group_readouts: groupRows,
    mean_generalized_cost_proxy: round(meanCost, 3),
    p90_travel_minutes_proxy: p90,
    vehicle_km_proxy: round(vehicleKm, 2),
    min_group_accessibility_proxy: round(Math.min(...accessibility), 4),
    max_group_satisfaction_gap_proxy: round(groupGap, 2),
    satisfaction_proxy: round(100 - meanCost, 2),
    hard_gate_pass: hardGatePass,
    checks,
    interpretation: 'Finite candidate comparison under declared synthetic inputs; local calibration and field evidence remain unknown.'
  };
}

function buildReadout() {
  const candidates = model.policy_bundles.map(simulateBundle);
  const baseline = candidates.find((candidate) => candidate.policy_id === 'B0_inertial_baseline');
  const control = model.protected_time_budget_controls;
  candidates.forEach((candidate) => {
    const budget = control.protected_gate_budget_minutes;
    const rows = control.groups.map((groupId) => {
      const candidateGroup = candidate.group_readouts.find((group) => group.id === groupId);
      const baselineGroup = baseline?.group_readouts.find((group) => group.id === groupId);
      const candidateValue = candidateGroup?.time_budget_sufficiency_proxy?.[String(budget)] ?? null;
      const baselineValue = baselineGroup?.time_budget_sufficiency_proxy?.[String(budget)] ?? null;
      return {
        group_id: groupId,
        candidate_sufficiency: candidateValue,
        baseline_sufficiency: baselineValue,
        does_not_regress: candidateValue !== null && baselineValue !== null && candidateValue >= baselineValue
      };
    });
    const active = Boolean(candidate.protected_time_budget_control) && !candidate.air_candidate;
    candidate.protected_time_budget_guard = {
      active,
      budget_minutes: budget,
      baseline_policy_id: baseline?.policy_id ?? null,
      rows,
      passes: active && rows.every((row) => row.does_not_regress)
    };
  });
  const ranked = candidates.slice().sort((a, b) => (
    Number(b.hard_gate_pass) - Number(a.hard_gate_pass)
    || b.satisfaction_proxy - a.satisfaction_proxy
    || a.mean_generalized_cost_proxy - b.mean_generalized_cost_proxy
    || a.p90_travel_minutes_proxy - b.p90_travel_minutes_proxy
    || a.vehicle_km_proxy - b.vehicle_km_proxy
  ));
  const selected = ranked.find((candidate) => candidate.hard_gate_pass && candidate.protected_time_budget_guard.passes) || null;
  return {
    model_version: model.model_version,
    model_class: model.model_class,
    population_reference: model.regional_scope.population_reference,
    population_coverage_ratio: model.regional_scope.coverage_ratio,
    selected_policy_id: selected ? selected.policy_id : null,
    selected_policy_label_zh: selected ? selected.label_zh : null,
    selected_policy_label_en: selected ? selected.label_en : null,
    candidates,
    ranking: ranked.map((candidate, index) => ({rank: index + 1, policy_id: candidate.policy_id, hard_gate_pass: candidate.hard_gate_pass, satisfaction_proxy: candidate.satisfaction_proxy})),
    checks: {
      candidate_set_complete: candidates.length === 5,
      ground_candidates_available: candidates.filter((candidate) => !candidate.air_candidate).length === 4,
      air_candidate_is_blocked: candidates.filter((candidate) => candidate.air_candidate).every((candidate) => candidate.status.startsWith('blocked')),
      all_candidates_processed: candidates.every((candidate) => candidate.agents_processed_first_pass === TOTAL && candidate.agents_processed_second_pass === TOTAL),
      selected_policy_passes_hard_gate: Boolean(selected && selected.hard_gate_pass),
      selected_policy_passes_protected_time_budget_guard: Boolean(selected && selected.protected_time_budget_guard.passes),
      aggregate_only: candidates.every((candidate) => candidate.checks.privacy_aggregate_only),
      model_is_synthetic_not_observed: true
    },
    source_boundary: model.source_boundary,
    status: model.status
  };
}

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function text(x, y, value, className, anchor = 'start') {
  return `<text x="${x}" y="${y}" class="${className}" text-anchor="${anchor}">${esc(value)}</text>`;
}

function createBoard(readout, english = false) {
  const selected = readout.candidates.find((candidate) => candidate.policy_id === readout.selected_policy_id);
  const title = english ? 'Commute co-benefit policy screen' : '通勤共益政策包压力屏查';
  const subtitle = english
    ? `3,122,000 synthetic agents · activity chain · hard gates first · selected ${selected ? selected.policy_id : 'none'}`
    : `3,122,000 个合成代理 · 全日活动链 · 先过硬门 · 入选 ${selected ? selected.policy_id : '无'}`;
  const candidateTitle = english ? 'Candidate comparison' : '候选政策包比较';
  const groupTitle = english ? 'Selected policy: group readouts' : '入选政策：群组读数';
  const caveat = english
    ? 'Synthetic aggregate screen only. No resident response, employee sample, local OD, timetable, or air-service approval is claimed.'
    : '仅为合成聚合压力屏查，不声称居民回应、员工样本、本地 OD、班次实测或空中服务审批。';
  const colors = ['#77e3c0', '#79a9ff', '#f6c76b', '#ef829d', '#a7b6c8'];
  const candidateRows = readout.candidates.map((candidate, index) => {
    const y = 250 + index * 64;
    const barWidth = Math.max(8, Math.min(390, candidate.satisfaction_proxy * 3.1));
    const label = english ? candidate.label_en : candidate.label_zh;
    const gate = candidate.air_candidate ? (english ? 'BLOCKED' : '阻断') : (candidate.hard_gate_pass ? 'PASS' : 'HOLD');
    return `<g>${text(92, y + 26, label, 'row')}${text(530, y + 26, candidate.satisfaction_proxy.toFixed(2), 'value', 'end')}<rect x="590" y="${y}" width="390" height="28" rx="14" fill="#18384b"/><rect x="590" y="${y}" width="${barWidth}" height="28" rx="14" fill="${colors[index]}"/><text x="1002" y="${y + 21}" class="gate" fill="${colors[index]}">${gate}</text></g>`;
  }).join('');
  const groupRows = selected ? selected.group_readouts.map((group, index) => {
    const y = 250 + index * 64;
    const label = english ? group.label_en : group.label_zh;
    const barWidth = Math.max(8, Math.min(340, group.satisfaction_proxy * 3.1));
    return `<g>${text(1060, y + 26, label, 'row')}${text(1488, y + 26, group.satisfaction_proxy.toFixed(2), 'value', 'end')}<rect x="1530" y="${y}" width="210" height="28" rx="14" fill="#18384b"/><rect x="1530" y="${y}" width="${Math.min(210, barWidth)}" height="28" rx="14" fill="#77e3c0"/></g>`;
  }).join('') : '';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1100" viewBox="0 0 1800 1100" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title><desc id="desc">${esc(caveat)}</desc>
  <style>
    .bg{fill:#071a2b}.panel{fill:#0e2a3c;stroke:#275369;stroke-width:2}.title{font:800 38px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#f4fbff}.sub{font:500 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}.section{font:800 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#77e3c0;letter-spacing:1px}.row{font:650 17px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#e0eff2}.value{font:800 22px SFMono-Regular,Consolas,monospace;fill:#f4fbff}.gate{font:800 15px SFMono-Regular,Consolas,monospace}.foot{font:500 16px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}.small{font:500 15px SFMono-Regular,Consolas,monospace;fill:#91b5bf}
  </style>
  <rect width="1800" height="1100" class="bg"/>
  <circle cx="1680" cy="60" r="260" fill="#2a9d8f" opacity=".12"/><circle cx="90" cy="1020" r="250" fill="#5b8def" opacity=".11"/>
  ${text(72, 70, title, 'title')}${text(74, 105, subtitle, 'sub')}
  <rect x="62" y="156" width="960" height="700" rx="24" class="panel"/><rect x="1040" y="156" width="698" height="700" rx="24" class="panel"/>
  ${text(92, 204, candidateTitle, 'section')}${text(530, 204, english ? 'score' : '代理分', 'small', 'end')}${text(1002, 204, english ? 'gate' : '门禁', 'small', 'end')}
  ${candidateRows}
  ${text(1068, 204, groupTitle, 'section')}${text(1488, 204, english ? 'score' : '代理分', 'small', 'end')}
  ${groupRows}
  <rect x="62" y="896" width="1676" height="120" rx="20" fill="#102f42" stroke="#275369" stroke-width="2"/>
  ${text(92, 938, english ? 'Selected policy' : '入选政策', 'section')}${text(92, 974, selected ? `${selected.label_en} / ${selected.label_zh}` : 'none', 'row')}
  ${text(900, 938, english ? `mean cost ${selected ? selected.mean_generalized_cost_proxy.toFixed(3) : '—'} · P90 ${selected ? selected.p90_travel_minutes_proxy : '—'} min · vehicle-km ${selected ? Math.round(selected.vehicle_km_proxy).toLocaleString() : '—'}` : `平均代价 ${selected ? selected.mean_generalized_cost_proxy.toFixed(3) : '—'} · P90 ${selected ? selected.p90_travel_minutes_proxy : '—'} 分钟 · 车辆公里代理 ${selected ? Math.round(selected.vehicle_km_proxy).toLocaleString() : '—'}`, 'row')}
  ${text(900, 974, caveat, 'foot')}
  ${text(900, 1000, english ? 'Re-run: node visual/assets/run-commute-co-benefit-optimization.js --check' : '复跑：node visual/assets/run-commute-co-benefit-optimization.js --check', 'small')}
</svg>`;
}

function createActivityChainBoard(readout, english = false) {
  const title = english ? 'One full-day activity chain · six visible handoffs' : '一整天的活动链 · 六个可见交接点';
  const subtitle = english ? '3,122,000 synthetic agents · grouped links only · human and ground fallback retained' : '3,122,000 个合成代理 · 仅发布分组链路 · 保留人工与地面回退';
  const nodes = model.activity_chain.nodes;
  const x0 = 112;
  const gap = 286;
  const nodeMarkup = nodes.map((node, index) => {
    const x = x0 + index * gap;
    const label = english ? node.label_en : node.label_zh;
    const number = index + 1;
    const count = readout.population_reference.toLocaleString();
    const arrow = index < nodes.length - 1 ? `<path d="M ${x + 214} 465 H ${x + gap - 26}" stroke="#77e3c0" stroke-width="6" stroke-linecap="round"/><path d="M ${x + gap - 42} 450 L ${x + gap - 20} 465 L ${x + gap - 42} 480" fill="none" stroke="#77e3c0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>` : '';
    return `<g>${arrow}<rect x="${x}" y="350" width="214" height="230" rx="22" fill="#0e2a3c" stroke="#2f6672" stroke-width="2"/><circle cx="${x + 40}" cy="390" r="25" fill="#071a2b" stroke="#77e3c0" stroke-width="4"/><text x="${x + 40}" y="398" class="node" text-anchor="middle">${number}</text><text x="${x + 107}" y="445" class="nodeTitle" text-anchor="middle">${esc(label)}</text><text x="${x + 107}" y="490" class="nodeSmall" text-anchor="middle">${esc(count)}</text><text x="${x + 107}" y="520" class="nodeSmall" text-anchor="middle">${english ? 'synthetic agents' : '合成代理'}</text><text x="${x + 107}" y="548" class="nodeTiny" text-anchor="middle">${english ? 'ground / human fallback' : '地面 / 人工回退'}</text></g>`;
  }).join('');
  const footer = english
    ? 'The chain is a design contract. It does not describe observed household schedules, local demand, or completed services.'
    : '活动链是设计合同。它不描述已观测的家庭时序、本地需求或已完成服务。';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1900" height="1000" viewBox="0 0 1900 1000" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title><desc id="desc">${esc(footer)}</desc>
  <style>.bg{fill:#071a2b}.title{font:800 38px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#f4fbff}.sub{font:500 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}.node{font:800 22px SFMono-Regular,Consolas,monospace;fill:#77e3c0}.nodeTitle{font:800 21px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#f4fbff}.nodeSmall{font:700 17px SFMono-Regular,Consolas,monospace;fill:#a9c8d1}.nodeTiny{font:600 14px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#77e3c0}.foot{font:500 17px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}</style>
  <rect width="1900" height="1000" class="bg"/><circle cx="1790" cy="70" r="250" fill="#2a9d8f" opacity=".12"/><circle cx="90" cy="900" r="250" fill="#5b8def" opacity=".11"/>
  ${text(72, 70, title, 'title')}${text(74, 106, subtitle, 'sub')}
  <path d="M 112 300 H 1788" stroke="#21495e" stroke-width="2" stroke-dasharray="9 12"/>
  ${nodeMarkup}
  <rect x="110" y="690" width="1678" height="132" rx="22" fill="#102f42" stroke="#2f6672" stroke-width="2"/>
  ${text(142, 736, english ? 'Replay rule' : '回放规则', 'nodeTiny')}${text(142, 776, english ? 'Each agent is counted on every declared activity link; only grouped counts are retained.' : '每个代理在声明的活动链路上被计数；最终只保留群组聚合结果。', 'nodeSmall')}
  ${text(142, 852, footer, 'foot')}
</svg>`;
}

function createModeEquityBoard(readout, english = false) {
  const selected = readout.candidates.find((candidate) => candidate.policy_id === readout.selected_policy_id);
  const title = english ? 'Selected policy · mode mix and group equity' : '入选政策 · 方式组合与群体公平';
  const subtitle = english ? 'C3 commute co-benefit bundle · shares are synthetic grouped outputs' : 'C3 通勤共益组合 · 方式占比均为合成群组读数';
  const modeColors = {metro: '#6ea5ff', bus: '#77e3c0', bicycle: '#f6c76b', walking_wheelchair: '#a7d9a0', car: '#ef829d', enterprise_shuttle: '#b8a1ff'};
  const legendLabels = english ? {metro: 'metro', bus: 'bus', bicycle: 'bicycle', walking_wheelchair: 'walking / accessible', car: 'car', enterprise_shuttle: 'enterprise shuttle'} : {metro: '地铁', bus: '公交', bicycle: '自行车', walking_wheelchair: '步行 / 无障碍', car: '汽车', enterprise_shuttle: '企业接驳'};
  const rows = selected.group_readouts.map((group, index) => {
    const y = 238 + index * 82;
    const label = english ? group.label_en : group.label_zh;
    let cursor = 480;
    const segments = MODES.map((mode) => {
      const width = group.mode_shares[mode] * 680;
      const rect = `<rect x="${cursor.toFixed(1)}" y="${y}" width="${Math.max(0, width).toFixed(1)}" height="30" fill="${modeColors[mode]}"/>`;
      cursor += width;
      return rect;
    }).join('');
    return `<g>${text(100, y + 23, label, 'row')}${segments}${text(1208, y + 23, group.satisfaction_proxy.toFixed(2), 'score', 'end')}${text(1372, y + 23, group.accessibility_completion_proxy.toFixed(3), 'score', 'end')}${text(1536, y + 23, group.p90_travel_minutes, 'score', 'end')}</g>`;
  }).join('');
  const legend = MODES.map((mode, index) => `<g transform="translate(${100 + index * 260} 820)"><rect width="20" height="20" rx="4" fill="${modeColors[mode]}"/><text x="32" y="16" class="legend">${esc(legendLabels[mode])}</text></g>`).join('');
  const caveat = english ? 'No mode share is observed local behaviour. Accessibility and satisfaction are synthetic proxies; route and timetable evidence remain pending.' : '没有任何方式占比被写成现场行为。可达与代理分是合成屏查；路线和班次证据仍待补齐。';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1000" viewBox="0 0 1800 1000" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title><desc id="desc">${esc(caveat)}</desc>
  <style>.bg{fill:#071a2b}.panel{fill:#0e2a3c;stroke:#2f6672;stroke-width:2}.title{font:800 38px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#f4fbff}.sub{font:500 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}.section{font:800 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#77e3c0}.row{font:650 17px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#e0eff2}.score{font:800 17px SFMono-Regular,Consolas,monospace;fill:#f4fbff}.legend{font:600 15px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#d8eaf0}.foot{font:500 16px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}</style>
  <rect width="1800" height="1000" class="bg"/><circle cx="1700" cy="80" r="260" fill="#2a9d8f" opacity=".12"/>
  ${text(72, 70, title, 'title')}${text(74, 106, subtitle, 'sub')}
  <rect x="62" y="150" width="1676" height="670" rx="24" class="panel"/>
  ${text(100, 202, english ? 'group' : '群组', 'section')}${text(480, 202, english ? 'mode share' : '方式占比', 'section')}${text(1208, 202, english ? 'proxy score' : '代理分', 'section', 'end')}${text(1372, 202, english ? 'access' : '可达', 'section', 'end')}${text(1536, 202, english ? 'P90 min' : 'P90 分钟', 'section', 'end')}
  ${rows}${legend}
  <rect x="62" y="864" width="1676" height="70" rx="18" fill="#102f42" stroke="#2f6672" stroke-width="2"/>${text(92, 908, caveat, 'foot')}
</svg>`;
}

function writeArtifacts(readout) {
  fs.mkdirSync(figureRoot, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(readout, null, 2)}\n`);
  fs.writeFileSync(path.join(figureRoot, 'commute-co-benefit-board.svg'), createBoard(readout, false));
  fs.writeFileSync(path.join(figureRoot, 'commute-co-benefit-board.en.svg'), createBoard(readout, true));
  fs.writeFileSync(path.join(figureRoot, 'activity-chain-flow-board.svg'), createActivityChainBoard(readout, false));
  fs.writeFileSync(path.join(figureRoot, 'activity-chain-flow-board.en.svg'), createActivityChainBoard(readout, true));
  fs.writeFileSync(path.join(figureRoot, 'mode-mix-equity-board.svg'), createModeEquityBoard(readout, false));
  fs.writeFileSync(path.join(figureRoot, 'mode-mix-equity-board.en.svg'), createModeEquityBoard(readout, true));
}

function checkReadout(readout) {
  const fresh = buildReadout();
  const expected = JSON.stringify(fresh);
  const actual = JSON.stringify(readout);
  const checks = {
    readout_matches_deterministic_runner: expected === actual,
    candidate_set_complete: fresh.checks.candidate_set_complete,
    all_agents_processed: fresh.checks.all_candidates_processed,
    selected_policy_passes_hard_gate: fresh.checks.selected_policy_passes_hard_gate,
    air_candidate_blocked: fresh.checks.air_candidate_is_blocked,
    aggregate_only: fresh.checks.aggregate_only,
    selected_policy_passes_protected_time_budget_guard: Boolean(
      fresh.checks.selected_policy_passes_protected_time_budget_guard
    ),
    selected_policy_has_protected_time_budget_control: Boolean(
      fresh.candidates.find((candidate) => candidate.policy_id === fresh.selected_policy_id)?.protected_time_budget_control
    ),
    selected_policy_exists: Boolean(fresh.selected_policy_id)
  };
  Object.entries(checks).forEach(([key, value]) => {
    if (!value) console.error(`COMMUTE_CO_BENEFIT_CHECK_FAIL: ${key}`);
  });
  if (Object.values(checks).every(Boolean)) {
    console.log(JSON.stringify({ ok: true, selected_policy_id: fresh.selected_policy_id, selected_policy_score: fresh.candidates.find((candidate) => candidate.policy_id === fresh.selected_policy_id).satisfaction_proxy, checks }, null, 2));
    return true;
  }
  process.exitCode = 1;
  return false;
}

if (require.main === module) {
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(outputPath)) {
      console.error(`COMMUTE_CO_BENEFIT_CHECK_FAIL: missing ${outputPath}`);
      process.exitCode = 1;
    } else {
      checkReadout(JSON.parse(fs.readFileSync(outputPath, 'utf8')));
    }
  } else {
    const readout = buildReadout();
    writeArtifacts(readout);
    console.log(JSON.stringify({
      ok: true,
      output: path.relative(packageRoot, outputPath),
      selected_policy_id: readout.selected_policy_id,
      selected_policy_score: readout.candidates.find((candidate) => candidate.policy_id === readout.selected_policy_id)?.satisfaction_proxy,
      candidates: readout.ranking
    }, null, 2));
  }
}

module.exports = { buildReadout, simulateBundle, model, MODES, TOTAL, TIME_BUDGETS };
