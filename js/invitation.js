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

  document.title = `Sacerdotal Ordination | Deacon Reuell Paul SJ & Deacon Christ Rajan Minj SJ`;

  const ord = data.ordinands || {};
  const ordLeft = ord.left || {
    name: 'DEACON CHRIST RAJAN MINJ SJ',
    title: 'Deacon Christ Rajan Minj SJ',
    subtitle: 'Society of Jesus · Darjeeling Province',
    photoPrayer: './assets/ordinand-rajan-monstrance.png'
  };
  const ordRight = ord.right || {
    name: 'DEACON REUELL PAUL SJ',
    title: 'Deacon Reuell Paul SJ',
    subtitle: 'Society of Jesus · Darjeeling Province',
    photoPrayer: './assets/ordinand-reuell-censer.png'
  };
  const ordTogether = (ord.together && ord.together.photo) ? ord.together.photo : './assets/ordinands-together.jpg';

  const app = document.querySelector('#app');
  app.innerHTML = `
    <!-- Architectural Door Entrance Screen (Door 2 - No commas on intro) -->
    <div class="entrance door-entrance" id="entrance">
      <!-- Animated Sanctuary Background: slow zoom + drifting light motes -->
      <div class="entrance-bg" aria-hidden="true">
        <img class="entrance-bg-img" src="./assets/ordination-altar-cinematic.jpg" alt="" decoding="async">
        <div class="entrance-bg-veil"></div>
        <span class="entrance-mote"></span>
        <span class="entrance-mote"></span>
        <span class="entrance-mote"></span>
        <span class="entrance-mote"></span>
        <span class="entrance-mote"></span>
        <span class="entrance-mote"></span>
        <span class="entrance-mote"></span>
        <span class="entrance-mote"></span>
      </div>
      <div class="door-scene-wrapper">
        <header class="door-header">
          <span class="door-motto">Ad Majorem Dei Gloriam</span>
          <h1 class="door-main-title">
            <span>Invitation to the</span>
            <span>Priestly Ordination</span>
          </h1>
          <p class="door-of-line">Of</p>
          <p class="door-ordinands-line">
            <span class="door-name-item">
              <span class="door-name">Deacon Reuell Paul SJ</span>
              <span class="door-amp">&amp;</span>
            </span>
            <span class="door-name-item">
              <span class="door-name">Deacon Christ Rajan Minj SJ</span>
            </span>
          </p>
          <div class="door-cross-divider" aria-hidden="true"><span>☩</span></div>
        </header>

        <!-- Gothic Architectural Double Door Shrine (Door 2) -->
        <div class="door-shrine-stage" id="doorStage">
          <!-- Sanctuary Golden Glow & Both Ordinands Photo Revealed Behind Parting Doors -->
          <div class="door-interior-glow" id="doorInteriorReveal">
            <div class="door-reveal-content">
              <div class="door-reveal-photo-wrap">
                <img class="door-reveal-photo" src="./assets/ordinands-together.jpg" alt="Deacon Christ Rajan Minj SJ &amp; Deacon Reuell Paul SJ" decoding="async">
                <div class="door-reveal-halo" aria-hidden="true"></div>
                <div class="door-reveal-frame-rim" aria-hidden="true"></div>
              </div>
              <div class="door-reveal-plaque">
                <span class="door-reveal-cross">☩</span>
                <span class="door-reveal-title">DEACON CHRIST RAJAN MINJ SJ &amp; DEACON REUELL PAUL SJ</span>
                <span class="door-reveal-sub">Society of Jesus · Darjeeling–Nepal Province</span>
              </div>
            </div>
            <div class="sanctuary-rays"></div>
          </div>

          <!-- Double Door Panels Splitting From Center -->
          <div class="door-panels-portal">
            <div class="door-panel door-panel-left" id="doorLeft" aria-hidden="true">
              <img class="door-panel-leaf" src="./assets/door-panel-left.png" alt="Sanctuary Door Left Leaf">
              <div class="door-panel-shadow" aria-hidden="true"></div>
            </div>
            <div class="door-panel door-panel-right" id="doorRight" aria-hidden="true">
              <img class="door-panel-leaf" src="./assets/door-panel-right.png" alt="Sanctuary Door Right Leaf">
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
            <small>St. Mary’s Hill, St. John Berchman’s Parish</small>
          </p>
        </footer>
      </div>
    </div>

    <!-- Main Invitation Stationery -->
    <main class="invitation" id="invitation" inert>

      <!-- Inside First Page: Omnibus Omnia, solemn conferral, ordinands duo & Bishop -->
      <section class="paper-section ordination-intro" id="sacramental-call" aria-label="Sacramental Calling">
        <div class="first-page-cover" id="first-page-cover">
          <!-- Logo on top (golden IHS) -->
          <div class="seal-badge-wrap reveal">
            <img class="badge-seal" src="./assets/jesuit-seal.jpg" alt="Society of Jesus Golden IHS Seal" width="86" height="86">
          </div>

          <!-- Heading : in typography font: Omnibus Omnia -->
          <h2 class="omnibus-heading reveal">Omnibus Omnia</h2>

          <!-- Sub Heading : in calligraphy but not italics: “All Things to All People, for Christ.” -->
          <p class="omnibus-subheading reveal">“All Things to All People, for Christ.”</p>

          <!-- 1 Cor 9:22 -->
          <p class="omnibus-scripture reveal">1 Cor 9:22</p>

          <div class="rule" aria-hidden="true"></div>

          <!-- Main Inner Plaque Card -->
          <div class="invitation-text-block reveal" id="names" tabindex="-1">
            <div class="invitation-preamble-group">
              <p class="invitation-lead-line">With the blessings of God and the prayers of our elders,</p>
              <p class="invitation-hosts-line">The Darjeeling–Nepal Jesuits,</p>
              <p class="invitation-families-line">together with the families of the ordinands,</p>
              <p class="invitation-invite-line">cordially invite you to the</p>
            </div>

            <h3 class="ordination-callout">SACERDOTAL ORDINATION</h3>
            <p class="of-label">of</p>

            <!-- Staggered Ordinands Layout: Name at side & Image at side (matching folded hands pose) -->
            <div class="ordinands-staggered-duo">
              <!-- Row 1: Name Box on Left, Deacon Reuell on Right (hands pointing left towards his name) -->
              <div class="ordinand-staggered-row reuell-row">
                <div class="ordinand-name-card-box">
                  <h4 class="ordinand-box-title"><span class="name-line">DEACON REUELL</span><span class="name-line">PAUL <span class="sj-pill">SJ</span></span></h4>
                </div>
                <div class="ordinand-staggered-photo-wrap">
                  <img class="ordinand-staggered-img" src="./assets/deacon-reuell-hd.png" alt="Deacon Reuell Paul SJ" loading="lazy">
                </div>
              </div>

              <div class="ordinands-staggered-amp" aria-hidden="true">&amp;</div>

              <!-- Row 2: Deacon Christ Rajan on Left (hands pointing right towards his name), Name Box on Right -->
              <div class="ordinand-staggered-row rajan-row">
                <div class="ordinand-staggered-photo-wrap">
                  <img class="ordinand-staggered-img" src="./assets/deacon-rajan-hd.png" alt="Deacon Christ Rajan Minj SJ" loading="lazy">
                </div>
                <div class="ordinand-name-card-box">
                  <h4 class="ordinand-box-title"><span class="name-line">DEACON CHRIST</span><span class="name-line">RAJAN MINJ <span class="sj-pill">SJ</span></span></h4>
                </div>
              </div>
            </div>

            <p class="priesthood-text">to the Sacred Order of Priesthood,</p>
            <p class="conferral-calling-line">Which will be solemnly conferred upon them by</p>

            <!-- Centre img of Bishop just above the calligraphic cursive name -->
            <div class="bishop-hero-feature">
              <div class="bishop-hero-portrait-wrap">
                <img class="bishop-hero-portrait-img" src="./assets/bishop-cutout-transparent.png" alt="Rt. Rev. Stephen Lepcha, Bishop of Darjeeling" loading="lazy">
              </div>
              <p class="bishop-hero-name">Rt. Rev. Stephen Lepcha</p>
              <p class="bishop-hero-diocese">Bishop of Darjeeling</p>
            </div>

            <div class="liturgical-divider" aria-hidden="true"><span>☩</span></div>

            <!-- Date & Time: 20 NOVEMBER 2026 | 10:30 AM -->
            <div class="date-time-banner">
              <span>20 NOVEMBER 2026</span>
              <span class="banner-pipe">|</span>
              <span>10:30 AM</span>
            </div>

          </div>
        </div>

        <a class="hero-link" href="#venue-section">View Venue &amp; Programme ↓</a>
      </section>

      <!-- Venue Section: Enhanced Satellite Image (Image 2) & Location Box -->
      <section class="paper-section venue-section" id="venue-section" aria-labelledby="venue-title">
        <span class="section-kicker reveal">Ordination Venue</span>
        <h2 class="script reveal" id="venue-title">St. Mary’s Hill Kurseong</h2>
        <p class="venue-subheading reveal">St. John Berchman’s Parish</p>
        <div class="rule" aria-hidden="true"></div>

        <!-- Satellite Picture (Image 2 Enhanced) & Watermark Location Box -->
        <div class="satellite-feature-card reveal">
          <div class="satellite-image-wrapper">
            <img class="satellite-img" src="${text(data.venue.satelliteImage || './assets/st-marys-satellite-map.jpg')}" alt="Enhanced Satellite perspective of St. Mary's Hill, Kurseong featuring St. Mary's Grotto" loading="lazy">
            <div class="satellite-badge">
              <span class="badge-icon">🛰️</span> Satellite Map View
            </div>
          </div>
          <p class="venue-caption">${text(data.venue.sceneCaption)}</p>

          <div class="location-details-box location-watermark-card">
            <div class="watermark-bg-overlay" aria-hidden="true"></div>
            <div class="location-details-inner">
              <h3 class="venue-name">ST. MARY’S HILL KURSEONG</h3>
              <p class="venue-history">St. John Berchman’s Parish</p>
              <address class="venue-address">${text(data.venue.address)}</address>
              <p class="venue-timing">${text(data.venue.timeLabel)}</p>

              <div class="actions map-actions">
                <a class="action" id="maps" href="${safeURL(data.venue.mapsUrl || 'https://maps.app.goo.gl/DyYy9wbV89KhnKnr7?g_st=aw')}" target="_blank" rel="noopener noreferrer">
                  <span>📍 Open in Google Maps</span>
                </a>
                <a class="action secondary" id="satellite-link" href="${safeURL(data.venue.satelliteUrl || 'https://www.google.com/maps/place/St.+Mary\'s+Hill+Church,+Kurseong/@26.8837,88.2762,700m/data=!3m1!1e3')}" target="_blank" rel="noopener noreferrer">
                  <span>🛰️ View Satellite Link</span>
                </a>
                <button class="action secondary" id="calendar">
                  <span>📅 Add to Calendar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- The Ordinands Individual Showcase (Left & Right Profiles) -->
      <section class="paper-section ordinands-section" id="ordinands-profiles" aria-label="The Ordinands">
        <h2 class="script reveal">The Ordinands</h2>
        <div class="rule" aria-hidden="true"></div>

        <div class="ordinands-duo-grid">
          
          <!-- Left Side Ordinand Card: DEACON CHRIST RAJAN MINJ SJ (Image 4) -->
          <article class="ordinand-profile-card reveal" id="card-left">
            <div class="profile-photo-container">
              <img class="profile-img active-img" id="img-left" src="${ordLeft.photoPrayer}" alt="DEACON CHRIST RAJAN MINJ SJ" loading="lazy">
            </div>
            <div class="profile-content">
              <h3 class="profile-name">${text(ordLeft.name)}</h3>
              <p class="profile-parents">${text(ordLeft.parents)}</p>
              <p class="profile-subtitle">${text(ordLeft.subtitle)}</p>
              <div class="liturgical-divider" aria-hidden="true"><span>☩</span></div>
              <p class="profile-caption thanksgiving-caption">Thanksgiving Mass</p>
              <p class="profile-mass-place">${text(ordLeft.massPlace)}</p>
              <p class="profile-mass-date">${text(ordLeft.massDate)}</p>
              <p class="profile-mass-time">${text(ordLeft.massTime)}</p>
            </div>
          </article>

          <!-- Right Side Ordinand Card: DEACON REUELL PAUL SJ (Image 5) -->
          <article class="ordinand-profile-card reveal" id="card-right">
            <div class="profile-photo-container">
              <img class="profile-img active-img" id="img-right" src="${ordRight.photoPrayer}" alt="DEACON REUELL PAUL SJ" loading="lazy">
            </div>
            <div class="profile-content">
              <h3 class="profile-name">${text(ordRight.name)}</h3>
              <p class="profile-parents">${text(ordRight.parents)}</p>
              <p class="profile-subtitle">${text(ordRight.subtitle)}</p>
              <div class="liturgical-divider" aria-hidden="true"><span>☩</span></div>
              <p class="profile-caption thanksgiving-caption">Thanksgiving Mass</p>
              <p class="profile-mass-place">${text(ordRight.massPlace)}</p>
              <p class="profile-mass-date">${text(ordRight.massDate)}</p>
              <p class="profile-mass-time">${text(ordRight.massTime)}</p>
            </div>
            <!-- Sacred Chalice coming in front of the box (as requested) -->
            <div class="chalice-foreground-wrap" aria-hidden="true">
              <img class="chalice-foreground-img" src="./assets/sacred-golden-chalice.png" alt="" loading="lazy">
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

      <!-- Live Telecast Section with YouTube QR and Link (Live from 10:00 AM onwards) -->
      <section class="paper-section live-stream-section" aria-labelledby="live-title">
        <div class="live-stream-card reveal">
          <div class="live-indicator">
            <span class="live-dot"></span> LIVE FROM 10:00 AM ONWARDS
          </div>
          <h2 class="script" id="live-title">Live Stream on YouTube</h2>
          <p class="live-note">
            For family members Jesuit brethren, friends, alumni and the faithful who are unable to be present at St. Mary’s Hill, the Eucharistic celebration and Rite of Ordination will be broadcast live from 10:00 AM onwards.
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
      <section class="paper-section etiquette-section" id="liturgical-notes" aria-label="Liturgical Information">
        <div class="notes-grid">
          <article class="reveal note-card">
            <div class="note-icon">✝</div>
            <h3 class="script">Liturgical Concelebration</h3>
            <p>${text(data.details.dressCode)}</p>
          </article>
          <div class="rule" aria-hidden="true"></div>
          <article class="reveal note-card">
            <div class="note-icon">🕊️</div>
            <h3 class="script">Prayer for Priests</h3>
            <p class="prayer-text">${text(data.details.prayerForPriests)}</p>
          </article>
        </div>
      </section>

      <!-- RSVP & Prayerful Wishes (With Two Input Boxes & WhatsApp RSVP) -->
      <section class="paper-section rsvp-section" aria-labelledby="rsvp-title">
        <div class="rsvp-card reveal">
          <span class="rsvp-kicker">Communion &amp; Presence</span>
          <div class="seal-mini">☩</div>
          <h2 class="script" id="rsvp-title">${text(data.rsvp?.heading || 'Prayerful Communion & Presence')}</h2>
          <p>${text(data.rsvp?.note || 'Kindly let us know of your presence or send your prayerful wishes to +91 7583925441 via WhatsApp.')}</p>

          ${data.rsvp?.deadline ? `<p class="rsvp-deadline">Kindly reply by ${text(data.rsvp.deadline)}</p>` : ''}

          <!-- Two RSVP Input Boxes (Name & Attendance) -->
          <form class="rsvp-form" id="rsvp-form" onsubmit="return false;">
            <div class="rsvp-field">
              <label for="rsvp-name">Your full name / Fr / Sr</label>
              <input id="rsvp-name" name="guestName" autocomplete="name" maxlength="120" placeholder="Your full name / Fr / Sr">
            </div>
            <div class="rsvp-field">
              <label for="rsvp-attendance">Will you be joining us?</label>
              <select id="rsvp-attendance" name="attendance">
                <option value="">Please select your response</option>
                <option value="yes">Joyfully accepts</option>
                <option value="no">Regretfully declines</option>
              </select>
            </div>

            <!-- WhatsApp RSVP Button -->
            <div class="whatsapp-rsvp-wrap">
              <a class="action whatsapp-btn" id="whatsapp-rsvp-btn" href="${safeURL(data.rsvp?.whatsappUrl || 'https://wa.me/917583925441?text=Hi.%0APeace%20be%20with%20you.%F0%9F%AA%B7%0AI%20will%20be%20present%20for%20the%20Ordination%20at%20St.%20Mary%27s%20Kurseong.%20%E2%9C%A8%0ABest%20wishes.')}" target="_blank" rel="noopener noreferrer">
                <svg class="wa-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 18.06c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.03 8.03 0 0 1-1.23-4.29c0-4.43 3.61-8.04 8.04-8.04 2.15 0 4.17.84 5.69 2.35 1.52 1.52 2.36 3.54 2.36 5.69 0 4.44-3.61 8.05-8.07 8.05zm4.41-6.03c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.16-.46-.28z"/>
                </svg>
                <span>SEND RSVP</span>
              </a>
            </div>
          </form>
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
            <h2 class="closing-title script" id="closing-title">${text(data.compliments?.title || 'With Best compliments from')}</h2>
            <div class="closing-rule" aria-hidden="true"></div>
            
            <div class="compliments-container">
              <ul class="compliments-list">
                ${(data.compliments?.items && data.compliments.items.length ? data.compliments.items : ['- - - - -', '- - - - -']).map(item => `<li>${text(item)}</li>`).join('')}
              </ul>
            </div>

            <div class="closing-rule" aria-hidden="true"></div>
            <p class="closing-caption">${text(data.compliments?.endingLine || 'Sacerdotal Ordination to the Priesthood of Jesus Christ')}</p>
          </div>
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
    if (ambience && ambience.setPaused) ambience.setPaused(stopped);
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

  // RSVP Two Input Boxes (Name & Attendance) + WhatsApp RSVP Sync
  const rsvpName = $('rsvp-name');
  const rsvpAttendance = $('rsvp-attendance');
  const waBtn = $('whatsapp-rsvp-btn');
  const basePhone = String(data.rsvp?.whatsapp || '7583925441').replace(/\D/g, '');

  function buildWhatsAppRSVPUrl() {
    const guestName = rsvpName ? rsvpName.value.trim() : '';
    const attValue = rsvpAttendance ? rsvpAttendance.value : '';
    let msg = '';
    if (attValue === 'no') {
      msg = guestName
        ? `Hi.\nPeace be with you.\nI regret to inform you that I won't be present for the ordination at Kurseong.\n- ${guestName}`
        : `Hi.\nPeace be with you.\nI regret to inform you that I won't be present for the ordination at Kurseong.`;
    } else {
      msg = guestName
        ? `Hi.\nPeace be with you.🪷\nI will be present for the Ordination at St. Mary's Kurseong. ✨\nBest wishes.\n- ${guestName}`
        : `Hi.\nPeace be with you.🪷\nI will be present for the Ordination at St. Mary's Kurseong. ✨\nBest wishes.`;
    }
    return `https://wa.me/91${basePhone}?text=${encodeURIComponent(msg)}`;
  }

  function syncWhatsAppRSVP() {
    if (waBtn) waBtn.href = buildWhatsAppRSVPUrl();
  }

  if (rsvpName) rsvpName.addEventListener('input', syncWhatsAppRSVP);
  if (rsvpAttendance) rsvpAttendance.addEventListener('change', syncWhatsAppRSVP);
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      syncWhatsAppRSVP();
    });
  }
  const rsvpForm = $('rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      syncWhatsAppRSVP();
      if (waBtn) waBtn.click();
    });
  }

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
    $('invitation').classList.add('is-open');
    document.body.classList.remove('locked');
    $('media-controls').hidden = false;
    syncMotion();
    $('music').hidden = !source('music');
    beginObservers();
    $('names').focus({ preventScroll: true });
    fadeTimer = setTimeout(() => {
      $('entrance').hidden = true;
    }, reduced.matches ? 0 : 1150);
  }

  // --- Door latch click + hinge creak, synthesised so no extra asset is needed ---
  let doorAudioCtx = null;
  function playDoorSound() {
    if (reduced.matches) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      doorAudioCtx = doorAudioCtx || new Ctx();
      const ctx = doorAudioCtx;
      if (ctx.state === 'suspended') ctx.resume();
      const t0 = ctx.currentTime;

      // 1. Dry wooden latch click
      const noiseLen = Math.floor(ctx.sampleRate * 0.09);
      const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
      const nd = noiseBuf.getChannelData(0);
      for (let i = 0; i < noiseLen; i++) nd[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / noiseLen, 7);
      const click = ctx.createBufferSource();
      click.buffer = noiseBuf;
      const band = ctx.createBiquadFilter();
      band.type = 'bandpass';
      band.frequency.value = 1750;
      band.Q.value = 1.1;
      const clickGain = ctx.createGain();
      clickGain.gain.value = 0.42;
      click.connect(band).connect(clickGain).connect(ctx.destination);
      click.start(t0);

      // 2. Soft wooden knock
      const knock = ctx.createOscillator();
      knock.type = 'sine';
      knock.frequency.setValueAtTime(180, t0);
      knock.frequency.exponentialRampToValueAtTime(58, t0 + 0.22);
      const knockGain = ctx.createGain();
      knockGain.gain.setValueAtTime(0.0001, t0);
      knockGain.gain.exponentialRampToValueAtTime(0.34, t0 + 0.012);
      knockGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.42);
      knock.connect(knockGain).connect(ctx.destination);
      knock.start(t0);
      knock.stop(t0 + 0.45);

      // 3. Long low hinge creak while the leaves swing open
      const creakLen = Math.floor(ctx.sampleRate * 2.7);
      const creakBuf = ctx.createBuffer(1, creakLen, ctx.sampleRate);
      const cd = creakBuf.getChannelData(0);
      for (let i = 0; i < creakLen; i++) cd[i] = Math.random() * 2 - 1;
      const creak = ctx.createBufferSource();
      creak.buffer = creakBuf;
      const creakFilter = ctx.createBiquadFilter();
      creakFilter.type = 'bandpass';
      creakFilter.Q.value = 14;
      creakFilter.frequency.setValueAtTime(620, t0 + 0.16);
      creakFilter.frequency.linearRampToValueAtTime(980, t0 + 1.05);
      creakFilter.frequency.linearRampToValueAtTime(700, t0 + 1.85);
      creakFilter.frequency.linearRampToValueAtTime(430, t0 + 2.55);
      const creakGain = ctx.createGain();
      creakGain.gain.setValueAtTime(0.0001, t0 + 0.16);
      creakGain.gain.linearRampToValueAtTime(0.075, t0 + 0.55);
      creakGain.gain.linearRampToValueAtTime(0.06, t0 + 1.75);
      creakGain.gain.linearRampToValueAtTime(0.0001, t0 + 2.6);
      creak.connect(creakFilter).connect(creakGain).connect(ctx.destination);
      creak.start(t0 + 0.16);
      creak.stop(t0 + 2.7);

      // 4. Final soft thud as the doors come to rest
      const thud = ctx.createOscillator();
      thud.type = 'triangle';
      thud.frequency.setValueAtTime(95, t0 + 2.42);
      thud.frequency.exponentialRampToValueAtTime(48, t0 + 2.7);
      const thudGain = ctx.createGain();
      thudGain.gain.setValueAtTime(0.0001, t0 + 2.42);
      thudGain.gain.exponentialRampToValueAtTime(0.2, t0 + 2.47);
      thudGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.85);
      thud.connect(thudGain).connect(ctx.destination);
      thud.start(t0 + 2.42);
      thud.stop(t0 + 2.9);
    } catch {
      /* audio is a nicety — never block the entrance */
    }
  }

  async function openInvitation() {
    if (opened) return;
    opened = true;
    $('open').disabled = true;
    playDoorSound();

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
      openingTimer = setTimeout(finishOpening, 3300);
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
    $('invitation').classList.remove('is-open');
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
      document.querySelectorAll(`[data-count="${key}"]`).forEach(el => {
        el.textContent = String(value).padStart(2, '0');
      });
    }
    if (!remaining) {
      const ct = $('countdown-title');
      if (ct) ct.textContent = 'The Sacred Ordination Has Commenced';
      const cn = $('countdown-note');
      if (cn) cn.textContent = 'Deo Gratias · In prayerful communion.';
    }
  }
  tick();
  setInterval(tick, 1000);

  // ICS Calendar generation
  const icsEscape = value => String(value).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const stamp = value => value.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  function downloadCalendar() {
    if (!validDate) return;
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
      `SUMMARY:${icsEscape('Sacerdotal Ordination of Deacon Reuell Paul SJ & Deacon Christ Rajan Minj SJ')}`,
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
  }

  if ($('calendar')) {
    $('calendar').disabled = !validDate;
    $('calendar').addEventListener('click', downloadCalendar);
  }
  if ($('calendar-inline')) {
    $('calendar-inline').disabled = !validDate;
    $('calendar-inline').addEventListener('click', downloadCalendar);
  }

  // Preview / QA aid: index.html?open renders the invitation with the doors
  // already open (add #section-id to jump straight to a section).
  if (new URLSearchParams(location.search).has('open')) {
    finishOpening();
    const jump = () => {
      const id = location.hash.slice(1);
      const target = id && document.getElementById(id);
      if (target) {
        document.documentElement.style.scrollBehavior = 'auto';
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };
    jump();
    setTimeout(jump, 300);
    setTimeout(jump, 1200);
  }
})();
