import cv2
from pathlib import Path

src_path = '/home/ubuntu/webdev-static-assets/panarius-hero-partial-hoist.png'
out_path = '/home/ubuntu/webdev-static-assets/panarius-hero-cable-only-seamless.png'
img = cv2.imread(src_path, cv2.IMREAD_COLOR)
h, w = img.shape[:2]
mask = cv2.imread(src_path, cv2.IMREAD_GRAYSCALE) * 0
# Remove only the visible motor and its immediate hardware; preserve the rail/background outside this zone.
x0, x1 = int(w*0.64), int(w*0.82)
y0, y1 = 0, int(h*0.23)
cv2.rectangle(mask, (x0, y0), (x1, y1), 255, -1)
# Slightly round/expand the mask to avoid remnants of the motor edges.
mask = cv2.dilate(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (19, 19)))
filled = cv2.inpaint(img, mask, 9, cv2.INPAINT_TELEA)
# Add only a thin vertical cable, aligned to the existing lifting point.
cable_x = int(w*0.735)
cv2.line(filled, (cable_x, 0), (cable_x, int(h*0.215)), (145, 148, 150), 2, cv2.LINE_AA)
cv2.line(filled, (cable_x+3, 0), (cable_x+3, int(h*0.215)), (18, 22, 26), 1, cv2.LINE_AA)
cv2.imwrite(out_path, filled, [cv2.IMWRITE_PNG_COMPRESSION, 3])
print(out_path)
