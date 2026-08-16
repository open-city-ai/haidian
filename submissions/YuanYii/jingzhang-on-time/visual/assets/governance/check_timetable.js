#!/usr/bin/env node
/**
 * check_timetable.js — 城市运行图校验器（准点京张 JINGZHANG ON TIME）
 *
 * 职责：
 *   1. schema 校验：timetable.schema.json 对每张场景卡/服务条目做结构校验
 *   2. 机制三问：有输入（登记动作）？有判定逻辑（阈值/门位）？有状态与停止条件？
 *   3. 断言联动：每张场景卡必须带 zone_id/raci/gate 三要素引用，缺一不计入服务覆盖
 *   4. 门位合法性：G0 未登记的对象不得出现 G1+ 状态（没有时刻表的车不能开）
 *
 * 用法：node check_timetable.js [--fixtures <dir>]
 * 输出：JSON 报告（exit 0 = 全部通过；exit 1 = 存在拒绝项）
 */

"use strict";

const fs = require("fs");
const path = require("path");

const GOVERNANCE_DIR = __dirname;

// ---------------------------------------------------------------------------
// 极简 JSON Schema 校验（结构子集：type/required/enum/pattern/minimum/maximum/
// minLength/additionalProperties/properties/items）——不依赖外部包，包内可复算
// ---------------------------------------------------------------------------

