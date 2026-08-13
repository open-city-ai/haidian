#!/usr/bin/env python3
"""Backfill standalone bilingual proposal files for merged submissions.

This maintainer tool deliberately keeps deterministic Markdown structure and
machine-readable evidence references unchanged while translating prose with a
local language model.  It writes one submission at a time so a long run can be
resumed safely.

The script translates an existing ``proposal.md`` (or its counterpart) into
the missing language and writes the result as a standalone sibling file
(``proposal.en.md`` or ``proposal.zh.md``).  It never modifies the primary
proposal; it only creates new files.

Requirements
------------
Install the translation dependency group before running::

    python3 -m pip install -r requirements-translation.txt

The default model is ``Qwen/Qwen2.5-3B-Instruct`` via the
``transformers`` pipeline.  On Apple Silicon, ``mlx-community/Qwen2.5-7B-Instruct-4bit``
is used automatically when MLX is available.

Translation preserves
---------------------
- YAML front matter (translated front matter fields are added, not replaced).
- ATX headings structure and nesting.
- Evidence markers (``[source:...]``, ``[depth:...]``, etc.) unchanged.
- Inline images and figure paths unchanged.
- Fenced code blocks unchanged.
- Markdown links unchanged.

Usage
-----
Backfill all merged submissions::

    python3 scripts/backfill_bilingual_submissions.py

Backfill a specific submission::

    python3 scripts/backfill_bilingual_submissions.py \\
        --only submissions/alice/my-proposal

Dry run without writing files::

    python3 scripts/backfill_bilingual_submissions.py --dry-run

Exit code is 0 on success and 1 when any submission fails to translate.
"""
from __future__ import annotations

import argparse
from collections import Counter
import json
import re
import sys
from pathlib import Path
from typing import Any, Callable, Iterable


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CACHE = Path("/tmp/haidian-bilingual-backfill/translation-cache-v9.jsonl")
MODEL_NAME = "Qwen/Qwen2.5-3B-Instruct"
MLX_MODEL_NAME = "mlx-community/Qwen2.5-7B-Instruct-4bit"

REQUIRED_SECTIONS_ZH = [
    "设计依据与资料清单",
    "三层范围工作框架",
    "统筹研究范围产业与未来城市研究",
    "总体设计范围城市更新与控规深度城市设计",
    "重点区域详细设计",
    "AI 创新生态、人才画像与 AI+ 场景",
    "用地、建筑规模与拆改留方案",
    "交通、轨道、市政与公共服务设施",
    "蓝绿空间、公共空间与城市风貌",
    "更新项目清单、实施政策与分期计划",
    "指标体系、面积复算与合规矩阵",
    "风险、版权与合规说明",
    "参考资料",
]
REQUIRED_SECTIONS_EN = [
    "Design Basis and Source List",
    "Three-Level Scope Framework",
    "Coordinated Research Area: Industry and Future City Research",
    "Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design",
    "Detailed Design of Key Areas",
    "AI Innovation Ecosystem, Personas, and AI+ Scenarios",
    "Land Use, Building Scale, and Retain-Renovate-Demolish Strategy",
    "Transport, Rail, Municipal Infrastructure, and Public Services",
    "Blue-Green Network, Public Space, and Urban Character",
    "Renewal Projects, Implementation Policy, and Phasing",
    "Metrics, Area Recalculation, and Compliance Matrix",
    "Risk, Copyright, and Compliance",
    "References",
]
SECTION_MAP = dict(zip(REQUIRED_SECTIONS_ZH, REQUIRED_SECTIONS_EN))
SECTION_MAP.update(dict(zip(REQUIRED_SECTIONS_EN, REQUIRED_SECTIONS_ZH)))

EAST_ASIAN_CHAR_CLASS = r"\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af"
CJK_RE = re.compile(f"[{EAST_ASIAN_CHAR_CLASS}]")
LATIN_RE = re.compile(r"[A-Za-z]{2,}")
FRONT_FIELD_RE = re.compile(r"^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$")
FENCE_RE = re.compile(r"^\s*(```|~~~)")
TABLE_SEPARATOR_RE = re.compile(r"^\s*\|?\s*:?-{3,}:?(?:\s*\|\s*:?-{3,}:?)+\s*\|?\s*$")
PREFIX_RE = re.compile(r"^(\s*(?:(?:#{1,6}|[-*+]|\d+[.)]|>)\s+))(.*)$")
HEADING_RE = re.compile(r"^(\s*#{1,6}\s+)(.*?)(\s*#*\s*)$")
IMAGE_LINE_RE = re.compile(r"^(\s*)!\[([^\]]*)\]\(([^)]+)\)(\s*)$")
PROTECTED_RE = re.compile(
    r"`[^`\n]+`"
    r"|\[(?:source|standard|depth|data|metric):[^\]\n]+\]"
    r"|https?://[^\s<>]+"
    r"|<[^>\n]+>"
)
MARKDOWN_LINK_RE = re.compile(r"(!?\[)([^\]\n]*)(\]\()([^\)\n]+)(\))")
GENERIC_REFERENCE_RE = re.compile(
    r"\[[A-Za-z][A-Za-z0-9_-]*:[^\]\n]+\]|\[[A-Z][A-Z0-9_-]{4,}\]"
)
UPPER_IDENTIFIER_RE = re.compile(
    r"(?<![A-Za-z0-9_-])[A-Z][A-Z0-9_-]{1,}[A-Z0-9](?![A-Za-z0-9_-])"
)
RESIDUAL_ZH_EN = {
    "成果": "outputs and outcomes",
    "科普": "public education and outreach",
}
ENGLISH_PUNCTUATION_MAP = str.maketrans(
    {
        "，": ", ",
        "；": "; ",
        "。": ". ",
        "：": ": ",
        "、": ", ",
        "（": "(",
        "）": ")",
        "“": '"',
        "”": '"',
        "‘": "'",
        "’": "'",
    }
)


def normalize_target_punctuation(text: str, target_language: str) -> str:
    return text.translate(ENGLISH_PUNCTUATION_MAP) if target_language == "en" else text


