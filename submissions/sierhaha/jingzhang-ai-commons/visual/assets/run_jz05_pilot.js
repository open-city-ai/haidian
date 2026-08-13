#!/usr/bin/env node
/**
 * JZ-05 光储充驿站最小试点 · 本地桌面预演（电力碱基对机制的可复现证据脚本）
 *
 * 对应说明见 proposal.md 一页执行摘要与 report/narrative.md 附件九。
 * 用法:
 *   node visual/assets/run_jz05_pilot.js --check [--out visual/assets/jz05-pilot-evidence.json]
 */
"use strict";
const crypto = require("crypto");
const fs = require("fs");

// ---------- 固定合成 fixture（不连接真实系统） ----------
const FIXTURES = {
  pue: 1.18,                  // 候选目标 <= 1.25
  green_share: 0.85,          // 候选目标 >= 0.80
  self_healing_min: 4.2,      // 候选目标 <= 5 分钟
  human_channel_available: true,   // 人工通道可用率 100%
  min_data_fields: 6,         // 数据最小化：最小必要字段集
  rollback_steps: 5,          // 五步回滚/退出动作
};

// ---------- 十段执行链 ----------
const EXEC_CHAIN = [
  "问题", "场地", "数据", "系统权限", "人工Gate",
  "测试", "证据", "采用/拒绝", "反馈", "回滚/退役",
];

// ---------- G0-G6 七道运行 Gate ----------
const GATES = [
  { gate: "G0 问题与场地", status: "已定义",
    next: "official 候选场地、权属、无障碍与服务边界完成现场核查",
    fail: "保持桌面 fixture，不落位、不招募公众" },
  { gate: "G1 数据与权限", status: "已定义最小字段与只读沙箱；外部连接/识别/消息均禁止",
    next: "经授权数据责任方确认分类、保留、删除、日志与权限隔离",
    fail: "权限保持关闭；只允许人工比对预期数据" },
  { gate: "G2 人工责任与非AI路径", status: "责任角色已定义但未指派（单一A未落位）",
    next: "单一A、值守表、升级联系人、接管演练与无障碍走查全部确认",
    fail: "不得进入限域试用；公共服务继续走纯人工路径" },
  { gate: "G3 沙箱测试", status: "本地桌面预演通过；运营沙箱 run_status=not_run",
    next: "G0-G2 通过后，由授权团队在隔离环境复现 fixture 并生成真实职责日志",
    fail: "任一硬停止触发即隔离沙箱并执行回滚清单" },
  { gate: "G4 采用/拒绝", status: "决定权属于未来经授权服务主管；当前 pending",
    next: "人工逐项签署证据，可选择采用、拒绝、暂停或要求复测",
    fail: "不得自动上线；拒绝与负面结果使用同一披露结构" },
  { gate: "G5 限域试用", status: "尚不具备进入条件",
    next: "主体、场地、权限、真实数据必要性、保险、申诉、维护与成本 Gate 全部通过",
    fail: "任一项 unknown 即保持沙箱，不向真实业务扩展" },
  { gate: "G6 回滚/退役", status: "五步退出动作已写入；尚无真实系统需要执行",
    next: "停权、隔离、切人工、处置日志、发布回滚/退役记录均有完成证据",
    fail: "新版本必须另开凭证并从 G0 重新审查" },
];

// ---------- 六项验收条件 ----------
const ACCEPTANCE = [
  ["PUE 能效底线", FIXTURES.pue <= 1.25, `PUE=${FIXTURES.pue} <= 1.25`],
  ["绿电优先", FIXTURES.green_share >= 0.80, `绿电比例=${FIXTURES.green_share} >= 0.80`],
  ["韧性自愈", FIXTURES.self_healing_min <= 5.0, `自愈恢复=${FIXTURES.self_healing_min}min <= 5min`],
  ["可退出（人工通道）", !!FIXTURES.human_channel_available, "人工通道可用率 100%"],
  ["数据最小化", FIXTURES.min_data_fields >= 5, `最小必要字段集=${FIXTURES.min_data_fields} 项`],
  ["回滚可复现", FIXTURES.rollback_steps >= 5, `五步回滚动作=${FIXTURES.rollback_steps} 步`],
];

const STOP_BRANCHES = [
  "撤销权限", "停止入口并隔离", "全量切回纸质/人工",
  "按规则处置日志", "仅保留空 fixture、事件复盘与回滚凭证",
];

function inputHash() {
  const h = crypto.createHash("sha256");
  Object.keys(FIXTURES).sort().forEach((k) => h.update(`${k}=${FIXTURES[k]}`));
  return h.digest("hex");
}

function runCheck() {
  const results = ACCEPTANCE.map(([criterion, ok, note]) => ({ criterion, pass: ok, note }));
  const allPass = results.every((r) => r.pass);
  return {
    schema_version: "0.1.0",
    pilot: "JZ-05 PV-Storage-Charging Station minimal pilot (Power Base-Pair)",
    execution_chain_stages: EXEC_CHAIN.length,
    execution_chain: EXEC_CHAIN,
    gate_count: GATES.length,
    gates: GATES,
    acceptance_criterion_count: ACCEPTANCE.length,
    acceptance_results: results,
    tabletop_all_pass: allPass,
    stop_branch_count: STOP_BRANCHES.length,
    stop_branches: STOP_BRANCHES,
    input_hash: inputHash(),
    honest_boundary:
      "Tabletop PASS only proves that the script, states, and exit branches are reproducible; " +
      "it does NOT prove real operation, human takeover, or service performance. " +
      "Real pilot is NOT AUTHORIZED / NOT RUN (G2 responsible owner not assigned; " +
      "G0-G1 site and data authorization incomplete).",
  };
}

function main() {
  const args = process.argv.slice(2);
  const check = args.includes("--check");
  if (!check) {
    console.log("Usage: node visual/assets/run_jz05_pilot.js --check [--out <path>]");
    process.exit(2);
  }
  const evidence = runCheck();
  const outIdx = args.indexOf("--out");
  if (outIdx !== -1 && args[outIdx + 1]) {
    fs.writeFileSync(args[outIdx + 1], JSON.stringify(evidence, null, 1), "utf8");
  }
  console.log(JSON.stringify(evidence, null, 1));
  process.exit(evidence.tabletop_all_pass ? 0 : 1);
}

main();
