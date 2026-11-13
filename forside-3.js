dcMonter(window.__Komp, {"roligeEffekter": true, "particleDensity": 1, "interactive": true}, document.getElementById('dc-mal'), document.getElementById('dc-rot'));

document.addEventListener('keydown', function (e) {
  var t = e.target; if (!t || t.getAttribute('role') !== 'tab' || !t.closest('#kilder')) return;
  var alle = [].slice.call(t.parentNode.querySelectorAll('[role=tab]')), i = alle.indexOf(t), n = null;
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % alle.length;
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i + alle.length - 1) % alle.length;
  if (e.key === 'Home') n = 0; if (e.key === 'End') n = alle.length - 1;
  if (n === null) return; e.preventDefault(); alle[n].click(); alle[n].focus();
});

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
