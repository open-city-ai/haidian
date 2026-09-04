# -*- coding: utf-8 -*-
import io, sys, os, json, hashlib
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
BASE = os.path.dirname(os.path.abspath(__file__))

def sha256(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(65536), b""):
            h.update(b)
    return h.hexdigest()

manifest_path = os.path.join(BASE, "manifest.json")
with open(manifest_path, "r", encoding="utf-8") as f:
    m = json.load(f)

updated = 0
for entry in m["files"]:
    p = entry["path"]
    fp = os.path.join(BASE, p)
    if os.path.exists(fp):
        new = sha256(fp)
        old = entry.get("sha256")
        if old != new:
            entry["sha256"] = new
            updated += 1

# Add the 5 English proposal figures (translation_of ZH figure)
en_figs = [
    ("assets/figures/key-areas.en.png", "assets/figures/key-areas.png"),
    ("assets/figures/land-use-structure.en.png", "assets/figures/land-use-structure.png"),
    ("assets/figures/metrics-evidence.en.png", "assets/figures/metrics-evidence.png"),
    ("assets/figures/mobility-bluegreen.en.png", "assets/figures/mobility-bluegreen.png"),
    ("assets/figures/site-overview.en.png", "assets/figures/site-overview.png"),
]
existing = {e["path"] for e in m["files"]}
added = 0
for en, zh in en_figs:
    if en in existing:
        continue
    fp = os.path.join(BASE, en)
    if not os.path.exists(fp):
        print("MISSING:", en)
        continue
    m["files"].append({
        "path": en,
        "role": "proposal_figure",
        "required": True,
        "sha256": sha256(fp),
        "language": "en",
        "translation_of": zh,
    })
    added += 1

# Bump generated_at to v1.7 timestamp
m["generated_at"] = "2026-09-01T20:30:00+08:00"

with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(m, f, ensure_ascii=False, indent=2)

print("sha256 updated:", updated)
print("EN figures added:", added)
print("total files:", len(m["files"]))
# sanity: verify all required-on-disk files have a sha matching actual
bad = 0
for e in m["files"]:
    fp = os.path.join(BASE, e["path"])
    if os.path.exists(fp) and e.get("sha256") != sha256(fp):
        bad += 1
        print("MISMATCH:", e["path"])
print("post-write mismatches:", bad)
