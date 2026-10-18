"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import InputPanel from "@/components/InputPanel";
import OutputPanel from "@/components/OutputPanel";
import ApiKeyModal from "@/components/ApiKeyModal";
import PromptModal from "@/components/PromptModal";
import SDGInfoModal from "@/components/SDGInfoModal";
import { UserInput, DisasterAnalysisResult } from "@/types/disaster";
import { DEMO_PRESET_SCENARIO_1, DEMO_PRESET_SCENARIO_2 } from "@/lib/constants";
import { generateMockAnalysis } from "@/lib/mockData";

export default function Home() {
  // User Input Form State (Defaults to Istanbul / Avcılar)
  const [input, setInput] = useState<UserInput>({
    city: "İstanbul",
    district: "Avcılar",
    neighborhood: "Denizköşkler Neighborhood",
    historicalGroundTag: "Coastal / Landfill Soil",
    buildingAge: "pre1999",
    floorLevel: "middle",
    floorNumber: 4,
    environmentRisks: ["fault_line", "river_coastal"],
    householdCount: 4,
    vulnerableGroups: ["baby", "elderly"],
    roomMode: "tags",
    roomRiskTags: [
      "Unanchored tall wardrobe / cabinet next to bed",
      "Bed directly situated under window / glass panel"
    ],
    customNotes: ""
  });

  // Analysis result state
  const [result, setResult] = useState<DisasterAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState("");

  // Modals state
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isSdgModalOpen, setIsSdgModalOpen] = useState(false);

  // Gemini API Key from localStorage
  const [apiKey, setApiKey] = useState("");

  // Load saved API key on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("afetguard_gemini_key") || "";
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    if (typeof window !== "undefined") {
      if (newKey) {
        localStorage.setItem("afetguard_gemini_key", newKey);
      } else {
        localStorage.removeItem("afetguard_gemini_key");
      }
    }
  };

  // Demo 1 Loader: Avcılar Denizköşkler (Earthquake & Coastal Soft Soil)
  const handleLoadDemo1 = async () => {
    setInput(DEMO_PRESET_SCENARIO_1);
    setIsLoading(true);
    setLoadingStepText("Demo 1 Loaded: Istanbul/Avcılar (Earthquake & Coastal Landfill)...");

    setTimeout(() => {
      setLoadingStepText("Analyzing Denizköşkler coastal strip soil amplification resonance...");
    }, 400);

    setTimeout(() => {
      setLoadingStepText("Synthesizing 60s Drop-Cover & 15m evacuation timeline for infant and elderly...");
    }, 1000);

    setTimeout(() => {
      const demoResult = generateMockAnalysis(DEMO_PRESET_SCENARIO_1);
      setResult(demoResult);
      setIsLoading(false);
      setLoadingStepText("");
    }, 1600);
  };

  // Demo 2 Loader: Kağıthane Cendere Valley (Flash Flood & Former Riverbed)
  const handleLoadDemo2 = async () => {
    setInput(DEMO_PRESET_SCENARIO_2);
    setIsLoading(true);
    setLoadingStepText("Demo 2 Loaded: Istanbul/Kağıthane (Flash Flood & Former Riverbed)...");

    setTimeout(() => {
      setLoadingStepText("Calculating Cendere Valley historical watershed and water table saturation...");
    }, 400);

    setTimeout(() => {
      setLoadingStepText("Planning vertical evacuation, insulin cold chain, and pet safety for ground floor...");
    }, 1000);

    setTimeout(() => {
      const demoResult = generateMockAnalysis(DEMO_PRESET_SCENARIO_2);
      setResult(demoResult);
      setIsLoading(false);
      setLoadingStepText("");
    }, 1600);
  };

  // Run Real / Simulated Analysis
  const handleRunAnalysis = async () => {
    setIsLoading(true);
    setLoadingStepText("Connecting to Gemini 2.5 Flash AI Model...");

    const stepTimer1 = setTimeout(() => {
      setLoadingStepText("Analyzing historical soil memory and micro-zonation resonance...");
    }, 700);

    const stepTimer2 = setTimeout(() => {
      setLoadingStepText(
        input.roomMode === "photo" && input.roomPhotoBase64
          ? "Scanning room photo and toppling kinematics via Multimodal Vision..."
          : "Calculating crisis timeline simulation (T+0-60s, T+1-15m, T+1-72h)..."
      );
    }, 1500);

    const stepTimer3 = setTimeout(() => {
      setLoadingStepText("Compiling hyper-personalized emergency kit for vulnerable profiles...");
    }, 2300);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-gemini-key": apiKey } : {})
        },
        body: JSON.stringify({
          input,
          apiKey: apiKey || undefined
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.warn("API route error, falling back to local client simulator:", err);
      const fallbackResult = generateMockAnalysis(input);
      setResult(fallbackResult);
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setIsLoading(false);
      setLoadingStepText("");
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] bg-grid-pattern relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <Header
        onLoadDemo1={handleLoadDemo1}
        onLoadDemo2={handleLoadDemo2}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenSdgModal={() => setIsSdgModalOpen(true)}
        onPrintReport={handlePrint}
        apiKey={apiKey}
        hasResult={Boolean(result)}
      />

      {/* Main Container: 2-Column Dashboard Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Quick Pitch Sub-banner for Jury */}
        <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-slate-300 no-print">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong>AfetGuard AI</strong>: Operationalizing <strong>UN SDG 11.5 & SDG 13.1</strong> through Micro-Zonation Ground Memory and Crisis Action Simulation.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPromptModalOpen(true)}
              className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-2 transition-colors"
            >
              Inspect CoT & Few-Shot Prompt Architecture &rarr;
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Smart Data Input Panel (5 Columns) */}
          <div className="lg:col-span-5 no-print">
            <InputPanel
              input={input}
              onChange={setInput}
              onSubmit={handleRunAnalysis}
              isLoading={isLoading}
              loadingStepText={loadingStepText}
            />
          </div>

          {/* Right Column: Generative AI Output Dashboard (7 Columns) */}
          <div className="lg:col-span-7">
            <OutputPanel
              result={result}
              isLoading={isLoading}
              loadingStepText={loadingStepText}
              onLoadDemo={handleLoadDemo1}
              onPrint={handlePrint}
            />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-800/80 bg-slate-950/60 text-center text-xs text-slate-400 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            AfetGuard AI &bull; UN Sustainable Development Goals (SDG 11.5 & 13.1) Hackathon Project
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>AFAD Protocols & Sendai Framework</span>
            <span>&bull;</span>
            <button onClick={() => setIsApiKeyModalOpen(true)} className="hover:text-blue-400">
              Gemini 2.5 Flash Integrated
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />

      <PromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />

      <SDGInfoModal
        isOpen={isSdgModalOpen}
        onClose={() => setIsSdgModalOpen(false)}
      />

    </div>
  );
}
