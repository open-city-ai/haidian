'use strict';

/*
 * Capacity-closure screen for the population-scale synthetic O4 operations
 * test. It asks a narrow counterfactual question: what is the smallest
 * declared service-unit multiplier for each mode that removes the synthetic
 * FIFO residual queue and stays below the 1.35x peak-load gate? It does not
 * model procurement, a timetable, observed boarding, or a local baseline.
 */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const model = JSON.parse(fs.readFileSync(path.join(root, 'regional-scale-commute.json'), 'utf8'));
const expected = JSON.parse(fs.readFileSync(path.join(root, 'capacity-closure-screen.json'), 'utf8'));
const TOTAL = model.regional_scope.population_reference;
const GROUPS = model.synthetic_population.groups;
const MODES = model.modes;
const SLICES = model.service_time_operations.time_slices;
const PROFILE_ID = expected.profile_id;
const STEP = Number(expected.method.multiplier_step);
const GATE = Number(expected.gate.maximum_peak_mode_load_ratio);

function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
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

function selectWeighted(weights, index, salt) {
  const target = unit(index, salt);
  let cursor = 0;
  for (const mode of MODES) {
    cursor += Number(weights[mode] || 0);
    if (target < cursor) return mode;
  }
  return MODES[MODES.length - 1];
}

function buildChoiceCounts() {
  const counts = Object.fromEntries(MODES.map((mode) => [
    mode,
    Object.fromEntries(SLICES.map((slice) => [slice.id, 0]))
  ]));
  const profile = model.mode_weights_by_group[PROFILE_ID];
  let processed = 0;
  let start = 0;
  for (const group of GROUPS) {
    const rule = model.departure_time_choice.group_rules[group.id];
    for (let offset = 0; offset < group.count; offset += 1) {
      const index = start + offset;
      const mode = selectWeighted(profile[group.id], index, 61);
      let band = rule.default_band;
      if (PROFILE_ID === 'O4' && rule.shiftable && unit(index, 67) < Number(rule.shift_share_O4 || 0)) {
        band = rule.shift_band;
      }
      counts[mode][band] += 1;
      processed += 1;
    }
    start += group.count;
  }
  return {counts, processed};
}

function evaluateMode(mode, multiplier, counts) {
  const supply = model.service_time_operations.service_supply_units_by_profile[PROFILE_ID][mode];
  const capacityPerUnit = Number(model.mode_parameters[mode].service_unit.capacity_persons_per_unit);
  let queue = 0;
  let peakLoad = 0;
  let addedUnits = 0;
  let unitsBefore = 0;
  let unitsAfter = 0;
  const slices = [];
  for (const slice of SLICES) {
    const before = Number(supply[slice.id] || 0);
    const after = Math.ceil(before * multiplier);
    const arrivals = Number(counts[mode][slice.id] || 0) + queue;
    const capacity = after * capacityPerUnit;
    const boarded = Math.min(arrivals, capacity);
    queue = Math.max(0, arrivals - boarded);
    const load = capacity > 0 ? arrivals / capacity : (arrivals > 0 ? Infinity : 0);
    peakLoad = Math.max(peakLoad, load);
    unitsBefore += before;
    unitsAfter += after;
    addedUnits += after - before;
    slices.push({
      time_slice: slice.id,
      demand_person_trips: counts[mode][slice.id],
      declared_units_before: before,
      declared_units_after: after,
      arrivals_including_queue: round(arrivals, 2),
      boarded_person_trips: round(boarded, 2),
      residual_queue_after_slice: round(queue, 2),
      load_ratio: round(load)
    });
  }
  return {
    mode,
    label_zh: model.mode_parameters[mode].label_zh,
    label_en: model.mode_parameters[mode].label_en,
    capacity_per_unit: capacityPerUnit,
    multiplier: round(multiplier, 2),
    declared_units_before: unitsBefore,
    declared_units_after: unitsAfter,
    added_service_units: addedUnits,
    peak_load_ratio: round(peakLoad),
    residual_queue_person_trips: round(queue, 2),
    gate_pass: queue === 0 && peakLoad <= GATE,
    slices
  };
}

function findMinimum(mode, counts) {
  const maxStep = Math.round(Number(expected.method.maximum_multiplier) / STEP);
  for (let index = Math.round(1 / STEP); index <= maxStep; index += 1) {
    const multiplier = round(index * STEP, 2);
    const result = evaluateMode(mode, multiplier, counts);
    if (result.gate_pass) return result;
  }
  throw new Error(`no capacity closure found for ${mode}`);
}

const choice = buildChoiceCounts();
const modeResults = MODES.map((mode) => findMinimum(mode, choice.counts));
const combined = {
  profile_id: PROFILE_ID,
  maximum_required_multiplier: Math.max(...modeResults.map((result) => result.multiplier)),
  total_declared_units_before: modeResults.reduce((total, result) => total + result.declared_units_before, 0),
  total_declared_units_after: modeResults.reduce((total, result) => total + result.declared_units_after, 0),
  total_added_service_units: modeResults.reduce((total, result) => total + result.added_service_units, 0),
  maximum_peak_load_ratio: Math.max(...modeResults.map((result) => result.peak_load_ratio)),
  residual_queue_person_trips: modeResults.reduce((total, result) => total + result.residual_queue_person_trips, 0),
  gate_pass: modeResults.every((result) => result.gate_pass)
};

const parityFields = ['mode', 'multiplier', 'added_service_units', 'peak_load_ratio', 'residual_queue_person_trips'];
const expectedResults = expected.mode_results || [];
const parity = modeResults.length === expectedResults.length && modeResults.every((actual, index) => {
  const expectedResult = expectedResults[index] || {};
  return parityFields.every((field) => actual[field] === expectedResult[field]);
});

const checks = {
  regional_population_scale: choice.processed === TOTAL && TOTAL >= 3000000,
  choice_mass_conservation: Object.values(choice.counts).flatMap((mode) => Object.values(mode)).reduce((total, value) => total + value, 0) === TOTAL,
  all_modes_have_closure: modeResults.every((result) => result.gate_pass),
  combined_closure_pass: combined.gate_pass,
  combined_air_candidate_blocked: expected.air_candidate.status === 'blocked',
  generated_asset_parity: parity
};

const output = {
  screen_id: expected.screen_id,
  model_version: model.version,
  status: expected.status,
  profile_id: PROFILE_ID,
  agents_processed: choice.processed,
  demand_by_mode: Object.fromEntries(MODES.map((mode) => [mode, Object.values(choice.counts[mode]).reduce((total, value) => total + value, 0)])),
  demand_by_time_slice: Object.fromEntries(SLICES.map((slice) => [slice.id, MODES.reduce((total, mode) => total + choice.counts[mode][slice.id], 0)])),
  gate: expected.gate,
  mode_results: modeResults,
  combined_closure: combined,
  air_candidate: expected.air_candidate,
  interpretation: expected.interpretation,
  checks
};

console.log(JSON.stringify(output, null, 2));
if (Object.values(checks).every(Boolean)) console.error('CAPACITY_CLOSURE_CHECK_PASS: all closure checks passed');
else process.exitCode = 1;
