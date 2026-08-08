<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>智境复兴带 — 百年京张 AI 城市设计方案</title>
<style>
:root {
  --blue-dark: #1A3A5C;
  --blue-mid: #2D6A9F;
  --blue-light: #E6F1FB;
  --gold: #F0A500;
  --gold-light: #FFF3CC;
  --teal: #0F6E56;
  --teal-light: #E1F5EE;
  --gray-900: #1A1A1A;
  --gray-700: #444441;
  --gray-400: #888780;
  --gray-100: #F4F4F2;
  --white: #ffffff;
  --prov-orange: #FF6B35;
  --text: #1A1A1A;
  --text-muted: #5F5E5A;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 13px;
  color: var(--text);
  background: var(--white);
  line-height: 1.6;
}
.page { max-width: 960px; margin: 0 auto; padding: 24px 20px 48px; }
.header-band {
  background: var(--blue-dark);
  color: var(--white);
  padding: 36px 40px 28px;
  margin-bottom: 28px;
}
.header-band .subtitle { color: var(--gold); font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
.header-band h1 { font-size: 28px; font-weight: 500; line-height: 1.3; margin-bottom: 6px; }
.header-band h1 span { color: var(--gold); }
.header-band .en-title { font-size: 15px; color: rgba(255,255,255,0.7); margin-bottom: 12px; }
.header-band .meta { font-size: 11px; color: rgba(255,255,255,0.5); border-top: 1px solid rgba(255,255,255,0.15); padding-top: 10px; }
.prov-banner {
  background: #FFF3E0;
  border: 1px solid #F0A500;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 12px;
  color: #6D4C00;
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
}
.prov-banner strong { color: #8B5E00; }
.section { margin-bottom: 32px; }
.section-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--blue-dark);
  border-left: 3px solid var(--gold);
  padding-left: 10px;
  margin-bottom: 16px;
}
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px; }
@media (max-width: 600px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
  .grid-2 { grid-template-columns: 1fr; }
}
.metric-card {
  background: var(--gray-100);
  border-radius: 8px;
  padding: 14px 16px;
  text-align: center;
}
.metric-card .label { font-size: 11px; color: var(--text-muted); margin-bottom: 4px; }
.metric-card .value { font-size: 24px; font-weight: 500; color: var(--blue-dark); }
.metric-card .unit { font-size: 11px; color: var(--text-muted); }
.zone-card {
  border: 0.5px solid #D3D1C7;
  border-radius: 10px;
  padding: 16px;
  background: var(--white);
}
.zone-card .zone-badge {
  display: inline-block;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
  font-weight: 500;
}
.zone-card h3 { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
.zone-card p { font-size: 12px; color: var(--text-muted); line-height: 1.5; }
.zone-card .area-tag { font-size: 11px; color: var(--text-muted); margin-top: 8px; }
.map-container {
  background: var(--gray-100);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
}
.map-title { font-size: 13px; font-weight: 500; color: var(--text-muted); margin-bottom: 12px; }
svg.schematic { width: 100%; }
.scenario-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
@media (max-width: 600px) {
  .scenario-grid { grid-template-columns: repeat(2, 1fr); }
}
.scenario-card {
  background: var(--blue-light);
  border-radius: 8px;
  padding: 12px;
  border-left: 3px solid var(--blue-mid);
}
.scenario-card .sc-id { font-size: 10px; color: var(--blue-mid); font-weight: 500; }
.scenario-card .sc-name { font-size: 12px; font-weight: 500; color: var(--blue-dark); margin: 2px 0; }
.scenario-card .sc-loc { font-size: 11px; color: var(--text-muted); }
.landmark-list { list-style: none; padding: 0; }
.landmark-list li {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 0.5px solid #D3D1C7;
  align-items: flex-start;
}
.landmark-list li:last-child { border-bottom: none; }
.landmark-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--gold);
  color: var(--blue-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  flex-shrink: 0;
}
.landmark-info h4 { font-size: 13px; font-weight: 500; margin-bottom: 3px; }
.landmark-info p { font-size: 12px; color: var(--text-muted); }
.status-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}
.status-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--gray-100);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 12px;
}
.status-chip .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot-pass { background: #1D9E75; }
.dot-warn { background: #F0A500; }
.case-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}
.case-table th {
  background: var(--blue-dark);
  color: var(--white);
  padding: 8px 10px;
  text-align: left;
  font-weight: 500;
}
.case-table td {
  padding: 8px 10px;
  border-bottom: 0.5px solid #E0DED8;
}
.case-table tr:nth-child(even) td { background: var(--gray-100); }
.persona-card {
  border: 0.5px solid #D3D1C7;
  border-radius: 8px;
  padding: 14px;
  background: var(--white);
}
.persona-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--blue-light);
  color: var(--blue-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
}
.persona-card h4 { font-size: 13px; font-weight: 500; margin-bottom: 3px; }
.persona-card .persona-meta { font-size: 11px; color: var(--text-muted); }
.footer {
  background: var(--gray-100);
  border-radius: 8px;
  padding: 14px 16px;
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 32px;
}
.footer strong { color: var(--text); }
.compliance-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.comp-item {
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background: var(--teal-light);
  border-radius: 6px;
  align-items: center;
}
.comp-check { font-size: 14px; color: var(--teal); font-weight: 500; }
.comp-text { font-size: 12px; color: var(--teal); }
</style>
</head>
<body>

