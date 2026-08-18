from PIL import Image, ImageDraw
from pathlib import Path

src = Image.open('/home/ubuntu/webdev-static-assets/panarius-hero-partial-hoist.png').convert('RGB')
w, h = src.size
out = src.copy()
# Area occupied by the visible motor/hoist in the approved crop. The basket is below and remains untouched.
left, top, right, bottom = int(w*0.64), 0, int(w*0.82), int(h*0.24)
# Paint a smooth dark workshop patch from a clean neighboring region, preserving the surrounding atmosphere.
clean_x0, clean_x1 = int(w*0.48), int(w*0.61)
for y in range(top, bottom):
    blend = y / max(1, bottom - top)
    for x in range(left, right):
        src_x = int(clean_x0 + (x-left) / max(1, right-left) * (clean_x1-clean_x0))
        base = src.getpixel((src_x, y))
        # Slightly darken the copied area to avoid introducing a visible rectangular patch.
        out.putpixel((x, y), tuple(max(0, int(c * (0.93 - 0.10*blend))) for c in base))

# Keep only a fine vertical cable aligned above the real lifting point.
draw = ImageDraw.Draw(out)
cable_x = int(w * 0.735)
for offset, alpha in [(0, 220), (1, 150), (-1, 150)]:
    col = tuple(int(125 + (255-125)*alpha/255) for _ in range(3))
    draw.line((cable_x + offset, 0, cable_x + offset, int(h*0.215)), fill=col, width=1)
# Subtle cable shadow.
draw.line((cable_x+3, 0, cable_x+3, int(h*0.215)), fill=(15, 20, 25), width=1)

out_path = Path('/home/ubuntu/webdev-static-assets/panarius-hero-cable-only.png')
out.save(out_path, quality=96)
print(out_path)
