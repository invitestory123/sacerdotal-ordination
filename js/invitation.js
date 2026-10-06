(() => {
  'use strict';

  const data = window.WEDDING_DATA;
  const theme = (window.INVITATION_THEMES && window.INVITATION_THEMES[data.theme]) || {
    paper: '#ffffff',
    ink: '#2b1114',
    accent: '#6b101c',
    metal: '#b58739',
    name: 'Sacred Jesuit Crimson & Gold'
  };

  const root = document.documentElement;
  ['paper', 'ink', 'accent', 'metal'].forEach(key => {
    if (theme[key]) root.style.setProperty(`--${key}`, theme[key]);
  });

  document.body.classList.add(`theme-${data.theme}`, 'locked');

  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const safeURL = value => {
    try {
      const u = new URL(value, location.href);
      return ['http:', 'https:', 'file:'].includes(u.protocol) ? u.href : '';
    } catch {
      return '';
    }
  };

  const text = escape;
  const date = new Date(data.wedding.dateISO);
  const validDate = !Number.isNaN(date.getTime());

  document.title = `Sacerdotal Ordination | Deacon Christ Rajan Minj SJ & Deacon Reuell Paul SJ`;

  const ord = data.ordinands || {};
  const ordLeft = ord.left || {
    name: 'DEACON CHRIST RAJAN MINJ SJ',
    title: 'Deacon Christ Rajan Minj SJ',
    subtitle: 'Society of Jesus · Darjeeling Province',
    photoPrayer: './assets/ordinand-rajan-monstrance.png',
    photoMinistry: './assets/ordinand-christ-rajan.jpg',
    prayerLabel: 'Adoration',
    ministryLabel: 'In Prayer'
  };
  const ordRight = ord.right || {
    name: 'DEACON REUELL PAUL SJ',
    title: 'Deacon Reuell Paul SJ',
    subtitle: 'Society of Jesus · Darjeeling Province',
    photoPrayer: './assets/ordinand-reuell-censer.png',
    photoMinistry: './assets/ordinand-reuell-paul.jpg',
    prayerLabel: 'Incensation',
    ministryLabel: 'In Prayer'
  };
  const ordTogether = (ord.together && ord.together.photo) ? ord.together.photo : './assets/ordinands-together.jpg';

  const app = document.querySelector('#app');
  app.innerHTML = `
    <!-- Architectural Door Entrance Screen (Door 2 - No commas on intro) -->
    <div class="entrance door-entrance" id="entrance">
      <div class="door-scene-wrapper">
        <header class="door-header">
          <span class="door-motto">|| <em>Ad Majorem Dei Gloriam</em> ||</span>
          <p class="door-invite-line">You are cordially invited to the</p>
          <h1 class="door-main-title">INVITATION TO PRIESTLY ORDINATION</h1>
          <p class="door-ordinands-line">
            <span>Deacon Christ Rajan Minj SJ</span>
            <span class="door-amp">&amp;</span>
            <span>Deacon Reuell Paul SJ</span>
          </p>
          <div class="door-cross-divider" aria-hidden="true"><span>☩</span></div>
        </header>

        <!-- Gothic Architectural Double Door Shrine (Door 2) -->
        <div class="door-shrine-stage" id="doorStage">
          <!-- Sanctuary Golden Glow revealed behind parting doors -->
          <div class="door-interior-glow" aria-hidden="true">
            <div class="sanctuary-rays"></div>
            <img class="door-interior-art" src="./assets/ordination-altar-cinematic.jpg" alt="" loading="eager">
          </div>

          <!-- Double Door Panels Splitting From Center -->
          <div class="door-panels-portal">
            <div class="door-panel door-panel-left" id="doorLeft" aria-hidden="true">
              <img class="door-panel-leaf" src="./assets/door-panel-left.jpg" alt="Sanctuary Door Left Leaf">
              <div class="door-panel-shadow" aria-hidden="true"></div>
            </div>
            <div class="door-panel door-panel-right" id="doorRight" aria-hidden="true">
              <img class="door-panel-leaf" src="./assets/door-panel-right.jpg" alt="Sanctuary Door Right Leaf">
              <div class="door-panel-shadow" aria-hidden="true"></div>
            </div>
          </div>

          <!-- Center Tap to Open Button: IHS Logo from Image (2) -->
          <div class="door-latch-wrapper">
            <button class="door-ihs-button" id="open" aria-label="Tap the IHS Logo to open the Priestly Ordination invitation">
              <div class="ihs-emblem-core">
                <img class="ihs-logo-img" src="./assets/door-ihs-button.png" alt="IHS Holy Eucharist Logo" width="138" height="138">
                <span class="ihs-halo-pulse" aria-hidden="true"></span>
                <span class="ihs-halo-rays" aria-hidden="true"></span>
              </div>
              <span class="door-tap-pill">
                <span class="door-tap-icon">☩</span>
                <span class="door-tap-text">TAP TO OPEN</span>
              </span>
            </button>
          </div>
        </div>

        <footer class="door-footer">
          <p class="door-date-venue">
            <strong>20 NOVEMBER 2026 · 10:30 AM</strong><br>
            <small>St. Mary’s Hill Kurseong · Darjeeling–Nepal Jesuits</small>
          </p>
        </footer>
      </div>
    </div>

    <!-- Main Invitation Stationery -->
    <main class="invitation" id="invitation" inert>
      
      <!-- Hero Sacred Art & Announcement Banner -->
      <section class="hero sacred-hero cinematic-hero" aria-label="Sacerdotal Ordination Announcement">
        <div class="hero-image-wrap">
          <img class="hero-art" src="./assets/ordination-altar-cinematic.jpg" alt="Cinematic Catholic Ordination Altar with Holy Eucharist Mass and Incense" fetchpriority="high" decoding="async">
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-copy">
          <div class="liturgical-cross" aria-hidden="true">☩</div>
          <p class="amdg-tag">|| <em>Ad Majorem Dei Gloriam</em> ||</p>
          <p class="occasion">You are cordially invited to the</p>
          <h2 class="hero-event-title">SACERDOTAL ORDINATION</h2>
          <p class="hero-of">of</p>
          
          <!-- Side-by-Side Ordinands 4 & 5 (Left: Rajan 4, Right: Reuell 5) -->
          <div class="hero-ordinands-duo" id="names" tabindex="-1">
            
            <!-- Deacon Christ Rajan Minj SJ (Image 4) -->
            <article class="hero-ordinand-profile">
              <div class="hero-portrait-arch">
                <img class="hero-portrait-photo" src="./assets/ordinand-christ-rajan.jpg" alt="DEACON CHRIST RAJAN MINJ SJ" fetchpriority="high">
                <div class="hero-portrait-border" aria-hidden="true"></div>
              </div>
              <div class="hero-ordinand-meta">
                <h3 class="hero-ordinand-name">DEACON CHRIST RAJAN MINJ SJ</h3>
                <p class="hero-ordinand-sub">Society of Jesus · Darjeeling Province</p>
              </div>
            </article>

            <!-- Center Liturgical Monogram & Separator -->
            <div class="hero-duo-separator" aria-hidden="true">
              <span class="duo-cross">☩</span>
              <span class="duo-amp">&amp;</span>
            </div>

            <!-- Deacon Reuell Paul SJ (Image 5) -->
            <article class="hero-ordinand-profile">
              <div class="hero-portrait-arch">
                <img class="hero-portrait-photo" src="./assets/ordinand-reuell-paul.jpg" alt="DEACON REUELL PAUL SJ" fetchpriority="high">
                <div class="hero-portrait-border" aria-hidden="true"></div>
              </div>
              <div class="hero-ordinand-meta">
                <h3 class="hero-ordinand-name">DEACON REUELL PAUL SJ</h3>
                <p class="hero-ordinand-sub">Society of Jesus · Darjeeling Province</p>
              </div>
            </article>

          </div>

          <!-- Anointing by Bishop Stephen Lepcha -->
          <div class="hero-conferral">
            <p class="hero-calling">Anointing by</p>
            <p class="bishop-name">Rt. Rev. Bishop Stephen Lepcha</p>
            <p class="bishop-title">Bishop of Darjeeling</p>
          </div>

          <!-- Date & Venue (No commas) -->
          <div class="hero-datetime">
            <p class="hero-date">20 NOVEMBER 2026 · 10:30 AM</p>
            <p class="hero-venue">ST. MARY’S HILL KURSEONG</p>
          </div>

          <a class="hero-link" href="#sacramental-call">View Invitation &amp; Programme ↓</a>
        </div>
      </section>

      <!-- Sacramental Preamble & Cordial Invitation Section (Intro page - No commas) -->
      <section class="paper-section ordination-intro" id="sacramental-call" aria-label="Sacramental Calling">
        <div class="seal-badge-wrap reveal">
          <img class="badge-seal" src="./assets/jesuit-seal.jpg" alt="Darjeeling Nepal Jesuit Province" width="90" height="90">
        </div>
        <h2 class="script amdg-heading reveal">|| <em>Ad Majorem Dei Gloriam</em> ||</h2>
        <div class="rule" aria-hidden="true"></div>

        <!-- Centerpiece Portrait of Both Ordinands Together (Moved Upward) -->
        <div class="together-centerpiece-card reveal">
          <div class="together-image-frame">
            <img class="together-img" src="${ordTogether}" alt="Deacon Christ Rajan Minj SJ and Deacon Reuell Paul SJ" loading="lazy">
            <div class="together-arch-overlay" aria-hidden="true"></div>
          </div>
          <div class="together-badge">
            <span class="together-title-names">DEACON CHRIST RAJAN MINJ SJ &amp; DEACON REUELL PAUL SJ</span>
            <small class="together-sub">Society of Jesus · Darjeeling–Nepal Province</small>
          </div>
        </div>

        <!-- Continuous Paragraph (Without "together with the families of the ordinands", No commas on intro) -->
        <div class="invitation-text-block reveal">
          <p class="invitation-continuous-para">
            In the grace of a vocation faithfully discerned freely embraced and now brought to its sacramental fulfilment the Darjeeling–Nepal Jesuits cordially invite you to the
          </p>
          <h3 class="ordination-callout">SACERDOTAL ORDINATION</h3>
          <p class="of-label">of</p>
          <div class="ordinands-feature">
            <div class="ordinand-card">
              <h4>DEACON CHRIST RAJAN MINJ SJ</h4>
            </div>
            <span class="ordinand-conjunction">&amp;</span>
            <div class="ordinand-card">
              <h4>DEACON REUELL PAUL SJ</h4>
            </div>
          </div>
          <p class="priesthood-text">Anointing by</p>
          <div class="bishop-highlight">
            <p class="bishop-title-main">Rt. Rev. Bishop Stephen Lepcha</p>
            <p class="bishop-diocese">Bishop of Darjeeling</p>
          </div>
        </div>

        <!-- Date & Venue Plaque with Image 3 Historic Watermark (No commas) -->
        <div class="date-venue-plaque location-watermark-card reveal">
          <div class="watermark-bg-overlay" aria-hidden="true"></div>
          <div class="plaque-col">
            <span class="plaque-label">Date &amp; Time</span>
            <strong class="plaque-value">20 NOVEMBER 2026</strong>
            <span class="plaque-sub">10:30 A.M. IST</span>
          </div>
          <div class="plaque-divider"></div>
          <div class="plaque-col">
            <span class="plaque-label">Venue</span>
            <strong class="plaque-value">ST. MARY’S HILL KURSEONG</strong>
            <span class="plaque-sub">Former Jesuit Theologate · St. John Berchmans Parish</span>
          </div>
        </div>
      </section>

      <!-- The Ordinands Individual Showcase (Left & Right Profiles) -->
      <section class="paper-section ordinands-section" id="ordinands-profiles" aria-label="The Ordinands">
        <span class="section-kicker reveal">Candidates for Priesthood</span>
        <h2 class="script reveal">The Ordinands</h2>
        <div class="rule" aria-hidden="true"></div>

        <div class="ordinands-duo-grid">
          
          <!-- Left Side Ordinand Card: DEACON CHRIST RAJAN MINJ SJ (Image 4) -->
          <article class="ordinand-profile-card reveal" id="card-left">
            <div class="profile-photo-container">
              <img class="profile-img active-img" id="img-left" src="${ordLeft.photoPrayer}" alt="DEACON CHRIST RAJAN MINJ SJ" loading="lazy">
              <div class="photo-switch-bar">
                <button class="switch-btn active" data-target="img-left" data-src="${ordLeft.photoPrayer}" data-alt="DEACON CHRIST RAJAN MINJ SJ - Holy Monstrance Adoration">
                  ☩ Adoration
                </button>
                <button class="switch-btn" data-target="img-left" data-src="${ordLeft.photoMinistry}" data-alt="DEACON CHRIST RAJAN MINJ SJ - In Prayer">
                  🕊️ In Prayer
                </button>
              </div>
            </div>
            <div class="profile-content">
              <h3 class="profile-name">${text(ordLeft.name)}</h3>
              <p class="profile-subtitle">${text(ordLeft.subtitle)}</p>
              <div class="liturgical-divider" aria-hidden="true"><span>☩</span></div>
              <p class="profile-caption thanksgiving-caption">Thanksgiving Mass</p>
            </div>
          </article>

          <!-- Right Side Ordinand Card: DEACON REUELL PAUL SJ (Image 5) -->
          <article class="ordinand-profile-card reveal" id="card-right">
            <div class="profile-photo-container">
              <img class="profile-img active-img" id="img-right" src="${ordRight.photoPrayer}" alt="DEACON REUELL PAUL SJ" loading="lazy">
              <div class="photo-switch-bar">
                <button class="switch-btn active" data-target="img-right" data-src="${ordRight.photoPrayer}" data-alt="DEACON REUELL PAUL SJ - Incense Censer">
                  ☩ Incensation
                </button>
                <button class="switch-btn" data-target="img-right" data-src="${ordRight.photoMinistry}" data-alt="DEACON REUELL PAUL SJ - In Prayer">
                  🕊️ In Prayer
                </button>
              </div>
            </div>
            <div class="profile-content">
              <h3 class="profile-name">${text(ordRight.name)}</h3>
              <p class="profile-subtitle">${text(ordRight.subtitle)}</p>
              <div class="liturgical-divider" aria-hidden="true"><span>☩</span></div>
              <p class="profile-caption thanksgiving-caption">Thanksgiving Mass</p>
            </div>
          </article>

        </div>
      </section>

      <!-- Countdown to Sacred Ordination -->
      <section class="paper-section countdown-section" aria-labelledby="countdown-title">
        <h2 class="script" id="countdown-title">Until the Sacred Ordination</h2>
        <div class="countdown" id="countdown" role="timer" aria-label="Time until the Sacerdotal Ordination">
          <div><strong data-count="days">00</strong><span>Days</span></div>
          <div><strong data-count="hours">00</strong><span>Hours</span></div>
          <div><strong data-count="minutes">00</strong><span>Minutes</span></div>
          <div><strong data-count="seconds">00</strong><span>Seconds</span></div>
        </div>
        <p class="countdown-note" id="countdown-note">Friday, 20 November 2026 · 10:30 AM IST</p>
      </section>

      <!-- Ceremonial Sequence Section -->
      <section class="paper-section schedule-section" aria-labelledby="schedule-title">
        <span class="section-kicker reveal">Order of the Day</span>
        <h2 class="script reveal" id="schedule-title">Ceremonial Sequence</h2>
        <div class="rule" aria-hidden="true"></div>
        <ol class="timeline liturgical-timeline">
          ${data.schedule.map((item, idx) => `
            <li class="reveal">
              <time>${text(item.time)}</time>
              <span class="event-marker" aria-hidden="true"></span>
              <div class="event-body">
                <span class="event-name">${text(item.title)}</span>
                ${item.detail ? `<p class="event-detail">${text(item.detail)}</p>` : ''}
              </div>
            </li>
          `).join('')}
        </ol>
        <p class="schedule-note reveal">
          All are warmly welcomed to unite in the Eucharistic banquet and join in the fraternal fellowship thereafter.
        </p>
      </section>

      <!-- Venue Section: Enhanced Satellite Image (2) and Watermark Background (3) -->
      <section class="paper-section venue-section" aria-labelledby="venue-title">
        <span class="section-kicker reveal">Ordination Venue</span>
        <h2 class="script reveal" id="venue-title">St. Mary’s Hill, Kurseong</h2>
        <p class="venue-subheading reveal">Former Jesuit Theologate · St. John Berchmans Parish</p>
        <div class="rule" aria-hidden="true"></div>

        <!-- Satellite Picture (Image 2 Enhanced) & Watermark Location Box (Image 3) -->
        <div class="satellite-feature-card reveal">
          <div class="satellite-image-wrapper">
            <img class="satellite-img" src="./assets/st-marys-satellite.jpg" alt="Enhanced Satellite perspective of St. Mary's Hill, Kurseong featuring St. Mary's Grotto" loading="lazy">
            <div class="satellite-badge">
              <span class="badge-icon">🛰️</span> Satellite Map View
            </div>
          </div>
          <p class="venue-caption">${text(data.venue.sceneCaption)}</p>

          <div class="location-details-box location-watermark-card">
            <div class="watermark-bg-overlay" aria-hidden="true"></div>
            <div class="location-details-inner">
              <h3 class="venue-name">ST. MARY’S HILL, KURSEONG</h3>
              <p class="venue-history">Historic Former Jesuit Theologate &amp; St. John Berchmans Parish</p>
              <address class="venue-address">${text(data.venue.address)}</address>
              <p class="venue-timing">${text(data.venue.timeLabel)}</p>

              <div class="actions map-actions">
                <a class="action" id="maps" href="https://maps.app.goo.gl/DyYy9wbV89KhnKnr7?g_st=aw" target="_blank" rel="noopener noreferrer">
                  <span>📍 Open in Google Maps</span>
                </a>
                <a class="action secondary" id="satellite-link" href="https://maps.app.goo.gl/onmGYCHSL7iwgBrUA" target="_blank" rel="noopener noreferrer">
                  <span>🛰️ View Satellite Link</span>
                </a>
                <button class="action secondary" id="calendar">
                  <span>📅 Add to Calendar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <p class="travel-note reveal">${text(data.venue.note)}</p>
      </section>

      <!-- Live Telecast Section with YouTube QR and Link (Live from 10:00 AM onwards) -->
      <section class="paper-section live-stream-section" aria-labelledby="live-title">
        <div class="live-stream-card reveal">
          <div class="live-indicator">
            <span class="live-dot"></span> LIVE FROM 10:00 AM ONWARDS
          </div>
          <h2 class="script" id="live-title">Live Stream on YouTube</h2>
          <p class="live-note">
            For family, Jesuit brethren, friends, and faithful worldwide who cannot be physically present at St. Mary’s Hill, the Eucharistic celebration and Rite of Ordination will be broadcast live from 10:00 AM onwards.
          </p>

          <div class="qr-presentation">
            <div class="qr-frame">
              <img class="youtube-qr-img" src="./assets/youtube-live-qr.jpg" alt="Scan QR Code to watch Sacerdotal Ordination Live on YouTube" width="220" height="220">
              <div class="qr-caption">Scan with mobile camera</div>
            </div>
            <div class="qr-companion">
              <p class="qr-alt-text">Or click below to open the YouTube live broadcast directly on your device:</p>
              <a class="action youtube-action" href="https://www.youtube.com/live/illwWKDujck?si=X8uv-ORdfTfyP-pA" target="_blank" rel="noopener noreferrer">
                <svg class="yt-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Watch Live Telecast on YouTube</span>
              </a>
              <small class="live-time-hint">Live coverage commences Friday, 20 November 2026 from 10:00 AM onwards (IST)</small>
            </div>
          </div>
        </div>
      </section>

      <!-- Liturgical Notes & Concelebration -->
      <section class="paper-section etiquette-section" aria-label="Liturgical Information">
        <div class="notes-grid">
          <article class="reveal note-card">
            <div class="note-icon">✝</div>
            <h3 class="script">Liturgical Concelebration</h3>
            <p>${text(data.details.dressCode)}</p>
          </article>
          <div class="rule" aria-hidden="true"></div>
          <article class="reveal note-card">
            <div class="note-icon">🕊️</div>
            <h3 class="script">Prayer &amp; Communion</h3>
            <p>${text(data.details.giftPreference)}</p>
          </article>
        </div>
      </section>

      <!-- RSVP & Prayerful Wishes (With WhatsApp 9789876513) -->
      <section class="paper-section rsvp-section" aria-labelledby="rsvp-title">
        <div class="rsvp-card reveal">
          <span class="rsvp-kicker">Communion &amp; Presence</span>
          <div class="seal-mini">☩</div>
          <h2 class="script" id="rsvp-title">${text(data.rsvp?.heading || 'Prayerful Communion & Presence')}</h2>
          <p>${text(data.rsvp?.note || 'Kindly let us know of your presence or send your prayerful wishes to 9789876513 via WhatsApp.')}</p>
          
          <!-- Direct WhatsApp RSVP Button -->
          <div class="whatsapp-rsvp-wrap">
            <a class="action whatsapp-btn" href="https://wa.me/919789876513?text=Peace%20be%20with%20you.%20I%20would%20like%20to%20send%20prayerful%20wishes%20and%20RSVP%20for%20the%20Sacerdotal%20Ordination%20at%20Kurseong." target="_blank" rel="noopener noreferrer">
              <svg class="wa-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 18.06c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.03 8.03 0 0 1-1.23-4.29c0-4.43 3.61-8.04 8.04-8.04 2.15 0 4.17.84 5.69 2.35 1.52 1.52 2.36 3.54 2.36 5.69 0 4.44-3.61 8.05-8.07 8.05zm4.41-6.03c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.16-.46-.28z"/>
              </svg>
              <span>WhatsApp RSVP: 9789876513</span>
            </a>
          </div>

          ${data.rsvp?.deadline ? `<p class="rsvp-deadline">Kindly reply by ${text(data.rsvp.deadline)}</p>` : ''}
          <form class="rsvp-form" id="rsvp-form"></form>
        </div>
      </section>

      <!-- Closing Benediction & Colophon -->
      <footer class="closing" aria-labelledby="closing-title">
        <div class="closing-scene">
          <img class="closing-art" src="./assets/ordination-altar.jpg" alt="" width="720" height="1280" loading="lazy" decoding="async">
          <div class="closing-copy reveal">
            <div class="closing-seal-wrap">
              <img src="./assets/jesuit-seal.jpg" alt="Society of Jesus Seal" width="110" height="110" class="closing-seal-img">
            </div>
            <p class="closing-eyebrow">Society of Jesus · Darjeeling–Nepal Province</p>
            <h2 class="closing-title" id="closing-title">|| <em>Ad Majorem Dei Gloriam</em> ||</h2>
            <div class="closing-rule" aria-hidden="true"></div>
            <p class="closing-names">
              <span>DEACON CHRIST RAJAN MINJ SJ</span><br>
              <i class="closing-amp">&amp;</i><br>
              <span>DEACON REUELL PAUL SJ</span>
            </p>
            <p class="closing-date">20 NOVEMBER 2026 · KURSEONG</p>
            <p class="closing-note">
              “Go forth and set the world on fire.”<br>
              <small>— St. Ignatius of Loyola</small>
            </p>
          </div>
          <p class="closing-caption">Sacerdotal Ordination to the Priesthood of Jesus Christ</p>
        </div>
        <div class="closing-colophon">
          <button class="reopen" id="reopen">Open invitation again <span aria-hidden="true">↺</span></button>
          <div class="jesuit-signature">
            <span>SOCIETAS IESU</span>
            <small>Darjeeling–Nepal Jesuit Province</small>
          </div>
          ${data.media.music && data.media.musicTitle ? `
            <p class="music-credit">
              Hymn: ${text(data.media.musicTitle)}<br>
              <small>Soft background accompaniment · Volume adjusted</small>
            </p>
          ` : ''}
        </div>
      </footer>
    </main>

    <!-- Floating Audio & Motion Controls -->
    <div class="media-controls" id="media-controls" hidden>
      <button class="media-button" id="motion" aria-pressed="false" hidden>Pause motion</button>
      <button class="media-button" id="music" aria-pressed="false" hidden>Play hymn</button>
    </div>
    <audio id="audio" loop preload="none"></audio>
    <p id="status" class="status" role="status" hidden></p>
  `;

  const $ = id => document.getElementById(id);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const audio = $('audio');
  let musicAttempted = false;
  let opened = false, openingTimer, fadeTimer, statusTimer, observersStarted = false;
  let motionPaused = reduced.matches;

  const ambience = window.initInvitationMotion ? window.initInvitationMotion({ theme: data.theme, reduced }) : { setPaused: () => {} };

  function syncMotion() {
    const stopped = motionPaused || reduced.matches;
    if (ambience && ambience.setPaused) ambience.setPaused(stopped || !opened);
    $('motion').hidden = false;
    $('motion').disabled = reduced.matches;
    $('motion').textContent = reduced.matches ? 'Reduced motion' : (motionPaused ? 'Play motion' : 'Pause motion');
    $('motion').setAttribute('aria-pressed', String(stopped));
  }

  const notify = message => {
    $('status').textContent = message;
    $('status').hidden = false;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => $('status').hidden = true, 4500);
  };

  const source = name => data.media[name] ? safeURL(data.media[name]) : '';

  if (source('music')) {
    audio.src = source('music');
    audio.volume = 0.45;
  }

  audio.addEventListener('error', () => {
    $('music').textContent = 'Play hymn';
    $('music').setAttribute('aria-pressed', 'false');
    if (opened) notify('Audio accompaniment could not be loaded.');
  });

  if (window.initWeddingRSVP) {
    window.initWeddingRSVP($('rsvp-form'), data.rsvp || {}, `Deacon Christ Rajan Minj SJ & Deacon Reuell Paul SJ`);
  }

  // Interactive Photo Switching for Left & Right Ordinands
  document.querySelectorAll('.photo-switch-bar button').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const targetImg = document.getElementById(targetId);
      if (!targetImg) return;
      const parentBar = btn.closest('.photo-switch-bar');
      parentBar.querySelectorAll('.switch-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      targetImg.style.opacity = '0.3';
      setTimeout(() => {
        targetImg.src = btn.dataset.src;
        targetImg.alt = btn.dataset.alt || '';
        targetImg.style.opacity = '1';
      }, 180);
    });
  });

  function beginObservers() {
    if (observersStarted || !('IntersectionObserver' in window)) return;
    observersStarted = true;
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!reduced.matches && !motionPaused) entry.target.classList.add('arriving');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

    const timeline = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.timeline li').forEach(el => el.classList.remove('is-current'));
          entry.target.classList.add('is-current');
        }
      });
    }, { rootMargin: '-30% 0px -45% 0px' });
    document.querySelectorAll('.timeline li').forEach(el => timeline.observe(el));
  }

  function finishOpening() {
    if ($('entrance').classList.contains('leaving') || $('entrance').hidden) return;
    clearTimeout(openingTimer);
    $('entrance').classList.add('leaving');
    $('invitation').inert = false;
    document.body.classList.remove('locked');
    $('media-controls').hidden = false;
    syncMotion();
    $('music').hidden = !source('music');
    beginObservers();
    $('names').focus({ preventScroll: true });
    fadeTimer = setTimeout(() => {
      $('entrance').hidden = true;
    }, reduced.matches ? 0 : 850);
  }

  async function openInvitation() {
    if (opened) return;
    opened = true;
    $('open').disabled = true;

    if (source('music')) {
      $('media-controls').hidden = false;
      $('music').hidden = false;
      if (!musicAttempted) {
        musicAttempted = true;
        audio.play().then(() => {
          $('music').textContent = 'Pause hymn';
          $('music').setAttribute('aria-pressed', 'true');
        }).catch(() => {});
      }
    }

    if (reduced.matches) {
      finishOpening();
    } else {
      $('entrance').classList.add('door-opening');
      openingTimer = setTimeout(finishOpening, 1400);
    }
  }

  $('open').addEventListener('click', openInvitation);

  $('reopen').addEventListener('click', () => {
    clearTimeout(fadeTimer);
    clearTimeout(openingTimer);
    window.scrollTo({ top: 0, behavior: 'instant' });
    opened = false;
    if (ambience && ambience.setPaused) ambience.setPaused(true);
    $('entrance').hidden = false;
    $('entrance').classList.remove('leaving', 'opening', 'door-opening');
    $('open').disabled = false;
    $('invitation').inert = true;
    $('media-controls').hidden = true;
    document.body.classList.add('locked');
    $('open').focus();
  });

  $('music').addEventListener('click', async () => {
    if (audio.paused) {
      try {
        await audio.play();
        $('music').textContent = 'Pause hymn';
        $('music').setAttribute('aria-pressed', 'true');
      } catch {
        notify('Audio could not be played. Please try again.');
      }
    } else {
      audio.pause();
      $('music').textContent = 'Play hymn';
      $('music').setAttribute('aria-pressed', 'false');
    }
  });

  $('motion').addEventListener('click', () => {
    if (reduced.matches) return;
    motionPaused = !motionPaused;
    syncMotion();
  });

  reduced.addEventListener('change', event => {
    motionPaused = event.matches;
    if (event.matches && opened) finishOpening();
    syncMotion();
  });

  // Countdown timer
  function tick() {
    if (!validDate) {
      $('countdown').hidden = true;
      $('countdown-note').textContent = data.wedding.longDate;
      return;
    }
    const remaining = Math.max(0, date.getTime() - Date.now());
    const seconds = Math.floor(remaining / 1000);
    const values = {
      days: Math.floor(seconds / 86400),
      hours: Math.floor(seconds / 3600) % 24,
      minutes: Math.floor(seconds / 60) % 60,
      seconds: seconds % 60
    };
    for (const [key, value] of Object.entries(values)) {
      const el = document.querySelector(`[data-count="${key}"]`);
      if (el) el.textContent = String(value).padStart(2, '0');
    }
    if (!remaining) {
      $('countdown-title').textContent = 'The Sacred Ordination Has Commenced';
      $('countdown-note').textContent = 'Deo Gratias · In prayerful communion.';
    }
  }
  tick();
  setInterval(tick, 1000);

  // ICS Calendar generation
  const icsEscape = value => String(value).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const stamp = value => value.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  if ($('calendar')) {
    $('calendar').disabled = !validDate;
    $('calendar').addEventListener('click', () => {
      const configuredEnd = new Date(data.wedding.endISO);
      const end = Number.isFinite(configuredEnd.getTime()) && configuredEnd > date ? configuredEnd : new Date(date.getTime() + 4 * 3600000);
      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Society of Jesus//Sacerdotal Ordination//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `UID:ordination-jesuit-${date.getTime()}@darjeeling-nepal.jesuits`,
        `DTSTAMP:${stamp(new Date())}`,
        `DTSTART:${stamp(date)}`,
        `DTEND:${stamp(end)}`,
        `SUMMARY:${icsEscape('Sacerdotal Ordination of Deacon Christ Rajan Minj SJ & Deacon Reuell Paul SJ')}`,
        `LOCATION:${icsEscape(data.venue.name + ', ' + data.venue.address)}`,
        `DESCRIPTION:${icsEscape('Sacerdotal Ordination to the Priesthood of Jesus Christ, conferred by Rt. Rev. Bishop Stephen Lepcha, Bishop of Darjeeling at St. Mary’s Hill, Kurseong.')}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ];
      const url = URL.createObjectURL(new Blob([lines.join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `sacerdotal-ordination-kurseong.ics`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify('Calendar invitation has been downloaded.');
    });
  }
})();
