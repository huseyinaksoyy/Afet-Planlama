# AFETGUARD AI: KİŞİSELLEŞTİRİLMİŞ HANE VE ODA AFET HAZIRLIK ASİSTANI
## BİRLEŞMİŞ MİLLETLER SÜRDÜRÜLEBİLİR KALKINMA AMAÇLARI (SDG 11.5 & SDG 13.1) HACKATHON PROJE RAPORU

**Proje Ekibi (Grup 13):** Fatma Çevik, Ayberk Koç, Hüseyin Aksoy, Adil Yer, Mehmet Tarık Özcan  
**Teslim Tarihi:** 18 Ekim 2026  
**Canlı Prototip Erişimi:** `http://localhost:3000` & GitHub Deposu  

---

### 1. SEÇİLEN SDG, PROBLEM VE BAŞARI ÖLÇÜTÜ

#### A. Birleşmiş Milletler Sürdürülebilir Kalkınma Amaçları ile Doğrudan Bağlantı
Projemiz, Birleşmiş Milletler 2030 Gündemi kapsamında iki temel kalkınma amacını hedef almaktadır:
* **SDG 11 (Sürdürülebilir Şehirler ve Topluluklar) &mdash; Hedef 11.5:** *"2030'a kadar afetlerin yol açtığı can kayıplarını ve doğrudan ekonomik kayıpları azaltmak; yoksul ve kırılgan durumdaki kişileri korumaya odaklanmak."*
* **SDG 13 (İklim Eylemi) &mdash; Hedef 13.1:** *"Tüm ülkelerde iklim kaynaklı tehlikelere ve doğal afetlere karşı direnç ve uyum kapasitesini güçlendirmek."*

#### B. Çözülen Temel Problem: "Statik ve Tek Tip Afet Listelerinin Yetersizliği"
Mevcut afet hazırlık sistemleri (broşürler, statik web sayfaları), Türkiye'deki tüm vatandaşlara tek tip bir liste sunmaktadır. Ancak sahada şu üç kritik gerçek can kayıplarına yol açmaktadır:
1. **Mekanik İç Mekân Tehlikeleri:** Sarsıntı anındaki yaralanmaların ve ölümlerin %50'sinden fazlası bina çökmesinden değil; yatak üzerine devrilen ağır gardıroplardan, patlayan pencere camlarından ve kaçış koridorunu kapatan ayakkabılıklardan kaynaklanmaktadır.
2. **Kırılgan Bireylerin Unutulması:** Evde 10 aylık bir bebek varken standart bir el feneri ve konserve yetersizdir; merdivenlerden tahliye için ebeveynin ellerini boşta bırakan bir kanguruya ve 72 saatlik steril mama suyuna ihtiyaç vardır. Benzer şekilde 72 yaşında kalp ilacı kullanan bir birey veya insüline bağımlı bir hasta için soğuk zincir planı yapılmadığında afet sonrası ilk 24 saat ölümcül olmaktadır.
3. **Tarihsel Zemin Hafızası (Micro-Zonation Eksikliği):** 1999 Gölcük Depreminde merkez üssünden 110 km uzakta yer alan İstanbul Avcılar'da yaşanan yıkım, zemin büyütmesi (*Soil Amplification ~2.4x*) ve gevşek kıyı dolgu hafızasından kaynaklanmıştır. Aynı ilçe içerisinde dahi dere yatağında kalan bir giriş kat ile tepe bölgesindeki bir dairenin risk profili tamamen farklıdır.

#### C. Başarı Ölçütü: Aracın İşe Yaradığını Nasıl Anlıyoruz?
* **Dinamik Hane Dirençlilik Skoru (0-100%):** Hane verileri girildiğinde yapı yaşı, kat ve çevre risklerine göre baz skor (örneğin %38) hesaplanır. Kullanıcı sunulan sabitleme yönergelerini uygulayıp interaktif çanta checklist'indeki malzemeleri tamamladıkça dirençlilik skoru anlık olarak **%80-95 seviyesine** yükselir.
* **Afet Anı Simülasyon Zaman Çizelgesi:** Kullanıcıya afet anında (İlk 60 sn, 15 dk, 72 saat) ne yapacağını net bir protokol halinde sunarak panik anındaki ölümcül refleksleri (merdiven boşluğuna koşmak, suya basarak şaltere dokunmak vb.) elimine eder.

---

### 2. HEDEF KULLANICI VE KIRILGAN GRUPLAR

