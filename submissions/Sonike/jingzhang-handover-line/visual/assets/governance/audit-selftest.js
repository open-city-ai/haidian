#!/usr/bin/env node
/*
 * 京张交接线 · 两个自检脚本的回归测试（离线、只读包内文件）
 *
 * 为什么需要它：同目录的 claims-audit.js 与 protocol-check-runner.js 都会自报「全部一致」，
 * 而一个只会通过的自检和没有自检是等价的。本包已经两次栽在这件事上：
 *   2026-08-20 之一：条件式 add() 让 F9／F10 在措辞改动后**从清单里消失**，脚本报 47/47、exit 0。
 *   2026-08-20 之二：为此加的 Z1 元检查把 ID 全集写死成 48 项却**不含 Z1 自己**，
 *                    删掉 add("Z1") 后脚本报 48/48、exit 0——外部复核发现的，不是自己发现的。
 * 两次都是「检查悄悄没跑」而不是「检查判错」。所以判据不能与被测对象同处一文件：
 * 本文件在被测脚本之外，用注入已知缺陷再要求它报错的方式，检验它到底还拦不拦得住。
 *
 * 用法：
 *   node audit-selftest.js          # 逐例结果，全部通过时退出码 0
 *   node audit-selftest.js --json   # 机器可读结果
 *
 * 不改包内任何文件：缺陷注入一律写进 os.tmpdir() 下的临时覆盖层，
 * 由被测脚本的 JZ_AUDIT_OVERLAY（改输入）与 JZ_AUDIT_HOME（改脚本自身）读入，跑完即删。
 * 不联网，不依赖任何第三方包。
 */
"use strict";
const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawnSync } = require("child_process");

const HERE = __dirname;
const PKG = path.resolve(HERE, "../../..");
const AUDITOR = "claims-audit.js";
const RUNNER = "protocol-check-runner.js";

/* 这份 61 项 ID 全集是**刻意重复**的第二份来源。
   claims-audit.js 里也有一份；两份不一致就说明有人动了其中一份，本文件会报错。
   判据与被测对象放在同一处，等于没有判据。 */
const IDS = [
  "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8",
  "S1", "S2", "S3", "S4",
  "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11",
  "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11",
  "F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
  "G1", "G2", "G3", "G4", "H1", "I1",
  "K1", "K2", "K3", "K4", "J1", "J2", "L1", "J3", "G5", "Z1",
];
const EXPECTED_SCALE = { ledgers: 12, rule_checks: 96, assertions: 48, rollback_evidence_checks: 12 };
/* protocol-check-runner.js 里也有一份 ENUM_SCALE 与 FAIL_CLOSED_SMART_LAYER。这里
   刻意再写一份：判据不能与被测对象同处一文件，两份分岔时正向用例即报错。 */
const ENUM_SCALE = { enum_fields: 18, enum_instances: 360 };
  const REASON_SCALE = { codes: 5, compat_rows: 4, compat_pairs: 7 };
const FAIL_CLOSED_SMART_LAYER = ["off", "sandbox_preview", "limited_trial"];

/* ---------------- 运行与临时覆盖层 ---------------- */
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "jz-audit-selftest-"));
process.on("exit", () => { try { fs.rmSync(TMP, { recursive: true, force: true }); } catch (e) {} });

