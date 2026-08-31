#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const input = process.argv.find((arg) => arg.endsWith(".json")) || path.join(__dirname, "fp01-delivery-control.json");
const artifact = JSON.parse(fs.readFileSync(input, "utf8"));
const checks = [];

function check(id, label, condition) {
  checks.push({ id, label, status: condition ? "pass" : "fail" });
}

function unique(values) {
  return new Set(values).size === values.length;
}

function allNull(object, keys) {
  return keys.every((key) => object[key] === null);
}

check(
  "envelope",
  "V0.15 delivery-control artifact retained in the V0.17 bilingual package",
  artifact.schema_version === "0.3.0" &&
    artifact.artifact_id === "FP01-DELIVERY-CONTROL-001" &&
    artifact.artifact_version === "v0.15" &&
    artifact.artifact_status === "concept_delivery_control_model_unexecuted" &&
    Boolean(artifact.title_zh) &&
    Boolean(artifact.title_en)
);

const boundary = artifact.claim_boundary || {};
check(
  "claim_boundary",
  "no survey, actual quantity, price, budget, entity, sign-off, or field result is claimed",
  [
    "actual_site_dimensions_verified",
    "actual_quantity_verified",
    "unit_price_verified",
    "budget_authorized",
    "named_entity_committed",
    "professional_signoff_obtained",
    "field_result_obtained"
  ].every((key) => boundary[key] === false) && Boolean(boundary.zh) && Boolean(boundary.en)
);

const prototypes = artifact.three_key_area_interface_prototypes || [];
check(
  "three_area_interfaces",
  "three distinct concept interfaces retain null site and professional evidence",
  prototypes.length === 3 &&
    unique(prototypes.map((item) => item.area_id)) &&
    prototypes.every((item) =>
      item.status === "pending_site_and_professional_evidence" &&
      item.reference_test_envelope &&
      item.reference_test_envelope.status === "concept_design_test_envelope_not_site_dimension" &&
      Number(item.reference_test_envelope.length_m) > 0 &&
      Number(item.reference_test_envelope.width_m) > 0 &&
      Array.isArray(item.component_refs) &&
      item.component_refs.length > 0 &&
      allNull(item, ["actual_site_dimension_m", "survey_reference", "professional_review_reference"])
    )
);

const methods = artifact.d0_measurement_methods || [];
check(
  "d0_methods",
  "six D0 methods define event boundaries, formula, missingness, and reporting without actuals",
  methods.length === 6 &&
    unique(methods.map((item) => item.baseline_id)) &&
    methods.every((item) =>
      item.status === "method_defined_actual_pending" &&
      Boolean(item.observation_start) &&
      Boolean(item.observation_end) &&
      Boolean(item.formula) &&
      Boolean(item.missingness_rule) &&
      Boolean(item.reporting) &&
      item.actual_sample_size === null &&
      item.actual_value === null
    )
);

const observation = artifact.formative_observation_protocol || {};
check(
  "formative_boundary",
  "planned formative floor is explicit and is not represented as a real sample or statistical proof",
  observation.status === "concept_protocol_requires_ethics_operator_and_user_review" &&
    observation.planned_minimum_valid_task_sessions === 30 &&
    observation.planned_minimum_service_days === 3 &&
    Array.isArray(observation.coverage_requirements) &&
    observation.coverage_requirements.length >= 6 &&
    Boolean(observation.inference_boundary_zh) &&
    Boolean(observation.inference_boundary_en) &&
    allNull(observation, ["actual_valid_task_sessions", "actual_service_days", "protocol_approval_reference"])
);

const raci = artifact.hold_point_raci || [];
check(
  "raci",
  "H0-H4 each have role-class RACI and empty external sign-off slots",
  raci.length === 5 &&
    JSON.stringify(raci.map((item) => item.hold_point_id)) === JSON.stringify(["H0", "H1", "H2", "H3", "H4"]) &&
    raci.every((item) =>
      ["accountable", "responsible", "consulted", "informed"].every((key) => Array.isArray(item[key]) && item[key].length > 0) &&
      typeof item.decision_owner_role === "string" &&
      item.decision_owner_role.length > 0 &&
      item.accountable.length === 1 &&
      item.accountable[0] === item.decision_owner_role &&
      Array.isArray(item.required_cosignatory_roles) &&
      item.required_cosignatory_roles.length > 0 &&
      item.status === "roles_defined_signoff_pending" &&
      allNull(item, ["signatory_name", "acceptance_date"])
    )
);

