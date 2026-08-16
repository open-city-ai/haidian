#!/usr/bin/env node
"use strict";

// Two denominators, one published number.
//
// Every ratio in this package divides by the provisional SITE-001 area recomputed from the
// submitted geometry, 11,412,825.386 m². The announcement publishes an overall design area
// of 11.4 km² instead, and the two disagree by 12,825.386 m². That gap is bookkeeping, not
// survey: nobody has measured a boundary in a different place. The honest way to carry it is
// to publish both results for the same numerator, say which one the package uses, and say
// why — which is what the surfaces do, and what this test pins.
//
// The failure this guards against is quiet drift. A percentage that loses a trailing zero,
// a hectare figure truncated instead of rounded, a point shift computed from already-rounded
// inputs, or one surface saying 17.50% while another says 17.5% would all look like typos
// and would all be arithmetic claims changing under the reader.
//
// So the test does two independent things. First it recomputes every published figure from
// the declared source areas using exact integer arithmetic — the areas carry three decimals,
// so they are scaled to integers and divided as rationals, and the single ROUND_HALF_UP at
// the display boundary is done as floor((2a + b) / (2b)) on BigInts. No float ever touches
// the rounding, so binary default rounding and banker's rounding cannot creep in through the
// language. Second it reads the ten publication surfaces named in the ledger — six text
// surfaces and four PDFs, the PDFs through an independent reader rather than the builder's
// own report — and requires the recomputed strings to appear literally on every one of them,
// in both languages, with the truncated spellings absent.
//
// The expected values are written here as literals as well as recomputed. Both have to move
// together for this file to pass, which is the only arrangement where the test can still
// fail when the published number is wrong.
//
// Read-only. Usage: node test-denominator-discipline.js

const contract = require("./key-area-contract.js");

const { readText, readJson, exists, pngSize, pdfDocument, harness, cli } = contract;

// The ten publication surfaces the ledger names for this criterion, minus the figures, which
// are checked separately below because they carry alt text rather than numbers.
const SURFACES = [
  { path: "proposal.md", language: "zh", kind: "text" },
  { path: "report/proposal.html", language: "zh", kind: "text" },
  { path: "visual/index.html", language: "zh", kind: "text" },
  { path: "drawings/a3-booklet.pdf", language: "zh", kind: "pdf" },
  { path: "drawings/a0-boards.pdf", language: "zh", kind: "pdf" },
  { path: "proposal.en.md", language: "en", kind: "text" },
  { path: "report/proposal.en.html", language: "en", kind: "text" },
  { path: "visual/index.en.html", language: "en", kind: "text" },
  { path: "drawings/a3-booklet.en.pdf", language: "en", kind: "pdf" },
  { path: "drawings/a0-boards.en.pdf", language: "en", kind: "pdf" },
];

// The eight display strings the ledger fixes. Seven are pure numerals and read identically in
// both languages; only the hectare figure carries a unit that has to be written in the
// language of the surface, so the numeral is shared and the unit is branched.
const SHARED_DISPLAY_STRINGS = ["17.48%", "17.50%", "+0.02", "28.07%", "28.11%", "+0.03", "0.1125%"];
const HECTARE_DIFFERENCE = { numeral: "1.28", zh: "1.28 公顷", en: "1.28 ha" };

// The disclosure that makes the eight strings readable: both denominators, the gap between
// them, the areas they divide, the rounding rule, and the gate whose closure retires the
// provisional denominator.
const SHARED_DISCLOSURES = [
  "11,412,825.386",
  "11,400,000",
  "12,825.386",
  "1,141.3",
  "320.4",
  "199.5",
  "ROUND_HALF_UP",
  "D01",
];

const UNIT_DISCLOSURES = {
  zh: ["11,412,825.386 平方米", "11.4 平方公里"],
  en: ["11,412,825.386 m²", "11.4 km²"],
};

