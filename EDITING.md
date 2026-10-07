# Customer Editing Guide — Sacerdotal Ordination Invitation

This invitation is a 100% self-contained luxury ecclesiastical invitation for the **Sacerdotal Ordination** of **Deacon Reuell Paul, SJ** & **Deacon Christ Rajan Minj, SJ** to the Priesthood of Jesus Christ, conferred by **The Most Rev. Stephen Lepcha**, Bishop of Darjeeling, on **20 November 2026** at **St. Mary's Hill, Kurseong**.

---

## Configuration & Content Edits

All event details, timings, location, and streaming links are configured in:
→ `wedding-data.js`

### 1. Ordinands & Conferrer
- `couple.first` & `couple.second`: Ordinand names (Deacon Reuell Paul, SJ & Deacon Christ Rajan Minj, SJ)
- `ordinands.bishop`: The Most Rev. Stephen Lepcha, Bishop of Darjeeling
- `ordinands.hosts`: The Darjeeling–Nepal Jesuits, together with the families of the ordinands

### 2. Date, Time & Countdown
- `wedding.dateLabel`: 20 NOVEMBER 2026
- `wedding.timeLabel`: 10:30 AM
- `wedding.dateISO`: `2026-11-20T10:30:00+05:30` (drives the real-time countdown and .ics calendar download)

### 3. Ceremonial Sequence
- `schedule`: Array of ceremonial steps (Arrival & Gathering, Holy Eucharist & Rite of Ordination, Agape Meal & Felicitation).

### 4. Venue & Satellite Map Links
- `venue.name`: ST. MARY'S HILL KURSEONG (Former Jesuit Theologate · St. John Berchmans Parish)
- `venue.mapsUrl`: Google Maps navigation link (`https://maps.app.goo.gl/DyYy9wbV89KhnKnr7?g_st=aw`)
- `venue.satelliteUrl`: Google Maps satellite view link (`https://maps.app.goo.gl/onmGYCHSL7iwgBrUA`)
- `venue.satelliteImage`: Enhanced aerial satellite photography of St. Mary's Hill (`./assets/st-marys-satellite-map.jpg`, upscaled 2× and sharpened before insertion)
- `venue.watermarkImage`: Image 3 historic St. Mary's Hill photograph used as the location watermark background (`./assets/st-marys-hill-historic.jpg`, applied via `.watermark-bg-overlay` in `css/invitation.css`)

### 5. Live Telecast on YouTube
- `liveStream.url`: YouTube live broadcast link (`https://www.youtube.com/live/illwWKDujck?si=X8uv-ORdfTfyP-pA`)
- `liveStream.qrImage`: YouTube QR code (`./assets/youtube-live-qr.jpg`)

---

## Syntax Validation
```bash
node --check wedding-data.js
```
