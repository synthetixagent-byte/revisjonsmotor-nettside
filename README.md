# Revisjonsmotor: nettsted

Statisk nettsted for revisjonsmotor.no. Ren HTML, CSS og skript, ingen byggesteg på serveren.
Åpne `index.html` i nettleseren for å se det lokalt.

- `index.html`: forsiden. Skriptene står i `forside-1.js` (kjøremotoren for malen), `forside-2.js`
  (siden selv: partikkelmerket, populasjonen, kildene) og `forside-3.js` (oppstart, ventelisten,
  fanene og menyen på mobil).
- `slik-fungerer-det.html`: Motorringen og kontrollene. Skriptene står i `slik-1.js` (merker at
  skript kjører), `slik-2.js` (menyen på mobil og Motorringen) og `slik-3.js` (vannmerket som
  snur seg når siden rulles).
- `tripletex.html`: om Tripletex-koblingen
- `personvern.html`, `vilkar.html`, `databehandleravtale.html`, `systemsikkerhet.html`: juridiske sider
- `styles.css` og `nettside.js`: stilen og skriptet til undersidene i forrige utseende
  (Tripletex og de juridiske sidene). Forsiden og «Slik fungerer det» bruker dem ikke.
- Farger, skrift og former følger brandbook 2.1 (`docs/Revisjonsmotor-Brandbook-2.0.html` i
  programmets repo): plomme og kobolt.
- `assets/`: merket og ordmerket til undersidene i forrige utseende
- `fonter/`: Barlow, Source Sans 3 og Saira (bare bokstavene i «Motoren»), med lisensene (SIL Open Font License 1.1)
- `bilder/skatteoppgjor.png`: kontrollen av skatteoppgjør fra programmet, med eksempeldata

Nettstedet henter ingenting fra andre tjenester: ingen skrift fra Google, ingen CDN.
Sikkerhetsregelen (Content-Security-Policy) i hver side tillater bare egne filer. Derfor står
ingen skript inne i sidene, og skriftene hentes fra `fonter/`.
