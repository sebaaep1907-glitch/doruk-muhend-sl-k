/* ====== DORUK MÜHENDİSLİK - SİTE AYARLARI ======
   Hem index.html hem talep.html bu dosyayı kullanır. */
const AYAR = {
  firma: "Doruk Mühendislik",
  telefon: "0530 272 37 19",
  whatsapp: "905302723719",          // başında 90, boşluksuz
  eposta: "emresagun22@hotmail.com",
  adres: "Köseköy Mahallesi, Terzi Gölü Caddesi No: 13, Kartepe / Kocaeli",
  saatler: "Hafta içi 08:30 - 18:00, Cumartesi 09:00 - 14:00",
  randevuSuresiDk: 60,               // randevu_yonetici.pyw içindeki SURE_DK ile aynı olmalı

  /* Talep formları için (kurulum adımlarına bak):
     Supabase > Project Settings > API: Project URL ve "anon / publishable" anahtar.
     DİKKAT: buraya SADECE herkese açık anahtarı yaz, gizli (secret/service_role) anahtarı ASLA. */
  supabaseUrl: "https://nnooswhouhgsrugypseh.supabase.co",
  supabaseAnahtar: "sb_publishable_dBaLU5RheoWVlBYGsm1tuQ_QoeWc7p5"
};
