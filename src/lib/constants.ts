import { UserInput } from "@/types/disaster";

export const TURKISH_CITIES: Record<string, string[]> = {
  "İstanbul": [
    "Avcılar", "Kağıthane", "Bakırköy", "Küçükçekmece", "Zeytinburnu", "Kadıköy", 
    "Fatih", "Üsküdar", "Maltepe", "Kartal", "Pendik", "Beylikdüzü",
    "Esenyurt", "Bağcılar", "Bahçelievler", "Şişli", "Beşiktaş", "Sarıyer"
  ],
  "İzmir": [
    "Bayraklı", "Bornova", "Karşıyaka", "Konak", "Buca", "Karabağlar", 
    "Çiğli", "Seferihisar", "Urla", "Menemen", "Balçova"
  ],
  "Hatay": [
    "Antakya", "Defne", "İskenderun", "Samandağ", "Kırıkhan", "Arsuz", "Dörtyol"
  ],
  "Kahramanmaraş": [
    "Onikişubat", "Dulkadiroğlu", "Elbistan", "Afşin", "Pazarcık", "Türkoğlu"
  ],
  "Rize": [
    "Merkez", "Çayeli", "Ardeşen", "Pazar", "Fındıklı", "Güneysu"
  ],
  "Ankara": [
    "Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Etimesgut", "Sincan", "Altındağ"
  ],
  "Bursa": [
    "Osmangazi", "Nilüfer", "Yıldırım", "Gemlik", "Mudanya", "İnegöl"
  ],
  "Antalya": [
    "Muratpaşa", "Kepez", "Konyaaltı", "Alanya", "Manavgat", "Kemer", "Kaş"
  ],
  "Gaziantep": [
    "Şahinbey", "Şehitkamil", "Nizip", "İslahiye", "Nurdağı"
  ],
  "Malatya": [
    "Battalgazi", "Yeşilyurt", "Doğanşehir", "Akçadağ"
  ],
  "Adana": [
    "Seyhan", "Çukurova", "Yüreğir", "Sarıçam", "Ceyhan"
  ]
};

export const BUILDING_AGE_OPTIONS = [
  {
    id: "pre1999",
    title: "1999 Öncesi (Yüksek Risk Grubu)",
    description: "1998 Deprem Yönetmeliği öncesi yapılar; hazır beton ve nervürlü demir kullanımı nadir, korozyon riski yüksek.",
    badge: "Kritik İnceleme",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20"
  },
  {
    id: "2000_2018",
    title: "2000 - 2018 Arası",
    description: "2007 Deprem Yönetmeliği standartları, yapı denetim sistemi ve C20+ hazır beton kullanımı.",
    badge: "Orta Risk / Standart",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
  },
  {
    id: "post2018",
    title: "2018 Sonrası (TBDY 2018)",
    description: "Türkiye Bina Deprem Yönetmeliği (TBDY 2018) güncel yüksek sismik güvenlik ve zemin parametreleri.",
    badge: "Güncel Standart",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  }
];

export const FLOOR_LEVEL_OPTIONS = [
  {
    id: "basement_ground",
    title: "Bodrum / Zemin Kat",
    description: "Doğrudan tahliye avantajı ancak sel/su baskını, zemin nemi ve yumuşak kat riski."
  },
  {
    id: "middle",
    title: "Ara Kat (2 - 6. Katlar)",
    description: "Bina salınımı ortalama seviyede; merdiven kullanım süresi orta düzey."
  },
  {
    id: "top_high",
    title: "Üst / Çatı Katı (7+ Kat)",
    description: "Yüksek salınım ve rezonans ivmesi, uzamış tahliye süresi; devrilme riskleri daha yüksek."
  }
];

export const ENVIRONMENT_RISK_OPTIONS = [
  {
    id: "river_coastal",
    label: "Dere Yatağı / Kıyı Dolgu Alanı",
    sub: "Sıvılaşma ve ani su taşkını tehlikesi",
    icon: "Waves"
  },
  {
    id: "steep_slope",
    label: "Dik Yamaç / Eğimli Arazi",
    sub: "Heyelan, toprak kayması ve kaya düşmesi",
    icon: "Mountain"
  },
  {
    id: "dense_vegetation",
    label: "Orman / Yoğun Kuru Bitki Örtüsü",
    sub: "Yaz dönemi orman/çalı yangını sıçrama riski",
    icon: "Flame"
  },
  {
    id: "fault_line",
    label: "Fay Hattı Tampon Bölgesi",
    sub: "Doğrudan yüzey kırığı ve yüksek ivmeli yer hareketi",
    icon: "Activity"
  }
];

export const HISTORICAL_GROUND_PRESETS = [
  {
    id: "stream_bed",
    label: "Eski dere yatağı geçmişi",
    desc: "Tarihsel su akış kolu, ıslah edilmiş kanal komşuluğu"
  },
  {
    id: "coastal_fill",
    label: "Kıyı / Sahil dolgu zemin",
    desc: "Denizden kazanılmış dolgu alan, sıvılaşma eğilimli"
  },
  {
    id: "alluvial_soft",
    label: "Alüvyon / Yumuşak killi zemin",
    desc: "Sismik dalgaları büyütücü (amplification) gevşek katman"
  },
  {
    id: "slope_landslide",
    label: "Eğimli / Heyelan hafızası",
    desc: "Aşırı yağış ve sarsıntıda zemin kayması geçmişi"
  },
  {
    id: "massive_rock",
    label: "Masif kayaç / Sağlam zemin",
    desc: "Düşük zemin büyütmesi, taşıma gücü yüksek"
  }
];

