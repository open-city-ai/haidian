#!/usr/bin/env node
'use strict';

/*
 * Population-scale synthetic activity-chain screen.
 *
 * The regional runner already tests one outbound leg, a return leg, modes,
 * capacity and accessibility. This companion runner keeps the same seeded
 * mode/condition logic but makes the daily chain explicit: reach the primary
 * activity, adapt within a bounded window, and close the return leg. It keeps
 * aggregate counters only; no personal trajectory is created or published.
 */

const fs = require('fs');
const path = require('path');

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, '..', '..');
const figureDir = path.join(packageDir, 'assets', 'figures');
const model = JSON.parse(fs.readFileSync(path.join(assetDir, 'regional-scale-commute.json'), 'utf8'));
const contract = JSON.parse(fs.readFileSync(path.join(assetDir, 'activity-completion-screen.json'), 'utf8'));
const outputPath = path.join(assetDir, 'activity-completion-readout.json');
const TOTAL = Number(model.regional_scope.population_reference);
const GROUPS = model.synthetic_population.groups;
const MODES = model.modes;
const STATUSES = ['on_time', 'delayed', 'deferred', 'inaccessible', 'return_failed'];
const STATUS_META = {
  on_time: {zh: '准时闭合', en: 'on time', color: '#55E4C1'},
  delayed: {zh: '延误后闭合', en: 'delayed', color: '#7DA8FF'},
  deferred: {zh: '延期后闭合', en: 'deferred', color: '#F7BF63'},
  inaccessible: {zh: '主要活动不可达', en: 'inaccessible', color: '#F082A7'},
  return_failed: {zh: '返程未闭合', en: 'return failed', color: '#C58BFF'}
};
const FALLBACK_PRIORITY = {
  metro: ['bus', 'enterprise_shuttle', 'car'],
  bus: ['metro', 'enterprise_shuttle', 'car'],
  bicycle: ['bus', 'walking_wheelchair', 'car'],
  walking_wheelchair: [],
  car: ['metro', 'bus', 'enterprise_shuttle'],
  enterprise_shuttle: ['metro', 'bus']
};

function fail(message) {
  console.error(`ACTIVITY_COMPLETION_CHECK_FAIL: ${message}`);
  process.exitCode = 1;
}

function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(Number(value) * factor) / factor;
}

function clamp(value, low, high) {
  return Math.max(low, Math.min(high, value));
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
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
    const range = {...group, start, end: start + Number(group.count)};
    start += Number(group.count);
    return range;
  });
}

function selectWeighted(weights, index, salt) {
  const target = unit(index, salt);
  let cursor = 0;
  for (const mode of MODES) {
    cursor += Number(weights[mode] || 0);
    if (target < cursor) return mode;
  }
  return MODES[MODES.length - 1];
}

function externalAgent(groupId, index) {
  const threshold = groupId === 'enterprise_employee'
    ? 0.58
    : groupId === 'resident_worker'
      ? 0.24
      : 0.14;
  return unit(index, 17) < threshold;
}

