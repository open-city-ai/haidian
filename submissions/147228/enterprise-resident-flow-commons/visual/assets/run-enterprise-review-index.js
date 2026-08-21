const fs = require('fs');
const path = require('path');

const here = __dirname;
const visualDir = path.dirname(here);
const packageDir = path.dirname(visualDir);
const metrics = JSON.parse(fs.readFileSync(path.join(packageDir, 'metrics.json'), 'utf8')).metrics;
const reciprocity = JSON.parse(fs.readFileSync(path.join(here, 'enterprise-resident-reciprocity-readout.json'), 'utf8'));

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
}[char]));

const content = {
  zh: {
    lang: 'zh-CN',
    title: '京张流线公地：企业—居民互惠通勤操作系统',
    subtitle: '企业得到一个窗口，居民必须同时得到一条可走、可问、可退出的路。',
    switchLabel: 'Read in English',
    switchHref: 'index.en.html',
    badge: 'G0 包内回放 PASS · G1 现场发布 HOLD',
    sections: [
      ['总览地图', '互惠发布门与三处接口', '不是先算总效率，而是先问企业收益有没有挤掉居民最慢路径。四个冲突窗口共享同一组停止条件。', '../assets/figures/site-overview.png', '企业—居民互惠发布门'],
      ['用地分区', '把用地看成服务接口', '企业入口、社区日常与轨道换乘是三种责任界面；所有面积和边界仍来自 provisional 图层，不是法定红线。', '../assets/figures/land-use-structure.png', '概念用地与服务界面'],
      ['重点区域', '三处重点区，三种不同的空间原型', '众智园清河前厅、AI 原点照护环和大钟寺四象限换乘厅分别回应企业门前、居民日常与轨道换乘。每处都把企业请求、居民回报、停止条件和待补证据画在同一张图上；PROV-KEY-003 不是大钟寺站点锚点，不据此平移或发布站点级结论。', '../assets/figures/key-areas.png', '三处重点区空间原型与互惠门'],
      ['空间裁决', '三种备选，五级尺度，居民权利不被挤出图面', 'ALT-A 拒绝，ALT-B 修改，ALT-C 进入设计复核。每一级只回答一个空间问题，所有权利、回退和撤回条件仍保持 HOLD，直到现场资料和责任确认。', '../assets/figures/enterprise-spatial-decision.svg', '企业—居民互惠空间裁决'],
      ['交通慢行', '轨道公交为骨干，步行与无障碍为底线', '班车、物流和路缘窗口只能补充公共交通；断网、雨雪或冲突时，人工与公共交通等价路径继续开放。', '../assets/figures/mobility-bluegreen.png', '交通慢行与公共回退'],
      ['蓝绿公共空间', '遮阴、停歇和雨天回退先服务最慢路径', '蓝绿关系只用于识别候选路径；没有树冠、坡度、热舒适、排水和现场连续性证据时，不发布健康或防洪绩效。', '../assets/figures/accessible-service-state-board.svg', '无障碍服务状态'],
      ['AI 场景', 'AI 整理冲突，不替人放行', 'AI 可以聚合分组需求、解释冲突和回放证据；不能任命责任人、发布 READY、覆盖旧记录或把合成 PASS 变成运营授权。', '../assets/figures/mobility-responsibility-transfer-board.svg', '责任移交与人工放行'],
      ['核心指标', '先锁分母，再谈强度和收益', '5 个资源分母仍未锁定；现场测量、已接受责任和运行授权均为 0。失败与撤回请求继续留在分母。', '../assets/figures/resource-denominator-board.svg', '资源分母合同'],
      ['任务覆盖', '三层空间、三处重点区和一条到站—到家链', '区域层、总体层和重点区共用同一底盘；产业服务、居民日常、交通、市政、蓝绿、更新和治理都回接到可复核工件。', '../assets/figures/service-continuity-board.svg', '任务覆盖与双时钟恢复'],
      ['动态偏好', '四个时窗分别判断，不拿平均值盖住最慢一段', '8 类合成人群在 4 个时窗、4 个候选策略中逐格回放；原始满意度最高者也必须通过首末公里、无障碍和非企业群体保护门。', '../assets/figures/dynamic-preference-board.svg', '动态偏好与首末公里完成门'],
      ['方式竞争', '企业接驳不能挤掉轨道公交与居民可达', '方式竞争保护把公共交通替代、接驳份额、车辆公里和最弱群体可达差距设为停止条件；空中与无管理扩张继续 fail closed。', '../assets/figures/mode-competition-guard-board.svg', '方式竞争保护'],
      ['空间图谱', '把合成流量重新落回可审查的空间接口', '空间交通图谱只把组别、时窗与交通方式连接到 provisional 区域和接口；不把分析图当真实站位、客流或法定道路。', '../assets/figures/spatial-mobility-atlas-board.svg', '空间交通图谱'],
      ['自检状态', '包内可复算，现场仍应停止', '互惠发布门 15 项检查与 4 个负例通过；现场审计、责任接受、锁定分母与授权缺一项，G1 继续 HOLD。', '../assets/figures/mobility-failure-governance-board.svg', '失败治理与申诉暂停']
    ],
    metricLabels: ['provisional 工作范围', '概念绿地比例', '概念公共空间比例'],
    coverageTitle: '六项补充评审索引',
    coverage: [
      ['三层范围', '区域—总体—重点区共用同一 provisional 底盘并联动复算。'],
      ['重点区域', '众智园、AI 原点社区、大钟寺分别承担企业、居民、轨道/路缘接口。'],
      ['建筑', '入口、候车、坡道、骑行停放和服务台是可逆接口，不发布高度或容积率。'],
      ['更新项目', 'P0 基线、P1 可逆试点、P2 专业复核后条件扩展；任一硬门失败即回退。'],
      ['来源', '政策、招标、标准、方法论文与包内数据分级登记，不把方法参考写成本地现状。'],
      ['假设', '官方边界、权属、交通量、容量、现场可达和公众接受仍待有日期证据。']
    ],
    boundary: '边界说明：图上 PASS 只证明包内结构可重放；不证明真实客流、人员值守、无障碍绩效、公众接受、运营许可或实施结果。'
  },
  en: {
    lang: 'en',
    title: 'Jing-Zhang Flow Commons: An Enterprise–Resident Reciprocity Operating System',
    subtitle: 'When an enterprise receives a window, residents must also receive a route they can use, question and leave.',
    switchLabel: '阅读中文版本',
    switchHref: 'index.html',
    badge: 'G0 PACKAGE REPLAY PASS · G1 FIELD RELEASE HOLD',
    sections: [
      ['Overview map', 'Reciprocity gate and three interfaces', 'The first question is not total efficiency. It is whether an enterprise benefit displaces the slowest resident path. Four conflict windows share one stop rule.', '../assets/figures/site-overview.en.png', 'Enterprise–resident reciprocity gate'],
      ['Land-use zoning', 'Read land use as a service interface', 'Enterprise entrances, daily community access and rail transfer are three responsibility interfaces. Every area and boundary remains provisional.', '../assets/figures/land-use-structure.en.png', 'Conceptual land-use and service interfaces'],
      ['Key areas', 'Three key areas, three spatial prototypes', 'The Zhongzhiyuan River Forecourt, AI Origin Care Loop and Dazhongsi Four-Quadrant Hall address enterprise frontage, resident routines and rail interchange separately. Each board pairs enterprise requests with resident returns, stop rules and missing evidence. PROV-KEY-003 is not a station anchor, so it is neither shifted nor used for station-level claims.', '../assets/figures/key-areas.en.png', 'Three key-area spatial prototypes and reciprocity gates'],
      ['Spatial decision', 'Three alternatives, five scales, resident rights remain visible', 'ALT-A is rejected, ALT-B is sent back for revision and ALT-C advances to design review. Each scale answers one spatial question. Rights, fallback and withdrawal remain on HOLD until field evidence and responsibility are confirmed.', '../assets/figures/enterprise-spatial-decision.en.svg', 'Enterprise–resident reciprocity spatial decision'],
      ['Mobility and active travel', 'Rail and bus are the backbone; walking and accessibility are the floor', 'Shuttles, logistics and curb windows supplement public transport. Staffed and public alternatives remain open during outage, weather or conflict.', '../assets/figures/mobility-bluegreen.en.png', 'Mobility, active travel and public fallback'],
      ['Blue-green public space', 'Shade, rest and weather fallback serve the slowest path first', 'Blue-green relations identify candidate routes only. No health, flood or comfort performance is released without field evidence.', '../assets/figures/accessible-service-state-board.en.svg', 'Accessible-service state'],
      ['AI scenarios', 'AI organises conflicts; people authorise release', 'AI may aggregate grouped demand, explain conflicts and replay evidence. It cannot appoint roles, publish READY, erase prior records or turn a synthetic PASS into authority.', '../assets/figures/mobility-responsibility-transfer-board.en.svg', 'Responsibility transfer and human release'],
      ['Core metrics', 'Lock the denominator before publishing intensity or benefit', 'All five resource denominators remain unlocked. Field measurements, accepted responsibility and operating authorisations remain zero.', '../assets/figures/resource-denominator-board.en.svg', 'Resource denominator contract'],
      ['Task coverage', 'Three scales, three key areas and one station-to-home chain', 'Regional, overall and key-area work share one base. Industry service, daily life, mobility, utilities, blue-green space, renewal and governance link to reviewable artifacts.', '../assets/figures/service-continuity-board.en.svg', 'Task coverage and two-clock recovery'],
      ['Dynamic preference', 'Evaluate each window without averaging away the slowest segment', 'Eight synthetic groups replay four time windows and four candidate policies. The highest raw satisfaction proxy still has to pass first/last-mile, accessibility and non-enterprise protection gates.', '../assets/figures/dynamic-preference-board.en.svg', 'Dynamic preference and first/last-mile completion guard'],
      ['Mode competition', 'Enterprise feeders cannot displace transit or resident access', 'The guard stops transit displacement, excessive feeder share, vehicle-kilometre growth and worst-group access gaps. Air and unmanaged expansion remain fail closed.', '../assets/figures/mode-competition-guard-board.en.svg', 'Mode-competition guard'],
      ['Spatial atlas', 'Return synthetic flows to reviewable spatial interfaces', 'The atlas links group, time window and mode to provisional areas and interfaces only. It does not turn an analytical graph into observed stations, demand or statutory roads.', '../assets/figures/spatial-mobility-atlas-board.en.svg', 'Spatial mobility atlas'],
      ['Self-check status', 'Package evidence replays; field release stays stopped', 'The reciprocity gate passes 15 checks and four negative fixtures. Missing audit, accepted transfer, locked denominator or authority keeps G1 on HOLD.', '../assets/figures/mobility-failure-governance-board.en.svg', 'Failure governance and appeal pause']
    ],
    metricLabels: ['provisional working area', 'conceptual green ratio', 'conceptual public-space ratio'],
    coverageTitle: 'Six additional review indices',
    coverage: [
      ['Three-level scope', 'Regional, overall and key-area work share one provisional base and one recalculation trigger.'],
      ['Key areas', 'Zhongzhiyuan, AI Origin Community and Dazhongsi carry enterprise, resident and rail/curb interfaces.'],
      ['Buildings', 'Entrances, waiting, ramps, cycle parking and service desks are reversible interfaces; no FAR or height is released.'],
      ['Renewal projects', 'P0 baseline, P1 reversible pilot and P2 conditional expansion; any hard-gate failure rolls back.'],
      ['Sources', 'Policy, tenders, standards, methods and package data remain separately classified.'],
      ['Assumptions', 'Official boundary, rights, counts, capacity, field accessibility and public acceptance still need dated evidence.']
    ],
    boundary: 'Boundary: PASS proves only that package structure can be replayed. It does not prove real demand, staffing, accessibility performance, public acceptance, authority or implementation outcomes.'
  }
};

