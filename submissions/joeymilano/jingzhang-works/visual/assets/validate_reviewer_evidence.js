#!/usr/bin/env node
// Check reviewer navigation and day-one drill structure without scoring the proposal.
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const [indexPath, drillPath, packageRoot, outputPath] = process.argv.slice(2);
if (!indexPath || !drillPath || !packageRoot || !outputPath) throw new Error("usage: validate_reviewer_evidence.js INDEX DRILL PACKAGE_ROOT OUTPUT");
const indexBytes = fs.readFileSync(indexPath);
const drillBytes = fs.readFileSync(drillPath);
const index = JSON.parse(indexBytes.toString("utf8"));
const drill = JSON.parse(drillBytes.toString("utf8"));
const expectedDimensions = ["brief_alignment", "originality", "ai_planning_innovation", "implementation_feasibility", "public_interest_inclusion", "risk_compliance", "expression_completeness"];
const expectedTasks = ["agent.1", "agent.2", "agent.3", "agent.4", "agent.5", "agent.6"];
const errors = [];
const dimensions = (index.rubric_questions || []).map((item) => item.dimension_id);
const tasks = (index.taskbook_direct_access || []).map((item) => item.requirement_id);
for (const id of expectedDimensions) if (!dimensions.includes(id)) errors.push(`missing rubric question ${id}`);
for (const id of expectedTasks) if (!tasks.includes(id)) errors.push(`missing taskbook access ${id}`);
if (new Set(dimensions).size !== dimensions.length) errors.push("rubric dimensions must be unique");
if (new Set(tasks).size !== tasks.length) errors.push("taskbook requirements must be unique");
for (const item of [...(index.rubric_questions || []), ...(index.taskbook_direct_access || [])]) {
  for (const ref of item.evidence_refs || item.answer_refs || []) {
    const file = ref.split("#")[0];
    if (!fs.existsSync(path.join(packageRoot, file))) errors.push(`missing evidence ref ${ref}`);
  }
}
if (drill.status !== "rehearsal_protocol_not_executed") errors.push("day-one drill must remain explicitly unexecuted");
if ((drill.run_of_day || []).length !== 7) errors.push("day-one drill must contain seven operating actions");
if ((drill.fault_cards || []).length !== 6) errors.push("day-one drill must contain six fault cards");
for (const key of ["site", "date", "people", "budget", "permit"]) if (drill.unconfirmed_fields?.[key] !== null) errors.push(`${key} must remain null until confirmed`);
const output = {
  validator_version: "1.7.0",
  index_sha256: crypto.createHash("sha256").update(indexBytes).digest("hex"),
  drill_sha256: crypto.createHash("sha256").update(drillBytes).digest("hex"),
  summary: {rubric_questions: dimensions.length, taskbook_links: tasks.length, operating_actions: (drill.run_of_day || []).length, fault_cards: (drill.fault_cards || []).length, errors: errors.length},
  status: errors.length ? "blocked" : "review_navigation_ready",
  errors,
  claim_boundary: "This validator checks navigation and protocol structure only. It does not assign a score or prove execution."
};
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");
