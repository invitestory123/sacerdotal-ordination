/* Scroll work is event-driven; only visible scenes are measured and animated. */
window.initInvitationMotion = function ({ theme, reduced }) {
  const scenes = [...document.querySelectorAll('.door-scene-wrapper,.hero,.paper-section,.closing')];
  const visible = new Set();
  const depth = { 'aubergine-magnolia': 30, 'petrol-dahlia': 24, 'cobalt-iris': 36, 'cinnamon-camellia': 26 }[theme] || 26;
  let paused = false, frame = 0;

  scenes.forEach((scene) => {
    scene.classList.add('motion-scene');
    // Falling flowers: small blue and white petals scattered here and there
    // Decorative layers never intercept gestures or enter the accessibility tree.
    if (scene.matches('.door-scene-wrapper,.paper-section,.closing')) {
      const layer = document.createElement('div');
      layer.className = 'motion-decor';
      layer.setAttribute('aria-hidden', 'true');
      const types = ['petal-blue', 'petal-white', 'flower-blue', 'flower-white'];
      const count = 18;
      for (let i = 0; i < count; i++) {
        const petal = document.createElement('span');
        const type = types[i % types.length];
        petal.className = `falling-petal ${type}`;
        // Small size here and there: 8px to 14px
        const size = 8 + Math.round(Math.random() * 6);
        petal.style.setProperty('--size', `${size}px`);
        petal.style.setProperty('--x', `${Math.round(Math.random() * 94) + 3}%`);
        petal.style.setProperty('--dur', `${15 + Math.round(Math.random() * 15)}s`);
        petal.style.setProperty('--delay', `${-Math.round(Math.random() * 30)}s`);
        petal.style.setProperty('--drift', `${Math.round(Math.random() * 70 - 35)}px`);
        petal.style.setProperty('--op', (0.65 + Math.random() * 0.3).toFixed(2));
        petal.style.setProperty('--spin', `${Math.round(Math.random() * 360)}deg`);
        layer.append(petal);
      }
      scene.append(layer);
    }
  });

  function disabled() { return paused || reduced.matches || document.hidden; }
  function paint() {
    frame = 0;
    if (disabled()) return;
    const height = window.innerHeight;
    // Read all geometry first, then write, avoiding interleaved layout work.
    const positions = [...visible].map(scene => {
      const rect = scene.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (height / 2 - rect.top - rect.height / 2) / ((height + rect.height) / 2)));
      return [scene, progress];
    });
    positions.forEach(([scene, progress]) => {
      scene.style.setProperty('--parallax-y', `${(progress * depth).toFixed(2)}px`);
      scene.style.setProperty('--scene-y', `${(progress * depth * .65).toFixed(2)}px`);
    });
  }
  function requestPaint() {
    if (!disabled() && !frame) frame = window.requestAnimationFrame(paint);
  }
  function sync() {
    const stop = disabled();
    document.body.classList[stop ? 'add' : 'remove']('motion-paused');
    if (stop) {
      window.cancelAnimationFrame(frame);
      frame = 0;
      scenes.forEach(scene => {
        scene.style.setProperty('--parallax-y', '0px');
        scene.style.setProperty('--scene-y', '0px');
      });
    } else requestPaint();
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        target.classList[isIntersecting ? 'add' : 'remove']('motion-visible');
        if (isIntersecting) visible.add(target); else visible.delete(target);
      });
      requestPaint();
    });
    scenes.forEach(scene => observer.observe(scene));
  } else {
    scenes.forEach(scene => { visible.add(scene); scene.classList.add('motion-visible'); });
  }
  window.addEventListener('scroll', requestPaint, { passive: true });
  window.addEventListener('resize', requestPaint, { passive: true });
  document.addEventListener('visibilitychange', sync);
  sync();
  return { setPaused(value) { paused = value; sync(); } };
};
