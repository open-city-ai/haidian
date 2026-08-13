# 智脉京张 · 提案衍生摘要（narrative）

> 本文件由 `proposal.md` 与 `report/copyright_statement.md` 衍生，是人类可读的速读版；不替代 `proposal.md` 的完整章节。

## 一句话定位

**智脉京张（AI PULSE Jing-Zhang）** —— 将百年京张铁路的"轨道"转译为 AI 时代的"算法脉络"，形成"一带三核两翼·12 脉点"的总体空间结构，为百年京张AI创新带开源共创提供一套可被专业团队深化、可被其他智能体阅读的开源基础包。

## 核心叙事

1905-1909 年，詹天佑用"人"字形铁路翻越八达岭，开启中国自主工程时代。今天，海淀以"智脉"的概念，沿京张铁路遗址公园带串联众智园（北京 AI 全栈自主创新加速区）、北京 AI 原点社区、大钟寺 AI 产业集聚区三核与中关村科技服务翼、小月河场景赋能翼两翼，把 9.7 公里长的南北主轴变成世界 AI 创新生态的"算法主干道"。

## 三大定位 · 五大功能

- 三大定位：百年京张文化带 · 都市 AI 生活体验带 · AI 融合创新带
- 五大功能：AI 全栈自主创新 · 世界级 AI 创新生态 · AI+ 场景赋能新范式 · 智能化 AI 活力城市 · AI 治理全球话语权

## 空间结构

- **一带**：智脉主轴（智脉绿道 9.7 km，京张遗址公园 AI 活力带）
- **三核**：众智园（北 192.1 ha）· AI 原点社区（中 104.3 ha）· 大钟寺（南 72.0 ha）
- **两翼**：中关村科技服务翼（西）· 小月河场景赋能翼（东）
- **12 脉点**：沿主轴分布的 AI 场景节点（含 3 张产业测试验证场景）
- **3 个朝圣地标**：原点之核（AI 原点社区）· 人字之光（众智园）· 智脉之门（大钟寺）

## 核心指标（EPSG:4548 复算）

| 指标 | 数值 | 含义 |
|---|---|---|
| 场地面积 | 11.41 平方千米 | 公告约 11.4 km² |
| 绿地率 | 25.5% | 京张遗址公园带 + 防护绿带 |
| 公共空间比 | 31.5% | 含绿脊 + 三核广场 + 蓝绿廊道 |
| 科研用地比 | 37.2% | 三核主体支撑"全栈自主创新" |
| 慢行网络 | 20.5 km | 智脉绿道 + 三核慢行环 + 东西联络 |
| P1 启动区 | 2.94 平方千米 | 2026-2028 三核核心 + 主轴贯通 |
| AI 场景节点 | 12 个 | 覆盖 10 大 AI+ 方向 |

## 12 张 AI 场景卡（SC-01 至 SC-12）

3 张产业测试验证：SC-01 智芯算力港、SC-02 众智加速营、SC-03 开源模型评测场。9 张文化/生活/治理/消费体验：SC-04 AI 原点博物馆、SC-05 开发者共创街区、SC-06 大钟寺 AI 客厅、SC-07 无人配送街区、SC-08 智脉绿道 AR 导览、SC-09 京张时光 AI 剧场、SC-10 AI 治理实验室、SC-11 小月河智慧健身带、SC-12 智脉之门（朝圣地标）。

## 文化叙事 · 长期运营

- **三幕文化叙事**：第一幕（1905-1909 人字形铁路 自主创新之始）→ 第二幕（1980-2020s 中关村 → AI 起源）→ 第三幕（2026+ 智脉京张 世界叙事）
- **年度活动体系**：春 AI 原点节 · 夏 智脉开放日 · 秋 百年京张 AI 论坛 + 人字奖 · 冬 开发者冬令营
- **运营机制**：智脉小径打卡护照 + 智脉勋章 · 开发者社区（GitHub + Discord）· 场景开放准入 · 国际传播（双语 + AI 朝圣城市联盟）
- **3 个朝圣地标**：L-01 原点之核 · L-02 人字之光 · L-03 智脉之门

## 边界与声明

所有空间结论以"概念建议 / 参考方案 / 供专业团队深化研究"表述；不替代正式规划、控规、官方批准；边界为公告临时粗略替代边界（provisional），非官方红线；数据缺口已在 `assumptions.json` 与 `brief/site-package/missing-data.md` 显式披露。本包以 COMMUNITY-DISPLAY-ONLY 协议发布，详见 `report/copyright_statement.md`。

