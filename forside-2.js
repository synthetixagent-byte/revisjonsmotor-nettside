const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const TAU = Math.PI * 2;
const fmt = n => n.toLocaleString('nb-NO');
const rotX = a => { const c = Math.cos(a), s = Math.sin(a); return [1,0,0, 0,c,-s, 0,s,c]; };
const rotY = a => { const c = Math.cos(a), s = Math.sin(a); return [c,0,s, 0,1,0, -s,0,c]; };
const rotZ = a => { const c = Math.cos(a), s = Math.sin(a); return [c,-s,0, s,c,0, 0,0,1]; };
const mul = (A, B) => {
  const o = new Array(9);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++)
    o[r*3+c] = A[r*3]*B[c] + A[r*3+1]*B[3+c] + A[r*3+2]*B[6+c];
  return o;
};


const RM_FIXED = 29;
const OK = '#7fd3a6', CHK = '#f2b660', MISS = '#9d8fa3', OKL = '#1d7a46', CHKL = '#a15c08', MISSL = '#6f6676';
const KD = (bg, o) => Object.assign({ bg, ink: '#f3ecf4', hi: '#ffffff', mut: '#c9b8cc', mut2: '#a993ad', mut3: '#8d7891', acc: '#d3c0d5', lrgb: '243,236,244', panel: '#211023', ok: OK, chk: CHK, miss: MISS }, o || {});
const KG = (bg, o) => KD(bg, Object.assign({ ink: '#ededf0', mut: '#b4b4bc', mut2: '#9a9aa5', mut3: '#7e7e88', acc: '#cdb0da', lrgb: '255,255,255', panel: 'rgba(255,255,255,.04)' }, o || {}));
const KL = (bg, o) => Object.assign({ bg, ink: '#1c1620', hi: '#0e0a10', mut: '#4d4452', mut2: '#5e5466', mut3: '#6a6070', acc: '#6d2e72', lrgb: '28,18,32', panel: 'rgba(28,18,32,.045)', ok: OKL, chk: CHKL, miss: MISSL, cta: '#1c1620', ctaink: '#ffffff', ctah: '#3b2a42' }, o || {});
const KLL = (bg, o) => Object.assign({ lbg: bg, link: '#1f1b26', lmut: '#56505f', lmut2: '#67616f', lline: '#dcd8e2', lline2: '#ebe8ef', brand: '#6d2e72', okl: OKL }, o || {});
const KP = (bg, o) => Object.assign({ pbg: bg, pink: '#ffffff', pmut: '#e3d6e4', pmut2: '#cdbcd0', pcta: '#ffffff', pctaink: '#6d2e72', pctah: '#f3eaf4' }, o || {});
const KPL = (bg, o) => KP(bg, Object.assign({ pink: '#1c1620', pmut: '#3a2f3f', pmut2: '#4a3f50', pcta: '#1c1620', pctaink: '#ffffff', pctah: '#3b2a42' }, o || {}));
const AMBER_CTA = { cta: CHK, ctaink: '#241304', ctah: '#f7c77f' };
const STATUS_D = { ok: OK, chk: CHK, miss: MISS };
const LIGHT_ROOT = { ink: '#1c1620', hi: '#0e0a10', mut: '#4d4452', mut2: '#5e5466', mut3: '#6a6070', acc: '#6d2e72', lrgb: '28,18,32', panel: 'rgba(28,18,32,.045)', ok: OKL, chk: CHKL, miss: MISSL, navon: '#1c1620', navoff: '#5e5466', navu: 'rgba(28,18,32,.85)', logol: 'none', logod: 'block' };
const AUB = { bgRgb: [27, 12, 29], dimRgb: [64, 45, 68], lysRgb: [211, 192, 213] };
const TINT = { sortOk: [127, 211, 166], okMix: 0.75, sq: '242,182,96', sortOkLabel: OK, sortChkLabel: CHK, vesOver: CHKL, vesUnder: '#a6d3b8' };
const HERO_DARK_ON_LIGHT = { normal: true, lys: [0.43, 0.2, 0.46], wh: [0.17, 0.07, 0.19], pl: [0.62, 0.38, 0.64] };
const RM_THEMES = (() => {
  const base = {
    css: { bg: '#1b0c1d', hdr: 'rgba(27,12,29,.8)', plum: '#311533', panel: '#211023', ink: '#f3ecf4', hi: '#ffffff', mut: '#c9b8cc', mut2: '#a993ad', mut3: '#8d7891', acc: '#d3c0d5', lrgb: '243,236,244',
      cta: '#f3ecf4', ctaink: '#311533', ctah: '#ffffff', lbg: '#f6f5f8', link: '#1f1b26', lmut: '#56505f', lmut2: '#67616f', lline: '#dcd8e2', lline2: '#ebe8ef', brand: '#6d2e72', okl: '#1d7a46',
      ok: '#d3c0d5', chk: '#ffffff', miss: '#a993ad', pbg: '#311533', pink: '#ffffff', pmut: '#e3d6e4', pmut2: '#cdbcd0', pcta: '#ffffff', pctaink: '#6d2e72', pctah: '#f3eaf4', fbg: '#311533', fmut: '#cdbcd0', flink: '#e7dbe8',
      navon: '#ffffff', navoff: '#c9b8cc', navu: 'rgba(243,236,244,.9)', logol: 'block', logod: 'none' },
    sec: {},
    hero: { lys: [0.83, 0.75, 0.84], wh: [1, 0.96, 1], pl: [0.56, 0.3, 0.6], spark: null, gear: null, check: null, normal: false }, endHero: null,
    flow: '211,192,213', flowHi: '255,248,255', flowLight: false, glow: '255,246,255', glowSh: '226,196,232', sq: '255,250,255', sortOk: null, okMix: 1, sortOkLabel: '#c9b8cc', sortChkLabel: '#ffffff',
    vesOver: '#6d2e72', vesUnder: '#cfc7d6', bgRgb: [27, 12, 29], dimRgb: [64, 45, 68], lysRgb: [211, 192, 213], whRgb: [255, 250, 255], popLight: false, endK: 1,
  };
  const graf = { bg: '#111113', hdr: 'rgba(17,17,19,.82)', panel: 'rgba(255,255,255,.04)', ink: '#ededf0', mut: '#b4b4bc', mut2: '#9a9aa5', mut3: '#7e7e88', acc: '#cdb0da', lrgb: '255,255,255',
    lbg: '#f6f6f7', link: '#18181b', lmut: '#52525b', lmut2: '#63636d', lline: '#e2e2e6', lline2: '#ececef', navoff: '#a1a1aa', navu: 'rgba(255,255,255,.9)', fbg: '#0b0b0c', fmut: '#a1a1aa', flink: '#d4d4d8' };
  const BL = '#8fb2ff', BLD = '#2f5bd3';
  const BLUEFX = { flow: '143,178,255', flowHi: '225,234,255', glow: '225,234,255', glowSh: '120,160,255' };
  const NAVY = { ink: '#eef2ff', mut: '#bcc6e8', mut2: '#98a4d0', mut3: '#808cbc', acc: BL, lrgb: '238,242,255', panel: 'rgba(255,255,255,.04)' };
  const NAVYPOP = { bgRgb: [11, 18, 48], dimRgb: [38, 50, 92], lysRgb: [170, 195, 255] };
  const IND = { bg: '#17112b', hdr: 'rgba(23,17,43,.82)', panel: '#211a3d', ink: '#f0eefb', mut: '#c4c2e2', mut2: '#a3a1c8', mut3: '#8a88b0', lrgb: '240,238,251', navoff: '#c4c2e2', navu: 'rgba(240,238,251,.9)' };
  const BLEND = { blend: [[0.82, 0.62, 0.9], [0.56, 0.7, 1]], blendK: 0.85 };
  const S3 = { css: Object.assign({}, STATUS_D), mark: 'a', hero: { gear: [0.56, 0.7, 1], check: [0.56, 0.7, 1] }, ...BLUEFX, ...TINT };
  const S4 = { ...S3, css: Object.assign({}, S3.css, { acc: BL }) };
  const S5 = { ...S4, css: Object.assign({}, S4.css, { cta: BL, ctaink: '#0a1433', ctah: '#a9c4ff', pcta: BL, pctaink: '#0a1433', pctah: '#a9c4ff', lbg: '#f3f5fa', lline: '#dde2ee', lline2: '#e9ecf4', lmut: '#4f5466', lmut2: '#61667a' }) };
  const S6 = { ...S5, css: Object.assign({}, S5.css, IND), hero: Object.assign({}, S5.hero, BLEND), bgRgb: [23, 17, 43], dimRgb: [55, 48, 88], lysRgb: [196, 190, 240] };
  const S7 = { ...S6, mark: 'c', css: Object.assign({}, S6.css, { bg: '#120f2e', hdr: 'rgba(18,15,46,.84)', panel: '#1c1840', fbg: '#0b0920' }),
    sec: { populasjon: KD('#0b1230', NAVY), kilder: KD('#1b0c1d'), trygghet: KD('#1b0c1d') }, ...NAVYPOP };
  const TOPNAVY = { ink: '#eef3ff', mut: '#bccbec', mut2: '#9aaad6', mut3: '#8495c4', acc: BL, lrgb: '238,243,255', panel: 'rgba(255,255,255,.05)' };
  const S8 = { ...S7, hero: Object.assign({}, S7.hero, { blendK: 0.95 }),
    sec: { topp: KD('#0a1a3f', TOPNAVY), flyten: KD('#1b0c1d'), populasjon: KD('#071029', NAVY), prinsipp: KD('#0a1a3f', TOPNAVY), trygghet: KD('#1b0c1d'),
      kilder: KD('#13277a', { ink: '#f0f4ff', mut: '#cdd8ff', mut2: '#b3c2ff', mut3: '#a2b2f5', acc: '#c9a3e0', lrgb: '240,244,255', panel: 'rgba(0,0,0,.14)' }),
      motoren: KLL('#eef2fb', { lline: '#d8dff0', lline2: '#e4e9f5' }), sporbarhet: KLL('#f4eef7', { lline: '#e3d6ea', lline2: '#ece2f1' }),
      vesentlighet: KLL('#e3ebff', { lline: '#c8d5f5', lline2: '#d6e0fa', brand: BLD }) },
    bgRgb: [7, 16, 41], dimRgb: [34, 46, 86], lysRgb: [170, 195, 255], flow: '201,163,224', flowHi: '245,235,255' };
  const COMMON = { css: Object.assign({}, STATUS_D, { acc: BL, cta: BL, ctaink: '#0a1433', ctah: '#a9c4ff', pcta: BL, pctaink: '#0a1433', pctah: '#a9c4ff', lbg: '#f3f5fa', lline: '#dde2ee', lline2: '#e9ecf4', lmut: '#4f5466', lmut2: '#61667a' }), ...BLUEFX, ...TINT };
  const PLUM_P = [0.62, 0.27, 0.66], BLUE_P = [0.36, 0.55, 1], LB = [0.56, 0.7, 1];
  const GLOW2 = 'radial-gradient(closest-side,rgba(109,46,114,.42),rgba(79,125,255,.14) 62%,rgba(79,125,255,0))';
  const X = (prev, o) => Object.assign({}, prev, o, { css: Object.assign({}, prev.css, o.css || {}), hero: Object.assign({}, prev.hero || {}, o.hero || {}) });
  const V1 = X(COMMON, { name: 'Rettet 06', note: 'Utgangspunktet fra 06 på dagens aubergine. Ring og hjul ligger nå i samme plan, og ringen går fra lilla til blått.', mark: 'a', hero: { gear: LB, check: LB, blend: [[0.82, 0.62, 0.9], LB], blendK: 0.85 } });
  const V2 = X(COMMON, { name: 'Plommering, blått hjul', note: 'Tydelig todeling: ringen i plomme, hjulet og haken i blått. Merket følger samme deling.', mark: 'p2', hero: { ring: [0.66, 0.33, 0.7], gear: [0.4, 0.6, 1], check: [0.6, 0.75, 1] } });
  const V3 = X(COMMON, { name: 'Radial fade i hjulet', note: 'Hjulet er blått i midten og fader ut mot plomme i tennene. Ringen har et lite drag mot blått.', mark: 'p3', hero: { ring: [0.66, 0.33, 0.7], gearFade: [[0.45, 0.65, 1], [0.66, 0.33, 0.7]], check: [0.6, 0.75, 1], blend: [[0.66, 0.33, 0.7], [0.45, 0.62, 1]], blendK: 0.55 } });
  const V4 = X(COMMON, { name: 'Ringen fader', note: 'Ringen går helt fra plomme til blått rundt sirkelen. Hjulet fader fra blått til fiolett.', mark: 'p4', hero: { blend: [[0.68, 0.32, 0.72], [0.4, 0.6, 1]], blendK: 1, gearFade: [[0.4, 0.6, 1], [0.55, 0.45, 0.95]], check: [0.6, 0.75, 1] } });
  const V5 = X(COMMON, { name: 'Diagonal fade', note: 'Én fade over hele skulpturen, plomme øverst til venstre og blått nederst til høyre. Merket har samme fade.', mark: 'p5', css: { glowbg: GLOW2 }, hero: { fade: { a: 0.75, k: 0.92, span: 0.85, A: PLUM_P, B: BLUE_P } } });
  const V6 = X(V5, { name: 'Fade i linjene', note: 'Som 05, og alle aksentlinjer og fremdriftslinjer fader fra plomme #6d2e72 til blått.', css: { accg: 'linear-gradient(90deg,#6d2e72,#5b8cff)', accgv: 'linear-gradient(180deg,#6d2e72,#5b8cff)' } });
  const V7 = X(V6, { name: 'Fade i knappene', note: 'Hovedknappene fader fra plomme til blått med hvit tekst.', css: { ctabg: 'linear-gradient(100deg,#6d2e72,#4f7dff)', ctabd: 'transparent', ctaink: '#ffffff', ctahbg: 'linear-gradient(100deg,#80388a,#6b93ff)', pctabg: 'linear-gradient(100deg,#6d2e72,#4f7dff)', pctabd: 'transparent', pctaink: '#ffffff', pctahbg: 'linear-gradient(100deg,#80388a,#6b93ff)' } });
  const V8 = X(V7, { name: 'Fade i overskriftene', note: 'Utvalgte ord i overskriftene får samme fade som merket.', css: { tg: 'linear-gradient(90deg,#c47fcc,#8fb2ff)', tgf: 'transparent' } });
  const V9 = X(V8, { name: 'Fade i dataene', note: 'Sorteringen og datastrømmen fader også: stabelen «Stemmer» går fra plomme til blått.', sortFade: [[176, 101, 184], [111, 155, 255]], flowFade: [[176, 101, 184], [111, 155, 255]], glow: '232,226,255', glowSh: '150,140,255' });
  const V10 = X(V9, { name: 'Levende fade', note: 'Fadingen i skulpturen beveger seg sakte rundt, så plomme og blått glir gjennom hverandre hele tiden.', hero: { fade: { a: 0.75, k: 0.92, span: 0.85, A: PLUM_P, B: BLUE_P, drift: 0.2 } } });
  const BGV = (name, note, bg, panel, plum, bgRgb, dimRgb, extra) => X(V10, Object.assign({ name, note, css: { bg, panel, hdr: 'rgba(' + bgRgb.join(',') + ',.82)', plum, pbg: plum, fbg: plum }, bgRgb, dimRgb }, extra || {}));
  const B1 = BGV('Lysere aubergine', 'Samme fargetone som i dag, men tre trinn lysere. Minst endring.', '#2a1b31', '#36253f', '#3b2243', [42, 27, 49], [82, 64, 92]);
  const B2 = BGV('Plomme-skifer', 'Grå-fiolett med et drag mot blått. Lilla blir mindre dominerende, men passer med fadingen.', '#2b2540', '#37304f', '#362a4f', [43, 37, 64], [80, 72, 110]);
  const B3 = BGV('Skumringsblå', 'Bakgrunnen går over i dempet blå, og plomme blir aksenten i stedet for flaten.', '#222a45', '#2d3656', '#2d2b52', [34, 42, 69], [68, 78, 114]);
  const B4 = BGV('Grafitt-fiolett', 'Nesten nøytral mørk grå med et snev av fiolett. Plomme og blått får stå alene.', '#2a2731', '#36323e', '#33283c', [42, 39, 49], [80, 76, 90]);
  const B5 = BGV('Lysere nedover', 'Hero er like mørk som i dag, og siden blir gradvis lysere og blåere for hver seksjon.', '#272039', '#322a47', '#3a2c55', [39, 32, 57], [76, 68, 102],
    { sec: { topp: KD('#1b0c1d', { panel: '#211023', acc: BL, ok: OK, chk: CHK, miss: MISS }), flyten: KD('#221731', { panel: '#2d2040', acc: BL, ok: OK, chk: CHK, miss: MISS }), kilder: KD('#2d2845', { panel: '#383254', acc: BL, ok: OK, chk: CHK, miss: MISS }), prinsipp: KD('#302c4b', { panel: '#3b365a', acc: BL, ok: OK, chk: CHK, miss: MISS }), trygghet: KD('#33304f', { panel: '#3e3a5e', acc: BL, ok: OK, chk: CHK, miss: MISS }) } });
  const LCSS = Object.assign({}, LIGHT_ROOT, { cta: '#6d2e72', ctaink: '#ffffff', ctah: '#5a2560', ctabg: '#6d2e72', ctabd: '#6d2e72', ctahbg: '#5a2560',
    pcta: '#ffffff', pctaink: '#6d2e72', pctah: '#f3eaf4', pctabg: '#ffffff', pctabd: '#ffffff', pctahbg: '#f3eaf4',
    ital: '#6d2e72', alle: '#6d2e72', ash: '0 0 40px rgba(109,46,114,.16)', chip: 'rgba(109,46,114,.08)', hdrsh: '0 10px 30px -18px rgba(28,18,32,.28)',
    link: '#1f1b26', lmut: '#56505f', lmut2: '#67616f', brand: '#6d2e72', okl: OKL, pink: '#ffffff', pmut: '#e3d6e4', pmut2: '#cdbcd0', fmut: '#cdbcd0', flink: '#e7dbe8' });
  const PAL = (name, note, c) => { const g0 = c.g0 || '#6d2e72', sr = c.sr, srA = sr.split(',').map(Number), A = c.A || [0.43, 0.18, 0.45];
    return X(V10, { name, note, mark: 'd', popLight: true, flowLight: true, calmAlle: '#6d2e72', ringRgb: '109,46,114',
      css: Object.assign({}, LCSS, { accg: 'linear-gradient(90deg,' + g0 + ',' + c.s + ')', accgv: 'linear-gradient(180deg,' + g0 + ',' + c.s + ')', tg: 'linear-gradient(90deg,' + g0 + ',' + c.s + ')', tgf: 'transparent',
        glowbg: 'radial-gradient(closest-side,rgba(109,46,114,.08),rgba(' + sr + ',.06) 62%,rgba(' + sr + ',0))', hdr: 'rgba(' + c.bgRgb.join(',') + ',.86)' }, c.css),
      hero: { normal: true, lys: [0.34, 0.15, 0.38], wh: [0.12, 0.05, 0.14], pl: [0.52, 0.3, 0.56], sizeMul: 1.65, alphaMul: 2, fade: { a: 0.75, k: 0.92, span: 0.85, A, B: c.B, drift: 0.2 } },
      endHero: Object.assign({}, base.hero, { fade: { a: 0.75, k: 0.92, span: 0.85, A: c.eA || PLUM_P, B: c.eB, drift: 0.2 } }),
      flow: '109,46,114', flowHi: sr, glow: sr, glowSh: c.srl, sq: '161,92,8', sortOk: null, sortOkLabel: (c.css.ok || OKL), sortChkLabel: (c.css.chk || CHKL),
      sortFade: [[109, 46, 114], srA], flowFade: [[109, 46, 114], srA], whRgb: [52, 24, 60],
      vesOver: '#6d2e72', vesUnder: c.vu, bgRgb: c.bgRgb, dimRgb: c.dimRgb, lysRgb: c.lysRgb, sec: { kontakt: { hi: '#ffffff' }, bunn: { hi: '#ffffff' } } });
  };
  const P1 = PAL('Plomme + salvie', 'Komplement\u00e6r: dempet gr\u00f8nn st\u00e5r rett overfor plomme p\u00e5 fargehjulet.', { s: '#4a6650', sr: '74,102,80', srl: '150,175,155', B: [0.45, 0.62, 0.5], eB: [0.62, 0.82, 0.68], vu: '#c9d1c4',
    bgRgb: [245, 245, 240], dimRgb: [218, 220, 210], lysRgb: [138, 118, 140],
    css: { bg: '#f5f5f0', panel: '#eaece4', lbg: '#ffffff', lline: '#dfe2d8', lline2: '#eceee7', ok: '#3f6a4b', okl: '#3f6a4b', chip: 'rgba(74,102,80,.10)', plum: '#2c1a30', pbg: '#2c1a30', fbg: '#24152a' } });
  const P2 = PAL('Plomme + oker', 'Triadisk og varm: champagne-bunn og oker som punktfarge.', { s: '#a8741a', sr: '168,116,26', srl: '220,180,110', B: [0.88, 0.62, 0.18], eB: [1, 0.82, 0.48], vu: '#ddd2bd',
    bgRgb: [247, 243, 234], dimRgb: [224, 216, 200], lysRgb: [150, 118, 128],
    css: { bg: '#f7f3ea', panel: '#eee7d9', lbg: '#fffdf8', lline: '#e5dccb', lline2: '#efe9dd', ink: '#21191c', hi: '#120c0e', mut: '#4f4448', mut2: '#605559', mut3: '#6c6165', navon: '#21191c', navoff: '#605559', chk: '#8f6115', chip: 'rgba(168,116,26,.11)', plum: '#311533', pbg: '#311533', fbg: '#28112a' } });
  const P3 = PAL('Plomme tone-i-tone', 'Monokrom: bare plommefamilien, fra nesten hvit til aubergine.', { g0: '#4a1d4f', s: '#a45a9e', sr: '164,90,158', srl: '214,170,210', A: [0.38, 0.14, 0.4], B: [0.95, 0.56, 0.92], eA: [0.9, 0.62, 0.92], eB: [1, 0.9, 1], vu: '#e0d2de',
    bgRgb: [248, 244, 247], dimRgb: [226, 214, 224], lysRgb: [150, 110, 150],
    css: { bg: '#f8f4f7', panel: '#f0e7ef', lbg: '#ffffff', lline: '#e8dce6', lline2: '#f1e9ef', ink: '#1f1421', hi: '#110a12', mut: '#4f4153', mut2: '#605264', mut3: '#6c5f70', navon: '#1f1421', navoff: '#605264', plum: '#6d2e72', pbg: '#6d2e72', fbg: '#4a1d4f', pmut: '#eadcea', pmut2: '#dcc8dc', fmut: '#dcc8dc', flink: '#f3eaf3' } });
  const F = B => ({ fade: { a: 0.75, k: 0.92, span: 0.85, A: [0.43, 0.18, 0.45], B, drift: 0.2 } }), EF = B => ({ fade: { a: 0.75, k: 0.92, span: 0.85, A: PLUM_P, B, drift: 0.2 } });
  const PB = (name, hero, eh) => X(P1, { name, note: '', hero, endHero: Object.assign({}, base.hero, eh) });
  const Q1 = PB('Salvie, kornblå logo', F([0.3, 0.47, 0.98]), EF([0.56, 0.7, 1]));
  const Q2 = PB('Salvie, marineblå logo', F([0.2, 0.3, 0.62]), EF([0.48, 0.6, 0.95]));
  const Q3 = PB('Salvie, stålblå logo', F([0.4, 0.54, 0.72]), EF([0.64, 0.76, 0.92]));
  const Q4 = PB('Salvie, indigo logo', F([0.34, 0.33, 0.86]), EF([0.62, 0.62, 1]));
  const Q5 = PB('Salvie, delt logo', { fade: null, ring: [0.43, 0.18, 0.45], gear: [0.22, 0.36, 0.75], check: [0.22, 0.36, 0.75] }, { fade: null, ring: [0.66, 0.33, 0.7], gear: [0.45, 0.62, 1], check: [0.6, 0.75, 1] });
  const KB = '#3a5fd9', KBH = '#2f4fbd', KBD = '#141f4d', KBT = '#eef1fc', PL = '#6d2e72', PLD = '#311533', IN = '#4c3d9e', INH = '#3f3285', INM = '#1d1838';
  const KBF = [0.3, 0.47, 0.98], KBE = [0.56, 0.7, 1], PLF = [0.43, 0.18, 0.45], PLE = [0.66, 0.33, 0.7];
  const BP = (name, c) => PAL(name, '', Object.assign({ s: KB, sr: '58,95,217', srl: '143,178,255', B: KBF, eB: KBE, vu: '#d6dcef', lysRgb: [138, 118, 140] }, c));
  const btn = (bg, h) => ({ cta: bg, ctabg: bg, ctabd: bg, ctah: h, ctahbg: h, ctaink: '#ffffff' });
  const pbtn = (ink, h) => ({ pcta: '#ffffff', pctabg: '#ffffff', pctabd: '#ffffff', pctaink: ink, pctah: h, pctahbg: h });
  const M1 = X(BP('Blått som signal', { bgRgb: [246, 245, 248], dimRgb: [222, 218, 228],
    css: { bg: '#f6f5f8', panel: '#eeecf2', lbg: '#ffffff', lline: '#dcd8e2', lline2: '#ebe8ef', accg: KB, accgv: KB, plum: PLD, pbg: PLD, fbg: '#24102a' } }),
    { mark: 'p2', hero: { fade: null, ring: PLF, gear: KBF, check: KBF }, endHero: Object.assign({}, base.hero, { fade: null, ring: PLE, gear: KBE, check: KBE }) });
  const M2 = X(BP('Rollefordeling', { bgRgb: [244, 245, 249], dimRgb: [220, 222, 230],
    css: Object.assign({ bg: '#f4f5f9', panel: '#eaecf3', lbg: '#ffffff', lline: '#dcdee8', lline2: '#e9ebf2', accg: KB, accgv: KB, plum: PLD, pbg: PLD, fbg: '#24102a' }, btn(KB, KBH), pbtn(KB, KBT)) }), { mark: 'p5' });
  const BRO = 'linear-gradient(90deg,#6d2e72,#4c3d9e 50%,#3a5fd9)', BROV = 'linear-gradient(180deg,#6d2e72,#4c3d9e 50%,#3a5fd9)';
  const M3 = X(BP('Indigo som bro', { bgRgb: [245, 244, 250], dimRgb: [222, 220, 234],
    css: Object.assign({ bg: '#f5f4fa', panel: '#ecebf4', lbg: '#ffffff', lline: '#dddbe9', lline2: '#ebeaf3', acc: IN, ital: IN, chip: 'rgba(76,61,158,.09)', accg: BRO, accgv: BROV,
      plum: INM, pbg: INM, fbg: '#15122b', pmut: '#dad6ef', pmut2: '#c4bfe2', fmut: '#c4bfe2', flink: '#e3e0f4' }, btn(IN, INH), pbtn(IN, '#efedf8')) }), { mark: 'p4', ringRgb: '76,61,158' });
  const TB = '#eef1fa', TP = '#f6f0f6';
  const blueSec = () => ({ bg: TB, panel: '#e4e9f7', acc: KB, accg: KB, accgv: KB, chip: 'rgba(58,95,217,.09)', ital: KB, alle: KB });
  const plumSec = () => ({ bg: TP, panel: '#eee3ee', acc: PL, accg: PL, accgv: PL, chip: 'rgba(109,46,114,.08)', ital: PL, alle: PL });
  const M4 = X(BP('Seksjonsrytme', { bgRgb: [247, 246, 249], dimRgb: [224, 220, 230],
    css: { bg: '#f7f6f9', panel: '#eeecf2', lbg: '#ffffff', lline: '#dcd8e2', lline2: '#ebe8ef', plum: PLD, pbg: PLD, fbg: KBD, fmut: '#b9c5ee', flink: '#dfe5fa' } }),
    { mark: 'p5', sec: { motoren: { lbg: TB, lline: '#d6ddf1', lline2: '#e3e8f6', brand: KB }, kilder: plumSec(), prinsipp: blueSec(),
      vesentlighet: { lbg: TP, lline: '#e6d7e6', lline2: '#eee4ee', brand: PL }, trygghet: blueSec(), kontakt: { hi: '#ffffff' }, bunn: { hi: '#ffffff' } } });
  const M5 = X(BP('Blått leder', { bgRgb: [243, 245, 250], dimRgb: [218, 223, 235], lysRgb: [118, 128, 160],
    css: Object.assign({ bg: '#f3f5fa', panel: '#e9edf7', lbg: '#ffffff', lline: '#dde2ee', lline2: '#e9ecf4',
      ink: '#171b27', hi: '#0b0e17', mut: '#4a5064', mut2: '#5a6075', mut3: '#666c80', navon: '#171b27', navoff: '#5a6075', link: '#1a1e2a', lmut: '#4f5466', lmut2: '#61667a',
      acc: KB, brand: KB, ital: PL, alle: PL, chip: 'rgba(58,95,217,.09)', accg: KB, accgv: KB, ash: '0 0 40px rgba(58,95,217,.16)',
      plum: KBD, pbg: KBD, fbg: '#0e1638', pmut: '#d3dbf5', pmut2: '#b9c5ee', fmut: '#b9c5ee', flink: '#dfe5fa' }, btn(KB, KBH), pbtn(KB, KBT)) }),
    { mark: 'p3', ringRgb: '58,95,217', calmAlle: PL, vesOver: KB, flow: '58,95,217' });
  const defs = [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, B1, B2, B3, B4, B5, P1, P2, P3, Q1, Q2, Q3, Q4, Q5, M1, M2, M3, M4, M5];
  return defs.map(d => { const t = Object.assign({}, base, d, { css: Object.assign({}, base.css, d.css || {}), hero: Object.assign({}, base.hero, d.hero || {}), sec: d.sec || {} });
    const mark = d.mark || (t.css.logod === 'block' ? 'd' : 'l'); for (const k of ['l', 'd', 'a', 'b', 'c', 'e', 'p2', 'p3', 'p4', 'p5']) t.css['mk' + k] = k === mark ? 'block' : 'none'; return t; });
})();
RM_THEMES.push((() => { const b = RM_THEMES[27]; const v = {"name": "R7 Lavendel", "mark": "a", "bgRgb": [246, 244, 249], "dimRgb": [224, 219, 232], "css": {"cta": "#3a5fd9", "ctabg": "linear-gradient(100deg,#6d2e72 0%,#3a5fd9 100%)", "ctabd": "#3a5fd9", "ctah": "#4b70f0", "ctahbg": "linear-gradient(100deg,#6d2e72 0%,#3a5fd9 100%)", "ctaink": "#ffffff", "pcta": "#3a5fd9", "pctabg": "linear-gradient(100deg,#6d2e72 0%,#3a5fd9 100%)", "pctabd": "#3a5fd9", "pctah": "#4b70f0", "pctahbg": "linear-gradient(100deg,#6d2e72 0%,#3a5fd9 100%)", "pctaink": "#ffffff", "bg": "#f6f4f9", "panel": "#ece8f2", "lbg": "#ffffff", "hdr": "rgba(246,244,249,.86)", "acc": "#6d2e72", "brand": "#6d2e72", "accg": "linear-gradient(100deg,#6d2e72 0%,#3a5fd9 100%)", "accgv": "linear-gradient(180deg,#6d2e72 0%,#3a5fd9 100%)", "chip": "rgba(109,46,114,.08)", "navon": "#1c1620", "pbg": "linear-gradient(140deg,#2a1230 0%,#21173f 60%,#18204e 100%)", "fbg": "#1a0f22", "fhi": "#ffffff", "pmut": "#e6dcea", "pmut2": "#cfc3d6", "fmut": "#cfc3d6", "flink": "#efe6f1", "fline": "rgba(255,255,255,.1)", "mut3": "#585e72"}};
  const t = Object.assign({}, b, v, { name: v.name || b.name, css: Object.assign({}, b.css, v.css || {}), sec: Object.assign({}, b.sec, v.sec || {}), hero: Object.assign({}, b.hero, v.hero || {}) });
  const mark = v.mark || b.mark; for (const k of ['l','d','a','b','c','e','p2','p3','p4','p5']) t.css['mk' + k] = k === mark ? 'block' : 'none'; return t; })());
