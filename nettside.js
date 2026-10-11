// Revisjonsmotor: det lille som trengs av skript på revisjonsmotor.no.
document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', function () {
  // Innholdet kommer til syne når det ruller inn, én gang.
  var inn = document.querySelectorAll('[data-inn]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (l) {
      l.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('synlig'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    inn.forEach(function (el) { io.observe(el); });
  } else {
    inn.forEach(function (el) { el.classList.add('synlig'); });
  }
  // Flytkortene: uten mus åpnes «hvordan» med et trykk, ett kort om gangen.
  // Med mus kommer teksten når musa er over, og med tastatur når kortet har fokus.
  var mus = window.matchMedia('(hover:hover) and (pointer:fine)');
  var kort = [].slice.call(document.querySelectorAll('.steg-knapp'));
  kort.forEach(function (k) {
    k.addEventListener('click', function () {
      if (mus.matches) return;
      var varApen = k.classList.contains('apen');
      kort.forEach(function (a) { a.classList.remove('apen'); });
      if (!varApen) k.classList.add('apen');
    });
  });
});
