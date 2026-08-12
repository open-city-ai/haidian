#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "../..");
const metricsPath = path.join(packageRoot, "metrics.json");
const metricsDocument = JSON.parse(fs.readFileSync(metricsPath, "utf8"));
const allowedTopLevelKeys = new Set(["schema_version", "units", "metrics"]);
const requiredMetricKeys = ["status", "value", "unit", "source_files", "formula", "confidence"];
const topLevelMetricKeys = Object.keys(metricsDocument).filter((key) => !allowedTopLevelKeys.has(key));
const metrics = metricsDocument.metrics;
const invalidRecords = [];

if (!metrics || typeof metrics !== "object" || Array.isArray(metrics)) {
  invalidRecords.push({ id: "metrics", reason: "metrics must be an object" });
}

for (const [id, metric] of Object.entries(metrics || {})) {
  if (!metric || typeof metric !== "object" || Array.isArray(metric)) {
    invalidRecords.push({ id, reason: "metric_record_must_be_an_object" });
    continue;
  }
  const missingKeys = requiredMetricKeys.filter((key) => !(key in metric));
  if (missingKeys.length > 0) invalidRecords.push({ id, reason: "missing_keys", keys: missingKeys });
  if (metric.status === "unknown" && metric.value !== null) {
    invalidRecords.push({ id, reason: "unknown_metric_must_have_null_value" });
  }
  if (metric.status === "known" && (metric.value === null || metric.value === undefined)) {
    invalidRecords.push({ id, reason: "known_metric_must_have_value" });
  }
}

const result = {
  runner: "run-metrics-schema-audit.js",
  status: topLevelMetricKeys.length === 0 && invalidRecords.length === 0 ? "PASS" : "FAIL",
  metric_count: Object.keys(metrics || {}).length,
  status_counts: Object.values(metrics || {}).reduce((counts, metric) => {
    const status = metric && typeof metric === "object" ? metric.status : "invalid";
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {}),
  required_record_keys: requiredMetricKeys,
  top_level_metric_keys: topLevelMetricKeys,
  invalid_records: invalidRecords,
  claim_scope: "Schema placement and status/value consistency only; no field performance or operational claim."
};

console.log(JSON.stringify(result, null, 2));
if (process.argv.includes("--check") && result.status !== "PASS") process.exit(1);
