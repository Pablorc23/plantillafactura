/* Aviso de cookies (Google Consent Mode v2). Guarda la elección 12 meses. */
(function () {
  var KEY = 'pf-cookies';
  var YEAR = 365 * 24 * 60 * 60 * 1000;
  var banner = null;

  function gtag() { (window.dataLayer = window.dataLayer || []).push(arguments); }

  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (c && (c.v === 'granted' || c.v === 'denied') && Date.now() - c.t < YEAR) return c.v;
    } catch (e) {}
    return null;
  }

  function save(v) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {}
  }

  function update(v) {
    gtag('consent', 'update', {
      ad_storage: v,
      ad_user_data: v,
      ad_personalization: v,
      analytics_storage: v
    });
  }

  function hide() {
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    banner = null;
  }

  function choose(v) {
    save(v);
    update(v);
    hide();
  }

  function show(fromLink) {
    if (!document.body) return;
    if (banner) { var b0 = document.getElementById('cookie-accept'); if (b0) b0.focus(); return; }
    var cur = read();
    banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML =
      '<p>' + (fromLink && cur ? '<strong>Tu elección actual: cookies ' + (cur === 'granted' ? 'aceptadas' : 'rechazadas') + '.</strong> Puedes cambiarla ahora. ' : '') +
      'Usamos cookies propias y de terceros (Google) para el funcionamiento de la web, medir el tráfico y, ' +
      'si lo aceptas, mostrar publicidad personalizada. Más información en nuestra ' +
      '<a href="/politica-privacidad.html">política de privacidad y cookies</a>.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn" id="cookie-accept">Aceptar</button>' +
      '<button type="button" class="btn alt" id="cookie-reject">Rechazar</button>' +
      (fromLink ? '<button type="button" class="btn alt" id="cookie-close">Cerrar</button>' : '') +
      '</div>';
    document.body.appendChild(banner);
    document.getElementById('cookie-accept').addEventListener('click', function () { choose('granted'); });
    document.getElementById('cookie-reject').addEventListener('click', function () { choose('denied'); });
    var cl = document.getElementById('cookie-close');
    if (cl) cl.addEventListener('click', hide);
    document.getElementById('cookie-accept').focus();
  }

  function addFooterLink() {
    var box = document.querySelector('footer .wrap > div:last-child');
    if (!box || document.getElementById('cookie-settings')) return;
    var a = document.createElement('a');
    a.href = '#';
    a.id = 'cookie-settings';
    a.textContent = 'Configurar cookies';
    a.addEventListener('click', function (e) { e.preventDefault(); show(true); });
    box.appendChild(a);
  }

  function init() {
    var c = read();
    if (c === null) show(false); else update(c);
    addFooterLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
