"use client";

import React from "react";
import { X, Globe2, ShieldCheck, HeartPulse, Building2, CloudRain, ExternalLink } from "lucide-react";
import { SDG_METADATA } from "@/lib/constants";

interface SDGInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SDGInfoModal({ isOpen, onClose }: SDGInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sdg-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h3 id="sdg-modal-title" className="text-lg font-bold text-white flex items-center gap-2">
                Birleşmiş Milletler Sürdürülebilir Kalkınma Amaçları (SDG)
              </h3>
              <p className="text-xs text-slate-400">
                AfetGuard AI&apos;ın SDG 11.5 ve SDG 13.1 ile Doğrudan Entegrasyonu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* SDG 11 Card */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FD9D24] text-slate-950">
                {SDG_METADATA.sdg11.code}
              </span>
              <Building2 className="w-5 h-5 text-[#FD9D24]" />
            </div>
            <h4 className="text-base font-bold text-white">
              {SDG_METADATA.sdg11.title} &mdash; Hedef 11.5
            </h4>
            <blockquote className="text-xs text-slate-300 italic border-l-2 border-[#FD9D24] pl-3 py-0.5">
              &quot;{SDG_METADATA.sdg11.target}&quot;
            </blockquote>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs text-slate-300">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4" /> AfetGuard AI&apos;ın Çözüm Katkısı:
              </span>
              <p className="leading-relaxed">
                Depremlerdeki yaralanmaların %50&apos;sinden fazlası yapısal olmayan devrilen eşyalardan kaynaklanmaktadır. AfetGuard AI, kullanıcıların oda fotoğraflarını ve mekanik risklerini analiz ederek L-braket ve dübel spesifikasyonlarıyla sabitleme planı sunar. Özellikle <strong>bebekler, 65+ yaşlılar ve engelli bireyler</strong> için tahliye yolunu açarak can kaybı riskini minimize eder.
              </p>
            </div>
          </div>

          {/* SDG 13 Card */}
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#3F7E44] text-white">
                {SDG_METADATA.sdg13.code}
              </span>
              <CloudRain className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="text-base font-bold text-white">
              {SDG_METADATA.sdg13.title} &mdash; Hedef 13.1
            </h4>
            <blockquote className="text-xs text-slate-300 italic border-l-2 border-[#3F7E44] pl-3 py-0.5">
              &quot;{SDG_METADATA.sdg13.target}&quot;
            </blockquote>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs text-slate-300">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> AfetGuard AI&apos;ın Çözüm Katkısı:
              </span>
              <p className="leading-relaxed">
                İklim kriziyle artan ani kentsel su taşkınları, dere yatağı taşmaları ve orman arayüzü yangınlarına karşı hanelerin <strong>ilk 72 saatlik dış yardımsız hayatta kalma ve uyum kapasitesini</strong> artırır. Hane konumunun çevresel parametrelerini eşleştirerek dinamik bir afet çantası ve toplanma eylem protokolü üretir.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/60 shrink-0 text-xs">
          <a
            href="https://sdgs.un.org/goals"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            BM Sürdürülebilir Kalkınma Amaçları Resmi Portalı
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
          >
            Anladım
          </button>
        </div>
      </div>
    </div>
  );
}
