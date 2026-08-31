#!/usr/bin/env node
/* 京张交接线 · P0 可实施性与公共利益就绪审计器（离线、只读、零第三方依赖） */
"use strict";

const fs = require("fs");
const path = require("path");

const HERE = process.env.JZ_AUDIT_HOME ? path.resolve(process.env.JZ_AUDIT_HOME) : __dirname;
const PKG = path.resolve(HERE, "../../..");
const OVERLAY = process.env.JZ_AUDIT_OVERLAY ? path.resolve(process.env.JZ_AUDIT_OVERLAY) : null;
const errors = [];

const resolveIn = (base, rel, key) => {
  if (OVERLAY) {
    const candidate = path.join(OVERLAY, key || rel);
    if (fs.existsSync(candidate)) return candidate;
  }
  return path.join(base, rel);
};
const readText = (rel) => {
  const file = resolveIn(PKG, rel);
  if (!fs.existsSync(file)) {
    errors.push(`缺少文件 ${rel}`);
    return "";
  }
  return fs.readFileSync(file, "utf8");
};
const readJSON = (rel) => {
  const text = readText(rel);
  if (!text) return null;
  try { return JSON.parse(text); }
  catch (error) {
    errors.push(`${rel} 不是有效 JSON：${error.message}`);
    return null;
  }
};
const exactSet = (actual, expected) =>
  Array.isArray(actual) && actual.length === expected.length && expected.every((item) => actual.includes(item));

const DELIVERY_PATH = "visual/assets/governance/p0-delivery-contract.json";
const FEASIBILITY_PATH = "visual/assets/governance/p0-pre-feasibility-envelope.json";
const HANDOFF_PATH = "visual/assets/governance/implementation-handoff-register.json";
const JURY_INDEX_PATH = "visual/assets/governance/jury-evidence-index.json";
const PUBLIC_PATH = "visual/assets/governance/public-benefit-gate.json";
const REVIEW_PATH = "visual/assets/governance/formal-review-readiness-matrix.json";
const PROTOTYPE_PATH = "visual/index.html";
const PROTOTYPE_LINK = "visual/index.html#p0-prototype";
const EXPECTED_SCENARIOS = Array.from({ length: 12 }, (_, index) => `SCN-${String(index + 1).padStart(2, "0")}`);
const EXPECTED_GROUPS = [
  "residents", "youth_talent", "enterprises", "universities", "visitors", "marginalized_groups",
];
const EXPECTED_GATES = [
  "site_authorisation",
  "independent_roles",
  "safety_accessibility",
  "insurance_maintenance",
  "data_minimisation_deletion",
  "cost_quotes_sustained_budget",
  "fire_transport_utilities",
  "co_testing_consent_accommodation",
];
const EXPECTED_STAGES = ["PRE-D0", "D0", "D1-D30", "D31-D60", "D61-D90"];
const EXPECTED_ACCEPTANCE = [
  "same_core_outcome",
  "task_success_gap",
  "completion_time_ratio",
  "queue_and_price_parity",
  "essential_safety_information",
  "device_and_algorithm_refusal",
  "complaint_stop_receipt",
  "accessibility_essential_tasks",
];
const EXPECTED_RACI_PACKAGES = [
  "site_authorisation",
  "independent_review",
  "human_service_floor",
  "smart_layer_installation",
  "cotest_recruitment_and_consent",
  "data_and_deletion",
  "field_rehearsal",
  "complaint_and_dissent",
  "acceptance_decision",
  "same_day_rollback_and_restoration",
];
const EXPECTED_PROTECTIONS = [
  "public_life_before_technology_display",
  "non_consumption_access",
  "no_mandatory_personal_device",
  "no_mandatory_face_recognition",
  "human_responsibility_and_appeal",
  "minimum_data_and_deletion",
  "child_older_and_disability_safety",
  "shade_rest_low_light_low_noise",
];
const EXPECTED_ELIGIBILITY_CHECKS = [
  "privacy_personal_or_nonpublic_data",
  "fabricated_official_endorsement",
  "unlawful_discriminatory_malicious",
  "material_irrelevance",
  "agent_taskbook_coverage",
  "settled_government_decision",
];
const EXPECTED_REVIEW_ITEMS = [
  "RR-01", "RR-02", "RR-03", "RR-04", "RR-05", "RR-06", "RR-07",
];
const EXPECTED_ALTERNATIVES = [
  "ALT-0_EXISTING_HUMAN_FLOOR",
  "ALT-1_MOBILE_CART",
  "ALT-2_PUBLIC_HANDOVER_TABLE_REFERENCE",
  "ALT-3_BORROWED_INDOOR_ROOM",
];
const EXPECTED_DRAWINGS = Array.from({ length: 5 }, (_, index) => `D${String(index + 1).padStart(2, "0")}`);
const EXPECTED_DRAWING_SCALES = ["1:500", "1:200", "1:100", "1:50", "1:20"];
const EXPECTED_TECHNICAL_VIEWS = {
  "V01-control-plan": ["D03"],
  "V02-operating-overlay": ["D04"],
  "V03-two-face-interface": ["D05"],
  "V04-screen-and-restore": ["D01", "D02"],
  "V05-release-chain": ["D01", "D02", "D03", "D04", "D05"],
};
const EXPECTED_RELEASE_STATES = [
  "S0_EVIDENCE_FREEZE", "S1_P0_HUMAN_FLOOR", "S2_THREE_YARDS_AND_LINKS",
  "S3_CORRIDOR_OPERATION_AND_RETIREMENT",
];
const EXPECTED_DELIVERY_PROJECTS = Array.from({ length: 9 }, (_, index) => `PJ${String(index + 1).padStart(2, "0")}`);
const EXPECTED_DELIVERY_PACKAGES = Array.from({ length: 6 }, (_, index) => `WP${String(index + 1).padStart(2, "0")}`);
const EXPECTED_IMPLEMENTATION_MODULES = Array.from({ length: 11 }, (_, index) => `M${String(index + 1).padStart(2, "0")}`);
const EXPECTED_IMPLEMENTATION_SCHEME_MODULES = Array.from({ length: 11 }, (_, index) => `IP${String(index + 1).padStart(2, "0")}`);
const EXPECTED_COST_METHOD_STEPS = Array.from({ length: 6 }, (_, index) => `CST${String(index + 1).padStart(2, "0")}`);
const EXPECTED_IMPLEMENTATION_POLICY_SOURCES = [
  "BEIJING-URBAN-RENEWAL-IMPLEMENTATION-GUIDE-2024",
  "BEIJING-URBAN-RENEWAL-JOINT-REVIEW-2024",
  "BEIJING-COST-BASIS-2026",
  "BEIJING-COST-INFORMATION-2026",
];
const EXPECTED_DOCUMENTARY_GATES = Array.from({ length: 12 }, (_, index) => `G${String(index + 1).padStart(2, "0")}`);
const EXPECTED_ROLE_CLASSES = Array.from({ length: 12 }, (_, index) => `R${String(index + 1).padStart(2, "0")}`);
const EXPECTED_PROGRAMME_TASKS = Array.from({ length: 12 }, (_, index) => `T${String(index).padStart(2, "0")}`);
const EXPECTED_QUANTITY_LINES = Array.from({ length: 16 }, (_, index) => `Q${String(index).padStart(2, "0")}`);
const EXPECTED_HANDOFF_ACCEPTANCE = Array.from({ length: 12 }, (_, index) => `A${String(index + 1).padStart(2, "0")}`);
const EXPECTED_COMMISSIONING_CHECKS = Array.from({ length: 8 }, (_, index) => `C${String(index + 1).padStart(2, "0")}`);
const EXPECTED_BASELINE_PERIODS = [
  "ordinary_public_window", "shift_change_peak", "rain_heat_or_cold",
  "low_light_or_night", "digital_or_power_outage",
];
const EXPECTED_BASELINE_FORMS = [
  "continuous_route_and_openings", "queue_wait_and_diversion", "no_ai_same_task",
  "accessibility_and_assistance", "complaint_stop_delete_receipt",
  "shift_maintenance_and_spares", "removal_restoration_and_reopen",
];
const EXPECTED_JURY_PATHS = { "JURY-30S": 30, "JURY-3M": 180, "JURY-15M": 900 };
const EXPECTED_RUBRIC_DIMENSIONS = [
  "brief_alignment", "originality", "ai_planning_innovation", "implementation_feasibility",
  "public_interest_inclusion", "risk_compliance", "expression_completeness",
];

