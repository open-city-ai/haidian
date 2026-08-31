#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const INPUTS = {
  implementation: 'visual/assets/v13-implementation.json',
  delivery_control: 'visual/assets/v14-delivery-control.json',
  execution_kit: 'visual/assets/v15-execution-kit.json',
  workbook: 'assets/media/p0-execution-workbook.md'
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

function sorted(values) {
  return [...values].sort();
}

function sameSet(actual, expected) {
  return JSON.stringify(sorted(actual)) === JSON.stringify(sorted(expected));
}

function main() {
  execFileSync(process.execPath, [path.join(__dirname, 'verify-v14.js')], { stdio: ['ignore', 'ignore', 'inherit'] });

  const implementation = readJson(INPUTS.implementation);
  const control = readJson(INPUTS.delivery_control);
  const kit = readJson(INPUTS.execution_kit);
  const workbook = read(INPUTS.workbook);
  const declaredRoles = new Set(implementation.roles.map(item => item.role_id));
  const rawMetricIds = implementation.acceptance_field.map(item => item.metric_id);
  const gateIds = control.external_gates.map(item => item.gate_id);
  const formIds = kit.forms.map(item => item.form_id);
  const bundleRawIds = kit.external_decision_bundles.flatMap(item => item.raw_field_metric_ids);
  const bundleGateIds = kit.external_decision_bundles.flatMap(item => item.external_gate_ids);
  const bundleFormIds = kit.external_decision_bundles.flatMap(item => item.required_form_ids);
  const requiredFieldIds = kit.forms.flatMap(item => item.required_fields);
  const maintenanceFrequencies = kit.maintenance_cycles.map(item => item.frequency);

  const checks = {
    version_and_claim_boundary_are_explicit:
      kit.package_version === 'v1.5-professional-handoff' &&
      kit.artifact_status === 'blank_handoff_forms_not_executed_evidence' &&
      kit.claim_boundary.authorization === 'NOT_AUTHORIZED' &&
      kit.claim_boundary.release === 'HOLD',
    no_external_evidence_is_fabricated:
      ['current_actual_record_count', 'current_field_result_count', 'current_named_signatory_count', 'current_verified_cost_input_count', 'current_verified_external_record_count']
        .every(key => kit.claim_boundary[key] === 0),
    eighteen_common_receipt_fields_are_unique:
      kit.common_record_fields.length === 18 && new Set(kit.common_record_fields).size === 18 &&
      ['version', 'source_party', 'method', 'limitations', 'missingness', 'rights_basis', 'conflict_of_interest', 'independent_reviewer', 'signatory', 'sha256']
        .every(key => kit.common_record_fields.includes(key)),
    seven_forms_are_unique_and_fillable:
      kit.forms.length === 7 && new Set(formIds).size === 7 &&
      kit.forms.every(form => form.title_zh && form.title_en && form.required_fields.length >= 12 && new Set(form.required_fields).size === form.required_fields.length),
    every_form_role_is_declared:
      kit.forms.every(form => form.responsible_roles.every(role => declaredRoles.has(role))),
    four_external_decision_bundles_remain_hold:
      kit.external_decision_bundles.length === 4 && kit.external_decision_bundles.every(item => item.status === 'HOLD'),
    four_bundles_cover_all_twelve_raw_field_metrics_once:
      bundleRawIds.length === 12 && new Set(bundleRawIds).size === 12 && sameSet(bundleRawIds, rawMetricIds),
    four_bundles_cover_all_twelve_external_gates_once:
      bundleGateIds.length === 12 && new Set(bundleGateIds).size === 12 && sameSet(bundleGateIds, gateIds),
    bundle_form_refs_and_decision_owners_are_valid:
      bundleFormIds.every(id => formIds.includes(id)) && kit.external_decision_bundles.every(item => declaredRoles.has(item.decision_owner_role)),
    capacity_egress_is_formula_not_false_result:
      kit.capacity_egress_template.template_count === 1 &&
      kit.capacity_egress_template.capacity_formula.startsWith('min(') &&
      kit.capacity_egress_template.calculated_capacity === null &&
      kit.capacity_egress_template.concept_independent_egress_route_count === 2 &&
      kit.capacity_egress_template.field_verified_independent_egress_route_count === 0 &&
      kit.capacity_egress_template.verified_egress_clear_width_m === null &&
      kit.capacity_egress_template.status.startsWith('HOLD_'),
    four_maintenance_cycles_cover_lifecycle:
      kit.maintenance_cycles.length === 4 && sameSet(maintenanceFrequencies, ['before_each_opening', 'weekly', 'quarterly_or_after_major_change', 'annual_or_before_renewal']) &&
      kit.maintenance_cycles.every(item => item.status === 'template_not_executed'),
    restoration_reserve_is_parameterized_but_unfunded:
      kit.restoration_reserve_template.template_count === 1 &&
      kit.restoration_reserve_template.reserve_ratio_low === 0.1 &&
      kit.restoration_reserve_template.reserve_ratio_high === 0.2 &&
      kit.restoration_reserve_template.verified_removable_capex === null &&
      kit.restoration_reserve_template.calculated_reserve === null &&
      kit.restoration_reserve_template.ring_fenced_funding === false &&
      kit.restoration_reserve_template.status.startsWith('HOLD_'),
    workbook_exposes_all_forms_and_decision_bundles:
      formIds.every(id => workbook.includes(`\`${id}\``)) &&
      kit.external_decision_bundles.every(item => workbook.includes(`\`${item.bundle_id}\``)) &&
      workbook.includes('允许同时使用人数 = min(') && workbook.includes('恢复储备 = 经核可拆 CAPEX × 10%–20%'),
    workbook_and_machine_fields_have_no_duplicate_form_fields:
      kit.forms.every(form => new Set(form.required_fields).size === form.required_fields.length)
  };

  const failedChecks = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
  const receipt = {
    schema_version: '1.0.0',
    method_version: 'slow-line-v15-professional-handoff-verifier/v1',
    package_version: kit.package_version,
    object_id: implementation.object_id,
    status: failedChecks.length === 0 ? 'pass' : 'fail',
    input_sha256: Object.fromEntries(Object.entries(INPUTS).map(([name, rel]) => [name, { path: rel, sha256: sha256(rel) }])),
    checks,
    failed_checks: failedChecks,
    summary: {
      execution_form_count: kit.forms.length,
      form_specific_required_field_count: requiredFieldIds.length,
      common_receipt_field_count: kit.common_record_fields.length,
      external_decision_bundle_count: kit.external_decision_bundles.length,
      raw_field_metric_count: bundleRawIds.length,
      external_gate_count: bundleGateIds.length,
      capacity_egress_template_count: kit.capacity_egress_template.template_count,
      maintenance_cycle_count: kit.maintenance_cycles.length,
      restoration_reserve_template_count: kit.restoration_reserve_template.template_count,
      verified_external_record_count: kit.claim_boundary.current_verified_external_record_count
    },
    claim: kit.claim_boundary.note_en
  };

  const output = path.join(__dirname, 'v15-verification.json');
  fs.writeFileSync(output, JSON.stringify(receipt, null, 2) + '\n');
  process.stdout.write(JSON.stringify(receipt, null, 2) + '\n');
  if (failedChecks.length) process.exitCode = 1;
}

main();
