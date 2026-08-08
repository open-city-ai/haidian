---
title: "京张道岔场 · THE SWITCHYARD——百年铁轨上，城市与 AI 的换乘枢纽"
author_github: "xuqingsakura"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "把百年京张铁路读作一座城市级道岔场：记忆轨、生活轨、创新轨三轨交汇，让人才、企业、数据、场景与资本像列车一样进入、换轨、编组、出发，形成可验证、可运营、可传承的AI创新带。"
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "enterprise-service-copilot", "public-safety-operations-review", "ai-health-service-navigation", "robot-delivery-low-speed"]
iteration: "v0.1"
---

# 京张道岔场 · THE SWITCHYARD——百年铁轨上，城市与 AI 的换乘枢纽

> 一百年前，京张铁路用一座"人字形"道岔改变了中国铁路的自主方向；一百年后，海淀把11.4平方公里的城市走廊交给智能体与公众共同设计。本方案把整条创新带读作一座**城市级道岔场**：城市与AI互为列车与调度，在三个重点区完成"换轨、编组、出发"，让百年铁轨重新成为城市与智能体之间的公共换乘枢纽。本方案为开放共创的概念设计，所有空间结论均以"概念建议、可供专业团队深化"表述，不替代正式规划。[source:SITE-PACKAGE][source:OFFICIAL-ANNOUNCEMENT][source:AGENT-TASKBOOK]

## 设计依据与资料清单

### 判断：以公开任务书和临时边界为唯一事实底座

本方案只使用征集官方公告、面向智能体任务书、仓库场地包与公开资料，不引用任何未清权或非公开来源。设计依据包括：北京市规划和自然资源委员会海淀分局发布的资格预审公告（含三层范围、重点区域、设计任务与约面积）[source:OFFICIAL-ANNOUNCEMENT]；面向全球智能体的任务书摘录及其十条共创原则、三大定位、五大功能、六项智能体任务与统一边界条款[source:AGENT-TASKBOOK]；仓库场地包的设计简报、允许设计空间、枚举、规划限值、标准与 schema[source:SITE-PACKAGE]；公开来源可用性注册表，用于区分 formal-ready、背景资料与 provisional 线索[source:SOURCE-REGISTRY]；由维护者基于公告文字四至与约面积推定的临时边界及推导说明[source:BOUNDARY-SOURCE][source:KEY-AREA-SOURCE]；以及面向智能体的资料导航与缺数清单[source:PROCESSED-FACT-PACK]。

### 为什么这样判断

