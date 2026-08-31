#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const INPUTS = {
  implementation: 'visual/assets/v13-implementation.json',
  control: 'visual/assets/v14-delivery-control.json',
  simulation: 'simulation.json'
};

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function readJson(rel) {
  return JSON.parse(read(rel));
}

function sha256(rel) {
  return crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, rel))).digest('hex');
}

function roleRefs(value, found = new Set()) {
  if (typeof value === 'string') {
    for (const match of value.matchAll(/\b[AR]-P0-[A-Z]+\b/g)) found.add(match[0]);
  } else if (Array.isArray(value)) {
    for (const item of value) roleRefs(item, found);
  } else if (value && typeof value === 'object') {
    for (const item of Object.values(value)) roleRefs(item, found);
  }
  return found;
}

function isAcyclic(taskControls) {
  const graph = new Map(taskControls.map(task => [task.task_id, task.predecessors]));
  const visiting = new Set();
  const visited = new Set();
  function visit(id) {
    if (visiting.has(id)) return false;
    if (visited.has(id)) return true;
    if (!graph.has(id)) return false;
    visiting.add(id);
    for (const predecessor of graph.get(id)) if (!visit(predecessor)) return false;
    visiting.delete(id);
    visited.add(id);
    return true;
  }
  return [...graph.keys()].every(visit);
}

function closeEnough(a, b, tolerance = 0.002) {
  return Math.abs(a - b) <= tolerance;
}