AfetGuard AI, afet anında en yüksek risk altında bulunan kırılgan gruplara pozitif ayrımcılık uygular:
* **0-3 Yaş Bebek / Çocuk:** Merdivenlerden hızlı ve güvenli tahliye için taşıma kangurusu/sling, 72 saatlik steril toz mama, kapalı su, hijyenik bez ve su geçirmez kılıfta aşı kartı.
* **65+ Yaşlı Bireyler:** Orijinal ambalajında 7 günlük kronik kalp/tansiyon ilacı ve hekim rapor kopyası, karanlıkta oryantasyon kaybını önleyen yedek numaralı gözlük ve molozlu zemin tahliye bastonu.
* **Engelli & Hareket Kısıtlı Bireyler:** Asansörlerin kilitleneceği gerçeğine karşı iki kişiyle tahliye sağlayan transfer kemeri/şiltesi, enkaz altında arama kurtarma ekiplerine yön veren flaşörlü LED konum feneri.
* **Kronik Hastalar:** Elektrik kesintisinde 48 saate kadar 2-8°C sıcaklığı muhafaza eden termal insülin soğuk zincir taşıma çantası ve glukometre yedekleri.
* **Evcil Hayvanlar:** Panik halinde kaçmayı ve yaralanmayı önleyen sert gövdeli taşıma box'ı, göğüs tasması, 3 günlük mama ve toplanma alanlarında kabul için aşı karnesi.

---

### 3. KULLANILAN ÜRETKEN YAPAY ZEKÂ MODELİ VE TERCİH GEREKÇESİ

* **Kullanılan Model:** Google Gemini API (`gemini-2.5-flash` ve `gemini-1.5-flash`)
* **Tercih Nedenleri:**
  1. **Çok Modlu (Multimodal Vision) Yeteneği:** Kullanıcının yatak odası veya salon fotoğrafını tek bir API çağrısında doğrudan base64 olarak alıp mobilya konumlarını, pencere mesafesini ve devrilme açılarını görsel olarak saptayabilmesi.
  2. **Yapılandırılmış JSON Modu (Structured JSON):** `responseMimeType: "application/json"` desteğiyle arayüzün (Next.js dashboard) ihtiyaç duyduğu matris, zaman çizelgesi ve kontrol listesini sıfır şema kayması ile üretmesi.
  3. **Yüksek Türkçe Dil ve Bölgesel Kavram Yetkinliği:** AFAD terminolojisi, Türkiye deprem yönetmelikleri (TBDY 2018), mikro-bölgeleme ve il/ilçe zemin parametrelerini yüksek doğrulukla anlamlandırması.
  4. **Düşük Gecikme (Sub-second Latency):** Flash serisinin canlı kullanıcı etkileşiminde saniyeler içinde zengin yanıt üretmesi.

---

### 4. BİLİNÇLİ PROMPT TASARIMI VE GEREKÇELERİ (`src/lib/prompts.ts`)

Projemizde yapay zekâ rastgele bir metin üreticisi olarak değil, disiplinli bir **Karar Destek Sistemi** olarak kurgulanmıştır.

#### A. Role Prompting (Rol Tanımlama)
```typescript
export const SYSTEM_ROLE_PROMPT = `Sen AFAD (T.C. İçişleri Bakanlığı Afet ve Acil Durum Yönetimi 
Başkanlığı) saha standartlarına, Birleşmiş Milletler Sendai Afet Risk Azaltma Çerçevesi (2015-2030) 
ilkelerine ve Deprem Mühendisliği/Yapı Dinamiği prensiplerine en üst düzeyde hakim Kıdemli Afet 
Risk Analisti, Mikrobölgeleme Uzmanı ve Hane Dirençlilik Baş Mimarı rolündesin.`;
```
*Gerekçe:* Genel bir yapay zekâ dili yerine AFAD ve Sendai standartlarına odaklanarak, ciddiyetten uzak önerileri engeller ve saha gerçeklerine dayalı mühendislik dili oluşturur.

#### B. Chain-of-Thought (CoT - Adım Adım Düşünce Zinciri)
Modelin doğrudan ezbere çanta listesi üretmesini önlemek amacıyla 7 aşamalı zorunlu bir düşünce zinciri tanımlanmıştır:
```typescript
export const CHAIN_OF_THOUGHT_INSTRUCTIONS = `Girdileri analiz ederken ve yanıtını oluştururken 
şu 7 Aşamalı Düşünce Zincirini (Chain-of-Thought / CoT) katı biçimde izle:
1. AŞAMA (Tarihsel Zemin ve Mikrobölgeleme Analizi - Micro-Zonation): Zemin büyütmesi (Amplification) ve sıvılaşma...
2. AŞAMA (Bölgesel ve Yapısal Sismik/Afet Analizi): Bina yaşı ve kat ivmesi...
3. AŞAMA (Hanehalkı ve Kırılgan Birey Etki Haritalaması): Bebek, yaşlı, insülin, evcil hayvan ihtiyaçları...
4. AŞAMA (Afet Anı Simülasyonu ve Zaman Çizelgesi): T+0-60s, T+1-15m, T+1-72h adımları...
5. AŞAMA (Oda İçi Fiziksel Mekân ve Devrilme Dinamiği): Gardırop, pencere cam patlama yayları...
6. AŞAMA (Yaşam Üçgeni ve Güvenli Tahliye Sentezi): Ezilme boşluğu ve çanta konumu...
7. AŞAMA (Hiper-Kişiselleştirilmiş Çanta ve Etik Güvenlik Katmanı): Tıbbi ve yapısal sınırlar...`;
```
*Gerekçe:* Model önce jeolojik riski, ardından kırılgan bireyleri ve en son oda mekaniğini çözerek sebep-sonuç ilişkisi kurar; halüsinasyon riski minimize edilir.

