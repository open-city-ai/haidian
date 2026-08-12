#!/usr/bin/env node

/* Deterministic evidence-map audit; it assigns no professional or official score. */
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "../..");
const assetRoot = path.join(packageRoot, "visual", "assets");
const mapPath = path.join(assetRoot, "ai-era-professional-review-map-v21.json");
const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));
const standards = JSON.parse(fs.readFileSync(path.join(packageRoot, "standard_matrix.json"), "utf8"));
const sources = JSON.parse(fs.readFileSync(path.join(packageRoot, "sources.json"), "utf8"));
const expected = [
  "brief_alignment",
  "originality",
  "ai_planning_innovation",
  "implementation_feasibility",
  "public_interest_inclusion",
  "risk_compliance",
  "expression_completeness",
];
const checks = [];
const check = (name, ok, detail) => checks.push({ name, ok: Boolean(ok), detail });
const exists = (relative) => fs.existsSync(path.join(packageRoot, relative));
const knownFormalIds = new Set([
  ...(standards.standards || []).map((item) => item.standard_id),
  ...(sources.sources || []).map((item) => item.id),
]);

check("iteration", map.package_iteration === "v2.1", map.package_iteration);
check("status", map.status === "reviewer_visible_evidence_map", map.status);
check("not_an_official_score", map.not_an_official_score === true, map.not_an_official_score);
check(
  "boundary",
  map.official_boundary === false && map.geometry_role === "provisional_constraint",
  `${map.official_boundary}/${map.geometry_role}`,
);
check(
  "non_operational",
  map.operational_status === "not_authorized_not_run" && map.performance_results === null,
  `${map.operational_status}/${map.performance_results}`,
);
check("dimension_count", Array.isArray(map.dimensions) && map.dimensions.length === expected.length, map.dimensions?.length);
check("dimension_order", JSON.stringify((map.dimensions || []).map((item) => item.dimension_id)) === JSON.stringify(expected), (map.dimensions || []).map((item) => item.dimension_id));

const seen = new Set();
for (const dimension of map.dimensions || []) {
  const id = dimension.dimension_id;
  check(`${id}:unique`, !seen.has(id), id);
  seen.add(id);
  for (const field of ["title_zh", "question_zh", "design_action_zh", "not_proven_zh", "next_gate_zh", "review_boundary_zh"]) {
    check(`${id}:${field}`, typeof dimension[field] === "string" && dimension[field].trim().length > 0, dimension[field]);
  }
  check(`${id}:confidence`, ["low", "medium", "high"].includes(dimension.confidence), dimension.confidence);
  check(`${id}:evidence_refs`, Array.isArray(dimension.evidence_refs) && dimension.evidence_refs.length >= 4, dimension.evidence_refs?.length);
  for (const reference of dimension.evidence_refs || []) {
    const relative = String(reference).split("#", 1)[0];
    check(`${id}:evidence:${reference}`, !relative.includes("..") && exists(relative), relative);
  }
  check(`${id}:formal_basis`, Array.isArray(dimension.formal_basis) && dimension.formal_basis.length > 0, dimension.formal_basis);
  for (const formalId of dimension.formal_basis || []) check(`${id}:formal:${formalId}`, knownFormalIds.has(formalId), formalId);
}
check("sequence", Array.isArray(map.review_sequence_zh) && map.review_sequence_zh.length === 3, map.review_sequence_zh?.length);
check("next_evidence", Array.isArray(map.next_evidence_zh) && map.next_evidence_zh.length >= 3, map.next_evidence_zh?.length);

const failures = checks.filter((item) => !item.ok);
const result = {
  ok: failures.length === 0,
  status: failures.length === 0 ? "PASS" : "FAIL",
  dimensions: map.dimensions?.length || 0,
  evidence_refs: (map.dimensions || []).reduce((sum, item) => sum + (item.evidence_refs || []).length, 0),
  failure_count: failures.length,
  checks,
  official_score: null,
  note: "package-only evidence-map audit; not a professional score, field result, approval, or publication signal",
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.ok ? 0 : 1;
