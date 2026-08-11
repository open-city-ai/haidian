#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..", "..");
const mapPath = path.join(__dirname, "autonomy-professional-review-map-v27.json");

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function loadJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`cannot read JSON ${path.relative(packageRoot, file)}: ${error.message}`);
    return null;
  }
}

function assert(condition, message) {
  if (!condition) fail(message);
}

const reviewMap = loadJson(mapPath);
const sourcesDoc = loadJson(path.join(packageRoot, "sources.json"));
if (!reviewMap || !sourcesDoc) process.exit(1);

const expected = [
  ["brief_alignment", 20],
  ["originality", 10],
  ["ai_planning_innovation", 15],
  ["implementation_feasibility", 20],
  ["public_interest_inclusion", 10],
  ["risk_compliance", 10],
  ["expression_completeness", 15],
];
const sourceList = Array.isArray(sourcesDoc.sources) ? sourcesDoc.sources : [];
const sourceIds = new Set(sourceList.map((item) => item && item.id).filter(Boolean));
const boundary = reviewMap.package_boundary || {};

assert(reviewMap.schema_version === "0.1.0", "unsupported schema_version");
assert(reviewMap.rubric_source === "scripts/ai_review_submission.py", "rubric source drifted");
assert(reviewMap.rubric_weights_sum === 100, "rubric_weights_sum must be 100");
assert(boundary.official_boundary === false, "official_boundary must remain false");
assert(boundary.geometry_role === "provisional_constraint", "geometry_role must remain provisional_constraint");
assert(boundary.operational_status === "not_authorized_not_run", "operational status must remain not_authorized_not_run");
assert(boundary.performance_results === null, "performance_results must remain null");
assert(boundary.not_an_official_score === true, "map must not be presented as an official score");
assert(Array.isArray(reviewMap.dimensions), "dimensions must be an array");
assert(reviewMap.dimensions.length === expected.length, `expected ${expected.length} dimensions`);

let weightSum = 0;
const seen = new Set();
for (let index = 0; index < expected.length; index += 1) {
  const [expectedId, expectedWeight] = expected[index];
  const item = reviewMap.dimensions[index];
  assert(item && typeof item === "object", `dimension ${index + 1} must be an object`);
  assert(item.id === expectedId, `dimension ${index + 1} expected ${expectedId}`);
  assert(!seen.has(item.id), `duplicate dimension ${item.id}`);
  seen.add(item.id);
  assert(item.rubric_weight === expectedWeight, `${item.id} weight drifted`);
  weightSum += item.rubric_weight;
  assert(typeof item.review_question === "string" && item.review_question.length > 10, `${item.id} missing review question`);
  assert(typeof item.design_action === "string" && item.design_action.length > 10, `${item.id} missing design action`);
  assert(typeof item.can_support === "string" && item.can_support.length > 10, `${item.id} missing can_support boundary`);
  assert(Array.isArray(item.not_proven) && item.not_proven.length >= 2, `${item.id} needs explicit not_proven limits`);
  assert(Array.isArray(item.evidence_refs) && item.evidence_refs.length >= 2, `${item.id} needs evidence refs`);
  assert(Array.isArray(item.formal_basis_ids) && item.formal_basis_ids.length >= 1, `${item.id} needs formal basis ids`);
  for (const sourceId of item.formal_basis_ids) {
    assert(sourceIds.has(sourceId), `${item.id} references missing source ${sourceId}`);
  }
  for (const reference of item.evidence_refs) {
    const rel = String(reference).split("#", 1)[0];
    assert(rel && !rel.startsWith("/") && !rel.includes(".."), `${item.id} has unsafe evidence ref ${reference}`);
    const target = path.resolve(packageRoot, rel);
    assert(target.startsWith(`${packageRoot}${path.sep}`), `${item.id} escapes package root`);
    assert(fs.existsSync(target), `${item.id} references missing file ${rel}`);
  }
  const next = item.next_professional_gate || {};
  assert(typeof next.owner === "string" && next.owner.length > 2, `${item.id} missing next gate owner`);
  assert(Array.isArray(next.required_artifacts) && next.required_artifacts.length >= 2, `${item.id} missing next gate artifacts`);
  assert(typeof next.stop_if === "string" && next.stop_if.length > 10, `${item.id} missing next gate stop condition`);
}
assert(weightSum === 100, `dimension weights sum to ${weightSum}, expected 100`);

if (process.exitCode) process.exit(1);
console.log(JSON.stringify({
  ok: true,
  id: reviewMap.id,
  dimensions: reviewMap.dimensions.length,
  rubric_weights_sum: weightSum,
  evidence_refs: reviewMap.dimensions.reduce((sum, item) => sum + item.evidence_refs.length, 0),
  formal_basis_ids: [...new Set(reviewMap.dimensions.flatMap((item) => item.formal_basis_ids))].length,
  official_boundary: boundary.official_boundary,
  operational_status: boundary.operational_status,
  not_an_official_score: boundary.not_an_official_score,
}, null, 2));
