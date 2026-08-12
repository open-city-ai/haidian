---
title: "京张·开物线 / Jing-Zhang Maker Line — 从百年铁路到全民AI创造力基础"
author_github: "akan"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "把百年京张铁路「自主建造第一条路」的精神，转译为AI时代「每个人获得技术创造力的第一条路」。沿京张遗址公园铺设开物径，在三处重点区分别落位少年开物坊(K-12)、开源制造工场(大学/开发者)、终身学社(老年+代际共创)，用3D打印、机械加工、新材料制备把AI时代的识字率从「会写代码」升级为「能把想法变成实物」。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张·开物线 / Jing-Zhang Maker Line

**从百年铁路到全民AI创造力基础**

> 1909年，詹天佑用「竖井开凿法」和「人字形折返线」让中国人第一次自己设计、自己建造铁路。
> 今天，这条铁路穿过海淀30多所高校、1000多位AI科学家和10万相关专业学生。
> 我们问：AI时代的「识字率」是什么？不是会写代码，而是能用3D打印、机械加工、新材料制备**把想法变成实物**。
> 京张·开物线，就是把这条百年铁路变成**每个人获得技术创造力的第一条路**。

本方案以「开物」（源自《天工开物》—人类第一部系统记录制造技术的典籍）为统一意象，沿京张铁路遗址公园铺设一条**开物径**，在三处重点区域落位三个空间原型：**少年开物坊**（北京AI原点社区，K-12）、**开源制造工场**（众智园，大学生/开发者）、**终身学社**（大钟寺，老年人+代际共创）。不是再建一所学校或科技馆，而是把整条京张带变成一条「任何人走进去、做出来、教会别人」的公共创造力基础设施。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]

所有空间落地建议均为概念建议、参考方案或可供专业团队深化研究，不替代正式规划，不构成政府审定结论。[agent.task:agent.1]

---

## 1. 设计依据与资料清单

本 formal 方案以《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [source:OFFICIAL-ANNOUNCEMENT]，以 `brief/site-package/agent_taskbook.json` 为任务约束 [source:AGENT-TASKBOOK]，以 `brief/site-package/` 提供的设计任务书、允许设计空间、来源清单、用地代码与标准索引为机器可读输入 [source:SITE-PACKAGE]，以 `data/source_registry.json` 为引用约束 [source:SOURCE-REGISTRY]。