def parse_front_matter(text: str) -> tuple[list[str], str]:
    lines = text.splitlines()
    if not lines or lines[0].lstrip("\ufeff").strip() != "---":
        return [], text
    for index in range(1, len(lines)):
        if lines[index].strip() == "---":
            front = lines[1:index]
            body = "\n".join(lines[index + 1 :])
            if text.endswith("\n"):
                body += "\n"
            return front, body
    return [], text


def front_value(front: Iterable[str], field: str) -> str:
    for line in front:
        match = FRONT_FIELD_RE.match(line)
        if not match or match.group(1) != field:
            continue
        value = match.group(2).strip()
        if value.startswith(('"', "'")) and value.endswith(value[:1]):
            value = value[1:-1]
        return value
    return ""


def set_front_fields(
    front: list[str],
    values: dict[str, str],
    remove: set[str] | None = None,
) -> list[str]:
    remove = remove or set()
    result: list[str] = []
    written: set[str] = set()
    for line in front:
        match = FRONT_FIELD_RE.match(line)
        field = match.group(1) if match else ""
        if field in remove:
            continue
        if field in values:
            if field in written:
                continue
            result.append(f"{field}: {json.dumps(values[field], ensure_ascii=False)}")
            written.add(field)
        else:
            result.append(line)
        if field == "language":
            for key in ["translation_file", "translation_of"]:
                if key in values and key not in written:
                    result.append(f"{key}: {json.dumps(values[key], ensure_ascii=False)}")
                    written.add(key)
    for field, value in values.items():
        if field not in written:
            result.append(f"{field}: {json.dumps(value, ensure_ascii=False)}")
    return result


def render_document(front: list[str], body: str) -> str:
    ending = "" if body.endswith("\n") else "\n"
    return "---\n" + "\n".join(front) + "\n---\n" + body + ending


def load_glossary(path: Path) -> tuple[dict[str, str], dict[str, str]]:
    zh_to_en: dict[str, str] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.startswith("|") or line.startswith("| ---"):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) < 5 or cells[0] == "中文":
            continue
        zh, en = cells[0], cells[1]
        if zh and en and zh != "—" and en != "—":
            zh_to_en[zh] = en
            compact_ai = re.sub(r"\s*AI\s*", "AI", zh)
            if compact_ai != zh:
                zh_to_en[compact_ai] = en
    en_to_zh = {en: zh for zh, en in zh_to_en.items()}
    return zh_to_en, en_to_zh


def needs_translation(text: str, source_language: str) -> bool:
    if source_language == "zh":
        return bool(CJK_RE.search(text))
    return bool(LATIN_RE.search(text))


def split_long_text(text: str, limit: int = 420) -> list[str]:
    if len(text) <= limit:
        return [text]
    pieces = re.split(r"(?<=[。！？；])|(?<=[.!?;])\s+", text)
    chunks: list[str] = []
    current = ""
    for piece in pieces:
        if not piece:
            continue
        if current and len(current) + len(piece) > limit:
            chunks.append(current)
            current = ""
        while len(piece) > limit:
            cut = max(piece.rfind(mark, 0, limit) for mark in "，、,；;")
            cut = cut + 1 if cut >= limit // 3 else limit
            protected_spans = [match.span() for match in PROTECTED_RE.finditer(piece)]
            protected_spans.extend(match.span() for match in MARKDOWN_LINK_RE.finditer(piece))
            for span_start, span_end in protected_spans:
                if span_start < cut < span_end:
                    cut = span_end
                    break
            chunks.append(piece[:cut])
            piece = piece[cut:].lstrip()
        current += piece
    if current:
        chunks.append(current)
    return chunks or [text]


class QwenRuntime:
    def __init__(self, device: str) -> None:
        try:
            import torch
            from transformers import AutoModelForCausalLM, AutoTokenizer
        except ImportError as exc:
            raise SystemExit(
                "Install the translation runtime first: transformers, sentencepiece, sacremoses"
            ) from exc
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        self.tokenizer.padding_side = "left"
        self.model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, dtype=torch.float16)
        if device == "auto":
            device = "mps" if torch.backends.mps.is_available() else "cpu"
        self.device = device
        self.model.to(device)
        self.model.eval()
        self.phrase_tokenizer = None
        self.phrase_model = None

    def generate(
        self, prompts: list[str], max_new_tokens: int, prohibit_cjk: bool = False
    ) -> list[str]:
        import torch

        encoded = self.tokenizer(
            prompts,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=1536,
        ).to(self.device)
        with torch.inference_mode():
            generated = self.model.generate(
                **encoded,
                max_new_tokens=max_new_tokens,
                do_sample=False,
                repetition_penalty=1.05,
                pad_token_id=self.tokenizer.eos_token_id,
            )
        prompt_length = encoded.input_ids.shape[1]
        return self.tokenizer.batch_decode(
            generated[:, prompt_length:], skip_special_tokens=True
        )

    def translate_residual_phrases(self, phrases: list[str], source: str, target: str) -> list[str]:
        import torch
        from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

        if self.phrase_tokenizer is None or self.phrase_model is None:
            phrase_model_name = "facebook/nllb-200-distilled-600M"
            self.phrase_tokenizer = AutoTokenizer.from_pretrained(
                phrase_model_name, src_lang="zho_Hans"
            )
            self.phrase_model = AutoModelForSeq2SeqLM.from_pretrained(phrase_model_name)
            self.phrase_model.to(self.device)
            self.phrase_model.eval()
        codes = {"zh": "zho_Hans", "en": "eng_Latn"}
        self.phrase_tokenizer.src_lang = codes[source]
        encoded = self.phrase_tokenizer(
            phrases, return_tensors="pt", padding=True, truncation=True, max_length=128
        ).to(self.device)
        with torch.inference_mode():
            generated = self.phrase_model.generate(
                **encoded,
                forced_bos_token_id=self.phrase_tokenizer.convert_tokens_to_ids(codes[target]),
                num_beams=4,
                max_length=128,
            )
        translated = self.phrase_tokenizer.batch_decode(generated, skip_special_tokens=True)
        if source == "zh" and target == "en":
            translated = [RESIDUAL_ZH_EN.get(phrase, item) for phrase, item in zip(phrases, translated)]
        return translated


