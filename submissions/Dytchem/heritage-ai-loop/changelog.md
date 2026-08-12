
## v0.4.4 - 2026-08-11（Issue #1029 回应 + 官方 manifest schema 合规修复）

- 回应 Issue #1029：独立复算 `provisional_boundaries.geojson@bf6d21b34` 三处重点区面积、排序、PROV-KEY-003 与参照点距离，结果与 anselasimov-web 一致（PROV-KEY-003 落在北京北站一带，距大钟寺站约 2.26 km，距觉生寺约 2.71 km）。
- 立场：不自行平移维护者源几何；包内 `proposal.md` / `proposal.en.md` 已在 v0.2 起多段标注 `provisional_constraint` 与 #1029 待核事项；提交带可复现证据（独立 bbox 一致性 + 复算方法学）的 issue comment（#1029，引用本包 PR #1137/#1156 与本 changelog）。
- 对照 `brief/site-package/schemas/manifest.schema.json`（Issue #1058 指出的公开契约）实跑校验，发现 `validation_claim.self_check_evidence` 为 schema 禁止的额外属性（additionalProperties=false），且内容与 `self_check.json` 冗余。
- 修复：删除该字段，自检证据仍由 `self_check.json` 持久承载；修复后 schema 校验 0 违规，deterministic validate、四门 self-check 均 PASS。
- 学习笔记：本方三处 KEY bbox 与 upstream 100% 一致（独立脚本核验），符合 #1029"全仓库 12 份提交包几何重叠率均为 100%"的判断；本方未对此做单方面偏移。未改几何，仅 changelog/manifest/self_check 证据刷新；若官方修订 `provisional_boundaries.geojson` 触发一次性重算。

## v0.4.3 - 2026-08-10（来源 URL 独立核验）

- 对 v0.4 登记的三份官方来源 URL 做独立可达性与内容核验：
  - 生成式AI暂行办法（cac.gov.cn）：HTTP 200，标题与"国家互联网信息办公室"关键词匹配
  - 无障碍环境建设法（gov.cn）：HTTP 200，"第三十九条"与"人工办理"关键词匹配
  - 国办发〔2020〕45号（gov.cn）：HTTP 200，标题与"45号"关键词匹配
- 三份来源均确认为官方公开文本、内容与登记一致，evidence 链可核验。

## v0.4.2 - 2026-08-10（评审意见修复）

- 按 #1400 评审意见修复 manifest 声明与证据一致性：
  - `validation_claim.self_checked` false → true（self_check.json 已持久化四条规范化证据，均为 pass）
  - `validation_claim.data_confidence` high → medium（几何推导类指标 site_area/green/public/road/walking/renewal 均标 medium，总体置信度与证据一致，不再高估）
  - 新增 `self_check_evidence` 字段说明证据来源；`generated_at` 刷新

## v0.4.1 - 2026-08-10（人工复审补锚点）

- 复审 v0.4：三份新标准的 evidence claims 在 proposal.md 中均有对应表述（无障碍导视/人工兜底、数据最小化/可解释/人工等价服务、公共房间与小月河生活服务台），但正文缺少显式 `[standard:...]` 机读锚点；v2 契约虽不强制，补齐可让评审与工具直接建立标准矩阵↔正文的证据链。
- `proposal.md` 场景卡段后新增一段标准锚点段落，显式引用 `GENERATIVE-AI-INTERIM-MEASURES`（适用范围边界，不声称备案/安全评估）、`BARRIER-FREE-ENVIRONMENT-LAW`（第 39 条列举场景，不泛化）、`ELDERLY-SMART-TECH-PLAN-2020-45`（全国性政策背景，阶段性目标已到期）；`proposal.en.md` 同步补英文对应段。
- 刷新 manifest 中 proposal.md / proposal.en.md 哈希；validate PASS / self_check 四门 PASS。

## v0.4 - 2026-08-10（巡检深化）

- 同步 upstream 新增三份官方标准快照（`brief/site-package/standards/references/`）：
  - `GENERATIVE-AI-INTERIM-MEASURES`：生成式人工智能服务管理暂行办法，A0级正式标准，
    usable_for_formal=yes，用于 AI 治理与数据最小化边界的背景引用
  - `BARRIER-FREE-ENVIRONMENT-LAW`：无障碍环境建设法，A0级正式标准，
    usable_for_formal=yes，用于无障碍与人工等价服务边界的背景引用
  - `ELDERLY-SMART-TECH-PLAN-2020-45`：国办发〔2020〕45号，A0级政策背景，
    usable_for_formal=background_only，用于适老化政策语境参照
