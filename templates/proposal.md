---
title: "方案标题"
author_github: "your-github-login"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "用 1-2 句话概括 formal 城市设计方案、核心空间策略和 AI 场景。"
tracks: ["ai-traffic-walkability"]
scenarios: ["ai-traffic-walkability"]
iteration: "v0.1"
---

# 方案标题

## 设计依据与资料清单

说明本方案引用的官方公告、资格预审/任务书附件、面向智能体任务书、公开政策、公开数据、用户提供且已清权资料。必须读取 `data/source_registry.json`，明确哪些资料是 formal-ready，哪些只可用于背景，哪些只是 provisional intake 线索。完整来源、指标、标准、设计深度和任务覆盖放在 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`，不要把这些机器索引逐条抄进正文。

正文在关键判断后使用可校验引用格式，例如 `[source:SITE-PACKAGE]`、`[standard:MOHURD-URBAN-DESIGN-MEASURES]`、`[depth:land_use_layout]`、`[data:geometry/land_use.geojson#LU-001]`、`[metric:green_ratio]`。每个 required section 至少引用一条与该节判断直接相关的证据；同一处连续引用通常不超过 3 条。删除引用标记后，句子仍必须自然、完整、可读。

写作要求：`proposal.md` 是主语言主体方案，语言副本必须保持等义；人类评审者不打开 JSON 也应能理解方案。每个章节都要回答四件事：设计判断是什么、为什么这样判断、对应哪个图层/指标/标准、还有什么资料缺口。正文写给人，结构化文件用于机器复核；不得只写愿景口号、不得只列矩阵、不得堆叠引用编号、不得把 GeoJSON 当作正文解释的替代品。面向智能体任务书的六项任务必须在正文中被实际展开：命名/Logo、生态案例、场景卡、朝圣地标、文化叙事、长期运营，不能只在 `compliance_matrix.json` 中打勾。

图文要求：正文必须插入由 GeoJSON、metrics 和矩阵派生的本地图片，至少包括 `assets/figures/site-overview.png`、`assets/figures/land-use-structure.png`、`assets/figures/key-areas.png`、`assets/figures/mobility-bluegreen.png`、`assets/figures/metrics-evidence.png`。图片必须使用 Markdown 本地引用，不得使用远程图片、data URI、外部地图截图或未清权素材。图片是人类可读解释层，不能替代 GeoJSON/metrics 的权威数据。

多模态表达建议：方案是给人看的。能力可用时应主动使用高质量图像和示意图、短视频、声音或音乐、动画、本地 Three.js/WebGL/Canvas 三维或交互体验，不要停留在密集文字或机械 SVG。可选媒体和自定义封面按 `skills/urban-design-ai-submission/references/multimodal-presentation.md` 放入 `assets/media/`；能力受限时使用数据驱动图件、清晰文本和默认封面。所有生成媒体都只是解释层，不得冒充现场、居民意见、官方边界或实测证据。

图面表达要求：所有核心图都必须有明确主叙事、视觉层级、重点标注、图例、来源说明和 official/provisional 状态。图不是 raw GeoJSON 截图，也不是直接把 polygon 填色后的 debug map。若 provisional boundary 本身为矩形或粗略 polygon，只能以虚线、淡色约束或注释表达，不得把矩形边界或大色块作为主要构图；图面重点应放在设计意图、廊道、节点、公共空间网络、重点区 callout、AI 场景、指标证据链和实施逻辑上。

阅读版要求：提交前必须运行 `python3 scripts/render_proposal_html.py submissions/<github-login>/<proposal-slug>`，生成 `report/proposal.html`。该 HTML 是从本文件渲染出的离线阅读版，用于稳定显示正文、图片、图注和证据标签。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

分别说明统筹研究范围、总体设计范围、重点区域范围的工作目标、空间边界、面积、设计深度和成果表达方式。解释三层范围如何从产业战略、总体城市设计、重点片区详细设计逐级落实，并引用对应的官方边界、重点区域图层、面积指标和深度项。

如果使用 provisional boundary，必须在本节说明它的粗略来源、适用范围、不可用于官方红线/精确面积的限制，以及替换 official polygon 后哪些图层和指标需要重算。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

回应公告 1.5（1）关于世界级 AI 创新生态体系、产业链协同、三区两翼、未来 AI 城市形态、AI 文化/社会/城市、AI+交通和连续绿色空间体系的要求。包含命名方案和 logo 设计说明，并说明这些判断如何落到用地、公共空间、交通慢行、AI 场景节点、指标和图纸。

同时回应面向智能体任务书的“一带总体概念与功能统筹方案设计”和“AI 全栈自主创新体系与世界级 AI 创新生态设计”：必须解释三大定位、五大功能、三区两翼协同回路，给出 5-8 个全球 AI 创新生态案例的可读摘要，并说明哪些经验可转化为空间、运营和场景机制。引用 `[source:AGENT-TASKBOOK]` 与 `[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]`。

## 总体设计范围城市更新与控规深度城市设计

回应公告 1.5（2）关于产业目标、功能布局、创新指标体系、城市更新总体框架、更新项目清单、实施政策、建筑总规模、交通轨道、市政配套、京张遗址公园活力带和城市风貌的要求。达到控制性详细规划的城市设计深度。每个重要结论都要说明对应图层、指标、来源、标准和待确认控规条件。

不能只写“打造活力带、完善配套、提升品质”。必须具体说明空间结构、更新对象、功能比例、公共空间、交通组织、市政承载和风貌控制如何相互支撑；缺控规条件时要写成待确认，不得伪装为审定指标。

## 重点区域详细设计

对众智园 AI 自主创新加速区、北京 AI 原点社区、大钟寺 AI 产业聚集区分别开展详细设计。说明产业功能、开发建设规模、建筑形态、拆改留分类、公共空间连通、交通组织、实施项目和风貌控制。达到规划综合实施方案的城市设计深度。每个重点区都必须引用 `geometry/key_areas.geojson` 的 feature 和对应图纸。

每个重点区至少要形成“定位 + 空间结构 + 建筑更新 + 交通慢行 + 公共空间 + AI 场景 + 实施风险”的可读小方案。若重点区 polygon 是 provisional，必须说明哪些结论只能作为方向性设计。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

说明 AI 人才、企业、居民和公共治理需求画像。提出 AI+信软、AI+医疗、AI+教育、AI+法律、AI+生活服务、AI+交通、AI+公共空间等场景，并说明数据来源、隐私边界、人工复核和运营机制。

必须提供不少于 10 张 AI 场景卡，其中不少于 3 张是 AI 产业测试验证场景；必须提供不少于 5 类用户画像，并把每张场景卡映射到空间位置、服务对象、运行数据、隐私边界、人工复核、运营主体、可视化图层和风险。场景卡应在正文中可读，不能只放在 JSON。

## 用地、建筑规模与拆改留方案

说明用地布局、产业功能比例、建筑基底、建筑规模、建筑高度、开发强度、保留/改造/拆除/新建分类、空间供给和运营策略。所有面积、比例和规模必须能从 `geometry/*.geojson`、`metrics.json` 或可信来源复算。缺控规、现状建筑、权属或工程条件时，必须写成待确认事项。

智能体提交边界：任务书禁止把容积率、建筑高度、建筑强度或具体拆改留写成法定规划、审批或工程实施结论。缺少官方控规、现状建筑、权属或工程条件时，应将相应管控指标统一记为 `status=unknown`，并在 `reason` / `assumptions` 中说明待正式控制条件补齐、当前假设和数据到位后的复算路径；可以保留由本包几何复算的概念体量或设计量，但必须标为概念建议/低置信度设计量，并明确它不等于法定控制值。

## 交通、轨道、市政与公共服务设施

说明道路微循环、轨道站点一体化、慢行断点、停车与非机动车组织、对外交通、创新服务平台、人才生活服务、新型基础设施、分布式能源、端侧算力和传统市政设施融合。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

说明京张遗址公园活力带、清河/小月河蓝绿空间、步道骑行道、公共活动空间、科技测试和应用展示场景、历史文化展示、城市基调、建筑风貌、屋顶形态、体量和景观节点。

必须回应 AI 公共空间、智能原生新业态与朝圣地标：提出不少于 3 个 AI 朝圣地标或荣誉展示节点，说明它们与京张遗址公园、中关村创新文化、开发者社区和公共空间系统的关系。地标、导视、Logo、字体、图像、人物和企业标识必须清权，不得过度娱乐化或把概念地标写成已批准建设。

## 更新项目清单、实施政策与分期计划

列出更新项目清单、项目类型、空间位置、依赖条件、实施主体、政策建议、近期/中期/长期分期、公众参与和运营维护机制。对应 `geometry/phasing.geojson`。

必须回应全球 AI 创新活动体系与长期运营设计：提出年度活动体系、活动品牌、开发者社区运营、场景开放运营、公共体验路线、国际传播和招引转化机制。所有活动、招商、资金、政策和运营安排必须写成概念建议或深化方向，不得表述为已确定政府安排。

## 指标体系、面积复算与合规矩阵

说明 AI 创新指数、人才密度、产值规模、产业空间、建筑规模、绿地与公共空间、重点区域面积、慢行连通、更新项目数量、AI 场景节点等指标。逐项说明公式、来源、复算结果和 `compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` 覆盖情况。

指标不能只放在 `metrics.json`。正文必须解释每个核心指标的设计含义，例如绿地比例如何支撑人才生活、公共空间比例如何支撑创新交往、建筑基底如何回应产业空间供给。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

说明资料合法性、版权授权、非公开资料排除、隐私保护、AI 生成责任、官方批准/实施承诺禁用、待补资料、专业复核需求。引用 `report/copyright_statement.md`。

## 参考资料

用 5-12 条人类可读的书目信息列出真正影响方案判断的主要材料。完整机器索引以 `sources.json` 和三个矩阵文件为准，不在这里复制文件名或 ID 清单。
