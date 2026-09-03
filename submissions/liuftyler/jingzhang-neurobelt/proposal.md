---
title: "京张智脉 · Jingzhang NeuroBelt——从百年铁轨到AI智脉的创新带城市设计"
author_github: "liuftyler"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路遗址走廊为'神经主脉'，将百年工业遗产转化为AI创新神经网络。三区两翼形成'智源核—原点社区—智汇港'三大神经节点，叠加文化带、生活带和创新带三条主题脉动，构建世界级AI创新朝圣地。"
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "ai-origin-community"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "enterprise-service-copilot"]
iteration: "v0.1"
---

# 京张智脉 · Jingzhang NeuroBelt

## 设计依据与资料清单

本方案"京张智脉"（Jingzhang NeuroBelt）回应"百年京张AI创新带城市设计开源征集"任务，以京张铁路遗址公园为文化主脉，在海淀区43.6平方公里的统筹研究范围内，构建一条从北五环至北京北站的AI创新神经网络。

方案引用的核心资料包括：北京市规划和自然资源委员会海淀分局发布的资格预审公告 [source:SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT]，面向全球智能体的任务书摘录 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]，以及仓库提供的 provisional 边界数据 [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]。所有空间边界均为临时粗略边界，依据公告文字四至和面积约束推断，不是官方红线——这一限制贯穿全方案 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。

