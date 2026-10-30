/* Liten kjøremotor for Claude Design-malen (.dc.html), så siden kan åpnes rett i nettleseren.
   Støtter det malen bruker: {{ uttrykk }} i tekst og attributter, ref, onClick, style-hover,
   <sc-if value> og <sc-for list as>. */
window.React = { createRef: function () { return { current: null }; } };

class DCLogic {
  constructor(props) { this.props = props || {}; this.state = {}; }
  setState(p, cb) {
    const prev = this.state;
    const nyttt = typeof p === 'function' ? p(this.state, this.props) : p;
    this.state = Object.assign({}, this.state, nyttt || {});
    if (this.__dc) this.__dc.kø(prev, cb); else if (cb) cb();
  }
  forceUpdate(cb) { if (this.__dc) this.__dc.kø(this.state, cb); else if (cb) cb(); }
}
window.DCLogic = DCLogic;

window.dcMonter = function (Komp, props, tplEl, rot) {
  // Malen bruker bare navn og punktum (navB.flyten, f.v0, wide, true). Ingen eval, så siden tåler streng CSP.
  const cache = {};
  const ev = (uttr, scope) => {
    let sti = cache[uttr];
    if (!sti) sti = cache[uttr] = uttr.trim().split('.');
    if (sti.length === 1) { if (sti[0] === 'true') return true; if (sti[0] === 'false') return false; if (sti[0] === 'null') return null; }
    let v = scope;
    for (const k of sti) { if (v == null) return undefined; v = v[k]; }
    return v;
  };
  const MØNSTER = /\{\{\s*([\s\S]*?)\s*\}\}/g;
  const deler = s => { const out = []; let i = 0, m; MØNSTER.lastIndex = 0;
    while ((m = MØNSTER.exec(s))) { if (m.index > i) out.push(s.slice(i, m.index)); out.push({ e: m[1] }); i = m.index + m[0].length; }
    if (i < s.length) out.push(s.slice(i)); return out; };
  const sett = (ds, scope) => {
    if (ds.length === 1 && typeof ds[0] === 'object') return ev(ds[0].e, scope);
    return ds.map(d => typeof d === 'string' ? d : (v => v == null || v === false ? '' : String(v))(ev(d.e, scope))).join('');
  };

  const komp = new Komp(props);
  let scope = {};
  const bindinger = [];   // { node, attr|null, ds, sist }
  const hovers = [];      // { el, base, hover, inne }
  const grener = [];      // { anker, noder, uttr, inne, refs }
  const løkker = [];      // { anker, mal, liste, som, ferdig }

  function kompiler(rotNode, refListe, ekstra) { gå(rotNode, refListe, ekstra); }
  function gå(node, refListe, ekstra) {
      if (node.nodeType === 3) {
        if (node.nodeValue.indexOf('{{') >= 0) bindinger.push({ node, attr: null, ds: deler(node.nodeValue), ekstra });
        return;
      }
      if (node.nodeType !== 1) return;
      const tag = node.tagName.toLowerCase();
      if (tag === 'sc-if') {
        const anker = document.createComment('sc-if');
        const noder = Array.from(node.childNodes);
        const uttr = (node.getAttribute('value') || '').replace(/^\{\{\s*|\s*\}\}$/g, '');
        const gren = { anker, noder, uttr, inne: false, refs: [] };
        node.parentNode.replaceChild(anker, node);
        const frag = document.createDocumentFragment(); noder.forEach(n => frag.appendChild(n));
        Array.from(frag.childNodes).forEach(n => gå(n, gren.refs, ekstra));
        grener.push(gren);
        return 'erstattet';
      }
      if (tag === 'sc-for') {
        const anker = document.createComment('sc-for');
        const mal = Array.from(node.childNodes);
        const liste = (node.getAttribute('list') || '').replace(/^\{\{\s*|\s*\}\}$/g, '');
        const som = node.getAttribute('as') || 'item';
        node.parentNode.replaceChild(anker, node);
        løkker.push({ anker, mal, liste, som, ferdig: false, refs: refListe, ekstra });
        return 'erstattet';
      }
      for (const a of Array.from(node.attributes)) {
        const n = a.name, v = a.value;
        if (n === 'ref') { const u = v.replace(/^\{\{\s*|\s*\}\}$/g, ''); refListe.push({ el: node, u, ekstra }); node.removeAttribute(n); continue; }
        if (n === 'onclick') { const u = v.replace(/^\{\{\s*|\s*\}\}$/g, ''); node.removeAttribute(n);
          node.addEventListener('click', e => { const f = ev(u, Object.assign({}, scope, ekstra || {})); if (typeof f === 'function') f(e); }); continue; }
        if (n === 'style-hover') { const h = { el: node, base: node.getAttribute('style') || '', hover: v, inne: false };
          node.removeAttribute(n); hovers.push(h); node.__hover = h;
          node.addEventListener('mouseenter', () => { h.inne = true; node.setAttribute('style', h.base + ';' + h.hover); });
          node.addEventListener('mouseleave', () => { h.inne = false; node.setAttribute('style', h.base); });
          continue; }
        if (n.indexOf('hint-') === 0 || n === 'data-screen-label') { node.removeAttribute(n); continue; }
        if (v.indexOf('{{') >= 0) bindinger.push({ node, attr: n, ds: deler(v), ekstra });
      }
      let barn = node.firstChild;
      while (barn) { const neste = barn.nextSibling; gå(barn, refListe, ekstra); barn = neste; }
  }

  function oppdater() {
    scope = komp.renderVals ? komp.renderVals() : {};
    scope = Object.assign({ props: komp.props, state: komp.state }, scope);
    for (const l of løkker) if (!l.ferdig) {
      const liste = ev(l.liste, Object.assign({}, scope, l.ekstra || {})) || [];
      const frag = document.createDocumentFragment();
      liste.forEach(item => { const ek = Object.assign({}, l.ekstra || {}, { [l.som]: item });
        l.mal.forEach(m => { const k = m.cloneNode(true); const holder = document.createDocumentFragment(); holder.appendChild(k); kompiler(k, l.refs, ek); frag.appendChild(holder); }); });
      l.anker.parentNode.insertBefore(frag, l.anker.nextSibling); l.ferdig = true;
    }
    for (const b of bindinger) {
      const s = b.ekstra ? Object.assign({}, scope, b.ekstra) : scope;
      const v = sett(b.ds, s);
      if (v === b.sist) continue; b.sist = v;
      if (b.attr === null) { b.node.nodeValue = v == null ? '' : String(v); continue; }
      if (b.attr === 'style') {
        const h = b.node.__hover; const str = v == null ? '' : String(v);
        if (h) { h.base = str; b.node.setAttribute('style', h.inne ? str + ';' + h.hover : str); } else b.node.setAttribute('style', str);
        continue;
      }
      if (v == null || v === false) b.node.removeAttribute(b.attr); else b.node.setAttribute(b.attr, String(v));
    }
    for (const g of grener) {
      const på = !!ev(g.uttr, scope);
      if (på && !g.inne) {
        const frag = document.createDocumentFragment(); g.noder.forEach(n => frag.appendChild(n));
        g.anker.parentNode.insertBefore(frag, g.anker.nextSibling); g.inne = true;
        g.refs.forEach(r => { const ref = ev(r.u, scope); if (ref) ref.current = r.el; });
      } else if (!på && g.inne) {
        g.noder.forEach(n => n.parentNode && n.parentNode.removeChild(n)); g.inne = false;
        g.refs.forEach(r => { const ref = ev(r.u, scope); if (ref && ref.current === r.el) ref.current = null; });
      }
    }
  }

  let venter = false, førState = null, tilbakekall = [];
  komp.__dc = {
    kø(prev, cb) {
      if (!venter) { venter = true; førState = prev; queueMicrotask(kjør); }
      if (cb) tilbakekall.push(cb);
    }
  };
  function kjør() {
    venter = false; const prev = førState; førState = null;
    oppdater();
    if (komp.componentDidUpdate) { try { komp.componentDidUpdate(komp.props, prev); } catch (e) { console.warn(e); } }
    const cbs = tilbakekall; tilbakekall = []; cbs.forEach(f => f());
  }

  const frag = tplEl.content.cloneNode(true);
  const toppRefs = [];
  const holder = document.createElement('div');
  holder.appendChild(frag);
  kompiler(holder, toppRefs, null);
  oppdater();
  toppRefs.forEach(r => { const ref = ev(r.u, scope); if (ref) ref.current = r.el; });
  while (holder.firstChild) rot.appendChild(holder.firstChild);
  if (komp.componentDidMount) komp.componentDidMount();
  return komp;
};
