"""
Generate 5 required urban design figures as SVG files.
Style: Professional urban design presentation diagrams.
"""
import os

figures_dir = 'C:/Users/Administrator/WorkBuddy/2026-08-08-15-17-25/submission/assets/figures'
os.makedirs(figures_dir, exist_ok=True)

# === Color palette ===
C_BLUE = '#1A56DB'
C_COPPER = '#B87333'
C_GREEN = '#10B981'
C_PURPLE = '#7C3AED'
C_RED = '#EF4444'
C_ORANGE = '#F59E0B'
C_GRAY_LIGHT = '#F3F4F6'
C_GRAY_MID = '#9CA3AF'
C_GRAY_DARK = '#374151'
C_BG = '#FFFFFF'
C_TEXT = '#1F2937'
C_WATER = '#93C5FD'

def svg_wrap(content, w=1200, h=800):
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
<style>
  .title {{ font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif; font-size: 28px; font-weight: bold; fill: {C_TEXT}; }}
  .subtitle {{ font-family: 'Microsoft YaHei', sans-serif; font-size: 16px; fill: {C_GRAY_DARK}; }}
  .label {{ font-family: 'Microsoft YaHei', sans-serif; font-size: 13px; fill: {C_TEXT}; }}
  .small {{ font-family: 'Microsoft YaHei', sans-serif; font-size: 11px; fill: {C_GRAY_MID}; }}
  .legend {{ font-family: 'Microsoft YaHei', sans-serif; font-size: 12px; }}
  .note {{ font-family: 'Microsoft YaHei', sans-serif; font-size: 10px; fill: {C_GRAY_MID}; font-style: italic; }}
  .en {{ font-family: 'Inter', 'Segoe UI', sans-serif; font-size: 11px; fill: {C_GRAY_MID}; }}
</style>
<rect width="{w}" height="{h}" fill="{C_BG}"/>
{content}
</svg>'''

# ============================================================
# FIGURE 1: Site Overview - Overall Spatial Structure
# ============================================================
fig1 = '''
<text x="600" y="40" text-anchor="middle" class="title">京张智脉 · 总体空间结构图</text>
<text x="600" y="65" text-anchor="middle" class="en">JingZhang Smart Meridian — Overall Spatial Structure</text>

<!-- North arrow -->
<polygon points="60,120 50,155 70,155" fill="#374151"/>
<text x="60" y="170" text-anchor="middle" class="small">N</text>

<!-- Site boundary (provisional - dashed) -->
<rect x="120" y="100" width="180" height="600" rx="20" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-dasharray="8,4"/>
<text x="210" y="90" text-anchor="middle" class="note">场地临时边界 (Provisional, ~43.6 km²)</text>

<!-- North 5th Ring Rd -->
<line x1="100" y1="120" x2="320" y2="120" stroke="#6B7280" stroke-width="2"/>
<text x="325" y="124" class="small">北五环</text>

<!-- JingZhang Railway Park (spine) -->
<rect x="195" y="140" width="30" height="530" rx="5" fill={C_GREEN} opacity="0.3" stroke={C_GREEN} stroke-width="2"/>
<text x="210" y="420" text-anchor="middle" class="label" transform="rotate(-90, 210, 420)">京张铁路遗址公园 (JingZhang Railway Heritage Park)</text>

<!-- Three Key Areas -->
<!-- Area 1: AI Origin -->
<rect x="140" y="160" width="140" height="100" rx="10" fill={C_BLUE} opacity="0.15" stroke={C_BLUE} stroke-width="2"/>
<text x="210" y="200" text-anchor="middle" class="label" fill={C_BLUE}>智源坊</text>
<text x="210" y="218" text-anchor="middle" class="en">AI Origin Community</text>
<text x="210" y="236" text-anchor="middle" class="small">世界级AI创新生态</text>