const delivery = readJSON(DELIVERY_PATH);
const feasibility = readJSON(FEASIBILITY_PATH);
const handoffRegister = readJSON(HANDOFF_PATH);
const juryIndex = readJSON(JURY_INDEX_PATH);
const publicGate = readJSON(PUBLIC_PATH);
const reviewMatrix = readJSON(REVIEW_PATH);
const prototype = readText(PROTOTYPE_PATH);
const metricsDoc = readJSON("metrics.json");
const compliance = readJSON("compliance_matrix.json");
const roleSpec = readJSON("visual/assets/governance/role-spec.json");
const proposalZh = readText("proposal.md");
const proposalEn = readText("proposal.en.md");
const visualZh = readText("visual/index.html");
const visualEn = readText("visual/index.en.html");

let validEntryGates = 0;
let validStages = 0;
let validRaciPackages = 0;
let validBomItems = 0;
let validAcceptanceCriteria = 0;
if (delivery) {
  if (delivery.evidence_level !== "E2_preregistered_delivery_contract") {
    errors.push("P0 evidence_level 必须是 E2_preregistered_delivery_contract");
  }
  if (delivery.activation_state !== "not_started") errors.push("P0 activation_state 必须保持 not_started");
  if (!delivery.scope || delivery.scope.pilot_scenario_id !== "SCN-05" || delivery.scope.one_scenario_only !== true) {
    errors.push("P0 必须先锁定 SCN-05 单一场景，不得一次扩到十二场景");
  }
  for (const key of ["site_authorisation_received", "professional_signoff_received", "insurance_received",
    "three_quotes_received", "sustained_budget_committed", "field_rehearsal_completed"]) {
    if (!delivery.current_evidence || delivery.current_evidence[key] !== false) {
      errors.push(`current_evidence.${key} 必须如实保持 false`);
    }
  }
  if (!delivery.current_evidence || delivery.current_evidence.real_participant_observations !== 0) {
    errors.push("P0 真实参与者观察数必须保持 0");
  }

  const gates = Array.isArray(delivery.entry_gates) ? delivery.entry_gates : [];
  if (!exactSet(gates.map((item) => item.gate_id), EXPECTED_GATES)) errors.push("P0 八道进入门集合不完整");
  for (const gate of gates) {
    const local = [];
    if (gate.status !== "not_started") local.push("status 不是 not_started");
    if (gate.evidence_received_count !== 0) local.push("evidence_received_count 不是 0");
    if (!Array.isArray(gate.required_evidence) || gate.required_evidence.length < 2) local.push("required_evidence 少于 2 项");
    if (!String(gate.on_fail || "").includes("smart_layer_off")) local.push("失败动作未关闭智能层");
    if (local.length) errors.push(`${gate.gate_id || "未知进入门"}: ${local.join("；")}`);
    else validEntryGates += 1;
  }

  const stages = Array.isArray(delivery.delivery_stages) ? delivery.delivery_stages : [];
  if (!exactSet(stages.map((item) => item.stage_id), EXPECTED_STAGES)) errors.push("P0 五阶段 90 天路径不完整");
  for (const stage of stages) {
    const local = [];
    if (stage.status !== "not_started") local.push("status 不是 not_started");
    if (!Array.isArray(stage.deliverables) || stage.deliverables.length < 2) local.push("deliverables 少于 2 项");
    if (!Array.isArray(stage.exit_evidence) || stage.exit_evidence.length < 2) local.push("exit_evidence 少于 2 项");
    if (!String(stage.rollback || "").includes("基础人工服务")) local.push("rollback 未保留基础人工服务");
    if (local.length) errors.push(`${stage.stage_id || "未知阶段"}: ${local.join("；")}`);
    else validStages += 1;
  }

  const roleIds = new Set(((roleSpec && roleSpec.roles) || []).map((item) => item.role_id));
  const raci = Array.isArray(delivery.raci_work_packages) ? delivery.raci_work_packages : [];
  if (!exactSet(raci.map((item) => item.work_package_id), EXPECTED_RACI_PACKAGES)) errors.push("P0 十项 RACI 工作包不完整");
  for (const item of raci) {
    const local = [];
    if (!Array.isArray(item.responsible_role_ids) || item.responsible_role_ids.length < 1) local.push("没有 R 角色");
    if (!item.accountable_role_id) local.push("没有唯一 A 角色");
    for (const role of [...(item.responsible_role_ids || []), item.accountable_role_id].filter(Boolean)) {
      if (!roleIds.has(role)) local.push(`角色 ${role} 未登记在 role-spec`);
    }
    if (item.assignment_status !== "unassigned") local.push("assignment_status 不是 unassigned");
    if (local.length) errors.push(`${item.work_package_id || "未知工作包"}: ${local.join("；")}`);
    else validRaciPackages += 1;
  }

  const bom = Array.isArray(delivery.component_schedule) ? delivery.component_schedule : [];
  if (bom.length !== 12) errors.push(`P0 构件清单 ${bom.length} 项，应为 12 项`);
  for (const item of bom) {
    const local = [];
    if (!(Number.isFinite(item.quantity) && item.quantity > 0)) local.push("quantity 无效");
    if (!String(item.unit || "").trim()) local.push("unit 缺失");
    if (!String(item.acceptance_check_zh || "").trim()) local.push("acceptance_check_zh 缺失");
    if (item.procurement_status !== "not_quoted") local.push("procurement_status 不是 not_quoted");
    if (item.unit_price_cny !== null || item.total_price_cny !== null) local.push("未询价却填写了价格");
    if (local.length) errors.push(`${item.item_id || "未知构件"}: ${local.join("；")}`);
    else validBomItems += 1;
  }
  const quotes = delivery.procurement && delivery.procurement.quote_slots;
  if (!Array.isArray(quotes) || quotes.length !== 3 || quotes.some((item) =>
    item.vendor !== null || item.amount_cny !== null || item.received_at !== null)) {
    errors.push("三方询价槽位必须恰为 3 个且在真实询价前保持 null");
  }
  if (!delivery.procurement || delivery.procurement.cost_class !== "S" || delivery.procurement.total_budget_cny !== null) {
    errors.push("P0 只能声明 S 级成本，真实总预算在询价前必须为 null");
  }

  const acceptance = Array.isArray(delivery.preregistered_acceptance_criteria)
    ? delivery.preregistered_acceptance_criteria : [];
  if (!exactSet(acceptance.map((item) => item.criterion_id), EXPECTED_ACCEPTANCE)) {
    errors.push("P0 八项预注册验收判据不完整");
  }
  for (const item of acceptance) {
    const local = [];
    if (!String(item.measure || "").trim()) local.push("measure 缺失");
    if (!String(item.pass_rule || "").trim()) local.push("pass_rule 缺失");
    if (!String(item.stop_rule || "").includes("smart_layer_off")) local.push("stop_rule 未关闭智能层");
    if (item.observed_value !== null || item.status !== "not_observed") local.push("未实测却出现结果");
    if (local.length) errors.push(`${item.criterion_id || "未知验收项"}: ${local.join("；")}`);
    else validAcceptanceCriteria += 1;
  }
  const cotest = delivery.cotesting_protocol || {};
  if (cotest.participant_session_minimum !== 24 || cotest.current_participant_sessions !== 0) {
    errors.push("共测须预注册至少 24 个任务场次，当前真实场次保持 0");
  }
  if (!exactSet(cotest.required_rubric_groups, EXPECTED_GROUPS)) errors.push("共测未覆盖任务书六类公共群体");
  if (!Array.isArray(cotest.access_accommodations) || cotest.access_accommodations.length < 8) {
    errors.push("共测便利与合理调整少于 8 项");
  }
}

