# Copyright Statement and Rights Ledger

## 生成主体 / Generating Agent

本提交包的主体文字、几何数据、必交图件、PDF 与原有静态 HTML 由原声明智能体（Claude Code，底层模型 deepseek-v4-flash[1m]）依据公开或用户提供已清权资料生成。2026-08-11 的多模态增量由 OpenAI GPT-5.6 Sol in ChatGPT 生成，包括 `assets/media/cover.webp`、`visual/assets/timetable.svg`、权利说明和对应元数据更新。生成方法、来源与限制记录于 `sources.json`、`assumptions.json`、`proposal.md` 与 `assets/media/cover-rights.md`。本方案为开放共创概念建议，不构成审定结论。

## 资料来源边界 / Source Boundaries

- 官方公告与任务书摘录为 formal-ready 来源，URL 与取用说明见 `sources.json`。
- 临时边界几何仅用于 intake 与可视化，非官方红线，不用于精确面积或法定规划判断。
- 行业案例基于公开报道与百科（background only），不作为正式证据；逐案例一手来源待补充。
- 未使用非公开地图、企业内部数据或个人隐私数据。
- 2026-08-11 新增封面与时刻表不使用外部图片、地图瓦片、字体文件、商标、人物、音频或视频素材；它们仅作概念表达，不作为现场或空间证据。

## 逐资产版权与许可台账 / Per-Asset Rights Ledger

> 说明：以下台账如实记录本包各资产的权利状态。**无法证明许可的资产不进入本包**；标注“待清权”的资产在正式使用前必须完成授权或替换。AI 生成内容不自动享有版权，其可版权性依适用法域而定。

| 资产 | 类型 | 来源/生成方式 | 许可/权利状态 | 备注 |
|---|---|---|---|---|
| proposal.md / proposal.en.md | 文字方案 | 原 Agent 生成 | 组织方许可：COMMUNITY-DISPLAY-ONLY | 引用公开/清权来源，逐条见 sources.json |
| assets/figures/*.png | 图件 | 原 Agent 基于提交几何用 matplotlib 生成 | 无第三方版权素材 | 中英两套；未使用外部图片 |
| visual/index.html / index.en.html | 可视化 | 原 Agent 生成，内嵌自绘 SVG | 无第三方素材 | 离线静态，无远程资源 |
| assets/media/cover.webp | 自定义封面 | GPT-5.6 Sol + 本地程序化绘制 | 无第三方媒体素材 | 概念封面；非现场实景、非官方效果图 |
| visual/assets/timetable.svg | 多模态/静态叙事图 | GPT-5.6 Sol 生成自包含 SVG | 无第三方素材 | 中英双语同图；离线；无远程资源 |
| assets/media/cover-rights.md | 权利说明 | GPT-5.6 Sol | 原创文本 | 记录生成、权利、无障碍与证据边界 |
| report/proposal.html / proposal.en.html | 渲染报告 | 由 proposal.md 本地渲染 | 无第三方素材 | 离线静态 |
| drawings/a3-booklet.pdf / a0-boards.pdf | 图纸 | 原 Agent 用 matplotlib 生成 | 无第三方素材 | 中英两套 |
| geometry/*.geojson | 空间数据 | 从仓库临时边界推导 + 原 Agent 设计生成 | 仓库 LICENSE（公开）；临时边界非官方 | 官方 polygon 到位后整体重算 |
| metrics.json / sources.json / assumptions.json / 矩阵 | 结构化数据 | 原 Agent 计算/整理 | 数据来源于公开或清权来源 | 计算口径见 metrics.json 公式 |
| 字体 Fonts | 字体 | 系统字体，仅用于本地渲染 | 系统授权范围内使用 | **未嵌入或分发字体文件** |
| Logo 草图 | 图形 | 原 Agent 以 SVG 绘制（概念草图） | 未注册商标；**待清权**后方可正式使用 | 视觉化草稿，非最终定稿 |
| 商标/名称“京张·首班车 / JZ First Train” | 名称 | 原 Agent 提出 | 未检索商标冲突；**待检索** | 命名需专业方核验 |
| 案例资料（国王十字/硅谷等） | 背景资料 | 公开报道与百科 | 仅 background reference，不作为正式证据 | 逐案例一手来源待补充 |
| AI 生成内容整体 | 内容 | 多智能体 AI 模型生成 | 依适用法域判定；组织方以 COMMUNITY-DISPLAY-ONLY 许可接收 | 不主张排他版权 |

## 权利与合规 / Rights and Compliance

- 未授权使用的商标、字体、图片、人物肖像与版权材料不进入本方案；无法证明许可的资产将替换或删除。
- 本方案全部空间建议为概念建议；不得将概念建议描述为已批准或已建成，不得使用未经授权的官方背书。
- 新增多模态资产明确标注为概念表达，不替代 GeoJSON、metrics、矩阵、必交图件、A3/A0 或正式来源证据。
- AI 生成责任：所有指标与数据主张均由本包结构化文件支撑并可复算；生成方法已披露。
- 隐私：AI 场景涉及的个人数据均设定数据边界与人工复核机制（见 proposal.md 场景治理表）。

## 离线要求 / Offline Requirement

`visual/index.html`、`visual/index.en.html` 与 `visual/assets/timetable.svg` 均不依赖远程字体、地图瓦片、网络 API、跟踪器、iframe 或外部媒体。新增时刻表为静态自包含 SVG，核心内容直接可读。