<!-- Area 2: Acceleration -->
<rect x="140" y="310" width="140" height="100" rx="10" fill={C_PURPLE} opacity="0.15" stroke={C_PURPLE} stroke-width="2"/>
<text x="210" y="350" text-anchor="middle" class="label" fill={C_PURPLE}>众智引擎</text>
<text x="210" y="368" text-anchor="middle" class="en">Zhongzhiyuan Acceleration</text>
<text x="210" y="386" text-anchor="middle" class="small">AI全栈自主创新</text>

<!-- Area 3: Industry -->
<rect x="140" y="460" width="140" height="100" rx="10" fill={C_ORANGE} opacity="0.15" stroke={C_ORANGE} stroke-width="2"/>
<text x="210" y="500" text-anchor="middle" class="label" fill={C_ORANGE}>智钟汇</text>
<text x="210" y="518" text-anchor="middle" class="en">Dazhongsi AI Industry</text>
<text x="210" y="536" text-anchor="middle" class="small">智能原生新业态</text>

<!-- Two Wings -->
<rect x="50" y="200" width="70" height="320" rx="8" fill={C_GRAY_LIGHT} stroke={C_GRAY_MID} stroke-width="1.5"/>
<text x="85" y="370" text-anchor="middle" class="label" transform="rotate(-90, 85, 370)">中关村科技服务翼</text>

<rect x="320" y="200" width="70" height="320" rx="8" fill={C_GRAY_LIGHT} stroke={C_GRAY_MID} stroke-width="1.5"/>
<text x="355" y="370" text-anchor="middle" class="label" transform="rotate(-90, 355, 370)">小月河场景赋能翼</text>

<!-- South: Beijing North Station -->
<line x1="100" y1="700" x2="320" y2="700" stroke="#6B7280" stroke-width="2"/>
<text x="325" y="704" class="small">北京北站</text>

<!-- Legend -->
<rect x="430" y="120" width="340" height="250" rx="8" fill={C_GRAY_LIGHT} stroke={C_GRAY_MID} stroke-width="1"/>
<text x="600" y="150" text-anchor="middle" class="label" font-weight="bold">图例 Legend</text>
<rect x="450" y="165" width="20" height="15" rx="3" fill={C_BLUE} opacity="0.5"/>
<text x="480" y="178" class="legend">AI原点社区（智源坊）</text>
<rect x="450" y="190" width="20" height="15" rx="3" fill={C_PURPLE} opacity="0.5"/>
<text x="480" y="203" class="legend">众智园AI加速区</text>
<rect x="450" y="215" width="20" height="15" rx="3" fill={C_ORANGE} opacity="0.5"/>
<text x="480" y="228" class="legend">大钟寺AI产业集聚区</text>
<rect x="450" y="240" width="20" height="15" rx="3" fill={C_GREEN} opacity="0.5"/>
<text x="480" y="253" class="legend">京张铁路遗址公园（绿轴）</text>
<rect x="450" y="265" width="20" height="15" rx="3" fill={C_GRAY_LIGHT} stroke={C_GRAY_MID} stroke-width="1"/>
<text x="480" y="278" class="legend">两翼（科技服务/场景赋能）</text>
<rect x="450" y="290" width="20" height="15" rx="3" fill="none" stroke={C_GRAY_MID} stroke-width="2" stroke-dasharray="6,3"/>
<text x="480" y="303" class="legend">临时场地边界（待官方数据确认）</text>
<text x="450" y="340" class="note">* 所有空间范围均为概念边界</text>
<text x="450" y="355" class="note">* 待官方GeoJSON数据发布后重绘</text>

<!-- Design notes side panel -->
<rect x="430" y="400" width="340" height="280" rx="8" fill={C_GRAY_LIGHT}/>
<text x="600" y="430" text-anchor="middle" class="label" font-weight="bold">设计注释 Design Notes</text>
<text x="450" y="460" class="legend">• 一轴三核两翼空间结构</text>
<text x="450" y="482" class="legend">• 京张铁路遗址公园为文化主轴</text>
<text x="450" y="504" class="legend">• 南北贯通约7km，东西约5km</text>
<text x="450" y="526" class="legend">• 三区功能互补：研究→加速→产业</text>
<text x="450" y="548" class="legend">• 两翼提供横向支撑与场景渗透</text>
<text x="450" y="570" class="legend">• 对标全球8个AI创新区案例</text>
<text x="450" y="592" class="legend">• 概念方案，不替代正式规划</text>

