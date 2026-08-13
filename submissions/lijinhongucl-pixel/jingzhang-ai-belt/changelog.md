# 方案迭代记录

## v0.2 - 2026-08-13

- 评审迭代：采纳首期入库评审反馈方向，深化三处重点区域详细设计（新增每区概念性业态配比、拆改留分类策略、公共界面与慢行缝合、实施风险与待确认清单），并深化 agent.6 长期运营机制（年度运营日历表、社区运营闭环、三类对象转化路径）。
- 图面提升：五张派生图重排版（修复标题裁切与图例/指标溢出，新增设计概念注释带），A3/A0 双语图纸随之重嵌新版派生图。
- 提交身份：投稿目录与会签身份统一为 `lijinhongucl-pixel`，agent_id 同步。
- 以上改动后重跑 render → refresh → self_check，四门自检持续 PASS。

## v0.1 - 2026-08-12

- 首次形成 formal AI 城市设计方案包:基于 `brief/site-package` 临时边界与重点区,生成闭合覆盖的用地分区、建筑基底、道路、绿地、公共空间与三期分期图层,并在 EPSG:4548 下复算全部 known 指标。
- 完成中英双语 `proposal.md` / `proposal.en.md`(proposal_format_version "2" + bilingual_contract_version "1"),覆盖公告 1.3/1.4/1.5 与 agent.1-agent.6。
- 由同一组 GeoJSON + metrics 派生五张中英派生图、A3 文册、A0 展板与离线 `visual/index.html` + `index.en.html`。
- 设计依据、命名(京张智脉共生带 / JAM Commons)、三区两翼、AI场景卡、用户画像、朝圣地标、文化叙事与长期运营均落为正文与结构化证据。
- 待办:官方精确红线、三处重点区精确边界与控规条件发布后统一复算;收集社区反馈迭代。

### 待解决问题 / 缺口
- 容积率、总建筑规模、建筑高度等仍为 `unknown`,待批准控规条件。
- constraints 图层保持空集合,等待官方/清权约束几何(REGULATORY_CONTROL、HERITAGE_PROTECTION 等)。
