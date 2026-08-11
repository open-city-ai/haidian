'use strict';

/*
 * Offline, deterministic queue/network runner for the design sandbox.
 *
 * This is intentionally a small reviewer-facing recalculation aid rather
 * than a claim of a calibrated Haidian traffic model. It reads only the
 * adjacent movement-simulation.json, uses grouped demand, and prints mode
 * shares, service capacity, queue traces and calibration fields. Replace the
 * declared design inputs with dated field evidence before using the runner
 * for a local decision.
 */

const fs = require('fs');
const path = require('path');

const modelPath = path.join(__dirname, 'movement-simulation.json');
const model = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
const spec = model.model_spec;
const horizon = spec.horizon_minutes;
const stepSeconds = spec.time_step_seconds;
const profiles = model.reproducibility.profile_by_scenario;

function fail(message) {
  console.error(`MODEL_CHECK_FAIL: ${message}`);
  process.exitCode = 1;
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function allocate(total, weights) {
  const weightSum = sum(weights);
  const exact = weights.map((weight) => (total * weight) / weightSum);
  const integers = exact.map(Math.floor);
  let remainder = total - sum(integers);
  exact
    .map((value, index) => ({index, fraction: value - integers[index]}))
    .sort((a, b) => b.fraction - a.fraction || a.index - b.index)
    .forEach(({index}) => {
      if (remainder > 0) {
        integers[index] += 1;
        remainder -= 1;
      }
    });
  return integers;
}

function serviceObjects() {
  return Object.fromEntries(spec.fleet_and_service_objects.map((item) => [item.id, item]));
}

function serviceCapacityPerMinute(mode, minute, objects, serviceOptions = {}) {
  let capacity = 0;
  if (mode === 'metro') {
    const item = objects.metro_train;
    capacity = minute % item.headway_minutes === 0 ? item.vehicle_capacity_persons : 0;
  } else if (mode === 'bus' || mode === 'enterprise_shuttle') {
    const item = objects.bus_vehicle;
    capacity = minute % item.headway_minutes === 0 ? item.vehicle_capacity_persons : 0;
  } else if (mode === 'bicycle') {
    const item = objects.bicycle_parking;
    capacity = item.capacity_spaces / item.turnover_minutes;
  } else if (mode === 'car') {
    const item = objects.car_vehicle_and_curb;
    capacity = item.curb_service_capacity_vehicles_per_15min / 15;
  } else if (mode === 'walking_wheelchair') {
    capacity = objects.walk_wheelchair_stream.service_capacity_persons_per_minute;
  }
  const blockedWindows = (serviceOptions.blocked_windows_by_mode || {})[mode] || [];
  if (blockedWindows.some((window) => minute >= window.start_minute && minute < window.end_minute)) {
    return 0;
  }
  const multiplier = Number((serviceOptions.capacity_multiplier_by_mode || {})[mode] ?? 1);
  return capacity * multiplier;
}

function profileWeights(profile) {
  return Array.from({length: horizon}, (_, minute) => {
    const distance = (minute - profile.peak_minute) / profile.spread_minutes;
    const peak = Math.exp(-0.5 * distance * distance);
    return 1 + profile.peak_concentration * peak;
  });
}

function runMode(mode, demandSlices, objects, includeTrace = true, serviceOptions = {}) {
  const arrivals = Array(horizon).fill(0);
  for (const slice of demandSlices) {
    const weights = profileWeights(slice.profile);
    allocate(slice.demand, weights).forEach((value, minute) => {
      arrivals[minute] += value;
    });
  }

  let queue = 0;
  let peakQueue = 0;
  let queuePersonMinutes = 0;
  let served = 0;
  let peakServiceLoad = 0;
  const trace = [];

  for (let minute = 0; minute < horizon; minute += 1) {
    queue += arrivals[minute];
    const service = serviceCapacityPerMinute(mode, minute, objects, serviceOptions);
    const beforeService = queue;
    const servedNow = Math.min(queue, Math.floor(service));
    queue -= servedNow;
    served += servedNow;
    peakQueue = Math.max(peakQueue, queue);
    queuePersonMinutes += beforeService;
    peakServiceLoad = Math.max(peakServiceLoad, service > 0 ? beforeService / service : 0);
    if (includeTrace) {
      trace.push({minute, arrivals: arrivals[minute], served: servedNow, queue});
    }
  }

  const supply = sum(Array.from({length: horizon}, (_, minute) =>
    serviceCapacityPerMinute(mode, minute, objects, serviceOptions)));
  const output = {
    demand: sum(demandSlices.map((slice) => slice.demand)),
    service_supply: round(supply),
    capacity_load_ratio: round(sum(demandSlices.map((slice) => slice.demand)) / Math.max(supply, 1)),
    served,
    unmet_at_horizon: queue,
    peak_queue: peakQueue,
    mean_queue_person_minutes: round(queuePersonMinutes / horizon),
    peak_service_load_ratio: round(peakServiceLoad)
  };
  if (includeTrace) output.trace = trace;
  return output;
}

function runScenario(scenarioId, demand, objects) {
  const profile = profiles[scenarioId];
  if (!profile || profile.status === 'blocked') {
    return {scenario_id: scenarioId, status: 'blocked_or_not_run'};
  }

  const modeOutputs = {};
  for (const [mode, totalDemand] of Object.entries(demand)) {
    modeOutputs[mode] = runMode(mode, [{demand: totalDemand, profile}], objects);
    modeOutputs[mode].mode_share = round(totalDemand / model.demand_units);
  }

  return {
    scenario_id: scenarioId,
    status: 'recomputed_from_declared_inputs',
    total_demand: sum(Object.values(demand)),
    mode_outputs: modeOutputs,
    calibration_fields: {
      mode_share_by_group: 'replace_with_grouped_field_observation',
      road_and_curb_volume_by_15min: 'replace_with_counted_volume',
      door_to_door_time_p50_p90: 'replace_with_dated_OD_sample',
      trip_distance_by_mode: 'replace_with_network_or_survey_measure',
      accessibility_completion_by_group: 'replace_with_walkthrough_audit',
      worst_group_gap: 'compare_after_grouped_accessibility_observation'
    }
  };
}

function summarizeModeOutputs(modeOutputs) {
  return {
    total_peak_queue_persons: sum(Object.values(modeOutputs).map((item) => item.peak_queue)),
    total_mean_queue_person_minutes: round(sum(Object.values(modeOutputs).map((item) => item.mean_queue_person_minutes))),
    peak_car_curb_queue_vehicles: modeOutputs.car ? modeOutputs.car.peak_queue : null,
    metro_peak_service_load_ratio: modeOutputs.metro ? modeOutputs.metro.peak_service_load_ratio : null,
    bus_peak_service_load_ratio: modeOutputs.bus ? modeOutputs.bus.peak_service_load_ratio : null,
    total_unmet_at_horizon: sum(Object.values(modeOutputs).map((item) => item.unmet_at_horizon))
  };
}

function runBehavioralSensitivity(demandByScenario, objects) {
  const sensitivity = model.behavioral_sensitivity;
  const baseScenario = sensitivity.base_scenario;
  const baseDemand = demandByScenario[baseScenario];
  const baseProfile = profiles[baseScenario];
  const adaptiveProfile = sensitivity.policy.adaptive_profile;
  const shiftedFraction = sensitivity.policy.eligible_fraction_shifted;
  const enterpriseDemand = sensitivity.eligible_demand_by_mode;
  const modeOutputs = {};
  let shiftedEnterpriseUnits = 0;

  for (const [mode, totalDemand] of Object.entries(baseDemand)) {
    const eligible = Number(enterpriseDemand[mode] || 0);
    const shifted = Math.round(eligible * shiftedFraction);
    shiftedEnterpriseUnits += shifted;
    modeOutputs[mode] = runMode(mode, [
      {demand: totalDemand - shifted, profile: baseProfile},
      {demand: shifted, profile: adaptiveProfile}
    ], objects, false);
  }

  const baseline = runScenario(baseScenario, baseDemand, objects);
  const baselineSummary = summarizeModeOutputs(baseline.mode_outputs);
  const adaptiveSummary = summarizeModeOutputs(modeOutputs);
  return {
    id: sensitivity.id,
    status: sensitivity.status,
    base_scenario: baseScenario,
    eligible_agent_group: sensitivity.eligible_agent_group,
    shifted_enterprise_units: shiftedEnterpriseUnits,
    protected_agent_groups: sensitivity.protected_agent_groups,
    policy: sensitivity.policy,
    baseline: baselineSummary,
    adaptive: adaptiveSummary,
    delta_adaptive_minus_baseline: Object.fromEntries(
      Object.keys(baselineSummary).map((key) => [key, adaptiveSummary[key] - baselineSummary[key]])
    ),
    mode_outputs: modeOutputs,
    operational_guard: {
      transit_coordination_required: sensitivity.policy.transit_coordination_required,
      rescheduling_cost_must_be_measured: sensitivity.policy.rescheduling_cost_must_be_measured
    },
    required_calibration: sensitivity.required_calibration,
    disclaimer: 'Synthetic schedule-spreading sensitivity only; not a local employer response or measured effect.'
  };
}

function groupExposureProxy(group, modeOutputs, baseDemand, resilience) {
  const weights = resilience.group_mode_weights[group] || {};
  const unmetExposure = Object.entries(weights).reduce((total, [mode, weight]) => {
    const unmet = Number(modeOutputs[mode]?.unmet_at_horizon || 0);
    const demand = Math.max(Number(baseDemand[mode] || 0), 1);
    return total + Number(weight) * Math.min(unmet / demand, 1);
  }, 0);
  const delayExposure = Object.entries(weights).reduce((total, [mode, weight]) => {
    const meanQueue = Number(modeOutputs[mode]?.mean_queue_person_minutes || 0);
    const demand = Math.max(Number(baseDemand[mode] || 0), 1);
    return total + Number(weight) * Math.min(meanQueue / demand / 0.2, 1);
  }, 0);
  return round(unmetExposure * 12 + delayExposure * 8);
}

function runResilienceEvent(event, baseDemand, baseProfile, objects, resilience) {
  const primaryOutputs = Object.fromEntries(Object.entries(baseDemand).map(([mode, demand]) => [
    mode,
    runMode(mode, [{demand, profile: baseProfile}], objects, false, event)
  ]));
  const fallbackDemand = {...baseDemand};
  const plannedFallbackByMode = {};
  let fallbackEligibleUnmet = 0;
  for (const [sourceMode, targetMode] of Object.entries(event.fallback_mode_by_mode || {})) {
    const sourceUnmet = Number(primaryOutputs[sourceMode]?.unmet_at_horizon || 0);
    fallbackEligibleUnmet += sourceUnmet;
    const planned = Math.round(sourceUnmet * Number(event.fallback_recovery_fraction || 0));
    if (targetMode && planned > 0) {
      fallbackDemand[targetMode] = Number(fallbackDemand[targetMode] || 0) + planned;
      plannedFallbackByMode[targetMode] = Number(plannedFallbackByMode[targetMode] || 0) + planned;
    }
  }
  const fallbackOutputs = Object.fromEntries(Object.entries(fallbackDemand).map(([mode, demand]) => [
    mode,
    runMode(mode, [{demand, profile: baseProfile}], objects, false, event)
  ]));
  const coveredFallbackUnits = Object.entries(plannedFallbackByMode).reduce((total, [mode, planned]) => {
    const primaryServed = Number(primaryOutputs[mode]?.served || 0);
    const fallbackServed = Number(fallbackOutputs[mode]?.served || 0);
    return total + Math.min(planned, Math.max(0, fallbackServed - primaryServed));
  }, 0);
  const primaryUnmet = sum(Object.values(primaryOutputs).map((output) => output.unmet_at_horizon));
  const totalDemand = sum(Object.values(baseDemand));
  const groupOutputs = Object.fromEntries(Object.keys(resilience.group_mode_weights).map((group) => {
    const exposure = groupExposureProxy(group, primaryOutputs, baseDemand, resilience);
    const gap = round(Number(event.group_gap_penalty_points?.[group] || 0) + exposure);
    const recovery = round(Number(event.recovery_time_proxy_minutes_by_group?.[group] || 0) + exposure * 1.5);
    return [group, {
      unmet_exposure_proxy: exposure,
      worst_group_gap_proxy_points: gap,
      recovery_time_proxy_minutes: recovery,
      status: gap <= resilience.policy.max_worst_group_gap_proxy_points && recovery <= resilience.policy.max_recovery_time_proxy_minutes ? 'screened' : 'requires_redesign'
    }];
  }));
  const worstGroup = Object.entries(groupOutputs).sort((a, b) =>
    b[1].worst_group_gap_proxy_points - a[1].worst_group_gap_proxy_points
  )[0];
  const fallbackCoverage = fallbackEligibleUnmet === 0 ? 1 : round(coveredFallbackUnits / fallbackEligibleUnmet);
  return {
    event_id: event.id,
    event: event.event,
    status: 'recomputed_from_declared_inputs',
    primary_mode_outputs: primaryOutputs,
    fallback_mode_outputs: fallbackOutputs,
    primary_unmet_at_horizon: primaryUnmet,
    fallback_eligible_unmet: fallbackEligibleUnmet,
    planned_fallback_units: sum(Object.values(plannedFallbackByMode)),
    covered_fallback_units: coveredFallbackUnits,
    fallback_coverage_ratio: fallbackCoverage,
    total_queue_person_minutes: round(sum(Object.values(primaryOutputs).map((output) => output.mean_queue_person_minutes))),
    total_demand: totalDemand,
    group_equity_proxies: groupOutputs,
    worst_group: worstGroup ? {group: worstGroup[0], ...worstGroup[1]} : null,
    policy_screen: {
      fallback_coverage_pass: primaryUnmet === 0
        || Object.keys(event.fallback_mode_by_mode || {}).length === 0
        || fallbackCoverage >= resilience.policy.minimum_fallback_coverage_ratio,
      worst_group_gap_pass: worstGroup ? worstGroup[1].worst_group_gap_proxy_points <= resilience.policy.max_worst_group_gap_proxy_points : true,
      recovery_time_pass: worstGroup ? worstGroup[1].recovery_time_proxy_minutes <= resilience.policy.max_recovery_time_proxy_minutes : true,
      air_candidate: 'blocked'
    },
    disclaimer: 'Synthetic disruption and grouped-equity proxies only; replace with dated incident, weather, accessibility and p90 OD observations.'
  };
}

function runResilienceSensitivity(demandByScenario, objects) {
  const resilience = model.resilience_sensitivity;
  const baseDemand = demandByScenario[resilience.base_scenario];
  const baseProfile = profiles[resilience.base_scenario];
  const events = resilience.events.map((event) => runResilienceEvent(event, baseDemand, baseProfile, objects, resilience));
  const policyPass = events.every((event) => Object.values(event.policy_screen).every((value) => value === true || value === 'blocked'));
  return {
    id: resilience.id,
    status: resilience.status,
    base_scenario: resilience.base_scenario,
    events,
    policy: resilience.policy,
    method_sources: resilience.method_sources,
    required_calibration: resilience.required_calibration,
    policy_pass: policyPass,
    disclaimer: 'Synthetic disruption and grouped-equity sensitivity only; not a local resilience or p90 travel-time claim.'
  };
}

const agentCount = sum(spec.agent_types.map((item) => item.design_unit_count));
const objects = serviceObjects();
const demandByScenario = model.model_analysis.mode_demand_by_scenario;
const behavioralSensitivity = runBehavioralSensitivity(demandByScenario, objects);
const resilienceSensitivity = runResilienceSensitivity(demandByScenario, objects);
const behavioralChoiceContract = model.behavioral_choice_contract;
const enterpriseAgentCount = spec.agent_types.find((item) => item.id === model.behavioral_sensitivity.eligible_agent_group).design_unit_count;
const eligibleEnterpriseDemand = sum(Object.values(model.behavioral_sensitivity.eligible_demand_by_mode));
const checks = [
  {id: 'agent_total', pass: agentCount === model.demand_units, observed: agentCount, expected: model.demand_units},
  {id: 'time_step', pass: stepSeconds === 60, observed: stepSeconds, expected: 60},
  {id: 'horizon', pass: horizon === 120, observed: horizon, expected: 120},
  {id: 'air_candidate_blocked', pass: objects.air_candidate.service_state.includes('blocked'), observed: objects.air_candidate.service_state},
  ...Object.entries(demandByScenario).map(([scenarioId, demand]) => ({
    id: `${scenarioId}_demand_total`,
    pass: sum(Object.values(demand)) === model.demand_units,
    observed: sum(Object.values(demand)),
    expected: model.demand_units
  })),
  {
    id: 'behavioral_enterprise_demand_matches_agent_group',
    pass: eligibleEnterpriseDemand === enterpriseAgentCount,
    observed: eligibleEnterpriseDemand,
    expected: enterpriseAgentCount
  },
  {
    id: 'behavioral_shift_is_declared_fraction',
    pass: behavioralSensitivity.shifted_enterprise_units === Math.round(eligibleEnterpriseDemand * model.behavioral_sensitivity.policy.eligible_fraction_shifted),
    observed: behavioralSensitivity.shifted_enterprise_units,
    expected: Math.round(eligibleEnterpriseDemand * model.behavioral_sensitivity.policy.eligible_fraction_shifted)
  },
  {
    id: 'behavioral_choice_contract_declared',
    pass: Boolean(
      behavioralChoiceContract
      && behavioralChoiceContract.model_class
      && behavioralChoiceContract.choice_set.includes('metro')
      && behavioralChoiceContract.choice_set.includes('air_candidate')
      && behavioralChoiceContract.external_commute_contract
      && behavioralChoiceContract.external_commute_contract.required_records.includes('door_to_door_time_p50_p90')
    ),
    observed: behavioralChoiceContract ? behavioralChoiceContract.model_class : null,
    expected: 'grouped_mode_and_departure_time_choice_with_activity_chain'
  },
  {
    id: 'resilience_equity_contract_declared',
    pass: Boolean(
      model.resilience_sensitivity
      && model.resilience_sensitivity.events.length >= 3
      && model.resilience_sensitivity.events.some((event) => event.id === 'R1_metro_segment_disruption')
      && model.resilience_sensitivity.events.some((event) => event.id === 'R2_weather_ground_fallback')
      && resilienceSensitivity.policy_pass
    ),
    observed: resilienceSensitivity.events.map((event) => ({id: event.event_id, policy_pass: event.policy_screen})),
    expected: 'nominal_plus_disruption_plus_weather_ground_fallback_screened'
  }
];

const scenarioOutputs = Object.entries(demandByScenario)
  .map(([scenarioId, demand]) => runScenario(scenarioId, demand, objects));
const pass = checks.every((check) => check.pass);

const result = {
  runner: 'run-mobility-simulation.js',
  model_version: model.version,
  status: pass ? 'PASS' : 'FAIL',
  disclaimer: 'Synthetic design-unit recalculation only; not a local Haidian performance claim.',
  checks,
  behavioral_choice_contract: behavioralChoiceContract,
  scenario_outputs: scenarioOutputs,
  behavioral_sensitivity: behavioralSensitivity,
  resilience_sensitivity: resilienceSensitivity,
  next_calibration: model.model_spec.calibration_metrics
};

if (!pass) process.exitCode = 1;
console.log(JSON.stringify(result, null, 2));