export const VULNERABLE_GROUP_OPTIONS = [
  {
    id: "baby",
    label: "0-3 Yaş Bebek / Çocuk",
    desc: "Mama, steril su, bez, kanguru/sling, aşı kartı",
    icon: "Baby",
    color: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300"
  },
  {
    id: "elderly",
    label: "65+ Yaşlı Birey",
    desc: "Baston/yürüteç, tansiyon/kalp ilaçları, yedek gözlük",
    icon: "UserCheck",
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300"
  },
  {
    id: "disabled",
    label: "Engelli / Hareket Kısıtı",
    desc: "Tekerlekli sandalye tahliyesi, sesli/görsel uyarı, transfer",
    icon: "Accessibility",
    color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300"
  },
  {
    id: "chronic_illness",
    label: "Kronik Hasta / Düzenli İlaç",
    desc: "İnsülin soğuk zinciri, 7 günlük acil ilaç, reçete kopyası",
    icon: "Pill",
    color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-300"
  },
  {
    id: "pet",
    label: "Evcil Hayvan",
    desc: "Taşıma kutusu (box), tasma, 3 günlük mama, aşı karnesi",
    icon: "HeartHandshake",
    color: "from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-300"
  }
];

export const ROOM_RISK_PRESET_TAGS = [
  "Yatak yanında sabitlenmemiş yüksek gardırop / dolap",
  "Yatak doğrudan pencere / cam panel altında",
  "Oda çıkış kapısında devrilebilecek ayna veya askılık",
  "Yatak başucu üstünde ağır çerçeveli tablo / duvar rafı",
  "Kaçış koridorunu daraltan ayakkabılık veya kitaplık",
  "Elektrik panosu / priz yakınında tutuşabilir uzun tül perde",
  "Tavanda ağır kristal avize",
  "Devrilme olasılığı yüksek ince ayaklı lambader / dekoratif vazo"
];

// DEMO 1: Deprem & Dolgu Zemin (İstanbul / Avcılar - Denizköşkler Mah.)
export const DEMO_PRESET_SCENARIO_1: UserInput = {
  city: "İstanbul",
  district: "Avcılar",
  neighborhood: "Denizköşkler Mahallesi (Marmara Sahil Kordonu)",
  historicalGroundTag: "Kıyı / Sahil dolgu zemin",
  buildingAge: "pre1999",
  floorLevel: "middle",
  floorNumber: 4,
  environmentRisks: ["river_coastal", "fault_line"],
  householdCount: 4,
  vulnerableGroups: ["baby", "elderly"],
  roomMode: "tags",
  roomRiskTags: [
    "Yatak yanında sabitlenmemiş yüksek gardırop / dolap",
    "Yatak doğrudan pencere / cam panel altında",
    "Yatak başucu üstünde ağır çerçeveli tablo / duvar rafı",
    "Kaçış koridorunu daraltan ayakkabılık veya kitaplık"
  ],
  customNotes: "Evde 10 aylık bebek ve 72 yaşında kalp ilacı kullanan büyükanne bulunuyor. Gece olası sarsıntıda 4. kattan merdiven tahliyesi kritik."
};

// DEMO 2: Sel & Eski Dere Yatağı (İstanbul / Kağıthane - Cendere Vadisi)
export const DEMO_PRESET_SCENARIO_2: UserInput = {
  city: "İstanbul",
  district: "Kağıthane",
  neighborhood: "Cendere Vadisi / Merkez Mahallesi (Eski Ayazağa Deresi Havzası)",
  historicalGroundTag: "Eski dere yatağı geçmişi",
  buildingAge: "2000_2018",
  floorLevel: "basement_ground",
  floorNumber: 0,
  environmentRisks: ["river_coastal"],
  householdCount: 3,
  vulnerableGroups: ["chronic_illness", "pet"],
  roomMode: "tags",
  roomRiskTags: [
    "Elektrik panosu / priz yakınında tutuşabilir uzun tül perde",
    "Kaçış koridorunu daraltan ayakkabılık veya kitaplık",
    "Oda çıkış kapısında devrilebilecek ayna veya askılık"
  ],
  customNotes: "Evde insülin bağımlı diyabet hastası ve 1 kedi var. Giriş katta şiddetli sağanakta su baskını ve elektrik şebekesi kısa devre riski yüksek."
};

// Default alias
export const DEMO_PRESET_SCENARIO = DEMO_PRESET_SCENARIO_1;

export const SDG_METADATA = {
  sdg11: {
    code: "SDG 11.5",
    title: "Sürdürülebilir Şehirler ve Topluluklar",
    target: "2030'a kadar afetlerin yol açtığı can kayıplarını ve doğrudan ekonomik kayıpları azaltmak; yoksul ve kırılgan durumdaki kişileri korumaya odaklanmak.",
    color: "bg-[#FD9D24]",
    textColor: "text-[#FD9D24]"
  },
  sdg13: {
    code: "SDG 13.1",
    title: "İklim Eylemi",
    target: "Tüm ülkelerde iklim kaynaklı tehlikelere ve doğal afetlere karşı direnç ve uyum kapasitesini güçlendirmek.",
    color: "bg-[#3F7E44]",
    textColor: "text-[#3F7E44]"
  }
};
