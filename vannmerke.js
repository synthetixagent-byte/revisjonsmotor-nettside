(function () {
  var rot = document.documentElement, lag = document.querySelector('.vm-lag');
  if (!lag) return;
  var stille = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var venter = false;
  function tegn() {
    venter = false;
    var y = window.scrollY || 0, vh = window.innerHeight || 800;
    if (!stille) rot.style.setProperty('--vmrot', (y * 0.03).toFixed(2) + 'deg');
    var v = 1, ring = document.getElementById('slik-jobber-den');
    if (ring) {
      var r = ring.getBoundingClientRect();
      var dekker = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0)) / vh;
      v = 1 - 0.8 * Math.min(1, dekker * 1.25);
    }
    lag.style.setProperty('--vmv', v.toFixed(3));
  }
  window.addEventListener('scroll', function () { if (!venter) { venter = true; requestAnimationFrame(tegn); } }, { passive: true });
  window.addEventListener('resize', tegn);
  tegn();
})();
