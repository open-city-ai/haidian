# 方案迭代记录

## v0.3 - 2026-08-13

针对 PR #1321 AI 评审反馈的修复（changes-requested）：

- **指标真实复算与统一**：将绿地率从误值 0.1984 修正为 EPSG:4548 投影复算的真值 0.192099（19.2%）；众智园 192.1 ha 笔误改为 192.9 ha（与 metrics.json 一致）；重点区 368.4 ha 保留公告名义并加注 "provisional 几何复算约 369.3 ha（+0.24%）"。
- **英文图件缺字根治**：渲染字体从 `Segoe UI`（不含 CJK）改为 **Noto Sans SC（SIL OFL 1.1）**，同时覆盖拉丁与中文，全部 10 张主题图与 3 张节点详图均无方框。
- **图纸信息架构重做**：5 张主题图差异化渲染（site-overview / land-use-structure / key-areas / mobility-bluegreen / metrics-evidence 分别突出全要素 / 用地+分区标注 / 重点区高亮+功能 / 道路+绿道标注 / 指标 chips）；新增 **6 张节点详图**（众智园 / 原点社区 / 大钟寺，各 zh+en，独立 zoom 到重点区 polygon + 标注 4 个具体空间功能）。
- **视觉页面修复**：visual/index.html 与 index.en.html 的 SVG 节点标签按语言切换（en 用 Wudaokou/Zhongzhiyuan/Dazhongsi）、`<h2>` 标题去重（不再出现 "Three-Level Scope Three-Level Scope"）、CSS 字体改为 Noto Sans SC。
- **证据合同清理**：`[source:MISSING-DATA]` 全部改为 `[assumption:A-REGULATORY-PENDING-001]`；`standard_matrix.json` 中两条重复的 `MNR-LAND-USE-CLASSIFICATION-*` 合并为一条，统一编码说明（1401/0802/0601/0901/0701/0702 六类）；`design_depth_matrix.json` 同名源标记替换。
- **任务书缺口修补**：proposal.md 新增"区域协同映射"段（北纬社区 / 未来科学城 / 怀柔科学城 / 经开区 / 京津冀五区对象—能力—通道—项目映射）；12 张 AI 场景卡表格增强为 6 列（增加"运营主体（拟）"与"数据来源与边界"列）；8 个国际案例新增"来源状态"列并注册 `DATA-SRC-PUBLIC-CASE-LITERATURE`。
- **逐资产版权清单**：copyright_statement.md 新增 §3a asset rights ledger（9 类资产的生成方式、权利状态、许可/署名）；字体由"微软雅黑"声明改为"思源黑体 SIL OFL 1.1"。
- **PDF 重生成**：A3 booklet 从 6 页扩到 11 页（含 3 张节点详图），A0 仍为 4 宫格；中英双版用 Noto 重新渲染。
- **manifest 重算**：47 文件 sha256 全部重新计算（新增 6 张节点图，旧 41 文件因内容改动全部 hash 刷新），iteration 升到 v0.3。

## v0.2 - 2026-08-10

- 替换 scaffold 占位为完整正式方案："双轨智带（JZ-AI Belt）"概念主线；
- 生成 9 个正式 design 几何图层（site_boundary / key_areas / land_use / green_space / public_space / buildings / roads / phasing / constraints），15 个 land_use 地块完整覆盖 provisional site；
- 计算 16 项 metrics（EPSG:4548 投影复算），FAR 与建筑高度因官方控规缺失列为 status=unknown；
- 渲染 5+5 张专业设计图（中英双语，1680×1180，含图例/标题/provisional 提示/节点 callout）；
- 生成 A3 文册与 A0 展板 PDF（中英双语版）；
- 写完 proposal.md（中文，13 章节）与 proposal.en.md（英文，13 章节）；
- 写完 compliance_matrix.json（22 项需求覆盖）、standard_matrix.json（5 条专业标准）、design_depth_matrix.json（15 项设计深度）、assumptions.json（8 条假设）、sources.json（8 项来源）；
- 删除 SCAFFOLD-DRAFT 标记；package_state 设为 ready_for_review；
- 修复 land_use_code/building_type/road_class/layer 白名单一致性问题。

## v0.1 - 2026-08-10

- 初始化参与工作区，运行 scaffold_ai_submission.py 生成骨架；
- GitHub 凭据：通过 GitHub connector（connected），fork 仓库 403 暂受阻于 integration 权限（content:write 但无 fork 权限），待用户授权或 PAT 补齐后开 PR。