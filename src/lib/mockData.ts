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
    input.district.toLowerCase().includes("kagithane") ||
    input.city.toLowerCase().includes("rize") ||
    input.historicalGroundTag?.toLowerCase().includes("riverbed") ||
    input.historicalGroundTag?.toLowerCase().includes("dere") ||
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
      title: `${input.city} / ${input.district} - Historical Floodplain Memory`,
      soilType: "Alluvial Soil Layer, Clayey-Silt Backfill & High Water Table",
      historicalFact: `The ${input.neighborhood || input.district} area is an active historical watershed and seasonal flood basin. During torrential rainfall, the soil absorption capacity drops to zero in under 15 minutes.`,
      amplificationRisk: "The water table is within 1–2 meters of the surface; heavy cloudbursts cause municipal storm drains to backflow, creating immediate 50–100 cm inundation in ground and basement floors.",
      liquefactionTendency: "HIGH",
      warningBadge: "Critical Inundation & Soil Saturation"
    };
  } else if (
    input.district.toLowerCase().includes("avcılar") || 
    input.district.toLowerCase().includes("avcilar") || 
    input.historicalGroundTag?.toLowerCase().includes("landfill") ||
    input.historicalGroundTag?.toLowerCase().includes("dolgu")
  ) {
    groundMemory = {
      title: `${input.city} / ${input.district} - Coastal Landfill & Liquefaction Memory`,
      soilType: "Coastal Reclamation Fill, Loose Sand-Silt & Marine Deposits (Avcılar Formation)",
      historicalFact: "During the 1999 Mw 7.6 Gölcük Earthquake, severe structural collapse occurred in Avcılar despite being 110 km from the epicenter, driven by local micro-zonation resonance and soft soil wave trapping.",
      amplificationRisk: "Soil Amplification Factor: ~2.4x. Seismic S-waves become trapped in loose coastal fill, more than doubling surface shaking duration and amplitude.",
      liquefactionTendency: "HIGH",
      warningBadge: "Critical Seismic Amplification (Resonance)"
    };
  } else {
    groundMemory = {
      title: `${input.city} / ${input.district} - Micro-Zonation & Soil Profile`,
      soilType: input.historicalGroundTag || "Heterogeneous Ground & Weathered Slope Debris",
      historicalFact: `The ${input.neighborhood || input.district} sub-surface stratum has exhibited localized frequency shifts during historical tremors.`,
      amplificationRisk: "Inter-story drifts can escalate when the building natural vibration period coincides with the dominant soil vibration period.",
      liquefactionTendency: isOldBuilding ? "MEDIUM" : "LOW",
      warningBadge: "Standard Micro-Zonation Profile"
    };
  }

  // 2. DISASTER HAZARD MATRIX
  const hazards: HazardRisk[] = [];

  if (isFloodScenario) {
    hazards.push({
      rank: 1,
      hazardName: "Flash Flooding in Historical Riverbed & Storm Drain Backflow",
      riskLevel: "HIGH",
      probabilityScore: 88,
      geologicalReasoning: `Located in the valley basin of ${input.neighborhood || input.district} on the ground floor, the unit faces immediate inundation threats during cloudburst surges.`,
      immediateAction: "Elevate all power outlets at least 1.5m above floor level; install check valves on sewer pipes and RCCB on the main breaker."
    });
    hazards.push({
      rank: 2,
      hazardName: "Seismic Ground Shaking & Saturated Alluvial Deformation",
      riskLevel: isOldBuilding ? "HIGH" : "MEDIUM",
      probabilityScore: 72,
      geologicalReasoning: "When alluvial soil layers become water-saturated, their bearing capacity drops precipitously during seismic tremors.",
      immediateAction: "Anchor heavy furniture to load-bearing reinforced concrete columns or shear walls."
    });
    hazards.push({
      rank: 3,
      hazardName: "Utility Grid Interruption & Gas/Electrical Hazard",
      riskLevel: "MEDIUM",
      probabilityScore: 65,
      geologicalReasoning: "Rising water contacting wall electrical points triggers circuit shorts and water heater vent blockages.",
      immediateAction: "Shut off master electrical breaker with dry insulated tools upon water ingress; close gas cylinder/valves."
    });
  } else {
    hazards.push({
      rank: 1,
      hazardName: `${input.city} / ${input.district} Main Fault Rupture & Severe Ground Acceleration`,
      riskLevel: "HIGH",
      probabilityScore: isOldBuilding ? 95 : 82,
      geologicalReasoning: `${input.neighborhood || input.district} sits within the primary seismic risk zone. ${
        isOldBuilding 
          ? "Pre-1999 building code, potential rebar corrosion, and soil amplification multiply effective peak ground acceleration by ~2.4x." 
          : "Even in modern compliant structures, high peak accelerations violently fling unanchored interior furniture, blocking escape routes."
      }`,
      immediateAction: "Anchor all high wardrobes and bookcases with heavy-duty steel L-brackets; apply safety film to window glass."
    });
    hazards.push({
      rank: 2,
      hazardName: "Coastal Fill Soil Liquefaction & Shoreline Lateral Spreading",
      riskLevel: "MEDIUM",
      probabilityScore: 78,
      geologicalReasoning: "Loose sandy coastal strata lose shear resistance under cyclic earthquake loading, leading to differential building settlement.",
      immediateAction: "Pre-plan emergency evacuation route inland toward higher ground, away from coastal walls and reclaimed ground."
    });
    hazards.push({
      rank: 3,
      hazardName: "Post-Quake Natural Gas Rupture & 72-Hour Utility Grid Outage",
      riskLevel: "MEDIUM",
      probabilityScore: 64,
      geologicalReasoning: "Structural oscillations distort rigid gas piping, potentially causing joint fractures and secondary post-disaster fires.",
      immediateAction: "Install an automatic seismic shutoff solenoid valve on the building gas intake line."
    });
  }

  // 3. CRISIS TIMELINE (T+0-60s, T+1-15m, T+1-72h)
  const timeline: CrisisTimeline = isFloodScenario
    ? {
        phase60s: {
          timeframe: "T+0 - 60 Seconds",
          phaseName: "Immediate Inundation Inrush",
          title: "Electrical Isolation & Pet/Medication Preservation",
          actions: [
            "Before water reaches electrical sockets, immediately disconnect the master power breaker using a dry wooden pole or insulated gloves.",
            "Never throw open the street door abruptly; if street water exceeds the threshold, hydrostatic pressure will burst inwards violently.",
            "Transfer chronic patient's insulin and vital medicines to a high table or elevated shelf."
          ],
          vulnerableCare: "Secure household pet immediately into a hard-shell carrier box. Panicked animals reflexively hide or escape under furniture.",
          safetyRule: "Never step barefoot into standing water with submerged power strips; electrocution is a primary cause of flood fatalities.",
          badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
        },
        phase15m: {
          timeframe: "T+1 - 15 Minutes",
          phaseName: "Vertical Evacuation & Utility Cutoff",
          title: "Vertical Ascent from Ground Floor to Upper Levels",
          actions: [
            "If street is submerged, execute vertical evacuation to upper-floor neighbors instead of risking horizontal street wading.",
            "Shut off the natural gas boiler and master meter valve to prevent gas entrapment.",
            "Fasten waterproof emergency disaster bag to your back to keep both hands free."
          ],
          vulnerableCare: "Pack insulin into an insulated thermal pouch with ice pack; securely fasten pet leash.",
          safetyRule: "Never descend into basements to retrieve valuables; sewer backflow fills basement cavities in under 3 minutes.",
          badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30"
        },
        phase72h: {
          timeframe: "T+1 - 72 Hours",
          phaseName: "Survival & Epidemic Prevention",
          title: "Cold-Chain & Clean Hydration Management",
          actions: [
            "Strictly avoid municipal tap water and contaminated floodwaters for drinking or cooking; high risk of typhoid and dysentery.",
            "Preserve insulin cold chain in sealed ice packs sheltered away from direct sunlight.",
            "Signal rescue boats and search teams using high-frequency whistle and LED beacon."
          ],
          vulnerableCare: "Monitor diabetic blood sugar and blood pressure regularly; provide pets only with sealed bottled drinking water.",
          safetyRule: "Stay at least 20 meters away from submerged power poles, electrical transformers, and collapsed pavement.",
          badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
        }
      }
    : {
        phase60s: {
          timeframe: "T+0 - 60 Seconds",
          phaseName: "Shaking & Initial Inrush",
          title: "Bedside & Life Triangle Positioning",
          actions: [
            "Never rush toward balconies or stairwells; stairs are often the first structural element to collapse during tremors.",
            "Clear the toppling arc of bedroom wardrobes and adopt a fetal Drop-Cover-Hold On posture next to a sturdy bed base and nightstand.",
            "Shield your head and neck with a dense pillow or thick folded blanket against falling ceiling plaster and glass."
          ],
          vulnerableCare: "Instantly cradle infant tight against chest forming a single unit for Drop-Cover-Hold On. Guide elderly individual to the inner load-bearing wall, shielding their head.",
          safetyRule: "Do not stand inside doorways; modern architectural frames are non-structural and shifting doors can jam or cause severe head trauma.",
          badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/30"
        },
        phase15m: {
          timeframe: "T+1 - 15 Minutes",
          phaseName: "Post-Shaking Evacuation & Utility Cutoff",
          title: "Safe Stair Descent from 4th Floor",
          actions: [
            "The moment ground shaking ceases, immediately shut off the natural gas main valve, master electrical breaker, and water inlet.",
            "NEVER take the elevator; risk of cable rupture, guide derailment, or sudden entrapment due to power grid failure.",
            "Put on thick-soled boots against glass shards and sling the emergency disaster bag over your shoulders."
          ],
          vulnerableCare: "Secure infant into a front chest sling/carrier to keep both hands free for gripping stair handrails. Provide cane and dual-person escort for elderly relative.",
          safetyRule: "Do not rush or panic on stairwells; accumulated mortar dust and debris cause slips and dangerous human crushing.",
          badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30"
        },
        phase72h: {
          timeframe: "T+1 - 72 Hours",
          phaseName: "Autonomous Survival Without External Aid",
          title: "Muster Zone Protocol & Water/Medication Rationing",
          actions: [
            "Immediately evacuate inland away from sea walls and landfill zones toward designated official green muster parks.",
            "Enforce strict rationing of the 3 liters/person/day drinking water quota; dehydration is the primary 72-hour threat.",
            "Preserve cellular bandwidth; communicate strictly via SMS and receive official alerts via hand-crank emergency radio."
          ],
          vulnerableCare: "Administer scheduled 7-day cardiac/hypertension medications on time. Wrap infant in mylar emergency thermal blanket to prevent hypothermia.",
          safetyRule: "Never re-enter a cracked or damaged structure to retrieve personal items until licensed civil engineers issue a Green Safe Placard.",
          badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
        }
      };

  // 4. FURNITURE FIXING PLAN
  const fixingItems: FurnitureFixingItem[] = [];
  
  const hasWardrobe = input.roomRiskTags.some(t => 
    t.toLowerCase().includes("wardrobe") || 
    t.toLowerCase().includes("cabinet") || 
    t.toLowerCase().includes("gardırop") || 
    t.toLowerCase().includes("dolap")
  ) || input.roomMode === "photo";

  if (hasWardrobe) {
    fixingItems.push({
      item: "Tall Bedroom Wooden Wardrobe / Cabinet",
      riskDescription: "Positioned directly inside the forward toppling zone onto the bed; presents severe crush hazard and blocks egress doorway.",
      fixingMethod: "Secure top corners to reinforced concrete wall using minimum two 50x50 mm steel L-brackets and heavy-duty masonry anchors at 45-degree angles.",
      urgency: "CRITICAL"
    });
  }

  const hasWindow = input.roomRiskTags.some(t => 
    t.toLowerCase().includes("window") || 
    t.toLowerCase().includes("glass") || 
    t.toLowerCase().includes("pencere") || 
    t.toLowerCase().includes("cam")
  );

  if (hasWindow) {
    fixingItems.push({
      item: "Bedroom Window Glass Panels & Frame",
      riskDescription: "Seismic racking causes non-tempered glass panes to shatter violently across the sleeping area like sharp shrapnel.",
      fixingMethod: "Apply certified transparent anti-shatter safety film to all panes and shift bed at least 1.5 meters away from window line.",
      urgency: "CRITICAL"
    });
  }

  const hasShelf = input.roomRiskTags.some(t => 
    t.toLowerCase().includes("shelf") || 
    t.toLowerCase().includes("frame") || 
    t.toLowerCase().includes("tablo") || 
    t.toLowerCase().includes("raf")
  );

  if (hasShelf) {
    fixingItems.push({
      item: "Overhead Wall Shelves & Heavy Framed Art",
      riskDescription: "Vertical seismic ground accelerations dislodge unlatched items in the first seconds, causing direct head and neck trauma.",
      fixingMethod: "Dismantle all shelves above headboards; re-hang artwork strictly using interlocking seismic locking anchor brackets.",
      urgency: "CRITICAL"
    });
  }

  const hasCurtainOrPanel = input.roomRiskTags.some(t => 
    t.toLowerCase().includes("curtain") || 
    t.toLowerCase().includes("panel") || 
    t.toLowerCase().includes("socket") || 
    t.toLowerCase().includes("perde") || 
    t.toLowerCase().includes("pano") || 
    t.toLowerCase().includes("priz")
  );

  if (hasCurtainOrPanel) {
    fixingItems.push({
      item: "Electrical Breaker Panel / Flammable Drapes Near Flood Level",
      riskDescription: "Electrical sparking or water contact instantly ignites synthetic fabrics, filling the evacuation corridor with toxic smoke.",
      fixingMethod: "Clear textile materials within 1 meter of panels; install IP65 waterproof sealed covers on lower wall sockets.",
      urgency: "CRITICAL"
    });
  }

  const hasHallway = input.roomRiskTags.some(t => 
    t.toLowerCase().includes("hallway") || 
    t.toLowerCase().includes("shoe") || 
    t.toLowerCase().includes("door") || 
    t.toLowerCase().includes("koridor") || 
    t.toLowerCase().includes("ayakkabılık") || 
    t.toLowerCase().includes("kapı")
  );

  if (hasHallway) {
    fixingItems.push({
      item: "Exit Corridor Shoe Cabinet & Wardrobe",
      riskDescription: "When toppled, blocks the main front entry door from opening inward, transforming the apartment into an enclosed trap.",
      fixingMethod: "Anchor corridor storage to side walls; maintain a completely clear 90-degree swing arc for the primary exit door.",
      urgency: "CRITICAL"
    });
  }

  if (fixingItems.length === 0) {
    fixingItems.push({
      item: "General Bedroom Freestanding Furniture",
      riskDescription: "Unanchored nightstands, mirrors, and vanity tables slide and topple during strong ground shaking.",
      fixingMethod: "Attach anti-slip silicone pads beneath furniture legs and secure tall items with heavy-duty tension straps.",
      urgency: "IMPORTANT"
    });
  }

  // 5. DYNAMIC EMERGENCY BAG CHECKLIST
  const bagItems: EmergencyBagItem[] = [
    {
      id: "gen-1",
      item: "High-Decibel Emergency Survival Whistle (1 per Person)",
      category: "General",
      priority: "Critical",
      details: "Audible up to 500m under rubble; vocal cords exhaust rapidly while a whistle saves vital energy."
    },
    {
      id: "gen-2",
      item: "Sealed Drinking Water: 3 Liters / Person / Day (72-Hour Supply)",
      category: "General",
      priority: "Critical",
      details: "Hydration is the indispensable prerequisite for 72-hour survival; keep stored in durable sealed PET bottles."
    },
    {
      id: "gen-3",
      item: "Hand-Crank Dynamo / Battery LED Flashlight & Spare Batteries",
      category: "General",
      priority: "Critical",
      details: "Spark-proof sealed LED casing; never use open matches or lighters due to potential fractured gas pipes."
    },
    {
      id: "gen-4",
      item: "Comprehensive Trauma First Aid Kit & Hemostatic Tourniquet",
      category: "General",
      priority: "Critical",
      details: "Sterile gauze rolls, elastic compression bandages, burn gel, medical shears, and certified CAT tourniquet."
    },
    {
      id: "gen-5",
      item: "Multi-Tool Pocket Knife & Particle Dust Masks (FFP2/FFP3/N95)",
      category: "General",
      priority: "Important",
      details: "Filters pulverized concrete and silica dust to prevent acute respiratory distress during rubble transit."
    }
  ];

  if (input.vulnerableGroups.includes("baby")) {
    bagItems.push(
      {
        id: "baby-1",
        item: "Infant Formula & Sterile Feeding Bottles (72-Hour Supply)",
        category: "Infant (0-3)",
        priority: "Critical",
        details: "Ready-to-feed formula jars or pre-measured powder requiring zero cooking + sealed sterile water.",
        forGroup: "baby"
      },
      {
        id: "baby-2",
        item: "Ergonomic Baby Carrier Sling",
        category: "Infant (0-3)",
        priority: "Critical",
        details: "Enables safe descent down 4 flights of stairs while leaving both parental hands free for handrails.",
        forGroup: "baby"
      },
      {
        id: "baby-3",
        item: "Hypoallergenic Diapers, Wet Wipes & Rash Barrier Cream",
        category: "Infant (0-3)",
        priority: "Important",
        details: "At least 18 sealed diapers in waterproof ziplock bags with travel-size antiseptic wipes.",
        forGroup: "baby"
      },
      {
        id: "baby-4",
        item: "Child Vaccination Records & Identification Copies",
        category: "Infant (0-3)",
        priority: "Critical",
        details: "Photocopies of child ID and vaccination history sealed inside a waterproof sleeve.",
        forGroup: "baby"
      }
    );
  }

  if (input.vulnerableGroups.includes("elderly")) {
    bagItems.push(
      {
        id: "elderly-1",
        item: "Prescription Cardiac / Hypertension Medication & Dosing Schedule (7-Day)",
        category: "Elderly (65+)",
        priority: "Critical",
        details: "Kept in original pharmacy packaging with physician prescription copy and dosing timetable.",
        forGroup: "elderly"
      },
      {
        id: "elderly-2",
        item: "Spare Prescription Eyeglasses & Hearing Aid Batteries",
        category: "Elderly (65+)",
        priority: "Critical",
        details: "Preserves vital sensory orientation and balance in dark, dust-filled emergency stairwells.",
        forGroup: "elderly"
      },
      {
        id: "elderly-3",
        item: "Foldable Evacuation Walking Cane / Quad-Pod",
        category: "Elderly (65+)",
        priority: "Important",
        details: "Prevents tripping and falls over broken pavement, shattered masonry, and dark stair steps.",
        forGroup: "elderly"
      }
    );
  }

  if (input.vulnerableGroups.includes("chronic_illness")) {
    bagItems.push(
      {
        id: "chr-1",
        item: "Thermal Insulin Cold-Chain Carrying Pouch & Sealed Ice Pack",
        category: "Chronic / Medication",
        priority: "Critical",
        details: "Preserves insulin at 2–8°C for up to 48 hours during total power grid failure.",
        forGroup: "chronic_illness"
      },
      {
        id: "chr-2",
        item: "Portable Blood Glucose Meter / Sphygmomanometer & Test Strips",
        category: "Chronic / Medication",
        priority: "Important",
        details: "Monitors acute stress-induced glycemic spikes or hypertension crises during displacement.",
        forGroup: "chronic_illness"
      }
    );
  }

  if (input.vulnerableGroups.includes("pet")) {
    bagItems.push(
      {
        id: "pet-1",
        item: "Hard-Shell Pet Carrier Box & Reinforced Harness/Leash",
        category: "Pet",
        priority: "Critical",
        details: "Prevents panicked cats or dogs from fleeing, getting crushed, or lost amid sirens and rubble.",
        forGroup: "pet"
      },
      {
        id: "pet-2",
        item: "3-Day Dry Pet Food Supply, Collapsible Bowl & Vaccination Passport",
        category: "Pet",
        priority: "Important",
        details: "Microchip records and rabies vaccination papers required for admission into official tent shelters.",
        forGroup: "pet"
      }
    );
  }

  if (input.vulnerableGroups.includes("disabled")) {
    bagItems.push(
      {
        id: "dis-1",
        item: "Emergency Evacuation Transfer Sling / Rescue Carrying Sheet",
        category: "Mobility-Impaired",
        priority: "Critical",
        details: "Enables two people to safely carry a mobility-impaired individual down stairs when elevators fail.",
        forGroup: "disabled"
      },
      {
        id: "dis-2",
        item: "High-Visibility Flashing LED Beacon & Audio Locator",
        category: "Mobility-Impaired",
        priority: "Critical",
        details: "Continuous strobe beacon guiding SAR rescue teams directly to trapped individuals.",
        forGroup: "disabled"
      }
    );
  }

  return {
    summary: `Comprehensive disaster resilience analysis conducted for a ${input.householdCount}-person household in ${input.city}, ${input.district} ${input.neighborhood ? `(${input.neighborhood})` : ""}, residing on Floor ${input.floorNumber} of a ${
      isOldBuilding ? "pre-1999 structure" : isPost2018 ? "post-2018 modern seismic-compliant building" : "2000-2018 transitional code structure"
    }. Historical ground memory and emergency action simulation have been prioritized for ${
      isFloodScenario
        ? "flash flooding, high water table saturation, and municipal sewer backflow."
        : "seismic ground acceleration, soft-soil amplification resonance, and non-structural toppling risks."
    }`,
    overallResilienceScore: resilienceScore,
    sdgAlignment: {
      sdg11_5: `SDG 11.5 Direct Contribution: ${
        input.vulnerableGroups.includes("baby") || input.vulnerableGroups.includes("elderly")
          ? "Eliminates non-structural crush traps and optimizes stair descent protocols for infants and elderly residents, minimizing fatality risks."
          : "Neutralizes domestic physical hazards to protect household lives and reduce disaster-induced injuries."
      }`,
      sdg13_1: `SDG 13.1 Direct Contribution: Strengthens autonomous 72-hour survival capacity against ${input.city}'s severe ${isFloodScenario ? "climate-driven flood surges" : "seismic ground motions"}.`,
      impactMetric: `Implementing mechanical furniture anchoring and the synchronized crisis timeline elevates household resilience to ${Math.min(95, resilienceScore + 40)}%.`
    },
    historicalGroundMemory: groundMemory,
    disasterMatrix: hazards,
    crisisTimeline: timeline,
    roomSafetyGuide: {
      furnitureFixingPlan: fixingItems,
      bedRelocationAdvice: hasWindow
        ? "Reposition bed at least 1.5–2 meters inward from exterior window glass along an interior load-bearing partition, well outside the toppling arc of tall storage units."
        : "Position bed so it does not obstruct the 90-degree opening arc of the bedroom door, keeping at least 1 meter clearance from tall furniture.",
      lifeTriangleSpot: {
        locationName: isFloodScenario ? "Elevated Platform Edge & Heavy Table Void" : "Bed Base & Solid Nightstand Compression Void",
        coordinatesDescription: isFloodScenario
          ? "Adjacent to the highest solid elevation in the room, strictly separated from floor-level electrical wiring."
          : "Along the interior partition wall between the heavy nightstand and the loaded bed base, assuming a compact fetal Drop-Cover-Hold On posture.",
        safetyRationale: isFloodScenario
          ? "Elevated interior platforms ensure staying dry during the first 15 minutes while shielding occupants from submerged wiring."
          : "During ceiling plaster detachment or partial structural failure, the rigid bed frame prevents pancake floor collapse, preserving a 40–60 cm survivable void (life triangle)."
      },
      emergencyBagLocation: isFloodScenario
        ? "Mounted at least 130 cm above floor level on a dedicated wall bracket or upper shelf to prevent floodwater soaking."
        : "Wall-mounted immediately adjacent to the bedroom exit door at 110 cm height, reachable within 5 seconds in total darkness."
    },
    emergencyBagChecklist: bagItems,
    ethicalGuardrails: {
      disclaimer: "This report is an AI-powered preparedness roadmap based on AFAD, UNDRR Sendai Framework, and international emergency protocols. It does NOT substitute for official civil engineering core testing (karot), structural integrity certificates, or physician medical prescriptions.",
      engineeringNote: "For certified building structural performance, engage authorized civil engineering consulting firms and municipal disaster evaluation bureaus.",
      medicalNote: "Medication items listed represent logistical backups of existing physician-prescribed treatments; starting new medications requires direct medical consultation.",
      officialSources: [
        "AFAD - Republic of Türkiye Disaster and Emergency Management Authority (afad.gov.tr)",
        "UNDRR - United Nations Office for Disaster Risk Reduction (Sendai Framework 2015-2030)",
        "Chamber of Civil Engineers (TMMOB) Earthquake & Structural Guidelines",
        "Turkish Red Crescent Disaster & Emergency Preparedness Protocols"
      ]
    },
    analyzedAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    isSimulated: true
  };
}
