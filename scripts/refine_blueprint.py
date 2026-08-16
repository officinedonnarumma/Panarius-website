from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

src = Path('/home/ubuntu/webdev-static-assets/panarius-technical-drawing-wide.webp')
out = Path('/home/ubuntu/webdev-static-assets/panarius-technical-drawing-refined.png')
img = Image.open(src).convert('RGB')
# Preserve all content, upscale only for a cleaner browser render.
scale = 2
img = img.resize((img.width * scale, img.height * scale), Image.Resampling.LANCZOS)
# Gentle local clarity improvement; no semantic redraw or text replacement.
img = ImageEnhance.Contrast(img).enhance(1.04)
img = img.filter(ImageFilter.UnsharpMask(radius=1.15, percent=115, threshold=3))

d = ImageDraw.Draw(img)
# Technical drawing frame: neutral graphite double rule with small offset, not orange.
margin = 26
outer = (margin, margin, img.width - margin - 1, img.height - margin - 1)
inner = (margin + 9, margin + 9, img.width - margin - 10, img.height - margin - 10)
for box, fill, width in ((outer, '#5b5b58', 2), (inner, '#8e8a82', 1)):
    d.rectangle(box, outline=fill, width=width)
# Small registration ticks, typical of technical sheets.
tick = 18
for x in (margin - 1, img.width - margin - 1):
    d.line((x, margin - tick, x, margin + 1), fill='#5b5b58', width=1)
    d.line((x, img.height - margin - 1, x, img.height - margin + tick), fill='#5b5b58', width=1)
for y in (margin - 1, img.height - margin - 1):
    d.line((margin - tick, y, margin + 1, y), fill='#5b5b58', width=1)
    d.line((img.width - margin - 1, y, img.width - margin + tick, y), fill='#5b5b58', width=1)
img.save(out, format='PNG', optimize=True)
print(out)
