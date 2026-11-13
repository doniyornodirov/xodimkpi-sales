# DESIGN_PLAN.md — XodimKPI CRM Sotuv Sayti (V2) Dizayn Arxitekturasi

> **Hujjat maqsadi**: Ushbu hujjat XodimKPI CRM loyihasining sotuv sahifasi (`xodim-reyting-sales-v2` / `xodimkpi.uz`) dizayn tizimi, vizual standartlari, ranglar palitrasi, tipografiyasi, komponentlar tuzilishi va foydalanuvchi tajribasi (UX) qoidalarini kelgusida o'zgartirishlar kiritishda asrab qolish va xatoliklarga yo'l qo'ymaslik uchun yaratildi.

---

## 1. 🎯 MAQSAD VA ASOSIY FALSAFA (DESIGN PHILOSOPHY)

- **Auditoriya**: Paynet shaxobchalari egalari, mobil aloqa dilerlari (SIM-karta savdosi), bir nechta filialga ega kichik va o'rta biznes rahbarlari.
- **Dizayn uslubi**: Premium Dark-Mode SaaS (Vercel, Linear, Stripe uslubida toza, estetik, ko'zni charchatmaydigan qora va to'q ko'k ranglar uyg'unligi).
- **Psixologik yo'nalish**: 
  - Kassa kamomadi va adashib pul o'tkazish xavotirini yo'qotish (og'riq nuqtalariga to'g'ri yechim berish).
  - Boshlang'ich to'siqni kamaytirish: murakkab ma'lumotlar (masalan, Telegram Guruh ID yoki API kalitlar) so'ralmaydi.
  - Ishonch uyg'otish: 100% xavfsiz 7 kunlik bepul sinov (karta va oldindan to'lov talab qilinmaydi).
  - Mobil-birinchi (Mobile-First): Foydalanuvchilarning 80%+ qismi smartfondan (Telegram orqali) kirishi hisobga olingan.

---

## 2. 🔤 TIPOGRAFIYA VA SHRIFT TIZIMI (TYPOGRAPHY)

- **Asosiy shrift**: `'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Ruxsat etilgan shrift og'irliklari (Font Weights)**:
  - `400` — Asosiy matnlar (Body text, tushuntirishlar)
  - `500` — Kichik parametrlar, nishonlar (Sub-text, metadata)
  - `600` — Tugmalar, input labellar, kichik sarlavhalar
  - `700` — Asosiy sarlavhalar, e'tibor qaratiluvchi narxlar
  - ⚠️ **Qat'iy taqiq**: `800` va `900` kabi o'ta og'ir shriftlardan foydalanilmaydi (interfeys og'irlashib ketmasligi uchun).

### Shrift O'lchamlari Ierarxiyasi:
| Element | Desktop (> 860px) | Mobil (<= 480px) | Line Height |
| :--- | :--- | :--- | :--- |
| **Hero Headline** | `2.75rem` (44px) | `1.48rem` (23.6px) | `1.2` |
| **Section Title** | `2.00rem` (32px) | `1.35rem` (21.6px) | `1.25` |
| **Card Title** | `1.25rem` (20px) | `1.10rem` (17.6px) | `1.3` |
| **Body Lead** | `1.05rem` (16.8px) | `0.875rem` (14px) | `1.6` |
| **Normal Body** | `0.95rem` (15.2px) | `0.850rem` (13.6px) | `1.55` |
| **Micro / Footnote**| `0.825rem` (13.2px) | `0.775rem` (12.4px) | `1.45` |

---

## 3. 🎨 RANGLAR PALITRASI VA TOKENLAR (COLOR TOKENS)

### 3.1. Fon Ranglari (Backgrounds)
- `--bg-main`: `#0a0e17` — chuqur tungi asosiy fon.
- `--bg-card`: `rgba(18, 25, 41, 0.85)` — yarim shaffof kartalar foni.
- `--bg-card-hover`: `rgba(28, 38, 62, 0.95)` — kursor ustiga kelganda yorishuvchi holat.
- **Atmosfera gradientlari**: Sahifa bo'ylab sekin porlovchi 3 ta radial dog' (Cyan, Amber, Emerald).

### 3.2. Aktsent Ranglari (Accent & Brand Colors)
- **Cyan / Sky (Asosiy Brand & Texnologiya)**:
  - Qiymat: `#38bdf8` (Hover: `#0284c7`)
  - Glow effekti: `rgba(56, 189, 248, 0.25)`
  - Vazifasi: Jonli Demo tugmalari, audit tahlili, tizim belgilari.
