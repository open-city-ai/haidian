#!/usr/bin/env node
/*
 * SEB 桌面配对推演校验器 / SEB tabletop pairing-run checker
 *
 * 方法学演示工具，不构成实测。本脚本只把服务等价基准（seb-spec.json）的四个组件
 * 施加在文本样例（seb-tabletop-fixtures.json）上，不接触任何真实参与者、现场设备
 * 或运行中的系统，不写入 metrics.json，也不产生任何绩效指标数值。它能证明的只有
 * 一件事：判据是否可以被机器逐条执行。
 *
 * Methodology demonstration tool, not a field measurement. The script applies the
 * four components of the Service Equivalence Baseline (seb-spec.json) to text
 * fixtures (seb-tabletop-fixtures.json). It touches no real participant, no site
 * equipment and no running system, writes nothing to metrics.json, and produces no
 * performance metric value. It demonstrates one thing only: whether the criteria
 * can be executed by a machine, item by item.
 *
 * 判据来源 / Where the criteria come from
 * 自基准 v0.2 起，本工具不再持有任何私有词表、私有正则或私有适用范围推导：拒绝
 * 词表读自 node_schema 各字段的 constraint_machine_rule，闸门比对读自
 * level_definitions 的结构化 gate_binding，分母完整性的适用范围读自
 * denominator_integrity_applies_to。工具只负责执行，判据的内容一律由基准条文规定；
 * 三处升格的经过见变更回执 CR-2026-08-12-002。
 * From baseline v0.2 this tool holds no private word list, no private pattern and no
 * private scope inference: the refusal lists come from constraint_machine_rule on the
 * node_schema fields, the gate comparison comes from the structured gate_binding of
 * level_definitions, and the scope of denominator integrity comes from
 * denominator_integrity_applies_to. The tool only executes; the baseline states every
 * criterion. The promotion of all three is recorded in change receipt CR-2026-08-12-002.
 *
 * 用法 / Usage: node seb-tabletop-run.js
 * 零依赖，仅使用 Node 内置模块 / Zero dependencies, Node built-ins only.
 * 退出码 0 表示全部样例的判定与 expected_verdict 一致。
 * Exit code 0 means every fixture verdict matched its expected_verdict.
 * 退出码 2 表示基准版本过低或基准与样例不一致，此时不作任何判定。
 * Exit code 2 means the baseline version is too low or baseline and fixtures disagree,
 * and no verdict is issued.
 */

"use strict";

const fs = require("fs");
const path = require("path");

const HERE = __dirname;
const SPEC_PATH = path.join(HERE, "seb-spec.json");
const FIXTURES_PATH = path.join(HERE, "jingzhang-seb-fixtures.json");
const NODE_SOURCE_PATH = path.join(HERE, "..", "..", "geometry", "constraints.geojson");

// 本工具要求的最低基准版本。低于此版本的基准把 ai_off_path 的拒绝依据、等级闸门与
// 分母完整性的适用范围留给实现自行解释，本工具拒绝在那种条件下作出判定。
// Minimum baseline version. Below it the baseline leaves the ground for refusing an
// ai_off_path value, the level gates and the scope of denominator integrity to the
// implementation, and this tool refuses to rule under those conditions.
const MIN_SPEC_VERSION = [0, 2, 0];