let validFeasibilityChecks = 0;
const recordFeasibility = (label, condition, detail) => {
  if (condition) validFeasibilityChecks += 1;
  else errors.push(`P0 预可研 ${label}${detail ? `：${detail}` : ""}`);
};
if (feasibility) {
  recordFeasibility("证据等级或场景不符",
    feasibility.evidence_level === "E2_participant_pre_feasibility_screening" &&
    feasibility.activation_state === "design_reference_not_field_verified" &&
    feasibility.pilot_scenario_id === "SCN-05");

  const ext = feasibility.current_external_evidence || {};
  recordFeasibility("外部证据边界被越过",
    ext.field_location === null && ext.site_measurement_received === false &&
    ext.occupancy_or_egress_signoff_received === false && ext.named_operator_received === false &&
    ext.market_quotes_received === 0 && ext.insurance_quote_cny === null &&
    ext.approved_budget_cny === null && ext.field_capacity_observations === 0 &&
    ext.field_maintenance_observations === 0 && ext.roster_appointment_receipt_count === 0 &&
    ext.commissioning_execution_count === 0 && ext.future_baseline_observation_count === 0);

  const spatial = feasibility.reference_spatial_envelope || {};
  const envelope = spatial.screening_control_envelope || {};
  const patch = spatial.reversible_operating_patch || {};
  recordFeasibility("空间包络算术或可逆边界不一致",
    envelope.length_m === 7.2 && envelope.width_m === 7.2 && envelope.area_sqm === 51.84 &&
    patch.length_m === 6 && patch.width_m === 6 && patch.area_sqm === 36 &&
    spatial.clear_access_loop_min_m === 1.8 && spatial.opposite_openings === 2 &&
    spatial.opening_clear_width_m_each === 1.8 && spatial.turning_circle_count === 2 &&
    spatial.turning_circle_diameter_m === 1.5 &&
    spatial.staffed_service_island && spatial.staffed_service_island.anchored_to_ground === false);

  const capacity = feasibility.capacity_and_queue_screening || {};
  recordFeasibility("容量、队列或排期算术不一致",
    capacity.screening_capacity_persons === Math.floor(36 / 2.4) &&
    capacity.operational_public_cap_persons === 8 && capacity.simultaneous_staff_positions === 3 &&
    capacity.operational_total_cap_persons === 11 && capacity.queue_cap_persons === 6 &&
    Math.abs(capacity.gross_operating_area_per_capped_person_sqm - 36 / 11) < 0.001 &&
    capacity.theoretical_task_slots_per_day === 48 && capacity.planning_buffer_ratio === 0.75 &&
    capacity.buffered_task_slots_per_day === 36 &&
    capacity.status === "participant_planning_ceiling_not_observed_performance");

  const roster = feasibility.reference_operating_roster || {};
  recordFeasibility("三席排班算术或未指派边界不一致",
    roster.pilot_weeks === 13 && roster.public_days_per_week === 5 && roster.public_hours_per_day === 4 &&
    roster.public_open_hours_90_day === 13 * 5 * 4 && roster.simultaneous_role_seats === 3 &&
    roster.staffed_seat_hours_90_day === 13 * 5 * 4 * 3 &&
    roster.public_open_hours_per_year === 1000 && roster.staffed_seat_hours_per_year === 3000 &&
    roster.productive_hours_per_fte_year_assumption === 1680 && roster.leave_training_factor === 1.2 &&
    Math.abs(roster.calculated_minimum_coverage_fte - 2.143) < 0.001 &&
    roster.planning_coverage_fte === 3 &&
    roster.minimum_roster_headcount_for_break_cover === 4 &&
    roster.target_uncovered_public_hours === 0 && roster.current_appointed_roster_headcount === 0 &&
    Array.isArray(roster.named_people) && roster.named_people.length === 0 &&
    roster.assignment_status === "unassigned" && Array.isArray(roster.role_seats) && roster.role_seats.length === 3);

  const schedule = Array.isArray(feasibility.component_sensitivity_schedule)
    ? feasibility.component_sensitivity_schedule : [];
  const deliveryIds = ((delivery && delivery.component_schedule) || []).map((item) => item.item_id);
  const scheduleIds = schedule.map((item) => item.item_id);
  const kitLow = schedule.reduce((total, item) => total + item.quantity * item.unit_rate_low_cny, 0);
  const kitHigh = schedule.reduce((total, item) => total + item.quantity * item.unit_rate_high_cny, 0);
  recordFeasibility("十二构件敏感性未与交付合同逐项绑定",
    schedule.length === 12 && exactSet(scheduleIds, deliveryIds) && kitLow === 17720 && kitHigh === 57000);

  const costs = feasibility.participant_cost_sensitivity_90_day || {};
  const costLines = Array.isArray(costs.included_cost_lines) ? costs.included_cost_lines : [];
  const costLow = costLines.reduce((total, item) => total + item.low_cny, 0);
  const costHigh = costLines.reduce((total, item) => total + item.high_cny, 0);
  const reserve = costLines.find((item) => item.line_id === "restoration_reserve") || {};
  recordFeasibility("90 天敏感性合计或撤场储备算术不一致",
    costLines.length === 6 && reserve.low_cny === Math.round(0.1 * (kitLow + 6500)) &&
    reserve.high_cny === Math.round(0.1 * (kitHigh + 19500)) &&
    costs.sensitivity_subtotal_low_cny === costLow && costs.sensitivity_subtotal_high_cny === costHigh &&
    costLow === 118042 && costHigh === 289750);
  recordFeasibility("敏感性被误写成正式预算或报价",
    costs.price_basis === "participant_set_sensitivity_variables_not_market_quotes" &&
    costs.formal_budget_cny === null && costs.insurance_quote_cny === null &&
    Array.isArray(costs.excluded_unpriced_external_items) && costs.excluded_unpriced_external_items.length >= 6);

  const annual = feasibility.participant_annual_opex_sensitivity || {};
  recordFeasibility("年度运维敏感性或证据状态不一致",
    annual.staffed_seat_hours_per_year === 3000 && annual.subtotal_low_cny_per_year === 300772 &&
    annual.subtotal_high_cny_per_year === 648300 &&
    annual.status === "participant_sensitivity_not_approved_opex" &&
    Array.isArray(annual.excluded_unpriced_external_items) && annual.excluded_unpriced_external_items.length === 5);

  const maintenance = Array.isArray(feasibility.maintenance_cycles) ? feasibility.maintenance_cycles : [];
  recordFeasibility("维护周期不完整",
    exactSet(maintenance.map((item) => item.cycle), ["before_each_shift", "after_each_shift", "weekly", "D0_D30_D60_D90"]) &&
    maintenance.every((item) => Array.isArray(item.checks_zh) && item.checks_zh.length >= 3 &&
      (String(item.on_fail || "").includes("smart_layer_off") || String(item.on_fail || "").includes("remove_failed_component"))));

  const removal = feasibility.rollback_and_restoration || {};
  recordFeasibility("撤场目标被误写成已实测或恢复检查不完整",
    removal.same_day_removal_target_hours === 4 && removal.removal_crew_assumption_persons === 4 &&
    removal.removal_person_hours_assumption === 16 &&
    removal.target_status === "participant_target_not_field_tested" &&
    Array.isArray(removal.restoration_checks_zh) && removal.restoration_checks_zh.length === 4);

  const alternatives = Array.isArray(feasibility.alternative_comparison)
    ? feasibility.alternative_comparison : [];
  const selected = alternatives.filter((item) => item.selected_for_reference_design === true);
  recordFeasibility("四个替代方案或八门约束不完整",
    exactSet(alternatives.map((item) => item.alternative_id), EXPECTED_ALTERNATIVES) &&
    selected.length === 1 && selected[0].alternative_id === "ALT-2_PUBLIC_HANDOVER_TABLE_REFERENCE" &&
    alternatives.find((item) => item.alternative_id === "ALT-0_EXISTING_HUMAN_FLOOR").pilot_activation_allowed === false &&
    alternatives.filter((item) => item.pilot_activation_allowed === true)
      .every((item) => item.gate_rule === "still_requires_all_eight_entry_gates"));
}

