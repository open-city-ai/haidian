# 听得见的断点 / The Audible Break · 数据可听化档案与权利记录

**关联媒体：** `assets/media/audible-break.m4a`（中文旁白版，65.8 秒）· `assets/media/audible-break-en.m4a`（英文旁白版，71.3 秒）；同步字幕 `audible-break.vtt` / `audible-break-en.vtt`
**性质：** OP-04 节点连通性档案数据的可听化（sonification）。概念交付物；程序合成，非实地录音，不产生任何绩效指标数值。

## 一、这是什么

方案的核心命题是 AI 开启与 AI 关闭服务等价。OP-04 的证据链档案（v0.3.0，接口固定口径）里有两组读数：AI 开启状态沿直接路径 243.514 米可达 OP-08；AI 关闭状态下两个点位的物理接口线未声明等价，判定不可达——没有一米可走。本音频把这两组数字翻译成声音——**声音在起点即告静默，静默的位置，就是数据里接口缺失的位置**。数据的另一条感官通道：图版给眼睛（op04-detail），本档给耳朵。

## 二、数据 → 声音映射规则（逐项可核）

| 规则 | 取值 | 核对方式 |
| --- | --- | --- |
| 时间比例 | 1 秒 = 20 米 | 设计常数 |
| 行进声 | 五声音阶（C4/D4/E4/G4/A4 循环）木琴质感短音，每 0.5 秒一响（= 每 10 米一响）；无持续背景音 | 数波形脉冲数 |
| 段一时长（AI 开启全程） | 243.514 ÷ 20 = 12.18 秒 | `seb-op04-chain-data.json` stage_4 BASE_ON 读数 |
| 段二（AI 关闭） | 接口缺席，0 米 = 0 秒——开场即静默 | 同档案 BASE_OFF reachable=false（接口固定口径） |
| 到达音 | 上行三音（G4→A4→C5） | 段一结尾 |
| 断点表达 | 开场 1.6 秒静默 → 110 Hz 低音三响 → 3 秒静默 | 段二全段；静默区实测 RMS = 0（编码后复测仍为 0） |

中文版时间轴：段一（数据音·开启）起点 20.485s · 段二（数据音·关闭）起点 49.405s——**开场即静默** · 全长 65.832s。英文版对应 21.129s / 53.687s / 全长 71.264s。v0.2 档案读数版（30.29 秒行进、4.44 秒中断）已随档案 v0.3.0 的几何修正与口径修订整体重制，本节即现行读数。

## 三、生成方法与权利

- 数据音：纯程序合成（正弦波与包络，Python 标准库），零采样素材、零第三方音源；
- 旁白：MiniMax `speech-2.8-hd` 预置合成音色（中文 Reliable_Executive / 英文 Trustworthy_Man），与包内导览同一权利链（条款存档与快照指纹见 `sources.json`）；
- 无音乐、无实地录音、无真人声音；容器内嵌标题、作者、合成声明与许可指针；
- 许可：随包 COMMUNITY-DISPLAY-ONLY；
- **非观测声明：** 本音频呈现的是桌面复算档案中的两组数字，不是现场测量，不是可达性结论；「断点」的空间前提本身仍待现场审计（档案原文如此登记）。

## Rights and synthesis statement (English summary)

This piece is a **data sonification** of two archived readings from the OP-04 connectivity chain, archive v0.3.0 under the fixed-interface rule (243.514 m reachable with AI on; with AI off the physical interface line carries no equivalence declaration, so not one metre is walkable), at one second per twenty metres — the sound falls silent from the very start, and where the silence sits is where the data holds no interface. Data tones are pure program synthesis (sine waves, standard library, zero samples); narration uses the MiniMax preset synthetic voices under the same registered terms as the package's audio guides. No music, no field recording, no human voice. The silence at the break measures RMS 0. It is a desk-replay rendering, not a field measurement, and the break's spatial premise itself remains pending site audit.
