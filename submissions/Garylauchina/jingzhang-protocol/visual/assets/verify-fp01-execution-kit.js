#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const input = process.argv.find((arg) => arg.endsWith(".json")) || path.join(__dirname, "fp01-execution-kit.json");
const workbookPath = path.join(path.dirname(input), "..", "..", "assets", "media", "fp01-execution-workbook.md");
const artifact = JSON.parse(fs.readFileSync(input, "utf8"));
const checks = [];

function check(id, label, condition, detail = null) {
  checks.push({ id, label, status: condition ? "pass" : "fail", detail });
}

function unique(values) {
  return new Set(values).size === values.length;
}

function fieldsFor(form) {
  return (form.sections || []).flatMap((section) => section.fields || []);
}

const expectedForms = ["EX-01", "EX-02", "EX-03", "EX-04", "EX-05", "EX-06", "EX-07"];
const requiredFields = {
  "EX-01": [
    "carrier_candidate_id", "survey_record_version", "survey_date", "coordinate_or_location_reference",
    "measured_boundary", "measured_dimensions", "access_points", "egress_paths",
    "approved_life_safety_occupancy", "surveyed_accessible_positions", "utilities_and_power",
    "connectivity_conditions", "heritage_and_planning_constraints", "existing_asset_condition",
    "site_photo_evidence_refs", "owner_or_site_controller", "ownership_or_control_evidence_ref",
    "site_use_permission_ref", "photo_publication_rights_ref", "data_collection_rights_ref",
    "survey_deviations_and_missingness", "professional_reviewer_name_and_qualification",
    "professional_review_report_ref", "h1_disposition", "accountable_signature", "decision_date"
  ],
  "EX-02": [
    "role_class", "applicable_gate_ids", "organization_name", "person_name", "authority_basis_ref",
    "accepted_duties", "excluded_duties", "delegation_limit", "service_coverage_commitment",
    "availability_window", "escalation_route", "backup_or_replacement_arrangement",
    "conflict_of_interest_disclosure", "conflict_mitigation", "data_duty_acceptance",
    "safety_duty_acceptance", "acceptance_disposition", "authorized_signature", "acceptance_date"
  ],
  "EX-03": [
    "pseudonymous_session_id", "service_day_id", "observation_date", "scenario_and_route_id",
    "accommodation_need_and_provision", "eligibility_confirmation", "consent_or_lawful_basis_ref",
    "privacy_notice_version", "direct_identifier_exclusion_check", "observer_role_class",
    "configuration_version_and_hash", "observation_start_timestamp", "observation_end_timestamp",
    "outcome_class", "human_confirmation_record", "takeover_trigger",
    "takeover_acknowledgement_timestamp", "appeal_or_refusal_offer", "appeal_teachback_result",
    "exit_restoration_result", "missingness_code", "missingness_reason", "evidence_capture_refs",
    "privacy_and_publication_class", "independent_reviewer", "review_disposition", "review_date"
  ],
  "EX-04": [
    "boq_item_id", "wbs_or_package_id", "item_description", "specification_and_control_refs",
    "measurement_unit", "unit_definition", "measurement_rule", "scope_inclusions", "scope_exclusions",
    "actual_quantity", "quantity_source_and_date", "measurement_review_ref", "cost_source_class",
    "cost_source_provider", "quote_or_source_reference", "source_date_and_validity", "source_geography",
    "currency_and_exchange_basis", "tax_and_fee_treatment", "scope_adjustments", "normalization_method",
    "normalized_unit_rate_cny", "source_rejection_reason", "independent_cost_reviewer",
    "selected_cost_basis_and_rationale", "contingency_basis_and_rate", "verified_item_amount_cny",
    "capital_budget_amount_cny", "operating_budget_amount_cny", "funding_source",
    "procurement_package_scope", "proposed_procurement_route", "supplier_eligibility_requirements",
    "c01_c12_requirement_schedule", "data_ip_and_portability_terms", "accessibility_requirements",
    "acceptance_and_payment_logic", "evaluation_conflict_separation", "exit_and_no_lock_in_terms",
    "evaluation_criteria_and_weights", "selected_procurement_route", "procurement_notice_ref",
    "selected_supplier", "award_or_contract_ref"
  ],
  "EX-05": [
    "review_record_id", "review_discipline", "applicable_standards", "review_scope", "review_input_refs",
    "review_method", "findings", "nonconformities", "required_remediation", "residual_risk",
    "reviewer_name_and_qualification", "professional_report_ref", "threshold_refs",
    "acceptance_indicator_refs", "test_method_and_sample", "test_evidence_refs", "test_result",
    "pass_fail_hold", "critical_no_waiver_check", "gate_id", "gate_prerequisite_evidence_ids",
    "gate_disposition", "decision_rationale", "dissent_or_exception_record", "authorized_scope",
    "authorization_expiry", "decision_owner_name", "required_cosignatories", "signatures",
    "decision_and_signoff_date"
  ],
  "EX-06": [
    "rehearsal_record_id", "rehearsal_event_type", "protocol_reference", "preconditions",
    "configuration_versions_and_hashes", "injected_trigger", "operator_steps", "expected_state_transitions",
    "evidence_capture_plan", "pass_fail_rule", "evaluator_name_and_role",
    "witness_independence_and_conflict", "actual_start_and_end", "observed_result", "deviation_record",
    "remedy_and_retest_ref", "rehearsal_disposition", "rehearsal_signatures_and_date",
    "maintenance_record_id", "maintenance_control_id", "checklist_version", "line_item_result",
    "defect_or_incident_id", "stop_state_and_scope", "corrective_action_owner",
    "corrective_action_due_date", "closure_evidence_ref", "maintenance_independent_reviewer",
    "maintenance_signature_and_date", "exit_record_id", "exit_trigger_and_alt_ref",
    "asset_inventory_and_disposition", "portable_record_inventory", "data_categories_and_disposition",
    "data_retention_exception_basis", "open_cases_and_appeals", "ordinary_service_restoration",
    "component_removal_record", "space_restoration_record", "public_notice_ref", "receiving_party",
    "handover_acceptance_disposition", "handover_signatures_and_date"
  ],
  "EX-07": [
    "dependency_step_id", "work_package", "owner_role_class", "predecessor_ids", "parallel_step_ids",
    "entry_evidence_refs", "deliverable_or_output", "exit_evidence_refs", "reference_window",
    "participant_reference_duration_range", "planned_start", "planned_finish", "actual_start",
    "actual_finish", "raid_or_change_id", "record_type", "description", "trigger_or_cause",
    "impact_and_probability", "action_owner", "due_date", "record_status", "decision_record",
    "change_request_and_reason", "affected_baselines", "change_approval", "closure_evidence_and_date"
  ]
};