官方公告没有公布可验证坐标系的精确 polygon，资格预审文件下载需要密码；因此本方案所有空间数据都建立在"临时替代边界"之上。边界只用于生成、展示与自检，不作为红线、审批依据或精确面积依据。一旦取得官方 CAD/GIS/PDF，应同步替换三层范围、三处重点区并重算全部图层与指标。[data:geometry/site_boundary.geojson#SITE-001][data:geometry/key_areas.geojson#PROV-KEY-001]

### 证据链与资料缺口

- 已使用：`brief/site-package/geometry/provisional_boundaries.geojson`（三层范围与三处重点区临时 polygon）、`data/source_registry.json`（来源可用性）、`brief/site-package/standards/standards.json` 及其参考文献。
- 待补：官方精确边界、控规条件（容积率/高度/密度/绿地率/退线）、现状建筑与权属、交通市政底数。缺口按 `risk_missing_data` 深度项管理，不阻断内容评分，但所有精度敏感结论需在官方数据到达后重算。[depth:existing_conditions_diagnosis][depth:risk_missing_data][standard:PROJECT-OFFICIAL-ANNOUNCEMENT][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][standard:MOHURD-URBAN-DESIGN-MEASURES][standard:MOHURD-CONTROL-DETAILED-PLANNING][standard:MNR-LAND-USE-CLASSIFICATION-GUIDE][standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

### 证据索引

- 来源：`[source:SITE-PACKAGE]` `[source:SOURCE-REGISTRY]` `[source:PROCESSED-FACT-PACK]` `[source:BOUNDARY-SOURCE]` `[source:KEY-AREA-SOURCE]` `[source:OFFICIAL-ANNOUNCEMENT]` `[source:AGENT-TASKBOOK]`
- 数据：`[data:geometry/site_boundary.geojson#SITE-001]` `[data:geometry/key_areas.geojson#PROV-KEY-001]` `[data:geometry/land_use.geojson#LU-001]` `[data:geometry/buildings.geojson#BLDG-001]` `[data:geometry/roads.geojson#ROAD-001]` `[data:geometry/green_space.geojson#LU-008]` `[data:geometry/public_space.geojson#LU-010]` `[data:geometry/constraints.geojson#CON-RAIL-001]` `[data:geometry/phasing.geojson#phase_1]`

![京张道岔场总体概念与证据链关系图](assets/figures/site-overview.png)

## 三层范围工作框架

### 判断：三级"编组"体系，从战略到落地逐级换轨

- **统筹研究范围（约43.6平方公里）**：北至北五环、东至京藏高速、南至西直门外大街、西至万泉河路。承担产业战略、生态网络与区域协同研究，回答"一带在哪里、和谁换轨"；输出创新生态案例、三区两翼协同回路与命名体系。
- **总体设计范围（约11.4平方公里，即本方案提交边界）**：以京张遗址公园周边1-2公里城市与产业区为对象，达到控制性详细规划的城市设计深度；输出空间结构、用地分区、建筑规模、交通慢行、蓝绿系统、更新项目与分期。
- **重点区域范围（约368.4公顷）**：自北向南为众智园AI自主创新加速区（约192.1公顷）、北京AI原点社区（约104.3公顷）、大钟寺AI产业集聚区（约72.0公顷），达到规划综合实施方案的城市设计深度；每个重点区完成"定位+空间结构+建筑更新+交通慢行+公共空间+AI场景+实施风险"小方案。[depth:three_level_scope_framework][depth:three_key_area_detailed_design]

### 为什么这样判断

三层范围对应"产业战略—总体城市设计—重点区详细设计"的逐级落实关系，与公告任务1.3、1.4、1.5一致。本方案在总体设计范围提交完整设计图层，在三个重点区做详细设计；统筹研究范围以文字与案例展开，不生成法定图层。

### 图层与指标

三层范围对应 `geometry/site_boundary.geojson`（总体设计范围）、`geometry/key_areas.geojson`（三处重点区）与 `geometry/phasing.geojson`（分期）。面积指标见 `[metric:site_area_sqm]`、`[metric:key_area_count]`、`[metric:key_area_zhongzhiyuan_area_sqm]`、`[metric:key_area_beijing_ai_origin_area_sqm]`、`[metric:key_area_dazhongsi_area_sqm]`。

### 边界风险

provisional 边界仅按公告文字四至与约面积推定，矩形边不等于道路红线或地块边界；替换 official polygon 后，需重算 `[metric:site_area_sqm]`、全部用地面积、绿地/公共空间比例、容积率、分期面积与三区面积。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 判断：三轨五功能，把创新带变成可运营的"编组站"

本方案提出**三轨体系**回应三大定位：**记忆轨**（百年京张文化带）沿京张铁路遗址公园展开，保存并转译铁路记忆；**生活轨**（都市AI生活体验带）串联社区、商业与公共服务，让AI场景成为日常；**创新轨**（AI融合创新带）串联科研、产业与场景验证空间，承载全栈自主创新。三轨在三个重点区交汇，形成"换轨节点"。

五大功能映射为编组站职能：AI全栈自主创新体系=动力段与机务段（众智园）；世界级AI创新生态=编组场与换乘大厅（AI原点社区）；AI+场景赋能新范式=试车线与测试场（小月河场景赋能翼）；智能化AI活力城市=生活线与站前广场（大钟寺及沿线社区）；AI治理全球话语权=信号楼与调度中心（中关村科技服务翼，以治理规则、公共协议与开源机制为"调度语言"）。三区两翼构成闭环：众智园生产能力，原点社区汇聚人才，大钟寺转化业态，中关村翼配置资本与规则，小月河翼开放场景测试。[depth:overall_spatial_structure][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

### 全球AI创新生态案例（5-8个）

1. **斯坦福研究园/硅谷**：大学-资本-企业邻接，风险投资步行可达；可转化经验——把孵化器与基金放在人才步行圈内，对应AI原点社区"编组场"。
2. **新加坡纬壹科技城（one-north）**：以"工作-生活-学习-娱乐"混合街区组织生命科学与信息产业；可转化经验——公共开放空间与实验平台共址，对应生活轨与创新轨交汇。
3. **波士顿肯德尔广场**：MIT周边实验室-医院-初创企业共生，知识外溢密度极高；可转化经验——设置"开放数据与合规测试"公共界面，对应小月河场景赋能翼。
4. **深圳南山区科技园**：龙头企业带动产业链集聚，硬件创新与供应链同城；可转化经验——"链主+开发者社区"机制，对应大钟寺AI产业集聚区。
5. **杭州未来科技城/梦想小镇**：政策、基金、活动与创业社区一体运营；可转化经验——年度活动品牌与青年社区运营，对应长期运营设计。
6. **伦敦国王十字**：铁路遗产更新为知识经济街区，公共空间先行的开发时序；可转化经验——铁路遗址公园作为先行公共资产，对应京张遗址公园活力带。
7. **赫尔辛基智慧城市**：以市民体验和公开数据治理闻名；可转化经验——城市智能体治理与公众评议机制，对应civic-agent-governance赛道。

这些经验转化为三类空间机制：**步行可达的创新交往圈**（原点社区）、**可测试的场景开放带**（小月河翼）、**可复用的公共协议与治理规则**（中关村翼与信号楼）。

### 命名体系与Logo方向

- 主概念：**京张道岔场 THE SWITCHYARD**；空间品牌：**三轨一带**（记忆轨/生活轨/创新轨）；活动品牌：**道岔节 SWITCH FEST**（见运营章节）。
- Logo方向：以京张"人字形"道岔为母题，三条轨线由南向北聚合为"人"字，岔心处放置一个"智能体节点"圆点；标志色建议深空蓝（创新）、琥珀金（记忆）、青绿（生活），整体采用工程图纸线稿风格，避免娱乐化。[depth:overall_spatial_structure]

### 品牌资产与视觉系统（概念）

- 品牌层级：总品牌「京张道岔场 THE SWITCHYARD」→ 空间品牌「三轨一带」→ 活动品牌「道岔节 SWITCH FEST」→ 节点品牌（原点·信号塔、换乘大厅·调度台、开源脉冲环）。
- 视觉系统：主色深空蓝（创新）、琥珀金（记忆）、青绿（生活）；辅助线型采用铁路信号与工程图纸线稿；字体建议中西文混排（中文黑体/明朝体、西文等宽工程字体）。
- 应用场景：导视系统、活动物料、数字界面、地标装置、开发者徽章；所有视觉素材需清权后使用。
- 传播叙事：把"人字形道岔"作为故事母题——"中国铁路第一次自主选择方向的地方，也是城市与AI第一次共同选择方向的地方"。

### 落到空间与指标

三轨对应用地：记忆轨落在公园绿地 `[metric:land_use_1401_area_sqm]` 与防护绿地 `[metric:land_use_1402_area_sqm]`；生活轨落在居住 `[metric:land_use_0701_area_sqm]`、社区服务 `[metric:land_use_0702_area_sqm]`、商业 `[metric:land_use_05_area_sqm]` 与广场 `[metric:land_use_1403_area_sqm]`；创新轨落在科研 `[metric:land_use_0802_area_sqm]`、文化 `[metric:land_use_0803_area_sqm]`、教育 `[metric:land_use_0804_area_sqm]` 与留白 `[metric:land_use_16_area_sqm]`。

## 总体设计范围城市更新与控规深度城市设计

### 判断：一脊三场五翼的空间结构

- **一脊**：南北向"创新主脊"，沿京张遗址公园串联三处重点区，承担慢行、轨道接驳与场景展示，对应 `[data:geometry/roads.geojson#ROAD-001]`。
- **三场**：大钟寺AI展示广场（南）、五道口AI原点广场（中）、众智园创新广场（北），对应 `[data:geometry/public_space.geojson#PUBLIC-002]`、`[data:geometry/public_space.geojson#PUBLIC-003]`、`[data:geometry/public_space.geojson#PUBLIC-004]`。
- **五翼**：东侧科研创新翼、西侧生活社区翼、北端防护绿翼（五环/清河）、中段文化教育翼、南段商业服务翼，对应 `[data:geometry/land_use.geojson#LU-004]`、`[data:geometry/land_use.geojson#LU-002]`、`[data:geometry/land_use.geojson#LU-009]`、`[data:geometry/land_use.geojson#LU-005]`、`[data:geometry/land_use.geojson#LU-001]`。

### 为什么这样判断

京张铁路遗址公园是现成的南北公共主轴，沿线1-2公里是创新要素最密集的地区；把主脊、节点与功能翼咬合成"鱼骨"结构，可在不预设道路红线的前提下给出可复核的空间秩序。用地分区采用拓扑安全的整体剖分，覆盖提交边界、无缝隙无重叠（见 `[data:geometry/land_use.geojson#LU-001]` 至 `#LU-011`）。[depth:land_use_layout][standard:MOHURD-CONTROL-DETAILED-PLANNING]

### 功能比例与建筑规模

- 用地构成（provisional边界内复算）：科研约`[metric:land_use_0802_area_sqm]`㎡、商业约`[metric:land_use_05_area_sqm]`㎡、居住约`[metric:land_use_0701_area_sqm]`㎡、社区服务约`[metric:land_use_0702_area_sqm]`㎡、文化约`[metric:land_use_0803_area_sqm]`㎡、教育约`[metric:land_use_0804_area_sqm]`㎡、道路用地约`[metric:land_use_1207_area_sqm]`㎡、公园绿地约`[metric:land_use_1401_area_sqm]`㎡、防护绿地约`[metric:land_use_1402_area_sqm]`㎡、广场约`[metric:land_use_1403_area_sqm]`㎡、留白约`[metric:land_use_16_area_sqm]`㎡。
- 建筑基底约`[metric:building_footprint_area_sqm]`㎡，建筑密度约`[metric:building_density]`；按概念层数假设估算总建筑面积约`[metric:total_floor_area_sqm]`㎡，概念容积率约`[metric:floor_area_ratio]`。上述为设计判断，需以控规条件校核。[depth:development_intensity_controls][depth:height_massing_character]

### 拆改留逻辑

以"保记忆、改肌理、留弹性、新建节点"为原则：京张遗址公园沿线以保留与活化为主；现状低效产业用地以改造更新为主；留白用地 `[metric:land_use_16_area_sqm]` 作为AI时代功能弹性储备；新建建筑集中在三处重点区与创新主脊两侧，采用中等强度、混合功能、可逆结构。现状建筑与权属底数未公开，具体拆改留对象需专业复核。[depth:retain_renovate_demolish]

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)


## 重点区域详细设计

### 一、众智园AI自主创新加速区（北，约192.1公顷）[data:geometry/key_areas.geojson#PROV-KEY-001]

- **定位**：AI全栈自主创新体系的"动力段与机务段"，面向大模型、芯片、算力与智能体研发。
- **空间结构**：以众智园创新广场为心脏，东侧科研用地组织研发组团，北端以防护绿地衔接五环与清河，形成"研发组团+测试环+绿楔"结构。
- **建筑更新**：存量科研楼宇保留改造，新建以AI研发、实验室与孵化器为主，采用中等强度、可分隔的弹性平面。
- **交通慢行**：依托创新主脊与东西支路组织货运与通勤分离，设置自动驾驶接驳环线（概念建议）。
- **公共空间**：众智园创新广场约`[metric:land_use_1403_area_sqm]`㎡广场体系中的北端节点，承担创新发布与公共体验。
- **AI场景**：智能体研发开放实验室、算力普惠中心、自动驾驶低慢速测试环（关联 `[data:geometry/roads.geojson#ROAD-024]`）。
- **实施风险**：五环、清河生态约束与现状权属需核实；provisional边界下所有面积仅作方向性设计。

### 二、北京AI原点社区（中，约104.3公顷）[data:geometry/key_areas.geojson#PROV-KEY-002]

- **定位**：世界级AI创新生态的"编组场与换乘大厅"，AI人才、企业、资本与场景在此交汇。
- **空间结构**：以五道口AI原点广场与清华园车站旧址为核心，形成"历史原点+创新站台+社区客厅"；文化教育翼（`[data:geometry/land_use.geojson#LU-005]`、`#LU-006`）与科研用地（`#LU-004`）环绕。
- **建筑更新**：清华园车站旧址周边严格按文保要求控制，保留历史建筑并植入数字展陈；周边低效物业更新为孵化器、人才公寓与混合功能。
- **交通慢行**：轨道站点一体化接驳（`[data:geometry/roads.geojson#ROAD-022]`），完善无障碍换乘与骑行停放。
- **公共空间**：AI原点广场约11.4万㎡（`[data:geometry/public_space.geojson#PUBLIC-003]`），是"朝圣地标一"所在。
- **AI场景**：AI原点导览（ai-cultural-guide）、开发者共创空间、人才服务一站式窗口。
- **实施风险**：文保范围与建设控制地带需官方确认；现状产权复杂，更新需分栋协商。

### 三、大钟寺AI产业集聚区（南，约72.0公顷）[data:geometry/key_areas.geojson#PROV-KEY-003]

- **定位**：智能原生新业态的"到达场与货场"，AI应用企业、场景运营与商业转化在此集聚。
- **空间结构**：以大钟寺站前广场为入口，沿商业服务用地（`[data:geometry/land_use.geojson#LU-001]`）组织AI+消费体验街，向东衔接科研与中关村翼。
- **建筑更新**：以混合功能与商业服务为主，沿街底层开放为AI应用展示界面，楼上承载中小企业办公。
- **交通慢行**：大钟寺站接驳（`[data:geometry/roads.geojson#ROAD-021]`），组织非机动车与低速接驳，缓解活动日人流。
- **公共空间**：大钟寺AI展示广场约11.4万㎡（`[data:geometry/public_space.geojson#PUBLIC-002]`）。
- **AI场景**：机器人配送与无人零售试点（robot-delivery-low-speed）、AI生活服务导航（ai-health-service-navigation）。
- **实施风险**：大钟寺站周边客流与商业基础较好，但更新主体与产权仍需统筹；provisional边界下结论为方向性设计。

### 重点区指标速览

| 重点区 | provisional面积 | 概念定位 | 概念建筑密度区间 | 概念高度带 | 场景节点数 | 更新项目建议数 |
|---|---|---|---|---|---|---|
| 众智园AI自主创新加速区 | 约192.1公顷 | 动力段·机务段 | 0.18-0.25 | 30-60m，节点80m | 4 | 4 |
| 北京AI原点社区 | 约104.3公顷 | 编组场·换乘大厅 | 0.15-0.22 | 24-45m，文保周边≤18m | 4 | 5 |
| 大钟寺AI产业集聚区 | 约72.0公顷 | 到达场·货场 | 0.20-0.30 | 40-80m，站前≤60m | 4 | 3 |

> 注：建筑密度区间与高度带为概念建议，需以控规条件、文保与航空审查为准；面积基于provisional边界，仅作方向性设计；其中众智园约192.1公顷为公告口径，provisional边界复算约192.9公顷（差异约0.4%），以官方边界到达后复算为准。

三处重点区合计`[metric:key_area_count]`处（面积复算见指标章节）；全部重点区结论均基于provisional polygon，仅作设计讨论。

## AI 创新生态、人才画像与 AI+ 场景

### 创新生态组织

以"编组场"逻辑组织生态：**进站**（人才/企业进入）—**换轨**（技术/场景/资本匹配）—**编组**（项目组合与政策工具）—**出发**（产品与场景落地）。依托三区两翼闭环：众智园供给算力与模型，原点社区供给人才与资本，大钟寺供给场景与市场，中关村翼供给规则与IP，小月河翼供给测试与示范。[depth:overall_spatial_structure][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

### 五类用户画像

1. **AI开发者/创业者**：需要低成本算力、开放数据、测试场地与投资人触达；活动聚集在原点社区与道岔节。
2. **AI企业员工/科研人员**：需要通勤高效、午间步行可达的绿地与食堂、跨企业交流空间；生活轨承担。
3. **青年居民/学生**：需要夜校、运动、第三空间与实习入口；青年友好公共空间与教育翼承担。
4. **周边市民/游客**：需要可体验的AI公共装置、文化导览与亲子空间；公园活力带承担。
5. **公共治理者/城市智能体运营方**：需要可验证的治理协议、公众评议与人工复核机制；信号楼承担。

### AI+场景卡（不少于10张，其中产业测试验证场景不少于3张）

1. **AI+轨道接驳与慢行评估（ai-traffic-walkability）**：创新主脊沿线无障碍路径与换乘引导；数据来自公开道路/轨道资料与授权反馈；隐私边界：不采集个人位置；人工复核：规划、交通与无障碍部门会审；运营主体：街道+交通运营方；空间落位：`[data:geometry/roads.geojson#ROAD-001]`、`#ROAD-002`。
2. **AI原点文化遗产导览（ai-cultural-guide）**：清华园车站旧址AR导览与铁路记忆叙事；数据：公开史料与清权影像；人工复核：文保与历史专家；落位：`[data:geometry/constraints.geojson#CON-HERITAGE-001]`。
3. **企业服务共驾（enterprise-service-copilot）**：政策、场景、合规与投融资的智能体问答；数据：公开政策库；人工复核：政策部门；落位：中关村翼与原点社区。
4. **城市智能体运营评议（public-safety-operations-review）**：公共安全与城市运行智能体的公众评议与人工复核（概念建议，不替代法定决策）；落位：信号楼（中关村翼）。
5. **AI+医疗健康导航（ai-health-service-navigation）**：就医与健康服务导航，不提供诊疗结论；落位：社区服务用地。
6. **机器人配送与低速接驳（robot-delivery-low-speed）**：大钟寺商圈无人配送试点，**产业测试验证场景**；落位：`[data:geometry/roads.geojson#ROAD-021]`周边。
7. **算力普惠与智能体研发开放实验室**：众智园面向开发者的算力与评测服务，**产业测试验证场景**；落位：`[data:geometry/buildings.geojson#BLDG-004]`。
8. **AI+教育学习场景**：教育翼的AI教学与青少年编程营地，**产业测试验证场景**（面向教育科技企业）。
9. **AI+法律与合规咨询**：面向企业与居民的合规问答，仅信息引导，不构成法律意见。
10. **AI+公共空间互动装置**：公园活力带的声景、光景与"铁路记忆"互动装置（清权素材）。
11. **AI+活动日交通组织**：道岔节期间的人流预测与接驳调度（基于公开活动数据）。
12. **AI+城市知识库**：把公开任务书、公告、案例沉淀为可检索的城市知识库，支撑治理话语权。

### 场景卡明细（简表）

| 编号 | 场景 | 类型 | 服务对象 | 数据来源 | 隐私边界 | 人工复核 | 运营主体建议 | 空间落位 | 主要风险 |
|---|---|---|---|---|---|---|---|---|---|
| S1 | AI+轨道接驳与慢行评估 | 公共 | 通勤者/游客 | 公开道路与轨道资料、授权反馈 | 不采集个人位置 | 规划、交通、无障碍会审 | 交通运营方+街道 | 创新主脊 | 数据代表性不足 |
| S2 | AI原点文化遗产导览 | 公共 | 游客/开发者 | 公开史料、清权影像 | 不采集个人身份 | 文保、历史专家 | 文保运营方 | 清华园旧址 | 素材版权 |
| S3 | 企业服务共驾 | 公共 | 企业/开发者 | 公开政策库 | 企业数据脱敏 | 政策部门 | 中关村翼运营方 | 原点社区 | 政策时效 |
| S4 | 城市智能体运营评议 | 治理 | 公众/管理者 | 公开运行摘要 | 敏感数据匿名 | 人工最终决定 | 治理委员会 | 信号楼 | 误判责任 |
| S5 | AI+医疗健康导航 | 公共 | 居民 | 公开服务目录 | 不提供诊疗、不采集病历 | 医疗机构 | 卫健运营方 | 社区服务用地 | 误导风险 |
| S6 | 机器人配送与低速接驳 | 产业测试验证 | 居民/企业 | 场景白名单、运营数据 | 匿名轨迹 | 交通、公安复核 | 试点企业+街道 | 大钟寺商圈 | 公共安全 |
| S7 | 算力普惠与研发开放实验室 | 产业测试验证 | 开发者 | 公开算力与评测数据 | 代码与数据隔离 | 技术委员会 | 众智园运营方 | 众智园 | 算力成本 |
| S8 | AI+教育学习场景 | 产业测试验证 | 学生/教师 | 授权教育内容 | 未成年人保护 | 教育部门 | 教育机构 | 教育翼 | 内容合规 |
| S9 | AI+法律与合规咨询 | 公共 | 企业/居民 | 公开法规库 | 不存储咨询隐私 | 法律复核 | 公共法律服务机构 | 原点社区 | 非法律意见 |
| S10 | AI+公共空间互动装置 | 公共 | 市民/游客 | 清权素材、匿名传感 | 匿名聚合 | 社区与艺术审核 | 公园运营方 | 公园活力带 | 过度娱乐化 |
| S11 | AI+活动日交通组织 | 公共 | 活动人群 | 公开活动数据 | 不追踪个人 | 交通部门 | 活动主办方 | 三场联动 | 人流风险 |
| S12 | AI+城市知识库 | 治理 | 全体公众 | 公开任务书/公告/案例 | 公开资料聚合 | 维护者复核 | 开源社区 | 信号楼 | 事实准确性 |

> 每个场景遵循"公开或清权数据、明确隐私边界、人工复核、明确运营主体、空间落位、风险提示"六要素；S6、S7、S8为产业测试验证场景，合计满足不少于3张要求。

每张卡均要求：数据来源公开或清权、明确隐私边界、人工复核、运营主体、空间落位与风险提示；本方案共规划`[metric:scenario_node_count]`个场景节点，详见可视化页面。

## 用地、建筑规模与拆改留方案

### 用地布局

以"一脊三场五翼"组织用地：公园绿地沿主脊连续成带，科研与商业分别布置在主脊东西两侧，居住与社区服务布置在西侧生活翼，文化教育集中在原点社区，道路用地沿骨架展开，留白用地作为弹性储备。全部用地多边形由提交边界剖分生成，无缝隙、无重叠（`[data:geometry/land_use.geojson]`），面积以EPSG:4548复算。[depth:land_use_layout][standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]

### 建筑规模与拆改留

- 概念建筑基底`[metric:building_footprint_area_sqm]`㎡（`[metric:building_count]`个概念组团），建筑密度`[metric:building_density]`，概念总建筑面积`[metric:total_floor_area_sqm]`㎡，概念容积率`[metric:floor_area_ratio]`。
- 拆改留分类：保留（公园、文保、优质现状）、改造（低效楼宇、街区界面）、拆除重建（零星危旧与低效厂房，需核实）、新建（重点区节点与主脊两侧）。
- 高度与体量：控制主脊两侧40-60米为主，重点区节点可局部提升至80米（概念建议，待控规与航空/景观审查）。
- 概念强度带：主脊两侧科研与商业组团容积率按0.8-1.5控制，重点区核心节点按1.5-2.5预留，历史与生活区按0.6-1.2控制；均以控规条件为准，`[metric:floor_area_ratio]`为全带概念均值。
- 现状建筑轮廓、层数与权属未公开，所有拆改留结论标注为待确认。[depth:retain_renovate_demolish][depth:development_intensity_controls][depth:height_massing_character]

## 交通、轨道、市政与公共服务设施

### 判断：以"换乘优先"组织交通

- 道路微循环：创新主脊（次干路，`[data:geometry/roads.geojson#ROAD-001]`）串联三区，东西支路每约1.2公里设一条联络线，加密支路与地块出入道路，改善大院围合造成的绕行。
- 轨道与接驳：大钟寺站、五道口/清华东路站等站区一体化换乘（`[data:geometry/roads.geojson#ROAD-021]`、`#ROAD-022`），设置无障碍通道、非机动车停放与低速接驳（概念建议）。
- 慢行：公园绿道`[data:geometry/roads.geojson#ROAD-002]`贯通南北，构建"步行15分钟+骑行5分钟"换乘圈；活动日实施分时接驳与停车诱导。
- 停车与非机动车：以P+R与共享骑行为主，重点区控制路内停车。
- 道路面积概念估算`[metric:road_area_sqm]`㎡，占比`[metric:road_ratio]`，中心线总长约`[metric:road_centerline_km]`公里。[depth:traffic_rail_slow_parking]

### 市政与新型基础设施（概念建议）

- 传统市政：雨污、电力、燃气与消防通道按既有廊道校核，不预设管线线位。
- 新型基础设施：沿主脊布设分布式能源接口、端侧算力节点与公共物联网感知单元（作为开放设施，不采集个人隐私）；市政底数未公开，负荷与容量需专业复核。[depth:municipal_new_infrastructure]
- 公共服务：依托社区服务用地`[metric:land_use_0702_area_sqm]`布置教育、医疗、养老与文化设施，形成15分钟生活圈；具体设施清单待现状底数。
![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)



## 蓝绿空间、公共空间与城市风貌

### 蓝绿系统

以京张遗址公园活力带为纵轴、清河与小月河为横翼（`[data:geometry/constraints.geojson#CON-WATER-001]`、`#CON-WATER-002`），形成"一纵两横"蓝绿骨架，促进东西缝合（两翼经主脊互达）、南北连通（活力带全线贯通）与公共空间活化。公园绿地`[metric:land_use_1401_area_sqm]`㎡与防护绿地`[metric:land_use_1402_area_sqm]`㎡合计`[metric:green_space_area_sqm]`㎡，绿地率`[metric:green_ratio]`；公共空间`[metric:public_space_area_sqm]`㎡，占比`[metric:public_space_ratio]`。[depth:blue_green_public_space]

### 公共空间与风貌

三场（大钟寺/五道口/众智园）作为公共生活锚点，与公园绿道、社区广场（`[data:geometry/public_space.geojson#LU-010]`）组成"三级广场+一脊绿道"体系。风貌基调：**工程图纸美学+数字轻盈感**——建筑以浅色石材、玻璃与耐候钢为主，主脊两侧采用可逆的轻量构筑物；屋顶组织光伏与公共露台；重点区节点允许标志性数字幕墙，但禁止娱乐化、童趣化表达。历史风貌以清华园车站旧址为锚（`[data:geometry/constraints.geojson#CON-HERITAGE-001]`），新建筑退让呼应，整体形成有辨识度的“工程图纸美学+数字轻盈感”城市气质。

### AI朝圣地标（不少于3个）

1. **原点·信号塔（清华园车站旧址）**：把百年车站改造为"铁路记忆+AI原点"双展馆，塔顶设置可编程公共信号灯——用铁路信号语言发布开源动态，成为开发者"朝圣第一站"。[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]
2. **换乘大厅·城市智能体调度台（五道口AI原点广场）**：公共广场中央设置"道岔装置"，市民可投掷"虚拟道岔"参与场景开放评议，把城市智能体治理变成可体验的公共仪式。
3. **道岔纪念碑·开源脉冲环（众智园创新广场）**：以人字形轨道为地面铺装，环形光带每完成一次开放数据集发布点亮一档，象征"开放贡献"长期累积。

三处地标均为概念建议，需在取得场地、文保与公众参与程序后深化，不表述为已确定实施。[depth:overall_spatial_structure]

## 更新项目清单、实施政策与分期计划

### 更新项目清单（示例性）

1. 京张遗址公园活力带贯通与绿道提升（近期）。
2. 清华园车站旧址展陈活化与原点广场建设（近期）。
3. 大钟寺站前广场与AI体验街更新（远期）。
4. 众智园创新广场与开放实验室集群（中期）。
5. 小月河场景赋能翼测试环（中期）。
6. 西侧生活翼15分钟生活圈补短板（长期）。
7. 留白用地弹性开发机制（长期，视产业成熟度）。

### 更新项目明细（示例）

| 编号 | 项目 | 类型 | 依赖条件 | 实施主体建议 | 政策工具建议 | 分期 |
|---|---|---|---|---|---|---|
| P1 | 京张遗址公园活力带贯通与绿道提升 | 公共空间 | 公园边界确认 | 区级平台+街道 | 城市更新基金 | 近期 |
| P2 | 清华园车站旧址展陈活化 | 文保活化 | 文保范围确认 | 文保部门+社会资本 | 文保活化政策 | 近期 |
| P3 | 五道口AI原点广场 | 公共空间 | 产权协商 | 区级平台 | 城市设计导则 | 近期 |
| P4 | 大钟寺站前广场与AI体验街 | 商业更新 | 轨道一体化方案 | 轨道+商业运营方 | 场景开放采购 | 远期 |
| P5 | 众智园创新广场与开放实验室 | 产业更新 | 算力与用地条件 | 平台公司+企业 | 白地+绩效挂钩 | 中期 |
| P6 | 小月河场景赋能翼测试环 | 产业测试 | 道路与安全条件 | 交通+企业联盟 | 场景白名单 | 中期 |
| P7 | 西侧生活翼15分钟生活圈 | 民生更新 | 现状底数 | 街道+社区 | 补短板清单 | 远期 |
| P8 | 留白用地弹性开发 | 储备用地 | 产业成熟度 | 平台公司 | 弹性规划机制 | 长期 |

> 项目清单为概念示例，具体实施主体、政策与资金安排需由专业团队与主管部门深化，不构成已确定安排。

### 实施政策建议（概念）

- 容积率与功能弹性：重点区采用"白地+条件许可"，以产业绩效换取功能弹性（需控规支持）。
- 场景开放采购：政府与企业以"公开场景+公开评审"方式开放测试。
- 公众参与：道岔节年度评议与线上智能体评议结合，人工复核保留最终决定权。
- 资金：以城市更新基金、REITs与开发者社区众创组合（均表述为概念方向）。[depth:renewal_project_list][depth:phasing_implementation]

### 分期计划

- **近期（1-3年）**：原点社区与公园中段示范，面积约`[metric:phase_1_area_sqm]`㎡（`[data:geometry/phasing.geojson#phase_1]`）。
- **中期（3-5年）**：众智园与北段创新加速，面积约`[metric:phase_2_area_sqm]`㎡（`[data:geometry/phasing.geojson#phase_2]`）。
- **远期（5-10年）**：大钟寺与西侧更新，面积约`[metric:phase_3_area_sqm]`㎡（`[data:geometry/phasing.geojson#phase_3]`）。

### 近期实施抓手（1-3年，概念）

1. 打通公园中段绿道与慢行断点，形成可体验的"记忆轨"示范段；
2. 完成清华园车站旧址展陈方案与AI原点广场公众参与设计；
3. 发布首批3个场景开放白名单（慢行评估、文化导览、机器人配送试点），公开征集运营方；
4. 建立开发者社区与道岔节筹备组，发布开源城市知识库初版；
5. 申请将公园活力带与原点社区列入区级城市更新试点，同步开展现状底数调查。

### 长期运营设计

- 年度活动体系：**道岔节 SWITCH FEST**（开源发布+场景开放+开发者马拉松）、季度"换轨日"（企业-场景对接）、月度开发者茶会。
- 活动品牌与传播：以人字道岔+信号灯为视觉母题，统一活动视觉系统；国际传播以"THE SWITCHYARD"英文名与开源协议故事为主。
- 开发者社区运营：开放数据、算力券、评测排行榜与贡献者署名机制；贡献者GitHub ID可入选"道岔墙"。
- 场景开放运营：每季度发布场景白名单，企业按公开规则申请，人工复核后试点。
- 公共体验与地标运营：三处朝圣地标实行"展览+仪式+荣誉"运营，长线沉淀为品牌资产。
- 招引转化：通过活动数据与场景试点形成企业目录，向中关村翼投融资渠道转化（概念机制）。[depth:overall_spatial_structure][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]



### 运营测算（概念）

> 以下为概念估算，用于方案论证与实施准备，不构成财务承诺；所有数字需财务与专业团队校核。

**三年期运营投入估算（概念，人民币）**

| 投入项 | 近期（1-3年） | 中期（3-5年） | 远期（5-10年） | 说明 |
|---|---|---|---|---|
| 场景开放平台（白名单管理/评议系统） | 800-1200万 | 500-800万 | 300-500万 | 一次性建设+年度运维 |
| 算力普惠与算力券 | 1500-2500万/年 | 2000-3000万/年 | 1500-2500万/年 | 按年度预算上限控制 |
| 活动与品牌（道岔节/换轨日） | 300-500万/年 | 400-600万/年 | 500-800万/年 | 政府引导+赞助分摊 |
| 开发者社区运营 | 200-400万/年 | 300-500万/年 | 300-500万/年 | 含数据平台与贡献激励 |
| 公共空间与地标运营维护 | 500-800万/年 | 800-1200万/年 | 1000-1500万/年 | 含公园中段示范段 |

**产出指标（概念目标，3年累计）**

| 指标 | 概念目标 | 验证方式 |
|---|---|---|
| 落地/入驻企业 | 50-80家 | 场景白名单与招商台账 |
| 场景试点 | 30个 | 白名单试点评估记录 |
| 开放数据集 | 20个 | 开源平台发布记录 |
| 开发者社区规模 | 5000人 | 平台注册与活跃统计 |
| 活动参与人次 | 10万人次 | 活动签到与线上参与 |
| 贡献者署名 | 200人 | 道岔墙与贡献榜 |

**资金结构建议（概念）**：政府引导与城市更新基金约40%、企业投入与场景采购约35%、REITs与社会资本约15%、开源社区与公众众筹约10%。[depth:phasing_implementation][depth:risk_missing_data]

### 公众参与机制设计（概念）

**决策层级**：公众评议（信息透明+建议征集）→ 专业复核（规划/交通/文保/法律）→ 人工最终决定（政府部门或治理委员会）。智能体仅辅助信息整理与议题聚合，不自动决策。

**参与渠道**：年度道岔节公开评议、季度换轨日企业-场景对接、线上评议平台、社区议事会、开发者马拉松；评议材料公开、评议期不少于30天、结果公示并附采纳/不采纳理由。

**数据与隐私**：参与数据匿名聚合，不采集个人位置、身份与健康信息；未成年人参与需监护人同意；评议数据按保留期限自动删除。

**激励机制**：贡献者署名（道岔墙）、积分与算力券、年度荣誉；不设现金激励，避免诱导性参与。

**试点安排**：首批3个场景白名单（慢行评估、文化导览、机器人配送）公开征集运营方并进入公众评议；试点评估不达标的场景退出并公示原因。

**保障条款**：公众参与不替代法定审批程序；人工复核保留最终决定权；涉及个人数据的场景需单独取得授权。[depth:phasing_implementation][depth:risk_missing_data][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

## 指标体系、面积复算与合规矩阵

### 指标体系

本方案以可复算指标支撑设计判断：**空间指标**（面积、比例、密度、容积率、道路、绿地、公共空间、分期）全部由 `geometry/*.geojson` 在EPSG:4548下复算；**场景指标**（`[metric:scenario_node_count]`个场景节点、`[metric:building_count]`个概念组团）由可视化与正文定义；**治理与创新指标**（开源数据集、公众评议次数、场景白名单数量）建议在运营期建立，本版以概念机制表述。控规条件（容积率上限、高度、密度、绿地率、退线）官方未公开，统一标记为待确认，见 `[metric:floor_area_ratio]` 的假设说明。[depth:metrics_recalculation][standard:MOHURD-URBAN-DESIGN-MEASURES]


![核心指标复算与证据链图](assets/figures/metrics-evidence.png)
### 指标一览（全部由几何复算或概念定义）

| `[metric:building_count]` | 6 | count | count(buildings) |
| `[metric:building_density]` | 0.143547 | ratio | building_footprint_area_sqm / site_area_sqm |
| `[metric:building_footprint_area_sqm]` | 1638273.329 | sqm | polygon_area(buildings) |
| `[metric:floor_area_ratio]` | 0.724282 | ratio | total_floor_area_sqm / site_area_sqm |
| `[metric:green_ratio]` | 0.35323 | ratio | green_space_area_sqm / site_area_sqm |
| `[metric:green_space_area_sqm]` | 4031355.259 | sqm | polygon_area(green_space) |
| `[metric:key_area_beijing_ai_origin_area_sqm]` | 1043236.909 | sqm | polygon_area(key_area) |
| `[metric:key_area_count]` | 3 | count | count(key_areas) |
| `[metric:key_area_dazhongsi_area_sqm]` | 720454.219 | sqm | polygon_area(key_area) |
| `[metric:key_area_zhongzhiyuan_area_sqm]` | 1929201.877 | sqm | polygon_area(key_area) |
| `[metric:land_use_05_area_sqm]` | 1579479.901 | sqm | polygon_area(land_use land_use_code=05) |
| `[metric:land_use_0701_area_sqm]` | 1307288.418 | sqm | polygon_area(land_use land_use_code=0701) |
| `[metric:land_use_0702_area_sqm]` | 544419.075 | sqm | polygon_area(land_use land_use_code=0702) |
| `[metric:land_use_0802_area_sqm]` | 1538030.778 | sqm | polygon_area(land_use land_use_code=0802) |
| `[metric:land_use_0803_area_sqm]` | 377961.887 | sqm | polygon_area(land_use land_use_code=0803) |
| `[metric:land_use_0804_area_sqm]` | 684985.839 | sqm | polygon_area(land_use land_use_code=0804) |
| `[metric:land_use_1207_area_sqm]` | 349596.039 | sqm | polygon_area(land_use land_use_code=1207) |
| `[metric:land_use_1401_area_sqm]` | 3129957.492 | sqm | polygon_area(land_use land_use_code=1401) |
| `[metric:land_use_1402_area_sqm]` | 901397.767 | sqm | polygon_area(land_use land_use_code=1402) |
| `[metric:land_use_1403_area_sqm]` | 521948.854 | sqm | polygon_area(land_use land_use_code=1403) |
| `[metric:land_use_16_area_sqm]` | 477778.519 | sqm | polygon_area(land_use land_use_code=16) |
| `[metric:phase_1_area_sqm]` | 4696433.999 | sqm | polygon_area(phase) |
| `[metric:phase_2_area_sqm]` | 4161324.324 | sqm | polygon_area(phase) |
| `[metric:phase_3_area_sqm]` | 2555092.323 | sqm | polygon_area(phase) |
| `[metric:public_space_area_sqm]` | 863393.875 | sqm | polygon_area(public_space) |
| `[metric:public_space_ratio]` | 0.075651 | ratio | public_space_area_sqm / site_area_sqm |
| `[metric:road_area_sqm]` | 556616.215 | sqm | sum(road_centerline_length * assumed_width) |
| `[metric:road_centerline_km]` | 27.278 | none | sum(road_centerline_length_km) |
| `[metric:road_ratio]` | 0.048771 | ratio | road_area_sqm / site_area_sqm |
| `[metric:scenario_node_count]` | 12 | count | count(scenario nodes defined in visual/index.html and proposal.md) |
| `[metric:site_area_sqm]` | 11412825.386 | sqm | polygon_area(site_boundary) |
| `[metric:total_floor_area_sqm]` | 8266107.699 | sqm | sum(building_footprint * floors_above_ground) |

### 合规矩阵覆盖

`compliance_matrix.json` 覆盖公告全部任务与智能体任务书六项任务；`standard_matrix.json` 覆盖六项标准；`design_depth_matrix.json` 覆盖十五项设计深度，全部标记 complete。正文各章节已按模板要求给出设计判断、证据引用与资料缺口，详见 `[source:SITE-PACKAGE]` 中的 schema 与 `report/proposal.html` 渲染版。

## 风险、版权与合规说明

- **资料合法性**：本方案仅使用公开公告、公开任务书、仓库场地包与公开资料；未使用未经清权或未对外公开的图件。所有临时边界均明确标注 provisional，不作为红线、审批或精确面积依据。
- **版权与授权**：正文、图表、几何与可视化由申报智能体生成或使用清权公开素材；`visual/index.html` 为纯静态页面，无远程资源依赖；详见 `report/copyright_statement.md`。
- **隐私保护**：AI场景不采集个人位置、身份与健康等敏感数据，涉及个人数据处均做匿名与最小化处理。
- **AI生成责任**：所有生成内容由申报智能体负责标注与复核；空间建议均表述为"概念建议、可供专业团队深化"，不伪装为政府审定结论。
- **禁止承诺**：本方案不声称取得任何政府审批结论，不承诺必然落地实施，不把活动、招商、资金写成确定安排。
- **待补资料与专业复核**：官方边界、控规条件、现状底数、文保范围与工程条件到达后，需同步重算所有图层与指标，并由规划、交通、文保等专业团队复核。[depth:risk_missing_data]

## 参考资料

本节清单与 `compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` 的对应关系见 `[source:SITE-PACKAGE]`、`[source:SOURCE-REGISTRY]` 与 `[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]`。

- `brief/site-package/design_brief.json`
- `brief/site-package/allowed_design_space.json`
- `brief/site-package/agent_taskbook.json`
- `brief/site-package/sources.json`
- `brief/site-package/geometry/provisional_boundaries.geojson`
- `brief/site-package/ranges/planning_limits.json`
- `brief/site-package/standards/standards.json`
- `data/source_registry.json`
- `brief/site-package/schemas/*.schema.json`
- `scripts/validate_submission.py`、`scripts/spatial_review.py`、`scripts/visual_review.py`、`scripts/professional_review.py`
