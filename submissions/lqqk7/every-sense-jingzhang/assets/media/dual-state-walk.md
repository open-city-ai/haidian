# 双态漫游 / Dual-State Walk · 文字稿、生成档案与权利记录

**关联媒体：** `assets/media/dual-state-walk.mp4`（65 秒，1280×720，H.264 + AAC）；同步字幕 `dual-state-walk.vtt`（中文）/ `dual-state-walk-en.vtt`（英文）
**性质：** 概念意象短片。三组 AI 生成场景图各以同一机位呈现「AI 开启 / AI 关闭」两态。**不是建成效果承诺、不是效果图交付、不是实景记录**；片内每帧恒显「概念意象 · AI 生成 · 非建成效果承诺」角标。

## 一、结构与旁白（时间码见字幕轨）

开场卡（0–9s）→ S1 主脊双态（9–26s）→ S2 缝合区双态（26–39.5s）→ S3 大钟寺市场双态（39.5–53.5s）→ 结尾卡（53.5–65s）。每场景先 ON 后 OFF，同一机位硬切——对比即论点：流光熄灭后，盲道、铸刻导视、值守与现金人工柜台仍在，通行继续。OFF 段垫入「听得见的断点」同源五声音阶行进音（数据可听化档案见 `audible-break.md`）。

## 二、生成档案

- **场景图**：OpenAI 图像生成，经 Codex CLI 原生生图工具由 GPT-5.6 Sol 代理调用（workspace-write 沙箱），英文提示词；三场景 × 双态共六帧，1536×1024。
- **两轮人工审改**（提交方过目后指令）：①场景 3 地标由泛化钟楼改为大钟寺大钟楼真实形制（上圆下方：圆攒尖顶 + 方形红墙殿身 + 白石台基）；②场景 1/2 补入既有设计系统的「流光导引」——ON 态青绿流光嵌地、OFF 态同槽熄灭，与包内 S1 双态图版视觉语言一致。首版六帧留档未用。
- **标注与合成**：手写 HTML 标注层（页眉带、双语场景题、状态条、恒显角标）经 Chromium 渲染为 1920×1080 帧；ffmpeg zoompan 缓推 + 硬切合成；开场/结尾卡同一设计系统。
- **旁白**：MiniMax `speech-2.8-hd` 预置音色 `Chinese (Mandarin)_Reliable_Executive`（与包内导览同一权利链）；无音乐、无实地录音、无真人声音；OFF 段音床为本包程序合成的五声音阶行进音。
- **提示词要点**：黄昏自然光、包内色板（深青/珊瑚/盲道金）、多样使用者（轮椅、白杖、长者、亲子）、OFF 态为「平静如常」而非灾难叙事；提示词不引用任何第三方作品或风格名；唯一图像参照为包内自有设计元素描述。

## 三、权利与诚实边界

- 六帧场景图为 AI 生成概念意象，输出权利依据 OpenAI 服务条款（存档快照与内容指纹见 `sources.json`）；旁白权利同包内导览；容器内嵌标题、作者、合成声明与许可指针；随包 COMMUNITY-DISPLAY-ONLY。
- **非观测声明**：片中空间、建筑、人物、光效均为概念想象，不是建成效果、不是工程依据、不代表任何审批或承诺；大钟楼为按真实形制的意象呈现，非测绘复原；全部包容性指标待实测（unknown）；空间判断以 GeoJSON 与图版为准。

## Rights and synthesis statement (English summary)

A 65-second concept vision film: three AI-generated scene pairs, each shown AI-on then AI-off from the same camera — the cut is the argument: when the flowing light goes out, the tactile strip, engraved signage, stewards and cash counters remain. Scene images were generated via the Codex CLI native image tool (OpenAI image generation) with two human-directed revision rounds (authentic Dazhongsi bell-tower form; the flowing-light guide added per the package's design system); annotation and cards are hand-written HTML in the package design system; narration uses the package's registered MiniMax synthetic voice; the AI-off bed reuses the package's own pentatonic sonification. Every frame carries a permanent "CONCEPT · AI-GENERATED · NOT A BUILT OUTCOME" badge. Not a rendering deliverable, not a record of built conditions; all inclusion metrics remain unmeasured.