// Spellings that would mean the arithmetic had been truncated or had lost a significant
// trailing zero. None of them is a substring of a correct display string, so a surface that
// contains one has genuinely published a different number.
const FORBIDDEN_DISPLAY_STRINGS = ["17.5%", "17.4%", "28.0%", "28.1%", "0.11%", "0.112%"];

// The disagreement share is the one ratio in the package with a denominator that is neither
// of the two site areas, and it is the one most easily misread as a finding. Any surface that
// prints it has to print the fraction it came from and the sentence that says the network was
// connected by construction.
const CONNECTIVITY_SHARE = "57.1%";
const CONNECTIVITY_REQUIRED = {
  zh: ["8/14 = 57.1%", "由算法构造保证", "不是发现", "不证明对北京的最优性"],
  en: [
    "8/14 = 57.1%",
    "guaranteed by construction and are therefore not findings",
    "or optimality for Beijing",
  ],
};

// The declared source areas. Everything published is derived from these four numbers.
const SITE_AREA_METRIC = "site_area_sqm";
const OFFICIAL_AREA_METRIC = "official_overall_design_area_sqm";
const GREEN_AREA_METRIC = "green_space_area_sqm";
const GREEN_RATIO_METRIC = "green_ratio";
const LAND_USE_GEOMETRY = "geometry/land_use.geojson";
const OPEN_SPACE_CODE = "1401";

// The five bilingual proposal figures the ledger lists alongside the numeric surfaces.
const FIGURE_BASES = [
  "site-overview",
  "land-use-structure",
  "key-areas",
  "mobility-bluegreen",
  "metrics-evidence",
];

const FIGURE_SURFACES = [
  { proposal: "proposal.md", report: "report/proposal.html", viewer: "visual/index.html", language: "zh" },
  {
    proposal: "proposal.en.md",
    report: "report/proposal.en.html",
    viewer: "visual/index.en.html",
    language: "en",
  },
];

const CJK = /[㐀-䶿一-鿿　-〿＀-￯]/;

// --- exact decimal arithmetic -------------------------------------------------------------
// The source areas carry at most three decimals, so scaling by 1000 makes them integers and
// every ratio below is an exact rational. Nothing is rounded until the display boundary.

function toMilli(value, label, fail) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    fail(`${label} is not a finite number`);
    return 0n;
  }
  const scaled = value * 1000;
  const rounded = Math.round(scaled);
  if (Math.abs(scaled - rounded) > 1e-6) {
    fail(`${label} carries more than the three decimals the area declarations use (${value})`);
  }
  return BigInt(rounded);
}

// ROUND_HALF_UP for a positive rational a / b: floor(a / b + 1/2) = floor((2a + b) / (2b)).
// BigInt division truncates toward zero, which is floor for positive operands.
function halfUp(numerator, denominator) {
  return (2n * numerator + denominator) / (2n * denominator);
}

function decimalString(scaled, digits) {
  const text = scaled.toString().padStart(digits + 1, "0");
  if (digits === 0) return text;
  return `${text.slice(0, text.length - digits)}.${text.slice(text.length - digits)}`;
}

function grouped(text) {
  const [head, tail] = text.split(".");
  const withCommas = head.replace(/\B(?=(\d{3})+$)/g, ",");
  return tail === undefined ? withCommas : `${withCommas}.${tail}`;
}

function percent(numeratorMilli, denominatorMilli, digits) {
  const scale = 10n ** BigInt(digits);
  return `${decimalString(halfUp(numeratorMilli * 100n * scale, denominatorMilli), digits)}%`;
}

function hectares(sqmMilli, digits) {
  const scale = 10n ** BigInt(digits);
  return grouped(decimalString(halfUp(sqmMilli * scale, 10000000n), digits));
}

