# Agent.5 补充 — 导视系统与国际传播文案

> 对应 `brief/site-package/agent_taskbook.json` agent.5 任务：导视系统 + 国际传播文案。

---

## 1. 导视系统设计

### 1.1 设计原则

- **双语优先**：所有导视中英文并列，英文采用 Roboto Mono 等宽字体
- **分层信息**：一级（方向）→ 二级（区域）→ 三级（设施），信息密度递减
- **AI原生**：导视不仅是静态标识，更是交互入口（NFC/二维码/语音）
- **无障碍**：触觉盲文、语音播报、高对比度配色

### 1.2 导视层级

| 层级 | 类型 | 尺寸 | 内容 | 位置 |
|------|------|------|------|------|
| L1 | 城市门户标识 | 3-5m | "京张智能脊 JZS" + 总览地图 | 五道口/大钟寺地铁站出口 |
| L2 | 区域导视 | 2-3m | 区域名称 + 三大功能 + 主要节点 | 众智园/原点/大钟寺入口 |
| L3 | 路径导视 | 1.5-2m | 方向箭头 + 距离 + 预计步行时间 | 步道交叉口 |
| L4 | 节点导视 | 1-1.5m | 设施名称 + 功能说明 + 二维码 | 具体设施前 |
| L5 | 地面导视 | 嵌入式 | 方向箭头 + 区域色带 | 步道地面 |

### 1.3 视觉语言

| 元素 | 规格 |
|------|------|
| 色彩编码 | 众智园=蓝(#0066FF) / 原点社区=绿(#00C853) / 大钟寺=金(#fbbf24) |
| 图标系统 | 线性图标，2px描边，圆角处理 |
| 材质 | 主体：阳极氧化铝+蚀刻；夜间：LED背光+光伏供电 |
| 高度 | 低位(800mm儿童/轮椅) + 标准(1600mm) + 高位(2000mm) |

### 1.4 智能导视功能

- **NFC触碰**：手机触碰获取当前位置AR导航
- **语音交互**："我要去开源发布厅"→语音指引+地图推送
- **实时信息**：显示下一班地铁、当前空气质量、活动倒计时
- **紧急呼叫**：一键呼叫安保/医疗/志愿者

## 2. 国际传播文案

### 2.1 一句话定位

> **Jing-Zhang Intelligent Spine: Where China's first railway meets the future of AI.**

### 2.2 三段落叙事

**Heritage**
In 1909, Zhan Tianyou designed China's first railway — the Jing-Zhang Line — proving that Chinese engineers could innovate on the world stage. Today, that same corridor becomes the Jing-Zhang Intelligent Spine, a 9-kilometer AI innovation belt connecting Tsinghua, Peking University, and CAS with global technology networks.

**Innovation**
The Spine is not a technology park. It is a living laboratory where AI scenarios are tested in real urban space — from autonomous delivery robots sharing subway stations with commuters, to open-source communities publishing code from railway heritage pavilions. Here, researchers walk from lab to lunch past the algorithms they invented.

**Invitation**
We invite global AI researchers, entrepreneurs, and urban innovators to walk the Spine. Contribute to open-source projects in our launch halls. Test your models in our governance sandbox. Pitch to investors in our international roadshow lounge. The century-old railway once connected Beijing to Zhangjiakou. Today, it connects China to the future of intelligence.

### 2.3 多平台文案

| 平台 | 字数 | 文案 |
|------|------|------|
| Twitter/X | 280 | Walk where China's first railway ran. Code where AI's future is written. The Jing-Zhang Intelligent Spine: 9km of innovation from Tsinghua to the world. #AI #UrbanDesign #Beijing |
| LinkedIn | 150 | The Jing-Zhang Intelligent Spine transforms Beijing's century-old railway into a living AI laboratory. We're building the future where heritage meets intelligence. |
| 宣传册 | 500 | （见上方三段落叙事） |

### 2.4 多语言版本

| 语言 | 一句话 |
|------|--------|
| 英语 | Where China's first railway meets the future of AI |
| 日语 | 中国最初の鉄道が、AIの未来と出会う場所 |
| 韩语 | 중국의 첫 철도가 AI의 미래를 만나는 곳 |
| 法语 | Là où le premier chemin de fer de la Chine rencontre l'avenir de l'IA |
| 德语 | Wo Chinas erste Eisenbahn auf die Zukunft der KI trifft |

---

*详细设计说明见 proposal.md §3.2（命名体系）和 §8.3（文化叙事）*
