#!/usr/bin/env node
// Dependency-free verifier for the frozen offline baseline traces.
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const root = path.resolve(__dirname);
const deepSort = (value) => Array.isArray(value) ? value.map(deepSort) : (value && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().map((k) => [k, deepSort(value[k])])) : value);
const canonical = (value) => JSON.stringify(deepSort(value));
const sha = (value) => crypto.createHash("sha256").update(canonical(value)).digest("hex");
const read = (name) => JSON.parse(fs.readFileSync(path.join(root, name), "utf8"));
const protocol = read("protocol.json");
const manifest = read("task-manifest.json");
const expected = manifest.length;
if (sha(manifest) !== protocol.task_manifest.task_manifest_sha256) throw new Error("task manifest hash mismatch");
for (const runId of ["urban_llm_harness", "single_llm_without_harness", "rule_only_scheduler"]) {
  const runRoot = path.join(root, "runs", runId);
  const run = JSON.parse(fs.readFileSync(path.join(runRoot, "run.json"), "utf8"));
  const results = JSON.parse(fs.readFileSync(path.join(runRoot, "task-results.json"), "utf8"));
  const calls = JSON.parse(fs.readFileSync(path.join(runRoot, "tool-calls.json"), "utf8"));
  const observations = JSON.parse(fs.readFileSync(path.join(runRoot, "observations.json"), "utf8"));
  const direct = results.filter((r) => r.outcome === "success" && r.audit_complete === true).length;
  const replanned = results.filter((r) => r.outcome === "replanned_recovery").length;
  const trace = sha({ task_results: results, tool_calls: calls, observations });
  if (results.length !== expected || observations.length !== expected || run.task_manifest_sha256 !== protocol.task_manifest.task_manifest_sha256 || run.aggregation.success_count !== direct || run.aggregation.replanned_recovery_count !== replanned || run.aggregation.success_rate !== direct / expected || run.trace_sha256 !== trace) {
    throw new Error(`${runId}: aggregate, manifest, or trace mismatch`);
  }
  console.log(`${runId}: ${direct}/${expected} = ${(direct / expected * 100).toFixed(0)}%; trace=${run.trace_sha256}`);
}
console.log(`manifest tasks: ${expected}; replay verification: PASS`);