// The shift between the same numerator over two denominators, computed in one step from the
// unrounded ratios: num/small - num/large = num * (large - small) / (large * small).
function pointShift(numeratorMilli, largeDenominatorMilli, smallDenominatorMilli, digits) {
  const scale = 10n ** BigInt(digits);
  const numerator = numeratorMilli * 100n * scale * (largeDenominatorMilli - smallDenominatorMilli);
  const denominator = largeDenominatorMilli * smallDenominatorMilli;
  return decimalString(halfUp(numerator, denominator), digits);
}

// --- surface reading ----------------------------------------------------------------------

function surfaceText(surface, fail) {
  if (!exists(surface.path)) {
    fail(`${surface.path} is missing, so the denominator disclosure cannot be read`);
    return "";
  }
  if (surface.kind === "pdf") {
    const document = pdfDocument(surface.path);
    if (document.cmap_conflicts.length > 0) {
      fail(`${surface.path} has conflicting ToUnicode entries: ${document.cmap_conflicts.join("; ")}`);
    }
    if (document.unmapped_glyphs.length > 0) {
      fail(`${surface.path} shows ${document.unmapped_glyphs.length} glyphs that map to no character`);
    }
    return document.text;
  }
  return readText(surface.path);
}

// A published number can be broken across a line, a text run or an HTML tag without changing
// what the reader sees, so presence is judged with the whitespace removed from both sides.
function dense(text) {
  return text.replace(/\s+/g, "");
}

function figureBlock(html, source) {
  const at = html.indexOf(source);
  if (at < 0) return null;
  const opened = html.lastIndexOf("<figure", at);
  const closed = html.indexOf("</figure>", at);
  if (opened < 0 || closed < 0) return null;
  return html.slice(opened, closed);
}

