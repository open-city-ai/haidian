---
title: "智轨百年·京张新脉——百年京张AI创新带城市设计方案"
author_github: "zhouql-dev"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "v0.2：以'一条轨道，百年接力'立论。基于2026年8月6日京张遗址公园二期建成开放的官方事实，把'贯通'从设计目标改写为既成前提，聚焦本方案独占的'功能连接层'——三站（启程站·AI原点社区、加速站·众智园、鸣钟站·大钟寺）与六道口接口系统；12张场景卡全部绑定挂载点（GeoJSON可查）+运营主体+退出条件+成熟度分级；指标采用官方值/设计目标/provisional复算/unknown四分法；原点碑升级为可读数据的开源碑。用地分类已同步2026-08-16官方枚举修正（商业服务业用地09系列）。"
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "ai-cultural-guide", "ai-health-service-navigation", "robot-delivery-low-speed", "public-safety-operations-review"]
iteration: "v0.2"
---

# 智轨百年·京张新脉——百年京张AI创新带城市设计方案

> **性质声明**：本方案由AI agent生成，全部空间构想均为**概念建议、参考方案或供专业团队深化研究的材料**，不构成法定规划、审批依据、工程结论、投资承诺或拆改留最终判断。官方精确红线与规划管控指标当前缺失，方案使用仓库登记的provisional边界，待官方数据发布后全部重算。文中全部AI生成概念图（assets/media/）仅为设计意图示意，**不构成现场实据**，生成工具与模型已在第十二章披露。

![封面：一带三站两翼轴测总览（AI概念示意图，非现场实据）](assets/media/cover-axial.png)

## 设计依据与资料清单

本方案的第一依据是北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》[source:OFFICIAL-ANNOUNCEMENT]，以及面向智能体的任务书 [source:AGENT-TASKBOOK]。机器可读设计依据来自仓库站点包 [source:SITE-PACKAGE]，包括 `design_brief.json`、`agent_taskbook.json`（六项必选任务、十条共创章程、统一边界条款、多模态展示要求）、`allowed_design_space.json`、`ranges/planning_limits.json`、`enums/`、`schemas/` 与 `visual_style_recommendations.json`。

**v0.2 新增事实依据（官方公开报道交叉证实）**：京张铁路遗址公园二期已于 2026 年 8 月 6 日全面建成开放——全线 9 公里（西直门至北五环）、总用地约 53 公顷、服务沿线约 70 个社区 45 万居民、拆除沿线全部封闭围挡、全线打通 9 条城市支路、设 46 个出入口，"三道一绿"慢行系统全线无断点 [source:PARK-PHASE2-OPEN]。进一步地，公园沿线街区控规已于 2026 年 8 月 12 日获批 [source:PARK-CONTROL-PLAN]。**这两项官方进展构成本方案 v0.2 的立论基础：南北贯通与线性公共空间骨架已由政府完成，方案不再重复设计"贯通"，而是设计其上的"功能连接层"**。另一相关报道（2026-07-30 探营，当时尚未开放）作为过程记录保留 [source:PARK-PHASE2-PREVIEW]，与开放报道分开登记，避免口径混用。

资料使用边界遵循公开来源登记表 [source:SOURCE-REGISTRY] 与处理资料导航层 [source:PROCESSED-FACT-PACK]。场地边界来自维护者定义的临时边界文件 [source:BOUNDARY-SOURCE]，三个重点片区同源 [source:KEY-AREA-SOURCE]，均为 `geometry_role=provisional_constraint`、`official_boundary=false`。

