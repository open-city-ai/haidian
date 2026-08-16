# 万感京张 多感官导览 · 旁白文字稿与权利记录

**关联媒体：** `assets/media/audio-guide.m4a`（音频，AAC-LC，单声道 32 kHz / 64 kbps，时长 2 分 34 秒）
**同源字幕：** `assets/media/audio-guide.vtt`（UTF-8 WebVTT，26 条字幕，时间轴由实测合成结果生成）
**英文字幕轨（配中文音频）：** `assets/media/audio-guide-en.vtt`（UTF-8 WebVTT，26 条字幕，时间轴与 `audio-guide.vtt` 同源，文本为同一旁白的英文翻译，供收听中文音频的英文读者对照）/ **English caption track (for the Chinese audio):** `assets/media/audio-guide-en.vtt` (UTF-8 WebVTT, 26 cues, timing identical to `audio-guide.vtt`, translated from the same narration, for English readers following the Chinese audio).
**英文语音版：** `assets/media/audio-guide-en.m4a`（AAC-LC，单声道 32 kHz / 64 kbps，时长 3 分 14 秒；MiniMax `speech-2.8-hd` 预置英文合成音色 `English_Trustworthy_Man`，与中文版同一逐句合成-固定间隔拼接工艺）；其同步字幕为 `assets/media/audio-guide-en-voice.vtt`（26 条，时间轴由英文语音实测样本长度精确累加，与英文音频严格同步）/ **English voice edition:** `assets/media/audio-guide-en.m4a` (AAC-LC, mono 32 kHz / 64 kbps, 3 min 14 s; MiniMax `speech-2.8-hd` preset English synthetic voice `English_Trustworthy_Man`, same per-sentence synthesis and fixed-gap concatenation as the Chinese edition), with its synchronised captions in `assets/media/audio-guide-en-voice.vtt` (26 cues, timing accumulated from measured English sample lengths).
**内容语言：** 简体中文
**性质：** 概念建议性质的方案陈述，非官方发布、非审批结论、非实景记录

---

## 一、本文件的作用：同一内容的三条并行通道

本方案的核心主张是"AI 开启与 AI 关闭，服务应当等价"，并要求关键信息不得只存在于单一感官通道。该主张若只写在文本里而不作用于方案自身的交付物，即为空话。因此本次多模态交付按同一原则组织，同一段导览内容通过三条通道等价提供：

| 通道 | 载体 | 适用情形 | 是否依赖音频播放 |
| --- | --- | --- | --- |
| 听 | `audio-guide.m4a` | 视觉受限、阅读困难、行进中或不便阅读屏幕 | 是 |
| 看 | `audio-guide.vtt` | 听觉受限、静音环境、需要逐句定位 | 否（随播放器显示） |
| 读 | 本文件第三节全文 | 无播放条件、断网离线、需要检索或引用、屏幕阅读器逐段朗读 | 否 |

三条通道承载完全相同的表述，用词一致，不存在"音频版更完整"或"文字版为摘要"的层级差。任一通道单独使用，均可获得导览的全部信息。这与方案中"双通道信息冗余率"与"AI 开关服务等价差"两项指标所要求的行为一致。

音频不设自动播放，须由使用者主动触发；播放控件应可用键盘操作。本文件在没有任何播放能力的环境下（纯文本终端、打印稿、屏幕阅读器、离线只读）仍然完整可用，构成音频内容的等价退出路径。

---

## 二、内容来源

旁白文本为本方案原创撰写，内容全部提炼自同一投稿包内的 `proposal.md`，不引入该文件之外的新主张、新数据或新承诺。对应关系如下：

| 旁白段落 | `proposal.md` 对应内容 |
| --- | --- |
| 检验标准（段 1） | 《设计依据与资料清单》开篇的核心判断：城市智能程度由不同身体、感官与认知方式的人能否独立理解、选择、完成并退出同一项服务来检验 |
| AI 开启与关闭等价（段 2） | 全案底线原则，以及《京张文化、中关村文化与 AI 新文化的多感官叙事》中"AI ON = AI OFF"的表达要求 |
| 空间骨架（段 3） | 《三层范围工作框架》：一条通用可达底线、三座多感官实验院、两翼支持网络、十个独立完成点 |
| 三区两翼分工（段 4） | 《三层范围工作框架》中三区两翼布局单元与本方案空间动作的对照表 |
| 十个独立完成点与指标（段 5） | 十个独立完成点的界面定义，以及独立完成率、双通道信息冗余率、AI 开关服务等价差三项指标 |
| 边界声明（段 6） | 《设计依据与资料清单》关于边界、面积与结论效力的限定表述 |
| 收尾句（段 7） | 品牌国际传播句 One city. Many ways to sense it. 的中文表达"一座城市，多种感知，共同行走" |

