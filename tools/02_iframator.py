# %%
import pandas as pd
import json
import os
import numpy as np


# %%
with open('../js/data.js', 'r', encoding='utf-8') as f:
    d = json.loads(f.read().replace('var data = ', '').rstrip(';'))

# %%
kraje = pd.read_excel(
    './psvolkr.xlsx').set_index('VOLKRAJ')['NAZVOLKRAJ'].to_dict()
# %%
d

# %%
out = '<!DOCTYPE html><meta charset="UTF-8">'
for kd in d.values():
    if kd['jmeno'] == '&nbsp;':
        continue
    uid = '_'.join(kd['file'].split('.')[0].split('_')[:2])
    out += '<h3 id="{0}">{1} ({2}), strana č. {3}, kraj {4}</h3><p class="text-sm  text-sans-serif">Kód pro vložení do stránky:</p><textarea class="img text-sans-serif text-xs mb--20" disabled><iframe name="kandidat-kraj" src="https://www.irozhlas.cz/volby/parlamentni-volby-2021/kandidati-vizitky/embed?{5}" width="100%" height="239"></iframe></textarea>'.format(
        uid,
        kd['jmeno'],
        kd['partaj'],
        uid.split('_')[1],
        kraje[int(uid.split('_')[0])],
        uid
    )


# %%
with open('./iframes.html', 'w', encoding='utf-8') as f:
    f.write(out)

# %%
