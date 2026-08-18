from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

src = Path('/home/ubuntu/webdev-static-assets/panarius-technical-drawing-iso.png')
out = Path('/home/ubuntu/webdev-static-assets/panarius-technical-drawing-iso-compact.png')
img = Image.open(src).convert('RGB')
# Trim only unused paper margin above/below; retain all drawing content and labels.
img = img.crop((0, 76, img.width, img.height - 76))
d = ImageDraw.Draw(img)
W, H = img.size
outer, inner_a, inner_b = 24, 46, 57
graphite, soft = '#555650', '#7d7b73'
# Cover the old frame remnants at the new edge with the paper tone, then redraw cleanly.
bg = img.getpixel((8, 8))
d.rectangle((0, 0, W-1, H-1), fill=bg)
# Restore the technical content from the cropped source area by compositing it back.
source = Image.open(src).convert('RGB').crop((0, 76, W, 76 + H))
img.paste(source, (0, 0))
d = ImageDraw.Draw(img)
d.rectangle((outer, outer, W-outer-1, H-outer-1), outline=soft, width=2)
d.rectangle((inner_a, inner_a, W-inner_a-1, H-inner_a-1), outline=graphite, width=4)
d.rectangle((inner_b, inner_b, W-inner_b-1, H-inner_b-1), outline=graphite, width=2)
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 24)
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
    d.text((W - outer - 22, y - th/2 - 2), ch, font=font, fill=graphite)
mark = 22
cx, cy = W//2, H//2
for x, y, vertical in ((cx, outer, False), (cx, H-outer-1, False), (outer, cy, True), (W-outer-1, cy, True)):
    if vertical:
        d.line((x-mark, y, x+mark, y), fill=graphite, width=2)
    else:
        d.line((x, y-mark, x, y+mark), fill=graphite, width=2)
# Keep the center marks clear of nearby text with short, restrained strokes.
img.save(out, format='PNG', optimize=True)
print(out, img.size)
