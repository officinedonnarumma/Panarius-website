from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

src = Path('/home/ubuntu/webdev-static-assets/panarius-technical-drawing-refined.png')
out = Path('/home/ubuntu/webdev-static-assets/panarius-technical-drawing-final.png')
img = Image.open(src).convert('RGB')
# Keep the complete drawing and title block; remove only unused outer paper margins.
left, top, right, bottom = 620, 300, 3060, 2500
img = img.crop((left, top, right, bottom))
img = ImageEnhance.Contrast(img).enhance(1.035)
img = img.filter(ImageFilter.UnsharpMask(radius=0.95, percent=105, threshold=3))
d = ImageDraw.Draw(img)
margin = 22
outer = (margin, margin, img.width - margin - 1, img.height - margin - 1)
inner = (margin + 8, margin + 8, img.width - margin - 9, img.height - margin - 9)
d.rectangle(outer, outline='#5b5b58', width=2)
d.rectangle(inner, outline='#8e8a82', width=1)
# Minimal registration ticks at the four corners.
for x in (margin - 1, img.width - margin - 1):
    d.line((x, margin - 13, x, margin + 1), fill='#5b5b58', width=1)
    d.line((x, img.height - margin - 1, x, img.height - margin + 13), fill='#5b5b58', width=1)
for y in (margin - 1, img.height - margin - 1):
    d.line((margin - 13, y, margin + 1, y), fill='#5b5b58', width=1)
    d.line((img.width - margin - 1, y, img.width - margin + 13, y), fill='#5b5b58', width=1)
img.save(out, format='PNG', optimize=True)
print(out, img.size)