- **Amber / Gold (Diqqat & Premium Litsenziyalar)**:
  - Qiymat: `#f59e0b` (Hover: `#d97706`)
  - Glow effekti: `rgba(245, 158, 11, 0.25)`
  - Vazifasi: VIP tarif, ariza yuborish tugmasi (`#modal-submit-btn`), ogohlantirishlar.
- **Emerald / Green (Xavfsizlik & 7 Kunlik Bepul Sinov)**:
  - Qiymat: `#10b981` (Hover: `#059669`)
  - Glow effekti: `rgba(16, 185, 129, 0.35)`
  - Vazifasi: 7 kunlik bepul sinov banneri, xavfsizlik kafolatlari, muvaffaqiyat belgilari.
- **Rose / Red (Xatolar & Kassa yo'qotishlari)**:
  - Qiymat: `#f43f5e`
  - Vazifasi: Kamomad, takroriy karta xatolarini vizuallashtirish.

### 3.3. Matn Ranglari (Text Contrast)
- `--text-main`: `#f1f5f9` (95% oq — asosiy o'qiladigan matn)
- `--text-muted`: `#94a3b8` (Kulrang-ko'k — ikkilamchi tushuntirishlar)
- `--text-dim`: `#64748b` (Pastki izohlar, mikro-matnlar)

### 3.4. Chegaralar va Radius (Borders & Radius)
- `--border-subtle`: `rgba(255, 255, 255, 0.08)`
- `--border-focus`: `rgba(56, 189, 248, 0.4)`
- `--radius-sm`: `8px`
- `--radius-md`: `14px` (Kartalar, tugmalar, modal oynalar uchun standart)
- `--radius-lg`: `20px` (Katta bo'lim bloklari)
- `--radius-full`: `9999px` (Pill badjlar)

---

## 4. 🧩 ASOSIY BLOKLAR VA KOMPONENTLAR TUZILMASI

### 4.1. Header & Navigatsiya
- Balandligi: `64px` (Desktop) / `56px` (Mobile).
- Shaffof shisha foni (`backdrop-filter: blur(12px)`).
- Chapda brend logotipi (`crm_logo_640x360.jpg`), sarlavha va "PAYNET & SIM-KARTA CRM" subtitri.
- O'ng tomonda ixcham `📱 Jonli Demo` tugmasi (barcha ekranlarda bir qatorda sig'adi).

### 4.2. Hero Bo'limi
- Qora kassa muammolariga qaratilgan og'riqli sarlavha:
  *"Filiallaringiz ko'paygani sari kassa va hisob-kitob nazoratdan chiqib ketyaptimi?"*
- 2 ta harakat chaqirig'i (CTA):
  - `Biznesingizni 3 Savolda Tekshiring` (Audit bo'limiga yo'naltiruvchi silliq scroll)
  - `📱 Bepul Jonli Demo Ko'rish` (Modal ochuvchi tugma)
- 3 ta ishonch kafolati (O'zbekcha PWA, Telegram bot, 1 haftada oqlash).

### 4.3. 1-Bosqich: Interaktiv Audit Kalkulyatori (Discovery Quiz)
- 3 ta interaktiv radio-tugmali savol:
  1. Shaxobchalar/xodimlar soni (1-5 ta, 6-15 ta, 16+ ta)
  2. Kassa qanday yuritilishi (Daftar/Excel, Boshqa dastur, Faqat chek)
  3. Eng katta og'riq (Karta adashishi, SIM-karta yo'qolishi, Kunlik hisobot kechikishi)
- **Natija kartasi**:
  - Tavsiya etilgan tarif badji
  - Oyiga tejaladigan taxminiy summa (masalan: `3 800 000 so'm / oy`)
  - Tejaladigan vaqt (`1.5 - 2.5 soat / kun`)
  - "0 ta kassa kamomadi" kafolati
  - `🎯 Ushbu yechim bo'yicha jonli demo ko'rish` tugmasi.

### 4.5. 2-Bosqich: 3 Rol Imkoniyatlari (Role Tabs Showcase)
- Rollar: **Rahbar (Boshqaruv)**, **Xodim (Kassir/Sotuvchi)**, **Dasturchi/Audit**.
- Tab tugmalari mobil qurilmalarda gorizontal scroll bo'ladi, tanlanganda markazga silliq suriladi.
- Har bir panelda vizual kartalar va PWA ekran namunasi ko'rsatiladi.

### 4.5. 3-Bosqich: Xavfsizlik va Kafolatlar (Security Grid)
- 4 ta asosiy ustun:
  - 60 soniyali Telegram OTP login kodi
  - Rahbar kursi va +3% yaxlitlash
  - Audit log (o'chirish/o'zgartirishlar tarixini saqlash)
  - Har kuni soat 20:00 da Telegramga .xlsx va .db zahira yuborish.

### 4.6. 4-Bosqich: E'tirozlar va Yechimlar (Accordion FAQ)
- Mijozlarning odatiy shubhalariga aniq javoblar.
- Accordion printsipi: Bir vaqtning o'zida faqat 1 ta akkordeon ochiq bo'ladi (kichik displeylarda sahifaning ortiqcha cho'zilib ketishining oldini oladi).

### 4.7. 5-Bosqich: Tariflar va Narxlar (Pricing)
- **1 Yillik Tarif (25 tagacha xodim — 6 240 000 so'm / yil)** — Asosiy "🔥 TAVSIYA ETILADI — 25 XODIM" yaltirab turuvchi karta. CRMning barcha imkoniyatlari 100% ochiq.
- **1 Yillik Standart (15 tagacha xodim — 4 800 000 so'm / yil)** — O'sib borayotgan jamoalar uchun.
- **5 Yillik VIP Litsenziya (Cheksiz xodimlar — 14 900 000 so'm)** — Katta filial tarmoqlari va cheksiz erkinlik uchun.
- **Oylik Tarif (500 000 so'm / oy)** — Standart ko'rinishda yashiringan, faqat `Oylik obunani ko'rish ⌵` tugmasi bosilganda silliq ochiladi.

### 4.8. 6-Bosqich: 7 Kunlik Bepul Sinov Taklifi (Downsell Offer Banner)
- Agar mijoz narxdan ikkilansa, to'g'ridan-to'g'ri unga 100% xavfsiz bepul sinov taklif qilinadi.
- 3 ta afzallik: Barcha 10 ta rahbar moduli ochiq, 0 so'm xarajat, 15 daqiqada ulanish.
- **TUGMA JOYLASHUVI**:
  - `.trial-cta-wrap` — `flex-direction: column; align-items: center; justify-content: center; text-align: center;`.
  - `🎁 7 Kunlik Bepul Obunani Sinab Ko'rish` tugmasi to'g'ridan-to'g'ri blokning markazida joylashgan.
  - Tugma ostida markazda mikro-matn: `🔒 0 so'm to'lov • Karta kiritilmaydi • Istalgan payt to'xtatish imkoniyati`.

### 4.9. 7-Bosqich: Sahifadagi Tezkor Ulanish Shakli (Inline Onboarding Form)
- Antigravity qutisi: *"Birinchi qadam uchun menga ismingiz va Telegram usernamengizni aytsangiz bas — tizimni bir necha daqiqada sizga ko'rsatib beramiz!"*.
- **Maydonlar (Aniq 4 ta element — 2x2 grid desktopda, 1 ustun mobilda)**:
  1. `Ismingiz *` (`#inline-comp`, placeholder: `Ismingizni kiriting (Masalan: Sardor)`)
  2. `Telegram usernamengiz *` (`#inline-lead-tg`, placeholder: `Masalan: @username`)
  3. `Telefon Raqamingiz *` (`#inline-phone`, placeholder: `+998 90 123 45 67`)
  4. `Qiziqtirayotgan Tarif` (`#inline-plan`, 5 variant: 7 kunlik sinov, VIP, 1 yillik 25 xodim, 1 yillik 15 xodim, Oylik)
- ⚠️ **Kiritilmasligi shart bo'lgan maydonlar**: "Hisobot boradigan guruh ID" yoki "Kompaniya nomi" maydonlari olib tashlangan, chunki bu savollarni bilmaslik konversiyani 60% gacha pasaytiradi.

### 4.10. Modal Oyna (Buyurtma va Jonli Demo)
- Barcha "Jonli Demo" yoki "Tarifni Tanlash" tugmalari bosilganda ochiladi.
- Tanlangan tarif avtomatik tanlanadi va ixcham toza `<select>` orqali ko'rsatiladi (`🎁 7 Kunlik Bepul Sinov`, `⭐ 5 Yillik VIP`, `🔥 1 Yillik (25 xodim)`, `⚡ 1 Yillik (15 xodim)`, `📅 Oylik`).
- Maydonlar:
  1. `Ismingiz *` (`#field-company`)
  2. `Telefon Raqamingiz *` (`#field-phone`)
  3. `Telegram usernamengiz` (`#field-telegram`)
  4. `Tanlangan Tarif` (`#modal-plan-select`, toza va ixcham tanlov)
  5. `🚀 Yuborish & Dasturchi Bilan Bog'lanish` tugmasi.

### 4.11. Smart Floating Downsell Toast (Nudge Toast)
- O'ng burchakda (mobilda pastki qismda) qalqib chiquvchi ixcham taklif:
  *"Ikkilanyapsizmi? 7 kun bepul sinab ko'ring!"*
- 3 ta trigger orqali ishga tushadi:
  1. Narxlar bo'limidan o'tib ketganda (scroll trigger)
  2. Sahifani tark etishga uringanda (desktop exit-intent)
  3. 35 soniya davomida faoliyat bo'lmaganda (reading timer)

---

## 5. 📱 MOBIL VA KICHIK EKRANLAR MOSLASHUVI (RESPONSIVENESS)

Sayt quyidagi 4 ta asosiy rezolyutsiyada sinovdan o'tkazilgan va to'liq optimallangan:

1. **Katta Desktoplar (> 860px)**:
   - 2 va 3 ustunli to'liq gridlar, 1160px markaziy konteyner.
2. **Planshet va Kichik Noutbuklar (481px — 860px)**:
   - Gridlar 1 yoki 2 ustunga qisqaradi, audit kalkulyatori vertikal tartiblanadi.
3. **Standart Smartfonlar (361px — 480px)**:
   - Paddinglar `14px`, shriftlar mutanosib ravishda ixchamlashadi.
   - Sarlavhalar matn sinishi o'rganilgan, tugmalar to'liq kenglikka yoki markaziy holatga moslangan.
4. **Ultra-Kompakt Smartfonlar (<= 360px - masalan iPhone SE 1-avlod)**:
   - Paddinglar `10px`, font o'lchamlari kichraytirilgan, gorizontal skroll butunlay bloklangan (`overflow-x: hidden`).
   - Footer barcha displeylarda sahifa oxirida xalaqit bermay to'liq ko'rinadi.

---

## 6. 🚀 TELEGRAM BILAN BOG'LANISH STANDARTI

Barcha arizalar quyidagi formatda to'g'ridan-to'g'ri dasturchining Telegramiga (`https://t.me/doniyornodirov`) yuboriladi:

```text
🚀 Yangi CRM Buyurtmasi (Sotuv Sayti V2)

👤 Ism: Sardor
📱 Telegram: @sardor_lead
📞 Telefon: +998 90 123 45 67
📦 Tanlangan Tarif: 🔥 1 Yillik Tarif (4.8 mln / yil)

_Tizimni ulash va jonli ko'rsatish uchun so'rov yuborildi._
```

Agar 7 kunlik sinov tanlansa:
```text
🎁 Yangi So'rov: 7 KUNLIK BEPUL SINOV (Test-Drive)

👤 Ism: Jasur
📱 Telegram: @jasur_paynet
📞 Telefon: +998 91 999 88 77
📦 Tanlangan Tarif: 🎁 7 Kunlik Sinov (0 so'm)

_7 kunlik 100% bepul litsenziyani ulab berish uchun so'rov qoldirildi._
```

---

## 7. 🔒 SAQLANISHI SHART BO'LGAN QOIDALAR (NEVER BREAK)

1. **Asosiy CRM loyihasiga tegmaslik**: `c:\Users\Doniyor\Xodim-reyting` loyihasi asosiy yadro hisoblanadi va sotuv sahifasi tahrirlanganda u 100% toza saqlanishi shart.
2. **Kesh versiyalash (Cache Busting)**: `index.html` ichidagi `css/style.css?v=X.XX` va `js/script.js?v=X.XX` parametrlarini har qanday o'zgarishda oshirib borish (mijozlarning brauzerida eski kesh qolib ketmasligi uchun).
3. **Formani murakkablashtirmaslik**: Guruh ID, Telegram Token, Parol kabi narsalarni sotuv sahifasida so'rash taqiqlanadi. Faqat: **Ism**, **Telegram username**, **Telefon** va **Tarif**.
4. **Tugmalarning markazda turishi**: 7 kunlik bepul sinov blokidagi tugma doimo markazda, kafolat yozuvi bilan birga saqlanadi.

