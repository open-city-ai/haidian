#!/usr/bin/env node
/**
 * run_field_census.js — 同场测量（field census）· 零依赖
 *
 * 目的：对 upstream/main（open-city-ai/haidian）全部 submissions 做一次可重跑的
 * "同场测量"，回答：全场有多少份方案？manifest/model/赛道/场景字段覆盖如何？
 * 与我方（gr-87 / jingzhang-ai-new-track）同赛道、同场景的有多少？
 * 哪些"测项覆盖"在全场是空白（human_fallback / 退出阈值 / 法条引用）？
 *
 * 只读约束（v0.5）：全部经 git ls-tree / git show / git rev-parse / git grep 读取
 * upstream/main（或 CENSUS_FIELD_REF 指定的 ref），绝不 checkout / switch；
 * 默认不写任何文件，只把结果打印到 stdout；显式传入 --write 才更新
 * field-census-evidence.json（复演命令不会破坏 manifest SHA-256）。
 *
 * 用法：node visual/assets/run_field_census.js            # 只读复演
 *       node visual/assets/run_field_census.js --write    # 显式重写证据文件
 * 环境变量（可选）：
 *   CENSUS_FIELD_REF    默认 upstream/main
 *   CENSUS_REPO_ROOT    默认从本脚本向上寻找含 .git 的仓库根
 *   CENSUS_OUT_FILE     默认与脚本同目录 field-census-evidence.json
 *
 * 诚实性约定：
 *   - manifest.json 缺失 / JSON 解析失败 / 读取出错 → 如实计为 missing / parse_error，
 *     不静默跳过，也不猜测补值。
 *   - proposal.md 缺失或 front matter 无法解析 → tracks/scenarios 计为未声明。
 *   - 我方方案不在 upstream/main 上（gr-87 目录为占位空树）→ 单独按同一协议
 *     测量本地分支文件，并在结果中如实标注 merged_on_main=false。
 *   - 所有 gap 判定使用明确写出的正则，第三方可复核。
 */
'use strict';

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SCRIPT_DIR = __dirname;
const MY_PKG_RELPATH = 'submissions/gr-87/jingzhang-ai-new-track'; // 我方方案相对仓库根
const FIELD_REF = process.env.CENSUS_FIELD_REF || 'upstream/main';
const OUT_FILE = process.env.CENSUS_OUT_FILE ||
  path.join(SCRIPT_DIR, 'field-census-evidence.json');
const WRITE_MODE = process.argv.includes('--write'); // v0.5: 默认只读

/* ---------- 仓库根定位（向上找 .git） ---------- */
function findRepoRoot(start) {
  let d = path.resolve(start);
  for (;;) {
    if (fs.existsSync(path.join(d, '.git'))) return d;
    const parent = path.dirname(d);
    if (parent === d) throw new Error('repo root not found above ' + start);
    d = parent;
  }
}
const REPO_ROOT = process.env.CENSUS_REPO_ROOT || findRepoRoot(SCRIPT_DIR);
process.chdir(REPO_ROOT);

/* ---------- git 只读封装 ---------- */
function git(args) {
  return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }).trim();
}
function readFileAt(ref, relpath) {
  try { return git(['show', ref + ':' + relpath]); }
  catch (e) { return null; } // 文件不存在或读取失败
}

