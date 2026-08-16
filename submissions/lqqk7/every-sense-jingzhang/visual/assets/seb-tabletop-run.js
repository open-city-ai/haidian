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
 * denominator_integrity_applies_to。v0.3.1 起附加词合格性判据（禁用后缀表与证据
 * 要求）与来源对齐规则同样读自基准条文，判定码一律取自基准的违例码登记表。
 * 工具只负责执行，判据的内容一律由基准条文规定；升格经过见变更回执
 * CR-2026-08-12-002 与 CR-2026-08-15-005。
 * v0.4.0 起再增三类判据，同样一律读自基准：生命周期字段组的触发等级与五种
 * constraint_machine_rule（lifecycle_status_gate / lifecycle_date_gate /
 * lifecycle_enum_plus_flag / lifecycle_floor_check / lifecycle_enum_gate）读自
 * node_schema.lifecycle_fields 与 vendor_independence_field；AI 权限边界的人工专属
 * 动作清单读自第五组件 ai_authority_boundary，按 action_id 精确相等判定，不做子串；
 * 等价三维条件、阈值预注册、分列报告与最差组护栏、不可靠声明与样本充分性读自
 * scoring_definitions 的 equivalence_conditions、stratified_reporting 与两条规则条文。
 * 本工具另在启动时自检：凡本工具可能给出的判定码，必须全部登记在基准的
 * violation_code_registry 中，否则整次拒绝——「实现不得发明本表之外的判定码」由此
 * 成为可执行约束而不只是承诺。
 * From baseline v0.2 this tool holds no private word list, no private pattern and no
 * private scope inference: the refusal lists come from constraint_machine_rule on the
 * node_schema fields, the gate comparison comes from the structured gate_binding of
 * level_definitions, and the scope of denominator integrity comes from
 * denominator_integrity_applies_to. From v0.3.1 the lexicon-eligibility criteria
 * (forbidden-suffix list and evidence requirement) and the source-alignment rule are
 * read from the baseline text as well, and every verdict code comes from the baseline's
 * violation-code registry. The tool only executes; the baseline states every criterion.
 * The promotions are recorded in change receipts CR-2026-08-12-002 and CR-2026-08-15-005.
 *
 * 用法 / Usage: node seb-tabletop-run.js
 * 零依赖，仅使用 Node 内置模块（Node >= 18）；本工具版本 0.4.0。
 * Zero dependencies, Node built-ins only (Node >= 18); runner version 0.4.0.
 * 退出码 / Exit codes:
 *   0 — 全部样例的判定与 expected_verdict 一致 / every verdict matched its expectation
 *   1 — 至少一条样例的判定与期望不一致 / at least one verdict missed its expectation
 *   2 — 兼容失败，不作任何判定：基准版本过低、版本不匹配、词表不合格、
 *       声明的来源文件不可读、基准声明了本工具未支持的规则类型，或本工具可能
 *       给出的判定码未登记在基准的违例码登记表中
 *       compatibility failure, no verdict issued: baseline too low, version mismatch,
 *       ineligible lexicon, an unreadable declared source file, a rule type this tool
 *       does not support, or a verdict code this tool can emit that the baseline's
 *       violation-code registry does not carry
 */

"use strict";

const fs = require("fs");
const path = require("path");

const HERE = __dirname;
const SPEC_PATH = path.join(HERE, "seb-spec.json");
const FIXTURES_PATH = path.join(HERE, "seb-tabletop-fixtures.json");
// 节点来源文件不再硬编码：由 fixtures 的 consumes.node_source_of_record 声明，
// 相对 fixtures 文件所在目录解析（v0.3.0 采用方声明制在实现侧的落地）。
// The node source file is no longer hard-coded: the fixtures declare it in
// consumes.node_source_of_record, resolved relative to the fixtures file's directory
// (the v0.3.0 adopter-declared location landing in the implementation).

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
  // v0.4.0 全生命周期判据 / v0.4.0 full-lifecycle criteria
  LIFECYCLE_FIELD_MISSING: ["生命周期字段在其触发等级下缺失", "a lifecycle field is absent at the level that triggers it"],
  FUNDING_UNCONFIRMED_AT_L3: ["申报 L3 及以上而付款方未确认，未确认付款方的服务不得进入限定开放", "L3 or above is claimed while the payer is unconfirmed, and a service with no confirmed payer may not enter bounded opening"],
  REVIEW_OVERDUE: ["到期未复审，有效等级回落至 L0 重新证明", "the review is overdue and the effective level falls back to L0 to be proved again"],
  NON_AI_FLOOR_REDUCED: ["非 AI 通道底线有一项声明为可削减，AI 层的扩张不得以压缩人工与固定通道为代价", "a non-AI channel floor entry is declared reducible; expansion of the AI layer may not be paid for by shrinking the staffed and fixed channels"],
  DECOMMISSION_TAKES_NON_AI_CHANNEL: ["退役连带撤除非 AI 通道，退役只应撤 AI 层", "decommissioning takes a non-AI channel with it, where it should remove the AI layer only"],
  VENDOR_DEPENDENT_OFF_PATH: ["AI 关闭后的路径仍需供应商在线配合，同一供应商的另一套在线系统不是关闭后的路径", "the AI-off route still needs online vendor cooperation, and another online system from the same vendor is not an AI-off route"],
  AI_AUTHORITY_OVERREACH: ["AI 执行了人工专属动作，对人的处分性决定不得交给 AI", "AI performed a human-exclusive action; dispositive decisions over people may not be handed to AI"],
  EQUIVALENCE_CONDITION_UNMET: ["三维等价条件有一维不满足却仍判为等价路径", "a path is ruled equivalent while one of the three equivalence conditions is unmet"],
  THRESHOLD_NOT_PREREGISTERED: ["成对测量记录引用了未经三方预注册的阈值", "the paired measurement record cites a threshold the three-party group never pre-registered"],
  STRATIFICATION_MISSING: ["声明适用分组却只报总体，总体值不得单独出现", "stratification is declared applicable yet only a total is reported, and no total may appear alone"],
  WORST_GROUP_REGRESSION: ["总体改善而最差组恶化，总体不得据此报告为改善", "the total improves while the worst group deteriorates, and the total may not be reported as an improvement"],
  GROUP_MEMBERSHIP_INFERRED: ["组归属由推断得来而非参与者自愿自报", "group membership was inferred rather than voluntarily self-reported"],
  SILENT_UNRELIABLE_OUTPUT: ["系统自知不可靠的输出未当场声明不可靠并指向人工通道", "an output the system knows to be unreliable was not declared unreliable on the spot with a pointer to the staffed channel"],
  SAMPLE_INSUFFICIENT_CLAIMED_FAIR: ["分组样本低于预注册最低值，结论只能记证据不足", "the group sample falls below the pre-registered minimum, so the conclusion may only read insufficient evidence"],
};