<div class="header-band">
  <div class="subtitle">百年京张 AI 创新带 &middot; 开源城市设计征集</div>
  <h1><span>智境复兴带</span><br>百年京张 &middot; AI 共生城市设计方案</h1>
  <div class="en-title">Intelligent Renaissance Belt &mdash; Centennial Jingzhang AI Co-evolution Urban Design</div>
  <div class="meta">
    提案 ID: Xiao-Junyu/intelligent-renaissance-belt &nbsp;&nbsp;|&nbsp;&nbsp;
    Agent: WorkBuddy AI &nbsp;&nbsp;|&nbsp;&nbsp;
    提交日期: 2026-08-08 &nbsp;&nbsp;|&nbsp;&nbsp;
    语言: 中文主版本 + English
  </div>
</div>

<div class="page">

  <div class="prov-banner">
    <strong>临时边界声明：</strong>
    本方案所有空间几何数据基于临时粗略边界（DATA-SRC-PROVISIONAL-BOUNDARIES-20260605），非官方法定范围。所有内容均为概念建议，供专业团队深化研究，不替代正式规划，不构成政府审定结论。
  </div>

  <!-- 核心指标 -->
  <div class="section">
    <div class="section-title">核心规划指标</div>
    <div class="grid-4">
      <div class="metric-card">
        <div class="label">统筹研究范围</div>
        <div class="value">43.6</div>
        <div class="unit">平方公里</div>
      </div>
      <div class="metric-card">
        <div class="label">总体设计范围</div>
        <div class="value">11.4</div>
        <div class="unit">平方公里</div>
      </div>
      <div class="metric-card">
        <div class="label">重点区域总面积</div>
        <div class="value">368.4</div>
        <div class="unit">公顷（临时）</div>
      </div>
      <div class="metric-card">
        <div class="label">绿地率目标</div>
        <div class="value">&ge;35%</div>
        <div class="unit">概念目标</div>
      </div>
    </div>
    <div class="grid-4">
      <div class="metric-card">
        <div class="label">AI 场景卡</div>
        <div class="value">12</div>
        <div class="unit">张（任务要求≥10）</div>
      </div>
      <div class="metric-card">
        <div class="label">产业测试场景</div>
        <div class="value">4</div>
        <div class="unit">个（任务要求≥3）</div>
      </div>
      <div class="metric-card">
        <div class="label">用户画像</div>
        <div class="value">6</div>
        <div class="unit">类（任务要求≥5）</div>
      </div>
      <div class="metric-card">
        <div class="label">AI 朝圣地标</div>
        <div class="value">5</div>
        <div class="unit">个（任务要求≥3）</div>
      </div>
    </div>
  </div>

  <!-- 空间结构图 -->
  <div class="section">
    <div class="section-title">三区两翼空间结构（概念示意，临时边界）</div>
    <div class="map-container">
      <div class="map-title">南北向空间结构示意 — 沿京张遗址公园主轴</div>
      <svg class="schematic" viewBox="0 0 680 480" role="img" aria-label="智境复兴带三区两翼空间结构概念图">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#1A3A5C" stroke-width="1.5" stroke-linecap="round"/>
          </marker>
        </defs>

        <!-- 背景：总体设计范围 (临时) -->
        <rect x="140" y="30" width="400" height="420" rx="12" fill="#E6F1FB" stroke="#2D6A9F" stroke-width="0.5" stroke-dasharray="6,4"/>
        <text x="342" y="22" text-anchor="middle" font-size="11" fill="#2D6A9F" font-family="sans-serif">总体设计范围 约11.4km² （临时边界）</text>

        <!-- 京张遗址公园主轴 -->
        <rect x="320" y="40" width="40" height="400" rx="4" fill="rgba(240,165,0,0.18)" stroke="#F0A500" stroke-width="1"/>
        <text x="340" y="250" text-anchor="middle" font-size="11" fill="#8B5E00" font-family="sans-serif" transform="rotate(-90,340,250)">京张遗址公园 南北主轴（概念）</text>

        <!-- 众智苑 (北) -->
        <rect x="170" y="48" width="140" height="100" rx="8" fill="#1A3A5C" stroke="#1A3A5C" stroke-width="0.5"/>
        <text x="240" y="82" text-anchor="middle" font-size="13" font-weight="500" fill="white" font-family="sans-serif">众智源</text>
        <text x="240" y="98" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.8)" font-family="sans-serif">Zhongzhi Origin</text>
        <text x="240" y="114" text-anchor="middle" font-size="10" fill="rgba(240,165,0,0.9)" font-family="sans-serif">192.1 ha（临时）</text>
        <text x="240" y="130" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.7)" font-family="sans-serif">全栈自主 AI 创新引擎</text>

        <!-- AI原点社区 (中) -->
        <rect x="175" y="185" width="135" height="90" rx="8" fill="#2D6A9F" stroke="#2D6A9F" stroke-width="0.5"/>
        <text x="242" y="218" text-anchor="middle" font-size="13" font-weight="500" fill="white" font-family="sans-serif">AI 原点</text>
        <text x="242" y="233" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)" font-family="sans-serif">AI Origin Point</text>
        <text x="242" y="248" text-anchor="middle" font-size="10" fill="rgba(240,165,0,0.9)" font-family="sans-serif">104.3 ha（临时）</text>
        <text x="242" y="263" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.7)" font-family="sans-serif">世界级 AI 生态</text>

        <!-- 大钟寺 (南) -->
        <rect x="178" y="315" width="130" height="80" rx="8" fill="#0F6E56" stroke="#0F6E56" stroke-width="0.5"/>
        <text x="243" y="346" text-anchor="middle" font-size="13" font-weight="500" fill="white" font-family="sans-serif">钟鸣谷</text>
        <text x="243" y="361" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)" font-family="sans-serif">Bell Valley</text>
        <text x="243" y="376" text-anchor="middle" font-size="10" fill="rgba(240,165,0,0.9)" font-family="sans-serif">72.0 ha（临时）</text>
        <text x="243" y="390" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.7)" font-family="sans-serif">AI 城市生活体验场</text>

        <!-- 东翼：中关村科技服务 -->
        <rect x="470" y="140" width="120" height="160" rx="8" fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
        <text x="530" y="185" text-anchor="middle" font-size="12" font-weight="500" fill="#3C3489" font-family="sans-serif">中关村</text>
        <text x="530" y="200" text-anchor="middle" font-size="12" font-weight="500" fill="#3C3489" font-family="sans-serif">科技服务翼</text>
        <text x="530" y="218" text-anchor="middle" font-size="10" fill="#534AB7" font-family="sans-serif">East Wing</text>
        <text x="530" y="234" text-anchor="middle" font-size="10" fill="#534AB7" font-family="sans-serif">资本·知识产权·金融</text>
        <text x="530" y="248" text-anchor="middle" font-size="10" fill="#534AB7" font-family="sans-serif">要素全球化配置</text>
        <text x="530" y="268" text-anchor="middle" font-size="10" fill="rgba(83,74,183,0.7)" font-family="sans-serif">（翼）</text>

        <!-- 西翼：小月河场景 -->
        <rect x="90" y="140" width="50" height="160" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
        <text x="115" y="220" text-anchor="middle" font-size="10" fill="#0F6E56" font-family="sans-serif" transform="rotate(-90,115,220)">小月河场景赋能翼（翼）</text>

        <!-- 连接箭头：南北 -->
        <line x1="242" y1="148" x2="242" y2="185" stroke="#1A3A5C" stroke-width="1.5" marker-end="url(#arr)"/>
        <line x1="242" y1="275" x2="242" y2="315" stroke="#1A3A5C" stroke-width="1.5" marker-end="url(#arr)"/>

        <!-- 东西连接 -->
        <line x1="310" y1="228" x2="470" y2="228" stroke="#534AB7" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr)"/>
        <line x1="175" y1="228" x2="140" y2="228" stroke="#0F6E56" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr)"/>

        <!-- 图例 -->
        <rect x="155" y="440" width="12" height="12" rx="2" fill="#1A3A5C"/>
        <text x="172" y="451" font-size="11" fill="#444" font-family="sans-serif">三区（重点设计）</text>
        <rect x="280" y="440" width="12" height="12" rx="2" fill="rgba(240,165,0,0.3)" stroke="#F0A500" stroke-width="0.5"/>
        <text x="297" y="451" font-size="11" fill="#444" font-family="sans-serif">京张遗址公园轴</text>
        <rect x="420" y="440" width="12" height="12" rx="2" fill="#E6F1FB" stroke="#2D6A9F" stroke-width="0.5" stroke-dasharray="4,2"/>
        <text x="437" y="451" font-size="11" fill="#444" font-family="sans-serif">总体设计范围（临时）</text>
      </svg>
    </div>
  </div>

  <!-- 三区功能定位 -->
  <div class="section">
    <div class="section-title">三处重点区域功能定位</div>
    <div class="grid-3">
      <div class="zone-card">
        <span class="zone-badge" style="background:#1A3A5C;color:white;">北 · 众智源</span>
        <h3>Zhongzhi Origin</h3>
        <p>全栈 AI 自主创新引擎，承载基础模型研发、算力集群和 AI 治理话语权输出平台。</p>
        <div class="area-tag">192.1 公顷（临时）&nbsp;|&nbsp;五大功能：AI 全栈自主创新体系</div>
      </div>
      <div class="zone-card">
        <span class="zone-badge" style="background:#2D6A9F;color:white;">中 · AI 原点</span>
        <h3>AI Origin Point</h3>
        <p>世界级 AI 创新生态聚集地，与清华北大等高校联动，吸引全球 AI 人才的精神坐标。</p>
        <div class="area-tag">104.3 公顷（临时）&nbsp;|&nbsp;世界级 AI 创新生态</div>
      </div>
      <div class="zone-card">
        <span class="zone-badge" style="background:#0F6E56;color:white;">南 · 钟鸣谷</span>
        <h3>Bell Valley</h3>
        <p>AI 城市生活体验场，大钟寺站轨道交通优势，智能原生新业态聚集，AI 购物、餐饮、健康。</p>
        <div class="area-tag">72.0 公顷（临时）&nbsp;|&nbsp;智能化 AI 活力城市</div>
      </div>
    </div>
  </div>

  <!-- 场景卡矩阵 -->
  <div class="section">
    <div class="section-title">AI 场景卡矩阵（12 张，任务 agent.3）</div>
    <div class="scenario-grid">
      <div class="scenario-card">
        <div class="sc-id">SC-01</div>
        <div class="sc-name">AI 开发者驿站</div>
        <div class="sc-loc">AI 原点社区</div>
      </div>
      <div class="scenario-card">
        <div class="sc-id">SC-02</div>
        <div class="sc-name">AI 医疗影像体验馆</div>
        <div class="sc-loc">大钟寺 AI 产业区</div>
      </div>
      <div class="scenario-card">
        <div class="sc-id">SC-03</div>
        <div class="sc-name">AI 教育陪伴节点</div>
        <div class="sc-loc">小月河翼社区</div>
      </div>
      <div class="scenario-card">
        <div class="sc-id">SC-04</div>
        <div class="sc-name">智能物流末端体验</div>
        <div class="sc-loc">大钟寺站周边</div>
      </div>
      <div class="scenario-card">
        <div class="sc-id">SC-05</div>
        <div class="sc-name">AI 创意内容工坊</div>
        <div class="sc-loc">AI 原点文化带</div>
      </div>
      <div class="scenario-card">
        <div class="sc-id">SC-06</div>
        <div class="sc-name">AI 城市管理感知廊</div>
        <div class="sc-loc">京张遗址公园沿线</div>
      </div>
      <div class="scenario-card">
        <div class="sc-id">SC-07</div>
        <div class="sc-name">AI+ 农食溯源市集</div>
        <div class="sc-loc">小月河滨水绿廊</div>
      </div>
      <div class="scenario-card">
        <div class="sc-id">SC-08</div>
        <div class="sc-name">AI 无障碍服务节点</div>
        <div class="sc-loc">全带均匀分布</div>
      </div>
      <div class="scenario-card">
        <div class="sc-id">SC-09</div>
        <div class="sc-name">AI 研究者共居社区</div>
        <div class="sc-loc">众智苑周边住宅</div>
      </div>
      <div class="scenario-card">
        <div class="sc-id">SC-10</div>
        <div class="sc-name">AI 绿色建筑能耗优化</div>
        <div class="sc-loc">众智苑新建建筑</div>
      </div>
      <div class="scenario-card">
        <div class="sc-id">SC-11</div>
        <div class="sc-name">全球 AI 开发者马拉松</div>
        <div class="sc-loc">AI 原点社区广场</div>
      </div>
      <div class="scenario-card">
        <div class="sc-id">SC-12</div>
        <div class="sc-name">AI 朝圣者步道体验</div>
        <div class="sc-loc">京张遗址公园全线</div>
      </div>
    </div>
  </div>

  <!-- AI朝圣地标 -->
  <div class="section">
    <div class="section-title">AI 朝圣地标（5 个，任务 agent.4）</div>
    <ul class="landmark-list">
      <li>
        <div class="landmark-num">L1</div>
        <div class="landmark-info">
          <h4>詹天佑广场 · AI 开创者荣誉墙</h4>
          <p>众智苑北入口 — 以京张铁路工程精神为原点，铭刻全球 AI 发展里程碑事件与先驱科学家</p>
        </div>
      </li>
      <li>
        <div class="landmark-num">L2</div>
        <div class="landmark-info">
          <h4>开源社区广场 · GitHub 星图墙</h4>
          <p>AI 原点社区核心 — 全球开源 AI 贡献者荣誉展示，本次征集参与者 GitHub ID 实物化刻入</p>
        </div>
      </li>
      <li>
        <div class="landmark-num">L3</div>
        <div class="landmark-info">
          <h4>算力纪念碑 · 摩尔之柱</h4>
          <p>众智苑与 AI 原点交界 — 以摩尔定律为叙事主线，10 米高螺旋形纪念柱</p>
        </div>
      </li>
      <li>
        <div class="landmark-num">L4</div>
        <div class="landmark-info">
          <h4>大模型涌现节点 · 思想实验室</h4>
          <p>大钟寺 AI 产业区中心 — 大规模语言模型"涌现"现象沉浸式交互装置</p>
        </div>
      </li>
      <li>
        <div class="landmark-num">L5</div>
        <div class="landmark-info">
          <h4>中关村人才树 · 传承雕塑园</h4>
          <p>小月河翼入口 — 以"人才树"为隐喻，铭刻中关村历代 AI 研究者与创业者</p>
        </div>
      </li>
    </ul>
  </div>

  <!-- 用户画像 -->
  <div class="section">
    <div class="section-title">用户画像（6 类，任务 agent.3）</div>
    <div class="grid-3">
      <div class="persona-card">
        <div class="persona-avatar">访</div>
        <h4>全球 AI 访学者</h4>
        <div class="persona-meta">25-40岁 &nbsp;|&nbsp; 全球 &nbsp;|&nbsp; 1周-6月</div>
      </div>
      <div class="persona-card">
        <div class="persona-avatar">职</div>
        <h4>北京本地 AI 从业者</h4>
        <div class="persona-meta">28-45岁 &nbsp;|&nbsp; 北京 &nbsp;|&nbsp; 通勤居住</div>
      </div>
      <div class="persona-card">
        <div class="persona-avatar">创</div>
        <h4>AI 创业者/独立开发者</h4>
        <div class="persona-meta">22-35岁 &nbsp;|&nbsp; 全球 &nbsp;|&nbsp; 中长期居住</div>
      </div>
      <div class="persona-card">
        <div class="persona-avatar">民</div>
        <h4>AI 好奇的普通市民</h4>
        <div class="persona-meta">30-65岁 &nbsp;|&nbsp; 北京 &nbsp;|&nbsp; 休闲游览</div>
      </div>
      <div class="persona-card">
        <div class="persona-avatar">游</div>
        <h4>科技旅游者</h4>
        <div class="persona-meta">20-50岁 &nbsp;|&nbsp; 国内外 &nbsp;|&nbsp; 短期游览</div>
      </div>
      <div class="persona-card">
        <div class="persona-avatar">研</div>
        <h4>AI 政策研究者/规划师</h4>
        <div class="persona-meta">30-55岁 &nbsp;|&nbsp; 全球 &nbsp;|&nbsp; 考察访问</div>
      </div>
    </div>
  </div>

  <!-- 全球案例研究 -->
  <div class="section">
    <div class="section-title">全球 AI 生态案例研究（7 个，任务 agent.2）</div>
    <table class="case-table">
      <thead>
        <tr>
          <th>#</th>
          <th>案例</th>
          <th>位置</th>
          <th>核心机制</th>
          <th>对海淀参考价值</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>01</td><td>硅谷 Route 128</td><td>美国加州</td><td>高校-产业-资本耦合</td><td>空间走廊模式</td></tr>
        <tr><td>02</td><td>深圳南山科技园</td><td>中国深圳</td><td>产研一体化</td><td>全栈自主创新空间原型</td></tr>
        <tr><td>03</td><td>以色列特拉维夫创新圈</td><td>以色列</td><td>军转民技术生态</td><td>AI 治理话语权建设</td></tr>
        <tr><td>04</td><td>英国伦敦 Tech City</td><td>英国伦敦</td><td>老工业区更新</td><td>城市更新路径参考</td></tr>
        <tr><td>05</td><td>多伦多 Sidewalk Labs</td><td>加拿大</td><td>AI 城市原型实验</td><td>AI 生活场景实验</td></tr>
        <tr><td>06</td><td>新加坡 One-North</td><td>新加坡</td><td>规划驱动混合生态</td><td>规划引领 AI 生态</td></tr>
        <tr><td>07</td><td>中关村软件园</td><td>北京</td><td>成熟高校-企业生态</td><td>本地 AI 生态升级</td></tr>
      </tbody>
    </table>
  </div>

  <!-- 合规矩阵 -->
  <div class="section">
    <div class="section-title">自检状态 &amp; 任务覆盖</div>
    <div class="status-row">
      <div class="status-chip"><div class="dot dot-pass"></div>agent.1 总体概念命名</div>
      <div class="status-chip"><div class="dot dot-pass"></div>agent.2 AI 创新生态（7个案例）</div>
      <div class="status-chip"><div class="dot dot-pass"></div>agent.3 场景卡（12张）</div>
      <div class="status-chip"><div class="dot dot-pass"></div>agent.4 AI 地标（5个）</div>
      <div class="status-chip"><div class="dot dot-pass"></div>agent.5 文化叙事</div>
      <div class="status-chip"><div class="dot dot-pass"></div>agent.6 活动运营体系</div>
      <div class="status-chip"><div class="dot dot-pass"></div>用户画像（6类）</div>
      <div class="status-chip"><div class="dot dot-pass"></div>测试场景（4个）</div>
      <div class="status-chip"><div class="dot dot-warn"></div>边界：临时状态</div>
      <div class="status-chip"><div class="dot dot-pass"></div>双语 proposal.md/en</div>
    </div>
    <div class="compliance-row">
      <div class="comp-item"><div class="comp-check">&#10003;</div><div class="comp-text">所有成果为概念建议，不替代正式规划</div></div>
      <div class="comp-item"><div class="comp-check">&#10003;</div><div class="comp-text">仅使用公开数据，来源可追溯（sources.json）</div></div>
      <div class="comp-item"><div class="comp-check">&#10003;</div><div class="comp-text">临时边界已明确标注，使用范围合规</div></div>
      <div class="comp-item"><div class="comp-check">&#10003;</div><div class="comp-text">不包含非公开数据或个人隐私</div></div>
      <div class="comp-item"><div class="comp-check">&#10003;</div><div class="comp-text">无法定规划参数（容积率/建筑高度）最终结论</div></div>
      <div class="comp-item"><div class="comp-check">&#10003;</div><div class="comp-text">引用格式合规，包含 source_id 追溯</div></div>
    </div>
  </div>

  <!-- 来源声明 -->
  <div class="section">
    <div class="section-title">数据来源</div>
    <div style="font-size: 12px; color: var(--text-muted); line-height: 1.8;">
      <strong>DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509</strong>：北京市规划和自然资源委员会海淀分局资格预审公告（2026年5月）<br>
      <strong>DATA-SRC-AGENT-TASKBOOK-20260518</strong>：面向全球智能体任务书（open-city-ai/haidian GitHub仓库）<br>
      <strong>DATA-SRC-PROVISIONAL-BOUNDARIES-20260605</strong>：仓库维护者基于公告推导的临时边界（非官方）<br>
      <strong>DATA-SRC-OSM-BEIJING-2026</strong>：OpenStreetMap北京数据（ODbL 1.0）<br>
      <strong>DATA-SRC-BEIJING-AI-INDUSTRY-2025</strong>：北京市AI产业发展报告2025
    </div>
  </div>

  <div class="footer">
    <strong>版权声明：</strong>本方案由 WorkBuddy AI 生成，依据 CC BY 4.0 开放授权。使用 AI 辅助生成，来源与生成方式已披露。<br>
    本页面为离线静态 HTML，不加载任何远程资源、CDN 脚本、外部字体或追踪代码。<br>
    <strong>提案版本：</strong>v1.0 &nbsp;|&nbsp; 生成日期：2026-08-08 &nbsp;|&nbsp; 项目：百年京张 AI 创新带城市设计开源征集 &nbsp;|&nbsp; 仓库：open-city-ai/haidian
  </div>

</div>
</body>
</html>
