#!/usr/bin/env node
/* Reproducible keyword census of formal proposals in the current git tree.
 * This is transparent text classification, not semantic peer review.
 */
const fs = require('fs');
const path = require('path');

const RULE_VERSION = '1.0.0';
const FEATURE_RULES = {
  controlled_test_or_validation: ['受控(?:测试|试验|验证)', '(?:测试|试验|验证)(?:场|区|院|平台)', '测试验证', '试点验证', '试运行', '试车', '\\bcontrolled[- ]test(?:ing)?\\b', '\\btestbed\\b', '\\bproving ground\\b', '\\bvalidation (?:site|zone|yard|platform|test)\\b'],
  human_review_or_takeover: ['人工(?:复核|接管|审批|决定|决策|签注|确认|值守|干预)', '人类(?:复核|接管|决定|决策|监督)', '\\bhuman[- ](?:review|takeover|decision|sign[- ]?off|approval|oversight|intervention)\\b', '\\bstaffed (?:review|takeover|service|operation)\\b'],
  non_ai_equivalent_or_opt_out: ['(?:无|非)\\s*AI(?:等价|替代|服务|路径|通道|选择)', '不使用\\s*AI', '拒绝(?:使用)?\\s*AI', '退出(?:AI|算法|智能)(?:服务|路径|选择)?', '\\bnon[- ]AI (?:equivalent|alternative|service|path|route|channel|option)\\b', '\\bAI[- ]free (?:service|path|route|option)\\b', '\\bopt[- ]out\\b', '\\bwithout (?:an? )?AI\\b'],
  explicit_stop_condition: ['停止条件', '停用条件', '触发停用', '立即停止', '停止运行', '暂停运行', '封场', '一票否决', '不得继续(?:运行|开放|发布)', '\\b(?:explicit )?stop condition\\b', '\\bsuspension trigger\\b', '\\bmust (?:stop|suspend|close)\\b', '\\bshutdown condition\\b'],
  rollback_return_or_restore: ['回滚', '退回', '折返', '复原', '撤场', '恢复(?:为|至|普通|日常|原有)', '\\brollback\\b', '\\breturn (?:to|record|action|path|state|for)\\b', '\\brestore (?:to|the|ordinary|public|daily|original)\\b', '\\brevert\\b'],
  saturated_governance_language: ['治理', '审计', '证据', '账本', '可验证', '核证', '可追溯', '\\bgovernance\\b', '\\baudit(?:able)?\\b', '\\bevidence\\b', '\\bledger\\b', '\\bverifiable\\b', '\\btraceable\\b'],
};
const TRACK_RULES = {
  governance_verification: ['治理', '审计', '验证', '核证', '证据', 'governance', 'audit', 'verif'],
  accessibility_inclusion: ['无障碍', '包容', '残障', '老年', '儿童', 'accessib', 'inclusi'],
  industry_testbed: ['产业', '测试场', '试验场', '验证场', '机器人', 'testbed', 'proving ground', 'robot'],
  heritage_culture: ['遗产', '铁路文化', '詹天佑', '工业遗产', 'heritage', 'railway culture'],
  ecology_low_carbon: ['生态', '低碳', '雨洪', '蓝绿', '碳', 'ecolog', 'low[- ]carbon', 'sponge'],
  community_public_service: ['社区', '公共服务', '居民', '民生', 'community', 'public service', 'resident'],
  mobility_logistics: ['交通', '慢行', '物流', '接驳', '出行', 'mobility', 'logistics', 'shuttle'],
  talent_open_innovation: ['人才', '高校', '开源', '创新生态', '孵化', 'talent', 'open source', 'innovation ecosystem'],
  spatial_renewal: ['更新', '缝合', '公共空间', '街区', 'renewal', 'public space', 'urban design'],
};

