# 方案迭代记录

## v0.1.1 - 2026-08-09

针对 PR #975 评审（CHANGES_REQUESTED，51/100）的返修清单：

### P0 修复

- **P0 字体渲染**：图件与 PDF 全部改用 Noto Sans CJK SC（SIL OFL 1.1），弃用 DroidSansFallbackFull（缺拉丁字形导致中文方框）；新增中文字体已 sudo 安装，脚本与字体配置持久化于 `/vol3/1000/data/openclaw`。所有 PNG/A3/A0 图件、PDF 重新生成并本地校验。
- **P0 边界诚实性**：所有 raster/PDF 导出统一加 `PROVISIONAL BOUNDARY` 水印；`official_boundary=false` 有效位贯通信矩阵与 `sources.json`。
- **P0 逐项合规**：`compliance_matrix.json` 为每条评审要求补充任务特定证据（报告章节 + GeoJSON 层 + deliverables），不再只依赖全局叙述。
- **P0 资产清权**：`report/copyright_statement.md` 新增附录 A《资产权利台账》，逐项登记字体、图件、空间数据、图标、文本、代码与转换记录；无远程资源引用。

### P1 内容补强

- proposal 新增「重点区 8 列表」「三区两翼」空间结构表述；JZ-01~JZ-06 更新项目增加角色矩阵与责任主体。
- 新增「agent.1–agent.6 专项响应」章节，逐条回应评审要求。
- 10 张场景卡升级为「场景—空间—数据—模型—复核—运营—KPI」七字段闭环表（完整版并入 `report/narrative.md` 附录 A），并含 3 个产业测试验证场景与 5 类用户画像。

### 工程

- 新增 `scenario_matrix.md`、`asset_rights_ledger.md` 两文件因包根目录文件命名受限，内容分别并入 `report/narrative.md`、`report/copyright_statement.md` 后删除，引用同步更新（proposal / proposal.en / compliance_matrix.json）。
- `manifest.json` sha256 随变更重算；`validate_local_submission.py` 本地校验 **PASS**（仅保留已知 provisional-boundary warning）。

### 待办

- 官方 polygons 发布后全量复算几何与 metrics，去掉 provisional 水印与警告。
- 正式提交前完成 `needs_review` 概念图层（land_use/buildings/roads/green_space/public_space/phasing/constraints）的边界核验。