# 京张开源主线 OPEN-MAINLINE — 投稿包说明

百年京张AI创新带城市设计开源征集 · 方案包（submissions/ComputerDreammer/jingzhang-open-mainline/）

## 方案一句话

把 9 公里京张铁路遗址公园绿廊读作一条“城市开源主分支”：轨道即提交，站点即发布，三区两翼对应 FORK / ORIGIN / MERGE / TEST / DEPENDENCY。

## 包内容

| 类型 | 文件 |
|---|---|
| 主方案 | proposal.md（中文主稿）· proposal.en.md（英文完整译稿，bilingual_contract v1） |
| 报告 | report/proposal.html · report/proposal.en.html · report/copyright_statement.md |
| 展示 | visual/index.html · visual/index.en.html（离线可用，无外部依赖） |
| 图纸 | drawings/a3-booklet.pdf · drawings/a0-boards.pdf（含 .en 版本） |
| 图件 | assets/figures/*.png（5 项核心图，中英各一） |
| 空间数据 | geometry/*.geojson（10 层，EPSG:4326，面积按 EPSG:4548 复算） |
| 结构化证据 | manifest.json · agent.json · metrics.json · sources.json · assumptions.json · compliance_matrix.json · standard_matrix.json · design_depth_matrix.json · self_check.json |
| 记录 | changelog.md |

## 数据边界（重要）

- 全部几何为 **provisional 概念边界**（geometry_role=provisional_constraint，official_boundary=false），不替代官方红线、审批依据或精确面积依据。
- 未给出容积率、建筑高度、具体拆改留、道路红线或工程实施结论；涉及内容一律以待确认条件或概念建议表述。
- 全部来源登记于 sources.json；生成方法见 report/copyright_statement.md。

## 提交前必须完成（官方流程）

在具备 Python/git 的环境中：

```bash
python3 -m pip install -r requirements-review.txt
python3 scripts/finalize_submission.py submissions/ComputerDreammer/jingzhang-open-mainline
python3 scripts/self_check_submission.py submissions/ComputerDreammer/jingzhang-open-mainline --pr-author ComputerDreammer --mark-self-checked --json
python3 scripts/participant_preflight.py submissions/ComputerDreammer/jingzhang-open-mainline --pr-author ComputerDreammer --check-push
```

修复所有 blocker 后，在 fork 中发起仅修改本目录的 Pull Request。官方脚本重跑后，manifest.files[].sha256 与 self_check.json 会由工具刷新（本包当前哈希为定稿时计算，脚本运行后以脚本结果为准）。

## 概念与空间结构速览

- 一主线：9 公里开源主脊（COMMIT 开发者步道）。
- 三节点：众智园 FORK / AI原点社区 ORIGIN / 大钟寺 MERGE。
- 两翼：中关村 DEPENDENCY 科技服务翼 / 小月河 TEST LOOP 场景赋能翼。
- 分期：启动期（原点+中段）→ 成长期（众智园+北段）→ 成熟期（大钟寺+南段），无绝对年份。
- 指标：绿地率约 18.3%、留白约 4.6%、12 个 AI 场景节点、4 个朝圣地标（均为 provisional/概念口径）。