let validHandoffChecks = 0;
const recordHandoff = (label, condition, detail) => {
  if (condition) validHandoffChecks += 1;
  else errors.push(`专业实施交接 ${label}${detail ? `：${detail}` : ""}`);
};
if (handoffRegister) {
  recordHandoff("主张状态或激活状态不符",
    handoffRegister.claim_state === "PARTICIPANT_DESIGN_HANDOFF_READY" &&
    handoffRegister.activation_state === "EXTERNAL_HOLD_NOT_STARTED");

  const ext = handoffRegister.current_external_evidence || {};
  recordHandoff("外部证据不得被伪装成已取得",
    ext.official_siting_received === false && ext.site_right_or_access_received === false &&
    ext.field_measurement_count === 0 && ext.documentary_gate_receipt_count === 0 &&
    ext.named_role_appointment_count === 0 && ext.formal_unit_rate_receipt_count === 0 &&
    ext.vendor_quote_count === 0 && ext.insurance_document_count === 0 &&
    ext.approved_budget_cny === null && ext.professional_signoff_count === 0 &&
    ext.construction_or_opening_release_count === 0 && ext.field_task_count === 0 &&
    ext.valid_two_key_receipt_count === 0 && ext.commissioning_execution_count === 0 &&
    ext.future_baseline_observation_count === 0);

  const nested = handoffRegister.nested_scale_envelopes || {};
  const site = nested.site_screening_window || {};
  const court = nested.coordination_court || {};
  const control = nested.control_envelope || {};
  const patch = nested.reversible_operating_patch || {};
  recordHandoff("四级包络算术或非场地边界不一致",
    site.length_m === 24 && site.width_m === 24 && site.area_sqm === 576 &&
    site.status === "participant_orientation_screen_not_a_site" &&
    court.length_m === 12 && court.width_m === 12 && court.area_sqm === 144 &&
    court.status === "participant_no_fixed_work_coordination_reserve" &&
    control.length_m === 7.2 && control.width_m === 7.2 && control.area_sqm === 51.84 &&
    patch.length_m === 6 && patch.width_m === 6 && patch.area_sqm === 36);

  const drawings = Array.isArray(handoffRegister.drawing_chain) ? handoffRegister.drawing_chain : [];
  recordHandoff("1:500—1:20 五级图纸链不完整",
    exactSet(drawings.map((item) => item.drawing_id), EXPECTED_DRAWINGS) &&
    drawings.map((item) => item.scale).join("|") === EXPECTED_DRAWING_SCALES.join("|") &&
    drawings.every((item) => Array.isArray(item.checks) && item.checks.length >= 5 &&
      String(item.status || "").startsWith("participant_")));

  const technicalFigure = handoffRegister.technical_figure_binding || {};
  const technicalViews = Array.isArray(technicalFigure.views) ? technicalFigure.views : [];
  recordHandoff("F/05 技术图板表面未绑定到双语图件与确定性生成器",
    technicalFigure.surface_id === "F/05-v2.0-p0-technical-board-revision-20260831" &&
    technicalFigure.figure_zh === "assets/figures/metrics-evidence.png" &&
    technicalFigure.figure_en === "assets/figures/metrics-evidence.en.png" &&
    technicalFigure.builder === "visual/assets/governance/build-p0-feasibility-figure.js" &&
    fs.existsSync(resolveIn(PKG, technicalFigure.figure_zh)) &&
    fs.existsSync(resolveIn(PKG, technicalFigure.figure_en)) &&
    fs.existsSync(resolveIn(PKG, technicalFigure.builder)));
  recordHandoff("F/05 五个视图未逐项绑定 D01—D05、源路径与可见检查项",
    exactSet(technicalViews.map((item) => item.view_id), Object.keys(EXPECTED_TECHNICAL_VIEWS)) &&
    technicalViews.every((item) => exactSet(item.drawing_ids, EXPECTED_TECHNICAL_VIEWS[item.view_id]) &&
      Array.isArray(item.source_paths) && item.source_paths.length >= 2 &&
      item.source_paths.every((sourcePath) => String(sourcePath || "").includes(".json#")) &&
      Array.isArray(item.visible_checks) && item.visible_checks.length >= 4));
  recordHandoff("F/05 主张边界未明确排除测绘、施工、合规、报价、签认与开放批准",
    ["测绘", "施工图", "合规图", "报价", "专业签认", "开放批准"].every((term) =>
      String(technicalFigure.claim_boundary_zh || "").includes(term)) &&
    ["survey", "construction drawing", "compliance plan", "quotation", "professional sign-off", "opening approval"].every((term) =>
      String(technicalFigure.claim_boundary_en || "").includes(term)));

  const capacity = handoffRegister.capacity_and_open_edge_screen || {};
  recordHandoff("容量、开口与对角线筛查算术不一致",
    capacity.operational_public_cap_persons === 8 && capacity.simultaneous_staff_positions === 3 &&
    capacity.operational_total_cap_persons === 11 && capacity.queue_stop_persons === 6 &&
    capacity.opposed_opening_count === 2 && capacity.opening_clear_width_m_each === 1.8 &&
    capacity.combined_opening_target_m === 3.6 &&
    Math.abs(capacity.control_envelope_half_diagonal_m - 5.091) < 0.001 &&
    capacity.status === "participant_geometry_screen_not_statutory_occupancy_or_egress");

  const states = Array.isArray(handoffRegister.release_states) ? handoffRegister.release_states : [];
  const stateIds = new Set(states.map((item) => item.state_id));
  recordHandoff("四级释放状态必须完整且全部 HOLD",
    exactSet([...stateIds], EXPECTED_RELEASE_STATES) &&
    states.every((item) => item.status === "HOLD" && String(item.release_condition || "").trim() &&
      String(item.rollback || "").trim()));

  const projects = Array.isArray(handoffRegister.delivery_projects) ? handoffRegister.delivery_projects : [];
  recordHandoff("九项交付项目必须唯一且全部 HOLD",
    exactSet(projects.map((item) => item.project_id), EXPECTED_DELIVERY_PROJECTS) &&
    projects.every((item) => stateIds.has(item.release_state) && item.status === "HOLD"));

  const documentaryGates = Array.isArray(handoffRegister.documentary_release_gates)
    ? handoffRegister.documentary_release_gates : [];
  const documentaryGateIds = new Set(documentaryGates.map((item) => item.gate_id));
  recordHandoff("十二道文件闸门必须全部 HOLD 且回执为空",
    exactSet([...documentaryGateIds], EXPECTED_DOCUMENTARY_GATES) &&
    documentaryGates.every((item) => item.status === "HOLD" && item.receipt === null &&
      EXPECTED_GATES.includes(item.maps_to_entry_gate) && String(item.required_receipt || "").trim()));

  const packages = Array.isArray(handoffRegister.delivery_packages) ? handoffRegister.delivery_packages : [];
  recordHandoff("六个交付包必须绑定有效闸门并保持 HOLD",
    exactSet(packages.map((item) => item.package_id), EXPECTED_DELIVERY_PACKAGES) &&
    packages.every((item) => item.status === "HOLD" && Array.isArray(item.gate_ids) &&
      item.gate_ids.length >= 1 && item.gate_ids.every((gateId) => documentaryGateIds.has(gateId))));
  recordHandoff("六个交付包必须逐包给出数量依据与验收测试",
    packages.length === 6 && packages.every((item) =>
      String(item.quantity_basis || "").trim() && String(item.acceptance_test || "").trim()));

  const modules = Array.isArray(handoffRegister.implementation_modules)
    ? handoffRegister.implementation_modules : [];
  const schemeModules = Array.isArray(handoffRegister.implementation_scheme_module_register)
    ? handoffRegister.implementation_scheme_module_register : [];
  const policyBasis = handoffRegister.implementation_policy_basis || {};
  const costMethod = handoffRegister.formal_cost_method || {};
  const costSteps = Array.isArray(costMethod.method_steps) ? costMethod.method_steps : [];
  recordHandoff("十一项物理运营模块、十一类实施方案与六步计价方法不完整",
    exactSet(modules.map((item) => item.module_id), EXPECTED_IMPLEMENTATION_MODULES) &&
    modules.every((item) => typeof item.removable === "boolean" && String(item.title_zh || "").trim()) &&
    exactSet(schemeModules.map((item) => item.module_id), EXPECTED_IMPLEMENTATION_SCHEME_MODULES) &&
    schemeModules.every((item) => item.status === "MAPPED_EXTERNAL_HOLD" &&
      String(item.participant_input || "").trim() &&
      String(item.future_external_receipt || "").trim() &&
      Array.isArray(item.package_ids) && item.package_ids.length >= 1 &&
      Array.isArray(item.gate_ids) && item.gate_ids.length >= 1) &&
    policyBasis.status === "PARTICIPANT_MAPPING_COMPLETE_EXTERNAL_PROCEDURE_NOT_STARTED" &&
    exactSet(policyBasis.source_refs, EXPECTED_IMPLEMENTATION_POLICY_SOURCES) &&
    policyBasis.programme_level_module_count === 11 &&
    policyBasis.programme_level_modules_mapped_count === 11 &&
    policyBasis.programme_level_mapping_ratio === 1 &&
    policyBasis.external_module_receipt_count === 0 &&
    policyBasis.joint_review_file_number === null &&
    policyBasis.appointed_coordinating_entity === null &&
    policyBasis.appointed_implementation_entity === null &&
    costMethod.status === "METHOD_MAPPED_FORMAL_PRICING_NOT_STARTED" &&
    exactSet(costMethod.method_source_refs, EXPECTED_IMPLEMENTATION_POLICY_SOURCES.slice(2)) &&
    exactSet(costSteps.map((item) => item.step_id), EXPECTED_COST_METHOD_STEPS) &&
    costSteps.every((item) => String(item.action_zh || "").trim() &&
      String(item.current_state || "").trim() && String(item.release_gate || "").trim()) &&
    costMethod.formal_unit_rate_receipt_count === 0 &&
    costMethod.comparable_vendor_quote_count === 0 &&
    costMethod.required_comparable_vendor_quote_count === 3 &&
    costMethod.formal_cost_information_period === null &&
    costMethod.formal_price_base_date === null &&
    costMethod.formal_estimate_cny === null && costMethod.approved_budget_cny === null &&
    costMethod.funding_commitment_cny === null);

  const roles = Array.isArray(handoffRegister.professional_role_classes)
    ? handoffRegister.professional_role_classes : [];
  const roleIds = new Set(roles.map((item) => item.role_id));
  recordHandoff("十二类专业角色必须全部未任命且无具名主体",
    exactSet([...roleIds], EXPECTED_ROLE_CLASSES) &&
    roles.every((item) => item.appointment_status === "unappointed" && item.named_party === null));

  const programme = handoffRegister.conditional_programme || {};
  const tasks = Array.isArray(programme.tasks) ? programme.tasks : [];
  recordHandoff("15 周条件工期不得在 T0 前启动",
    programme.reference_duration_weeks === 15 && programme.absolute_start_date === null &&
    programme.t0_achieved_at === null && programme.clock_status === "NOT_STARTED_EXTERNAL_HOLD" &&
    exactSet(tasks.map((item) => item.task_id), EXPECTED_PROGRAMME_TASKS) &&
    tasks.every((item) => item.status === "HOLD" && roleIds.has(item.accountable_role_id) &&
      Array.isArray(item.gate_ids) && item.gate_ids.length >= 1 &&
      item.gate_ids.every((gateId) => documentaryGateIds.has(gateId))));

  const quantitySchedule = handoffRegister.unpriced_quantity_schedule || {};
  const quantityLines = Array.isArray(quantitySchedule.lines) ? quantitySchedule.lines : [];
  recordHandoff("十六行数量必须可推导且保持未计价",
    quantitySchedule.schedule_type === "participant_design_reference_not_formal_boq" &&
    quantitySchedule.formal_quantity_survey === null && quantitySchedule.formal_estimate_cny === null &&
    quantitySchedule.rate_source_receipt_count === 0 &&
    exactSet(quantityLines.map((item) => item.line_id), EXPECTED_QUANTITY_LINES) &&
    quantityLines.every((item) => Number.isFinite(item.quantity) && item.quantity > 0 &&
      String(item.unit || "").trim() && String(item.derivation || "").trim() &&
      item.field_verified_quantity === null && item.unit_rate_cny === null && item.amount_cny === null));

  const acceptance = Array.isArray(handoffRegister.handoff_acceptance_indicators)
    ? handoffRegister.handoff_acceptance_indicators : [];
  recordHandoff("十二项交接验收必须区分 8 项现可判与 4 项未来现场项",
    exactSet(acceptance.map((item) => item.indicator_id), EXPECTED_HANDOFF_ACCEPTANCE) &&
    acceptance.filter((item) => item.judgeable_now === true).length === 8 &&
    acceptance.filter((item) => item.judgeable_now === false).length === 4 &&
    acceptance.every((item) => item.field_result === null) &&
    acceptance.filter((item) => item.judgeable_now).every((item) => String(item.current_result || "").startsWith("PASS_")) &&
    acceptance.filter((item) => !item.judgeable_now).every((item) => String(item.current_result || "").startsWith("HOLD_")));

  const alternativeBindings = Array.isArray(handoffRegister.alternative_gate_binding)
    ? handoffRegister.alternative_gate_binding : [];
  recordHandoff("四个替代方案必须继续绑定闸门与 A0 回退",
    exactSet(alternativeBindings.map((item) => item.alternative_id), EXPECTED_ALTERNATIVES) &&
    alternativeBindings.find((item) => item.alternative_id === "ALT-0_EXISTING_HUMAN_FLOOR").pilot_activation_allowed === false &&
    alternativeBindings.filter((item) => item.alternative_id !== "ALT-0_EXISTING_HUMAN_FLOOR")
      .every((item) => item.pilot_activation_allowed === true && String(item.gate_rule || "").includes("G")));
  recordHandoff("四个替代方案必须给出优势维度与具名回退门",
    alternativeBindings.length === 4 && alternativeBindings.every((item) =>
      Array.isArray(item.alternative_advantage_dimensions) && item.alternative_advantage_dimensions.length >= 3 &&
      Array.isArray(item.fallback_gate_ids) && String(item.gate_rule || "").trim()) &&
    alternativeBindings.filter((item) => item.alternative_id !== "ALT-2_PUBLIC_HANDOVER_TABLE_REFERENCE")
      .every((item) => item.fallback_gate_ids.length >= 1 && item.fallback_gate_ids.every((gateId) =>
        gateId === "ANY_APPLICABLE_GATE_HOLD" || documentaryGateIds.has(gateId))) &&
    alternativeBindings.find((item) => item.alternative_id === "ALT-2_PUBLIC_HANDOVER_TABLE_REFERENCE")
      .fallback_gate_ids.length === 0);

  const maintenance = handoffRegister.maintenance_and_restoration_binding || {};
  recordHandoff("维护、撤场与恢复不得被写成已实测",
    maintenance.restoration_reserve_ratio === 0.1 && maintenance.same_day_removal_target_hours === 4 &&
    maintenance.field_tested === false && String(maintenance.opening_rule || "").includes("no public opening"));

  const operatingRoster = handoffRegister.operating_roster_coverage || {};
  recordHandoff("三席四人排班必须有可复算 FTE 且保持未任命",
    operatingRoster.simultaneous_role_seats === 3 && operatingRoster.public_open_hours_per_year === 1000 &&
    operatingRoster.staffed_seat_hours_per_year === 3000 &&
    operatingRoster.productive_hours_per_fte_year_assumption === 1680 &&
    operatingRoster.leave_training_factor === 1.2 &&
    Math.abs(operatingRoster.calculated_minimum_coverage_fte - 2.143) < 0.001 &&
    operatingRoster.planning_coverage_fte === 3 &&
    operatingRoster.minimum_roster_headcount_for_break_cover === 4 &&
    operatingRoster.target_uncovered_public_hours === 0 &&
    operatingRoster.current_named_roster_headcount === 0 &&
    operatingRoster.appointment_status === "HOLD_UNAPPOINTED");

  const twoKey = handoffRegister.two_key_release_control || {};
  const keys = Array.isArray(twoKey.keys) ? twoKey.keys : [];
  recordHandoff("双钥匙放行必须缺一即关且当前回执为零",
    twoKey.required_key_count === 2 && twoKey.current_valid_key_receipt_count === 0 &&
    twoKey.current_status === "HOLD_UNAPPOINTED" && twoKey.independent_release_role_id === "R12" &&
    exactSet(keys.map((item) => item.key_id), ["K-SERVICE-CONTINUITY", "K-RIGHTS-SAFETY-VETO"]) &&
    keys.every((item) => roleIds.has(item.future_holder_role_id) && item.current_named_holder === null &&
      item.appointment_receipt === null) && String(twoKey.release_rule || "").includes("smart_layer=off"));

  const commissioning = Array.isArray(handoffRegister.commissioning_and_decommissioning_checks)
    ? handoffRegister.commissioning_and_decommissioning_checks : [];
  recordHandoff("八项调试与退役检查必须预定义但保持未执行",
    exactSet(commissioning.map((item) => item.check_id), EXPECTED_COMMISSIONING_CHECKS) &&
    commissioning.every((item) => typeof item.site_action === "boolean" &&
      item.current_status === "HOLD_UNEXECUTED" && item.receipt === null));

  const baseline = handoffRegister.future_field_baseline_protocol || {};
  recordHandoff("未来现场基线必须覆盖五时段七表且当前值为空",
    exactSet(baseline.periods, EXPECTED_BASELINE_PERIODS) &&
    exactSet(baseline.forms, EXPECTED_BASELINE_FORMS) &&
    exactSet(baseline.required_public_groups, EXPECTED_GROUPS) &&
    baseline.authorised_participant_count === 0 && baseline.field_observation_count === 0 &&
    baseline.values === null && String(baseline.publication_rule || "").trim());

  const requiredFigureRefs = [
    ["proposal.md", proposalZh, "assets/figures/implementation-handoff.png"],
    ["proposal.en.md", proposalEn, "assets/figures/implementation-handoff.en.png"],
  ];
  recordHandoff("双语正文未引用专业交付梯图",
    requiredFigureRefs.every(([, text, needle]) => text.includes(needle)) &&
    fs.existsSync(resolveIn(PKG, "assets/figures/implementation-handoff.png")) &&
    fs.existsSync(resolveIn(PKG, "assets/figures/implementation-handoff.en.png")));
}