let RM_THEME = RM_THEMES[0], RM_CALM = true;
const RM_BG = { 'Plomme + salvie': 16, 'Plomme + oker': 17, 'Plomme tone-i-tone': 18, 'Salvie, kornblå logo': 19, 'Salvie, marineblå logo': 20, 'Salvie, stålblå logo': 21, 'Salvie, indigo logo': 22, 'Salvie, delt logo': 23, 'Mørk (i dag)': 12 };
const CALM_KEYS = { glowbg: 1, tg: 1, tgf: 1, ash: 1, spark: 1 };
function curTheme() { return RM_THEME; }
function pickTheme(props) {
  let q = null; try { q = new URLSearchParams(location.search).get('palett'); } catch (e) {}
  const b = (props && props.palett) ? null : (RM_BG[props && props.bakgrunn] || 18);
  const n = parseInt(q || (RM_FIXED ? String(RM_FIXED) : '') || b || (props && props.palett) || '1', 10);
  return Math.min(RM_THEMES.length - 1, Math.max(0, (isNaN(n) ? 1 : n) - 1));
}
const RM_SECS = ['topp', 'flyten', 'populasjon', 'motoren', 'sporbarhet', 'kilder', 'prinsipp', 'vesentlighet', 'trygghet', 'kontakt', 'bunn'];
function applySections() {
  let all = true;
  for (const id of RM_SECS) {
    const el = document.getElementById(id); if (!el) { all = false; continue; }
    (el.__rmKeys || []).forEach(k => el.style.removeProperty('--rm-' + k)); el.__rmKeys = [];
    const o = RM_THEME.sec[id]; if (o) for (const k in o) { if (RM_CALM && CALM_KEYS[k]) continue; el.style.setProperty('--rm-' + k, o[k]); el.__rmKeys.push(k); }
  }
  return all;
}
function applyTheme(idx, calm) {
  if (calm !== undefined) RM_CALM = !!calm;
  RM_THEME = RM_THEMES[idx] || RM_THEMES[0];
  const css = RM_CALM ? Object.assign({}, RM_THEME.css, { glowbg: 'none', tg: 'none', tgf: 'currentColor', ash: 'none', spark: 'none', alle: RM_THEME.calmAlle || '#c47fcc' }) : RM_THEME.css;
  try { const st = document.documentElement.style; (window.__rmKeys || []).forEach(k => st.removeProperty('--rm-' + k)); window.__rmKeys = Object.keys(css); for (const k in css) st.setProperty('--rm-' + k, css[k]); st.background = RM_THEME.css.bg; if (document.body) document.body.style.background = RM_THEME.css.bg; } catch (e) {}
  return idx;
}