// 本工具在任何基准下都可能给出的基础判定码（去掉冒号后缀的规范名）。v0.4.0 起的
// 各码不写死在这里，而是由基准自身的规则对象推导（见 emittableCodes），因此本工具
// 与低版本快照配对时不会因登记表尚无新码而误拒。
// The base verdict codes this tool can emit under any baseline (canonical names, colon
// suffix stripped). The v0.4.0 codes are not hard-coded here: they are derived from the
// baseline's own rule objects (see emittableCodes), so pairing this tool with an older
// snapshot is not refused merely because that registry does not yet carry them.
const BASE_EMITTED_CODES = [
  "NODE_FIELD_MISSING", "NODE_ENUM_INVALID", "NODE_CONSTRAINT_VIOLATION", "SOURCE_MISMATCH",
  "SOURCE_FILE_UNREADABLE", "DENOMINATOR_SAMPLE_DROPPED", "METRIC_ID_UNKNOWN", "LEVEL_UNKNOWN",
  "LEVEL_BINDING_MISSING", "LEVEL_GATE_MISMATCH", "STOP_NOT_ENFORCED", "RESUME_WITHOUT_EVIDENCE",
  "RISK_ID_UNKNOWN", "ADOPTER_LEXICON_INVALID_TOKEN", "ADOPTER_LEXICON_EVIDENCE_MISSING",
  "ADOPTER_LEXICON_MALFORMED", "RULE_TYPE_UNSUPPORTED",
];

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

// 全部带 constraint_machine_rule 的字段：必填字段、生命周期字段组、供应商独立性字段。
// 三处都由基准声明，本工具不新增任何字段。
// Every field carrying a constraint_machine_rule: the required fields, the lifecycle
// field group and the vendor-independence field. All three are declared by the baseline
// and this tool adds none of its own.
function machineRuleFields(schema) {
  const fields = [...(schema.required_fields || []), ...(schema.lifecycle_fields || [])];
  if (schema.vendor_independence_field) fields.push(schema.vendor_independence_field);
  return fields.filter((field) => field.constraint_machine_rule);
}

// 本次运行下本工具可能给出的判定码：基础码加上由基准自身规则对象声明的码。
// 判定码一律取自基准，本工具不发明任何一个。
// The codes this tool can emit in this run: the base set plus whatever the baseline's own
// rule objects declare. Every code comes from the baseline; this tool invents none.
function emittableCodes(spec) {
  const codes = new Set(BASE_EMITTED_CODES);
  const schema = component(spec, "node_schema");
  const scoring = component(spec, "scoring_definitions");
  const boundary = component(spec, "ai_authority_boundary");
  if (schema && (schema.lifecycle_fields || schema.vendor_independence_field)) {
    codes.add("LIFECYCLE_FIELD_MISSING");
  }
  for (const field of machineRuleFields(schema || {})) {
    const code = field.constraint_machine_rule.violation_code;
    if (code) codes.add(code.split(":")[0]);
  }
  if (boundary && boundary.violation_code) codes.add(boundary.violation_code);
  const equivalence = scoring && scoring.equivalence_conditions;
  if (equivalence) {
    if (equivalence.violation_code) codes.add(equivalence.violation_code);
    if (equivalence.threshold_preregistration && equivalence.threshold_preregistration.violation_code) {
      codes.add(equivalence.threshold_preregistration.violation_code);
    }
  }
  const stratified = scoring && scoring.stratified_reporting;
  if (stratified) (stratified.violation_codes || []).forEach((code) => codes.add(code));
  if (scoring && scoring.reliability_disclosure_rule_zh) codes.add("SILENT_UNRELIABLE_OUTPUT");
  if (scoring && scoring.sample_sufficiency_rule_zh) codes.add("SAMPLE_INSUFFICIENT_CLAIMED_FAIR");
  return codes;
}

