# 方案迭代记录

## v1.1 - 2026-08-12

- 视觉重做：visual 双页改为「深夜蓝图 × 铁路信号」设计（轨道线站点式章节、信号铭牌指标带、tab 无障碍属性、移动端单列适配、reduced-motion 降级），离线约束与 data-metric 标记不变。
- 数据修正：拆改留概念比例由 11/39/50 更正为与 buildings.geojson 一致的 16/33/51（保留 129 / 改造 259 / 新建 402）。
- 图件修复：metrics-evidence 中文图「公告值 vs 复算」X 轴标签碰撞改为双行短标签；A3/A0 图纸同步重生成。

## v1.0.1 - 2026-08-12

- 无内容变更：CI `submission-validation` 因 runner 侧 SSL 证书错误（`github_pr_validation.py` 下载 PR 文件时 `CERTIFICATE_VERIFY_FAILED: self-signed certificate`）失败，与参赛包内容无关，已开 Issue #2088 报告；本次提交用于重新触发校验。

## v1.0 - 2026-08-12

- 首次正式提交：完成「原点·智轨 ORIGIN LINE」概念方案全流程产物。
- 空间数据：在临时粗略边界（provisional constraint）内完成拓扑安全用地切分（29 地块），派生绿地、公共空间、建筑基底（790 栋）、道路中心线（13 条）、分期（3 期）图层，EPSG:4548 复算全部面积指标。
- 文本：中英双语 proposal（v2 格式 + bilingual contract v1），覆盖公告 1.3/1.4/1.5 与 agent.1–agent.6 全部必选任务。
- 图件与图纸：五张双语展示级图件、A3 文册（9 页）与 A0 展板（2 页）双语 PDF、双语离线 visual 页面。
- 已知限制：官方精确边界与控规条件缺失，全部空间结论为概念建议；待官方数据发布后按生成脚本整体重算。
- 自检：`self_check_submission.py --mark-self-checked --json` 四门全部 PASS（仅临时边界提示性 warning）。