const roleClasses = [...new Set(raci.flatMap((item) => [
  ...item.accountable,
  ...item.responsible,
  ...item.consulted,
  ...item.informed,
  item.decision_owner_role,
  ...item.required_cosignatory_roles
]))];
check(
  "role_class_register",
  "sixteen role classes are registered while appointments and signatures remain external",
  roleClasses.length === 16
);

const boq = artifact.concept_installation_boq || {};
const boqItems = boq.items || [];
check(
  "design_test_boq",
  "M01-M06 have positive design-test quantities while actual quantities and prices remain null",
  boq.status === "design_test_quantities_only_not_actual_boq" &&
    boqItems.length === 6 &&
    JSON.stringify(boqItems.map((item) => item.component_ref)) === JSON.stringify(["M01", "M02", "M03", "M04", "M05", "M06"]) &&
    boqItems.every((item) =>
      Number(item.design_test_quantity) > 0 &&
      allNull(item, ["actual_quantity", "verified_unit_cost_cny", "verified_amount_cny"])
    )
);

check(
  "cost_boundary",
  "cost breakdown and calculation rule exist without invented budget, funding, route, or sign-off",
  Array.isArray(boq.cost_breakdown_structure) &&
    boq.cost_breakdown_structure.length === 7 &&
    Boolean(boq.calculation_rule) &&
    Boolean(boq.cost_basis_requirement) &&
    allNull(boq, [
      "capital_budget_amount_cny",
      "operating_budget_amount_cny",
      "contingency_amount_cny",
      "funding_source",
      "procurement_route",
      "legal_review_reference",
      "budget_authority_signoff"
    ])
);

const steps = artifact.critical_dependency_path || [];
const stepIds = steps.map((item) => item.step_id);
check(
  "critical_path",
  "ten ordered dependencies use valid references and retain empty actual dates",
  steps.length === 10 &&
    unique(stepIds) &&
    steps.every((item) =>
      Array.isArray(item.depends_on) &&
      item.depends_on.every((dependency) => stepIds.includes(dependency)) &&
      Array.isArray(item.may_run_in_parallel_with) &&
      item.may_run_in_parallel_with.every((parallel) => stepIds.includes(parallel)) &&
      item.status === "not_started" &&
      allNull(item, ["actual_start", "actual_finish"])
    )
);

const index = new Map(steps.map((item, position) => [item.step_id, position]));
check(
  "dependency_order",
  "every dependency precedes its consumer and no self-dependency is present",
  steps.every((item) => item.depends_on.every((dependency) => index.get(dependency) < index.get(item.step_id)))
);

const handoff = artifact.jury_implementation_handoff || {};
const preFeasibility = handoff.pre_feasibility_decision_package || {};
const interfaceScale = preFeasibility.component_interface_scale_1_20 || {};
check(
  "component_interface_1_20",
  "1:20 component-interface scale is an original non-normative envelope with no external actuals",
  interfaceScale.scale_id === "SCALE-1-20" &&
    interfaceScale.status === "participant_original_component_interface_design_envelope_not_site_or_code_dimension" &&
    JSON.stringify(interfaceScale.component_refs) === JSON.stringify(["M01", "M02", "M03", "M04", "M05", "M06"]) &&
    Number(interfaceScale.reference_interface_bay_width_m) > 0 &&
    Number(interfaceScale.reference_interface_bay_depth_m) > 0 &&
    Array.isArray(interfaceScale.reference_component_height_band_m) &&
    allNull(interfaceScale, ["actual_component_dimensions", "survey_reference", "code_review_reference", "professional_signoff_reference"])
);

const parameterEnvelopes = preFeasibility.original_parameter_envelopes || [];
check(
  "original_parameter_envelopes",
  "two original architectural and spatial parameter envelopes remain non-normative and unverified",
  parameterEnvelopes.length === 2 &&
    unique(parameterEnvelopes.map((item) => item.envelope_id)) &&
    parameterEnvelopes.every((item) => Boolean(item.name_zh) && Boolean(item.name_en) && item.design_range && item.status.includes("participant_original_design_envelope") && item.external_actual === null)
);