let validJuryPaths = 0;
let validRubricDimensions = 0;
if (juryIndex) {
  const paths = Array.isArray(juryIndex.review_paths) ? juryIndex.review_paths : [];
  if (!exactSet(paths.map((item) => item.path_id), Object.keys(EXPECTED_JURY_PATHS))) {
    errors.push("评委 30 秒／3 分钟／15 分钟路径集合不完整");
  }
  for (const item of paths) {
    const ok = item.time_seconds === EXPECTED_JURY_PATHS[item.path_id] &&
      Array.isArray(item.evidence_refs) && item.evidence_refs.length >= 4 &&
      String(item.boundary_zh || "").trim().length > 0;
    if (!ok) errors.push(`${item.path_id || "未知评委路径"}: 时间、证据或边界不完整`);
    else validJuryPaths += 1;
  }
  const rubric = Array.isArray(juryIndex.rubric_evidence_index) ? juryIndex.rubric_evidence_index : [];
  if (!exactSet(rubric.map((item) => item.dimension_id), EXPECTED_RUBRIC_DIMENSIONS)) {
    errors.push("七项评分维度证据索引不完整");
  }
  for (const item of rubric) {
    const ok = Array.isArray(item.primary_refs) && item.primary_refs.length >= 3 &&
      String(item.boundary_ref || "").trim().length > 0;
    if (!ok) errors.push(`${item.dimension_id || "未知评分维度"}: 主证据或边界引用不完整`);
    else validRubricDimensions += 1;
  }
}

