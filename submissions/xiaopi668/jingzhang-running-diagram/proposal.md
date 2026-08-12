---
title: "京张运行图 · The Jing-Zhang Running Diagram — 把百年铁路调度智慧重读为AI创新带的时空操作系统"
author_github: "xiaopi668"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以「京张运行图（THE JING-ZHANG RUNNING DIAGRAM）」为总体概念：把1909年京张铁路开通以来的百年调度智慧，重读为组织AI创新带的时空操作系统——一条主运行线（京张遗址公园活力带）、三座枢纽站（众智园/原点社区/大钟寺）、两翼支线（中关村科技服务翼、小月河场景赋能翼）、十张班次卡（AI场景）与年度运行图（活动与运营体系）。全部空间建议基于仓库登记的临时粗略边界生成，属概念建议，官方红线发布后整包重算。"
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "enterprise-service-copilot", "robot-delivery-low-speed"]
iteration: "v1.1"
---

# 京张运行图——把百年铁路调度智慧重读为AI创新带的时空操作系统

> **京张运行图 THE JING-ZHANG RUNNING DIAGRAM**｜1909 年，京张铁路全线通车——中国人第一次用自己的工程师、自己的铁轨和自己的运行图，把北京与张家口连在一起；运行图从此成为这条走廊上最古老的"操作系统"：什么车、什么时刻、走哪条线、在哪个站停靠、由谁调度。今天，本方案提出把这套百年调度智慧**重读为组织 AI 创新带的时空操作系统**：一条**主运行线**（京张遗址公园活力带）贯通南北，三座**枢纽站**（众智园、AI 原点社区、大钟寺）各司其职，两翼**支线**（中关村科技服务翼、小月河场景赋能翼）输送要素，十张**班次卡**（AI 场景）按时刻运行，一张**年度运行图**（活动与运营体系）调度全年。城市设计的任务，是让这条走廊上的每一列"创新列车"——从企业、人才、算力到场景——准点、接驳、可查询。

本方案全部空间、活动、政策、招商与分期内容均为**开放共创的概念建议、参考方案或可供专业团队深化研究的材料**，不替代正式规划，不构成政府审定结论，不构成任何地块拆改留、道路红线、轨道线位或工程实施结论 [source:AGENT-TASKBOOK]。方案在官方精确红线尚未发布时，使用仓库登记的临时粗略边界生成全部几何，所有边界均为 `official_boundary=false` 的临时约束，仅用于生成、展示、讨论与包内自检 [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]。官方 polygon 发布后，须依次替换范围与重点区边界，并整链重算用地、建筑、道路、蓝绿、分期、指标、五张图、HTML 与 PDF，该复算触发条件已登记于假设清单 [depth:metrics_recalculation] [depth:risk_missing_data]。

> **执行摘要（七行）**
> 1. 核心命题：把百年京张铁路的运行图智慧，重读为 AI 创新带的时空操作系统；「调度」是比"动脉""织网"更贴切的组织隐喻——它同时回答空间（线位）、时间（班次）、主体（调度员=运营共同体）三个问题。
> 2. 空间结构：一带三站两翼——主运行线（遗址公园活力带）贯通南北；三座枢纽站对应三处重点区；两翼支线输送资本、IP、场景与生活要素。
> 3. 总体概念与命名：「京张运行图」，英文 THE JING-ZHANG RUNNING DIAGRAM；Logo 方向为「三色信号灯与运行图折线」——信号灯红黄绿=AI 伦理三色，折线=百年运行轨迹。
> 4. 制度内核：「正点协议」——每一列"创新列车"（场景、项目、活动）必须公开其时刻、线路与调度员，禁止无票乘车、脱班运行与黑箱调度；以开源方式发布运行图本体。
> 5. 证据状态：全部几何基于仓库登记的临时粗略边界（EPSG:4548 复算 11,412,825 m²，与公告 11.4 km² 一致），所有空间指标可由包内 GeoJSON 复算 [metric:site_area_sqm] [data:geometry/site_boundary.geojson#SITE-001]。
> 6. 关键披露：三处重点区与总体边界均为临时约束，官方 polygon 发布后整包重算；控规条件（容积率、高度、密度、绿地率、退线）缺失，已登记为待补 [depth:risk_missing_data]。
> 7. 决策边界：所有结论均为概念建议，法定控规条件缺口已登记，不伪装为审定指标。

## 设计依据与资料清单

本 formal 方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]，以面向全球智能体的开源征集任务书摘录为第二依据 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [source:AGENT-TASKBOOK]，并以 `brief/site-package/` 中经维护者登记的临时粗略边界、重点区域、枚举、指标和来源清单为机器可读依据 [source:SITE-PACKAGE]。AI agent 在生成方案前必须读取 `design_brief.json`、`allowed_design_space.json`、`sources.json`、`enums/`、`ranges/`、`schemas/` 与 `data/source_registry.json`，所有设计判断都拆分为可追溯来源、可复算指标、可校验图层和可人工复核假设 [source:SOURCE-REGISTRY] [depth:existing_conditions_diagnosis]。

资料登记表的使用边界如下：当前登记摘要为 formal 可用资料 7 条、背景资料 1 条、provisional-only 资料 1 条；agent 不得把 background_only 或 provisional_only 资料升级为 official boundary、法定控规、正式评分依据或政府实施承诺 [source:SOURCE-REGISTRY]。官方公告给出了三层范围与三处重点区的面积和文字四至，但没有附可验证坐标系的精确 polygon；资格预审文件下载入口需要密码，公开渠道暂未取得官方红线 [source:OFFICIAL-ANNOUNCEMENT]。因此本包全部几何使用临时粗略边界（`PROV-SITE-001` 与 `PROV-KEY-001/002/003`），并在 `sources.json`、`assumptions.json` 与正文中持续披露精度限制。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

