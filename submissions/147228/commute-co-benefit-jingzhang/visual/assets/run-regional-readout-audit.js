#!/usr/bin/env node
'use strict';

/*
 * Compare the committed compact candidate-selection readout with the
 * deterministic population-scale runner. This closes the audit gap between
 * values that exist only on stdout and values a reviewer can inspect without
 * replaying the full model.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const runnerPath = path.join(__dirname, 'run-regional-commute-simulation.js');
const readoutPath = path.join(__dirname, 'regional-scale-commute-readout.json');
const run = spawnSync(process.execPath, [runnerPath], {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024
});

const failures = [];
if (run.status !== 0) {
  failures.push(`regional runner exited with status ${run.status}`);
}

let generated;
let readout;
try {
  generated = JSON.parse(run.stdout);
} catch (error) {
  failures.push(`cannot parse regional runner stdout: ${error.message}`);
}
try {
  readout = JSON.parse(fs.readFileSync(readoutPath, 'utf8'));
} catch (error) {
  failures.push(`cannot parse committed readout: ${error.message}`);
}

function compactCandidate(candidate) {
  return {
    rank: candidate.rank,
    policy_id: candidate.policy_id,
    weight_profile: candidate.weight_profile,
    hard_gate_pass: candidate.hard_gate_pass,
    agents_processed: candidate.agents_processed,
    all_agents_processed: candidate.all_agents_processed,
    mass_conservation: candidate.mass_conservation,
    satisfaction_proxy: candidate.satisfaction_proxy,
    average_generalized_cost_proxy: candidate.average_generalized_cost_proxy,
    p90_travel_time_proxy_minutes: candidate.p90_travel_time_proxy_minutes,
    people_flow_conflict_rate_per_1000_proxy: candidate.people_flow_conflict_rate_per_1000_proxy,
    external_car_inflow_ratio: candidate.external_car_inflow_ratio,
    max_mode_load_ratio: candidate.max_mode_load_ratio,
    capacity_overflow_person_trips: candidate.capacity_overflow_person_trips,
    accessibility_completion_proxy: candidate.accessibility_completion_proxy,
    worst_group_accessibility_gap_proxy_points: candidate.worst_group_accessibility_gap_proxy_points,
    person_km_proxy: candidate.person_km_proxy,
    vehicle_km_proxy: candidate.vehicle_km_proxy,
    air_candidate: candidate.air_candidate,
    privacy_check: candidate.privacy_check
  };
}

function compactRobustness(candidate) {
  return {
    rank: candidate.rank,
    policy_id: candidate.policy_id,
    weight_profile: candidate.weight_profile,
    nominal_gate_pass: candidate.nominal_gate_pass,
    stress_gate_count: candidate.stress_gate_count,
    robust_gate_pass: candidate.robust_gate_pass,
    worst_case_satisfaction_proxy: candidate.worst_case_satisfaction_proxy,
    worst_group_accessibility_gap_proxy_points: candidate.worst_group_accessibility_gap_proxy_points,
    worst_peak_mode_load_ratio: candidate.worst_peak_mode_load_ratio,
    mean_generalized_cost_proxy: candidate.mean_generalized_cost_proxy
  };
}

if (generated && readout) {
  const expectedAudit = {
    generated_by: 'node visual/assets/run-regional-commute-simulation.js',
    selected_policy: generated.optimization_search.selected_policy,
    selected_policy_is_not_hand_picked: generated.optimization_search.selected_policy_is_not_hand_picked,
    selection_order: generated.optimization_search.selection_order,
    hard_gate_constraints: generated.optimization_search.hard_gate_constraints,
    ranked_candidates: generated.optimization_search.ranked_candidates.map(compactCandidate),
    robustness: {
      selected_policy: generated.optimization_search.robustness_screen.selected_policy,
      selected_policy_is_not_hand_picked: generated.optimization_search.robustness_screen.selected_policy_is_not_hand_picked,
      robust_gate_pass: generated.optimization_search.robustness_screen.robust_gate_pass,
      selection_order: generated.optimization_search.robustness_screen.selection_order,
      hard_gate_constraints: generated.optimization_search.robustness_screen.hard_gate_constraints,
      ranked_candidates: generated.optimization_search.robustness_screen.ranked_candidates.map(compactRobustness)
    }
  };
  if (JSON.stringify(readout.candidate_selection_audit) !== JSON.stringify(expectedAudit)) {
    failures.push('candidate_selection_audit does not match the deterministic runner');
  }

  const expectedSelected = {
    policy_id: generated.selected_policy_readout.policy_id,
    status: generated.selected_policy_readout.status,
    population_agents: generated.selected_policy_readout.population_agents,
    agents_processed: generated.selected_policy_readout.agents_processed,
    all_agents_processed: generated.selected_policy_readout.all_agents_processed,
    mass_conservation: generated.selected_policy_readout.mass_conservation,
    air_candidate: generated.selected_policy_readout.air_candidate,
    privacy_check: generated.selected_policy_readout.privacy_check
  };
  const actualSelected = Object.fromEntries(Object.keys(expectedSelected).map((key) => [key, readout.selected_policy_readout?.[key]]));
  if (JSON.stringify(actualSelected) !== JSON.stringify(expectedSelected)) {
    failures.push('selected_policy_readout processing metadata does not match the deterministic runner');
  }
  if (!Object.values(generated.checks).every(Boolean)) {
    failures.push('regional runner checks are not all true');
  }
}

const result = {
  runner: 'run-regional-readout-audit.js',
  status: failures.length === 0 ? 'PASS' : 'FAIL',
  candidate_count: readout?.candidate_selection_audit?.ranked_candidates?.length ?? 0,
  selected_policy: readout?.candidate_selection_audit?.selected_policy ?? null,
  persisted_fields: [
    'agents_processed',
    'mass_conservation',
    'hard_gate_pass',
    'capacity_overflow_person_trips',
    'air_candidate',
    'privacy_check'
  ],
  claim_scope: 'Deterministic candidate-selection and provenance readout parity only; no local performance, operational, or ranking claim.',
  failures
};

console.log(JSON.stringify(result, null, 2));
if (process.argv.includes('--check') && result.status !== 'PASS') process.exit(1);
