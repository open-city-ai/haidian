# 方案迭代记录

## v0.2 - 2026-08-12

深化迭代（多模态与可读性强化）：
- 新增自定义封面 `assets/media/cover.webp`，以「铁轨→智轨」母题设计，登记 `manifest.cover_image`；不暗示官方渲染、获批或建成。
- 在 `visual/index.html` 内嵌本地离线 Canvas 交互（智轨廊道）：绿廊主轴、三座车站节点、青龙桥「之」字形创新回路与数据流粒子动画，支持播放/暂停、键盘操作、`prefers-reduced-motion` 与静态回退；无 CDN、无远程资源。
- 新增风险矩阵 `risk.json`，以 1–5 分说明数据隐私、实施复杂度、公众接受度、运维成本、政策不确定性、空间争议、技术成熟度、公平包容性风险。
- 四道自检门槛重新全部 PASS，`self_checked=true`。

## v0.1 - 2026-08-12

初始提交（PR #2068 已合并）：
- 生成 formal 双语概念方案包（proposal.md / proposal.en.md），覆盖公告 1.3/1.4/1.5 与 agent.1–agent.6。
- 9 个 GeoJSON 图层（land_use 无缝隙无重叠，EPSG:4548 面积复算）、5 张双语图件、A3 文册、A0 展板、离线可视化页与三矩阵。
- 四道自检门槛全部 PASS；CRLF 行尾哈希修复后 CI `submission-validation` PASS，PR #2068 合并。
- 采用 provisional 临时粗略边界；official 多边形到位后统一复算。