const SORT = (() => {
const TAU = Math.PI * 2, clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const fmt = n => Math.round(n).toLocaleString('nb-NO');
const pack = (r, g, b) => ((255 << 24) | (b << 16) | (g << 8) | r) >>> 0;
const mixc = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
let BG, DIM, LYS, WH = [255, 250, 255], BGU = 0;
const LUTP = new Uint32Array(256), LUTN = new Uint32Array(256);
function buildLut() { const TH = curTheme(); BG = TH.bgRgb; DIM = TH.dimRgb; LYS = TH.lysRgb; WH = TH.whRgb || [255, 250, 255];
for (let j = 0; j < 256; j++) {
  const v = j / 255, c = v < 0.68 ? mixc(DIM, LYS, v / 0.68) : mixc(LYS, WH, (v - 0.68) / 0.32), n = mixc(BG, DIM, v);
  LUTP[j] = pack(c[0] | 0, c[1] | 0, c[2] | 0); LUTN[j] = pack(n[0] | 0, n[1] | 0, n[2] | 0);
}
BGU = pack(BG[0], BG[1], BG[2]); }
buildLut();
const col = I => I >= 0 ? LUTP[I >= 1 ? 255 : (I * 255) | 0] : LUTN[I <= -1 ? 0 : ((1 + I) * 255) | 0];
const INS = {};
const ins = ds => INS[ds] || (INS[ds] = (() => { const a = new Int32Array(ds); if (ds >= 4) for (let y = 0; y < ds; y++) { const cy = y + 0.5 - ds / 2, hw = Math.sqrt(Math.max(0, ds * ds / 4 - cy * cy)); a[y] = Math.max(0, Math.round(ds / 2 - hw)); } return a; })());
const hash = i => { let x = Math.imul((i + 1) ^ 0x9e3779b9, 0x85ebca6b); x ^= x >>> 13; x = Math.imul(x, 0xc2b2ae35); x ^= x >>> 16; return (x >>> 0) / 4294967296; };
const N = 12000;
const FLAG = new Uint8Array(N); { let k = 0, s = 7; while (k < 42) { const i = (hash(s++) * N) | 0; if (!FLAG[i]) { FLAG[i] = 1; k++; } } }
const lit = (dd, k) => 0.62 + 0.38 * Math.exp(-dd * k);
const fadeK = (tc, a, b) => tc < a ? 1 : Math.max(0, 1 - (tc - a) / (b - a));
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function clear(c) { c.buf.fill(BGU); }
function dot(c, x, y, I, sz) {
  const d = c.dpr, ds = Math.max(1, Math.round((sz || c.dot) * d));
  const px = Math.round(x * d - ds / 2), py = Math.round(y * d - ds / 2);
  if (px < 0 || py < 0 || px + ds > c.cw || py + ds > c.ch) return;
  const cl = col(I), b = c.buf, cw = c.cw, a = ins(ds);
  for (let k = 0; k < ds; k++) { const ri = (py + k) * cw + px; b.fill(cl, ri + a[k], ri + ds - a[k]); }
}
function rect(c, x, y, w, h, I) {
  const d = c.dpr; let px = Math.round(x * d), py = Math.round(y * d); const pw = Math.max(1, Math.round(w * d)), ph = Math.max(1, Math.round(h * d));
  if (px < 0 || py < 0 || px + pw > c.cw || py + ph > c.ch) return;
  const cl = col(I), b = c.buf, cw = c.cw;
  for (let k = 0; k < ph; k++) { const ri = (py + k) * cw + px; b.fill(cl, ri, ri + pw); }
}
function flush(c) { c.ctx.setTransform(1, 0, 0, 1, 0, 0); c.ctx.putImageData(c.img, 0, 0); c.ctx.setTransform(c.dpr, 0, 0, c.dpr, 0, 0); }
function grid(cols, rows, x, y, w, h) {
  const p = Math.min(w / cols, h / rows), ox = x + (w - p * cols) / 2, oy = y + (h - p * rows) / 2;
  const xs = new Float32Array(cols * rows), ys = new Float32Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) { xs[i] = ox + (i % cols + 0.5) * p; ys[i] = oy + (((i / cols) | 0) + 0.5) * p; }
  return { xs, ys, p, cols, rows, x: ox, y: oy, w: p * cols, h: p * rows };
}
function cyc(c, T) { const tc = c.t % T; if (c.st.ptc !== undefined && tc < c.st.ptc) { c.st.picks = []; c.st.next = 0; c.st.cy = (c.st.cy || 0) + 1; } c.st.ptc = tc; return tc; }
function pick(c, tc, from, to, every, n) {
  const s = c.st; s.picks = s.picks || []; if (!s.next) s.next = from;
  while (tc >= s.next && s.next < to) { let i, k = 0; do { i = (Math.random() * (n || N)) | 0; k++; } while (k < 20 && s.picks.some(p => p.i === i)); s.picks.push({ i, t: s.next }); s.next += every * (0.7 + Math.random() * 0.6); }
  return s.picks;
}
function ring(ctx, x, y, age, p) {
  if (age > 0.9) return; const k = age / 0.9, r = p * (1.2 + k * 5);
  ctx.strokeStyle = 'rgba(' + (curTheme().ringRgb || '211,192,213') + ',' + ((1 - k) * 0.8).toFixed(3) + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
}
function glowLine(ctx, pts) {
  ctx.save(); ctx.globalCompositeOperation = curTheme().popLight ? 'source-over' : 'lighter'; ctx.strokeStyle = 'rgba(' + curTheme().glow + ',0.95)'; ctx.lineWidth = 1.25; ctx.shadowColor = 'rgba(' + curTheme().glowSh + ',1)'; ctx.shadowBlur = 16;
  ctx.beginPath(); ctx.moveTo(pts[0], pts[1]); for (let k = 2; k < pts.length; k += 2) ctx.lineTo(pts[k], pts[k + 1]); ctx.stroke(); ctx.restore();
}
function dotC(c, x, y, cl, sz) {
  const d = c.dpr, ds = Math.max(1, Math.round(sz * d)), px = Math.round(x * d - ds / 2), py = Math.round(y * d - ds / 2);
  if (px < 0 || py < 0 || px + ds > c.cw || py + ds > c.ch) return;
  const b = c.buf, cw = c.cw, a = ins(ds); for (let k = 0; k < ds; k++) { const ri = (py + k) * cw + px; b.fill(cl, ri + a[k], ri + ds - a[k]); }
}
function sq(ctx, x, y, s, a, dash) { ctx.save(); ctx.strokeStyle = 'rgba(' + curTheme().sq + ',' + a.toFixed(3) + ')'; ctx.lineWidth = 1.2; if (dash) ctx.setLineDash([2, 2]); ctx.strokeRect(Math.round(x - s / 2) + 0.5, Math.round(y - s / 2) + 0.5, Math.round(s), Math.round(s)); ctx.restore(); }
function label(ctx, txt, x, y, color, align) { ctx.font = '500 13px Barlow, system-ui, sans-serif'; ctx.fillStyle = color; ctx.textAlign = align || 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(txt, x, y); }


const V = {
  sorter: {
    layout(c) {
      c.g = grid(120, 100, 0, 0, c.W * 0.46, c.H - 36);
      const rx0 = Math.min(c.W * 0.88, c.W - 74), rp = 11, sx0 = c.W * 0.56, sw = Math.min(c.W * 0.26, rx0 - c.W * 0.05 - sx0), cols = 80, p = sw / cols, bottom = c.H - 40;
      c.tx = new Float32Array(N); c.ty = new Float32Array(N); let t = 0, fl = 0;
      
      for (let i = 0; i < N; i++) { if (FLAG[i]) { c.tx[i] = rx0 + (fl % 6 + 0.5) * rp; c.ty[i] = bottom - (Math.floor(fl / 6) + 0.5) * rp; fl++; } else { c.tx[i] = sx0 + (t % cols + 0.5) * p; c.ty[i] = bottom - (Math.floor(t / cols) + 0.5) * p; t++; } }
      const SF = curTheme().sortFade; c.fc = null;
      if (SF) { c.fc = new Uint32Array(N); for (let i = 0; i < N; i++) { const q = clamp((c.tx[i] - sx0) / sw, 0, 1), mm = mixc(SF[0], SF[1], q); c.fc[i] = pack(mm[0] | 0, mm[1] | 0, mm[2] | 0); } }
      c.dot = Math.max(1, c.g.p * 0.6); c.sp = p; c.lab = { s: sx0, r: rx0, y: c.H - 14 };
    },
    frame(c) {
      const tc = cyc(c, 12.5), f = fadeK(tc, 11.4, 12.1), g = c.g, ctx = c.ctx, prog = clamp((tc - 0.5) / 2.2, 0, 1), xs = g.x + prog * g.w;
      clear(c); let ns = 0, nr = 0; const fq = [], TH = curTheme(); let okc = 0;
      if (TH.sortOk) { const m = mixc(BG, mixc(LYS, TH.sortOk, TH.okMix), f); okc = pack(m[0] | 0, m[1] | 0, m[2] | 0); }
      for (let i = 0; i < N; i++) {
        let x = g.xs[i], y = g.ys[i], I = 0;
        if (x < xs || prog >= 1) I = FLAG[i] ? 0.1 : lit(Math.max(0, xs - x) / g.w, 8);
        const d0 = 3.2 + ((i % 120) / 120) * 1.8 + hash(i) * 0.7, k = ease(clamp((tc - d0) / 1.3, 0, 1));
        if (k > 0) { x += (c.tx[i] - x) * k; y += (c.ty[i] - y) * k - Math.sin(Math.PI * k) * 30 * hash(i * 3); I = 0.7; }
        if (k >= 1) FLAG[i] ? nr++ : ns++;
        if (FLAG[i]) { if (I > 0.05 || k > 0) fq.push(x, y, k); continue; }
        const sz = k > 0 ? Math.max(1, c.sp * 0.62) + (1 - k) * (c.dot - c.sp * 0.62) : c.dot;
        if (k > 0 && c.fc && f >= 1) dotC(c, x, y, c.fc[i], sz); else if (k > 0 && okc) dotC(c, x, y, okc, sz); else dot(c, x, y, I * f, sz);
      }
      flush(c);
      for (let j = 0; j < fq.length; j += 3) sq(ctx, fq[j], fq[j + 1], 4 + fq[j + 2] * 3, 0.95 * f);
      if (prog > 0 && prog < 1) glowLine(ctx, [xs, g.y, xs, g.y + g.h]);
      label(ctx, 'Stemmer', c.lab.s, c.lab.y, TH.sortOkLabel); label(ctx, 'Til revisor', c.lab.r, c.lab.y, TH.sortChkLabel);
      const reset = tc >= 11.4; c.out('sorter-s', fmt(reset ? 0 : ns)); c.out('sorter-r', fmt(reset ? 0 : nr));
    }
  }
};
return function make(el) {
  buildLut();
  const c = { el, v: V.sorter, ctx: el.getContext('2d'), t: 0, st: {}, outs: {}, vis: false };
  c.out = (name, val) => { let o = c.outs[name]; if (o === undefined) o = c.outs[name] = document.querySelector('[data-out="' + name + '"]'); if (o && o._v !== val) { o._v = val; o.textContent = val; } };
  c.lay = () => {
    const W = el.clientWidth; if (W < 2) return;
    const H = Math.round(clamp(W * 0.5, 320, 520)); el.style.height = H + 'px';
    const dpr = Math.min(window.devicePixelRatio || 1, 2), cw = Math.round(W * dpr), ch = Math.round(H * dpr);
    if (el.width !== cw || el.height !== ch) { el.width = cw; el.height = ch; }
    Object.assign(c, { W, H, dpr, cw, ch }); c.img = c.ctx.createImageData(cw, ch); c.buf = new Uint32Array(c.img.data.buffer);
    c.v.layout(c); c.v.frame(c, 0);
  };
  c.step = dt => { c.t += dt; c.v.frame(c, dt); };
  c.rebuild = () => { buildLut(); c.lay(); };
  return c;
};
})();

