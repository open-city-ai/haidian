---
title: "京张城市操作系统：把百年AI创新带做成可开源迭代的城市智能体"
author_github: "z3230442"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以'城市操作系统（CityOS）'为核心隐喻，将百年京张AI创新带构建为一个可版本控制、可开源协作、可贡献追溯的城市智能体平台。三区两翼作为CityOS的六个核心服务模块，agent.1~agent.6任务映射为OS的六大子系统，12张AI场景卡作为可插拔服务插件，形成从空间规划到城市治理的完整技术栈。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.0"
---

<!-- CityOS v1.0: 京张城市操作系统 — 百年AI创新带的开源城市智能体 -->

# 京张城市操作系统：把百年AI创新带做成可开源迭代的城市智能体

## 设计依据与资料清单

本方案以《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [source:OFFICIAL-ANNOUNCEMENT]，以仓库 `brief/site-package/` 中的结构化任务书 [source:AGENT-TASKBOOK] 与场地资料包 [source:SITE-PACKAGE] 为机器可读依据。公开来源登记表 [source:SOURCE-REGISTRY] 与临时边界 [source:BOUNDARY-SOURCE] 作为数据溯源与边界精度的辅助说明。

适用标准清单见下方表格：

| 标准编号 | 适用内容 |
| --- | --- |
| [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] | 征集公告与范围划定 |
| [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] | agent 任务书与提交规范 |
| [standard:MOHURD-URBAN-DESIGN-MEASURES] | 城市设计措施与风貌控制 |
| [standard:MOHURD-CONTROL-DETAILED-PLANNING] | 控制性详细规划深度 |
| [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] | 用地分类与切分规则 |
| [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] | 建筑设计与拆改留深度 |

资料使用边界来自 `data/source_registry.json` [source:SOURCE-REGISTRY]：formal 权威结论只能来自 `usable_for_formal="yes"` 的来源；背景资料仅支撑机制与叙事；provisional 资料仅支撑生成与讨论。本方案未使用非公开数据、个人隐私数据或未经授权素材。

**关键差异声明：** 截至公开资料复核日期，官方精确 SITE_BOUNDARY 与 KEY_AREA polygon 尚未公开。本方案使用 `brief/site-package/geometry/provisional_boundaries.geojson` 中的 provisional 边界 [source:BOUNDARY-SOURCE]，在 `geometry/site_boundary.geojson#SITE-001` 与 `geometry/key_areas.geojson#PROV-KEY-001` 中标注 `geometry_role=provisional_constraint`、`official_boundary=false`、`boundary_precision=provisional_rough`。临时边界仅用于方案生成、自检、可视化和设计讨论，不作为 official redline、审批依据或精确面积依据。组织方数据缺口不阻断内容评分 [depth:risk_missing_data]。官方数据发布后，全部图层与指标必须重算。

