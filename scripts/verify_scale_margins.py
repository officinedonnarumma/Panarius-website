from pathlib import Path

# Desktop: project-image is 54vw at the 1280px validation viewport.
# Mobile: project-image is one column with the 450px minimum height.
cases = [('desktop', 1280 * 0.54, 830), ('mobile', 390, 450)]
scale = 1.04
inset = 18
for name, width, height in cases:
    available_w = width - 2 * inset
    available_h = height - 2 * inset
    scaled_w = available_w * scale
    scaled_h = available_h * scale
    assert scaled_w <= width, (name, scaled_w, width)
    assert scaled_h <= height, (name, scaled_h, height)
    print(f'{name}: scaled={scaled_w:.1f}x{scaled_h:.1f}, box={width:.1f}x{height:.1f}, safe=True')
print('PASS: la scala 1.04 resta entro il riquadro e non può ritagliare bordi, annotazioni o cartiglio.')
