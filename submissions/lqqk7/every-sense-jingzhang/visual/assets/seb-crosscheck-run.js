#!/usr/bin/env node
/*
 * SEB 双实现对拍 / SEB two-implementation cross-check
 *
 * 本脚本不作任何 SEB 判定，也不接触任何真实参与者、现场设备或运行中的系统，不写入
 * metrics.json。它只做一件事：把 package-integrity-gates.json 的 PG-10 闸门里原本以
 * 叙述文本记录的读数与承诺，改写成可执行断言，并在每次运行时当场复核。
 *
 * This script issues no SEB verdict of its own. It touches no real participant, no site
 * equipment and no running system, and writes nothing to metrics.json. It does one thing:
 * it turns the readings and promises that PG-10 of package-integrity-gates.json used to
 * record as prose into executable assertions, and re-checks them on every run.
 *
 * 三段断言 / Three groups of assertions
 * [A] 定点读数：两个校验器的退出码与汇总计数写死在本文件里，与本次实跑逐项比对。
 *     此前「60 条 60／60（通过 23、拒绝 37）」「4／4」「读数不符项 0」只是闸门 JSON
 *     里的叙述文本，样例集少一条时读数会静默变化而闸门仍判 PASS。
 * [B] 判定码登记表双向一致：两个实现各自导出本次可发判定码全集（--print-emittable-codes），
 *     须逐个登记在基准的 violation_code_registry 中，且登记表中的每个码都须至少被一个
 *     实现可发。只查一个方向会让登记表里长出无人执行的孤儿码而无人察觉。
 * [C] 同一非法输入两实现同判：把同一处变异施加在包的一份临时镜像上，分别喂给两个
 *     实现，退出码必须相等且等于预期。PG-10 明文要求「同一非法输入在两个实现下必须
 *     得到同一判定」，此前没有任何可执行体去核这句话——删掉整张判定码登记表时，一个
 *     实现退出 2，另一个退出 0 且输出与干净运行逐字节相同。
 *
 * [A] Fixed readings: the exit codes and summary counts of both checkers are written into
 *     this file and compared item by item against this run. The prose readings in the gate
 *     JSON changed silently whenever the fixture set did, while the gate still read PASS.
 * [B] The verdict-code registry agrees in both directions: each implementation exports the
 *     set of codes it can emit this run (--print-emittable-codes); every one must be
 *     registered in the baseline's violation_code_registry, and every registered code must
 *     be emittable by at least one implementation. Checking one direction only lets orphan
 *     codes that nobody executes grow in the registry unnoticed.
 * [C] One illegal input, one verdict: the same mutation is applied to a temporary mirror of
 *     the package and fed to both implementations, whose exit codes must be equal and equal
 *     to the expectation. PG-10 states that the same illegal input must draw the same
 *     verdict from both implementations, and nothing executable used to check that claim —
 *     with the whole verdict-code registry deleted, one implementation exited 2 while the
 *     other exited 0 with output byte-identical to a clean run.
 *
 * 用法 / Usage: node seb-crosscheck-run.js
 * 零依赖，仅使用 Node 内置模块（Node >= 18）；无网络访问；镜像建在系统临时目录下并在
 * 结束时删除，包内文件只读。本工具版本 0.1.0。
 * Zero dependencies, Node built-ins only (Node >= 18), no network access; the mirror is
 * built under the system temp directory and removed at the end, and the package's own files
 * are only ever read. Tool version 0.1.0.
 * 退出码 / Exit codes:
 *   0 — 三段断言全部成立 / every assertion in all three groups holds
 *   1 — 至少一条断言不成立 / at least one assertion does not hold
 *   2 — 不作判定：镜像无从建立，或某次运行未能给出退出码
 *       no verdict issued: the mirror could not be built, or a run returned no exit code
 */

