from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

src = Path('/home/ubuntu/webdev-static-assets/panarius-technical-drawing-final.png')
out = Path('/home/ubuntu/webdev-static-assets/panarius-technical-drawing-iso.png')
img = Image.open(src).convert('RGB')
# Remove only the previous frame area; the technical drawing and title block remain untouched.
img = img.crop((46, 46, img.width - 46, img.height - 46))
d = ImageDraw.Draw(img)
W, H = img.size
bg = img.getpixel((4, 4))
graphite = '#555650'
soft = '#7d7b73'
# ISO-style visual hierarchy: thin outer border, heavier double inner border.
outer = 24
inner_a = 45
inner_b = 56
d.rectangle((outer, outer, W-outer-1, H-outer-1), outline=soft, width=2)
d.rectangle((inner_a, inner_a, W-inner_a-1, H-inner_a-1), outline=graphite, width=4)
d.rectangle((inner_b, inner_b, W-inner_b-1, H-inner_b-1), outline=graphite, width=2)
# Typeface available in the sandbox; labels are intentionally small and technical.
font_path = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
font = ImageFont.truetype(font_path, 24)
small = ImageFont.truetype(font_path, 18)
# Zone labels: letters on top/bottom, numbers on left/right.
letters = 'ABCDEF'
for i, ch in enumerate(letters):
    x = inner_a + (W - 2*inner_a) * (i + 0.5) / len(letters)
    tw = d.textbbox((0,0), ch, font=font)[2]
    d.text((x - tw/2, outer + 7), ch, font=font, fill=graphite)
    d.text((x - tw/2, H - outer - 31), ch, font=font, fill=graphite)
for i, ch in enumerate('12345'):
    y = inner_a + (H - 2*inner_a) * (i + 0.5) / 5
    th = d.textbbox((0,0), ch, font=font)[3]
    d.text((outer + 8, y - th/2 - 2), ch, font=font, fill=graphite)
    tw = d.textbbox((0,0), ch, font=font)[2]
    d.text((W - outer - 22, y - th/2 - 2), ch, font=font, fill=graphite)
# Center marks at the midpoint of each sheet edge.
mark = 22
cx, cy = W//2, H//2
for x, y, vertical in ((cx, outer, False), (cx, H-outer-1, False), (outer, cy, True), (W-outer-1, cy, True)):
    if vertical:
        d.line((x-mark, y, x+mark, y), fill=graphite, width=2)
        d.line((x-mark, y-7, x-mark, y+7), fill=soft, width=1)
        d.line((x+mark, y-7, x+mark, y+7), fill=soft, width=1)
    else:
        d.line((x, y-mark, x, y+mark), fill=graphite, width=2)
        d.line((x-7, y-mark, x+7, y-mark), fill=soft, width=1)
        d.line((x-7, y+mark, x+7, y+mark), fill=soft, width=1)
# Small zone separators aligned with coordinate labels.
for i in range(1, len(letters)):
    x = round(inner_a + (W - 2*inner_a) * i / len(letters))
    d.line((x, inner_a-8, x, inner_a+8), fill=soft, width=1)
    d.line((x, H-inner_a-8, x, H-inner_a+8), fill=soft, width=1)
for i in range(1, 5):
    y = round(inner_a + (H - 2*inner_a) * i / 5)
    d.line((inner_a-8, y, inner_a+8, y), fill=soft, width=1)
    d.line((W-inner_a-8, y, W-inner_a+8, y), fill=soft, width=1)
img.save(out, format='PNG', optimize=True)
print(out, img.size)