function scenarioParameters(definition) {
  const scenarioId = definition.runner_scenario_id;
  if (scenarioId === 'W1') {
    return {
      weights: model.mode_weights_by_group[definition.profile_id],
      timeMultiplier: {metro: 1.08, bus: 1.18, bicycle: 1.48, walking_wheelchair: 1.28, car: 1.14, enterprise_shuttle: 1.18},
      reliabilityOverride: {metro: 0.80, bus: 0.68, bicycle: 0.46, walking_wheelchair: 0.76, car: 0.55, enterprise_shuttle: 0.66},
      capacityMultiplier: {metro: 1, bus: 1, bicycle: 1, walking_wheelchair: 1, car: 1, enterprise_shuttle: 1},
      conflictMultiplier: 1.28,
      queueDelayMultiplier: 38
    };
  }
  if (scenarioId === 'D1') {
    return {
      weights: model.mode_weights_by_group[definition.profile_id],
      timeMultiplier: {metro: 1.02, bus: 1.08, bicycle: 1.08, walking_wheelchair: 1.06, car: 1.12, enterprise_shuttle: 1.10},
      reliabilityOverride: {metro: 0.82, bus: 0.72, bicycle: 0.72, walking_wheelchair: 0.84, car: 0.54, enterprise_shuttle: 0.70},
      capacityMultiplier: {metro: 0.82, bus: 0.84, bicycle: 0.78, walking_wheelchair: 0.92, car: 0.86, enterprise_shuttle: 0.84},
      conflictMultiplier: 1.18,
      queueDelayMultiplier: 45
    };
  }
  if (scenarioId === 'R1') {
    return {
      weights: model.mode_weights_by_group[definition.profile_id],
      timeMultiplier: {metro: 1.35, bus: 1.08, bicycle: 1.10, walking_wheelchair: 1.08, car: 1.16, enterprise_shuttle: 1.10},
      reliabilityOverride: Object.fromEntries(MODES.map((mode) => [mode, Number(model.mode_parameters[mode].reliability.R1)])),
      capacityMultiplier: {metro: 1, bus: 1, bicycle: 1, walking_wheelchair: 1, car: 1, enterprise_shuttle: 1},
      conflictMultiplier: 1.18,
      queueDelayMultiplier: 34
    };
  }
  return {
    weights: model.mode_weights_by_group[definition.profile_id],
    timeMultiplier: {metro: 1.00, bus: 1.03, bicycle: 1.00, walking_wheelchair: 1.00, car: 1.08, enterprise_shuttle: 1.04},
    reliabilityOverride: Object.fromEntries(MODES.map((mode) => [mode, Number(model.mode_parameters[mode].reliability.O1)])),
    capacityMultiplier: {metro: 1, bus: 1, bicycle: 1, walking_wheelchair: 1, car: 1, enterprise_shuttle: 1},
    conflictMultiplier: 1,
    queueDelayMultiplier: 26
  };
}

function accessibilityScore(groupId, mode, scenarioId) {
  const base = {
    metro: 0.93,
    bus: 0.89,
    bicycle: groupId === 'carer_or_child' ? 0.70 : 0.82,
    walking_wheelchair: 0.96,
    car: 0.91,
    enterprise_shuttle: 0.94
  }[mode];
  const protectedGroup = ['carer_or_child', 'night_worker'].includes(groupId);
  const coordinationBonus = scenarioId === 'O1' ? (protectedGroup ? 0.035 : 0.02) : 0;
  const disruptionPenalty = scenarioId === 'R1' && mode === 'metro' ? 0.12 : 0;
  const weatherPenalty = scenarioId === 'W1'
    ? (mode === 'bicycle' ? 0.16 : mode === 'walking_wheelchair' ? 0.08 : mode === 'bus' ? 0.03 : 0)
    : 0;
  const capacityShockPenalty = scenarioId === 'D1' && ['metro', 'bus', 'car'].includes(mode) ? 0.04 : 0;
  return clamp(base + coordinationBonus - disruptionPenalty - weatherPenalty - capacityShockPenalty, 0, 1);
}

function modeCounts(definition, parameters) {
  const ranges = groupRanges();
  const outbound = Object.fromEntries(MODES.map((mode) => [mode, 0]));
  const returning = Object.fromEntries(MODES.map((mode) => [mode, 0]));
  for (const group of ranges) {
    for (let offset = 0; offset < group.count; offset += 1) {
      const index = group.start + offset;
      outbound[selectWeighted(parameters.weights[group.id], index, 19)] += 1;
      returning[selectWeighted(parameters.weights[group.id], index, 31)] += 1;
    }
  }
  return {outbound, returning};
}

function loadRatios(counts, parameters) {
  return Object.fromEntries(MODES.map((mode) => {
    const capacity = Number(model.mode_parameters[mode].capacity_person_trips) * Number(parameters.capacityMultiplier[mode] || 1);
    return [mode, round(Number(counts[mode] || 0) / Math.max(capacity, 1))];
  }));
}

