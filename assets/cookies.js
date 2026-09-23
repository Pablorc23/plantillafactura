/* PlantillaFactura — Banner de consentimiento de cookies (RGPD)
   Bloquea AdSense hasta que el usuario acepte. Guarda la decisión en localStorage. */
(function () {
  var KEY = "pf_cookie_consent"; // "accepted" | "rejected"
  var ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX"; // <-- sustituye por tu ID real de AdSense

  function getConsent() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setConsent(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function loadAdsense() {
    if (document.getElementById("pf-adsense-script")) return;
    var s = document.createElement("script");
    s.id = "pf-adsense-script";
    s.async = true;
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + ADSENSE_CLIENT;
    s.crossOrigin = "anonymous";
    document.head.appendChild(s);
  }

  function buildBanner() {
    var wrap = document.createElement("div");
    wrap.id = "pf-cookie-banner";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-label", "Consentimiento de cookies");
    wrap.innerHTML =
      '<div class="pf-cookie-inner">' +
      '<p>Usamos cookies propias y de terceros (Google AdSense) para el funcionamiento del sitio y para mostrar publicidad personalizada. Puedes aceptarlas o rechazarlas. Más información en nuestra <a href="/politica-privacidad.html">política de privacidad</a>.</p>' +
      '<div class="pf-cookie-actions">' +
      '<button type="button" id="pf-cookie-reject" class="pf-btn pf-btn-ghost">Rechazar</button>' +
      '<button type="button" id="pf-cookie-accept" class="pf-btn pf-btn-solid">Aceptar</button>' +
      "</div></div>";
    return wrap;
  }

  function injectStyles() {
    var css =
      "#pf-cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#1E2A38;color:#EDEBE3;font-family:'Inter',sans-serif;box-shadow:0 -2px 12px rgba(0,0,0,.15)}" +
      ".pf-cookie-inner{max-width:960px;margin:0 auto;padding:1rem 1.5rem;display:flex;gap:1.2rem;align-items:center;flex-wrap:wrap}" +
      "#pf-cookie-banner p{margin:0;font-size:.88rem;line-height:1.5;flex:1;min-width:240px;color:#EDEBE3}" +
      "#pf-cookie-banner a{color:#8FD4C1;text-decoration:underline}" +
      ".pf-cookie-actions{display:flex;gap:.6rem;flex-shrink:0}" +
      ".pf-btn{border:1px solid #8FD4C1;padding:.55rem 1rem;font-size:.85rem;font-weight:500;cursor:pointer;border-radius:2px}" +
      ".pf-btn-solid{background:#2F6F62;color:#fff}" +
      ".pf-btn-ghost{background:transparent;color:#EDEBE3}" +
      "@media (max-width:560px){.pf-cookie-inner{flex-direction:column;align-items:stretch}.pf-cookie-actions{justify-content:flex-end}}";
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }

  function init() {
    var consent = getConsent();
    if (consent === "accepted") { loadAdsense(); return; }
    if (consent === "rejected") { return; }

    injectStyles();
    var banner = buildBanner();
    document.body.appendChild(banner);

    document.getElementById("pf-cookie-accept").addEventListener("click", function () {
      setConsent("accepted");
      loadAdsense();
      banner.remove();
    });
    document.getElementById("pf-cookie-reject").addEventListener("click", function () {
      setConsent("rejected");
      banner.remove();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
