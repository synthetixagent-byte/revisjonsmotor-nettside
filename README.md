# Revisjonsmotor: nettsted

Statisk nettsted for revisjonsmotor.no. Ren HTML, CSS og skript, ingen byggesteg på serveren.
Åpne `index.html` i nettleseren for å se det lokalt.

- `index.html`: forsiden. Skriptene står i `forside-1.js` (kjøremotoren for malen), `forside-2.js`
  (siden selv: partikkelmerket, populasjonen, kildene) og `forside-3.js` (oppstart, ventelisten,
  fanene og menyen på mobil).
- `slik-fungerer-det.html`: Motorringen og kontrollene. Skriptene står i `js-klasse.js` (merker at
  skript kjører), `slik.js` (menyen på mobil og Motorringen) og `vannmerke.js` (vannmerket som
  snur seg når siden rulles).
- `tripletex.html`, `personvern.html`, `vilkar.html`, `databehandleravtale.html`,
  `systemsikkerhet.html`: i samme ramme som «Slik fungerer det», med vannmerket. Skriptene står i
  `js-klasse.js`, `sider.js` (menyen på mobil) og `vannmerke.js`.
- Sidene bygges fra programmets repo med `python verktoy\nettside\lag_nettside.py`
  (`verktoy/nettside/LESMEG.md`). Endre ikke HTML-filene her for hånd. Unntaket er teksten inne i
  `<article>` på de juridiske sidene: den finnes bare her, og byggeskriptet legger rammen rundt.
- Farger, skrift og former følger brandbook 2.1 (`docs/Revisjonsmotor-Brandbook-2.0.html` i
  programmets repo): plomme og kobolt.
- `tripletex-logo.png`: leses av byggeskriptet og legges inn i Tripletex-siden og forsiden
- `fonter/`: Barlow, Source Sans 3 og Saira (bare bokstavene i «Motoren»), med lisensene (SIL Open Font License 1.1)

Nettstedet henter ingenting fra andre tjenester: ingen skrift fra Google, ingen CDN.
Sikkerhetsregelen (Content-Security-Policy) i hver side tillater bare egne filer. Derfor står
ingen skript inne i sidene, og skriftene hentes fra `fonter/`.