function run() {
  return harness(
    "KA-DENOM",
    "every published ratio is recomputed from the declared areas with one ROUND_HALF_UP at the display boundary and appears literally on all ten publication surfaces in both languages",
    (fail) => {
      const detail = {};

      // 1. Recompute the eight display strings from the declared areas.
      const metrics = readJson("metrics.json").metrics;
      const required = [SITE_AREA_METRIC, OFFICIAL_AREA_METRIC, GREEN_AREA_METRIC, GREEN_RATIO_METRIC];
      for (const id of required) {
        if (!metrics[id]) fail(`metrics.json declares no ${id}, so the denominators cannot be recomputed`);
      }

      const site = toMilli(metrics[SITE_AREA_METRIC].value, SITE_AREA_METRIC, fail);
      const official = toMilli(metrics[OFFICIAL_AREA_METRIC].value, OFFICIAL_AREA_METRIC, fail);
      const green = toMilli(metrics[GREEN_AREA_METRIC].value, GREEN_AREA_METRIC, fail);
      if (site <= official) {
        fail("the provisional site area is not larger than the published official area, so the disclosed gap has the wrong sign");
      }
      const gap = site - official;

      const landUse = readJson(LAND_USE_GEOMETRY);
      let openSpace = 0n;
      let openSpaceFeatures = 0;
      for (const feature of landUse.features || []) {
        const properties = feature.properties || {};
        if (properties.land_use_code !== OPEN_SPACE_CODE) continue;
        openSpaceFeatures += 1;
        openSpace += toMilli(properties.area_sqm_declared, `${properties.id} area_sqm_declared`, fail);
      }
      if (openSpaceFeatures === 0) {
        fail(`${LAND_USE_GEOMETRY} declares no ${OPEN_SPACE_CODE} land use, so 320.4 ha has no source`);
      }

      const computed = {
        site_hectares: hectares(site, 1),
        gap_sqm: grouped(decimalString(gap, 3)),
        gap_hectares: hectares(gap, 2),
        gap_share_of_official: percent(gap, official, 4),
        green_hectares: hectares(green, 1),
        green_provisional: percent(green, site, 2),
        green_official: percent(green, official, 2),
        green_shift: pointShift(green, site, official, 2),
        open_space_hectares: hectares(openSpace, 1),
        open_space_provisional: percent(openSpace, site, 2),
        open_space_official: percent(openSpace, official, 2),
        open_space_shift: pointShift(openSpace, site, official, 2),
      };
      detail.computed = computed;
      detail.open_space_features = openSpaceFeatures;

      const expected = {
        site_hectares: "1,141.3",
        gap_sqm: "12,825.386",
        gap_hectares: "1.28",
        gap_share_of_official: "0.1125%",
        green_hectares: "199.5",
        green_provisional: "17.48%",
        green_official: "17.50%",
        green_shift: "0.02",
        open_space_hectares: "320.4",
        open_space_provisional: "28.07%",
        open_space_official: "28.11%",
        open_space_shift: "0.03",
      };
      for (const [key, want] of Object.entries(expected)) {
        if (computed[key] !== want) {
          fail(`${key} recomputes to ${computed[key]}, but the package publishes ${want}`);
        }
      }

      // The stored ratio has to agree with the ratio the published percentage came from, so a
      // metric edited in isolation cannot leave the disclosure describing a different number.
      const storedGreenRatio = metrics[GREEN_RATIO_METRIC].value;
      if (percent(toMilli(storedGreenRatio * 1000000, GREEN_RATIO_METRIC, fail), 1000000000n, 2) !== "17.48%") {
        fail(`${GREEN_RATIO_METRIC} is ${storedGreenRatio}, which does not display as 17.48%`);
      }

      // 2. Every recomputed string appears on every surface, in the language of that surface.
      const surfaces = {};
      for (const surface of SURFACES) {
        const text = surfaceText(surface, fail);
        const packed = dense(text);
        const missing = [];
        const present = [];

        for (const wanted of SHARED_DISPLAY_STRINGS) {
          if (!packed.includes(dense(wanted))) missing.push(wanted);
        }
        if (!packed.includes(HECTARE_DIFFERENCE.numeral)) missing.push(HECTARE_DIFFERENCE.numeral);
        if (!packed.includes(dense(HECTARE_DIFFERENCE[surface.language]))) {
          missing.push(HECTARE_DIFFERENCE[surface.language]);
        }
        for (const wanted of SHARED_DISCLOSURES) {
          if (!packed.includes(dense(wanted))) missing.push(wanted);
        }
        for (const wanted of UNIT_DISCLOSURES[surface.language]) {
          if (!packed.includes(dense(wanted))) missing.push(wanted);
        }
        if (missing.length > 0) {
          fail(`${surface.path} does not publish ${missing.join(", ")}`);
        }

        for (const banned of FORBIDDEN_DISPLAY_STRINGS) {
          if (packed.includes(banned)) present.push(banned);
        }
        // The other language's hectare unit must not leak onto this surface.
        const otherUnit = HECTARE_DIFFERENCE[surface.language === "zh" ? "en" : "zh"];
        if (packed.includes(dense(otherUnit))) present.push(otherUnit);
        if (present.length > 0) {
          fail(`${surface.path} publishes the wrong spelling ${present.join(", ")}`);
        }

        if (packed.includes(dense(CONNECTIVITY_SHARE))) {
          for (const wanted of CONNECTIVITY_REQUIRED[surface.language]) {
            if (!packed.includes(dense(wanted))) {
              fail(`${surface.path} states ${CONNECTIVITY_SHARE} without stating ${wanted}`);
            }
          }
        }

        surfaces[surface.path] = {
          language: surface.language,
          characters: text.length,
          states_disagreement_share: packed.includes(dense(CONNECTIVITY_SHARE)),
        };
      }
      detail.surfaces = surfaces;

      // 3. The five bilingual figures: one file per language, alt text carried unchanged into
      // the rendered report and its caption, and no reference to the other language's file.
      const figures = {};
      for (const group of FIGURE_SURFACES) {
        const proposal = exists(group.proposal) ? readText(group.proposal) : "";
        const report = exists(group.report) ? readText(group.report) : "";
        const viewer = exists(group.viewer) ? readText(group.viewer) : "";
        if (!proposal || !report || !viewer) {
          fail(`the ${group.language} figure surfaces are incomplete`);
          continue;
        }

        for (const base of FIGURE_BASES) {
          const suffix = group.language === "en" ? ".en" : "";
          const file = `assets/figures/${base}${suffix}.png`;
          const wrong = `figures/${base}${group.language === "en" ? "" : ".en"}.png`;
          const key = `${base}${suffix}`;

          if (!exists(file)) {
            fail(`${file} is referenced by the ${group.language} surfaces but is not in the package`);
            continue;
          }
          const size = pngSize(file);
          if (!size || !(size.width > 0) || !(size.height > 0)) {
            fail(`${file} is not a readable PNG`);
            continue;
          }

          const markdown = proposal.match(
            new RegExp(`!\\[([^\\]]*)\\]\\(assets/figures/${base}${suffix.replace(".", "\\.")}\\.png\\)`),
          );
          if (!markdown) {
            fail(`${group.proposal} does not embed ${file}`);
            continue;
          }
          const alt = markdown[1];
          if (alt.trim().length === 0) fail(`${group.proposal} embeds ${file} with empty alt text`);
          if (group.language === "en" && CJK.test(alt)) {
            fail(`${group.proposal} gives ${file} Chinese alt text`);
          }
          if (group.language === "zh" && !CJK.test(alt)) {
            fail(`${group.proposal} gives ${file} alt text with no Chinese in it`);
          }

          const block = figureBlock(report, `../${file}`);
          if (!block) {
            fail(`${group.report} does not render ${file} inside a figure`);
            continue;
          }
          const reportAlt = block.match(/<img[^>]*\salt="([^"]*)"/);
          const caption = block.match(/<figcaption[^>]*>([\s\S]*?)$/);
          if (!reportAlt || reportAlt[1] !== alt) {
            fail(`${group.report} gives ${file} alt text that differs from ${group.proposal}`);
          }
          if (!caption || caption[1].trim().length === 0) {
            fail(`${group.report} renders ${file} with no caption`);
          } else if (caption[1].replace(/<[^>]*>/g, "").trim() !== alt.trim()) {
            fail(`${group.report} captions ${file} with text that differs from its alt text`);
          }

          const viewerBlock = figureBlock(viewer, `../${file}`);
          if (!viewerBlock) {
            fail(`${group.viewer} does not show ${file} inside a figure`);
            continue;
          }
          const viewerAlt = viewerBlock.match(/<img[^>]*\salt="([^"]*)"/);
          const viewerCaption = viewerBlock.match(/<figcaption[^>]*>([\s\S]*?)$/);
          if (!viewerAlt || viewerAlt[1].trim().length === 0) {
            fail(`${group.viewer} shows ${file} with empty alt text`);
          } else if (group.language === "en" && CJK.test(viewerAlt[1])) {
            fail(`${group.viewer} gives ${file} Chinese alt text`);
          } else if (group.language === "zh" && !CJK.test(viewerAlt[1])) {
            fail(`${group.viewer} gives ${file} alt text with no Chinese in it`);
          }
          if (!viewerCaption || viewerCaption[1].replace(/<[^>]*>/g, "").trim().length === 0) {
            fail(`${group.viewer} shows ${file} with no caption`);
          }

          for (const [label, text] of [
            [group.proposal, proposal],
            [group.report, report],
            [group.viewer, viewer],
          ]) {
            if (text.includes(wrong)) {
              fail(`${label} references the other language's ${wrong}`);
            }
          }

          figures[key] = { width: size.width, height: size.height, alt_characters: alt.length };
        }
      }
      detail.figures = Object.keys(figures).length;
      detail.figure_files = figures;

      return detail;
    },
  );
}

if (require.main === module) cli(run());

module.exports = { run };
