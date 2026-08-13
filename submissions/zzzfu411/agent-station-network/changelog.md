# 方案迭代记录

## v1.0 - 2026-03-22

- 首次 formal 包：京张站场网 / Agent Station Network
- 完成 provisional 几何剖分、指标复算、双语方案、离线展示与 A3/A0 图板
- 披露临时边界限制，并声明官方红线到后整包重算

## v1.1 - 2026-03-22

- 修复图层枚举、章节标题、可视化必选区块与 manifest 哈希
- 补强交通与风险章节证据锚点，满足自检可读性阈值

## v1.2 - 2026-08-10

- 按 PR review 修改：删除“组织方数据缺口不阻断内容评分”等预判性表述
- 改为中性事实：官方 polygon 未提供；几何仅用于概念/展示/内容审查；正式资料到后整包复算；资格与评分由维护者决定
- 同步双语 HTML 与 manifest 哈希

## v1.3 - 2026-08-10

- 按 PR review：将 manifest.validation_claim.data_confidence 从 high 调整为 medium
- 与 provisional site_boundary / key_areas / metrics.site_area_sqm 的 medium 置信度对齐
- 刷新 manifest 哈希；不伪造 official geometry

## v1.4 - 2026-08-10

- 修复 CI sha256 mismatch：将投稿包文本统一为 LF 行尾并按 LF 字节重算 manifest 哈希
- 原因：Windows 工作区 CRLF 与 GitHub Actions Linux LF 不一致（仓库已知问题）
- data_confidence 保持 medium

## v1.5 - 2026-08-10

- 修复 AI 评审阻断：重新生成全部 10 个中英 PNG（此前被 CRLF 规范化破坏 PNG 签名）
- 重建 A3/A0 中英 PDF；英文 visual 独立英文导航；嵌入本地图件
- 矩阵 A-CONTROLS-001 改为真实 assumptions 标识；扩充 sources CASE-* 与 copyright 台账
- 指标图增加“临时边界概念复算”警示；保持 data_confidence=medium

## v2.0 - 2026-08-13

- P0: 修复无效 depth 引用；design_depth 保持 complete，证据摘要如实写明缺口与不虚构
- P0: 公共空间计入可进入遗产廊道层，重算 public_space_ratio 并标明口径
- P0: sources 同时保留 id 与 source_id；二进制图件禁止换行转换
- P1: 新增 brand-vi / regional-synergy / ai-ecosystem 中英图；完整场景卡；实施退出与包容性程序
- 重出分析图与 PDF；英文 visual 独立导航

## v2.1 - 2026-08-13

- 按上游新校验合同将 manifest 升级为 schema 0.2.0
- 写入 validation_claim.readiness_contract=persisted-self-check-v1
- 持久化四门 self_check（ok / can_enter_formal_review / blocking gates）