const capacityEgress = preFeasibility.capacity_and_egress_envelope || {};
check(
  "capacity_egress_envelope",
  "capacity and egress parameters are a calculation envelope with approval inputs empty",
  capacityEgress.status === "participant_design_test_envelope_not_occupancy_or_life_safety_approval" &&
    Number(capacityEgress.reference_gross_area_sqm) > 0 &&
    Array.isArray(capacityEgress.design_net_to_gross_ratio_range) &&
    Array.isArray(capacityEgress.design_area_per_concurrent_person_sqm_range) &&
    Number(capacityEgress.conceptual_independent_exit_path_count) === 2 &&
    Boolean(capacityEgress.capacity_formula) &&
    Boolean(capacityEgress.egress_release_rule) &&
    allNull(capacityEgress, ["surveyed_net_usable_area_sqm", "approved_area_per_person_sqm", "approved_life_safety_occupancy", "verified_accessible_service_position_capacity", "verified_egress_capacity", "fire_life_safety_review_reference", "accessibility_review_reference"])
);

const staffing = preFeasibility.staffing_and_fte_template || {};
check(
  "staffing_fte_template",
  "staffing and FTE ranges are a calculation template without operator, roster, or approved inputs",
  staffing.status === "participant_calculation_template_not_roster_or_staffing_commitment" &&
    Array.isArray(staffing.public_window_hours_per_week_design_range) &&
    staffing.concurrent_operating_role_count === 3 &&
    Array.isArray(staffing.productive_hours_per_fte_week_design_range) &&
    Array.isArray(staffing.relief_factor_design_range) &&
    Boolean(staffing.operating_fte_formula) &&
    Array.isArray(staffing.illustrative_operating_fte_range) &&
    allNull(staffing, ["named_operator", "approved_public_window_hours_per_week", "approved_productive_hours_per_fte_week", "approved_relief_factor", "approved_operating_fte", "approved_independent_evaluation_fte", "approved_roster_reference"])
);

const rom = preFeasibility.rom_capex_opex_sensitivity || {};
const romScenarios = rom.sensitivity_scenarios || [];
check(
  "rom_sensitivity",
  "ROM CAPEX/OPEX uses dimensionless sensitivity ranges and no quotation, estimate, budget, or CNY actual",
  rom.status === "order_of_magnitude_design_sensitivity_only_not_quote_budget_or_formal_estimate" &&
    rom.currency_amounts_supplied === false &&
    Array.isArray(rom.capex_multiplier_range) &&
    Array.isArray(rom.opex_multiplier_range) &&
    romScenarios.length === 3 &&
    unique(romScenarios.map((item) => item.scenario_id)) &&
    Boolean(rom.sensitivity_rule) &&
    allNull(rom, ["verified_base_capex_cny", "verified_base_opex_cny_per_year", "rom_capex_cny", "rom_opex_cny_per_year", "quotation_reference", "formal_estimate_reference", "budget_authority_signoff"])
);

const reserve = preFeasibility.exit_restoration_reserve_template || {};
check(
  "exit_restoration_reserve",
  "exit-restoration reserve is a ratio template with no verified cost or funded amount",
  reserve.status === "participant_reserve_ratio_template_not_funded_reserve_or_cost_estimate" &&
    Array.isArray(reserve.reserve_ratio_of_future_verified_removable_capex_range) &&
    Boolean(reserve.calculation_rule) &&
    Boolean(reserve.release_rule) &&
    allNull(reserve, ["approved_reserve_ratio", "verified_removable_capex_cny", "verified_site_specific_restoration_allowance_cny", "funded_exit_restoration_reserve_cny", "reserve_signoff_reference"])
);

const maintenanceCycles = preFeasibility.maintenance_cycle_register || [];
check(
  "maintenance_cycles",
  "daily, weekly, quarterly, and annual maintenance cycles have no fabricated records",
  JSON.stringify(maintenanceCycles.map((item) => item.cycle_id)) === JSON.stringify(["CYCLE-DAY", "CYCLE-WEEK", "CYCLE-QUARTER", "CYCLE-YEAR"]) &&
    maintenanceCycles.every((item) => Boolean(item.frequency) && Boolean(item.scope) && Boolean(item.required_evidence) && item.actual_record === null && item.status === "template_only")
);