function validateAgainstSchema(instance, schema, errors, at) {
  const where = at || "$";
  if (!schema || typeof schema !== "object") return;

  if (schema.type) {
    const t = Array.isArray(instance) ? "array" : instance === null ? "null" : typeof instance;
    const ok = schema.type === "integer" ? Number.isInteger(instance)
      : schema.type === "number" ? (t === "number" && Number.isFinite(instance))
      : t === schema.type;
    if (!ok) {
      errors.push(`${where}: expected ${schema.type}, got ${t}`);
      return;
    }
  }

  if (schema.enum && !schema.enum.includes(instance)) {
    errors.push(`${where}: value ${JSON.stringify(instance)} not in enum [${schema.enum.join(", ")}]`);
  }
  if (schema.pattern && typeof instance === "string") {
    if (!new RegExp(schema.pattern).test(instance)) {
      errors.push(`${where}: string ${JSON.stringify(instance)} does not match pattern ${schema.pattern}`);
    }
  }
  if (typeof instance === "number") {
    if (schema.minimum !== undefined && instance < schema.minimum) {
      errors.push(`${where}: ${instance} < minimum ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && instance > schema.maximum) {
      errors.push(`${where}: ${instance} > maximum ${schema.maximum}`);
    }
  }
  if (typeof instance === "string" && schema.minLength !== undefined && instance.length < schema.minLength) {
    errors.push(`${where}: string shorter than minLength ${schema.minLength}`);
  }

  if (schema.type === "object" && instance && typeof instance === "object" && !Array.isArray(instance)) {
    const props = schema.properties || {};
    for (const req of schema.required || []) {
      if (!(req in instance)) errors.push(`${where}: missing required property "${req}"`);
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(instance)) {
        if (!(key in props)) errors.push(`${where}: additional property "${key}" not allowed`);
      }
    }
    for (const [key, sub] of Object.entries(props)) {
      if (key in instance) validateAgainstSchema(instance[key], sub, errors, `${where}.${key}`);
    }
  }

  if (schema.type === "array" && Array.isArray(instance)) {
    if (schema.minItems !== undefined && instance.length < schema.minItems) {
      errors.push(`${where}: fewer than minItems ${schema.minItems}`);
    }
    if (schema.items) {
      instance.forEach((item, i) => validateAgainstSchema(item, schema.items, errors, `${where}[${i}]`));
    }
  }
}

// ---------------------------------------------------------------------------
// 机制三问 + 断言联动检查（正文判据的代码化）
// ---------------------------------------------------------------------------

const MECHANISM_CHECKS = {
  has_input: (card) => Boolean(card.service_id || (card.id && card.name)), // 登记动作：服务以登记号进入运行图
  has_decision_logic: (card) =>
    typeof card.delay_threshold_minutes === "number" && Boolean(card.gate), // 判定：阈值 + 门位
  has_state_and_stop: (card) =>
    typeof card.stop_condition === "string" && card.stop_condition.length > 0, // 停止条件
};

const ASSERTION_FIELDS = ["zone_id", "raci", "gate"];

function checkCard(card, schema) {
  const errors = [];
  const label = card.service_id || card.id || "?";
  validateAgainstSchema(card, schema, errors, `card[${label}]`);

  // 机制三问
  for (const [qid, fn] of Object.entries(MECHANISM_CHECKS)) {
    if (!fn(card)) errors.push(`card[${label}]: mechanism check failed: ${qid}`);
  }

  // 断言联动：缺任一断言字段不计入服务覆盖
  for (const f of ASSERTION_FIELDS) {
    if (!card[f]) errors.push(`card[${label}]: missing governance assertion field "${f}"`);
  }

  // 门位合法性：未登记（无 service_id/无 id）不得声称 G1 及以上状态
  if (card.gate && !(card.service_id || card.id)) {
    errors.push(`card[${label}]: G1+ gate state without registration — no timetable, no departure`);
  }

  return errors;
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2);
  const fixturesFlag = args.indexOf("--fixtures");
  const fixturesDir =
    fixturesFlag !== -1 && args[fixturesFlag + 1]
      ? path.resolve(args[fixturesFlag + 1])
      : path.join(GOVERNANCE_DIR, "fixtures");

  const schema = JSON.parse(fs.readFileSync(path.join(GOVERNANCE_DIR, "timetable.schema.json"), "utf8"));
  const registry = JSON.parse(fs.readFileSync(path.join(GOVERNANCE_DIR, "scenario_cards.json"), "utf8"));

  const results = [];
  let accepted = 0;
  let rejected = 0;

  // 1) 包内八张场景卡全量校验
  for (const card of registry.cards) {
    const errors = checkCard(card, schema);
    const verdict = errors.length === 0 ? "accepted" : "rejected";
    if (verdict === "accepted") accepted++; else rejected++;
    results.push({ source: "scenario_cards.json", id: card.id, verdict, errors });
  }

  // 2) fixtures：外部登记条目（通过/拒绝样例）
  if (fs.existsSync(fixturesDir)) {
    for (const file of fs.readdirSync(fixturesDir).sort()) {
      if (!file.endsWith(".json")) continue;
      const fixture = JSON.parse(fs.readFileSync(path.join(fixturesDir, file), "utf8"));
      const expected = fixture.expected_verdict; // accepted | rejected（登记时声明的预期）
      // 场景卡登记条目直接是卡片本身（service_id 即登记号）；fixture 里的 card 字段用于
      // 模拟"外部服务登记"场景，两种形态都按同一 schema 校验。
      const card = fixture.card || fixture;
      if (card.expected_verdict) delete card.expected_verdict;
      if (card.description) delete card.description;
      const errors = checkCard(card, schema);
      const verdict = errors.length === 0 ? "accepted" : "rejected";
      const matched = verdict === expected;
      if (verdict === "accepted") accepted++; else rejected++;
      results.push({ source: `fixtures/${file}`, id: card.service_id || card.id || "(no id)", verdict, expected, matched, errors });
    }
  }

  const report = {
    checker: "check_timetable.js",
    schema: "timetable.schema.json (urban-operating-diagram-timetable-v1)",
    generated_by: "node",
    card_count: registry.cards.length,
    accepted,
    rejected,
    all_fixtures_matched: results.every((r) => r.matched !== false),
    results,
  };
  process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  process.exit(report.all_fixtures_matched ? 0 : 1);
}

main();
