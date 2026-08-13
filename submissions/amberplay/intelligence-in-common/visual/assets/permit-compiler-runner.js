#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "spatiotemporal-permits.json"), "utf8"));
if (data.status !== "synthetic_tabletop_only_not_authorized_not_field_run") throw new Error("Synthetic-only status is required.");
if (data.deployment_decision !== "not_authorized_not_run" || data.field_performance !== null) throw new Error("No field or deployment claim is allowed.");
if (data.cases.length !== 3) throw new Error(`Expected 3 cross-tie cases, got ${data.cases.length}.`);

const requiredPermitFields = ["place_condition", "time_window", "max_footprint", "kit", "minimum_staff", "valid_until", "restore"];
let options = 0;
for (const item of data.cases) {
  if (item.options.length !== 3) throw new Error(`${item.case_id}: exactly 3 options required.`);
  options += item.options.length;
  if (item.options.filter((option) => option.human_decision === "select_conditionally").length !== 1) {
    throw new Error(`${item.case_id}: exactly one conditionally selected human decision required.`);
  }
  for (const field of requiredPermitFields) if (!item.permit[field]) throw new Error(`${item.case_id}: missing permit.${field}`);
}

process.stdout.write(JSON.stringify({
  result: "PASS",
  mode: "read_only_zero_network_synthetic_permit_tabletop",
  cross_tie_cases: data.cases.length,
  compared_options: options,
  permits_with_all_fields: data.cases.length,
  human_selected_options: data.cases.length,
  field_performance: null,
  deployment_decision: "not_authorized_not_run"
}, null, 2) + "\n");
