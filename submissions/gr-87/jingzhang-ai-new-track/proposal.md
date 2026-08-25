---
title: "京张·新轨：百年京张AI创新带概念城市设计"
author_github: "gr-87"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以「三轨同脉」为总概念，提出一带三核、双翼七轴结构；人字回退（Switchback Fallback）把历史轨/轨道轨/数据轨组织成可叫停、可申诉、可退出的公共服务契约——三处折返试验段落位为可复算图层，四方联合签收与24组演练用例可复验，量化概念区间、18条勘误与权利台账公开可查。"
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "ai-health-service-navigation", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v0.6"
---

# 京张·新轨：百年京张AI创新带概念城市设计

> [!WARNING]
> **【临时边界与非官方红线警示 / provisional_constraint · official_boundary=false】**
> 本方案所有几何边界（总体设计范围 11.41 km² 及三处重点区 368.4 ha）均为仓库维护者推定的临时工作假定范围，不作为法定规划红线、政府审批依据或精确面积依据；所有指标均基于临时几何按 EPSG:4548 投影坐标系复算。待组织方正式 GIS/CAD polygon 发布后，全部图层与指标将严格依照 assumptions.json (A-RECALC-001) 整体重算。

## 0. 评审首屏

**一句话判断**：京张·新轨把「历史轨、轨道轨、数据轨」组织成可回退的公共服务契约；AI 遇障如人字线机车折返人工轨道，普通服务、叫停、申诉与退出永不缺席。

**状态标签**：`概念建议·未部署·未授权·未运行·临时边界`

**证据上限表**：

