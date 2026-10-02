/* Aviso de cookies de PlantillaFactura.
   - Se muestra una sola vez; la elección se guarda en el navegador (localStorage).
   - Si el visitante rechaza, se piden a Google anuncios no personalizados.
   - Si Google muestra su propio mensaje de consentimiento (.fc-consent-root),
     este aviso se retira solo para que no salgan dos. */
(function () {
  var KEY = "pf_cookies_v1";
  var script = document.currentScript;
  var policyUrl = "politica-privacidad.html";
  if (script && script.src) {
    try {
      var u = new URL(script.src);
      policyUrl = u.pathname.replace(/assets\/cookies\.js$/, "politica-privacidad.html");
    } catch (e) {}
  }

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function applyChoice(v) {
    if (v === "rejected") {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.requestNonPersonalizedAds = 1;
    }
  }

  var css = ".pf-ck{position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:2147483000;max-width:640px;margin:0 auto;" +
    "background:#16222E;color:#fff;border-radius:14px;padding:1.1rem 1.25rem;box-shadow:0 18px 40px -16px rgba(0,0,0,.5);" +
    "font:15px/1.5 Inter,system-ui,sans-serif}" +
    ".pf-ck p{margin:0 0 .9rem}.pf-ck a{color:#F7EDD3}" +
    ".pf-ck-b{display:flex;gap:.6rem;flex-wrap:wrap}" +
    ".pf-ck button{font:inherit;font-weight:600;cursor:pointer;border-radius:10px;padding:.6rem 1.2rem;border:1px solid #fff;background:transparent;color:#fff}" +
    ".pf-ck button.pf-ok{background:#C9962E;border-color:#C9962E;color:#16222E}" +
    ".pf-ck button:focus-visible{outline:2px solid #F7EDD3;outline-offset:2px}";

  var box = null;

  function close(v) {
    save(v);
    applyChoice(v);
    if (box && box.parentNode) box.parentNode.removeChild(box);
    box = null;
  }

  function show() {
    if (box || document.querySelector(".fc-consent-root")) return;
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);
    box = document.createElement("div");
    box.className = "pf-ck";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Aviso de cookies");
    box.innerHTML =
      "<p>Usamos cookies propias y de terceros (Google) para el funcionamiento de la web, medir el tráfico y, " +
      "si lo aceptas, mostrar publicidad personalizada. Más información en nuestra " +
      "<a href=\"" + policyUrl + "\">política de cookies</a>.</p>" +
      "<div class=\"pf-ck-b\"><button type=\"button\" class=\"pf-ok\">Aceptar</button>" +
      "<button type=\"button\" class=\"pf-no\">Rechazar</button></div>";
    box.querySelector(".pf-ok").addEventListener("click", function () { close("accepted"); });
    box.querySelector(".pf-no").addEventListener("click", function () { close("rejected"); });
    document.body.appendChild(box);
  }

  function addFooterLink() {
    var f = document.querySelector("footer .wrap > div:last-child");
    if (!f || f.querySelector(".pf-ck-link")) return;
    var a = document.createElement("a");
    a.href = "#";
    a.className = "pf-ck-link";
    a.textContent = "Cookies";
    a.addEventListener("click", function (e) { e.preventDefault(); show(); });
    f.appendChild(a);
  }

  function init() {
    addFooterLink();
    var saved = read();
    if (saved) { applyChoice(saved); return; }
    show();
    /* Si más tarde aparece el mensaje de Google, retiramos el nuestro. */
    new MutationObserver(function () {
      if (box && document.querySelector(".fc-consent-root")) {
        box.parentNode.removeChild(box);
        box = null;
      }
    }).observe(document.body, { childList: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