class MlxQwenRuntime:
    def __init__(self) -> None:
        try:
            from mlx_lm import load
            from mlx_lm.sample_utils import make_sampler
        except ImportError as exc:
            raise SystemExit("Install the Apple Silicon runtime first: mlx-lm") from exc
        self.model, self.tokenizer = load(MLX_MODEL_NAME)
        self.sampler = make_sampler(temp=0.0)
        import mlx.core as mx

        mask = [False] * self.model.args.vocab_size
        for token_id in range(self.model.args.vocab_size):
            try:
                decoded = self.tokenizer.decode([token_id])
            except Exception:
                continue
            if CJK_RE.search(decoded) or "�" in decoded:
                mask[token_id] = True
        self.cjk_token_mask = mx.array(mask)
        self.cjk_token_count = sum(mask)

    def generate(
        self, prompts: list[str], max_new_tokens: int, prohibit_cjk: bool = False
    ) -> list[str]:
        from mlx_lm import batch_generate, generate
        import mlx.core as mx

        processors = None
        if prohibit_cjk:
            processors = [
                lambda _tokens, logits: mx.where(self.cjk_token_mask, -float("inf"), logits)
            ]

        if len(prompts) == 1:
            return [
                generate(
                    self.model,
                    self.tokenizer,
                    prompt=prompts[0],
                    max_tokens=max_new_tokens,
                    sampler=self.sampler,
                    logits_processors=processors,
                    verbose=False,
                )
            ]
        encoded_prompts = [self.tokenizer.encode(prompt) for prompt in prompts]
        response = batch_generate(
            self.model,
            self.tokenizer,
            encoded_prompts,
            max_tokens=max_new_tokens,
            sampler=self.sampler,
            logits_processors=processors,
            completion_batch_size=len(prompts),
            prefill_batch_size=len(prompts),
            verbose=False,
        )
        return response.texts

    def translate_residual_phrases(self, phrases: list[str], source: str, target: str) -> list[str]:
        if target == "en":
            system = "You are a Chinese-to-English urban-planning dictionary. Never output Chinese characters."
            request = lambda phrase: (
                "Translate this Chinese urban-planning term into English. "
                f"Chinese: {phrase}\nEnglish:"
            )
        else:
            system = "你是英汉城市规划术语词典。只输出简体中文译文。"
            request = lambda phrase: f"将这个英文城市规划短语译为中文：{phrase}\n中文："
        prompts = [
            self.tokenizer.apply_chat_template(
                [
                    {"role": "system", "content": system},
                    {"role": "user", "content": request(phrase)},
                ],
                tokenize=False,
                add_generation_prompt=True,
            )
            for phrase in phrases
        ]
        translated = [item.strip() for item in self.generate(prompts, 64, target == "en")]
        if source == "zh" and target == "en":
            translated = [RESIDUAL_ZH_EN.get(phrase, item) for phrase, item in zip(phrases, translated)]
        return translated


