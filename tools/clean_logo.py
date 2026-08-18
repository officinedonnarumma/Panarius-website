from PIL import Image
import numpy as np

src = Image.open('/home/ubuntu/upload/Screenshot2026-08-17alle17.21.59.png').convert('RGB')
# Crop exactly the original cream logo panel; retain its wide original proportions.
crop = src.crop((169, 99, 510, 242))
arr = np.asarray(crop).astype(np.float32)
background = np.array([247.0, 244.0, 238.0], dtype=np.float32)
distance = np.linalg.norm(arr - background, axis=2)
# The original dark artwork is kept opaque; pixels matching the cream panel become transparent.
alpha = np.clip((distance - 4.0) * 8.0, 0, 255).astype(np.uint8)
# Remove very weak residual background pixels and preserve crisp logo edges.
alpha[alpha < 18] = 0
rgba = np.zeros((arr.shape[0], arr.shape[1], 4), dtype=np.uint8)
rgba[:, :, :3] = np.array([255, 250, 239], dtype=np.uint8)
rgba[:, :, 3] = alpha
Image.fromarray(rgba, 'RGBA').save('/home/ubuntu/webdev-static-assets/officine-donnarumma-logo-negative-clean-local.png')
