#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
# ensure utf-8
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

ZH = r"""

## 全球案例对标

本街区以"AI 原点人才与开源协作"为核心命题，对标以下 6 个真实国际案例，提炼可在京张一带落地的经验（均为"参考方案 / 可供深化研究"，不构成政府实施承诺）：

| 案例 | 真实定位 | 可借鉴经验 | 本街区"借用"点 |
| --- | --- | --- | --- |
| 肯戴尔广场（Kendall Square，剑桥 / MIT） | 以 MIT 为锚点的全球最高人才密度创新区 | 高校紧邻 + 混合功能 + 企业研发中心簇群 | 近校转化街的"校区—园区—社区"慢行缝合与成果转化驿站 |
| Station F（巴黎） | 全球最大初创园区，开放社区与共享服务 | 共享基础设施 + 开放社区运营降低初创门槛 | 开源协作院的共享工位、路演与社区声誉机制 |
| MaRS 发现区（多伦多） | 研究商业化与概念验证（PoC）枢纽 | PoC—中试—投资的连续转化管道 | 近校转化街的概念验证 / 中试 / 知识产权服务链 |
| Mila（蒙特利尔） | 全球顶尖 AI 研究院校与人才生态 | 开放研究文化 + 人才集聚 + 产学协同 | AI 原点社区的开源发布厅与人才特区服务 |
| 埃因霍温高科技园区（High Tech Campus Eindhoven） | "开放创新"人才生态，强协作网络 | 开放协作环 + 跨机构人才流动 | 开源协作环串联三个重点片区的空间组织 |
| 新加坡 ONE-North（Fusionopolis / Biopolis） | 规划型创新区，工作—生活—居住一体 | 人才居住配套与国际化生活氛围 | 居住生活与人才社区嵌入总体功能组织 |

对标结论：本街区不复制单一模式，而是以"高校策源—开源协作—企业转化—公共体验—国际传播"的链条，把各案例的强项转译为京张一带可运营、可复核的空间与运营对象。

## Logo 与视觉识别设计

命名概念以"原点（Origin）"为母题——京张铁路是中国自主铁路的原点，AI 原点社区是人才与开源协作的新原点。中文名"AI 原点"，拉丁标识"AI ORIGIN"，街区副标识"源·Open Source Loop"。

- 主色：科技深蓝 `#0E4D8C`（呼应京张 heritage 与企业研发）；
- 辅色：开源绿 `#2ECC71`（开放协作环）、活力橙 `#F2994A`（路演与发布）；
- 中性色：石墨灰 `#2B2B2B`、纸白 `#F7F9FB`。
- 字体：中文"思源黑体 / Source Han Sans"，拉丁文"Inter / Helvetica Neue"，兼顾工程感与可读性；版式遵循 8pt 网格。
- 导视系统：以"开源协作环"为母形设计地面标识与指示牌，关键节点设贡献墙（Contribution Wall）与原点灯塔（Origin Beacon）地标。所有图形、字体、肖像、企业标识须有清权来源，无清权不得上墙。

## AI 创新生态体系图谱

以 L0–L5 描述街区的人才与创新行动者层级，每一层对应明确的空间载体与治理角色：

| 层级 | 行动者 | 核心诉求 | 空间载体 |
| --- | --- | --- | --- |
| L0 | 市民 / 访客 | 公共体验、低扰动更新 | 京张遗址公园慢行环、公共空间 |
| L1 | 高校师生 / 研究者 | 成果转化、跨校协作 | 近校转化街、校区—园区慢行 |
| L2 | 开源开发者 / 社区 | 发布、协作、声誉 | 开源协作院、公共代码墙 |
| L3 | 初创 / 孵化团队 | 低成本办公、算力入口 | 众智园共享测试场、端侧算力驿站 |
| L4 | 头部企业 / 平台 | 展示、招聘、国际接待 | 大钟寺国际路演客厅 |
| L5 | 治理 / 投资 / 国际网络 | 标准、资本、传播 | 开源协作环治理节点、国际活动 |

图谱强调层级间"向下开放、向上衔接"：L0/L1 的日常活力为 L2/L3 提供场景与数据，L4/L5 提供资本与标准通道，形成可自我造血的人才生态。

## 实施矩阵与测试验证场景

实施分三期推进，明确区分 100 天征集周期与城市更新建设周期：

| 阶段 | 时间 | 重点动作 | 主要依赖 |
| --- | --- | --- | --- |
| 一期（轻量试点） | 0–12 月 | 开源协作环导视、协作工位软启动、场景开放日 | 公共空间许可、活动安全、版权清权 |
| 二期（更新建设） | 1–3 年 | 近校转化街建成、三处重点片区详细设计落地 | 控规条件、权属、市政、交通 |
| 三期（长期治理） | 3–5 年+ | 人才社区运营、国际活动常态化、治理迭代 | 运营主体、持续资金、数据治理 |

测试验证场景（须记录预期结果与人工复核）：
- TS-01 开源发布厅压力测试：模拟 200 人路演 + 实时代码贡献展示，预期排队时长 < 5 分钟，人工复核容量与消防疏散。
- TS-02 AI 慢行导航无障碍测试：邀请轮椅与视障用户走完协作环，预期断点识别率 ≥ 90%，不采集个人轨迹。
- TS-03 人才撮合试点：100 名高校研究者 × 30 家企业匹配，预期有效对接 ≥ 40 对，数据仅聚合统计。

## 地标与荣誉展示体系

- 原点灯塔（Origin Beacon）：位于 AI 原点核心区的实体地标，作为街区的空间锚与公共体验节点。
- 开源贡献墙（Contribution Wall）：数字 + 实体荣誉墙，展示开源项目、贡献者与企业案例，须全部清权。
- 全球 AI 朝圣路线节点：把遗址文化、开源社区、产业展示串为可步行、可传播的国际体验路线，节点设荣誉铭牌。

## 文化叙事与国际传播策略

叙事主轴："从京张铁路的原点，到 AI 人才的原点"——把铁路自主创新的历史基因转译为 AI 开源协作与人才策源的当代叙事。传播渠道：GitHub 组织主页与开源仓库（代码与文档公开）、开发者社区与 DevPost 式展示、NeurIPS / IJCAI 等国际会议路演、专业媒体与城市品牌联动。所有品牌、字体、图像、肖像、企业标识必须有清权来源；国际传播不得声称政府背书。

## 年度活动体系与长期运营框架

- 全球 AI 人才周（年度）：开源黑客松、PoC 路演日、人才峰会。
- 季度：开源发布厅开放日、近校成果转化对接会。
- 月度：社区慢行与公共体验活动。

运营与可持续矩阵（含真实风险）：运营主体待确认（风险：轻量活动可由社区自组织，重资产依赖政府 / 企业）；资金依赖赞助与场地许可（风险：活动可持续性）；数据治理须 PIPL / GDPR 合规（风险：跨境传播边界）。所有活动须列明频率、责任边界、转化路径与风险，不得只写宣传口号。

## 无障碍包容性与隐私保护

- 遵循 WCAG 2.1 AA：导视、网页与图件提供对比度、文本替代与键盘可达；物理空间保证无障碍慢行环、坡道与休息点。
- 重点群体：老年居民、低收入人才、残障人士、国际访客——提供多语言导视、低门槛参与与免费公共活动。
- 数据隐私：遵循《个人信息保护法》（PIPL）与 GDPR 的数据最小化、目的限定、可解释与人工复核原则；城市智能体不输出未授权个人画像，活动数据仅做聚合统计，敏感数据本地化处理。
"""

