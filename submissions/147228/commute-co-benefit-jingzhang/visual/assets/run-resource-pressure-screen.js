'use strict';

/*
 * Deterministic relative resource-pressure screen.
 *
 * It consumes the regional runner's aggregate person-km ledger and never
 * invents local energy, fuel, emissions, fleet or electricity observations.
 * A null factor is intentionally excluded from the known-mode total.
 */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const method = JSON.parse(fs.readFileSync(path.join(root, 'resource-pressure-screen.json'), 'utf8'));
const regional = JSON.parse(fs.readFileSync(path.join(root, 'regional-scale-commute-readout.json'), 'utf8'));
const outputPath = path.join(root, 'resource-pressure-readout.json');

function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(Number(value) * factor) / factor;
}

function fail(message) {
  console.error(`RESOURCE_PRESSURE_CHECK_FAIL: ${message}`);
  process.exitCode = 1;
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

const factors = method.relative_mode_intensity;
const modes = Object.keys(factors);
const declaredModes = regional.selected_policy_readout.mode_counts;

function hasFactor(mode) {
  const value = factors[mode].relative_to_car;
  return value !== null && value !== undefined && Number.isFinite(Number(value));
}

function scenarioReadout(scenario) {
  const personKmByMode = scenario.person_km_by_mode || {};
  const knownModes = modes.filter(hasFactor);
  const unknownModes = modes.filter((mode) => !hasFactor(mode));
  const knownPersonKm = sum(knownModes.map((mode) => personKmByMode[mode]));
  const knownResourceIndex = sum(knownModes.map((mode) => Number(personKmByMode[mode] || 0) * Number(factors[mode].relative_to_car)));
  const unknownPersonKm = sum(unknownModes.map((mode) => personKmByMode[mode]));
  const modeRows = modes.map((mode) => ({
    mode,
    label_zh: factors[mode].label_zh,
    label_en: factors[mode].label_en,
    person_km_proxy: Number(personKmByMode[mode] || 0),
    mode_share: Number(scenario.mode_shares?.[mode] || 0),
    relative_to_car: hasFactor(mode) ? Number(factors[mode].relative_to_car) : null,
    known_resource_index: hasFactor(mode)
      ? round(Number(personKmByMode[mode] || 0) * Number(factors[mode].relative_to_car), 0)
      : null,
    vehicle_or_service_km_proxy: Number(scenario.service_unit_ledger?.[mode]?.vehicle_or_service_km_proxy || 0),
    factor_status: factors[mode].factor_status
  }));
  return {
    policy_id: scenario.scenario_id || scenario.policy_id,
    agents_processed: scenario.agents_processed,
    mass_conservation: scenario.mass_conservation,
    person_km_proxy: scenario.person_km_proxy,
    person_km_by_mode: personKmByMode,
    known_person_km_proxy: round(knownPersonKm, 0),
    unknown_factor_person_km_proxy: round(unknownPersonKm, 0),
    known_resource_index: round(knownResourceIndex, 0),
    known_resource_index_per_known_person_km: round(knownResourceIndex / Math.max(knownPersonKm, 1), 4),
    vehicle_or_service_km_proxy: scenario.vehicle_or_service_km_proxy,
    mode_rows: modeRows,
    interpretation: 'Relative method screen only; unknown-factor modes are retained as unknown and excluded from the known-mode index.'
  };
}

const scenarioRows = regional.scenarios.map(scenarioReadout);
const selectedScenario = scenarioReadout({
  ...regional.selected_policy_readout,
  scenario_id: regional.selected_policy_readout.policy_id,
  policy_id: regional.selected_policy_readout.policy_id,
  person_km_proxy: regional.selected_policy_readout.person_km_proxy,
  vehicle_or_service_km_proxy: regional.selected_policy_readout.vehicle_or_service_km_proxy,
  mass_conservation: regional.selected_policy_readout.mass_conservation ?? true,
  agents_processed: regional.selected_policy_readout.agents_processed ?? regional.regional_scope.population_reference
});
if (!scenarioRows.some((row) => row.policy_id === selectedScenario.policy_id)) scenarioRows.push(selectedScenario);
const baseline = scenarioRows.find((row) => row.policy_id === 'B0' || row.policy_id === 'B0_reference');
const selectedPolicyId = regional.selected_policy_readout.policy_id;
const selected = scenarioRows.find((row) => row.policy_id === selectedPolicyId);
const checks = {
  method_declares_all_regional_modes: modes.every((mode) => Object.prototype.hasOwnProperty.call(declaredModes, mode)),
  all_scenarios_have_person_km_ledger: scenarioRows.every((row) => modes.every((mode) => Object.prototype.hasOwnProperty.call(row.person_km_by_mode, mode))),
  person_km_mode_mass_conservation: scenarioRows.every((row) => Math.abs(sum(Object.values(row.person_km_by_mode)) - Number(row.person_km_proxy)) <= modes.length),
  all_agents_processed: scenarioRows.every((row) => row.agents_processed === regional.regional_scope.population_reference),
  population_mode_mass_conservation: regional.scenarios.every((scenario) => scenario.mass_conservation),
  selected_policy_present: Boolean(selected),
  unknown_shuttle_not_scored_as_car: selected?.mode_rows.find((row) => row.mode === 'enterprise_shuttle')?.relative_to_car === null,
  air_candidate_remains_blocked: regional.scenarios.every((scenario) => scenario.air_candidate === 'blocked')
};
Object.entries(checks).forEach(([name, passed]) => {
  if (!passed) fail(name);
});

const output = {
  version: method.version,
  screen_id: method.screen_id,
  generated_by: 'node visual/assets/run-resource-pressure-screen.js',
  status: method.status,
  selected_policy: selectedPolicyId,
  baseline_policy: baseline?.policy_id,
  method_contract: {
    activity_unit: method.unit_definition.activity_unit,
    intensity_unit: method.unit_definition.intensity_unit,
    method_sources: method.method_sources,
    selection_boundary: method.selection_boundary
  },
  scenario_readouts: scenarioRows,
  comparison_selected_minus_baseline: selected && baseline ? {
    selected_policy: selectedPolicyId,
    known_resource_index_delta: selected.known_resource_index - baseline.known_resource_index,
    known_resource_index_change_ratio: round(selected.known_resource_index / Math.max(baseline.known_resource_index, 1) - 1, 4),
    known_person_km_delta: selected.known_person_km_proxy - baseline.known_person_km_proxy,
    unknown_factor_person_km_delta: selected.unknown_factor_person_km_proxy - baseline.unknown_factor_person_km_proxy,
    vehicle_or_service_km_delta: selected.vehicle_or_service_km_proxy - baseline.vehicle_or_service_km_proxy
  } : null,
  checks,
  calibration_required: method.calibration_required,
  interpretation: 'This is a transparent relative resource-pressure screen over synthetic person-kilometres. It does not establish local energy use, emissions, fleet existence, electricity mix, environmental benefit or an implementation ranking.'
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(output, null, 2));
if (Object.values(checks).every(Boolean)) console.error('RESOURCE_PRESSURE_CHECK_PASS: all resource-pressure checks passed');
