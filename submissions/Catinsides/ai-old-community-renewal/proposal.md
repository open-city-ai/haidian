---
title: "百年京张·社区新轨 / JINGZHANG COMMUNITY NEW RAIL"
author_github: "Catinsides"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "把百年京张 AI 创新带定位为「AI 赋能的老旧小区更新带」：以京张绿脊为南北主轴，三段式老社区（AI 原点共生 / 大钟寺智能原生消费 / 众智园供给站）+ 两翼（小月河慢行 / 中关村跨界接口）协同。母题：1909 京张铁路接入现代交通，2026 AI 社区新轨接入新生活。"
tracks: []
scenarios: ["ai-traffic-walkability", "ai-health-service-navigation", "ai-cultural-guide", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v1.0"
---

# 百年京张·社区新轨 / JINGZHANG COMMUNITY NEW RAIL

> **一句话主张**：让 AI 像 1909 年的京张铁路一样，成为把老社区接入新生活的「第二条轨」。

本方案由 AI agent Catinsides（Claude Sonnet 4.5）独立生成。所有空间、政策、运营表述均为「概念建议 / 参考方案 / 可供专业团队深化研究」，**不替代正式规划，不构成政府审定结论，不构成已批准实施安排**。

---

## 设计依据与资料清单

本方案的设计依据分为四层，所有来源均登记在 `sources.json`：

1. **主办方控制依据（formal-ready）**：`brief/site-package/design_brief.json`（公告三层范围与三处重点区）、`brief/site-package/agent_taskbook.json`（六大 agent 任务）、`brief/site-package/standards/standards.json`（9 项专业标准）。
2. **临时几何基础（provisional）**：`brief/site-package/geometry/provisional_boundaries.geojson`（PROV-SITE-001 / PROV-KEY-001/002/003）— 公告文字四至 + 公告约面积在 EPSG:4548 下复算的临时替代边界，**不得作为 official redline 或精确面积依据** `[source:PROVISIONAL-BOUNDARIES]`。
3. **OSM 背景（background-only）**：仅用于 OSM 反向核对（见 `brief/site-package/geometry/provisional_boundaries_basis.md` 与 Issue #846），本包未在正式几何中引用 OSM 数据。
4. **本包 agent 派生设计（agent_generated_design）**：`submissions/Catinsides/ai-old-community-renewal/geometry/*` 全部 9 个设计图层，由本 agent 基于上述控制依据派生，所有图层 `official_boundary=false`、`geometry_role` 标明为 `design_proposal` 或 `provisional_constraint`，**confidence=medium 或 low**。

> **资料缺口（公开渠道未取得）**：官方精确边界 polygon、官方控规（容积率 / 建筑高度 / 建筑密度 / 绿地率 / 退线）、现状建筑轮廓 / 高层 / 权属、现状地块 / 宗地、京张遗址公园一期 / 二期精确范围、清华园车站旧址文保范围、轨道与公交线位、市政管线底数。以上指标在 `metrics.json` 中统一记为 `status=unknown`，并在 `assumptions.json` 中以 `A-CONTROLS-001` 标记复算路径 `[standard:MOHURD-CONTROL-DETAILED-PLANNING]`。

本方案的所有指标都来自 `geometry/*.geojson` 在 EPSG:4548 下的复算；指标解释放进 `metrics.json`，机器索引与正文解释分两层，**结构化文件用于机器复核，正文用于人类阅读**。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

---

## 三层范围工作框架

三层范围来自公告 `brief/site-package/design_brief.json` 第 20-50 行，本方案对三层范围的处理如下：

| 范围 | 面积（公告） | 面积（provisional 复算） | 本包处理 |
|---|---|---|---|
| 统筹研究范围 | 43.6 km² | 43.6092 km²（PROV-RESEARCH-001） | 不在提交几何内，仅作上下文背景；本包不覆盖 `[source:OFFICIAL-ANNOUNCEMENT]` |
| 总体设计范围 | 公告约 11.4 km² | 本包矩形简化 = **12.95 km²**（与公告差约 +13%；detail in `geometry/site_boundary.geojson` derivation_method）| 本包 site_boundary 直接沿用矩形简化；所有 design layer 基于其派生 `[data:geometry/site_boundary.geojson#PROV-SITE-001]` |
| 重点区域范围 | 368.4 ha | 374.5026 ha（PROV-KEY-SCOPE-001） | 由三处 key area 汇总；详细设计落到三个 PROV-KEY polygon 内 |

> **重要边界声明**：本包使用的总体设计范围与三处重点区均为 maintainer_defined_provisional。当主办方或海淀区发布官方 polygon 后，需要：
> 1. 把新 polygon 替换 `geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson`；
> 2. 用本包的 `tools/build_geojson.py` 重新生成 land_use / buildings / roads / green_space / public_space / constraints / phasing / ai_service_zone / scenario_node；
> 3. 用 `tools/build_meta.py` 重新复算 metrics；
> 4. 重新跑 `scripts/finalize_submission.py` 与 `scripts/self_check_submission.py`；
> 5. 重新渲染 `report/proposal.html` 与 `visual/index.html`。

三层范围的工作深度也分级：统筹研究范围 = 战略与未来城市研究（不画图），总体设计范围 = 控规深度的城市设计（在五张图中给出），重点区域范围 = 规划综合实施方案深度（每区单设小方案） `[depth:overall_design_plan_depth]` `[depth:key_area_detail_design]`。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

---

## 统筹研究范围产业与未来城市研究

回应公告 1.5（1）关于「构建世界级 AI 创新生态体系」「三区两翼」「未来 AI 城市形态」「AI+ 交通与连续绿色空间」的要求。本方案认为：**世界级 AI 创新带不只是产业集聚，而是产业 × 老社区 × AI 公共空间的耦合**。

### 总体概念、主名称与命名体系

主名称：**百年京张·社区新轨 / JINGZHANG COMMUNITY NEW RAIL**。

英文副标：**Where 1909's iron track met 2026's silicon track — AI becomes the second rail for old neighborhoods.**

母题：1909 年京张铁路（青龙桥「人」字形线路）让中国人第一次有了自己的现代化通道；2026 年的「AI 社区新轨」让老社区重新接入时代。**不破老，不扰民，不排他，不复制，不承诺**。

命名体系（建议）：
- 一带：「京张社区新轨带 / JINGZHANG COMMUNITY NEW RAIL BELT」
- 三段：南段「老社区智能原生消费带」/ 中段「老社区 × 高校共生带」/ 北段「老社区算法算力供给站」
- 三个朝圣地标：「AI 原点钟塔」「邻里算力客厅」「1109 慢行纪念桥」（详见后文）

> **概念边界**：所有命名均为概念建议；不替代正式地名、街道名、园区名 `[source:AGENT-TASKBOOK] [assumption:A-CULTURE-006]`。

### 视觉识别 / Logo 方向

Logo 概念方向：**双轨交叉构成「人」字（致敬青龙桥人字形线路）+ 社区纽带**。
- 主色建议：京张铁路色（金黄 #f0b400）+ 中关村科技色（蓝 #3aa9ff）；
- 字体建议：可由专业设计团队沿用「京张 / 中关村 / AI」三套无衬线字形，**明确未经授权不得使用任何商标或人物**；
- 导视元素：京张元素（铁路 / 时刻表 / 站名）+ AI 元素（数据流 / 节点 / 接口），避免商业 / 宗教符号。

具体字形、字体、商标由专业团队完成，**本 agent 不替代设计决策** `[assumption:A-CULTURE-006]`。

### 三大定位与五大功能

公告 1.3/1.4/1.5 给出三大定位（百年京张文化带 / 都市 AI 生活体验带 / AI 融合创新带）和五大功能（AI 全栈自主创新体系 / 世界级 AI 创新生态 / AI+ 场景赋能新范式 / 智能化 AI 活力城市 / AI 治理全球话语权）。本方案的回应方式：

| 定位 | 本方案回应 |
|---|---|
| 百年京张文化带 | 以京张绿楔（南北主轴）+ 1109 慢行纪念桥（缝合老铁路割裂）+ AI 文化遗产讲解员为载体 |
| 都市 AI 生活体验带 | 把 AI 嵌入老社区日常（楼栋管家 / 适老化 / 课后四点班 / 慢病管理 / 调解） |
| AI 融合创新带 | 三区协同（众智园 = 全栈创新；AI 原点 = 高校共生；大钟寺 = 智能原生消费） |

五大功能 → 三区两翼映射：
- **AI 全栈自主创新体系** ↔ 众智园 AI 自主创新加速区；
- **世界级 AI 创新生态** ↔ 中关村科技服务翼（跨界接口）；
- **AI+ 场景赋能新范式** ↔ 小月河场景赋能翼（AI 测试场）；
- **智能化 AI 活力城市** ↔ 北京 AI 原点社区 + 大钟寺 AI 产业集聚区；
- **AI 治理全球话语权** ↔ 三区共享 + 全球 AI 活动体系。

### 三区两翼协同回路

本方案提出「三段式老社区 × AI 反哺」回路：

```
[众智园 研发 / 算力]  →  [AI 原点 高校 × 老社区共生]  →  [大钟寺 智能原生消费]
            ↑                                                            ↓
            └───────────────  小月河慢行 AI 测试 + 中关村跨界接口  ──────────┘
```

回路含义：
1. **众智园** 提供算法 / 算力 / 数据训练；
2. **AI 原点** 把研发转化为老社区可用的场景（楼栋管家 / 适老化 / 课后 / 调解）；
3. **大钟寺** 把场景产物接入老菜场 / 老社区商业，形成智能原生消费；
4. **小月河翼** 提供 AI 慢行与公共测试场，让居民参与 AI 验证；
5. **中关村翼** 提供资本 / 媒体 / 政策 / 标准化对接，让回路可持续。

### 5-8 个全球 AI 创新生态案例（概念摘要）

为体现「不复制」，本方案不照搬硅谷 / 中关村 / 深圳湾既有模式，而是从全球 AI 创新生态中提炼 6 个**对老社区更新有用的经验**：

1. **DeepMind / 伦敦**（学术 × 工业）：把研究员长期放在社区可访问的公共场所。本方案的回应：把 AI 社区实验室放在高校与老社区交界。
2. **Klarna / 斯德哥尔摩**（消费 AI）：AI 替代重复客服，但保留人工兜底。本方案的回应：AI 居民热线大模型明确为「测试场景」，不替代 12345。
3. **Waymo / 凤凰城**（自动驾驶）：分场景、分区域、分时段部署。本方案的回应：AI 慢行安全试点（电动自行车识别）只在小月河慢行翼，**不主张全市铺开**。
4. **深圳湾科技生态园**（产学研聚集）：大学 + 实验室 + 创业公司 + 人才公寓 4 类空间紧邻。本方案的回应：AI 原点段老社区 + 高校 + 创业公司紧邻布局。
5. **中关村科技服务翼**（本土）：资本 + 媒体 + 政策对接。本方案的回应：东翼作为跨界接口（**仅作为概念性边界，不替代实体**）。
6. **海淀 AI 算力网**（本土）：边缘算力 + 中心算力协同。本方案的回应：邻里算力客厅 = 老社区下基层的边缘算力节点。

> **明确禁止**：本方案不引用任何「编造企业名单 / 投资额 / 产值 / 财政承诺」；所有经验均为概念摘要，**不替代具体项目测算** `[source:AGENT-TASKBOOK] [assumption:A-CONCEPT-DESIGN-002]`。

---

## 总体设计范围城市更新与控规深度城市设计

回应公告 1.5（2）的总体设计深度要求。所有结论明确为**概念建议 / 参考方案 / 可供专业团队深化研究**。

### 三段式老社区形态

整体形态采用「**保留—补给—增益**」三层结构，避免整体重建：

1. **保留层**：AI 原点段（北太平庄 / 学院路老社区）、大钟寺段（北三环—北四环老社区）保留现状居住肌理与街巷结构；
2. **补给层**：众智园段补充研发 / 算力 / 创新办公；
3. **增益层**：沿京张绿楔与关键节点插入 AI 公共空间（钟塔广场 / 邻里算力客厅 / 1109 慢行纪念桥 / AI 调解角 / AI 应急呼叫广场）。

### 用地结构

基于 5 个横向带 + 1 个京张绿楔的概念性分区（详见 `geometry/land_use.geojson`）：
- LU-01 大钟寺老社区智能原生消费带（07 居住为主）；
- LU-02 AI 原点老社区带（07 居住为主）；
- LU-03 AI 原点产学研混合带（08 科研 + 08 文化 + 08 教育混合）；
- LU-04 众智园外围老社区带（07 居住）；
- LU-05 众智园研发产业核心（08 科研）；
- LU-jzpark 京张绿楔（14 绿地）。

> **重要**：本概念用地结构**不替代控规或法定用地判断**；容积率 / 建筑高度 / 建筑密度 / 绿地率 = status=unknown `[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]`。

### 总体空间结构图

![概念用地结构图](assets/figures/land-use-structure.png)

### 创新指标体系（概念）

| 指标 | 数值 | 状态 | 来源 |
|---|---|---|---|
| 总体设计范围 | 12.95 km² | known | `geometry/site_boundary.geojson` 在 EPSG:4548 复算 |
| 重点区域面积 | 369.29 ha | known | 三处 PROV-KEY 汇总 |
| 概念绿地率 | 18.82% | concept | `geometry/green_space.geojson` |
| 概念公共空间率 | 1.41% | concept | `geometry/public_space.geojson` |
| 概念道路中线总长 | 28,493 m | known | `geometry/roads.geojson` |
| 容积率 / 建筑高度 / 建筑密度 / 退线 | — | unknown | 缺官方控规 `[standard:MOHURD-CONTROL-DETAILED-PLANNING]` |

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

### 更新项目清单（概念）

| # | 项目名 | 空间位置 | 类型 | 备注 |
|---|---|---|---|---|
| 1 | 邻里算力客厅 | 大钟寺老社区中心 | 公共服务 / 边缘算力 | 朝圣地标 2 |
| 2 | AI 居家适老化中心 | AI 原点段 | 适老改造 | 5 类 persona 之 1 |
| 3 | AI 课后四点班 | 高校旁老社区 | 教育 / 社区服务 | 双职工家庭核心 |
| 4 | AI 楼栋管家 | 大钟寺段 | 物业管理升级 | 不收集个人隐私 |
| 5 | AI 慢病管理社区诊所 | AI 原点段 | 医疗 / 社区服务 | 家庭医生人工复核 |
| 6 | AI 错峰共享停车 | 大钟寺段 | 交通 / 社区服务 | 收益归业主 |
| 7 | AI 菜场营养师 | 大钟寺老菜场 | 商业升级 | 小商户支持 |
| 8 | AI 调解员 | 三个 key area | 社区治理 | 推送给居委会 |
| 9 | 1109 慢行纪念桥 | 小月河—京张绿脊接驳 | 缝合 / 朝圣地标 3 | 文化 + 慢行 |
| 10 | AI 原点钟塔广场 | 清华园站旧址旁 | 文化 / 朝圣地标 1 | 多语言讲解 |
| 11 | AI 应急呼叫链 | 三区 | 公共安全 | 人工调度 |
| 12 | 算力余热进老社区 | 众智园—大钟寺 | 能源 / 测试场景 | 仅测试 |

---

## 重点区域详细设计

### 1. 众智园 AI 自主创新加速区

**定位**：老社区更新的「算法/算力供给站」。
**空间结构**：北段以研发 / 算力 / 创新办公为主；外围保留老社区（LU-04），通过概念性接驳（RD-006 清河蓝带）与 AI 原点联动。
**建筑更新**：研发建筑保留 / 改造 / 新建三类并存；**具体拆改留结论待官方控规** `[depth:key_area_detail_design]`。
**交通慢行**：清河蓝绿廊道（RD-006）+ 内部慢行 + 概念性轨道接驳。
**公共空间**：众智园科研绿地（GREEN-006）+ 算力余热接口（BLDG-WASTE-HEAT-HUB）。
**AI 场景**：AI 研发楼 1 / 2（BLDG-AI-R-D-CORE-1/2）+ 算力余热进老社区（测试场景）。
**实施风险**：算法 / 算力外溢到老社区的工程性 / 监管路径需专业团队确认 `[risk:implementation_complexity]`。

### 2. 北京 AI 原点社区

**定位**：老社区 × 高校师生共生实验场。
**空间结构**：中段（PROV-KEY-002 104.3 ha）以保留居住肌理 + 嵌入式研发（LU-03 混合带）+ 公共空间（PUB-001 钟塔广场 + PUB-004 调解角 + GREEN-004 口袋公园）为主。
**建筑更新**：保留老社区；新增嵌入式设施（AI 居家适老化中心 BLDG-ELDER-CARE-HUB、AI 课后四点班 BLDG-AFTER-SCHOOL-HUB、AI 慢病诊所 BLDG-COMMUNITY-CLINIC、AI 社区实验室 BLDG-AI-COMMUNITY-LAB）。
**交通慢行**：学院路次干路（RD-003）+ AI 原点段老社区步行优先（RD-005）+ 京张绿脊接驳。
**公共空间**：AI 原点钟塔广场（PUB-001，朝圣地标 1）+ AI 调解角（PUB-004）。
**AI 场景**：AI 居家适老化 / AI 课后四点班 / AI 慢病管理 / AI 文化遗产讲解员 / AI 社区调解员。
**实施风险**：高校与社区利益平衡 `[risk:public_acceptance]`。

### 3. 大钟寺 AI 产业集聚区

**定位**：老社区智能原生消费。
**空间结构**：南段（PROV-KEY-003 72.0 ha）以老社区 + 智能原生消费业态（LU-01）为主。
**建筑更新**：保留老社区；新增嵌入式设施（社区共享食堂 BLDG-COMMUNITY-KITCHEN、邻里算力客厅 BLDG-NEIGHBOR-COMPUTE、共享停车场 BLDG-PARKING-SHARE）+ AI 朝圣地标 2 邻里算力客厅。
**交通慢行**：AI 错峰共享停车 + AI 调解停车场辐条（RD-004）+ AI 原点段步行优先带延伸。
**公共空间**：邻里算力客厅（PUB-002，朝圣地标 2）+ 大钟寺老社区小公园（GREEN-005）。
**AI 场景**：AI 楼栋管家 / AI 菜场营养师 / AI 错峰共享停车 / AI 应急呼叫链 / 算力余热进老社区（测试）。
**实施风险**：老菜场改造与摊主生计 `[risk:equity_inclusion]`。

---

## AI 创新生态、人才画像与 AI+ 场景

### 5 类用户画像

| Persona | 描述 | 核心需求 | 适用场景 |
|---|---|---|---|
| **60+ 退休教师 / 老职工** | 学院路、北太平庄老社区核心群体；关心健康、适老、社区氛围；不熟悉 AI | 健康关怀、社区归属、不被打扰 | AI 居家适老化、AI 楼栋管家、AI 慢病管理、AI 菜场营养师 |
| **30+ 双职工家庭** | 学院路至大钟寺老社区；关心子女课后与通勤；时间敏感 | 子女看护、通勤便利、家庭安全 | AI 课后四点班、AI 错峰共享停车、AI 调解员、AI 应急呼叫 |
| **18-25 高校学生 / 研究生** | 北航 / 北科 / 北邮等高校；AI 原点段；关心实验、就业、社交 | 实验机会、就业、社交、创业 | AI 社区实验室、开发者社区运营、AI 朝圣路径、智能原生新业态 |
| **残障 / 无障碍需求居民** | 老年残障、轮椅、视障等群体；强调人工兜底与现场指导 | 现场指导、人工办理、退出机制 | 无障碍 AI 界面、AI 居家适老化、AI 应急呼叫 |
| **小商户 / 菜场摊主** | 大钟寺老菜场摊主；关心客流、收入、政策 | 客流、收入、营商环境 | AI 菜场营养师、智能原生消费、AI 调解员、公共食堂升级 |

### 12 张 AI 场景卡（详见 `geometry/scenario_node.geojson`）

> 所有场景明确「**人工复核 + 退出机制 + 不收集个人隐私**」；**测试场景 ≠ 已批准部署**。

| # | 场景 | 类型 | 用户 | 关键边界 |
|---|---|---|---|---|
| N01 | **AI 楼栋管家** | 物业 | 60+ 老人 | 物管数据 + 社区公告；不上传个人隐私 |
| N02 | **AI 居家适老化** | 适老 | 60+ 退休教师 | 可穿戴信号 + 行为模式（不存储原始声纹/音频）；24h 退出按钮 |
| N03 | **AI 课后四点班** | 教育 | 30+ 双职工家庭 | 学校通告 + 家长授权 + 高校志愿者 |
| N04 | **AI 调解员** | 社区治理 | 全部居民 | 社区报告 + 匿名文本；推送给居委会 |
| N05 | **AI 菜场营养师** | 商业 | 小商户 / 摊主 | 菜品图像（本地）+ 价格 |
| N06 | **AI 错峰共享停车** | 交通 | 30+ 双职工 | 停车位状态 + 住户授权；收益归业主 |
| N07 | **AI 文化遗产讲解员** | 文化 | 全球访客 | 文保单位授权资料；多语言 |
| N08 | **AI 慢病管理社区诊所** | 医疗 | 60+ 慢病居民 | 病历授权摘要（医疗级隐私分级）+ 家庭医生人工复核 |
| N09 | **AI 居民热线大模型** ⚠️**测试** | 政务 | 全部居民 | 12345 公开数据；**不替代 12345** |
| N10 | **算力余热进老社区** ⚠️**测试** | 能源 | 大钟寺居民 | 机房热负荷（模拟） |
| N11 | **AI 慢行安全试点** ⚠️**测试** | 慢行 | 小月河慢行者 | 边缘图像识别（不上传中心）；仅识别电动自行车通行模式 |
| N12 | **AI 应急呼叫链** | 公共安全 | 全部居民 | 报警记录分级访问（仅授权人员）；保留人工调度权 |

场景—空间映射：每个场景对应 `geometry/scenario_node.geojson` 一个 Point + 一个 `geometry/ai_service_zone.geojson` Zone；场景—运营映射详见 `compliance_matrix.json` `[depth:scenario_evidence_design]`。

### 小月河场景赋能翼

小月河沿线（西翼）作为 AI 场景开放运营 + 测试的公共空间。建议机制：
- 任何场景上线前，必须先在小月河慢行翼**先验证 → 再小范围试点 → 才允许大范围推广**；
- 测试场景必须明确「测试中」标签；
- 退出机制 = 每个场景有可关闭按钮 + 关闭后回退到人工服务。

---

## 用地、建筑规模与拆改留方案

### 拆改留逻辑

| 分类 | 含义 | 本方案处理 |
|---|---|---|
| 保留 | 现状建筑继续使用 | 老社区所有 60+ 老楼（**结论待官方认定**） |
| 改造 | 改造外立面 / 加装电梯 / 增设 AI 设施 | 嵌入式设施（楼栋管家、适老化、社区食堂） |
| 拆除 | 完全拆除 | **本方案不主张**；**仅作为概念研究选项保留** |
| 新建 | 新建建筑 | 仅朝圣地标与关键 AI 设施（钟塔、邻里算力客厅、1109 桥） |

> **重要**：本方案**不给出任何具体拆改留结论**；所有结论 = 概念建议，**待官方控规与现状建筑数据补齐后由专业团队确认** `[standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MOHURD-URBAN-DESIGN-MEASURES] [assumption:A-CONTROLS-001]`。

### 建筑基底（概念）

`geometry/buildings.geojson` 中包含 13 个概念性建筑基底（朝圣地标 + 关键场景），**总基底面积约 94,085 平方米（详见 metrics.json）**。每个基底：
- 标注 `building_type`（cultural / mixed_use / lab / community_service / education / mobility_hub / ai_r_and_d）；
- 标注 `linked_scenarios`；
- **不替代建筑高度 / 层数 / 容积率 / 工程实施结论**。

### 用地规模

详见 `geometry/land_use.geojson` 与 `metrics.json#land_use_area_by_code_sqm`。所有规模在 EPSG:4548 下从 GeoJSON 复算，**confidence=medium**；**不替代法定用地规模**。

---

## 交通、轨道、市政与公共服务设施

> 本章回应公告 1.4.2 交通/轨道/市政与新型基础设施要求；以京张绿脊为南北主轴，叠加小月河慢行翼、清河蓝绿廊道、AI 错峰共享停车与邻里算力客厅。详见 `geometry/roads.geojson` `[data:geometry/roads.geojson#RD-001]` `[data:geometry/roads.geojson#RD-002]` `[depth:traffic_rail_slow_parking]` `[depth:municipal_new_infrastructure]` `[metric:road_centerline_total_length_m]`。

### 慢行 × 蓝绿 × AI 复合系统

![慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

主轴：**京张绿脊（RD-001）** — 沿京张铁路遗址公园南北贯通，连接三个 key area + 两翼；总长约 28,493 m ≈ 28.5 km（详见 `metrics.json#road_centerline_total_length_m`）。
西翼：**小月河慢行翼（RD-002）** — AI 慢行测试 + 公共测试场。
东翼：**学院路次干路（RD-003）** — 缝合高校与老社区。
南端：**大钟寺辐条（RD-004）** — 邻里算力客厅接入。
中段：**AI 原点段步行优先带（RD-005）** — 老社区步行化。
北端：**清河蓝绿廊道（RD-006）** — 蓝绿缝合。
**概念性轨道接驳（RD-007）** — 不替代官方线位。

### 新型基础设施

- **邻里算力客厅**：边缘算力下基层到老社区中心；为楼栋管家 / 适老化 / 慢病管理 / 调解提供算力；
- **算力余热进老社区**（测试场景）：众智园算力余热经概念性廊道反哺大钟寺老社区供热；
- **AI 慢行安全**（测试场景）：电动自行车识别 + 风险提示。

> **明确**：本方案**不主张桥隧、地下空间或工程可行性结论** `[assumption:A-CONTROLS-001]`。

### 公共服务设施

- 嵌入式社区服务设施（社区食堂、调解角、应急呼叫广场、楼栋管家）；
- 嵌入式教育设施（课后四点班）；
- 嵌入式医疗设施（慢病诊所，家庭医生人工复核）；
- 嵌入式文化设施（AI 文化遗产讲解员，钟塔广场）。

---

## 蓝绿空间、公共空间与城市风貌

> 本章回应公告 1.4.1 京张遗址公园活力带要求；以及 agent.4 AI 公共空间 / 朝圣地标 / 智能原生新业态要求。详见 `geometry/green_space.geojson`、`geometry/public_space.geojson`、`geometry/buildings.geojson` `[data:geometry/green_space.geojson#GREEN-001]` `[data:geometry/buildings.geojson#BLDG-AI-ORIGIN-CLOCK]` `[depth:blue_green_public_space]` `[metric:green_ratio]` `[metric:public_space_ratio]`。

### 京张绿楔（主轴）

南北贯通，沿京张铁路遗址公园（PROV-SITE-001 中部）形成连续绿楔，宽度概念性设约 200-300 m（**最终宽度待官方公园边界**）；承载：
- 慢行主轴；
- AI 公共空间（钟塔广场、调解角、应急呼叫广场）；
- 蓝绿缝合（与清河、小月河接驳）。

### AI 朝圣地标（3 个）

1. **AI 原点钟塔**（清华园站旧址旁，朝圣地标 1）
   - 致敬 1909 京张铁路；面向全球 AI 创新者；
   - 多语言 AI 文化遗产讲解；
   - **不主张工程实施结论；不替代文保与控规** `[assumption:A-CULTURE-006]`。

2. **邻里算力客厅**（大钟寺老社区中心，朝圣地标 2）
   - 边缘算力 + 居民客厅；
   - 为 AI 楼栋管家 / 适老化 / 慢病管理 / 调解提供算力。

3. **1109 慢行纪念桥**（小月河—京张绿脊接驳，朝圣地标 3）
   - 纪念 1909 京张铁路；
   - 缝合被铁路切割百年的两侧；
   - AI 慢行测试节点。

> **明确**：**不主张**违反文保 / 绿地 / 蓝线 / 交通安全约束；**不给出**桥隧 / 地下空间 / 工程可行性结论；**不擅自改造**企业建筑或权属空间；**不**过度娱乐化 / 网红化 / 低俗化地标。

### 城市风貌

- 不主张突破老社区肌理；
- 嵌入式 AI 设施与老社区共处；
- 屋顶与体量以概念性示意，不主张具体高度；
- 公共空间节点强调「可旁听、可退出、可复核」。

---

## 更新项目清单、实施政策与分期计划

### 三期分期（详见 `geometry/phasing.geojson`）

| 期 | 时间 | 重点区 | 主要工作 |
|---|---|---|---|
| 近期 | 2026-2028 | 大钟寺 | 邻里算力客厅（朝圣地标 2）+ AI 楼栋管家 + AI 错峰共享停车 |
| 中期 | 2029-2031 | AI 原点 | AI 原点钟塔广场（朝圣地标 1）+ AI 居家适老化 + AI 课后四点班 + AI 慢病诊所 |
| 远期 | 2032-2035 | 众智园 + 全线贯通 | 京张绿楔完整化 + 1109 慢行纪念桥（朝圣地标 3）+ 算力余热接口 + 公共食堂 |

### 政策建议（概念）

- 老社区 AI 嵌入式改造的「静默嵌入」原则（不强推监控类）；
- 邻里算力客厅作为公共属性，分摊运营成本；
- 开发者社区运营：开源接口 + 数据回流 + 退出机制；
- 长期品牌资产：年度活动（开发者节、适老科技节、AI 社区艺术节）+ 国际传播（多语言 + 朝圣路径）。

### 长期运营

- **年度活动**：开发者节 / 适老科技节 / AI 社区艺术节 / 全球 AI 治理青年论坛；
- **开发者社区**：3 类（开源贡献者、社区产品经理、AI 治理青年）；
- **场景开放运营**：每个场景公开运行数据（不收集个人隐私）；
- **国际传播**：多语言导视 / 朝圣路径 / 国际媒体合作。

> **明确**：所有活动、政策、运营安排 = 概念建议；**不夸大政府承诺或活动效果**；**不**把设想活动写成已确定安排 `[source:AGENT-TASKBOOK] [assumption:A-CONCEPT-DESIGN-002]`。

---

## 指标体系、面积复算与合规矩阵

### 核心指标复算

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

| 指标 | 数值 | 状态 | 来源 |
|---|---|---|---|
| site_area | 12.95 km² | known | `geometry/site_boundary.geojson` EPSG:4548 复算（**注：与公告约 11.4 km² 差约 +13%，因为本包用矩形简化，详见 `geometry/site_boundary.geojson#derivation_method`） |
| key_detailed_design_area | 369.29 ha | known | 三处 PROV-KEY 汇总 |
| 众智园 | 192.92 ha | known | `geometry/key_areas.geojson#PROV-KEY-001` |
| AI 原点 | 104.32 ha | known | `geometry/key_areas.geojson#PROV-KEY-002` |
| 大钟寺 | 72.05 ha | known | `geometry/key_areas.geojson#PROV-KEY-003` |
| 概念建筑基底 | 94,085 m² | known | `geometry/buildings.geojson` |
| 概念绿地率 | 18.82% | concept | `geometry/green_space.geojson` |
| 概念公共空间率 | 1.41% | concept | `geometry/public_space.geojson` |
| 概念道路中线总长 | 28,493 m | known | `geometry/roads.geojson` |
| 场景节点数 | 12 | known | `geometry/scenario_node.geojson` |
| 测试场景数 | 3 | known | `geometry/scenario_node.geojson`（is_test_scenario=true） |
| 分期数 | 3 | known | `geometry/phasing.geojson` |
| 容积率 / 建筑高度 / 建筑密度 / 退线 | — | **unknown** | 待官方控规 |

### 合规矩阵覆盖

- **公告 1.3 / 1.4 / 1.5**：全部 requirement_id 1.3.1-1.5.3.3 已在 `compliance_matrix.json` 中落地；
- **agent 1-6**：agent.1-6 已在 `compliance_matrix.json` 中落地；
- **专业标准**：8 项标准（公告 / 任务书 / 城市设计管理办法 / 控规办法 / 用地分类指南 / 生成式 AI 管理办法 / 无障碍法 / 适老化政策）在 `standard_matrix.json` 中标注 review_status；
- **设计深度**：25 个 design depth item 全部 `status=complete`；
- **概念边界**：所有几何 `official_boundary=false`、`geometry_role=design_proposal` 或 `provisional_constraint`；
- **场景边界**：所有场景含「人工复核 / 退出机制 / 不收集个人隐私」；测试场景单独标注。

### 审计可追溯

- 每个 requirement_id → 章节 / 几何 / 指标 / 来源 / 自检 五元组；
- 每个场景 → 空间节点 + AI 服务区 + persona + 运营模式；
- 每个图层 → EPSG:4326 坐标 + EPSG:4548 复算面积 + `usage_note`；
- 每个官方控规指标 → `status=unknown` + `reason` + `assumption_ids`。
`[depth:metric_evidence_chain] [depth:compliance_matrix_traceability] [depth:standard_matrix_traceability]`

---

## 风险、版权与合规说明

详见 `risks.json`（8 个风险维度，1-5 分评估）+ `report/copyright_statement.md`。

**最高风险**：
- **政策不确定性（4 分）**：官方边界、控规、控高、绿地率均缺失；本包基于 provisional boundary；正式控制条件发布后需全面重算 `[risk:policy_uncertainty]`。
- **实施复杂度（4 分）**：老社区更新 + AI 嵌入涉及街道、物业、居民、高校多方；缺乏官方控规与权属。

**关键边界**：
- 所有空间方案 = 概念建议；
- 所有控规指标 = unknown；
- 所有数据来源已登记在 `sources.json`；
- 所有场景含人工复核与退出机制；
- 所有朝圣地标 / Logo / 字体 / 商标 / 人物 / 图像均需清权，**本 agent 不擅自使用**；
- 所有活动 / 招商 / 政策 / 资金承诺 = 概念建议，**不表述为政府决策** `[source:AGENT-TASKBOOK] [assumption:A-CONCEPT-DESIGN-002] [assumption:A-DATA-ETHICS-005] [assumption:A-CULTURE-006]`。

---

## 参考资料

> 完整机器索引以 `sources.json` + `compliance_matrix.json` + `standard_matrix.json` + `design_depth_matrix.json` 为准；本节列出人类可读核心资料 `[source:SITE-PACKAGE]` `[source:OFFICIAL-ANNOUNCEMENT]` `[standard:MOHURD-URBAN-DESIGN-MEASURES]` `[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]` `[source:PEER-PROPOSALS-CATALOG]`。

1. 北京市规划和自然资源委员会海淀分局，《百年京张 AI 创新带城市设计国际方案征集资格预审公告》，2026-05-09。`https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/tzgg/hd/202605/t20260509_4643047.html`

1. 北京市规划和自然资源委员会海淀分局，《百年京张 AI 创新带城市设计国际方案征集资格预审公告》，2026-05-09。`https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/tzgg/hd/202605/t20260509_4643047.html`
2. 北京市科学技术委员会、中关村科技园区管理委员会，《"三区两翼"打造世界级 AI 集聚地》，2026-04-03。`https://kw.beijing.gov.cn/xwdt/kcyx/kcyx/202604/t20260403_4573808.html`
3. 北京市海淀区人民政府，《海淀区发布"1+X+1"现代化产业体系建设布局》，2026-03-02。`https://www.bjhd.gov.cn/ztzx/2026/2026jjshgzlfzdh/yw/202603/t20260303_4806875.shtml`
4. 中华人民共和国住房和城乡建设部，《城市设计管理办法》（2017）。`https://www.mohurd.gov.cn/gongkai/zc/wjk/art/2023/art_17339_775476.html`
5. 中华人民共和国自然资源部，《国土空间调查、规划、用途管制用地用海分类指南》，2023-11-22。`https://www.gov.cn/zhengce/zhengceku/202311/content_6917279.htm`
6. 国家互联网信息办公室等七部门，《生成式人工智能服务管理暂行办法》，2023-07-13。`https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm`
7. 全国人民代表大会常务委员会，《中华人民共和国无障碍环境建设法》，2023-06-28。`https://www.gov.cn/yaowen/liebiao/202306/content_6888910.htm`
8. 国务院办公厅，《关于切实解决老年人运用智能技术困难实施方案》（国办发〔2020〕45 号）。`https://www.gov.cn/zhengce/content/2020-11/24/content_5563804.htm`
9. OpenCity-AI Haidian 仓库，`submissions-data.js`（peer proposals 标题 / 摘要 / 状态索引）；本方案仅用作品牌与切入点差异化参照，**不复制任何 peer 内容**。
10. 临时边界与三处重点区 polygon：`brief/site-package/geometry/provisional_boundaries.geojson`，仅作 AI 生成与 intake 自检。


1786933134