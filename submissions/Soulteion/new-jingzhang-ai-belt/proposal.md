---
title: "新京张·AI创新带：从百年人字形铁路到人本AI城市"
author_github: "Soulteion"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以'人'字形铁路的自主创新精神为原点，将京张遗址公园塑造为贯穿南北的'人本AI公共脊'，以众智园、北京AI原点社区、大钟寺三处重点片区为三芯，以中关村科技服务翼与小月河场景赋能翼为两翼，形成'一脊三芯·四带两翼·多点成网'的AI创新带整体方案。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.0"
---

# 新京张·AI创新带：从百年人字形铁路到人本AI城市

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。公告确定了三层范围（统筹研究范围约43.6平方公里、总体设计范围约11.4平方公里、重点区域范围约368.4公顷）、三处重点区域（众智园AI自主创新加速区约192.1公顷、北京AI原点社区约104.3公顷、大钟寺AI产业集聚区约72公顷）以及"百年京张文化带、都市AI生活体验带、AI融合创新带"三大定位 [source:OFFICIAL-ANNOUNCEMENT]。

面向全球智能体开源征集任务书是本方案处理命名体系、AI场景、用户画像、朝圣地标、文化叙事与长期运营的依据 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。任务书要求智能体成果均为开放共创建议，不替代正式规划，不构成政府审定结论；本方案所有空间落点均按此边界起草 [source:AGENT-TASKBOOK]。