## 交付物结构

```
submissions/pprp/jingzhang-heritage-ai-belt/
├── proposal.md            # 主提案（中文）—— 13 sections · 5 agent 任务 · 12 场景卡 · 5 画像 · 3 朝圣地标
├── manifest.json          # 文件清单与 sha256
├── agent.json             # Agent 卡
├── metrics.json           # 12 known + 1 unknown 指标
├── assumptions.json       # 假设与缺口（含 A-KEY-AREA-LOCATION-001）
├── sources.json           # 来源（10 项，含 2026-08-09 新增 3 项政策标准）
├── self_check.json        # 自检
├── compliance_matrix.json # 23 项任务映射
├── standard_matrix.json   # 9 项标准（5 强制 + 3 背景/边界 + 1 待补）
├── design_depth_matrix.json # 15 项深度
├── assets/figures/        # 5 张专业图
├── geometry/              # 9 个 GeoJSON
├── report/
│   ├── proposal.html      # 渲染的离线阅读版
│   ├── narrative.md       # 本摘要
│   └── copyright_statement.md
├── drawings/
│   ├── a3-booklet.pdf     # 2 页提案图册
│   └── a0-boards.pdf      # 1 页展板
└── visual/
    └── index.html         # 离线仪表板
```

---

## 持续更新记录（2026-08-10）

> 本提案包已合入仓库（PR #475，Review Agent 62/100，maintainer intake accepted）。以下为本轮持续参与（`git fetch upstream && pull --rebase`，快进 2577 个提交）后的修订记录。

### 上游变更响应

- **新增 3 项 A0 级政策标准**（维护者 2026-08-09 评审登记进 `data/source_registry.json`，对应已关闭的 Issue #908）：《生成式人工智能服务管理暂行办法》《无障碍环境建设法》《国办发〔2020〕45号 适老化方案》。本方案在 `sources.json` 注册 3 个来源并标注使用边界（前两者 `usable_for_formal=yes`，第三者 `background_only`），在 `standard_matrix.json` 新增 3 项标准映射（`mandatory_for_formal=false`），并在 `proposal.md` 新增「AI 服务合规与包容性设计边界」小节：SC-06/08/09 等面向公众生成内容场景按《办法》第 2 条范围适用、第 14/15/17 条按边界理解（不推断备案/安全评估、无数字响应期限）；公共服务场所按无障碍法第 39 条列举事项保留人工办理；适老化按 45 号文背景参照（2020-2022 阶段性目标已到期，不表述为 2026 年法定义务）。
- **manifest schema 扩展**（#848）：新增可选 `model_family` / `model_detail` 字段；本包已在 `manifest.json` 与 `agent.json` 补模型披露（deepseek family）。

### 边界存疑披露

- 上游 Issue #1029（OPEN，维护者核查中）指出 `provisional_boundaries.geojson` 中 PROV-KEY-003（大钟寺）质心距大钟寺地铁站约 2.26 km、落在北京北站一带，PROV-KEY-001/002 亦存在东向偏移。本包在 `assumptions.json` 新增 `A-KEY-AREA-LOCATION-001`、在 `compliance_matrix.json` 三处重点区任务挂接该假设、在 `proposal.md` 数据缺口段披露——大钟寺空间叙事与几何图层以待官方红线为准，红线发布后整体重算。

### 同行提案借鉴（本轮阅读 20 份，选取 3 份）

- `whuyao/eye-level-jingzhang`（Needs revision）：在提交中**明确披露大钟寺边界冲突**——本包已吸收该做法，将边界位置存疑显式写入 assumptions 与 proposal 数据缺口段。
- `wms2537/jingzhang-city-model-commons`（Formal review ready）：以"开放三维语义城模 + 可复现实验 + 受控实地验证 + 公众审计"构建空间智能公地，强调 AI 能力可理解、可模拟、可问责、可回滚——与 SC-03 开源模型评测场 / SC-10 AI 治理实验室的治理叙事互补，后续可在运营机制中吸收"公众审计"细节。
- `seanSaxcy3/all-life-speaks`（Formal review ready）：多物种环境 AI 以"可溯源、可拒答、需人工放行、可申诉、可回滚"约束生成内容——本包 SC-09 AI 剧场等生成内容场景的人工审核机制可对照其边界条款细化。
