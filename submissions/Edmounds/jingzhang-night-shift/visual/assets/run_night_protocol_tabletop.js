#!/usr/bin/env node
/*
 * 京张夜班 v3 · 六态协议桌面演练 / Jingzhang Night Shift v3 tabletop replay.
 *
 * 用法（示例自提案包根目录；脚本按自身位置解析路径，任何工作目录均可执行）
 * Usage (shown from the package root; paths resolve against the script itself,
 * so it runs from any working directory):
 *   node visual/assets/run_night_protocol_tabletop.js           打印全部检查结果 / print all checks
 *   node visual/assets/run_night_protocol_tabletop.js --write   写入证据 / write night_protocol_evidence.json
 *   node visual/assets/run_night_protocol_tabletop.js --check   与已提交证据逐字节比对 / byte-compare with committed evidence
 *
 * 纯 Node 内置模块，无网络、无外部依赖，输出确定性可复演。
 * Pure built-in Node modules; offline, dependency-free, deterministic.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const HERE = __dirname;
const PACKAGE_ROOT = path.resolve(HERE, "..", "..");
const PROTOCOL_PATH = path.join(HERE, "night_protocol.json");
const CONSTRAINTS_PATH = path.join(PACKAGE_ROOT, "geometry", "constraints.geojson");
const PHASING_PATH = path.join(PACKAGE_ROOT, "geometry", "phasing.geojson");
const EVIDENCE_PATH = path.join(HERE, "night_protocol_evidence.json");

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function runChecks() {
  const protocol = loadJson(PROTOCOL_PATH);
  const constraints = loadJson(CONSTRAINTS_PATH);
  const phasing = loadJson(PHASING_PATH);

  const checks = [];
  const add = (id, zh, en, pass) => checks.push({ id, description_zh: zh, description_en: en, pass: Boolean(pass) });

  const states = protocol.states || [];
  const stateIds = states.map((s) => s.id);
  const transitions = protocol.transitions || [];
  const outgoing = new Map(stateIds.map((s) => [s, []]));
  for (const t of transitions) {
    if (outgoing.has(t.from)) outgoing.get(t.from).push(t.to);
  }

  add(
    "state_count",
    "协议恰好包含六个运行状态",
    "The protocol declares exactly six operating states",
    states.length === 6
  );

  add(
    "transition_endpoints_valid",
    "所有状态转移的起点和终点均为已声明状态",
    "Every transition starts and ends at a declared state",
    transitions.every((t) => stateIds.includes(t.from) && stateIds.includes(t.to))
  );

  const nonTerminal = states.filter((s) => !s.terminal).map((s) => s.id);
  add(
    "non_terminal_states_have_exit",
    "每个非终止状态都有至少一条外出转移",
    "Every non-terminal state has at least one outgoing transition",
    nonTerminal.every((s) => (outgoing.get(s) || []).length > 0)
  );

  add(
    "operating_states_can_pause",
    "已准入、运行中、安静态都可以进入已暂停",
    "admitted, live and quiet can each transition to paused",
    ["admitted", "live", "quiet"].every((s) => (outgoing.get(s) || []).includes("paused"))
  );

  add(
    "paused_has_two_ways_out",
    "已暂停既能回到申报重审，也能直接交接退出",
    "paused can return to proposed for re-review or exit via handed_over",
    (outgoing.get("paused") || []).includes("proposed") && (outgoing.get("paused") || []).includes("handed_over")
  );

  add(
    "live_quiet_bidirectional",
    "运行中与安静态可以双向切换",
    "live and quiet are bidirectional",
    (outgoing.get("live") || []).includes("quiet") && (outgoing.get("quiet") || []).includes("live")
  );

  const terminalStates = states.filter((s) => s.terminal).map((s) => s.id);
  add(
    "terminal_state_has_no_exit",
    "终止状态（已交接）没有外出转移",
    "The terminal state handed_over has no outgoing transition",
    terminalStates.length === 1 &&
      terminalStates[0] === "handed_over" &&
      (outgoing.get("handed_over") || []).length === 0
  );

  const gates = protocol.live_entry_gates || [];
  const expectedGates = [
    "human_responsible_on_duty",
    "non_ai_fallback_declared",
    "shutdown_action_defined",
    "recovery_evidence_defined",
  ];
  add(
    "live_entry_gates_complete",
    "进入运行中必须满足四项运行门：人工责任、非AI后备、停机动作、恢复证据",
    "Entering live requires all four gates: human duty, non-AI fallback, shutdown action, recovery evidence",
    gates.length === 4 && expectedGates.every((g) => gates.some((x) => x.id === g))
  );

  const bands = protocol.time_bands || [];
  const toMinutes = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };
  // Mark every minute of the day: rejects gaps AND overlaps, which a simple
  // duration sum would miss when they cancel each other out.
  const minuteCover = new Array(24 * 60).fill(0);
  for (const b of bands) {
    const start = toMinutes(b.start);
    const end = toMinutes(b.end);
    const span = end > start ? end - start : 24 * 60 - start + end;
    for (let i = 0; i < span; i += 1) minuteCover[(start + i) % (24 * 60)] += 1;
  }
  add(
    "time_bands_cover_24h",
    "四个时间带无缝且不重叠地覆盖 24 小时",
    "The four daily bands cover 24 hours with no gaps and no overlaps",
    bands.length === 4 && minuteCover.every((c) => c === 1)
  );

  const scenarioNodes = (constraints.features || []).filter((f) => f.properties && f.properties.layer === "SCENARIO_NODE");
  const requiredFields = protocol.scenario_required_fields || [];
  add(
    "scenario_nodes_count",
    "约束图层中恰好有十二个场景节点",
    "The constraints layer holds exactly twelve scenario nodes",
    scenarioNodes.length === 12
  );

  add(
    "scenario_readiness_fields_complete",
    "十二个场景节点的责任角色、停止条件、非AI后备、恢复证据与所属场地字段全部非空",
    "All twelve scenario nodes carry non-empty responsibility, stop, fallback, recovery and yard fields",
    scenarioNodes.every((f) =>
      requiredFields.every((k) => typeof f.properties[k] === "string" && f.properties[k].trim().length > 0)
    )
  );

  const yards = (constraints.features || []).filter(
    (f) => f.properties && f.properties.layer === "AI_SERVICE_ZONE" && String(f.properties.id).startsWith("NY-")
  );
  const yardIds = yards.map((f) => f.properties.id);
  add(
    "yards_all_referenced",
    "三座夜班场存在且每座至少承接一个场景节点",
    "All three night yards exist and each hosts at least one scenario node",
    yards.length === 3 && yardIds.every((y) => scenarioNodes.some((f) => f.properties.yard_id === y))
  );

  const phase1 = (phasing.features || []).find((f) => f.properties && f.properties.id === "PHASE-NS-01");
  add(
    "phase1_zero_new_permanent_construction",
    "阶段一在分期图层中承诺零永久新建（new_permanent_construction=false）",
    "Phase 1 declares zero new permanent construction in the phasing layer",
    Boolean(phase1) && phase1.properties.new_permanent_construction === false
  );

  return { protocol, checks };
}

function buildEvidence(checks) {
  return {
    evidence_id: "jingzhang-night-shift-protocol-replay",
    protocol_version: "3.0",
    replay_command: "node visual/assets/run_night_protocol_tabletop.js --check",
    determinism_note_zh: "本文件不含时间戳；相同输入必产生逐字节相同的输出。",
    determinism_note_en: "This file carries no timestamp; identical inputs reproduce it byte for byte.",
    input_files: {
      "visual/assets/night_protocol.json": sha256(PROTOCOL_PATH),
      "geometry/constraints.geojson": sha256(CONSTRAINTS_PATH),
      "geometry/phasing.geojson": sha256(PHASING_PATH),
    },
    check_count: checks.length,
    all_passed: checks.every((c) => c.pass),
    checks,
  };
}

function main() {
  const mode = process.argv[2] || "";
  const { checks } = runChecks();
  const evidence = buildEvidence(checks);
  const rendered = JSON.stringify(evidence, null, 2) + "\n";

  for (const c of checks) {
    process.stdout.write(`${c.pass ? "PASS" : "FAIL"}  ${c.id}  ${c.description_zh}\n`);
  }
  process.stdout.write(`\n${evidence.check_count} checks, all_passed=${evidence.all_passed}\n`);

  if (mode === "--write") {
    fs.writeFileSync(EVIDENCE_PATH, rendered);
    process.stdout.write(`evidence written: ${path.relative(PACKAGE_ROOT, EVIDENCE_PATH)}\n`);
  } else if (mode === "--check") {
    const committed = fs.readFileSync(EVIDENCE_PATH, "utf8");
    if (committed === rendered) {
      process.stdout.write("evidence check: MATCH (byte-identical replay)\n");
    } else {
      process.stdout.write("evidence check: MISMATCH — inputs changed, rerun with --write and review the diff\n");
      process.exitCode = 1;
    }
  }

  if (!evidence.all_passed) process.exitCode = 1;
}

main();