const alternativeMatrix = preFeasibility.gate_cost_permission_alternative_matrix || [];
check(
  "gate_cost_permission_alternatives",
  "four alternatives map gates, cost tradeoffs, and permission tradeoffs without approval",
  JSON.stringify(alternativeMatrix.map((item) => item.alternative_id)) === JSON.stringify(["ALT01", "ALT02", "ALT03", "ALT04"]) &&
    alternativeMatrix.every((item) => Array.isArray(item.gate_refs) && item.gate_refs.length > 0 && Boolean(item.cost_tradeoff) && Boolean(item.permission_tradeoff))
);

const evidenceReceipt = preFeasibility.external_evidence_receipt_template || {};
const receiptFields = evidenceReceipt.fields || [];
check(
  "bilingual_evidence_receipt",
  "external-evidence receipt has eighteen bilingual provenance, rights, review, disposition, date, and hash fields with no accepted actual",
  evidenceReceipt.status === "bilingual_template_only_no_external_receipt_accepted" &&
    evidenceReceipt.required_field_count === 18 &&
    receiptFields.length === 18 &&
    unique(receiptFields.map((item) => item.field_id)) &&
    receiptFields.every((item) => Boolean(item.label_zh) && Boolean(item.label_en) && item.actual_value === null) &&
    evidenceReceipt.accepted_external_receipt_count === 0 &&
    evidenceReceipt.verified_external_receipt_count === 0 &&
    evidenceReceipt.release_state === "HOLD"
);

const preFeasibilityActuals = preFeasibility.external_actual_state || {};
check(
  "pre_feasibility_external_actuals",
  "all pre-feasibility external actual counters remain zero and external release remains HOLD",
  [
    "actual_site_or_component_dimension_count",
    "approved_capacity_count",
    "approved_fte_input_count",
    "verified_rom_cost_input_count",
    "funded_exit_reserve_count",
    "maintenance_actual_record_count",
    "selected_alternative_count",
    "accepted_external_receipt_count",
    "verified_external_signoff_count",
    "external_release_granted_count"
  ].every((key) => preFeasibilityActuals[key] === 0) && preFeasibilityActuals.release_state === "HOLD"
);

const scale = handoff.scale_and_capacity_template || {};
check(
  "scale_capacity_template",
  "four-scale reference chain and two-position service formula remain design assumptions with capacity actuals empty",
  Array.isArray(scale.source_scale_ids) &&
    JSON.stringify(scale.source_scale_ids) === JSON.stringify(["SCALE-1-500", "SCALE-1-100", "SCALE-1-50", "SCALE-1-20"]) &&
    scale.reference_module_width_m === 18 &&
    scale.reference_module_depth_m === 12 &&
    scale.reference_module_area_sqm === 216 &&
    scale.reference_service_positions_per_set === 2 &&
    scale.reference_status === "participant_design_test_assumption_not_survey_or_capacity_commitment" &&
    allNull(scale, ["approved_occupancy_limit", "observed_service_throughput_per_staffed_hour"])
);

const coverage = handoff.operating_coverage_template || {};
check(
  "operating_coverage_template",
  "three concurrent operating role classes and an independent evaluator are defined without a named roster",
  coverage.status === "participant_reference_not_staffing_commitment" &&
    Array.isArray(coverage.public_window_required_role_classes) &&
    coverage.public_window_required_role_classes.length === 3 &&
    unique(coverage.public_window_required_role_classes) &&
    Boolean(coverage.independent_role_class) &&
    Boolean(coverage.coverage_formula) &&
    allNull(coverage, ["named_operator", "named_staff", "approved_roster", "actual_service_window_count", "actual_coverage_ratio"])
);

const costPlan = handoff.parameterized_cost_plan || {};
const costClasses = [
  ...(costPlan.capital_classes || []),
  ...(costPlan.operating_classes || []),
  ...(costPlan.exit_and_reserve_classes || [])
];
check(
  "parameterized_cost_plan",
  "seven cost classes and a calculation rule are explicit while all verified inputs and approvals remain empty",
  costPlan.status === "cost_structure_only_no_zero_cost_claim" &&
    costClasses.length === 7 &&
    unique(costClasses) &&
    Boolean(costPlan.calculation_rule) &&
    costPlan.verified_cost_input_count === 0 &&
    allNull(costPlan, [
      "capital_amount_cny",
      "operating_amount_cny",
      "exit_restoration_amount_cny",
      "funding_source",
      "procurement_route",
      "budget_signoff"
    ])
);

