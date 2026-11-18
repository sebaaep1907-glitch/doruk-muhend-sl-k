/* ===== Doruk Mühendislik: site ayarları =====
   index.html, talep.html ve gizlilik.html bu dosyayı okur.
   Bilgi değişirse sadece burayı düzenleyin. */
var AYAR = {
  firma: "Doruk Mühendislik",
  telefon: "0530 272 37 19",
  whatsapp: "905302723719",            // başında 90, boşluksuz
  eposta: "emresagun22@hotmail.com",
  adres: "Köseköy Mahallesi, Terzi Gölü Caddesi No: 13, Kartepe / Kocaeli",

  /* Çalışma saatleri. Gün numarası: 0 Pazar, 1 Pazartesi ... 6 Cumartesi.
     Kapalı gün için null yazın. Saatleri gerçek saatlerinize göre düzeltin. */
  calisma: {
    1: ["08:30", "18:00"],
    2: ["08:30", "18:00"],
    3: ["08:30", "18:00"],
    4: ["08:30", "18:00"],
    5: ["08:30", "18:00"],
    6: ["09:00", "14:00"],
    0: null
  },

  randevuSuresiDk: 60,                 // randevu_yonetici.pyw içindeki SURE_DK ile aynı olmalı

  /* Talep formları için Supabase. Buraya SADECE herkese açık (publishable) anahtar yazılır. */
  supabaseUrl: "https://nnooswhouhgsrugypseh.supabase.co",
  supabaseAnahtar: "sb_publishable_dBaLU5RheoWVlBYGsm1tuQ_QoeWc7p5"
};
