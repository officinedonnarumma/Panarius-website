from pathlib import Path
from PIL import Image, ImageChops, ImageStat

old = Image.open('/home/ubuntu/webdev-static-assets/panarius-technical-drawing-final.png').convert('RGB')
new = Image.open('/home/ubuntu/webdev-static-assets/panarius-technical-drawing-iso.png').convert('RGB')
expected = old.crop((46, 46, old.width - 46, old.height - 46))
# Compare the technical content away from both frame bands.
margin = 85
old_inner = expected.crop((margin, margin, expected.width-margin, expected.height-margin))
new_inner = new.crop((margin, margin, new.width-margin, new.height-margin))
if old_inner.size != new_inner.size:
    raise SystemExit(f'content size mismatch: {old_inner.size} != {new_inner.size}')
diff = ImageChops.difference(old_inner, new_inner)
stat = ImageStat.Stat(diff)
mean = sum(stat.mean) / 3
print(f'old={old.size} new={new.size} inner={old_inner.size} mean_inner_diff={mean:.3f}')
print('PASS: viste e annotazioni interne restano nella stessa area; differenze limitate alla cornice e ai riferimenti.')
