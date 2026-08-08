# -*- coding: utf-8 -*-
import os
p = os.path.join(r"C:\Users\HP\AppData\Local\Temp\haidian-project\submissions\jaychouchannel\ai-native-jingzhang", "proposal.md")
os.makedirs(os.path.dirname(p), exist_ok=True)
with open(p, "w", encoding="utf-8") as f:
    f.write(open(r"C:\Users\HP\AppData\Local\Temp\haidian-project\gen_content.py", "r", encoding="utf-8").read())