let seq = 0;
const overlayWith = (files) => {
  const dir = path.join(TMP, `ov${++seq}`);
  for (const [rel, text] of Object.entries(files)) {
    const dest = path.join(dir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, text, "utf8");
  }
  return dir;
};
const textOf = (rel) => fs.readFileSync(path.join(PKG, rel), "utf8");
const jsonMutated = (rel, fn) => {
  const d = JSON.parse(textOf(rel));
  fn(d);
  return JSON.stringify(d, null, 2);
};
const scriptMutated = (name, fn) => {
  const dir = path.join(TMP, `src${++seq}`);
  fs.mkdirSync(dir, { recursive: true });
  const dest = path.join(dir, name);
  fs.writeFileSync(dest, fn(fs.readFileSync(path.join(HERE, name), "utf8")), "utf8");
  return dest;
};
const run = (script, env) => {
  const r = spawnSync(process.execPath, [script, "--json"], {
    encoding: "utf8", env: Object.assign({}, process.env, env || {}), maxBuffer: 64 * 1024 * 1024,
  });
  let json = null;
  try { json = JSON.parse(r.stdout); } catch (e) { /* 抛异常时 stdout 为空，看 stderr */ }
  return { code: r.status, json, stdout: r.stdout || "", stderr: r.stderr || "" };
};
const runAuditor = (env) => run(path.join(HERE, AUDITOR), env);
const runRunner = (env) => run(path.join(HERE, RUNNER), env);
const failedIds = (res) => (res.json && res.json.failures ? res.json.failures.map((f) => f.id) : []);

/* ---------------- 用例 ---------------- */
const cases = [];
const positive = (label, fn) => cases.push({ label, kind: "正向", fn });
const negative = (label, fn) => cases.push({ label, kind: "阴性", fn });

positive("claims-audit.js 全部通过，且恰好跑 61 项、ID 与本文件独立记录的全集逐位相同", () => {
  const r = runAuditor();
  if (r.code !== 0) return `退出码 ${r.code}，应为 0：${(failedIds(r).join("、") || r.stderr).slice(0, 300)}`;
  if (!r.json || r.json.all_match !== true) return "all_match 不为真";
  if (r.json.checks_run !== IDS.length) return `checks_run ${r.json.checks_run}，应为 ${IDS.length}`;
  const got = r.json.checks.map((c) => c.id);
  const bad = IDS.findIndex((x, i) => got[i] !== x);
  if (bad !== -1) return `第 ${bad + 1} 位应为 ${IDS[bad]}，实为 ${got[bad]}（两份 ID 全集已分岔）`;
  if (r.json.check_id_manifest_ok !== true) return "check_id_manifest_ok 不为真";
  return null;
});

positive("protocol-check-runner.js 全部通过，且规模恰为 12 账 / 96 规则 / 48 断言 / 12 回滚证据检查 / 18 枚举字段 / 360 枚举实例 / 5 理由码 / 7 兼容对，fail-closed 上限未被改动", () => {
  const r = runRunner();
  if (r.code !== 0) return `退出码 ${r.code}，应为 0`;
  if (!r.json || r.json.all_match !== true) return "all_match 不为真";
  const got = { ledgers: r.json.ledgers, rule_checks: r.json.rule_checks_recomputed,
                assertions: r.json.assertions_recomputed, rollback_evidence_checks: r.json.rollback_evidence_checked };
  for (const k of Object.keys(EXPECTED_SCALE)) {
    if (got[k] !== EXPECTED_SCALE[k]) return `${k} ${got[k]}，应为 ${EXPECTED_SCALE[k]}`;
  }
  if (r.json.rule_checks_matching_published !== EXPECTED_SCALE.rule_checks) return "规则检查有不一致";
  if (r.json.assertions_matching_published !== EXPECTED_SCALE.assertions) return "接管断言有不一致";
  if (r.json.enum_fields_in_schema !== ENUM_SCALE.enum_fields) {
    return `schema 枚举字段 ${r.json.enum_fields_in_schema}，应为 ${ENUM_SCALE.enum_fields}（两份规模常量已分岔）`;
  }
  if (r.json.enum_instances_checked !== ENUM_SCALE.enum_instances) {
    return `枚举实例 ${r.json.enum_instances_checked}，应为 ${ENUM_SCALE.enum_instances}（两份规模常量已分岔）`;
  }
  if (r.json.enum_instances_valid !== ENUM_SCALE.enum_instances) return "有枚举取值越界";
  if ((r.json.reason_code_catalogue || []).length !== REASON_SCALE.codes) {
    return `理由码目录 ${(r.json.reason_code_catalogue || []).length} 条，应为 ${REASON_SCALE.codes}（两份规模常量已分岔）`;
  }
  if ((r.json.reason_problems || []).length) return `理由码／兼容表有问题：${r.json.reason_problems.slice(0, 2).join("；")}`;
  if (r.json.fail_closed_ok !== true) return "fail_closed_ok 不为真";
  if ((r.json.rollback_evidence_problems || []).length) return "回滚证据一致性有问题";
  const se = r.json.fail_closed_smart_layer_enum || [];
  const seBad = FAIL_CLOSED_SMART_LAYER.findIndex((x, i) => se[i] !== x);
  if (se.length !== FAIL_CLOSED_SMART_LAYER.length || seBad !== -1) {
    return `smart_layer 枚举为 ${JSON.stringify(se)}，应逐位等于 ${JSON.stringify(FAIL_CLOSED_SMART_LAYER)}`;
  }
  return null;
});

