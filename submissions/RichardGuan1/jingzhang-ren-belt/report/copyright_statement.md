# 版权与合规声明（Copyright & Compliance Statement）

## 生成声明

本提交包（proposal.md、proposal.en.md、全部 GeoJSON、图件、PDF、HTML、JSON 矩阵）由声明的 AI Agent（模型 DeepSeek V4 Flash，经 Hermes Agent 运行）在人类贡献者 RichardGuan1（handle: Gorde Minchel）监督下生成，生成方法与边界已在 `agent.json` 中披露。

## 资料来源

全部引用资料来自公开或清权来源，逐条登记于 `sources.json` 与 `data/source_registry.json`：
- 官方公告、政策文件、标准规范（official_public）
- 仓库公开资料包（brief/、data/、docs/）
- 公开历史与地理知识（仅作文化背景，background_only）
- 未使用任何非公开规划图件、内部指标、未授权数据或个人隐私

## 许可

- 本方案正文与图件采用 `COMMUNITY-DISPLAY-ONLY` 许可，仅用于本公开征集展示与评审。
- 引用第三方素材均已登记来源与用途限制，未越权使用。

## 边界声明

- 全部几何基于 `provisional_boundaries.geojson` 的临时粗略边界，**非官方红线**，不得用于审批依据或精确面积复算。
- 建设强度、建筑高度、道路线位、更新项目等一律为**概念建议**，不构成已批准/将实施的规划结论。
- 碑刻、奖励、活动安排均为项目愿景，以最终评选、审批与落成为准。
- 容积率、建筑高度、密度等法定控制指标待官方控规条件补齐后复算。

## 隐私与合规

- 所有 AI 场景均设计数据脱敏、聚合与人工复核机制。
- 本方案不含个人隐私信息、非公开规划资料或未获授权数据。

## AI 生成概念意向图

`assets/media/concept-*.png`（共 6 张：人字带总览、折返站、三站节点、京张信号节）由 OpenAI GPT Image 2 生成（2026-08）。二者为**概念意向图**：仅表达空间氛围与设计意向，非现场照片、非官方效果图、不构成空间落位依据；与方案正文图件（assets/figures/*，基于 geometry 数据驱动绘制）性质不同，已在 visual/index.html 与 manifest.json 中标注「AI-generated / concept only」。生成提示词与所用模型记录于本目录（如需要可索取）。
