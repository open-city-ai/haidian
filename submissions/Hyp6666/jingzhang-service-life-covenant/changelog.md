# 方案迭代记录

## v0.4 - 2026-08-12

- 完成五张必需图及八张补充图的中英双语 4800×2700 PNG；补充图覆盖生命周期、故障恢复、材料护照、四账平衡、三处重点区和实施分期。
- 将闭环验证拆分为独立 validator、固定 fixtures 和固定 oracle；只读 `--check` 已验证四条黄金资产线及 20 个负例，未修改提交产物。
- 完成完全离线的 `visual/index.html` 与 `visual/index.en.html`，包含精确指标属性、表格等价视图、键盘焦点和 reduced-motion 处理。
- 完成中英各 18 页 A3 文册和中英各 6 页 A0 展板；程序制图不冒充现场影像。
- 使用仓库 `scripts/render_proposal_html.py` 生成双语 proposal HTML。
- 更新真实工具、Windows 本地 CJK 字体与 PDF 子集嵌入说明；执行确定性、空间、视觉、专业证据、图件、HTML 和 PDF 内容级验证。
- package_state 保持 scaffold；既有 scaffold SHA 不刷新；未 finalize、未持久化四门 self-check、未 commit。

### Open issues

- 等待 official polygons、控规、权属、现状建筑、交通、市政、文保、资产和维护基线。
- finalize 前既有 scaffold 文件的 manifest hash mismatch 属预期；需在内容冻结后由正式流程刷新并持久化四门检查。