三处重点区的官方 polygon 缺失不阻断内容评分，但本方案所有面积与指标均明确标注为"临时边界复算值"，官方数据发布后必须按 `assumptions.json` 中登记的复算路径整链重算 [metric:site_area_sqm] [depth:metrics_recalculation]。控规条件（容积率、建筑高度、建筑密度、绿地率、退线）未随公开资料发布，正文中涉及开发强度的判断一律写成概念体量建议并标注"待正式控制条件补齐" [depth:development_intensity_controls] [depth:risk_missing_data]。

## 三层范围工作框架

方案按照公告确定的三层范围组织工作，并把每一层映射为运行图的一个"调度层级" [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]：

- **统筹研究范围（43.6 km²）**：北至北五环路、东至京藏高速、南至西直门外大街、西至万泉河路。本层回答"运行图的全局路网"：AI 产业链在哪、人才从哪来、算力与数据如何流动、未来城市形态如何演化。工作深度为产业战略与城市形态研究 [data:geometry/site_boundary.geojson#SITE-001]。
- **总体设计范围（11.4 km²，本包提交边界）**：京张遗址公园周边 1—2 公里城市地区和产业区。本层回答"运行图的主体线路"：主运行线绿带、三座枢纽站、两翼支线的用地与空间结构，达到控制性详细规划的城市设计深度 [metric:site_area_sqm]。
- **重点区域范围（368.4 ha）**：自北向南包括众智园 AI 自主创新加速区、北京 AI 原点社区、大钟寺 AI 产业聚集区。本层回答"三座枢纽站的站场设计"：功能业态、建筑规模、拆改留分类、公共空间连通、交通组织，达到规划综合实施方案的城市设计深度 [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]。

三层范围逐级落实为"全局路网—主体线路—站场设计"，每层都对应独立的图层、指标与深度项 [depth:three_key_area_detailed_design]。本方案使用的 `SITE-001` 与三处 `KEY_AREA` 均为 `provisional_constraint`：它们由公告文字四至、位置线索与约面积推定（EPSG:4548 复算偏差 +0.02% 至 +0.43%），只可用于生成、展示、讨论与自检，不得作为官方红线、审批依据或精确面积依据 [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]。官方 polygon 发布后，`geometry/site_boundary.geojson`、`geometry/key_areas.geojson`、全部派生图层与 `metrics.json` 必须整体重算 [depth:metrics_recalculation]。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 三大定位、五大功能与三区两翼协同回路

公告确立三大定位——**百年京张文化带、都市AI生活体验带、AI融合创新带**；任务书补充五大功能——**AI全栈自主创新体系、世界级AI创新生态、AI+场景赋能新范式、智能化AI活力城市、AI治理全球话语权**，以及"三区两翼"空间骨架 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]。

本方案以运行图语法重读三区两翼：三处重点区是**三座枢纽站**——众智园=「引擎站」（承载 AI 全栈自主创新体系与 AI 治理全球话语权），AI 原点社区=「始发站」（承载世界级 AI 创新生态），大钟寺=「枢纽站」（承载智能原生新业态）；两翼是**两条支线**——中关村科技服务翼（东翼，要素全球化配置、中关村 IP 与资本赋能）与小月河场景赋能翼（西翼，AI 场景赋能与智能化 AI 活力城市）[source:AGENT-TASKBOOK]。协同回路是"站—线—翼"闭环：枢纽站发出创新列车（企业、人才、项目），主运行线输送场景与公共体验，两翼支线回输资本、IP、生活服务与治理反馈，形成可持续的要素循环 [depth:overall_spatial_structure]。

### 命名体系与 Logo 方向（agent.1）

- **主名称**：京张运行图；**英文名称**：The Jing-Zhang Running Diagram（JZ-RD）。
- **命名体系**：主运行线称「R-Line 运行线」，三座枢纽站分别命名为「引擎站（众智园）/ 始发站（原点社区）/ 枢纽站（大钟寺）」，两翼支线称「东翼·中关村科技服务支线」「西翼·小月河场景赋能支线」，AI 场景统一称「班次卡」，活动与运营体系称「年度运行图」。所有名称均为概念建议，不涉及商标与既有名称冲突的授权使用 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]。
- **Logo 方向**：以「三色信号灯 + 运行图折线」为核心——红黄绿三色圆点构成信号灯（红=安全边界、黄=人工复核、绿=开放运行），一条带刻度的折线穿过三盏灯（折线=百年运行轨迹、三灯=三座枢纽站）；辅助图形为站台雨棚与轨道枕木的抽象线条。Logo 与导视系统的关系、字体与图标素材的清权状态登记在 `assumptions.json` 与版权声明中 [source:AGENT-TASKBOOK]。
- **Logo VI 基础包**：本包随附 `assets/media/logo-vi.svg`（矢量主版，可无损缩放）与 `assets/media/logo-vi.png`（预览位图），供评审与后续设计团队直接取用；VI 规范页（最小尺寸、安全空间、反白与单色版本）列入下一步品牌深化清单 [depth:brand_identity]。三色信号灯同时作为「AI 伦理三色」进入导视系统：红=安全边界、黄=人工复核、绿=开放运行。

### 全球 AI 创新生态案例（agent.2，5—8 个）