"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const HERE = __dirname;
const PKG = path.resolve(HERE, "..", "..");
const TABLETOP = "seb-tabletop-run.js";
const CHAIN = "seb-op04-chain-run.js";
const SPEC_NAME = "seb-spec.json";
const CHAIN_DATA_NAME = "seb-op04-chain-data.json";

// PG-10 的三组读数在此写死。样例集或声明集变动时，这里与闸门 JSON 必须同步改，
// 「改了多少条」因此再也不能只存在于叙述文本里。
// The three readings of PG-10 are pinned here. A change to the fixture or claim set has to
// be made here and in the gate JSON together, so "how many items changed" can no longer
// live in prose alone.
const EXPECTED_TABLETOP = { exit: 0, accepted: 23, rejected: 39, matched: 62, total: 62 };
const EXPECTED_CHAIN = { exit: 0, claimsMatched: 4, claimsTotal: 4, disagreeing: 0 };

let failures = 0;
const fail = (msg) => { failures += 1; console.log("    不符 / MISMATCH : " + msg); };
const ok = (msg) => console.log("    一致 / match : " + msg);
const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));

function run(dir, script, args) {
  const result = spawnSync(process.execPath, [path.join(dir, script)].concat(args || []), {
    cwd: dir, encoding: "utf8"
  });
  if (result.status === null || result.status === undefined) {
    console.log("[!] 运行未给出退出码，不作判定 / a run returned no exit code; no verdict is issued");
    console.log("    " + script + (result.error ? " : " + result.error.message : ""));
    process.exit(2);
  }
  return { code: result.status, out: result.stdout || "", err: result.stderr || "" };
}

function figures(text, pattern) {
  const match = text.match(pattern);
  return match ? match.slice(1).map((part) => parseInt(part, 10)) : null;
}

function compare(label, got, want) {
  if (got === want) return true;
  fail(label + " " + got + " ≠ 期望 " + want + " / " + label + " " + got + " ≠ expected " + want);
  return false;
}

console.log("SEB 双实现对拍 / SEB two-implementation cross-check");
console.log("性质 / Nature   : 自检脚本的自检，不作任何 SEB 判定，不产生任何绩效指标数值");
console.log("                  a self-check of the self-checks; it issues no SEB verdict and no metric value");
console.log("");

/* ---------------------------------------------------------------- [A] ---- */
console.log("[A] 定点读数 / Fixed readings");
const tabletop = run(HERE, TABLETOP);
compare("桌面校验器退出码 / tabletop exit code", tabletop.code, EXPECTED_TABLETOP.exit);
const accepted = figures(tabletop.out, /通过 \/ accepted : (\d+)/);
const rejected = figures(tabletop.out, /拒绝 \/ rejected : (\d+)/);
const matched = figures(tabletop.out, /与期望一致 \/ matching expectation : (\d+) \/ (\d+)/);
if (!accepted || !rejected || !matched) {
  fail("桌面校验器的汇总读数无从解析 / the tabletop summary readings could not be parsed");
} else {
  compare("通过 / accepted", accepted[0], EXPECTED_TABLETOP.accepted);
  compare("拒绝 / rejected", rejected[0], EXPECTED_TABLETOP.rejected);
  compare("与期望一致 / matching expectation", matched[0], EXPECTED_TABLETOP.matched);
  compare("样例总数 / fixture total", matched[1], EXPECTED_TABLETOP.total);
  if (accepted[0] + rejected[0] !== matched[1]) {
    fail("通过与拒绝之和 " + (accepted[0] + rejected[0]) + " ≠ 样例总数 " + matched[1]
      + " / accepted plus rejected does not equal the fixture total");
  }
}