function legMetric(group, index, mode, definition, parameters, loads, returning) {
  const scenarioId = definition.runner_scenario_id;
  const salt = returning ? 37 : 23;
  const zoneSalt = returning ? 43 : 29;
  const distanceFactor = 0.82 + unit(index, salt) * 0.58;
  const zoneFactor = 0.92 + ((hash(index, zoneSalt) % 17) / 100);
  const external = externalAgent(group.id, index);
  const baseMinutes = Number(model.mode_parameters[mode].base_minutes);
  const time = baseMinutes * Number(parameters.timeMultiplier[mode]) * distanceFactor * zoneFactor + (external ? 5 : 0);
  const reliability = Number(parameters.reliabilityOverride[mode]);
  const accessibility = accessibilityScore(group.id, mode, scenarioId);
  const loadRatio = Number(loads[mode] || 0);
  const queueDelay = Math.max(0, loadRatio - 1) * Number(parameters.queueDelayMultiplier);
  const reliabilitySalt = returning ? 79 : 71;
  const missedService = unit(index, reliabilitySalt) > reliability;
  const reliabilityDelay = missedService ? 12 + unit(index, reliabilitySalt + 1) * 18 : 0;
  const totalMinutes = time + queueDelay + reliabilityDelay;
  return {
    mode,
    total_minutes: totalMinutes,
    base_minutes: time,
    queue_delay_minutes: queueDelay,
    reliability_delay_minutes: reliabilityDelay,
    reliability,
    missed_service: missedService,
    accessibility,
    load_ratio: loadRatio,
    external
  };
}

function resolveGroundFallback(group, index, definition, parameters, primary, loads, returning, budget, slack) {
  const sourceModes = FALLBACK_PRIORITY[primary.mode] || [];
  const needsRecourse = primary.accessibility < Number(contract.group_profiles[group.id].accessibility_floor)
    || primary.total_minutes > Number(budget)
    || primary.missed_service;
  if (!needsRecourse || sourceModes.length === 0) {
    return {leg: primary, fallback_used: false, fallback_blocked: sourceModes.length === 0 && needsRecourse};
  }
  const drawSalt = returning ? 113 : 107;
  if (unit(index, drawSalt) >= Number(definition.ground_fallback_share || 0)) {
    return {leg: primary, fallback_used: false, fallback_blocked: true};
  }
  for (const targetMode of sourceModes) {
    const target = legMetric(group, index, targetMode, definition, parameters, loads, returning);
    const loadAllowed = target.load_ratio <= 1.35;
    const accessAllowed = target.accessibility >= Number(contract.group_profiles[group.id].accessibility_floor) - 0.02;
    const timeAllowed = target.total_minutes <= Number(budget) + Number(slack);
    if (loadAllowed && accessAllowed && timeAllowed) {
      return {
        leg: {...target, primary_mode: primary.mode, fallback_mode: targetMode, fallback_transfer_minutes: 5, total_minutes: target.total_minutes + 5},
        fallback_used: true,
        fallback_blocked: false
      };
    }
  }
  return {leg: primary, fallback_used: false, fallback_blocked: true};
}

function statusForAgent(group, index, definition, parameters, outboundLoads, returnLoads) {
  const profile = contract.group_profiles[group.id];
  const outboundMode = selectWeighted(parameters.weights[group.id], index, 19);
  const returnMode = selectWeighted(parameters.weights[group.id], index, 31);
  const primaryOutbound = legMetric(group, index, outboundMode, definition, parameters, outboundLoads, false);
  const primaryReturning = legMetric(group, index, returnMode, definition, parameters, returnLoads, true);
  const outboundResolution = resolveGroundFallback(group, index, definition, parameters, primaryOutbound, outboundLoads, false, profile.outbound_budget_minutes, profile.adaptation_slack_minutes);
  const returnResolution = resolveGroundFallback(group, index, definition, parameters, primaryReturning, returnLoads, true, profile.return_budget_minutes, profile.adaptation_slack_minutes);
  const outbound = outboundResolution.leg;
  const returning = returnResolution.leg;
  const accessFailure = outbound.accessibility < Number(profile.accessibility_floor);
  const overBudget = outbound.total_minutes > Number(profile.outbound_budget_minutes);
  const hardReachFailure = outbound.total_minutes > Number(profile.outbound_budget_minutes) + Number(profile.adaptation_slack_minutes)
    && (outbound.missed_service || unit(index, 97) < 0.52);
  const boundedDeferral = overBudget && unit(index, 101) < Number(profile.bounded_deferral_share);
  const returnFailure = returning.total_minutes > Number(profile.return_budget_minutes)
    || (returning.missed_service && returning.total_minutes > Number(profile.return_budget_minutes) * 0.72);
  let status = 'on_time';
  if (accessFailure || hardReachFailure) status = 'inaccessible';
  else if (returnFailure) status = 'return_failed';
  else if (boundedDeferral) status = 'deferred';
  else if (overBudget || outbound.missed_service || returning.missed_service) status = 'delayed';
  return {
    status,
    outbound,
    returning,
    fallback_used: Number(outboundResolution.fallback_used) + Number(returnResolution.fallback_used),
    fallback_blocked: Number(outboundResolution.fallback_blocked) + Number(returnResolution.fallback_blocked)
  };
}