旁白中出现的机构名称、区域名称与功能表述，均来自项目公告与智能体任务书在 `proposal.md` 中的引用；其中"本方案对应角色"属于设计判断，不代表官方分工或既定安排。旁白未引用任何第三方文字、访谈、口述或档案材料。

---

## 三、旁白全文（含时间码）

时间码格式为 `分:秒`，对应 `audio-guide.m4a` 与 `audio-guide.vtt`。

### 00:00.00 — 开场

> 万感京张，多感官导览。
> 本段旁白由计算机语音合成。

### 00:06.05 — 检验标准

> 一座城市的智能程度，不应由设备数量或自动化率定义。
> 而应由不同身体、不同感官、不同认知方式的人，能否独立理解、选择、完成并退出同一项城市服务来检验。
> 通用设计因此不是末端补救，而是产业、空间与治理的共同主线。

### 00:26.31 — AI 开启与 AI 关闭的等价

> 全案的底线原则是，AI 开启与 AI 关闭，服务应当等价。
> 任何面向公众的服务，在断网、断电或拒绝授权时，都应保留一条等价的完成路径。
> 铸刻文字、盲文、触觉浮雕、固定导视与现场人工求助，不依赖系统运行。
> 系统关闭时，信息不会消失，任务仍然可以完成。
> 衡量它的指标是 AI 开关服务等价差，即自动化关闭前后完成率之差。

### 00:56.87 — 空间骨架

> 总体骨架是一条通用可达底线、三座多感官实验院、两翼支持网络、十个独立完成点。
> 底线沿京张遗址公园组织南北连续的公共体验。
> 它提供直接的多模态路径，也提供一条低刺激替代路径，供对声光刺激敏感的人使用。

### 01:15.44 — 三处重点区域的分工

> 三处重点区域各司其职。
> 众智园承担验证，公开通用接口的测试状态、人工接管点与失败样本。
> 北京 AI 原点社区承担共同设计，由居民与使用者参与，检验服务在日常生活中的可用性。
> 大钟寺承担采用，检验采购、维护、纠错与退出，并保留现金与人工替代。
> 中关村科技服务翼接入技术、人才、资本与专业服务，小月河场景赋能翼提供开放场景与真实反馈。

### 01:49.03 — 十个独立完成点

> 十个独立完成点，把抽象的场景描述变成可识别、可停留、可测试、可退出的公共界面。
> 它们同时是评价装置：独立完成率、双通道信息冗余率、AI 开关服务等价差，都在这些点上反复测量。
> 现阶段没有现场基线，全部数值标记为待测。

### 02:10.75 — 边界

> 本方案为概念建议。
> 图中边界不是官方红线，面积不是法定或精确面积。
> 空间动作不构成控制性详细规划、工程设计或审批结论，也不代表任何已有安排。
> 本段旁白由系统语音合成，无真人录音、无采样音乐、无实地录音。

### 02:30.65 — 收尾

> 一座城市，多种感知，共同行走。

（全长 02:34.02）

---

## 四、生成工具与制作方法

| 项目 | 记录 |
| --- | --- |
| 语音合成工具 | MiniMax 语音合成服务，模型 `speech-2.8-hd`，经官方命令行工具 `mmx` 1.0.7 调用 |
| 语音音色 | 中文版：MiniMax 预置合成音色 `Chinese (Mandarin)_Reliable_Executive`（男声）；英文版：MiniMax 预置合成音色 `English_Trustworthy_Man`（男声）。均按该服务条款授权使用；为服务商提供的通用合成音色，非声音克隆、非对任何特定自然人声音的复制 |
| 文本作者 | 投稿参与者原创撰写，内容源自本投稿包 `proposal.md` |
| 制作方法 | 旁白按句切分为 26 个独立单元逐句合成，再按固定间隔拼接为整段：句间静音 0.18 秒，段间静音 0.55 秒，无额外尾部静音 |
| 中间格式 | 单声道 16 位 PCM，32 kHz |
| 发布编码 | AAC-LC，单声道 32 kHz，64 kbps，MPEG-4 音频容器（`.m4a`） |
| 字幕时间轴 | 非人工估读，由逐句合成的实际样本长度与静音间隔精确累加得到，与音频严格同步 |
| 音乐与音效 | 无。全片仅有合成语音与静音间隔，不含背景音乐、音效、环境声或任何采样素材 |
| 实地录音 | 无。不含现场环境声、人群声、交通声或任何在真实场地采集的声音 |
| 后期处理 | 无降噪、无压限、无均衡、无混响、无变调处理；除拼接与容器转码外未作任何音频修饰 |
| 质量校验 | 对最终 `.m4a` 解码回 PCM 后逐段核对：26 个语音段能量一致（RMS 2776–3614）且无空段，句间间隔为纯静音，编码前后时长一致（154.02 秒） |

