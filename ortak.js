/* Doruk Mühendislik: tüm sayfalarda ortak davranışlar */
(function () {
  "use strict";
  var A = window.AYAR || {};
  var TZ = "Europe/Istanbul";
  var GUN = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  var HAFTA = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  function qa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function q(s, r) { return (r || document).querySelector(s); }

  /* Ziyaretçi nerede olursa olsun saat İstanbul saatine göre hesaplanır. */
  function ist(d) {
    var f = new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ, weekday: "short", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    });
    var o = {};
    f.formatToParts(d || new Date()).forEach(function (p) { o[p.type] = p.value; });
    return { gun: HAFTA[o.weekday], dk: (+o.hour) * 60 + (+o.minute), tarih: o.year + "-" + o.month + "-" + o.day };
  }
  function dkOf(s) { var p = s.split(":"); return (+p[0]) * 60 + (+p[1]); }
  function telHam() {
    var n = String(A.telefon || "").replace(/\D/g, "");
    if (n.charAt(0) === "0") n = n.slice(1);
    return "+90" + n;
  }

  function durum() {
    var n = ist(), c = A.calisma || {}, bugun = c[n.gun];
    if (bugun && n.dk >= dkOf(bugun[0]) && n.dk < dkOf(bugun[1])) {
      return { acik: true, metin: "Şu an açık, kapanış " + bugun[1] };
    }
    for (var i = 0; i <= 7; i++) {
      var g = (n.gun + i) % 7, h = c[g];
      if (!h) continue;
      if (i === 0 && n.dk >= dkOf(h[1])) continue;
      var gunAd = i === 0 ? "bugün" : (i === 1 ? "yarın" : GUN[g]);
      return { acik: false, metin: "Şu an kapalı, açılış " + gunAd + " " + h[0] };
    }
    return { acik: false, metin: "Şu an kapalı" };
  }

  function saatTablosu() {
    var govde = q("[data-saatler]");
    if (!govde) return;
    var n = ist(), c = A.calisma || {}, sira = [1, 2, 3, 4, 5, 6, 0], html = "";
    sira.forEach(function (g) {
      var h = c[g];
      html += '<tr' + (g === n.gun ? ' class="bugun"' : "") + "><td>" + GUN[g] + "</td><td>" +
        (h ? h[0] + " – " + h[1] : "Kapalı") + "</td></tr>";
    });
    govde.innerHTML = html;
  }

  function durumYaz() {
    var d = durum();
    qa("[data-durum]").forEach(function (e) {
      e.textContent = d.metin;
      e.setAttribute("data-acik", d.acik ? "1" : "0");
    });
    saatTablosu();
  }

  function bagla() {
    qa("[data-tel]").forEach(function (a) { a.href = "tel:" + telHam(); });
    qa("[data-tel-yazi]").forEach(function (e) { e.textContent = A.telefon; });
    qa("[data-wp]").forEach(function (a) {
      a.href = "https://wa.me/" + A.whatsapp;
      a.target = "_blank";
      a.rel = "noopener";
    });
    qa("[data-mail]").forEach(function (a) { a.href = "mailto:" + A.eposta; });
    qa("[data-mail-yazi]").forEach(function (e) { e.textContent = A.eposta; });
    qa("[data-adres]").forEach(function (e) { e.textContent = A.adres; });
    qa("[data-firma]").forEach(function (e) { e.textContent = A.firma; });
    qa("[data-yil]").forEach(function (e) { e.textContent = ist().tarih.slice(0, 4); });
    qa("[data-yol]").forEach(function (a) {
      a.href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(A.adres);
      a.target = "_blank";
      a.rel = "noopener";
    });
    var h = q("[data-harita]");
    if (h) h.src = "https://maps.google.com/maps?q=" + encodeURIComponent(A.adres) + "&z=15&output=embed";
  }

  function menu() {
    var b = q(".menu-btn"), hd = q(".hd");
    if (!b || !hd) return;
    function kapat() { hd.classList.remove("acik"); b.setAttribute("aria-expanded", "false"); }
    b.addEventListener("click", function () {
      var a = hd.classList.toggle("acik");
      b.setAttribute("aria-expanded", a ? "true" : "false");
    });
    qa(".nav a").forEach(function (a) { a.addEventListener("click", kapat); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") kapat(); });
  }

  /* Koyu / açık tema: seçim tarayıcıda saklanır, seçilmediyse cihaz ayarına uyar. */
  function tema() {
    var b = q(".tema-btn"), k = document.documentElement;
    var meta = q('meta[name="theme-color"]');
    function guncelle() {
      var koyu = k.dataset.tema === "dark";
      if (b) {
        b.setAttribute("aria-pressed", koyu ? "true" : "false");
        b.setAttribute("aria-label", koyu ? "Açık temaya geç" : "Koyu temaya geç");
      }
      if (meta) meta.setAttribute("content", koyu ? "#0A1424" : "#0B5FFF");
    }
    guncelle();
    if (b) b.addEventListener("click", function () {
      k.dataset.tema = k.dataset.tema === "dark" ? "light" : "dark";
      try { localStorage.setItem("tema", k.dataset.tema); } catch (e) {}
      guncelle();
    });
    try {
      var mq = matchMedia("(prefers-color-scheme: dark)");
      var dinle = function (e) {
        var kayit = null;
        try { kayit = localStorage.getItem("tema"); } catch (x) {}
        if (!kayit) { k.dataset.tema = e.matches ? "dark" : "light"; guncelle(); }
      };
      if (mq.addEventListener) mq.addEventListener("change", dinle);
    } catch (e) {}
  }

  window.DORUK = { ist: ist, dk: dkOf, durum: durum, telHam: telHam, TZ: TZ, GUN: GUN };

  bagla();
  durumYaz();
  menu();
  tema();
  setInterval(durumYaz, 60000);
})();
