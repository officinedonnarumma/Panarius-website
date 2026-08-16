from PIL import Image
from pathlib import Path

source = Image.open('/home/ubuntu/webdev-static-assets/panarius-hero-nano-suspended-industrial-light.png').convert('RGB')
width, height = source.size
# Remove the upper portion of the hoist while retaining the full basket and scene.
top_crop = 150
cropped = source.crop((0, top_crop, width, height))
result = cropped.resize((width, height), Image.Resampling.LANCZOS)
out = Path('/home/ubuntu/webdev-static-assets/panarius-hero-partial-hoist.png')
result.save(out, quality=96)
print(out)
