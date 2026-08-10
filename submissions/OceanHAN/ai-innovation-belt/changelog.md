# 方案迭代记录

# Changelog — 京张主线 JINGZHANG MAINLINE

## v0.1 - 2026-08-10

**总体概念**：京张主线 JINGZHANG MAINLINE——把京张铁路（中国人自主设计的第一条干线铁路）与开源协作主线-分支-合并流程双重融合，城市更新第一次以 Pull Request 方式协作。

### 本版内容
- 空间骨架：一主线（约 8.7 km 主线绿道）· 三 Merge 节点（CI.Yard 众智园 / Kernel 原点社区 / Release 大钟寺）· 双翼（Registry 中关村服务翼 / Staging 小月河场景翼）
- 用地结构：52 个地块无缝覆盖（gap=0、overlap=0），科研 22.3% / 教育 21.5% / 商业 25.6% / 居住 19.6% / 绿地 11.1%
- 12 张 AI 场景卡（含 4 张产业测试验证）、6 类用户画像、4 处朝圣地标、8 个更新项目、三期实施框架
- 双语完整包：proposal.md / proposal.en.md、report HTML（中英）、visual index（中英）、A3 文册与 A0 展板（中英）、5 张图件（中英）
- 全部 known 指标由提交几何在 EPSG:4548 复算；控规五要素与道路红线标注 pending_official_control

### 边界与数据状态
- 基于组织方临时粗略边界（provisional_rough）：仅用于生成、展示与临时自检，官方红线发布后整包重算
- 缺官方精确 polygon、控规条件、现状建筑与权属、市政管线等数据（见 assumptions.json）

### 待后续迭代
- 官方边界/控规数据发布后重算几何与指标
- 依据评审反馈与 Issues 修订概念、场景与运营机制
- 参考 peer proposals 的可复用方法（许可允许范围内）
