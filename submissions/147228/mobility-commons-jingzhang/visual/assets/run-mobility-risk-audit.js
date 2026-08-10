#!/usr/bin/env node
'use strict';

/*
 * Check that the mobility package exposes one readable risk-to-evidence chain.
 * This is a deterministic package audit only; it does not assess field risk,
 * grant permission, or convert unknown values into performance results.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const riskPath = path.join(root, 'risk.json');
const registerPath = path.join(__dirname, 'mobility-risk-register.json');
const metricsPath = path.join(root, 'metrics.json');
const errors = [];
const allowedStates = new Set(['controlled_by_gate', 'unknown', 'blocked_until_evidence', 'not_started']);

function readJson(file, label) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    errors.push(`${label}: ${error.message}`);
    return null;
  }
}

function requireText(value, label) {
  if (typeof value !== 'string' || !value.trim()) errors.push(`${label} must be non-empty text`);
}

function requireList(value, label) {
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== 'string' || !item.trim())) {
    errors.push(`${label} must be a non-empty string array`);
  }
}

function safePackagePath(relativePath, label) {
  if (typeof relativePath !== 'string' || !relativePath.trim()) {
    errors.push(`${label} must be a relative package path`);
    return;
  }
  const normalized = path.normalize(relativePath);
  if (path.isAbsolute(relativePath) || normalized === '..' || normalized.startsWith(`..${path.sep}`)) {
    errors.push(`${label} escapes the package: ${relativePath}`);
    return;
  }
  if (!fs.existsSync(path.join(root, normalized))) errors.push(`${label} missing file: ${relativePath}`);
}

const risk = readJson(riskPath, 'risk.json');
const register = readJson(registerPath, 'mobility-risk-register.json');
const metrics = readJson(metricsPath, 'metrics.json');

if (risk) {
  if (risk.version !== 1) errors.push('risk.json version must be 1');
  if (!Array.isArray(risk.dimensions) || risk.dimensions.length !== 8) errors.push('risk.json must contain the eight supported risk dimensions');
  const ids = new Set();
  for (const [index, item] of (risk.dimensions || []).entries()) {
    const label = `risk.json dimensions[${index}]`;
    if (ids.has(item.id)) errors.push(`${label} duplicate id ${item.id}`);
    ids.add(item.id);
    requireText(item.id, `${label}.id`);
    requireText(item.label, `${label}.label`);
    if (!Number.isInteger(item.score) || item.score < 1 || item.score > 5) errors.push(`${label}.score must be an integer from 1 to 5`);
    requireText(item.note, `${label}.note`);
    requireText(item.mitigation, `${label}.mitigation`);
    if (item.score >= 4) requireText(item.human_review, `${label}.human_review`);
  }
}

const registerRisks = register?.risks || [];
if (!register || register.schema_version !== '0.1.0') errors.push('risk register schema_version must be 0.1.0');
if (register?.not_a_score !== true) errors.push('risk register must declare not_a_score=true');
if (register) {
  requireText(register.release_rule, 'risk register release_rule');
  requireText(register.review_frequency, 'risk register review_frequency');
  requireText(register.boundary_zh, 'risk register boundary_zh');
}

const seenRiskIds = new Set();
const referencedMetrics = new Set();
for (const [index, item] of registerRisks.entries()) {
  const label = `risk register risks[${index}]`;
  if (seenRiskIds.has(item.id)) errors.push(`${label} duplicate id ${item.id}`);
  seenRiskIds.add(item.id);
  requireText(item.id, `${label}.id`);
  requireText(item.label_zh, `${label}.label_zh`);
  if (!allowedStates.has(item.state)) errors.push(`${label}.state is not a bounded state: ${item.state}`);
  if (item.state === 'resolved' || item.state === 'approved' || item.state === 'operational') errors.push(`${label}.state must not promote an unknown or blocked risk`);
  requireText(item.trigger, `${label}.trigger`);
  requireList(item.evidence, `${label}.evidence`);
  requireList(item.metric_ids, `${label}.metric_ids`);
  requireText(item.non_ai_equivalent, `${label}.non_ai_equivalent`);
  requireText(item.stop_condition, `${label}.stop_condition`);
  requireText(item.owner_role, `${label}.owner_role`);
  for (const reference of item.evidence || []) safePackagePath(reference, `${label}.evidence`);
  for (const metricId of item.metric_ids || []) referencedMetrics.add(metricId);
}

if (risk && seenRiskIds.size !== new Set((risk.dimensions || []).map((item) => item.id)).size) {
  errors.push('risk.json and mobility-risk-register.json risk ids are not unique');
}
for (const id of (risk?.dimensions || []).map((item) => item.id)) {
  if (!seenRiskIds.has(id)) errors.push(`risk register missing root risk dimension ${id}`);
}
for (const id of seenRiskIds) {
  if (!(risk?.dimensions || []).some((item) => item.id === id)) errors.push(`risk register contains unregistered root risk dimension ${id}`);
}

const unknownMetrics = Object.entries(metrics?.metrics || {})
  .filter(([, item]) => item?.status === 'unknown')
  .map(([id]) => id);
const uncoveredUnknownMetrics = unknownMetrics.filter((id) => !referencedMetrics.has(id));
for (const id of uncoveredUnknownMetrics) errors.push(`unknown metric is not attached to a risk: ${id}`);

const airRisk = registerRisks.filter((item) => (item.metric_ids || []).includes('air_ground_transfer_reliability'));
if (airRisk.length === 0 || !airRisk.some((item) => item.state === 'blocked_until_evidence')) {
  errors.push('air_ground_transfer_reliability must remain attached to a blocked_until_evidence risk');
}

const forbiddenPromotion = /已批准|已运营|现场达标|officially approved|operational result|field performance/i;
for (const item of registerRisks) {
  if (forbiddenPromotion.test(`${item.stop_condition} ${item.non_ai_equivalent}`)) {
    errors.push(`risk ${item.id} contains a promotion phrase in a bounded field`);
  }
}

const result = {
  runner: 'run-mobility-risk-audit.js',
  status: errors.length === 0 ? 'PASS' : 'FAIL',
  risk_count: registerRisks.length,
  unknown_metric_count: unknownMetrics.length,
  uncovered_unknown_metrics: uncoveredUnknownMetrics,
  evidence_reference_count: registerRisks.reduce((total, item) => total + (item.evidence || []).length, 0),
  blocked_risk_ids: registerRisks.filter((item) => item.state === 'blocked_until_evidence').map((item) => item.id),
  checks: {
    root_risk_schema_shape: Boolean(risk?.version === 1 && risk?.dimensions?.length === 8),
    risk_register_shape: Boolean(register?.not_a_score === true && registerRisks.length === 8),
    every_evidence_path_exists: errors.filter((item) => item.includes('missing file')).length === 0,
    every_unknown_metric_is_covered: uncoveredUnknownMetrics.length === 0,
    air_candidate_remains_blocked: airRisk.some((item) => item.state === 'blocked_until_evidence'),
    no_risk_promoted_to_field_result: !forbiddenPromotion.test(JSON.stringify(register || {}))
  },
  claim_boundary: 'Package-level risk/evidence linkage only; no field risk assessment, professional sign-off, operating permission, public consent, official score, or ranking claim.',
  errors
};

console.log(JSON.stringify(result, null, 2));
process.exitCode = errors.length === 0 ? 0 : 1;
