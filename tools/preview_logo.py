from PIL import Image
logo = Image.open('/home/ubuntu/webdev-static-assets/officine-donnarumma-logo-negative-clean-local.png').convert('RGBA')
bg = Image.new('RGBA', logo.size, '#182625')
bg.alpha_composite(logo)
bg.convert('RGB').save('/home/ubuntu/webdev-static-assets/logo-preview-dark.png')