function arg(name) { const i = process.argv.indexOf(name); return i >= 0 ? process.argv[i + 1] : null; }
function json(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function write(file, data, pretty = true) { fs.writeFileSync(file, JSON.stringify(data, null, pretty ? 2 : 0) + '\n'); }
function match(text, patterns) { return patterns.filter(p => new RegExp(p, 'i').test(text)); }
function trackFor(text) {
  const scores = Object.fromEntries(Object.entries(TRACK_RULES).map(([key, patterns]) => [key, patterns.reduce((sum, p) => sum + Math.min(5, (text.match(new RegExp(p, 'ig')) || []).length), 0)]));
  const best = Math.max(0, ...Object.values(scores));
  const winners = Object.keys(scores).filter(k => scores[k] === best && best > 0).sort();
  return winners.length === 1 ? winners[0] : 'mixed_or_unclassified';
}
function packages(root) {
  const base = path.join(root, 'submissions');
  return fs.readdirSync(base).sort().flatMap(user => {
    const userDir = path.join(base, user);
    if (!fs.statSync(userDir).isDirectory()) return [];
    return fs.readdirSync(userDir).sort().map(name => path.join(userDir, name)).filter(p => fs.statSync(p).isDirectory());
  });
}
function findRoot(start) {
  let current = path.resolve(start);
  while (current !== path.dirname(current)) { if (fs.existsSync(path.join(current, '.git'))) return current; current = path.dirname(current); }
  throw new Error('repository root not found; pass --repo-root');
}
function gitSha(root) {
  let gitDir = path.join(root, '.git');
  if (fs.statSync(gitDir).isFile()) gitDir = path.resolve(root, fs.readFileSync(gitDir, 'utf8').trim().replace(/^gitdir:\s*/, ''));
  const commonFile = path.join(gitDir, 'commondir');
  const commonDir = fs.existsSync(commonFile) ? path.resolve(gitDir, fs.readFileSync(commonFile, 'utf8').trim()) : gitDir;
  const head = fs.readFileSync(path.join(gitDir, 'HEAD'), 'utf8').trim();
  if (!head.startsWith('ref: ')) return head;
  const ref = head.slice(5);
  for (const base of [gitDir, commonDir]) {
    const loose = path.join(base, ref);
    if (fs.existsSync(loose)) return fs.readFileSync(loose, 'utf8').trim();
  }
  for (const base of [gitDir, commonDir]) {
    const packedFile = path.join(base, 'packed-refs');
    if (!fs.existsSync(packedFile)) continue;
    const packed = fs.readFileSync(packedFile, 'utf8').split(/\r?\n/).find(line => line.endsWith(` ${ref}`));
    if (packed) return packed.split(' ')[0];
  }
  throw new Error(`cannot resolve git ref ${ref}`);
}

function main() {
  const root = path.resolve(arg('--repo-root') || findRoot(__dirname));
  const out = path.resolve(arg('--output-dir') || __dirname);
  const started = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const eligible = [], failed = [], excluded = [];
  for (const pkg of packages(root)) {
    const rel = path.relative(root, pkg).split(path.sep).join('/');
    try {
      const proposal = path.join(pkg, 'proposal.md'), agent = path.join(pkg, 'agent.json'), manifest = path.join(pkg, 'manifest.json');
      if (![proposal, agent, manifest].every(fs.existsSync)) { excluded.push({path: rel, reason: 'missing_proposal_agent_or_manifest'}); continue; }
      const m = json(manifest);
      if (m.package_state !== 'ready_for_review' || m.submission_stage !== 'formal') { excluded.push({path: rel, reason: 'not_ready_formal'}); continue; }
      const body = fs.readFileSync(proposal, 'utf8');
      const matches = Object.fromEntries(Object.entries(FEATURE_RULES).map(([key, patterns]) => [key, match(body, patterns)]));
      const flags = Object.fromEntries(Object.entries(matches).map(([key, value]) => [key, value.length > 0]));
      flags.rare_combination = ['controlled_test_or_validation', 'human_review_or_takeover', 'non_ai_equivalent_or_opt_out', 'rollback_return_or_restore'].every(k => flags[k]);
      const heading = (body.match(/^# (.+)$/m) || [null, path.basename(pkg)])[1];
      eligible.push({path: rel, title: heading, proposal_bytes: Buffer.byteLength(body), flags, matched_rule_ids: matches, track: trackFor(body)});
    } catch (error) { failed.push({path: rel, error: `${error.name}: ${error.message}`}); }
  }
  const total = eligible.length;
  const names = [...Object.keys(FEATURE_RULES), 'rare_combination'];
  const counts = Object.fromEntries(names.map(name => { const count = eligible.filter(x => x.flags[name]).length; return [name, {count, share: Number((count / total).toFixed(6))}]; }));
  const tracks = {}; for (const item of eligible) tracks[item.track] = (tracks[item.track] || 0) + 1;
  const sha = gitSha(root);
  const result = {
    schema_version: '1.0.0', rule_version: RULE_VERSION, claim_level: 'reproducible_keyword_census_not_semantic_review', generated_at_utc: started, git_sha: sha,
    sample: {eligibility: 'proposal.md + agent.json + ready_for_review + formal', mechanism_text_scope: ['proposal.md'], agent_usage: 'agent.json establishes package eligibility only', eligible_count: total, failed_count: failed.length, excluded_count: excluded.length},
    method: {feature_rules: FEATURE_RULES, track_rules: TRACK_RULES, track_note: 'Unique highest capped regex-hit score; ties are mixed_or_unclassified. Not an official category.', limitations: ['Keyword presence cannot prove implementation quality, equivalence or intent.', 'False positives and negatives remain possible; per-package matches are retained.', 'Counts describe only the recorded git SHA and rule version.']},
    feature_counts: counts, track_distribution: Object.fromEntries(Object.entries(tracks).sort()),
    findings: {rarest_measured_feature: names.reduce((a, b) => counts[a].count <= counts[b].count ? a : b), rare_combination_definition: 'controlled test + human review + non-AI equivalent/opt-out + rollback/return/restore', governance_language_is_saturated: counts.saturated_governance_language.count > total / 2}, failures: failed, excluded,
  };
  write(path.join(out, 'x-census.json'), result);
  const compact = eligible.map(({path: p, title, proposal_bytes, flags, matched_rule_ids, track}) => ({path: p, title, proposal_bytes, flags, matched_rule_ids: Object.fromEntries(Object.entries(matched_rule_ids).filter(([, v]) => v.length)), track}));
  const chunks = []; let current = [];
  for (const item of compact) {
    const candidate = [...current, item];
    const payload = {schema_version: '1.0.0', rule_version: RULE_VERSION, git_sha: sha, items: candidate};
    if (Buffer.byteLength(JSON.stringify(payload)) > 480000 && current.length) { chunks.push(current); current = [item]; } else current = candidate;
  }
  if (current.length) chunks.push(current);
  for (const file of fs.readdirSync(out).filter(x => /^x-census-details-\d+\.json$/.test(x))) fs.unlinkSync(path.join(out, file));
  const index = chunks.map((items, i) => { const name = `x-census-details-${String(i + 1).padStart(3, '0')}.json`; write(path.join(out, name), {schema_version: '1.0.0', rule_version: RULE_VERSION, git_sha: sha, items}, false); return {path: name, item_count: items.length}; });
  write(path.join(out, 'x-census-details-index.json'), {schema_version: '1.0.0', git_sha: sha, total_items: total, chunks: index});
  const logFile = path.join(out, 'x-census-reading-log.json'); const runs = fs.existsSync(logFile) ? json(logFile).runs : [];
  runs.push({run_at_utc: started, git_sha: sha, rule_version: RULE_VERSION, eligible_count: total, failed_count: failed.length, excluded_count: excluded.length, output: 'x-census.json', detail_index: 'x-census-details-index.json'});
  write(logFile, {schema_version: '1.0.0', runs});
  console.log(`X Census: ${total} eligible, ${failed.length} failed, ${excluded.length} excluded`);
  for (const [name, value] of Object.entries(counts)) console.log(`${name}: ${value.count}/${total} (${(value.share * 100).toFixed(1)}%)`);
  return failed.length ? 1 : 0;
}
process.exitCode = main();
