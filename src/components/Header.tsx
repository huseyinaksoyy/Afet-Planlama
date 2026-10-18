"use client";

import React from "react";
import { 
  ShieldAlert, 
  Sparkles, 
  BrainCircuit, 
  KeyRound, 
  Globe2, 
  Printer, 
  PlayCircle,
  Waves,
  Activity
} from "lucide-react";

interface HeaderProps {
  onLoadDemo1: () => void;
  onLoadDemo2: () => void;
  onOpenPromptModal: () => void;
  onOpenApiKeyModal: () => void;
  onOpenSdgModal: () => void;
  onPrintReport: () => void;
  apiKey: string;
  hasResult: boolean;
}

export default function Header({
  onLoadDemo1,
  onLoadDemo2,
  onOpenPromptModal,
  onOpenApiKeyModal,
  onOpenSdgModal,
  onPrintReport,
  apiKey,
  hasResult,
}: HeaderProps) {
  const isKeyActive = Boolean(apiKey && apiKey.length > 5);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        
        {/* Left: Brand & Badges */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="relative group cursor-pointer" onClick={onOpenSdgModal}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                AfetGuard <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI</span>
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                v1.1 Mikrobölgeleme & Simülasyon
              </span>
            </div>

            <button
              onClick={onOpenSdgModal}
              className="group flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">SDG 11.5 & 13.1 Destekli Akıllı Hane Dirençlilik Platformu</span>
              <span className="sm:hidden">SDG 11 & 13 Uyumlu</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 group-hover:bg-emerald-950 group-hover:text-emerald-300 transition-colors">
                Detay &rarr;
              </span>
            </button>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* ÇİFT DEMO BUTONU */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800">
            {/* Demo 1: Deprem & Dolgu */}
            <button
              type="button"
              onClick={onLoadDemo1}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Demo 1: İstanbul/Avcılar (Deprem & Dolgu Zemin - 1998, 4. Kat, Bebek + Yaşlı)"
            >
              <Activity className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden xl:inline">Demo 1:</span>
              <span>Avcılar (Deprem)</span>
            </button>

            {/* Demo 2: Sel & Dere Yatağı */}
            <button
              type="button"
              onClick={onLoadDemo2}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 border border-cyan-500/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Demo 2: İstanbul/Kağıthane Cendere (Sel & Eski Dere Yatağı - Giriş Kat, İnsülin + Kedi)"
            >
              <Waves className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="hidden xl:inline">Demo 2:</span>
              <span>Kağıthane (Sel)</span>
            </button>
          </div>

          {/* Prompt & Ethics Modal Button */}
          <button
            type="button"
            onClick={onOpenPromptModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:border-purple-500/50"
            title="Chain-of-Thought ve Few-Shot Prompt Yapısını İncele"
          >
            <BrainCircuit className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="hidden md:inline">Prompt & Etik Mimari</span>
            <span className="md:hidden">Jüri</span>
          </button>

          {/* API Key Modal Button */}
          <button
            type="button"
            onClick={onOpenApiKeyModal}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors"
            title="Gemini API Anahtarı Ayarları"
          >
            <KeyRound className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="hidden xl:inline text-slate-300">API:</span>
            <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
              isKeyActive ? "text-emerald-400" : "text-amber-400"
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                isKeyActive ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`} />
              {isKeyActive ? "Canlı Gemini" : "Simülatör"}
            </span>
          </button>

          {/* Print Report Button */}
          {hasResult && (
            <button
              type="button"
              onClick={onPrintReport}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Afet Eylem Planını Yazdır / PDF İndir"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Yazdır / PDF</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