---

## 五、权利、合成状态与人物声明

- **容器元数据（2026-08-15 补）：** 中英两版音频容器内嵌标题、作者、合成声明与许可指针，脱包流转仍可溯源；重封装仅复制流不重编码，时长与音频内容不变。
- **合成声明：** 中英两版音频均为计算机语音合成产物，不含真人录音。旁白声音由 MiniMax 语音合成服务（模型 speech-2.8-hd，经官方命令行工具 mmx 调用，中英各一预置合成音色）生成，不对应任何真实自然人，不是任何人物的声音复制、模仿或克隆，也不代表任何机构发言人。
- **人物与肖像：** 音频不涉及任何可识别的自然人，无访谈、无口述、无第三方语音素材，不涉及肖像权、声音权或个人信息。
- **音乐与素材：** 不使用任何第三方音乐、音效库、采样素材或受版权保护的录音，因此不存在音乐或录音的授权问题。
- **文本权利：** 旁白文本由投稿参与者原创，与 `proposal.md` 同源，不含第三方受版权保护文字的引用或改写。
- **商标与名称：** 旁白提及的区域与机构名称仅用于说明方案对象与设计判断，不构成商标使用、合作关系声明或授权背书。
- **许可：** 随本投稿包整体适用 `COMMUNITY-DISPLAY-ONLY`，即仅用于本次征集的社区展示与评审场景。
- **非观测声明：** 音频内容是设计陈述，不是现场观测记录、不是实测数据、不是居民意见征集结果，不得作为现状证据引用。

---

## 六、已知限制

1. **合成语音的固有限制。** 合成语音在长句、专有名词与多音字上的语调与切分可能不够自然，个别术语的重音位置可能与专业口语习惯不同。该音频用于信息传达，不用于替代专业配音或正式播报。
2. **语言与音色覆盖。** 提供简体中文普通话版与英文合成语音版（各一种预置音色），未提供方言版本或更多音色；两版文本同源（第三节全文及其英文翻译），中文版另配英文对照字幕轨。
3. **未覆盖的无障碍通道。** 本次未提供手语视频与易读（Easy Read）改写版本。方案主张此类版本须由相应使用者群体参与评估后方可发布，在缺少该条件前不以机器生成结果充数。
4. **内容为概念阶段结论。** 旁白中的空间骨架、区域分工与指标定义均属概念建议。截至制作时，本方案没有官方精确边界、现场无障碍审计数据与真实用户任务基线，全部指标数值标记为待测，音频中不出现任何目标值或已达成结论。
5. **不构成承诺。** 音频不代表任何政府部门、运营主体或第三方的决策、批准、采纳或实施安排。

---

## Rights and synthesis statement (English summary)

This audio guide ships in two fully **synthetic text-to-speech editions** — Chinese (preset voice "Chinese (Mandarin)_Reliable_Executive") and English (`audio-guide-en.m4a`, preset voice "English_Trustworthy_Man") — both produced with the MiniMax text-to-speech service (model `speech-2.8-hd`, via the official `mmx` CLI) under the terms of that service, with the same per-sentence synthesis and fixed-gap concatenation method. It contains **no human voice recording, no voice cloning or imitation of any real person, no music, no sampled audio, and no field recordings**. The narration script was written by the submitting participant and derives entirely from `proposal.md` in this submission package.

The spoken content, the WebVTT captions (`audio-guide.vtt`) and the full transcript in section 3 above carry **identical wording**, so the guide can be used through hearing, reading captions, or reading text alone — an application of the proposal's own "AI ON = AI OFF" and dual-channel redundancy requirements to its own deliverables.

The content is a **conceptual design statement**. It is not an official rendering, not an approved plan, not a record of built conditions, not measured evidence, and not a statement of verified resident opinion. Boundaries and areas mentioned are not legal or surveyed figures, and no metric target values are asserted.