class LocalTranslator:
    def __init__(
        self,
        source_language: str,
        target_language: str,
        term_map: dict[str, str],
        cache_path: Path,
        runtime: Any,
        batch_size: int,
    ) -> None:
        self.source_language = source_language
        self.target_language = target_language
        self.term_map = term_map
        self.cache_path = cache_path
        self.batch_size = batch_size
        self.runtime = runtime
        self.cache: dict[str, str] = {}
        if cache_path.exists():
            for line in cache_path.read_text(encoding="utf-8").splitlines():
                try:
                    item = json.loads(line)
                except json.JSONDecodeError:
                    continue
                if item.get("direction") == f"{source_language}-{target_language}":
                    source = str(item.get("source", ""))
                    target = str(item.get("target", ""))
                    if self._cached_translation_is_usable(source, target):
                        self.cache[source] = target

    def _append_cache(self, source: str, target: str) -> None:
        self.cache_path.parent.mkdir(parents=True, exist_ok=True)
        with self.cache_path.open("a", encoding="utf-8") as stream:
            stream.write(
                json.dumps(
                    {
                        "direction": f"{self.source_language}-{self.target_language}",
                        "source": source,
                        "target": target,
                    },
                    ensure_ascii=False,
                )
                + "\n"
            )

    def _cached_translation_is_usable(self, source: str, target: str) -> bool:
        expansion_limit = (
            max(800, len(source) * 7)
            if self.source_language == "zh" and self.target_language == "en"
            else max(500, len(source) * 5)
        )
        if not source or not target or len(target) > expansion_limit:
            return False
        if self.target_language == "en" and self._has_unprotected_cjk(target):
            return False
        if self.target_language == "zh" and self._has_unprotected_latin(target):
            return False
        if re.search(
            r"validation failure|invalid validation|expected=|actual="
            r"|text to translate|translate the following|preserve markdown punctuation"
            r"|preserve every url|return only the translated text",
            target,
            re.I,
        ):
            return False
        if any(term in source and replacement not in target for term, replacement in self.term_map.items()):
            return False
        return Counter(self._immutable_tokens(source)) == Counter(self._immutable_tokens(target))

    def _prompt(self, source: str) -> tuple[str, dict[str, str]]:
        direction = (
            "Chinese urban-design text into professional English"
            if self.source_language == "zh"
            else "English urban-design text into professional Simplified Chinese"
        )
        term_markers: dict[str, str] = {}
        relevant_terms: list[str] = []
        for term, translation in sorted(self.term_map.items(), key=lambda item: len(item[0]), reverse=True):
            if term not in source:
                continue
            term_markers[term] = translation
            relevant_terms.append(f"{term} = {translation}")
        glossary = "\n".join(relevant_terms)
        system = (
            "You are the bilingual editor for an international urban-design open call. "
            "Translate faithfully and completely without adding, omitting, summarizing, or interpreting. "
            "Use professional planning language and normal sentence case. Do not leave untranslated source-language "
            "words or characters except immutable identifiers and proper names. Return only the translated text."
        )
        marker_instruction = ""
        if relevant_terms:
            marker_instruction = (
                " Use every applicable glossary translation exactly as written:\n"
                f"{glossary}\n"
            )
        user = (
            f"Translate the following {direction}.\n"
            "Preserve Markdown structure and delimiters. Preserve every URL, file path, inline-code span, "
            "bracketed evidence reference, uppercase identifier, number, and existing proper-name spelling exactly."
            f"{marker_instruction}\n"
            "TEXT TO TRANSLATE:\n"
            f"{source}"
        )
        return (
            self.runtime.tokenizer.apply_chat_template(
                [{"role": "system", "content": system}, {"role": "user", "content": user}],
                tokenize=False,
                add_generation_prompt=True,
            ),
            term_markers,
        )

    def _immutable_tokens(self, text: str) -> list[str]:
        tokens = PROTECTED_RE.findall(text)
        tokens.extend(GENERIC_REFERENCE_RE.findall(text))
        tokens.extend(UPPER_IDENTIFIER_RE.findall(text))
        tokens.extend(
            match.group(4)
            for match in MARKDOWN_LINK_RE.finditer(text)
            if not re.fullmatch(r"[A-Za-z][A-Za-z0-9_-]*:[^\]\n]+", match.group(2))
        )
        return tokens

    def _immutable_spans(self, text: str) -> list[tuple[int, int]]:
        spans = [match.span() for match in PROTECTED_RE.finditer(text)]
        spans.extend(match.span() for match in GENERIC_REFERENCE_RE.finditer(text))
        spans.extend(match.span() for match in UPPER_IDENTIFIER_RE.finditer(text))
        spans.extend(
            (match.start(4), match.end(4))
            for match in MARKDOWN_LINK_RE.finditer(text)
            if not re.fullmatch(r"[A-Za-z][A-Za-z0-9_-]*:[^\]\n]+", match.group(2))
        )
        ordered: list[tuple[int, int]] = []
        for start, end in sorted(set(spans)):
            if ordered and start < ordered[-1][1]:
                continue
            ordered.append((start, end))
        return ordered

    def _transform_outside_immutable(
        self, text: str, transform: Callable[[str], str]
    ) -> str:
        spans = self._immutable_spans(text)
        if not spans:
            return transform(text)
        parts: list[str] = []
        cursor = 0
        for start, end in spans:
            parts.append(transform(text[cursor:start]))
            parts.append(text[start:end])
            cursor = end
        parts.append(transform(text[cursor:]))
        return "".join(parts)

    def _replace_outside_immutable(self, text: str, old: str, new: str) -> str:
        return self._transform_outside_immutable(text, lambda value: value.replace(old, new))

    def _has_unprotected_cjk(self, text: str) -> bool:
        scrubbed = PROTECTED_RE.sub("", text)
        scrubbed = GENERIC_REFERENCE_RE.sub("", scrubbed)
        scrubbed = MARKDOWN_LINK_RE.sub(
            lambda match: match.group(1) + match.group(2) + match.group(3) + match.group(5),
            scrubbed,
        )
        return bool(CJK_RE.search(scrubbed))

    def _has_unprotected_latin(self, text: str) -> bool:
        scrubbed = PROTECTED_RE.sub("", text)
        scrubbed = GENERIC_REFERENCE_RE.sub("", scrubbed)
        scrubbed = UPPER_IDENTIFIER_RE.sub("", scrubbed)
        scrubbed = MARKDOWN_LINK_RE.sub(
            lambda match: match.group(1) + match.group(2) + match.group(3) + match.group(5),
            scrubbed,
        )
        # Capitalized tokens are commonly immutable proper names (for example
        # ``AI Verify`` and ``Marineterrein``).  Residual English prose is more
        # reliably identified by consecutive lower-case-leading content words.
        words = re.findall(r"\b[a-z][A-Za-z'-]{1,}\b", scrubbed)
        prose_marker = re.search(
            r"\b(?:the|this|that|these|those|and|or|is|are|was|were|has|have|with|without|not|"
            r"from|into|under|remains?|completes?|describes?|requires?|provides?)\b",
            scrubbed,
            re.I,
        )
        mixed_token = re.search(
            rf"(?:[a-z][A-Za-z'-]{{2,}}[{EAST_ASIAN_CHAR_CLASS}]|"
            rf"[{EAST_ASIAN_CHAR_CLASS}][a-z][A-Za-z'-]{{2,}})",
            scrubbed,
        )
        all_words = re.findall(r"\b[A-Za-z][A-Za-z'-]{1,}\b", scrubbed)
        return bool(
            len(words) >= 3
            or (CJK_RE.search(scrubbed) and len(words) >= 2)
            or (prose_marker and len(all_words) >= 2)
            or mixed_token
        )

    def _residual_latin_phrases(self, text: str) -> list[str]:
        scrubbed = PROTECTED_RE.sub("", text)
        scrubbed = GENERIC_REFERENCE_RE.sub("", scrubbed)
        scrubbed = UPPER_IDENTIFIER_RE.sub("", scrubbed)
        candidates = re.findall(
            r"[A-Za-z][A-Za-z'-]*(?:[ \t]+[A-Za-z][A-Za-z'-]*)*", scrubbed
        )
        phrases: list[str] = []
        for candidate in candidates:
            lower_leading = re.findall(r"\b[a-z][A-Za-z'-]*\b", candidate)
            prose_marker = re.search(
                r"\b(?:the|this|that|these|those|and|or|is|are|was|were|has|have|with|without|"
                r"not|from|into|under|remains?|completes?|describes?|requires?|provides?)\b",
                candidate,
                re.I,
            )
            if lower_leading or prose_marker:
                phrases.append(candidate.strip())
        return list(dict.fromkeys(phrase for phrase in phrases if phrase))

    def _translate_preserving_immutable(self, source: str) -> str:
        ordered = self._immutable_spans(source)
        if not ordered:
            return self.translate(source)
        prose: list[str] = []
        parts: list[tuple[bool, str]] = []
        cursor = 0
        for start, end in ordered:
            if start > cursor:
                parts.append((True, source[cursor:start]))
                prose.append(source[cursor:start])
            parts.append((False, source[start:end]))
            cursor = end
        if cursor < len(source):
            parts.append((True, source[cursor:]))
            prose.append(source[cursor:])
        translated = iter(self.translate_many(prose))
        rendered: list[tuple[bool, str]] = []
        for is_prose, value in parts:
            if is_prose:
                translated_value = next(translated).replace("`", "")
                rendered.append((True, translated_value))
            else:
                rendered.append((False, value))
        output: list[str] = []
        for index, (is_prose, value) in enumerate(rendered):
            if self.target_language == "en" and output and value and rendered[index - 1][0] != is_prose:
                previous = output[-1]
                if (
                    previous
                    and not previous[-1].isspace()
                    and not value[0].isspace()
                    and (previous[-1].isalnum() or previous[-1] in "`]>")
                    and (value[0].isalnum() or value[0] in "`[<")
                ):
                    output.append(" ")
            output.append(value)
        return "".join(output)

    def _repair_prompt(self, source: str, draft: str, error: str) -> str:
        system = (
            "You are a meticulous bilingual copy editor. Repair the draft translation so it is complete, "
            "professional, and structurally identical to the source. Return only the corrected translation."
        )
        user = (
            "Correct the draft below. Translate every remaining source-language character. Preserve every URL, "
            "file path, Markdown delimiter, bracketed evidence reference, uppercase identifier, number, and glossary "
            "term already present in the draft exactly. Do not add or remove information.\n\n"
            f"VALIDATION FAILURE:\n{error}\n\nSOURCE:\n{source}\n\nDRAFT:\n{draft}"
        )
        return self.runtime.tokenizer.apply_chat_template(
            [{"role": "system", "content": system}, {"role": "user", "content": user}],
            tokenize=False,
            add_generation_prompt=True,
        )

    def _simple_prompt(self, source: str) -> str:
        instruction = (
            "Translate Chinese urban-planning prose into clear professional English. Output only the translation."
            if self.target_language == "en"
            else "Translate English urban-planning prose into clear professional Simplified Chinese. Output only the translation."
        )
        return self.runtime.tokenizer.apply_chat_template(
            [
                {
                    "role": "system",
                    "content": instruction,
                },
                {"role": "user", "content": source},
            ],
            tokenize=False,
            add_generation_prompt=True,
        )

    def _latin_repair_prompt(self, source: str, draft: str) -> str:
        return self.runtime.tokenizer.apply_chat_template(
            [
                {
                    "role": "system",
                    "content": (
                        "将中文译稿编辑为流畅、专业的简体中文。结合英文原文翻译所有残留的英文句子和短语，"
                        "并修正相邻语法。代码、URL、数字、专名、大写缩写和方括号引用必须逐字保留。只输出修订后的中文译稿。"
                    ),
                },
                {"role": "user", "content": f"英文原文：\n{source}\n\n中文译稿：\n{draft}"},
            ],
            tokenize=False,
            add_generation_prompt=True,
        )

    def _repair_preserving_immutable(
        self,
        source: str,
        draft: str,
        prompt_builder: Callable[[str, str], str],
        max_new_tokens: int,
    ) -> str:
        """Run a fluency repair without exposing machine-readable tokens to the model."""
        protected_source = source
        protected_draft = draft
        replacements: list[tuple[str, str]] = []
        tokens = sorted(set(self._immutable_tokens(source)), key=len, reverse=True)
        for index, token in enumerate(tokens):
            marker = f"IMMUTABLETOKEN{index:03d}"
            protected_source = protected_source.replace(token, marker)
            protected_draft = protected_draft.replace(token, marker)
            replacements.append((marker, token))
        repaired = self._generate(
            [prompt_builder(protected_source, protected_draft)], max_new_tokens
        )[0]
        if any(
            repaired.count(marker) != protected_draft.count(marker)
            for marker, _token in replacements
        ):
            return draft
        for marker, token in replacements:
            repaired = repaired.replace(marker, token)
        return repaired

    def _cjk_repair_prompt(self, source: str, draft: str) -> str:
        return self.runtime.tokenizer.apply_chat_template(
            [
                {
                    "role": "system",
                    "content": (
                        "Edit the English draft into fluent professional English. Translate every remaining "
                        "Chinese fragment in context and fix the surrounding grammar. Preserve all Markdown, "
                        "inline code, URLs, numbers, and bracketed references exactly. Output only the corrected draft."
                    ),
                },
                {"role": "user", "content": f"CHINESE SOURCE:\n{source}\n\nENGLISH DRAFT:\n{draft}"},
            ],
            tokenize=False,
            add_generation_prompt=True,
        )

    def _generate(self, prompts: list[str], max_new_tokens: int = 768) -> list[str]:
        return self.runtime.generate(
            prompts, max_new_tokens, self.target_language == "en"
        )

    def _clean_and_verify(
        self,
        source: str,
        output: str,
        term_markers: dict[str, str],
        allow_cjk_repair: bool = True,
    ) -> str:
        cleaned = output.strip()
        for prefix in ["Translation:", "English translation:", "Chinese translation:", "译文：", "译文:"]:
            if cleaned.startswith(prefix):
                cleaned = cleaned[len(prefix) :].strip()
        if len(cleaned) >= 2 and cleaned[0] == cleaned[-1] and cleaned[0] in {'"', "'"}:
            cleaned = cleaned[1:-1].strip()
        if self.target_language == "en":
            cleaned = re.sub(
                r"\bAI\+\s+Scenario(s?)\b",
                r"AI-Enabled Scenario\1",
                cleaned,
                flags=re.I,
            )
            cleaned = re.sub(
                r"(AI-Enabled Scenarios?)\s*\(Enabled Scenario\)",
                r"\1",
                cleaned,
                flags=re.I,
            )
            if "AI-Enabled Scenario" in term_markers.values():
                cleaned = re.sub(
                    r"(?<!AI-)\bEnabled Scenario(s?)\b",
                    r"AI-Enabled Scenario\1",
                    cleaned,
                    flags=re.I,
                )
        if cleaned.startswith(source) and len(cleaned) > len(source):
            cleaned = cleaned[len(source) :].lstrip("\n :：-")
            for token in reversed(self._immutable_tokens(source)):
                if token not in cleaned:
                    cleaned = token + " " + cleaned
        for reference in re.findall(r"\[[A-Za-z][A-Za-z0-9_-]*:[^\]\n]+\]", source):
            kind, value = reference[1:-1].split(":", 1)
            flexible_reference = re.compile(
                r"\[\s*" + re.escape(kind) + r"\s*:\s*" + re.escape(value) + r"\s*\]",
                re.I,
            )
            cleaned = flexible_reference.sub(reference, cleaned)
        for term, translation in term_markers.items():
            if term in cleaned or translation in cleaned:
                continue
            flexible = re.escape(translation)
            flexible = flexible.replace(r"\ ", r"\s+")
            flexible = flexible.replace("–", r"[-–—]").replace("—", r"[-–—]")
            match = re.search(flexible, cleaned, re.I)
            if match:
                cleaned = cleaned[: match.start()] + translation + cleaned[match.end() :]
        for term, translation in term_markers.items():
            if term not in cleaned and translation not in cleaned:
                cleaned += f" ({translation})"
        for term, translation in term_markers.items():
            replacement = f" {translation} " if self.target_language == "en" else translation
            cleaned = self._replace_outside_immutable(cleaned, term, replacement)
        cleaned = re.sub(r"[ \t]{2,}", " ", cleaned).strip()
        if self.target_language == "en" and self._has_unprotected_cjk(cleaned):
            if allow_cjk_repair:
                repaired = self._repair_preserving_immutable(
                    source,
                    cleaned,
                    self._cjk_repair_prompt,
                    min(640, max(128, int(len(source) * 1.5) + 80)),
                )
                return self._clean_and_verify(source, repaired, term_markers, False)
            residual_phrases = list(
                dict.fromkeys(re.findall(f"[{EAST_ASIAN_CHAR_CLASS}]+", cleaned))
            )
            residual_translations = self.runtime.translate_residual_phrases(
                residual_phrases, self.source_language, self.target_language
            )
            for phrase, translation in zip(residual_phrases, residual_translations):
                while phrase in cleaned:
                    start = cleaned.index(phrase)
                    end = start + len(phrase)
                    replacement = translation.strip()
                    if (
                        start
                        and cleaned[start - 1].isascii()
                        and cleaned[start - 1].isalnum()
                        and replacement[:1].isupper()
                        and not replacement.isupper()
                    ):
                        replacement = replacement[:1].lower() + replacement[1:]
                    if start and cleaned[start - 1].isascii() and cleaned[start - 1].isalnum():
                        replacement = " " + replacement
                    if end < len(cleaned) and cleaned[end].isascii() and cleaned[end].isalnum():
                        replacement += " "
                    cleaned = cleaned[:start] + replacement + cleaned[end:]
            if self._has_unprotected_cjk(cleaned):
                raise RuntimeError(
                    f"translation left Chinese characters in English output: "
                    f"source={source[:160]!r}, output={cleaned[:300]!r}"
                )
        if self.target_language == "zh" and self._has_unprotected_latin(cleaned):
            if allow_cjk_repair:
                repaired = self._repair_preserving_immutable(
                    source,
                    cleaned,
                    self._latin_repair_prompt,
                    min(640, max(128, int(len(source) * 1.3) + 80)),
                )
                return self._clean_and_verify(source, repaired, term_markers, False)
            residual_phrases = self._residual_latin_phrases(cleaned)
            residual_translations = self.runtime.translate_residual_phrases(
                residual_phrases, self.source_language, self.target_language
            )
            for phrase, translation in zip(residual_phrases, residual_translations):
                cleaned = cleaned.replace(phrase, translation.strip())
            if self._has_unprotected_latin(cleaned):
                raise RuntimeError(
                    f"translation left English prose in Chinese output: "
                    f"source={source[:160]!r}, output={cleaned[:300]!r}"
                )
        for translation in term_markers.values():
            cleaned = cleaned.replace(f"{translation} ({translation})", translation)
        if self.target_language == "en":
            cleaned = self._transform_outside_immutable(
                cleaned,
                lambda value: normalize_target_punctuation(value, self.target_language),
            ).strip()
        if re.search(r"\b([A-Za-z][A-Za-z-]*)\b(?:\s+\1\b){4,}", cleaned, re.I):
            raise RuntimeError(
                f"translation contains runaway word repetition: source={source[:160]!r}, "
                f"output={cleaned[:300]!r}"
            )
        if re.search(
            r"validation failure|invalid validation|expected=|actual="
            r"|text to translate|translate the following|preserve markdown punctuation"
            r"|preserve every url|return only the translated text",
            cleaned,
            re.I,
        ):
            raise RuntimeError(
                f"translation leaked repair instructions: source={source[:160]!r}, "
                f"output={cleaned[:300]!r}"
            )
        expansion_limit = (
            max(800, len(source) * 7)
            if self.source_language == "zh" and self.target_language == "en"
            else max(500, len(source) * 5)
        )
        if len(cleaned) > expansion_limit:
            raise RuntimeError(
                f"translation expanded implausibly: source={source[:160]!r}, output={cleaned[:300]!r}"
            )
        if re.search(
            r"does not appear to be|cannot (?:translate|be translated)|no coherent"
            r"|i(?:'|’)m not sure|i am not sure|uncertain how",
            cleaned,
            re.I,
        ):
            raise RuntimeError(
                f"translation returned a refusal instead of translated content: source={source[:160]!r}, "
                f"output={cleaned[:300]!r}"
            )
        source_tokens = self._immutable_tokens(source)
        output_tokens = self._immutable_tokens(cleaned)
        source_counts = Counter(source_tokens)
        output_counts = Counter(output_tokens)
        if source_counts != output_counts and not (source_counts - output_counts):
            for token, count in (output_counts - source_counts).items():
                for _ in range(count):
                    cleaned = cleaned.replace(token, "", 1)
            output_tokens = self._immutable_tokens(cleaned)
            output_counts = Counter(output_tokens)
        if source_counts != output_counts:
            raise RuntimeError(
                "translation changed immutable Markdown/evidence tokens: "
                f"expected={source_tokens!r}, actual={output_tokens!r}, source={source[:160]!r}"
            )
        missing_identifiers = [
            token
            for token in re.findall(r"\b[A-Z][A-Z0-9_-]{2,}\b", source)
            if token not in cleaned
        ]
        if missing_identifiers:
            raise RuntimeError(
                f"translation changed uppercase identifiers {missing_identifiers!r}: "
                f"source={source[:160]!r}, output={cleaned[:300]!r}"
            )
        missing_terms = [
            target for term, target in self.term_map.items() if term in source and target not in cleaned
        ]
        if missing_terms:
            raise RuntimeError(
                f"translation omitted required glossary terms {missing_terms!r}: "
                f"source={source[:160]!r}, output={cleaned[:300]!r}"
            )
        return cleaned

    def translate_many(self, texts: list[str]) -> list[str]:
        results = [""] * len(texts)
        pending: list[tuple[int, str]] = []
        for index, raw in enumerate(texts):
            if PROTECTED_RE.fullmatch(raw.strip()) or not needs_translation(
                raw, self.source_language
            ):
                results[index] = self._transform_outside_immutable(
                    raw,
                    lambda value: normalize_target_punctuation(value, self.target_language),
                )
                continue
            if raw in self.cache:
                results[index] = self.cache[raw]
                continue
            pending.append((index, raw))

        pending.sort(key=lambda item: len(item[1]))
        for start in range(0, len(pending), self.batch_size):
            batch = pending[start : start + self.batch_size]
            prepared_prompts = [self._prompt(raw) for _index, raw in batch]
            prompts = [item[0] for item in prepared_prompts]
            longest_source = max(len(raw) for _index, raw in batch)
            output_limit = min(640, max(96, int(longest_source * 1.25) + 64))
            translated = self._generate(prompts, output_limit)
            failures: list[tuple[int, str, str, dict[str, str], str]] = []
            for (index, raw), output, (_prompt, term_markers) in zip(
                batch, translated, prepared_prompts
            ):
                try:
                    cleaned = self._clean_and_verify(raw, output, term_markers)
                except RuntimeError as exc:
                    failures.append((index, raw, output, term_markers, str(exc)))
                    continue
                results[index] = cleaned
                self.cache[raw] = cleaned
                self._append_cache(raw, cleaned)
            if failures:
                still_failed: list[tuple[int, str, str, dict[str, str], str]] = []
                for index, raw, output, term_markers, error in failures:
                    try:
                        cleaned = self._clean_and_verify(raw, output, term_markers)
                    except RuntimeError as exc:
                        still_failed.append((index, raw, output, term_markers, str(exc)))
                        continue
                    results[index] = cleaned
                    self.cache[raw] = cleaned
                    self._append_cache(raw, cleaned)
                if still_failed:
                    for index, raw, output, term_markers, error in still_failed:
                        repair_limit = min(640, max(128, int(len(raw) * 1.4) + 80))
                        repair = self._generate(
                            [self._repair_prompt(raw, output, error)], repair_limit
                        )[0]
                        try:
                            cleaned = self._clean_and_verify(raw, repair, term_markers)
                        except RuntimeError:
                            smaller_chunks = split_long_text(raw, limit=160)
                            if len(smaller_chunks) > 1:
                                combined = " ".join(self.translate_many(smaller_chunks)).strip()
                            elif self._immutable_tokens(raw):
                                combined = self._translate_preserving_immutable(raw)
                            else:
                                if len(smaller_chunks) == 1:
                                    simple = self._generate(
                                        [self._simple_prompt(raw)],
                                        min(256, max(96, int(len(raw) * 1.5) + 64)),
                                    )[0]
                                    combined = simple
                                else:
                                    combined = raw
                            try:
                                cleaned = self._clean_and_verify(raw, combined, term_markers)
                            except RuntimeError:
                                # A long-line retry can still expose an inline-code span to
                                # the model.  The final fallback translates only prose between
                                # immutable tokens and reinserts every token byte-for-byte.
                                combined = self._translate_preserving_immutable(raw)
                                cleaned = self._clean_and_verify(raw, combined, term_markers)
                        results[index] = cleaned
                        self.cache[raw] = cleaned
                        self._append_cache(raw, cleaned)
        return results

    def translate(self, text: str) -> str:
        chunks = split_long_text(text)
        return " ".join(self.translate_many(chunks)).strip()


