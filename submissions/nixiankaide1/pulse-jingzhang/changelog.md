# 方案迭代记录

## v0.1 - 2026-08-08

首次提交「京张起跑线 / JINGZHANG START LINE」formal 方案包。

- 方案概念：从百年铁路起点到全球 AI 运动健康活力带；AI×运动健康活力城市实验室定位
- 差异化：避开已有 200+ 方案的「轴/廊/脉/平台」叙事，以运动健康主线 + 起跑线命名体系破题
- 成果：
  - proposal.md 13 章节（中文主稿，约 1.08 万汉字，238 处证据引用）
  - 9 个 GeoJSON 设计图层（land_use 44 分区零缝隙零重叠，EPSG:4548 复算）
  - 8 个 JSON 证据文件（24 指标 / 8 假设 / 10 来源 / 23 合规 / 6 标准 / 15 深度）
  - 5 张设计图 + 离线展示页 + A3 文册 10 页 + A0 展板 4 页
  - 12 场景卡（含 3 测试验证）、6 画像、6 案例、4 朝圣地标、3 期实施
- 自检：self_check PASS（formal-review-ready）；participant_preflight PASS
- 边界：全部几何为 provisional（official polygon 发布后整包复算）
- PR：open-city-ai/haidian#652

### 待复核事项

- [ ] official 边界与控规指标发布后：重算 site/key areas/land use/roads/green/public/buildings/phasing 与全部面积类指标
  - 执行手册已备妥：/tmp/opencode/recalculation-runbook.md（8 步流程：登记→几何替换→指标复算→正文/假设更新→图面再生成→校验→推送→提示）
  - 触发条件：官方 polygon 发布（资格预审文件包 / 维护者官方 GeoJSON / 清权 CAD/GIS/PDF）；截至 2026-08-09 上游仍仅有 provisional 文件
- [x] 补英文译稿（proposal.en.md + report/proposal.en.html，2026-08-09 完成；visual/index.en.html、图件/PDF 英文版留待后续迭代）
- [ ] 跟踪 PR #652 的 CI 与维护者评审反馈，纳入下一轮迭代

## v0.2 - 2026-08-09

英文译稿与迭代记录补充。

- 新增 `proposal.en.md`（完整英文译稿，13 章节对齐官方英文标题，证据引用与中文版逐项一致：33 source/29 standard/39 depth/85 data/67 metric）
- 新增 `report/proposal.en.html`（英文离线阅读版，由 render_proposal_html.py 自动生成）
- 新增 `changelog.md` 迭代记录
- manifest 已注册 translation 条目（proposal.en.md / report/proposal.en.html）
- self_check 复跑 PASS（formal-review-ready）；participant_preflight PASS

### 环境与协作记录

- 首个提交 CI run（31266255720）因 GitHub API 瞬时 404（download_content）失败，属基础设施问题，与方案内容无关；本地四层校验全 PASS
- 已开 Issue open-city-ai/haidian#658 跟踪 404 未纳入重试集合的问题
- PR #652 评论区已说明情况；第二个提交（含英文版）排队等待 CI 复跑

## v0.3 - 2026-08-09

英文展示材料补齐（全部非阻断，提升国际传播力维度）。

- 新增 5 张英文图件（assets/figures/*.en.png，标签与中文版同构、仅文字为英文）
- 新增 visual/index.en.html（英文离线展示页，23 项 data-metric 与中文版逐一一致）
- 新增 drawings/a3-booklet.en.pdf（10 页）与 a0-boards.en.pdf（4 页）英文图纸
- manifest 已注册 10 个英文翻译条目（translation_of 链完整），共 40 文件
- self_check 复跑 PASS（formal-review-ready）；participant_preflight PASS（12.6 MiB）

### CI 记录

- 31266255720（首个提交）：failure —— GitHub API 瞬时 404（download_content），基础设施问题（Issue #658），与内容无关
- 31266630783（英文译稿提交）：success
- 31266771056（changelog 提交）：success
- 本次英文材料推送触发的新 run 排队中

## v0.4 - 2026-08-09

证据链增强：官方边界状态决策依据纳入方案。

- 发现维护者决策文档 `docs/data-boundary-decision.md`（2026-07-19）：北京市公共数据开放平台无本项目可验证正式 polygon；组织方数据缺口不阻断内容评分，评审者不得因此扣分
- `sources.json` 新增来源条目 `DATA-BOUNDARY-DECISION`（共 11 条）
- `proposal.md` 与 `proposal.en.md` 边界限制段落加入 `[source:DATA-BOUNDARY-DECISION]` 引用（第 2 章）
- 重渲染 `report/proposal.html` / `report/proposal.en.html`；manifest 哈希已刷新
- self_check 复跑 PASS（formal-review-ready）；participant_preflight PASS

### 官方边界复算待办（外部条件阻塞）

- 已 4 次核查上游（全树搜索 / 提交历史 / Issue/PR / geometry 目录）：官方 polygon 未发布
- 维护者决策文档确认：该数据缺口不阻断内容评分，评审者不得扣分
- 复算执行手册：`/tmp/opencode/recalculation-runbook.md`（8 步流程，触发条件：官方 polygon 发布）