| 证据来源 | 支持什么 | 不能证明什么 |
| --- | --- | --- |
| 公告与任务书 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] | 任务范围、三层面积、六项必答 | 不构成官方红线或承诺 |
| 临时图层与折返试验段 [source:BOUNDARY-SOURCE] [data:geometry/key_areas.geojson#PROV-KEY-001] | 概念结构、几何闭合与机制落位 | 不表达官方边界或权属 |
| metrics.json [metric:site_area_sqm] | 可复算面积与计数 | 不表达绩效或审定 |
| 契约、台账与场景卡 [depth:executable_mechanism] [depth:scenario_tiers] | 可复演服务路径、18条勘误与清权台账 | 不证明已部署或已批准 |

**三分钟居民版**：概念建议，不代替正式规划；回答谁为谁提供什么、人工入口在哪、怎样叫停退出。

**差异化声明**：人字回退绑定京张自主设计遗产；NT-6 契约、四态状态机与四方联合签收经 24 组用例演练（8接受/16拒绝）可复演；三处折返试验段落位图层 key_areas 属性 SW-001/002/003；附 18 条勘误与全量权利台账。

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，给出三层范围与三处重点区（众智园、原点社区、大钟寺）的名称与南北顺序 [source:OFFICIAL-ANNOUNCEMENT] [source:SITE-PACKAGE]。开源征集任务书定义六项必答任务、五大功能、三区两翼 [source:AGENT-TASKBOOK]。

空间底图按公告四至推定并经EPSG:4548复算，均标 `provisional_constraint`、`official_boundary=false` [source:BOUNDARY-SOURCE] [data:geometry/site_boundary.geojson#SITE-001]。三处重点区为临时粗略范围 [source:KEY-AREA-SOURCE] [data:geometry/key_areas.geojson#PROV-KEY-001]。本方案按「控规城市设计深度」组织概念响应，正式深化待数据与专项审查 [standard:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING]。官方 polygon 发布后须整体重算 [source:PROCESSED-FACT-PACK] [metric:site_area_sqm]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围（约43.6 km²） | 产业生态与未来形态如何组织 | 五环链：高校策源—开源协作—企业转化—公共体验—国际传播 [source:AGENT-TASKBOOK] | [metric:site_area_sqm]、standard_matrix.json |
| 总体设计范围（约11.4 km²） | 空间、更新与交通如何落图 | 「一带三核、双翼七轴」[depth:overall_spatial_structure] | [data:geometry/land_use.geojson#LU-001]、roads.geojson |
| 重点区域范围（约368.4 ha） | 三片区详细设计 | 定位、空间动作、强度区间与折返试验段 [depth:three_key_area_detailed_design] | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

三层范围非割裂图纸集：统筹定产业判断，总体落更新项目，重点区验可实施性；临时边界约11.41 km²，待官方边界重算 [metric:site_area_sqm] [source:BOUNDARY-SOURCE]。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 三带定位与五大功能

统筹范围叠加三带：**百年京张文化带**、**都市AI生活体验带**、**AI融合创新带**，对应任务书五大功能 [source:AGENT-TASKBOOK]。三带是同一空间的三重身份，以一条主轴串三核 [depth:overall_spatial_structure]。

### 命名体系：三轨同脉

主名称**「京张·新轨」**（JingZhang NewTrack）。「轨」延续自主设计修建首条干线铁路的记忆；「新轨」指向轨道13号线沿京张廊道复合利用 [data:geometry/constraints.geojson#CON-002]，亦转喻 AI「数据轨」。子命名：众智园=众智站台、原点=零点站、大钟寺=钟鸣站；Logo 为三条轨线中嵌「N」形数据脉冲，灰蓝+科技蓝+脉冲绿，不主张商标权益 [source:AGENT-TASKBOOK]。

### 5-8个全球AI创新生态案例

| 案例名称与定位 | 权威公开来源 | 关键机制与事实依据 | 可转化经验 | 边界与不可直接迁移 |
| --- | --- | --- | --- | --- |
| 硅谷-斯坦福创新走廊 | [source:DATA-SRC-CASE-STANFORD-RESEARCH-PARK] | 1951年设700英亩大学科技园，以高校自有土地租赁与师生联合创业形成学术策源-苗圃-风投三螺旋 | 原点近校创业苗圃与清华/北大慢行缝合 [data:geometry/buildings.geojson#BLDG-009] | 美国私立大学土地长租与风险资本模式不同 |
| 韩国板桥科技谷 | [source:DATA-SRC-CASE-PANGYO-TECHNO-VALLEY] | 京畿道规划三期集群（1666家企业、KRW 167.7万亿产值），设立政府主导真实测试床与自动驾驶沙盒 | 众智园设立全栈自主AI测试场与场景开放试验区 | 韩国省级直接财政补贴模式不可硬套 |
| 新加坡纬壹科技城 | [source:DATA-SRC-CASE-ONE-NORTH-SINGAPORE] | JTC主导200公顷混合开发，设Biopolis与LaunchPad（含Kampong AI），结合连续高品质蓝绿网络 | 蓝绿生态廊道贯通与青年创新活力环境 [metric:green_ratio] | 新加坡单一法定机构地权管控模式不同 |
| 伦敦国王十字更新 | [source:DATA-SRC-CASE-KINGS-CROSS-REGENERATION] | 27公顷铁路工业遗存活化，谷仓建筑改建艺术大学（CSM）并引入科技总部，公共空间织补历史记忆 | 遗址带百年铁路记忆活化与慢行断点缝合 | 英国私人财团长周期资产证券化模式不同 |
| 阿姆斯特丹智慧城市 | [source:DATA-SRC-CASE-AMSTERDAM-SMART-CITY] | 四螺旋平台首创「AI in Control」算法公开登记册与市民参与协议，强调开放数据与伦理审查 | 公众知情反馈、四方联合签收与申诉退出机制 | 欧盟GDPR地方数据主权需依据我国法律在地化 |
| 东京涩谷站城一体化 | [source:DATA-SRC-CASE-SHIBUYA-TOD] | 站体周边一体化TOD更新，东横线地下化并设空中立体步道网络缝合东西地面阻隔 | 大钟寺站四象限立体慢行连通 [data:geometry/roads.geojson#ROAD-004] | 私铁企业主导产权开发模式需转为路地协同 |
| 剑桥肯德尔广场 | [source:DATA-SRC-CASE-KENDALL-SQUARE-MIT] | MIT推动工业区转型，设创新特别分区（Innovation Space Zoning）与底层开放共享客厅促进非正式交流 | 首层街区开放共享创新工坊与学术社群交互 | 完全市场化高租金驱动模式在海淀不适用 |

以上案例均基于公开权威报告建立机制比对，不构成对企业、投资或政策的任何主张 [source:AGENT-TASKBOOK] [source:PROCESSED-FACT-PACK]。

### 三区两翼协同回路与 24h 时空基线

三区两翼形成「研究—转化—集聚—服务—场景」回路：众智园担全栈自主创新，原点社区担成果转化与开源生态，大钟寺载智能原生新业态 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]。

**24 小时四时段空间-AI协同基线**：

| 时段 | 运营模式 | 主导人群 | AI介入与空间声光管控要求 | 人工入口与兜底 |
| --- | --- | --- | --- | --- |
| T1 07-10 | 早高峰潮汐通勤 | 上班族/高校师生 | 慢行信号灯动态配时、人流热力防拥挤导视；禁无人车占用主慢行道 [depth:overall_spatial_structure] | 沿线3处人工导流岗 |
| T2 10-18 | 研发创新与商务 | 开发者/企业访客 | 开源发布厅算力调度、路演客厅展示；会客厅与测试场开放 [source:AGENT-TASKBOOK] | 园区服务台受理 |
| T3 18-22 | 休闲体验与共学 | 社区居民/青年人才 | 遗址公园夜间文化导览、夜校空间预约；景观照明开启，低分贝环境 [depth:blue_green_public_space] | 社区驿站人工值守 |
| T4 22-07 | 低敏低噪智运 | 环卫/物流夜班工人 | 自动清扫机、无人配送夜间干线调度；噪声≤45dB，灯光避开住宅窗面 [depth:scenario_tiers] | 24h应急值班电话 |

### 区域协同接口（五区域 · 可交付物与前置）

| 区域 | 候选输入 | 京张可输出 | 启动前置与不能证明 |
| --- | --- | --- | --- |
| 北纬社区 | 公共服务问题、非AI基线 | 无账号服务、无障碍核查、申诉模板 [source:AGENT-TASKBOOK] | 需场地与参与授权 |
| 未来科学城 | 研究问题、测试方法、许可边界 | 可复现测试任务与限制清单 | 需技术、数据与发布确认 |
| 怀柔科学城 | 科学问题、设施接口、安全边界 | 受控验证方法与迁移摘要 | 需设施与权限确认 |
| 北京经开区 | 应用问题、生产约束、维护条件 | 首用转化证据包与退出方法 | 需主体、场地、采购确认 |
| 京津冀区域 | 共性问题、标准与差异 | 双语失败案例与测试模板 | 需各地确认权责与知产 |

## 总体设计范围城市更新与控规深度城市设计

总体设计范围按控规的**城市设计深度组织概念响应**，核心结论由提交图层支撑；专业深化待数据、权属与审查 [standard:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout]。

**空间结构「一带三核、双翼七轴」**：
- **一带**：京张遗址公园智轨活力带，以1401公园绿地连续带表达 [data:geometry/green_space.geojson#GREEN-001] [depth:blue_green_public_space]。
- **三核**：三处重点区，见下章。
- **双翼**：西侧中关村科技服务翼 [data:geometry/land_use.geojson#LU-004]、东侧小月河场景赋能翼 [data:geometry/land_use.geojson#LU-005]。
- **七轴**：北五环辅路、清华东路、成府路、知春路、学院路等七条功能轴 [data:geometry/roads.geojson#ROAD-002] [data:geometry/roads.geojson#ROAD-003] [data:geometry/roads.geojson#ROAD-005]。

**用地结构**（临时边界内无缝复算）[metric:site_area_sqm]：科研4.82、商业1.07、居住1.85、教育0.35、道路0.60、绿地2.48、文化0.15、广场0.09 km²，合计闭合 [metric:land_use_area_research_sqm] [metric:land_use_area_commercial_sqm] [metric:land_use_area_residential_sqm]。

**更新框架与拆改留逻辑**：建筑图层表达21处代表性基底，分保留、改造、新建三类 [data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish]。原则：**不调查，不拆除** [source:PROCESSED-FACT-PACK]。

**开发强度**：容积率、高度、密度、法定绿地率、退线、红线在官方控规发布前严格保持 unknown [metric:floor_area_ratio] [metric:building_height_m]。剔除未经匹配复核的控规惯例及固化数值表述，采用方法性敏感性测算框架（Methodological Sensitivity Testing）组织参数化推演模型（公式：GFA = Area × P_renewal × FAR，及 20~30 m²/岗弹性就业模型），见 `assumptions.json` A-CONTROLS-001/002 [depth:assumption_ranges]。

**不利空间与辖区约束诚实披露**：
1. 13 号线地面轨道及降噪缓冲带对大钟寺片区南北步行的物理切分，需专项地下通道与天桥工程深化 [data:geometry/constraints.geojson#CON-002]。
2. 清河防洪排涝蓝线对众智园临河绿化覆土厚度及地下构筑物荷载具有刚性限制 [data:geometry/green_space.geojson#GREEN-002]。
3. 跨海淀与昌平/朝阳行政管辖边界未获两地联合授权前，禁止擅自跨界启动运行试点 [source:AGENT-TASKBOOK]。

## 重点区域详细设计

三处重点区按规划综合实施方案的**城市设计深度组织概念响应**，逐区七要素并各绑一处折返试验段 [depth:three_key_area_detailed_design]。

### 众智园AI自主创新加速区（北核 · 折返试验段 JZ-SW1）

定位为**「花园型全栈自主创新街区」** [data:geometry/key_areas.geojson#PROV-KEY-001]。中央绿廊串西创新与东研发组团 [data:geometry/green_space.geojson#GREEN-002]，临清河形成低碳交往带 [data:geometry/roads.geojson#ROAD-009]，沿京藏高速设防护绿带 [data:geometry/land_use.geojson#LU-013]；新建大模型研发中心、治理馆与服务楼 [data:geometry/buildings.geojson#BLDG-018] [data:geometry/buildings.geojson#BLDG-019]。AI场景：模型测试沙盒、治理展示馆 [data:geometry/public_space.geojson#PUBLIC-005]。风险：北五环与清河界面需复核。

**强度深化机制**：法定容积率与高度待控规明确（保持 unknown [metric:floor_area_ratio]）；采用方法性敏感性模型推演，待官方红线与审定指标发布后代入重算 [depth:assumption_ranges]。落位 [data:geometry/key_areas.geojson#PROV-KEY-001]。

### 北京AI原点社区（中核 · 折返试验段 JZ-SW2）

定位为**「近校型成果转化与人才社区」** [data:geometry/key_areas.geojson#PROV-KEY-002]。以五道口商街与成府路为活力骨架 [data:geometry/roads.geojson#ROAD-003]，组织「零点站」开源发布厅（新建）[data:geometry/buildings.geojson#BLDG-009]与近校孵化楼群（改造）[data:geometry/buildings.geojson#BLDG-007]，校区-园区-街区慢行缝合 [data:geometry/roads.geojson#ROAD-008]。AI场景：开源发布厅、成果转化街 [data:geometry/public_space.geojson#PUBLIC-002]。风险：校区边界、产权待协调。

**强度深化机制**：法定容积率与高度待控规明确（保持 unknown）；结合高校校区协同与存量更新比例进行弹性测算，以正式审批控规为准 [depth:assumption_ranges]。落位 [data:geometry/key_areas.geojson#PROV-KEY-002]。

### 大钟寺AI产业聚集区（南核 · 折返试验段 JZ-SW3）

定位为**「城市型智能经济与国际交往街区」** [data:geometry/key_areas.geojson#PROV-KEY-003]。以知春路与轨道站为枢纽 [data:geometry/roads.geojson#ROAD-004]，组织站前四象限步行连通 [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/land_use.geojson#LU-015]，东侧布局新建AI总部组团与存量改造商务楼群 [data:geometry/buildings.geojson#BLDG-003]，复合利用规划绿地承载公共体验 [data:geometry/green_space.geojson#GREEN-003]。AI场景：国际路演客厅、数据要素会客厅。风险：轨道一体化与交叉口工程待深化。

**强度深化机制**：法定容积率与高度待控规明确（保持 unknown）；结合轨道枢纽一体化与商务承载力做敏感性测试，待控规下达后重算 [depth:assumption_ranges]。落位 [data:geometry/key_areas.geojson#PROV-KEY-003]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

### 五类用户画像

| 画像 | 典型需求 | 空间响应 | 验收问题 | 人工入口 | 自检边界 |
| --- | --- | --- | --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试 | 发布厅、代码墙 | 发布是否人工审核 | 服务台受理 | 不采集轨迹 |
| 初创团队 | 办公、算力、试验场 | 测试场、端侧算力 | 授权边界是否可查 | 窗口申请 | 算力另行授权 |
| 头部企业访客 | 展示、商务、招聘 | 路演客厅、轨道接驳 | 展示是否可解释 | 人工导览 | 标识须清权 |
| 周边居民 | 通勤、休闲、服务 | 遗址带慢行环 | 普通路线是否可用 | 服务台、电话 | 不用于商业推荐 |
| 高校师生 | 转化、协作、慢行 | 慢行缝合、转化驿站 | 授权是否可核实 | 驿站人工接待 | 数据需授权 |

画像不采集个体数据；AI 辅助遵守数据最小化与人工复核 [source:AGENT-TASKBOOK] [standard:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES]。投诉申诉闭环：所有 AI 服务提供可记录投诉、申诉与人工受理通道，按群体验收，接入 NT-6「告知+复核」[depth:public_service_chain]。

### AI场景卡（12张 · 六段契约字段）

| 编号 | 场景卡 | 空间载体 | 类型 | 输入/来源与AI能力 | 人工等价服务 | 退出触发阈值→动作→恢复 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SC-01 | 开源发布厅 | 原点「零点站」 | 品牌活动 | 公开/已清权内容；AI摘要与检索 | 人工审核、纸质登记 | 审核未过→下架；复核后恢复 |
| SC-02 | 自主模型测试沙盒 | 众智园 | **产业测试验证** | 脱敏数据集；评测与红队 | 结果人工复核 | 脱敏失败≥1或红队击穿→暂停；复盘后恢复 |
| SC-03 | 端侧算力驿站 | 总体范围节点 | **产业测试验证** | 授权算力调度 | 窗口授权 | 授权缺失→停用；补齐后恢复 |
| SC-04 | AI慢行导航 | 遗址带活力带 | AI+交通 | 聚合断点/拥挤事件；可解释导视 [source:PROCESSED-FACT-PACK] | 人工陪行 | 断点未核→回人工；核实后恢复 |
| SC-05 | 国际路演客厅 | 大钟寺 | 国际交往 | 公开内容与清权标识 | 人工导览 | 审核未过→停场；清权后恢复 |
| SC-06 | 清河低碳创新廊 | 众智园临河 | 蓝绿空间 | 生态监测与雨洪提示 | 人工巡查 | 防洪未核→关闭复合；复核后恢复 |
| SC-07 | 近校成果转化街 | 原点社区 | 产业服务 | 公开成果目录；AI匹配 | 窗口人工 | 权属未清→停；闭环后恢复 |
| SC-08 | 数据要素会客厅 | 大钟寺 | **产业测试验证** | 已授权数据；可审计流通 | 人工审计 | 审计缺项→停；补齐后恢复 |
| SC-09 | AI生活服务样板街 | 社区商业交汇 | AI+公共服务 | 公开信息+用户表单；不做诊断 [standard:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES] | 人工服务台 | 无来源→回人工台；闭环后恢复 |
| SC-10 | 全球AI活动周路线 | 一带公共空间 | 运营品牌 | 公开活动信息；AI排期 | 人工审批 | 审批未过→停；通过后恢复 |
| SC-11 | 无障碍关怀服务点 | 社区与公共设施 | AI+公共服务 | 辅助提示与导览；人工优先 [source:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW] | 现场指导、人工办理 | 不可达→回人工；修复后恢复 |
| SC-12 | 机器人配送试点线 | 大钟寺-学院路 | 机器人 | 受限参数；低速调度 | 人工接管 | 安全事件≥1→撤回；两期无事件后恢复 |

全部卡片为概念建议，不表述为已批准运营 [source:AGENT-TASKBOOK]。tier：T1 环境受控原型→T2 真人群知情试点→T3 日常服务；跨级即停；当前均 T1 [depth:scenario_tiers]。

**最小试点诚实状态**（SC-04 / 原点社区 JZ-SW2 试验段）[depth:minimal_pilot]：

| 关卡 | 必须回答与首轮四周要件 | 当前状态 |
| --- | --- | --- |
| G0 选题确属问题 | 断点数据源、受影响人群、无AI基线；沙盒未来拟使用公开 OSM 矢量作为离线断点拓扑底图（当前提交包未打包/未衍生 OSM 矢量；数据登记见 sources.json DATA-SRC-OPENSTREETMAP-CANDIDATE / rights_ledger.json RL-007，遵循 ODbL 1.0） | `not_run`（无现场实测） |
| G1 场地与权属 | 导视点位、通行权属、安全边界；验证无 AI 人工替代与申诉闭环响应 <15 分钟 | `pending_authorization` |
| G2 受控测试 | 范围冻结、知情同意、人工接管就绪；四方主体联合签收通过方可进入受控沙盒 | `sandbox_only` |

G0 可仅凭公开数据启动；G0→G2 以依法授权为前置 [depth:evidence_discipline] [metric:minimal_pilot_status]。

## 原创机制：人字回退服务契约（JZ-SWITCHBACK-001）

京张铁路1905-1909年建成、詹天佑任总工程师、青龙桥「人」字形双机车折返爬坡 [data:geometry/constraints.geojson#CON-005]——公开史料常识，仅作叙事锚点 [source:SITE-PACKAGE]。把「三轨同脉」下钻为主机制：三轨为证据约束、NT-6 契约为验收主线、四态状态机可复演、三处折返试验段落位图层 [source:AGENT-TASKBOOK] [depth:mechanism_design]。

**三轨证据约束**：历史轨核验来源与文保边界 [source:SITE-PACKAGE]；轨道轨核验空间关系与权属前置 [standard:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING]；数据轨核验数据最小化、人工复核与退出 [standard:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES]。

**NT-6 服务契约**（缺一不可转入 normal 态）[depth:public_service_chain]：

| 步骤 | 京张化命名 | 落地要求 | 未达动作 |
| --- | --- | --- | --- |
| 定标 Declare | 站台登记 | 服务边界、责任角色、回退对象公开登记 | 未登记不得运行 |
| 计时 Time | 时刻表 | 每项响应公开时限 | 超时转人工 |
| 接管 Handoff | 人字折返 | 保留真人路径，不设数字门槛 | 人工不可用即暂停 |
| 告知 Notify | 站台广播 | 障碍事件 24h 内主动告知受影响人 | 未告知即降级 |
| 复核 Review | 折返复测 | 申诉限时回应+四方主体（规划师/居民/运营/审计）联合签收复盘 | 逾期或分歧即暂停 |
| 退场 Sunset | 撤站清场 | 续期/终止+数据删除+资产处置与退出公告 | 到期不续即退场 |

**四态状态机**（核验 `check_switchback.js`；演练 `run_jzsw_tabletop.js` 24 用例=8 接受/16 拒绝、零 fail-open，只读复演）[depth:executable_mechanism]：

| 状态 | 含义 | 进入条件 | 退出条件（退回容易、恢复缓慢） |
| --- | --- | --- | --- |
| `normal` | AI辅助正常运行 | 三轨证据齐+契约全过+四方一致 | 障碍/超标→degraded/paused |
| `degraded` | 折返人工，AI仅辅助 | 缺一轨/契约缺一步/夜间静音 | 两期补齐→normal |
| `paused` | AI停止，仅普通与人工 | 高障碍/人工缺/跨区未授权/分歧 | 连续两期合格+四方全票→normal |
| `retired` | 退出撤除，数据删除 | 三轨全缺隐瞒运行/到期不续 | 终态 |

反例 N1–N5 与 N13–N16：缺证据不进 normal、人工不可用须 paused、一期合格不越级、禁局部修正、隐瞒退场、跨区未授权拦截 R12、四方分歧驳回 R13、致命障碍熔断 R6、夜间超标降级 R14 [depth:fallback_states]。schema 见 `switchback-protocol.schema.json`。

**折返试验段**：JZ-SW1 众智园（SC-02）[data:geometry/key_areas.geojson#PROV-KEY-001]、JZ-SW2 原点社区（SC-04/09/11）[data:geometry/key_areas.geojson#PROV-KEY-002]、JZ-SW3 大钟寺（SC-12）[data:geometry/key_areas.geojson#PROV-KEY-003]，均 `concept_only` [depth:validation_windows] [source:PROCESSED-FACT-PACK]。

**证据状态纪律**：字段完整只证明设计覆盖，离线回放只证明规则可复演；真实运营、许可、绩效保持 unknown [depth:evidence_discipline]。

## 用地、建筑规模与拆改留方案

用地分类采用自然资源部用地用海分类指南代码 [standard:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311] [data:geometry/land_use.geojson#LU-001]。建筑规模为代表性基底与更新分类，未给审定面积；容积率与高度待补 [metric:floor_area_ratio] [metric:building_height_m]；建筑基底约0.98 km²、21处图斑，仅讨论空间供给结构 [metric:building_footprint_area_sqm] [metric:building_count] [depth:height_massing_character]。

## 交通、轨道、市政与公共服务设施

交通方案围绕轨道站一体化、道路微循环、慢行缝合与绿色交通 [depth:traffic_rail_slow_parking]。示意线位含北五环辅路、清华东路、成府路、知春路、学院路/西土城路及智轨慢行绿道与清河滨水步道 [data:geometry/roads.geojson#ROAD-008] [data:geometry/roads.geojson#ROAD-009]；轨道13号线沿京张廊道段列入约束图层 [data:geometry/constraints.geojson#CON-002]。线位均标 `provisional_alignment` [metric:road_length_m] [source:PROCESSED-FACT-PACK]。市政与新型基础设施给出概念框架，承载力测算为深化前置 [depth:municipal_new_infrastructure]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿空间以京张遗址公园智轨活力带为骨架，绿地面约2.48 km²、绿地率约21.7% [metric:green_ratio]，公共空间约0.14 km²、占比约1.2% [metric:public_space_ratio] [data:geometry/green_space.geojson#GREEN-001] [depth:blue_green_public_space]。风貌融合京张铁路历史与中关村创新文化 [standard:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES]；文保、蓝线以官方发布为准 [data:geometry/constraints.geojson#CON-001]。

### 三个AI朝圣地标（含荣誉展示体系）

1. **零点站·开源之芯（原点）**：以清华园车站旧址记忆为叙事锚点 [data:geometry/constraints.geojson#CON-005]，结合开源发布厅设智能体贡献荣誉墙；项目组对=发布/撤回。
2. **众智站台·治理灯塔（众智园）**：治理馆为可参观节点；项目组对=测试/复盘，红队结果公开复演。
3. **钟鸣站·未来钟楼（大钟寺）**：依托国际路演客厅；项目组对=展/训，展项可预约可撤换。

三站沿遗址带串成「新轨一线三站」体验线，为概念方向，不主张已获批准建设 [source:AGENT-TASKBOOK] [depth:blue_green_public_space]。三组「项目组对」把历史折返从命名变成可运营的空间程序。

### 公共空间组件库（agent.4）

为保障京张遗址公园智轨活力带（GREEN-001）与三处重点区公共空间可落地、可管养、可回退，建立涵盖 6 类标准化模块的公共空间组件库矩阵 [depth:blue_green_public_space]：

| 组件类型与编号 | 空间落位 | 服务对象 | 赋能场景 | 人工等价（Human Fallback） | 无障碍设计 | 维护与巡检 | 暂停/撤除机制（Sunset） |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C-INF-01 智轨微型交互驿站 | 遗址公园主慢行道（GREEN-001）、原点零点站（SW-002） | 全龄市民、高校师生、研学访客 | SC-01 慢行导视、SC-02 文化导览 | 实体图文与盲文导览标牌常态展示，一键直呼人工客服 | 低位屏（0.8-1.1m）、多语种语音播报、无障碍坡道衔接 | 每周传感器校准、月度硬件巡检 | 设备断电自动转实体静态标牌；项目终止24h内拆除复原铺装 |
| C-INF-02 众智林荫微气候凉亭 | 众智园绿地公园（GREEN-002）、清河滨水界面 | 研发人员、社区居民、户外创客 | SC-06 清河低碳创新廊、户外代码沙龙 | 遮阳遮雨与实体桌椅常态开放，零数字使用门槛 | 全平进出无台阶、轮椅专属席位、防滑防眩光材质 | 每日保洁巡查、汛期前与结冰期管线防冻安全复核 | 防汛预警启动轻量装配结构临时撤除，100%可回收 |
| C-INF-03 零点夜间智运接驳柜 | 大钟寺钟鸣站（SW-003）、五道口创新商街 | 外卖骑手、物流快递员、夜班职工 | SC-07 夜间低速智运、T4时段物资接驳 | 配套传统人工代收点与机械备用锁孔人工取件 | 多层存取口（0.4-1.2m）、声光双重开箱指引 | 每日充换电安全自检、月度消防与电池健康排查 | 噪声>45dB或异常温升即刻熔断断电；48h内清空电池撤柜 |
| C-INF-04 开源之芯路演讲台 | 原点社区清华园旧址（CON-005 / BLDG-009） | 开源开发者、初创团队、学术社群 | SC-03 开源发布会、SC-10 AI创新周展演 | 支持纯人工黑板、实体展架与纸质路演手册展示 | 无障碍升降台进入讲台、同声传译与实时字幕投影 | 活动前专项安检、月度视听声光设备保养 | 未取得大型活动安全许可禁止启用；闭幕2h内复原常态广场 |
| C-INF-05 人字折返应急求助立柱 | 沿线每隔200米布设、主要轨道过轨缝合点（ROAD-004） | 突发疾病、迷路或遇险的市民游客 | SC-08 公共安全联动、应急救助 | 机械按键直连属地110/120与人工应急值班室 | 双高度机械按键（低位0.9m）、高反光夜光标识 | 24h网络心跳自检、每周现场人工试鸣确认 | 故障自动切换备用窄带信道；市政改造实施原位保护或平移 |
| C-INF-06 蓝绿海绵监测草沟标尺 | 众智园雨水花园、清河防洪蓝线缓冲带 | 市政水务、科普研学群体、周边居民 | SC-06 清河生态监测与海绵科普 | 实体机械浮标与实体刻度水尺，断电状态肉眼可读 | 观景木栈道设1.1m防护栏与触觉警示盲道 | 汛前清淤疏浚、每月传感器标定与水质取样 | 遇超标特大暴雨启用物理溢流导流槽；撤除无需开挖基底 |

## 更新项目清单、实施政策与分期计划

更新项目以「缝合、激活、生长」为序，`geometry/phasing.geojson` 分三期 [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation] [depth:renewal_project_list]；每项登记责任角色、前置证据、验收与成本类别：

| 项目 | 名称 | 类型 | 分期 | 责任角色类型 | 前置证据·验收 | 成本级别与导向 |
| --- | --- | --- | --- | --- | --- | --- |
| JZ-01 | 遗址带慢行断点缝合 | 公共空间/交通 | 一期 | 交通复核+属地协调 | 红线复核；验收=慢行连续无障碍 | B级·空间安全/传统服务≥20% |
| JZ-02 | 原点开源发布厅 | 文化/产业 | 一期 | 运营责任+独立复核 | 校区边界、产权；验收=审核闭环 | A级·人工值守/版本更新 |
| JZ-03 | 大钟寺站四象限连通 | 轨道一体化/慢行 | 一期 | 轨道与市政角色 | 站点、管线；验收=步行无阻断 | C级·过轨工程/保险应急 |
| JZ-04 | 众智园研发组团 | 城市更新/产业 | 二期 | 更新实施角色 | 权属、控规；验收=验证窗开启 | C级·维护/退出撤场 |
| JZ-05 | 学院路东科研改造带 | 城市更新 | 二期 | 更新与招商角色 | 权属调查；验收=记录闭合 | B级·维护/数据处置 |
| JZ-06 | 五道口西商街更新 | 城市更新 | 三期 | 商业运营角色 | 产权与运营；验收=投诉闭环 | B级·参与/退出恢复 |
| JZ-07 | AI活动周公共路线 | 运营/品牌 | 一期轻量 | 活动组织角色 | 许可、安全、清权；验收=可叫停 | A级·应急/无障碍等价 |

分期面积：一期约5.28、二期约5.06、三期约1.07 km²，合计闭合 [metric:phase_1_area_sqm] [metric:phase_2_area_sqm] [metric:phase_3_area_sqm]。若未来依法形成授权与运行条件，建议 90/180 日作「继续/整改/退出」复核 [depth:renewal_project_list] [source:AGENT-TASKBOOK]。

### 全球AI创新活动体系与长期运营（agent.6）

为确保百年京张 AI 创新带在长期生命周期中可落地、可核验、可退出，建立 6 维可验收运营矩阵 [depth:renewal_project_list] [source:AGENT-TASKBOOK]：

| 运营维度与编号 | 运营项目名称 | 责任角色类型 | 频次周期 | 启动前置条件 | 退出与熔断机制 | 成本类别与预算导向 |
| --- | --- | --- | --- | --- | --- | --- |
| OP-01 年度品牌活动 | 京张百年 AI 创新周与创客嘉年华 | 活动运营牵头方 + 属地管委会协调角色 + 居民代表联席复核 | 每年 1 次（秋季 9-10 月，持续 7 天） | 取得大型活动安全许可、完成噪声/交通疏导方案、无障碍通道核验 | 遇极端恶劣天气或安全预警即刻熔断；闭幕24h内撤展并恢复绿地原貌 | A级·专项活动经费（无障碍与安全保障预算≥20%） |
| OP-02 开发者社区 | 零点站开源智能体双周黑客松与代码茶会 | 开源社区运营方 + 高校科创联合会 + 独立代码安全审计角色 | 每两周 1 次（周末），全年常态化 | 代码开源合规协议签署、沙盒数据清权登记、场地使用备案 | 发现模型知识产权争议或侵权即时下架；开发者自由撤回个人数据 | B级·轻量场地运维与算力沙盒赞助（零固定资产负债） |
| OP-03 场景开放试验 | 街区 AI 试验窗预约开放与红蓝对抗复盘 | 场景开放协调员 + 街道民生督导员 + 属地技术伦理委员会 | 季度轮换（每季度开放 2~3 个测试场景卡） | 场景安全阈值复核、四方主体联合签收、周边居民知情告知 | 90/180天无实质进展或居民投诉率>5%强制关停退出，执行数据销毁 | A级·测试安全准备金与人工值守兜底成本 |
| OP-04 地标与公共空间 | 一线三站朝圣地标与荣誉墙动态展陈 | 空间资产运维方 + 文化遗产保护顾问 + 居民监督代表 | 月度巡检维护，年度评选荣誉墙贡献名单 | 展项防火防风安全审查、无虚构商业代言、展陈合规清权 | 展品损坏或出现虚假宣传即刻撤换并公布说明；合同终止移交场地 | B级·日常物业保洁、绿化管养与弱电维保 |
| OP-05 国际传播交流 | 京张三轨全球双语开源城市设计巡展 | 国际学术交流合作方 + 双语内容审查责任人 | 半年 1 期（结合人居署/规划大会等线上线下交流） | 双语等义性法律与学术复核、遵循 CC BY 4.0 开放共享许可 | 涉及未核实数据或跨国争议即刻下架修正；全量材料标注概念属性 | B级·双语资料出版、学术交流与国际网络传播 |
| OP-06 招引与场景转化 | 智能原生初创团队苗圃服务与合规沙盒对接入驻 | 产业服务科创平台 + 投资人联合会 + 知识产权法务角色 | 常态化咨询 + 季度路演匹配 | 秉持「不虚构已签约企业、不承诺固定税收与落地」原则 | 入驻团队违反科研伦理或合规基线即刻解除协议并清退；设破产隔离 | C级·产业引导基金市场化运作（不产生刚性行政负债） |

以上运营矩阵仅为概念运营机制设计，不构成对任何具体企业、投资或政府法定义务的预先承诺 [source:AGENT-TASKBOOK] [source:PROCESSED-FACT-PACK]。

## 指标体系、面积复算与合规矩阵

核心指标按「几何复算/官方控规/运营校准」三类管理 [depth:metrics_recalculation]。空间可复算类已给：场地 11.41 km²、绿地率 21.7%、建筑基底 0.98 km²、道路 40.7 km (EPSG:4548 复算)、三期面积 [metric:site_area_sqm] [metric:green_ratio] [metric:building_footprint_area_sqm]。官方控规类（容积率、高度、法定绿地率、退线、红线）unknown，概念绿地率目标/假设值≥30%，概念区间见 assumptions [metric:floor_area_ratio] [metric:building_height_m]。运营校准类只定义方法，不填虚构基准 [source:AGENT-TASKBOOK]。

**运营 KPI 方法**：申诉闭环率、人工接管成功率、退出完整性、人工等价可用性——status=unknown、只定义公式 [metric:complaint_closure_ratio] [metric:human_takeover_success_ratio]。

`compliance_matrix.json` 覆盖公告1.3-1.5与agent.1-6必答（23 条），`standard_matrix.json` 9 项标准，`design_depth_matrix.json` 20 项深度 complete=已组织响应 [source:PROCESSED-FACT-PACK]。

**agent.1–agent.6 交付物入口与勘误索引**：

| 任务 | 本方案交付物 | 验收与台账索引 |
| --- | --- | --- |
| agent.1 概念/命名/Logo | 三轨同脉+一线三站 | 1.5.1 [depth:overall_spatial_structure] |
| agent.2 全球案例 | 6 案例四列表 | 1.3.1 [source:AGENT-TASKBOOK] |
| agent.3 场景进街区 | 12 场景卡六段契约+24h基线 | agent.3 [depth:scenario_tiers] |
| agent.4 公共空间与地标 | 一带+三地标+荣誉墙 | agent.4 [depth:blue_green_public_space] |
| agent.5 文化叙事与导览 | 一线三站+史实锚点 | agent.5 [source:SITE-PACKAGE] |
| agent.6 活动与运营 | 创新周+双站+90/180复核 | agent.6 [depth:renewal_project_list] |
| 全方案自检与合规台账 | errata.json (18条) + rights_ledger.json | [depth:evidence_discipline] [depth:executable_mechanism] |

**同场测量**（脚本只读）：`run_field_census.js` 对 main 做可重跑普查（836 份：无AI等价路径 17.1%、退出阈值 55.3%、法条引用 49.9%），以重跑为准 [depth:field_census] [metric:field_census_schemes_total]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

触发式风险规则 [depth:risk_missing_data]：

| 风险项 | 触发条件 | 立即动作 | 责任角色类型 | 恢复条件 |
| --- | --- | --- | --- | --- |
| 官方边界缺失 | 官方 polygon 发布后指标失配 | 整体重算 | 数据复核角色 | 全量重算通过 |
| 无障碍路线中断 | 导视冲突或路线不连续 | 停 AI 导视回人工 | 属地协调角色 | 障碍核实、路线恢复 |
| 人工接管不可用 | 人工服务台/电话不可达 | 停止 AI 场景 | 运营责任角色 | 人工服务恢复 |
| 数据授权缺失 | 场景需要未授权数据 | 停止该场景扩容 | 数据合规角色 | 完成授权 |
| 退出成本未闭合 | 数据/设备/场地未处理 | 冻结续期并补齐退出 | 运营责任角色 | 退出凭证齐备 |
| 跨辖区授权缺失 | 延伸至未授权行政辖区 | 停止跨区试点 | 属地协调角色 | 取得联合授权 |
| 衍生工件版本不一致 | report/visual/图件/PDF 版本戳不符 | 停止发布并全量重生成 | 版本管理角色 | 版本戳一致+gate 重过 |

**三条合规基线**（条号已对照本地标准原文核校）：

| 基线 | 依据原文 | 本方案响应 |
| --- | --- | --- |
| 无障碍服务 | 《无障碍环境建设法》第39条：公共服务场所应配备必要无障碍设备与辅助器具、标注指引无障碍设施，为残疾人、老年人提供无障碍服务 [source:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW] | SC-11 人工办理、degraded 人工兜底 |
| 投诉举报 | 《生成式AI办法》第15条：应建立投诉、举报机制，设便捷入口、公布处理流程与反馈时限 [source:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES] | NT-6 告知+复核、申诉闭环 |
| 传统服务并行 | 国办发〔2020〕45号（政策文件）：传统服务与智能化服务创新并行 [source:DATA-SRC-ELDERLY-SMART-DIFFICULTY-MEASURES] | 「普通服务不缺席」标签 |

方案不声称官方批准、审定控规或实施承诺；AI生成内容由作者对事实、引用、版权负责，版权声明见 `report/copyright_statement.md` 与 `rights_ledger.json` [source:AGENT-TASKBOOK]。HTML 与图纸均为离线资产。

## 参考资料

1. 北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》，2026-05-09 [source:OFFICIAL-ANNOUNCEMENT]。
2. 《面向全球智能体开展"百年京张AI创新带城市设计开源征集"任务书摘录》，2026-05-18 [source:AGENT-TASKBOOK]。
3. 住建部《城市设计管理办法》《城市、镇控制性详细规划编制审批办法》[standard:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES]；自然资源部《国土空间调查、规划、用途管制用地用海分类指南（试行）》2023 [standard:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311]。
4. 《生成式人工智能服务管理暂行办法》2023 [standard:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES]；《无障碍环境建设法》2023 [standard:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW]；国办发〔2020〕45号 [standard:DATA-SRC-ELDERLY-SMART-DIFFICULTY-MEASURES]。
5. 京张铁路公开史料：1905-1909 建成、詹天佑任总工程师、青龙桥人字折返——仅作叙事锚点。
6. 来源 ID 别名映射、勘误与完整机器索引见 `sources.json`、`errata.json` 与 `rights_ledger.json` [source:SITE-PACKAGE]。
