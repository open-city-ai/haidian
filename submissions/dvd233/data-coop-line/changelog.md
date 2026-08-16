# 方案迭代记录

## v1.1 - 2026-08-15

P0 evidence and scenario consistency / 指标与场景证据一致性

- Baseline / 基线：证据修订始于 `upstream/main` `683c627c4b2071c13ebc7f569cb4e56d2bc69aad`；发布前持续快进并最终核对至 `c55ef181cbfd1c636b04a644d17c64eaf464d656`。`c8f13bb…c55ef181` 的 7 个提交更新其他投稿并强化空 manifest 审计；目标投稿、Skill 与 brief 无 upstream 变化。强化后的校验器已纳入本轮复验，clean focused branch 为 `codex/data-coop-line-evidence-consistency-v4`。
- Reason / 原因：PR #2540 合并包中的 GeoJSON 与 `metrics.json` 已是新复算结果，但中英正文及其派生 HTML 仍保留旧指标；正文还把场景 01—03 标为产业测试，而 `public_space.geojson` 和离线展示均把 `SCN-04`—`SCN-06` 定义为产业测试。旧文本会让评审者得到与机器证据相反的结论。
- Single source / 单一事实源：投稿 `geometry/*.geojson` 是空间事实入口；面积统一投影到 EPSG:4548 后做多边形联合复算，`metrics.json` 保存派生指标，`visual/assets/evidence-snapshot.json` 保存输入哈希、复算结果、12 个场景注册表与跨载体签名。
- Before → After / 修正前后：
  - building footprint / 建筑基底：`310,807.184 m²` → `40,063.344 m²`;
  - green space / 绿地：`12.3423%` → `2,384,747.221 m² / 20.8953%`;
  - public space / 公共空间：`7.3281%` → `98,164.982 m² / 0.8601%`;
  - industry tests / 产业测试：narrative cards `01–03` → GeoJSON registry `SCN-04` Synthetic-Data Benchmark Cell, `SCN-05` Temporary-Use Licence Cell, and `SCN-06` Controlled-Compute Test Room.
- Carriers / 载体：同步中英 Markdown、派生 HTML、离线 visual 指标卡、双语指标图、A3/A0 PDF、manifest 和持久化 self-check；其余四组核心图视觉内容不变，只写入同一证据签名与发布核验基线以防漂移。双语报告另修复 390 px 下长路径代码造成的横向溢出。PDF 不只更新页脚：A0 第 5 页和 A3 第 6 页的内嵌指标栅格已逐像素替换为当前双语指标图。
- Verification / 验证：`visual/assets/evidence-consistency.js` 在旧载体上先失败，修复后 PASS；发布准备时按最新 main 重签为 `8029358052d72fe32631e868657d5150b5d62348a5ccff3a5a8d92e7f731614b`。EPSG:4548 联合面积复算、12 个场景注册表和全载体检查 PASS；审计器新增无额外仓库依赖的 PDF 内嵌 RGB 栅格校验，能阻止只更新 PDF 元数据而保留旧指标图。四份 PDF 共 24 页以 120 dpi 重渲染并逐页检查，双语标题、数值、页脚、留白和图面无裁切、重叠、乱码或旧 SHA；四份 HTML 在 1440 px 与 390 px 下无坏图、远程资源或横向页面溢出。
- Preflight / 预检：原工作区的管理 DOCX 和不可写远端问题通过新建 clean participant worktree、仅修改投稿目录、配置可写 fork 解决；不删除管理材料、不弱化 scope 检查。ready-package manifest refresh、持久化 self-check 四门、普通 preflight 与 `--check-push` 均 PASS；唯一警告是工作区并非 blobless partial clone，不影响投稿内容或上传权限。
- Remaining boundary / 剩余边界：所有数值仍是临时几何下的概念设计量；官方边界、控规、现状建筑、权属、道路、市政、文保与生态资料到位后必须整体重建拓扑并复算，不能把本次一致性修复理解为官方精度提升。
