# Revisjonsmotor: nettsted

Statisk nettsted for revisjonsmotor.no. Ren HTML og CSS, ingen byggesteg.
Åpne `index.html` i nettleseren for å se det lokalt.

- `index.html`: forsiden
- `slik-fungerer-det.html`, `tripletex.html`: om motoren og Tripletex-koblingen
- `personvern.html`, `vilkar.html`, `databehandleravtale.html`, `systemsikkerhet.html`: juridiske sider
- `styles.css`: felles stil for alle sidene. Farger, skrift og former følger brandbook 2.0
  (`docs/Revisjonsmotor-Brandbook-2.0.html` i programmets repo).
- `nettside.js`: innhold som kommer til syne ved rulling, og flytkortene på forsiden
- `fonter/`: Barlow, Source Sans 3 og Saira (bare bokstavene i «Motoren»), med lisensene (SIL Open Font License 1.1)
- `bilder/skatteoppgjor.png`: kontrollen av skatteoppgjør fra programmet, med eksempeldata

Nettstedet henter ingenting fra andre tjenester: ingen skrift fra Google, ingen CDN.
Sikkerhetsregelen (Content-Security-Policy) i hver side tillater bare egne filer.