const chain = run(HERE, CHAIN);
compare("证据链复演器退出码 / chain replay exit code", chain.code, EXPECTED_CHAIN.exit);
const claims = figures(chain.out, /claims matching expectation : (\d+) \/ (\d+)/);
const disagreeing = figures(chain.out, /disagreeing figures : (\d+)/);
if (!claims || !disagreeing) {
  fail("证据链复演器的汇总读数无从解析 / the chain replay summary readings could not be parsed");
} else {
  compare("声明判定与期望一致 / claims matching expectation", claims[0], EXPECTED_CHAIN.claimsMatched);
  compare("声明总数 / claim total", claims[1], EXPECTED_CHAIN.claimsTotal);
  compare("读数不符项 / disagreeing figures", disagreeing[0], EXPECTED_CHAIN.disagreeing);
}
if (failures === 0) {
  ok("两个校验器的退出码与全部汇总读数与本文件写死的期望逐项相等 / both exit codes and every summary reading equal the expectations pinned in this file");
}
console.log("");

/* ---------------------------------------------------------------- [B] ---- */
console.log("[B] 判定码登记表双向比对 / Registry agreement in both directions");
const CODE_LINE = /EMITTABLE_CODES_JSON (\[.*\])/;
function codeSet(script) {
  const result = run(HERE, script, ["--print-emittable-codes"]);
  const match = (result.out + result.err).match(CODE_LINE);
  if (!match) {
    fail(script + " 未导出可发码全集 / " + script + " exported no emittable code set");
    return null;
  }
  return JSON.parse(match[1]);
}
const registry = Object.keys(readJson(path.join(HERE, SPEC_NAME)).violation_code_registry.codes);
const tabletopCodes = codeSet(TABLETOP);
const chainCodes = codeSet(CHAIN);
if (tabletopCodes && chainCodes) {
  const union = [...new Set(tabletopCodes.concat(chainCodes))];
  const outside = (codes) => codes.filter((code) => registry.indexOf(code) === -1);
  outside(tabletopCodes).forEach((code) => fail("桌面校验器可发的 " + code + " 未登记在基准登记表内 / " + code + " is emittable by the tabletop checker but not registered"));
  outside(chainCodes).forEach((code) => fail("证据链复演器可发的 " + code + " 未登记在基准登记表内 / " + code + " is emittable by the chain replay but not registered"));
  registry.filter((code) => union.indexOf(code) === -1)
    .forEach((code) => fail("登记表中的 " + code + " 两个实现都不可发，是无人执行的孤儿码 / " + code + " is registered yet emittable by neither implementation"));
  if (failures === 0) {
    console.log("    桌面校验器 / tabletop  : " + tabletopCodes.length + " 个可发码");
    console.log("    证据链复演器 / chain    : " + chainCodes.length + " 个可发码");
    console.log("    基准登记表 / registry  : " + registry.length + " 个登记码");
    ok("两实现可发码全集 ⊆ 登记表，且登记表 ⊆ 两实现可发码之并，双向相等 / each emittable set is contained in the registry and the registry is covered by their union");
  }
}
console.log("");

/* ---------------------------------------------------------------- [C] ---- */
console.log("[C] 同一非法输入两实现同判 / One illegal input, one verdict");

const chainArchive = readJson(path.join(HERE, CHAIN_DATA_NAME));
// 镜像只带两个实现真正读取的文件；受回执路径由档案自身声明，不在此写死。
// The mirror carries only the files the two implementations actually read; the receipt path
// is declared by the archive itself rather than pinned here.
const MIRROR_FILES = [
  "visual/assets/" + SPEC_NAME,
  "visual/assets/seb-tabletop-fixtures.json",
  "visual/assets/" + CHAIN_DATA_NAME,
  "visual/assets/" + TABLETOP,
  "visual/assets/" + CHAIN,
  chainArchive.stage_6_change_receipt.receipt_file,
  "geometry/constraints.geojson",
  "geometry/roads.geojson",
];

const specOf = (root) => path.join(root, "visual", "assets", SPEC_NAME);
const writeJson = (p, value) => fs.writeFileSync(p, JSON.stringify(value, null, 1), "utf8");