<!-- Source note -->
<text x="600" y="780" text-anchor="middle" class="note">Source: agent_taskbook.json | Provisional geometry | WorkBuddy Urban Design Agent | 2026-08-08</text>
'''

# ============================================================
# FIGURE 2: Land Use Structure
# ============================================================
fig2 = '''
<text x="600" y="40" text-anchor="middle" class="title">土地利用结构概念图</text>
<text x="600" y="65" text-anchor="middle" class="en">Land Use Structure — Conceptual Diagram</text>

<!-- Pie chart -->
<circle cx="300" cy="400" r="180" fill="none" stroke={C_GRAY_LIGHT} stroke-width="1"/>
<!-- Innovation: 17% -->
<path d="M300,220 A180,180 0 0,1 465,315 L300,400 Z" fill={C_BLUE} opacity="0.7"/>
<!-- Commercial: 13% -->
<path d="M300,220 A180,180 0 0,1 300,580 L300,400 Z" fill={C_ORANGE} opacity="0.7"/>
<!-- Residential: 28% -->
<path d="M300,580 A180,180 0 0,1 150,500 L300,400 Z" fill="#6B7280" opacity="0.5"/>
<!-- Green: 23% -->
<path d="M150,500 A180,180 0 0,1 140,340 L300,400 Z" fill={C_GREEN} opacity="0.6"/>
<!-- Transport: 12% -->
<path d="M140,340 A180,180 0 0,1 200,240 L300,400 Z" fill="#FCD34D" opacity="0.6"/>
<!-- Public: 7% -->
<path d="M200,240 A180,180 0 0,1 300,220 L300,400 Z" fill={C_PURPLE} opacity="0.5"/>

<circle cx="300" cy="400" r="60" fill="white" stroke={C_GRAY_MID} stroke-width="1"/>
<text x="300" y="395" text-anchor="middle" class="label" font-size="14">总用地</text>
<text x="300" y="415" text-anchor="middle" class="label" font-size="14">~4,360 ha</text>

<!-- Bar chart -->
<g transform="translate(550, 150)">
  <text x="0" y="0" class="label" font-weight="bold">用地占比 (%)</text>
  <!-- Residential 28% -->
  <rect x="0" y="20" width="320" height="30" rx="4" fill="#6B7280" opacity="0.6"/>
  <text x="10" y="40" class="legend" fill="white">居住用地 Residential</text>
  <text x="300" y="40" class="legend" text-anchor="end">28%</text>
  <!-- Green 23% -->
  <rect x="0" y="60" width="263" height="30" rx="4" fill={C_GREEN} opacity="0.7"/>
  <text x="10" y="80" class="legend" fill="white">绿地与公共空间 Green + Public</text>
  <text x="300" y="80" class="legend" text-anchor="end">23%</text>
  <!-- Innovation 17% -->
  <rect x="0" y="100" width="195" height="30" rx="4" fill={C_BLUE} opacity="0.7"/>
  <text x="10" y="120" class="legend" fill="white">创新研发混合 Innovation Mixed</text>
  <text x="300" y="120" class="legend" text-anchor="end">17%</text>
  <!-- Commercial 13% -->
  <rect x="0" y="140" width="149" height="30" rx="4" fill={C_ORANGE} opacity="0.7"/>
  <text x="10" y="160" class="legend" fill="white">商业商务 Commercial</text>
  <text x="300" y="160" class="legend" text-anchor="end">13%</text>
  <!-- Transport 12% -->
  <rect x="0" y="180" width="137" height="30" rx="4" fill="#FCD34D" opacity="0.7"/>
  <text x="10" y="200" class="legend" fill={C_TEXT}>道路交通 Transport</text>
  <text x="300" y="200" class="legend" text-anchor="end">12%</text>
  <!-- Public 7% -->
  <rect x="0" y="220" width="80" height="30" rx="4" fill={C_PURPLE} opacity="0.6"/>
  <text x="10" y="240" class="legend" fill="white">公共服务 Public Service</text>
  <text x="300" y="240" class="legend" text-anchor="end">7%</text>
