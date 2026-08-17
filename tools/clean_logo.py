from PIL import Image
import numpy as np

src = Image.open('/home/ubuntu/upload/Screenshot2026-08-17alle17.21.59.png').convert('RGB')
# Crop exactly the original cream logo panel; retain its wide original proportions.
crop = src.crop((159, 89, 520, 252))
arr = np.asarray(crop).astype(np.float32)
luma = 0.2126 * arr[:, :, 0] + 0.7152 * arr[:, :, 1] + 0.0722 * arr[:, :, 2]
# Dark original artwork becomes opaque ivory; the light cream panel becomes transparent.
alpha = np.clip((232.0 - luma) * 3.2, 0, 255).astype(np.uint8)
# Remove very weak residual background pixels and preserve crisp logo edges.
alpha[alpha < 18] = 0
rgba = np.zeros((arr.shape[0], arr.shape[1], 4), dtype=np.uint8)
rgba[:, :, :3] = np.array([255, 250, 239], dtype=np.uint8)
rgba[:, :, 3] = alpha
Image.fromarray(rgba, 'RGBA').save('/home/ubuntu/webdev-static-assets/officine-donnarumma-logo-negative-clean-local.png')