def translate_table_line(line: str, translator: LocalTranslator) -> str:
    translated = translator.translate(line)
    if translated.count("|") == line.count("|"):
        return translated
    leading = "|" if line.lstrip().startswith("|") else ""
    trailing = "|" if line.rstrip().endswith("|") else ""
    indent = line[: len(line) - len(line.lstrip())]
    cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
    translated_cells = translator.translate_many(cells)
    return indent + leading + " " + " | ".join(translated_cells) + " " + trailing


def translate_body(body: str, translator: LocalTranslator) -> str:
    lines = body.splitlines()
    result: list[str] = []
    in_fence = False
    translate_fence = False
    pending_indexes: list[int] = []
    pending_texts: list[str] = []
    pending_prefixes: list[tuple[str, str]] = []

    def flush() -> None:
        if not pending_texts:
            return
        translated = translator.translate_many(pending_texts)
        for index, output, (prefix, suffix) in zip(pending_indexes, translated, pending_prefixes):
            result[index] = prefix + output + suffix
        pending_indexes.clear()
        pending_texts.clear()
        pending_prefixes.clear()

    for line in lines:
        if FENCE_RE.match(line):
            flush()
            if not in_fence:
                translate_fence = bool(
                    re.match(r"^\s*(?:```|~~~)\s*(?:text|plain|plaintext)\s*$", line, re.I)
                )
                in_fence = True
            else:
                in_fence = False
                translate_fence = False
            result.append(line)
            continue
        if in_fence:
            flush()
            result.append(translator.translate(line) if translate_fence and line.strip() else line)
            continue
        if not line.strip() or TABLE_SEPARATOR_RE.match(line):
            flush()
            result.append(line)
            continue
        if "|" in line and line.count("|") >= 2:
            flush()
            result.append(translate_table_line(line, translator))
            continue

        image = IMAGE_LINE_RE.match(line)
        if image:
            flush()
            translated_alt = translator.translate(image.group(2))
            if "](" in translated_alt:
                before, after = translated_alt.split("](", 1)
                translated_alt = after.rstrip(")").strip() or before.lstrip("! [").strip()
            translated_alt = translated_alt.replace("[", "(").replace("]", ")")
            result.append(
                image.group(1)
                + "!["
                + translated_alt
                + "]("
                + image.group(3)
                + ")"
                + image.group(4)
            )
            continue

        heading = HEADING_RE.match(line)
        if heading:
            flush()
            title = heading.group(2).strip()
            mapped = SECTION_MAP.get(title)
            if mapped:
                result.append(heading.group(1) + mapped + heading.group(3))
            else:
                result.append(heading.group(1) + translator.translate(title) + heading.group(3))
            continue

        prefix_match = PREFIX_RE.match(line)
        if prefix_match:
            prefix, content = prefix_match.groups()
        else:
            prefix, content = "", line
        long_chunks = split_long_text(content)
        if len(long_chunks) > 1:
            flush()
            result.append(prefix + " ".join(translator.translate_many(long_chunks)))
            continue
        result.append("")
        pending_indexes.append(len(result) - 1)
        pending_texts.append(content)
        pending_prefixes.append((prefix, ""))
        if len(pending_texts) >= translator.batch_size:
            flush()
    flush()
    ending = "\n" if body.endswith("\n") else ""
    return "\n".join(result) + ending