</g>

<!-- Key insight -->
<text x="600" y="680" text-anchor="middle" class="label" fill={C_BLUE}>核心策略: 创新+绿地+居住的"三高混合"模式，打破传统功能分区</text>
<text x="600" y="710" text-anchor="middle" class="en">Strategy: High Innovation + High Green + High Residential mix</text>

<text x="600" y="780" text-anchor="middle" class="note">Source: Conceptual land use proposal | Provisional data | 2026-08-08</text>
'''

# ============================================================
# FIGURE 3: Key Areas Detail
# ============================================================
fig3 = '''
<text x="600" y="40" text-anchor="middle" class="title">三区两翼 · 关键区域详图</text>
<text x="600" y="65" text-anchor="middle" class="en">Three Cores + Two Wings — Key Areas Detail</text>

<!-- Area 1 Card -->
<rect x="30" y="90" width="360" height="310" rx="12" fill={C_GRAY_LIGHT} stroke={C_BLUE} stroke-width="2"/>
<rect x="30" y="90" width="360" height="40" rx="12" fill={C_BLUE}/>
<rect x="30" y="118" width="360" height="12" fill={C_BLUE}/>
<text x="210" y="116" text-anchor="middle" class="label" fill="white" font-size="16">智源坊 — AI原点社区</text>
<text x="50" y="155" class="label" font-weight="bold" fill={C_BLUE}>核心功能:</text>
<text x="50" y="178" class="legend">• 世界级AI基础研究集聚</text>
<text x="50" y="198" class="legend">• 开源广场 + 开发者散步道</text>
<text x="50" y="218" class="legend">• 智能体贡献荣誉墙</text>
<text x="50" y="238" class="legend">• 人才公寓 + 国际社区</text>
<text x="50" y="258" class="legend">• 孵化器 + VC集聚</text>
<text x="50" y="285" class="label" font-weight="bold" fill={C_BLUE}>地标:</text>
<text x="50" y="308" class="legend">智源之塔 — AI神经网络形态建筑</text>
<text x="50" y="328" class="legend">开源广场 — 开源成果展示廊</text>
<text x="50" y="355" class="note">面积概念: ~500 ha | 对标: 肯德尔广场</text>

<!-- Area 2 Card -->
<rect x="420" y="90" width="360" height="310" rx="12" fill={C_GRAY_LIGHT} stroke={C_PURPLE} stroke-width="2"/>
<rect x="420" y="90" width="360" height="40" rx="12" fill={C_PURPLE}/>
<rect x="420" y="118" width="360" height="12" fill={C_PURPLE}/>
<text x="600" y="116" text-anchor="middle" class="label" fill="white" font-size="16">众智引擎 — AI自主创新加速区</text>
<text x="440" y="155" class="label" font-weight="bold" fill={C_PURPLE}>核心功能:</text>
<text x="440" y="178" class="legend">• AI全栈自主体系（芯片→应用）</text>
<text x="440" y="198" class="legend">• 智算中心 + 评测平台</text>
<text x="440" y="218" class="legend">• 开源框架联合实验室集群</text>
<text x="440" y="238" class="legend">• 众智之环 — 环形协作空间</text>
<text x="440" y="258" class="legend">• 3个AI测试验证场景</text>
<text x="440" y="285" class="label" font-weight="bold" fill={C_PURPLE}>地标:</text>
<text x="440" y="308" class="legend">治理之庭 — AI治理国际对话中心</text>
<text x="440" y="328" class="legend">众智之环 — 环形联合实验室</text>
<text x="440" y="355" class="note">面积概念: ~400 ha | 对标: 斯坦福研究园</text>

