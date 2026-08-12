#!/usr/bin/env node

/*
 * Build three bilingual, data-backed review boards from the package's existing
 * contracts. The boards are communication artifacts, not new site evidence.
 */
const fs = require("fs");
const path = require("path");

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, "../..");
const figureDir = path.join(packageDir, "assets", "figures");

const read = (name) => JSON.parse(fs.readFileSync(path.join(assetDir, name), "utf8"));
const journey = read("ai-era-ordinary-journey-contract.json");
const journeyEvidence = read("ai-era-ordinary-journey-evidence.json");
const traceability = read("ai-era-traceability-index.json");
const implementation = read("implementation-operation-matrix.json");
const landmarks = read("public-space-landmarks.json");
const culture = read("culture-signage-system.json");

const zhScenarioNames = {
  "SCN-01": "社区保留率协商台",
  "SCN-02": "技能再造走廊",
  "SCN-03": "代际共学导航",
  "SCN-04": "夜间人工服务",
  "SCN-05": "国际服务助手",
  "SCN-06": "市政设施 Agent API",
  "SCN-07": "低速机器人公共测试",
  "SCN-08": "低空物流规则沙盒",
  "SCN-09": "内涝模拟观察台",
  "SCN-10": "算电热协同台账"
};
const enScenarioNames = {
  "SCN-01": "Community-retention desk",
  "SCN-02": "Reskilling corridor",
  "SCN-03": "Intergenerational learning navigation",
  "SCN-04": "Night human service",
  "SCN-05": "International service assistant",
  "SCN-06": "Municipal API governance",
  "SCN-07": "Low-speed robot public test",
  "SCN-08": "Low-air logistics rule sandbox",
  "SCN-09": "Flooding simulation observatory",
  "SCN-10": "Energy-compute-heat ledger"
};
const zhFamilyNames = {
  "PF-01": "人本缓冲与社区保留",
  "PF-02": "技能再造与夜间健康",
  "PF-03": "城市 API 与数据治理",
  "PF-04": "小月河蓝绿与人机测试",
  "PF-05": "文化、地标与全球共创循环"
};
const enFamilyNames = {
  "PF-01": "Human buffer and community retention",
  "PF-02": "Reskilling and night wellbeing",
  "PF-03": "City API and data governance",
  "PF-04": "Xiaoyue River blue-green and human-machine test",
  "PF-05": "Culture, landmarks and global co-creation loop"
};

const esc = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const wrap = (value, width) => {
  const raw = String(value);
  // Treat CJK characters as visual units instead of whitespace-delimited
  // words.  Otherwise a mixed Chinese/ASCII sentence can remain one very
  // long token and overflow the SVG column even when a character budget was
  // supplied by the board layout.
  if (/[\u3400-\u9fff\u3000-\u303f\uff00-\uffef]/.test(raw)) {
    const lines = [];
    let line = "";
    let units = 0;
    let pendingSpace = false;
    const isWide = (character) => /[\u3400-\u9fff\u3000-\u303f\uff00-\uffef]/.test(character);
    const flush = () => {
      if (line) lines.push(line.trim());
      line = "";
      units = 0;
      pendingSpace = false;
    };
    const tokens = raw.match(/[\u3400-\u9fff\u3000-\u303f\uff00-\uffef]|[^\u3400-\u9fff\u3000-\u303f\uff00-\uffef\s]+|\s+/g) || [];
    for (const token of tokens) {
      if (/^\s+$/.test(token)) {
        pendingSpace = Boolean(line);
        continue;
      }
      const tokenUnits = [...token].reduce((total, character) => total + (isWide(character) ? 1 : 0.58), 0);
      const prefix = pendingSpace && line ? " " : "";
      if (line && units + prefix.length * 0.58 + tokenUnits > width) flush();
      if (tokenUnits <= width) {
        line += (pendingSpace && line ? " " : "") + token;
        units += (pendingSpace && line ? 0 : 0) + tokenUnits;
        pendingSpace = false;
        continue;
      }
      for (const character of token) {
        const cost = isWide(character) ? 1 : 0.58;
        if (line && units + cost > width) flush();
        line += character;
        units += cost;
      }
      pendingSpace = false;
    }
    flush();
    return lines.length ? lines : [""];
  }
  if (!/\s/.test(raw) && raw.length > width) {
    const lines = [];
    for (let i = 0; i < raw.length; i += width) lines.push(raw.slice(i, i + width));
    return lines;
  }
  const words = raw.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
};