class Component extends DCLogic {
  _pal = applyTheme(pickTheme(this.props), this.props.roligeEffekter ?? true);
  kRoot = React.createRef(); kFill = React.createRef();
  heroRoot = React.createRef(); heroCanvas = React.createRef(); heroBand = React.createRef();
  heroHint = React.createRef(); heroHintText = React.createRef(); flytRoot = React.createRef();
  popRoot = React.createRef(); uWrap = React.createRef(); uCanvas = React.createRef(); uCount = React.createRef(); uBar = React.createRef();
  aWrap = React.createRef(); aCanvas = React.createRef(); aCount = React.createRef(); aBar = React.createRef(); aFlag = React.createRef();
  storyRoot = React.createRef(); storyFill = React.createRef(); endRoot = React.createRef(); endCanvas = React.createRef();
  taxRoot = React.createRef(); flowBar = React.createRef(); flowCanvas = React.createRef();
  vesWrap = React.createRef(); vesCanvas = React.createRef(); vesOk = React.createRef(); vesRev = React.createRef();
  state = { wide: typeof window === 'undefined' ? true : (/[?&]ramme=1/.test(location.search) || window.innerWidth >= 960), step: 0, taxOn: false, nav: '' };

  retryLayout(key, fn) {
    const k = '_rt_' + key; if (this[k]) return;
    this[k] = setTimeout(() => { this[k] = 0; fn(); }, 120);
    this.addCleanup(() => clearTimeout(this[k]));
  }
  addCleanup(f) { (this._c || (this._c = [])).push(f); }
  schedule(fn) {
    let done = false, r = 0, to = 0;
    const run = () => { if (done) return; done = true; cancelAnimationFrame(r); clearTimeout(to); fn(performance.now()); };
    r = requestAnimationFrame(run); to = setTimeout(run, 64);
    return () => { done = true; cancelAnimationFrame(r); clearTimeout(to); };
  }