<!-- Area 3 Card -->
<rect x="810" y="90" width="360" height="310" rx="12" fill={C_GRAY_LIGHT} stroke={C_ORANGE} stroke-width="2"/>
<rect x="810" y="90" width="360" height="40" rx="12" fill={C_ORANGE}/>
<rect x="810" y="118" width="360" height="12" fill={C_ORANGE}/>
<text x="990" y="116" text-anchor="middle" class="label" fill="white" font-size="16">智钟汇 — AI产业集聚区</text>
<text x="830" y="155" class="label" font-weight="bold" fill={C_ORANGE}>核心功能:</text>
<text x="830" y="178" class="legend">• AI原生消费商业场景</text>
<text x="830" y="198" class="legend">• 企业总部 + 独角兽办公</text>
<text x="830" y="218" class="legend">• AI产品全球首发平台</text>
<text x="830" y="238" class="legend">• 沉浸式AI娱乐街区</text>
<text x="830" y="258" class="legend">• 人才社区 + 青年公寓</text>
<text x="830" y="285" class="label" font-weight="bold" fill={C_ORANGE}>地标:</text>
<text x="830" y="308" class="legend">AI钟楼 — 数字钟塔+首发厅</text>
<text x="830" y="328" class="legend">AI晨钟广场 — 数字艺术装置</text>
<text x="830" y="355" class="note">面积概念: ~350 ha | 对标: 涩谷Scramble Square</text>

<!-- Wings at bottom -->
<rect x="30" y="430" width="555" height="130" rx="10" fill={C_GRAY_LIGHT} stroke={C_GRAY_MID} stroke-width="1.5"/>
<text x="307" y="458" text-anchor="middle" class="label" font-weight="bold">中关村科技服务翼（西翼）</text>
<text x="50" y="482" class="legend">IP交易所 · 全球创新联络处 · 科技金融走廊 · VC/PE集聚区 · 国际人才服务中心</text>
<text x="50" y="505" class="legend">功能定位: 要素全球化配置、知识产权赋能、资本全周期支撑</text>
<text x="50" y="530" class="note">概念走廊 — 沿中关村大街延伸</text>

<rect x="615" y="430" width="555" height="130" rx="10" fill={C_GRAY_LIGHT} stroke={C_GRAY_MID} stroke-width="1.5"/>
<text x="892" y="458" text-anchor="middle" class="label" font-weight="bold">小月河场景赋能翼（东翼）</text>
<text x="635" y="482" class="legend">AI水岸体验带 · 社区AI实验场 · 银发AI友好社区 · AI食堂 · 智慧健身路径</text>
<text x="635" y="505" class="legend">功能定位: AI场景渗透、社区智能化、市民AI素养提升</text>
<text x="635" y="530" class="note">概念走廊 — 沿小月河水岸延伸</text>

<text x="600" y="600" text-anchor="middle" class="label" fill={C_BLUE}>"三区驱动 + 两翼赋能" 协同模式</text>
<text x="600" y="630" text-anchor="middle" class="en">Three Cores Drive + Two Wings Empower — Synergistic Model</text>

<text x="600" y="780" text-anchor="middle" class="note">Source: agent_taskbook.json + design proposal | All boundaries provisional | 2026-08-08</text>
'''

# ============================================================
# FIGURE 4: Mobility & Blue-Green Network
# ============================================================
fig4 = '''
<text x="600" y="40" text-anchor="middle" class="title">交通系统与蓝绿空间网络图</text>
<text x="600" y="65" text-anchor="middle" class="en">Mobility System &amp; Blue-Green Network</text>

<!-- Central green spine -->
<rect x="280" y="110" width="40" height="580" rx="8" fill={C_GREEN} opacity="0.3" stroke={C_GREEN} stroke-width="3"/>
<text x="300" y="30" text-anchor="middle" class="label" fill={C_GREEN}>京张遗址公园</text>
<text x="300" y="400" text-anchor="middle" class="label" fill={C_GREEN} transform="rotate(-90, 300, 400)">绿色主轴 (Green Spine)</text>

