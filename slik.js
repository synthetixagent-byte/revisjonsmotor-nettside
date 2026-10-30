window.spill = function (el) {
  if (!el) return;
  el.classList.add('nullstill'); el.classList.remove('vist'); void el.offsetWidth; el.classList.remove('nullstill');
  requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('vist'); }); });
};
window.vedSyn = function (sel, terskel, rot) {
  var els = [].slice.call(document.querySelectorAll(sel));
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach(function (e) { e.classList.add('vist'); }); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vist'); io.unobserve(e.target); } }); }, { threshold: terskel || 0.35, root: rot || null });
  els.forEach(function (e) { io.observe(e); });
};

(function () {
  function lukk(k, p, fokus) { p.hidden = true; k.setAttribute('aria-expanded', 'false'); if (fokus) k.focus(); }
  document.addEventListener('click', function (e) {
    var k = document.querySelector('.mm-knapp'), p = document.getElementById('mm-panel'); if (!k || !p) return;
    if (e.target.closest('.mm-knapp')) { var apen = p.hidden; p.hidden = !apen; k.setAttribute('aria-expanded', apen ? 'true' : 'false'); if (apen) { var f = p.querySelector('a'); if (f) f.focus(); } return; }
    if (!p.hidden && (e.target.closest('#mm-panel a') || !e.target.closest('#mm-panel'))) lukk(k, p, false);
  });
  document.addEventListener('keydown', function (e) {
    var k = document.querySelector('.mm-knapp'), p = document.getElementById('mm-panel');
    if (e.key === 'Escape' && p && !p.hidden) lukk(k, p, true);
  });
})();

(function () {
  var tabs = [].slice.call(document.querySelectorAll('.mr-st')), akt = 0, C = 1156.1;
  var ring = document.querySelector('.mr-ring'), grid = document.querySelector('.mr-grid'), dreie = document.querySelector('.mr-dreie');
  var rolig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Merket snur med klokka: litt for hver piksel som rulles, og et hakk på 72 grader per steg.
  var mal = 0, naa = 0, gaar = false, sistY = window.scrollY;
  function tegn() { naa += (mal - naa) * 0.14; if (Math.abs(mal - naa) < 0.05) naa = mal; dreie.setAttribute('transform', 'rotate(' + naa.toFixed(2) + ' 50 50)');
    if (naa !== mal) requestAnimationFrame(tegn); else gaar = false; }
  function snu(grader) { mal += grader; if (rolig) { naa = mal; dreie.setAttribute('transform', 'rotate(' + naa + ' 50 50)'); return; } if (!gaar) { gaar = true; requestAnimationFrame(tegn); } }
  if (!rolig) window.addEventListener('scroll', function () { var y = window.scrollY; snu(Math.abs(y - sistY) * 0.3); sistY = y; }, { passive: true });
  function fyll(andel) { ring.style.setProperty('--av', String(C * (1 - andel))); }
  function vis(i, fokus) {
    var ny = (i + 5) % 5; if (ny !== akt) snu(72 * (((ny - akt) % 5 + 5) % 5)); akt = ny;
    tabs.forEach(function (t, n) { var p = document.getElementById(t.getAttribute('aria-controls')), on = n === akt;
      t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; t.classList.toggle('forbi', n < akt); p.hidden = !on; if (on) spill(p.querySelector('.panel-ramme')); });
    fyll(akt / 5);
    if (fokus) tabs[akt].focus();
  }
  // Ringen går hele tiden mens den er synlig, med jevn fart som en sekundviser. Hvert steg varer like lenge:
  // den lengste panelanimasjonen pluss et halvt sekund, målt fra siden selv. Trykk på et steg hopper dit,
  // og ringen går videre derfra. Ikke ved redusert bevegelse; da bytter stegene bare når revisor trykker.
  function ms(v) { return v.split(',').map(function (x) { x = x.trim(); return x.slice(-2) === 'ms' ? parseFloat(x) : parseFloat(x) * 1000; }); }
  function animTid(p) { var r = p.querySelector('.panel-ramme'), maks = 0; if (!r) return 0;
    [r].concat([].slice.call(r.querySelectorAll('*'))).forEach(function (e) { var cs = getComputedStyle(e), dl = ms(cs.transitionDelay), du = ms(cs.transitionDuration);
      for (var k = 0; k < Math.max(dl.length, du.length); k++) { var t = (dl[k % dl.length] || 0) + (du[k % du.length] || 0); if (t > maks) maks = t; } });
    return maks; }
  var STEG_MS = 500 + Math.max.apply(null, tabs.map(function (t) { return animTid(document.getElementById(t.getAttribute('aria-controls'))); }).concat([1500]));
  var RUNDE_MS = STEG_MS * 5, ut = document.querySelector('.mr-ut');
  ring.dataset.steg = String(Math.round(STEG_MS));
  var auto = !rolig, synlig = false, klokke = 0, sist = 0, raf = 0, startet = false, hoppT = 0;
  function kjorer() { return auto && synlig && !document.hidden; }
  function tonUt() { ut.style.transition = 'none'; ut.style.opacity = '1'; void ut.getBoundingClientRect(); ut.style.transition = 'opacity 600ms ease'; ut.style.opacity = '0'; }
  function gang(now) {
    raf = 0; if (!kjorer()) { sist = 0; return; }
    if (!startet) { startet = true; ring.classList.add('mr-auto'); spill(document.getElementById(tabs[akt].getAttribute('aria-controls')).querySelector('.panel-ramme')); }
    if (sist) klokke += now - sist; sist = now;
    if (klokke >= RUNDE_MS) { klokke -= RUNDE_MS; tonUt(); }
    var steg = Math.min(4, Math.floor(klokke / STEG_MS));
    if (steg !== akt) vis(steg);
    fyll(klokke / RUNDE_MS);
    raf = requestAnimationFrame(gang);
  }
  function oppdater() { if (kjorer()) { if (!raf) { sist = 0; raf = requestAnimationFrame(gang); } } else if (raf) { cancelAnimationFrame(raf); raf = 0; sist = 0; } }
  function hopp(i, fokus) {
    var n = (i + 5) % 5;
    if (auto) { klokke = n * STEG_MS; ring.classList.add('mr-hopp'); clearTimeout(hoppT); hoppT = setTimeout(function () { ring.classList.remove('mr-hopp'); }, 500); }
    vis(n, fokus);
  }
  if (auto) {
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { synlig = es[0].isIntersecting; oppdater(); }, { threshold: 0.2 }).observe(grid);
    else synlig = true;
    document.addEventListener('visibilitychange', oppdater);
  }
  tabs.forEach(function (t, n) { t.addEventListener('click', function () { hopp(n); });
    t.addEventListener('keydown', function (e) { var d = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1}[e.key]; if (d) { e.preventDefault(); hopp(akt + d, true); } }); });
  vis(0); vedSyn('.mr-panel:not([hidden]) .panel-ramme', 0.3); oppdater();
})();
