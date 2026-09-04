# -*- coding: utf-8 -*-
import io, sys, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
BASE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(BASE, "proposal.en.md")

def read(p):
    with open(p, "r", encoding="utf-8") as f: return f.read()
def write(p, s):
    with open(p, "w", encoding="utf-8") as f: f.write(s)

t = read(SRC)
metrics_header = "## Metrics, Area Recalculation, and Compliance Matrix"
cards_start = "**11 full AI+ scenario cards"
public_interest = "## Public Interest & Inclusion (Concept)"

m_idx = t.index(metrics_header)
c_idx = t.index(cards_start)
p_idx = t.index(public_interest)
assert m_idx < c_idx < p_idx, (m_idx, c_idx, p_idx)

cards_block = t[c_idx:p_idx]
# Remove from current location
body = t[:c_idx] + t[p_idx:]
# Insert before metrics header in body
m2 = body.index(metrics_header)
new_t = body[:m2].rstrip() + "\n\n" + cards_block.rstrip() + "\n\n" + body[m2:]

write(SRC, new_t)

print("relocated. new length:", len(new_t))
print("cards before metrics:", new_t.index(cards_start) < new_t.index(metrics_header))
print("public interest after metrics:", new_t.index(metrics_header) < new_t.index(public_interest))
# quick header sanity
import re
heads = [l for l in new_t.splitlines() if l.startswith("## ")]
print("top-level headers:")
for h in heads: print("  ", h)
