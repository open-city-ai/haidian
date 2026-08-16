#!/usr/bin/env node
"use strict";

// Adds the standard_matrix.json rows for standard IDs that the proposal already cites.
// Three IDs were dangling: cited as [standard:...] in the body but absent from the
// matrix. The rows come verbatim from the bilingual source of truth; this script only
// merges by standard_id and never edits an existing row.
//
// Usage: node build-standards.js [--check]

const fs = require("node:fs");
const path = require("node:path");

const ASSETS = __dirname;
const PACKAGE_ROOT = path.resolve(ASSETS, "..", "..");
const MATRIX = path.join(PACKAGE_ROOT, "standard_matrix.json");
const SOURCE = path.join(ASSETS, "regeneration-source.json");

const REVIEW_STATUSES = new Set(["addressed", "data_gap", "not_applicable"]);
const REQUIRED_ARRAYS = [
  "proposal_sections",
  "drawing_refs",
  "geometry_refs",
  "metric_refs",
  "source_ids",
  "assumption_ids",
  "self_check_ids",
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// Mirrors the repository validator's rules so a malformed row fails here rather than
// during an audit that this session is not permitted to run.
function rowProblems(row) {
  const problems = [];
  if (typeof row.standard_id !== "string" || !row.standard_id) problems.push("missing standard_id");
  if (typeof row.requirement_zh !== "string" || !row.requirement_zh.trim()) problems.push("requirement_zh must be non-empty");
  if (typeof row.professional_dimension !== "string" || !row.professional_dimension.trim()) {
    problems.push("professional_dimension must be non-empty");
  }
  if (!REVIEW_STATUSES.has(row.review_status)) problems.push("review_status must be addressed, data_gap, or not_applicable");
  if (row.mandatory === true && row.review_status !== "addressed") problems.push("mandatory rows must be addressed");
  if (typeof row.evidence_summary_zh !== "string" || !row.evidence_summary_zh.trim()) {
    problems.push("evidence_summary_zh must be non-empty");
  }
  for (const key of REQUIRED_ARRAYS) {
    const value = row[key];
    if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== "string" || !item.trim())) {
      problems.push(`${key} must be a non-empty array of non-empty strings`);
    }
  }
  return problems;
}

function main(argv) {
  const checkOnly = argv.includes("--check");
  const matrix = readJson(MATRIX);
  const source = readJson(SOURCE);
  const additions = source.standards_additions.records;

  const failures = [];
  const rows = Array.isArray(matrix.standards) ? matrix.standards : [];
  const known = new Set(rows.map((row) => row.standard_id));
  const added = [];

  for (const row of additions) {
    const problems = rowProblems(row);
    for (const problem of problems) failures.push(`${row.standard_id}: ${problem}`);
    if (problems.length === 0 && !known.has(row.standard_id)) {
      rows.push(row);
      known.add(row.standard_id);
      added.push(row.standard_id);
    }
  }

  // Every ID the proposal cites must now have a row, in both languages.
  const dangling = [];
  for (const file of ["proposal.md", "proposal.en.md"]) {
    const body = fs.readFileSync(path.join(PACKAGE_ROOT, file), "utf8");
    for (const match of body.matchAll(/\[standard:([^\]\s]+)\]/g)) {
      if (!known.has(match[1]) && !dangling.includes(match[1])) dangling.push(match[1]);
    }
  }
  for (const id of dangling.sort()) failures.push(`${id} is cited in the proposal but has no standard_matrix row`);

  const next = { ...matrix, standards: rows };
  const serialized = `${JSON.stringify(next, null, 2)}\n`;
  const changed = serialized !== fs.readFileSync(MATRIX, "utf8");
  if (changed && !checkOnly && failures.length === 0) {
    fs.writeFileSync(MATRIX, serialized, "utf8");
  }

  const report = {
    status: failures.length === 0 ? "PASS" : "FAIL",
    exit_code: failures.length === 0 ? (checkOnly && changed ? 1 : 0) : 1,
    mode: checkOnly ? "check" : "write",
    changed,
    rows_after: rows.length,
    added_ids: added.sort(),
    dangling_cited_ids: dangling,
    failures,
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  return report.exit_code;
}

if (require.main === module) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (error) {
    process.stdout.write(`${JSON.stringify({
      status: "FAIL",
      exit_code: 2,
      error_type: "build_error",
      error: error instanceof Error ? error.message : String(error),
    }, null, 2)}\n`);
    process.exitCode = 2;
  }
}

module.exports = { rowProblems };
