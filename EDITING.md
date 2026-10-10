# Customer Editing Guide — Sacerdotal Ordination Invitation

This invitation is a 100% self-contained luxury ecclesiastical invitation for the **Sacerdotal Ordination** of **Deacon Reuell Paul, SJ** & **Deacon Christ Rajan Minj, SJ** to the Priesthood of Jesus Christ, conferred by **Rt. Rev. Stephen Lepcha**, Bishop of Darjeeling, on **20 November 2026** at **St. Mary's Hill, Kurseong**.

---

## Configuration & Content Edits

All event details, timings, location, and streaming links are configured in:
→ `wedding-data.js`

### 1. Ordinands & Conferrer
- `couple.first` & `couple.second`: Ordinand names (Deacon Reuell Paul, SJ & Deacon Christ Rajan Minj, SJ)
- `couple.motto` & `couple.mottoSub`: "Omnibus Omnia" & "“All Things to All People, for Christ.”" (1 Cor 9:22)
- `ordinands.bishop`: Rt. Rev. Stephen Lepcha, Bishop of Darjeeling
- `ordinands.hosts`: The Darjeeling–Nepal Jesuits, together with the families of the ordinands

### 2. Date, Time & Countdown
- `wedding.dateLabel`: 20 NOVEMBER 2026
- `wedding.timeLabel`: 10:30 AM
- `wedding.dateISO`: `2026-11-20T10:30:00+05:30` (drives the real-time countdown and .ics calendar download)

### 3. Ceremonial Sequence
- `schedule`: Array of ceremonial steps (Arrival & Gathering, Holy Eucharist & Rite of Ordination, Agape Meal & Felicitation).

### 4. Venue & Satellite Map Links (Page 2)
- Replaces the redundant intermediate date-venue card and sits directly after the first page announcement.
- `venue.name`: ST. MARY'S HILL KURSEONG (St. John Berchman's Parish)
- `venue.mapsUrl`: Google Maps navigation link (`https://maps.app.goo.gl/DyYy9wbV89KhnKnr7?g_st=aw`)
- `venue.satelliteUrl`: Google Maps direct satellite view link (`https://www.google.com/maps/place/St.+Mary's+Hill+Church,+Kurseong/@26.8837,88.2762,700m/data=!3m1!1e3`)
- `venue.satelliteImage`: Enhanced aerial satellite photography of St. Mary's Hill (`./assets/st-marys-satellite-map.jpg`)
- `venue.watermarkImage`: Historic St. Mary's Hill photograph used as the location watermark background (`./assets/st-marys-hill-historic.jpg`)
- Floral canopy positioned with negative top offset (`top -60px center`) and `padding-top: 88px` so the "ORDINATION VENUE" kicker is never obscured.

### 5. Live Telecast on YouTube
- `liveStream.url`: YouTube live broadcast link (`https://www.youtube.com/live/illwWKDujck?si=X8uv-ORdfTfyP-pA`)
- `liveStream.qrImage`: YouTube QR code (`./assets/youtube-live-qr.jpg`)

### 6. RSVP (Two Input Boxes & SEND RSVP via WhatsApp)
- Input 1: **Your full name / Fr / Sr** (`#rsvp-name`).
- Input 2: **Will you be joining us?** (`#rsvp-attendance` with *Joyfully accepts* / *Regretfully declines*).
- **Deadline**: Reply by **30th October 2026** (`rsvp.deadline`).
- **SEND RSVP Button**: Direct WhatsApp button (`#whatsapp-rsvp-btn`) labeled **SEND RSVP** with WhatsApp icon.
- **WhatsApp Messages**:
  - **Acceptance** (default / Joyfully accepts):
    `Hi.\nPeace be with you.🪷\nI will be present for the Ordination at St. Mary's Kurseong. ✨\nBest wishes.` (with `- [Name]` appended if filled).
  - **Declining** (Regretfully declines):
    `Hi.\nPeace be with you.\nI regret to inform you that I won't be present for the ordination at Kurseong.` (with `- [Name]` appended if filled).

