"use client";

import React, { useState } from "react";
import { 
  DisasterAnalysisResult 
} from "@/types/disaster";
import { 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Compass, 
  Wrench, 
  HeartHandshake, 
  FileText, 
  Info, 
  Printer, 
  Sparkles, 
  ShieldAlert, 
  BookmarkCheck,
  Check,
  Clock,
  MapPin,
  Activity
} from "lucide-react";

interface OutputPanelProps {
  result: DisasterAnalysisResult | null;
  isLoading: boolean;
  loadingStepText: string;
  onLoadDemo: () => void;
  onPrint: () => void;
}

export default function OutputPanel({
  result,
  isLoading,
  loadingStepText,
  onLoadDemo,
  onPrint
}: OutputPanelProps) {
  // Local state for interactive emergency bag checklist checkboxes
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheckItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 1. LOADING STATE
  if (isLoading) {
    return (
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 text-slate-100 min-h-[600px] flex flex-col justify-center items-center text-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2 max-w-md">
          <h3 className="text-lg font-bold text-white">
            Executing Multi-Layer Generative AI Analysis
          </h3>
          <p className="text-sm text-blue-400 font-medium animate-pulse">
            {loadingStepText || "Calculating household disaster resilience model with Gemini 2.5 Flash..."}
          </p>
          <p className="text-xs text-slate-400 pt-2 leading-relaxed">
            Synthesizing geological soil data, vulnerable profiles, and room kinematics through the Chain-of-Thought pipeline.
          </p>
        </div>

        {/* Shimmer skeleton cards */}
        <div className="w-full max-w-xl space-y-3 pt-6">
          <div className="h-16 rounded-xl animate-shimmer" />
          <div className="h-28 rounded-xl animate-shimmer" />
          <div className="h-24 rounded-xl animate-shimmer" />
        </div>
      </div>
    );
  }

  // 2. EMPTY STATE
  if (!result) {
    return (
      <div className="glass-panel rounded-2xl p-6 sm:p-12 text-slate-100 min-h-[600px] flex flex-col justify-center items-center text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-xl shadow-blue-500/10">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="space-y-2 max-w-md">
          <h3 className="text-xl font-black text-white">
            Household & Room Resilience Report Not Yet Generated
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Enter your building details on the left, upload a room photo or select preset hazard tags, and start the analysis.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-amber-400 block mb-1">SDG 11.5</span>
            <div className="text-xs font-bold text-slate-200">Vulnerable Group Protection</div>
            <p className="text-[10px] text-slate-400 mt-1">Tailored evacuation timelines and kits for infants, elderly, and disabled.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-emerald-400 block mb-1">SDG 13.1</span>
            <div className="text-xs font-bold text-slate-200">Climate & Disaster Adaptation</div>
            <p className="text-[10px] text-slate-400 mt-1">Autonomous 72-hour survival and adaptive capacity without external aid.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-purple-400 block mb-1">VISION AI</span>
            <div className="text-xs font-bold text-slate-200">Spatial Anchoring</div>
            <p className="text-[10px] text-slate-400 mt-1">Toppling kinematics, window blast zones, and Life Triangle coordinates.</p>
          </div>
        </div>

        {/* Demo Shortcut */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onLoadDemo}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            Launch Live Demo Scenario (Avcılar Quake 1998)
          </button>
        </div>
      </div>
    );
  }

  // Calculate dynamic checklist completion
  const totalItems = result.emergencyBagChecklist.length;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const completionPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
  const boostedResilienceScore = Math.min(100, result.overallResilienceScore + Math.round((completionPercentage / 100) * 20));

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* REPORT HEADER & SUMMARY BANNER */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Official AI Analysis Report
              </span>
              <span className="text-xs text-slate-400">
                Time: {result.analyzedAt}
              </span>
              {result.isSimulated && (
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  Intelligent Simulation
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              Personalized Household & Room Action Plan
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Print Action Plan / Save PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              Print / PDF
            </button>
          </div>
        </div>

        {/* Score & Progress Meters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div className="text-xs text-slate-400 font-medium">Baseline Resilience Score</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-white">
                {result.overallResilienceScore}%
              </span>
              <span className={`text-xs font-bold ${
                result.overallResilienceScore < 50 ? "text-rose-400" : "text-amber-400"
              }`}>
                {result.overallResilienceScore < 50 ? "High Risk / Critical" : "Moderate Resilience"}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  result.overallResilienceScore < 50 ? "bg-rose-500" : "bg-amber-500"
                }`}
                style={{ width: `${result.overallResilienceScore}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div className="text-xs text-slate-400 font-medium">Target Score Post-Mitigation</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                {boostedResilienceScore}%
              </span>
              <span className="text-xs font-bold text-emerald-400">
                (+{boostedResilienceScore - result.overallResilienceScore}% Gain)
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${boostedResilienceScore}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div className="text-xs text-slate-400 font-medium">Emergency Bag Readiness</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-blue-400">
                {completedCount} / {totalItems}
              </span>
              <span className="text-xs font-bold text-slate-300">
                ({completionPercentage}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Summary Text */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          <span className="font-bold text-white">AI Comprehensive Assessment: </span>
          {result.summary}
        </p>

        {/* SDG Alignment Bar */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/30 via-slate-950 to-emerald-950/30 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded font-black text-[10px] bg-[#FD9D24] text-slate-950">
              SDG 11.5
            </span>
            <span className="text-slate-300">{result.sdgAlignment.sdg11_5}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 rounded font-black text-[10px] bg-[#3F7E44] text-white">
              SDG 13.1
            </span>
            <span className="text-slate-300 font-semibold">{result.sdgAlignment.impactMetric}</span>
          </div>
        </div>
      </div>

      {/* CARD 1: REGIONAL & STRUCTURAL HAZARD PRIORITY MATRIX */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Card 1: Regional & Structural Hazard Priority Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Prioritized hazards based on district geology, fault distance, building era, and inter-story peak acceleration
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {result.disasterMatrix.map((hazard) => {
            const isHigh = hazard.riskLevel === "HIGH" || hazard.riskLevel === "YÜKSEK";
            const isMedium = hazard.riskLevel === "MEDIUM" || hazard.riskLevel === "ORTA";
            return (
              <div
                key={hazard.rank}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-white font-black text-xs flex items-center justify-center shrink-0">
                      #{hazard.rank}
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {hazard.hazardName}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                      isHigh
                        ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                        : isMedium
                        ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                        : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    }`}>
                      {hazard.riskLevel} RISK
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-bold">
                      {hazard.probabilityScore}% Probability
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="font-semibold text-slate-400">Geological & Structural Rationale: </span>
                  {hazard.geologicalReasoning}
                </div>

                <div className="flex items-start gap-2 text-xs text-emerald-300 bg-emerald-950/20 border border-emerald-500/20 p-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-200">Immediate Action Step: </span>
                    {hazard.immediateAction}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* HISTORICAL GROUND MEMORY & MICRO-ZONATION ANALYSIS */}
        {result.historicalGroundMemory && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/25 via-slate-900 to-slate-900 border border-amber-500/30 space-y-3 mt-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    Historical Ground Memory & Micro-Zonation Analysis
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Soil Classification: {result.historicalGroundMemory.soilType}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 self-start sm:self-auto">
                {result.historicalGroundMemory.warningBadge}
              </span>
            </div>

            <div className="text-xs font-bold text-slate-200">
              {result.historicalGroundMemory.title}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 space-y-1">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> Historical Soil Stratum & Geo-Memory:
                </span>
                <p className="text-[11px] leading-relaxed text-slate-300/90">
                  {result.historicalGroundMemory.historicalFact}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 space-y-1">
                <span className="font-bold text-rose-300 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Seismic Amplification & Liquefaction Advisory:
                </span>
                <p className="text-[11px] leading-relaxed text-slate-300/90">
                  {result.historicalGroundMemory.amplificationRisk}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CRISIS ACTION TIMELINE SIMULATION */}
      {result.crisisTimeline && (
        <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Crisis Action Timeline Simulation
                </h3>
                <p className="text-xs text-slate-400">
                  Step-by-step lifesaving operational roadmap from initial shock/inrush to 72 hours
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 self-start sm:self-auto">
              Critical Survival Protocol
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Phase 1: T+0 - 60 Seconds */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-rose-500/30 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    {result.crisisTimeline.phase60s.timeframe}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">Phase 1</span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {result.crisisTimeline.phase60s.title}
                </h4>
                <div className="space-y-1.5 pt-1">
                  {result.crisisTimeline.phase60s.actions.map((act, i) => (
                    <div key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-tight">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="p-2 rounded-lg bg-slate-950 text-[11px] text-pink-300 border border-pink-500/20">
                  <span className="font-bold block text-pink-200">Vulnerable Profile Protection:</span>
                  {result.crisisTimeline.phase60s.vulnerableCare}
                </div>
                <div className="text-[10px] text-rose-400 font-semibold italic">
                  ⚠️ {result.crisisTimeline.phase60s.safetyRule}
                </div>
              </div>
            </div>

            {/* Phase 2: T+1 - 15 Minutes */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {result.crisisTimeline.phase15m.timeframe}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">Phase 2</span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {result.crisisTimeline.phase15m.title}
                </h4>
                <div className="space-y-1.5 pt-1">
                  {result.crisisTimeline.phase15m.actions.map((act, i) => (
                    <div key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-tight">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="p-2 rounded-lg bg-slate-950 text-[11px] text-amber-300 border border-amber-500/20">
                  <span className="font-bold block text-amber-200">Vulnerable Profile Evacuation:</span>
                  {result.crisisTimeline.phase15m.vulnerableCare}
                </div>
                <div className="text-[10px] text-amber-400 font-semibold italic">
                  ⚠️ {result.crisisTimeline.phase15m.safetyRule}
                </div>
              </div>
            </div>

            {/* Phase 3: T+1 - 72 Hours */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {result.crisisTimeline.phase72h.timeframe}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">Phase 3</span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {result.crisisTimeline.phase72h.title}
                </h4>
                <div className="space-y-1.5 pt-1">
                  {result.crisisTimeline.phase72h.actions.map((act, i) => (
                    <div key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-tight">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="p-2 rounded-lg bg-slate-950 text-[11px] text-emerald-300 border border-emerald-500/20">
                  <span className="font-bold block text-emerald-200">Medical & Water Rations:</span>
                  {result.crisisTimeline.phase72h.vulnerableCare}
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold italic">
                  ⚠️ {result.crisisTimeline.phase72h.safetyRule}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* CARD 2: ROOM SAFETY, FURNITURE ANCHORING & LIFE TRIANGLE GUIDE */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Card 2: Room Safety, Furniture Anchoring & Life Triangle Guide
            </h3>
            <p className="text-xs text-slate-400">
              Mechanical anchoring specifications and designated shelter coordinates derived from visual analysis and risk tags
            </p>
          </div>
        </div>

        {/* Furniture Fixing Plan */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Furniture Anchoring & Mechanical Fastening Protocols
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.roomSafetyGuide.furnitureFixingPlan.map((fix, idx) => {
              const isUrgent = fix.urgency === "CRITICAL" || fix.urgency === "ACİL";
              return (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{fix.item}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isUrgent 
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" 
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      }`}>
                        {fix.urgency}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {fix.riskDescription}
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-200">
                    <span className="font-semibold text-purple-300 block mb-0.5">Anchoring Specification:</span>
                    {fix.fixingMethod}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bed Relocation Advisory */}
        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 space-y-1">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            Bed Relocation & Window Shatter Advisory:
          </div>
          <p className="leading-relaxed">
            {result.roomSafetyGuide.bedRelocationAdvice}
          </p>
        </div>

        {/* Life Triangle & Bag Mount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {/* Life Triangle */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/30 to-slate-900 border border-blue-500/30 space-y-2">
            <div className="flex items-center gap-2 text-blue-400">
              <Compass className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Designated Life Triangle (Drop-Cover-Hold On Spot)
              </span>
            </div>
            <div className="text-sm font-bold text-white">
              {result.roomSafetyGuide.lifeTriangleSpot.locationName}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.roomSafetyGuide.lifeTriangleSpot.coordinatesDescription}
            </p>
            <div className="text-[11px] text-blue-300/80 bg-blue-950/40 p-2 rounded-lg border border-blue-500/20">
              <span className="font-semibold">Structural Mechanics Principle: </span>
              {result.roomSafetyGuide.lifeTriangleSpot.safetyRationale}
            </div>
          </div>

          {/* Emergency Bag Mount */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/30 to-slate-900 border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <BookmarkCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Emergency Bag Staging Mount
              </span>
            </div>
            <div className="text-sm font-bold text-white">
              Exit Corridor Doorway
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.roomSafetyGuide.emergencyBagLocation}
            </p>
            <div className="text-[11px] text-emerald-300/80 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/20">
              <span className="font-semibold">Critical Rule: </span>
              Never stash the emergency bag inside deep wardrobes or high shelves; it must be grab-and-go accessible within 5 seconds in pitch darkness.
            </div>
          </div>
        </div>

      </div>

      {/* CARD 3: HYPER-PERSONALIZED DYNAMIC EMERGENCY BAG (CHECKLIST) */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Card 3: Hyper-Personalized Dynamic Emergency Bag
              </h3>
              <p className="text-xs text-slate-400">
                Interactive checklist dynamically generated for household profiles (infant, elderly, chronic illness, pet)
              </p>
            </div>
          </div>

          <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300">
            {completedCount} / {totalItems} Completed
          </div>
        </div>

        {/* Clickable Checklist */}
        <div className="space-y-2">
          {result.emergencyBagChecklist.map((item) => {
            const isChecked = Boolean(checkedItems[item.id]);
            const isSpecialGroup = item.category !== "General" && item.category !== "Genel";

            return (
              <div
                key={item.id}
                onClick={() => toggleCheckItem(item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                  isChecked
                    ? "bg-emerald-950/20 border-emerald-500/40 opacity-80"
                    : isSpecialGroup
                    ? "bg-slate-900/90 border-blue-500/30 hover:border-blue-500/60"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <button
                  type="button"
                  className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                    isChecked
                      ? "bg-emerald-500 border-emerald-400 text-slate-950"
                      : "border-slate-600 bg-slate-800 hover:border-blue-400"
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-xs font-bold ${isChecked ? "line-through text-slate-400" : "text-white"}`}>
                      {item.item}
                    </span>

                    {/* Category Badge */}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      item.category.includes("Infant") || item.category.includes("Bebek")
                        ? "bg-pink-500/10 text-pink-300 border-pink-500/30"
                        : item.category.includes("Elderly") || item.category.includes("Yaşlı")
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                        : item.category.includes("Chronic") || item.category.includes("Hasta")
                        ? "bg-teal-500/10 text-teal-300 border-teal-500/30"
                        : item.category.includes("Mobility") || item.category.includes("Engelli")
                        ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                        : item.category.includes("Pet") || item.category.includes("Evcil")
                        ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                        : "bg-slate-800 text-slate-300 border-slate-700"
                    }`}>
                      {item.category}
                    </span>

                    {/* Priority Badge */}
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                      item.priority.toLowerCase() === "critical" || item.priority === "Kritik" 
                        ? "bg-rose-500/20 text-rose-300" 
                        : "bg-blue-500/20 text-blue-300"
                    }`}>
                      {item.priority}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-normal">
                    {item.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 italic">
          Tip: Check off items as you pack them into your bag; your resilience score increases dynamically.
        </p>
      </div>

      {/* CARD 4: ETHICAL GUARDRAILS, LEGAL DISCLAIMER & INSTITUTIONAL PROTOCOLS */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Card 4: Ethical Guardrails, Legal Disclaimer & Institutional Protocols
            </h3>
            <p className="text-xs text-slate-400">
              Ethical safety layer, anti-hallucination guardrails, and authorized institutional references
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-100">Ethical Legal Disclaimer: </span>
              {result.ethicalGuardrails.disclaimer}
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="font-bold text-blue-300 block mb-1">Civil Engineering Boundary:</span>
              {result.ethicalGuardrails.engineeringNote}
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="font-bold text-teal-300 block mb-1">Medical Prescription Boundary:</span>
              {result.ethicalGuardrails.medicalNote}
            </div>
          </div>
        </div>

        {/* Official Sources */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-400 block">
            Referenced Official Authorities & International Protocols:
          </span>
          <div className="flex flex-wrap gap-2">
            {result.ethicalGuardrails.officialSources.map((src, i) => (
              <span 
                key={i}
                className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5"
              >
                <FileText className="w-3 h-3 text-emerald-400" />
                {src}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
