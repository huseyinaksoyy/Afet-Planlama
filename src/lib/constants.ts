import { UserInput } from "@/types/disaster";

export const TURKISH_CITIES: Record<string, string[]> = {
  "Istanbul": [
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
    title: "Pre-1999 (High Risk Tier)",
    description: "Built prior to the 1998 Earthquake Code; unribbed rebar & non-ready-mix concrete common, elevated corrosion.",
    badge: "Critical Inspection",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20"
  },
  {
    id: "2000_2018",
    title: "2000 - 2018 (Transitional Code)",
    description: "2007 Seismic Code standards, certified building inspection system, and C20+ ready-mix concrete.",
    badge: "Moderate Risk / Standard",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
  },
  {
    id: "post2018",
    title: "Post-2018 (Modern TBDY 2018)",
    description: "Compliant with Turkey Building Earthquake Code (TBDY 2018) modern seismic engineering & site parameters.",
    badge: "Modern Standard",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  }
];

export const FLOOR_LEVEL_OPTIONS = [
  {
    id: "basement_ground",
    title: "Basement / Ground Floor",
    description: "Direct ground escape advantage; elevated risk of flash inundation, dampness, and soft-story vulnerability."
  },
  {
    id: "middle",
    title: "Middle Floors (Floors 2 - 6)",
    description: "Average structural resonance; moderate staircase descent evacuation time."
  },
  {
    id: "top_high",
    title: "Upper / Penthouse Floors (7+ Floors)",
    description: "High lateral displacement acceleration, prolonged staircase escape time, elevated furniture toppling."
  }
];

export const ENVIRONMENT_RISK_OPTIONS = [
  {
    id: "river_coastal",
    label: "River Bed / Coastal Fill Zone",
    sub: "Soil liquefaction and rapid flash flooding hazard",
    icon: "Waves"
  },
  {
    id: "steep_slope",
    label: "Steep Slope / Mountainous Terrain",
    sub: "Landslide, mudflow, and rockfall hazard",
    icon: "Mountain"
  },
  {
    id: "dense_vegetation",
    label: "Wildland-Urban Interface / Forest",
    sub: "Summer wildfire perimeter jumping hazard",
    icon: "Flame"
  },
  {
    id: "fault_line",
    label: "Active Fault Buffer Zone",
    sub: "Direct surface rupture and extreme peak ground acceleration",
    icon: "Activity"
  }
];

export const HISTORICAL_GROUND_PRESETS = [
  {
    id: "stream_bed",
    label: "Historical stream bed memory",
    desc: "Ancient water tributary, reclaimed river basin"
  },
  {
    id: "coastal_fill",
    label: "Coastal / Reclamation fill soil",
    desc: "Marine reclamation fill, liquefaction-prone"
  },
  {
    id: "alluvial_soft",
    label: "Alluvial / Soft clay soil",
    desc: "Loose layer causing high seismic soil amplification"
  },
  {
    id: "slope_landslide",
    label: "Steep slope / Landslide memory",
    desc: "History of soil movement during heavy rainfall or tremors"
  },
  {
    id: "massive_rock",
    label: "Solid massive bedrock",
    desc: "Low soil amplification, high structural bearing capacity"
  }
];

export const VULNERABLE_GROUP_OPTIONS = [
  {
    id: "baby",
    label: "Infant / Toddler (0-3 Years)",
    desc: "Formula, sterile water, diapers, ergonomic sling/carrier, vaccination card",
    icon: "Baby",
    color: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300"
  },
  {
    id: "elderly",
    label: "Elderly Resident (65+ Years)",
    desc: "Foldable cane/walker, blood pressure & heart meds, backup eyeglasses",
    icon: "UserCheck",
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300"
  },
  {
    id: "disabled",
    label: "Mobility-Impaired / Disabled",
    desc: "Stair evacuation harness, audible/visual locator beacon, transfer sling",
    icon: "Accessibility",
    color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300"
  },
  {
    id: "chronic_illness",
    label: "Chronic Patient / Daily Medication",
    desc: "Thermal insulin cold-chain bag (2-8°C), 7-day emergency meds, prescription copy",
    icon: "Pill",
    color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-300"
  },
  {
    id: "pet",
    label: "Domestic Pet",
    desc: "Hard-shell transport carrier box, chest leash, 3-day food, vaccination card",
    icon: "HeartHandshake",
    color: "from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-300"
  }
];

