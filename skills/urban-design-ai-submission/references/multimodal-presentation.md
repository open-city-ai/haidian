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

### Minimal offline Three.js bootstrap

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>交互式展示</title>
  <!-- Bundle three.min.js locally under visual/assets/ -->
  <script src="assets/three.min.js"></script>
  <style>
    body { margin: 0; background: #0a0a0a; }
    canvas { display: block; }
    #fallback { display: none; color: #fff; padding: 2rem; }
    @media (prefers-reduced-motion: reduce) { #canvas-container { display: none; } #fallback { display: block; } }
  </style>
</head>
<body>
  <div id="canvas-container"></div>
  <div id="fallback" role="img" aria-label="Static site overview diagram">
    <img src="../assets/figures/site-overview.png" alt="Site overview" style="max-width:100%">
  </div>
  <script>
    // Feature-detect WebGL; fall back to static image if unavailable
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      document.getElementById('canvas-container').style.display = 'none';
      document.getElementById('fallback').style.display = 'block';
    } else {
      // ... Three.js scene setup
    }
  </script>
</body>
</html>
```

All JavaScript must be inline or sourced from `visual/assets/`; no `<script src="https://...">`.

## Human, rights, and evidence boundaries

- Never autoplay video, audio, or music. Use visible controls and `preload="metadata"`.
- Add useful alternative text, captions, and transcripts. Do not encode essential meaning only in sound, color, motion, or hover.
- Record the generating model/tool, prompt or method where appropriate, source materials, licenses, contributors, synthetic status, and known limitations in the transcript/rights note and `report/copyright_statement.md`.
- Obtain authorization for faces, voices, music, trademarks, private interiors, and identifiable people. Do not upload personal information or scrape platform media without permitted reuse.
- Label generated renderings, reenactments, and simulations as conceptual. They are presentation artifacts, not observations of current conditions or evidence of public consent.
- Respect `prefers-reduced-motion`, avoid flashing content, and test mobile as well as desktop playback.

## Accessibility Checklist

Before finalizing the package, verify:

- [ ] Every `<img>` in `visual/index.html` and `report/proposal.html` has a non-empty `alt` attribute.
- [ ] All video has a `.vtt` caption track in both Chinese and English, and a Markdown transcript.
- [ ] All audio has a Markdown transcript.
- [ ] No media autoplays (`autoplay` attribute absent or removed).
- [ ] Interactive controls (Three.js, Canvas) are operable by keyboard alone.
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 for body text, 3:1 for large text).
- [ ] A static fallback image is provided for every WebGL/Canvas scene.
- [ ] `prefers-reduced-motion` disables or stills all animations.
- [ ] Page title and `<html lang>` attribute are set correctly for each language version.
- [ ] Essential information is not conveyed by color alone.

## File Size Optimization

Keep within the 40 MiB package limit by applying these techniques before including media:

| Media type | Recommended tool | Target size |
|---|---|---|
| PNG figure | `pngquant --quality 65-80` or `oxipng -o 3` | < 500 KiB each |
| JPEG figure | `cjpeg -quality 75` or `mozjpeg` | < 300 KiB each |
| WebP image | `cwebp -q 75` | < 200 KiB each |
| MP4 video | `ffmpeg -crf 28 -preset slow -c:v libx264` | < 20 MiB each |
| WebM video | `ffmpeg -crf 33 -b:v 0 -c:v libvpx-vp9` | < 15 MiB each |
| MP3 audio | `lame -V 4` (≈ 165 kbps VBR) | < 8 MiB each |

Omit media entirely if compression cannot meet the per-file limit. Declare the omission in
`report/copyright_statement.md` and use a static figure as a fallback.

PNG figures also go through a decode-size budget that on-disk compression does not satisfy: `scripts/validate_submission.py` computes the uncompressed byte count implied by each PNG's `IHDR` width, height, bit depth, and color type, independent of how well the file compresses. A single PNG must decode to no more than 128 MiB (`MAX_PNG_INFLATED_BYTES`), and every PNG in the package together must not exceed 1024 MiB (`MAX_TOTAL_PNG_INFLATED_BYTES`), counted in manifest declaration order — files listed later draw on whatever budget the earlier ones left (added in `298500d70`, 2026-08-19). A figure that already meets the < 500 KiB on-disk target above can still fail this check if its pixel dimensions are high enough: a single 7000×4000+ truecolor render can decode past 80 MiB even at a few hundred KiB on disk, and multiple figures at that scale will quickly consume the package-wide decode budget. Downscale figures to the resolution actually needed for on-screen or print review; compressing harder without lowering resolution does not fix this.