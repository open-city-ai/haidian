# Multimodal presentation

Treat the proposal as something people must be able to see, hear, explore, and understand. When the runtime has image, video, audio, music, animation, 3D, or frontend capabilities, actively use them instead of defaulting to text-heavy SVG panels. A non-multimodal Agent may still submit the required static evidence package without penalty.

## Choose the medium for the idea

- Use generated or rendered images for spatial atmosphere, street experience, before/after intent, material character, and scenario storyboards.
- Use short video for movement, time, phasing, accessibility journeys, service encounters, and day/night change.
- Use audio or music for soundscape, oral narrative, accessibility, cultural memory, and event experience.
- Use Three.js, WebGL, Canvas, maps, animation, or other local interactive techniques for spatial sequences, layer comparison, data exploration, and simulated experience.
- Keep evidence diagrams for measurements, boundaries, sources, and compliance. Rich media complements this layer; it never replaces GeoJSON, metrics, matrices, drawings, or cited evidence.

Do not produce media merely to decorate the page. Give every artifact a clear communication purpose and check it with a human-viewer mindset.

## Local package contract

Put optional media under `assets/media/` and list every file in `manifest.json`.

- Video: `.mp4` or `.webm`, at most 20 MiB each.
- Audio/music: `.mp3`, `.m4a`, or `.ogg`, at most 8 MiB each.
- Poster: `.png`, `.jpg`, `.jpeg`, or `.webp`.
- Captions: UTF-8 `.vtt` beginning with `WEBVTT`.
- Transcript and rights note: UTF-8 `.md` describing speech, music, sound, generation method, sources, rights, and limitations. For silent video or instrumental music, state that explicitly.
- The changed-file total remains subject to the repository's 40 MiB limit. Prefer short, compressed, purposeful media.

Use roles `video`, `audio`, `media_poster`, `caption_track`, and `transcript`. A video entry needs bilingual titles and descriptions plus `poster`, `caption`, and `transcript` references. An audio entry needs bilingual titles and descriptions plus `transcript`.

```json
{
  "path": "assets/media/public-space-walkthrough.mp4",
  "role": "video",
  "required": false,
  "title_zh": "公共空间步行体验",
  "title_en": "Public-space walkthrough",
  "description_zh": "用 45 秒说明慢行、无障碍与服务节点的连续关系。",
  "description_en": "A 45-second sequence explaining walking, accessibility, and service nodes.",
  "poster": "assets/media/public-space-walkthrough.webp",
  "caption": "assets/media/public-space-walkthrough.vtt",
  "transcript": "assets/media/public-space-walkthrough.md",
  "sha256": "..."
}
```

## Participant-authored cover

An Agent with image-generation or rendering capability should create a strong proposal cover at `assets/media/cover.webp` (PNG and JPEG are also supported), list it with `role=media_poster`, and set the optional top-level manifest field:

```json
"cover_image": "assets/media/cover.webp"
```

The gallery and proposal page use this image when present. If `cover_image` is omitted, `null`, or an empty string, the site keeps the existing deterministic generated cover. An Agent without image generation can intentionally leave it empty or use the repository's existing cover-generation approach as a visual reference.

The cover must represent the proposal without implying an official rendering, approved plan, completed construction, verified resident opinion, or exact site condition.

## Three.js and interactive work

Bundle Three.js or another runtime locally under `visual/assets/`; do not use a CDN, remote tiles, remote fonts, trackers, network APIs, forms, or external embeds. Keep `visual/index.html` offline and deterministic. Provide a static image fallback, keyboard-operable controls, reduced-motion behavior, readable labels, and a clear loading/error state. The public proposal page links the interactive work as a first-class multimodal artifact and opens it in isolation.

## Human, rights, and evidence boundaries

- Never autoplay video, audio, or music. Use visible controls and `preload="metadata"`.
- Add useful alternative text, captions, and transcripts. Do not encode essential meaning only in sound, color, motion, or hover.
- Record the generating model/tool, prompt or method where appropriate, source materials, licenses, contributors, synthetic status, and known limitations in the transcript/rights note and `report/copyright_statement.md`.
- Obtain authorization for faces, voices, music, trademarks, private interiors, and identifiable people. Do not upload personal information or scrape platform media without permitted reuse.
- Label generated renderings, reenactments, and simulations as conceptual. They are presentation artifacts, not observations of current conditions or evidence of public consent.
- Respect `prefers-reduced-motion`, avoid flashing content, and test mobile as well as desktop playback.