function emptyStatusMap() {
  return Object.fromEntries(STATUSES.map((status) => [status, 0]));
}

function emptyModeMap() {
  return Object.fromEntries(MODES.map((mode) => [mode, 0]));
}

function runScenario(definition) {
  const parameters = scenarioParameters(definition);
  const counts = modeCounts(definition, parameters);
  const outboundLoads = loadRatios(counts.outbound, parameters);
  const returnLoads = loadRatios(counts.returning, parameters);
  const ranges = groupRanges();
  const statusCounts = emptyStatusMap();
  const groupStatusCounts = Object.fromEntries(GROUPS.map((group) => [group.id, emptyStatusMap()]));
  const modeStatusCounts = Object.fromEntries(MODES.map((mode) => [mode, emptyStatusMap()]));
  const returnModeStatusCounts = Object.fromEntries(MODES.map((mode) => [mode, emptyStatusMap()]));
  let processed = 0;
  let fallbackUsed = 0;
  let fallbackBlocked = 0;

  for (const group of ranges) {
    for (let offset = 0; offset < group.count; offset += 1) {
      const index = group.start + offset;
      const result = statusForAgent(group, index, definition, parameters, outboundLoads, returnLoads);
      statusCounts[result.status] += 1;
      groupStatusCounts[group.id][result.status] += 1;
      modeStatusCounts[result.outbound.mode][result.status] += 1;
      returnModeStatusCounts[result.returning.mode][result.status] += 1;
      fallbackUsed += result.fallback_used;
      fallbackBlocked += result.fallback_blocked;
      processed += 1;
    }
  }

  const closed = statusCounts.on_time + statusCounts.delayed + statusCounts.deferred;
  const activityReached = TOTAL - statusCounts.inaccessible;
  const groupReadouts = Object.fromEntries(GROUPS.map((group) => {
    const row = groupStatusCounts[group.id];
    const groupTotal = Number(group.count);
    const groupClosed = row.on_time + row.delayed + row.deferred;
    return [group.id, {
      population_agents: groupTotal,
      activity_zh: contract.group_profiles[group.id].activity_zh,
      activity_en: contract.group_profiles[group.id].activity_en,
      status_counts: row,
      chain_completion_proxy: round(groupClosed / groupTotal),
      activity_reached_proxy: round((groupTotal - row.inaccessible) / groupTotal),
      return_failure_proxy: round(row.return_failed / groupTotal),
      deferred_proxy: round(row.deferred / groupTotal),
      delayed_or_deferred_proxy: round((row.delayed + row.deferred) / groupTotal),
      interpretation: 'synthetic group aggregate; not a resident or employee outcome'
    }];
  }));
  const groupCompletionValues = Object.values(groupReadouts).map((row) => row.chain_completion_proxy);
  const completionGap = (Math.max(...groupCompletionValues) - Math.min(...groupCompletionValues)) * 100;
  const stress = definition.runner_scenario_id !== 'O1';
  const gates = contract.hard_gates;
  const chainCompletion = closed / TOTAL;
  const gatePass = chainCompletion >= Number(stress ? gates.minimum_chain_completion_proxy_stress : gates.minimum_chain_completion_proxy_nominal)
    && completionGap <= Number(stress ? gates.maximum_group_chain_completion_gap_points_stress : gates.maximum_group_chain_completion_gap_points_nominal);
  const modeRows = MODES.map((mode) => ({
    mode,
    label_zh: model.mode_parameters[mode].label_zh,
    label_en: model.mode_parameters[mode].label_en,
    outbound_person_trips: counts.outbound[mode],
    return_person_trips: counts.returning[mode],
    outbound_load_ratio: outboundLoads[mode],
    return_load_ratio: returnLoads[mode],
    status_counts: modeStatusCounts[mode],
    return_status_counts: returnModeStatusCounts[mode]
  }));
  return {
    scenario_id: definition.id,
    runner_scenario_id: definition.runner_scenario_id,
    profile_id: definition.profile_id,
    label_zh: definition.label_zh,
    label_en: definition.label_en,
    status: contract.status,
    population_agents: TOTAL,
    agents_processed: processed,
    all_agents_processed: processed === TOTAL,
    status_counts: statusCounts,
    chain_completion_proxy: round(chainCompletion),
    activity_reached_proxy: round(activityReached / TOTAL),
    return_failure_proxy: round(statusCounts.return_failed / TOTAL),
    deferred_proxy: round(statusCounts.deferred / TOTAL),
    delayed_or_deferred_proxy: round((statusCounts.delayed + statusCounts.deferred) / TOTAL),
    fallback_used_person_legs: fallbackUsed,
    fallback_blocked_person_legs: fallbackBlocked,
    fallback_share_of_legs: round(fallbackUsed / Math.max(TOTAL * 2, 1)),
    group_chain_completion_gap_proxy_points: round(completionGap, 2),
    group_readouts: groupReadouts,
    mode_rows: modeRows,
    air_candidate: 'blocked',
    privacy_check: 'aggregate_only_no_personal_trace',
    mass_conservation: sum(Object.values(statusCounts)) === TOTAL,
    gate: {
      stress_screen: stress,
      minimum_chain_completion_proxy: stress ? gates.minimum_chain_completion_proxy_stress : gates.minimum_chain_completion_proxy_nominal,
      maximum_group_chain_completion_gap_proxy_points: stress ? gates.maximum_group_chain_completion_gap_points_stress : gates.maximum_group_chain_completion_gap_points_nominal,
      pass: gatePass,
      action_if_fail: gatePass
        ? 'continue_synthetic_comparison_keep_calibration_boundary'
        : 'stop_and_calibrate_grouped_activity_diaries_capacity_accessibility_and_disruption_evidence'
    },
    interpretation: contract.interpretation
  };
}

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function pct(value, digits = 1) {
  return `${(Number(value) * 100).toFixed(digits)}%`;
}

