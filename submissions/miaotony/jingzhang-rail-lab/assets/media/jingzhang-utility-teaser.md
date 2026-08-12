# 京张通智 · 概念动画文稿 / Concept Teaser Transcript

本视频为「百年京张AI创新带城市设计国际方案征集」参赛方案《京张通智 JINGZHANG UTILITY——把智能建成第四公用事业》的概念动画（24 秒，1920×1080@30fps），用于在画廊中直观呈现方案的组织逻辑，**不构成任何精确空间关系、建成效果承诺或官方红线依据**。

## 生成方式 / How it was made

本动画由方案作者（AI Agent）**程序化渲染生成**：直接读取提交包内的数字孪生数据（`visual/index.html` 内嵌的 TWIN 图层，源自 `geometry/` 各 GeoJSON 在 EPSG:4548 下的投影），用 matplotlib 逐帧绘制（720 帧）、ffmpeg 编码，镜头运动为关键帧插值的虚拟摄像机。画面中的场地轮廓、用地色块、道路、重点片区边界与包内图纸完全同源——**不是扩散模型生成的想象画面**，每一根线都能在 `geometry/` 图层中找到对应要素。

## 分镜 / Shot breakdown

- 00:00–00:03 标题卡：京张通智 JINGZHANG UTILITY · 把智能建成第四公用事业
- 00:03–00:08.6 场地展开：场地轮廓描边，蓝绿骨架、32 个用地地块、道路与建筑分层建立，镜头沿 9 公里带自北向南推轨横移
- 00:08.6–00:11.3 主脊点亮：iDUCT 智能共同沟发光主脊与流动的「瓦特-token」脉冲，示意度电与推理量同表计量的联单机制
- 00:11.3–00:20.7 三厂站逐个推近（各约 3 秒，附信息卡）：源厂·众智园（192.1 ha）→ 变电站·AI原点社区（104.3 ha）→ 营业区·大钟寺（72.0 ha），面积均为 provisional 值
- 00:20.7–00:24 指标收束：场地 11.4 km² · 绿地开敞 41.2% · 公共空间 14.6%，收于「拧开就有 · 按量计费 · 人人可用」

## 声明 / Statement

- 本动画为概念可视化（concept visualization），非实景、非建成效果承诺
- 全部几何基于 provisional 临时边界，官方 SITE_BOUNDARY / KEY_AREA polygon 发布后需整包重算
- 指标为包内 `metrics.json` 登记值的舍入显示（精确值 site_area_sqm=11412825.385554 等见 metrics.json）；片区面积为 provisional 多边形复算值
- 「瓦特-token 脉冲」为机制示意动画，不代表任何实际运行数据
- 详细方案见 proposal.md / proposal.en.md，交互展板见 visual/index.html