const forms = artifact.forms || [];
const commonFields = artifact.common_record_fields || [];
const allFields = [...commonFields, ...forms.flatMap(fieldsFor)];
const formIds = forms.map((form) => form.form_id);
const fieldIds = allFields.map((field) => field.id);

check(
  "envelope",
  "V0.15 execution-kit artifact retained in the V0.17 bilingual package",
  artifact.schema_version === "0.1.0" &&
    artifact.artifact_id === "FP01-EXECUTION-KIT-001" &&
    artifact.artifact_version === "v0.15" &&
    artifact.artifact_status === "blank_execution_templates_unexecuted" &&
    Boolean(artifact.title_zh) && Boolean(artifact.title_en)
);

check(
  "seven_forms",
  "exactly seven ordered execution forms",
  artifact.form_count === 7 && JSON.stringify(formIds) === JSON.stringify(expectedForms)
);

check(
  "unique_ids",
  "form, section, and field identifiers are unique",
  unique(formIds) &&
    unique(forms.flatMap((form) => (form.sections || []).map((section) => section.section_id))) &&
    unique(fieldIds)
);

check(
  "bilingual_contract",
  "all forms, sections, fields, instructions, and rules are bilingual",
  forms.every((form) =>
    Boolean(form.title_zh) && Boolean(form.title_en) &&
    Boolean(form.completion_rule_zh) && Boolean(form.completion_rule_en) &&
    (form.sections || []).length > 0 &&
    form.sections.every((section) =>
      Boolean(section.title_zh) && Boolean(section.title_en) &&
      (section.fields || []).length > 0 &&
      section.fields.every((field) => Boolean(field.zh) && Boolean(field.en))
    )
  ) &&
    commonFields.length > 0 && commonFields.every((field) => Boolean(field.zh) && Boolean(field.en)) &&
    (artifact.execution_rules || []).every((rule) => Boolean(rule.zh) && Boolean(rule.en))
);

