(() => {
  'use strict';

  const data = window.WEDDING_DATA;
  const theme = (window.INVITATION_THEMES && window.INVITATION_THEMES[data.theme]) || {
    paper: '#fbf8f3',
    ink: '#231a17',
    accent: '#7c1a27',
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

  document.title = `Sacerdotal Ordination | ${data.couple.first} & ${data.couple.second}`;

  const ord = data.ordinands || {};
  const ordLeft = ord.left || {
    name: data.couple.first,
    title: data.couple.first,
    subtitle: 'Society of Jesus · Darjeeling Province',
    photoPrayer: './assets/ordinand-left-prayer.jpg',
    photoMinistry: './assets/ordinand-left-monstrance.jpg',
    prayerLabel: 'In Prayer',
    ministryLabel: 'Adoration'
  };
  const ordRight = ord.right || {
    name: data.couple.second,
    title: data.couple.second,
    subtitle: 'Society of Jesus · Darjeeling Province',
    photoPrayer: './assets/ordinand-right-prayer.jpg',
    photoMinistry: './assets/ordinand-right-censer.jpg',
    prayerLabel: 'In Prayer',
    ministryLabel: 'Liturgy'
  };
  const ordTogether = (ord.together && ord.together.photo) ? ord.together.photo : './assets/ordinands-together-designed.jpg';

  const app = document.querySelector('#app');
  app.innerHTML = `
    <!-- Envelope Entrance Screen -->
    <div class="entrance" id="entrance">
      <div class="envelope-wrapper">
        <div class="envelope-card-outer">
          <div class="seal-container">
            <img class="jesuit-seal-img" src="./assets/jesuit-seal.jpg" alt="Society of Jesus Darjeeling Nepal Jesuit Province Seal" width="180" height="180">
          </div>
          <div class="entrance-headers">
            <span class="entrance-motto">Ad Majorem Dei Gloriam</span>
            <p class="entrance-invited">You are cordially invited to the</p>
            <h1 class="entrance-title">SACERDOTAL ORDINATION</h1>
            <p class="entrance-of">of</p>
            <p class="entrance-names">
              <strong>${text(data.couple.first)}</strong><br>
              <span class="amp-symbol">&amp;</span><br>
              <strong>${text(data.couple.second)}</strong>
            </p>
            <div class="liturgical-divider" aria-hidden="true"><span>☩</span></div>
            <p class="entrance-date-venue">
              <span>20 NOVEMBER 2026 · 10:30 AM</span><br>
              <small>St. Mary’s Hill, Kurseong</small>
            </p>
          </div>
          <button class="open-invitation" id="open" aria-label="Open the Sacerdotal Ordination Invitation">
            <span class="open-caption">
              Open Invitation
              <small>Society of Jesus · Darjeeling–Nepal</small>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Invitation Stationery -->
    <main class="invitation" id="invitation" inert>
      
      <!-- Hero Sacred Art & Announcement Banner -->
      <section class="hero sacred-hero" aria-label="Sacerdotal Ordination Announcement">
        <div class="hero-image-wrap">
          <img class="hero-art" src="./assets/ordination-altar.jpg" alt="Sacerdotal Ordination Altar Triptych" fetchpriority="high" decoding="async">
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-copy">
          <div class="liturgical-cross" aria-hidden="true">☩</div>
          <p class="amdg-tag">AD MAJOREM DEI GLORIAM</p>
          <p class="occasion">You are invited to the</p>
          <h2 class="hero-event-title">SACERDOTAL ORDINATION</h2>
          <p class="hero-of">of</p>
          <h1 class="names" id="names" tabindex="-1">
            <span class="ordinand-name">${text(data.couple.first)}</span>
            <span class="names-separator">&amp;</span>
            <span class="ordinand-name">${text(data.couple.second)}</span>
          </h1>
          <div class="hero-conferral">
            <p class="hero-calling">to the Priesthood of Jesus Christ, which will be solemnly conferred upon them by</p>
            <p class="bishop-name">THE MOST REV. STEPHEN LEPCHA</p>
            <p class="bishop-title">Bishop of Darjeeling</p>
          </div>
          <div class="hero-datetime">
            <p class="hero-date">20 NOVEMBER 2026 · 10:30 AM</p>
            <p class="hero-venue">ST. MARY’S HILL, KURSEONG</p>
          </div>
          <a class="hero-link" href="#sacramental-call">View Invitation &amp; Programme ↓</a>
        </div>
      </section>

      <!-- Sacramental Preamble & Cordial Invitation Section -->
      <section class="paper-section solemn-intro" id="sacramental-call" aria-label="Sacramental Calling">
        <div class="seal-badge-wrap reveal">
          <img class="badge-seal" src="./assets/jesuit-seal.jpg" alt="Darjeeling Nepal Jesuit Province" width="90" height="90">
        </div>
        <h2 class="script amdg-heading reveal">Ad Majorem Dei Gloriam</h2>
        <div class="rule" aria-hidden="true"></div>
        
        <div class="vocation-verse reveal">
          <p class="quote-text">
            “In the grace of a vocation,<br>
            faithfully discerned, freely embraced,<br>
            and now brought to its sacramental fulfilment,”
          </p>
        </div>

        <!-- Centerpiece Portrait of Both Ordinands Together -->
        <div class="together-centerpiece-card reveal">
          <div class="together-image-frame">
            <img class="together-img" src="${ordTogether}" alt="Deacon Reuell Paul, SJ and Deacon Christ Rajan Minj, SJ" loading="lazy">
            <div class="together-arch-overlay" aria-hidden="true"></div>
          </div>
          <div class="together-badge">
            <span class="together-title-names">${text(data.couple.first)} &amp; ${text(data.couple.second)}</span>
            <small class="together-sub">Scholastics of the Society of Jesus · Darjeeling–Nepal</small>
          </div>
        </div>

        <div class="invitation-text-block reveal">
          <p class="hosts-text">
            The Darjeeling–Nepal Jesuits, together with the families of the ordinands,<br>
            cordially invite you to the
          </p>
          <h3 class="ordination-callout">SACERDOTAL ORDINATION</h3>
          <p class="of-label">of</p>
          <div class="ordinands-feature">
            <div class="ordinand-card">
              <h4>${text(data.couple.first)}</h4>
            </div>
            <span class="ordinand-conjunction">&amp;</span>
            <div class="ordinand-card">
              <h4>${text(data.couple.second)}</h4>
            </div>
          </div>
          <p class="priesthood-text">
            to the Priesthood of Jesus Christ,<br>
            which will be solemnly conferred upon them by
          </p>
          <div class="bishop-highlight">
            <p class="bishop-title-main">THE MOST REV. STEPHEN LEPCHA</p>
            <p class="bishop-diocese">Bishop of Darjeeling</p>
          </div>
        </div>

        <div class="date-venue-plaque reveal">
          <div class="plaque-col">
            <span class="plaque-label">Date &amp; Time</span>
            <strong class="plaque-value">20 NOVEMBER 2026</strong>
            <span class="plaque-sub">10:30 a.m. IST</span>
          </div>
          <div class="plaque-divider"></div>
          <div class="plaque-col">
            <span class="plaque-label">Solemn Venue</span>
            <strong class="plaque-value">ST. MARY’S HILL, KURSEONG</strong>
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
          
          <!-- Left Side Ordinand Card -->
          <article class="ordinand-profile-card reveal" id="card-left">
            <div class="profile-photo-container">
              <img class="profile-img active-img" id="img-left" src="${ordLeft.photoPrayer}" alt="${text(ordLeft.name)} - In Prayer" loading="lazy">
              <div class="photo-switch-bar">
                <button class="switch-btn active" data-target="img-left" data-src="${ordLeft.photoPrayer}" data-alt="${text(ordLeft.name)} - In Prayer">
                  🕊️ Prayer
                </button>
                <button class="switch-btn" data-target="img-left" data-src="${ordLeft.photoMinistry}" data-alt="${text(ordLeft.name)} - Adoration">
                  ☩ Adoration
                </button>
              </div>
            </div>
            <div class="profile-content">
              <h3 class="profile-name">${text(ordLeft.name)}</h3>
              <p class="profile-subtitle">${text(ordLeft.subtitle)}</p>
              <div class="liturgical-divider" aria-hidden="true"><span>☩</span></div>
              <p class="profile-caption">Faithfully discerning and answering the divine call to serve Christ in the Society of Jesus.</p>
            </div>
          </article>

          <!-- Right Side Ordinand Card -->
          <article class="ordinand-profile-card reveal" id="card-right">
            <div class="profile-photo-container">
              <img class="profile-img active-img" id="img-right" src="${ordRight.photoPrayer}" alt="${text(ordRight.name)} - In Prayer" loading="lazy">
              <div class="photo-switch-bar">
                <button class="switch-btn active" data-target="img-right" data-src="${ordRight.photoPrayer}" data-alt="${text(ordRight.name)} - In Prayer">
                  🕊️ Prayer
                </button>
                <button class="switch-btn" data-target="img-right" data-src="${ordRight.photoMinistry}" data-alt="${text(ordRight.name)} - Sacred Liturgy">
                  ☩ Liturgy
                </button>
              </div>
            </div>
            <div class="profile-content">
              <h3 class="profile-name">${text(ordRight.name)}</h3>
              <p class="profile-subtitle">${text(ordRight.subtitle)}</p>
              <div class="liturgical-divider" aria-hidden="true"><span>☩</span></div>
              <p class="profile-caption">Freely embraced and brought to sacramental fulfilment to minister as a Priest of Jesus Christ.</p>
            </div>
          </article>

        </div>
      </section>

      <!-- Countdown to Sacred Ordination -->
      <section class="paper-section countdown-section torn" aria-labelledby="countdown-title">
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

      <!-- Venue & Satellite Location Section -->
      <section class="paper-section venue-section torn" aria-labelledby="venue-title">
        <span class="section-kicker reveal">Solemn Venue</span>
        <h2 class="script reveal" id="venue-title">St. Mary’s Hill, Kurseong</h2>
        <p class="venue-subheading reveal">Former Jesuit Theologate · St. John Berchmans Parish</p>
        <div class="rule" aria-hidden="true"></div>

        <!-- Satellite Picture & Live Map Feature -->
        <div class="satellite-feature-card reveal">
          <div class="satellite-image-wrapper">
            <img class="satellite-img" src="./assets/st-marys-satellite.jpg" alt="Aerial Satellite View of St. Mary's Hill Kurseong in the Darjeeling Himalayas" loading="lazy">
            <div class="satellite-badge">
              <span class="badge-icon">🛰️</span> Satellite &amp; Aerial View
            </div>
          </div>
          <p class="venue-caption">${text(data.venue.sceneCaption)}</p>

          <div class="location-details-box">
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
        <p class="travel-note reveal">${text(data.venue.note)}</p>
      </section>

      <!-- Live Telecast Section with YouTube QR and Link -->
      <section class="paper-section live-stream-section" aria-labelledby="live-title">
        <div class="live-stream-card reveal">
          <div class="live-indicator">
            <span class="live-dot"></span> LIVE TELECAST
          </div>
          <h2 class="script" id="live-title">Live Stream on YouTube</h2>
          <p class="live-note">
            For family, Jesuit brethren, friends, and faithful worldwide who cannot be physically present at St. Mary’s Hill, the Eucharistic celebration and Rite of Ordination will be broadcast live.
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
              <small class="live-time-hint">Live coverage commences Friday, 20 November 2026 at 10:30 AM IST</small>
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

      <!-- RSVP & Prayerful Wishes -->
      <section class="paper-section rsvp-section" aria-labelledby="rsvp-title">
        <div class="rsvp-card reveal">
          <span class="rsvp-kicker">Communion &amp; Presence</span>
          <div class="seal-mini">☩</div>
          <h2 class="script" id="rsvp-title">${text(data.rsvp?.heading || 'Prayerful Communion & Presence')}</h2>
          <p>${text(data.rsvp?.note || 'Kindly let us know of your presence or send your prayerful wishes to the ordinands.')}</p>
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
            <h2 class="closing-title" id="closing-title">Ad Majorem<br><em>Dei Gloriam</em></h2>
            <div class="closing-rule" aria-hidden="true"></div>
            <p class="closing-names">
              <span>${text(data.couple.first)}</span><br>
              <i class="closing-amp">&amp;</i><br>
              <span>${text(data.couple.second)}</span>
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
    window.initWeddingRSVP($('rsvp-form'), data.rsvp || {}, `${data.couple.first} & ${data.couple.second}`);
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
      $('entrance').classList.add('opening');
      openingTimer = setTimeout(finishOpening, 1200);
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
    $('entrance').classList.remove('leaving', 'opening');
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
        `SUMMARY:${icsEscape('Sacerdotal Ordination of Deacon Reuell Paul, SJ & Deacon Christ Rajan Minj, SJ')}`,
        `LOCATION:${icsEscape(data.venue.name + ', ' + data.venue.address)}`,
        `DESCRIPTION:${icsEscape('Sacerdotal Ordination to the Priesthood of Jesus Christ, conferred by The Most Rev. Stephen Lepcha, Bishop of Darjeeling at St. Mary’s Hill, Kurseong.')}`,
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
