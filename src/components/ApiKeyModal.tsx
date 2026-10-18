"use client";

import React, { useState } from "react";
import { KeyRound, ShieldCheck, ExternalLink, X, Check, Trash2 } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveKey }: ApiKeyModalProps) {
  const [tempKey, setTempKey] = useState(apiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(tempKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setTempKey("");
    onSaveKey("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity">
      <div 
        className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl relative text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="api-key-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h3 id="api-key-modal-title" className="text-lg font-bold text-white">
              Gemini API Key Configuration
            </h3>
            <p className="text-xs text-slate-400">
              Real-time disaster risk analysis via Google Gemini 2.5 / 1.5 Flash models
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-sm text-slate-300 leading-relaxed">
            Connect your own Google Gemini API key to run live multimodal and text inference directly against Google&apos;s AI infrastructure. When no key is entered, the <span className="text-blue-400 font-semibold">high-fidelity resilience simulation engine</span> automatically activates.
          </p>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Gemini API Key
            </label>
            <div className="relative">
              <input
                type="password"
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
              />
              {tempKey && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Clear Key"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Privacy & Security Guarantee:</span>
              <p className="mt-0.5 leading-relaxed">
                Your API key resides exclusively in your browser&apos;s client-side localStorage and is never persisted on remote databases. It can also be auto-loaded from <code className="text-slate-300">.env.local</code>.
              </p>
            </div>
          </div>

          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Get a free Gemini API key from Google AI Studio
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                Saved!
              </>
            ) : (
              "Save & Apply"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