| 案例 | 位置 | 对京张的启示（可转化机制） |
| --- | --- | --- |
| King's Cross 中央圣马丁片区 | 英国伦敦 | 铁路工业遗址（谷仓、煤场）整体改造为科创与教育集群：**遗址即创新容器**，主运行线两侧的老厂房、仓库可作为产业空间与展示空间 [source:OFFICIAL-ANNOUNCEMENT] |
| 斯坦福—Sand Hill Road 走廊 | 美国硅谷 | 大学、资本与企业的步行可达闭环：**枢纽站 15 分钟步行圈**内配置科研、投资与孵化功能 |
| Kendall Square | 美国波士顿 | MIT 周边"实验室—转化—药企"垂直集群：原点社区宜以"小街区、密路网、高交流"组织 |
| one-north 纬壹科技城 | 新加坡 | 政府主导的"测试—展示—生活"三位一体：众智园的产业测试验证场景可借鉴其"活实验室"机制 |
| 特拉维夫创业生态 | 以色列 | 军事技术民用转化与高密度创业者社区：大钟寺宜承载"技术转化+消费场景"双功能 |
| 杭州未来科技城 | 中国杭州 | 龙头企业生态与创业小镇共生、人才公寓先行：两翼支线的居住与生活服务需与产业同步供给 |

案例结论（均为概念转译，不构成对上述地区经验的复制或承诺）：①创新生态需要**可步行的小尺度街区**；②遗址与旧建筑是低成本创新容器的首选；③"测试场景"是 AI 城区区别于传统产业园的核心设施；④人才公寓与生活服务必须与产业空间同批次供给 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]。

### 要素机制：土地、空间、产业、资金、人才、算力、数据、场景

八类要素按运行图逻辑组织：**土地与空间**——主运行线两侧优先保障创新空间供给；**产业**——三站差异化分工（引擎站=全栈自主、始发站=生态孵化、枢纽站=新业态转化）；**资金**——以开源社区基金与场景开放收益反哺公共空间运营（概念建议）；**人才**——枢纽站周边配置人才公寓与"始发站"落户服务；**算力**——众智园预留端侧算力与公共算力池接口；**数据**——以"场景沙盒"方式开放公共数据，标注隐私与人工复核边界；**场景**——十张班次卡构成年度开放场景清单 [source:AGENT-TASKBOOK] [source:OFFICIAL-ANNOUNCEMENT] [depth:municipal_new_infrastructure]。所有机制均表述为概念建议，不构成财政承诺、招商安排或政策承诺 [source:AGENT-TASKBOOK]。

### 区域协同：与全市创新集群的开放接口（agent.2 补充）

本带不自我封闭：按任务书"区域协同性"维度，提出与全市创新集群的**开放接口框架**（概念建议，协作关系需在来源核实后表述，不虚构合作事实 [source:AGENT-TASKBOOK]）：

- **北纬社区（中关村科学城北区）**：接口=算力与模型协同——众智园端侧算力试点与北区大模型集群形成"端—云"测试链路（建议）。
- **未来科学城**：接口=成果转化——众智园测试验证片承接未来科学城基础研究成果的中试与场景化验证（建议）。
- **怀柔科学城**：接口=装置与数据沙盒——大科学装置公共数据经脱敏沙盒在众智园开放（建议，须以数据合规为前提）。
- **经开区（亦庄）**：接口=智能网联场景互认——大钟寺低速配送试点与亦庄高级别自动驾驶示范区互认测试规则与安全标准（建议）。
- **京津冀**：接口=京张走廊延伸——沿既有京张通道把场景清单、开源运行图与人才流动机制向张家口、雄安方向复制推广（建议）。

以上均为待核实的开放接口建议，不构成已确认的合作安排；相关协作事实须在官方或权威来源确认后逐条登记 [depth:risk_missing_data] [source:AGENT-TASKBOOK]。

## 总体设计范围城市更新与控规深度城市设计

### 空间结构：一带三站两翼