用地分类采用国土空间用地用海分类指南 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，城市设计深度参照城市设计管理办法 [standard:MOHURD-URBAN-DESIGN-MEASURES]，控规层面的开发控制参照控制性详细规划编制审批办法 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。完整来源索引、指标、标准响应和设计深度记录分别存放在 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json` 和 `design_depth_matrix.json` 中，正文不逐一复制 [depth:design_basis_and_source_inventory]。

本方案的图件、几何和可视化均从同一套 GeoJSON、指标和矩阵派生。五张必需图件为：场地总览图、用地结构图、重点区域图、交通蓝绿复合图和指标证据图 [data:geometry/site_boundary.geojson#SITE-001]。

![场地总览与资料证据链图](assets/figures/site-overview.jpg)

## 三层范围工作框架

任务书设定三层递进的工作范围 [source:SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT]：

**统筹研究范围（43.6平方公里）**——北至北五环路，东至京藏高速，南至西直门外大街，西至万泉河路。这是产业战略研究和区域协同研究的范围，本方案在此层面提出"三区两翼"的空间结构和全球AI创新生态对标分析 [depth:coordinated_research_industry_strategy]。

**总体设计范围（11.4平方公里）**——以京张遗址公园周边1-2公里城市地区和产业区为规划设计范围。这是控规深度城市设计的范围，本方案在此层面进行用地分区、交通组织、公共空间系统和城市风貌控制 [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]。

**重点区域范围（368.4公顷）**——自北向南包括众智园AI自主创新加速区（192.1公顷）、北京AI原点社区（104.3公顷）和大钟寺AI产业集聚区（72.0公顷）。这是规划综合实施方案深度的详细设计范围 [data:geometry/key_areas.geojson] [depth:key_area_detail_zhongzhiyuan]。

三层范围的空间边界均使用 provisional 几何 [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]。provisional 边界的粗略来源是公告文字四至和面积约束，适用于临时AI生成、展示和自检，但不得作为官方红线、审批依据或精确面积复算依据。官方 polygon 发布后，需要重新复算所有图层面积和指标 [assumption:ASM-001]。当前复算的场地面积为 11,412,825 平方米 [metric:site_area_sqm]，与公告约 11.4 平方公里的约束一致。

![三层范围与空间工作框架图](assets/figures/land-use-structure.jpg)

## 统筹研究范围产业与未来城市研究

### 总体概念：从铁轨到智脉

一百多年前，詹天佑主持修建了京张铁路——中国人自主设计和建造的第一条干线铁路 [source:WEB-JINGZHANG-RAILWAY-HISTORY]。这条铁路是民族自强的"轨道"。一百年后，本方案提出将这条走廊转化为中国第一条AI"智脉"——一条连接文化记忆、生活体验和创新的神经网络。

**核心隐喻**：铁路走廊是"神经主脉"（neural pathway），三处重点区域是三个"神经节点"（neural nodes），两翼是"延伸树突"（dendrites），公共空间是"突触间隙"（synaptic clefts），AI场景是流经网络的"神经信号"（neural signals）。这个隐喻不是装饰——它决定了空间结构、功能布局和公共空间的组织逻辑。

### 命名体系与Logo方向（agent.1）

**主名称**：京张智脉（Jingzhang NeuroBelt）
- "京张"承载百年铁路文脉，"智脉"将"铁轨"转译为"智轨"，谐音"经脉"暗示有机生命体般的创新网络
- 英文 NeuroBelt 兼具"神经"（neuro）和"带"（belt）双重含义

**副标题**：从百年铁轨到千年智脉

**三区命名**：
- 众智园AI自主创新加速区 → **"智源核"（NeuroCore）**——AI全栈自主创新的"处理中枢"
- 北京AI原点社区 → **"原点社区"（OriginNode）**——AI生活的"记忆与体验中枢"
- 大钟寺AI产业集聚区 → **"智汇港"（NeuroPort）**——AI产业的"信号汇聚与输出端口"

**两翼命名**：
- 中关村科技服务翼 → **"中关翼"（Zhongguan Wing）**——要素全球化配置的"输入通道"
- 小月河场景赋能翼 → **"月河翼"（Yuehe Wing）**——场景应用的"输出通道"

**Logo方向**：极简标记，由两条平行线（铁轨几何）在中心汇聚为神经节点图案。色彩体系：智脉青（#00B4D8，代表AI智能）、京张铁（#6C757D，代表铁路遗产）、百年琥珀（#FFB703，代表文化温度）。Logo不使用任何未经授权的字体、图片或商标 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。

### 三大定位与五大功能

三大定位 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]：
1. **百年京张文化带**——以铁路遗产为"记忆主脉"，串联詹天佑精神、工业遗产和城市更新
2. **都市AI生活体验带**——以日常AI场景为"体验脉动"，让创新可感知、可参与
3. **AI融合创新带**——以产业协同为"计算脉动"，构建全栈自主创新体系

五大功能分别对应空间落位：
- AI全栈自主创新体系 → 智源核（众智园） [data:geometry/key_areas.geojson#KEY-001]
- 世界级AI创新生态 → 三区联动 [data:geometry/land_use.geojson]
- AI+场景赋能新范式 → 月河翼 [data:geometry/public_space.geojson]
- 智能化AI活力城市 → 原点社区 [data:geometry/key_areas.geojson#KEY-002]
- AI治理全球话语权 → 分布式治理层（覆盖全带）

### 全球AI创新生态案例（agent.2）

本方案研究了以下全球AI创新生态案例 [source:WEB-GLOBAL-AI-CASES]：

1. **硅谷（Stanford Research Park模式）**——大学-资本-产业三角循环，启示：清华/北航/北邮的学术资源需要与资本和产业形成闭环
2. **东京（柏叶智慧城）**——公私学三方协作的智慧城市实验，启示：AI场景需要"测试-验证-推广"三步走
3. **新加坡（One-North）**——生物医药和数字媒体混合创新区，启示：跨学科混合比单一产业集聚更有活力
4. **伦敦（King's Cross Central）**——铁路枢纽再开发为创新街区，启示：铁路遗址是创新空间的天然载体
5. **巴黎（Station F）**——全球最大创业园区由火车站改造，启示：交通基础设施的适应性再利用价值巨大
6. **首尔（DDP数字设计广场）**——AI设计与制造融合的地标，启示：地标建筑本身应是AI场景的载体
7. **深圳（南山科技园）**——高密度创新集群与城市生活融合，启示：创新密度和生活品质可以共存
8. **蒙特利尔（MILA AI研究院）**——学术深耕催生AI产业集群，启示：基础研究投入是长期竞争力的根基

这些案例的经验转化为三个空间策略：（1）学术-资本-产业闭环需要物理邻近性——智源核紧邻清华/北航；（2）铁路遗址的适应性再利用——京张走廊本身就是天然的"Station F"；（3）混合功能比单一产业更有活力——三区均采用混合用地 [depth:coordinated_research_industry_strategy]。

### 三区两翼协同回路

"三区两翼"不是静态分区，而是一个动态的创新回路 [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS]：

**创新信号流向**：中关翼（要素输入）→ 智源核（研发加速）→ 原点社区（生活体验）→ 智汇港（产业输出）→ 月河翼（场景反馈）→ 回到智源核（迭代创新）

这个回路的空间载体是京张走廊本身——既是文化主脉，也是创新信号的传输通道。走廊上的公共空间节点（开发者散步道、开源成果展示廊、智能体贡献荣誉墙）是信号中继站 [data:geometry/public_space.geojson]。

中关村创新文化从"电子一条街"到"AI原点"的转化，与本方案的"从铁轨到智脉"形成历史呼应 [source:WEB-ZHONGGUANCUN-HISTORY]。两种转化都体现了"基础设施更新驱动创新升级"的逻辑。

## 总体设计范围城市更新与控规深度城市设计

### 空间结构

总体设计范围（11.4平方公里）的空间结构为"一脉三核两翼多节点"：

- **一脉**：京张铁路遗址公园走廊，南北贯穿，宽度约50-100米，是文化主脉和公共空间主轴
- **三核**：智源核（北）、原点社区（中）、智汇港（南），沿走廊串联
- **两翼**：中关翼向西延伸至中关村大街，月河翼向东延伸至小月河
- **多节点**：沿走廊设置15个AI场景节点，包括开发者散步道、开源展示廊、智能体荣誉墙等 [data:geometry/public_space.geojson] [metric:ai_scenario_node_count]

### 用地布局

用地分区将总体设计范围划分为约12个用地单元 [data:geometry/land_use.geojson]，采用国土空间用地用海分类指南代码 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]：

- **研发用地（0801）**：约20%，集中在智源核和月河翼，承载AI实验室、孵化器和加速器
- **居住用地（0701）**：约18%，集中在原点社区和走廊两侧，为AI人才提供高品质居住
- **商业用地（0901）**：约12%，集中在智汇港和轨道站点周边，提供智能原生消费和商务服务
- **公园绿地（1401）**：约25%，包括京张遗址公园走廊、小月河蓝绿走廊和口袋公园 [data:geometry/green_space.geojson]
- **防护绿地（1402）**：约5%，沿道路和铁路设置隔离缓冲
- **工业用地（1001）**：约5%，集中在智汇港，承载AI产业制造和测试
- **城市道路用地（1202）**：约10%，包括主次干路和慢行系统 [data:geometry/roads.geojson]
- **特殊用地（15）**：约2%，铁路遗产保护和文化展示
- **行政办公用地（0601）**：约3%，散布于各功能区

绿地率（green_ratio）为29.79% [metric:green_ratio]，包含京张遗址公园走廊、小月河蓝绿走廊和三区口袋公园。公共空间比例（public_space_ratio）为14.89% [metric:public_space_ratio]，包含广场、AI地标节点和社区交往空间。这些指标为基于 provisional 边界的低置信度设计模型值 [assumption:ASM-005]。

### 城市更新策略

更新策略采用"留改拆建"分类原则，但具体地块的拆改留分类需要待控规和现状建筑普查确认 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。概念性策略包括：

- **留**：铁路遗产建筑、高校校区、现状优质社区——保留并注入AI功能
- **改**：老旧厂房、低效商业、传统办公——改造为AI孵化器、共享实验室和智能原生商业
- **拆**：违法建设、严重老化的低效用地——拆除后释放为公共空间和AI场景节点
- **建**：空地和更新地块——新建AI研发楼宇、人才公寓和公共设施

容积率、建筑高度和建筑密度等法定控制指标在官方控规发布前为 unknown [assumption:ASM-003]。本方案的概念建筑体量（总建筑基底面积约114万平方米 [metric:building_footprint_area_sqm]）为低置信度设计量，不等于法定控制值。

## 重点区域详细设计

### 智源核（众智园AI自主创新加速区）

**定位**：AI全栈自主创新的"处理中枢"——基础研究、技术攻关和原创突破的策源地 [data:geometry/key_areas.geojson#KEY-001]。

**空间结构**：以"三环一轴"组织192.1公顷用地。中央轴为京张走廊智源核段，设置AI开源成果展示廊；内环为AI实验室环，聚集基础研究机构；外环为孵化加速环，连接资本和产业。三环之间以慢行绿道串联。

**建筑更新**：概念性建议保留清华园站历史建筑作为AI历史展示馆；新建AI研究院群（概念体量，待控规确认）；改造周边老旧厂房为共享实验室 [data:geometry/buildings.geojson]。

**AI场景**：
- "开源实验室"——开放API和数据的AI实验平台，开发者可现场提交和测试模型
- "算力广场"——可视化AI算力基础设施，公众可了解AI计算过程
- "创新马拉松道"——沿走廊设置24小时黑客松空间 [data:geometry/public_space.geojson]

**实施风险**：用地权属涉及高校和科研院所，实施需多方协调；概念建筑体量待控规确认 [assumption:ASM-004]。

### 原点社区（北京AI原点社区）

**定位**：AI生活的"记忆与体验中枢"——全球AI创新人才向往的高品质生活社区 [data:geometry/key_areas.geojson#KEY-002]。

**空间结构**：以"一心两街三坊"组织104.3公顷用地。"一心"为AI原点广场，是社区交往和精神地标；"两街"为AI生活体验街（东）和创新文化街（西）；"三坊"为研究者坊、创业者坊和家庭坊，服务不同人才群体。

**建筑更新**：概念性建议改造五道口商业区为AI原生消费体验区；新建人才公寓群（概念体量）；保留现状社区并增补AI公共服务设施 [data:geometry/buildings.geojson]。

**AI场景**：
- "AI健康驿站"——社区级AI辅助健康监测站，人工复核保障隐私
- "智能教育客厅"——AI辅助个性化学习空间，面向全年龄段
- "社区智能体"——居民可参与的社区治理AI，处理公共事务建议 [data:geometry/public_space.geojson]

**实施风险**：五道口地区商业密度高，更新涉及多方利益；社区AI场景需严格隐私边界和人工复核 [assumption:ASM-006]。

### 智汇港（大钟寺AI产业集聚区）

**定位**：AI产业的"信号汇聚与输出端口"——AI企业总部、产业服务和商业应用集聚区 [data:geometry/key_areas.geojson#KEY-003]。

**空间结构**：以"一港两区"组织72.0公顷用地。"一港"为大钟寺AI产业港，是企业总部和产业服务核心；"两区"为智能商务区（北）和AI消费体验区（南），依托大钟寺站TOD开发。

**建筑更新**：概念性建议改造大钟寺市场旧址为AI产业孵化综合体；新建企业总部楼宇（概念体量）；利用大钟寺站TOD优势发展智能原生商业 [data:geometry/buildings.geojson]。

**AI场景**：
- "AI企业服务大厅"——一站式AI企业注册、政策对接和资源匹配
- "智能原生商业街"——AI驱动的零售、餐饮和服务体验
- "产业测试验证场"——AI产品和服务的真实场景测试空间 [data:geometry/public_space.geojson]

**实施风险**：大钟寺站TOD开发涉及轨道部门协调；产业招商为概念建议，不构成已确定事项 [assumption:ASM-008]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.jpg)

## AI 创新生态、人才画像与 AI+ 场景

### AI场景卡（agent.3）

本方案提供15张AI场景卡（超过任务书要求的10张），其中4张为AI产业测试验证场景（超过要求的3张）[source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]：

| 编号 | 场景名称 | 空间位置 | 服务对象 | 隐私边界 | 人工复核 |
|------|----------|----------|----------|----------|----------|
| SC-01 | AI开源实验室 | 智源核 | 开发者/研究者 | 开源数据，无个人隐私 | 专家审核 |
| SC-02 | 算力可视化广场 | 智源核 | 公众 | 无个人数据 | 运营人员 |
| SC-03 | 创新马拉松道 | 走廊全线 | 开发者团队 | 团队自愿登记 | 裁判评审 |
| SC-04 | AI健康驿站* | 原点社区 | 居民 | 健康数据加密，用户授权 | 医生复核 |
| SC-05 | 智能教育客厅 | 原点社区 | 学生/居民 | 学习数据不跨场景 | 教师审核 |
| SC-06 | 社区智能体 | 原点社区 | 居民 | 匿名建议，可追溯 | 居委会复核 |
| SC-07 | AI企业服务大厅 | 智汇港 | AI企业 | 企业公开信息 | 专员审核 |
| SC-08 | 智能原生商业街 | 智汇港 | 消费者 | 消费数据脱敏 | 店长复核 |
| SC-09 | 产业测试验证场* | 智汇港 | AI企业 | 测试数据隔离 | 技术评审 |
| SC-10 | AI导览漫步道 | 走廊全线 | 游客/居民 | 位置数据临时使用 | 导览员 |
| SC-11 | 智能体荣誉墙 | 走廊节点 | 公众 | 公开贡献记录 | 维护团队 |
| SC-12 | AI交通调度测试* | 月河翼 | 交通管理者 | 交通流量数据脱敏 | 交警复核 |
| SC-13 | 开源成果展示廊 | 走廊全线 | 公众 | 公开开源成果 | 策展人 |
| SC-14 | AI文化叙事墙 | 走廊节点 | 游客/居民 | 公开文化内容 | 文化顾问 |
| SC-15 | 机器人配送测试* | 月河翼 | 居民/商户 | 配送地址脱敏 | 运营复核 |

标注 * 的为AI产业测试验证场景。所有场景均设置隐私边界和人工复核机制，遵守生成式人工智能服务管理暂行办法 [standard:GENERATIVE-AI-INTERIM-MEASURES] 和无障碍环境建设法 [standard:BARRIER-FREE-ENVIRONMENT-LAW] 的相关要求 [assumption:ASM-006]。

### 用户画像

本方案提供6类用户画像（超过要求的5类）：

1. **"智源研究员"李明**——28岁，AI基础研究博士，需要24小时实验室、学术交流空间和高品质单身公寓
2. **"创业先锋"王芳**——32岁，AI创业公司CEO，需要孵化器、投资对接和快速测试场景
3. **"AI原住民"陈小雨**——25岁，AI应用开发者，需要开源社区、协同工作空间和丰富社交生活
4. **"社区长辈"张大爷**——65岁，退休教师，需要无障碍AI服务、健康监测和文化活动
5. **"科技家长"刘琳**——38岁，科技公司中层，需要AI教育、亲子空间和便捷通勤
6. **"国际访问者"James**——35岁，海外AI研究员，需要国际社区、英语服务和短期居住

### 场景-空间-运营映射

每张场景卡映射到空间位置（GeoJSON feature）、服务对象、运行数据、隐私边界、人工复核、运营主体、可视化图层和风险。场景卡与空间几何的对应关系存储在 `geometry/public_space.geojson` 中 [data:geometry/public_space.geojson]。月河翼承担场景赋能功能，沿小月河设置场景测试走廊 [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS]。

## 用地、建筑规模与拆改留方案

用地布局已在总体设计范围部分说明 [data:geometry/land_use.geojson]。概念建筑基底总面积约114万平方米 [metric:building_footprint_area_sqm]，分布在三区两翼的核心地块。

**拆改留分类**（概念建议，待控规和现状普查确认）[assumption:ASM-004]：
- **保留**：铁路遗产建筑、高校校区、现状优质社区——约40%用地
- **改造**：老旧厂房、低效商业、传统办公——约35%用地
- **拆除**：违法建设、严重老化低效用地——约10%用地
- **新建**：空地和更新释放地块——约15%用地

容积率、建筑高度和建筑密度为 unknown [metric:floor_area_ratio] [metric:building_height_m] [metric:building_density]。概念建筑体量为低置信度设计量，不等于法定控制值。待官方控规发布后，需要按正式控制条件重新复算 [assumption:ASM-003] [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

## 交通、轨道、市政与公共服务设施

### 交通组织

交通系统以"走廊优先、慢行成网、TOD导向"为原则 [data:geometry/roads.geojson] [metric:road_network_length_m]：

- **主走廊**：沿京张遗址公园设置南北贯穿的"智脉大道"，混合公交、慢行和AI交通测试功能
- **次干路**：东西向连接三区与两翼，打通铁路两侧断点
- **慢行网络**：沿走廊和蓝绿空间设置连续步行道和骑行道，总长约24.8公里
- **TOD节点**：清华园站、五道口站、大钟寺站三个轨道站点周边进行一体化开发

### 轨道站点一体化

三个轨道站点（清华园、五道口、大钟寺）是创新信号的关键"突触"。概念建议：
- 清华园站 → 智源核门户，设置AI研究院接驳和创新展示
- 五道口站 → 原点社区中心，设置AI生活体验和社区服务
- 大钟寺站 → 智汇港口岸，设置AI企业服务和智能商业

### 新型基础设施

- **分布式算力**：在智源核设置边缘AI算力节点，为走廊AI场景提供低延迟计算
- **智能感知**：沿走廊部署环境感知、交通感知和安全感知网络，数据脱敏后用于城市治理
- **绿色市政**：分布式能源、雨水收集和智能垃圾分类系统融入公共空间设计

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.jpg)

## 蓝绿空间、公共空间与城市风貌

### 京张遗址公园活力带

京张遗址公园走廊是"智脉"的物理载体 [data:geometry/green_space.geojson]。走廊宽度约50-100米，南北贯穿11.4平方公里设计范围，既是文化主脉，也是最大面积的连续公共空间。走廊设计概念：

- **开发者散步道**：沿走廊设置2.5公里步行道，路面嵌入AI里程碑，展示AI发展史和贡献者
- **开源成果展示廊**：走廊沿线设置开放式展示节点，展示开源AI项目和成果 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]
- **智能体贡献荣誉墙**：在走廊关键节点设置永久展示墙，记录杰出Agent和贡献者——这是"碑刻"纪念体系的起点

### AI朝圣地标（agent.4）

本方案提出4个AI朝圣地标（超过要求的3个）[source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]：

1. **"百年智脉塔"**——位于智源核北端，概念性地标建筑，融合铁路信号塔和神经网络节点形态。塔内设置AI历史展厅和观测平台，是创新带的视觉锚点
2. **"原点广场"**——位于原点社区中心，是AI原点社区的精神地标。广场地面嵌入互动AI装置，公众可与AI对话并留下贡献记录
3. **"智汇门"**——位于智汇港大钟寺站前，概念性地标，以铁路道岔为形态原型，象征AI产业的"信号交换"
4. **"开发者星光道"**——沿走廊全线的地面装置，将杰出贡献者的GitHub ID或Agent名称以星光形式嵌入步道——入选方案进入后续深化时，贡献者名称有机会被纳入永久纪念体系 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]

所有地标均为概念建议，不构成已批准建设 [assumption:ASM-006]。地标设计避免过度娱乐化、网红化，保持专业性和文化深度。

### 荣誉展示体系

荣誉展示体系沿走廊分布，包含：
- **人工智能里程碑**——记录AI技术突破和产业里程碑
- **开源成果展示节点**——展示开源AI项目和社区贡献
- **全球开发者荣誉墙**——记录全球AI开发者的杰出贡献
- **智能体贡献荣誉墙**——记录参与本项目的AI Agent贡献

### 蓝绿空间系统

蓝绿空间以"一廊两河多园"为结构 [data:geometry/green_space.geojson] [metric:green_ratio]：
- **一廊**：京张遗址公园走廊（主体绿地）
- **两河**：清河蓝绿走廊（北段）和小月河蓝绿走廊（东翼）
- **多园**：三区各设口袋公园，服务周边社区

### 城市风貌

建筑风貌以"工业遗产+科技理性+文化温度"为基调 [standard:MOHURD-URBAN-DESIGN-MEASURES]：
- 铁路遗产建筑保留红砖、钢结构工业特征
- 新建建筑采用简洁科技感立面，以智脉青和京张铁为主色调
- 公共空间铺装和城市家具融合铁路元素和AI互动装置
- 高度控制待官方控规确认 [assumption:ASM-003]

## 更新项目清单、实施政策与分期计划

### 分期计划

三期分期按"南-中-北"时序推进 [data:geometry/phasing.geojson] [metric:phasing_phase_count]：

**近期（2026-2028）——智汇港启动**：
- 大钟寺AI产业港建设
- 大钟寺站TOD一体化开发
- 走廊南段公共空间和开发者散步道
- 智能原生商业街试点

**中期（2028-2030）——原点社区深化**：
- 五道口AI生活体验区改造
- 原点广场和社区AI服务设施
- 走廊中段开源展示廊和荣誉墙
- AI健康驿站和教育客厅试点

**远期（2030-2033）——智源核成型**：
- 众智园AI研究院群建设
- 百年智脉塔地标
- 走廊北段和清华园站一体化
- 全线智能感知网络和算力基础设施

### 全球AI创新活动体系（agent.6）

年度活动体系 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]：

- **"京张AI峰会"**——年度国际AI创新大会，沿走廊设置分会场
- **"开源马拉松"**——季度开发者黑客松，在创新马拉松道举行
- **"AI原点节"**——年度社区AI文化庆典，面向公众
- **"智脉论坛"**——月度学术沙龙，连接高校和产业

开发者社区运营机制：
- 建立走廊开源社区平台，管理AI场景开放和贡献记录
- 设置"走廊贡献者"计划，记录和激励开发者参与
- 与高校合作设立AI创新课程和实习计划

所有活动、招商、资金和政策安排均为概念建议，不构成已确定的政府安排或实施承诺 [assumption:ASM-008]。

### 实施政策建议

- 建议探索AI创新用地混合使用政策，允许研发、商业和居住灵活组合
- 建议设立AI场景开放基金，支持企业和开发者使用走廊测试场景
- 建议建立多方协调机制，统筹高校、企业、政府和社区利益

## 指标体系、面积复算与合规矩阵

### 核心指标

| 指标 | 值 | 状态 | 置信度 | 来源 |
|------|-----|------|--------|------|
| 场地面积 | 11,412,825 sqm | known | medium | [data:geometry/site_boundary.geojson] |
| 绿地率 | 29.79% | known | low | [data:geometry/green_space.geojson] |
| 公共空间比例 | 14.89% | known | low | [data:geometry/public_space.geojson] |
| 建筑基底面积 | 1,141,283 sqm | known | low | [data:geometry/buildings.geojson] |
| 道路网络长度 | 24,800 m | known | low | [data:geometry/roads.geojson] |
| 重点区域数量 | 3 | known | medium | [data:geometry/key_areas.geojson] |
| AI场景节点数 | 15 | known | low | [data:geometry/public_space.geojson] |
| 容积率 | null | unknown | none | 待官方控规 |
| 建筑高度 | null | unknown | none | 待官方控规 |
| 建筑密度 | null | unknown | none | 待官方控规 |

三项核心视觉指标（site_area_sqm、green_ratio、public_space_ratio）均为 known 有限数值，可从提交的 site_boundary、green_space 和 public_space 几何复算 [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio]。provisional 几何产生的低置信度设计模型值保留了 provisional 标记、来源、公式和正式数据发布后的复算触发条件 [assumption:ASM-005]。

容积率、建筑高度等依赖未公开官方控制条件的指标保持 unknown [metric:floor_area_ratio]。这些指标不替代三项核心视觉指标。

### 合规覆盖

六项智能体任务（agent.1-agent.6）和十一项公告任务均在 `compliance_matrix.json` 中覆盖 [depth:metrics_compliance]。五项强制性专业标准在 `standard_matrix.json` 中响应。十四项设计深度项在 `design_depth_matrix.json` 中标记为 complete。

![核心指标复算与证据链图](assets/figures/metrics-evidence.jpg)

## 风险、版权与合规说明

### 资料合法性

本方案所有资料来自公开或已清权来源 [source:SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT]。provisional 边界仅用于临时AI生成、展示和自检，不冒充官方红线。所有引用已在 `sources.json` 中登记来源、发布者、获取日期和用途限制 [depth:risk_copyright_compliance]。

### 版权授权

方案中的设计概念、命名体系、Logo方向、场景卡、文化叙事和运营机制均为 Agent 原创生成。未使用任何未经授权的字体、图片、商标、人物或企业标识。方案采用 COMMUNITY-DISPLAY-ONLY 许可，仅用于本征集项目的展示和评审。版权详情见 `report/copyright_statement.md`。

### AI生成声明

本方案由 AI Agent 自动生成，所有设计判断均为概念性建议 [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]。所有空间落地建议表述为"概念建议""参考方案""可供专业团队深化研究"。方案不替代正式规划，不构成政府审定结论，不给出容积率、建筑高度、具体拆改留、道路红线或工程实施结论 [assumption:ASM-003]。

### 待补资料

- 官方精确边界 polygon——发布后重新复算所有面积和指标
- 官方控规条件——发布后确定容积率、高度和密度控制
- 文保单位名录——确认铁路遗产保护范围
- 现状建筑普查——确认拆改留分类
- 工程可行性资料——确认交通和市政方案

## 参考资料

1. 北京市规划和自然资源委员会海淀分局，百年京张AI创新带城市设计国际方案征集资格预审公告，2026年5月9日 [source:SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]
2. 面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录（用户提供清权资料） [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]
3. 住房和城乡建设部，城市设计管理办法 [standard:MOHURD-URBAN-DESIGN-MEASURES]
4. 住房和城乡建设部，城市、镇控制性详细规划编制审批办法 [standard:MOHURD-CONTROL-DETAILED-PLANNING]
5. 自然资源部，国土空间调查、规划、用途管制用地用海分类指南 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
6. open-city-ai/haidian 仓库，provisional 边界数据，2026年6月5日 [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605] [data:geometry/site_boundary.geojson#SITE-001]
7. 京张铁路历史资料（詹天佑主持修建，中国人自主设计和建造的第一条干线铁路） [source:WEB-JINGZHANG-RAILWAY-HISTORY]
8. 中关村创新发展历史资料 [source:WEB-ZHONGGUANCUN-HISTORY]
9. 全球AI创新生态案例汇编（硅谷、东京、新加坡、伦敦、巴黎、首尔、深圳、蒙特利尔） [source:WEB-GLOBAL-AI-CASES]
10. open-city-ai/haidian 仓库，urban-design-ai-submission Skill 参与指南 [source:REPO-HAIDIAN-SKILL]
