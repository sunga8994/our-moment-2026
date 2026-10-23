(() => {
  const overlay = document.querySelector('#opening');
  const video = document.querySelector('#opening-video');
  const ball = document.querySelector('#opening-ball');
  const skip = document.querySelector('#skip-opening');
  const sound = document.querySelector('#sound-opening');
  function soundControl() {
    const on = !video.muted;
    sound.textContent = on ? '소리 끄기' : '소리 켜기';
    sound.setAttribute('aria-pressed', String(on));
  }
  const regions = ['header', 'main', 'footer'].map(s => document.querySelector(s));
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const visitKey = 'our-moment:entry-film:v1';
  const preview = new URLSearchParams(location.search).get('preview') === 'intro';
  function hasVisited() {
    try { return localStorage.getItem(visitKey) === 'seen'; } catch { return false; }
  }
  function rememberVisit() {
    if (preview) return;
    try { localStorage.setItem(visitKey, 'seen'); } catch { /* Private storage can be unavailable. */ }
  }
  let active = false, impact = false, generation = 0, overflow = '', focusTarget;
  let watchdog, finishTimer, animation;
  const guard = (ms) => { clearTimeout(watchdog); watchdog = setTimeout(close, ms); };
  function close() {
    if (!active) return;
    active = false; generation++;
    clearTimeout(watchdog); clearTimeout(finishTimer);
    video.pause(); animation?.cancel();
    const restore = overlay.contains(document.activeElement);
    regions.forEach(el => { el.inert = false; });
    document.body.style.overflow = overflow;
    overlay.classList.add('is-finishing');
    if (restore) focusTarget?.focus({ preventScroll: true });
    finishTimer = setTimeout(() => {
      overlay.hidden = true;
      overlay.classList.remove('is-playing', 'is-impact', 'reveal-main');
      overlay.dataset.state = 'closed';
    }, motion.matches ? 0 : 220);
  }
  async function play() {
    if (active) return;
    clearTimeout(finishTimer);
    const ticket = ++generation;
    active = true; impact = false;
    overflow = document.body.style.overflow;
    focusTarget = document.querySelector('.brand');
    regions.forEach(el => { el.inert = true; });
    document.body.style.overflow = 'hidden';
    overlay.classList.remove('is-finishing', 'is-playing', 'is-impact', 'reveal-main');
    overlay.classList.add('entry-motion');
    overlay.hidden = false; overlay.dataset.state = 'loading';
    overlay.dataset.transition = 'pending';
    rememberVisit();
    skip.focus({ preventScroll: true });
    video.muted = true; video.defaultMuted = true;
    video.volume = .85;
    sound.disabled = false;
    soundControl();
    const source = video.querySelector('source');
    if (!source.hasAttribute('src')) { source.src = source.dataset.src; video.load(); }
    video.currentTime = 0;
    guard(8000);
    try {
      await video.play();
      if (!active || ticket !== generation) { video.pause(); return; }
      overlay.classList.add('is-playing'); overlay.dataset.state = 'playing';
    } catch {
      if (!active || ticket !== generation) return;
      close();
    }
  }
  async function handoff() {
    if (!active || impact) return;
    impact = true; video.pause(); clearTimeout(watchdog);
    sound.disabled = true;
    const ticket = generation;
    const sw = video.videoWidth, sh = video.videoHeight;
    if (!sw || !sh) { close(); return; }
    // Measured ball bounds in the final frame of assets/kick-opening.mp4.
    // A live frame sample keeps the generated ball's lighting and panel texture.
    const crop = { x: .396, y: .375, w: .198, h: .365 };
    const ctx = ball.getContext('2d');
    if (!ctx) { close(); return; }
    ctx.clearRect(0, 0, 512, 512);
    ctx.save(); ctx.beginPath(); ctx.arc(256, 256, 255, 0, Math.PI * 2); ctx.clip();
    ctx.drawImage(video, crop.x * sw, crop.y * sh, crop.w * sw, crop.h * sh, 0, 0, 512, 512);
    ctx.restore();
    const w = overlay.clientWidth, h = overlay.clientHeight;
    const box = video.getBoundingClientRect();
    const outer = overlay.getBoundingClientRect();
    const fit = Math.max(box.width / sw, box.height / sh);
    const position = getComputedStyle(video).objectPosition.split(' ').map(parseFloat);
    const bw = crop.w * sw * fit, bh = crop.h * sh * fit;
    const x = box.left - outer.left + (crop.x + crop.w / 2) * sw * fit + (box.width - sw * fit) * position[0] / 100;
    const y = box.top - outer.top + (crop.y + crop.h / 2) * sh * fit + (box.height - sh * fit) * position[1] / 100;
    Object.assign(ball.style, { left: `${x}px`, top: `${y}px`, width: `${bw}px`, height: `${bh}px` });
    overlay.classList.add('is-impact'); overlay.dataset.state = 'impact';
    overlay.dataset.transition = 'ball';
    const cover = Math.hypot(w, h) / Math.min(bw, bh) * 1.15;
    animation = ball.animate([
      { transform: 'translate(-50%, -50%) scale(1)' },
      { transform: `translate(calc(-50% + ${w / 2 - x}px), calc(-50% + ${h / 2 - y}px)) scale(${cover})` }
    ], { duration: 520, easing: 'cubic-bezier(.45,0,.85,.5)', fill: 'forwards' });
    try { await animation.finished; } catch { return; }
    if (!active || ticket !== generation) return;
    overlay.dataset.transition = 'complete';
    overlay.classList.add('reveal-main');
    finishTimer = setTimeout(close, 110);
  }
  skip.addEventListener('click', close);
  sound.addEventListener('click', () => {
    if (!active || impact) return;
    // This click provides the browser gesture required to enable audio.
    video.muted = !video.muted;
    soundControl();
  });
  video.addEventListener('volumechange', soundControl);
  video.addEventListener('playing', () => {
    if (!active) { video.pause(); return; }
    guard(7000);
    overlay.classList.add('is-playing'); overlay.dataset.state = 'playing';
  });
  video.addEventListener('waiting', () => { if (active) guard(5000); });
  video.addEventListener('ended', handoff);
  video.addEventListener('error', close);
  video.querySelector('source').addEventListener('error', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) close(); });
  motion.addEventListener('change', () => { if (motion.matches) close(); });
  // The opening is the entrance itself, never an optional piece of hero content.
  // An explicit preview URL replays it without changing the normal visit record.
  if (preview || !hasVisited()) play();
})();
