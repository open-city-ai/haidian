# 《百年应答》概念方案短片 · 完整文字稿

- 规格：1920×1080 / 24 fps / 55 秒 / 静音（无音轨）
- 画面由 AI 生成（图生视频），为概念意象示意——**非实景照片、非工程效果图、非官方审定成果**。
- 片中所有形体、材质、树种、人物、车辆、天气均为意象表达，不构成任何形式、尺寸或工程做法的设计依据。
- 字幕已烧录进画面，`narrative.vtt` 与烧录字幕逐字一致；本文字稿供无法播放视频时完整获取。

## 已知形式差异（据实声明）

为避免读者把气氛示意误读为设计成果，以下四条逐条说明片中表达与正文口径的关系（其中第 2 条的差异已重绘消除，现存差异为三处），一律以断面图与正文为准：

1. **铜道钉位置**：片中道钉带段的道钉嵌于步道中部；正文口径为「步道边缘」。
2. 人字之跃段画面已按断面 ZZY-1/ZZY-2 口径重绘（桥面平直、无上部构筑物、两端并排折返坡道），原桥型差异已消除、不再构成差异。
3. **敲钟资格表述**：片中字幕写「完成备案或 IPO」，举的是最常见的两类事件；正文口径为「达成可公开核验的里程碑事件」——事件类型开放，但须有政府、交易所或其他第三方的公开可查记录。字幕已烧录进画面、本轮不重新渲染，故此处表述窄于正文，一律以正文为准。
4. **并列梯段**：片中人字之跃画面只有折返坡道、没有梯段——梯段为本轮新增，短片生成在先、本轮不重新渲染。梯段的形式与尺寸以断面 ZZY-2 与正文为准。

## 逐段文字

### 片头（00:00.700 → 00:03.500）

> 百年应答 THE CENTURY ANSWER
> 1909 年，一条铁路问了一个问题：中国人能不能自己修铁路。
> 今天，同一条铁路旁，9 公里长卷正在回答第二个问题。
> 本片画面由 AI 生成，为概念意象示意；非实景照片·非工程效果图·非官方审定成果

### 道钉带 · 全线（00:04.500 → 00:10.700）

> 道钉带 · 全线
> 每一款海淀自主备案的大模型，就在步道边缘钉下一颗铜道钉

### 南问 · 鸣钟之门（00:14.500 → 00:20.700）

> 南问 · 鸣钟之门
> 带内企业完成备案或 IPO，到大钟寺旁新铸的应答钟敲一响

### 中答 · 应答原点（00:24.500 → 00:28.700）

> 中答 · 应答原点
> 站前只留一方 0.6 公顷素广场：一册应答簿，一根零公里桩 K0+000

### 北跃 · 人字之跃（00:32.500 → 00:38.700）

> 北跃 · 人字之跃
> 只跨环路、不跨清河，两端落在环路两侧绿地里，接上清河蓝绿

### 东西向穿越 · 应答门（00:42.500 → 00:48.700）

> 东西向穿越 · 应答门
> 东西 46 座应答门向近 70 个社区渗透，双用坡道兼容轮椅与低速机器人

### 片尾（00:52.000 → 00:54.900）

> 市民不是来看展板的。
> 他们蹲下来数道钉：中国自主创新，钉到第几颗了。
> 百年应答 · 9 公里应答长卷 · 46 座应答门向近 70 个社区打开
> 全部空间与开发内容均为概念建议，不构成政府审定结论。

## 制作与权利边界

- **静帧生成**：Lib Image（LibTV 平台）与 GPT image 2.0（经用户 ChatGPT Pro 订阅调用），提示词全部依据本包 `proposal.md` 正文口径自行撰写。
- **图生视频**：道钉带、鸣钟之门、应答门三段经 Seedance 2.5（1920×1080 / 24 fps / 各 10 秒）；应答原点与人字之跃两段为静帧缓慢推镜，未经视频模型。
- **拼装**：片头片尾与字幕条由 Python（PIL）绘制，FFmpeg（libx264）拼装，全片 55 秒、静音无音轨。
- **权利**：未使用任何第三方图像、影像或受版权保护的素材作为参考图；画面为 AI 生成的概念意象示意，非实景照片、非工程效果图、非实测数据、非官方审定成果。
- 逐项溯源与权利声明见 `report/copyright_statement.md`。

## English transcript

Silent film, 1920x1080 / 24 fps / 55 s, no audio track. The imagery is AI-generated and is a conceptual impression - not a photograph, not an engineering rendering, and not an officially approved result. English captions ship as `narrative.en.vtt`; timecodes are identical to the Chinese track.

- **00:00.700-00:03.500** THE CENTURY ANSWER. In 1909 a railway asked a question: can the Chinese build their own railway? Today, beside that same railway, a nine-kilometre scroll is answering a second one.
- **00:04.500-00:10.700** Rail-Spike Band, whole line. Every large model independently registered in Haidian gets one bronze spike at the walkway edge.
- **00:14.500-00:20.700** South-Question, Gate of the Ringing Bell. When a company in the belt completes registration or lists, the newly cast Answer Bell beside Dazhongsi is struck once.
- **00:24.500-00:28.700** Middle-Answer, the Answer Origin. Only a bare 0.6-hectare plaza before the station: one answer book, one zero-kilometre stele, K0+000.
- **00:32.500-00:38.700** North-Leap, the Ren-Shaped Leap. It crosses the ring road only, not the Qinghe; both ends land in the green either side and meet the river's blue-green.
- **00:42.500-00:48.700** East-west crossing, the Answer Gates. 46 Answer Gates reach into nearly 70 communities; dual-use ramps carry wheelchairs and low-speed robots alike.
- **00:52.000-00:54.900** Citizens do not come to read display boards. They crouch down and count the spikes: how far has China's independent innovation got? All spatial and development content is a conceptual recommendation, not an approved government conclusion.

**Declared divergences** — three stand, a fourth has been resolved: (1) in the Rail-Spike Band segment the bronze spikes appear mid-walkway, whereas the written calibre places them at the walkway edge; (2) the Ringing Bell subtitle says “completes registration or lists”, naming the two commonest cases, whereas the body text binds ringing eligibility to any publicly verifiable milestone — the kind of event is open, but it must carry a public record from a government body, an exchange, or another third party; (3) the Ren-Shaped Leap footage shows the switchback ramps only and no flight of steps, the steps having been added to the text this round, after the film was made. The subtitles are burnt into the picture and the film is not re-rendered this round. The fourth, the earlier Ren-Shaped Leap bridge form, has been resolved by redrawing that segment to sections ZZY-1/ZZY-2 and no longer stands. The sections and the proposal text govern.