let validGroups = 0;
let validScenarioGates = 0;
let validProtections = 0;
if (publicGate) {
  if (publicGate.evidence_level !== "E2_preregistered_public_value_contract") {
    errors.push("公共利益 evidence_level 必须是 E2_preregistered_public_value_contract");
  }
  if (publicGate.activation_state !== "specified_not_observed") errors.push("公共利益 gate 必须保持 specified_not_observed");
  const decision = publicGate.decision_rule || {};
  for (const key of ["public_benefit_is_entry_condition", "public_life_precedes_technology_display",
    "smart_layer_closes_when_public_floor_fails", "basic_service_continues_after_closure"]) {
    if (decision[key] !== true) errors.push(`公共利益 decision_rule.${key} 必须为 true`);
  }

  const groups = Array.isArray(publicGate.beneficiary_groups) ? publicGate.beneficiary_groups : [];
  if (!exactSet(groups.map((item) => item.group_id), EXPECTED_GROUPS)) errors.push("任务书六类公共群体集合不完整");
  for (const group of groups) {
    const local = [];
    if (!String(group.public_value_zh || "").trim()) local.push("public_value_zh 缺失");
    if (!String(group.no_ai_access_zh || "").trim()) local.push("no_ai_access_zh 缺失");
    if (!Array.isArray(group.evidence_to_collect) || group.evidence_to_collect.length < 2) local.push("待采证据少于 2 项");
    if (group.status !== "specified_not_observed" || group.observed_participant_count !== 0) local.push("被写成已观察");
    if (local.length) errors.push(`${group.group_id || "未知群体"}: ${local.join("；")}`);
    else validGroups += 1;
  }

  const protections = Array.isArray(publicGate.cross_cutting_protections)
    ? publicGate.cross_cutting_protections : [];
  if (!exactSet(protections.map((item) => item.protection_id), EXPECTED_PROTECTIONS)) {
    errors.push("八项跨场景公共保护集合不完整");
  }
  for (const item of protections) {
    if (!String(item.requirement_zh || "").trim() || !String(item.failure_action || "").includes("smart_layer_off")) {
      errors.push(`${item.protection_id || "未知保护"}: 要求或关闭动作缺失`);
    } else validProtections += 1;
  }

  const scenarioGates = Array.isArray(publicGate.scenario_public_value_gates)
    ? publicGate.scenario_public_value_gates : [];
  if (!exactSet(scenarioGates.map((item) => item.scenario_id), EXPECTED_SCENARIOS)) {
    errors.push("十二场景公共利益硬门槛集合不完整");
  }
  for (const item of scenarioGates) {
    const local = [];
    if (!Array.isArray(item.primary_group_ids) || item.primary_group_ids.length < 2 ||
        item.primary_group_ids.some((group) => !EXPECTED_GROUPS.includes(group))) local.push("受益群体无效或少于 2 类");
    if (!String(item.public_benefit_zh || "").trim()) local.push("公共收益缺失");
    if (!String(item.harm_to_avoid_zh || "").trim()) local.push("要避免的伤害缺失");
    if (!Array.isArray(item.safeguards) || item.safeguards.length < 3) local.push("保障少于 3 项");
    if (!String(item.stop_condition_zh || "").includes("关闭智能层")) local.push("停止条件未关闭智能层");
    if (!String(item.non_tech_remainder_zh || "").trim()) local.push("关闭后公共遗产缺失");
    if (item.status !== "specified_not_observed") local.push("被写成已观察");
    if (local.length) errors.push(`${item.scenario_id || "未知场景"}: ${local.join("；")}`);
    else validScenarioGates += 1;
  }
}

