export interface UserInput {
  city: string;
  district: string;
  neighborhood?: string;
  historicalGroundTag?: string;
  buildingAge: "pre1999" | "2000_2018" | "post2018";
  floorLevel: "basement_ground" | "middle" | "top_high";
  floorNumber: number;
  environmentRisks: string[];
  householdCount: number;
  vulnerableGroups: string[];
  roomMode: "tags" | "photo";
  roomRiskTags: string[];
  roomPhotoBase64?: string;
  roomPhotoPreview?: string;
  customNotes?: string;
}

export interface HazardRisk {
  rank: number;
  hazardName: string;
  riskLevel: "YÜKSEK" | "ORTA" | "DÜŞÜK";
  probabilityScore: number; // 0 - 100
  geologicalReasoning: string;
  immediateAction: string;
}

export interface HistoricalGroundMemory {
  title: string;
  soilType: string;
  historicalFact: string;
  amplificationRisk: string;
  liquefactionTendency: "YÜKSEK" | "ORTA" | "DÜŞÜK";
  warningBadge: string;
}

export interface CrisisTimelinePhase {
  timeframe: string;
  phaseName: string;
  title: string;
  actions: string[];
  vulnerableCare: string;
  safetyRule: string;
  badgeColor: string;
}

export interface CrisisTimeline {
  phase60s: CrisisTimelinePhase;
  phase15m: CrisisTimelinePhase;
  phase72h: CrisisTimelinePhase;
}

export interface FurnitureFixingItem {
  item: string;
  riskDescription: string;
  fixingMethod: string;
  urgency: "ACİL" | "ÖNEMLİ" | "STANDART";
}

export interface LifeTriangleSpot {
  locationName: string;
  coordinatesDescription: string;
  safetyRationale: string;
}

export interface RoomSafetyGuide {
  furnitureFixingPlan: FurnitureFixingItem[];
  bedRelocationAdvice: string;
  lifeTriangleSpot: LifeTriangleSpot;
  emergencyBagLocation: string;
}

export interface EmergencyBagItem {
  id: string;
  item: string;
  category: "Genel" | "Bebek (0-3 Yaş)" | "Yaşlı (65+)" | "Kronik Hasta / İlaç" | "Engelli / Kısıtlı" | "Evcil Hayvan";
  priority: "Kritik" | "Önemli" | "Destek";
  details: string;
  forGroup?: string;
}

export interface EthicalGuardrails {
  disclaimer: string;
  engineeringNote: string;
  medicalNote: string;
  officialSources: string[];
}

export interface SdgAlignment {
  sdg11_5: string;
  sdg13_1: string;
  impactMetric: string;
}

export interface DisasterAnalysisResult {
  summary: string;
  overallResilienceScore: number;
  sdgAlignment: SdgAlignment;
  historicalGroundMemory: HistoricalGroundMemory;
  disasterMatrix: HazardRisk[];
  crisisTimeline: CrisisTimeline;
  roomSafetyGuide: RoomSafetyGuide;
  emergencyBagChecklist: EmergencyBagItem[];
  ethicalGuardrails: EthicalGuardrails;
  analyzedAt: string;
  isSimulated?: boolean;
}
