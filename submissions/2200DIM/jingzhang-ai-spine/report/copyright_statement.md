# 版权与生成来源台账（Copyright & Rights Ledger）

- **方案名称**：京张智脉 · 百年京张AI创新带城市设计概念方案（Jing-Zhang AI Spine — A Concept Urban Design）
- **生成方**：WorkBuddy (AI agent) / GitHub 2200DIM
- **许可**：CC-BY-4.0（展示授权 / 共创参与）
- **生成日期**：2026-08-08（迭代 v0.2）

## 1. 性质声明

本方案为「百年京张AI创新带城市设计开源征集」的 AI agent 开放共创建议，所有空间内容均为
「概念建议 / 参考方案 / 可供专业团队深化研究」，**不替代正式规划，不构成政府审定结论**。
几何采用仓库维护者发布的临时粗略边界（official_boundary=false），面积按 EPSG:4548 复算，
非正式面积依据，待官方或清权数据发布后须整体校核。

## 2. 逐项资产台账

| 资产 | 来源 | 许可 | 备注 |
| --- | --- | --- | --- |
| 品牌命名「京张智脉 / Jing-Zhang AI Spine」 | 原创 | CC-BY-4.0 | 由 agent WorkBuddy 原创命名，未使用任何现有商标 |
| 结构口诀「一脉串三区、两翼濯两岸」 | 原创 | CC-BY-4.0 | 原创表述 |
| 所有示意图（matplotlib 生成 PNG） | 原创 | CC-BY-4.0 | 基于官方/清权公开几何数据生成，未引用第三方图像 |
| 报告文本（proposal.md / report/） | 原创 | CC-BY-4.0 | 由 agent 生成并人工审阅，未引用第三方版权文本 |
| HTML 看板与 PDF 图册 | 原创 | CC-BY-4.0 | 无外部 CDN/脚本；中文字体使用见字体条目 |
| 场景卡/案例表/画像/地标/运营/产业矩阵 | 原创或公开知识整理 | CC-BY-4.0 | 案例逐项附来源（见 cases.source_zh），所有表述均为概念建议 |
| 临时几何数据（geometry/*.geojson） | 上游仓库维护者（provisional_boundaries） | 仓库维护者提供 | 标注 official_boundary=false；非官方红线，待官方数据校核 |
| 中文字体（图表/HTML：SimHei） | 微软 Windows 系统字体 | 微软系统许可 | SimHei 为 Windows 系统字体，仅在本机渲染图表与 HTML，字体文件不随包分发；不得将系统字体许可自动推定为可再分发。 |
| PDF 嵌入字体（SimHei TTF） | 微软 Windows 系统字体 | 嵌入/再分发许可待确认 | 诚实披露：SimHei 的嵌入与再分发受微软许可约束，本方案在本地渲染环境嵌入；如需公开可再分发，建议替换为开源可嵌入字体（如思源黑体 Source Han Sans / Noto Sans CJK，SIL OFL 许可）。此项已列为待补许可项。 |

## 3. 第三方权利

如本方案任何表述涉及第三方权利争议，以官方发布资料与法律规定为准；生成方承诺在收到有效通知后
修正或撤下相关表述。AI 生成内容的事实准确性与版权责任由生成方承担。

## 4. 合规边界

- 未使用秘密地图、非公开规划图件、内部指标或伪造官方背书；
- 未给出容积率、建筑高度、具体拆改留、道路红线、工程线位、市政管线、投资测算等最终结论；
- 官方红线、控规指标、文保控制线等缺失项已列入 `assumptions.json` 与风险章节，待官方/清权附件补充后复算。

## 5. 字体与第三方软件

- 中文字体：SimHei（Windows 系统字体）用于图表与 HTML；STSong-Light（reportlab 内置 CID）已替换为 SimHei（TTF 嵌入）以避免缺字；
- 渲染工具：matplotlib（Agg backend）、reportlab、shapely/pyproj（EPSG:4548 复算）；均为开源/系统组件。