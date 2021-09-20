# %%
from PIL import Image
import os
from pydub import AudioSegment

# %%
pth = 'C:/Users/datastory/Desktop/vizshitky/'
for file in os.listdir(pth + 'audio/'):
    print(file)
    sound = AudioSegment.from_file(pth + 'audio/' + file)
    sound.export(pth + 'aconv/' + file, format='mp3', bitrate='96k')
 # %%
# %%
