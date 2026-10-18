import { 
  UserInput, 
  DisasterAnalysisResult, 
  HazardRisk, 
  EmergencyBagItem, 
  FurnitureFixingItem,
  HistoricalGroundMemory,
  CrisisTimeline
} from "@/types/disaster";

export function generateMockAnalysis(input: UserInput): DisasterAnalysisResult {
  const isOldBuilding = input.buildingAge === "pre1999";
  const isPost2018 = input.buildingAge === "post2018";
  const isFloodScenario = 
    input.district.toLowerCase().includes("kağıthane") || 
    input.city.toLowerCase().includes("rize") ||
    input.historicalGroundTag?.includes("dere yatağı") ||
    (input.floorLevel === "basement_ground" && input.environmentRisks.includes("river_coastal"));

  // Base resilience score calculation
  let baseScore = 60;
  if (isOldBuilding) baseScore -= 20;
  if (isPost2018) baseScore += 20;
  if (input.floorLevel === "top_high") baseScore -= 8;
  if (input.floorLevel === "basement_ground" && isFloodScenario) baseScore -= 14;
  if (input.vulnerableGroups.length >= 2) baseScore -= 10;
  if (input.roomRiskTags.length >= 3) baseScore -= 10;
  const resilienceScore = Math.max(25, Math.min(85, baseScore));

  // 1. HISTORICAL GROUND MEMORY & MICRO-ZONATION
  let groundMemory: HistoricalGroundMemory;

  if (isFloodScenario) {
    groundMemory = {
      title: `${input.city} / ${input.district} - Tarihsel Taşkın Yatağı Hafızası`,
      soilType: "Alüvyon Tabakası, Killi-Milli Dolgu ve Yüksek Taban Suyu",
      historicalFact: `${input.neighborhood || input.district} bölgesi, tarihsel haritalarda aktif su havzası ve mevsimsel taşkın koludur. Aşırı yağışlarda zeminin su emme kapasitesi 15 dakikada sıfırlanır.`,
      amplificationRisk: "Taban suyu seviyesi yüzeye 1-2 metre yakınlıktadır; şiddetli yağışta rögarlar geri basar ve bodrum/giriş katlarda anlık 50-100 cm su birikmesine yol açar.",
      liquefactionTendency: "YÜKSEK",
      warningBadge: "Kritik Taşkın & Zemin Doygunluğu"
    };
  } else if (input.district.toLowerCase().includes("avcılar") || input.historicalGroundTag?.includes("dolgu")) {
    groundMemory = {
      title: `${input.city} / ${input.district} - Sahil Kordonu & Sıvılaşma Hafızası`,
      soilType: "Kıyı Dolgusu, Gevşek Kum-Silt ve Denizel Çökeller (Avcılar Formasyonu)",
      historicalFact: "1999 Gölcük Depreminde merkez üssü 110 km mesafede olmasına karşın mikrobölgeleme rezonansı ve zemin büyütmesi sebebiyle Avcılar'da ağır yıkım kaydedilmiştir.",
      amplificationRisk: "Zemin Büyütme Katsayısı (Amplification): ~2.4x. Sismik S dalgaları gevşek sahil dolgusunda tuzaklanarak yüzey titreşim süresini ve genliğini 2 kattan fazla uzatır.",
      liquefactionTendency: "YÜKSEK",
      warningBadge: "Kritik Sismik Büyütme (Rezonans)"
    };
  } else {
    groundMemory = {
      title: `${input.city} / ${input.district} - Mikrobölgeleme ve Zemin Profili`,
      soilType: input.historicalGroundTag || "Karışık Zemin ve Ayrışmış Yamaç Molozu",
      historicalFact: `${input.neighborhood || input.district} zemin tabakası geçmiş yer hareketlerinde bölgesel frekans uyumsuzluğu göstermiştir.`,
      amplificationRisk: "Yapı periyodu ile zemin doğal salınım periyodunun çakışması durumunda kat ötelenmeleri artabilir.",
      liquefactionTendency: isOldBuilding ? "ORTA" : "DÜŞÜK",
      warningBadge: "Standart Mikrobölgeleme"
    };
  }

  // 2. DISASTER HAZARD MATRIX
  const hazards: HazardRisk[] = [];

  if (isFloodScenario) {
    hazards.push({
      rank: 1,
      hazardName: "Eski Dere Yatağında Ani Su Taşkını ve Altyapı Geri Basması",
      riskLevel: "YÜKSEK",
      probabilityScore: 88,
      geologicalReasoning: `${input.neighborhood || input.district} bölgesinin vadi tabanında yer alması ve giriş/bodrum kat olması nedeniyle ani debi artışlarında ilk su baskını tehdidi altındadır.`,
      immediateAction: "Priz hatlarını yerden en az 1.5 m yüksekte tutun; elektrik ana panosuna kaçak akım rölesi ve çekvalf taktırın."
    });
    hazards.push({
      rank: 2,
      hazardName: "Sismik Sarsıntı ve Yumuşak Alüvyon Zemin Deformasyonu",
      riskLevel: isOldBuilding ? "YÜKSEK" : "ORTA",
      probabilityScore: 72,
      geologicalReasoning: "Alüvyon katmanları suyla doygun olduğunda sismik sarsıntıda taşıma gücünü aniden kaybeder.",
      immediateAction: "Ağır mobilyaları taşıyıcı kolon/perde betonlara ankrajlayın."
    });
    hazards.push({
      rank: 3,
      hazardName: "Şebeke Kesintisi & Elektrik/Gaz Sızıntısı",
      riskLevel: "ORTA",
      probabilityScore: 65,
      geologicalReasoning: "Su basması durumunda zemin prizlerinin suyla teması elektrik kaçağına ve kombi tahliye borularının tıkanmasına yol açar.",
      immediateAction: "Su basmasında ana sigortayı kuru eldivenle indirin, gaz vanasını kapatın."
    });
  } else {
    hazards.push({
      rank: 1,
      hazardName: `${input.city} / ${input.district} Ana Fay Kırığı ve Şiddetli Sismik İvme`,
      riskLevel: "YÜKSEK",
      probabilityScore: isOldBuilding ? 95 : 82,
      geologicalReasoning: `${input.neighborhood || input.district} sismik tehlike haritasında fay hattı etki çemberindedir. ${
        isOldBuilding 
          ? "1999 öncesi yapı standartları, korozyon ve zemin büyütmesi ivmeyi 2.4 kat artırmaktadır." 
          : "Bina yeni olsa dahi yüksek ivme iç mobilyaları savurarak kaçış yollarını kilitler."
      }`,
      immediateAction: "Yatak odası ve koridordaki yüksek dolapları çelik L-profille ankrajlayın, camlara güvenlik filmi çekin."
    });
    hazards.push({
      rank: 2,
      hazardName: "Kıyı / Sahil Zemin Sıvılaşması ve Sahil Kordonu Deformasyonu",
      riskLevel: "ORTA",
      probabilityScore: 78,
      geologicalReasoning: "Gevşek kumlu sahil katmanları sismik titreşimde su basıncını taşıyamayarak akışkanlaşır ve zemin oturmasına sebep olur.",
      immediateAction: "Bina çıkış güzergahında acil toplanma rotasını deniz kenarından uzağa ve yüksek zeminlere planlayın."
    });
    hazards.push({
      rank: 3,
      hazardName: "Şiddetli Sarsıntı Sonrası Doğalgaz Yangını ve 72 Saatlik Kesinti",
      riskLevel: "ORTA",
      probabilityScore: 64,
      geologicalReasoning: "Tesisat borularının duvar salınımlarında yırtılması ikincil yangınlara yol açabilir.",
      immediateAction: "Ana gaz vanasına deprem anı otomatik sismik kesici selenoid vana taktırın."
    });
  }

  // 3. CRISIS TIMELINE (T+0-60s, T+1-15m, T+1-72h)
  const timeline: CrisisTimeline = isFloodScenario
    ? {
        phase60s: {
          timeframe: "T+0 - 60 Saniye",
          phaseName: "Taşkın / Ani Baskın Anı",
          title: "Elektrik Güvenliği ve Hayvan/İlaç Kurtarma",
          actions: [
            "Priz hizasını aşan su temasından önce ana sigortayı kuru bir tahta çubuk veya yalıtımlı malzeme ile derhal indirin.",
            "Dış kapıyı aniden açmayın; sokaktaki su seviyesi kapı eşiğini aştıysa basınç içeri hücum edebilir.",
            "Kronik hastanın insülin ve hayati ilaç çantasını yüksek rafa/masaya alın."
          ],
          vulnerableCare: "Evcil hayvanı derhal sert gövdeli taşıma kutusuna (box) yerleştirin. Panikleyen kedi/köpek su sesinde saklanarak kaçabilir.",
          safetyRule: "Asla suya batmış priz veya kablolara çıplak ayakla basmayın; elektrik çarpması birincil ölüm nedenidir.",
          badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
        },
        phase15m: {
          timeframe: "T+1 - 15 Dakika",
          phaseName: "Dikey Tahliye & Tesisat İzolasyonu",
          title: "Giriş Kattan Üst Katlara Dikey Tahliye",
          actions: [
            "Sokak seviyesi su altındaysa yatay kaçış yerine bina merdivenlerinden üst kat komşularına dikey tahliye yapın.",
            "Doğalgaz kombi ve ana sayacını kapatarak gaz sıkışmasını önleyin.",
            "Su geçirmez afet çantasını sırta takarak iki eli boşta tutun."
          ],
          vulnerableCare: "Kronik hastanın insülinini termal çantaya koyarak yanınıza alın; evcil hayvanın tasmasını sabitleyin.",
          safetyRule: "Bodrum kata asla geri inmeyin; kanalizasyon ve yağmur suyu ters basarak bodrumları dakikalar içinde doldurur.",
          badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30"
        },
        phase72h: {
          timeframe: "T+1 - 72 Saat",
          phaseName: "Hayatta Kalma & Salgın Önleme",
          title: "Soğuk Zincir ve Hijyen Yönetimi",
          actions: [
            "Kirlenen şebeke sularını kesinlikle içmeyin ve gıdalara temas ettirmeyin; tifo ve dizanteri riski başlar.",
            "İnsülin soğuk zincirini kapalı buz aküleriyle güneş görmeyen yerde muhafaza edin.",
            "AFAD ve belediye bot kurtarma ekiplerine pilli fener/düdükle konum bildirin."
          ],
          vulnerableCare: "Kronik hastanın tansiyon ve şekerini düzenli takip edin; evcil hayvana kapalı pet şişe suyundan verin.",
          safetyRule: "Sular çekilene kadar sele kapılmış elektrik direklerine ve hasarlı zeminlere 20 metreden fazla yaklaşmayın.",
          badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
        }
      }
    : {
        phase60s: {
          timeframe: "T+0 - 60 Saniye",
          phaseName: "Sarsıntı ve Yıkım Anı",
          title: "Yatak Başı ve Yaşam Üçgeni Pozisyonu",
          actions: [
            "Asla balkona veya merdiven boşluğuna koşmayın; merdivenler binanın ilk çöken elemanlarıdır.",
            "Yatak odasındaki gardırobun devrilme açısından kaçarak baza ve masif komodin yanında cenin pozisyonu alın.",
            "Yastık veya kalın battaniye ile baş ve ense bölgesini moloz/sıva düşmesine karşı siper edin."
          ],
          vulnerableCare: "Bebeği hemen kucağınıza alıp göğsünüze yapıştırarak tek bir kitle halinde Çök-Kapan-Tutun yapın. Yaşlı bireyi yatağın güvenli iç duvar kenarına çekip başını koruyun.",
          safetyRule: "Kapı pervazında beklemeyin; modern binalarda kapı eşikleri taşıyıcı değildir ve kapı sıkışarak kafayı ezebilir.",
          badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/30"
        },
        phase15m: {
          timeframe: "T+1 - 15 Dakika",
          phaseName: "Sarsıntı Sonu Tahliye & Tesisat",
          title: "4. Kattan Güvenli Merdiven İnişi",
          actions: [
            "Sarsıntı durur durmaz doğalgaz ana vanasını, elektrik sigortasını ve su vanasını derhal kapatın.",
            "Asansörü KESİNLİKLE kullanmayın; halat kopması veya elektrik kesintisinde kuyuya düşme riski vardır.",
            "Cam kırıklarına karşı kalın tabanlı ayakkabılarınızı giyin ve afet çantasını omuzlayın."
          ],
          vulnerableCare: "Bebeği kanguruya bağlayarak her iki elinizi korkuluklara tutunmak için serbest bırakın. 65+ yaşlı bireye baston verin ve iki kişiyle refakat edin.",
          safetyRule: "Merdivenlerde telaşla koşmayın; basamaklardaki döküntüler kaymaya ve izdihama yol açabilir.",
          badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30"
        },
        phase72h: {
          timeframe: "T+1 - 72 Saat",
          phaseName: "Dış Desteksiz Hayatta Kalma",
          title: "Toplanma Alanı & İlaç/Su Kotası",
          actions: [
            "Deniz kenarından ve sahil dolgusundan derhal uzaklaşarak iç kesimlerdeki resmi toplanma alanına geçin.",
            "Kişi başı günlük 3 litre su kotasını sıkı denetleyin; ilk 72 saat susuzluk hayati risk doğurur.",
            "Telefon şebekelerini meşgul etmeyin; iletişimi sadece SMS ve dinamolu acil durum radyosuyla sağlayın."
          ],
          vulnerableCare: "Yaşlı bireyin 7 günlük kalp/tansiyon ilaçlarını saatinde verin. Bebeğin üşümesini önlemek için termal battaniyeyi sarın.",
          safetyRule: "Yetkililer 'Yeşil Bina / Güvenli' onayı vermeden hiçbir sebeple eşya almak için hasarlı binaya geri girmeyin.",
          badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
        }
      };

  // 4. FURNITURE FIXING PLAN
  const fixingItems: FurnitureFixingItem[] = [];
  
  if (input.roomRiskTags.some(t => t.includes("gardırop") || t.includes("dolap")) || input.roomMode === "photo") {
    fixingItems.push({
      item: "Yatak Yanı Yüksek Ahşap Gardırop",
      riskDescription: "Sarsıntı ivmesiyle doğrudan yatak üzerine devrilme yayındadır; saniyeler içinde ezilme ve çıkışı kapama riski taşır.",
      fixingMethod: "En az 2 adet 50x50 mm çelik L-braket ve gazbeton/tuğla dübeli ile taşıyıcı duvara üst köşelerden 45 derece açıyla monte edilmelidir.",
      urgency: "ACİL"
    });
  }

  if (input.roomRiskTags.some(t => t.includes("pencere") || t.includes("cam"))) {
    fixingItems.push({
      item: "Pencere Cam Panelleri ve Çerçevesi",
      riskDescription: "Sismik dalgalarda kasa sıkışması sonucu temperli olmayan camlar patlayarak yatağa ve zemine şarapnel gibi dağılır.",
      fixingMethod: "Cam yüzeyine şeffaf patlama önleyici güvenlik filmi (safety film) çekilmeli ve yatak camdan 1.5 m uzağa kaydırılmalıdır.",
      urgency: "ACİL"
    });
  }

  if (input.roomRiskTags.some(t => t.includes("tablo") || t.includes("raf"))) {
    fixingItems.push({
      item: "Yatak Üstü Duvar Rafı / Ağır Tablo",
      riskDescription: "Düşey ivme etkisinde ilk saniyelerde düşerek baş/boyun travmalarına sebep olur.",
      fixingMethod: "Yatak başucundaki tüm raflar sökülmeli, tablolar sadece kilitli deprem askı kancalarıyla başka bir duvara asılmalıdır.",
      urgency: "ACİL"
    });
  }

  if (input.roomRiskTags.some(t => t.includes("perde") || t.includes("pano") || t.includes("priz"))) {
    fixingItems.push({
      item: "Elektrik Panosu / Su Baskını Seviyesi Yakınındaki Tül Perde",
      riskDescription: "Kıvılcım veya kısa devrede anında tutuşarak kaçış koridorunu dumanla doldurur.",
      fixingMethod: "Pano çevresindeki tekstil ürünleri uzaklaştırılmalı, priz hatları suya dayanıklı sızdırmaz kapaklarla korunmalıdır.",
      urgency: "ACİL"
    });
  }

  if (input.roomRiskTags.some(t => t.includes("koridor") || t.includes("ayakkabılık") || t.includes("kapı"))) {
    fixingItems.push({
      item: "Çıkış Koridoru Vestiyer / Ayakkabılık",
      riskDescription: "Devrildiğinde dış kapının açılmasını engelleyerek daireyi kapana dönüştürür.",
      fixingMethod: "Koridordaki eşyalar duvara sabitlenmeli, kapı kanadının açılış dairesi 90 derece tamamen boş bırakılmalıdır.",
      urgency: "ACİL"
    });
  }

  if (fixingItems.length === 0) {
    fixingItems.push({
      item: "Yatak Odası Genel Hareketli Mobilyaları",
      riskDescription: "Sabitlenmemiş komodin ve ayna gibi nesnelerin savrulması karanlıkta yaralanmaya yol açar.",
      fixingMethod: "Tüm hareketli mobilyaların ayaklarına kaydırmaz taban ve üst kısımlarına sabitleme kayışı takılmalıdır.",
      urgency: "ÖNEMLİ"
    });
  }

  // 5. DYNAMIC EMERGENCY BAG CHECKLIST
  const bagItems: EmergencyBagItem[] = [
    {
      id: "gen-1",
      item: "Yüksek Desibelli Acil Durum Düdüğü (Hane Başına 1'er Adet)",
      category: "Genel",
      priority: "Kritik",
      details: "Toz ve enkaz altında ses telleri çabuk yorulur; düdük minimum enerjiyle 500m mesafeye ses iletir."
    },
    {
      id: "gen-2",
      item: "Kişi Başı Günlük 3 Litre Kapalı İçme Suyu (72 Saatlik)",
      category: "Genel",
      priority: "Kritik",
      details: "İlk 72 saat hayatta kalmanın en temel şartıdır; dayanıklı kapalı pet şişelerde saklanmalıdır."
    },
    {
      id: "gen-3",
      item: "Dinamolu / Pilli LED El Feneri ve Yedek Piller",
      category: "Genel",
      priority: "Kritik",
      details: "Kıvılcım çıkarmayan sızdırmaz gövde; gaz sızıntısı ihtimaline karşı kibrit/çakmak asla kullanılmamalıdır."
    },
    {
      id: "gen-4",
      item: "Kapsamlı İlk Yardım Çantası ve Travma Turnikesi",
      category: "Genel",
      priority: "Kritik",
      details: "Steril gazlı bez, elastik bandaj, yara merhemi, makas, boyunluk ve ağrı kesici."
    },
    {
      id: "gen-5",
      item: "Çok Amaçlı Çakı ve Toz Maskesi (FFP2/FFP3)",
      category: "Genel",
      priority: "Önemli",
      details: "Yıkılan alçı ve beton tozunun akciğerlere dolmasını önlemek için N95/FFP2 maske hayati önemdedir."
    }
  ];

  if (input.vulnerableGroups.includes("baby")) {
    bagItems.push(
      {
        id: "baby-1",
        item: "Bebek Maması ve Biberon (72 Saatlik)",
        category: "Bebek (0-3 Yaş)",
        priority: "Kritik",
        details: "Pişirme ve ısıtma gerektirmeyen hazır kavanoz veya toz mama + steril kapalı su.",
        forGroup: "baby"
      },
      {
        id: "baby-2",
        item: "Bebek Taşıma Kangurusu / Sling",
        category: "Bebek (0-3 Yaş)",
        priority: "Kritik",
        details: "4. kattan merdiven tahliyesinde iki elinizin de korkuluklara tutunabilmesini sağlar.",
        forGroup: "baby"
      },
      {
        id: "baby-3",
        item: "Bebek Bezi, Islak Mendil ve Pişik Kremi",
        category: "Bebek (0-3 Yaş)",
        priority: "Önemli",
        details: "Hijyenik kilitli poşetler içinde en az 18 adet bez ve seyahat tipi ıslak mendil.",
        forGroup: "baby"
      },
      {
        id: "baby-4",
        item: "Bebek Aşı Kartı ve Kimlik Fotokopisi",
        category: "Bebek (0-3 Yaş)",
        priority: "Kritik",
        details: "Su geçirmez kilitli torba içinde güncel aşı ve sağlık bilgileri.",
        forGroup: "baby"
      }
    );
  }

  if (input.vulnerableGroups.includes("elderly")) {
    bagItems.push(
      {
        id: "elderly-1",
        item: "Kronik Kalp/Tansiyon İlaçları ve Rapor Kopyası (7 Günlük)",
        category: "Yaşlı (65+)",
        priority: "Kritik",
        details: "Orijinal kutusunda güncel hekim raporu ve acil kullanım çizelgesi ile birlikte.",
        forGroup: "elderly"
      },
      {
        id: "elderly-2",
        item: "Yedek Numaralı Gözlük ve İşitme Cihazı Pilleri",
        category: "Yaşlı (65+)",
        priority: "Kritik",
        details: "Panik ve toz ortamında duyu kaybını önlemek için yedek optik ve akustik destek.",
        forGroup: "elderly"
      },
      {
        id: "elderly-3",
        item: "Katlanabilir Acil Tahliye Bastonu / Yürüteç",
        category: "Yaşlı (65+)",
        priority: "Önemli",
        details: "Molozlu zeminde ve karanlık merdivenlerde denge kaybını engeller.",
        forGroup: "elderly"
      }
    );
  }

  if (input.vulnerableGroups.includes("chronic_illness")) {
    bagItems.push(
      {
        id: "chr-1",
        item: "Termal İnsülin / Soğuk Zincir Taşıma Çantası ve Buz Aküsü",
        category: "Kronik Hasta / İlaç",
        priority: "Kritik",
        details: "Elektrik kesintisinde veya tahliyede 48 saate kadar ilaç sıcaklığını 2-8°C arasında korur.",
        forGroup: "chronic_illness"
      },
      {
        id: "chr-2",
        item: "Glukometre / Tansiyon Ölçer ve Yedek Şeritler",
        category: "Kronik Hasta / İlaç",
        priority: "Önemli",
        details: "Stres ve panik kaynaklı ani krizleri takip etmek için taşınabilir medikal cihaz.",
        forGroup: "chronic_illness"
      }
    );
  }

  if (input.vulnerableGroups.includes("pet")) {
    bagItems.push(
      {
        id: "pet-1",
        item: "Sert Gövdeli Evcil Hayvan Taşıma Kutusu (Box) ve Göğüs Tasması",
        category: "Evcil Hayvan",
        priority: "Kritik",
        details: "Panikleyen hayvanın kaçmasını, yaralanmasını ve enkazda kaybolmasını önler.",
        forGroup: "pet"
      },
      {
        id: "pet-2",
        item: "3 Günlük Kuru Mama, Katlanabilir Su Kabı ve Aşı Karnesi",
        category: "Evcil Hayvan",
        priority: "Önemli",
        details: "Toplanma alanlarında ve çadır kentlerde kabul için mikroçip/aşı bilgisi şarttır.",
        forGroup: "pet"
      }
    );
  }

  if (input.vulnerableGroups.includes("disabled")) {
    bagItems.push(
      {
        id: "dis-1",
        item: "Acil Tahliye Transfer Kemeri / Taşıma Şiltesi",
        category: "Engelli / Kısıtlı",
        priority: "Kritik",
        details: "Asansörler çalışmayacağından merdivenlerden iki kişiyle güvenli transfer sağlamak için.",
        forGroup: "disabled"
      },
      {
        id: "dis-2",
        item: "Sesli / Flaşörlü Konum Belirleyici LED Fener",
        category: "Engelli / Kısıtlı",
        priority: "Kritik",
        details: "Arama kurtarma ekiplerine yönlendirme sağlayan sürekli yanıp sönen acil yardım ışığı.",
        forGroup: "disabled"
      }
    );
  }

  return {
    summary: `${input.city} ili ${input.district} ilçesi ${input.neighborhood ? `(${input.neighborhood})` : ""} bölgesinde, ${
      isOldBuilding ? "1999 öncesi yapılmış" : isPost2018 ? "2018 sonrası güncel yönetmelikli" : "2000-2018 arası"
    } binanızda, ${input.floorNumber}. katta ${input.householdCount} kişilik hane için tarihsel zemin hafızası ve kriz simülasyonu analiz edildi. ${
      isFloodScenario
        ? "Taşkın ve altyapı geri basma riski önceliklendirildi."
        : "Sismik ivme ve zemin büyütmesi rezonans riski önceliklendirildi."
    }`,
    overallResilienceScore: resilienceScore,
    sdgAlignment: {
      sdg11_5: `SDG 11.5 Doğrudan Katkı: ${
        input.vulnerableGroups.includes("baby") || input.vulnerableGroups.includes("elderly")
          ? "Bebek ve yaşlı bireylerin 4. kattan tahliyesinde düşme ve ezilme riskini minimize eder."
          : "Hane içi fiziksel tuzakları nötralize ederek can güvenliği kırılganlığını minimize eder."
      }`,
      sdg13_1: `SDG 13.1 Doğrudan Katkı: ${input.city} coğrafyasındaki ${isFloodScenario ? "iklim/aşırı yağış taşkınlarına" : "sismik tehlikelere"} karşı 72 saatlik dış desteksiz hayatta kalma ve uyum kapasitesini güçlendirir.`,
      impactMetric: `Uygulanacak eşya sabitleme ve zaman çizelgesi protokolü ile hane afet dirençlilik kapasitesi %${Math.min(95, resilienceScore + 40)} seviyesine yükselecektir.`
    },
    historicalGroundMemory: groundMemory,
    disasterMatrix: hazards,
    crisisTimeline: timeline,
    roomSafetyGuide: {
      furnitureFixingPlan: fixingItems,
      bedRelocationAdvice: input.roomRiskTags.some(t => t.includes("pencere"))
        ? "Yatak doğrudan pencere camından en az 1.5 - 2 metre uzağa, iç bölme duvarı boyunca ve gardırobun devrilme açısının dışına çekilmelidir."
        : "Yatak odası kapısının açılış yönünü kesmeyecek ve yüksek mobilyalardan en az 1 metre uzakta kalacak şekilde konumlandırılmalıdır.",
      lifeTriangleSpot: {
        locationName: isFloodScenario ? "Yüksek Masa Kenarı ve Masif Gardırop Boşluğu" : "Baza Yanı ve Masif Dolu Mobilya Kenarı",
        coordinatesDescription: isFloodScenario
          ? "Giriş katta su seviyesi yükselmesine karşı odanın en yüksek platformu yanında, elektrik kablolarından arındırılmış alan."
          : "Yatağın iç duvara bakan yan boşluğunda, masif komodin veya dolu baza yanında cenin pozisyonunda Çök-Kapan-Tutun duruşu.",
        safetyRationale: isFloodScenario
          ? "Yüksek platformlar su basmasında ilk 15 dakikada kuru kalmayı ve elektrik temasından korunmayı sağlar."
          : "Tavan çökmesi veya ağır sıva düşmesinde masif yatak kasası döşemenin yere sıfırlanmasını engelleyerek 40-60 cm hayati yaşam boşluğu (life triangle) oluşturur."
      },
      emergencyBagLocation: isFloodScenario
        ? "Yerden en az 130 cm yüksekte, duvara sabit askıda veya dolap üst rafında; su basmasında ıslanmayacak konumda."
        : "Yatak odası çıkış kapısının hemen bitişiğindeki duvara monte edilmiş askıda, karanlıkta el yordamıyla 5 saniyede ulaşılabilecek yükseklikte (yerden 110 cm)."
    },
    emergencyBagChecklist: bagItems,
    ethicalGuardrails: {
      disclaimer: "Bu rapor AFAD, AKUT ve BM Sendai Çerçevesi saha yönergeleri temel alınarak oluşturulmuş yapay zekâ destekli bir hazırlık rehberidir. İnşaat mühendisliği yapısal karot/dayanıklılık testi veya tıbbi teşhis/reçete yerine geçmez.",
      engineeringNote: "Bina taşıyıcı sisteminizin deprem performansı için Çevre, Şehircilik ve İklim Değişikliği Bakanlığı'ndan yetkili kuruluşlarca bina performans analizi yaptırılmalıdır.",
      medicalNote: "Afet çantasında listelenen ilaçlar sadece hanedeki bireylerin hekimleri tarafından reçete edilmiş güncel ilaçların kesintiye uğramaması için yedekleme tavsiyesidir. Yeni ilaç kullanımı hekim onayına tabidir.",
      officialSources: [
        "AFAD - T.C. İçişleri Bakanlığı Afet ve Acil Durum Yönetimi Başkanlığı (afad.gov.tr)",
        "BM Afet Risklerinin Azaltılması Ofisi (UNDRR - Sendai Framework for Disaster Risk Reduction 2015-2030)",
        "TMMOB İnşaat Mühendisleri Odası Deprem ve Yapı Kılavuzları",
        "Türk Kızılayı Afet ve Acil Durum Hazırlık Yönergeleri"
      ]
    },
    analyzedAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    isSimulated: true
  };
}
