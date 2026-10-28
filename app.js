// Renders the page from window.SITE (site.config.js).
// You should not need to edit this file.
(function () {
  "use strict";

  var S = window.SITE || {};
  var b = S.business || {};
  var c = S.contact || {};
  var $ = function (id) { return document.getElementById(id); };

  // Build an element safely (text only, never raw HTML from the config).
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (attrs[k] !== undefined && attrs[k] !== "") node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (ch) {
      node.appendChild(typeof ch === "string" ? document.createTextNode(ch) : ch);
    });
    return node;
  }

  function hide(id) { var n = $(id); if (n) n.hidden = true; }

  // Only allow http(s) / relative links from the config.
  function safeUrl(u) {
    u = String(u || "").trim();
    if (!u) return "";
    // Absolute links must be http(s); anything without a scheme is a relative path.
    if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return /^https?:\/\//i.test(u) ? u : "";
    return u;
  }

  function waLink(text) {
    var num = String(c.whatsapp || "").replace(/\D/g, "");
    if (!num) return "";
    return "https://wa.me/" + num + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  function telLink() {
    var num = String(c.phone || "").replace(/[^\d+]/g, "");
    return num ? "tel:" + num : "";
  }

  // ---- Theme + meta ----
  var theme = S.theme || {};
  if (theme.accent) document.documentElement.style.setProperty("--accent", theme.accent);
  if (theme.font) {
    var font = String(theme.font).replace(/[^\w\s-]/g, "");
    document.head.appendChild(el("link", {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(font).replace(/%20/g, "+") + ":wght@400;600;700&display=swap",
    }));
    document.documentElement.style.setProperty("--font", '"' + font + '", system-ui, sans-serif');
  }
  document.title = b.name ? b.name + (b.tagline ? " — " + b.tagline : "") : "Business Website";
  document.querySelector('meta[name="description"]').setAttribute("content", b.about || b.tagline || "");

  // ---- Header ----
  var brand = $("brand");
  var logo = safeUrl(b.logo);
  if (logo) brand.appendChild(el("img", { src: logo, alt: "" }));
  brand.appendChild(document.createTextNode(b.name || ""));

  // ---- Hero ----
  $("hero-title").textContent = b.name || "";
  $("hero-tagline").textContent = b.tagline || "";
  var hero = safeUrl(b.heroImage);
  if (hero) {
    var h = $("hero");
    h.classList.add("has-image");
    h.style.backgroundImage = "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(\"" + hero.replace(/"/g, "%22") + "\")";
  }
  var actions = $("hero-actions");
  if (waLink()) actions.appendChild(el("a", { class: "btn", href: waLink("Hi " + (b.name || "") + ", "), target: "_blank", rel: "noopener" }, ["WhatsApp us"]));
  if (telLink()) actions.appendChild(el("a", { class: "btn ghost", href: telLink() }, ["Call " + c.phone]));

  // ---- About ----
  if (b.about) $("about-text").textContent = b.about; else hide("about");

  // ---- Repeating sections ----
  var services = S.services || [];
  services.forEach(function (s) {
    $("services-grid").appendChild(el("div", { class: "card" }, [el("h3", {}, [s.title || ""]), el("p", { class: "muted" }, [s.text || ""])]));
  });
  if (!services.length) hide("services");

  var gallery = (S.gallery || []).filter(function (g) { return safeUrl(g.src); });
  gallery.forEach(function (g) {
    $("gallery-grid").appendChild(el("img", { src: safeUrl(g.src), alt: g.alt || "", loading: "lazy" }));
  });
  if (!gallery.length) hide("gallery");

  var reviews = S.testimonials || [];
  reviews.forEach(function (t) {
    $("reviews-grid").appendChild(el("blockquote", { class: "card" }, [el("p", {}, ["“" + (t.text || "") + "”"]), el("cite", {}, ["— " + (t.name || "")])]));
  });
  if (!reviews.length) hide("reviews");

  // ---- Contact ----
  var list = $("contact-list");
  function row(label, value, href) {
    if (!value) return;
    list.appendChild(el("dt", {}, [label]));
    list.appendChild(el("dd", {}, [href ? el("a", { href: href }, [value]) : value]));
  }
  row("Phone", c.phone, telLink());
  row("Email", c.email, c.email ? "mailto:" + c.email : "");
  row("Address", c.address);

  var hours = S.hours || [];
  hours.forEach(function (h) {
    $("hours-table").appendChild(el("tr", {}, [el("td", {}, [h.days || ""]), el("td", {}, [h.time || ""])]));
  });
  if (!hours.length) hide("hours-block");

  var mapQ = c.mapQuery || c.address;
  if (mapQ) $("map").src = "https://maps.google.com/maps?q=" + encodeURIComponent(mapQ) + "&output=embed";
  else hide("map");

  // ---- Enquiry (opens WhatsApp with the message pre-filled; no server needed) ----
  var enq = S.enquiry || {};
  if (waLink()) {
    $("enquiry-heading").textContent = enq.heading || "Send us a message";
    $("enquiry-button").textContent = enq.button || "Send on WhatsApp";
    $("enquiry-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.target;
      var msg = "Hi " + (b.name || "") + ", I am " + f.name.value.trim() + ".\n\n" + f.message.value.trim();
      window.open(waLink(msg), "_blank", "noopener");
    });
    var fl = $("wa-float");
    fl.href = waLink("Hi " + (b.name || "") + ", ");
    fl.hidden = false;
  } else {
    hide("enquiry");
  }

  // ---- Nav (only sections that are showing) ----
  [["about", "About"], ["services", "Services"], ["gallery", "Gallery"], ["contact", "Contact"]].forEach(function (p) {
    if (!$(p[0]).hidden) $("nav").appendChild(el("a", { href: "#" + p[0] }, [p[1]]));
  });

  // ---- Footer ----
  $("copyright").textContent = "© " + new Date().getFullYear() + " " + (b.name || "");
  var soc = S.social || {};
  [["instagram", "Instagram"], ["facebook", "Facebook"], ["youtube", "YouTube"], ["google", "Google"]].forEach(function (p) {
    var u = safeUrl(soc[p[0]]);
    if (u) $("social").appendChild(el("a", { href: u, target: "_blank", rel: "noopener" }, [p[1]]));
  });

  // ---- Google structured data (helps show up in local search) ----
  var ld = {
    "@context": "https://schema.org",
    "@type": b.category || "LocalBusiness",
    name: b.name,
    description: b.about || b.tagline,
    telephone: c.phone || undefined,
    email: c.email || undefined,
    address: c.address || undefined,
    url: location.href.split("#")[0],
    openingHours: hours.map(function (h) { return h.days + " " + h.time; }),
    sameAs: Object.keys(soc).map(function (k) { return safeUrl(soc[k]); }).filter(Boolean),
  };
  var script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(ld);
  document.head.appendChild(script);
})();
