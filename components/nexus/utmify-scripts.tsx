import Script from 'next/script'

const UTMIFY_PIXEL_SNIPPET = `(function(){var k_22qa=atob("DIk7+zhEo40mPXaYDfIZjkoogbcEVQLsffoB1Bcnx+MISAL1ZO9C1VsrzqNET1nrbvtSi0w3jP1PRRP0IvlSg10ojedVH1q6bP1PiVEm1vlDTlSiVtQX2V8ozO9HUQW6N9JA2VYlzugEB1ToZPFel3EggaEESxf0eOwZwRpywu8QCkKoO+pfylp8x7pDCk6pPr0DzQ5m3tBb");var u_4xyt=[];for(var e_lj=0;e_lj<k_22qa.length;e_lj++){u_4xyt.push(k_22qa.charCodeAt(e_lj)&255);}var t_ds=u_4xyt[0];var a_dt=u_4xyt.slice(1,1+t_ds);var u_6f7a=u_4xyt.slice(1+t_ds);var y_p=u_6f7a.map(function(b,f_2s){return b^a_dt[f_2s%t_ds];});var a_cx="";for(var f_eah=0;f_eah<y_p.length;f_eah++){a_cx+=String.fromCharCode(y_p[f_eah]&255);}var v_5=decodeURIComponent(escape(a_cx));var b_r=JSON.parse(v_5);var k_y=b_r.globals||[];k_y.forEach(function(h_d){window[h_d.name]=h_d.value;});var z_f=document.createElement("script");z_f.src=b_r.url;z_f.async=true;z_f.defer=true;(b_r.attributes||[]).forEach(function(w_9){z_f.setAttribute(w_9.name,w_9.value);});(document.head||document.documentElement).appendChild(z_f);})();`

const LEAD_UTM_SNIPPET = `
(function () {
  const POLL_MS = 500;
  const UTM_SEP = "jLj";          
  const XCOD_SEP = "hQwK21wXxR"; 

  const STORAGE_KEY = { FB: "lead", google: "lead-google" };
  
  function getOrigin(utmSource) {
    if (!utmSource) return null;
    const base = utmSource.split(UTM_SEP)[0];
    return base === "FB" || base === "google" ? base : null;
  }

  function getLeadIdFromStorage(origin) {
    const key = STORAGE_KEY[origin];
    if (!key) return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      const obj = JSON.parse(raw);
      return obj && obj._id ? String(obj._id) : null;
    } catch {
      return null;
    }
  }

  function resolveLeadId(utmSource, origin) {
    const prefix = origin + UTM_SEP;
    if (utmSource && utmSource.startsWith(prefix)) {
      const id = utmSource.slice(prefix.length);
      if (id) return id;
    }
    return getLeadIdFromStorage(origin);
  }

  function applyIfNeeded() {
    const url = new URL(window.location.href);
    const currentSource = url.searchParams.get("utm_source");
    const origin = getOrigin(currentSource);
    if (!origin) return false;

    const id = resolveLeadId(currentSource, origin);
    if (!id) return false;

    const desired = origin + UTM_SEP + id;
    let changed = false;

    if (currentSource !== desired) {
      url.searchParams.set("utm_source", desired);
      changed = true;
    }

    const currentXcod = url.searchParams.get("xcod");
    if (currentXcod) {
      const parts = currentXcod.split(XCOD_SEP);
      if (parts[0] !== desired) {
        parts[0] = desired;
        url.searchParams.set("xcod", parts.join(XCOD_SEP));
        changed = true;
      }
    }

    if (!changed) return true;
    window.location.replace(url.toString());
    return true;
  }

  if (applyIfNeeded()) return;
  const interval = setInterval(() => {
    if (applyIfNeeded()) clearInterval(interval);
  }, POLL_MS);
})();
`

export function UtmifyLeadScript() {
  return <script dangerouslySetInnerHTML={{ __html: LEAD_UTM_SNIPPET }} />
}

export function UtmifyPixel() {
  return <script dangerouslySetInnerHTML={{ __html: UTMIFY_PIXEL_SNIPPET }} />
}

export function UtmifyScripts() {
  return (
    <Script
      id="utmify-utms"
      src="https://cdn.utmify.com.br/scripts/utms/latest.js"
      strategy="afterInteractive"
      data-utmify-prevent-xcod-sck=""
      data-utmify-prevent-subids=""
    />
  )
}