const MUTATIONS = [
  {
    id: "clean",
    zh: "未施加变异（对照，用以证明镜像忠实）",
    expect: 0,
    apply: () => {},
  },
  {
    id: "registry_table_removed",
    zh: "删掉整张 violation_code_registry.codes",
    expect: 2,
    apply: (root) => {
      const spec = readJson(specOf(root));
      delete spec.violation_code_registry.codes;
      writeJson(specOf(root), spec);
    },
  },
  {
    id: "gate_code_unregistered",
    zh: "把 level_definitions.gate_violation_code 改成未登记的码",
    expect: 2,
    apply: (root) => {
      const spec = readJson(specOf(root));
      spec.components.find((c) => c.component_id === "level_definitions").gate_violation_code = "UNREGISTERED_GATE_CODE";
      writeJson(specOf(root), spec);
    },
  },
  {
    id: "spec_not_json",
    zh: "基准文件截断为非法 JSON",
    expect: 2,
    apply: (root) => fs.writeFileSync(specOf(root), "{\"spec_id\": \"seb\", \"components\": [", "utf8"),
  },
  {
    id: "node_schema_removed",
    zh: "删掉 node_schema 组件",
    expect: 2,
    apply: (root) => {
      const spec = readJson(specOf(root));
      spec.components = spec.components.filter((c) => c.component_id !== "node_schema");
      writeJson(specOf(root), spec);
    },
  },
];

let mirrorRoot = null;
try {
  mirrorRoot = fs.mkdtempSync(path.join(os.tmpdir(), "seb-crosscheck-"));
} catch (error) {
  console.log("[!] 临时镜像无从建立，不作判定 / the temporary mirror could not be created; no verdict is issued");
  console.log("    " + error.message);
  process.exit(2);
}

try {
  for (const mutation of MUTATIONS) {
    const root = path.join(mirrorRoot, mutation.id);
    for (const relative of MIRROR_FILES) {
      const destination = path.join(root, relative);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(PKG, relative), destination);
    }
    mutation.apply(root);
    const assets = path.join(root, "visual", "assets");
    const one = run(assets, TABLETOP);
    const two = run(assets, CHAIN);
    const line = "    " + mutation.id + " · " + mutation.zh
      + " → 桌面 " + one.code + " · 复演 " + two.code + "（期望 " + mutation.expect + "）";
    if (one.code !== two.code) {
      fail(mutation.id + " 两实现退出码分歧：桌面 " + one.code + " · 复演 " + two.code
        + " / the two implementations disagree on the same input");
    } else if (one.code !== mutation.expect) {
      fail(mutation.id + " 两实现同判为 " + one.code + "，期望 " + mutation.expect
        + " / both implementations returned " + one.code + " where " + mutation.expect + " was expected");
    } else {
      console.log(line);
    }
  }
} finally {
  fs.rmSync(mirrorRoot, { recursive: true, force: true });
}
console.log("");

/* --------------------------------------------------------------- 汇总 ---- */
console.log("汇总 / Summary");
console.log("    定点读数 / fixed readings : 桌面 通过 " + EXPECTED_TABLETOP.accepted
  + " · 拒绝 " + EXPECTED_TABLETOP.rejected + " · " + EXPECTED_TABLETOP.matched + " / " + EXPECTED_TABLETOP.total
  + "；复演 " + EXPECTED_CHAIN.claimsMatched + " / " + EXPECTED_CHAIN.claimsTotal
  + " · 读数不符项 " + EXPECTED_CHAIN.disagreeing);
console.log("    同判变异 / cross-checked mutations : " + MUTATIONS.length + " 组");
console.log("    断言不成立项 / failing assertions : " + failures);
console.log("    本次运行不写入 metrics.json，七项包容性指标保持 unknown");
console.log("    this run writes nothing to metrics.json; the seven inclusion metrics stay unknown");

process.exit(failures === 0 ? 0 : 1);