const text = (x, y, value, options = {}) => {
  const {
    size = 22, fill = "#172033", weight = 400, width = 80,
    lineHeight = Math.round(size * 1.35), anchor = "start", family = "Arial,sans-serif"
  } = options;
  const lines = wrap(value, width);
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${lines.map((line, i) => `<tspan x="${x}" dy="${i ? lineHeight : 0}">${esc(line)}</tspan>`).join("")}</text>`;
};

const rect = (x, y, width, height, fill, stroke = "none", radius = 14) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;

const start = (title, subtitle, lang) => [
  `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="title desc">`,
  `<title id="title">${esc(title)}</title>`,
  `<desc id="desc">${esc(subtitle)} The board is generated from local JSON contracts; it is not field performance, authorization, or an official score.</desc>`,
  `<rect width="1600" height="1000" fill="#f5f7fb"/>`,
  rect(0, 0, 1600, 124, "#152442", "none", 0),
  text(64, 61, title, {size: lang === "zh" ? 42 : 31, fill: "#ffffff", weight: 700, width: lang === "zh" ? 64 : 96, family: lang === "zh" ? "Arial Unicode MS,Arial,sans-serif" : "Arial,sans-serif"}),
  text(66, 99, subtitle, {size: lang === "zh" ? 21 : 16, lineHeight: lang === "zh" ? 28 : 20, fill: "#c8d5ec", width: lang === "zh" ? 112 : 150, family: lang === "zh" ? "Arial Unicode MS,Arial,sans-serif" : "Arial,sans-serif"})
];

function ordinaryBoard(lang) {
  const zh = lang === "zh";
  const out = start(
    zh ? "图 07｜普通人任务链与停止回路" : "Figure 07 | Ordinary-person task chain and stop loop",
    zh ? "5 步任务 · 5 步回退 · 6 项验收 · 4/4 路线 · G0 概念回放，result_status=not_run"
      : "5 journey steps · 5 rollback steps · 6 acceptance checks · 4/4 routes · G0 concept replay, result_status=not_run",
    lang
  );
  const labels = zh ? ["步骤", "普通人要做什么", "必须留下什么", "不通过时的回退"] : ["Step", "What a person does", "Evidence to retain", "Rollback if it fails"];
  const colX = [70, 180, 650, 1100];
  const colW = [90, 430, 410, 430];
  out.push(rect(70, 154, 1460, 64, "#eaf2ff", "#c9d8ed", 12));
  labels.forEach((label, i) => out.push(text(colX[i] + 18, 194, label, {size: 23, weight: 700, width: Math.floor(colW[i] / 12)})));
  journey.journey_steps.forEach((step, i) => {
    const y = 236 + i * 126;
    out.push(rect(70, y, 1460, 110, i % 2 ? "#ffffff" : "#f8fbff", "#d0d9e8", 12));
    out.push(text(90, y + 45, step.id, {size: 28, weight: 700, fill: "#245b8f", width: 8}));
    out.push(text(180, y + 30, step.action, {size: 21, width: 38}));
    out.push(text(650, y + 30, `${step.acceptance_ids.join(" · ")} · ${step.fixture_ids.length} fixture(s)`, {size: 20, fill: "#36506f", width: 36}));
    const rb = journey.rollback_steps[i];
    out.push(text(1100, y + 30, rb ? rb.action : "return to ordinary service", {size: 20, fill: "#7f3f32", width: 38}));
  });
  out.push(rect(70, 882, 1460, 62, "#fff6dc", "#e4a735", 12));
  out.push(text(92, 921, zh
    ? `回放证据：${journeyEvidence.trace_coverage.routes} 路线、${journeyEvidence.trace_coverage.acceptance_checks} 验收、${journeyEvidence.negative_replay.replayed} 负例；全部保持 ${journeyEvidence.operational_status}，不是现场服务结果。`
    : `Replay evidence: ${journeyEvidence.trace_coverage.routes} routes, ${journeyEvidence.trace_coverage.acceptance_checks} checks, ${journeyEvidence.negative_replay.replayed} negative cases; remains ${journeyEvidence.operational_status}, not field service results.`,
    {size: 19, fill: "#6a4b00", width: 122}));
  out.push("</svg>");
  return out.join("\n");
}

function scenarioBoard(lang) {
  const zh = lang === "zh";
  const out = start(
    zh ? "图 08｜十张场景卡的任务书—空间—回放覆盖" : "Figure 08 | Ten scenario cards: taskbook, space and replay coverage",
    zh ? "每行回到场景卡、空间/运营矩阵和任务书；绿色为已有普通人回放，黄色为 G0 结构证据待现场补齐"
      : "Every row resolves to a scenario card, space/operation matrix and taskbook; green has ordinary-person replay, amber remains G0 structure evidence",
    lang
  );
  const heads = zh ? ["ID / 场景", "任务书", "空间锚点", "普通人回放", "边界"] : ["ID / scenario", "Taskbook", "Spatial refs", "Ordinary replay", "Boundary"];
  const x = [64, 430, 700, 1020, 1300];
  const widths = [350, 260, 300, 270, 230];
  out.push(rect(54, 150, 1492, 58, "#eaf2ff", "#c9d8ed", 10));
  heads.forEach((h, i) => out.push(text(x[i] + 12, 186, h, {size: 21, weight: 700, width: Math.floor(widths[i] / 13)})));
  traceability.rows.forEach((row, i) => {
    const y = 218 + i * 62;
    const replay = row.replay_refs.length ? (zh ? `已回放 · ${row.replay_refs[0]}` : `replayed · ${row.replay_refs[0]}`) : (zh ? "G0 结构证据" : "G0 structure");
    const fill = row.replay_refs.length ? "#ecfdf3" : "#fff8e6";
    const name = (zh ? zhScenarioNames : enScenarioNames)[row.scenario_id];
    out.push(rect(54, y, 1492, 54, fill, "#d8e2ef", 8));
    out.push(text(x[0] + 12, y + 33, `${row.scenario_id}  ${name}`, {size: 18, weight: 700, width: 32}));
    out.push(text(x[1] + 12, y + 33, row.agent_taskbook_refs.join(" · "), {size: 18, fill: "#36506f", width: 21}));
    out.push(text(x[2] + 12, y + 33, row.spatial_refs.join(" · "), {size: 18, fill: "#36506f", width: 24}));
    out.push(text(x[3] + 12, y + 33, replay, {size: 18, fill: row.replay_refs.length ? "#176b47" : "#8a5a00", weight: 700, width: 20}));
    out.push(text(x[4] + 12, y + 33, zh ? "G0 · 未授权未运行" : "G0 · not authorized", {size: 17, fill: "#6a4b00", width: 16}));
  });
  out.push(rect(54, 860, 1492, 70, "#fff6dc", "#e4a735", 10));
  out.push(text(76, 892, zh
    ? `覆盖读数：${traceability.replay_coverage.covered_count}/${traceability.replay_coverage.total_count} 张卡进入普通人回放；其余仍需现场、专业与授权证据，not_an_official_score=true。`
    : `Coverage: ${traceability.replay_coverage.covered_count}/${traceability.replay_coverage.total_count} cards have ordinary-person replay; the rest need field, professional and authorization evidence; not_an_official_score=true.`,
    {size: 20, fill: "#6a4b00", width: 118}));
  out.push("</svg>");
  return out.join("\n");
}

function implementationBoard(lang) {
  const zh = lang === "zh";
  const out = start(
    zh ? "图 09｜五个项目族的 G0/G1 门与退出动作" : "Figure 09 | Five project families: G0/G1 gates and exit actions",
    zh ? "项目族只表达责任、证据和退出顺序；不构成机构、预算、许可、采购或实施承诺"
      : "Project families express responsibility, evidence and exit order only; no institution, budget, permit, procurement or implementation commitment",
    lang
  );
  const heads = zh ? ["项目族", "G0 / G1 时间门", "验收焦点", "退出动作"] : ["Project family", "G0 / G1 gate", "Acceptance focus", "Exit action"];
  const x = [70, 405, 745, 1065];
  const columnWidths = zh ? [17, 18, 17, 20] : [24, 23, 21, 25];
  out.push(rect(60, 150, 1480, 62, "#eaf2ff", "#c9d8ed", 10));
  heads.forEach((h, i) => out.push(text(x[i] + 14, 188, h, {size: 20, weight: 700, width: columnWidths[i]})));
  implementation.project_families.forEach((family, i) => {
    const y = 224 + i * 116;
    const name = (zh ? zhFamilyNames : enFamilyNames)[family.family_id];
    out.push(rect(60, y, 1480, 98, i % 2 ? "#ffffff" : "#f8fbff", "#d0d9e8", 10));
    out.push(text(x[0] + 14, y + 30, `${family.family_id}  ${name}`, {size: 17, weight: 700, width: columnWidths[0], lineHeight: 21}));
    out.push(text(x[1] + 14, y + 30, family.time_gate, {size: zh ? 16 : 15, lineHeight: 20, fill: "#36506f", width: columnWidths[1]}));
    out.push(text(x[2] + 14, y + 30, family.acceptance_metrics, {size: zh ? 16 : 15, lineHeight: 20, fill: "#36506f", width: columnWidths[2]}));
    out.push(text(x[3] + 14, y + 30, family.exit_protocol, {size: zh ? 16 : 15, lineHeight: 20, fill: "#7f3f32", width: columnWidths[3]}));
  });
  out.push(rect(60, 850, 1480, 78, "#fff6dc", "#e4a735", 10));
  out.push(text(82, 884, zh
    ? "公共服务顺序：先公开问题与人工入口，再做授权/专业复核；任何责任、证据、权利或安全门缺失，保持 G0、冻结或退出。"
    : "Public-service order: publish the problem and human route first, then authorize and review professionally; any missing responsibility, evidence, rights or safety gate keeps G0, freezes or exits.",
    {size: zh ? 18 : 16, lineHeight: zh ? 23 : 20, fill: "#6a4b00", width: zh ? 78 : 118}));
  out.push("</svg>");
  return out.join("\n");
}

function taskbookCultureBoard(lang) {
  const zh = lang === "zh";
  const out = start(
    zh ? "图 10｜任务书·公共空间·年度运营" : "Figure 10 | Taskbook, public space and annual operation",
    zh ? "agent.4 公共空间 · agent.5 文化叙事 · agent.6 全球活动/长期运营；全部为 G0 概念证据"
      : "agent.4 public space · agent.5 cultural narrative · agent.6 global events/long-term operation; all remain G0 concept evidence",
    lang
  );
  const title = zh ? ["agent.4 公共空间", "agent.5 文化叙事", "agent.6 年度运营"] : ["agent.4 Public space", "agent.5 Cultural narrative", "agent.6 Annual operation"];
  const body = zh
    ? [
      "三处地标把问题、人工接管与退出规则带入日常空间。",
      "时间线 + 问题线 + 人工服务线；史料与形制仍待专业审校。",
      "春发布、夏走读、秋协议营、冬 v0.x 体检；以 release note 留痕。"
    ]
    : [
      "Three landmarks bring problems, human override and exit rules into daily space.",
      "Timeline + problem line + human-service line; heritage review remains pending.",
      "Spring publish, summer walk, autumn protocol camp, winter v0.x check; release notes retain the trail."
    ];
  const refs = zh
    ? ["L-01 开源里程标 · L-02 算法校准庭 · L-03 人工接管灯塔", "百年京张 / 中关村 / AI 新文化", "公共问题发布周 · 小月河共学走读 · 开发者协议营 · 城市体检"]
    : ["L-01 Open Problem Mile Marker · L-02 Calibration Court · L-03 Human Override Beacon", "Centennial Jing-Zhang / Zhongguancun / AI culture", "Public Problem Week · Xiaoyue River walk · Protocol Camp · City check"];
  const colors = ["#138f8d", "#3e73dc", "#e3a33b"];
  for (let i = 0; i < 3; i += 1) {
    const x = 64 + i * 494;
    out.push(rect(x, 160, 466, 220, "#ffffff", "#cdd9e8", 16));
    out.push(rect(x, 160, 466, 12, colors[i], "none", 16));
    out.push(text(x + 24, 210, title[i], {size: zh ? 26 : 20, weight: 700, width: zh ? 15 : 36, lineHeight: zh ? 31 : 24}));
    out.push(text(x + 24, zh ? 260 : 252, body[i], {size: zh ? 21 : 16, fill: "#36506f", width: zh ? 18 : 34, lineHeight: zh ? 30 : 22}));
    out.push(text(x + 24, zh ? 344 : 342, refs[i], {size: zh ? 17 : 14, fill: "#6a4b00", width: zh ? 23 : 42, lineHeight: zh ? 24 : 20}));
  }
  out.push(text(64, 438, zh ? "四季运营节奏：把版本治理变成可见的公共时间" : "Four-season rhythm: make version governance visible in public time", {size: zh ? 25 : 20, weight: 700, width: zh ? 78 : 110}));
  const seasonsZh = ["春｜公共问题发布周", "夏｜小月河共学走读", "秋｜开发者协议营", "冬｜城市 v0.x 体检"];
  const seasonsEn = ["Spring | Public Problem Week", "Summer | Xiaoyue River Walk", "Autumn | Developer Protocol Camp", "Winter | City v0.x Check"];
  const mechanismsZh = ["问题、资料边界、人工问答", "老人/劳动者/无障碍观察席", "授权、退出、可解释 G0 协议", "保留、暂停、修订与待补数据"];
  const mechanismsEn = ["Problem, data boundary, human Q&A", "Older people, workers, accessibility seats", "Authorization, exit and explainable G0 protocol", "Keep, pause, revise and data gaps"];
  for (let i = 0; i < 4; i += 1) {
    const x = 64 + i * 370;
    out.push(rect(x, 470, 342, 134, i % 2 ? "#f7fbff" : "#fdf8ec", "#d3deeb", 12));
    out.push(text(x + 18, 510, (zh ? seasonsZh : seasonsEn)[i], {size: zh ? 20 : 16, weight: 700, width: zh ? 22 : 30, lineHeight: zh ? 24 : 19}));
    out.push(text(x + 18, zh ? 550 : 545, (zh ? mechanismsZh : mechanismsEn)[i], {size: zh ? 17 : 14, fill: "#36506f", width: zh ? 25 : 30, lineHeight: zh ? 24 : 20}));
  }
  out.push(text(64, 660, zh ? "五个概念项目族：空间承接 → G0 门 → 专业复核 → 可撤回 release" : "Five conceptual families: spatial carrier → G0 gate → professional review → reversible release", {size: zh ? 23 : 19, weight: 700, width: zh ? 78 : 120, lineHeight: zh ? 28 : 23}));
  implementation.project_families.forEach((family, i) => {
    const x = 64 + i * 296;
    const name = (zh ? zhFamilyNames : enFamilyNames)[family.family_id];
    out.push(rect(x, 700, 270, 112, i % 2 ? "#ffffff" : "#f8fbff", "#d3deeb", 10));
    out.push(text(x + 16, 736, family.family_id, {size: 20, weight: 700, fill: colors[i % colors.length], width: 8}));
    out.push(text(x + 16, zh ? 770 : 755, name, {size: zh ? 17 : 13, fill: "#36506f", width: zh ? 14 : 32, lineHeight: zh ? 23 : 17}));
  });
  out.push(rect(64, 864, 1472, 62, "#fff6dc", "#e4a735", 10));
  out.push(text(86, 902, zh
    ? "图面只回读本包 JSON 与任务书关系；不构成官方评分、活动确定、运营主体、文化许可、企业合作或现场结果。"
    : "This board resolves only package JSON and taskbook relations; it is not an official score, confirmed event, operator, heritage permit, partnership or field result.",
    {size: zh ? 19 : 16, lineHeight: zh ? 26 : 20, fill: "#6a4b00", width: zh ? 122 : 120}));
  out.push("</svg>");
  return out.join("\n");
}

const outputs = {
  "ordinary-service-evidence-board.svg": ordinaryBoard("zh"),
  "ordinary-service-evidence-board.en.svg": ordinaryBoard("en"),
  "scenario-coverage-board.svg": scenarioBoard("zh"),
  "scenario-coverage-board.en.svg": scenarioBoard("en"),
  "implementation-gates-board.svg": implementationBoard("zh"),
  "implementation-gates-board.en.svg": implementationBoard("en"),
  "taskbook-culture-operations-board.svg": taskbookCultureBoard("zh"),
  "taskbook-culture-operations-board.en.svg": taskbookCultureBoard("en")
};
for (const [name, content] of Object.entries(outputs)) fs.writeFileSync(path.join(figureDir, name), `${content}\n`);
console.log(JSON.stringify({ok: true, outputs: Object.keys(outputs), source_contract: journey.contract_id, scenario_rows: traceability.rows.length, project_families: implementation.project_families.length, landmarks: landmarks.landmarks.length, cultural_lines: culture.storyline_zh.length}, null, 2));
