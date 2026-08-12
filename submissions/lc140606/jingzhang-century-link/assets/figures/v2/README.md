# v2 视觉包  ·  VISUAL PACK v2

> 在 v1 基础图之上追加的"顶级设计公司水准"升级视觉包。
> 提交 PR：open-city-ai/haidian#1306
> 提交分支：lc140606/haidian:jingzhang-century-link
> 升级时间：2026-08-12

---

## 一、版本说明

| 版本 | 内容 | 设计水准 |
|---|---|---|
| **v1** | 5 张基础 PNG（matplotlib 渲染） | 概念示意 |
| **v2（本包）** | 6 张意向图 + 6 张 SVG 升级图 | 顶级设计团队汇报水准 |

v2 视觉包以 6 张手绘意向图锚定项目气质（铁路遗产、AI 园区、公共空间），以 6 张 SVG 升级图替换 v1 的概念示意，传达与顶级设计团队（MAD / Aedas / KPF / SOM / gmp / Foster Partners）汇报同等的设计语汇。

---

## 二、意向图  INTENTIONS（6 张）

存放在 `assets/figures/v2/intentions/`，每张均为参考性质、不构成设计成果，用于锚定项目气质与设计意图。

| 编号 | 文件 | 主题 | 设计意图 |
|---|---|---|---|
| REF-01 | `ref-01-jingzhang-rail-1909.jpg` | 京张铁路青龙桥（人字形展线，1909） | 历史性 / 工程诗意 |
| REF-02 | `ref-02-haidian-ai-lab.jpg` | 海淀 AI 实验室 / 现代科研园区 | 当代 AI 园区气质 |
| REF-03 | `ref-03-public-space.jpg` | 现代城市公共空间 / 蓝绿景观 | 公共空间设计锚点 |
| REF-04 | `ref-04-data-center.jpg` | AI 算力数据中心 / 现代建筑 | 智算基础设施意象 |
| REF-05 | `ref-05-qinghua-station.jpg` | 清华园火车站（京张铁路遗产） | 在地遗产延伸 |
| REF-06 | `ref-06-zhongguancun-park.jpg` | 中关村 AI 创新园 / 智慧园区 | 科创社区样板 |

---

## 三、SVG 升级图  UPGRADED FIGURES（6 张）

存放在 `assets/figures/v2/svg/`，对应顶级设计公司 A3 汇报册的关键图纸。

| 编号 | 文件 | 主题 | 配套汇报页 |
|---|---|---|---|
| F-V2-01 | `01-location-analysis.svg` | 区位分析（宏观—中观—微观） | 区位 · SHEET 01 |
| F-V2-02 | `02-zhongzhi-park.svg` | 众智园节点（总平面 + 剖面 + 设计要点） | 节点 · SHEET 02 |
| F-V2-03 | `03-ai-origin.svg` | AI 原点社区节点（三类街区） | 节点 · SHEET 03 |
| F-V2-04 | `04-dazhongsi.svg` | 大钟寺节点（文化叙事 + 设计要点） | 节点 · SHEET 04 |
| F-V2-05 | `05-rendering-zhongzhi.svg` | 众智园效果图（日景 + 夜景 + 人视） | 效果图 · SHEET 05 |
| F-V2-06 | `06-rendering-dazhongsi.svg` | 大钟寺效果图（中轴黄昏） | 效果图 · SHEET 06 |

每张 SVG 升级图均包含：
- 顶部条带标题（项目名 / 子标题 / 个人署名 / 页码）
- 主图区（总平面 / 节点 / 效果图）
- 剖面 / 详图 / 设计要点（右侧栏）
- 关键指标（数据、面积、长度、高度）
- 指北针 + 比例尺
- 底部 © 版权行

---

## 四、关键设计数据（与 SVG 图严格对应）

### 区位（F-V2-01）
- 协同研究范围：43.6 km²
- 总体设计范围：11.4 km²
- 重点设计面积：368.4 ha
  - 众智园 192.1 ha
  - AI 原点社区 104.3 ha
  - 大钟寺 72.0 ha
- 京张铁路遗产廊道：≈ 11.4 km · 8 处遗产点

### 节点（F-V2-02 / 03 / 04）
| 节点 | 面积 | 核心要素 |
|---|---|---|
| 众智园 | 192.1 ha | 12 000 m² 中央林荫广场 / 40 m 智算云台 / 3.0 km 运动环 |
| AI 原点社区 | 104.3 ha | 80×110 m 街区尺度 / 1.2 km 中轴走廊 / 底层开放 ≥ 60% |
| 大钟寺 | 72.0 ha | 永乐大钟 46.5 t / 1.2 km 中轴钟声步道 / 控高 ≤ 9 m |

### 效果图（F-V2-05 / 06）
- 智算云台：40 m / 钟声照明 + 顶冠光束
- 永乐大钟寺中轴：黄昏 17:30 — 18:30 钟声仪式

---

## 五、文件结构

```
assets/figures/v2/
├── README.md                          ← 本文件
├── intentions/                        ← 6 张意向图（jpg）
│   ├── ref-01-jingzhang-rail-1909.jpg
│   ├── ref-02-haidian-ai-lab.jpg
│   ├── ref-03-public-space.jpg
│   ├── ref-04-data-center.jpg
│   ├── ref-05-qinghua-station.jpg
│   └── ref-06-zhongguancun-park.jpg
└── svg/                               ← 6 张升级图（svg）
    ├── 01-location-analysis.svg
    ├── 02-zhongzhi-park.svg
    ├── 03-ai-origin.svg
    ├── 04-dazhongsi.svg
    ├── 05-rendering-zhongzhi.svg
    └── 06-rendering-dazhongsi.svg
```

---

## 六、约束声明

- 所有意向图均为参考、不构成设计成果，仅用于锚定项目气质。
- SVG 升级图遵守征集包硬约束：provisional_constraint boundary · official_boundary=false · no FAR / height / density numbers · 11.4 km² 边界外不展开。
- 智算云台 40 m、街区高度指标均为概念示意；具体指标以官方控规与上位规划为准。

---

© 2026 lc140606（个人提交）
提交者：刘春华（lc140606）
征集：百年京张 AI 创新带城市设计开源征集