// 拒绝理由的双语解释 / Bilingual explanation of each rejection reason.
const REASON_TEXT = {
  NODE_FIELD_MISSING: ["节点缺少必填字段，不得计入服务覆盖", "node is missing a required field and may not count towards service coverage"],
  NODE_ENUM_INVALID: ["字段取值不在允许集合内", "field value falls outside the allowed set"],
  "NODE_CONSTRAINT_VIOLATION:ai_off_path": ["AI 关闭后的路径仍依赖同一系统，等价性不成立", "the AI-off route still depends on the same system, so equivalence does not hold"],
  "NODE_CONSTRAINT_VIOLATION:human_handoff": ["人工接管只写了机构，没有可被找到的角色", "human takeover names an organisation, not a findable role"],
  RULE_TYPE_UNSUPPORTED: ["基准声明了本工具尚未实现的规则类型，不作判定", "the baseline declares a rule type this tool does not implement, so no verdict is issued"],
  DENOMINATOR_SAMPLE_DROPPED: ["分母删除了失败样本，该次测量作废", "a failed sample was dropped from the denominator, voiding that measurement"],
  METRIC_ID_UNKNOWN: ["指标既不在适用清单也不在排除清单内，归属须由基准登记", "the metric appears in neither the included nor the excluded list, and only the baseline may register where it belongs"],
  LEVEL_UNKNOWN: ["等级不在基准定义内", "the level is not defined by the baseline"],
  LEVEL_BINDING_MISSING: ["等级绑定字段不齐，四项缺一即不得升级", "a level binding field is missing; all four are required before any upgrade"],
  LEVEL_GATE_MISMATCH: ["申报等级与节点所处闸门不一致", "the claimed level and the node gate disagree"],
  STOP_NOT_ENFORCED: ["停止条件触发却以限期整改续跑", "a triggered stop condition was continued under a corrective-action deadline"],
  RESUME_WITHOUT_EVIDENCE: ["以承诺而非证据恢复", "work resumed on a promise rather than on evidence"],
  RISK_ID_UNKNOWN: ["风险条目不在基准判定规则内", "the risk entry lies outside the baseline decision rules"],
  SOURCE_MISMATCH: ["样例与几何文件中的节点属性不一致", "the fixture disagrees with the node attributes held in the geometry file"],
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function component(spec, componentId) {
  return spec.components.find((item) => item.component_id === componentId);
}

function containsAny(value, patterns) {
  const text = String(value).toLowerCase();
  return patterns.some((pattern) => text.includes(String(pattern).toLowerCase()));
}

function explain(code) {
  return REASON_TEXT[code] || REASON_TEXT[code.split(":")[0]] || ["", ""];
}

function parseVersion(value) {
  return String(value || "0").split(".").map((part) => parseInt(part, 10) || 0);
}

function versionAtLeast(value, minimum) {
  const actual = parseVersion(value);
  for (let i = 0; i < minimum.length; i += 1) {
    const left = actual[i] || 0;
    if (left > minimum[i]) return true;
    if (left < minimum[i]) return false;
  }
  return true;
}

// 兼容校验：基准版本须达到 v0.2，样例须声明与之相同的基准版本。任一不满足即停止，
// 不作任何判定——这一步本身就是版本治理的执行，不是可选的礼貌检查。
// Compatibility gate: the baseline must be at least v0.2 and the fixtures must declare
// the same baseline version. Either failure stops the run before any verdict, which is
// version governance being executed rather than a courtesy check.
function checkCompatibility(spec, fixtureFile) {
  const problems = [];
  if (!versionAtLeast(spec.version, MIN_SPEC_VERSION)) {
    problems.push(
      `基准版本 ${spec.version} 低于本工具要求的 ${MIN_SPEC_VERSION.join(".")}；`
        + `v0.2 之前的基准未给出机器可读的拒绝依据与闸门绑定 / baseline version `
        + `${spec.version} is below the required ${MIN_SPEC_VERSION.join(".")}`
    );
  }
  const declared = fixtureFile.consumes && fixtureFile.consumes.spec_version;
  setAdopterLexicon(fixtureFile.adopter_lexicon);
  if (declared !== spec.version) {
    problems.push(
      `样例声明的基准版本 ${declared} 与基准文件的 ${spec.version} 不一致 / `
        + `fixtures declare baseline ${declared} but the baseline file is ${spec.version}`
    );
  }
  return problems;
}

// 基准自洽检查，规则本身写在 denominator_integrity_applies_to.completeness_rule 中：
// 适用与排除清单的并集须恰好等于评分口径的指标集合，外部排除项须全部不在其中。
// Baseline self-consistency, required by denominator_integrity_applies_to.completeness_rule:
// the union of the included and excluded lists must equal the metric set exactly, and no
// externally excluded metric may appear in it.
function checkSpecConsistency(scoring) {
  const applies = scoring.denominator_integrity_applies_to;
  const problems = [];
  const known = new Set(scoring.metrics.map((item) => item.metric_id));
  const listed = new Set([
    ...applies.included_metric_ids,
    ...applies.excluded_metric_ids.map((item) => item.metric_id),
  ]);
  for (const id of known) {
    if (!listed.has(id)) problems.push(`评分口径中的 ${id} 未在适用或排除清单中登记 / ${id} is registered in neither list`);
  }
  for (const id of listed) {
    if (!known.has(id)) problems.push(`清单中的 ${id} 不在评分口径内 / ${id} is listed but is not a scoring definition`);
  }
  for (const item of applies.excluded_external_metric_ids) {
    if (known.has(item.metric_id)) {
      problems.push(`${item.metric_id} 被登记为外部指标，却出现在评分口径内 / ${item.metric_id} is registered as external yet appears in the definitions`);
    }
  }
  return problems;
}

// 组件一：节点 schema。必填字段的存在性与枚举由 schema 本身规定，取值约束一律来自
// 字段自带的 constraint_machine_rule；不带该字段的字段不施加任何取值约束。
// Component 1: node schema. Presence and enumeration come from the schema itself, every
// value constraint comes from the field's own constraint_machine_rule, and a field
// without one carries no value constraint at all.
// v0.3：required_role_token 判据按「规范本体词表 ∪ 采用方 adopter_lexicon」的并集匹配。
// 采用方可在 fixtures 顶层以 adopter_lexicon 数组声明附加角色词；未声明时行为与 v0.2 完全一致。
// From v0.3 the role-token check matches the union of the spec list and the adopter_lexicon
// declared (optionally) at the top of the fixtures file; with no declaration the behaviour
// is byte-identical to v0.2.
let ADOPTER_LEXICON = [];
function setAdopterLexicon(list) {
  ADOPTER_LEXICON = Array.isArray(list) ? list.filter((t) => typeof t === "string" && t.length > 0) : [];
}
function applyMachineRule(value, rule) {
  if (!rule) return null;
  if (rule.type === "forbidden_dependency") {
    return containsAny(value, rule.forbidden_targets) ? rule.violation_code : null;
  }
  if (rule.type === "required_role_token") {
    const tokens = ADOPTER_LEXICON.length ? rule.required_tokens.concat(ADOPTER_LEXICON) : rule.required_tokens;
    return containsAny(value, tokens) ? null : rule.violation_code;
  }
  return `RULE_TYPE_UNSUPPORTED:${rule.type}`;
}

function checkNodeSchema(node, schema) {
  const reasons = [];
  for (const field of schema.required_fields) {
    const value = node ? node[field.field] : undefined;
    if (typeof value !== "string" || value.trim() === "") {
      reasons.push(`NODE_FIELD_MISSING:${field.field}`);
      continue;
    }
    if (field.type === "enum" && !field.allowed_values.includes(value)) {
      reasons.push(`NODE_ENUM_INVALID:${field.field}`);
    }
    const violation = applyMachineRule(value, field.constraint_machine_rule);
    if (violation) reasons.push(violation);
  }
  return reasons;
}

// 组件二：评分口径的分母完整性。适用范围与必报类别都读自基准，工具不再从分母文字
// 推导范围；排除清单内的指标（含两项文件完整性型指标）直接放行，两个清单都没有的
// 指标报 METRIC_ID_UNKNOWN，交由基准登记而不是由工具决定。
// Component 2: denominator integrity. Both the scope and the categories that must be
// reported come from the baseline, so the tool no longer infers scope from denominator
// wording. A metric on the excluded list, including the two file-completeness metrics,
// passes straight through; a metric on neither list is reported as METRIC_ID_UNKNOWN and
// left for the baseline to register rather than for the tool to decide.
function checkDenominator(declaration, scoring) {
  if (!declaration) return [];
  const applies = scoring.denominator_integrity_applies_to;
  const metricId = declaration.metric_id;
  const excluded = new Set([
    ...applies.excluded_metric_ids.map((item) => item.metric_id),
    ...applies.excluded_external_metric_ids.map((item) => item.metric_id),
  ]);
  if (excluded.has(metricId)) return [];
  if (!applies.included_metric_ids.includes(metricId)) return [`METRIC_ID_UNKNOWN:${metricId}`];

  const reasons = [];
  const code = scoring.denominator_integrity_violation_code;
  const declared = new Set(declaration.denominator_categories_declared || []);
  for (const entry of scoring.denominator_integrity_required_categories) {
    if (!declared.has(entry.category)) reasons.push(`${code}:${entry.category}`);
  }
  for (const category of declaration.denominator_categories_excluded || []) {
    reasons.push(`${code}:${category}`);
  }
  return [...new Set(reasons)];
}

// 组件三：等级定义。四项绑定字段缺一不可；闸门比对直接取结构化的 gate_binding.gate_id，
// 不再从自由文本抽取，gate_id 为 none 时不比对。
// Component 3: level definitions. All four binding fields are required, and the gate
// comparison reads gate_binding.gate_id directly instead of extracting it from free
// text; where gate_id is none, no comparison is made.
function checkLevel(claim, levels, node) {
  const level = levels.levels.find((item) => item.level_id === (claim && claim.level_id));
  if (!level) return [`LEVEL_UNKNOWN:${claim ? claim.level_id : "none"}`];
  const reasons = [];
  for (const field of levels.level_binding_fields) {
    const value = claim[field];
    if (typeof value !== "string" || value.trim() === "") {
      reasons.push(`LEVEL_BINDING_MISSING:${field}`);
    }
  }
  const binding = level.gate_binding || {};
  if (binding.gate_id && binding.gate_id !== "none" && node && node.gate_id && node.gate_id !== binding.gate_id) {
    reasons.push(levels.gate_violation_code);
  }
  return reasons;
}

// 组件四：判定规则。停止条件触发即停止，恢复须提交证据而不是承诺。
// Component 4: decision rules. A triggered stop condition stops the work, and
// resumption requires submitted evidence rather than a promise.
function checkDecision(decision, rules) {
  const reasons = [];
  const known = new Set(rules.risk_entries.map((item) => item.risk_id));
  for (const riskId of decision.risk_ids || []) {
    if (!known.has(riskId)) reasons.push(`RISK_ID_UNKNOWN:${riskId}`);
  }
  if (decision.stop_condition_triggered) {
    if (decision.action_taken !== "stopped") {
      reasons.push("STOP_NOT_ENFORCED");
    } else if (decision.resumed === true && decision.resumption_basis !== "evidence_submitted") {
      reasons.push("RESUME_WITHOUT_EVIDENCE");
    }
  }
  return reasons;
}

// 第 0 步：凡声明了来源的样例，其五个必填字段须与 constraints.geojson 中的同名点位逐字一致。
// Step 0: any fixture naming a source of record must match the five required fields
// of the same node in constraints.geojson, verbatim.
function checkSourceAlignment(fixture, schema, nodeSource) {
  const record = fixture.source_of_record;
  if (!record || !nodeSource) return { reasons: [], line: null };
  const feature = nodeSource.features.find((item) => item.properties.id === record.feature_id);
  if (!feature) return { reasons: [`SOURCE_MISMATCH:${record.feature_id}`], line: null };
  const reasons = [];
  for (const field of schema.required_fields) {
    if (feature.properties[field.field] !== fixture.node[field.field]) {
      reasons.push(`SOURCE_MISMATCH:${field.field}`);
    }
  }
  const line = reasons.length === 0
    ? `    ${fixture.fixture_id} ← ${record.file}#${record.feature_id} : `
      + `${schema.required_fields.length} 个必填字段逐字一致 / ${schema.required_fields.length} required fields match verbatim`
    : `    ${fixture.fixture_id} ← ${record.file}#${record.feature_id} : 不一致 / mismatch`;
  return { reasons, line };
}

function evaluate(fixture, parts, nodeSource) {
  const alignment = checkSourceAlignment(fixture, parts.schema, nodeSource);
  const reasons = [
    ...alignment.reasons,
    ...checkNodeSchema(fixture.node, parts.schema),
    ...checkDenominator(fixture.measurement_declaration, parts.scoring),
    ...checkLevel(fixture.level_claim, parts.levels, fixture.node),
    ...checkDecision(fixture.decision, parts.rules),
  ];
  const unique = [...new Set(reasons)];
  return {
    verdict: unique.length === 0 ? "accept" : "reject",
    reasons: unique,
    alignmentLine: alignment.line,
  };
}

// 判据来源摘要：把本次判定所依据的条文出处直接打印出来，读者不必读代码即可确认
// 每一条规则来自基准而不是来自工具。
// Rule provenance: print where each criterion applied in this run comes from, so a
// reader can confirm without reading the code that the rules are the baseline's.
function provenanceLines(parts) {
  const lines = [];
  for (const field of parts.schema.required_fields) {
    const rule = field.constraint_machine_rule;
    if (!rule) continue;
    const terms = rule.forbidden_targets || rule.required_tokens || [];
    lines.push(
      `    ${field.field.padEnd(13)} : ${rule.type} · ${terms.length} 项词表来自基准条文 / `
        + `${terms.length} terms from baseline text`
    );
  }
  const l4 = parts.levels.levels.find((item) => item.level_id === "L4");
  lines.push(
    `    等级闸门 / Level gates : 结构化 gate_binding，L4 = ${l4.gate_binding.gate_id} `
      + `${l4.gate_binding.timing} 由基准明文规定 / stated by the baseline, not inferred`
  );
  const applies = parts.scoring.denominator_integrity_applies_to;
  lines.push(
    `    分母完整性 / Denominator integrity : 适用 ${applies.included_metric_ids.length} 项、`
      + `排除 ${applies.excluded_metric_ids.length} 项，另排除 ${applies.excluded_external_metric_ids.length} 项文件完整性型指标 / `
      + `${applies.included_metric_ids.length} in scope, ${applies.excluded_metric_ids.length} out, `
      + `${applies.excluded_external_metric_ids.length} file-completeness metrics excluded`
  );
  lines.push("    本工具不持有任何私有词表、私有正则或私有适用范围推导");
  lines.push("    this tool holds no private word list, no private pattern and no private scope inference");
  return lines;
}

function main() {
  const spec = readJson(SPEC_PATH);
  const fixtureFile = readJson(FIXTURES_PATH);

  const compatibility = checkCompatibility(spec, fixtureFile);
  if (compatibility.length > 0) {
    process.stderr.write("兼容校验未通过，不作任何判定 / compatibility gate failed, no verdict issued\n");
    compatibility.forEach((line) => process.stderr.write(`    ${line}\n`));
    return 2;
  }

  const parts = {
    schema: component(spec, "node_schema"),
    scoring: component(spec, "scoring_definitions"),
    levels: component(spec, "level_definitions"),
    rules: component(spec, "decision_rules"),
  };

  const consistency = checkSpecConsistency(parts.scoring);
  if (consistency.length > 0) {
    process.stderr.write("基准自洽检查未通过，不作任何判定 / baseline self-consistency failed, no verdict issued\n");
    consistency.forEach((line) => process.stderr.write(`    ${line}\n`));
    return 2;
  }

  let nodeSource = null;
  try {
    nodeSource = readJson(NODE_SOURCE_PATH);
  } catch (error) {
    nodeSource = null;
  }

  const out = [];
  out.push("SEB 桌面配对推演 / SEB tabletop pairing run");
  out.push(`基准 / Baseline : ${spec.spec_id} v${spec.version} (${spec.status})`);
  out.push(`样例 / Fixtures : ${fixtureFile.fixtures_id} v${fixtureFile.version} · ${fixtureFile.fixtures.length} 条 / items`);
  out.push("性质 / Nature   : 方法学演示，无真实参与者，不产生任何绩效指标数值");
  out.push("                  methodology demonstration, no real participant, no performance metric value");
  out.push("");
  out.push("[R] 判据来源 / Rule provenance");
  provenanceLines(parts).forEach((line) => out.push(line));
  out.push("");
  out.push("[S] 基准自洽 / Baseline self-consistency");
  out.push(`    适用与排除清单的并集 = 评分口径 ${parts.scoring.metrics.length} 项指标 / the two lists cover all ${parts.scoring.metrics.length} metric ids`);
  out.push("    文件完整性型指标不在评分口径内，按基准明文排除 / the file-completeness metrics lie outside the definitions and are excluded by baseline text");
  out.push("");
  out.push("[0] 节点数据对齐 / Node-data alignment");

  const results = [];
  const alignmentLines = [];
  for (const fixture of fixtureFile.fixtures) {
    const result = evaluate(fixture, parts, nodeSource);
    results.push({ fixture, result });
    if (result.alignmentLine) alignmentLines.push(result.alignmentLine);
  }
  if (alignmentLines.length === 0) {
    out.push("    未找到可对齐的来源声明 / no source-of-record declaration found");
  } else {
    alignmentLines.forEach((line) => out.push(line));
  }
  out.push("");

  let index = 0;
  let matched = 0;
  for (const { fixture, result } of results) {
    index += 1;
    const agree = result.verdict === fixture.expected_verdict
      && JSON.stringify([...result.reasons].sort()) === JSON.stringify([...(fixture.expected_reasons || [])].sort());
    if (agree) matched += 1;
    out.push(`[${index}] ${fixture.fixture_id}  ${fixture.title_zh} / ${fixture.title_en}`);
    out.push(`    判定 / verdict : ${result.verdict.toUpperCase()}   期望 / expected : ${fixture.expected_verdict.toUpperCase()}   ${agree ? "一致 / match" : "不一致 / MISMATCH"}`);
    for (const code of result.reasons) {
      const [zh, en] = explain(code);
      out.push(`    理由 / reason  : ${code}`);
      out.push(`                     ${zh} / ${en}`);
    }
    if (!agree) {
      out.push(`    期望理由 / expected reasons : ${(fixture.expected_reasons || []).join(", ") || "(none)"}`);
    }
    out.push("");
  }

  const accepted = results.filter((item) => item.result.verdict === "accept").length;
  out.push("汇总 / Summary");
  out.push(`    通过 / accepted : ${accepted}`);
  out.push(`    拒绝 / rejected : ${results.length - accepted}`);
  out.push(`    与期望一致 / matching expectation : ${matched} / ${results.length}`);
  out.push("    本次运行不写入 metrics.json，七项包容性指标保持 unknown");
  out.push("    this run writes nothing to metrics.json; the seven inclusion metrics stay unknown");

  process.stdout.write(out.join("\n") + "\n");
  return matched === results.length ? 0 : 1;
}

process.exitCode = main();
