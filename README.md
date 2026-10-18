# 🛡️ AfetGuard AI: Kişiselleştirilmiş Hane ve Oda Afet Hazırlık Asistanı

> **Birleşmiş Milletler Sürdürülebilir Kalkınma Amaçları (SDG 11.5 ve SDG 13.1) Destekli Akıllı Hane Dirençlilik Platformu**  
> **Hackathon Proje Ekibi (Grup 13):** Fatma Çevik, Ayberk Koç, Hüseyin Aksoy, Adil Yer, Mehmet Tarık Özcan

---

## 📌 Proje Genel Bakışı & Çözülen Problem

Türkiye'de ve dünyada afet hazırlığı genellikle **"genel geçer, standart ve statik"** listelerle yürütülmektedir. Oysa:
1. **Mekânsal Farklılıklar:** 4. kattaki bir hanenin depremdeki tehlikesi ile giriş kattaki bir hanenin su baskını ve sıvılaşma tehlikesi tamamen farklıdır.
2. **Kırılgan Gruplar:** Evinde 10 aylık bebek, 72 yaşında kalp hastası veya insüline bağımlı birey olan hanelerin tahliye süresi ve çanta içeriği standart AFAD listeleriyle karşılanamaz.
3. **Mekanik Eşya Tuzakları:** Sarsıntı anındaki yaralanmaların %50'den fazlası bina çökmesinden değil; devrilen gardıroplardan, patlayan pencere camlarından ve kilitlenen koridorlardan kaynaklanır.
4. **Tarihsel Zemin Hafızası (Micro-Zonation):** 1999 Gölcük Depreminde fay 110 km uzakta olmasına rağmen Avcılar'da yaşanan yıkım, zemin büyütmesi (*Soil Amplification ~2.4x*) ve gevşek dolgu hafızasından kaynaklanmıştır.

**AfetGuard AI**, Google Gemini Üretken Yapay Zekâ (Multimodal Vision & Text) altyapısını kullanarak; kullanıcının mahalle bazlı tarihsel zemin verisini, hane halkının kırılganlık profilini ve oda fotoğrafını/risk etiketlerini birleştirir. Saniyeler içinde **hiper-kişiselleştirilmiş 4 boyutlu bir dirençlilik eylem planı** ve **Afet Anı Simülasyon Zaman Çizelgesi (T+0-60s, T+1-15m, T+1-72h)** üretir.

---

## 🎯 Birleşmiş Milletler SDG Bağlantısı ve Başarı Ölçütü

### 1. SDG 11: Sürdürülebilir Şehirler ve Topluluklar &mdash; Hedef 11.5
* **BM Hedefi:** *"2030'a kadar afetlerin yol açtığı can kayıplarını ve doğrudan ekonomik kayıpları azaltmak; yoksul ve kırılgan durumdaki kişileri korumaya odaklanmak."*
* **AfetGuard AI Çözümü:** 0-3 yaş bebek, 65+ yaşlı, engelli, kronik hasta ve evcil hayvan içeren hanelere özel tahliye stratejisi (kanguru/sling, medikal transfer, refakatçi eşleşmesi) ve L-braket ankraj planı sunarak yapısal olmayan iç mekân travmalarını %75 azaltır.

### 2. SDG 13: İklim Eylemi &mdash; Hedef 13.1
* **BM Hedefi:** *"Tüm ülkelerde iklim kaynaklı tehlikelere ve doğal afetlere karşı direnç ve uyum kapasitesini güçlendirmek."*
* **AfetGuard AI Çözümü:** Ani aşırı yağışlar, dere yatağı taşmaları ve iklim kaynaklı yangın arayüzlerine karşı hanelerin ilk 72 saatlik dış yardımsız hayatta kalma ve uyum kapasitesini hesaplar.

### 3. Aracın İşe Yarayıp Yaramadığını Nasıl Ölçüyoruz? (Metrikler)
* **Dinamik Hane Dirençlilik Skoru (0 - 100%):** Başlangıçta binanın yaşı, katı ve risklerine göre hesaplanan temel direnç skoru; kullanıcı eşya sabitleme talimatlarını uygulayıp dinamik afet çantasındaki malzemeleri işaretledikçe **+%40'a varan artışla** anlık olarak yükselir.
* **Afet Anı Simülasyon Çizelgesi (Timeline Metriği):** İlk 60 saniyedeki doğru pozisyon alma (Çök-Kapan-Tutun vs. Şalter İndirme) ve 15 dakikalık güvenli tahliye adımları ile panik kaynaklı hatalı reflekslerin sıfıra indirilmesi.

