#!/usr/bin/env node
/* MEET YARD 会车协议确定性演练（deterministic drill, no network, no dependencies).
 *
 * 读取 visual/assets/data/meet-protocol.schema.json，对状态机契约执行 13 项确定性检查：
 *   1. schema 可解析且必填字段齐全
 *   2. status_codes 恰好 8 值且与中文标签一一对应
 *   3. transitions 的目标状态全部在 status_codes 内
 *   4. 从 APPLIED 出发所有状态可达
 *   5. ARCHIVED 为终态（无出边）
 *   6. PAUSED 恢复必须回到 CROSS_VERIFICATION（不可直接回试行）
 *   7. record_status=draft -> status_code=null 规则成立（规则字段存在）
 *   8. risk_levels 枚举与升级规则字段存在
 *   9. 7 类角色齐全且 role_fields 四字段（可以/不可以/必须记录/缺席处理）
 *  10. fixture 合法序列 APPLIED->DISCLOSED->CROSS_VERIFICATION->HUMAN_REVIEWED->PILOTING->ARCHIVED 通过
 *  11. fixture 非法序列 APPLIED->PILOTING 被拒绝
 *  12. fixture 未知状态被拒绝
 *  13. 全部状态存在分状态必填字段定义
 *
 * 输出 JSON 证据到 visual/assets/data/meet-protocol-drill.json；exit 0 当且仅当全部通过。
 */
"use strict";

const fs = require("fs");
const path = require("path");

const SCRIPT_DIR = __dirname;
const SCHEMA_PATH = path.join(SCRIPT_DIR, "data", "meet-protocol.schema.json");
const DRILL_PATH = path.join(SCRIPT_DIR, "data", "meet-protocol-drill.json");
const ALL_CHECKS = 14;

function loadSchema() {
  return JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf-8"));
}

