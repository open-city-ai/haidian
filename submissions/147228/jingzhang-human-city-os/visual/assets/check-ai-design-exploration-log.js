#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const requestedRoot = process.argv[2] ? path.resolve(process.argv[2]) : __dirname;
const assetRoot = fs.existsSync(path.join(requestedRoot, "ai-design-exploration-log.json"))
  ? requestedRoot
  : path.join(requestedRoot, "visual", "assets");
const packageRoot = path.resolve(assetRoot, "..", "..");
const logPath = path.join(assetRoot, "ai-design-exploration-log.json");
const log = JSON.parse(fs.readFileSync(logPath, "utf8"));
const failures = [];
function check(condition, message) {
  if (!condition) failures.push(message);
}

function validatePoint(point, packageRoot) {
  const problems = [];
  if (!point.decision_id || !point.iteration || !point.question_zh || !point.question_en) problems.push(`${point.decision_id || "unknown"}: identity/question missing`);
  if (point.human_decision_required !== true) problems.push(`${point.decision_id}: human decision must be required`);
  if (!Array.isArray(point.evidence_paths) || point.evidence_paths.length < 2) problems.push(`${point.decision_id}: at least two evidence paths are required`);
  for (const rel of point.evidence_paths || []) {
    if (!fs.existsSync(path.join(packageRoot, rel))) problems.push(`${point.decision_id}: missing evidence path ${rel}`);
  }
  if (!String(point.decision_status || "").includes("retained")) problems.push(`${point.decision_id}: retention status is required`);
  return problems;
}

const points = Array.isArray(log.decision_points) ? log.decision_points : [];
const ids = points.map((point) => point.decision_id).sort();
check(log.package_iteration === "v1.0", "package_iteration must be v1.0");
check(log.status === "retrospective_structural_record", "log must remain retrospective and structural");
check(log.claim_boundary?.agent_role === "structured_synthesis_and_replay_assistance", "agent role boundary must be explicit");
check(log.claim_boundary?.human_decision_required === true, "human decision boundary must be explicit");
check(log.claim_boundary?.external_network === false, "external network must remain false");
check(points.length >= 5, "at least five decision points are required");
check(new Set(ids).size === ids.length, "decision IDs must be unique");
for (const point of points) failures.push(...validatePoint(point, packageRoot));
check((log.replay_requirements || []).length >= 4, "replay requirements are required");

const negativeMissing = JSON.parse(JSON.stringify(log));
delete negativeMissing.decision_points[0].evidence_paths;
check(validatePoint(negativeMissing.decision_points[0], packageRoot).length > 0, "negative fixture with missing evidence must fail");
const negativeHuman = JSON.parse(JSON.stringify(log));
negativeHuman.decision_points[0].human_decision_required = false;
check(validatePoint(negativeHuman.decision_points[0], packageRoot).length > 0, "negative fixture without human decision must fail");

const result = {
  ok: failures.length === 0,
  checks: {
    decision_points: points.length,
    unique_decision_ids: new Set(ids).size,
    evidence_paths: points.reduce((total, point) => total + (point.evidence_paths || []).length, 0),
    replay_requirements: log.replay_requirements?.length || 0,
    negative_fixtures: 2,
  },
  claim_boundary: log.claim_boundary,
  failures,
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.ok ? 0 : 1;
