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
                United Nations Sustainable Development Goals (SDGs)
              </h3>
              <p className="text-xs text-slate-400">
                AfetGuard AI&apos;s Direct Integration with SDG 11.5 and SDG 13.1
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close"
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
              {SDG_METADATA.sdg11.title} &mdash; Target 11.5
            </h4>
            <blockquote className="text-xs text-slate-300 italic border-l-2 border-[#FD9D24] pl-3 py-0.5">
              &quot;{SDG_METADATA.sdg11.target}&quot;
            </blockquote>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs text-slate-300">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4" /> AfetGuard AI&apos;s Strategic Contribution:
              </span>
              <p className="leading-relaxed">
                Over 50% of indoor earthquake injuries result from non-structural toppling furniture and shattering glass. AfetGuard AI analyzes user bedroom photos and mechanical risks to deliver precise L-bracket and wall anchor specifications. By clearing exit paths especially for <strong>infants, elderly (65+), and disabled residents</strong>, it drastically minimizes fatality risks.
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
              {SDG_METADATA.sdg13.title} &mdash; Target 13.1
            </h4>
            <blockquote className="text-xs text-slate-300 italic border-l-2 border-[#3F7E44] pl-3 py-0.5">
              &quot;{SDG_METADATA.sdg13.target}&quot;
            </blockquote>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs text-slate-300">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> AfetGuard AI&apos;s Strategic Contribution:
              </span>
              <p className="leading-relaxed">
                Amid escalating climate-induced urban flash floods, riverbed overflows, and wildland-urban interface fires, the platform enhances households&apos; <strong>autonomous 72-hour survival and adaptive capacity</strong> without external aid. Matching location-specific environmental parameters, it generates a dynamic disaster kit and muster protocol.
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
            UN Sustainable Development Goals Official Portal
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