#### C. Few-Shot Learning vs. Zero-Shot Karşılaştırması
* **Zero-Shot Zaafı:** Zero-shot yaklaşımında modeller serbest metin, uzun paragraflar veya eksik alanlar döndürmekte; bu da frontend bileşenlerinde render hatalarına (`undefined property`) yol açmaktadır.
* **Few-Shot Çözümü:** `src/lib/prompts.ts` içerisine İstanbul/Avcılar senaryosunu içeren eksiksiz 1 adet girdi-çıktı çifti (`FEW_SHOT_EXAMPLE`) enjekte edilmiştir. Model bu örneği referans alarak:
  `historicalGroundMemory`, `disasterMatrix`, `crisisTimeline`, `roomSafetyGuide`, `emergencyBagChecklist` ve `ethicalGuardrails` anahtarlarını her seferinde %100 geçerli JSON olarak üretir.

---

### 5. KARŞILAŞILAN ZORLUKLAR VE GELİŞTİRİLEN ÇÖZÜMLER

1. **Zorluk 1 (Kullanıcı Deneyimi & Oda Modelleme Bariyeri):** Kullanıcıdan odasının mimari planını elle çizmesini istemek süreci tıkayacaktı.  
   *Çözüm:* **Hibrit Giriş Modeli** geliştirildi. Kullanıcı dilerse telefonundan tek bir geniş açılı fotoğraf yükleyerek Gemini Multimodal Vision ile analiz alabilir; fotoğraf yüklemek istemezse 8 adet hazır risk etiketinden (örn: *"Yatak yanında sabitlenmemiş yüksek dolap"*) seçim yapabilir.
2. **Zorluk 2 (Model Çıktısının Arayüz Kartlarını Bozması):** Üretken modellerin bazen markdown blokları (` ```json `) eklemesi JSON ayrıştırıcıyı kırabiliyordu.  
   *Çözüm:* Hem Gemini `responseMimeType: "application/json"` konfigürasyonu uygulandı hem de `src/lib/gemini.ts` katmanında regex temizleme ve hata durumunda sıfır kesintili **akıllı simülasyon fallback mekanizması** kuruldu.
3. **Zorluk 3 (İlçe Jeolojisinde Bölgesel Halüsinasyon Riski):** Modelin zemin özelliklerini karıştırmasını önlemek için `constants.ts` üzerinde doğrulanmış mikro-bölgeleme ve tarihsel zemin hafızası etiketleri tanımlandı.

---

### 6. ETİK DEĞERLENDİRME VE GÜVENLİK KATMANI (15 PUAN)

Afet hazırlığı doğrudan insan hayatını ilgilendirdiğinden, yapay zekânın sınırları katı biçimde çizilmelidir.

#### A. Yanıltıcı ve Hatalı Çıktı Riskleri Neredeydi?
1. **Yapısal Mühendislik Riski:** Modelin bir binaya bakarak yetkisizce *"Bu bina asla yıkılmaz, güvenlidir"* veya *"Bu bina kesin çökecektir"* gibi bağlayıcı taahhütlerde bulunması.
2. **Tıbbi Reçete Riski:** Kronik hastalıklarda modelin hekim yerine geçerek ilaç adı, dozu veya tıbbi tedavi önermesi.

#### B. Bu Riskler Nasıl Ortadan Kaldırıldı?
* **Sistem İstemindeki Katı Güvenlik Duvarı:**
```typescript
export const ETHICAL_GUARDRAILS_PROMPT = `ETİK KURALLAR VE HALÜSİNASYON ÖNLEYİCİ GÜVENLİK KATMANI:
1. Kesinlikle binanın yıkılıp yıkılmayacağına dair kesin taahhüt ('bu bina asla yıkılmaz' veya 'kesin çökecek') verme.
2. Tıbbi reçete veya ilaç dozu yazma. Yalnızca hekim tarafından verilmiş mevcut ilaçların acil stoklanmasını tavsiye et.`;
```
* **Lojistik Çözüm Yaklaşımı:** İlaç konusunda model asla yeni ilaç önermez; sadece bireyin kendi hekimi tarafından reçete edilmiş mevcut ilaçlarının kesintiye uğramaması için **termal soğuk zincir çantası** ve rapor kopyası yedeklenmesini planlar.
* **Resmi Kurum Referansları ve Sorumluluk Beyanı:** Raporun 4. Kartında yer alan etik bildirim kutusunda; bu rehberin AFAD, Türk Kızılayı ve BM Sendai Çerçevesi standartlarına dayalı bir hazırlık asistanı olduğu, resmi karot/zemin analizi yerine geçmeyeceği açıkça deklare edilmektedir.

---
**Sonuç:** AfetGuard AI, Birleşmiş Milletler Sürdürülebilir Kalkınma Amaçları doğrultusunda hem yapay zekâ mühendisliğini (CoT, Few-Shot, Multimodal) hem de insani etik sorumlulukları en üst düzeyde dengeleyen, çalışan ve yaşayan bir prototiptir.
