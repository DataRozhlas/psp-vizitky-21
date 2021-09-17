# %%
import pandas as pd
import os
import json


# %%
lidi = pd.read_excel('./psrk.xlsx')
strany = pd.read_excel(
    './psrkl.xlsx').set_index('KSTRANA')['ZKRATKAK30'].to_dict()
kraje = pd.read_excel(
    './psvolkr.xlsx').set_index('VOLKRAJ')['NAZVOLKRAJ'].to_dict()

# %%
strany
# %%
lidi['strana'] = lidi.KSTRANA.apply(lambda x: strany[x])
lidi['kraj'] = lidi.VOLKRAJ.apply(lambda x: kraje[x])

# %%
lidi['uid'] = lidi.apply(lambda row: str(
    row['VOLKRAJ']) + '_' + str(row['KSTRANA']) + '_' + str(row['PORCISLO']), axis=1)

# %%
# %%

# %%
lidi[[
    'JMENO',
    'PRIJMENI',
    'POVOLANI',
    'kraj',
    'strana',
    'uid'
]].to_excel('sablona.xlsx')

# %%
photos = os.listdir('../media/foto/')
audios = os.listdir('../media/audio/')

# %%
data = {}
for kraj in lidi.VOLKRAJ.unique():
    for strana in lidi.KSTRANA.unique():
        puid = str(kraj) + '_' + str(strana) + '_'
        f = list(filter(lambda x: x.startswith(puid), photos))
        af = list(filter(lambda x: x.startswith(puid), audios))
        jmeno = '&nbsp;'
        povolani = ''
        partaj = ''
        file = 'face.jpg'
        afile = ''
        pozn = ''
        # strana nema v kraji zastoupeni
        if len(f) == len(af) == 0:
            partaj = strany[strana]
            pozn = 'Strana možnost natočit vizitku nevyužila.'

        # strana ma zastoupeni, bez fotky
        if (len(f) == 0) & (len(af) != 0):
            ids = list(map(int, af[0].split('.')[0].split('_')))
            sel = list(lidi[(lidi.VOLKRAJ == ids[0]) & (lidi.KSTRANA ==
                                                        ids[1]) & (lidi.PORCISLO == ids[2])].to_dict(orient='index').values())[0]
            print(sel)
            jmeno = sel['JMENO'] + ' ' + sel['PRIJMENI']
            povolani = sel['POVOLANI']
            partaj = strany[strana]
            afile = af[0]
            pozn = 'Fotografie není k dispozici.'

        if (len(f) != 0) & (len(af) == 0):
            ids = list(map(int, f[0].split('.')[0].split('_')))
            sel = list(lidi[(lidi.VOLKRAJ == ids[0]) & (lidi.KSTRANA ==
                                                        ids[1]) & (lidi.PORCISLO == ids[2])].to_dict(orient='index').values())[0]

            jmeno = sel['JMENO'] + ' ' + sel['PRIJMENI']
            povolani = sel['POVOLANI']
            partaj = strany[strana]
            file = f[0]
            pozn = 'Audio není k dispozici.'

        # strana ma vizitku
        if (len(f) != 0) & (len(af) != 0):
            ids = list(map(int, f[0].split('.')[0].split('_')))
            sel = list(lidi[(lidi.VOLKRAJ == ids[0]) & (lidi.KSTRANA ==
                                                        ids[1]) & (lidi.PORCISLO == ids[2])].to_dict(orient='index').values())[0]

            jmeno = sel['JMENO'] + ' ' + sel['PRIJMENI']
            povolani = sel['POVOLANI']
            partaj = strany[strana]
            file = f[0]
            afile = af[0]
            pozn = ''

        data[puid.rstrip('_')] = {
            'jmeno': jmeno,
            'povolani': povolani,
            'partaj': partaj,
            'file': file,
            'afile': afile,
            'pozn': pozn,
        }

# %%
data
# %%
with open('../js/data.js', 'w', encoding='utf-8') as f:
    f.write('var data = ' + json.dumps(data, ensure_ascii=False) + ';')
# %%
# %%