EN = r"""

## Global Case Benchmarking

This block centers on "AI Origin talent and open-source collaboration". It benchmarks six real international cases and distills experience applicable to the Jing-Zhang belt (reference / for-further-study only; not government implementation commitments):

| Case | Real positioning | Lesson to borrow | What this package borrows |
| --- | --- | --- | --- |
| Kendall Square (Cambridge / MIT) | Highest talent-density innovation district anchored by MIT | University adjacency + mixed-use + corporate R&D clusters | Near-Campus Transfer Street's campus–park–community slow-stitching and achievement-transfer station |
| Station F (Paris) | World's largest startup campus; open community and shared services | Shared infrastructure and open-community operations lower startup cost | Open-Source Collaboratory's shared seats, roadshows, community-reputation mechanism |
| MaRS Discovery District (Toronto) | Research commercialization and proof-of-concept (PoC) hub | Continuous PoC–pilot–investment pipeline | Near-Campus Transfer Street's PoC / pilot / IP service chain |
| Mila (Montreal) | World-leading AI research institute and talent ecosystem | Open research culture, talent concentration, academia–industry synergy | AI Origin Core's open-source release hall and talent-zone services |
| High Tech Campus Eindhoven | "Open innovation" talent ecosystem with strong collaboration network | Open collaboration loop and cross-institution talent flow | Open-source loop linking the three key areas spatially |
| ONE-North, Singapore (Fusionopolis / Biopolis) | Planned innovation district integrating work–live–stay | Talent residential amenities and international lifestyle | Residential living and talent-community embedding in the overall program |

Conclusion: this package does not copy a single model; it translates each case's strength into operable, verifiable spatial and operational objects along the chain "university origination – open-source collaboration – enterprise translation – public experience – international dissemination".

## Logo & Visual Identity (VI)

The naming concept uses "Origin" as the motif — the Jing-Zhang railway was the origin of China's self-built railways, and the AI Origin community is the new origin of talent and open-source collaboration. Chinese name "AI 原点", Latin mark "AI ORIGIN", sub-mark "源·Open Source Loop".

- Primary: tech deep-blue `#0E4D8C` (echoing Jing-Zhang heritage and enterprise R&D);
- Secondary: open-source green `#2ECC71` (the collaboration loop), vibrancy orange `#F2994A` (roadshows and releases);
- Neutrals: graphite `#2B2B2B`, paper white `#F7F9FB`.
- Type: Source Han Sans (CJK) and Inter / Helvetica Neue (Latin), balancing engineering feel and legibility, on an 8pt grid.
- Wayfinding: the "open-source loop" as the mother shape for ground markings and signage; key nodes carry a Contribution Wall and an Origin Beacon landmark. All graphics, fonts, portraits and corporate marks must be rights-cleared; nothing unclear may go on the wall.

## AI Ecosystem Map

The talent and innovation actor hierarchy is described as L0–L5, each level tied to explicit spatial carriers and governance roles:

| Level | Actor | Core need | Spatial carrier |
| --- | --- | --- | --- |
| L0 | Citizens / visitors | Public experience, low-disturbance renewal | Jing-Zhang heritage slow loop, public space |
| L1 | University students / researchers | Achievement transfer, cross-campus collaboration | Near-Campus Transfer Street, campus–park slow links |
| L2 | Open-source developers / communities | Publish, collaborate, reputation | Open-Source Collaboratory, public code wall |
| L3 | Startups / incubators | Low-cost offices, compute access | Zhongzhiyuan shared test field, edge-compute station |
| L4 | Leading enterprises / platforms | Showcase, recruiting, international hosting | Dazhongsi international roadshow lounge |
| L5 | Governance / investors / international networks | Standards, capital, dissemination | Open-source loop governance node, international events |

The map emphasizes "open downward, connect upward" between levels: L0/L1 everyday vitality feeds L2/L3 with scenes and data, while L4/L5 provide capital and standards, forming a self-sustaining talent ecosystem.

## Implementation Matrix & Test Scenarios

Implementation proceeds in three phases, clearly separating the 100-day call period from the urban-renewal construction period:

| Phase | Time | Key actions | Main dependencies |
| --- | --- | --- | --- |
| Phase 1 (lightweight pilot) | 0–12 mo | Loop wayfinding, soft-launch of collaboration seats, scenario open days | Public-space permit, event safety, rights clearance |
| Phase 2 (renewal build-out) | 1–3 yr | Near-Campus Transfer Street built, three key-area detailed designs delivered | Regulatory conditions, ownership, municipal, transport |
| Phase 3 (long-term governance) | 3–5 yr+ | Talent-community operations, normalized international events, governance iteration | Operating entity, sustained funding, data governance |

Test scenarios (record expected outcomes and human review):
- TS-01 Open-source release hall stress test: simulate 200-person roadshow + live code-contribution display; expected queue < 5 min; human review of capacity and fire evacuation.
- TS-02 AI walk-navigation accessibility test: invite wheelchair and visually-impaired users through the loop; expected gap-detection rate ≥ 90%; no personal trajectories collected.
- TS-03 Talent matchmaking pilot: 100 researchers × 30 enterprises; expected ≥ 40 valid matches; data aggregated only.

## Landmarks & Honor System

- Origin Beacon: a physical landmark at the AI Origin Core, serving as the block's spatial anchor and public-experience node.
- Contribution Wall: a digital + physical honor wall showcasing open-source projects, contributors and enterprise cases, all rights-cleared.
- Global AI pilgrimage-route node: links heritage culture, open-source community and industry showcase into a walkable, communicable international experience route, with honor plaques at nodes.

## Cultural Narrative & Communications

Narrative spine: "From the origin of the Jing-Zhang railway to the origin of AI talent" — translating the railway's self-reliance heritage into the contemporary story of AI open-source collaboration and talent origination. Channels: a GitHub organization home with public repositories (code and docs), developer communities and DevPost-style showcases, roadshows at international conferences such as NeurIPS and IJCAI, and city-brand media partnerships. All brand, font, image, portrait and corporate marks must be rights-cleared; international communication must not claim government endorsement.

## Annual Activities & Long-term Operations

- Global AI Talent Week (annual): open-source hackathon, PoC roadshow day, talent summit.
- Quarterly: open-source release-hall open days, near-campus achievement-transfer matchmaking.
- Monthly: community slow-mobility and public-experience activities.

Operations & sustainability matrix (with real risks): operating entity to be confirmed (risk: lightweight events can be community-run, but heavy assets depend on government/enterprise); funding relies on sponsorship and venue permits (risk: event sustainability); data governance must meet PIPL/GDPR (risk: cross-border dissemination boundary). Every activity must state frequency, responsibility boundary, conversion path and risk — no slogan-only copy.

## Accessibility & Privacy

- WCAG 2.1 AA: signage, web pages and figures provide contrast, text alternatives and keyboard access; physical space guarantees an accessible slow loop, ramps and rest points.
- Priority groups: elderly residents, low-income talent, persons with disabilities, international visitors — multilingual signage, low-threshold participation and free public activities.
- Data privacy: follow the Personal Information Protection Law (PIPL) and GDPR principles of data minimization, purpose limitation, explainability and human review; the civic agent outputs no unauthorized personal profiles, activity data is aggregated only, and sensitive data is processed locally.
"""

import os
base = os.path.dirname(os.path.abspath(__file__))
for fnm, txt in (("proposal.md", ZH), ("proposal.en.md", EN)):
    p = os.path.join(base, fnm)
    s = open(p, encoding="utf-8").read()
    if "## 全球案例对标" in s:
        print("already appended:", fnm); continue
    if not s.endswith("\n"):
        s += "\n"
    s += txt
    open(p, "w", encoding="utf-8").write(s)
    print("appended to", fnm, "new length", len(s))
