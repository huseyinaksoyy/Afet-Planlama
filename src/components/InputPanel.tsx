"use client";

import React, { useState, useRef } from "react";
import { 
  MapPin, 
  Building, 
  Users, 
  Camera, 
  Tags, 
  Sparkles, 
  AlertTriangle, 
  Upload, 
  Trash2, 
  Plus, 
  Minus, 
  Baby, 
  UserCheck, 
  Accessibility, 
  Pill, 
  HeartHandshake, 
  Waves, 
  Mountain, 
  Flame, 
  Activity,
  Layers
} from "lucide-react";
import { UserInput } from "@/types/disaster";
import { 
  TURKISH_CITIES, 
  BUILDING_AGE_OPTIONS, 
  FLOOR_LEVEL_OPTIONS, 
  ENVIRONMENT_RISK_OPTIONS, 
  VULNERABLE_GROUP_OPTIONS, 
  ROOM_RISK_PRESET_TAGS,
  HISTORICAL_GROUND_PRESETS 
} from "@/lib/constants";

interface InputPanelProps {
  input: UserInput;
  onChange: (updated: UserInput) => void;
  onSubmit: () => void;
  isLoading: boolean;
  loadingStepText: string;
}

export default function InputPanel({
  input,
  onChange,
  onSubmit,
  isLoading,
  loadingStepText
}: InputPanelProps) {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availableDistricts = TURKISH_CITIES[input.city] || [];

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    const districts = TURKISH_CITIES[newCity] || [];
    onChange({
      ...input,
      city: newCity,
      district: districts[0] || ""
    });
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...input, district: e.target.value });
  };

  const toggleEnvRisk = (id: string) => {
    const exists = input.environmentRisks.includes(id);
    const updated = exists 
      ? input.environmentRisks.filter(r => r !== id)
      : [...input.environmentRisks, id];
    onChange({ ...input, environmentRisks: updated });
  };

  const toggleVulnerableGroup = (id: string) => {
    const exists = input.vulnerableGroups.includes(id);
    const updated = exists
      ? input.vulnerableGroups.filter(g => g !== id)
      : [...input.vulnerableGroups, id];
    onChange({ ...input, vulnerableGroups: updated });
  };

  const toggleRoomRiskTag = (tag: string) => {
    const exists = input.roomRiskTags.includes(tag);
    const updated = exists
      ? input.roomRiskTags.filter(t => t !== tag)
      : [...input.roomRiskTags, tag];
    onChange({ ...input, roomRiskTags: updated });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Lütfen geçerli bir resim dosyası seçiniz (JPEG, PNG).");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onChange({
        ...input,
        roomPhotoBase64: base64,
        roomPhotoPreview: base64,
        roomMode: "photo"
      });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    onChange({
      ...input,
      roomPhotoBase64: undefined,
      roomPhotoPreview: undefined
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const renderEnvIcon = (iconName: string) => {
    switch (iconName) {
      case "Waves": return <Waves className="w-4 h-4 text-cyan-400 shrink-0" />;
      case "Mountain": return <Mountain className="w-4 h-4 text-amber-400 shrink-0" />;
      case "Flame": return <Flame className="w-4 h-4 text-rose-400 shrink-0" />;
      case "Activity": return <Activity className="w-4 h-4 text-emerald-400 shrink-0" />;
      default: return <AlertTriangle className="w-4 h-4 text-blue-400 shrink-0" />;
    }
  };

  const renderGroupIcon = (iconName: string) => {
    switch (iconName) {
      case "Baby": return <Baby className="w-4 h-4 shrink-0" />;
      case "UserCheck": return <UserCheck className="w-4 h-4 shrink-0" />;
      case "Accessibility": return <Accessibility className="w-4 h-4 shrink-0" />;
      case "Pill": return <Pill className="w-4 h-4 shrink-0" />;
      case "HeartHandshake": return <HeartHandshake className="w-4 h-4 shrink-0" />;
      default: return <Users className="w-4 h-4 shrink-0" />;
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 space-y-6 text-slate-100 shadow-xl border border-slate-800">
      
      {/* Panel Header & Step Stepper */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              Akıllı Veri Giriş Paneli
            </h2>
            <p className="text-xs text-slate-400">
              3 adımda hanenizin ve odanızın afet profilini tanımlayın
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Adım {activeStep} / 3
          </span>
        </div>

        {/* Step Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveStep(1)}
            className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
              activeStep === 1
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            1. Konum & Bina
          </button>
          <button
            type="button"
            onClick={() => setActiveStep(2)}
            className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
              activeStep === 2
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            2. Hane & Kırılgan
          </button>
          <button
            type="button"
            onClick={() => setActiveStep(3)}
            className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
              activeStep === 3
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            3. Oda Analizi
          </button>
        </div>
      </div>

      {/* ADIM 1: KONUM VE BİNA */}
      {activeStep === 1 && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* İl ve İlçe Seçimi */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                İl
              </label>
              <select
                value={input.city}
                onChange={handleCityChange}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              >
                {Object.keys(TURKISH_CITIES).map((cityName) => (
                  <option key={cityName} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-400" />
                İlçe
              </label>
              <select
                value={input.district}
                onChange={handleDistrictChange}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              >
                {availableDistricts.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mahalle / Sokak ve Tarihsel Zemin Hafızası */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Mahalle / Sokak veya Bölge Detayı
              </label>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Mikrobölgeleme
              </span>
            </div>
            
            <input
              type="text"
              value={input.neighborhood || ""}
              onChange={(e) => onChange({ ...input, neighborhood: e.target.value })}
              placeholder="Örn: Denizköşkler Mah. / Cendere Vadisi / Yalı Cad."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />

            {/* Tarihsel Zemin Hafızası Çipleri */}
            <div className="pt-1.5 space-y-1.5">
              <span className="text-[11px] text-slate-400 font-medium block">
                Tarihsel Zemin / Jeolojik Hafıza Etiketi:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {HISTORICAL_GROUND_PRESETS.map((chip) => {
                  const isSelected = input.historicalGroundTag === chip.label;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => onChange({ 
                        ...input, 
                        historicalGroundTag: isSelected ? undefined : chip.label 
                      })}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all flex items-center gap-1 ${
                        isSelected
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                      }`}
                      title={chip.desc}
                    >
                      <span>{chip.label}</span>
                      {isSelected && <span className="text-[10px]">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bina Yaşı Kartları */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Bina Yapım Yılı & Yönetmelik Dönemi
            </label>
            <div className="space-y-2">
              {BUILDING_AGE_OPTIONS.map((opt) => {
                const isSelected = input.buildingAge === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => onChange({ ...input, buildingAge: opt.id as UserInput["buildingAge"] })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected 
                        ? "bg-blue-600/15 border-blue-500 ring-1 ring-blue-500/50" 
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{opt.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${opt.badgeColor}`}>
                        {opt.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {opt.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kat Durumu ve Kat Numarası */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Kat Seviyesi
              </label>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Kat No:</span>
                <input
                  type="number"
                  min="-2"
                  max="40"
                  value={input.floorNumber}
                  onChange={(e) => onChange({ ...input, floorNumber: parseInt(e.target.value) || 1 })}
                  className="w-14 px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-center font-bold text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {FLOOR_LEVEL_OPTIONS.map((fl) => {
                const isSelected = input.floorLevel === fl.id;
                return (
                  <button
                    key={fl.id}
                    type="button"
                    onClick={() => onChange({ ...input, floorLevel: fl.id as UserInput["floorLevel"] })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "bg-blue-600/20 border-blue-500 text-white"
                        : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold mb-0.5">{fl.title}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-2">{fl.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Çevre Riskleri */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Yakın Çevresel ve Jeolojik Risk Faktörleri (Çoklu Seçilebilir)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ENVIRONMENT_RISK_OPTIONS.map((env) => {
                const isChecked = input.environmentRisks.includes(env.id);
                return (
                  <div
                    key={env.id}
                    onClick={() => toggleEnvRisk(env.id)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? "bg-slate-800 border-blue-500/80 text-white"
                        : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {renderEnvIcon(env.icon)}
                    <div className="text-left">
                      <div className="text-xs font-medium text-slate-200">{env.label}</div>
                      <div className="text-[10px] text-slate-400">{env.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Devam Et: Hane Halkı &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ADIM 2: HANE HALKI & KIRILGAN GRUPLAR */}
      {activeStep === 2 && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Kişi Sayısı */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                Toplam Hane Birey Sayısı
              </div>
              <div className="text-xs text-slate-400">
                Acil çanta su ve gıda stoğu kişi sayısına göre hesaplanır
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onChange({ ...input, householdCount: Math.max(1, input.householdCount - 1) })}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-black text-white w-6 text-center">
                {input.householdCount}
              </span>
              <button
                type="button"
                onClick={() => onChange({ ...input, householdCount: Math.min(12, input.householdCount + 1) })}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Kırılgan Gruplar Seçimi */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Hanedeki Özel İhtiyaç & Kırılgan Bireyler
              </label>
              <span className="text-[11px] text-amber-400 font-medium">
                SDG 11.5 Odak Alanı
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Seçilen her profil için Gemini AI afet çantasına ve tahliye planına hayati özel kalemler ekler.
            </p>

            <div className="space-y-2 pt-1">
              {VULNERABLE_GROUP_OPTIONS.map((vg) => {
                const isSelected = input.vulnerableGroups.includes(vg.id);
                return (
                  <div
                    key={vg.id}
                    onClick={() => toggleVulnerableGroup(vg.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? `bg-gradient-to-r ${vg.color} border-current ring-1 ring-white/10`
                        : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-slate-950/40 mt-0.5">
                      {renderGroupIcon(vg.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{vg.label}</span>
                        {isSelected && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/20 text-white">
                            Seçildi
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300/80 mt-0.5">
                        {vg.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex justify-between">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              &larr; Geri: Konum
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Devam Et: Oda Analizi &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ADIM 3: ODA İÇİ RİSK TANIMLAMA (HİBRİT MOD) */}
      {activeStep === 3 && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Sekme Değiştirici: Fotoğraf vs Etiketler */}
          <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1">
            <button
              type="button"
              onClick={() => onChange({ ...input, roomMode: "photo" })}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                input.roomMode === "photo"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              Sekme A: Multimodal Fotoğraf
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...input, roomMode: "tags" })}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                input.roomMode === "tags"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Tags className="w-3.5 h-3.5" />
              Sekme B: Hızlı Risk Etiketleri
            </button>
          </div>

          {/* Sekme A: Multimodal Fotoğraf */}
          {input.roomMode === "photo" && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {!input.roomPhotoPreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-purple-500/80 rounded-2xl p-6 text-center cursor-pointer bg-slate-900/40 hover:bg-purple-950/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-white mb-1">
                    Yatak Odanızın veya Salonunuzun Fotoğrafını Yükleyin
                  </div>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                    Gemini Multimodal Vision, gardırop, pencere ve kaçış güzergahındaki devrilme risklerini fotoğraftan otomatik analiz eder.
                  </p>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-purple-500/50 bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={input.roomPhotoPreview}
                    alt="Oda Fotoğrafı"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-3">
                    <span className="text-[11px] font-semibold text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-500/40">
                      Gemini Vision İçin Hazır
                    </span>
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition-colors"
                      title="Fotoğrafı Kaldır"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <p className="text-[10px] text-slate-400 italic">
                İpucu: Yatağın konumunu, gardırobu ve ana pencereyi aynı karede gösteren geniş açılı bir fotoğraf en yüksek doğruluğu verir.
              </p>
            </div>
          )}

          {/* Sekme B: Hızlı Risk Etiketleri */}
          {input.roomMode === "tags" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Odanızdaki Fiziksel Riskleri İşaretleyin:
              </label>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {ROOM_RISK_PRESET_TAGS.map((tag) => {
                  const isChecked = input.roomRiskTags.includes(tag);
                  return (
                    <div
                      key={tag}
                      onClick={() => toggleRoomRiskTag(tag)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? "bg-blue-600/20 border-blue-500 text-white font-medium"
                          : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <span>{tag}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border ${
                        isChecked ? "bg-blue-500 border-blue-400 text-white" : "border-slate-700"
                      }`}>
                        {isChecked && "✓"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kullanıcı Notu */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Özel Durum veya Ek Not (İsteğe Bağlı)
            </label>
            <textarea
              rows={2}
              value={input.customNotes || ""}
              onChange={(e) => onChange({ ...input, customNotes: e.target.value })}
              placeholder="Örn: Evde astım hastası var, gece panik atağı eğilimi mevcut..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-between">
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              &larr; Geri: Hane
            </button>
            <span className="text-[11px] text-slate-400 self-center">
              Tüm bilgiler hazır
            </span>
          </div>
        </div>
      )}

      {/* CTA: Analiz Butonu */}
      <div className="pt-4 border-t border-slate-800/80">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2.5 transition-all shadow-xl ${
            isLoading
              ? "bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700"
              : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.99]"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
              <span>{loadingStepText || "Yapay Zekâ Analiz Ediyor..."}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span>Yapay Zekâ ile Analiz Et & Eylem Planı Üret</span>
            </>
          )}
        </button>

        <p className="text-[10px] text-center text-slate-400 mt-2">
          AFAD & BM Sendai Çerçevesi standartlarında Chain-of-Thought doğrulamasıyla çalışır.
        </p>
      </div>

    </div>
  );
}
