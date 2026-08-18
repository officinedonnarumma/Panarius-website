from PIL import Image, ImageDraw

src = "/home/ubuntu/upload/Screenshot2026-08-16alle20.04.45.png"
out = "/home/ubuntu/webdev-static-assets/panarius-technical-drawing-latest.png"
W, H = 2176, 1632
blue = (14, 35, 50)
ivory = (247, 243, 234)
copper = (183, 94, 54)
ochre = (186, 133, 69)
red = (143, 45, 36)

original = Image.open(src).convert("RGB")
# Preserve the entire client artwork; fit inside a generous paper panel without cropping.
max_w, max_h = 2040, 1490
scale = min(max_w / original.width, max_h / original.height)
size = (round(original.width * scale), round(original.height * scale))
art = original.resize(size, Image.Resampling.LANCZOS)

canvas = Image.new("RGB", (W, H), blue)
draw = ImageDraw.Draw(canvas)
panel = (68, 58, W - 68, H - 58)
draw.rounded_rectangle(panel, radius=6, fill=ivory, outline=ochre, width=3)
inner = (82, 72, W - 82, H - 72)
# Center the unchanged drawing on the paper panel.
x = inner[0] + (inner[2] - inner[0] - art.width) // 2
y = inner[1] + (inner[3] - inner[1] - art.height) // 2
canvas.paste(art, (x, y))
# Thin editorial frame outside the technical sheet.
draw.rectangle((42, 42, W - 42, H - 42), outline=copper, width=2)
# Discreet Pompeian-red registration marks in the blue surround.
for cx, cy in [(42, 42), (W - 42, 42), (42, H - 42), (W - 42, H - 42), (W // 2, 42), (W // 2, H - 42)]:
    draw.line((cx - 18, cy, cx + 18, cy), fill=red, width=2)
    draw.line((cx, cy - 18, cx, cy + 18), fill=red, width=2)

canvas.save(out, "PNG", optimize=True)
print(out)