// 登记表自检：本工具可能给出的每一个判定码都必须在基准的 violation_code_registry
// 中登记。缺一即整次拒绝——这一条把「实现不得发明本表之外的判定码」由承诺变成约束，
// 同时也能当场拦下基准自身的不自洽（规则声明了一个未登记的码）。
// Registry self-check: every code this tool can emit must appear in the baseline's
// violation_code_registry. A single absence refuses the whole run, which turns "no
// implementation may invent codes outside this table" from a promise into a constraint
// and also catches a baseline that is inconsistent with itself (a rule declaring a code
// the registry never registered).
function registryProblems(spec) {
  const registry = spec.violation_code_registry && spec.violation_code_registry.codes;
  if (!registry) return [];
  const known = new Set(Object.keys(registry));
  const problems = [];
  for (const code of emittableCodes(spec)) {
    if (!known.has(code)) {
      problems.push(`判定码 ${code} 未登记在基准的违例码登记表中，不作判定 / verdict code ${code} is absent from the baseline's violation-code registry; no verdict is issued`);
    }
  }
  return problems;
}

// 等级次序取自 level_definitions.levels 的声明顺序：生命周期字段的「自 Lx 起」由该
// 顺序解释，本工具不持有任何私有的等级排序表。
// Level order comes from the declaration order of level_definitions.levels: the "from Lx"
// of a lifecycle field is read against that order and this tool keeps no private ranking.
function levelRank(levels, levelId) {
  return levels.levels.findIndex((item) => item.level_id === levelId);
}