function main() {
  const implementation = readJson(INPUTS.implementation);
  const control = readJson(INPUTS.control);
  const simulation = readJson(INPUTS.simulation);
  const declaredRoles = new Set(implementation.roles.map(role => role.role_id));
  const referencedRoles = roleRefs({ implementation, control });
  const missingRoles = [...referencedRoles].filter(role => !declaredRoles.has(role)).sort();
  const taskIds = implementation.tasks.map(task => task.task_id);
  const controlTaskIds = control.task_controls.map(task => task.task_id);
  const gateIds = new Set(control.external_gates.map(gate => gate.gate_id));
  const evidenceGateIds = new Set(['G0', 'G1', 'G2', 'G3', 'G4', 'G5']);
  const candidateStatusGateRefs = control.candidate_screening.candidates.flatMap(candidate =>
    [...candidate.status.matchAll(/\bG\d+\b/g)].map(match => match[0])
  );
  const selectedRoster = control.operator_commissioning.shift_scenarios.find(
    item => item.scenario_id === control.operator_commissioning.selected_working_scenario
  );
  const packagePassCount = implementation.acceptance_current_package.filter(
    item => item.current_status.startsWith('PASS')
  ).length;
  const auditPassCount = simulation.tasks.filter(task => task.audit_complete === true).length;
  const humanEquivalentPassCount = simulation.tasks.filter(task => task.human_equivalent_complete === true).length;
  const malformed = simulation.tasks.filter(task => task.dispatch_schema_valid === false);
  const externalStages = control.release_stages.filter(stage => stage.external_release);

  const checks = {
    package_version_is_v14: implementation.package_version === 'v1.4-delivery-control' && control.package_version === 'v1.4-delivery-control',
    object_id_is_stable: implementation.object_id === control.object_id && control.object_id === 'P0-ALL-STOP-01',
    preferred_candidate_is_bound_but_not_authorized: control.candidate_screening.candidates.some(item => item.candidate_id === control.candidate_screening.selected_candidate_id) && control.candidate_screening.set_out_authority === false && control.claim_boundary.authorization === 'NOT_AUTHORIZED',
    candidate_evidence_gate_refs_are_valid: control.candidate_screening.candidates.every(candidate => Array.isArray(candidate.required_evidence_gate_ids) && candidate.required_evidence_gate_ids.length > 0 && candidate.required_evidence_gate_ids.every(id => evidenceGateIds.has(id))) && candidateStatusGateRefs.every(id => evidenceGateIds.has(id)),
    all_referenced_roles_are_declared: missingRoles.length === 0,
    declared_role_count_is_17: declaredRoles.size === 17,
    twelve_tasks_match_control_register: taskIds.length === 12 && new Set(taskIds).size === 12 && controlTaskIds.length === 12 && taskIds.every(id => controlTaskIds.includes(id)),
    task_dependencies_are_acyclic: isAcyclic(control.task_controls),
    every_task_has_one_accountable_role: control.task_controls.every(task => typeof task.accountable === 'string' && declaredRoles.has(task.accountable)),
    every_task_has_responsible_consulted_informed_arrays: control.task_controls.every(task => ['responsible', 'consulted', 'informed'].every(key => Array.isArray(task[key]))),
    package_checks_are_8_of_8_pass: implementation.acceptance_current_package.length === 8 && packagePassCount === 8,
    field_checks_remain_12_of_12_hold: implementation.acceptance_field.length === 12 && implementation.acceptance_field.every(item => item.current_status.startsWith('HOLD')),
    audit_records_are_12_of_12: simulation.tasks.length === 12 && auditPassCount === 12,
    ai_off_human_equivalence_is_12_of_12: simulation.tasks.length === 12 && humanEquivalentPassCount === 12,
    malformed_input_is_audited_hold: malformed.length === 1 && malformed[0].audit_complete === true && malformed[0].human_equivalent_complete === true && malformed[0].outcome === 'malformed_dispatch_audited_hold_success',
    selected_roster_has_zero_uncovered_hours: selectedRoster && selectedRoster.uncovered_hours === 0,
    selected_roster_has_explicit_noncommitment_basis: typeof control.operator_commissioning.selection_basis === 'string' && control.operator_commissioning.selection_basis.includes('middle working case') && control.operator_commissioning.selected_service_window_assumption.includes('not an operator commitment'),
    roster_calculations_are_recomputable: control.operator_commissioning.shift_scenarios.every(item => closeEnough(item.calculated_fte, item.annual_staffed_hours / control.operator_commissioning.productive_hours_per_fte_year * control.operator_commissioning.leave_training_factor)),
    roster_rounds_up_working_fte: control.operator_commissioning.shift_scenarios.every(item => item.working_roster_fte === Math.ceil(item.calculated_fte)),
    ai_never_outopens_human_service: control.operator_commissioning.service_rule.includes('must never exceed') && control.operator_commissioning.hot_backup.outage_rule.includes('close the AI channel'),
    cost_bands_are_ordered_and_nonzero: ['capex_rom_cny', 'annual_opex_cny'].every(key => {
      const band = control.working_cost_sensitivity[key];
      return band.low > 0 && band.low < band.base && band.base < band.high;
    }),
    cost_claims_remain_nonformal: control.working_cost_sensitivity.formal_estimate_cny === null && control.working_cost_sensitivity.tender_price_cny === null && control.working_cost_sensitivity.funding_commitment_cny === null && control.working_cost_sensitivity.vendor_quote_count === 0 && implementation.cost_model.formal_total === null,
    boq_has_16_traceable_lines: implementation.boq.length === 16 && implementation.boq.every(item => item.boq_id && item.derivation && item.unit_rate === null),
    six_procurement_lots_have_quantity_acceptance_and_hold: control.working_cost_sensitivity.lots.length === 6 && control.working_cost_sensitivity.lots.every(lot => lot.quantity_basis && lot.acceptance && lot.status === 'unpriced_hold'),
    twelve_external_gates_are_fail_closed: control.external_gates.length === 12 && control.external_gates.every(gate => gate.status === 'HOLD' && gate.receipt_id === null && declaredRoles.has(gate.accountable_role)),
    seven_release_stages_have_no_false_external_release: control.release_stages.length === 7 && externalStages.length === 6 && externalStages.every(stage => stage.status === 'HOLD' && stage.required_gate_ids.every(id => gateIds.has(id))),
    two_key_roles_are_distinct_and_unappointed: control.two_key_control.rights_safety_keyholder_role !== control.two_key_control.service_equivalence_keyholder_role && control.two_key_control.current_keyholders.length === 0 && control.two_key_control.status === 'HOLD_UNAPPOINTED',
    four_alternatives_bind_valid_fallback_gates: control.alternatives.length === 4 && control.alternatives.every(item => gateIds.has(item.fallback_gate_id) && item.status === 'participant_design_comparison_not_approval'),
    eleven_urban_renewal_modules_are_mapped: control.urban_renewal_module_map.modules.length === 11 && control.urban_renewal_module_map.modules.every(item => item.status === 'mapped_design_time_hold_external'),
    no_external_evidence_is_fabricated: ['named_operator_count', 'named_role_appointment_count', 'field_measurement_count', 'vendor_quote_count'].every(key => control.claim_boundary[key] === 0) && control.claim_boundary.site_release === 'HOLD' && control.claim_boundary.construction_release === 'HOLD' && control.claim_boundary.opening_release === 'HOLD'
  };

  const failedChecks = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
  const receipt = {
    schema_version: '1.0.0',
    method_version: 'slow-line-v14-delivery-control-verifier/v1',
    package_version: control.package_version,
    object_id: control.object_id,
    status: failedChecks.length === 0 ? 'pass' : 'fail',
    input_sha256: Object.fromEntries(Object.entries(INPUTS).map(([name, rel]) => [name, { path: rel, sha256: sha256(rel) }])),
    checks,
    failed_checks: failedChecks,
    summary: {
      declared_role_count: declaredRoles.size,
      missing_role_count: missingRoles.length,
      task_count: taskIds.length,
      package_pass_count: packagePassCount,
      package_hold_count: implementation.acceptance_current_package.length - packagePassCount,
      field_hold_count: implementation.acceptance_field.filter(item => item.current_status.startsWith('HOLD')).length,
      audit_complete_count: auditPassCount,
      ai_off_human_equivalent_count: humanEquivalentPassCount,
      selected_working_roster_fte: selectedRoster ? selectedRoster.working_roster_fte : null,
      external_gate_hold_count: control.external_gates.filter(gate => gate.status === 'HOLD').length,
      external_release_stage_hold_count: externalStages.filter(stage => stage.status === 'HOLD').length,
      alternative_count: control.alternatives.length,
      urban_renewal_module_count: control.urban_renewal_module_map.modules.length
    },
    claim: control.claim_boundary.note_en
  };

  const outputPath = path.join(__dirname, 'v14-verification.json');
  fs.writeFileSync(outputPath, JSON.stringify(receipt, null, 2) + '\n');
  process.stdout.write(JSON.stringify(receipt, null, 2) + '\n');
  if (failedChecks.length) process.exitCode = 1;
}

main();
