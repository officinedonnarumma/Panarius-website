from PIL import Image
import numpy as np
src = Image.open('/home/ubuntu/upload/Screenshot2026-08-17alle17.21.59.png').convert('RGB')
crop = np.asarray(src.crop((159, 89, 520, 252)))
print('shape', crop.shape)
for point in [(0,0),(10,10),(80,80),(162,40)]:
    x,y=point
    print(point, crop[y,x].tolist())
print('min', crop.reshape(-1,3).min(axis=0).tolist(), 'max', crop.reshape(-1,3).max(axis=0).tolist())
