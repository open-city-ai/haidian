# 方案迭代记录

## v1.1 - 2026-08-08

### 改动摘要
- 按 PR #70 Review Agent（71/100）反馈重做 A0：三张展板采用真实 A0 竖版尺寸并填满有效版心，消除原版下部大面积空白。
- 重绘 `mobility-bluegreen.png`：右栏改为固定安全区、中文自动换行，消除文字裁切；同步重生成 A3/A0。
- 统一状态：`self_checked=true` 仅代表包级四项 gate 已运行通过；聚合 `data_confidence=low`，全部空间面积/比率明确为 provisional 复算，不是官方或法定结论。
- 在允许的 `report/copyright_statement.md` 内新增逐资产权利登记，逐项记录生成方式、输入、外部嵌入、许可与复核方法；扩充版权声明。
- 新增 `risk.json`，把隐私、实施、公众接受、运维、政策、空间争议、技术成熟度、公平性纳入人工复核。

### 采纳反馈
- 完整采纳维护者关于 A0 空白、交通蓝绿图裁切、状态矛盾和版权证据不可审查的四项整改要求。

### 待官方资料后复核
- SITE_BOUNDARY 与三处 KEY_AREA 仍是仓库 provisional geometry；官方多边形发布后必须替换并联动重算 GeoJSON、metrics、PNG、PDF、HTML 与矩阵。
- 容积率、高度、拆改留、权属、道路红线、设施容量和工程可行性仍待专业与法定程序确认。

## v1.0 - 2026-08-07
- 首次正式方案包；PR #70 合并入库，Review Agent 71/100。