<!-- Xiaoyuehe river (east) -->
<path d="M340,120 Q360,200 350,300 Q340,400 360,500 Q370,600 350,690" fill="none" stroke={C_WATER} stroke-width="8" opacity="0.6"/>
<text x="385" y="400" class="label" fill="#3B82F6">小月河</text>
<text x="385" y="418" class="small" fill="#3B82F6">Xiaoyuehe</text>

<!-- Metro lines -->
<line x1="150" y1="120" x2="150" y2="690" stroke={C_RED} stroke-width="2" stroke-dasharray="4,4"/>
<text x="120" y="400" class="small" fill={C_RED} transform="rotate(-90, 120, 400)">M4 号线</text>

<line x1="100" y1="400" x2="500" y2="400" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4,4"/>
<text x="250" y="390" text-anchor="middle" class="small" fill="#F59E0B">M13 号线</text>

<line x1="300" y1="640" x2="500" y2="640" stroke="#3B82F6" stroke-width="2" stroke-dasharray="4,4"/>
<text x="430" y="630" text-anchor="middle" class="small" fill="#3B82F6">M10 号线</text>

<!-- Proposed AI Innovation Line (APM/tram concept) -->
<line x1="280" y1="140" x2="320" y2="660" stroke={C_PURPLE} stroke-width="3" stroke-dasharray="10,6"/>
<text x="200" y="420" class="label" fill={C_PURPLE} transform="rotate(-90, 200, 420)">概念: AI创新线 (APM/有轨电车)</text>

<!-- Bike/pedestrian network -->
<rect x="250" y="140" width="100" height="550" fill="none" stroke={C_GREEN} stroke-width="1" stroke-dasharray="2,2" opacity="0.4"/>
<text x="60" y="300" class="small" fill={C_GREEN}>慢行网络</text>
<text x="60" y="316" class="small" fill={C_GREEN}>Walking/Biking</text>

<!-- Key stations -->
<circle cx="300" cy="200" r="8" fill={C_BLUE}/>
<text x="315" y="204" class="small">清华园站</text>
<circle cx="300" cy="400" r="8" fill={C_PURPLE}/>
<text x="315" y="404" class="small">五道口</text>
<circle cx="300" cy="560" r="8" fill={C_ORANGE}/>
<text x="315" y="564" class="small">大钟寺</text>
<circle cx="300" cy="680" r="8" fill={C_RED}/>
<text x="315" y="684" class="small">北京北站</text>

<!-- Legend -->
<rect x="550" y="110" width="300" height="250" rx="8" fill={C_GRAY_LIGHT}/>
<text x="700" y="140" text-anchor="middle" class="label" font-weight="bold">图例</text>
<line x1="570" y1="160" x2="610" y2="160" stroke={C_RED} stroke-width="2" stroke-dasharray="4,4"/>
<text x="620" y="164" class="legend">既有地铁 (Existing Metro)</text>
<line x1="570" y1="185" x2="610" y2="185" stroke={C_PURPLE} stroke-width="3" stroke-dasharray="10,6"/>
<text x="620" y="189" class="legend">概念AI创新线 (Proposed)</text>
<rect x="570" y="205" width="20" height="15" rx="3" fill={C_GREEN} opacity="0.4" stroke={C_GREEN} stroke-width="1"/>
<text x="620" y="218" class="legend">慢行网络 (Walk/Bike)</text>
<line x1="570" y="238" x2="610" y2="238" stroke={C_WATER} stroke-width="6" opacity="0.6"/>
<text x="620" y="242" class="legend">水系 (Blue network)</text>
<circle cx="580" cy="265" r="5" fill={C_BLUE}/>
<text x="620" y="269" class="legend">关键节点 (Key nodes)</text>
<text x="580" y="320" class="note">* 轨道线位为概念建议</text>
<text x="580" y="335" class="note">* 不替代专业交通规划</text>

