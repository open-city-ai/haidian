# Copyright, source and generation statement

## Scope

This package contains participant-directed text, concept geometry, diagrams, offline HTML and PDF layouts generated deterministically in this run. They are conceptual design communication, not observed site photography, survey drawings, parcel maps, statutory controls or engineering documents.

## Source and reuse boundary

Public sources are indexed in `sources.json`. Facts are paraphrased and cited by source ID only. No source images, maps, logos, commercial map tiles, screenshots, third-party diagrams, peer submission figures, private data, or long copied text are redistributed. International references are background methods only and do not evidence a Jing-Zhang claim.

## Fonts and technical assets

The final report and visual HTML load `visual/assets/jingzhang-local-font.css`, a package-local CSS asset that embeds the WOFF2 subset as a `data:font/woff2` URI and declares it first as `JZ Noto Sans SC Local`. It is a deterministic subset of the locally installed Noto Sans SC variable font v2.04 (`C:/Windows/Fonts/NotoSansSC-VF.ttf`; embedded metadata identifies Adobe and the SIL Open Font License 1.1; source SHA-256 `763146584cf0710223441356b4395e279021b0806c196614377a7a0174ae074a`; subset WOFF2 SHA-256 `f887484235cc5064e1c971693f5a86fd3228203d2fecaa26a2336c245c07950a`), built with FontTools 4.63.0 from the deterministic, HTML-unescaped printable-character union of `report/proposal.html`, `report/proposal.en.html`, `visual/index.html`, and `visual/index.en.html`. The current four-surface union has 1,019 printable codepoints, including 914 CJK codepoints. The final subset cmap contains all 1,019 required printable codepoints. The build and coverage method are recorded here because the current submission contract permits CSS but not standalone font, license or receipt file extensions.

Noto Sans SC is redistributed here under the SIL Open Font License 1.1. Its license permits bundling and redistribution; the source license records the reserved name `Source`, which this package does not use. The package-local subset makes Chinese rendering independent of a host-installed CJK font and requires neither a CDN nor network access. PDFs may contain their own display-only embedded subsets. All visual and report HTML remain offline and contain no CDN, remote font, API, tracker, iframe, form, remote media or online map dependency.

## AI and human responsibility

The Owner directed the candidate, constraints and working direction. AI/Codex supported public-source research, structured design generation, deterministic production and validation. The Owner selected Jing-Zhang In Place as the participant's final submission candidate. This internal selection is not a competition result, award claim, official adoption, implementation approval, or government endorsement. No unverified credential or professional sign-off is claimed.

## Final100 cover and identity

`assets/media/cover.webp` is a participant-directed AI-generated conceptual illustration created in this Final100 production run. Prompt intent: a 16:10, human-centred conceptual urban-design scene with everyday intergenerational life, green walking space, modest mixed-use fabric and a secondary removable supervised pavilion. It contains no third-party photograph, map, logo, celebrity, location evidence or planning fact, and must not be read as a depiction of a surveyed or proposed site. `assets/identity/jingzhang-in-place-mark.svg` is a participant-authored original mark: a railway seam opening into a reset gate. Both assets are presentation devices only and do not evidence approval, carrier availability, operation, cost, safety, capacity, ownership or field performance.
