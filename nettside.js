// Revisjonsmotor: det lille som trengs av skript på revisjonsmotor.no.
document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', function () {
  var rolig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var kanSe = 'IntersectionObserver' in window;

  // Pilene i vannmerket dreier mot klokka i takt med rullingen, og står stille når rullingen stopper.
  var ring = document.querySelector('.vannmerke-ringer');
  if (ring && !rolig) {
    var raf = 0;
    var spinn = function () { raf = 0; ring.style.transform = 'rotate(' + (-window.scrollY * 0.12) + 'deg)'; };
    window.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(spinn); }, { passive: true });
    spinn();
  }

  // Linjen over stegene tegnes én gang: motorens fire steg i ett strekk, så revisors.
  var liste = document.querySelector('.steg-liste');
  if (liste && !rolig && kanSe) {
    var linjer = [].slice.call(liste.querySelectorAll('.steg-linje'));
    linjer.forEach(function (l) { l.classList.add('ventende'); });
    var io = new IntersectionObserver(function (e) {
      if (!e.some(function (x) { return x.isIntersecting; })) return;
      io.disconnect();
      var steg = 240;
      linjer.forEach(function (l, i) {
        var motor = i < linjer.length - 1;
        l.style.transition = motor
          ? 'transform ' + steg + 'ms linear ' + (i * steg) + 'ms'
          : 'transform 420ms cubic-bezier(.23,1,.32,1) ' + (i * steg + 260) + 'ms';
        l.classList.remove('ventende');
      });
    }, { rootMargin: '0px 0px -20% 0px' });
    io.observe(liste);
  }

  // «Alle»-ruten fylles én gang når den ruller inn.
  var alle = document.querySelector('.ruter-alle');
  if (alle) {
    if (rolig || !kanSe) { alle.classList.add('fylt'); }
    else {
      var io2 = new IntersectionObserver(function (e) {
        if (e.some(function (x) { return x.isIntersecting; })) { io2.disconnect(); alle.classList.add('fylt'); }
      }, { rootMargin: '0px 0px -15% 0px' });
      io2.observe(alle);
    }
  }
});