function collectChecks() {
  const checks = [];
  const add = (check_id, passed, message) =>
    checks.push({
      check_id,
      result: passed ? "pass" : "fail",
      severity: "blocking",
      target: "meet-protocol.schema.json",
      message,
    });

  let schema;
  try {
    schema = loadSchema();
  } catch (exc) {
    checks.push({
      check_id: "SCHEMA_JSON_VALID",
      result: "fail",
      severity: "blocking",
      target: "meet-protocol.schema.json",
      message: `schema JSON 解析失败: ${exc.message}`,
    });
    return checks;
  }

  // 1. required top-level fields
  const requiredTop = [
    "protocol_steps", "status_codes", "status_code_zh", "record_statuses",
    "transitions", "terminal_states", "risk_levels", "roles", "roles_zh",
    "role_fields", "required_fields_per_state",
  ];
  const missing = requiredTop.filter((k) => !(k in schema));
  add("SCHEMA_REQUIRED_FIELDS", missing.length === 0, `必填字段缺失: ${missing.join(",") || "无"}`);

  // 2. status_codes exactly 8 unique
  const codes = schema.status_codes || [];
  add("STATUS_CODE_COUNT_8", codes.length === 8 && new Set(codes).size === 8, `status_codes 数量=${codes.length}（要求 8 值，proposal §06.1.2）`);

  // 3. zh mapping 1:1
  const zh = schema.status_code_zh || {};
  add(
    "STATUS_CODE_ZH_MAPPING",
    codes.length === 8 && Object.keys(zh).length === 8 && codes.every((c) => c in zh),
    "status_code_zh 与 status_codes 一一对应"
  );

  // 4. transition targets valid
  const states = new Set(codes);
  const badTargets = [];
  for (const targets of Object.values(schema.transitions || {})) {
    for (const t of targets) if (!states.has(t) && !badTargets.includes(t)) badTargets.push(t);
  }
  add("TRANSITION_TARGETS_VALID", badTargets.length === 0, `非法转移目标: ${badTargets.join(",") || "无"}`);

  // 5. all states reachable from APPLIED
  const seen = new Set();
  const walk = (s) => {
    if (seen.has(s)) return;
    seen.add(s);
    for (const nxt of (schema.transitions || {})[s] || []) walk(nxt);
  };
  walk("APPLIED");
  const unreachable = codes.filter((c) => !seen.has(c));
  add("ALL_STATES_REACHABLE", unreachable.length === 0, `不可达状态: ${unreachable.join(",") || "无"}`);

  // 6. ARCHIVED terminal
  const archivedOut = (schema.transitions || {}).ARCHIVED || [];
  add("ARCHIVED_TERMINAL", archivedOut.length === 0, `ARCHIVED 出边: ${archivedOut.join(",") || "无（终态）"}`);

  // 7. PAUSED recovery rule
  const paused = (schema.transitions || {}).PAUSED || [];
  add(
    "PAUSED_RECOVERY_RULE",
    paused.includes("CROSS_VERIFICATION") && !paused.includes("PILOTING"),
    `PAUSED 出边 [${paused.join(",")}]（须含 CROSS_VERIFICATION 且不得直通 PILOTING）`
  );

  // 8. record_status rule
  add(
    "RECORD_STATUS_RULE",
    Array.isArray(schema.record_statuses) && typeof schema.record_status_rule === "string" && schema.record_status_rule.length > 0,
    "record_status 枚举与 draft->null 规则字段存在"
  );

  // 9. risk levels
  add(
    "RISK_LEVELS_VALID",
    JSON.stringify(schema.risk_levels) === JSON.stringify(["green", "amber", "red"]) &&
      typeof schema.risk_escalation_rule === "string" && schema.risk_escalation_rule.length > 0,
    "risk_levels=绿/琥珀/红 且升级规则字段存在"
  );

  // 10. roles 7 + 4 fields
  const roles = schema.roles || [];
  const roleKeys = Object.keys(schema.roles_zh || {});
  add(
    "ROLES_7_FIELDS_4",
    roles.length === 7 && new Set(roles).size === 7 &&
      roleKeys.length === 7 && roles.every((r) => roleKeys.includes(r)) &&
      JSON.stringify(schema.role_fields) === JSON.stringify(["can", "cannot", "must_record", "absent_handling"]),
    `角色 ${roles.length} 类、字段 ${JSON.stringify(schema.role_fields)}`
  );

  // 11-13. fixtures
  const legal = (seq) => {
    for (let i = 0; i < seq.length - 1; i++) {
      const a = seq[i], b = seq[i + 1];
      if (!states.has(a) || !states.has(b)) return false;
      if (!((schema.transitions || {})[a] || []).includes(b)) return false;
    }
    return true;
  };
  add("FIXTURE_VALID_SEQUENCE", legal(["APPLIED", "DISCLOSED", "CROSS_VERIFICATION", "HUMAN_REVIEWED", "PILOTING", "ARCHIVED"]), "合法序列 预约→披露→互证→人审→试行→归档 通过");
  add("FIXTURE_INVALID_SEQUENCE", !legal(["APPLIED", "PILOTING"]), "非法序列 申请中→限域试行 被拒绝");
  add("FIXTURE_UNKNOWN_STATE", !legal(["APPLIED", "DISCLOSED", "MYSTERY_STATE"]), "未知状态被拒绝");

  // 13. per-state required fields present
  const rfps = schema.required_fields_per_state || {};
  const rfpsOk = codes.length === 8 && codes.every((c) => Array.isArray(rfps[c]) && rfps[c].length > 0);
  add("PER_STATE_REQUIRED_FIELDS", rfpsOk, `分状态必填字段定义: ${codes.filter((c) => !rfpsOk || !(c in rfps)).join(",") || "齐全"}`);

  return checks;
}

function main() {
  const checks = collectChecks();
  const passed = checks.filter((c) => c.result === "pass").length;
  const ok = passed === checks.length && checks.length === ALL_CHECKS;
  const report = {
    ok,
    schema_path: "visual/assets/data/meet-protocol.schema.json",
    drill_total: ALL_CHECKS,
    drill_pass: passed,
    checks,
    generated_by: "visual/assets/check_meet_protocol.js",
    generated_at: "2026-08-15",
  };
  fs.writeFileSync(DRILL_PATH, JSON.stringify(report, null, 2) + "\n", "utf-8");
  process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  return ok ? 0 : 1;
}

process.exit(main());