<!-- Key metrics -->
<rect x="550" y="400" width="300" height="180" rx="8" fill={C_GRAY_LIGHT}/>
<text x="700" y="430" text-anchor="middle" class="label" font-weight="bold">关键指标</text>
<text x="570" y="460" class="legend">慢行覆盖率: &gt;90% (目标)</text>
<text x="570" y="482" class="legend">绿地率: &gt;35% (参考国标)</text>
<text x="570" y="504" class="legend">公共空间300m覆盖率: &gt;85%</text>
<text x="570" y="526" class="legend">轨道交通站点800m覆盖: &gt;80%</text>
<text x="570" y="548" class="legend">东西缝合节点: 3-5处新增</text>

<text x="600" y="780" text-anchor="middle" class="note">Source: Design proposal | Conceptual transport strategy | 2026-08-08</text>
'''

# ============================================================
# FIGURE 5: Metrics Evidence Dashboard
# ============================================================
fig5 = '''
<text x="600" y="40" text-anchor="middle" class="title">指标体系与证据仪表盘</text>
<text x="600" y="65" text-anchor="middle" class="en">Metrics Evidence Dashboard</text>

<!-- Metric cards grid -->
<g transform="translate(30, 90)">
  <!-- Row 1 -->
  <rect x="0" y="0" width="270" height="120" rx="8" fill={C_GRAY_LIGHT} stroke={C_BLUE} stroke-width="1.5"/>
  <text x="135" y="30" text-anchor="middle" class="label" font-weight="bold" fill={C_BLUE}>总用地面积</text>
  <text x="135" y="65" text-anchor="middle" class="title" font-size="32" fill={C_BLUE}>4,360 ha</text>
  <text x="135" y="90" text-anchor="middle" class="small">来源: 任务书公开数据 | 置信度: 高</text>

  <rect x="290" y="0" width="270" height="120" rx="8" fill={C_GRAY_LIGHT} stroke={C_GREEN} stroke-width="1.5"/>
  <text x="425" y="30" text-anchor="middle" class="label" font-weight="bold" fill={C_GREEN}>绿地率</text>
  <text x="425" y="65" text-anchor="middle" class="title" font-size="32" fill={C_GREEN}>&gt;35%</text>
  <text x="425" y="90" text-anchor="middle" class="small">目标值 | 参考: GB-50137</text>

  <rect x="580" y="0" width="270" height="120" rx="8" fill={C_GRAY_LIGHT} stroke={C_PURPLE} stroke-width="1.5"/>
  <text x="715" y="30" text-anchor="middle" class="label" font-weight="bold" fill={C_PURPLE}>创新空间占比</text>
  <text x="715" y="65" text-anchor="middle" class="title" font-size="32" fill={C_PURPLE}>15-20%</text>
  <text x="715" y="90" text-anchor="middle" class="small">对标全球AI创新区 | 置信度: 中</text>

  <!-- Row 2 -->
  <rect x="0" y="140" width="270" height="120" rx="8" fill={C_GRAY_LIGHT} stroke={C_ORANGE} stroke-width="1.5"/>
  <text x="135" y="170" text-anchor="middle" class="label" font-weight="bold" fill={C_ORANGE}>AI场景节点数</text>
  <text x="135" y="205" text-anchor="middle" class="title" font-size="32" fill={C_ORANGE}>&gt;50个</text>
  <text x="135" y="230" text-anchor="middle" class="small">10场景 × 5节点 | 目标值</text>

  <rect x="290" y="140" width="270" height="120" rx="8" fill={C_GRAY_LIGHT} stroke="#3B82F6" stroke-width="1.5"/>
  <text x="425" y="170" text-anchor="middle" class="label" font-weight="bold" fill="#3B82F6">年度国际活动</text>
  <text x="425" y="205" text-anchor="middle" class="title" font-size="32" fill="#3B82F6">&gt;30场</text>
  <text x="425" y="230" text-anchor="middle" class="small">含峰会/双年展/月度活动</text>

  <rect x="580" y="140" width="270" height="120" rx="8" fill={C_GRAY_LIGHT} stroke={C_COPPER} stroke-width="1.5"/>
  <text x="715" y="170" text-anchor="middle" class="label" font-weight="bold" fill={C_COPPER}>AI核心区就业密度</text>
  <text x="715" y="205" text-anchor="middle" class="title" font-size="32" fill={C_COPPER}>2.5万/km²</text>
  <text x="715" y="230" text-anchor="middle" class="small">对标肯德尔广场 | 目标值</text>