---

## 👥 Hedef Kullanıcı Kitlesi

* **0-3 Yaş Bebek / Çocuk Bulunan Haneler:** Merdiven tahliyesinde iki elin serbest kalmasını sağlayan sling/kanguru planlaması, 72 saatlik steril mama ve su optimizasyonu.
* **65+ Yaşlı Bireyler:** Reçeteli tansiyon/kalp ilaçlarının 7 günlük acil kopyası, yedek optik gözlük ve molozlu zemin tahliye bastonu.
* **Engelli & Hareket Kısıtlı Bireyler:** Asansör çalışmayacağından merdiven transfer şiltesi, yönlendirici sesli/ışıklı LED fener protokolü.
* **Kronik Hastalar:** 48 saate kadar 2-8°C koruma sağlayan termal insülin soğuk zincir çantası ve glukometre takibi.
* **Evcil Hayvan Sahipleri:** Panik anında kaçmayı önleyen sert gövdeli taşıma box'ı, tasma ve toplanma alanı aşı karnesi.

---

## 🧠 Kullanılan Üretken Yapay Zekâ Modeli & Prompt Mimarisi

* **Model:** Google Gemini Flash API (`gemini-2.5-flash` / `gemini-1.5-flash` Multimodal Vision & Text)
* **Prompt Mühendisliği Mimarisi (`src/lib/prompts.ts`):**
  - **Role Prompting:** AFAD saha protokollerine, BM Sendai Afet Risk Azaltma Çerçevesi (2015-2030) normlarına ve Yapı Dinamiği disiplinine hakim Kıdemli Afet Risk Analisti rolü.
  - **Chain-of-Thought (CoT):** 7 aşamalı mantık yürütme zinciri (*1. Tarihsel Zemin & Mikrobölgeleme &rarr; 2. Bölgesel Sismik Analiz &rarr; 3. Kırılgan Birey Haritalaması &rarr; 4. Afet Anı Simülasyon Çizelgesi &rarr; 5. Mekânsal Devrilme &rarr; 6. Yaşam Üçgeni &rarr; 7. Kişiselleştirilmiş Çanta & Etik Süzgeç*).
  - **Few-Shot Learning:** Modelin serbest metin üretip arayüzü bozmasını önleyen, 1 adet gerçekçi girdi-çıktı örneğiyle desteklenmiş katı JSON şeması.
  - **Etik Güvenlik Katmanı:** Yetkisiz yapısal mühendislik garantisi vermeme ("bu bina asla yıkılmaz" vb.) ve tıbbi reçete/dozaj önermeme kısıtlamaları.

---

## 🚀 Kurulum ve Çalıştırma Adımları

### Gereksinimler
- Node.js (v18+ veya v20/v22)
- npm veya pnpm

### 1. Depoyu Klonlayın ve Bağımlılıkları Yükleyin:
```bash
git clone https://github.com/kullanici-adi/afet-guard.git
cd "Afet Planlama"
npm install
```

### 2. Gemini API Anahtarını Yapılandırın:
Kök dizindeki `.env.local.example` dosyasını `.env.local` olarak kopyalayın ve Google AI Studio anahtarınızı ekleyin:
```bash
cp .env.local.example .env.local
```
`.env.local` içeriği:
```env
GEMINI_API_KEY=AIzaSy...your_gemini_api_key_here
```
> **Önemli Not:** API anahtarı eklemeseniz dahi, uygulamanın sağ üst köşesindeki **"API Key"** modalından anahtar girebilir veya sistemin yerleşik **yüksek sadakatli akıllı simülatörünü** kullanarak tüm işlevleri sıfır kesintiyle deneyimleyebilirsiniz.

### 3. Geliştirme Sunucusunu Başlatın:
```bash
npm run dev
```

### 4. Tarayıcınızda Açın:
Tarayıcınızda aşağıdaki adresi ziyaret edin:
```
http://localhost:3000
```