本方案遵循住房和城乡建设部《城市设计管理办法》对城市设计统筹公共空间、建筑高度体量风格色彩和风貌塑造的要求 [standard:MOHURD-URBAN-DESIGN-MEASURES]，并结合《城市设计技术导则》等专业标准组织成果深度 [standard:MOHURD-URBAN-DESIGN-TECHNICAL-GUIDELINE]。用地分类依据自然资源部《国土空间调查、规划、用途管制用地用海分类指南》[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，在构图层面同时参考《北京城市总体规划（2016年—2035年）》的海淀创新片区定位与"三山五园"文脉保护要求 [source:BJ-MASTER-PLAN]。

截至本方案提交日，仓库内未提供官方精确边界与官方重点区域 polygon，本方案使用 `brief/site-package/geometry/provisional_boundaries.geojson` 中经维护者登记的临时粗略边界与三处重点区域 polygon [source:SITE-PACKAGE] [source:SOURCE-REGISTRY]。所有几何均标注 `geometry_role="provisional_constraint"`、`official_boundary=false`、`boundary_precision="provisional_rough"`，仅用于方案生成、展示、设计讨论和本地自检，不得作为官方红线、审批依据或精确面积复算依据 [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001]。组织方的数据缺口不阻断内容评分；官方 polygon 到位后，本包全部面积型指标需按 EPSG:4548 重算 [metric:site_area_sqm]。

方案正文与结构化证据的关系：`proposal.md` 是给人阅读的主语言方案；`geometry/*.geojson`、`metrics.json`、三个矩阵文件保存完整机器可复核证据，正文只保留与判断直接相关的少量引用，不重复机器索引 [depth:three_level_scope_framework]。

![方案总体：从人字形铁路到人本AI城市](assets/figures/site-overview.png)

## 三层范围工作框架

### 2.1 统筹研究范围（约43.6 平方公里）

统筹研究范围北至北五环路、东至京藏高速、南至西直门外大街、西至万泉河路，是海淀 AI 产业生态与未来城市形态研究的战略层 [source:OFFICIAL-ANNOUNCEMENT]。本层工作回答三个问题：AI 创新链与产业链如何在海淀与京津冀组织、未来 AI 城市形态如何与存量建成区融合、三区两翼协同回路如何形成 [source:AGENT-TASKBOOK]。本层不以精确红线为目标，而以产业战略、创新网络、跨区域协同和未来城市试验为工作对象，其空间结论以"参考方案"表达 [data:geometry/site_boundary.geojson#SITE-001]。

### 2.2 总体设计范围（约11.4 平方公里）

总体设计范围以京张遗址公园周边 1-2 公里城市地区和产业区为主体，北至北五环路、南至西直门外大街，达到控制性详细规划的城市设计深度。本层把产业战略转译为：用地结构（科研 22.3%、商业 15.9%、居住 27.8%、教育 5.9%、遗址公园绿地 23.0%、广场 5.1%）[data:geometry/land_use.geojson#LU-001] [metric:rnd_land_ratio]、建筑基底布局 [metric:building_footprint_area_sqm]、智能慢行脊 [data:geometry/roads.geojson#ROAD-001]、蓝绿公共空间网络 [metric:green_ratio] 与分期实施框架 [data:geometry/phasing.geojson#PHASE-001]。

### 2.3 重点区域范围（约368.4 公顷）

重点区域范围由三处 polygon 组成，达到规划综合实施方案的城市设计深度 [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] [metric:key_area_count]。三处片区分别承担"全栈自主创新""AI 原点与人才社区""AI 产业集聚与智能经济"职能，形成"三芯"结构（详见第 5 章）。

三层范围的工作逻辑是逐级落实：统筹研究确定产业链与协同回路，总体设计将其落到用地、交通、蓝绿与风貌，重点区域在具体地段验证建筑、公共空间与 AI 场景的可实施性 [depth:three_level_scope_framework] [depth:overall_spatial_structure]。

![三层范围与空间工作框架](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 3.1 总体概念：从"人"字形铁路到人本 AI 城市

1909 年京张铁路建成通车，詹天佑以"人"字形线路翻越八达岭，是中国自主修建的第一条干线铁路，是"自主创新"的百年原点 [source:BJ-MASTER-PLAN]。本方案提出**"新京张"（New Jing-Zhang）**总体概念：把京张铁路"人"字形的自主创新精神，延续为 AI 时代"以人为本"的智能城市形态——**"人"字即"人本"**。三个关键词：

- **百年京张文化带**：以清华园车站、京张铁路遗址为文化锚点，让"人"字形叙事成为城市身份 [source:AGENT-TASKBOOK]；
- **都市AI生活体验带**：把 AI 从"产业工具"升级为"生活体验"，让市民在公园、街道、社区中可感知、可参与 [source:AGENT-TASKBOOK]；
- **AI融合创新带**：以三区两翼为骨架，实现创新链、产业链、人才链、资金链、数据链的融合闭环 [source:AGENT-TASKBOOK]。

### 3.2 命名体系与 Logo 方向

命名体系采用"主名 + 分名 + 节点名"三级结构：

| 层级 | 名称（中） | 名称（英） | 说明 |
| --- | --- | --- | --- |
| 一带主名 | 新京张·AI创新带 | New Jing-Zhang AI Innovation Belt | 品牌总名，突出百年京张精神复兴 |
| 三芯分名 | 众智园、北京AI原点社区、大钟寺 | Zhongzhi Garden / AI Origin Community / Dazhongsi Cluster | 沿用官方片区名，保持辨识度 |
| 两翼分名 | 中关村科技服务翼、小月河场景赋能翼 | Zhongguancun Service Wing / Xiaoyuehe Scenario Wing | 服务与场景导向 |
| 空间品牌 | 人形AI公共脊 | "Ren" (Human) AI Public Spine | 尊崇铁路"人"字形遗产 |

Logo 方向：以京张铁路"人"字形铁轨为母题，将两条铁轨变形为两个相向而立的"人"形，中间以一条发光节点串联，象征"人的协作 × AI 的智能"。色彩采用京张铁路锈红（历史）与海淀创新蓝（AI 未来）双色渐变，配以"人本、共创、向未来"的传播语。Logo 及其字体、图形均为本方案自绘概念，不涉及第三方商标或字体授权 [source:AGENT-TASKBOOK] [depth:brand_identity_system]。

### 3.3 五大功能与三区两翼协同回路

本方案围绕任务书五大功能组织空间 [source:AGENT-TASKBOOK]：

1. **AI 全栈自主创新体系**——以众智园为核心，覆盖芯片、框架、模型、数据、应用、评测、安全治理全链条；
2. **世界级 AI 创新生态**——以北京AI原点社区为核心，依托高校策源、开源协作、成果转化与人才特区；
3. **AI+ 场景赋能新范式**——以小月河场景赋能翼为试验场，把 AI 场景从展示推向可运营；
4. **智能化 AI 活力城市**——以京张遗址公园公共脊为载体，实现 AI 交通、公共服务与公共空间融合；
5. **AI 治理全球话语权**——以众智园安全治理展示廊与大钟寺国际路演客厅为平台，输出标准、评测与治理经验。

三区两翼形成"**高校策源 → 开源协作 → 企业转化 → 场景验证 → 全球传播 → 反哺策源**"的协同回路：中关村科技服务翼（西翼）提供资本、知识产权、专业服务与全球要素配置 [data:geometry/land_use.geojson#LU-001]；小月河场景赋能翼（东翼）提供城市级试验场与生活场景 [data:geometry/land_use.geojson#LU-001]。三芯与两翼通过人形公共脊与慢行网络互联 [data:geometry/roads.geojson#ROAD-001]。

### 3.4 全球 AI 创新生态案例（5-8 个可读摘要）

本方案研究以下全球 AI 创新生态案例，提炼可转化的空间与运营机制 [source:AGENT-TASKBOOK] [depth:ai_ecosystem_case_studies]：

1. **硅谷（美国）**：斯坦福—企业—资本的"学术溢出"模型，启示原点社区应把高校边界转化为创业界面；
2. **剑桥科技园（英国）**：以大学为锚、低密度花园式园区，启示科研用地应保持高生态品质与步行尺度；
3. **特拉维夫（以色列）**：军队研发溢出与"创业国家"生态，启示众智园应设置安全评测与军民两用展示空间；
4. **新加坡纬壹科技城（one-north）**：政府主导"产业—城市—生活"一体化规划，启示三区两翼需要法定级统筹；
5. **巴塞罗那 22@**：工业区更新为创意经济区，启示大钟寺应把存量物业更新为智能经济楼宇；
6. **杭州未来科技城**：以场景开放和人才政策驱动的产业集聚，启示小月河翼需要"场景开放清单"机制；
7. **深圳湾科技生态园**：链主企业带动产业集群，启示众智园应预留头部企业旗舰空间；
8. **东京湾岸**：产城融合与滨海创新走廊，启示京张遗址公园带应成为"城市客厅型"创新走廊。

这些案例的共性机制——**高校策源、场景开放、资本服务、国际交往、花园环境**——被转化为本方案的用地结构、公共空间系统、场景节点与运营机制 [depth:ai_ecosystem_case_studies]。

## 总体设计范围城市更新与控规深度城市设计

### 4.1 总体空间结构

总体设计范围形成"**一脊三芯·四带两翼·多点成网**"的空间结构 [depth:overall_spatial_structure]：

- **一脊**：沿京张铁路遗址走向的**"人形AI公共脊"**——一条贯穿南北的智能慢行与公共空间主轴，串联遗址文化、AI 展示、运动休闲与生活服务 [data:geometry/green_space.geojson#GREEN-001]；
- **三芯**：众智园（北）、北京AI原点社区（中）、大钟寺（南）三处功能核心 [data:geometry/key_areas.geojson#PROV-KEY-001]；
- **四带**：清河生态带（北）、知春路创新服务带（中北）、小月河场景赋能带（中）、学院路科技服务带（中南）四条功能带；
- **两翼**：中关村科技服务翼（西）、小月河场景赋能翼（东）；
- **多点成网**：围绕轨道站点与公共节点布置 AI 场景节点，形成可运营的场景网络 [data:geometry/roads.geojson#ROAD-001]。

### 4.2 用地布局与功能比例

用地分区分五类主导功能 [data:geometry/land_use.geojson#LU-001]：

| 用地代码 | 功能 | 面积（千平方米） | 占比 | 设计意图 |
| --- | --- | --- | --- | --- |
| 0802 | AI 研发科研用地 | 2545.6 | 22.3% | 众智园、原点社区、中部研发带核心载体 [metric:rnd_land_ratio] |
| 05 | 商业服务业用地 | 1810.0 | 15.9% | 大钟寺智能经济、知春路服务带 [metric:commercial_land_ratio] |
| 0701/0702 | 居住与社区服务 | 3176.8 | 27.8% | 人才居住、社区 AI 服务网络 [metric:residential_land_ratio] |
| 0804 | 教育科研用地 | 674.0 | 5.9% | 依托高校，近校转化界面 [metric:education_land_ratio] |
| 1401/1403 | 绿地与广场 | 3206.5 | 28.1% | 人形公共脊、蓝绿网络 [metric:green_ratio] [metric:public_space_ratio] |

用地分区完整覆盖提交边界、无重叠、共享边界坐标一致，满足拓扑自检要求 [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]。

### 4.3 建筑规模、拆改留与开发强度策略

本方案不给出法定容积率、建筑高度或拆改留结论，仅提供由本包几何复算的**概念体量**与**低置信度设计量**，并明确标注待正式控规条件补齐 [metric:floor_area_ratio] [metric:building_height_m]。概念建筑基底总面积约 242.1 万平方米，建筑密度约 21.2% [metric:building_footprint_area_sqm] [metric:building_density]，表达的分区逻辑为 [data:geometry/buildings.geojson#BLDG-001]：

- **保留**：京张铁路遗址、清华园车站及历史建筑、高校既有校园、现状成熟居住区；
- **改造**：存量产业楼宇、临街商业界面，更新为 AI 办公、展示与生活服务；
- **更新**：低效仓储与空置物业，按"智能原生新业态"重建；
- **新建**：仅在众智园与原点社区预留的潜力用地布置概念体量，作为"可供专业团队深化研究"的参考方案 [depth:retain_renovate_demolish] [depth:development_intensity_controls]。

### 4.4 城市更新总体框架与更新项目清单

更新框架分三类 [depth:renewal_project_list]：

| 类型 | 项目示例 | 空间位置 | 依赖条件 |
| --- | --- | --- | --- |
| 公共空间更新 | 京张遗址公园慢行断点缝合、人形公共脊南北贯通 | 一脊沿线 | 道路红线、桥下空间、文保复核 [data:geometry/green_space.geojson#GREEN-001] |
| 产业空间更新 | 众智园全栈创新楼宇、原点社区近校转化街、大钟寺智能经济楼宇 | 三芯 | 权属、控规、首层业态 [data:geometry/buildings.geojson#BLDG-001] |
| 生活服务更新 | 社区 AI 服务点、人才公寓、轨道站点一体化 | 多点 | 市政、消防、站点协议 [data:geometry/roads.geojson#ROAD-001] |

完整项目清单见第 10 章与 `compliance_matrix.json`。

## 重点区域详细设计

### 5.1 众智园AI自主创新加速区（约192.1 公顷，临时范围）

**定位**：花园型"AI 全栈自主创新"街区，承担框架、模型、数据、算力、安全评测与标准治理全链条 [source:AGENT-TASKBOOK] [data:geometry/key_areas.geojson#PROV-KEY-001]。

- **空间结构**：以清河生态带为北界面，形成"滨水生态走廊 + 全栈创新街区 + 安全治理展示廊"三带；
- **建筑更新**：存量产业楼宇改造为自主大模型研发楼、算力中心与开源协作空间；预留头部企业旗舰空间 [data:geometry/buildings.geojson#BLDG-001]；
- **公共空间**：清河低碳创新廊串联开放测试场、标准工作坊与低碳算力体验馆 [data:geometry/public_space.geojson#PUBLIC-001]；
- **交通慢行**：依托北五环过境联系与轨道接驳，内部以慢行岛组织 [data:geometry/roads.geojson#ROAD-001]；
- **AI 场景**：自主大模型评测场、安全治理展示馆、低碳算力体验（详见场景卡 S01、S02、S06）；
- **实施风险**：临时边界、控规缺失、算力与能源承载待复核 [depth:three_key_area_detailed_design]。

### 5.2 北京AI原点社区（约104.3 公顷，临时范围）

**定位**：近校型"AI 原点与人才社区"，依托周边高校与科研院所形成策源—转化—人才闭环 [source:AGENT-TASKBOOK] [data:geometry/key_areas.geojson#PROV-KEY-002]。

- **空间结构**：以五道口为东门户，形成"校园界面 + 原点广场 + 成果转化街 + 人才社区"结构；
- **建筑更新**：近校临街物业改造为首层成果发布与孵化空间，街坊内部保留居住功能 [data:geometry/buildings.geojson#BLDG-001]；
- **公共空间**：原点广场（PUBLIC 层）承载开源发布、成果展示与开发者活动 [data:geometry/public_space.geojson#PUBLIC-001]；
- **交通慢行**：校区-园区慢行缝合，轨道站点一体化接驳 [data:geometry/roads.geojson#ROAD-001]；
- **AI 场景**：开源发布厅、近校成果转化街、人才特区服务驿站（场景卡 S01、S07、S09）；
- **实施风险**：校区边界、权属、首层业态与人才住房供给待确认 [depth:three_key_area_detailed_design]。

### 5.3 大钟寺AI产业集聚区（约72 公顷，临时范围）

**定位**：城市型"AI 产业集聚与智能经济"街区，面向智能体、智能终端、内容消费与数据要素 [source:AGENT-TASKBOOK] [data:geometry/key_areas.geojson#PROV-KEY-003]。

- **空间结构**：以大钟寺站为核心，形成"轨道一体化枢纽 + 智能经济楼宇 + 国际路演客厅 + 四象限步行环"；
- **建筑更新**：存量商业与商务楼宇更新为智能终端体验店、内容消费空间与数据要素服务楼 [data:geometry/buildings.geojson#BLDG-001]；
- **公共空间**：站前广场与大钟寺路演客厅形成公共活动核心 [data:geometry/public_space.geojson#PUBLIC-001]；
- **交通慢行**：四象限步行连通，消除路口断点 [data:geometry/roads.geojson#ROAD-001]；
- **AI 场景**：智能体都市客厅、数据要素会客厅、国际路演客厅（场景卡 S05、S08、S12）；
- **实施风险**：站点工程、规划绿地复合利用、商业更新时序待确认 [depth:three_key_area_detailed_design]。

![三处重点区域详细设计索引](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

### 6.1 人才画像（5 类）

| 画像 | 典型需求 | 空间响应 | 隐私与人工复核边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、评测、社区声誉 | 原点广场开源发布厅、公共代码墙、24h 协作空间 | 不采集个人行为轨迹，活动数据仅聚合统计 [source:AGENT-TASKBOOK] |
| 初创团队 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力驿站、知识产权服务 | 算力与数据服务需另行授权 |
| 头部企业访客 | 展示、商务、国际接待、人才招聘 | 大钟寺国际路演客厅、轨道接驳、接待动线 | 企业标识与案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 人形公共脊、社区 AI 服务点、夜间活动分级 | 居民画像不用于商业推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 校区-园区缝合、成果转化驿站、AI 教育体验点 | 校园数据与科研成果需授权 |

### 6.2 AI 场景卡（12 张，含 3 张产业测试验证场景）

| 编号 | 场景卡 | 空间载体 | 服务对象 | 数据/隐私边界 | 人工复核 | 运营主体 |
| --- | --- | --- | --- | --- | --- | --- |
| S01 | 开源发布厅 | 原点社区原点广场 | 开发者、高校 | 聚合统计 | 发布会人工主持 | 社区运营方 |
| S02 | 自主大模型评测场（**产业测试验证**） | 众智园 | 模型方、评测机构 | 授权语料 | 专家评审 | 评测平台 |
| S03 | 端侧算力驿站 | 一脊沿线节点 | 初创、居民 | 授权使用 | 服务台值班 | 专业运营方 |
| S04 | AI 慢行导航 | 京张遗址公园 | 居民、游客 | 低侵入传感、可解释 | 导视人工巡检 | 公园运营方 |
| S05 | 大钟寺国际路演客厅 | 大钟寺 | 企业、投资人 | 活动授权 | 人工路演评审 | 会展运营方 |
| S06 | 清河低碳创新廊 | 众智园清河界面 | 企业、公众 | 环境数据 | 生态巡检 | 园区运营方 |
| S07 | 近校成果转化街 | 原点社区 | 师生、初创 | 成果授权 | 转化专员 | 高校合作机构 |
| S08 | 数据要素会客厅 | 大钟寺 | 数据供方、需方 | 合规授权、可审计 | 合规审查 | 数据交易机构 |
| S09 | AI 生活服务样板街 | 社区与商业交汇处 | 居民 | 数据最小化 | 人工客服兜底 | 社区运营方 |
| S10 | 智能体交通场景模拟（**产业测试验证**） | 一脊东翼小月河带 | 智能体企业、交管 | 脱敏数据 | 交管评审 | 政府+企业联合 |
| S11 | AI 安全治理展示馆 | 众智园 | 公众、行业 | 公开案例 | 专家讲解 | 治理机构 |
| S12 | 全球 AI 活动周路线（**产业测试验证**） | 一带全境 | 全球开发者 | 公开活动 | 活动组委会 | 国际运营团队 |

每张场景卡都映射到空间图层 [data:geometry/public_space.geojson#PUBLIC-001]、指标与合规矩阵，保证"场景可感知、可展示、可推广" [depth:scenario_cards] [depth:ai_scenario_space_operation_map]。

### 6.3 AI 公共空间、智能原生新业态与朝圣地标（3 个）

- **朝圣地标 1：人形 AI 公共脊**——以京张铁路"人"字形为母题的城市公共空间主轴，融合遗址展示、AI 艺术与慢行体验，是"百年自主创新"的当代朝圣之路 [data:geometry/green_space.geojson#GREEN-001]；
- **朝圣地标 2：原点广场·开源纪念碑**——在北京AI原点社区设立"开源贡献荣誉墙与纪念碑"，以公钥、代码片段与贡献者名录为装饰语言，形成开发者"朝圣—打卡—贡献"的荣誉展示体系 [data:geometry/public_space.geojson#PUBLIC-001]；
- **朝圣地标 3：众智塔·全栈创新灯塔**——在众智园设全栈创新展示灯塔，以可交互的全链图谱装置展示"芯片—框架—模型—数据—应用—治理"，成为 AI 治理全球话语权的地标 [source:AGENT-TASKBOOK]。

三个地标均作为概念建议，不宣称已批准建设；导视、Logo、字体、图像与人物/企业标识全部清权 [depth:landmark_catalog] [depth:honor_display_system]。

## 用地、建筑规模与拆改留方案

本方案按"保留—改造—更新—新建"四类逻辑组织建筑与用地策略，全部标注为方向性设计建议，待权属、控规与现状建筑数据补齐后由专业团队深化，不构成法定或工程结论 [depth:retain_renovate_demolish] [depth:height_massing_character]。

**保留（Retain）**：京张铁路遗址线（概念示意，见约束图层）、清华园车站等历史建筑、高校既有校园与成熟居住区整体保留，作为文化锚点与稳定社区基底 [data:geometry/constraints.geojson#CONSTR-001]。

**改造（Renovate）**：存量产业楼宇与临街商业界面是本次更新的主体——众智园范围内将现有研发楼宇改造为自主大模型楼与算力中心，原点社区将临街物业改造为首层成果发布与孵化空间，大钟寺将存量商业商务楼宇更新为智能终端体验与数据要素服务楼 [data:geometry/buildings.geojson#BLDG-001]。

**更新（Update）**：低效仓储与空置物业按"智能原生新业态"重建，集中在三芯周边潜力地块，与轨道站点一体化开发结合 [data:geometry/roads.geojson#ROAD-001]。

**新建（New-build）**：仅在众智园与原点社区预留的潜力用地布置概念体量，作为"可供专业团队深化研究的参考方案"，不表达为批准建设 [data:geometry/land_use.geojson#LU-001]。

概念建筑基底总面积约 242.1 万平方米、建筑密度约 21.2%，由本包几何经 EPSG:4548 复算 [metric:building_footprint_area_sqm] [metric:building_density]，用于表达分区与强度逻辑，不代表法定控制值。用地结构方面，AI 研发科研用地占 22.3%、商业服务业 15.9%、居住与社区服务 27.8%、教育科研 5.9%、绿地与广场 28.1%，支撑"三芯"产业空间与人才生活供给 [metric:rnd_land_ratio] [metric:residential_land_ratio]。

**数据缺口**：官方控规的容积率、建筑高度、建筑密度、退线与道路红线均未在公开资料包内提供，统一记为 `status=unknown`，待官方控规条件补齐后按 EPSG:4548 重算并逐项复核 [metric:floor_area_ratio] [metric:building_height_m] [metric:green_ratio_official]。

## 交通、轨道、市政与公共服务设施

- **轨道**：强化五道口、大钟寺、西土城等站点的一体化开发，以 TOD 节点组织功能混合 [data:geometry/roads.geojson#ROAD-001]；
- **慢行**：以人形公共脊为南北主轴，小月河带为东西联络，消除京张遗址公园跨路断点 [data:geometry/roads.geojson#ROAD-001]；
- **道路微循环**：构建"一脊九联"路网（1 条智能慢行脊 + 9 条东西联通道），分离过境与内部交通 [metric:road_centerline_length_m]；
- **停车与非机动车**：站点周边 P+R、共享单车驿站、非机动车停车楼 [source:AGENT-TASKBOOK]；
- **市政与新基建**：分布式能源、端侧算力、智慧杆、综合管廊与公共数据空间结合，作为新型基础设施原型 [depth:municipal_new_infrastructure]；
- **公共服务**：创新服务平台、人才生活服务、社区 AI 服务点按 15 分钟生活圈布置 [depth:traffic_rail_slow_parking]。

![交通慢行与蓝绿公共空间复合系统](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

### 9.1 蓝绿公共空间系统

以京张遗址公园为"一脊"，清河生态带（北）、小月河场景赋能带（中）为"两带"，串联三芯广场与多个社区公园 [data:geometry/green_space.geojson#GREEN-001]。绿地占比约 23.0%、公共空间占比约 5.1% [metric:green_ratio] [metric:public_space_ratio]，共同支撑人才生活的生态品质与创新交往的户外场景 [depth:blue_green_public_space]。

### 9.2 文化叙事：百年京张 × 中关村 × AI 新文化

本方案构建"**铁轨—代码—人本**"三层文化叙事 [source:AGENT-TASKBOOK] [depth:culture_narrative]：

- **铁轨层（百年京张）**：清华园车站、京张铁路遗址线（概念示意）作为历史锚点 [data:geometry/constraints.geojson#CONSTR-001]；
- **代码层（中关村文化）**：中关村"敢于创新、宽容失败"的创业精神，以开源、共创、评测场景延续；
- **人本层（AI 新文化）**：以"人"字形为母题，把 AI 美好生活、人机协作、普惠智能作为新文化主张。

导视与符号系统：以"人形"图标为统一导视母题，区分历史（锈红）、创新（蓝）、生活（绿）三级色彩；国际传播语 "From the first railway to the first AI city"（从第一条铁路到第一座 AI 城市）[depth:signage_system_direction] [depth:spatial_storyline]。

## 更新项目清单、实施政策与分期计划

### 10.1 更新项目清单（示例）

| 编号 | 项目 | 类型 | 位置 | 依赖 | 分期 |
| --- | --- | --- | --- | --- | --- |
| JZ-01 | 人形公共脊慢行断点缝合 | 公共空间 | 一脊 | 道路红线、桥下空间 | 一期 [data:geometry/phasing.geojson#PHASE-001] |
| JZ-02 | 众智园全栈创新楼宇 | 产业更新 | 众智园 | 权属、控规 | 二期 |
| JZ-03 | 原点广场与开源纪念碑 | 公共空间 | 原点社区 | 场地、文保 | 一期 |
| JZ-04 | 大钟寺四象限步行环 | 轨道一体化 | 大钟寺 | 站点工程 | 一期 |
| JZ-05 | 小月河场景赋能试验带 | 场景设施 | 东翼 | 蓝线、市政 | 二期 |
| JZ-06 | 全球AI活动周公共路线 | 运营 | 一带 | 活动许可 | 三期 |

### 10.2 实施政策与分期

- **一期（大钟寺先行）**：依托成熟商业与轨道枢纽，以轻量活动、临时展示与公共空间改造快速见效；
- **二期（中部走廊）**：原点社区与中部创新带更新，落地开源、转化与人才服务设施；
- **三期（众智园全链）**：众智园全栈创新体系建成，形成完整的"三芯两翼"闭环 [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation]。

所有分期为概念建议，待权属、资金、实施主体与审批路径确认后由专业团队深化。

### 10.3 全球 AI 创新活动体系与长期运营（agent.6）

- **年度活动体系**："新京张 AI 创新周"（春季国际路演）、"开源共创节"（夏季）、"AI 治理论坛"（秋季）、"人形节·成果发布季"（冬季），形成四季活动矩阵 [source:AGENT-TASKBOOK] [depth:annual_event_system]；
- **活动品牌与传播**：以"人形"Logo 为核心 IP，统一视觉与传播语言，建立国际传播矩阵 [depth:brand_ip_system]；
- **开发者社区运营**：开源贡献者积分、荣誉墙、人才特区通道，实现"贡献—荣誉—机会"转化 [depth:developer_community_operation]；
- **场景开放运营**：场景开放清单、测试验证预约平台、数据沙盒，明确隐私与人工复核边界 [depth:scenario_open_operation]；
- **公共体验与地标运营**：人形公共脊、原点纪念碑、众智塔的常态运营与节事活化 [depth:public_experience_operation]；
- **国际传播与招引转化**：路演、评测、数据交易活动与人才公寓、企业服务、政策窗口联动，形成人才与企业转化路径 [depth:conversion_pathway]。

## 指标体系、面积复算与合规矩阵

本包核心指标由 EPSG:4548 投影从几何复算 [depth:metrics_recalculation]：

| 指标 | 数值 | 单位 | 公式/来源 | 状态 |
| --- | --- | --- | --- | --- |
| 总体设计范围面积 | 11412825 | sqm | polygon_area(site_boundary) [metric:site_area_sqm] | known（临时边界） |
| AI 研发科研用地占比 | 22.3% | ratio | 0802 面积/场地 [metric:rnd_land_ratio] | known |
| 商业服务业用地占比 | 15.9% | ratio | 05 面积/场地 [metric:commercial_land_ratio] | known |
| 居住与社区服务占比 | 27.8% | ratio | 0701+0702 面积/场地 [metric:residential_land_ratio] | known |
| 绿地率 | 23.0% | ratio | 绿地面积/场地 [metric:green_ratio] | known（概念） |
| 公共空间占比 | 5.1% | ratio | 广场面积/场地 [metric:public_space_ratio] | known（概念） |
| 建筑基底面积 | 2420696 | sqm | sum(building footprints) [metric:building_footprint_area_sqm] | known（概念体量） |
| 建筑密度 | 21.2% | ratio | 基底/场地 [metric:building_density] | known（概念） |
| 慢行脊与联通道 | 19063 | m | sum(road centerlines) [metric:road_centerline_length_m] | known |
| 重点区域数量 | 3 | count | count(key_areas) [metric:key_area_count] | known |
| 众智园面积 | 1929202 | sqm | polygon_area(PROV-KEY-001) [metric:zhongzhiyuan_area_sqm] | known（临时） |
| 原点社区面积 | 1043237 | sqm | polygon_area(PROV-KEY-002) [metric:beijing_ai_origin_community_area_sqm] | known（临时） |
| 大钟寺面积 | 720454 | sqm | polygon_area(PROV-KEY-003) [metric:dazhongsi_area_sqm] | known（临时） |
| 容积率 | 待正式数据 | ratio | 官方控规 [metric:floor_area_ratio] | unknown |
| 建筑高度 | 待正式数据 | m | 官方控规 [metric:building_height_m] | unknown |
| 法定绿地率 | 待正式数据 | ratio | 官方控规 [metric:green_ratio_official] | unknown |

`compliance_matrix.json` 逐条覆盖公告 1.3、1.4、1.5 与 agent.1—agent.6 全部必选任务；`standard_matrix.json` 覆盖全部强制专业标准；`design_depth_matrix.json` 覆盖全部必选设计深度项 [depth:compliance_matrix] [depth:standard_matrix] [depth:design_depth_matrix]。

![核心指标复算与证据链](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

- **资料合法性**：本方案仅使用公开来源与仓库登记材料，不包含非公开政府数据、企业内部数据或个人隐私数据 [source:SOURCE-REGISTRY]；
- **版权授权**：Logo、字体、图示均为自绘概念；引用的公告、标准、案例信息均注明来源；未使用未授权商标、人物肖像或版权图像 [source:AGENT-TASKBOOK]；
- **AI 生成责任**：本方案由 AI 智能体生成，生成方法与来源在 `report/copyright_statement.md` 与 `sources.json` 中披露；
- **官方批准/实施承诺禁用**：本方案全部空间结论为"概念建议/参考方案/可供专业团队深化研究"，不构成法定规划、政府审定、投资承诺或工程可行性结论 [depth:risk_missing_data]；
- **待补资料**：官方边界、控规条件、现状建筑、权属、市政与文保数据到位后，需对面积型指标、用地分区与拆改留分类重算 [metric:site_area_sqm]；
- **专业复核**：交通、轨道、市政、结构、文保等专业结论需由持证专业机构复核后再进入实施阶段 [depth:risk_missing_data]。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施 [source:AGENT-TASKBOOK]。

## 参考资料

以下为主要书目信息，完整机器索引见 `sources.json` 与三个矩阵文件 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES]。

- 百年京张AI创新带城市设计国际方案征集资格预审公告（北京市规划和自然资源委员会海淀分局，2026-05-09）
- 面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录（用户提供清权材料）
- 城市设计管理办法（住房和城乡建设部，2017）
- 城市设计技术导则（住房和城乡建设部，2021）
- 国土空间调查、规划、用途管制用地用海分类指南（自然资源部，2023）
- 北京城市总体规划（2016年—2035年）（北京市人民政府，2017）
- 京张铁路遗址公园相关公开报道与规划宣传材料
- 中关村科学城、海淀区创新片区公开资料
- 全球 AI 创新生态案例公开研究（硅谷、剑桥、特拉维夫、one-north、22@等）
- 完整机器索引：`sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`