function board(results, lang) {
  const zh = lang === 'zh';
  const title = zh ? '一条通勤，不等于一天完成' : 'A COMMUTE IS NOT A COMPLETED DAY';
  const subtitle = zh
    ? '312.2 万合成代理 · 到达主要活动 · 有限延期 · 返程闭合 · 四种地面压力情景'
    : '3.122 million synthetic agents · primary activity reached · bounded deferral · return closure · four ground scenarios';
  const note = zh
    ? '颜色按状态堆叠：准时闭合、延误后闭合、延期后闭合、主要活动不可达、返程未闭合。它是合成屏查，不是居民日记、员工行为或运营结果。'
    : 'The stack keeps on-time, delayed, deferred, inaccessible and return-failed chains separate. This is a synthetic screen, not a resident diary, employee-behaviour estimate or operating result.';
  const footer = zh
    ? '方法：同一方式选择、容量负荷、可靠性和无障碍代理进入活动链；空中候选保持 blocked；正式数据到位后整包重算。'
    : 'Method: the same mode choice, capacity load, reliability and accessibility proxies feed the activity chain; the air candidate stays blocked; rerun when formal data arrives.';
  const labels = zh
    ? {agents: '合成代理', completion: '链闭合', gap: '群体差距', status: '状态构成', nominal: '名义', stress: '压力'}
    : {agents: 'SYNTHETIC AGENTS', completion: 'CHAIN CLOSED', gap: 'GROUP GAP', status: 'STATUS MIX', nominal: 'NOMINAL', stress: 'STRESS'};
  const barX = 540;
  const barW = 640;
  const rows = results.map((row, index) => {
    const y = 270 + index * 120;
    let x = barX;
    const segments = STATUSES.map((status) => {
      const width = barW * Number(row.status_counts[status] || 0) / TOTAL;
      const segment = `<rect x="${x.toFixed(2)}" y="${y - 20}" width="${Math.max(0, width).toFixed(2)}" height="30" fill="${STATUS_META[status].color}"/>`;
      x += width;
      return segment;
    }).join('');
    const shortStatus = zh
      ? {on_time: '准时', delayed: '延误', deferred: '延期', inaccessible: '不可达', return_failed: '返程'}
      : {on_time: 'on time', delayed: 'late', deferred: 'defer', inaccessible: 'inaccessible', return_failed: 'return'};
    const statusLabels = STATUSES.map((status) => `${shortStatus[status]} ${pct(row.status_counts[status] / TOTAL)}`).join(' · ');
    return `<g><text x="60" y="${y - 7}" class="rowTitle">${esc(zh ? row.label_zh : row.label_en)}</text><text x="60" y="${y + 17}" class="rowSub">${labels.agents} ${Number(row.population_agents).toLocaleString('en-US')} · ${labels.completion} ${pct(row.chain_completion_proxy)} · ${labels.gap} ${row.group_chain_completion_gap_proxy_points.toFixed(1)} pt</text><rect x="${barX}" y="${y - 20}" width="${barW}" height="30" rx="8" fill="#244657"/>${segments}<rect x="${barX}" y="${y - 20}" width="${barW}" height="30" rx="8" fill="none" stroke="#B6D3DC" stroke-opacity=".45"/><text x="${barX}" y="${y + 32}" class="tiny">${esc(statusLabels)}</text></g>`;
  }).join('');
  const nominal = results[0];
  const worst = results.reduce((a, b) => (a.chain_completion_proxy < b.chain_completion_proxy ? a : b));
  const cards = [
    {title: labels.nominal, value: pct(nominal.chain_completion_proxy), sub: zh ? '名义活动链闭合' : 'nominal chain closed', color: '#55E4C1'},
    {title: labels.stress, value: pct(worst.chain_completion_proxy), sub: zh ? `${worst.label_zh}闭合` : `${worst.label_en} closed`, color: '#F7BF63'},
    {title: zh ? '最低群体差距' : 'WORST GROUP GAP', value: `${worst.group_chain_completion_gap_proxy_points.toFixed(1)} pt`, sub: zh ? '合成分组差距' : 'synthetic group spread', color: '#F082A7'}
  ].map((card, index) => {
    const x = 1240;
    const y = 228 + index * 116;
    return `<g><rect x="${x}" y="${y}" width="300" height="92" rx="16" fill="#F3F8FA"/><rect x="${x}" y="${y}" width="7" height="92" rx="3" fill="${card.color}"/><text x="${x + 26}" y="${y + 27}" class="cardTitle">${esc(card.title)}</text><text x="${x + 26}" y="${y + 59}" class="cardValue">${esc(card.value)}</text><text x="${x + 26}" y="${y + 78}" class="cardSub">${esc(card.sub)}</text></g>`;
  }).join('');
  const legend = STATUSES.map((status) => `<g><rect x="${60 + STATUSES.indexOf(status) * 220}" y="790" width="13" height="13" rx="3" fill="${STATUS_META[status].color}"/><text x="${80 + STATUSES.indexOf(status) * 220}" y="802" class="legend">${esc(STATUS_META[status][zh ? 'zh' : 'en'])}</text></g>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="940" viewBox="0 0 1600 940" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071A2B"/><stop offset="1" stop-color="#123E4A"/></linearGradient><style>.title{font:850 32px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#F5FBFF}.sub{font:500 15px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#A9C7D4}.rowTitle{font:850 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#F5FBFF}.rowSub{font:500 12px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#A9C7D4}.tiny{font:500 10px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#B6D3DC}.cardTitle{font:800 11px Arial,PingFang SC,sans-serif;letter-spacing:.8px;fill:#5E7D88}.cardValue{font:850 28px Arial,PingFang SC,sans-serif;fill:#102A3A}.cardSub{font:500 11px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#5E7D88}.legend{font:600 12px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#C9E1E7}.note{font:500 12px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#C3DEE5}</style></defs><rect width="1600" height="940" fill="url(#bg)"/><circle cx="1500" cy="30" r="300" fill="#2A9D8F" opacity=".14"/><circle cx="40" cy="850" r="240" fill="#5B8DEF" opacity=".12"/><text x="60" y="54" fill="#66E3CA" font-size="17" font-weight="900" letter-spacing="3">MOBILITY COMMONS / ACTIVITY-CHAIN COMPLETION</text><text x="60" y="98" class="title">${esc(title)}</text><text x="60" y="127" class="sub">${esc(subtitle)}</text><rect x="60" y="151" width="1480" height="48" rx="12" fill="#0B2738" stroke="#2A9D8F"/><text x="82" y="181" class="note">${esc(note)}</text>${rows}${cards}<rect x="60" y="770" width="1480" height="64" rx="14" fill="#102A3A" stroke="#2D5366"/>${legend}<text x="60" y="866" class="note">${esc(footer)}</text><text x="60" y="894" class="note">${esc(zh ? '读法：先看链闭合，再看不可达和返程未闭合；延期不是“成功”，而是被单独保留的适应成本。' : 'Read the chain closure first, then inaccessible and return-failed shares; deferral is not success, but an explicit adaptation cost.')}</text></svg>`;
}

const results = contract.scenario_definitions.map(runScenario);
const checks = {
  contract_population_matches_model: Number(contract.scope.population_reference) === TOTAL,
  all_scenarios_process_all_agents: results.every((row) => row.all_agents_processed),
  all_scenarios_status_mass_conservation: results.every((row) => row.mass_conservation),
  all_scenarios_statuses_are_declared: results.every((row) => Object.keys(row.status_counts).every((status) => STATUSES.includes(status))),
  all_groups_present: results.every((row) => Object.keys(row.group_readouts).length === GROUPS.length),
  air_candidate_fail_closed: results.every((row) => row.air_candidate === 'blocked'),
  privacy_aggregate_only: results.every((row) => row.privacy_check === 'aggregate_only_no_personal_trace'),
  nominal_gate_pass: results[0].gate.pass,
  stress_gate_results_reported: results.slice(1).every((row) => typeof row.gate.pass === 'boolean'),
  stress_gate_failures_are_visible: results.slice(1).some((row) => !row.gate.pass) || results.slice(1).every((row) => row.gate.pass)
};
Object.entries(checks).forEach(([name, passed]) => {
  if (!passed) fail(name);
});

const output = {
  version: contract.version,
  screen_id: contract.screen_id,
  generated_by: 'node visual/assets/run-activity-completion-screen.js',
  status: contract.status,
  model_version: model.version,
  regional_scope: contract.scope,
  method: contract.method,
  scenario_definitions: contract.scenario_definitions,
  results,
  checks,
  calibration_boundary: contract.interpretation
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(figureDir, 'activity-completion-board.svg'), board(results, 'zh'), 'utf8');
fs.writeFileSync(path.join(figureDir, 'activity-completion-board.en.svg'), board(results, 'en'), 'utf8');
console.log(JSON.stringify({
  ok: Object.values(checks).every(Boolean),
  generated: ['visual/assets/activity-completion-readout.json', 'assets/figures/activity-completion-board.svg', 'assets/figures/activity-completion-board.en.svg'],
  agents_processed: results.map((row) => ({scenario: row.scenario_id, agents: row.agents_processed, chain_completion_proxy: row.chain_completion_proxy, gate_pass: row.gate.pass}))
}, null, 2));
if (Object.values(checks).every(Boolean)) console.error('ACTIVITY_COMPLETION_CHECK_PASS: all population-scale activity-chain checks passed');
