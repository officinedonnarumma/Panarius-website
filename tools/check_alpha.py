from PIL import Image
import numpy as np
im = Image.open('/home/ubuntu/webdev-static-assets/officine-donnarumma-logo-negative-clean-local.png').convert('RGBA')
a = np.asarray(im)[:, :, 3]
print('size', im.size, 'mode', im.mode)
print('corners', [int(a[0,0]), int(a[0,-1]), int(a[-1,0]), int(a[-1,-1])])
print('minmax', int(a.min()), int(a.max()), 'nonzero', float((a>0).mean()), 'opaque', float((a>250).mean()))