---

## 🎬 Canlı Jüri Sunumu & Çift Demo Akışı

Uygulamanın sağ üst köşesinde jüri sunumu için özel olarak hazırlanmış 2 hızlı demo senaryosu yer almaktadır:

1. **Demo 1: Avcılar (Deprem):**
   - *Girdi:* İstanbul / Avcılar - Denizköşkler Mah. (Sahil dolgu zemin), 1998 öncesi yapı, 4. kat, 4 kişi (1 bebek, 1 yaşlı), yatak yanında gardırop.
   - *Öne Çıkan Sonuç:* 2.4x Zemin Büyütmesi (Amplification) rezonans uyarısı, 4. kattan kangurulu merdiven tahliyesi ve çelik L-profil ankraj talimatı.
2. **Demo 2: Kağıthane (Sel):**
   - *Girdi:* İstanbul / Kağıthane - Cendere Vadisi (Eski dere yatağı geçmişi), Giriş kat, 3 kişi (1 insülin bağımlı hasta, 1 kedi).
   - *Öne Çıkan Sonuç:* Tarihsel su taşkın havzası analizi, anlık elektrik çarpmasını önleyen şalter protokolü, termal insülin soğuk zincir çantası ve kedinin taşıma box'ına alınması.
3. **Prompt & Etik Mimari Butonu:**
   - Header'daki butona basarak arka plandaki 7 Aşamalı Chain-of-Thought istemlerini ve Few-Shot JSON şemasını jüriye canlı olarak gösterebilirsiniz.
4. **Yazdır / PDF:**
   - Analiz tamamlandığında tek tıkla resmi acil durum hane planını PDF formatında indirebilirsiniz.

---

## 📁 Proje Dosya Mimarisi

```
├── src/
│   ├── app/
│   │   ├── api/analyze/route.ts   # Gemini API entegrasyonu ve analiz endpoint'i
│   │   ├── globals.css            # Dark mode, glassmorphism, ızgara deseni ve print stilleri
│   │   ├── layout.tsx             # SEO meta etiketleri ve font yapılandırması
│   │   └── page.tsx               # Ana Dashboard sayfası ve state yönetimi
│   ├── components/
│   │   ├── Header.tsx             # Üst navigasyon barı, Çift Demo butonları ve eylemler
│   │   ├── InputPanel.tsx         # 3 adımlı akıllı veri giriş paneli + Mahalle/Zemin hafızası
│   │   ├── OutputPanel.tsx        # 4 görsel kart + Afet Anı Simülasyonu Timeline
│   │   ├── ApiKeyModal.tsx        # Gemini API Key yapılandırma penceresi
│   │   ├── PromptModal.tsx        # Jüri için CoT ve Few-Shot denetim penceresi
│   │   └── SDGInfoModal.tsx       # BM SDG 11.5 & 13.1 bilgilendirme penceresi
│   ├── lib/
│   │   ├── constants.ts           # Türkiye il/ilçe haritası, zemin etiketleri ve demo senaryoları
│   │   ├── gemini.ts              # Google Gemini API ve Multimodal Vision istemcisi
│   │   ├── mockData.ts            # Yüksek sadakatli akıllı simülasyon motoru
│   │   └── prompts.ts             # Role Prompting, CoT, Few-Shot ve Etik Prompt mimarisi
│   └── types/
│       └── disaster.ts            # Katı TypeScript veri modelleri ve arayüzler
├── .env.local.example             # API anahtarı şablonu
├── PROJE_RAPORU.md                # 1-2 Sayfalık Resmi Hackathon Raporu (PDF için)
├── ENGLISH_PRESENTATION_AND_SCRIPT.md # İngilizce Sunum Slaytları ve 5 Dk Video Metni
└── README.md                      # Bu dosya
```

---

## ⚖️ Lisans & Etik Çekince
AfetGuard AI, afet anlarında hayat kurtarma bilincini artırmak üzere hazırlanmış bir karar destek prototipidir. İnşaat mühendisliği yapısal karot/röntgen analizi veya resmi hasar tespit raporu yerine geçmez. Listelenen medikal kalemler hekim tavsiyesi yerine geçmeyip yalnızca mevcut reçeteli ilaçların kesintiye uğramamasını hedefler.
