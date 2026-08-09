(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.CityCommitCompiler = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const REQUIRED_PATHS = [
    "commit_id",
    "object.id",
    "object.current_state",
    "proposed_state",
    "evidence",
    "scope.place",
    "scope.time",
    "impact.affected_groups",
    "governance.human_owner",
    "governance.professional_review",
    "rights.non_ai_alternative",
    "rights.appeal_path",
    "success_metrics",
    "failure_triggers",
    "rollback.action",
    "records.retention_rule"
  ];

  function getPath(value, path) {
    return path.split(".").reduce((cursor, key) => (
      cursor && Object.prototype.hasOwnProperty.call(cursor, key) ? cursor[key] : undefined
    ), value);
  }

  function isPresent(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  }

  function compile(commit) {
    const errors = [];
    const holds = [];
    const notices = [];

    for (const path of REQUIRED_PATHS) {
      if (!isPresent(getPath(commit, path))) holds.push({ code: "MISSING_FIELD", path });
    }

    const evidence = Array.isArray(commit.evidence) ? commit.evidence : [];
    evidence.forEach((item, index) => {
      if (!isPresent(item.source_id) || !isPresent(item.claim) || !isPresent(item.limitations)) {
        holds.push({ code: "INCOMPLETE_EVIDENCE", path: `evidence[${index}]` });
      }
    });

    const risk = commit.risk_level;
    if (!["low", "medium", "high"].includes(risk)) {
      holds.push({ code: "INVALID_RISK_LEVEL", path: "risk_level" });
    }

    if (risk === "high") {
      if (commit.governance && commit.governance.automated_final_decision === true) {
        errors.push({ code: "HIGH_IMPACT_AUTOMATION_FORBIDDEN", path: "governance.automated_final_decision" });
      }
      if (!commit.governance || commit.governance.gate !== "limited_sandbox") {
        holds.push({ code: "HIGH_RISK_REQUIRES_LIMITED_SANDBOX", path: "governance.gate" });
      }
      if (!commit.governance || commit.governance.affected_group_signoff !== true) {
        holds.push({ code: "AFFECTED_GROUP_SIGNOFF_REQUIRED", path: "governance.affected_group_signoff" });
      }
    }

    if (commit.rights && commit.rights.non_ai_alternative === false) {
      errors.push({ code: "NON_AI_ALTERNATIVE_REQUIRED", path: "rights.non_ai_alternative" });
    }
    if (commit.rights && commit.rights.appeal_path === false) {
      errors.push({ code: "APPEAL_PATH_REQUIRED", path: "rights.appeal_path" });
    }
    if (commit.rollback && commit.rollback.tested === false && risk !== "low") {
      holds.push({ code: "ROLLBACK_TEST_REQUIRED", path: "rollback.tested" });
    }

    if (commit.geometry_status === "provisional_constraint") {
      notices.push({ code: "PROVISIONAL_GEOMETRY_RECALCULATION_REQUIRED" });
    }

    const status = errors.length ? "REJECT" : holds.length ? "HOLD" : "PASS";
    return {
      compiler: "2origin-city-commit-compiler",
      version: "0.1.0",
      commit_id: commit.commit_id || null,
      status,
      errors,
      holds,
      notices
    };
  }

  return { compile, REQUIRED_PATHS };
});
