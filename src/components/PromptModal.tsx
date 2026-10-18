"use client";

import React, { useState } from "react";
import { X, Sparkles, BrainCircuit, ShieldAlert, Copy, Check, Target, Compass } from "lucide-react";
import { 
  SYSTEM_ROLE_PROMPT, 
  CHAIN_OF_THOUGHT_INSTRUCTIONS, 
  FEW_SHOT_EXAMPLE, 
  ETHICAL_GUARDRAILS_PROMPT 
} from "@/lib/prompts";

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PromptModal({ isOpen, onClose }: PromptModalProps) {
  const [activeTab, setActiveTab] = useState<"role" | "cot" | "fewshot" | "ethics">("role");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCurrent = () => {
    let textToCopy = "";
    if (activeTab === "role") textToCopy = SYSTEM_ROLE_PROMPT;
    if (activeTab === "cot") textToCopy = CHAIN_OF_THOUGHT_INSTRUCTIONS;
    if (activeTab === "fewshot") textToCopy = JSON.stringify(FEW_SHOT_EXAMPLE, null, 2);
    if (activeTab === "ethics") textToCopy = ETHICAL_GUARDRAILS_PROMPT;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="prompt-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="prompt-modal-title" className="text-lg font-bold text-white">
                  AfetGuard AI Prompt & Ethical Engineering Architecture
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Hackathon Jury Inspection
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Chain-of-Thought (CoT), Few-Shot, Role Prompting & SDG 11.5/13.1 Safety Layer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCurrent}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="Copy Active Tab Prompt Content"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  Copy
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-950/30 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab("role")}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === "role"
                ? "border-purple-500 text-purple-400 bg-purple-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            1. Role Prompting
          </button>
          <button
            onClick={() => setActiveTab("cot")}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === "cot"
                ? "border-blue-500 text-blue-400 bg-blue-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Compass className="w-4 h-4" />
            2. Chain-of-Thought (CoT)
          </button>
          <button
            onClick={() => setActiveTab("fewshot")}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === "fewshot"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Target className="w-4 h-4" />
            3. Few-Shot Example (JSON)
          </button>
          <button
            onClick={() => setActiveTab("ethics")}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === "ethics"
                ? "border-rose-500 text-rose-400 bg-rose-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            4. Ethical Guardrails Layer
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 font-sans text-sm">
          {activeTab === "role" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-purple-200 text-xs leading-relaxed">
                <span className="font-bold text-purple-300 block mb-1">Engineering Rationale:</span>
                Rather than behaving as a generic conversational chatbot, the model is strictly role-prompted as a Senior Disaster Risk Analyst bound by AFAD protocols and the United Nations Sendai Framework for Disaster Risk Reduction (2015–2030). This ensures all generated mitigation advice adheres to field-tested civil defense and structural engineering doctrines.
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {SYSTEM_ROLE_PROMPT}
              </div>
            </div>
          )}

          {activeTab === "cot" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-blue-200 text-xs leading-relaxed">
                <span className="font-bold text-blue-300 block mb-1">Chain-of-Thought (CoT) Mechanism:</span>
                To eliminate ungrounded or hallucinated outputs, a rigorous 7-stage chain of thought is enforced: Ground Memory & Micro-Zonation &rarr; Seismic Matrix &rarr; Vulnerable Profile Impact &rarr; Action Timeline Synthesis &rarr; Room Kinematics &rarr; Life Triangle &rarr; Ethical Guardrails.
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {CHAIN_OF_THOUGHT_INSTRUCTIONS}
              </div>
            </div>
          )}

          {activeTab === "fewshot" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 text-xs leading-relaxed">
                <span className="font-bold text-emerald-300 block mb-1">Few-Shot Structural Consistency:</span>
                To eliminate JSON schema drift and guarantee zero-error rendering across all dashboard cards, a concrete input-output pair is injected directly into context, anchoring model expectations against the Istanbul/Avcılar baseline.
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-96">
                {JSON.stringify(FEW_SHOT_EXAMPLE, null, 2)}
              </div>
            </div>
          )}

          {activeTab === "ethics" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-200 text-xs leading-relaxed">
                <span className="font-bold text-rose-300 block mb-1">Ethical Responsibility & Anti-Hallucination Boundaries:</span>
                In life-or-death crisis domains, hallucinations carry catastrophic consequences. The model is explicitly forbidden from declaring structural collapse guarantees (&apos;building will never fall&apos;) or prescribing medical dosages. It plans purely physical logistics around existing physician prescriptions.
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {ETHICAL_GUARDRAILS_PROMPT}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-800 bg-slate-950/50 shrink-0 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Check className="w-4 h-4" /> CoT Verified
            </span>
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <Check className="w-4 h-4" /> Few-Shot JSON Active
            </span>
            <span className="flex items-center gap-1.5 text-purple-400 font-medium">
              <Check className="w-4 h-4" /> SDG 11.5 & 13.1 Aligned
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