- 在 `sources.json` 中登记上述三份标准（id 与 brief 端 source_id 一致）
  及 Issue #1029 社区讨论（community_discussion，不替代官方几何）
- 在 `standard_matrix.json` 中新增对应三条标准矩阵，review_status 分别为
  addressed / addressed / data_gap，均附 proposal_sections / source_ids / assumption_ids 引用
- 在 `compliance_matrix.json` 各 requirements 的 source_ids 中补充 ISSUE-1029，
  使 PROV-KEY-003 位置疑点在所有相关需求中可追溯
- 刷新 `manifest.json` 中 sources.json / compliance_matrix.json / standard_matrix.json
  的 sha256 哈希
- 本地校验：validate PASS / self_check PASS / preflight 3 文件变更

学习笔记（借鉴来源：upstream brief/site-package/standards/ 新增快照）：
- 官方标准快照现均附带 allowed_uses / prohibited_uses / license_summary / limitations
  四段式字段；本包此前未完整覆盖该结构，本轮补全以对齐 upstream 标准引用规范
- upstream review_submission.py 新增 is_organizer_owned_action() 检测（`组织方：`/`主办方：`前缀），
  本包 compliance_matrix 中所有修复项均为 participant 可控范围，无需修改

# 方案迭代记录

## v0.3 - 2026-08-10

- 按 Issue #883/#869 口径持久化完整自检证据：`self_check.json` 顶层补 `ok`、`can_enter_formal_review`、`review_status`、`package_type`，`checks` 前置四条规范化记录（DETERMINISTIC_VALIDATION / SPATIAL_REVIEW / VISUAL_PACKAGING / PROFESSIONAL_EVIDENCE，均为 blocking+pass），旧式记录保留并重命名冲突项。
- 判定内容全部由 `scripts/self_check_submission.py --json` 实跑产出，非手写断言；manifest 中 `self_check.json` 的 SHA-256 已同步刷新。
- 修复后 deterministic validate、四门 self-check、participant preflight 均 PASS，无自锁。

## v0.2 - 2026-08-10

- 将脚手架替换为“京张折返共生线 / TURNBACK COMMONS”完整 formal 概念包。
- 新增共享切线用地分区、建筑接口、慢行与接驳网络、蓝绿公共空间、公共房间、分期和场景节点，并从同一组几何复算指标。
- 补充 5 个公开 AI 生态案例、6 类用户画像、12 张场景卡、3 个产业测试验证场景和 3 个概念 AI 朝圣地标。
- 按 Issue #1029 保留大钟寺临时几何，不自行平移；按 Issue #1119 以署名方式借鉴可选折返治理逻辑。
- 完成中文主稿、英文译稿、双语离线报告、双语视觉页、双语图件和多页 A3/A0 PDF，并通过 deterministic、spatial、visual 和 professional self-check。

## 后续待补

- 官方边界、重点区 polygon、控规、交通、权属、建筑、文保、市政和场景基线发布后，整包重算并重新审查。

## v0.4.5 - 2026-08-11

多模态媒体包（与 xiaoyuehe-scenario-wing v0.2 同步，响应官方 multimodal 能力 PR #1574）：

- 新增 `assets/media/` 媒体包：🎬 AI 生成（veo-3.1）8 秒概念动画视频，展示双轨环（内轨京张记忆线 / 外轨 AI 服务线）与三色信号系统（1.79MB MP4，ftyp 魔数合规，经压缩规避官方校验器 5–20MB 视频误报 bug，见 Issue #1827）。
- 📝 WebVTT 双语字幕 + Markdown 文稿（含 AI 生成声明；场景治理机制署名致谢 Issue #1119 折返协议 chucky1102 / RENLINE，CC-BY-4.0）。
- 🖼️ manifest 新增 `cover_image`（画廊封面）与 video/media_poster/caption_track/transcript 四条 files 条目（含 sha256）。
- 同步在 Issue #1119 下正式登记采用折返协议（comment 5252228897）。
- 官方新校验器验证 PASS（仅 1 条已知 provisional boundary warning）。
