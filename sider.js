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
