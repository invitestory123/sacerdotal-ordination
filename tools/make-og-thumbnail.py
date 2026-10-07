"""Generate the Open Graph share thumbnail (assets/og-thumbnail.jpg, 1200x630).

Run from anywhere:  python tools/make-og-thumbnail.py
Requires Pillow. Text (title, one-line names, date/venue) is auto-fitted so it
always stays on a single line.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H = 1200, 630
GOLD = (216, 171, 93, 240)
GOLD_DIM = (181, 135, 57, 170)
IVORY = (247, 236, 216, 255)
SHADOW = (10, 2, 4, 150)

def font(name, size):
    return ImageFont.truetype(f'{BASE}/fonts/{name}', size)

# --- background: sanctuary image, cover-cropped, darkened like the invitation ---
bg = Image.open(f'{BASE}/assets/ordination-altar-cinematic.jpg').convert('RGB')
bg = ImageOps.fit(bg, (W, H), method=Image.LANCZOS, centering=(0.5, 0.42))
dark = Image.new('RGB', (W, H), (18, 3, 7))
grad = Image.linear_gradient('L').resize((W, H))          # 0 top -> 255 bottom
mask = grad.point(lambda v: int(150 + v * 0.28))          # heavy dark veil
img = Image.composite(dark, bg, mask)
vig = Image.radial_gradient('L').resize((W, H))           # 0 center -> 255 edge
vmask = vig.point(lambda v: max(0, v - 150))              # darken edges only
img = Image.composite(dark, img, vmask)
img = img.convert('RGBA')

ov = Image.new('RGBA', (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(ov)

def diamond(cx, cy, s, fill):
    d.polygon([(cx, cy - s), (cx + s, cy), (cx, cy + s), (cx - s, cy)], fill=fill)

# double gold frame with corner diamonds
d.rectangle([24, 24, W - 25, H - 25], outline=GOLD, width=3)
d.rectangle([34, 34, W - 35, H - 35], outline=GOLD_DIM, width=1)
for cx, cy in [(24, 24), (W - 25, 24), (24, H - 25), (W - 25, H - 25)]:
    diamond(cx, cy, 8, GOLD)
img = Image.alpha_composite(img, ov)
d = ImageDraw.Draw(img)

def spaced_width(text, f, sp):
    return sum(d.textlength(ch, font=f) for ch in text) + sp * (len(text) - 1)

def sp_of(size):
    return max(2, round(size * 0.09))

def fit(text, fname, maxw, start, minsize=18):
    s = start
    while s > minsize:
        f = font(fname, s)
        if spaced_width(text, f, sp_of(s)) <= maxw:
            return f
        s -= 1
    return font(fname, minsize)

def draw_spaced(img, text, f, y, fill, sp, shadow=True):
    d = ImageDraw.Draw(img)
    total = spaced_width(text, f, sp)
    x = (W - total) / 2
    if shadow:
        for ch in text:
            w = d.textlength(ch, font=f)
            d.text((x + 2, y + 3), ch, font=f, fill=SHADOW, anchor='lm')
            x += w + sp
        x = (W - total) / 2
    for ch in text:
        w = d.textlength(ch, font=f)
        d.text((x, y), ch, font=f, fill=fill, anchor='lm')
        x += w + sp

def rule(img, y, halfw):
    d = ImageDraw.Draw(img)
    d.line([(W / 2 - halfw, y), (W / 2 - 24, y)], fill=GOLD_DIM, width=2)
    d.line([(W / 2 + 24, y), (W / 2 + halfw, y)], fill=GOLD_DIM, width=2)
    diamond(W / 2, y, 7, GOLD)
    for dx in (-34, 34):
        d.ellipse([W / 2 + dx - 3, y - 3, W / 2 + dx + 3, y + 3], fill=GOLD)

# --- IHS emblem, centered top ---
em = Image.open(f'{BASE}/assets/door-ihs-button.png').convert('RGBA').resize((132, 132), Image.LANCZOS)
img.paste(em, ((W - 132) // 2, 58), em)

# --- title (one line) ---
title = 'SACERDOTAL ORDINATION'
tf = fit(title, 'Cormorant-Semibold.ttf', 1080, 84)
draw_spaced(img, title, tf, 262, IVORY, sp_of(tf.size))

rule(img, 312, 280)

# --- names, ONE line, ampersand in script gold ---
names_l, amp, names_r = 'Deacon Reuell Paul SJ ', '&', ' Deacon Christ Rajan Minj SJ'
base = 54
while base > 24:
    nf = font('Cormorant-Medium.ttf', base)
    af = font('Parisienne-Regular.ttf', int(base * 1.3))
    total = (spaced_width(names_l, nf, 4) + d.textlength(amp, font=af)
             + spaced_width(names_r, nf, 4) + 8)
    if total <= 1070:
        break
    base -= 1
d = ImageDraw.Draw(img)
total = (spaced_width(names_l, nf, 4) + d.textlength(amp, font=af)
         + spaced_width(names_r, nf, 4) + 8)
x = (W - total) / 2
for txt, f, col in ((names_l, nf, IVORY), (amp, af, GOLD), (names_r, nf, IVORY)):
    for ch in txt:
        w = d.textlength(ch, font=f)
        d.text((x + 2, 377 + 3), ch, font=f, fill=SHADOW, anchor='lm')
        d.text((x, 377), ch, font=f, fill=col, anchor='lm')
        x += w + 4
    if f is nf:
        x += 4

# --- date & venue, one line ---
date = '20 NOVEMBER 2026 · 10:30 AM · ST. MARY’S HILL KURSEONG'
df = fit(date, 'Cormorant-Semibold.ttf', 1040, 32)
draw_spaced(img, date, df, 445, (216, 171, 93, 255), sp_of(df.size))

# --- closing script line ---
amdg = '|| Ad Majorem Dei Gloriam ||'
draw_spaced(img, amdg, font('Parisienne-Regular.ttf', 36), 540, (216, 171, 93, 190), 1, shadow=False)

out = f'{BASE}/assets/og-thumbnail.jpg'
img.convert('RGB').save(out, 'JPEG', quality=90, optimize=True, progressive=True)
print('saved', out)
print('title font', tf.size, 'names base', base, 'date font', df.size)