function render(language) {
  const c = content[language];
  const values = [
    [(metrics.site_area_sqm.value / 1e6).toFixed(2), 'km²', 'site_area_sqm', metrics.site_area_sqm.value],
    [(metrics.green_ratio.value * 100).toFixed(2), '%', 'green_ratio', metrics.green_ratio.value],
    [(metrics.public_space_ratio.value * 100).toFixed(2), '%', 'public_space_ratio', metrics.public_space_ratio.value]
  ];
  const metricCards = values.map((item, index) => `<article class="metric" data-metric="${item[2]}" data-value="${item[3]}"><strong>${item[0]}<small>${item[1]}</small></strong><span>${esc(c.metricLabels[index])}</span><em>KNOWN FROM PROVISIONAL FILE</em></article>`).join('');
  const sections = c.sections.map((item, index) => `<section id="s${index}" class="evidence"><header><span>${String(index + 1).padStart(2, '0')} · ${esc(item[0])}</span><h2>${esc(item[1])}</h2></header><p>${esc(item[2])}</p><img src="${item[3]}" alt="${esc(item[4])}"><footer>local artifact · claim boundary retained · ${index === 0 ? 'reciprocity review surface v2.2' : 'provisional / synthetic evidence as labelled'}</footer></section>`).join('');
  const coverage = c.coverage.map((item) => `<article><h3>${esc(item[0])}</h3><p>${esc(item[1])}</p></article>`).join('');
  return `<!doctype html>
<html lang="${c.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(c.title)} · review surface</title><style>
:root{--navy:#071a2c;--deep:#103447;--ink:#163047;--muted:#607487;--paper:#f3f0e9;--card:#fff;--mint:#48cfb2;--coral:#ef7254;--line:#d9e2e7}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC","Helvetica Neue",Arial,sans-serif;line-height:1.6}.hero{background:linear-gradient(135deg,var(--navy),#164d59);color:#fff;padding:52px max(5vw,32px) 38px}.eyebrow{color:#76e5c9;font-weight:900;letter-spacing:.16em;font-size:12px}.hero h1{max-width:1100px;margin:12px 0 8px;font-size:clamp(30px,4vw,56px);line-height:1.08}.hero p{max-width:980px;color:#bdd4da;font-size:17px}.switch{display:inline-block;color:#061d2d;background:#74e3c7;padding:7px 13px;border-radius:999px;text-decoration:none;font-weight:850;font-size:12px}.badge{display:inline-block;margin-left:10px;border:1px solid #f59a85;color:#ffc0b3;padding:6px 12px;border-radius:999px;font-size:11px;font-weight:850}.metrics{max-width:1180px;margin:-22px auto 26px;padding:0 24px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.metric{background:#fff;border:1px solid var(--line);border-radius:18px;padding:19px 22px;box-shadow:0 8px 28px #09223512}.metric strong{display:block;font-size:34px;color:var(--deep)}.metric small{font-size:15px;margin-left:4px}.metric span{display:block;color:var(--muted);font-size:13px}.metric em{display:block;color:#168b77;font-size:9px;font-style:normal;font-weight:850;margin-top:7px;letter-spacing:.08em}nav{max-width:1180px;margin:0 auto 18px;padding:0 24px;display:flex;flex-wrap:wrap;gap:8px}nav a{background:#fff;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:6px 11px;text-decoration:none;font-size:11px}main{max-width:1180px;margin:0 auto;padding:0 24px 70px}.coverage{margin:10px 0 20px;padding:22px;border:1px solid var(--line);border-radius:22px;background:#e9f2f1}.coverage>h2{margin:0 0 12px;color:var(--deep);font-size:20px}.coverage-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.coverage article{background:#fff;border:1px solid #d5e1e3;border-radius:14px;padding:13px}.coverage h3{font-size:15px;margin:0;color:#177f70}.coverage p{font-size:12px;color:var(--muted);margin:5px 0 0}.evidence{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:24px;margin:16px 0;box-shadow:0 7px 25px #0922350b}.evidence header span{color:#168b77;font-size:11px;font-weight:900;letter-spacing:.09em}.evidence h2{font-size:25px;margin:3px 0;color:var(--deep)}.evidence p{color:#52697b;margin:8px 0 17px}.evidence img{display:block;width:100%;max-height:650px;object-fit:contain;background:#edf3f4;border:1px solid #d9e4e8;border-radius:15px}.evidence footer{font-size:10px;color:#8999a5;margin-top:9px}.boundary{max-width:1132px;margin:20px auto 0;background:#392a31;color:#ffd7cf;border:1px solid #ed816c;border-radius:18px;padding:16px 20px;font-size:13px}@media(max-width:720px){.metrics,.coverage-grid{grid-template-columns:1fr}.metrics{margin-top:16px}.badge{display:block;margin:10px 0 0}.hero{padding-top:35px}.evidence{padding:16px}}
</style></head><body><header class="hero"><div class="eyebrow">OPEN CITY / HAIDIAN / 147228 / FLOW COMMONS v2.2</div><h1>${esc(c.title)}</h1><p>${esc(c.subtitle)}</p><a class="switch" href="${c.switchHref}">${esc(c.switchLabel)}</a><span class="badge">${esc(c.badge)}</span></header><div class="metrics">${metricCards}</div><nav>${c.sections.map((item, index) => `<a href="#s${index}">${esc(item[0])}</a>`).join('')}</nav><main><section class="coverage"><h2>${esc(c.coverageTitle)}</h2><div class="coverage-grid">${coverage}</div></section>${sections}<div class="boundary">${esc(c.boundary)}<br>Package replay: ${esc(reciprocity.current_readout.package_replay)} · field release: ${esc(reciprocity.current_readout.field_release)} · accepted transfers: ${reciprocity.current_readout.accepted_responsibility_transfers} · locked denominators: ${reciprocity.current_readout.locked_resource_denominators}</div></main></body></html>
`;
}

const artifacts = { 'index.html': render('zh'), 'index.en.html': render('en') };
const checkOnly = process.argv.includes('--check');
for (const [name, html] of Object.entries(artifacts)) {
  const target = path.join(visualDir, name);
  if (checkOnly) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== html) {
      console.error(`stale or missing generated artifact: ${name}`);
      process.exit(1);
    }
  } else {
    fs.writeFileSync(target, html);
  }
}
console.log(JSON.stringify({ status: 'ENTERPRISE_REVIEW_INDEX_PASS', languages: 2, sections_per_language: content.zh.sections.length, metrics: 3 }, null, 2));