export const ROOM_RISK_PRESET_TAGS = [
  "Unsecured tall wardrobe / heavy bookcase beside bed",
  "Bed positioned directly beneath window / glass panel",
  "Exit door pathway obstructed by heavy mirror or hanging rack",
  "Heavy framed artwork / wall shelf hanging over headboard",
  "Narrow escape hallway constricted by shoe cabinet or shelving",
  "Long flammable curtains near electrical breaker / wall outlets",
  "Heavy crystal chandelier hanging over sleeping area",
  "Unstable freestanding floor lamp / tall decorative vase"
];

// DEMO 1: Earthquake & Coastal Soil Amplification (Istanbul / Avcılar - Denizköşkler)
export const DEMO_PRESET_SCENARIO_1: UserInput = {
  city: "Istanbul",
  district: "Avcılar",
  neighborhood: "Denizköşkler Neighborhood (Marmara Coastal Promenade)",
  historicalGroundTag: "Coastal / Reclamation fill soil",
  buildingAge: "pre1999",
  floorLevel: "middle",
  floorNumber: 4,
  environmentRisks: ["river_coastal", "fault_line"],
  householdCount: 4,
  vulnerableGroups: ["baby", "elderly"],
  roomMode: "tags",
  roomRiskTags: [
    "Unsecured tall wardrobe / heavy bookcase beside bed",
    "Bed positioned directly beneath window / glass panel",
    "Heavy framed artwork / wall shelf hanging over headboard",
    "Narrow escape hallway constricted by shoe cabinet or shelving"
  ],
  customNotes: "Household with a 10-month-old infant and a 72-year-old grandmother on cardiovascular medication. 4th floor staircase descent during night tremor is critical."
};

// DEMO 2: Flash Flood & Historical Riverbed Basin (Istanbul / Kağıthane - Cendere Valley)
export const DEMO_PRESET_SCENARIO_2: UserInput = {
  city: "Istanbul",
  district: "Kağıthane",
  neighborhood: "Cendere Valley / Central Neighborhood (Historical Stream Basin)",
  historicalGroundTag: "Historical stream bed memory",
  buildingAge: "2000_2018",
  floorLevel: "basement_ground",
  floorNumber: 0,
  environmentRisks: ["river_coastal"],
  householdCount: 3,
  vulnerableGroups: ["chronic_illness", "pet"],
  roomMode: "tags",
  roomRiskTags: [
    "Long flammable curtains near electrical breaker / wall outlets",
    "Narrow escape hallway constricted by shoe cabinet or shelving",
    "Exit door pathway obstructed by heavy mirror or hanging rack"
  ],
  customNotes: "Household with an insulin-dependent diabetic patient and 1 pet cat. Ground floor apartment vulnerable to rapid storm runoff, sewer backflow, and electrical short-circuit hazard."
};

export const DEMO_PRESET_SCENARIO = DEMO_PRESET_SCENARIO_1;

export const SDG_METADATA = {
  sdg11: {
    code: "SDG 11.5",
    title: "Sustainable Cities and Communities",
    target: "By 2030, significantly reduce the number of deaths and the number of people affected and substantially decrease the direct economic losses caused by disasters, with a focus on protecting the poor and people in vulnerable situations.",
    color: "bg-[#FD9D24]",
    textColor: "text-[#FD9D24]"
  },
  sdg13: {
    code: "SDG 13.1",
    title: "Climate Action",
    target: "Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries.",
    color: "bg-[#3F7E44]",
    textColor: "text-[#3F7E44]"
  }
};
