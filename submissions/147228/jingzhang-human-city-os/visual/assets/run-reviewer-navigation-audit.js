#!/usr/bin/env node
"use strict";

// Offline structural audit for the reviewer-navigation index.  It checks
// package-local paths and local repository workflow/taskbook vocabularies only.
// It does not score the package or verify the truth, authority, or delivery of
// any cited claim.

const fs = require("fs");
const path = require("path");

const directory = __dirname;
const packageRoot = path.resolve(directory, "../..");
const repoRoot = path.resolve(packageRoot, "../../..");
const navigationPath = path.join(directory, "reviewer-navigation-index.json");
const outputPath = path.join(directory, "reviewer-navigation-audit.json");
const taskbookPath = path.join(repoRoot, "brief/site-package/agent_taskbook.json");
const reviewerScriptPath = path.join(repoRoot, "scripts/review_submission.py");
const scorecardScriptPath = path.join(repoRoot, "scripts/generate_formal_scorecard.py");

const navigation = JSON.parse(fs.readFileSync(navigationPath, "utf8"));
const taskbook = JSON.parse(fs.readFileSync(taskbookPath, "utf8"));
const reviewerScript = fs.readFileSync(reviewerScriptPath, "utf8");
const scorecardScript = fs.readFileSync(scorecardScriptPath, "utf8");

function unique(items) {
  return [...new Set(items)];
}

function ids(items) {
  return Array.isArray(items) ? items.map((item) => item?.dimension_id).filter(Boolean) : [];
}

function difference(left, right) {
  const rightSet = new Set(right);
  return unique(left.filter((item) => !rightSet.has(item)));
}

function pathsInNavigation(index) {
  return (index.taskbook_review_dimensions || []).flatMap((dimension) =>
    (dimension.evidence_paths || []).map((evidencePath) => ({ dimension_id: dimension.dimension_id, path: evidencePath }))
  );
}

function resolvesPackagePath(relativePath) {
  if (typeof relativePath !== "string" || relativePath.length === 0) return false;
  const resolved = path.resolve(packageRoot, relativePath);
  return resolved.startsWith(`${packageRoot}${path.sep}`) && fs.existsSync(resolved) && fs.statSync(resolved).isFile();
}

function sourceFormalIds() {
  return unique([...reviewerScript.matchAll(/"dimension_id":\s*"([^"]+)"/g)].map((match) => match[1]));
}

function sourceFormalWeights(formalIds) {
  const values = Object.fromEntries([...scorecardScript.matchAll(/"([^"]+)":\s*(\d+),/g)]
    .map((match) => [match[1], Number(match[2])])
    .filter(([id]) => formalIds.includes(id)));
  return values;
}

function evaluate(index) {
  const taskbookIds = ids(taskbook.review_dimensions);
  const taskbookNavigationIds = ids(index.taskbook_review_dimensions);
  const formalIds = sourceFormalIds();
  const navigationFormalIds = ids(index.rubric_dimensions);
  const expectedWeights = sourceFormalWeights(formalIds);
  const actualWeights = Object.fromEntries((index.rubric_dimensions || []).map((dimension) => [
    dimension.dimension_id,
    dimension.workflow_weight_percent
  ]));
  const pathRecords = pathsInNavigation(index);
  const unresolvedPaths = pathRecords.filter((record) => !resolvesPackagePath(record.path));
  const duplicateTaskbookIds = taskbookNavigationIds.filter((id, position) => taskbookNavigationIds.indexOf(id) !== position);
  const duplicateFormalIds = navigationFormalIds.filter((id, position) => navigationFormalIds.indexOf(id) !== position);
  const weightMismatches = formalIds.filter((id) => expectedWeights[id] !== actualWeights[id]);
  const failures = [];

  if (index.not_a_score !== true) failures.push("not-a-score-flag-missing");
  if (index.formal_scorecard_basis?.is_official_jury_rubric !== false) failures.push("formal-scorecard-boundary-missing");
  if (index.taskbook_review_basis?.weights_registered_in_taskbook !== false) failures.push("taskbook-weight-boundary-missing");
  if (difference(taskbookIds, taskbookNavigationIds).length || difference(taskbookNavigationIds, taskbookIds).length || duplicateTaskbookIds.length) failures.push("taskbook-dimension-coverage");
  if (difference(formalIds, navigationFormalIds).length || difference(navigationFormalIds, formalIds).length || duplicateFormalIds.length) failures.push("formal-dimension-coverage");
  if (weightMismatches.length || Object.values(actualWeights).reduce((sum, value) => sum + Number(value || 0), 0) !== 100) failures.push("formal-workflow-weight-alignment");
  if (unresolvedPaths.length) failures.push("unresolved-evidence-path");

  return {
    failures,
    taskbook: {
      expected_ids: taskbookIds,
      registered_ids: taskbookNavigationIds,
      missing_ids: difference(taskbookIds, taskbookNavigationIds),
      unexpected_ids: difference(taskbookNavigationIds, taskbookIds),
      duplicate_ids: unique(duplicateTaskbookIds)
    },
    formal_scorecard: {
      expected_ids: formalIds,
      registered_ids: navigationFormalIds,
      missing_ids: difference(formalIds, navigationFormalIds),
      unexpected_ids: difference(navigationFormalIds, formalIds),
      duplicate_ids: unique(duplicateFormalIds),
      expected_weights: expectedWeights,
      registered_weights: actualWeights,
      weight_mismatches: weightMismatches,
      registered_weight_sum: Object.values(actualWeights).reduce((sum, value) => sum + Number(value || 0), 0)
    },
    paths: {
      total: pathRecords.length,
      resolved: pathRecords.length - unresolvedPaths.length,
      unresolved: unresolvedPaths
    }
  };
}

const check = evaluate(navigation);
const missingTaskbookSample = JSON.parse(JSON.stringify(navigation));
missingTaskbookSample.taskbook_review_dimensions = missingTaskbookSample.taskbook_review_dimensions.slice(1);
const missingTaskbookResult = evaluate(missingTaskbookSample);
const brokenPathSample = JSON.parse(JSON.stringify(navigation));
brokenPathSample.taskbook_review_dimensions[0].evidence_paths[0] = "not-a-package-file.md";
const brokenPathResult = evaluate(brokenPathSample);
const negativeSamples = [
  {
    id: "missing-taskbook-dimension",
    pass: missingTaskbookResult.failures.includes("taskbook-dimension-coverage")
  },
  {
    id: "unresolved-evidence-path",
    pass: brokenPathResult.failures.includes("unresolved-evidence-path")
  }
];

const result = {
  runner: "run-reviewer-navigation-audit.js",
  status: check.failures.length === 0 && negativeSamples.every((sample) => sample.pass) ? "PASS" : "FAIL",
  package_iteration: navigation.package_iteration,
  claim_level: "offline_navigation_path_and_local_vocabulary_resolution_only",
  network_calls: 0,
  formal_scorecard: check.formal_scorecard,
  taskbook: check.taskbook,
  path_resolution: check.paths,
  checks: check.failures,
  negative_samples: negativeSamples,
  scope_note: "Checks only taskbook/formal-scorecard dimension coverage, locally registered workflow weights, and package-local file paths. It does not assess design quality, claim truth, source authority, rights, reviewer judgment, implementation, field performance, or any score."
};

fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
if (process.argv.includes("--check") && result.status !== "PASS") process.exit(1);
