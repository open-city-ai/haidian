# 版权、来源与生成说明 / Copyright, Provenance and Generation Statement

## 1. 方案文字与原创图形

《京张运行图 · THE CITY TIMETABLE》的方案文字、TimeSlot Contract、场景卡、概念性空间结构、指标组织方式、三处地标名称与本投稿生成的图形版式为本次开源征集所形成的原创/生成内容。除另有明确标注外，不复制其他参赛方案的文字、图纸、标识或视觉资产。

本投稿按 `proposal.md` front matter 声明 `COMMUNITY-DISPLAY-ONLY`，具体展示、评审和后续使用边界以赛事仓库规则为准。

## 2. AI 生成披露

方案由 OpenAI GPT-5.6 Sol 协助生成与结构化，GitHub 人类贡献者为 `andyxu12341`。AI 参与包括资料梳理、概念推演、结构化 JSON/GeoJSON、场景卡、双语文字、指标与合规矩阵以及图件/图纸程序化生成。人类贡献者提出参赛意图并保留最终审阅和判断权。详细披露见 `agent.json`。

## 3. 场地与规划资料

formal 结论优先依赖赛事仓库登记的公开或清权资料。官方公告、Agent 任务书和本地官方标准快照的来源与用途见 `sources.json`。

`brief/site-package/geometry/provisional_boundaries.geojson` 只作为临时粗略约束。提交中的 site boundary 与 key areas 明确标记 `official_boundary=false`、`geometry_role=provisional_constraint`，不得作为官方红线、审批依据或精确面积依据。

## 4. 外部案例

NYC DOT、LADOT、Open Mobility Foundation、Singapore LTA、Transport for London 和 Ville de Paris 的案例仅用于说明时间共享、机器可读规则、受控测试和青年友好公共空间等可迁移机制。外部案例不作为北京法定规划、工程或运营标准。来源链接、访问时间与限制见 `sources.json`。

## 5. 图片、字体与商标

核心五图及其英文版本由本方案根据自有结构化图层和指标程序化生成，不使用第三方摄影、渲染图或竞品图纸。图中不使用未经授权的铁路企业商标、企业 Logo、人物肖像或商业地图截图。

GitHub Actions 构建环境使用系统开源字体用于渲染；字体文件不随投稿再分发。PDF 中文文字使用 ReportLab 可用的 CID 字体映射，仅用于文档呈现。

## 6. 工具链

- Python 3
- Matplotlib：核心信息图程序化绘制
- ReportLab：A3/A0 PDF 程序化排版
- GitHub Actions：可重复构建与提交二进制成果
- 仓库官方 `render_proposal_html.py` / `finalize_submission.py` / `self_check_submission.py` / `participant_preflight.py`：用于最终生成与校验

工具链不改变 GeoJSON、JSON 与来源表作为可核验依据的地位。

## 7. 状态声明

本成果是开源征集概念方案与 formal submission，不代表政府批准、法定规划、工程可行性确认、自动驾驶运营许可、招商承诺或已经实施。官方数据和专业条件补齐后，应按 `assumptions.json` 重新复核。
