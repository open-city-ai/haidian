#!/usr/bin/env node
// Validate human field records without converting planned values into results.
const fs = require("fs");
const crypto = require("crypto");
const [observationsPath, kitPath, outputPath] = process.argv.slice(2);
if (!observationsPath || !kitPath || !outputPath) throw new Error("usage: validate_field_evidence.js OBSERVATIONS KIT OUTPUT");
const observationBytes = fs.readFileSync(observationsPath);
const kitBytes = fs.readFileSync(kitPath);
const observations = JSON.parse(observationBytes.toString("utf8"));
const kit = JSON.parse(kitBytes.toString("utf8"));
const rows = observations.observations || [];
const routes = kit.routes || [];
const errors = [];
if (rows.length !== 12) errors.push(`expected 12 observations, found ${rows.length}`);
if (routes.length !== 6) errors.push(`expected 6 task routes, found ${routes.length}`);
if (new Set(rows.map((r) => r.id)).size !== rows.length) errors.push("observation ids must be unique");
const completed = rows.filter((r) => r.status === "completed");
for (const row of completed) {
  if (!/^\d{4}-\d{2}-\d{2}T/.test(row.observed_at || "")) errors.push(`${row.id}: observed_at must be ISO 8601`);
  if (!Array.isArray(row.coordinates_wgs84) || row.coordinates_wgs84.length !== 2 || !row.coordinates_wgs84.every(Number.isFinite)) errors.push(`${row.id}: two numeric WGS84 coordinates required`);
  if (!Array.isArray(row.photo_paths) || row.photo_paths.length === 0) errors.push(`${row.id}: at least one reviewed relative photo path required`);
  if (!Array.isArray(row.limitations) || row.limitations.length === 0) errors.push(`${row.id}: limitations must remain explicit`);
  if (row.professional_survey === true || row.official_boundary_evidence === true) errors.push(`${row.id}: phone fieldwork cannot claim survey or official boundary evidence`);
}
const output = {
  validator_version: "1.1.0",
  observation_sha256: crypto.createHash("sha256").update(observationBytes).digest("hex"),
  kit_sha256: crypto.createHash("sha256").update(kitBytes).digest("hex"),
  summary: {planned_records: rows.length - completed.length, completed_records: completed.length, task_routes: routes.length, errors: errors.length},
  status: errors.length ? "blocked" : completed.length === 12 ? "ready_for_human_evidence_review" : "ready_for_human_execution",
  errors,
  claim_boundary: "This validator checks record structure only; a human must verify authenticity, privacy, and interpretation."
};
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");