总体设计范围（11.4 km²）的空间结构为 **「一带三站两翼」**：**一带**=主运行线绿带（京张遗址公园活力带，南北贯通，宽约 360 米的概念绿廊，含公园绿地、站台慢行道与公共空间节点）[data:geometry/land_use.geojson#LU-GREEN-BELT] [metric:green_belt_land_sqm]；**三站**=三座枢纽站（对应三处重点区，每站配置站前广场与慢行接驳）[data:geometry/public_space.geojson#ST-01] [data:geometry/public_space.geojson#ST-02] [data:geometry/public_space.geojson#ST-03]；**两翼**=东翼中关村科技服务走廊与西翼小月河场景赋能走廊 [data:geometry/land_use.geojson#LU-001] [data:geometry/land_use.geojson#LU-002]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

### 更新对象与功能比例

用地按运行图"横切片（车厢）"语法划分：主运行线为公园绿地（1401），三座枢纽站周边为科研用地（0802）与商业服务业用地（05），两翼为教育（0804）、居住（0701）与文化（0803）用地，形成"中间产业、两翼生活"的功能比例 [data:geometry/land_use.geojson] [metric:industry_research_land_sqm] [metric:residential_land_sqm]。该比例是概念建议：官方控规用地条件缺失，功能比例须在控规用地确定后复算 [depth:land_use_layout] [depth:development_intensity_controls]。

### 城市更新框架与实施政策

更新框架按"保留—改造—新建"三类组织：**保留**——京张铁路遗址公园及其历史构筑物、现状成熟社区；**改造**——老厂房、仓库与低效楼宇改造为产业空间、展示空间与社区服务（如站点文化馆、开发者工坊）；**新建**——三座枢纽站综合体和站前广场、两翼支线的社区服务设施 [depth:retain_renovate_demolish] [data:geometry/phasing.geojson#PH-01]。实施政策建议（概念）包括：场景开放许可、低租金产业空间置换、公共空间共治基金、开发者社区共建协议 [source:AGENT-TASKBOOK]。任何具体地块的拆改留结论都须待现状建筑、权属与控规数据补齐后由专业团队复核 [depth:risk_missing_data]。

## 重点区域详细设计

三处重点区均达到规划综合实施方案的城市设计深度，统一按"定位 + 空间结构 + 建筑更新 + 交通慢行 + 公共空间 + AI 场景 + 实施风险"组织 [depth:three_key_area_detailed_design]。三处重点区多边形均为临时粗略范围（provisional），下列全部结论为方向性设计，官方 polygon 发布后须重算 [source:KEY-AREA-SOURCE]。

### 众智园 AI 自主创新加速区（引擎站，192.1 ha）

- **定位**：AI 全栈自主创新体系的"引擎站"——从基础模型、芯片适配到行业应用的自主技术栈策源地；承载产业测试验证场景与端侧算力试点 [source:AGENT-TASKBOOK]。
- **空间结构**：以"引擎塔"（概念地标）为核心，围绕站前广场组织"全栈创新环"：基础研究片—工程化片—测试验证片—加速器片 [data:geometry/public_space.geojson#ST-03]。
- **建筑更新**：保留五环路沿线生态本底，改造存量产业楼宇为"全栈实验室"，新建部分为测试厂房与算力配套（概念体量，非工程结论）[depth:retain_renovate_demolish]。
- **交通慢行**：依托主运行线北段与横向联络线，组织"测试车辆优先"的专用走廊，与常规慢行分离 [data:geometry/roads.geojson#RD-H4]。
- **AI 场景**：端侧算力与数据沙盒测试场（T3）、全栈成果展示（见第六章班次卡）。
- **实施风险**：产业定位依赖龙头企业生态，需以开放式入驻协议与公共测试设施降低单点依赖 [depth:risk_missing_data]。

### 北京 AI 原点社区（始发站，104.3 ha）

- **定位**：世界级 AI 创新生态的"始发站"——AI 人才与创业者的第一站：落户、孵化、交流、展示 [source:AGENT-TASKBOOK]。
- **空间结构**：以「0 公里里程碑」（概念地标，见第九章）为原点，组织"小街区、密路网"的创业者街区；站前广场作为日常路演与交流场 [data:geometry/public_space.geojson#ST-02]。
- **建筑更新**：保留五道口周边社区肌理与教育用地，改造临街底商为"创业者客厅"，新建人才公寓与孵化楼（概念体量）[depth:retain_renovate_demolish]。
- **交通慢行**：修复五道口周边的慢行断点，设置"首班车"通勤接驳线与高校接驳支线 [data:geometry/roads.geojson#RD-H3]。
- **AI 场景**：晨间通勤 AI 接驳（B01）、开发者夜间专列（B02）、AI 健康驿站（B04，见第六章）。
- **实施风险**：高校周边建筑与用地权属复杂，任何改造须以现状与权属数据为前提 [depth:risk_missing_data]。

### 大钟寺 AI 产业聚集区（枢纽站，72.0 ha）

- **定位**：智能原生新业态的"枢纽站"——AI 消费、商务与展示的换乘节点，连接产业与城市生活 [source:AGENT-TASKBOOK]。
- **空间结构**：以「信号灯广场」（概念地标）为核心，组织"AI 消费街 + 商务楼宇群 + 展示馆"的复合枢纽 [data:geometry/public_space.geojson#ST-01]。
- **建筑更新**：依托大钟寺站 TOD 条件，改造周边低效商业为智能原生业态载体，新建枢纽综合体（概念体量）[depth:retain_renovate_demolish]。
- **交通慢行**：组织轨道接驳、机器人配送支线与商业慢行环 [data:geometry/roads.geojson#RD-H1] [data:geometry/roads.geojson#RD-E1]。
- **AI 场景**：机器人配送支线（B07）、企业服务直通车（B06，见第六章）。
- **实施风险**：商业更新涉及现状商户与权属，须以市场可行性与产权数据复核 [depth:risk_missing_data]。

### 节点级设计（9 处节点，概念级）

在区级设计之下补充 9 处节点级设计（每区 3 处，`confidence=low` 概念级），使方案可在下一阶段被专业团队直接深化为单体方案；节点位置均对应包内几何要素，可在 `geometry/*.geojson` 中复核 [depth:key_node_design] [metric:key_node_count]。

| 节点 | 所在区域 | 核心功能 | AI 场景 | 几何依据 |
| --- | --- | --- | --- | --- |
| N-Z01 引擎塔·全栈创新环心 | 众智园 | 站前广场为核心组织"全栈创新环"，概念地标"引擎塔"承载全栈成果展示与年度「发车季」主会场 | B06 | [data:geometry/public_space.geojson#ST-03] |
| N-Z02 数据沙盒测试场 | 众智园 | 测试验证片内独立围合场地，承载 T3 端侧算力与公共数据沙盒测试 | T3 | [data:geometry/land_use.geojson#LU-001] |
| N-Z03 五环生态绿楔口 | 众智园 | 五环沿线生态本底与主运行线绿带交接点，设生态观测慢行驿站 | B09 | [data:geometry/land_use.geojson#LU-GREEN-BELT] |
| N-O01 0 公里里程碑广场 | 原点社区 | 站前广场设"0 公里里程碑"地标与路演台阶，日常路演与治理议事轮值场地 | B02、B10 | [data:geometry/public_space.geojson#ST-02] |
| N-O02 创业者客厅街 | 原点社区 | 临街底商改造为"创业者客厅+共享工位+24h 开放角"，企业服务停靠点 | B06 | [data:geometry/roads.geojson#RD-H3] |
| N-O03 首班车接驳站 | 原点社区 | 五道口慢行断点修复点，晨间通勤接驳换乘站与"首班车"时刻牌装置 | B01 | [scenario:ai-traffic-walkability] |
| N-D01 信号灯广场 | 大钟寺 | 站前广场设"信号灯"地标（红黄绿=AI 伦理三色），治理班次轮值点 | B10 | [data:geometry/public_space.geojson#ST-01] |
| N-D02 智能原生消费街 | 大钟寺 | TOD 周边低效商业改造为 AI 消费体验街，配送支线沿街运行 | B07 | [data:geometry/roads.geojson#RD-H1] |
| N-D03 枢纽综合体·AI 展示馆 | 大钟寺 | TOD 核心地块新建枢纽综合体，含 AI 展示馆与企业服务柜台 | B06、B08 | [data:geometry/land_use.geojson#LU-003] |

9 处节点的深化顺序按分期推进：P1 先做 N-O01/N-D01/N-Z01 三处站前广场节点（与站前广场工程合一），P2 完成 N-O02/N-D02/N-Z02 三处产业与消费节点，P3 收尾 N-O03/N-D03/N-Z03 三处慢行与生态节点；每处节点均需在现状、权属与官方边界数据到位后由专业团队复核 [depth:phasing_implementation]。

## AI 创新生态、人才画像与 AI+ 场景

### 十张班次卡（AI 场景卡，agent.3）

以"班次"组织 AI 场景：每个场景=一个班次，有明确线路（空间位置）、时刻（运营节奏）、调度员（运营主体）与乘员（服务对象）。十张班次卡如下 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]：

| 编号 | 班次名称 | 线路/位置 | 服务对象 | 对应场景注册 |
| --- | --- | --- | --- | --- |
| B01 | 晨间通勤 AI 接驳 | 原点社区—众智园 | 通勤开发者 | [scenario:ai-traffic-walkability] |
| B02 | 开发者夜间专列 | 原点社区站前广场 | 开发者、学生 | [scenario:enterprise-service-copilot] |
| B03 | 周末家庭慢车 | 主运行线绿带 | 社区居民、家庭 | [scenario:ai-traffic-walkability] |
| B04 | AI 健康驿站 | 两翼社区节点 | 居民、老人 | [scenario:ai-health-service-navigation] |
| B05 | 京张文化导览专列 | 主运行线全带 | 游客、市民 | [scenario:ai-cultural-guide] |
| B06 | 企业服务直通车 | 众智园—大钟寺 | 中小企业、创业者 | [scenario:enterprise-service-copilot] |
| B07 | 机器人配送支线 | 大钟寺站周边 | 商户、消费者 | [scenario:robot-delivery-low-speed] |
| B08 | 公共安全 AI 巡逻班次 | 三座枢纽站周边 | 公众 | [scenario:public-safety-operations-review] |
| B09 | 慢行绿道骑行班次 | 两翼绿道 | 骑行者、通勤者 | [scenario:ai-traffic-walkability] |
| B10 | 城市议事厅·AI 治理班次 | 各站站前广场轮值 | 市民、开发者、管理者 | 治理类班次（场景-空间-运营映射见 compliance_matrix） |

（注：`civic-agent-governance` 为治理类班次的内部编码，正文引用以 `scenarios/` 注册目录为准；每张班次卡的场景-空间-运营映射、数据来源、隐私边界、人工复核与运营主体详见 `compliance_matrix.json` 与 `visual/index.html`，不在此重复机器索引 [source:AGENT-TASKBOOK]。）

十张班次卡的**准入分级与技术水平总览**见 `assets/media/scenario-card-overview.png`（含中英两版）：每卡标注准入等级（L1 概念演示 / L2 试点运行 / L3 常态运营）与 TRL 技术水平刻度，与上表逐卡对应；该总览图已同步嵌入 `report/proposal.html` 与 A3/A0 图纸 [depth:scenario_card_visualization]。

### 三个产业测试验证场景（agent.3）

1. **T1 低速机器人配送走廊**（大钟寺—原点社区段）：在划定慢行廊道内试点机器人配送，明确速度、时段、避让规则与人工接管点，作为可监管、可复核的低速试点 [scenario:robot-delivery-low-speed]。
2. **T2 AI 交通信号调度实验段**（五道口周边）：以仿真先行、逐步实测试点 AI 信号配时，保留人工复核与一键回退，验证通行效率与安全边界 [scenario:ai-traffic-walkability]。
3. **T3 端侧算力与数据沙盒测试场**（众智园）：面向端侧模型与公共数据沙盒的合规测试环境，数据不出沙盒、结果人工复核 [source:AGENT-TASKBOOK]。

### 五类用户画像（agent.3）

- **P1 AI 创业者**（初创团队创始人）：需要低成本空间、资本对接、测试场景与人才招聘；主要活动于原点社区与众智园。
- **P2 开源开发者**：需要 7×24 开放工位、路演场、荣誉展示与社区活动；主要活动于 B02/B10 班次。
- **P3 高校科研人员与学生**：需要与产业界的短距离交流、联合实验与实习通道；依托周边高校与原点社区。
- **P4 社区居民**（含老人与家庭）：需要健康、教育、生活服务与安静的公共空间；使用 B03/B04 班次。
- **P5 商务访客与游客**：需要文化导览、商业消费与快速到达；使用 B05/B07 班次。

所有场景与画像均须遵守隐私与人工复核边界：不得以过度监控实现"智慧"，个人数据使用须公开告知、可撤回、可人工复核 [source:AGENT-TASKBOOK] [standard:GENERATIVE-AI-INTERIM-MEASURES]。

**包容性设计补充（v1.1，概念级）**：为把公共利益从"画像覆盖"推进到"可核查设计" [depth:risk_missing_data]：
- **无障碍**：三座枢纽站站前广场与主运行线慢行道按无障碍通行设计（连续盲道、无高差、语音与文字双通道信息牌），B04 AI 健康驿站设人工柜台与电话通道，与数字界面并行；
- **传统服务并行**：每项 AI 班次均保留等值人工服务入口（B04 驿站人工值守、B06 线下柜台、B08 人工复核指挥席），不以数字服务替代线下服务；
- **弱势群体影响**：低租金产业空间置换设置原租户优先回迁与租金封顶条款（概念建议）；社区公共空间共治基金优先支持老年与儿童使用时段；
- **居民参与**：B10 城市议事厅按季度轮值三站，重大更新项目须经街道共治委员会与居民议事前置程序（概念机制）；
- **公共利益 KPI（建议）**：慢行道无障碍通行率、传统服务并行率、社区公共空间可达 500m 覆盖人口、居民议事参与人次，纳入年度运行图复盘指标（概念口径，非法定指标）。

## 用地、建筑规模与拆改留方案

### 用地布局

用地按运行图"横切片"语法划分并全覆盖提交边界（无缝无重叠，gap=0）[data:geometry/land_use.geojson] [metric:land_use_coverage_sqm] [metric:land_use_gap_sqm]：主运行线绿带为公园绿地（1401，约 363 万 m²），三座枢纽站周边为科研用地（0802）、商业服务业用地（05）与文化用地（0803），两翼为教育（0804）与城镇住宅用地（0701）[metric:industry_research_land_sqm] [metric:residential_land_sqm]。用地分类遵循《国土空间调查、规划、用途管制用地用海分类指南》的代码体系，不采用自造分类 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout]。

### 建筑规模（概念体量）

本包生成 177 栋概念建筑基底（合计约 34.1 万 m²），分布在三座枢纽站周边与两翼生活片，作为产业空间供给的示意 [data:geometry/buildings.geojson] [metric:building_count] [metric:building_footprint_area_sqm]。这些体量**仅用于空间供给讨论**：官方控规的容积率、建筑高度、建筑密度与退线条件均未发布，登记为 `status=unknown` 待补；概念体量不等于法定控制值，也不构成工程可行性结论 [depth:development_intensity_controls] [depth:height_massing_character] [depth:risk_missing_data]。

### 保留 / 改造 / 新建逻辑

- **保留**：京张铁路遗址公园及沿线历史构筑物、现状成熟社区与教育用地（清华东路西口、五道口周边校园肌理）[source:OFFICIAL-ANNOUNCEMENT]。
- **改造**：主运行线两侧老厂房、仓库与低效楼宇改造为产业空间、文化展示与社区服务（"遗址即创新容器"，转译自 King's Cross 经验，见第四章案例）[depth:retain_renovate_demolish]。
- **新建**：三座枢纽站综合体、站前广场与两翼社区服务设施 [data:geometry/phasing.geojson#PH-01]。
- **边界声明**：任何地块的具体拆改留结论须待现状建筑、权属与控规数据补齐后由专业团队复核，本方案不给出地块级结论 [depth:risk_missing_data]。

## 交通、轨道、市政与公共服务设施

### 运行图式交通组织（agent 交通主线）

以"调度"组织交通：主运行线绿带两侧各设一条纵向干路（概念中心线），四条横向联络线连接三座枢纽站与两翼 [data:geometry/roads.geojson#RD-E1] [data:geometry/roads.geojson#RD-W1] [metric:road_centerline_length_m]。慢行系统以"站台慢行道"为主体：沿绿带两侧的 28 米宽纵向公共空间带贯通南北，串联三座站前广场与六处社区广场，修复五道口等既有慢行断点 [data:geometry/public_space.geojson#PS-WL-E] [data:geometry/public_space.geojson#PS-WL-W] [metric:public_space_ratio]。

轨道与接驳策略（概念建议）：①枢纽站与既有轨道站点一体化接驳，设置"首班车"通勤接驳线（B01）；②T2 AI 交通信号调度实验段先行仿真、逐步实测试点，保留人工复核与一键回退 [scenario:ai-traffic-walkability]；③停车与非机动车组织以枢纽站换乘为主，减少穿行交通 [depth:traffic_rail_slow_parking]。

### 市政与新型基础设施

- **分布式能源与水冷**：众智园预留端侧算力与公共算力池接口，配套分布式能源与水冷系统（概念建议）[depth:municipal_new_infrastructure]。
- **海绵城市与排水**：主运行线绿带兼作海绵廊道，衔接清河与北部生态本底 [source:OFFICIAL-ANNOUNCEMENT]。
- **公共服务设施**：两翼社区节点配置教育、医疗、养老与社区服务设施（对应 B04 AI 健康驿站等班次）[scenario:ai-health-service-navigation]。

## 蓝绿空间、公共空间与城市风貌

### 蓝绿骨架：一带一河

**一带**=主运行线绿带（约 360 米宽概念绿廊、绿地率 31.8%）[metric:green_ratio] [data:geometry/green_space.geojson#GS-001] [depth:blue_green_public_space]：南北贯通遗址公园活力带，串联三座枢纽站，是文化、生态与公共生活的共同载体。**一河**=小月河蓝绿走廊（西翼概念示意线），衔接两处社区公园形成"绿带+河廊"双骨架 [data:geometry/green_space.geojson#GS-003] [data:geometry/constraints.geojson#CONST-WATER-001]。

### 三处 AI 朝圣地标与荣誉展示体系（agent.4）

| 编号 | 地标 | 位置 | 概念 |
| --- | --- | --- | --- |
| L1 | 0 公里里程碑 | AI 原点社区站前广场 | 原点=AI 创新起点，里程碑刻录每年"从这里出发"的团队名单（荣誉展示）[data:geometry/public_space.geojson#ST-02] |
| L2 | 引擎塔 | 众智园 | 全栈创新成果的垂直展示塔，顶楼开放观景与路演（概念构筑物）[data:geometry/public_space.geojson#ST-03] |
| L3 | 信号灯广场 | 大钟寺 | 红黄绿三色信号灯艺术装置=AI 伦理三色（安全边界/人工复核/开放运行），夜间可变色演出（概念装置）[data:geometry/public_space.geojson#ST-01] |

荣誉展示体系：沿线设置"开源贡献者提交墙"（Commit Wall）——以运行图折线为底图，展示为一带贡献过代码、数据与场景的开发者与团队；所有地标与装置均为概念建议，不构成已批准建设项目，未使用未清权字体、图像、人物或企业标识 [source:AGENT-TASKBOOK] [depth:blue_green_public_space]。

### 城市风貌

风貌基调为"轨道工业记忆 + 当代科技轻盈"：保留铁路遗址的锈红、枕木与站台元素作为底色，新建建筑以轻盈立面与通透首层回应；沿主运行线控制建筑高度与体量（待控规高度条件发布后落实），屋顶形态鼓励光伏与绿化 [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:height_massing_character]。

## 更新项目清单、实施政策与分期计划

### 项目清单与分期

| 分期 | 项目 | 图层 |
| --- | --- | --- |
| P1 近期（2026—2028） | 三座枢纽站站前广场与慢行道贯通、原点社区创业者街区改造、大钟寺智能原生业态试点、主运行线绿带核心段 | [data:geometry/phasing.geojson#PH-01] |
| P2 中期（2028—2031） | 两翼支线激活：科技服务翼企业服务直通车节点、小月河场景翼社区公园与健康驿站、众智园测试场一期 | [data:geometry/phasing.geojson#PH-02] |
| P3 远期（2031—2035） | 外围更新片提质、全带风貌提升与年度运行图常态化运营 | [data:geometry/phasing.geojson#PH-03] |

政策建议（概念）：场景开放许可制度、低租金产业空间置换、公共空间共治基金、开发者社区共建协议、测试场景安全责任清单 [source:AGENT-TASKBOOK] [depth:phasing_implementation] [depth:renewal_project_list]。

### 运营实施矩阵（项目 × 责任主体 × 资金来源 × 里程碑）

| 编号 | 项目 | 分期 | 概念责任主体 | 概念资金来源 | 里程碑（概念） |
| --- | --- | --- | --- | --- | --- |
| JZ-01 | 三座枢纽站站前广场与慢行道贯通 | P1 | 区属平台公司 + 街道共治委员会 | 政府专项 + 公共空间共治基金 | 2027 年三站广场建成投用 |
| JZ-02 | 原点社区创业者街区改造 | P1 | 国资存量改造运营平台 + 高校双创联盟 | 低租金产业空间置换基金 + 社会资本 | 2028 年首批约 50 家团队入驻 |
| JZ-03 | 大钟寺智能原生业态试点 | P1 | 商业运营公司 + AI 企业联盟 | 市场化招商 + 场景开放许可 | 2027 年试点开街 |
| JZ-04 | 众智园测试场一期 | P2 | 测试场运营主体 + 行业组织 | 公共测试基金 + 龙头企业共建 | 2030 年投运 |
| JZ-05 | 小月河健康驿站与社区公园 | P2 | 街道 + 医疗机构 + 社区组织 | 民生专项资金 | 2031 年建成 |
| JZ-06 | 年度运行图常态化运营 | P3 | 运营共同体（政府 + 企业 + 社区 + 开发者） | 活动基金 + 赞助 + 票务 | 2035 年品牌化运营 |

以上责任主体、资金与里程碑均为概念建议，不构成已确定的政府安排、招商承诺或资金承诺 [source:AGENT-TASKBOOK] [depth:phasing_implementation]。

### 年度运行图：全球 AI 创新活动体系与长期运营（agent.6）

- **年度运行图**：以一张"运行图"调度全年活动——春季「发车季」（开源大会、场景开放清单发布）、夏季「越障赛」（开发者马拉松、测试场景开放日）、秋季「换乘周」（国际传播与招引转化、企业对接）、冬季「回库季」（年度运行图复盘与下一年发车计划）。
- **品牌 IP**：以三色信号灯与运行图折线为统一视觉，衍生站牌、车票、印章等纪念品体系（概念方向）[depth:phasing_implementation]。
- **开发者社区运营**：以开源方式发布"运行图本体"（场景清单、数据字典、评估指标），社区可提交新班次（PR 式提案），经人工复核后并入下一年度运行图。
- **场景开放运营**：每个班次公开时刻、线路与调度员；公共体验与地标运营采用共治基金模式。
- **国际传播与转化**：以"百年运行图"叙事参加国际设计周与开源大会，建立招引转化路径（活动→访问→入驻→共建）。
- 以上均为概念建议，不构成已确定的政府安排、招商承诺或资金承诺 [source:AGENT-TASKBOOK]。

## 指标体系、面积复算与合规矩阵

核心指标及其设计含义如下 [depth:metrics_recalculation] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]：

**口径说明**：`land_use.geojson` 中的绿地地块（如 LU-GREEN-BELT 公园绿地）为**用地分类统计口径**（按《国土空间调查、规划、用途管制用地用海分类指南》代码体系），`green_space.geojson` 为**蓝绿空间要素口径**（绿地要素本体），两者统计同一绿地的不同层级，面积存在差异属预期现象；各指标的计算公式（formula）与来源文件（source_files）逐条登记于 `metrics.json`，不把百分比、面积与长度置于同一未注明量纲的比较轴 [depth:metrics_recalculation] [metric:green_belt_land_sqm] [metric:green_ratio]。

- **site_area_sqm（11,412,825 m²）**：提交边界面积，与公告 11.4 km² 一致 [metric:site_area_sqm]。
- **green_ratio（31.8%）**：绿地率支撑人才生活的"慢生活"供给，主运行线绿带是核心载体 [metric:green_ratio]。
- **public_space_ratio（3.5%）**：站台慢行道+站前广场+社区广场构成的公共空间网络，支撑创新交往 [metric:public_space_ratio]。
- **key_area_count（3）与 key_area_total_sqm**：三处重点区复算面积合计约 369.3 ha，与公告 368.4 ha 偏差 +0.24%（临时边界）[metric:key_area_count] [metric:key_area_total_sqm]。
- **scenario_node_count（10）**：十张班次卡对应的场景节点 [metric:scenario_node_count]。

- **road_centerline_length_m（约 24,943 m）**：概念道路中心线总长 [metric:road_centerline_length_m]。
- **官方控规指标**：容积率、高度、密度、绿地率全部 `unknown`，待正式数据补齐后复算 [metric:floor_area_ratio_official] [metric:green_ratio_official]。

合规覆盖：公告 1.3/1.4/1.5 全部任务与 agent.1—agent.6 六项任务逐条映射到 `compliance_matrix.json` [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]；五项强制性专业标准映射到 `standard_matrix.json`，十五项设计深度项全部 `complete` 于 `design_depth_matrix.json` [standard:MOHURD-URBAN-DESIGN-MEASURES]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 标准响应与设计深度证据

本方案逐项响应五项强制性标准：①公告（PROJECT-OFFICIAL-ANNOUNCEMENT）——三层范围、三处重点区、任务与成果语境 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]；②任务书（PROJECT-AGENT-OPEN-CALL-TASKBOOK）——三大定位、五大功能、三区两翼、六项任务与边界条款 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]；③《城市设计管理办法》（MOHURD-URBAN-DESIGN-MEASURES）——公共空间、风貌、建筑体量控制要求 [standard:MOHURD-URBAN-DESIGN-MEASURES]；④《控规编制审批办法》与⑤《用地用海分类指南》——区分已知控制条件与待确认事项、用地代码合规，缺口全部登记于 `standard_matrix.json` [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。

设计深度十五项（现状诊断、三层框架、空间结构、用地布局、强度控制、高度体量、拆改留、交通慢行、蓝绿公共空间、市政新基建、更新项目、分期实施、重点区详设、指标复算、风险缺口）全部 `complete`，逐项证据见 `design_depth_matrix.json` [depth:three_key_area_detailed_design] [depth:metrics_recalculation] [depth:risk_missing_data]。

## 风险、版权与合规说明

- **数据与几何风险**：官方精确边界、控规条件、现状建筑、权属与工程数据缺失；本包使用临时边界并登记复算路径，官方数据发布后整链重算 [depth:risk_missing_data] [source:BOUNDARY-SOURCE]。
- **实施风险**：产业生态依赖外部环境，测试场景依赖监管许可；所有机制均为概念建议 [source:AGENT-TASKBOOK]。
- **版权与清权**：本方案由 AI agent 生成，未使用个人隐私数据、受保护的未公开数据或需授权使用的数据；Logo 与导视为原创概念方向，地图与几何基于仓库公开资料与临时边界。**逐资产版权/来源台账**（字体、生成工具与模型、图件、Logo、代码依赖、地图与数据转换的作者、许可证、允许用途与限制）见 `report/copyright_statement.md`；其中文化素材清权（A-CULTURE-CLEARANCE）登记为 `pending_clearance`，在权利人确认前不扩大使用范围，正文不绝对化宣称全部素材已清权 [source:AGENT-TASKBOOK] [depth:risk_missing_data]。
- **法律边界**：本方案不构成正式规划、审批依据、工程可行性结论或政府实施承诺；"运行图""班次卡""枢纽站"等名称均为概念命名，不影射既有商标与机构 [source:AGENT-TASKBOOK]。
- **隐私与人工复核**：所有 AI 场景（尤其 B04/B08/B10）遵循最小化数据采集、公开告知、可撤回、人工复核与一键回退原则 [standard:GENERATIVE-AI-INTERIM-MEASURES] [standard:BARRIER-FREE-ENVIRONMENT-LAW]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 参考资料

- 公告与任务书：`brief/site-package/design_brief.json`、`brief/site-package/agent_taskbook.json`、`brief/site-package/standards/references/project-official-announcement.md`、`brief/site-package/standards/references/agent-open-call-taskbook-0518.md` [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]
- 几何与边界：`brief/site-package/geometry/provisional_boundaries.geojson`、`brief/site-package/geometry/provisional_boundaries_basis.md` [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]
- 来源登记与资料包：`data/source_registry.json`、`brief/site-package/sources.json`、`brief/site-package/enums/`、`brief/site-package/ranges/planning_limits.json`、`brief/site-package/schemas/` [source:SOURCE-REGISTRY] [source:SITE-PACKAGE]
- 标准快照：`brief/site-package/standards/standards.json` 及其 `references/` 目录全部本地快照 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]