// 字段存在性：字符串取非空，对象取非空键集合，与 NODE_FIELD_MISSING 的严格取向一致。
// Field presence: a string must be non-empty and an object must carry keys, matching the
// strict stance NODE_FIELD_MISSING already takes.
function isPresent(value) {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim() !== "";
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

function resolvePath(root, dotted) {
  return String(dotted).split(".").reduce(
    (acc, key) => (acc === undefined || acc === null ? undefined : acc[key]),
    root
  );
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
  const schema = component(spec, "node_schema");
  // 规则类型支持性属兼容问题：基准声明了本工具未支持的规则类型时整次拒绝，
  // 而不是把不支持记成样例违例（违例码登记表对 RULE_TYPE_UNSUPPORTED 的明文语义）。
  // Rule-type support is a compatibility matter: a rule type this tool does not support
  // refuses the whole run instead of being recorded as a per-fixture violation (the
  // registry's stated semantics for RULE_TYPE_UNSUPPORTED).
  const SUPPORTED_RULE_TYPES = [
    "forbidden_dependency", "required_role_token",
    // v0.4.0 生命周期字段组的五种规则类型 / the five lifecycle rule types of v0.4.0
    "lifecycle_status_gate", "lifecycle_date_gate", "lifecycle_enum_plus_flag",
    "lifecycle_floor_check", "lifecycle_enum_gate",
  ];
  // 规则类型的巡检范围与判定范围一致：必填字段、生命周期字段组、供应商独立性字段。
  // 若只巡检必填字段，基准在生命周期字段里声明的未知规则类型会被静默漏过。
  // The sweep covers exactly what the tool rules on: required fields, the lifecycle
  // field group and the vendor-independence field. Sweeping only the required fields
  // would let an unknown rule type declared inside a lifecycle field pass in silence.
  for (const field of machineRuleFields(schema)) {
    const rule = field.constraint_machine_rule;
    if (rule && !SUPPORTED_RULE_TYPES.includes(rule.type)) {
      problems.push(`RULE_TYPE_UNSUPPORTED:${rule.type} — 基准声明了本工具尚未实现的规则类型，不作判定 / the baseline declares a rule type this tool does not implement, so no verdict is issued`);
    }
  }
  problems.push(...registryProblems(spec));
  const roleField = schema.required_fields.find((f) => f.constraint_machine_rule && f.constraint_machine_rule.type === "required_role_token");
  problems.push(...lexiconProblems(roleField && roleField.constraint_machine_rule, fixtureFile));
  const declared = fixtureFile.consumes && fixtureFile.consumes.spec_version;
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
// v0.3.1：附加词合格性校验按基准条文执行——判据（禁用后缀表、后缀语义、证据要求）
// 读自 constraint_machine_rule.adopter_lexicon_eligibility_rule，本工具不持有词表副本。
// 后缀按词尾匹配而非子串匹配：v0.3.1 初稿曾用子串匹配，误拒 officer、community steward
// 一类合法角色词（officer 甚至是基准本体词表成员），该误伤登记于 CR-2026-08-15-005。
// 任一违例以退出码 2 拒绝整次运行，词表扩展因此不能绕过 human_handoff 硬判据。
// v0.3.1: token eligibility is enforced per baseline text — the criteria (forbidden-suffix
// list, suffix semantics, evidence requirement) are read from
// constraint_machine_rule.adopter_lexicon_eligibility_rule and this tool keeps no copy.
// Suffixes match at the end of the token, not as substrings: an early v0.3.1 draft used
// substring matching and falsely refused legitimate role words such as officer or
// community steward (officer is itself in the baseline's own token list) — registered in
// CR-2026-08-15-005. Any violation refuses the whole run at exit code 2, so the lexicon
// can never bypass the human_handoff hard test.
function lexiconProblems(rule, fixtureFile) {
  const lex = fixtureFile.adopter_lexicon;
  const evidence = fixtureFile.adopter_lexicon_evidence;
  const problems = [];
  if (lex === undefined || (Array.isArray(lex) && lex.length === 0)) {
    if (Array.isArray(lex)) ADOPTER_LEXICON = [];
    return problems;
  }
  if (!Array.isArray(lex) || (evidence !== undefined && (typeof evidence !== "object" || evidence === null || Array.isArray(evidence)))) {
    problems.push("ADOPTER_LEXICON_MALFORMED: adopter_lexicon 须为数组、adopter_lexicon_evidence 须为对象 / adopter_lexicon must be an array and adopter_lexicon_evidence an object");
    return problems;
  }
  const elig = rule && rule.adopter_lexicon_eligibility_rule;
  if (!elig) {
    problems.push("ADOPTER_LEXICON_MALFORMED: 基准缺附加词合格性判据（需 v0.3.1 及以上），声明了词表即不得运行 / the baseline states no lexicon-eligibility criteria (v0.3.1+ required); with a lexicon declared the run may not proceed");
    return problems;
  }
  const badType = lex.filter((t) => typeof t !== "string" || t.trim().length === 0);
  if (badType.length) {
    problems.push(`ADOPTER_LEXICON_MALFORMED: 附加词须为非空字符串 / tokens must be non-empty strings (${badType.length})`);
  }
  const tokens = lex.filter((t) => typeof t === "string" && t.trim().length > 0);
  const badSuffix = tokens.filter((t) => {
    const low = t.toLowerCase();
    return elig.forbidden_suffixes.some((suf) => low.endsWith(String(suf).toLowerCase()));
  });
  if (badSuffix.length) {
    problems.push(
      `ADOPTER_LEXICON_INVALID_TOKEN: 附加角色词不合格（机构名、系统名或泛称不得入词表）/ `
        + `ineligible adopter lexicon tokens: ${badSuffix.join(", ")}`
    );
  }
  const noEvidence = tokens.filter((t) => {
    const entry = evidence ? evidence[t] : undefined;
    return typeof entry !== "string" || entry.trim().length === 0;
  });
  if (noEvidence.length) {
    problems.push(
      `ADOPTER_LEXICON_EVIDENCE_MISSING: 附加词缺少非空证据条目（岗位名与可被找到的位置）/ `
        + `tokens without a non-empty evidence entry: ${noEvidence.join(", ")}`
    );
  }
  ADOPTER_LEXICON = problems.length ? [] : tokens;
  return problems;
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

// 组件一（续）：v0.4.0 的生命周期字段组与供应商独立性字段。
// 触发输入域取自违例码登记表的 applies_when：这些码的触发输入是 level_claim，未申报
// 等级的样例结构性不触发，等级未在基准内定义时由 LEVEL_UNKNOWN 处置而不在此重复报。
// 存在性由字段自身的 required_from_level 与 levels 的声明顺序决定，取值合规一律且只由
// 该字段的 constraint_machine_rule 判定（machine_rule_contract）。
// Component 1 continued: the v0.4.0 lifecycle field group and the vendor-independence
// field. The triggering input domain is the registry's applies_when — these codes trigger
// on a level_claim, so a fixture claiming no level does not engage them structurally, and
// a level the baseline does not define is handled by LEVEL_UNKNOWN rather than restated
// here. Presence follows each field's own required_from_level against the declared order
// of levels, and value compliance is ruled by that field's constraint_machine_rule and by
// nothing else (machine_rule_contract).
function checkLifecycle(node, schema, levels, claim, runContext) {
  const fields = [...(schema.lifecycle_fields || [])];
  if (schema.vendor_independence_field) fields.push(schema.vendor_independence_field);
  const result = { reasons: [], effectiveLevel: null };
  if (!fields.length || !claim) return result;
  const claimedRank = levelRank(levels, claim.level_id);
  if (claimedRank < 0) return result;

  for (const field of fields) {
    const value = node ? node[field.field] : undefined;
    const present = isPresent(value);
    const requiredFrom = field.required_from_level;
    if (requiredFrom) {
      const rank = levelRank(levels, requiredFrom);
      if (rank >= 0 && claimedRank >= rank && !present) {
        result.reasons.push(`LIFECYCLE_FIELD_MISSING:${field.field}`);
        continue;
      }
    }
    const rule = field.constraint_machine_rule;
    if (!rule || !present) continue;
    // 触发等级：trigger_level 为精确等级，trigger_level_at_or_above 为该等级及以上。
    // Trigger level: trigger_level is exact, trigger_level_at_or_above is that level and up.
    if (rule.trigger_level !== undefined) {
      if (claim.level_id !== rule.trigger_level) continue;
    } else if (rule.trigger_level_at_or_above !== undefined) {
      const gate = levelRank(levels, rule.trigger_level_at_or_above);
      if (gate < 0 || claimedRank < gate) continue;
    }
    const outcome = applyLifecycleRule(rule, node, field, runContext);
    if (!outcome) continue;
    (outcome.codes || [outcome.code]).forEach((code) => result.reasons.push(code));
    if (outcome.effectiveLevel) result.effectiveLevel = outcome.effectiveLevel;
  }
  result.reasons = [...new Set(result.reasons)];
  return result;
}

function applyLifecycleRule(rule, node, field, runContext) {
  if (rule.type === "lifecycle_status_gate" || rule.type === "lifecycle_enum_gate") {
    // 单值闸门：取值须恰等于 required_value，缺值同样不等于它。
    // Single-value gate: the value must equal required_value exactly, and an absent value
    // does not equal it either.
    const value = resolvePath(node, rule.field_path);
    return value === rule.required_value ? null : { code: rule.violation_code };
  }
  if (rule.type === "lifecycle_floor_check") {
    // 三项承诺逐项须等于 required_value；任一项为可削减或未作声明即违例，
    // 违例码不带后缀（登记表语义：任一项即记）。
    // Each of the three commitments must equal required_value; any entry declared
    // reducible or left undeclared violates, and the code carries no suffix (registry
    // semantics: any one entry records it).
    const block = resolvePath(node, rule.field_path) || {};
    const bad = (rule.entries || []).some((entry) => block[entry] !== rule.required_value);
    return bad ? { code: rule.violation_code } : null;
  }
  if (rule.type === "lifecycle_enum_plus_flag") {
    // 规则类型名声明了两半：枚举取自字段自身的 allowed_values，标志取自
    // forbidden_flag_path。两半都在基准里，本工具不补充第三个判据。
    // The rule type names two halves: the enumeration comes from the field's own
    // allowed_values and the flag from forbidden_flag_path. Both live in the baseline and
    // this tool adds no third criterion.
    const codes = [];
    const value = resolvePath(node, rule.field_path);
    if (Array.isArray(field.allowed_values) && !field.allowed_values.includes(value)) {
      codes.push(`NODE_ENUM_INVALID:${field.field}`);
    }
    if (resolvePath(node, rule.forbidden_flag_path) === rule.forbidden_flag_value) {
      codes.push(rule.violation_code);
    }
    return codes.length ? { codes } : null;
  }
  if (rule.type === "lifecycle_date_gate") {
    // 条文规则 as_of_date <= review_due，比较基准由 compare_against 指定（run.as_of_date）。
    // 运行未声明 as_of_date 时本码的触发输入不存在，按 applies_when 不判定，而不是
    // 用今天的系统日期补上——工具的时钟不是判据。
    // The stated rule is as_of_date <= review_due, with compare_against naming the basis
    // (run.as_of_date). Where the run declares no as_of_date the trigger input for this
    // code does not exist and applies_when means no ruling is made, rather than the tool
    // filling in today's system date — a tool's clock is not a criterion.
    const asOf = resolvePath(runContext, rule.compare_against);
    const due = resolvePath(node, rule.field_path);
    if (typeof asOf !== "string" || typeof due !== "string") return null;
    if (asOf <= due) return null;
    return { code: rule.violation_code, effectiveLevel: rule.effective_level_on_violation || null };
  }
  return { code: `RULE_TYPE_UNSUPPORTED:${rule.type}` };
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

// 组件二（续）：v0.4.0 的测量声明类判据。样例只声明「条件是否满足」「方向是好是坏」
// 「结论写成什么」，不声明任何计数、比例或耗时——与本样例集既有的分母表达方式一致，
// 因此 contains_no_measurement_values 的承诺在扩充后仍然成立。
// 触发输入域按登记表 applies_when：等价两码需要成对测量记录，其余四码需要测量声明，
// 且各自的子块未声明时不触发——未声明不等于违例。
// Component 2 continued: the v0.4.0 measurement-claim criteria. A fixture declares only
// whether a condition held, whether a direction was good or bad, and what the conclusion
// was written as; it declares no count, no ratio and no duration — the same way this
// fixture set already expresses denominators, so the contains_no_measurement_values
// promise survives the extension. The triggering input domains follow the registry's
// applies_when: the two equivalence codes need a paired measurement record and the other
// four need a measurement declaration, and an undeclared sub-block triggers nothing —
// silence is not a violation.
function checkMeasurementClaims(declaration, scoring) {
  if (!declaration) return [];
  const reasons = [];

  const equivalence = scoring.equivalence_conditions;
  const record = declaration.paired_measurement_record;
  if (equivalence && record) {
    // 维度清单读自基准：基准增加一维，本工具随即按新维度判定，无须改码。
    // 机器可判下限：只有被明确声明为不满足的维度才算不满足，未声明的维度不作推定——
    // 记录对该维未作主张，工具也不代它主张。
    // The dimension list is read from the baseline: add a dimension there and this tool
    // rules on it without a code change. Machine-decidable floor: only a dimension
    // explicitly declared unmet counts as unmet, and an undeclared dimension carries no
    // presumption — the record makes no claim there and the tool makes none for it.
    const met = record.conditions_met || {};
    const unmet = (equivalence.dimensions || []).filter((item) => met[item.dimension_id] === false);
    if (record.ruled_equivalent === true && unmet.length > 0) {
      reasons.push(equivalence.violation_code);
    }
    const preregistration = equivalence.threshold_preregistration;
    if (preregistration && record.time_ratio_threshold_cited === true
        && record.threshold_preregistered !== true) {
      reasons.push(preregistration.violation_code);
    }
  }

  const stratified = scoring.stratified_reporting;
  if (stratified) {
    const codes = stratified.violation_codes || [];
    const stratification = declaration.stratification;
    if (codes.includes("STRATIFICATION_MISSING") && stratification
        && stratification.applicable_declared === true
        && !(Array.isArray(stratification.role_groups_reported)
             && stratification.role_groups_reported.length > 0)) {
      reasons.push("STRATIFICATION_MISSING");
    }
    const series = declaration.stratified_series;
    if (codes.includes("WORST_GROUP_REGRESSION") && series && series.total_direction === "improved") {
      const directions = series.role_group_directions || {};
      if (Object.keys(directions).some((group) => directions[group] === "deteriorated")) {
        reasons.push("WORST_GROUP_REGRESSION");
      }
    }
    const basis = declaration.group_membership_basis;
    if (codes.includes("GROUP_MEMBERSHIP_INFERRED") && basis !== undefined
        && basis !== "voluntary_self_report") {
      reasons.push("GROUP_MEMBERSHIP_INFERRED");
    }
  }

  // 不可靠必须声明：条文要求当场声明不可靠「并」指向人工通道，两者缺一即违例。
  // Unreliability must be declared: the text requires saying so on the spot and pointing
  // to the staffed channel, so either omission violates.
  const disclosure = declaration.reliability_disclosure;
  if (scoring.reliability_disclosure_rule_zh && disclosure
      && disclosure.unreliable_output_present === true
      && (disclosure.declared_unreliable_to_user !== true
          || disclosure.pointed_to_staffed_channel !== true)) {
    reasons.push("SILENT_UNRELIABLE_OUTPUT");
  }

  // 样本不足即证据不足：低于预注册最低值时，结论只能写「证据不足」。
  // Insufficient samples are insufficient evidence: below the pre-registered minimum the
  // conclusion may only read insufficient evidence.
  const sufficiency = declaration.sample_sufficiency;
  if (scoring.sample_sufficiency_rule_zh && sufficiency
      && sufficiency.below_preregistered_minimum === true
      && sufficiency.group_conclusion !== "insufficient_evidence") {
    reasons.push("SAMPLE_INSUFFICIENT_CLAIMED_FAIR");
  }

  return [...new Set(reasons)];
}

// 组件五：AI 权限边界。人工专属动作清单读自基准，按 action_id 精确相等判定——
// 条文写明不做子串匹配，因此 stop_resume_decision_support_panel 一类近似标识不得误伤；
// 白名单是信息性清单，不在名单内的动作不自动违例，本工具据此不对其作出判定。
// Component 5: the AI authority boundary. The human-exclusive list is read from the
// baseline and matched on exact action_id equality — the text states that no substring
// matching applies, so a near-miss id such as stop_resume_decision_support_panel must not
// be caught. The whitelist is informative and an unlisted action is no automatic
// violation, so this tool issues no ruling on it.
function checkAuthority(declaration, boundary) {
  if (!boundary || !declaration) return [];
  const exclusive = new Set((boundary.human_exclusive || []).map((item) => item.action_id));
  const reasons = [];
  for (const action of declaration.ai_actions || []) {
    if (exclusive.has(action)) reasons.push(boundary.violation_code);
  }
  return [...new Set(reasons)];
}

// 组件三：等级定义。四项绑定字段缺一不可；闸门比对直接取结构化的 gate_binding.gate_id，
// 不再从自由文本抽取，gate_id 为 none 时不比对。
// Component 3: level definitions. All four binding fields are required, and the gate
// comparison reads gate_binding.gate_id directly instead of extracting it from free
// text; where gate_id is none, no comparison is made.
function checkLevel(claim, levels, node) {
  // 组件级采用：未申报等级的样例不适用本组件（reuse_examples 的预期形态），
  // 不再判 LEVEL_UNKNOWN:none——那是把「没有申报」误当「申报了未知等级」。
  // Component-level adoption: a fixture claiming no level does not engage this
  // component (the form reuse_examples expects); it is no longer LEVEL_UNKNOWN:none,
  // which mistook "no claim" for "an unknown claim".
  if (!claim) return [];
  const level = levels.levels.find((item) => item.level_id === claim.level_id);
  if (!level) return [`LEVEL_UNKNOWN:${claim.level_id}`];
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
  // 组件级采用：未声明 decision 块的样例不适用本组件；此前这里未设防，
  // 第三方样例缺该块会裸抛 TypeError（登记于 CR-2026-08-15-005）。
  // Component-level adoption: a fixture without a decision block does not engage this
  // component; previously this path was unguarded and a third-party fixture missing
  // the block crashed with a bare TypeError (registered in CR-2026-08-15-005).
  if (!decision) return [];
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
  if (!nodeSource) return { reasons: [], line: null };
  let record = fixture.source_of_record;
  // 强制对齐：样例节点 id 与来源文件中的 feature id 相同时，即使未声明
  // source_of_record 也须逐字对齐——真实节点 id 不得携带被改写的字段值
  //（source_alignment_rule 的条文语义；此前对齐可以靠不声明来源而松开）。
  // Forced alignment: where the fixture's node id equals a feature id in the source,
  // verbatim alignment applies even without a source_of_record declaration — a real
  // node id may not carry rewritten field values (the stated semantics of
  // source_alignment_rule; previously alignment could be loosened by not declaring).
  if (!record && fixture.node && typeof fixture.node.id === "string"
      && nodeSource.features.some((item) => item.properties.id === fixture.node.id)) {
    record = { file: nodeSource.__source_label || "node source", feature_id: fixture.node.id };
  }
  if (!record) return { reasons: [], line: null };
  if (!fixture.node) return { reasons: [`SOURCE_MISMATCH:${record.feature_id}`], line: null };
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

function evaluate(fixture, parts, nodeSource, runContext) {
  const alignment = checkSourceAlignment(fixture, parts.schema, nodeSource);
  const lifecycle = checkLifecycle(fixture.node, parts.schema, parts.levels, fixture.level_claim, runContext);
  const reasons = [
    ...alignment.reasons,
    ...checkNodeSchema(fixture.node, parts.schema),
    ...lifecycle.reasons,
    ...checkDenominator(fixture.measurement_declaration, parts.scoring),
    ...checkMeasurementClaims(fixture.measurement_declaration, parts.scoring),
    ...checkAuthority(fixture.authority_declaration, parts.boundary),
    ...checkLevel(fixture.level_claim, parts.levels, fixture.node),
    ...checkDecision(fixture.decision, parts.rules),
  ];
  const unique = [...new Set(reasons)];
  const skipped = [];
  if (!fixture.level_claim) skipped.push("level_definitions");
  if (!fixture.decision) skipped.push("decision_rules");
  return {
    verdict: unique.length === 0 ? "accept" : "reject",
    reasons: unique,
    alignmentLine: alignment.line,
    skipped,
    // 有效等级：仅在基准明文规定回落时给出（REVIEW_OVERDUE 报 L0），其余情形为 null，
    // 即申报等级本身，不由本工具另行折算。
    // Effective level: given only where the baseline states a fallback (REVIEW_OVERDUE
    // reports L0); otherwise null, meaning the claimed level itself, with no conversion
    // of this tool's own.
    effectiveLevel: lifecycle.effectiveLevel,
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
  // L4 系等级在 v0.4.0 拆为 L4a 与 L4b，此处按前缀取全部 L4 系等级而不写死单一编号，
  // 与更早的快照配对时仍能打印其单一 L4 绑定。
  // The L4 family splits into L4a and L4b in v0.4.0, so the line reads every L4-prefixed
  // level rather than one hard-coded id, and still prints the single L4 binding when
  // paired with an earlier snapshot.
  const l4Family = parts.levels.levels.filter((item) => String(item.level_id).startsWith("L4"));
  lines.push(
    `    等级闸门 / Level gates : 结构化 gate_binding，`
      + `${l4Family.map((item) => `${item.level_id} = ${item.gate_binding.gate_id} ${item.gate_binding.timing}`).join("、")}`
      + ` 由基准明文规定 / stated by the baseline, not inferred`
  );
  const lifecycleFields = machineRuleFields(parts.schema).filter((field) => field.required_from_level);
  if (lifecycleFields.length) {
    lines.push(
      `    生命周期字段 / Lifecycle fields : `
        + `${lifecycleFields.map((field) => `${field.field}→${field.required_from_level}`).join("、")}`
        + ` 触发等级与判据均来自基准 / triggering levels and criteria both from baseline text`
    );
  }
  if (parts.boundary) {
    lines.push(
      `    AI 权限边界 / AI authority : ${(parts.boundary.human_exclusive || []).length} 项人工专属动作，`
        + `按 action_id 精确相等判定，不做子串 / human-exclusive actions matched on exact action_id, never as substrings`
    );
  }
  const equivalence = parts.scoring.equivalence_conditions;
  if (equivalence) {
    lines.push(
      `    等价条件 / Equivalence conditions : ${(equivalence.dimensions || []).length} 维（`
        + `${(equivalence.dimensions || []).map((item) => item.dimension_id).join("、")}）与阈值预注册要求来自基准条文 / `
        + `${(equivalence.dimensions || []).length} dimensions and the pre-registration requirement from baseline text`
    );
  }
  const applies = parts.scoring.denominator_integrity_applies_to;
  lines.push(
    `    分母完整性 / Denominator integrity : 适用 ${applies.included_metric_ids.length} 项、`
      + `排除 ${applies.excluded_metric_ids.length} 项，另排除 ${applies.excluded_external_metric_ids.length} 项文件完整性型指标 / `
      + `${applies.included_metric_ids.length} in scope, ${applies.excluded_metric_ids.length} out, `
      + `${applies.excluded_external_metric_ids.length} file-completeness metrics excluded`
  );
  const roleField = parts.schema.required_fields.find((f) => f.constraint_machine_rule && f.constraint_machine_rule.type === "required_role_token");
  const elig = roleField && roleField.constraint_machine_rule.adopter_lexicon_eligibility_rule;
  if (elig) {
    lines.push(
      `    附加词合格性 / Lexicon eligibility : ${elig.type} · ${elig.forbidden_suffixes.length} 项禁用后缀与证据要求来自基准条文 / `
        + `${elig.forbidden_suffixes.length} forbidden suffixes and the evidence requirement from baseline text`
    );
  }
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
    // 第五组件在 v0.4.0 之前的快照中不存在；缺席时 AI 权限边界判据整体不适用。
    // The fifth component does not exist in snapshots before v0.4.0; where it is absent
    // the authority-boundary criterion simply does not apply.
    boundary: component(spec, "ai_authority_boundary"),
  };

  // 运行声明：REVIEW_OVERDUE 的比较基准 run.as_of_date 由样例的顶层 run 块给出，
  // 不取系统时钟——同一份样例在任何一天复跑都必须得到同一判定。
  // Run declaration: run.as_of_date, the comparison basis of REVIEW_OVERDUE, comes from
  // the fixtures' top-level run block and never from the system clock — the same fixture
  // set must yield the same verdicts on whatever day it is replayed.
  const runContext = { run: fixtureFile.run || {} };

  const consistency = checkSpecConsistency(parts.scoring);
  if (consistency.length > 0) {
    process.stderr.write("基准自洽检查未通过，不作任何判定 / baseline self-consistency failed, no verdict issued\n");
    consistency.forEach((line) => process.stderr.write(`    ${line}\n`));
    return 2;
  }

  // 来源文件三态（source_alignment_rule 的条文语义）：未声明→不适用；声明且可读→执行；
  // 声明但不可读→SOURCE_FILE_UNREADABLE 整次拒绝——不再静默跳过后打印与事实相反的说明。
  // Three source-file states (the stated semantics of source_alignment_rule): undeclared →
  // not applicable; declared and readable → executed; declared but unreadable →
  // SOURCE_FILE_UNREADABLE refusing the whole run — no more silent skip behind a message
  // that contradicted the facts.
  const declaredSource = fixtureFile.consumes && fixtureFile.consumes.node_source_of_record;
  let nodeSource = null;
  if (declaredSource) {
    try {
      nodeSource = readJson(path.resolve(HERE, declaredSource));
      nodeSource.__source_label = declaredSource;
    } catch (error) {
      process.stderr.write("兼容校验未通过，不作任何判定 / compatibility gate failed, no verdict issued\n");
      process.stderr.write(
        `    SOURCE_FILE_UNREADABLE: 样例声明的节点来源文件不可读（${declaredSource}），`
          + `声明了来源即不得静默跳过对齐 / the declared node source file is unreadable, and a`
          + ` declared source may not be silently skipped\n`
      );
      return 2;
    }
  }

  const out = [];
  out.push("SEB 桌面配对推演 / SEB tabletop pairing run");
  out.push(`基准 / Baseline : ${spec.spec_id} v${spec.version} (${spec.status})`);
  out.push(`样例 / Fixtures : ${fixtureFile.fixtures_id} v${fixtureFile.version} · ${fixtureFile.fixtures.length} 条 / items`);
  if (runContext.run.as_of_date) {
    out.push(`运行 / Run      : as_of_date ${runContext.run.as_of_date}（复审到期比较基准 / the basis REVIEW_OVERDUE compares against）`);
  }
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
    const result = evaluate(fixture, parts, nodeSource, runContext);
    results.push({ fixture, result });
    if (result.alignmentLine) alignmentLines.push(result.alignmentLine);
  }
  if (!nodeSource) {
    out.push("    样例未声明节点来源文件，来源对齐不适用 / no node source file declared; source alignment not applicable");
  } else if (alignmentLines.length === 0) {
    out.push(`    来源文件已读（${declaredSource}），无样例命中对齐 / source file read; no fixture engaged alignment`);
  } else {
    alignmentLines.forEach((line) => out.push(line));
  }
  out.push("");

  let index = 0;
  let matched = 0;
  for (const { fixture, result } of results) {
    index += 1;
    // 有效等级也纳入一致性判定：样例声明 expected_effective_level 时，回落等级必须
    // 与之相符，否则 REVIEW_OVERDUE 只被验到「报了这个码」而验不到「等级真的回到 L0」。
    // The effective level joins the agreement test: where a fixture declares
    // expected_effective_level the fallback must match it, otherwise REVIEW_OVERDUE would
    // only be tested for emitting the code and never for the level actually returning to L0.
    const levelAgree = fixture.expected_effective_level === undefined
      || (result.effectiveLevel || null) === fixture.expected_effective_level;
    const agree = result.verdict === fixture.expected_verdict
      && JSON.stringify([...result.reasons].sort()) === JSON.stringify([...(fixture.expected_reasons || [])].sort())
      && levelAgree;
    if (agree) matched += 1;
    out.push(`[${index}] ${fixture.fixture_id}  ${fixture.title_zh} / ${fixture.title_en}`);
    out.push(`    判定 / verdict : ${result.verdict.toUpperCase()}   期望 / expected : ${fixture.expected_verdict.toUpperCase()}   ${agree ? "一致 / match" : "不一致 / MISMATCH"}`);
    if (result.effectiveLevel) {
      out.push(`    有效等级 / effective level : ${result.effectiveLevel}（申报 / claimed : ${fixture.level_claim.level_id}，按基准回落 / baseline-stated fallback）`);
    }
    if (result.skipped.length) {
      out.push(`    组件 / components : ${result.skipped.join("、")} 未声明，按组件级采用跳过 / not declared, skipped as component-level adoption`);
    }
    for (const code of result.reasons) {
      const [zh, en] = explain(code);
      out.push(`    理由 / reason  : ${code}`);
      out.push(`                     ${zh} / ${en}`);
    }
    if (!agree) {
      out.push(`    期望理由 / expected reasons : ${(fixture.expected_reasons || []).join(", ") || "(none)"}`);
      if (fixture.expected_effective_level !== undefined) {
        out.push(`    期望有效等级 / expected effective level : ${fixture.expected_effective_level}`);
      }
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