def infer_language(front: list[str], body: str) -> str:
    declared = front_value(front, "language").lower()
    if declared in {"zh", "en"}:
        return declared
    return "zh" if len(CJK_RE.findall(body)) >= len(LATIN_RE.findall(body)) else "en"


def extract_legacy_translation(body: str, target_language: str) -> str | None:
    """Return an embedded legacy translation as a standalone proposal body."""
    if target_language != "zh":
        return None
    marker = re.search(r"(?m)^#\s+中文正式译文\s*$", body)
    if not marker:
        return None
    translated_body = body[marker.end() :].lstrip("\n")
    if not translated_body or not CJK_RE.search(translated_body):
        return None
    return translated_body


def proposal_dirs(repo_root: Path, only: list[str]) -> list[Path]:
    found = sorted(path.parent for path in (repo_root / "submissions").glob("*/*/proposal.md"))
    if not only:
        return found
    wanted = set(only)
    return [path for path in found if path.name in wanted or path.as_posix() in wanted]


def backfill_proposal(
    submission_dir: Path,
    translators: dict[tuple[str, str], LocalTranslator],
    force: bool,
) -> tuple[bool, str]:
    proposal_path = submission_dir / "proposal.md"
    text = proposal_path.read_text(encoding="utf-8")
    front, body = parse_front_matter(text)
    if not front:
        return False, "missing YAML front matter"
    source_language = infer_language(front, body)
    target_language = "en" if source_language == "zh" else "zh"
    translation_name = f"proposal.{target_language}.md"
    translation_path = submission_dir / translation_name
    if translation_path.exists() and not force:
        return False, "translation already exists"

    translator = translators[(source_language, target_language)]
    legacy_translation = extract_legacy_translation(body, target_language)
    title = front_value(front, f"title_{target_language}") or front_value(front, "title")
    summary = front_value(front, f"summary_{target_language}") or front_value(front, "summary")
    if source_language == "zh" and not front_value(front, "title_en"):
        english_name = re.search(r"(?m)英文名\s*[：:]\s*([^；;*\n]+)", body)
        if english_name:
            title = english_name.group(1).strip()
    elif source_language == "en" and not front_value(front, "title_zh"):
        chinese_name = re.search(r"(?mi)(?:中文名|Chinese title)\s*[：:]\s*([^；;*\n]+)", body)
        if chinese_name:
            title = chinese_name.group(1).strip()
    translated_title = (
        title
        if legacy_translation or not needs_translation(title, source_language)
        else translator.translate(title)
    )
    translated_summary = summary if legacy_translation else translator.translate(summary)
    translated_front = set_front_fields(
        front,
        {
            "title": translated_title,
            "summary": translated_summary,
            "language": target_language,
            "translation_of": "proposal.md",
        },
        remove={"translation_file", "chinese_translation"},
    )
    translated_body = legacy_translation or translate_body(body, translator)
    if not legacy_translation:
        translated_body = re.sub(
            r"(?m)^#\s+.*$",
            "# " + translated_title,
            translated_body,
            count=1,
        )
    translation_path.write_text(
        render_document(translated_front, translated_body),
        encoding="utf-8",
    )

    primary_front = set_front_fields(
        front,
        {"translation_file": translation_name},
        remove={"translation_of"},
    )
    proposal_path.write_text(render_document(primary_front, body), encoding="utf-8")
    return True, f"created {translation_name}"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-root", type=Path, default=ROOT)
    parser.add_argument("--cache", type=Path, default=DEFAULT_CACHE)
    parser.add_argument("--runtime", choices=["transformers", "mlx"], default="transformers")
    parser.add_argument("--device", choices=["auto", "cpu", "mps"], default="auto")
    parser.add_argument("--batch-size", type=int, default=16)
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--only", action="append", default=[])
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    repo_root = args.repo_root.resolve()
    zh_to_en, en_to_zh = load_glossary(repo_root / "docs" / "terminology-glossary.md")
    dirs = proposal_dirs(repo_root, args.only)
    if args.limit:
        dirs = dirs[: args.limit]
    directions: set[tuple[str, str]] = set()
    for directory in dirs:
        front, body = parse_front_matter((directory / "proposal.md").read_text(encoding="utf-8"))
        source = infer_language(front, body)
        directions.add((source, "en" if source == "zh" else "zh"))
    runtime = MlxQwenRuntime() if args.runtime == "mlx" else QwenRuntime(args.device)
    translators: dict[tuple[str, str], LocalTranslator] = {}
    for direction in sorted(directions):
        source, target = direction
        translators[direction] = LocalTranslator(
            source,
            target,
            zh_to_en if source == "zh" else en_to_zh,
            args.cache,
            runtime,
            args.batch_size,
        )

    changed = 0
    for index, directory in enumerate(dirs, start=1):
        try:
            did_change, message = backfill_proposal(directory, translators, args.force)
        except Exception as exc:  # keep the long batch resumable and identify the exact package
            print(f"[{index}/{len(dirs)}] ERROR {directory.relative_to(repo_root)}: {exc}", file=sys.stderr)
            return 1
        changed += int(did_change)
        print(f"[{index}/{len(dirs)}] {directory.relative_to(repo_root)}: {message}", flush=True)
    print(f"Backfilled {changed} of {len(dirs)} submissions")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