/* ---------- front matter（YAML 子集）解析 ---------- */
function extractFrontMatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return null;
  return m[1];
}
function cleanItem(s) { return s.trim().replace(/^["']|["']$/g, '').replace(/\s*#.*$/, '').trim(); }
function parseInlineList(rest) {
  const m = /^\[([\s\S]*)\]$/.exec(rest.trim());
  if (!m) return null;
  return m[1].split(',').map(cleanItem).filter(Boolean);
}
/**
 * 读取 front matter 中 key 的列表值。返回 { v: [...], fmt } 或 null。
 * 支持四种真实场上写法（实测发现）：
 *   inline_array    tracks: ["a", "b"]
 *   dash_block      tracks:\n  - a\n  - b
 *   multi_bracket   tracks:\n  [\n    "a",\n    "b"\n  ]
 *   quoted_string   tracks: "a,b,c"  （非标准：引号逗号串，按逗号切分）
 */
function listValue(fmBody, key) {
  const lines = fmBody.split(/\r?\n/);
  let inline = null, fmt = null;
  for (let i = 0; i < lines.length; i++) {
    const lm = /^\s*([A-Za-z_][\w]*)\s*:\s*(.*)$/.exec(lines[i]);
    if (!lm || lm[1] !== key) continue;
    const rest = lm[2].trim();
    if (rest === '') {
      // block 风格：- item，或多行 [ ... ]
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === '') j++;
      if (j < lines.length && /^\s*\[/.test(lines[j])) {
        let buf = '';
        while (j < lines.length && !/\]/.test(lines[j])) { buf += lines[j] + '\n'; j++; }
        if (j < lines.length) buf += lines[j];
        const parsed = parseInlineList(buf);
        if (parsed && parsed.length) { inline = parsed; fmt = 'multi_bracket'; }
      } else {
        const items = [];
        for (; j < lines.length; j++) {
          const bm = /^\s*-\s*(.+?)\s*$/.exec(lines[j]);
          if (!bm) break;
          items.push(cleanItem(bm[1]));
        }
        if (items.length) { inline = items; fmt = 'dash_block'; }
      }
    } else if (/^["'][^"']*["']$/.test(rest)) {
      // 引号串：含逗号按逗号切分，否则视为单元素列表（均为非标准写法）
      const inner = rest.replace(/^["']|["']$/g, '');
      if (inner.includes(',')) { inline = inner.split(',').map(cleanItem).filter(Boolean); fmt = 'quoted_string'; }
      else { inline = [cleanItem(inner)]; fmt = 'quoted_string'; }
    } else {
      inline = parseInlineList(rest);
      if (inline && inline.length) fmt = 'inline_array';
    }
  }
  return (inline && inline.length) ? { v: inline, fmt } : null; // 空列表视同未声明
}
function parseManifest(text) {
  if (text === null) return { status: 'missing' };
  try {
    const d = JSON.parse(text);
    if (!d || typeof d !== 'object') return { status: 'parse_error' };
    const model = (d.agent && typeof d.agent.model === 'string' && d.agent.model.trim())
      ? d.agent.model.trim() : '';
    return { status: 'ok', model, top_level_model: typeof d.model === 'string' ? d.model : null };
  } catch (e) {
    return { status: 'parse_error' };
  }
}

/* ---------- 测项覆盖空白判定（正则即定义，可复核） ---------- */
const GAP_PATTERNS = {
  human_fallback: {
    label: 'human_fallback / 人工回退 / 无AI等价路径 信号',
    re: /human_fallback|人工回退|人字回退|fallback|无ai等价|等价路径|非ai路径|non-ai/i,
  },
  exit_threshold: {
    label: '退出阈值 / 退出条件 / 退出机制 / 叫停 信号',
    re: /退出阈值|退出条件|退出机制|退出通道|exit[\s_-]?threshold|叫停/i,
  },
  legal_citation: {
    label: '法条引用信号（第N条 / 《XX法》 / 国办发〔20XX〕N号）',
    re: /第[0-9一二三四五六七八九十百千]+条|《[^》]{1,40}法》|国办发\s*[〔（][0-9]{4}[〕）]/,
  },
};
const MODEL_PLACEHOLDERS = new Set(
  ['agent-declared-model', 'tbd', 'to-be-determined', 'unknown', 'n/a', 'na', '-', 'none', '待定', 'not-declared']
    .map(s => s.toLowerCase()));

/* ---------- 1. 枚举全场方案 ---------- */
const shaMain = git(['rev-parse', FIELD_REF]);
// 注意：默认 ls-tree 会对含特殊字符（引号等）的路径做 C-style 引用转义，
// 必须用 -z（NUL 分隔）拿原始路径，否则路径键会带上引号导致 git show 失败。
const allFiles = git(['ls-tree', '-r', '-z', '--name-only', FIELD_REF, '--', 'submissions/'])
  .split('\0').filter(Boolean);

const schemes = new Map(); // key: author/pkg
const authorLevelFiles = []; // submissions/<author>/<file> —— 无方案子目录的异常
for (const f of allFiles) {
  const parts = f.split('/');
  if (parts.length < 3) { authorLevelFiles.push(f); continue; }
  const key = parts[0] + '/' + parts[1] + '/' + parts[2];
  if (!schemes.has(key)) {
    schemes.set(key, { author: parts[1], pkg: parts[2], files: [] });
  }
  schemes.get(key).files.push(f);
}
const schemeKeys = Array.from(schemes.keys()).sort();
const authors = Array.from(new Set(schemeKeys.map(k => k.split('/')[1]))).sort();

/* ---------- 2. 逐方案测量 ---------- */
const stats = {
  schemes_total: schemeKeys.length,
  authors_total: authors.length,
  author_level_anomaly_files: authorLevelFiles,
  manifest: { present: 0, missing: 0, parse_error: 0, model_present: 0, model_missing: 0,
    model_placeholder: 0, model_top_level: 0 },
  proposal: { present: 0, missing: 0, frontmatter_ok: 0, tracks_declared: 0, tracks_empty: 0,
    scenarios_declared: 0, scenarios_empty: 0,
    track_formats: { inline_array: 0, dash_block: 0, multi_bracket: 0, quoted_string: 0 },
    scenario_formats: { inline_array: 0, dash_block: 0, multi_bracket: 0, quoted_string: 0 } },
  same_track: [],           // 与我方 tracks 交集非空
  same_scenario: [],        // 与我方 scenarios 交集非空
  distinct_models: new Map(), // 原始写法 → 计数
};
const gapCounters = {};   // patternKey -> {covered: n, examples: []}
for (const g of Object.keys(GAP_PATTERNS)) gapCounters[g] = { covered: 0, examples: [] };

// 先读我方声明（本地工作区，同一协议）
const myProposalText = fs.readFileSync(path.join(REPO_ROOT, MY_PKG_RELPATH, 'proposal.md'), 'utf8');
const myFm = extractFrontMatter(myProposalText);
const myTracks = myFm ? (listValue(myFm, 'tracks') || { v: [] }).v : [];
const myScenarios = myFm ? (listValue(myFm, 'scenarios') || { v: [] }).v : [];
const myManifest = parseManifest(
  fs.readFileSync(path.join(REPO_ROOT, MY_PKG_RELPATH, 'manifest.json'), 'utf8'));

const myTrackSet = new Set(myTracks);
const myScenarioSet = new Set(myScenarios);
const scenarioPeerCounts = {}; // 每个我方场景被他方方案声明的次数
for (const sc of myScenarios) scenarioPeerCounts[sc] = 0;

for (const key of schemeKeys) {
  const s = schemes.get(key);
  const relManifest = key + '/manifest.json';
  const relProposal = key + '/proposal.md';

  /* manifest */
  const manifestText = readFileAt(FIELD_REF, relManifest);
  const m = parseManifest(manifestText);
  if (m.status === 'ok') {
    stats.manifest.present++;
    if (m.model) {
      stats.manifest.model_present++;
      const lower = m.model.toLowerCase();
      stats.distinct_models.set(m.model, (stats.distinct_models.get(m.model) || 0) + 1);
      if (MODEL_PLACEHOLDERS.has(lower)) stats.manifest.model_placeholder++;
    } else {
      stats.manifest.model_missing++;
    }
    if (m.top_level_model) stats.manifest.model_top_level++;
  } else if (m.status === 'missing') {
    stats.manifest.missing++;
  } else {
    stats.manifest.parse_error++;
  }

  /* proposal + front matter */
  const proposalText = readFileAt(FIELD_REF, relProposal);
  let tracks = [], scenarios = [];
  if (proposalText !== null) {
    stats.proposal.present++;
    const fm = extractFrontMatter(proposalText);
    if (fm) {
      stats.proposal.frontmatter_ok++;
      const tv = listValue(fm, 'tracks');
      const sv = listValue(fm, 'scenarios');
      if (tv) { tracks = tv.v; stats.proposal.track_formats[tv.fmt]++; }
      if (sv) { scenarios = sv.v; stats.proposal.scenario_formats[sv.fmt]++; }
    }
    // gap 信号扫描（全文）
    for (const g of Object.keys(GAP_PATTERNS)) {
      if (GAP_PATTERNS[g].re.test(proposalText)) {
        gapCounters[g].covered++;
        if (gapCounters[g].examples.length < 20) gapCounters[g].examples.push(key);
      }
    }
  } else {
    stats.proposal.missing++;
  }
  if (tracks.length) stats.proposal.tracks_declared++; else stats.proposal.tracks_empty++;
  if (scenarios.length) stats.proposal.scenarios_declared++; else stats.proposal.scenarios_empty++;
  for (const sc of scenarios) if (myScenarioSet.has(sc)) scenarioPeerCounts[sc]++;

  /* 与我方交集 */
  if (tracks.some(t => myTrackSet.has(t))) stats.same_track.push(key);
  if (scenarios.some(sc => myScenarioSet.has(sc))) stats.same_scenario.push(key);
}
stats.same_track.sort();
stats.same_scenario.sort();

/* ---------- 3. 汇总 ---------- */
const n = stats.schemes_total || 1;
const ratio = (x) => +(x / n).toFixed(4);
const findings = [];
findings.push({
  id: 'F1-manifest-parse-health',
  label: 'manifest.json 读取与解析健康度',
  detail: `全场 ${stats.schemes_total} 份方案：manifest 存在 ${stats.manifest.present}（${ratio(stats.manifest.present)}）、缺失 ${stats.manifest.missing}（${ratio(stats.manifest.missing)}）、JSON 解析失败 ${stats.manifest.parse_error}（${ratio(stats.manifest.parse_error)}）。`,
});
findings.push({
  id: 'F2-model-field-coverage',
  label: 'manifest.agent.model 字段覆盖（模型字段写法）',
  detail: `model 缺失或为空 ${stats.manifest.model_missing}（${ratio(stats.manifest.model_missing)}），占位写法（如 agent-declared-model/TBD/unknown）${stats.manifest.model_placeholder}（${ratio(stats.manifest.model_placeholder)}），合计"未给出可识别模型" ${stats.manifest.model_missing + stats.manifest.model_placeholder}（${ratio(stats.manifest.model_missing + stats.manifest.model_placeholder)}）；全场 model 原始写法去重 ${stats.distinct_models.size} 种。`,
  distinct_model_writings: Array.from(stats.distinct_models.entries())
    .sort((a, b) => b[1] - a[1]).slice(0, 25),
});
findings.push({
  id: 'F3-track-declaration',
  label: 'proposal.md front matter 赛道(tracks)声明与写法',
  detail: `tracks 声明数>0 的 ${stats.proposal.tracks_declared}（${ratio(stats.proposal.tracks_declared)}），tracks 为空或未声明 ${stats.proposal.tracks_empty}（${ratio(stats.proposal.tracks_empty)}）。文档规定每方案须声明 1–3 个赛道。声明写法分布：标准数组 ${stats.proposal.track_formats.inline_array}、破折号块 ${stats.proposal.track_formats.dash_block}、多行括号 ${stats.proposal.track_formats.multi_bracket}、引号逗号串(非标准) ${stats.proposal.track_formats.quoted_string}。`,
  track_format_counts: stats.proposal.track_formats,
});
findings.push({
  id: 'F4-scenario-declaration',
  label: 'proposal.md front matter 场景卡(scenarios)声明与写法',
  detail: `scenarios 声明数>0 的 ${stats.proposal.scenarios_declared}（${ratio(stats.proposal.scenarios_declared)}），未声明 ${stats.proposal.scenarios_empty}（${ratio(stats.proposal.scenarios_empty)}）；proposal.md 缺失 ${stats.proposal.missing}（${ratio(stats.proposal.missing)}）。声明写法分布：标准数组 ${stats.proposal.scenario_formats.inline_array}、破折号块 ${stats.proposal.scenario_formats.dash_block}、多行括号 ${stats.proposal.scenario_formats.multi_bracket}、引号逗号串(非标准) ${stats.proposal.scenario_formats.quoted_string}。`,
  scenario_format_counts: stats.proposal.scenario_formats,
});
for (const g of Object.keys(GAP_PATTERNS)) {
  const c = gapCounters[g];
  const gapN = n - c.covered;
  findings.push({
    id: 'GAP-' + g,
    label: GAP_PATTERNS[g].label,
    regex: GAP_PATTERNS[g].re.toString(),
    detail: `覆盖 ${c.covered}（${ratio(c.covered)}）；测项空白（未出现该信号，含 proposal.md 缺失者）${gapN}（${ratio(gapN)}）。`,
    example_covered: c.examples,
  });
}

/* git grep 交叉验证 human_fallback 一项（此时全部 blob 已本地，不再触发网络）。
   注意：必须复用与脚本扫描完全相同的正则源码，否则数字不可比。 */
let grepCrossCheck = null;
try {
  const reSrc = GAP_PATTERNS.human_fallback.re.source; // 与脚本同一 pattern
  const hits = git(['grep', '-l', '-i', '-E', reSrc, FIELD_REF, '--', 'submissions/*/*/proposal.md'])
    .split('\n').filter(Boolean);
  const mine = gapCounters.human_fallback.covered;
  grepCrossCheck = { pattern: reSrc, git_grep_file_hits: hits.length, script_scheme_hits: mine,
    consistent: hits.length === mine };
} catch (e) {
  grepCrossCheck = { error: String(e.message || e) };
}

/* 我方位置（v0.5：按 main 上实际文件存在性判定，不硬编码） */
const myTrackIntersectN = stats.same_track.length;
const myScenarioIntersectN = stats.same_scenario.length;
const myProposalOnMain = readFileAt(FIELD_REF, MY_PKG_RELPATH + '/proposal.md');
const myManifestOnMain = readFileAt(FIELD_REF, MY_PKG_RELPATH + '/manifest.json');
let mainIteration = null;
if (myProposalOnMain) {
  const m2 = /^iteration:\s*["']?([\w.-]+)["']?\s*$/m.exec(myProposalOnMain);
  mainIteration = m2 ? m2[1] : 'unknown';
}
const myPosition = {
  merged_on_main: myProposalOnMain !== null && myManifestOnMain !== null,
  note: myProposalOnMain
    ? 'upstream/main 已包含历史版本（iteration=' + mainIteration + '）；本次测量针对本地 v0.5 工作区声明，仅用于同场对照。'
    : 'upstream/main 未包含该方案；本次测量针对本地工作区声明。',
  declared_tracks: myTracks,
  declared_scenarios: myScenarios,
  tracks_declared_count: myTracks.length,
  scenarios_declared_count: myScenarios.length,
  same_track_schemes: myTrackIntersectN,
  same_scenario_schemes: myScenarioIntersectN,
  scenario_peer_counts: scenarioPeerCounts,
  model_placeholder_self: myManifest.status === 'ok' && myManifest.model ? myManifest.model : null,
};

/* ---------- 4. 落盘 evidence.json ---------- */
const out = {
  census_id: 'field-census-gr87-001',
  measurement_date: new Date().toISOString().slice(0, 10),
  instrument: {
    script: 'submissions/gr-87/jingzhang-ai-new-track/visual/assets/run_field_census.js',
    node: process.version,
    git: git(['--version']),
    dependencies: 'none (child_process/fs/path only)',
  },
  field: {
    ref: FIELD_REF,
    git_sha_of_main: shaMain,
    repo_root: REPO_ROOT,
  },
  scope: {
    my_author: 'gr-87',
    my_package: 'jingzhang-ai-new-track',
    my_package_relpath: MY_PKG_RELPATH,
    measurement_protocol: 'scheme dir = submissions/<author>/<pkg>/ containing >=1 file; tracks/scenarios read from proposal.md front matter (docs/tracks.md, docs/scenarios.md); manifest fields from manifest.json',
  },
  totals: {
    schemes: stats.schemes_total,
    authors: stats.authors_total,
    manifest_present: stats.manifest.present,
    manifest_missing: stats.manifest.missing,
    manifest_parse_error: stats.manifest.parse_error,
    model_present: stats.manifest.model_present,
    model_missing: stats.manifest.model_missing,
    model_placeholder: stats.manifest.model_placeholder,
    model_missing_or_placeholder_total: stats.manifest.model_missing + stats.manifest.model_placeholder,
    model_top_level_in_manifest: stats.manifest.model_top_level,
    distinct_model_writings: stats.distinct_models.size,
    proposal_present: stats.proposal.present,
    proposal_missing: stats.proposal.missing,
    frontmatter_ok: stats.proposal.frontmatter_ok,
    tracks_declared: stats.proposal.tracks_declared,
    tracks_empty: stats.proposal.tracks_empty,
    scenarios_declared: stats.proposal.scenarios_declared,
    scenarios_empty: stats.proposal.scenarios_empty,
    track_formats: stats.proposal.track_formats,
    scenario_formats: stats.proposal.scenario_formats,
    author_level_anomaly_files: stats.author_level_anomaly_files.length,
  },
  my_declared: { tracks: myTracks, scenarios: myScenarios, source: 'proposal.md front matter (local branch)' },
  same_track: { count: myTrackIntersectN, schemes: stats.same_track },
  same_scenario: { count: myScenarioIntersectN, schemes: stats.same_scenario },
  gap_findings: findings,
  my_position: myPosition,
  grep_cross_check: grepCrossCheck,
  reproducibility: {
    rerun_command: 'node submissions/gr-87/jingzhang-ai-new-track/visual/assets/run_field_census.js',
    env_overrides: ['CENSUS_FIELD_REF', 'CENSUS_REPO_ROOT', 'CENSUS_OUT_FILE'],
    determinism_note: 'scheme lists sorted; measurement depends only on the git ref named by git_sha_of_main',
  },
};
if (WRITE_MODE) {
  fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2), 'utf8');
}

/* ---------- 5. 控制台汇总 ---------- */
const L = (k, v) => console.log('  ' + k.padEnd(46) + String(v));
console.log('== 同场测量 field census ==');
console.log('field ref        : ' + FIELD_REF + '  @ ' + shaMain.slice(0, 12));
console.log('measurement date : ' + out.measurement_date + '  (node ' + process.version + ')');
console.log('— totals —');
L('schemes (submissions/a/p/)', stats.schemes_total);
L('authors', stats.authors_total);
L('manifest present / missing / parse_error', stats.manifest.present + ' / ' + stats.manifest.missing + ' / ' + stats.manifest.parse_error);
L('agent.model present / missing / placeholder', stats.manifest.model_present + ' / ' + stats.manifest.model_missing + ' / ' + stats.manifest.model_placeholder);
L('distinct model writings', stats.distinct_models.size);
L('proposal.md present / missing', stats.proposal.present + ' / ' + stats.proposal.missing);
L('tracks declared>0 / empty', stats.proposal.tracks_declared + ' / ' + stats.proposal.tracks_empty);
L('scenarios declared>0 / empty', stats.proposal.scenarios_declared + ' / ' + stats.proposal.scenarios_empty);
console.log('— 我方（gr-87/jingzhang-ai-new-track，本地工作区声明；main 版本以 my_position 为准）—');
L('my tracks', '[' + myTracks.join(', ') + ']');
L('my scenarios', '[' + myScenarios.join(', ') + ']');
L('same-track schemes', myTrackIntersectN);
L('same-scenario schemes', myScenarioIntersectN);
for (const sc of myScenarios) L('  peers for ' + sc, scenarioPeerCounts[sc]);
console.log('— 测项覆盖空白（gap findings）—');
for (const f of findings) {
  console.log('  [' + f.id + '] ' + f.label);
  console.log('      ' + f.detail);
}
console.log('— cross-check (git grep vs script) —');
console.log('  ' + JSON.stringify(grepCrossCheck));
if (WRITE_MODE) { console.log('evidence written : ' + OUT_FILE); }
else { console.log('evidence NOT written (read-only mode; rerun with --write to refresh the committed evidence file). would-write: ' + OUT_FILE); }
