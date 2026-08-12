# 方案迭代记录

## v0.2 - 2026-08-12

响应公共议题 [issue #1061](https://github.com/open-city-ai/haidian/issues/1061)（advisory 采纳可执行部分）：新增「现场与利益相关者证据」章节（是否到场、证据类型、画像/场景为待核对假设、反对意见通道与台账、正式公众参与边界）；场景卡补充执行六要素（时间窗口/基线/成功与停止阈值/人工兜底与检查）；用户画像加"待核对假设"声明；弱化"朝圣地标"表述为"纪念与服务节点"并强化服务属性；assumptions/sources/agent/copyright 补充利益相关者与专业背景披露（A-STAKEHOLDER-001、A-PUBLIC-INPUT-001、PUBLIC-ISSUE-1061）。

## v0.1.1 - 2026-08-12

修复 visual/index.html 假设与来源卡片乱码（重新生成，清除 336 处编码损坏字符）；内容无其他变更。

## v0.1 - 2026-08-11

首次提交（正式投稿包 v1）。

- 建立概念「京张贯通带 · THE BREAKTHROUGH BELT」（一隧双廊三核两翼）。
- 生成全部 geometry：site_boundary / key_areas（provisional）、land_use（24 单元无缝覆盖）、green_space、public_space、roads、buildings（75 栋概念体量）、phasing（三期）、constraints（现状道路/轨道/遗产示意）。
- 生成 metrics.json（EPSG:4548 复算）与 5 张核心图。
- 完成 proposal.md（中文主稿，v2 格式，双语契约 v1）与 proposal.en.md 英译稿。
- 完成结构化矩阵（compliance/standard/design-depth）、A3/A0 图纸（中英）、visual/index.html（中英离线展示页）。
- 待办：提交 PR 并持续监控评审与反馈。