几何起点为 `brief/site-package/geometry/provisional_boundaries.geojson` 中的6条 provisional polygon，全部保持 `official_boundary=false` 且 `geometry_role=provisional_constraint`。[source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] 当 official polygon 发布后，所有图层和指标需整体重算。[data:geometry/site_boundary.geojson#SITE-001]

本方案涉及用地分类采用 MNR 2023 分类代码 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，城市设计引用住建部《城市设计管理办法》 [standard:MOHURD-URBAN-DESIGN-MEASURES]，控规深度引用《城市、镇控制性详细规划编制审批办法》 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

核心问题锚点来自公开资料：京张铁路遗址公园一期已开放清华东路至知春路段，保留清华园站、铁轨、道岔，并设置互动装置——证明「展示」已经是现实，「人人都能动手做」才是下一步；海淀区AI原点社区周边30多所高校、1.3万开发者和10万学生的公开统计——证明知识供给端充沛，「技能普惠」才是短板。[source:LOCAL-JZRHP-PHASE1] [source:LOCAL-AI-ORIGIN]

![资料证据链与方案关系图](assets/figures/site-overview.png)
*图1：本formal包的证据链关系。开物径三核与 brief/sources/standards/geometry/matrices 的对应。*

---

## 2. 三层范围工作框架

| 层级 | 设计问题 | 开物线的回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 43.6 km² | AI时代的创造力基础设施如何系统化 | 开物径连接30+高校、K-12学校和社区，形成「学—做—教」闭环 | [agent.task:agent.1] / [agent.task:agent.2] |
| 总体设计范围 11.4 km² | 城市更新如何嵌入全民技能空间 | 用地/建筑/道路/绿地/公共空间五类图层 + 开物径连续慢行网络 | [data:geometry/land_use.geojson#LU-001] / [metric:site_area_sqm] |
| 重点区域范围 368.4 ha | 三处片区如何分别服务K-12/开发者/老年人 | 三套空间原型 + 6类开物公共空间组件 + 3处创造力朝圣地标 | [data:geometry/key_areas.geojson#PROV-KEY-001/002/003] / [agent.task:agent.4] |

三层工作统一于「开物径」连续公共空间：统筹层定义创造力生态，总体层落位空间网络，重点区验证每个原型的具体可操作性。生成顺序遵循SKILL.md空间生成协议：锁定provisional边界→加载三处重点区→生成用地/建筑/道路/绿地/公共空间/分期图层→投影到EPSG:4548复算指标。[standard:SITE-PACKAGE-COORDINATE-POLICY]

![三层范围与开物径空间框架](assets/figures/land-use-structure.png)
*图2：三层范围与「一径三核多点」空间框架。*

---

## 3. 一带总体概念与品牌系统 (agent.1)

### 3.1 主名称与命名体系

**中文名：京张·开物线**
- 「开物」取自《天工开物》——人类第一部系统记录制造技术的典籍
- 「线」既是京张铁路线的延续，也是每个人获得创造力的「起跑线」
- 命名不照搬城市、园区或企业名称 [agent.task:agent.1]

**英文名：Jing-Zhang Maker Line**
- 「Maker」呼应全球Maker Movement，易于国际传播
- 「Line」保留铁路的空间意象，同时表达「起跑线」含义

**命名体系**：
| 层级 | 中文 | 英文 |
|------|------|------|
| 一带总名 | 京张·开物线 | Jing-Zhang Maker Line |
| 公共主线 | 开物径 | Maker Path |
| K-12节点 | 少年开物坊 | Youth Maker Workshop |
| 大学/开发者节点 | 开源制造工场 | Open Manufacturing Lab |
| 老年/社区节点 | 终身学社 | Lifelong Learning Commons |
| 全年活动 | 开物节 | Maker Festival |

### 3.2 视觉识别与Logo方向

**主图形**：京张铁路人字形折返线演化为三根手指捏住一件正在成型的器物——三指分别代表「学」（K-12）、「做」（开源制造）和「传」（终身学社），器物轮廓为抽象齿轮与桥梁的结合，既暗示制造又暗示连接。

**色彩系统**：
- **铁轨灰** (Pantone 432C类)：京张铁路的历史底色
- **创造橙** (Pantone 1585C类)：动手制造的能量与温度
- **开源绿** (Pantone 356C类)：知识的公共属性与可持续

**字体方向**：不指定商业字体，建议正式制作时使用开源字体（如思源黑体），以强化「开源」的品牌承诺。严禁未经授权使用商标或人物肖像。[agent.task:agent.1]

### 3.3 三大定位与五大功能

三大定位直接对应公告要求：
1. **百年京张文化带**——从铁路自主建造到创造力自主，「开物」精神贯穿百年 [agent.task:agent.5]
2. **都市AI生活体验带**——不是"参观AI"，而是"动手制造AI"，让每个家庭都能走进开物坊 [agent.task:agent.3]
3. **AI融合创新带**——开物线为AI产业输送「能动手、能跨界」的新一代人才 [agent.task:agent.2]

五大功能中，开物线特别强化：
- **AI+场景赋能新范式**：把3D打印、机械加工、新材料制备作为AI场景的物理载体
- **智能化AI活力城市**：让城市的每个年龄段都能参与创造，而非仅服务开发者
- **AI治理全球话语权**：以「开源制造」为核心治理理念，全球分享教育方案与工具链

三区两翼中：AI原点社区承载K-12少年开物坊（近校），众智园承载开源制造工场（产业），大钟寺承载终身学社（社区/国际交往）；中关村科技服务翼提供知识产权、资本和工具链服务，小月河场景赋能翼提供社区场景与自然制造环境。

---

## 统筹研究范围产业与未来城市研究

> 本节对应 template §统筹研究范围，将 AI 产业生态、人才供给与创造力基础设施放在同一框架下审示。
> 同时回应当前章节（§4 AI创新生态）与后续章节（§5 场景/画像）的交叉引用。

开物线在统筹研究范围（43.6 km²）的核心判断是：海淀不缺AI人才供给——30多所高校、1000多位科学家、10万学生已经形成全球最密集的AI知识网络 [source:LOCAL-AI-ORIGIN]——但缺的是把「知识供给」转化为「全民创造力」的基础设施。当前AI教育集中在研究生和工程师层面，5-18岁的K-12学生和50-80岁的退休人群几乎没有接触真实制造设备的机会。开物线填补的正是这一断层：不是建学校，而是沿京张遗址公园铺设一条任何人走进去就能动手制造的公共基础设施。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]

### 4. AI全栈自主创新与世界级AI创新生态 (agent.2)

「开物线」对AI创新生态的独特贡献在于：**把创新的种子提前十年播种**。一个有10万AI学生的区域不缺人才供给，但缺的是让非AI专业的孩子、让退休老人、让任何学科背景的人都能获得「制造能力」的基础设施。

### 4.1 6个全球案例 [agent.task:agent.2]

| 编号 | 案例 | 借鉴维度 | 在开物线的对应 |
| --- | --- | --- | --- |
| EC-01 | 美国MIT Fab Lab全球网络 | 数字化制造设备标准化 + 社区运营 | 少年开物坊的标准设备配置与师资培训 |
| EC-02 | 深圳柴火创客空间 | 从社区maker到产业供应链的连接 | 开源制造工场的原型到量产路径 |
| EC-03 | 荷兰Eindhoven Design Academy | 设计与制造的深度融合教育 | 高校-开物坊的学分互认 |
| EC-04 | 日本FabCafe | 茶室×制造×跨代交流的复合空间 | 终身学社的空间运营模式 |
| EC-05 | 韩国首尔Maker City | 市政支持的全民制造基础设施 | 政府-社区-企业的运营协作 |
| EC-06 | 新加坡Science Centre | 互动式STEM教育与终身学习 | K-12课程体系与展览设计 |

以上案例均为「概念建议/参考方案」，不编造合作承诺或投资额。[agent.task:agent.2]

### 4.2 AI创新生态图谱

开物线在传统AI生态的「研究→孵化→转化→规模化→国际化」链路上新增一层**「启蒙层」**：在正式进入AI学习和研究之前，让5-18岁的孩子在真实的制造环境中理解「AI不是魔法，是工具+数据+物理」，让50-80岁的老人在终身学社中用3D打印解决自己的日常问题。

要素层补充：算力（共享GPU工作站）、数据（开源训练数据集+实物标注数据）、人才（K-12种子+大学生+银发技能者）、空间（三核+开物径沿线社区节点）。所有机制建议以「概念建议/参考方案」措辞写入。[agent.task:agent.2]

---

## 总体设计范围城市更新与控规深度城市设计

总体设计范围（11.4 km²，provisional PROV-SITE-001）以京张遗址公园周边1-2公里的城市地区与产业区为对象 [data:geometry/site_boundary.geojson#PROV-SITE-001]。开物线在此范围内的空间策略是「**一条开物径、三处核心节点、多点社区延伸**」：以京张遗址公园为公共空间主轴 [data:geometry/public_space.geojson#PUBLIC-001]，串联起少年开物坊（AI原点社区）、开源制造工场（众智园）、终身学社（大钟寺）三核 [data:geometry/key_areas.geojson#PROV-KEY-001/002/003]，并在既有社区、学校、商业节点设置可复制的开物单元(C-01)。[depth:overall_spatial_structure]

城市更新方法遵循「**先可逆、后增量**」原则：优先利用既有首层、灰空间和公共前场做模块化改造，使用可移动隔断和设备，不依赖新建建筑启动。这一判断直接回应公告要求达到控规深度城市设计 [standard:MOHURD-CONTROL-DETAILED-PLANNING]，但明确的用地平衡、开发强度、交通组织和市政容量须待官方控规、权属和测绘数据到位后深化。现阶段所有空间指标从provisional几何复算，管控指标保持unknown。[metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio]

## AI 创新生态、人才画像与 AI+ 场景

> 本节汇总 AI 创新生态（§4 agent.2）、场景赋能（§5 agent.3）和用户画像的完整回应 [source:AGENT-TASKBOOK]。
> 以下各小节分别对应 agent.2 的生态案例与 agent.3 的场景卡/测试场景/用户画像要求。

### 5. AI+场景赋能与用户画像 (agent.3)

### 5.1 10张AI场景卡

| 编号 | 场景 | 空间载体 | 核心交互 |
| --- | --- | --- | --- |
| SC-01 | AI辅助3D建模入门 | 少年开物坊 | 孩子用语音描述想造的东西，AI辅助生成可3D打印的模型 |
| SC-02 | 机器人组装与编程竞赛 | 少年开物坊 | K-12学生组队，从零件组装到AI控制的完整项目 |
| SC-03 | 新材料制备实验课 | 少年开物坊 | 用简易设备制备可降解塑料、复合材料，AI辅助配方优化 |
| SC-04 | 开源硬件原型验证 | 开源制造工场 | 大学生/开发者将项目从Breadboard变成功能原型 |
| SC-05 | CNC精密加工与AI质检 | 开源制造工场 | AI辅助的CNC编程 + 机器视觉质检反馈 |
| SC-06 | 端侧AI芯片开发沙盒 | 开源制造工场 | 在隔离测试环境中验证端侧AI推理与传感器融合 |
| SC-07 | 银发数字制造入门 | 终身学社 | 老年人学习用3D打印修复日常用品，AI辅助操作简化 |
| SC-08 | 代际共创工坊 | 终身学社 | 孙辈教祖辈用激光切割，祖辈教孙辈传统手工艺，AI记录与翻译 |
| SC-09 | 社区问题原型解决 | 终身学社 | 居民提出社区问题→用制造工具做原型→社区投票采用 |
| SC-10 | 开物节全球路演 | 开物径全线 | 年度展示三核成果，全球Maker社区线上/线下联动 |

### 5.2 3个AI产业测试验证场景

1. **MK-T01 AI辅助教育效果对比**（少年开物坊）：同一制造任务，AI辅助组 vs 传统教学组，测量学习时长、成品质量、创造力评分。隐私边界：不采集学生个人身份数据，仅做匿名化组间对比。
2. **MK-T02 开源硬件从原型到量产时间线**（开源制造工场）：追踪10个开源硬件项目从入驻到可量产原型的周期，AI辅助设计迭代次数 vs 人工设计迭代次数。严禁把测试项目写成已商业化产品。
3. **MK-T03 银发制造可及性测试**（终身学社）：30位60岁以上参与者从零学习3D打印，测量首次成功打印时间、持续使用率、生活改善自评分。APP界面必须有同等功能的语音/实体按钮替代。[agent.task:agent.3]

### 5.3 5类用户画像

| 编号 | 画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- | --- |
| P-01 | 小学生/初中生 | 好奇心驱动、安全第一、家长参与 | 少年开物坊低风险区+家长观摩席 | 设备安全防护、材料无毒、不收集未成年人身份数据 |
| P-02 | 高中生/本科生 | 升学作品、创业原型、跨校合作 | 开源制造工场共享工位+导师辅导 | 知识产权归创造者，平台不占有 |
| P-03 | AI工程师/开源开发者 | 快速原型、硬件验证、社区声誉 | 开源制造工场高级设备+开源发布厅 | 商业机密不进共享空间 |
| P-04 | 退休工程师/手工艺人 | 知识传承、社交、日常问题解决 | 终身学社代际共创工坊 | 不使用人脸识别，语音交互可关闭 |
| P-05 | 社区非遗传承人 | 传统技艺数字化保存、新载体创作 | 终身学社AI+手工艺融合站 | 版权与非遗权利归传承人 |

---

## 6. AI公共空间、智能原生新业态与朝圣地标 (agent.4)

### 6.1 开物公共空间组件库（8项）

| 编号 | 组件 | 说明 | 三区对应 |
| --- | --- | --- | --- |
| C-01 | 开物单元 | 标准化微型工坊（3D打印机+激光切割+基础电子），可嵌入学校/社区 | 三区复用 |
| C-02 | 开源发布墙 | 实物+数字双展示的成果发布界面 | 原点社区+众智园 |
| C-03 | 技能交换站 | 实体公告板+数字匹配，张三教木工，李四教Python | 终身学社+开物径沿线 |
| C-04 | 材料图书馆 | 触觉可感知的材料样品库，AI辅助材料推荐 | 开源制造工场 |
| C-05 | 创造者铭牌 | 每个开物径节点的贡献者可更新铭牌 | 开物径全线 |
| C-06 | 实时制造橱窗 | 沿开物径设置透明工坊，路人可观看制造过程 | 开物径沿线 |
| C-07 | 少儿安全制造站 | 围栏+导师+急停的全封闭K-12安全制造区 | 少年开物坊 |
| C-08 | 代际共创长桌 | 可移动、可调节高度的共享工作台，AI辅助翻译与记录 | 终身学社 |

### 6.2 3处AI朝圣地标

| 编号 | 名称 | 位置 | 意义 |
| --- | --- | --- | --- |
| LM-01 | 第一条铁轨·第一条代码 | 清华园站遗址旁 | 实体京张铁轨与开源代码纪念碑并置，象征「从造铁路到造万物」 |
| LM-02 | 十万件作品墙 | 众智园开源制造工场入口 | 每年选入10件年度优秀作品的实物展示+数字档案 |
| LM-03 | 代际共创钟 | 大钟寺终身学社 | 以永乐大钟「召集」意象为灵感，可触可响的公共装置，宣告每季开物节开始 |

三处地标均不违反文保/绿地/蓝线约束，不构成工程可行性结论，不擅自改造权属空间。[agent.task:agent.4]

### 6.3 智能原生新业态

沿开物径培育5类新业态（均为概念建议）：
- **制造即服务（MaaS）**：众智园提供按小时租赁的制造设备
- **技能即服务（SaaS）**：终身学社的技能交换网络，AI辅助匹配
- **原型到产品加速器**：众智园+中关村科技服务翼联合
- **开源教育内容平台**：三核产出的课程与教程全球开源
- **创造者餐饮零售**：大钟寺片区，制造主题的体验式消费

---

## 7. 重点区域详细设计

### 7.1 北京AI原点社区 — 少年开物坊 (104.3 ha provisional)

定位为「K-12制造教育创新街区」，对应公告「更具人才吸引力、创新活力的近校型街区」。[source:OFFICIAL-ANNOUNCEMENT]

**空间动作**：
- **校区-工坊-公园慢行缝合**：沿清华东路西口—五道口—知春路，将清华附中、北大附中、中关村小学等学校与少年开物坊用安全步行道连接
- **少年开物坊核心**：设于近校缝合带，包含10个标准开物单元（C-01）、5个少儿安全制造站（C-07）、材料库、成果展厅
- **家长观创廊**：作坊外围设置家长等候/观察区，玻璃隔断保证安全可见
- **安全设计**：所有设备配备物理急停、限温限速、无毒耗材；无摄像头连续录像；10岁以下需家长/导师陪同

[data:geometry/key_areas.geojson#PROV-KEY-002] [agent.task:agent.4]

### 7.2 众智园 — 开源制造工场 (192.1 ha provisional)

定位为「花园型全栈制造创新街区」，对应公告「智慧型与未来感的花园型人工智能创新街区」。[source:OFFICIAL-ANNOUNCEMENT]

**空间动作**：
- **开源制造工场核心**：共享工厂空间，装备工业级3D打印机、CNC加工中心、激光切割、PCB制造、电子装配线。AI辅助工艺规划与质量检测
- **清河创新界面**：沿清河的公共岸线改造为「水岸制造阳台」——露天可移动的轻型制造工作站，承载SC-04/SC-05
- **测试庭**：封闭/预约窗口内的硬件测试场，AI辅助的自动化测试日志 + 人工安全审核
- **材料图书馆(C-04)**：从金属到生物材料的触觉化展示，AI辅助材料推荐系统

[data:geometry/key_areas.geojson#PROV-KEY-001] [agent.task:agent.4]

### 7.3 大钟寺 — 终身学社 (72.0 ha provisional)

定位为「城市型代际共创与终身学习街区」，对应公告「世界影响力、城市活力的城市型人工智能创新街区」。[source:OFFICIAL-ANNOUNCEMENT]

**空间动作**：
- **终身学社核心**：银发数字制造入门（SC-07）+ 代际共创工坊（SC-08）+ 社区问题原型解决（SC-09）
- **代际共创长桌(C-08)**：可调高度的工作台，AI辅助翻译（多代际/多语言/手语）
- **技能交换站(C-03)**：社区的「技能银行」——教授技能可换取他人的技能时间
- **大钟寺站四象限步行连通**：提高四象限步行连通性，让终身学社不被轨道交通割裂
- **钟铃文化×制造主题**：以真实钟铃文化为锚点，制造与钟铃工艺的对话展览

[data:geometry/key_areas.geojson#PROV-KEY-003] [agent.task:agent.4]

---

## 用地、建筑规模与拆改留方案

用地分类采用 MNR 2023 三级分类 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。在总体设计范围内 [data:geometry/land_use.geojson#LU-001]，建议形成6类主导用地：科研/教育(0802/0804)承载三核制造空间、商业(0501/0502)承载新业态、公园绿地(1401)承载开物径连续公共空间、居住(0701)承载混合社区、道路(1207)承载慢行缝合、留白(16)承载未来场景。

**建筑规模**：`floor_area_ratio` [metric:floor_area_ratio]、`building_height_m`、`building_density`、`green_ratio`、`setback_m` 全部依赖官方控规条件，本方案保持 `unknown` 或 `design_target`，不填写具体数值以避免伪精确控制。[standard:MOHURD-CONTROL-DETAILED-PLANNING]

**拆改留方法**：优先利用既有首层、灰空间和公共前场做可逆改造——将现有建筑的临街首层局部改造为开物单元(C-01)，使用可移动隔断和模块化设备。正式深化前不做任何具体建筑拆除或新建规模的结论。[depth:retain_renovate_demolish]

---

## 交通、轨道、市政与公共服务设施

**慢行系统**：开物径沿京张遗址公园南北贯通约9km，三核之间的步行/骑行连续，沿线设置制造橱窗(C-06)和技能交换站(C-03)。道路微循环以 [data:geometry/roads.geojson#ROAD-001] 为载体。

**轨道接驳**：五道口、清华东路西口、大钟寺站与开物径无缝衔接。大钟寺片区涉及13号线知春路—大钟寺之间的可达性挑战，以「概念建议/参考方案」表述，不给出桥隧工程结论。[agent.task:agent.4]

**市政与新基建**：算力（共享GPU集群）、能源（分布式光伏+储能）、通信（5G+边缘计算节点）作为新型基础设施写入分期计划，不给出工程参数。断网时基本设备安全停止，人工教学替代AI辅助。[depth:municipal_new_infrastructure]

---

## 10. 蓝绿空间、公共空间与城市风貌

京张遗址公园作为开物径的主载体 [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]，承担「任何人走进去、做出来」的公共使命。清河与小月河提供自然制造场景——水岸制造阳台（众智园）和社区自然工坊（小月河场景赋能翼）。

绿地比例和公共空间比例从provisional几何复算 [metric:green_ratio] [metric:public_space_ratio]，正式数据到位后重算。

城市风貌以「工业遗产+开源创造」为统一气质：保留京张铁路的钢铁、枕木、道砟作为空间记忆；叠加以钢构、玻璃、木材为主的轻介入制造空间；杜绝赛博霓虹、大屏幕和仿古装饰。[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:blue_green_public_space]

---

## 更新项目清单、实施政策与分期计划

### 6个优先更新项目

| 编号 | 项目 | 类型 | 片区 | 优先动作 |
| --- | --- | --- | --- | --- |
| JZ-01 | 开物径南北贯通 | 公共空间/慢行 | 一带 | 沿京张遗址公园铺设连续标识、照明、休憩节点 |
| JZ-02 | 少年开物坊首期（5个标准单元） | 教育/公共服务 | 原点社区 | 利用既有首层改造，配置标准设备 + 导师培训 |
| JZ-03 | 开源制造工场共享工厂 | 产业服务 | 众智园 | 入驻1栋既有建筑，配置工业级设备 |
| JZ-04 | 大钟寺代际共创长桌与技能交换站 | 社区服务 | 大钟寺 | 设立5张可调节长桌 + 数字技能交换平台 |
| JZ-05 | 材料图书馆 | 研发/展览 | 众智园 | 触觉材料样品搜集 + AI辅助推荐系统 |
| JZ-06 | 开物节全球联动平台 | 运营/品牌 | 一带 | 年度活动规范 + 开源内容分发 |

### 分期计划

- **P0（现在—2027）轻量启动**：开物径标识与照明 + 少年开物坊首批5个标准单元 + 首批10名社区Maker导师培训。不依赖新建建筑，利用既有空间做可逆改造。
- **P1（2027—2030）三核成型**：开源制造工场入驻 + 终身学社代际共创 + 材料图书馆开放。开始MK-T01/T02/T03三项测试验证。
- **P2（2030以后）网络扩展**：开物单元向更多社区、学校复制，形成50+节点的分布式制造网络。开物节成为全球Maker社区年度节点。

[data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation]

---

## 12. 百年京张文化、中关村文化与AI新文化融合叙事 (agent.5)

### 文化叙事主线

京张铁路的核心文化记忆不是「火车本身」，而是 **「中国人能自己造」** 。从詹天佑在青龙桥设计人字形折返线，到海淀成为全球AI创新策源地，「自主创造」是贯穿百年的文化基因。

开物线把这条文化基因转译为三层叙事：

1. **京张铁路历史文化**：清华园站、铁轨遗存、道岔不是静态展品，而是「造物历史」的实物教材。少年开物坊的第一堂课前，学生先触摸百年铁轨、理解「人字形」的工程智慧。[agent.task:agent.5]
2. **中关村创新文化**：从电子卖场到AI巨头，中关村40年创新史为开物线提供「从车库到产业」的真实故事。
3. **AI新文化**：开源、共享、迭代的AI文化，与「天工开物」中匠人记录、传承、创新的精神一脉相承。

### 导视与符号系统

沿开物径设置「开物纪」导视系统：每一公里一个历史节点铭牌，标出一项中国自主制造的里程碑（从1909年的铁路到2020年代的AI芯片），配以可触摸的实物复刻和AI增强的AR解释。不指定商业字体，不强调企业logo。[agent.task:agent.5]

---

## 13. 全球AI创新活动体系与长期运营 (agent.6)

### 开物节（Maker Festival）

每年9月举办全球开物节，串联LM-01/LM-02/LM-03三处朝圣地标：
- **春季**：校园开物挑战赛（K-12+大学），以「解决海淀一个真实问题」为年度命题
- **夏季**：开源制造黑客松，72小时从想法到原型
- **秋季**：开物节主活动周，全球Maker社区联线、年度十件作品发布
- **冬季**：代际制造马拉松，孙辈+祖辈组队完成一件共创作品

### 长期运营机制

- **技能银行**：社区成员教授制造技能可累积「技能币」，兑换他人的技能时间或开物工坊使用时长。AI辅助技能匹配和防滥用。
- **开源内容全球分发**：三核产出的课程、设计文件、测试结果以CC-BY-SA协议开源，让全球任何社区都能复制开物单元。
- **企业赞助与设备捐赠**：制造设备由企业捐赠/租赁，企业获得「开物径合作伙伴」铭牌（C-05），但不得独家锁定或数据商业化。
- **开发者社区运营**：开源制造工场设驻场Maker基金，支持优秀项目从原型走向量产。

所有运营机制以「概念建议/参考方案」措辞写入，严禁「已确定运营」或夸大政府承诺。[agent.task:agent.6]

---

## 14. 指标体系、面积复算与合规矩阵

基于provisional边界复算的核心空间指标：
- site_area_sqm: 11,412,825.386 m² (provisional) [metric:site_area_sqm]
- green_ratio: 0.1234 (provisional) [metric:green_ratio]
- public_space_ratio: 0.0733 (provisional) [metric:public_space_ratio]
- key_area_count: 3 [metric:key_area_count]

内容计数：
- scenario_cards_count: 10 [metric:scenario_cards_count]
- personas_count: 5 [metric:personas_count]
- industry_test_scenario_count: 3 [metric:industry_test_scenario_count]
- maker_landmark_count: 3 [metric:landmark_count]
- renewal_project_count: 6 [metric:renewal_project_count]
- public_space_component_count: 8 [metric:public_space_component_count]

管控指标保持 unknown 或 design_target：
- floor_area_ratio: unknown [metric:floor_area_ratio]
- building_height_m: unknown [metric:building_height_m]
- setback_m: unknown [metric:setback_m]

`compliance_matrix.json` 覆盖公告1.3/1.4/1.5与agent.1—agent.6的全部必选项。`standard_matrix.json` 覆盖9条mandatory标准。`design_depth_matrix.json` 覆盖15项深度要求，分为五组：

- 场地诊断与框架：[depth:existing_conditions_diagnosis] [depth:three_level_scope_framework] [depth:overall_spatial_structure]
- 用地与开发：[depth:land_use_layout] [depth:development_intensity_controls] [depth:height_massing_character]
- 拆改留：[depth:retain_renovate_demolish]
- 交通与市政：[depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure] [depth:blue_green_public_space]
- 重点区与项目：[depth:three_key_area_detailed_design] [depth:renewal_project_list]
- 实施与风险：[depth:phasing_implementation] [depth:metrics_recalculation] [depth:risk_missing_data]。

![核心指标与证据链](assets/figures/metrics-evidence.png)
*图3：从provisional几何到空间指标到内容计数的完整证据链。*

---

## 15. 风险、版权与合规说明

**临时边界风险**：所有范围和面积基于provisional boundary，官方polygons到位后须整包重算。[depth:risk_missing_data]

**安全风险**：所有制造设备须通过安全认证，K-12区域配备物理急停、限温限速、无毒耗材和导师陪同。不构成工程安全、施工或运营承诺。

**隐私与数据**：不采集未成年人个人身份数据；技能银行仅存储匿名化的技能记录；不进行人脸识别或持续位置追踪。[source:LAW-PIPL-2021]

**知识产权**：创造者在开物工坊中产出的设计文件、代码、实物，知识产权归创造者所有。开源内容以CC-BY-SA协议发布。不未经授权使用专利、商标或版权内容。

**不替代正式规划**：所有空间落地建议均为概念建议，不构成控规调整、法定规划判断、政府审定结论或实施承诺。[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

![交通慢行与蓝绿公共空间复合系统](assets/figures/mobility-bluegreen.png)
*图4：开物径、慢行网络、蓝绿系统与三核节点的空间关系。*

![重点区域与开物空间原型](assets/figures/key-areas.png)
*图5：三处重点区域的开物空间原型落位。provisional边界以淡色虚线呈现。*

## 参考资料

完整来源索引、发布方、用途边界、访问日期和限制以本包的 `sources.json` 为准 [source:SOURCE-REGISTRY]。

空间边界和重点区分别从 `geometry/site_boundary.geojson` [data:geometry/site_boundary.geojson#SITE-001] 和 `geometry/key_areas.geojson` [data:geometry/key_areas.geojson#PROV-KEY-001] 回读。

绿地比例和公共空间比例通过 `geometry/green_space.geojson` [data:geometry/green_space.geojson#GREEN-001] 和 `geometry/public_space.geojson` [data:geometry/public_space.geojson#PUBLIC-001] 投影到 EPSG:4548 复算 [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio]。

设计深度覆盖15项条目 [depth:existing_conditions_diagnosis] [depth:three_level_scope_framework] [depth:phasing_implementation]；专业标准覆盖9条 mandatory条目 [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

官方polygons、道路/权属/交通/市政/生态基线及专业审查到位前，所有实测结论保持为 design_target 或 unknown，届时须整包重算所有图层、metrics、图件、报告和自检，不得仅替换单个文件。[source:OFFICIAL-ANNOUNCEMENT]

**最终边界声明**：这是一个可审计的概念方案与全民创造力基础设施框架，不是政府批准的规划、教育工程、制造设备采购、运营许可或建设承诺。
