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

function serviceCapacityPerMinute(mode, minute, objects) {
  if (mode === 'metro') {
    const item = objects.metro_train;
    return minute % item.headway_minutes === 0 ? item.vehicle_capacity_persons : 0;
  }
  if (mode === 'bus' || mode === 'enterprise_shuttle') {
    const item = objects.bus_vehicle;
    return minute % item.headway_minutes === 0 ? item.vehicle_capacity_persons : 0;
  }
  if (mode === 'bicycle') {
    const item = objects.bicycle_parking;
    return item.capacity_spaces / item.turnover_minutes;
  }
  if (mode === 'car') {
    const item = objects.car_vehicle_and_curb;
    return item.curb_service_capacity_vehicles_per_15min / 15;
  }
  if (mode === 'walking_wheelchair') {
    return objects.walk_wheelchair_stream.service_capacity_persons_per_minute;
  }
  return 0;
}

function runScenario(scenarioId, demand, objects) {
  const profile = profiles[scenarioId];
  if (!profile || profile.status === 'blocked') {
    return {scenario_id: scenarioId, status: 'blocked_or_not_run'};
  }

  const modeOutputs = {};
  for (const [mode, totalDemand] of Object.entries(demand)) {
    const weights = Array.from({length: horizon}, (_, minute) => {
      const distance = (minute - profile.peak_minute) / profile.spread_minutes;
      const peak = Math.exp(-0.5 * distance * distance);
      return 1 + profile.peak_concentration * peak;
    });
    const arrivals = allocate(totalDemand, weights);
    let queue = 0;
    let peakQueue = 0;
    let queuePersonMinutes = 0;
    let served = 0;
    let peakServiceLoad = 0;
    const trace = [];

    for (let minute = 0; minute < horizon; minute += 1) {
      queue += arrivals[minute];
      const service = serviceCapacityPerMinute(mode, minute, objects);
      const beforeService = queue;
      const servedNow = Math.min(queue, Math.floor(service));
      queue -= servedNow;
      served += servedNow;
      peakQueue = Math.max(peakQueue, queue);
      queuePersonMinutes += beforeService;
      peakServiceLoad = Math.max(peakServiceLoad, service > 0 ? beforeService / service : 0);
      trace.push({minute, arrivals: arrivals[minute], served: servedNow, queue});
    }

    const supply = sum(Array.from({length: horizon}, (_, minute) =>
      serviceCapacityPerMinute(mode, minute, objects)));
    modeOutputs[mode] = {
      demand: totalDemand,
      mode_share: round(totalDemand / model.demand_units),
      service_supply: round(supply),
      capacity_load_ratio: round(totalDemand / Math.max(supply, 1)),
      served: served,
      unmet_at_horizon: queue,
      peak_queue: peakQueue,
      mean_queue_person_minutes: round(queuePersonMinutes / horizon),
      peak_service_load_ratio: round(peakServiceLoad),
      trace
    };
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

const agentCount = sum(spec.agent_types.map((item) => item.design_unit_count));
const objects = serviceObjects();
const demandByScenario = model.model_analysis.mode_demand_by_scenario;
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
  }))
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
  scenario_outputs: scenarioOutputs,
  next_calibration: model.model_spec.calibration_metrics
};

if (!pass) process.exitCode = 1;
console.log(JSON.stringify(result, null, 2));