### 7. With Best Compliments From (Closing Section)
- `compliments.title`: "With Best compliments from" (in script calligraphy).
- `compliments.items`: Array of names or placeholder lines (`- - - - -`).
- `compliments.endingLine`: "Sacerdotal Ordination to the Priesthood of Jesus Christ".

### 8. Prayer for Priests & Attire
- `details.prayerForPriests`: "Almighty God, pour out Your grace on the priests You have chosen for yourself. Strengthen them with the gifts of the Holy Spirit, so that they become All things to All People, and through them, may Your Word be truly proclaimed, Your Sacraments, be faithfully administered and devoutly received. Through Christ the Eternal High Priest we pray. Amen."
- `details.dressCode`: "Priests are requested to bring an alb and cincture for the mass. Stole/ chausible will be provided"

---

## Presentation Notes
- **Fonts**: script headings use **Great Vibes** (`fonts/GreatVibes.woff`); bishop names and the "Thanksgiving Mass" captions use **Kaushan Script** (`fonts/KaushanScript.woff`) — both embedded locally, faces declared in `css/typography.css`.
- **Dividers**: `.rule` / `.closing-rule` are ornamental gold medallion dividers (not plain lines); every `.paper-section` gets a soft blended gold hairline border.
- **Watermark**: faint gold crosses drift down through each section (`js/motion.js` → `.falling-cross` in `css/invitation.css`). Flower/petal sprigs were removed entirely.
- **Entrance**: door only, filling the page (panel images cropped from the original 341×1024 door art to 341×755 — **the full design including the roof apex and the base is kept**; stage width `min(100%, 470px, (100svh − 318px) × 682/755)`) with titles above and below; animated sanctuary background behind it (slow zoom + rising light motes).
- **Cover copy**: `Ad Majorem Dei Gloriam` is upright (never italic, no `||` bars), the title reads **Invitation to the / Priestly Ordination / Of**, and the names run **Reuell first, Christ second** (photos keep Christ on the left). Venue line: *St. Mary’s Hill, St. John Berchman’s Parish*. Tap pill: `☩ TAP TO OPEN` strictly on **one line**. First page after the doors open: **Hero Announcement** (liturgical cross, plain upright `Ad Majorem Dei Gloriam`, Sacerdotal Ordination title, side-by-side arched portraits with the left deacon zoomed to match the right deacon in height and eye level, conferral, date & venue). The second page follows with the seal, sacred calling preamble, and date plaque. The casual indoor together photo was removed.
- **Tap pill**: `TAP TO OPEN` is styled with `white-space: nowrap !important` and horizontal flex on a single line. The IHS button (`.door-latch-wrapper`, `top: 49.27%`) is concentric with the sunburst painted on the door art.
- **Door opening**: 2.4 s weighted swing (`cubic-bezier(0.42, 0.02, 0.24, 1)`, 0.12 s latch delay), sanctuary glow blooms behind, entrance fades after 2.65 s. A latch **click, wooden knock, hinge creak and closing thud** are synthesised with the Web Audio API in `js/invitation.js` → `playDoorSound()` (no audio file needed; skipped for reduced motion).
- **Global backdrop**: `body::before` in `css/invitation.css` fixes `../assets/ordination-altar-cinematic.jpg` (dark veil + `site-bg-zoom` loop) behind the whole invitation — all sections are translucent paper sheets over it (`color-mix(... 92%, transparent)` overrides at the end of the file). The intro/hero has **no image of its own**; its scrim gradient fades into the shared backdrop, which keeps zooming while the hero copy pops up in sequence.
- **Share thumbnail (OG image)**: `assets/og-thumbnail.jpg` (1200×630) — title, both names **on one line**, date/venue, AMDG — referenced by the `og:image` / `twitter:image` meta tags in `index.html` (absolute URL). Regenerate after content changes with `python tools/make-og-thumbnail.py` (needs Pillow); fonts and text fit are automatic.

---

## Syntax Validation
```bash
node --check wedding-data.js
```