check(
  "field_contract",
  "every template field is required, typed, externally populated, and initially null or unknown",
  allFields.length > 0 && allFields.every((field) =>
    field.required === true &&
    Boolean(field.type) &&
    field.value_class === "external_actual" &&
    (field.initial_value === null || field.initial_value === "unknown")
  )
);

const coverage = Object.fromEntries(forms.map((form) => {
  const available = new Set(fieldsFor(form).map((field) => field.id));
  const missing = (requiredFields[form.form_id] || []).filter((fieldId) => !available.has(fieldId));
  return [form.form_id, missing];
}));
check(
  "required_field_coverage",
  "all audited execution fields are present",
  Object.values(coverage).every((missing) => missing.length === 0),
  coverage
);

const boundary = artifact.claim_boundary || {};
check(
  "anti_fabrication_boundary",
  "no site, entity, price, procurement, sign-off, result, or authorization is claimed",
  [
    "named_entity_committed", "site_condition_verified", "quote_or_budget_verified",
    "procurement_route_selected", "professional_signoff_obtained", "field_result_obtained",
    "implementation_authorized"
  ].every((key) => boundary[key] === false) && Boolean(boundary.zh) && Boolean(boundary.en)
);

check(
  "zero_actuals",
  "all execution, signatory, cost, and field-result counters remain zero",
  artifact.current_actual_record_count === 0 &&
    artifact.current_verified_external_record_count === 0 &&
    artifact.current_named_signatory_count === 0 &&
    artifact.current_verified_cost_input_count === 0 &&
    artifact.current_field_result_count === 0
);

const fixture = artifact.synthetic_fixture_policy || {};
check(
  "synthetic_fixture_boundary",
  "synthetic fixtures are absent and excluded from field metrics",
  fixture.marker === "synthetic_fixture_not_observed" &&
    fixture.synthetic_fixture_count === 0 &&
    fixture.excluded_from_field_metrics === true &&
    Boolean(fixture.zh) && Boolean(fixture.en)
);

check(
  "control_references",
  "each form names gates and control references without claiming execution",
  forms.every((form) =>
    form.status === "blank_template_unexecuted" &&
    Array.isArray(form.applicable_gates) && form.applicable_gates.length > 0 &&
    Array.isArray(form.control_refs) && form.control_refs.length > 0
  )
);

let workbook = "";
try {
  workbook = fs.readFileSync(workbookPath, "utf8");
} catch (_error) {
  workbook = "";
}
check(
  "workbook_coverage",
  "bilingual workbook carries every form and field identifier",
  Boolean(workbook) &&
    expectedForms.every((formId) => workbook.includes(`\`${formId}\``)) &&
    fieldIds.every((fieldId) => workbook.includes(`\`${fieldId}\``)) &&
    workbook.includes("synthetic_fixture_not_observed") &&
    workbook.includes("null / unknown")
);

const failed = checks.filter((item) => item.status === "fail");
const summary = {
  artifact_id: artifact.artifact_id,
  artifact_version: artifact.artifact_version,
  form_count: forms.length,
  section_count: forms.reduce((sum, form) => sum + (form.sections || []).length, 0),
  field_count: allFields.length,
  common_record_field_count: commonFields.length,
  initially_populated_external_field_count: allFields.filter((field) => field.initial_value !== null && field.initial_value !== "unknown").length,
  synthetic_fixture_count: fixture.synthetic_fixture_count,
  verified_external_record_count: artifact.current_verified_external_record_count,
  check_count: checks.length,
  passed_check_count: checks.length - failed.length,
  failed_check_count: failed.length,
  checks
};

process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
if (failed.length > 0) {
  process.exitCode = 1;
}