let validEligibilityChecks = 0;
let validReviewItems = 0;
if (reviewMatrix) {
  if (reviewMatrix.package_result !== "CLOSED_FOR_FORMAL_REVIEW") {
    errors.push("投稿包自评结果必须为 CLOSED_FOR_FORMAL_REVIEW");
  }
  if (reviewMatrix.participant_controlled_open_repair_count !== 0) {
    errors.push("当前参与者可控制的开放修复项必须为 0");
  }
  if (reviewMatrix.field_pilot_result !== "BLOCKED_EXTERNAL_PRE_PILOT") {
    errors.push("真实现场试点必须保持 BLOCKED_EXTERNAL_PRE_PILOT");
  }
  if (reviewMatrix.public_performance_claim_result !== "BLOCKED_UNTIL_24_REAL_TASKS") {
    errors.push("公众绩效主张必须保持 BLOCKED_UNTIL_24_REAL_TASKS");
  }
  if (reviewMatrix.official_geometry_result !== "WAITING_ORGANIZER_INPUT") {
    errors.push("正式几何必须保持 WAITING_ORGANIZER_INPUT");
  }
  const eligibility = Array.isArray(reviewMatrix.eligibility_evidence)
    ? reviewMatrix.eligibility_evidence : [];
  if (!exactSet(eligibility.map((item) => item.check_id), EXPECTED_ELIGIBILITY_CHECKS)) {
    errors.push("正式评审资格六项事实核对不完整");
  }
  for (const item of eligibility) {
    const local = [];
    if (item.rejection_condition_observed !== false) local.push("拒绝条件未保持 false");
    if (!Array.isArray(item.evidence_refs) || item.evidence_refs.length < 2) local.push("证据少于 2 项");
    if (!String(item.finding_zh || "").trim() || !String(item.finding_en || "").trim()) local.push("双语事实结论缺失");
    if (local.length) errors.push(`${item.check_id || "未知资格核对"}: ${local.join("；")}`);
    else validEligibilityChecks += 1;
  }
  const issues = Array.isArray(reviewMatrix.issues) ? reviewMatrix.issues : [];
  if (!exactSet(issues.map((item) => item.review_item_id), EXPECTED_REVIEW_ITEMS)) {
    errors.push("七项后续条件映射不完整");
  }
  for (const item of issues) {
    const local = [];
    if (item.participant_controlled_current_repair !== false) local.push("被误标为当前参与者修复");
    if (!String(item.classification || "").trim() || !String(item.status || "").trim()) local.push("分类或状态缺失");
    if (!Array.isArray(item.evidence_refs) || item.evidence_refs.length < 1) local.push("证据引用缺失");
    if (String(item.status || "").startsWith("OPEN_PARTICIPANT")) local.push("仍有开放参与者修复");
    if (local.length) errors.push(`${item.review_item_id || "未知评审项"}: ${local.join("；")}`);
    else validReviewItems += 1;
  }
}

const readiness = compliance && compliance.formal_review_readiness_boundary;
if (!readiness) {
  errors.push("compliance_matrix.json 缺 formal_review_readiness_boundary");
} else {
  if (readiness.source !== REVIEW_PATH) errors.push("正式评审边界未指向唯一修复矩阵");
  if (readiness.assessment_owner !== "participant_self_audit") errors.push("正式评审边界必须声明为参与者自审");
  if (readiness.package_result !== "CLOSED_FOR_FORMAL_REVIEW" ||
      readiness.participant_controlled_open_repair_count !== 0) {
    errors.push("合规矩阵未把当前投稿闭合与开放修复数锁定为 CLOSED / 0");
  }
  if (readiness.eligibility_rejection_condition_observed_count !== 0 ||
      readiness.eligibility_evidence_check_count !== EXPECTED_ELIGIBILITY_CHECKS.length) {
    errors.push("合规矩阵资格事实核对计数必须为 6 项／0 命中");
  }
  if (readiness.field_pilot_result !== "BLOCKED_EXTERNAL_PRE_PILOT" ||
      readiness.public_performance_claim_result !== "BLOCKED_UNTIL_24_REAL_TASKS") {
    errors.push("合规矩阵未保持现场与公众绩效主张双重阻断");
  }
}

const deliveryBoundary = delivery && delivery.formal_review_boundary;
if (!deliveryBoundary || deliveryBoundary.package_result !== "CLOSED_FOR_FORMAL_REVIEW" ||
    deliveryBoundary.field_pilot_result !== "BLOCKED_EXTERNAL_PRE_PILOT" ||
    deliveryBoundary.participant_controlled_open_repair_count !== 0) {
  errors.push("P0 交付合同未分离投稿包闭合与现场试点阻断");
}

const readinessPhrases = [
  ["proposal.md", proposalZh, "CLOSED_FOR_FORMAL_REVIEW", "BLOCKED_EXTERNAL_PRE_PILOT"],
  ["proposal.en.md", proposalEn, "CLOSED_FOR_FORMAL_REVIEW", "BLOCKED_EXTERNAL_PRE_PILOT"],
];
for (const [name, text, packageStatus, fieldStatus] of readinessPhrases) {
  if (!text.includes(packageStatus) || !text.includes(fieldStatus)) {
    errors.push(`${name} 未明确分离投稿包闭合与现场阻断`);
  }
}