  componentDidMount() {
    const q = new URLSearchParams(location.search);
    this.ramme = q.get('ramme') === '1'; this.til = q.get('til'); this.dy = parseFloat(q.get('dy') || '0') || 0;
    if (this.ramme) { this.setState({ guideOpen: false, ramme: true, wide: true }); document.documentElement.style.overflowAnchor = 'none'; }
    this.rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches || (this.ramme && !this.til);
    this.coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (this.coarse && this.heroHintText.current) this.heroHintText.current.textContent = 'Berør motoren';
    const subs = [
      ['hero', () => this.initHero(), () => !!this.h, !this.ramme || this.til === 'topp' || !this.til],
      ['sortering', () => this.initSorter(), () => !!this.sc, true],
      ['flyt', () => this.initFlyt(), () => !!this._flytInit, true],
      ['slutt', () => this.initEnd(), () => !!this.e, !this.ramme || this.til === 'kontakt' || this.til === 'bunn'],
      ['dataflyt', () => this.initFlow(), () => !!this.fl, true],
      ['vesentlighet', () => this.initVes(), () => !!this.v, true],
      ['skatt', () => this.initTax(), () => !!this._taxInit, true],
      ['farger', () => { this._secOk = applySections(); }, () => !!this._secOk, true],
    ].filter(x => x[3]);
    const done = new Set();
    const attempt = () => {
      for (const [name, init, ok] of subs) { if (done.has(name)) continue; try { init(); } catch (e) { console.warn(name, e); } if (ok()) done.add(name); }
      return done.size === subs.length;
    };
    if (!attempt()) { let n = 0; const iv = setInterval(() => { if (attempt() || ++n > 60) clearInterval(iv); }, 200); this.addCleanup(() => clearInterval(iv)); }
    this.initScroll();
    const checkWide = () => { if (this.ramme) return; const w = document.documentElement.clientWidth || window.innerWidth; if (w < 2) return; const wide = w >= 960; if (wide !== this.state.wide) this.setState({ wide }); };
    checkWide();
    const roDoc = new ResizeObserver(checkWide); roDoc.observe(document.documentElement);
    const tw = setTimeout(checkWide, 250); this.addCleanup(() => { roDoc.disconnect(); clearTimeout(tw); });
    if (this.til) {
      let hits = 0, user = false;
      const stopUser = () => { user = true; };
      window.addEventListener('wheel', stopUser, { passive: true }); window.addEventListener('touchstart', stopUser, { passive: true }); window.addEventListener('keydown', stopUser);
      const go = () => {
        if (user) return true;
        const el = document.getElementById(this.til); if (!el) return false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const top = Math.max(0, Math.min(max, Math.round(el.getBoundingClientRect().top + window.scrollY + this.dy * window.innerHeight)));
        if (Math.abs(window.scrollY - top) > 3) { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, top); document.documentElement.scrollTop = top; hits = 0; this.onScroll(); }
        else hits++;
        return hits >= 3;
      };
      this.jump = () => { hits = 0; go(); };
      const iv = setInterval(() => { if (go()) clearInterval(iv); }, 200), stop = setTimeout(() => clearInterval(iv), 5000);
      const onLoad = () => go(); window.addEventListener('load', onLoad);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(onLoad);
      this.addCleanup(() => { clearInterval(iv); clearTimeout(stop); window.removeEventListener('load', onLoad); window.removeEventListener('wheel', stopUser); window.removeEventListener('touchstart', stopUser); window.removeEventListener('keydown', stopUser); });
    }
    const t1 = setTimeout(() => { if (this.h) this.layoutHero(); if (this.p) this.layoutPop(); if (this.e) this.layoutEnd(); if (this.fl) this.fl.layout(); if (this.v) this.v.layout(); }, 300);
    this.addCleanup(() => clearTimeout(t1));
  }
  componentWillUnmount() { (this._c || []).forEach(f => f()); this._c = []; }
  componentDidUpdate(prev, prevState) {
    if ((prev.palett ?? '1') !== (this.props.palett ?? '1') || prev.bakgrunn !== this.props.bakgrunn || (prev.roligeEffekter ?? true) !== (this.props.roligeEffekter ?? true)) {
      const idx = pickTheme(this.props), calm = this.props.roligeEffekter ?? true; if (idx !== this._pal || calm !== RM_CALM) { this._pal = applyTheme(idx, calm); applySections(); this.forceUpdate();
        try { if (this.h) { this.buildHero(); this.layoutHero(); } if (this.e) { this.buildHero(this.e); this.e.off.fill(0); this.e.vel.fill(0); this.layoutEnd(); } if (this.sc) this.sc.rebuild(); if (this.v) this.v.layout(); } catch (er) { console.warn(er); } }
    }
    if (this.jump && prevState && prevState.wide !== this.state.wide) { this.jump(); setTimeout(() => this.jump && this.jump(), 300); }
    if (this.h && (prev.particleDensity ?? 1) !== (this.props.particleDensity ?? 1)) { this.buildHero(); this.layoutHero(); }
    if (this.p && (prev.sweepSeconds ?? 2.8) !== (this.props.sweepSeconds ?? 2.8) && this.rm) this.drawPopStatic();
    if (this.p && (prev.sweepMode ?? 'Rulling') !== (this.props.sweepMode ?? 'Rulling')) { const p = this.p; p.tc = 0; p.picks = []; p.pending = null; p.next = this.cycle().s0; p.sp = 0; p.ut = 0; }
  }

  /* ───────── Rulling: hero, historien om stegene, aktiv meny ───────── */
  initScroll() {
    let cancel = null;
    const onScroll = () => { if (cancel) return; cancel = this.schedule(() => { cancel = null; this.onScroll(); }); };
    const onResize = () => { const wide = window.innerWidth >= 960; if (wide !== this.state.wide) this.setState({ wide }); onScroll(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    this.addCleanup(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); if (cancel) cancel(); });
    this.onScroll();
  }
  onScroll() {
    const vh = window.innerHeight || 800, h = this.h;
    if (h && h.root) { const r = h.root.getBoundingClientRect(); h.scrollP = this.rm ? 0 : clamp(-r.top / Math.max(1, r.height * 0.85), 0, 1); }
    const sr = this.storyRoot.current;
    if (sr) {
      const r = sr.getBoundingClientRect(), pr = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
      const step = Math.min(4, Math.floor(pr * 5));
      if (this.storyFill.current) this.storyFill.current.style.transform = 'scaleY(' + pr.toFixed(4) + ')';
      if (step !== this.state.step) this.setState({ step });
    }
    const kr = this.kRoot.current;
    if (kr) {
      const r = kr.getBoundingClientRect(), pr = clamp(-r.top / Math.max(1, r.height - vh), 0, 1), kt = Math.min(2, Math.floor(pr * 3));
      if (this.kFill.current) this.kFill.current.style.transform = 'scaleX(' + pr.toFixed(4) + ')';
      if (kt !== (this.state.kTab || 0)) this.setState({ kTab: kt });
    }
    let nav = '';
    for (const id of ['flyten', 'kilder', 'trygghet']) { const el = document.getElementById(id); if (!el) continue; const r = el.getBoundingClientRect(); if (r.top < vh * 0.4 && r.bottom > vh * 0.4) nav = id; }
    if (nav !== this.state.nav) this.setState({ nav });
  }

  /* ───────── Hero: merket som partikkelskulptur ───────── */
  initHero() {
    if (this.h) return; const root = this.heroRoot.current, canvas = this.heroCanvas.current;
    if (!root || !canvas) return;
    const h = this.h = { root, canvas, t: 0, last: 0, raf: 0, running: false, visible: true, w: 1, hh: 1, dpr: 1,
      cx: 0, cy: 0, R: 100, sizeK: 1, mx: -1e4, my: -1e4, tx: -1e4, ty: -1e4, pmx: -1e4, pmy: -1e4, mvx: 0, mvy: 0,
      pres: 0, presT: 0, burst: 0, touchUntil: 0, par: 0 };
    let gl = null;
    try { gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'high-performance' }); } catch (e) {}
    if (gl) { try { this.initGL(gl); } catch (e) { console.warn(e); h.gl = null; } }
    if (!h.gl) h.ctx = canvas.getContext('2d');
    canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); h.lost = true; });
    this.buildHero();

    const ro = new ResizeObserver(() => this.layoutHero());
    ro.observe(root); ro.observe(canvas); if (this.heroBand.current) ro.observe(this.heroBand.current);
    const io = new IntersectionObserver(es => { h.visible = es[0].isIntersecting; if (h.visible) this.wakeHero(); });
    io.observe(root);
    const pos = e => { const b = root.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
    const live = () => this.props.interactive !== false && !this.rm;
    const onMove = e => {
      if (!live()) return;
      if (e.pointerType === 'touch' && e.buttons === 0) return;
      const [x, y] = pos(e);
      if (h.mx < -9000) { h.mx = h.pmx = x; h.my = h.pmy = y; }
      h.tx = x; h.ty = y; h.presT = 1; this.hideHint();
    };
    const onDown = e => { if (!live()) return; const [x, y] = pos(e); h.mx = h.pmx = h.tx = x; h.my = h.pmy = h.ty = y; h.presT = 1; h.burst = 1; h.touchUntil = 0; this.hideHint(); };
    const onUp = e => { if (e.pointerType === 'touch') h.touchUntil = performance.now() + 260; else h.presT = 0; };
    const onLeave = () => { h.presT = 0; };
    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerdown', onDown, { passive: true });
    root.addEventListener('pointerup', onUp, { passive: true });
    root.addEventListener('pointercancel', onUp, { passive: true });
    root.addEventListener('pointerleave', onLeave, { passive: true });
    const onVis = () => { if (!document.hidden) this.wakeHero(); };
    document.addEventListener('visibilitychange', onVis);
    this.addCleanup(() => {
      h.dead = true; if (h.raf) h.raf(); ro.disconnect(); io.disconnect();
      root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('pointerup', onUp); root.removeEventListener('pointercancel', onUp);
      root.removeEventListener('pointerleave', onLeave); document.removeEventListener('visibilitychange', onVis);
    });
    this.layoutHero();
    this.wakeHero();
  }

  initGL(gl, h = this.h) {
    const vs = 'attribute vec4 aD; attribute vec3 aC; uniform vec2 uRes; uniform vec4 uF; uniform vec3 uCt; uniform vec3 uA; uniform vec3 uB; varying vec4 vC;' +
      'void main(){ vec2 c = aD.xy / uRes * 2.0 - 1.0; gl_Position = vec4(c.x, -c.y, 0.0, 1.0); gl_PointSize = aD.z; vec3 col = aC;' +
      ' if (uF.x > 0.5) { vec2 q = (aD.xy - uCt.xy) / uCt.z; float s = smoothstep(-uF.w, uF.w, dot(q, vec2(cos(uF.y), sin(uF.y)))); float l = dot(aC, vec3(0.3, 0.5, 0.2)); col = mix(aC, mix(uA, uB, s) * (0.55 + 0.75 * l), uF.z); }' +
      ' vC = vec4(col, aD.w); }';
    const fs = 'precision mediump float; varying vec4 vC;' +
      'void main(){ vec2 d = gl_PointCoord - 0.5; float r = length(d); float a = ((1.0 - smoothstep(0.3, 0.5, r)) * 0.85 + 0.15 * max(0.0, 1.0 - r * 2.0)) * vC.a; if (a < 0.003) discard; gl_FragColor = vec4(vC.rgb * a, a); }';
    const mk = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const p = gl.createProgram();
    gl.attachShader(p, mk(gl.VERTEX_SHADER, vs)); gl.attachShader(p, mk(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    h.gl = gl; h.prog = p; h.aD = gl.getAttribLocation(p, 'aD'); h.aC = gl.getAttribLocation(p, 'aC'); h.uRes = gl.getUniformLocation(p, 'uRes'); h.uF = gl.getUniformLocation(p, 'uF'); h.uCt = gl.getUniformLocation(p, 'uCt'); h.uA = gl.getUniformLocation(p, 'uA'); h.uB = gl.getUniformLocation(p, 'uB');
    h.bDyn = gl.createBuffer(); h.bCol = gl.createBuffer();
    gl.enableVertexAttribArray(h.aD); gl.enableVertexAttribArray(h.aC);
  }

  buildHero(h = this.h) {
    const dens = clamp(this.props.particleDensity ?? 1, 0.3, 2);
    const low = (navigator.hardwareConcurrency || 8) <= 4 || this.coarse;
    let N = Math.round((low || (this.ramme && !this.til) ? 14000 : 34000) * dens);
    if (h.nFixed) N = h.nFixed;
    if (!h.gl) N = Math.round(N * 0.3);
    const R = Math.random;
    const gauss = () => { let u = 0; while (!u) u = R(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * R()); };
    const TH = (h === this.e && curTheme().endHero) || curTheme().hero, LYS = TH.lys, WH = TH.wh, PL = TH.pl; h.normal = !!TH.normal; h.fade = TH.fade || null; h.szM = TH.sizeMul || 1; h.alM = TH.alphaMul || 1;
    const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3), size = new Float32Array(N), alpha = new Float32Array(N),
      seed = new Float32Array(N), grp = new Uint8Array(N), dTh = new Float32Array(N), dR = new Float32Array(N), dZ = new Float32Array(N),
      dRate = new Float32Array(N), dPh = new Float32Array(N);
    let i = 0;
    const put = (x, y, z, g, c, s, a) => { if (i >= N) return; pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z; grp[i] = g;
      col[i*3] = c[0]; col[i*3+1] = c[1]; col[i*3+2] = c[2]; size[i] = s; alpha[i] = a; seed[i] = R(); i++; };
    const nOrbit = Math.round(N * 0.44), nArrow = Math.round(N * 0.05), nGear = Math.round(N * 0.25), nCheck = Math.round(N * 0.04);
    const arcs = [[175, 270], [295, 390], [55, 150]];
    for (let k = 0; k < nOrbit; k++) {
      const arc = arcs[k % 3], u = R(), th = (arc[0] + u * (arc[1] - arc[0])) * Math.PI / 180;
      const fray = Math.max(0, 1 - u / 0.3), f2 = fray * fray;
      let ro, zo, c, a, s = 1.1 + R() * 0.9;
      if (R() < 0.32) { ro = (R() - 0.5) * 0.116; zo = (R() - 0.5) * 0.08; c = mix(LYS, WH, R() * 0.5); a = 0.3; }
      else { const fi = Math.floor(R() * 9), tw = th * (6 + (fi % 3)) + fi / 9 * TAU, rr = 0.03 + (fi % 4) * 0.008; ro = Math.cos(tw) * rr + gauss() * 0.0028; zo = Math.sin(tw) * rr * 1.3 + gauss() * 0.0028; c = mix(LYS, WH, 0.45 + R() * 0.55); a = 0.46; }
      ro += gauss() * 0.06 * f2; zo += gauss() * 0.13 * f2;
      if (TH.ring) c = mix(TH.ring, WH, R() * 0.35);
      if (R() < (TH.spark ? 0.035 : 0.012)) { s = 2.6 + R() * 3; a = TH.spark ? 0.32 : 0.22; c = TH.spark || WH; }
      a *= 1 - f2 * 0.55;
      if (TH.blend) c = mix(c, mix(TH.blend[0], TH.blend[1], (Math.cos(th - 0.6) + 1) / 2), TH.blendK ?? 0.75);
      put((1 + ro) * Math.cos(th), (1 + ro) * Math.sin(th), zo, 0, c, s, a);
    }
    const T = [[[59, 7], [47, 0], [47, 14]], [[82.74, 79.29], [94.8, 72.4], [82.68, 65.4]], [[8.26, 63.71], [8.2, 77.6], [20.32, 70.6]]];
    for (let k = 0; k < nArrow; k++) {
      const t = T[k % 3]; let r1 = R(), r2 = R(); if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }
      const x = t[0][0] + r1 * (t[1][0] - t[0][0]) + r2 * (t[2][0] - t[0][0]);
      const y = t[0][1] + r1 * (t[1][1] - t[0][1]) + r2 * (t[2][1] - t[0][1]);
      put((x - 50) / 43, (y - 50) / 43, (R() - 0.5) * 0.09, 0, TH.ring ? mix(TH.ring, WH, R() * 0.4) : mix(LYS, WH, 0.4 + R() * 0.6), 1.1 + R() * 0.8, 0.45);
    }
    for (let k = 0; k < nGear; k++) {
      let x, y, z;
      if (R() < 0.56) {
        const ri = 0.29, ro = 0.465, e = R(); let r;
        if (e < 0.3) r = ri + Math.abs(gauss()) * 0.004; else if (e < 0.6) r = ro - Math.abs(gauss()) * 0.004; else r = Math.sqrt(R() * (ro * ro - ri * ri) + ri * ri);
        const th = R() * TAU; x = r * Math.cos(th); y = r * Math.sin(th);
        z = R() < 0.5 ? (R() < 0.5 ? -1 : 1) * 0.045 : (R() - 0.5) * 0.09;
      } else {
        const ang = Math.floor(R() * 10) * 36 * Math.PI / 180, ed = R();
        let lx = (R() - 0.5) * 0.1396, ly = -0.419 - R() * 0.232;
        if (ed < 0.25) lx = (R() < 0.5 ? -1 : 1) * 0.0698; else if (ed < 0.4) ly = -0.651;
        x = lx * Math.cos(ang) - ly * Math.sin(ang); y = lx * Math.sin(ang) + ly * Math.cos(ang); z = (R() - 0.5) * 0.09;
      }
      put(x, y, z, 1, TH.gearFade ? mix(mix(TH.gearFade[0], TH.gearFade[1], clamp((Math.hypot(x, y) - 0.29) / 0.36, 0, 1)), WH, R() * 0.25) : TH.gear ? mix(TH.gear, WH, R() * 0.3) : R() < 0.4 ? mix(PL, LYS, R() * 0.5) : mix(LYS, WH, R() * 0.35), 1.1 + R() * 0.8, 0.4);
    }
    const cp = [[44.5, 52], [48, 55.5], [56, 45.5]].map(([x, y]) => [(x - 50) / 43, (y - 50) / 43]);
    const L1 = Math.hypot(cp[1][0] - cp[0][0], cp[1][1] - cp[0][1]), L2 = Math.hypot(cp[2][0] - cp[1][0], cp[2][1] - cp[1][1]);
    for (let k = 0; k < nCheck; k++) {
      const sg = R() < L1 / (L1 + L2) ? 0 : 1, a = cp[sg], b = cp[sg + 1], t = R();
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy), o = gauss() * 0.016;
      put(a[0] + dx * t - dy / l * o, a[1] + dy * t + dx / l * o, gauss() * 0.016, 3, TH.check || WH, 1.3 + R() * 0.8, 0.7);
    }
    while (i < N) {
      const k = i, arc = arcs[k % 3], u = Math.pow(R(), 1.8);
      dTh[k] = (arc[0] + u * (arc[1] - arc[0])) * Math.PI / 180; dR[k] = gauss() * 0.35; dZ[k] = gauss() * 0.45;
      dRate[k] = 0.04 + R() * 0.1; dPh[k] = R();
      put(0, 0, 0, 2, TH.blend ? mix(mix(TH.blend[0], TH.blend[1], (Math.cos(dTh[k] - 0.6) + 1) / 2), WH, R() * 0.35) : mix(LYS, WH, R() * 0.6), 0.9 + R() * 1.2, 0.34);
    }
    const off = new Float32Array(N * 2), vel = new Float32Array(N * 2);
    if (!this.rm) for (let k = 0; k < N; k++) { const a = R() * TAU, d = 120 + R() * 420; off[k*2] = Math.cos(a) * d; off[k*2+1] = Math.sin(a) * d * 0.6; }
    Object.assign(h, { n: N, pos, col, size, alpha, seed, grp, dTh, dR, dZ, dRate, dPh, off, vel, out: new Float32Array(N * 4) });
    if (h.gl) {
      const gl = h.gl;
      gl.bindBuffer(gl.ARRAY_BUFFER, h.bCol); gl.bufferData(gl.ARRAY_BUFFER, col, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, h.bDyn); gl.bufferData(gl.ARRAY_BUFFER, h.out.byteLength, gl.DYNAMIC_DRAW);
    } else {
      h.css = []; for (let k = 0; k < N; k++) h.css.push('rgb(' + (col[k*3] * 255 | 0) + ',' + (col[k*3+1] * 255 | 0) + ',' + (col[k*3+2] * 255 | 0) + ')');
    }
  }

  layoutHero() {
    const h = this.h; if (!h) return;
    const root = h.root, band = this.heroBand.current;
    const w = root.clientWidth, H = root.clientHeight;
    if (w < 2 || H < 2) { this.retryLayout('hero', () => this.layoutHero()); return; }
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (w * H * dpr * dpr > 5e6) dpr = Math.max(1, Math.sqrt(5e6 / (w * H)));
    const cw = Math.round(w * dpr), ch = Math.round(H * dpr);
    if (h.canvas.width !== cw || h.canvas.height !== ch) { h.canvas.width = cw; h.canvas.height = ch; }
    h.w = w; h.hh = H; h.dpr = dpr;
    const top = band ? band.offsetTop : 0, bot = band ? band.offsetTop + band.offsetHeight : H * 0.6;
    const bh = Math.max(220, bot - top), wide = w >= 1000;
    h.cx = wide ? w * 0.63 : w * 0.5;
    h.cy = top + bh * 0.5;
    h.R = wide ? Math.min(bh * 0.6, w * 0.3) : Math.min(bh * 0.5, w * 0.42);
    h.sizeK = clamp(h.R / 260, 0.85, 1.4);
    const hint = this.heroHint.current;
    if (hint) { hint.style.display = this.props.interactive === false || this.rm ? 'none' : ''; hint.style.left = Math.max(20, (w - Math.min(w, 1280)) / 2 + clamp(w * 0.04, 20, 40)) + 'px'; hint.style.top = (top + 28) + 'px'; }
    if (!h.running) { this.stepHero(0); this.drawHero(); }
  }

  hideHint() { const h = this.h; if (h.hinted) return; h.hinted = true; if (this.heroHint.current) this.heroHint.current.style.opacity = '0'; }

  wakeHero() {
    const h = this.h; if (!h || h.dead) return;
    if (this.rm) { this.stepHero(0); this.drawHero(); return; }
    if (h.running || !h.visible) return;
    h.running = true; h.last = performance.now();
    h.raf = this.schedule(this.heroFrame);
  }

  heroFrame = now => {
    const h = this.h; if (!h || h.dead) return;
    if (!h.visible || h.lost) { h.running = false; return; }
    h.raf = this.schedule(this.heroFrame);
    const raw = Math.max(0.25, (now - h.last) / 16.667); h.last = now;
    const steps = raw > 3 ? Math.min(10, Math.ceil(raw / 3)) : 1, dt = Math.min(3, raw / steps);
    for (let k = 0; k < steps; k++) this.stepHero(dt);
    this.drawHero();
  };

  stepHero(dt, h = this.h) {
    if (!h || !h.n) return;
    h.t += dt / 60;
    const t = h.t;
    if (h.touchUntil && performance.now() > h.touchUntil) { h.presT = 0; h.touchUntil = 0; }
    const ease = 1 - Math.pow(0.78, dt);
    h.mx += (h.tx - h.mx) * ease; h.my += (h.ty - h.my) * ease;
    const dd = Math.max(dt, 0.25);
    h.mvx += (clamp((h.mx - h.pmx) / dd, -50, 50) - h.mvx) * 0.5; h.mvy += (clamp((h.my - h.pmy) / dd, -50, 50) - h.mvy) * 0.5;
    h.pmx = h.mx; h.pmy = h.my;
    const pk = h.presT > h.pres ? 0.12 : 0.04;
    h.pres += (h.presT - h.pres) * (1 - Math.pow(1 - pk, dt));
    if (h.pres < 0.001 && !h.presT) h.pres = 0;
    h.burst = Math.max(0, h.burst - 0.06 * dt);
    const parT = h.presT ? (h.tx / h.w - 0.5) : 0;
    h.par += (parT - h.par) * Math.min(1, 0.03 * dt);

    const scr = h.scrollP || 0, dis = scr * scr, aK = (h.alphaK ?? 1) * (1 - scr * 0.6);
    const yaw = Math.sin(t * 0.17) * 0.42 + h.par * 0.35 + scr * 0.5, pitch = 0.52 + Math.sin(t * 0.11) * 0.08 + scr * 0.45;
    const G = mul(rotY(yaw), rotX(pitch));
    const Mo = mul(G, rotZ(t * 0.24));
    const Mg = mul(G, rotZ(-t * 0.12));
    const Mc = G;

    const N = h.n, pos = h.pos, grp = h.grp, off = h.off, vel = h.vel, out = h.out, size = h.size, alpha = h.alpha, seed = h.seed;
    const dTh = h.dTh, dR = h.dR, dZ = h.dZ, dRate = h.dRate, dPh = h.dPh;
    const R = h.R, cx = h.cx, cy = h.cy, dpr = h.dpr, D = 3.6, sk = h.sizeK * dpr;
    const pres = Math.max(h.pres, h.burst), mx = h.mx, my = h.my;
    const rad = clamp(R * 0.55, 70, 220), rad2 = rad * rad, lim = rad2 * 5;
    const str = (h.quiet || this.props.interactive === false) ? 0 : 1 + h.burst * 1.5;
    const k = 0.022 * dt, damp = Math.pow(0.9, dt), mvx = h.mvx, mvy = h.mvy;
    for (let i = 0; i < N; i++) {
      const g = grp[i]; let x, y, z, am = 1;
      if (g === 2) { const L = (dPh[i] + t * dRate[i]) % 1, th = dTh[i] - L * 0.6, r = 1 + dR[i] * L; x = r * Math.cos(th); y = r * Math.sin(th); z = dZ[i] * L; am = Math.sin(Math.PI * L); }
      else { x = pos[i*3]; y = pos[i*3+1]; z = pos[i*3+2]; }
      const M = g === 1 ? Mg : g === 3 ? Mc : Mo;
      const X = M[0]*x + M[1]*y + M[2]*z, Y = M[3]*x + M[4]*y + M[5]*z, Z = M[6]*x + M[7]*y + M[8]*z;
      const s = D / (D - Z), sx = cx + X * R * s, sy = cy + Y * R * s;
      let ox = off[i*2], oy = off[i*2+1], vx = vel[i*2], vy = vel[i*2+1];
      if (pres > 0.002 && dt > 0) {
        const qx = sx + ox - mx, qy = sy + oy - my, d2 = qx * qx + qy * qy;
        if (d2 < lim) {
          const f = Math.exp(-d2 / rad2) * pres * str * dt, inv = 1 / Math.sqrt(d2 + 1), sw = 0.5 + seed[i];
          vx += (qx * inv * 1.7 - qy * inv * 1.5 * sw) * f + mvx * 0.1 * f;
          vy += (qy * inv * 1.7 + qx * inv * 1.5 * sw) * f + mvy * 0.1 * f;
        }
      }
      if (dt > 0 && (ox !== 0 || oy !== 0 || vx !== 0 || vy !== 0)) {
        vx = (vx - ox * k) * damp; vy = (vy - oy * k) * damp; ox += vx * dt; oy += vy * dt;
        if (ox * ox + oy * oy < 0.01 && vx * vx + vy * vy < 0.01) { ox = oy = vx = vy = 0; }
        off[i*2] = ox; off[i*2+1] = oy; vel[i*2] = vx; vel[i*2+1] = vy;
      }
      const sp = Math.abs(vx) + Math.abs(vy), gl = sp > 1 ? Math.min(1, sp / 14) : 0;
      const depth = 0.5 + 0.5 * clamp((Z + 1.1) / 2.2, 0, 1);
      const o = i * 4;
      let fx = sx + ox, fy = sy + oy;
      if (dis > 0) { const ex = sx - cx, ey = sy - cy, iv = 1 / (Math.sqrt(ex * ex + ey * ey) + 30), m = dis * (40 + seed[i] * 520); fx += ex * iv * m + (seed[i] - 0.5) * m * 0.8; fy += ey * iv * m * 0.7 - m * 0.35; }
      out[o] = fx * dpr; out[o+1] = fy * dpr;
      out[o+2] = size[i] * s * sk * (1 + gl * 0.4) * (h.szM || 1);
      out[o+3] = Math.min(1, alpha[i] * am * depth * (1 + gl * 0.9) * aK * (h.alM || 1));
    }
  }

  drawHero(h = this.h) {
    if (!h || !h.n || h.lost || h.canvas.width < 2) return;
    const c = h.canvas;
    if (h.gl) {
      const gl = h.gl;
      gl.viewport(0, 0, c.width, c.height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(h.prog); gl.uniform2f(h.uRes, c.width, c.height);
      const FD = h.fade; if (FD) { gl.uniform4f(h.uF, 1, FD.a + (FD.drift || 0) * h.t, FD.k, FD.span || 0.9); gl.uniform3f(h.uCt, h.cx * h.dpr, h.cy * h.dpr, h.R * h.dpr); gl.uniform3f(h.uA, FD.A[0], FD.A[1], FD.A[2]); gl.uniform3f(h.uB, FD.B[0], FD.B[1], FD.B[2]); } else gl.uniform4f(h.uF, 0, 0, 0, 1);
      gl.enable(gl.BLEND); if (h.normal) gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); else gl.blendFunc(gl.ONE, gl.ONE);
      gl.bindBuffer(gl.ARRAY_BUFFER, h.bDyn); gl.bufferSubData(gl.ARRAY_BUFFER, 0, h.out); gl.vertexAttribPointer(h.aD, 4, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, h.bCol); gl.vertexAttribPointer(h.aC, 3, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, h.n);
    } else if (h.ctx) {
      const ctx = h.ctx, out = h.out;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; ctx.clearRect(0, 0, c.width, c.height);
      ctx.globalCompositeOperation = h.normal ? 'source-over' : 'lighter';
      for (let i = 0; i < h.n; i++) { const o = i * 4, a = out[o+3]; if (a < 0.02) continue; const s = out[o+2];
        ctx.globalAlpha = Math.min(1, a); ctx.fillStyle = h.css[i]; ctx.fillRect(out[o] - s / 2, out[o+1] - s / 2, s, s); }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    }
  }

  /* ───────── Slutten: en roligere skulptur bak kontakt ───────── */
  initEnd() {
    if (this.e) return; const root = this.endRoot.current, canvas = this.endCanvas.current;
    if (!root || !canvas) return;
    const e = this.e = { root, canvas, quiet: true, nFixed: this.coarse ? 6000 : 12000, t: Math.random() * 40, last: 0, raf: 0, running: false, visible: false,
      w: 1, hh: 1, dpr: 1, cx: 0, cy: 0, R: 100, sizeK: 1, mx: -1e4, my: -1e4, tx: -1e4, ty: -1e4, pmx: -1e4, pmy: -1e4, mvx: 0, mvy: 0,
      pres: 0, presT: 0, burst: 0, touchUntil: 0, par: 0, alphaK: 0.6, seen: false };
    let gl = null;
    try { gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false }); } catch (er) {}
    if (gl) { try { this.initGL(gl, e); } catch (er) { e.gl = null; } }
    if (!e.gl) e.ctx = canvas.getContext('2d');
    canvas.addEventListener('webglcontextlost', ev => { ev.preventDefault(); e.lost = true; });
    this.buildHero(e); e.off.fill(0); e.vel.fill(0);
    const ro = new ResizeObserver(() => this.layoutEnd()); ro.observe(root);
    const io = new IntersectionObserver(es => {
      e.visible = es[0].isIntersecting;
      if (e.visible && !e.seen) { e.seen = true; if (!this.rm) for (let k = 0; k < e.n; k++) { const a = Math.random() * TAU, d = 80 + Math.random() * 300; e.off[k*2] = Math.cos(a) * d; e.off[k*2+1] = Math.sin(a) * d * 0.6; } }
      if (e.visible) this.wakeEngine(e);
    });
    io.observe(root);
    this.addCleanup(() => { e.dead = true; if (e.raf) e.raf(); ro.disconnect(); io.disconnect(); });
    this.layoutEnd();
  }
  layoutEnd() {
    const e = this.e; if (!e) return;
    const w = e.root.clientWidth, H = e.root.clientHeight;
    if (w < 2 || H < 2) { this.retryLayout('end', () => this.layoutEnd()); return; }
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (w * H * dpr * dpr > 4e6) dpr = Math.max(1, Math.sqrt(4e6 / (w * H)));
    const cw = Math.round(w * dpr), ch = Math.round(H * dpr);
    if (e.canvas.width !== cw || e.canvas.height !== ch) { e.canvas.width = cw; e.canvas.height = ch; }
    e.w = w; e.hh = H; e.dpr = dpr;
    const wide = w >= 1000;
    e.cx = wide ? w * 0.79 : w * 0.7; e.cy = wide ? H * 0.33 : H * 0.17;
    e.R = wide ? Math.min(H * 0.3, w * 0.16) : Math.min(H * 0.13, w * 0.3);
    e.sizeK = clamp(e.R / 260, 0.75, 1.2); e.alphaK = (wide ? 0.62 : 0.4) * (curTheme().endK ?? 1);
    if (!e.running) { this.stepHero(0, e); this.drawHero(e); }
  }
  wakeEngine(h) {
    if (!h || h.dead) return;
    if (this.rm) { this.stepHero(0, h); this.drawHero(h); return; }
    if (h.running || !h.visible) return;
    h.running = true; h.last = performance.now();
    const f = now => {
      if (h.dead) return;
      if (!h.visible || h.lost) { h.running = false; return; }
      h.raf = this.schedule(f);
      const raw = Math.max(0.25, (now - h.last) / 16.667); h.last = now;
      const steps = raw > 3 ? Math.min(10, Math.ceil(raw / 3)) : 1, dt = Math.min(3, raw / steps);
      for (let k = 0; k < steps; k++) this.stepHero(dt * 0.7, h);
      this.drawHero(h);
    };
    h.raf = this.schedule(f);
  }

  /* ───────── Kildene: data som strømmer mot datamodellen ───────── */
  initFlow() {
    if (this.fl) return; const bar = this.flowBar.current, canvas = this.flowCanvas.current;
    if (!bar || !canvas) return;
    const F = this.fl = { bar, canvas, ctx: canvas.getContext('2d'), segs: [], t: 0, last: 0, visible: false, running: false, raf: 0, dpr: 1 };
    const draw = dts => {
      const ctx = F.ctx, d = F.dpr; F.t += dts;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(d, 0, 0, d, 0, 0); ctx.globalCompositeOperation = curTheme().flowLight ? 'source-over' : 'lighter';
      F.segs.forEach((sg, si) => {
        const len = sg.x1 - sg.x0, n = Math.max(2, Math.round(len / 26));
        for (let j = 0; j < n; j++) {
          const ph = (F.t * (0.42 + si * 0.06) + j / n + si * 0.31) % 1, x = sg.x0 + ph * len, a = Math.sin(Math.PI * ph);
          const FF = curTheme().flowFade, mixs = (u, w, q) => ((u[0] + (w[0] - u[0]) * q) | 0) + ',' + ((u[1] + (w[1] - u[1]) * q) | 0) + ',' + ((u[2] + (w[2] - u[2]) * q) | 0);
          const fcol = FF ? mixs(FF[0], FF[1], (x - F.segs[0].x0) / Math.max(1, F.segs[F.segs.length - 1].x1 - F.segs[0].x0)) : null;
          ctx.fillStyle = 'rgba(' + (fcol || curTheme().flow) + ',' + (a * 0.22).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(x, sg.y, 5.5, 0, TAU); ctx.fill();
          ctx.fillStyle = 'rgba(' + (fcol ? mixs(fcol.split(',').map(Number), [255, 255, 255], 0.45) : curTheme().flowHi) + ',' + (a * 0.95).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(x, sg.y, 1.7, 0, TAU); ctx.fill();
        }
      });
    };
    F.layout = () => {
      const b = bar.getBoundingClientRect(); if (b.width < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(b.width * dpr); canvas.height = Math.round(b.height * dpr); F.dpr = dpr;
      F.segs = [].slice.call(bar.querySelectorAll('[data-kobling]')).map(el => { const r = el.getBoundingClientRect(); return { x0: r.left - b.left + 14, x1: r.right - b.left - 28, y: r.top - b.top + r.height / 2 }; }).filter(sg => sg.x1 - sg.x0 > 10);
      draw(0);
    };
    const frame = now => {
      if (F.dead) return;
      if (!F.visible) { F.running = false; return; }
      F.raf = this.schedule(frame);
      const dts = Math.min(0.1, (now - F.last) / 1000); F.last = now; draw(dts);
    };
    const ro = new ResizeObserver(() => F.layout()); ro.observe(bar);
    const io = new IntersectionObserver(es => { F.visible = es[0].isIntersecting; if (F.visible && !F.running && !this.rm) { F.running = true; F.last = performance.now(); F.raf = this.schedule(frame); } });
    io.observe(bar);
    this.addCleanup(() => { F.dead = true; if (F.raf) F.raf(); ro.disconnect(); io.disconnect(); });
    F.layout();
  }

  /* ───────── Vesentlighet: grensen revisor kan dra ───────── */
  initVes() {
    if (this.v) return; const wrap = this.vesWrap.current, canvas = this.vesCanvas.current;
    if (!wrap || !canvas) return;
    const R = Math.random, gauss = () => { let u = 0; while (!u) u = R(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * R()); };
    const vals = []; for (let i = 0; i < 300; i++) vals.push(clamp(gauss() * 0.95 - 0.2, -2.9, 2.9));
    const V = this.v = { wrap, canvas, ctx: canvas.getContext('2d'), vals, thr: 0.64, dots: [], W: 1, H: 1, dpr: 1, lastOk: -1 };
    const draw = () => {
      const ctx = V.ctx, d = V.dpr, W = V.W, H = V.H, base = H - 34, tx = V.thr * W;
      ctx.setTransform(d, 0, 0, d, 0, 0); ctx.clearRect(0, 0, W, H);
      let ok = 0;
      for (const p of V.dots) {
        const over = p.xn > V.thr; if (!over) ok++;
        ctx.fillStyle = over ? curTheme().vesOver : curTheme().vesUnder;
        ctx.beginPath(); ctx.arc(p.x, p.y, V.r, 0, TAU); ctx.fill();
      }
      ctx.fillStyle = 'rgba(109,46,114,0.06)'; ctx.fillRect(tx, 0, W - tx, base);
      ctx.fillStyle = '#dcd8e2'; ctx.fillRect(0, base + 6, W, 1);
      ctx.font = '500 13px Barlow, system-ui, sans-serif'; ctx.fillStyle = '#67616f'; ctx.textBaseline = 'top';
      ctx.textAlign = 'left'; ctx.fillText('Mindre avvik', 0, base + 16);
      ctx.textAlign = 'right'; ctx.fillText('Større avvik', W, base + 16);
      ctx.fillStyle = '#1f1b26'; ctx.fillRect(Math.round(tx) - 1, 0, 2, base + 6);
      ctx.fillRect(Math.round(tx) - 7, 0, 14, 14);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(tx) - 3, 4, 1, 6); ctx.fillRect(Math.round(tx) + 2, 4, 1, 6);
      ctx.fillStyle = '#1f1b26'; ctx.font = '500 13px Barlow, system-ui, sans-serif'; ctx.textBaseline = 'middle';
      const left = tx > W - 220; ctx.textAlign = left ? 'right' : 'left';
      ctx.fillText('Grense for ubetydelige feil', tx + (left ? -16 : 16), 7);
      const rev = V.dots.length - ok;
      if (ok !== V.lastOk) { V.lastOk = ok; if (this.vesOk.current) this.vesOk.current.textContent = fmt(ok); if (this.vesRev.current) this.vesRev.current.textContent = fmt(rev); wrap.setAttribute('aria-valuenow', String(Math.round(V.thr * 100))); wrap.setAttribute('aria-valuetext', ok + ' under grensen, ' + rev + ' over grensen'); }
    };
    V.layout = () => {
      const W = wrap.clientWidth; if (W < 2) return;
      const bins = clamp(Math.floor(W / 11), 24, 110), pitch = W / bins, r = Math.min(pitch * 0.36, 3.8);
      const counts = new Array(bins).fill(0), dots = [];
      const sorted = V.vals.slice().sort((a, b) => a - b);
      for (const v of sorted) { const bi = clamp(Math.floor((v + 3) / 6 * bins), 0, bins - 1); dots.push({ bi, k: counts[bi]++ }); }
      const maxS = Math.max.apply(null, counts), step = Math.min(pitch, 10), H = Math.round(40 + maxS * step + 34);
      const base = H - 34;
      V.dots = dots.map(o => ({ x: (o.bi + 0.5) * pitch, y: base - (o.k + 0.5) * step, xn: (o.bi + 0.5) / bins }));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.style.height = H + 'px'; canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      Object.assign(V, { W, H, dpr, r });
      draw();
    };
    const setX = cx => { const b = wrap.getBoundingClientRect(); V.thr = clamp((cx - b.left) / Math.max(1, b.width), 0.04, 0.96); draw(); };
    let drag = false;
    const onDown = e => { drag = true; try { wrap.setPointerCapture(e.pointerId); } catch (er) {} setX(e.clientX); };
    const onMove = e => { if (drag) setX(e.clientX); };
    const onUp = () => { drag = false; };
    const onKey = e => { const k = e.key; if (k === 'ArrowLeft' || k === 'ArrowDown') { V.thr = clamp(V.thr - 0.02, 0.04, 0.96); draw(); e.preventDefault(); } else if (k === 'ArrowRight' || k === 'ArrowUp') { V.thr = clamp(V.thr + 0.02, 0.04, 0.96); draw(); e.preventDefault(); } };
    wrap.addEventListener('pointerdown', onDown); wrap.addEventListener('pointermove', onMove); wrap.addEventListener('pointerup', onUp); wrap.addEventListener('pointercancel', onUp); wrap.addEventListener('keydown', onKey);
    const ro = new ResizeObserver(() => V.layout()); ro.observe(wrap);
    this.addCleanup(() => { ro.disconnect(); wrap.removeEventListener('pointerdown', onDown); wrap.removeEventListener('pointermove', onMove); wrap.removeEventListener('pointerup', onUp); wrap.removeEventListener('pointercancel', onUp); wrap.removeEventListener('keydown', onKey); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!V.dead) draw(); });
    V.layout();
  }

  /* ───────── Skatteoppgjøret: tallene telles opp ───────── */
  initTax() {
    if (this._taxInit) return; const root = this.taxRoot.current; if (!root || !root.querySelector('[data-tall]')) return; this._taxInit = true;
    const nums = [].slice.call(root.querySelectorAll('[data-tall]'));
    if (this.rm || !('IntersectionObserver' in window)) { this.setState({ taxOn: true }); return; }
    nums.forEach(el => { el.textContent = '0'; });
    const io = new IntersectionObserver(es => {
      if (!es.some(x => x.isIntersecting)) return;
      io.disconnect(); this.setState({ taxOn: true });
      const t0 = performance.now(), dur = 1300, delay = 1000;
      const tick = now => {
        const k = clamp((now - t0 - delay) / dur, 0, 1), ez = 1 - Math.pow(1 - k, 3);
        nums.forEach(el => { el.textContent = fmt(Math.round(+el.getAttribute('data-tall') * ez)); });
        if (k < 1) this._taxCancel = this.schedule(tick);
      };
      this._taxCancel = this.schedule(tick);
    }, { rootMargin: '0px 0px -25% 0px' });
    io.observe(root);
    this.addCleanup(() => { io.disconnect(); if (this._taxCancel) this._taxCancel(); });
  }

  initSorter() {
    if (this.sc) return; const el = document.querySelector('canvas[data-v="sorter"]'); if (!el) return;
    const c = this.sc = SORT(el); if (this.rm) c.t = 7.5;
    c.lay();
    const ro = new ResizeObserver(() => c.lay()); ro.observe(el.parentElement);
    const io = new IntersectionObserver(es => { c.vis = es[0].isIntersecting; if (c.vis && !c.seen && !this.rm) { c.seen = true; c.t = 0; c.st = {}; } this.wakeSort(); }, { threshold: 0.15 });
    io.observe(el);
    this.addCleanup(() => { c.dead = true; if (c.raf) c.raf(); ro.disconnect(); io.disconnect(); });
  }
  wakeSort() {
    const c = this.sc; if (!c || c.dead || c.running || !c.vis || this.rm) return;
    c.running = true; let last = performance.now();
    const f = now => { if (c.dead) return; if (!c.vis) { c.running = false; return; } c.raf = this.schedule(f); const dt = Math.min(0.6, (now - last) / 1000); last = now; c.step(dt); };
    c.raf = this.schedule(f);
  }
  kGo(i) {
    const kr = this.kRoot.current; if (!kr) { this.setState({ kTab: i }); return; }
    const top = kr.getBoundingClientRect().top + window.scrollY + ((i + 0.5) / 3) * (kr.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: this.rm ? 'auto' : 'smooth' });
  }

  /* ───────── Populasjon: Utvalg mot Alle ───────── */
  initPop() {
    const root = this.popRoot.current, uc = this.uCanvas.current, ac = this.aCanvas.current;
    if (!root || !uc || !ac) return;
    const p = this.p = { root, uc, ac, uctx: uc.getContext('2d'), actx: ac.getContext('2d'), tc: 0, T: 0, last: 0, running: false, visible: true, seen: false,
      picks: [], next: 0.7, pending: null, sp: 0, done: 0, ut: 0, lastF: -1, ret: { x: 0, y: 0, tx: 0, ty: 0 }, hov: { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, p: 0, pt: 0 }, lastU: -1, lastA: -1 };
    const DIM = [54, 38, 57], LYS = [211, 192, 213], WH = [255, 250, 255];
    p.lut = new Uint32Array(256); p.lutCss = new Array(256);
    for (let j = 0; j < 256; j++) {
      const v = j / 255, a = v < 0.68 ? DIM : LYS, b = v < 0.68 ? LYS : WH, t = v < 0.68 ? v / 0.68 : (v - 0.68) / 0.32;
      const r = Math.round(a[0] + (b[0] - a[0]) * t), g = Math.round(a[1] + (b[1] - a[1]) * t), bl = Math.round(a[2] + (b[2] - a[2]) * t);
      p.lut[j] = ((255 << 24) | (bl << 16) | (g << 8) | r) >>> 0; p.lutCss[j] = 'rgb(' + r + ',' + g + ',' + bl + ')';
    }
    const ro = new ResizeObserver(() => this.layoutPop()); ro.observe(root); ro.observe(this.uWrap.current); ro.observe(this.aWrap.current);
    const io = new IntersectionObserver(es => {
      p.visible = es[0].isIntersecting;
      if (p.visible && !p.seen) { p.seen = true; p.tc = 0; p.picks = []; p.pending = null; p.next = this.cycle().s0; }
      if (p.visible) this.wakePop();
    }, { threshold: 0.05 });
    io.observe(root);
    const onMove = e => { const b = ac.getBoundingClientRect(); p.hov.tx = e.clientX - b.left; p.hov.ty = e.clientY - b.top; if (p.hov.x < -9000) { p.hov.x = p.hov.tx; p.hov.y = p.hov.ty; } p.hov.pt = 1; };
    const onLeave = () => { p.hov.pt = 0; };
    ac.addEventListener('pointermove', onMove, { passive: true }); ac.addEventListener('pointerleave', onLeave, { passive: true });
    const onVis = () => { if (!document.hidden) this.wakePop(); };
    document.addEventListener('visibilitychange', onVis);
    this.addCleanup(() => { p.dead = true; if (p.raf) p.raf(); ro.disconnect(); io.disconnect();
      ac.removeEventListener('pointermove', onMove); ac.removeEventListener('pointerleave', onLeave); document.removeEventListener('visibilitychange', onVis); });
    this.layoutPop();
    this.wakePop();
  }

  bloom(ctx, canvas, P, alpha) {
    const g = P.gx; if (!g) return;
    g.globalCompositeOperation = 'copy'; g.imageSmoothingEnabled = true; g.drawImage(canvas, 0, 0, P.gc.width, P.gc.height);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = alpha; ctx.imageSmoothingEnabled = true;
    ctx.drawImage(P.gc, 0, 0, P.cw, P.ch); ctx.restore();
  }

  cycle() {
    const sd = clamp(this.props.sweepSeconds ?? 2.8, 0.8, 8), s0 = 0.7, s1 = s0 + sd, hold = s1 + 3.6, fade = hold + 0.7;
    return { sd, s0, s1, hold, fade, end: fade + 0.5 };
  }

  layoutPop() {
    const p = this.p; if (!p) return;
    const uw = this.uWrap.current.clientWidth, aw = this.aWrap.current.clientWidth;
    if (uw < 2 || aw < 2) { this.retryLayout('pop', () => this.layoutPop()); return; }
    const narrow = Math.min(uw, aw) < 340, cols = narrow ? 100 : 150, rows = narrow ? 120 : 80;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const setup = (canvas, W) => {
      const pd = Math.max(2, Math.ceil(W * dpr / cols)), cw = pd * cols, ch = pd * rows, sc = cw / Math.max(1, W);
      const pitch = W / cols, H = ch / sc;
      canvas.style.aspectRatio = 'auto'; canvas.style.height = H + 'px';
      canvas.width = cw; canvas.height = ch;
      const ds = Math.max(1, Math.round(pd * 0.6)), offD = 0, ox = 0;
      const px = new Int32Array(cols), py = new Int32Array(rows);
      for (let c = 0; c < cols; c++) px[c] = offD + c * pd + Math.floor((pd - ds) / 2);
      for (let r = 0; r < rows; r++) py[r] = r * pd + Math.floor((pd - ds) / 2);
      const ins = new Int32Array(ds);
      if (ds >= 4) for (let yy = 0; yy < ds; yy++) { const cy = yy + 0.5 - ds / 2, hw = Math.sqrt(Math.max(0, ds * ds / 4 - cy * cy)); ins[yy] = Math.max(0, Math.round(ds / 2 - hw)); }
      const gc = document.createElement('canvas'); gc.width = Math.max(1, Math.round(cw / 4)); gc.height = Math.max(1, Math.round(ch / 4));
      return { W, H, pitch, cols, rows, dpr: sc, cw, ch, ds, px, py, ox, ins, gc, gx: gc.getContext('2d') };
    };
    p.U = setup(p.uc, uw); p.A = setup(p.ac, aw);
    const base = document.createElement('canvas'); base.width = p.U.cw; base.height = p.U.ch;
    const bx = base.getContext('2d'), bimg = bx.createImageData(p.U.cw, p.U.ch), bb = new Uint32Array(bimg.data.buffer), U0 = p.U;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) for (let yy = 0; yy < U0.ds; yy++) { const ri = (U0.py[r] + yy) * U0.cw + U0.px[c], a = U0.ins[yy]; bb.fill(p.lut[0], ri + a, ri + U0.ds - a); }
    bx.putImageData(bimg, 0, 0);
    p.U.base = base;
    p.A.img = p.actx.createImageData(p.A.cw, p.A.ch); p.A.buf = new Uint32Array(p.A.img.data.buffer); p.A.fx = new Float32Array(rows);
    p.flag = new Uint8Array(cols * rows); for (let k = 0; k < 46;) { const ix = Math.random() * cols * rows | 0; if (!p.flag[ix]) { p.flag[ix] = 1; k++; } }
    p.picks = p.picks.filter(q => q.c < cols && q.r < rows);
    if (!p.ret.x) { p.ret.x = p.ret.tx = p.U.ox + p.U.cols * p.U.pitch / 2; p.ret.y = p.ret.ty = p.U.H / 2; }
    if (this.rm) this.drawPopStatic(); else { this.drawUtvalg(0); this.drawAlle(); }
  }

  drawPopStatic() {
    const p = this.p, cy = this.cycle();
    if (!p.staticPicks) { p.staticPicks = []; for (let k = 0; k < 11; k++) p.staticPicks.push({ c: Math.random() * p.U.cols | 0, r: Math.random() * p.U.rows | 0, t: -99 }); }
    p.picks = p.staticPicks; p.tc = cy.s1 + 2; p.T = 0;
    this.drawUtvalg(0, true); this.drawAlle(true);
  }

  wakePop() {
    const p = this.p; if (!p || p.dead || this.rm || p.running || !p.visible) return;
    p.running = true; p.last = performance.now(); p.raf = this.schedule(this.popFrame);
  }

  scrollMode() { return (this.props.sweepMode ?? 'Rulling') !== 'Løkke'; }

  popFrame = now => {
    const p = this.p; if (!p || p.dead) return;
    if (!p.visible) { p.running = false; return; }
    p.raf = this.schedule(this.popFrame);
    const dts = Math.min(0.25, (now - p.last) / 1000); p.last = now;
    p.T += dts;
    const cy = this.cycle();
    if (this.scrollMode()) {
      const el = this.aWrap.current, vh = window.innerHeight || 800;
      let tgt = 0; if (el) { const r = el.getBoundingClientRect(); tgt = clamp((vh * 0.85 - r.top) / (vh * 0.6), 0, 1); }
      p.sp += (tgt - p.sp) * (1 - Math.pow(0.004, dts));
      if (Math.abs(tgt - p.sp) < 0.0015) p.sp = tgt;
      if (p.sp <= 0.001) { p.sp = 0; if (p.picks.length || p.pending) { p.picks = []; p.pending = null; p.next = p.ut; } }
      p.done = p.sp >= 0.999 ? p.done + dts : 0;
      p.ut += dts;
    } else {
      p.tc += dts;
      if (p.tc >= cy.end) { p.tc = 0; p.picks = []; p.next = cy.s0; p.pending = null; }
    }
    const hv = p.hov, e = 1 - Math.pow(0.002, dts);
    hv.x += (hv.tx - hv.x) * e; hv.y += (hv.ty - hv.y) * e; hv.p += (hv.pt - hv.p) * (1 - Math.pow(0.02, dts));
    this.drawUtvalg(dts); this.drawAlle();
  };

  drawUtvalg(dts, still) {
    const p = this.p, U = p.U, ctx = p.uctx, cy = this.cycle(), sm = this.scrollMode() && !still;
    if (!U || !U.base) return;
    const tc = sm ? p.ut : p.tc;
    const active = sm ? p.sp > 0.02 : (tc > cy.s0 - 0.3 && tc < cy.hold);
    if (!still && dts > 0) {
      const canPick = sm ? (p.sp > 0.02 && p.picks.length < 24) : tc < cy.hold - 0.4;
      if (!p.pending && tc >= p.next && canPick) {
        let c, r, n = 0;
        do { c = Math.random() * U.cols | 0; r = Math.random() * U.rows | 0; n++; } while (n < 20 && p.picks.some(q => q.c === c && q.r === r));
        p.ret.tx = U.ox + (c + 0.5) * U.pitch; p.ret.ty = (r + 0.5) * U.pitch; p.pending = { c, r, at: tc + 0.4 };
      }
      if (p.pending && tc >= p.pending.at) { p.picks.push({ c: p.pending.c, r: p.pending.r, t: tc }); p.pending = null; p.next = tc + 0.18 + Math.random() * 0.28; }
      const e = 1 - Math.pow(0.0004, dts);
      p.ret.x += (p.ret.tx - p.ret.x) * e; p.ret.y += (p.ret.ty - p.ret.y) * e;
    }
    const fade = sm || still ? 1 : tc < cy.hold ? 1 : Math.max(0, 1 - (tc - cy.hold) / (cy.fade - cy.hold));
    const d = U.dpr, ds = U.ds;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, U.cw, U.ch); ctx.drawImage(U.base, 0, 0);
    for (const q of p.picks) {
      const age = tc - q.t, I = (0.66 + 0.34 * Math.exp(-age * 3)) * fade;
      ctx.fillStyle = p.lutCss[clamp(I * 255 | 0, 0, 255)]; ctx.beginPath(); ctx.arc(U.px[q.c] + ds / 2, U.py[q.r] + ds / 2, ds / 2, 0, TAU); ctx.fill();
      if (age < 0.9 && fade > 0) {
        const k = age / 0.9, sz = U.pitch * (1.4 + k * 6) * d;
        ctx.strokeStyle = 'rgba(211,192,213,' + ((1 - k) * 0.75).toFixed(3) + ')'; ctx.lineWidth = d;
        ctx.strokeRect((U.ox + (q.c + 0.5) * U.pitch) * d - sz / 2, (q.r + 0.5) * U.pitch * d - sz / 2, sz, sz);
      }
    }
    this.bloom(ctx, p.uc, U, 0.75);
    if (!still && active) {
      const x = Math.round(p.ret.x * d) + 0.5, y = Math.round(p.ret.y * d) + 0.5, L = U.pitch * 2.6 * d, a = U.pitch * 1.1 * d;
      ctx.lineWidth = d; ctx.strokeStyle = 'rgba(243,236,244,0.09)';
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(U.cw, y); ctx.moveTo(x, 0); ctx.lineTo(x, U.ch); ctx.stroke();
      ctx.strokeStyle = 'rgba(243,236,244,0.92)'; ctx.beginPath();
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) { const cx = x + sx * L, cyy = y + sy * L; ctx.moveTo(cx - sx * a, cyy); ctx.lineTo(cx, cyy); ctx.lineTo(cx, cyy - sy * a); }
      ctx.stroke();
    }
    const n = !sm && !still && tc >= cy.hold ? 0 : p.picks.length;
    if (n !== p.lastU) { p.lastU = n; if (this.uCount.current) this.uCount.current.textContent = fmt(n); }
  }

  drawAlle(still) {
    const p = this.p, A = p.A, ctx = p.actx, cy = this.cycle(), tc = p.tc, T = p.T, sm = this.scrollMode() && !still;
    if (!A || !A.buf) return;
    const ins = A.ins, total = A.cols * A.rows, pitch = A.pitch, cols = A.cols, rows = A.rows, buf = A.buf, lut = p.lut, cw = A.cw, ds = A.ds, dpr = A.dpr;
    const prog = sm ? p.sp : clamp((tc - cy.s0) / cy.sd, 0, 1);
    const fade = sm || still ? 1 : tc < cy.hold ? 1 : Math.max(0, 1 - (tc - cy.hold) / (cy.fade - cy.hold));
    const W = cols * pitch, amp = W * 0.045, band = W * 0.14, span = W + 2 * amp + 8;
    const base = A.ox + prog * span - amp - 4, speed = span / (sm ? 1.4 : cy.sd), sweeping = prog > 0 && prog < 1;
    const flash = prog >= 1 && !still ? Math.exp(-(sm ? p.done : tc - cy.s1) * 3.5) * 0.3 : 0;
    const fx = A.fx, fl = this.props.showFlagged !== false ? p.flag : null, fq = p.fq || (p.fq = []);
    fq.length = 0;
    for (let r = 0; r < rows; r++) fx[r] = prog >= 1 ? 1e9 : prog <= 0 ? -1e9 : base + amp * (0.62 * Math.sin(r * 0.085 + T * 2.3) + 0.38 * Math.sin(r * 0.029 - T * 1.5));
    buf.fill(0);
    const hv = p.hov, hp = still ? 0 : hv.p, hr = pitch * 9, hr2 = hr * hr, hlim = hr2 * 4;
    const shimmer = prog >= 1 && !still, preB = band * 0.4;
    let checked = 0, nF = 0;
    for (let r = 0; r < rows; r++) {
      const fr = fx[r], yc = (r + 0.5) * pitch, py = A.py[r];
      if (prog < 1) { const n = Math.ceil((fr - A.ox - pitch * 0.5) / pitch); checked += n < 0 ? 0 : n > cols ? cols : n; }
      const nearRowHover = hp > 0.01 && Math.abs(yc - hv.y) < hr * 2;
      for (let c = 0; c < cols; c++) {
        const xc = A.ox + (c + 0.5) * pitch, dd = fr - xc;
        let I, dx = 0, dy = 0;
        if (dd < 0) I = dd > -preB ? 0.16 * (1 + dd / preB) : 0;
        else if (fl && fl[r * cols + c]) { I = 0.1; fq.push(xc, yc, dd / speed); nF++; }
        else {
          I = 0.62 + 0.38 * Math.exp(-(dd / speed) * 5);
          if (shimmer) I += 0.07 * Math.sin(c * 0.19 + r * 0.23 - T * 2.6) + flash;
        }
        if (sweeping && dd > -14 && dd < 14) { const kk = Math.exp(-dd * dd / 36); dx = 2.4 * kk; dy = Math.sin(r * 0.5 + T * 8) * 0.6 * kk; }
        if (nearRowHover) {
          const qx = xc - hv.x, qy = yc - hv.y, q2 = qx * qx + qy * qy;
          if (q2 < hlim) { const f = Math.exp(-q2 / hr2) * hp, inv = 1 / Math.sqrt(q2 + 1); dx += qx * inv * pitch * 1.6 * f; dy += qy * inv * pitch * 1.6 * f; I += 0.3 * f; }
        }
        I *= fade;
        const col = lut[I <= 0 ? 0 : I >= 1 ? 255 : (I * 255) | 0];
        let x0 = A.px[c], y0 = py;
        if (dx !== 0 || dy !== 0) { x0 = clamp(x0 + Math.round(dx * dpr), 0, cw - ds); y0 = clamp(y0 + Math.round(dy * dpr), 0, A.ch - ds); }
        for (let yy = 0; yy < ds; yy++) { const ri = (y0 + yy) * cw + x0, a = ins[yy]; buf.fill(col, ri + a, ri + ds - a); }
      }
    }
    ctx.putImageData(A.img, 0, 0);
    this.bloom(ctx, p.ac, A, 0.65);
    if (fq.length && fade > 0) {
      ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.lineWidth = 1.2;
      for (let k = 0; k < fq.length; k += 3) {
        const pop = 1 + 1.6 * Math.exp(-fq[k + 2] * 7), sz = pitch * 2.1 * pop;
        ctx.strokeStyle = 'rgba(255,250,255,' + (0.92 * fade).toFixed(3) + ')';
        ctx.strokeRect(Math.round(fq[k] - sz / 2) + 0.5, Math.round(fq[k + 1] - sz / 2) + 0.5, Math.round(sz), Math.round(sz));
      }
      ctx.restore();
    }
    if (sweeping) {
      ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalCompositeOperation = 'lighter';
      const g = ctx.createLinearGradient(base - band, 0, base + amp, 0);
      g.addColorStop(0, 'rgba(211,192,213,0)'); g.addColorStop(1, 'rgba(211,192,213,0.2)');
      ctx.beginPath(); ctx.moveTo(fx[0], 0);
      for (let r = 0; r < rows; r++) ctx.lineTo(fx[r], (r + 0.5) * pitch);
      ctx.lineTo(fx[rows - 1], A.H); ctx.lineTo(fx[rows - 1] - band, A.H);
      for (let r = rows - 1; r >= 0; r--) ctx.lineTo(fx[r] - band, (r + 0.5) * pitch);
      ctx.lineTo(fx[0] - band, 0); ctx.closePath(); ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.moveTo(fx[0], 0);
      for (let r = 0; r < rows; r++) ctx.lineTo(fx[r], (r + 0.5) * pitch);
      ctx.lineTo(fx[rows - 1], A.H);
      ctx.strokeStyle = 'rgba(' + curTheme().glow + ',0.95)'; ctx.lineWidth = 1.25; ctx.shadowColor = 'rgba(' + curTheme().glowSh + ',1)'; ctx.shadowBlur = 16; ctx.stroke();
      ctx.restore();
    }
    const reset = !sm && !still && tc >= cy.hold;
    const n = reset ? 0 : prog >= 1 ? total : checked, f = reset ? 0 : nF;
    if (n !== p.lastA) { p.lastA = n; if (this.aCount.current) this.aCount.current.textContent = fmt(n); }
    if (f !== p.lastF) { p.lastF = f; if (this.aFlag.current) this.aFlag.current.textContent = fmt(f); }
  }

  /* ───────── Flyten: streken tegnes én gang ───────── */
  initFlyt() {
    if (this._flytInit) return; const root = this.flytRoot.current;
    if (root && (root.querySelector('ol') || this.storyRoot.current)) this._flytInit = true; else return;
    if (!root || this.rm || !('IntersectionObserver' in window)) return;
    const lines = [].slice.call(root.querySelectorAll('[data-linje]'));
    lines.forEach(l => { l.style.transition = 'none'; l.style.transform = 'scaleX(0)'; });
    const io = new IntersectionObserver(es => {
      if (!es.some(x => x.isIntersecting)) return;
      io.disconnect();
      const st = 240;
      lines.forEach((l, i) => {
        const motor = i < lines.length - 1;
        l.style.transition = motor ? 'transform ' + st + 'ms linear ' + (i * st) + 'ms' : 'transform 420ms cubic-bezier(.23,1,.32,1) ' + (i * st + 260) + 'ms';
        l.style.transform = 'scaleX(1)';
      });
    }, { rootMargin: '0px 0px -20% 0px' });
    io.observe(root.querySelector('ol') || root);
    this.addCleanup(() => io.disconnect());
  }

  storyVals() {
    const st = this.state.step, f = {};
    for (let i = 0; i < 5; i++) {
      const on = st === i;
      f['v' + i] = on ? 'var(--rm-hi,#ffffff)' : 'var(--rm-mut3,#8a748e)'; f['d' + i] = on ? '1' : '0'; f['h' + i] = on ? '160px' : '0px';
      f['l' + i] = on ? '1' : '0'; f['n' + i] = on ? '0' : '1'; f['y' + i] = on ? '0px' : '14px';
    }
    f.scan = st === 1 ? '100%' : '0%'; f.scanDur = st === 1 ? '2200ms' : '0ms';
    return f;
  }
  kVals() {
    const t = this.state.kTab || 0, k = {};
    for (let i = 0; i < 3; i++) { const on = t === i;
      Object.assign(k, { ['o' + i]: on ? '1' : '0', ['y' + i]: on ? '0px' : '12px', ['p' + i]: on ? 'auto' : 'none', ['h' + i]: on ? 'false' : 'true', ['s' + i]: on ? 'true' : 'false',
        ['c' + i]: on ? 'var(--rm-hi,#ffffff)' : 'var(--rm-mut3,#8d7891)', ['b' + i]: on ? 'var(--rm-acc,#d3c0d5)' : 'transparent', ['bg' + i]: on ? 'rgba(var(--rm-lrgb,243,236,244),.05)' : 'transparent', ['go' + i]: () => this.kGo(i) }); }
    return k;
  }
  navVals(on, off) { const n = this.state.nav; return { flyten: n === 'flyten' ? on : off, kilder: n === 'kilder' ? on : off, trygghet: n === 'trygghet' ? on : off }; }

  renderVals() {
    return {
      heroRoot: this.heroRoot, heroCanvas: this.heroCanvas, heroBand: this.heroBand, heroHint: this.heroHint, heroHintText: this.heroHintText,
      flytRoot: this.flytRoot, popRoot: this.popRoot, uWrap: this.uWrap, uCanvas: this.uCanvas, uCount: this.uCount, uBar: this.uBar,
      aWrap: this.aWrap, aCanvas: this.aCanvas, aCount: this.aCount, aBar: this.aBar, aFlag: this.aFlag,
      storyRoot: this.storyRoot, storyFill: this.storyFill, endRoot: this.endRoot, endCanvas: this.endCanvas,
      taxRoot: this.taxRoot, flowBar: this.flowBar, flowCanvas: this.flowCanvas,
      vesWrap: this.vesWrap, vesCanvas: this.vesCanvas, vesOk: this.vesOk, vesRev: this.vesRev,
      wide: this.state.wide, narrow: !this.state.wide, showFlagged: this.props.showFlagged !== false,
      f: this.storyVals(),
      k: this.kVals(), kRoot: this.kRoot, kFill: this.kFill,
      navC: this.navVals('var(--rm-navon,#ffffff)', 'var(--rm-navoff,#c9b8cc)'), navU: this.navVals('var(--rm-navu,rgba(243,236,244,.9))', 'transparent'), navB: this.navVals('rgba(var(--rm-lrgb,243,236,244),.09)', 'transparent'),
      tax: { o: this.state.taxOn ? '1' : '0', y: this.state.taxOn ? '0px' : '6px' },
      dots: this._dots || (this._dots = Array.from({ length: 200 }, (_, i) => ({ i }))),
    };
  }
}

window.__Komp = Component;
