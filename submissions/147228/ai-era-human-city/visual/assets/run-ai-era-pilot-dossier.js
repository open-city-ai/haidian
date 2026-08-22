#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2] || path.join(__dirname, 'ai-era-pilot-dossier.json');
const contract = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const errors = [];
const fail = (message) => errors.push(message);
const nonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;
const positive = (value) => Number.isFinite(value) && value > 0;
const close = (a, b) => Math.abs(a - b) < 0.001;

if (contract.design_only !== true) fail('design_only must remain true');
if (contract.decision !== 'HOLD') fail('decision must remain HOLD');
if (contract.official_boundary !== false) fail('official_boundary must remain false');
if (contract.authorization_count !== 0 || contract.field_observation_count !== 0) fail('authorization and field observation counts must remain zero');
if (contract.result_status !== 'not_run') fail('result_status must remain not_run');
if (!nonEmpty(contract.boundary)) fail('boundary statement is required');

const pilot = contract.pilot || {};
if (pilot.pilot_id !== 'PILOT-AIORIGIN-ORDINARY-SERVICE-NODE') fail('pilot ID changed');
if (pilot.site_ref !== 'PROV-KEY-002') fail('pilot must remain tied to the provisional AI Origin key area');
if (pilot.selected_alternative !== 'ALT-C') fail('pilot must implement ALT-C');
if (!Array.isArray(pilot.scenario_refs) || pilot.scenario_refs.length !== 4) fail('pilot requires four scenario references');

const rule = contract.dimension_rule || {};
if (rule.status !== 'participant_authored_design_target' || rule.must_recalculate !== true) fail('dimension rule must remain a recalculable design target');
if (!Array.isArray(rule.recalculation_triggers) || rule.recalculation_triggers.length < 6) fail('six recalculation triggers are required');

const spatial = contract.spatial_dossier || {};
if (JSON.stringify(spatial.scale_chain) !== JSON.stringify(['1:500', '1:100', '1:50'])) fail('scale chain must be 1:500, 1:100 and 1:50');
const plan = spatial.plan_1_500 || {};
if (!Array.isArray(plan.envelope_m) || plan.envelope_m.length !== 2 || !plan.envelope_m.every(positive)) fail('plan envelope must contain two positive dimensions');
if (!Array.isArray(plan.modules) || plan.modules.length < 7) fail('seven plan modules are required');
for (const module of plan.modules || []) {
  if (!nonEmpty(module.id) || !nonEmpty(module.name_zh) || !nonEmpty(module.name_en)) fail('every plan module needs a bilingual identity');
  if (!positive(module.width_m) || !positive(module.depth_m) || module.state !== 'design_target') fail(`${module.id}: dimensions must remain positive design targets`);
}
if (!nonEmpty(plan.capacity_formula) || plan.release_capacity !== null) fail('capacity must remain formula-bound with null release capacity');

const section = spatial.section_1_100 || {};
if (!positive(section.clear_height_m) || !Array.isArray(section.bands) || section.bands.length !== 4) fail('section requires a positive height and four bands');
if ((section.bands || []).some((band) => !positive(band.width_m) || band.state !== 'design_target')) fail('section bands must remain positive design targets');
if (!nonEmpty(section.blackout_rule)) fail('section blackout rule is required');

const detail = spatial.detail_1_50 || {};
if (!Array.isArray(detail.elements) || detail.elements.length !== 4) fail('detail requires four elements');
if ((detail.elements || []).some((item) => item.state !== 'design_target')) fail('detail elements must remain design targets');
if (!nonEmpty(detail.closeout_rule)) fail('detail closeout rule is required');

const delivery = contract.delivery_contract || {};
if (delivery.delivery_state !== 'pre_authorization_design_estimate' || delivery.organization_status !== 'unconfirmed') fail('delivery state and organisations must remain unconfirmed');
if (!Array.isArray(delivery.schedule) || delivery.schedule.length !== 6) fail('six delivery stages are required');
if ((delivery.schedule || []).some((item) => !nonEmpty(item.id) || !nonEmpty(item.work_zh) || !nonEmpty(item.work_en) || !nonEmpty(item.release_gate))) fail('every delivery stage needs bilingual work and a release gate');
if (!Array.isArray(delivery.raci) || delivery.raci.length < 5) fail('five RACI asset rows are required');
if ((delivery.raci || []).some((row) => ['asset','responsible','accountable','consulted','informed'].some((key) => !nonEmpty(row[key])) || row.status !== 'role_unconfirmed')) fail('RACI roles must be complete and unconfirmed');
if (!nonEmpty(delivery.procurement?.method) || !Array.isArray(delivery.procurement?.sequence) || delivery.procurement.sequence.length < 6 || !nonEmpty(delivery.procurement?.forbidden)) fail('procurement method, six steps and forbidden claim are required');

function validateEstimate(estimate, reserveKey) {
  if (!Array.isArray(estimate?.line_items) || estimate.line_items.length < 4) return false;
  if (estimate.line_items.some((item) => !positive(item.lower) || !positive(item.upper) || item.upper < item.lower)) return false;
  const lower = estimate.line_items.reduce((sum, item) => sum + item.lower, 0) * (1 + estimate[reserveKey]);
  const upper = estimate.line_items.reduce((sum, item) => sum + item.upper, 0) * (1 + estimate[reserveKey]);
  return close(lower, estimate.lower) && close(upper, estimate.upper) && nonEmpty(estimate.formula) && /^low_design_estimate_not_/.test(estimate.confidence);
}

if (!validateEstimate(delivery.capex_design_estimate_cny, 'contingency_rate')) fail('CAPEX estimate must equal its transparent formula');
if (!validateEstimate(delivery.monthly_opex_design_estimate_cny, 'reserve_rate')) fail('OPEX estimate must equal its transparent formula');
if (!Array.isArray(delivery.service_level_targets) || delivery.service_level_targets.length !== 5) fail('five SLA targets are required');
if ((delivery.service_level_targets || []).some((item) => !nonEmpty(item.id) || !nonEmpty(item.target) || item.basis !== 'design_target_not_observed')) fail('SLA rows must remain unobserved design targets');
if (!nonEmpty(delivery.insurance_gate) || !nonEmpty(delivery.acceptance_gate) || !nonEmpty(delivery.rollback)) fail('insurance, acceptance and rollback gates are required');

const field = contract.field_acceptance || {};
if (field.status !== 'not_run' || !Array.isArray(field.required_but_missing) || field.required_but_missing.length < 6 || !nonEmpty(field.rule)) fail('field acceptance must remain not_run with explicit missing evidence');

if (errors.length) {
  console.error('FAIL AI-era pilot dossier');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'PASS',
  decision: contract.decision,
  pilot_id: pilot.pilot_id,
  scales: spatial.scale_chain.length,
  plan_modules: plan.modules.length,
  section_bands: section.bands.length,
  detail_elements: detail.elements.length,
  delivery_stages: delivery.schedule.length,
  raci_assets: delivery.raci.length,
  sla_targets: delivery.service_level_targets.length,
  capex_design_estimate_cny: [delivery.capex_design_estimate_cny.lower, delivery.capex_design_estimate_cny.upper],
  monthly_opex_design_estimate_cny: [delivery.monthly_opex_design_estimate_cny.lower, delivery.monthly_opex_design_estimate_cny.upper],
  field_acceptance: field.status
}, null, 2));