const statusClaimFiles = [
  ["proposal.md", proposalZh],
  ["proposal.en.md", proposalEn],
  ["agent.json", readText("agent.json")],
  ["manifest.json", readText("manifest.json")],
  ["report/copyright_statement.md", readText("report/copyright_statement.md")],
  ["assumptions.json", readText("assumptions.json")],
  ["sources.json", readText("sources.json")],
  ["compliance_matrix.json", readText("compliance_matrix.json")],
  ["visual/assets/governance/build-delivery-pdfs.js", readText("visual/assets/governance/build-delivery-pdfs.js")],
];
const forbiddenStatusClaims = [
  ["冠军版", /冠军版/i],
  ["champion/championship", /champion(?:ship)?/i],
  ["历史分数 96/100", /\b96\s*\/\s*100\b/i],
  ["历史 PR #4281", /PR\s*#4281|pull\/4281/i],
  ["获准入库合并", /获准入库合并|approved\s+for\s+intake\s+and\s+merged/i],
  ["最新官方评审", /最新官方评审|latest\s+(?:completed\s+)?official\s+review/i],
];
for (const [name, text] of statusClaimFiles) {
  for (const [label, pattern] of forbiddenStatusClaims) {
    if (pattern.test(text)) errors.push(`${name} 仍含可能暗示获奖或官方认可的状态措辞：${label}`);
  }
}

let validPrototypeChecks = 0;
const prototypeChecks = [
  ["离线证据标记", /data-evidence-state="synthetic-offline-prototype"/],
  ["跳转到主内容", /class="skip-link"[^>]*href="#main"/],
  ["状态播报", /aria-live="polite"/],
  ["智能路线", /data-service-route="smart-assist"/],
  ["无 AI 路线", /data-service-route="no-ai-human"/],
  ["相同核心结果", (text) => (text.match(/data-core-result-id="SCN-05-CORE-001"/g) || []).length >= 2],
  ["关闭智能层控件", /id="smart-off"/],
  ["拒绝数据控件", /id="refuse-data"/],
  ["投诉与停用回执", /id="issue-receipt"/],
  ["大字模式", /id="large-text"/],
  ["高对比模式", /id="high-contrast"/],
  ["中英核心信息切换", (text) => /id="language-toggle"/.test(text) &&
    /id="p0-prototype"[^>]*lang="zh-CN"/.test(text) &&
    (text.match(/data-zh="[^"]+" data-en="[^"]+"/g) || []).length >= 18 &&
    /function p0English\(\)/.test(text) &&
    /prototype\.lang\s*=\s*english\s*\?\s*'en'\s*:\s*'zh-CN'/.test(text) &&
    text.includes("Synthetic smart suggestion") && text.includes("Staffed and paper route")],
  ["打印纸本", /id="print-card"/],
  ["真实现场边界", /真实参与者观察[^0]*0/],
];
for (const [name, test] of prototypeChecks) {
  const ok = typeof test === "function" ? test(prototype) : test.test(prototype);
  if (!ok) errors.push(`P0 原型缺少：${name}`); else validPrototypeChecks += 1;
}
const prohibitedPrototypePatterns = [
  [/https?:\/\//i, "远程 URL"],
  [/\bfetch\s*\(/, "fetch 网络请求"],
  [/XMLHttpRequest|WebSocket|EventSource/, "主动网络 API"],
  [/localStorage|sessionStorage|document\.cookie/, "持久化浏览器存储"],
  [/<input[^>]+(?:name|id)=["'](?:name|phone|email|id_card)/i, "个人信息输入字段"],
];
for (const [pattern, label] of prohibitedPrototypePatterns) {
  if (pattern.test(prototype)) errors.push(`P0 原型不得包含 ${label}`);
}

const requiredPageLinks = [
  ["proposal.md", proposalZh, PROTOTYPE_LINK],
  ["proposal.en.md", proposalEn, PROTOTYPE_LINK],
  ["visual/index.html", visualZh, "id=\"p0-prototype\""],
  ["visual/index.en.html", visualEn, "index.html#p0-prototype"],
];
for (const [name, text, needle] of requiredPageLinks) {
  if (!text.includes(needle)) errors.push(`${name} 未链接 P0 可操作原型`);
}

const metrics = (metricsDoc && metricsDoc.metrics) || {};
const expectedMetrics = {
  p0_entry_gate_count: 8,
  p0_delivery_stage_count: 5,
  p0_raci_work_package_count: 10,
  p0_component_line_item_count: 12,
  p0_preregistered_acceptance_criterion_count: 8,
  public_benefit_group_count: 6,
  scenario_public_benefit_gate_count: 12,
  offline_service_prototype_route_count: 2,
  planned_equity_cotest_session_min_count: 24,
  p0_screening_control_envelope_area_sqm: 51.84,
  p0_reversible_operating_patch_area_sqm: 36,
  p0_operational_public_cap_persons: 8,
  p0_simultaneous_staff_position_count: 3,
  p0_queue_cap_persons: 6,
  p0_buffered_task_slot_count_per_day: 36,
  p0_public_open_hours_90_day: 260,
  p0_staffed_seat_hours_90_day: 780,
  p0_90_day_cost_sensitivity_low_cny: 118042,
  p0_90_day_cost_sensitivity_high_cny: 289750,
  p0_annual_opex_sensitivity_low_cny: 300772,
  p0_annual_opex_sensitivity_high_cny: 648300,
  p0_alternative_option_count: 4,
  p0_same_day_removal_target_hours: 4,
  p0_site_screening_window_area_sqm: 576,
  p0_coordination_court_area_sqm: 144,
  p0_control_envelope_half_diagonal_m: 5.091,
  p0_combined_opening_target_m: 3.6,
  implementation_drawing_scale_count: 5,
  implementation_release_state_count: 4,
  implementation_delivery_project_count: 9,
  implementation_delivery_package_count: 6,
  implementation_module_count: 11,
  implementation_documentary_gate_count: 12,
  implementation_gate_receipt_count: 0,
  implementation_role_class_count: 12,
  implementation_named_role_appointment_count: 0,
  implementation_conditional_task_count: 12,
  implementation_unpriced_quantity_line_count: 16,
  implementation_handoff_acceptance_indicator_count: 12,
  implementation_handoff_judgeable_now_count: 8,
  implementation_formal_unit_rate_receipt_count: 0,
  implementation_construction_opening_release_count: 0,
  p0_staffed_seat_hours_per_year: 3000,
  p0_calculated_minimum_coverage_fte: 2.143,
  p0_planning_coverage_fte: 3,
  p0_minimum_roster_headcount: 4,
  implementation_package_acceptance_test_count: 6,
  implementation_named_fallback_gate_binding_count: 4,
  implementation_two_key_control_count: 2,
  implementation_two_key_receipt_count: 0,
  implementation_commissioning_check_count: 8,
  implementation_commissioning_executed_count: 0,
  implementation_future_baseline_period_count: 5,
  implementation_future_baseline_form_count: 7,
};
for (const [id, expected] of Object.entries(expectedMetrics)) {
  const value = metrics[id] && metrics[id].value;
  if (value !== expected) errors.push(`metrics.${id} 应为 ${expected}，实为 ${JSON.stringify(value)}`);
}

const result = {
  ok: errors.length === 0,
  pilot_scenario_id: delivery && delivery.scope && delivery.scope.pilot_scenario_id,
  entry_gates_valid: validEntryGates,
  delivery_stages_valid: validStages,
  raci_work_packages_valid: validRaciPackages,
  component_line_items_valid: validBomItems,
  acceptance_criteria_valid: validAcceptanceCriteria,
  pre_feasibility_checks_valid: validFeasibilityChecks,
  pre_feasibility_checks_expected: 12,
  implementation_handoff_checks_valid: validHandoffChecks,
  implementation_handoff_checks_expected: 26,
  jury_paths_valid: validJuryPaths,
  jury_paths_expected: 3,
  rubric_dimensions_valid: validRubricDimensions,
  rubric_dimensions_expected: 7,
  public_benefit_groups_valid: validGroups,
  scenario_public_value_gates_valid: validScenarioGates,
  cross_cutting_protections_valid: validProtections,
  eligibility_evidence_checks_valid: validEligibilityChecks,
  review_items_classified_valid: validReviewItems,
  prototype_checks_valid: validPrototypeChecks,
  prototype_checks_expected: prototypeChecks.length,
  real_participant_observations: delivery && delivery.current_evidence && delivery.current_evidence.real_participant_observations,
  errors,
};

if (process.argv.includes("--json")) console.log(JSON.stringify(result, null, 2));
else if (result.ok) {
  console.log("PASS  SCN-05 单场景 P0：8 门／5 阶段／10 RACI／12 构件／8 验收；预可研 12/12；专业交接 26/26（5 尺度／F/05 五视图绑定与边界／4 状态／9 项目／6 包逐包验收／11 物理运营模块／11 类实施方案／6 步计价方法／12 文件闸门／12 角色／三席四人排班／双钥匙／8 调试退役检查／5 时段 × 7 基线表／12 条件任务／16 未计价数量／12 交接验收）；评委路径 3/3／评分索引 7/7；6 类公共群体／12 场景硬门槛；资格证据 6/6／评审归类 7/7；离线原型 14/14；真实观察 0");
} else {
  console.error("FAIL  P0 可实施性与公共利益就绪包不完整");
  for (const error of errors) console.error(`- ${error}`);
}
process.exit(result.ok ? 0 : 1);
