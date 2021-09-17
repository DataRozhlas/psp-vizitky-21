# %%
import pandas as pd
import json
import os
import numpy as np


# %%
with open('./js/data.js', 'r', encoding='utf-8') as f:
    d = json.loads(f.read().replace('var data = ', '').rstrip(';'))

# %%
krzast = {
    '1': 'Středočeský',
    '2': 'Jihočeský',
    '3': 'Plzeňský',
    '4': 'Karlovarský',
    '5': 'Ústecký',
    '6': 'Liberecký',
    '7': 'Královéhradecký',
    '8': 'Pardubický',
    '9': 'Vysočina',
    '10': 'Jihomoravský',
    '11': 'Olomoucký',
    '12': 'Zlínský',
    '13': 'Moravskoslezský',
}
# %%
d

# %%
out = '<!DOCTYPE html><meta charset="UTF-8">'
for kd in d.values():
    if kd['file'] == 'x':
        continue
    out += '<h2 id="' + kd['file'] + '">' + kd['jmeno'] + ' (' + kd['partaj'] + '), strana č. ' + kd['file'].split('_')[1] + ', kraj ' + krzast[kd['file'].split('_')[0]] + '</h2>Kód pro vložení do stránky:<br> <textarea style="width: 100%; min-height: 20px" disabled><iframe name="kandidat-kraj" src="https://www.irozhlas.cz/volby/krajske-volby-2020/kandidati-vizitky/kandidat-kraj?' + kd['file'] + '" width="100%" height="239"></iframe></textarea>'


# %%
with open('./iframes.html', 'w', encoding='utf-8') as f:
    f.write(out)



# %%