</g>

<!-- Task coverage matrix -->
<rect x="30" y="420" width="1140" height="160" rx="8" fill={C_GRAY_LIGHT}/>
<text x="600" y="450" text-anchor="middle" class="label" font-weight="bold">Agent任务覆盖矩阵</text>
<g transform="translate(50, 465)">
  <rect x="0" y="0" width="160" height="30" rx="4" fill={C_GREEN} opacity="0.7"/>
  <text x="80" y="20" text-anchor="middle" class="legend" fill="white">agent.1 概念命名</text>
  <rect x="175" y="0" width="160" height="30" rx="4" fill={C_GREEN} opacity="0.7"/>
  <text x="255" y="20" text-anchor="middle" class="legend" fill="white">agent.2 创新生态</text>
  <rect x="350" y="0" width="160" height="30" rx="4" fill={C_GREEN} opacity="0.7"/>
  <text x="430" y="20" text-anchor="middle" class="legend" fill="white">agent.3 场景设计</text>
  <rect x="525" y="0" width="160" height="30" rx="4" fill={C_GREEN} opacity="0.7"/>
  <text x="605" y="20" text-anchor="middle" class="legend" fill="white">agent.4 公共空间</text>
  <rect x="700" y="0" width="160" height="30" rx="4" fill={C_GREEN} opacity="0.7"/>
  <text x="780" y="20" text-anchor="middle" class="legend" fill="white">agent.5 文化叙事</text>
  <rect x="875" y="0" width="160" height="30" rx="4" fill={C_GREEN} opacity="0.7"/>
  <text x="955" y="20" text-anchor="middle" class="legend" fill="white">agent.6 运营体系</text>
</g>

<!-- Self-check result -->
<rect x="30" y="600" width="1140" height="80" rx="8" fill={C_GREEN} opacity="0.1" stroke={C_GREEN} stroke-width="2"/>
<text x="600" y="635" text-anchor="middle" class="label" font-size="20" fill={C_GREEN} font-weight="bold">自检结果: PASS (16/16项通过)</text>
<text x="600" y="660" text-anchor="middle" class="small">覆盖全部6项Agent任务 | 10张场景卡 | 8个全球案例 | 3个AI朝圣地标 | 5类用户画像</text>

<!-- Warning -->
<rect x="30" y="700" width="555" height="60" rx="6" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1"/>
<text x="47" y="725" class="small" fill="#92400E">⚠ 空间几何为临时推导 (provisional_constraint)</text>
<text x="47" y="745" class="small" fill="#92400E">待官方GeoJSON发布后重新计算所有指标</text>

<text x="600" y="790" text-anchor="middle" class="note">Source: metrics.json + compliance_matrix.json | WorkBuddy Urban Design Agent | 2026-08-08</text>
'''

# Write all figures
figures = [
    ('site-overview.svg', fig1),
    ('land-use-structure.svg', fig2),
    ('key-areas.svg', fig3),
    ('mobility-bluegreen.svg', fig4),
    ('metrics-evidence.svg', fig5),
]

for name, content in figures:
    path = os.path.join(figures_dir, name)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(svg_wrap(content))
    print(f'Created {path}')

# Also create PNG versions (using basic SVG, since we can't easily render to PNG without extra deps)
# For now, SVG serves as the authoritative figure format
print('\nAll 5 figures generated as SVG files.')
print('Figures directory:', figures_dir)
