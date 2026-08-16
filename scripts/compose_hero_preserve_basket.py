from PIL import Image
from pathlib import Path

base = Image.open('/home/ubuntu/upload/panarius-hero-two-meters-high-corrected.png').convert('RGB')
scene = Image.open('/home/ubuntu/upload/panarius-hero-finished-in-use.png').convert('RGB').resize(base.size, Image.Resampling.LANCZOS)

# Keep the entire basket and its suspension geometry from the base image untouched.
# Replace only the upper workshop band containing rail and hoist from the scene reference.
cut_y = 575
feather = 90
mask = Image.new('L', base.size, 0)
pix = mask.load()
for y in range(base.height):
    if y <= cut_y - feather:
        value = 255
    elif y < cut_y:
        value = int(255 * (cut_y - y) / feather)
    else:
        value = 0
    for x in range(base.width):
        pix[x, y] = value

out = Image.composite(scene, base, mask)
# Keep the left text-safe negative space dark while preserving the scene's right-side machinery.
shade = Image.new('RGBA', base.size, (0, 0, 0, 0))
shade_px = shade.load()
for x in range(base.width):
    alpha = int(85 * max(0, 1 - x / (base.width * 0.62)))
    for y in range(base.height):
        shade_px[x, y] = (0, 0, 0, alpha)
out = Image.alpha_composite(out.convert('RGBA'), shade).convert('RGB')
Path('/home/ubuntu/webdev-static-assets').mkdir(parents=True, exist_ok=True)
out.save('/home/ubuntu/webdev-static-assets/panarius-hero-preserved-basket-real-hoist.png', quality=96)
print('/home/ubuntu/webdev-static-assets/panarius-hero-preserved-basket-real-hoist.png')