![资料证据链与CityOS提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

方案按照公告确定的三个层次组织工作 [source:OFFICIAL-ANNOUNCEMENT]：统筹研究范围约 43.6 平方公里关注AI产业生态、战略定位与未来城市形态；总体设计范围约 11.4 平方公里关注城市更新、产业空间、交通市政与风貌控制；重点区域范围约 368.4 公顷关注三处详细设计地区的功能业态、建筑规模与公共空间。三层范围在 `compliance_matrix.json` 中逐条映射公告 1.3、1.4、1.5 与 agent.1~agent.6 [depth:three_level_scope_framework]。

![三层范围与CityOS服务架构对应图](assets/figures/land-use-structure.png)

| 层级 | 面积/公告 | CityOS对应层 | 本方案回答 | 数据落点 |
| --- | --- | --- | --- | --- |
| 统筹研究范围 | 43.6 km² | 战略层 / OS内核 | AI创新生态五段链路：高校策源→开源协作→企业转化→公共体验→国际传播 | [depth:overall_spatial_structure] |
| 总体设计范围 | 11.4 km² | 系统层 / 服务编排 | 六区十二服务：三区两翼+弹性缓冲区的微服务化城市空间 | [data:geometry/land_use.geojson#LU-001] |
| 重点区域范围 | 368.4 ha | 应用层 / 场景插件 | 三处核心服务的详细设计与场景卡部署 | [data:geometry/key_areas.geojson#PROV-KEY-001] |

三层工作框架的面积复算证据：统筹研究范围面积 [metric:site_area_sqm] 与重点区数量 [metric:key_area_count]；众智园加速区面积 [metric:zhongzhiyuan_ai_acceleration_area_area_sqm]、AI原点社区面积 [metric:beijing_ai_origin_community_area_sqm] 与大钟寺AI集聚区面积 [metric:dazhongsi_ai_industry_cluster_area_sqm] 作为三层范围的底层校验依据。

## 统筹研究范围产业与未来城市研究

### CityOS 核心概念：城市即操作系统

### 2.1 命名体系与Logo

本方案提出主名称 **"京张城市操作系统"（Jing-Zhang CityOS）**，简称 **JZ-OS**，定位语："**百年一轨，开源一座城**"（One Century, One Rail, One Open-Source City）。

命名逻辑：京张铁路是中国自主工程精神的百年原点，而"操作系统"是数字时代最基础、最开放、最可迭代的平台隐喻。将二者结合，意味着把一带建设成一个**可安装、可升级、可贡献、可审计的城市基础设施平台**——就像 Linux 之于服务器、Android 之于手机，JZ-OS 之于城市。

Logo 方向为 **"轨道六边形节点"**：外圈为京张铁路双轨线（棕色），内圈为六个正交扇区（代表三区两翼+治理内核），中心为开源符号（∞环），三色系统为铁路棕灰（#7A5C3E）、电感蓝（#2563EB）、绿道绿（#16A34A）。视觉系统延展至导视、版本徽章、贡献者墙与数字界面 [source:AGENT-TASKBOOK]。

### 2.2 CityOS 架构：六层技术栈

将百年京张AI创新带组织为一个六层城市操作系统 [source:AGENT-TASKBOOK]：

| 层级 | 类比 | 京张映射 | 空间载体 |
| --- | --- | --- | --- |
| **L6 应用层** | App Store / 场景插件 | 12张AI场景卡、全球AI活动周 | 公共空间、商业街区、社区节点 |
| **L5 服务层** | Microservices | 三区两翼六大服务模块 | 重点片区、科技服务翼、场景赋能翼 |
| **L4 平台层** | API Gateway / 数据中台 | 开源贡献平台、数据要素剧场 | AI原点社区、众智园 |
| **L3 网络层** | Network / 基础设施 | 京张智联主轴+蓝绿智联环+轨道接驳 | 京张遗址公园、清河、小月河 |
| **L2 算力层** | Compute / 新型基础设施 | 端侧算力驿站、低碳算力网络 | 众智园市政节点 |
| **L1 硬件层** | Hardware / 物理空间 | 用地、建筑、道路、绿地 | 全边界 GeoJSON |

每一层都遵循开源原则：接口开放、协议公开、贡献可追溯、版本可回滚。城市更新不是大拆大建，而是**版本迭代**——从 v1.0（概念设计）到 v2.0（控规深化）到 v3.0（实施运营），每个版本都有 changelog、PR记录和贡献者墙。

### 2.3 五大功能与三区两翼的CityOS映射

三大定位 [source:AGENT-TASKBOOK]：
- **百年京张文化带** → CityOS 的"开源协议层"：京张铁路的百年自主工程史就是最古老的开源协议——詹天佑的人字形线路、中国自主设计的标准轨距。CityOS 继承这一"开源基因"。
- **都市AI生活体验带** → CityOS 的"用户体验层"：AI场景不是技术展览，而是日常城市服务的升级补丁。
- **AI融合创新带** → CityOS 的"开发工具链"：高校、企业、社区作为开发者，通过开放API参与城市建设。

五大功能映射：
- AI全栈自主创新体系 → L4平台层（众智园）
- 世界级AI创新生态 → L5服务层（AI原点社区）
- AI+场景赋能新范式 → L6应用层（小月河翼）
- 智能化AI活力城市 → L3网络层（京张智联主轴）
- AI治理全球话语权 → L4平台层（AI治理议事厅）

三区两翼映射：
- 众智园 = `os-core` 内核模块（全栈自主创新+AI治理）
- AI原点社区 = `dev-hub` 开发者模块（开源生态+成果转化）
- 大钟寺 = `app-market` 应用模块（智能原生经济+国际交往）
- 中关村科技服务翼 = `sdk` 开发工具包（要素配置+资本服务）
- 小月河场景赋能翼 = `sandbox` 沙盒环境（场景测试+青年活力）

![CityOS六层架构与三区两翼映射图](assets/figures/key-areas.png)

## 全球AI创新生态案例（6个背景案例）

为了把"世界级AI创新生态"转化为可移植机制，本方案整理以下公开背景案例（机制参考，具体数据待官方核验 [depth:risk_missing_data]）：

| 案例 | 机制要点 | CityOS可转化内容 |
| --- | --- | --- |
| 伦敦国王十字 | 旧铁路场站更新为知识型混合社区 | 公共空间先行、铁路文脉叙事、开源社区运营 |
| 新加坡裕廊创新区JID | 以测试床和生活实验室组织自动驾驶场景 | 场景开放申请、人工复核、测试-展示-运营闭环 |
| 巴黎Station F | 大型创业园+开发者社区+开放日运营 | 公共展示界面、年度活动、贡献者荣誉体系 |
| 韩国板桥科技谷 | 园区-居住-商业混合与轨道通勤连接 | 站城一体、人才生活配套、产业服务网络 |
| 多伦多Quayside试验 | 智能城市数据治理与公共争议 | 数据最小化、公众参与、退出机制、人工复核 |
| 波士顿MIT Media Lab | 大学-产业-社区三螺旋创新生态 | 近校成果转化、开源硬件、跨学科协作 |

以上机制转化为 CityOS 的六条设计原则：**公共空间先行、场景开放、测试床驱动、开发者社区、数据治理透明、站城一体** [source:AGENT-TASKBOOK]。

## 总体设计范围城市更新与控规深度城市设计

### 3.1 城市更新：版本控制而非大拆大建

城市更新不预设大拆大建结论，而是建立 **"保留(Retain)→改造(Refactor)→新建(Rebuild)→待确认(TBD)"** 四级版本控制方法 [depth:retain_renovate_demolish]。类比软件开发的 CRUD 操作：

| 操作 | 城市更新对应 | 设计原则 |
| --- | --- | --- |
| Read (保留) | 历史、教育、公共设施价值高的对象 | 保护性阅读，不修改 |
| Update (改造) | 产业楼宇、园区环境、社区服务界面 | 增量更新，保留数据 |
| Create (新建) | 主轴节点、绿道驿站、新型基础设施原型 | 新功能，需API设计 |
| Delete (待确认) | 涉及权属、控规、工程条件的对象 | 不执行删除，待评审 |

用地结构依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 组织，科研、商业、居住、教育、道路、绿地与留白完整覆盖边界且无重叠 [data:geometry/land_use.geojson#LU-001]。

### 3.2 控规深度与待确认条件

方案按控制性详细规划的城市设计深度组织内容 [standard:MOHURD-CONTROL-DETAILED-PLANNING]，但官方容积率、建筑高度、建筑密度、绿地率、退线与道路红线均未在公开任务包中提供，因此全部列为待补数据 [depth:development_intensity_controls]。本方案只给出空间结构、功能分区与更新逻辑，不把推测值写成审定指标。

## 重点区域详细设计

### 4.1 众智园 = `os-core` 内核模块

**定位**：花园型全栈自主创新街区 [source:OFFICIAL-ANNOUNCEMENT]。

**CityOS角色**：操作系统内核——负责全栈自主创新体系与AI治理全球话语权。

**空间动作**：围绕国家平台组织研发、算力、测试与标准治理功能；强化清河界面形成低碳公共客厅；把智能体沙盒、低碳算力驿站与AI治理议事厅布置为可预约、可展示、可退出的公共测试节点 [data:geometry/key_areas.geojson#PROV-KEY-001]。

**风貌基调**：铁路棕灰+电感蓝，建筑以科研用地为主、商业配套为辅。

**拆改留**：保留园区现有科研载体；改造低效产业楼宇为共享测试空间；新建低碳算力驿站与AI治理议事厅。

### 4.2 AI原点社区 = `dev-hub` 开发者模块

**定位**：近校型成果转化与人才社区 [source:AGENT-TASKBOOK]。

**CityOS角色**：开发者中心——负责世界级AI创新生态、开源协作与人才聚集。

**空间动作**：组织校区-园区-街区慢行缝合；补足开源发布厅、校企转化客厅、人才服务与居住生活配套；围绕轨道站点组织一体化接驳与公共广场 [data:geometry/key_areas.geojson#PROV-KEY-002]。

**核心叙事**："原点"即开源——高校策源→开源协作→成果发布→人才聚集形成创新回路。

### 4.3 大钟寺 = `app-market` 应用模块

**定位**：城市型智能经济与国际交往街区 [source:OFFICIAL-ANNOUNCEMENT]。

**CityOS角色**：应用市场——负责智能原生新业态的展示、转化与国际交流。

**空间动作**：围绕大钟寺站组织四象限步行连通；布局智能终端商业街、数据要素剧场与国际路演客厅；利用规划绿地复合承载公共体验 [data:geometry/key_areas.geojson#PROV-KEY-003]。

**核心叙事**：从"智能消费"到"智能原生"——大钟寺是CityOS的用户界面，也是全球AI活动周的重要节点。

![三处重点区域CityOS角色图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

### 5.1 六类用户画像（含CityOS开发者角色）

| 用户画像 | CityOS角色 | 典型需求 | 空间响应 | 数据边界 |
| --- | --- | --- | --- | --- |
| 高校师生与科研人员 | Researcher | 成果转化、跨校协作 | 近校成果转化街、跨校协作空间 | 校园数据需授权 |
| 开源开发者与独立团队 | Contributor | 发布、协作、测试、社区声誉 | 开源发布厅、公共代码墙、夜间协作空间 | 不采集个人行为轨迹 |
| 初创与成长企业 | Startup | 低成本办公、算力入口 | 共享测试场、端侧算力服务点 | 算力和数据服务需授权 |
| 头部企业与国际访客 | Enterprise | 展示、商务、国际接待 | 国际路演客厅、站点接驳 | 企业标识须清权 |
| 周边居民与青年人才 | Citizen | 通勤、休闲、社区服务 | 京张遗址公园慢行环、社区服务 | 不用于商业推荐 |
| AI Agent与城市智能体 | Agent | 感知、决策辅助、场景服务 | 智能体沙盒、数据接口节点 | 数据最小化+人工复核 |

### 5.2 十二张AI场景卡（CityOS可插拔服务插件）

| 编号 | 场景卡 | CityOS插件 | 空间载体 | 测试验证 | 人工复核 |
| --- | --- | --- | --- | --- | --- |
| 01 | 开源发布厅 | `release-plugin` | AI原点社区发布广场 | 否 | 社区运营委员会 |
| 02 | 城市智能体沙盒 | `agent-sandbox` | 众智园测试街区 | **是** | 测试准入+人工复核 |
| 03 | 低碳算力驿站 | `compute-node` | 众智园市政节点 | **是** | 平台服务方 |
| 04 | AI慢行导航 | `mobility-ai` | 京张智联主轴 | 否 | 运营方+公众反馈 |
| 05 | 数据要素剧场 | `data-exchange` | 大钟寺数据广场 | **是** | 合规审计节点 |
| 06 | AI治理议事厅 | `governance-hub` | 众智园治理广场 | 否 | 治理圆桌会议 |
| 07 | 校企转化客厅 | `transfer-hub` | 原点社区创新街 | 否 | 转化服务中心 |
| 08 | 智能终端商业街 | `device-market` | 大钟寺商业街区 | 否 | 商户+平台共治 |
| 09 | 青年生活实验室 | `youth-lab` | 小月河场景赋能翼 | 否 | 公共服务运营方 |
| 10 | 全球AI开放周路线 | `event-route` | 蓝绿智联环 | 否 | 活动组委会 |
| 11 | AI教育体验点 | `edu-ai` | 高校周边社区节点 | 否 | 教育机构+家长委员会 |
| 12 | 城市数字孪生驾驶舱 | `digital-twin` | 众智园/大钟寺控制中心 | 否 | 数据合规+人工复核 |

其中 02城市智能体沙盒、03低碳算力驿站、05数据要素剧场为 AI 产业测试验证场景 [source:AGENT-TASKBOOK]，均设置"公开来源、数据最小化、人工复核、可退出"四项约束。

### 5.3 隐私与人工复核边界

所有场景不得侵害隐私、不得过度监控、不得把未成熟技术写成已全面部署。城市智能体辅助识别慢行断点、设施维护、活动安全与企业服务需求，但最终判断由人与专业团队完成。AI生成内容必须披露生成方式与来源 [source:PROCESSED-FACT-PACK]。

## 用地、建筑规模与拆改留方案

用地结构依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 由同一 provisional 边界完整切分，`geometry/land_use.geojson` 覆盖全边界、无重叠、共享边 [data:geometry/land_use.geojson#LU-001]。

建筑基底为概念设计图层 [data:geometry/buildings.geojson#BLDG-001]，按研发、办公、孵化器、教育、居住、社区服务、商业、文化与交通接驳类型组织。具体容积率、建筑高度与退线必须待官方控规条件确认 [depth:development_intensity_controls]。

## 交通、轨道、市政与公共服务设施

交通策略围绕"主轴+环线+接驳"组织 [depth:traffic_rail_slow_parking]：京张智联主轴绿道承担南北慢行与场景序列，蓝绿智联环承担片区骑行，中部智联横街与两翼支路承担微循环 [data:geometry/roads.geojson#ROAD-001]。

市政设施采用"传统管线更新+新型基础设施嵌入"思路 [depth:municipal_new_infrastructure]：分布式能源、端侧算力、智能灯杆、环境感知与数据接口与公共服务设施复合布置 [data:geometry/public_space.geojson#PUBLIC-001]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿系统以京张遗址公园活力带为主轴、清河与小月河廊道为支脉、社区公园为节点，形成连续蓝绿智联环 [data:geometry/green_space.geojson#GREEN-001]。

### 三个 AI 朝圣地标（CityOS里程碑纪念碑）

1. **"人字结点"开源纪念碑**：位于京张遗址公园与AI原点社区交界，以詹天佑人字形线路为灵感，双轨交汇成开源符号（∞），结合贡献者荣誉墙。
2. **"开源原点塔"开发者里程碑**：位于AI原点社区发布广场，以塔形装置展示开源贡献者名录、模型卡与年度最佳贡献。
3. **"大钟寺智能回响环"应用里程碑**：位于大钟寺站前广场，以钟声与数据声景为意象，纪念中国智能经济新文化。

### 城市风貌

风貌控制依据 [standard:MOHURD-URBAN-DESIGN-MEASURES]：铁路记忆材质（灰砖、钢轨、枕木元素）、AI蓝色节点、绿道绿色基座构成三段基调。

## 更新项目清单、实施政策与分期计划

| 项目编号 | 项目名称 | CityOS版本 | 类型 | 主要依赖 |
| --- | --- | --- | --- | --- |
| JZ-01 | 京张智联主轴绿道贯通 | v1.0-alpha | 公共空间/慢行 | 官方边界、权属、文保 |
| JZ-02 | 开源发布广场与原點塔 | v1.0-beta | 公共空间/文化 | 站点一体化、用地条件 |
| JZ-03 | 城市智能体沙盒街区 | v1.0-rc | 测试验证/新基建 | 测试许可、数据合规 |
| JZ-04 | 低碳算力驿站 | v1.0-rc | 新型基础设施 | 能源、算力、市政接入 |
| JZ-05 | AI治理议事厅 | v1.0 | 公共服务/治理 | 标准组织合作 |
| JZ-06 | 校企转化客厅 | v1.1 | 产业服务 | 高校与成果转化机制 |
| JZ-07 | 数据要素剧场 | v1.1 | 展示/合规服务 | 数据合规与审计机制 |
| JZ-08 | 大钟寺站四象限连通 | v1.1 | 轨道一体化 | 轨道站点、交叉口 |
| JZ-09 | 青年生活实验室 | v1.2 | 社区/青年 | 公共服务运营 |
| JZ-10 | 全球AI开放周 | v2.0 | 运营/品牌 | 公共空间许可、安全 |

实施分期：近期（v1.0，轻量设施+运营活动先行）、中期（v2.0，控规深化+重点项目）、长期（v3.0，治理框架+国际传播）。[source:AGENT-TASKBOOK] [depth:phasing_implementation]

## AI公共空间、文化叙事与长期运营

### 文化融合叙事

京张铁路历史文化（百年自主工程）→ 中关村创新文化（开放协作）→ AI新文化（开源治理）。CityOS 将三种文化编码为开源协议的三个版本：v0.0（京张铁路：中国自主工程的第一次"开源"）→ v1.0（中关村：知识共享与产业协作）→ v2.0（AI时代：多智能体城市治理）。

### 导视与标识系统

采用 CityOS 视觉语言：版本徽章（v1.0/v2.0/v3.0）、开源贡献者墙、Git-style changelog 立柱、开源协议铭牌。

### 长期运营：全球AI活动体系

- **年度**：全球AI开放周（JZ-OS Week）、开源贡献者大会
- **季度**：AI场景测试日发布、开发者Hackathon
- **月度**：开源社区 meetup、AI治理圆桌
- **持续**：CityOS GitHub 仓库贡献、数字孪生驾驶舱开放

运营机制：开发者社区积分制、贡献者荣誉展示、场景开放申请平台、国际传播矩阵。

## 指标体系、面积复算与合规矩阵

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

指标体系覆盖空间指标（边界面积、绿地比例、公共空间比例、建筑基底）、管控指标（待官方控规条件）与绩效指标（AI创新指数、人才密度、活动参与度）。空间复算指标包括边界面积 [metric:site_area_sqm] 与绿地比例 [metric:green_ratio]；公共空间比例 [metric:public_space_ratio] 与场景节点数量 [metric:scenario_node_count] 作为绩效层校验依据。

合规矩阵是任务响应性的主控文件。每条公告任务和 agent_taskbook 任务必须对应到报告章节、图层、指标、图纸、HTML 页面、来源、假设和自检项 [depth:metrics_recalculation]。

## 风险、版权与合规说明

**双语言要求**：本方案主文件使用中文（`language: "zh"`），完整英文对照译文见 `proposal.en.md` [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

风险与缺资料清单由 [depth:risk_missing_data]、[data:geometry/constraints.geojson#CONSTRAINTS] 与 [source:SITE-PACKAGE] 校核。official boundary、key area、控规、道路、地块、建筑、市政、文保和公共服务缺口必须进入 `assumptions.json`、自检和正文风险章节。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。AI agent 对事实、来源、版权、空间数据、指标和表达负责。

## 参考资料

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/agent_taskbook.json
- brief/site-package/allowed_design_space.json
- brief/site-package/standards/standards.json
- data/source_registry.json
- 完整机器索引：见 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json` [source:SITE-PACKAGE]