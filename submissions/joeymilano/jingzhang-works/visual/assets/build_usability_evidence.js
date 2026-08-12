#!/usr/bin/env node
// Deterministically check service contracts; never infer missing evidence.
const fs = require("fs");
const crypto = require("crypto");
const [input, output] = process.argv.slice(2);
if (!input || !output) throw new Error("usage: build_usability_evidence.js INPUT OUTPUT");
const bytes = fs.readFileSync(input);
const data = JSON.parse(bytes.toString("utf8"));
const required = ["responsible_owner", "no_ai_equivalent", "minimum_data_rule", "human_takeover", "stop_condition", "validation_metric"];
const results = (data.journeys || []).map((item) => {
  const missing = required.filter((key) => !item[key]);
  return {id: item.id, status: missing.length ? "blocked" : "ready_for_field_review", missing, field_performance: item.field_performance ?? null};
});
const out = {
  compiler_version: "1.0.0",
  input_sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
  required_fields: required,
  summary: {total: results.length, ready: results.filter((r) => r.status === "ready_for_field_review").length, field_verified: results.filter((r) => r.field_performance !== null).length},
  results,
  disclaimer: "Structural readiness is not field performance or professional certification."
};
fs.writeFileSync(output, JSON.stringify(out, null, 2) + "\n");