const maintenance = handoff.maintenance_and_exit_controls || [];
check(
  "maintenance_exit_controls",
  "four trigger-based maintenance and exit controls are reviewable without fabricated operating records",
  maintenance.length === 4 &&
    JSON.stringify(maintenance.map((item) => item.control_id)) === JSON.stringify(["MNT01", "MNT02", "MNT03", "MNT04"]) &&
    maintenance.every((item) => Boolean(item.trigger) && Boolean(item.required_action) && Boolean(item.evidence_required) && item.actual_record === null && item.status === "template_only")
);

const acceptance = handoff.acceptance_indicator_register || [];
const reviewableAcceptance = acceptance.filter((item) => item.reviewable_now === true);
const fieldAcceptance = acceptance.filter((item) => item.reviewable_now === false);
check(
  "acceptance_register",
  "twelve indicators distinguish eight structure checks from four field-dependent checks",
  acceptance.length === 12 &&
    unique(acceptance.map((item) => item.indicator_id)) &&
    reviewableAcceptance.length === 8 &&
    reviewableAcceptance.every((item) => item.assessment_scope === "proposal_structure" && item.current_result === "structurally_reviewable" && item.external_release_effect === false) &&
    fieldAcceptance.length === 4 &&
    fieldAcceptance.every((item) => item.assessment_scope === "field_evidence" && item.current_result === null && item.external_release_effect === true && Array.isArray(item.required_hold_points) && item.required_hold_points.length > 0)
);

const releases = handoff.conditional_release_stages || [];
check(
  "conditional_release_stages",
  "six release stages remain closed to external action",
  releases.length === 6 &&
    JSON.stringify(releases.map((item) => item.stage_id)) === JSON.stringify(["REL00", "REL01", "REL02", "REL03", "REL04", "REL05"]) &&
    releases.every((item, index) => item.external_release_granted === false && item.status === (index === 0 ? "current" : "hold") && Array.isArray(item.required_hold_points))
);

const alternatives = handoff.fallback_alternatives_register || [];
check(
  "fallback_alternatives",
  "four reversible alternatives preserve rights without authorizing site action",
  alternatives.length === 4 &&
    JSON.stringify(alternatives.map((item) => item.alternative_id)) === JSON.stringify(["ALT01", "ALT02", "ALT03", "ALT04"]) &&
    alternatives.every((item) =>
      Boolean(item.trigger) &&
      Boolean(item.fallback_option) &&
      Array.isArray(item.rights_preserved) &&
      item.rights_preserved.length > 0 &&
      item.site_action_allowed === false &&
      item.selection_authority === null &&
      item.status === "participant_reference_not_approval"
    )
);

const actionBoundary = handoff.current_package_action_boundary || {};
check(
  "action_boundary",
  "the package documents no authorized site, service, user-data, procurement, construction, or external-release action",
  [
    "documented_authorized_site_action_count",
    "documented_public_service_window_count",
    "documented_real_user_session_count",
    "documented_procurement_count",
    "documented_construction_count",
    "documented_external_release_granted_count"
  ].every((key) => actionBoundary[key] === 0) && Boolean(actionBoundary.rule)
);