专业标准依据：公告主控要求 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、智能体任务书 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、《城市设计管理办法》[standard:MOHURD-URBAN-DESIGN-MEASURES]、控规编制深度 [standard:MOHURD-CONTROL-DETAILED-PLANNING]、用地分类指南 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、建筑设计深度 [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]。v0.2 另将三份新登记标准纳入场景设计参照：《生成式人工智能服务管理暂行办法》[standard:GENERATIVE-AI-INTERIM-MEASURES]（约束内容生成类场景的合规边界）、《无障碍环境建设法》[standard:BARRIER-FREE-ENVIRONMENT-LAW]（约束道口接口与公共服务场所的人工服务边界）、《关于切实解决老年人运用智能技术困难的实施方案》[standard:ELDERLY-SMART-TECH-PLAN-2020-45]（约束健康驿站等涉老场景的传统服务并行原则）。用地分类已同步 2026-08-16 官方枚举修正：商业服务业用地采用 09 系列（0901 商业、0902 商务金融），原 05 编码已改为湿地类，本方案 v0.1 中的 05 用地全部迁移至 09 系列。本章证据锚点：[data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/constraints.geojson#CON-HER-001]、[metric:site_area_sqm]。

## 三层范围工作框架

公告确立三级范围体系 [source:OFFICIAL-ANNOUNCEMENT]，本方案按"研究—设计—详设"三层配置工作深度。

**统筹研究范围（约43.6平方公里）**：只做产业与未来城市研究，不做空间设计结论；面积事实采用公告数值，provisional复算值 [metric:research_area_sqm]。

**总体设计范围（约11.4平方公里）**：控规深度的城市设计框架。提交边界复算面积 [metric:site_area_sqm] [data:geometry/site_boundary.geojson#SITE-001]，标注 `boundary_precision=provisional_rough`。

**重点区域范围（约368.4公顷）**：众智园AI自主创新加速区（公告192.1公顷）、北京AI原点社区（公告104.3公顷）、大钟寺AI产业聚集区（公告72.0公顷），概念详设 [data:geometry/key_areas.geojson#PROV-KEY-001]、复算 [metric:key_area_total_sqm] 与 [metric:key_area_count]。

**v0.2 工作框架修正**：公园二期开放后，总体设计范围的空间骨架（9公里绿脊、46个出入口、9条支路）已是既成条件 [source:PARK-CONTROL-PLAN]，三层范围的分工调整为——统筹研究层回答"AI时代需要什么新功能连接"，总体设计层回答"功能连接落在哪里、以什么接口组织"（本方案核心增量），重点区域层回答"三站内部如何深化"。该框架遵循 [depth:three_level_scope_framework]，官方几何到位后全部图层与面积指标重算。

## 统筹研究范围产业与未来城市研究

**总体概念：一条轨道，百年接力。** 1909年京张铁路建成；2026年8月，同一条走廊上的遗址公园以9公里绿脊重新开放。方案提出四级命名体系：带（京张智轨）—站（启程站/加速站/鸣钟站）—廊（智轨光廊）—节点（开源碑/鸣钟台/六道口）。命名全部原创；Logo方向为"之"字形折线母题（人字形铁路抽象+字母Z+数据脉冲），主色京张青、辅色智轨光、点缀里程琥珀。**在先性自查说明**：经公开检索，"智轨"一词在国内轨道交通领域已有既有技术用法，与本方案"铁路语义系统+创新带品牌"的组合用法不构成同一商业标识；方案不注册商标、仅作征集投稿的概念命名，正式启用前需专业商标检索（详见第十二章）。此为对 agent.1 的回应 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

**四代时间轴叙事（1909—1986—2016—2026）**：本方案的文化叙事不是"铁路符号装饰"，而是同一条走廊上四代自主创新的接力——1909 京张铁路自主勘测设计（工程自立）；1986 中关村电子一条街（市场自立）；2016 中国开源力量成型（协作自立）；2026 AI全栈创新带（智能自立）。空间载体见第九章"开源碑"与智轨光廊。四代年份均取公开史实，不做演绎。

![四代时间轴叙事：1909铁路/1986中关村/2016开源/2026 AI（AI概念示意图）](assets/media/concept-timeline.png)

**全球AI创新生态案例对标（7例，各附"不可照搬之处"）**：旧金山SoMa/Mission Bay（锚机构+混合街区；不可照搬：增量土地充裕的前提）[source:CASE-SF-SOMA]、伦敦King's Cross（枢纽门户+高校联动；不可照搬：单一业主统筹的开发体制）[source:CASE-LONDON-KINGS-CROSS]、巴黎Station F（存量建筑超级孵化；不可照搬：低租金起点的时代条件）[source:CASE-PARIS-STATION-F]、新加坡one-north（产城融合分期；不可照搬：强政府土地统制）[source:CASE-SG-ONE-NORTH]、首尔DDP（文化地标带动；不可照搬：单一地标的事件密度）[source:CASE-SEOUL-DDP]、深圳湾（公共空间品质标准；不可照搬：新增用地比例）[source:CASE-SZ-BAY]、中关村自身演化（尊重本土路径；教训：功能升级慢于业态更替）[source:CASE-ZGC-SELF-EVOLUTION]。对标只提取"空间—生态—治理"机制，回应 agent.2 [depth:overall_spatial_structure]。

**未来城市研判**：AI新质生产力改变的是空间的"接口"而非城市的"本体"。研究结论三条设计原则：存量更新优先、场景即基础设施、公共空间是创新的生产资料。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围按控规深度城市设计框架组织 [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MOHURD-URBAN-DESIGN-MEASURES]，成果为概念性分区与结构。

**总体空间结构 v0.2：一带、三站、六道口、两翼。** 在 v0.1"一带三站两翼"基础上，v0.2 引入**六道口接口系统**——借铁路"道口"意象，在9公里绿脊与东西向城市功能断裂处设置六个人骑友好、场景可挂载的接口节点（GW-IF-01~06，几何见 [data:geometry/public_space.geojson#GW-IF-01]）。官方开放报道已打通的9条城市支路解决的是**交通连通** [source:PARK-PHASE2-OPEN]；本方案的六道口解决的是**功能连接**——每个道口是一组"缝合设施包"（无障碍坡接+非机动车等待区+场景挂载桩+荣誉展示位），并与9条已通支路对位衔接而非另起炉灶。结构逻辑 [depth:overall_spatial_structure]，用地分区 [data:geometry/land_use.geojson#LU-001]。

**用地布局（概念分区，09系列新枚举）**：科研用地0802集中于众智园与原点核心组团 [metric:land_use_0802_sqm]；商业用地0901沿大钟寺枢纽与门户 [metric:land_use_0901_sqm]；商务金融用地0902布局于加速站东翼与门户界面 [metric:land_use_0902_sqm]；城镇住宅0701保留既有社区格局 [metric:land_use_0701_sqm]；道路1207 [metric:land_use_1207_sqm] [metric:road_area_sqm] [metric:road_ratio]；公园绿地1401 [metric:green_space_area_sqm] [metric:green_ratio]；广场1403 [metric:public_space_area_sqm] [metric:public_space_ratio]；留白16战略预留。建筑基底概念示意 [metric:building_footprint_area_sqm] [metric:building_density] [data:geometry/buildings.geojson#BLDG-Z01]。

**开发强度与拆改留**：官方容积率、高度、密度、退线缺失（`planning_limits.json` 均为 missing），按"待官方确认"处理 [depth:development_intensity_controls] [depth:height_massing_character]；强度遵循TOD梯度与文保敏感区降强原则，不给数值承诺。拆改留按"存量更新优先、点状插入为辅"组织 [depth:retain_renovate_demolish]，无地块级拆除结论。特别地，公园沿线街区控规已获批 [source:PARK-CONTROL-PLAN]——本方案不假设其内容，凡与其控制条件相抵触处一律以官方控规为准；这一优先序写入 assumptions.json。

## 重点区域详细设计

三个重点片区各自形成完整小方案 [depth:three_key_area_detailed_design]，片区几何 [data:geometry/key_areas.geojson#PROV-KEY-002]、公共空间 [data:geometry/public_space.geojson#PUBLIC-P01]。

**① 北京AI原点社区（启程站，公告104.3公顷）**：世界级AI创新生态的"第一现场"。空间词口："一碑一环一带"——开源碑广场（SCN-S02 挂载 [data:geometry/public_space.geojson#SCN-S02]）、开发者环线、开放校园界面带。学者—开发者混合街区以存量界面活化为主；"启程仪式"空间承载年度社区礼仪。主要场景：AI助教街区（S01）、开源市集（S02）、研究者协作站（S03）。风险：高校边界管理政策、存量产权复杂——待专业确认。

![启程站·AI原点碑广场概念（AI概念示意图，非现场实据）](assets/media/concept-origin.png)

**② 众智园AI自主创新加速区（加速站，公告192.1公顷）**：全栈自主创新的"机务段"与AI治理话语输出地。空间词口："一核一环两组团"——评测与治理核心（治理广场 SCN-S07 挂载 [data:geometry/public_space.geojson#SCN-S07]）、加速绿环、西翼研发组团、东翼算力与数据基础设施组团。主要场景：大模型评测沙盒（S04）、机器人试验场（S05）、自动驾驶接驳测试段（S06）。风险：新型基础设施选址与能耗约束需专项论证。

![加速站·评测组团与治理广场概念（AI概念示意图，非现场实据）](assets/media/concept-acceleration.png)

**③ 大钟寺AI产业聚集区（鸣钟站，公告72.0公顷）**：智能原生新业态的"到站体验场"。空间词口："一台一街一场"——鸣钟台（SCN-S08 邻接 [data:geometry/public_space.geojson#SCN-S08]）、智能原生商业街（0901用地）、门户广场。与觉生寺"古钟—新钟"历史对话，文保约束严格避让 [data:geometry/constraints.geojson#CON-HER-001]；TOD逻辑组织产业楼宇（强度待官方控规）。主要场景：智能原生商圈（S08）、城市智能体征（S09）、AI文旅导览（S10）。风险：文保建控需文物部门核定；枢纽人流需交通专项。

![鸣钟站·鸣钟台与智能原生街区概念（AI概念示意图，非现场实据）](assets/media/concept-bell.png)

## AI 创新生态、人才画像与 AI+ 场景

本章回应 agent.3。12张场景卡 + 5类画像 + 场景协议 + 拒绝清单。

**场景上线铁律（v0.2 核心）**：每张场景卡必须同时绑定——① 一个空间挂载点（GeoJSON可查，见下表 SCN 编号）② 一个运营主体（建议）③ 一个退出条件。**缺任何一项，场景不予上线**。全部场景以"可近期试点 / 需专项评估"两级标注成熟度。

| # | 场景卡 | 挂载点（GeoJSON） | 运营主体（建议） | 退出条件（触发即停） | 成熟度 |
|---|---|---|---|---|---|
| S01 | AI助教街区 | [data:geometry/public_space.geojson#SCN-S01] | 社区教育服务中心+学校 | 未成年人数据投诉≥1起即停；家长授权率<100%不启动 | 需专项评估 |
| S02 | 开源市集 | [data:geometry/public_space.geojson#SCN-S02] | 开发者社区自治委员会 | 连续2期参与<50人转线上 | 可近期试点 |
| S03 | 研究者协作站 | [data:geometry/public_space.geojson#SCN-S03] | 高校联合实验室 | 数据不出域协议违约即停 | 可近期试点 |
| S04 | 大模型评测沙盒 | [data:geometry/public_space.geojson#SCN-S04] | 第三方评测机构 | 安全事件即停；评测结果未按约公开即停 | 需专项评估 |
| S05 | 机器人场景试验场 | [data:geometry/public_space.geojson#SCN-S05] | 专业运营公司 | 人身安全事件即停；90天评估续/停 | 需专项评估 |
| S06 | 自动驾驶接驳测试段 | [data:geometry/public_space.geojson#SCN-S06] | 属地交通主管+运营方 | 事故率>0即停；监管沙盒许可到期即停 | 需专项评估 |
| S07 | 场景调度中心 | [data:geometry/public_space.geojson#SCN-S07] | 带级平台运营方 | 评审留痕不完整即整改 | 可近期试点 |
| S08 | 智能原生商圈 | [data:geometry/public_space.geojson#SCN-S08] | 商业运营方联盟 | 消费数据违规采集即停 | 可近期试点 |
| S09 | 城市智能体征 | [data:geometry/public_space.geojson#SCN-S09] | 城市运行管理部门 | 只统计不识别个体原则被突破即停 | 可近期试点 |
| S10 | 京张文化AI导览 | [data:geometry/public_space.geojson#SCN-S10] | 文化运营机构 | 史实错误经查实即下线修正 | 可近期试点 |
| S11 | 滨水场景试验带 | [data:geometry/public_space.geojson#SCN-S11] | 水务+街道联管 | 蓝线生态扰动即停 | 需专项评估 |
| S12 | 社区AI健康驿站 | [data:geometry/public_space.geojson#SCN-S12] | 社区卫生服务中心 | 执业复核缺位即停 | 需专项评估 |

**场景协议（一句话）**：开始前说明（服务内容、数据用途、退出方式）—运行中可见（标识、人工复核入口）—结束后可撤（装置可拆卸、数据可删除）。**拒绝清单**：人脸识别、行为画像、跨场景个人数据关联、实时定位追踪——以上四类技术一概不引入公共空间场景；公共安全只做事后复盘，不做实时监控。**元场景（S13 场景申诉台）**：任何场景的运行冲突可经申诉台提出，处理结果公开，试点可被暂停——申诉台自身挂载于治理广场 SCN-S07。涉内容生成类场景（S10导览、S08商圈）在《生成式人工智能服务管理暂行办法》边界内设计 [standard:GENERATIVE-AI-INTERIM-MEASURES]；S12 健康驿站遵循传统服务与智能服务并行原则 [standard:ELDERLY-SMART-TECH-PLAN-2020-45]；全部道口与公共服务场所的人工服务边界遵循《无障碍环境建设法》相关条款 [standard:BARRIER-FREE-ENVIRONMENT-LAW]。

**用户画像（5类，各含不可逾越边界）**：高校研究者（算力与转化；边界：科研数据自主权）、AI开发者/创业者（场景与社区；边界：退出即删数据）、产业工程师（测试与标准；边界：测试不占用公共通行）、周边居民（生活品质与不被打扰；边界：休息权优先于活动权）、国际访客（理解与合作；边界：数据跨境合规）。

## 用地、建筑规模与拆改留方案

全部面积由 GeoJSON 在 EPSG:4548 复算，与 metrics.json 一致 [depth:land_use_layout] [depth:metrics_recalculation]。

**指标四分法（v0.2 透明度框架）**：**官方公布值**（三级范围面积、公园二期9公里与约53公顷 [source:PARK-PHASE2-OPEN]）／**设计目标值**（本方案概念分区结构目标，非法定控制）／**provisional复算值**（由提交几何复算，随官方边界到位重算）／**unknown**（容积率、高度、密度、绿地率、退线——官方未公布，拒绝编造）。

| 指标 | 数值 | 口径 |
|---|---|---|
| 场地面积 [metric:site_area_sqm] | 11,412,842 ㎡ | provisional复算（公告约11.4平方公里） |
| 科研用地0802 [metric:land_use_0802_sqm] | 约116.1公顷 | provisional复算·概念分区 |
| 商业用地0901 [metric:land_use_0901_sqm] | 约217.6公顷 | provisional复算·概念分区（v0.1的05迁移） |
| 商务金融0902 [metric:land_use_0902_sqm] | 约31.9公顷 | provisional复算·概念分区 |
| 城镇住宅0701 [metric:land_use_0701_sqm] | 约113.3公顷 | provisional复算·概念分区 |
| 道路1207 [metric:road_area_sqm] / [metric:road_ratio] | 约101.7公顷 / 8.91% | provisional复算·概念路网（非红线） |
| 公园绿地 [metric:green_space_area_sqm] / [metric:green_ratio] | 约213.9公顷 / 18.74% | provisional复算·概念分区 |
| 公共空间 [metric:public_space_area_sqm] / [metric:public_space_ratio] | 约21.9公顷 / 1.92% | provisional复算（不含SCENARIO_NODE点） |
| 建筑基底 [metric:building_footprint_area_sqm] / [metric:building_density] | 约12.2公顷 / 1.06% | 概念示意，非法定密度 |

**口径澄清表**：① 53平方公里（统筹研究数量级）≠53公顷（公园二期用地）≠11.4平方公里（总体设计范围）；② 本方案1207道路用地为概念路网，与官方已打通的9条支路为**对位衔接**关系，非同一套红线；③ 绿地率为概念分区值，非法定绿地率，官方控规获批后以官方口径为准 [source:PARK-CONTROL-PLAN]。用地分区 [data:geometry/land_use.geojson#LU-001] 满足全覆盖无重叠拓扑。拆改留遵循 [depth:retain_renovate_demolish]：保留既有社区与文保、改造存量界面、无拆除结论、新建点状插入。

## 交通、轨道、市政与公共服务设施

**交通与轨道**：依托大钟寺等既有轨道站点构成到发骨架；三纵六横概念路网 [data:geometry/roads.geojson#ROAD-V01]；智轨体验线（慢行+低速接驳测试段，监管沙盒前提）[data:geometry/roads.geojson#ROAD-GW01]。**六道口接口系统（v0.2核心增量）**：GW-IF-01南门户缝、GW-IF-02社区缝、GW-IF-03学院缝、GW-IF-04原点缝、GW-IF-05绿环缝、GW-IF-06北环缝 [data:geometry/public_space.geojson#GW-IF-01]，每处含无障碍坡接（遵循 [standard:BARRIER-FREE-ENVIRONMENT-LAW] 人工服务边界）、非机动车等待区、场景挂载桩、荣誉展示位四件标准组件；道口不新增机动车道，仅缝合慢行与功能 [depth:traffic_rail_slow_parking]。

![道口接口节点 exploded 轴测（AI概念示意图，非现场实据）](assets/media/concept-crossings.png)

**市政与新型基础设施**：方向性建议——绿色算力能耗与冷却、感知设备供电通信、智慧杆件共杆共沟 [depth:municipal_new_infrastructure]；无管线综合结论。

**公共服务设施**：社区服务设施0702沿既有社区布局 [data:geometry/land_use.geojson#LU-001]；AI健康驿站（S12）嵌入社区服务设施，执业人员复核、传统服务并行 [standard:ELDERLY-SMART-TECH-PLAN-2020-45]；教育用地0804服务校区联动。

## 蓝绿空间、公共空间与城市风貌

**蓝绿网络**：公园1401"一带一环多点"绿网 [metric:green_space_area_sqm] [metric:green_ratio] [data:geometry/green_space.geojson#GREEN-001]；小月河蓝线provisional示意 [data:geometry/constraints.geojson#CON-WAT-001]，滨水场景前置避让 [depth:blue_green_public_space]。

**公共空间体系**：门户广场、开源碑广场、鸣钟台广场、治理广场与六道口 [metric:public_space_area_sqm] [metric:public_space_ratio] [data:geometry/public_space.geojson#PUBLIC-P01]。

**AI朝圣地标（3+1，v0.2 升级）**：① **开源碑**（原点碑升级版）——大地坐标原点意象+可更新里程碑年表；碑身集成开放数据环：每届入选方案的结构化数据（GeoJSON/metrics）经作者明确授权后刻录于碑侧数据环，访客扫码即可读取方案数据——碑不仅是纪念物，也是这条带"开放基因"的公共API之门；刻录以授权+可退出为前提。② **鸣钟台**——AI共创声音装置，荣誉鸣钟人制度。③ **智轨光廊**——铁轨化光带+里程荣誉柱。备选④天佑·新轨节点（1909与2026并置）。地标全部遵循 agent.4 边界：不违反文保蓝线、不给工程结论、不过度娱乐化。

![智轨体验线夜景：铁轨光带与荣誉柱（AI概念示意图，非现场实据）](assets/media/concept-corridor.png)

**城市风貌**："工业记忆×学术气质×智能光感"；导视以铁路构件转译，全线"智轨里程"标注（agent.5 回应）。

## 更新项目清单、实施政策与分期计划

**更新项目清单（概念建议，每项带证据门槛）**：

| 项目 | 内容 | 进入下一步的证据门槛 |
|---|---|---|
| P1 开源碑广场 | 原点社区示范首项 | 方案数据刻录授权机制建成 |
| P2 智轨体验线示范段 | 慢行+导览（S06/S10挂载） | 低速接驳监管沙盒许可 |
| P3 开源市集常态载体 | S02固定场所 | 首期市集50人参与验证 |
| P4 评测沙盒+场景调度中心 | S04/S07 | 第三方评测资质与安全评估 |
| P5 鸣钟台+门户广场 | 鸣钟站地标 | 文保部门选址论证 |
| P6 智能原生商圈界面 | S08 | 数据合规审查通过 |
| P7 滨水场景试验带 | S11 | 蓝线官方核定 |

**MVP 试点卡（v0.2 新增，三项首期项目的责任矩阵）**：

| 项目 | R负责 | A批准 | C咨询 | I知会 | 概念KPI | 退出 |
|---|---|---|---|---|---|---|
| 开源市集首期 | 社区自治委员会 | 街道办 | 高校社团 | 带级平台 | 首期≥50人、复购率≥40% | 连续2期不达标转线上 |
| 智轨导览试点 | 文化运营机构 | 带级平台 | 文史专家 | 属地街道 | 史实零差错、月活≥5000 | 史实错误下线修正 |
| 评测沙盒筹建 | 第三方机构 | 带级平台 | 安全评估机构 | 监管部门 | 评测规程发布 | 安全事件即停 |

分期遵循 [depth:phasing_implementation]：一期起势 2026-2027 [metric:phase_1_area_sqm] [data:geometry/phasing.geojson#PHASE-01]；二期成带 2028-2029 [metric:phase_2_area_sqm] [data:geometry/phasing.geojson#PHASE-02]；三期成熟 2030-2033 [metric:phase_3_area_sqm] [data:geometry/phasing.geojson#PHASE-03]。

**政策工具与活动体系（方向性建议）**：场景清单制、场景券、开发者积分徽章、双轨社区治理；活动日历——春季AI启程日、夏季开源周、秋季全球AI治理论坛、冬季鸣钟节、每月接口日（六道口轮值开放）。开发者转化路径：市集→孵化→场景测试→落地。全部为概念建议（agent.6 回应）。

**区域协同双向要素矩阵（v0.2 新增）**：与北纬社区（数据要素回流；区域背景 [source:PUBLIC-REGIONAL-CONTEXT]）、未来科学城（算力互补）、怀柔科学城（大科学装置联动）、经开区（智能制造转化）、京津冀（人才环流）各建立"开放什么/引入什么/边界"三列接口表，写入 visual/index.html；不写无依据的承诺。

## 指标体系、面积复算与合规矩阵

全部指标在 EPSG:4548 投影下由提交几何复算 [depth:metrics_recalculation]：场地 [metric:site_area_sqm]、研究范围 [metric:research_area_sqm]、重点片区 [metric:key_area_total_sqm] 与 [metric:key_area_count]、比例类 [metric:green_ratio] [metric:public_space_ratio] [metric:road_ratio] [metric:building_density] 均 known 且可复算。unknown 指标（容积率、高度、密度、官方绿地率、退线）以 reason + required_for_formal_submission 标记，拒绝编造。三项 formal 核心视觉指标（site_area_sqm/green_ratio/public_space_ratio）与 visual/index.html 的 data-value 声明一致，满足任务书视觉指标契约。

**合规矩阵**：compliance_matrix.json 覆盖公告 1.3.1-1.3.3、1.4.1-1.4.3、1.5 各项与 agent.1-agent.6，每条关联章节/图层/指标/图纸/visual/来源/假设/自检项 [depth:risk_missing_data]；standard_matrix 覆盖六项强制标准 + 三项新登记参照标准；design_depth_matrix 15项全部 complete。

## 风险、版权与合规说明

**数据风险**：provisional 边界粗略，不得用于红线/权属/精确面积主张；官方几何到位后全部重算 [data:geometry/constraints.geojson#CON-HER-001]。**控规优先序**：公园沿线街区控规已获批 [source:PARK-CONTROL-PLAN]，本方案概念与其冲突处以官方控规为准。

**AI 生成内容披露（v0.2，多模态护栏）**：assets/media/ 中 7 张概念图由图像生成模型（Gemini 图像模型，经 ListenHub API）生成，均为设计意图示意，**不构成现场实据或现状记录**；图面不含真实人物肖像与受版权保护素材；生成提示词与工具链已在 report/narrative.md 记录；全部图配 alt 文本。正文引用的所有事实均来自公开信源，与生成图像严格区分。

**品牌与在先权**：经公开检索，"智轨"在轨道交通装备领域有既有技术词汇用法；本方案命名组合"京张智轨/Jing-Zhang Smart Rail"不用于商业注册，仅作投稿概念；正式启用前需专业商标检索与在先权利评估。"开源碑"刻录方案数据的机制以作者授权+可退出为前提，不采集个人数据。

**合规底线**：不声称官方批准、不构成投资/招商/政策承诺；场景遵循数据最小化与人工复核；未成熟技术仅存在于测试验证场景并标注沙盒属性 [standard:GENERATIVE-AI-INTERIM-MEASURES]。

**生成披露**：本方案由 AI agent 按仓库技能 urban-design-ai-submission 工作流生成（v0.2 迭代：吸收社区方案反馈、同步官方枚举修正与任务书多模态契约）。

## 参考资料

- [source:OFFICIAL-ANNOUNCEMENT] 市规自委海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》（2026-05-09）
- [source:AGENT-TASKBOOK] brief/site-package/agent_taskbook.json（含 2026-08 新增多模态展示契约）
- [source:PARK-PHASE2-OPEN] 京张铁路遗址公园二期 2026-08-06 建成开放（北京日报/央广网/新浪财经等多源交叉：9公里、约53公顷、70社区45万居民、拆全部围挡、打通9条城市支路、46个出入口）
- [source:PARK-CONTROL-PLAN] 公园沿线街区控规获批（北京市政府门户 2026-08-12）
- [source:PARK-PHASE2-PREVIEW] 二期探营报道（首都之窗 2026-07-30，当时尚未开放——过程记录）
- [source:SITE-PACKAGE] brief/site-package/（含 2026-08-16 官方用地枚举修正）
- [source:SOURCE-REGISTRY] data/source_registry.json
- [source:PROCESSED-FACT-PACK] data/processed/agent_fact_pack.md
- [source:CASE-SF-SOMA] [source:CASE-LONDON-KINGS-CROSS] [source:CASE-PARIS-STATION-F] [source:CASE-SG-ONE-NORTH] [source:CASE-SEOUL-DDP] [source:CASE-SZ-BAY] [source:CASE-ZGC-SELF-EVOLUTION] [source:PUBLIC-REGIONAL-CONTEXT] 全球案例与区域背景（sources.json 登记条目）
- [source:BOUNDARY-SOURCE] brief/site-package/geometry/provisional_boundaries.geojson（PROV-SITE-001）
- [source:KEY-AREA-SOURCE] brief/site-package/geometry/provisional_boundaries.geojson（PROV-KEY-001/002/003）
- [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] brief/site-package/standards/references/
- [standard:GENERATIVE-AI-INTERIM-MEASURES] 生成式人工智能服务管理暂行办法（七部门令第15号）—仅在第2条适用边界内参照
- [standard:BARRIER-FREE-ENVIRONMENT-LAW] 无障碍环境建设法—仅在第39条列举服务事项边界内参照
- [standard:ELDERLY-SMART-TECH-PLAN-2020-45] 国办发〔2020〕45号—作为涉老场景设计参照
- [depth:existing_conditions_diagnosis] [depth:three_level_scope_framework] [depth:overall_spatial_structure] [depth:land_use_layout] [depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish] [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure] [depth:blue_green_public_space] [depth:three_key_area_detailed_design] [depth:renewal_project_list] [depth:phasing_implementation] [depth:metrics_recalculation] [depth:risk_missing_data]
- [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-003] [data:geometry/land_use.geojson#LU-R001] [data:geometry/buildings.geojson#BLDG-D01] [data:geometry/roads.geojson#ROAD-H04] [data:geometry/green_space.geojson#GREEN-002] [data:geometry/public_space.geojson#PUBLIC-P03] [data:geometry/constraints.geojson#CON-WAT-001] [data:geometry/phasing.geojson#PHASE-02] [data:geometry/public_space.geojson#SCN-S04] [data:geometry/public_space.geojson#GW-IF-04]

---

## 附图

**派生证据图（从同一套 GeoJSON/metrics 程序化生成）**

![场地总览：一带三站六道口两翼，provisional边界以虚线表达](assets/figures/site-overview.png)

![用地结构：09系列新枚举的概念分区与面积账本](assets/figures/land-use-structure.png)

![重点片区：三站详设结构与功能节点](assets/figures/key-areas.png)

![交通蓝绿：设计路网、智轨体验线、绿网与公共空间体系](assets/figures/mobility-bluegreen.png)

![指标证据：核心指标复算、分期、任务覆盖与自检状态](assets/figures/metrics-evidence.png)

**AI 生成概念图（assets/media/，设计意图示意，非现场实据）**

![四代时间轴叙事：1909铁路/1986中关村/2016开源/2026 AI（AI概念示意图）](assets/media/concept-timeline.png)