/* 三例改脚本自身：针对「检查悄悄没跑」这一类失效。 */
negative("删掉 add(\"Z1\") —— 这正是 2026-08-20 外部复核发现的那个洞", () => {
  const s = scriptMutated(AUDITOR, (t) => t.replace(/  add\("Z1",[\s\S]*?\n.*?\n/, ""));
  const r = run(s, { JZ_AUDIT_HOME: HERE });
  if (r.code === 0) return "仍以退出码 0 通过（结构性守卫没拦住）";
  const probs = (r.json && r.json.check_id_manifest_problems) || [];
  if (!probs.some((x) => x.includes("缺 Z1"))) return `未报「缺 Z1」，实为：${probs.join("；") || r.stderr.slice(0, 200)}`;
  return null;
});

negative("EXPECTED_IDS 里去掉 \"Z1\"（复刻当时的确切旧状态）", () => {
  const s = scriptMutated(AUDITOR, (t) => t.replace(/\n  "Z1",\n/, "\n"));
  const r = run(s, { JZ_AUDIT_HOME: HERE });
  if (r.code === 0) return "仍以退出码 0 通过";
  return null;
});

negative("删掉 add(\"I1\") —— 任意一条检查消失都要判失败", () => {
  const s = scriptMutated(AUDITOR, (t) => t.replace(/add\("I1",[\s\S]*?\n.*?\n/, ""));
  const r = run(s, { JZ_AUDIT_HOME: HERE });
  if (r.code === 0) return "仍以退出码 0 通过";
  const probs = (r.json && r.json.check_id_manifest_problems) || [];
  if (!probs.some((x) => x.includes("缺 I1"))) return `未报「缺 I1」，实为：${probs.join("；")}`;
  return null;
});

/* 其余改输入：针对「检查判错」以及本包历史上真出现过的那几类错。 */
const negInput = (label, files, wantIds) => negative(label, () => {
  const dir = overlayWith(files);
  const r = runAuditor({ JZ_AUDIT_OVERLAY: dir });
  if (r.code === 0) return "仍以退出码 0 通过";
  const got = failedIds(r);
  const miss = wantIds.filter((x) => !got.includes(x));
  if (miss.length) return `未报 ${miss.join("、")}，实报 ${got.join("、") || "（无）"}`;
  return null;
});

negInput("正文「之和为」改成同义的「合计」—— 上一轮那个静默漏检",
  { "proposal.md": textOf("proposal.md").replace("A1—A3 之和为 5.7–8.0 m", "A1—A3 合计 5.7–8.0 m") }, ["F9"]);

negInput("落点表把 BLDG-020 的东侧写成西侧 —— 本包真出现过的「数据对、正文写反」",
  { "proposal.md": textOf("proposal.md").replace("| BLDG-020 | 开放研发院 | 众智园 | **东** |", "| BLDG-020 | 开放研发院 | 众智园 | **西** |") }, ["P3"]);

negInput("断面单侧合计改成 21.1（容器重复加得到的那个数）—— 本包第一处硬错的形状",
  { "proposal.md": textOf("proposal.md").replace("| **单侧合计** | **15.4 m** |", "| **单侧合计** | **21.1 m** |") }, ["F3", "F4"]);

negInput("几何里把 BLDG-020 的 side 由东改成西",
  { "geometry/buildings.geojson": jsonMutated("geometry/buildings.geojson", (d) => {
      const f = d.features.find((x) => (x.properties || {}).id === "BLDG-020");
      f.properties.side = "west";
    }) }, ["P3"]);

negInput("metrics.json 删掉一条三位以上小数指标的 precision_note",
  { "metrics.json": jsonMutated("metrics.json", (d) => { delete d.metrics.site_area_sqm.precision_note; }) }, ["I1"]);

negInput("sources.json 删掉一条来源的 not_usable_for",
  { "sources.json": jsonMutated("sources.json", (d) => { delete d.sources[0].not_usable_for; }) }, ["H1"]);

negInput("standard_matrix.json 的章节引用指向不存在的标题 —— v2 重写留下过 42 处",
  { "standard_matrix.json": jsonMutated("standard_matrix.json", (d) => {
      d.standards[0].proposal_sections[0] = "一个并不存在的章节标题";
    }) }, ["G1"]);

negInput("对照表把「一次交接循环」的 4,284 m 改成 4,300 m",
  { "proposal.md": textOf("proposal.md").replace("| **一次交接循环最短步行** | **4,284 m** |", "| **一次交接循环最短步行** | **4,300 m** |") }, ["K1"]);

negInput("对照表把现状的同类互达 51,619 m 改成 51,000 m",
  { "proposal.md": textOf("proposal.md").replace("| 51,619 m（**三者最差**） |", "| 51,000 m（**三者最差**） |") }, ["K2"]);

negInput("对照表把交接场齐备度 2／2／3 改成 2／2／2",
  { "proposal.md": textOf("proposal.md").replace("| **2／2／3 类** |", "| **2／2／2 类** |") }, ["K3"]);

negInput("正文把十对里程差里的 61 m 写成 60 m",
  { "proposal.md": textOf("proposal.md").replace("2、2、15、15、21、21、22、23、23、61 m", "2、2、15、15、21、21、22、23、23、60 m") }, ["K4"]);

negInput("摘要句把垂距中位改回 337（偶数个取值下把第 11 项当中位数）—— 本包 2026-08-22 真出现过的那处",
  { "proposal.md": textOf("proposal.md").replace("中位 330 m", "中位 337 m") }, ["P10"]);

negInput("sources.json 把现行登记的指针改回已作废的历史条目 —— 本包真出现过的六处",
  { "sources.json": jsonMutated("sources.json", (d) => {
      const e = d.sources.find((x) => x.id === "FONT-NOTO-COVER");
      e.not_usable_for = e.not_usable_for.map((t) =>
        t.replace("证明 assets/figures/ 下 26 张栅格图件的字形来源（见 FONT-NOTO-RASTER）",
                  "证明 assets/figures/ 下 26 张栅格图件的字形来源（中文见 FONT-STHEITI-RASTER）"));
    }) }, ["J1"]);

  negInput("compliance_matrix 去掉一条规则导出的 standard_ids（WCAG-CONTRAST）—— 本包 2026-08-22 修掉的 26 处缺失里的一处",
    { "compliance_matrix.json": jsonMutated("compliance_matrix.json", (d) => {
        const r = d.requirements.find((x) => (x.standard_ids || []).includes("WCAG-CONTRAST"));
        r.standard_ids = r.standard_ids.filter((s) => s !== "WCAG-CONTRAST");
      }) }, ["J2"]);

  negInput("compliance_matrix 多挂一处相关性标准 —— 三段分解由 92＋12＋8 变成 92＋12＋9，而「规则导出全部在位」仍成立",
    { "compliance_matrix.json": jsonMutated("compliance_matrix.json", (d) => {
        const r = d.requirements.find((x) => x.requirement_id === "agent.5");
        if (!r.standard_ids.includes("WCAG-CONTRAST")) r.standard_ids.push("WCAG-CONTRAST");
      }) }, ["J2"]);

  negInput("manifest 里把复制出来的授权正文改一个字 —— 与 author_grant 漂移，而两处各自读起来都通顺",
    { "manifest.json": jsonMutated("manifest.json", (d) => {
        d.license.effective_grant.full_text_zh = d.license.effective_grant.full_text_zh.replace("非商业", "非营利");
      }) }, ["L1"]);

  negInput("manifest 里把「未发布条款更宽时仍按本条授权」那一层删掉 —— 上界变成了可被放宽",
    { "manifest.json": jsonMutated("manifest.json", (d) => {
        const eg = d.license.effective_grant;
        eg.future_terms_rule_zh = eg.future_terms_rule_zh.replace(/更宽/g, "更严");
      }) }, ["L1"]);

  negInput("sources.json 里把一条「grep -c X proposal.md → N」的 N 改掉 —— 命令还在、期望值已不成立",
    { "sources.json": jsonMutated("sources.json", (d) => {
        const e = d.sources.find((x) => x.id === "SRC-JINGZHANG-1909");
        e.independent_verification = e.independent_verification.replace("→ **2**", "→ **1**");
      }) }, ["J3"]);

  negInput("sources.json 里把那条核验命令整句删掉 —— 声明条数由 4 变 3，而剩下 3 条仍逐条相符",
    { "sources.json": jsonMutated("sources.json", (d) => {
        const e = d.sources.find((x) => x.id === "SRC-JINGZHANG-1909");
        e.independent_verification = e.independent_verification.replace(/`grep -c SRC-JINGZHANG-1909 proposal\.md`\s*→\s*\*{0,2}2\*{0,2}/, "（核验方式待补）");
      }) }, ["J3"]);

  negInput("正文把退役的活动名「维护者之夜」写回《条件分期》一节 —— 本包 2026-08-22 修掉的三套并存里的一套",
    { "proposal.md": textOf("proposal.md").replace("夏季**验证开放日**", "夏季**维护者之夜**") }, ["P11"]);

  negInput("四季表少一行 —— 由 4 行变 3 行，而「逐名一致」与「退役名零出现」都仍成立",
    { "proposal.md": textOf("proposal.md").replace(
        "| 冬 | 年度交接账发布：留下、修改、停用的项目同屏公布 | SHARE→SERVE | 年度交接账与逐项停用原因 |\n", "") }, ["P11"]);

  /* 二进制注入：把一套图纸的 ToUnicode 换回 v1.11 那种 code→字形索引映射。
     CMap 流是 Flate 压缩的，所以要解压、改、再压回；/Length 会不对但 G4 不读它。
     overlayWith 传 Buffer 时 Node 忽略 encoding 参数、按二进制写。 */
  const pdfWithBadCmap = (rel) => {
    const zlib = require("zlib");
    const buf = fs.readFileSync(path.join(PKG, rel));
    let from = 0;
    for (;;) {
      const s0 = buf.indexOf("stream", from);
      if (s0 < 0) break;
      let b = s0 + 6;
      if (buf[b] === 0x0d) b += 1;
      if (buf[b] === 0x0a) b += 1;
      const e0 = buf.indexOf("endstream", b);
      if (e0 < 0) break;
      from = e0 + 9;
      let t;
      try { t = zlib.inflateSync(buf.subarray(b, e0)).toString("latin1"); } catch (_) { continue; }
      if (!t.includes("begincmap") || !t.replace(/\s/g, "").includes("<0000><ffff><0000>")) continue;
      const broken = t.replace(/<0000>\s*<ffff>\s*<0000>/, "<0020><0020><003f>");
      const blob = zlib.deflateSync(Buffer.from(broken, "latin1"));
      return Buffer.concat([buf.subarray(0, b), blob, buf.subarray(e0)]);
    }
    throw new Error("找不到可注入的恒等 CMap 流");
  };

  negInput("把一套图纸的 ToUnicode 换回 code→字形索引映射 —— 本包修好过一次、又被后续总装静默覆盖回来的那处",
    { "drawings/a0-boards.pdf": pdfWithBadCmap("drawings/a0-boards.pdf") }, ["G4"]);

/* 最后两例打 runner。 */
negInput("场景卡把落点写回「城市交接场维修驿」—— 复刻 2026-08-22 修掉的那处错：该点距大钟寺 3127 m、距原点社区仅 611 m，而卡片读起来完全通顺",
  { "proposal.md": textOf("proposal.md").replace(
      "| 连续公共交接面维修驿（原点社区南侧连接段，约 4.2 km） |", "| 城市交接场维修驿 |") }, ["G5"]);

negInput("连接段卡片只把里程数字改错 0.5 km —— 落点归属仍对，只有里程对不上几何",
  { "proposal.md": textOf("proposal.md").replace("主轴里程约 7.2 km", "主轴里程约 7.7 km") }, ["G5"]);

const negRunner = (label, files, want) => negative(label, () => {
  const dir = overlayWith(files);
  const r = runRunner({ JZ_AUDIT_OVERLAY: dir });
  if (r.code === 0) return "仍以退出码 0 通过";
  const why = want(r);
  return why;
});

negRunner("rule-check-report.json 少一条检查 —— 96 变 95 而「逐条一致」仍成立",
  { "visual/assets/governance/rule-check-report.json": jsonMutated("visual/assets/governance/rule-check-report.json", (d) => { d.checks.pop(); }) },
  (r) => {
    const probs = (r.json && r.json.scale_problems) || [];
    return probs.some((x) => x.includes("95")) ? null : `未报规模不符，实为：${probs.join("；")}`;
  });

negRunner("夹具里把一条合规交接账改成智能层已推到限定试用",
  { "visual/assets/governance/shift-ledger-suite.json": jsonMutated("visual/assets/governance/shift-ledger-suite.json", (d) => {
      d.ledgers[0].transfer_attempt.smart_layer_state_after_decision = "limited_trial";
    }) },
  (r) => ((r.json && r.json.rule_mismatches || []).length ? null : "未报规则不一致"));

negRunner("simulation.json 里翻转一条已发布的接管断言",
  { "simulation.json": jsonMutated("simulation.json", (d) => {
      const t = d.tasks[0];
      const k = Object.keys(t.checks)[0];
      t.checks[k] = t.checks[k] === "pass" ? "fail" : "pass";
    }) },
  (r) => ((r.json && r.json.assertion_mismatches || []).length ? null : "未报断言不一致"));

/* 三例打新加的 schema 枚举校验与 fail-closed 结构断言。前者是 2026-08-21 当场被证实
   的洞：手造 shadow 扰动时用了 assigned / attested / official_and_field_confirmed
   三个不在枚举里的取值，而当时包内无一处能拦下。 */
negRunner("夹具里把 assignment_state 写成不在枚举里的 \"assigned\"（那正是当时手造扰动犯的错）",
  { "visual/assets/governance/shift-ledger-suite.json": jsonMutated("visual/assets/governance/shift-ledger-suite.json", (d) => {
      d.ledgers[0].control_pair.release_role.assignment_state = "assigned";
    }) },
  (r) => ((r.json && r.json.enum_violations || []).some((x) => x.includes("assignment_state"))
          ? null : "未报 assignment_state 枚举越界"));

negRunner("schema 里给 smart_layer_state_after_decision 加一个 \"fully_enabled\" —— fail-closed 上限被抬高",
  { "visual/assets/governance/shift-ledger.schema.json": jsonMutated("visual/assets/governance/shift-ledger.schema.json", (d) => {
      d.$defs.transferAttempt.properties.smart_layer_state_after_decision.enum.push("fully_enabled");
    }) },
  (r) => ((r.json && r.json.fail_closed_problems || []).length ? null : "未报 fail-closed 断言失败"));

negRunner("夹具里把回滚演练改成 observed_pass 但 evidence_pointer 留空 —— 「声称通过却无可核证据」，schema 不禁止它",
  { "visual/assets/governance/shift-ledger-suite.json": jsonMutated("visual/assets/governance/shift-ledger-suite.json", (d) => {
      const rb = d.ledgers[0].rollback_rehearsal;
      rb.execution_state = "observed_pass";
      rb.pass = true;
      rb.executed_at = "2026-08-21T00:00:00Z";
      rb.evidence_pointer = null;
    }) },
  (r) => ((r.json && r.json.rollback_evidence_problems || []).some((x) => x.includes("evidence_pointer"))
          ? null : "未报回滚证据不一致"));

negRunner("schema 里删掉一个枚举定义 —— 枚举字段由 18 变 17，比对条数跟着变少但「逐条合法」仍成立",
  { "visual/assets/governance/shift-ledger.schema.json": jsonMutated("visual/assets/governance/shift-ledger.schema.json", (d) => {
      delete d.$defs.scenarioAnchor.properties.confidence.enum;
    }) },
  (r) => ((r.json && r.json.scale_problems || []).some((x) => x.includes("枚举"))
          ? null : "未报枚举规模不符"));

negRunner("schema 的理由码目录删掉一条 —— 目录与枚举分岔，而两处各自「逐条一致」仍成立",
  { "visual/assets/governance/shift-ledger.schema.json": jsonMutated("visual/assets/governance/shift-ledger.schema.json", (d) => {
      d.refusal_reason_catalog.codes = d.refusal_reason_catalog.codes.slice(1);
    }) },
  (r) => ((r.json && r.json.reason_problems || []).some((x) => x.includes("目录"))
          ? null : "未报理由码目录与枚举分岔"));

negRunner("夹具里把一条账改成「附条件接受」却把智能层推到限定试用 —— 违反兼容表，而旧 schema 只管 refused ⇒ off 时这是合法的",
  { "visual/assets/governance/shift-ledger-suite.json": jsonMutated("visual/assets/governance/shift-ledger-suite.json", (d) => {
      const ta = d.ledgers[0].transfer_attempt;
      ta.receiver_disposition = "accepted_with_conditions";
      ta.refusal_reasons = [];
      ta.smart_layer_state_after_decision = "limited_trial";
    }) },
  (r) => ((r.json && r.json.reason_problems || []).some((x) => x.includes("违反兼容表"))
          ? null : "未报兼容表违规"));

/* ---------------- 执行 ---------------- */
const results = cases.map((c) => {
  let why = null;
  try { why = c.fn(); } catch (e) { why = `用例本身抛异常：${e.message}`; }
  return { kind: c.kind, label: c.label, pass: why === null, why };
});
const bad = results.filter((r) => !r.pass);
const out = {
  selftest: "audit-selftest.js",
  targets: [AUDITOR, RUNNER],
  scope_zh: "只检验两个自检脚本会不会漏检：正向须通过，注入已知缺陷须退出 1 并报出指定检查项。不评价设计内容。",
  cases_run: results.length,
  cases_passed: results.length - bad.length,
  all_pass: bad.length === 0,
  results,
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(out, null, 2));
} else {
  for (const r of results) {
    console.log(`${r.pass ? "通过" : "未通过"}  ${r.kind}  ${r.label}`);
    if (!r.pass) console.log(`            ${r.why}`);
  }
  console.log(`\n${out.cases_passed}/${out.cases_run} 例通过（${cases.filter((c) => c.kind === "正向").length} 正向 ＋ ${cases.filter((c) => c.kind === "阴性").length} 阴性）`);
  console.log(out.all_pass ? "两个自检脚本都仍拦得住已知缺陷" : "有用例未通过：自检脚本存在漏检");
}
process.exit(out.all_pass ? 0 : 1);