const claims = artifact.structural_claims || {};
check(
  "structural_claims",
  "declared structural counts reconcile and external actual counts remain zero",
  claims.key_area_interface_prototype_count === prototypes.length &&
    claims.d0_measurement_method_count === methods.length &&
    claims.d0_measurement_method_coverage_ratio === 1.0 &&
    claims.hold_point_raci_count === raci.length &&
    claims.hold_point_raci_coverage_ratio === 1.0 &&
    claims.design_test_boq_item_count === boqItems.length &&
    claims.critical_dependency_step_count === steps.length &&
    claims.delivery_role_class_count === roleClasses.length &&
    claims.acceptance_indicator_count === acceptance.length &&
    claims.immediately_judgeable_acceptance_indicator_count === reviewableAcceptance.length &&
    claims.field_dependent_acceptance_indicator_count === fieldAcceptance.length &&
    claims.release_stage_count === releases.length &&
    claims.external_release_granted_count === releases.filter((item) => item.external_release_granted === true).length &&
    claims.fallback_alternative_count === alternatives.length &&
    claims.cost_plan_class_count === costClasses.length &&
    claims.verified_cost_input_count === costPlan.verified_cost_input_count &&
    claims.documented_authorized_site_action_count === actionBoundary.documented_authorized_site_action_count &&
    claims.actual_boq_verified_item_count === 0 &&
    claims.verified_external_signoff_count === 0 &&
    claims.component_interface_scale_count === scale.source_scale_ids.length &&
    claims.original_parameter_envelope_count === parameterEnvelopes.length &&
    claims.capacity_egress_template_count === 1 &&
    claims.staffing_fte_template_count === 1 &&
    claims.rom_sensitivity_scenario_count === romScenarios.length &&
    claims.exit_restoration_reserve_template_count === 1 &&
    claims.maintenance_cycle_count === maintenanceCycles.length &&
    claims.gate_cost_permission_alternative_mapping_ratio === 1.0 &&
    alternativeMatrix.length === alternatives.length &&
    claims.external_evidence_receipt_required_field_count === receiptFields.length &&
    claims.accepted_external_evidence_receipt_count === evidenceReceipt.accepted_external_receipt_count &&
    claims.pre_feasibility_external_release_granted_count === preFeasibilityActuals.external_release_granted_count
);

check(
  "verification",
  "standard-library verifier metadata and bounded PASS claim",
  artifact.verification &&
    artifact.verification.script === "visual/assets/verify-fp01-delivery-control.js" &&
    artifact.verification.runtime === "Node.js standard library only" &&
    Boolean(artifact.verification.pass_claim)
);

const failed = checks.filter((item) => item.status === "fail");
const result = {
  status: failed.length === 0 ? "pass" : "fail",
  artifact_id: artifact.artifact_id,
  artifact_version: artifact.artifact_version,
  checks_passed: checks.length - failed.length,
  checks_total: checks.length,
  key_area_interface_prototype_count: prototypes.length,
  d0_measurement_method_count: methods.length,
  hold_point_raci_count: raci.length,
  design_test_boq_item_count: boqItems.length,
  critical_dependency_step_count: steps.length,
  delivery_role_class_count: roleClasses.length,
  acceptance_indicator_count: acceptance.length,
  immediately_judgeable_acceptance_indicator_count: reviewableAcceptance.length,
  field_dependent_acceptance_indicator_count: fieldAcceptance.length,
  release_stage_count: releases.length,
  external_release_granted_count: claims.external_release_granted_count,
  fallback_alternative_count: alternatives.length,
  cost_plan_class_count: costClasses.length,
  verified_cost_input_count: costPlan.verified_cost_input_count,
  documented_authorized_site_action_count: actionBoundary.documented_authorized_site_action_count,
  actual_boq_verified_item_count: claims.actual_boq_verified_item_count,
  verified_external_signoff_count: claims.verified_external_signoff_count,
  component_interface_scale_count: claims.component_interface_scale_count,
  original_parameter_envelope_count: parameterEnvelopes.length,
  capacity_egress_template_count: claims.capacity_egress_template_count,
  staffing_fte_template_count: claims.staffing_fte_template_count,
  rom_sensitivity_scenario_count: romScenarios.length,
  exit_restoration_reserve_template_count: claims.exit_restoration_reserve_template_count,
  maintenance_cycle_count: maintenanceCycles.length,
  gate_cost_permission_alternative_mapping_ratio: claims.gate_cost_permission_alternative_mapping_ratio,
  external_evidence_receipt_required_field_count: receiptFields.length,
  accepted_external_evidence_receipt_count: evidenceReceipt.accepted_external_receipt_count,
  pre_feasibility_external_release_granted_count: preFeasibilityActuals.external_release_granted_count,
  checks,
  disclaimer: "Structural PASS only: no site, actual quantity, unit price, budget, entity, sign-off, authorization, field result, or implementation is verified."
};

process.stdout.write(`${JSON.stringify(result, null, process.argv.includes("--json") ? 2 : 0)}\n`);
process.exitCode = failed.length === 0 ? 0 : 1;
