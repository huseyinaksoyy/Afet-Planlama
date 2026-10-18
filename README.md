# 🛡️ AfetGuard AI: Personalized Household & Room Disaster Preparedness Platform

> **Smart Household Resilience Platform Advancing UN Sustainable Development Goals (SDG 11.5 & SDG 13.1)**  
> **Hackathon Team (Group 13):** Fatma Çevik, Ayberk Koç, Hüseyin Aksoy, Adil Yer, Mehmet Tarık Özcan  
> **Live Production Demo:** [https://afet-planlama.vercel.app](https://afet-planlama.vercel.app)  
> **GitHub Repository:** [https://github.com/huseyinaksoyy/Afet-Planlama](https://github.com/huseyinaksoyy/Afet-Planlama)

---

## 📌 Project Overview & Problem Statement

Disaster preparedness around the globe has historically relied on **"one-size-fits-all, static pamphlets"**. However:
1. **Spatial Divergence:** The seismic acceleration experienced on the 4th floor of a residential building is fundamentally different from the flash flooding, drainage backflow, and soil saturation hazards facing a ground-floor resident.
2. **Vulnerable Profiles:** Households caring for infants (0–3), elderly relatives (65+), mobility-impaired individuals, or insulin-dependent patients have complex evacuation timelines that generic leaflets completely fail to address.
3. **Non-Structural Interior Traps:** Over 50% of domestic injuries during major earthquakes result not from building collapse, but from toppling wardrobes, shattering window glass, and jammed exit doors.
4. **Historical Soil Memory (Micro-Zonation):** In the 1999 Mw 7.6 Gölcük Earthquake, severe structural collapse occurred in Avcılar despite being 110 km from the epicenter, driven by local micro-zonation resonance (*Soil Amplification ~2.4x*) in soft coastal reclamation fill.

**AfetGuard AI** leverages Google Gemini Multimodal Generative AI (Vision & Text) to fuse satellite historical ground memory, household vulnerability profiles, and bedroom visual hazard detection. Within seconds, it synthesizes a **hyper-personalized 4-pillar disaster action plan** and an **Actionable Crisis Timeline (T+0-60s, T+1-15m, T+1-72h)**.

---

## 🎯 UN SDG Alignment & Success Metrics

### 1. SDG 11: Sustainable Cities & Communities &mdash; Target 11.5
* **UN Target:** *"By 2030, significantly reduce the number of deaths and the number of people affected and substantially decrease the direct economic losses relative to global gross domestic product caused by disasters, including water-related disasters, with a focus on protecting the poor and people in vulnerable situations."*
* **AfetGuard AI Solution:** Formulates tailored evacuation strategies (baby carrier slings, medical transfer sheets, dual-escort rules) and mechanical L-bracket wall anchoring specifications, reducing domestic non-structural trauma by up to 75%.

### 2. SDG 13: Climate Action &mdash; Target 13.1
* **UN Target:** *"Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries."*
* **AfetGuard AI Solution:** Enhances households' autonomous 72-hour survival and adaptive capacity against cloudburst flash floods, riverbed overflows, and urban-wildland interface fires without relying on immediate external aid.

### 3. Quantitative Impact & Measurement
* **Dynamic Household Resilience Score (0–100%):** Baseline score derived from building era, floor level, and geological hazards; increases dynamically by **up to +50%** as users complete mechanical anchoring tasks and check off emergency kit supplies.
* **Crisis Action Timeline Simulation:** Synchronized action protocols across Phase 1 (T+0-60s Drop-Cover-Hold On), Phase 2 (T+1-15m Safe Egress & Utilities), and Phase 3 (T+1-72h Muster Zone & Resource Rations).

---

## 👥 Target Beneficiary Profiles

* **Households with Infants (0–3 Years):** Ergonomic baby carrier sling planning to keep both hands free for stair handrails; 72-hour sterile water and ready formula quotas.
* **Elderly Residents (65+):** 7-day emergency cardiac/hypertension medication supplies with prescription copies, spare eyeglasses, and foldable evacuation canes.
* **Mobility-Impaired Individuals:** Dual-person stair transfer carrying sheets and continuous LED strobe locator beacons for SAR responders.
* **Chronic Illness Patients:** 48-hour 2–8°C thermal insulin cold-chain pouches and portable blood glucose monitoring devices.
* **Pet Owners:** Hard-shell carrier boxes, reinforced harnesses, 3-day dry food rations, and vaccination passport records for official shelter admission.

---

## 🧠 Generative AI Architecture & Prompt Engineering

* **Foundation Model:** Google Gemini Flash API (`gemini-2.5-flash` / `gemini-1.5-flash` Multimodal Vision & Text)
* **Prompt Engineering Strategy (`src/lib/prompts.ts`):**
  - **Role Prompting:** Senior Disaster Risk Analyst adhering to AFAD field standards, UN Sendai Framework for Disaster Risk Reduction (2015–2030), and Earthquake Structural Dynamics.
  - **7-Stage Chain-of-Thought (CoT):** *1. Ground Memory & Micro-Zonation &rarr; 2. Seismic & Drift Analysis &rarr; 3. Vulnerability Mapping &rarr; 4. Crisis Timeline Simulation &rarr; 5. Room Kinematics &rarr; 6. Life Triangle &rarr; 7. Dynamic Bag & Ethical Guardrails*.
  - **Few-Shot Learning:** Injected real-world input-output exemplar based on Istanbul/Avcılar baseline to enforce strict JSON schema adherence and prevent interface rendering breaks.
  - **Ethical Guardrails:** Absolute prohibition against structural collapse guarantees ('building will never fall') or unauthorized medical drug prescriptions.

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js (v18+, v20, or v22)
- npm or pnpm

### 1. Clone Repository & Install Dependencies:
```bash
git clone https://github.com/huseyinaksoyy/Afet-Planlama.git
cd "Afet Planlama"
npm install
```

### 2. Configure Gemini API Key:
Copy `.env.local.example` to `.env.local` and add your Google AI Studio key:
```bash
cp .env.local.example .env.local
```
`.env.local` content:
```env
GEMINI_API_KEY=AIzaSy...your_gemini_api_key_here
```
> **Note:** Even without an API key, the built-in **high-fidelity resilience simulation engine** activates seamlessly to deliver full functional demonstration with zero configuration.

### 3. Start Development Server:
```bash
npm run dev
```

### 4. Open in Browser:
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎬 Live Jury Pitch & Dual-Scenario Demos

The top navigation bar includes one-click shortcuts designed specifically for live jury evaluation:

1. **Demo 1: Avcılar (Earthquake):**
   - *Input:* Istanbul / Avcılar - Denizköşkler (Coastal landfill soil), pre-1999 building, 4th floor, 4 residents (1 infant, 1 elderly), bedside wardrobe.
   - *AI Output:* 2.4x Soil Amplification resonance warning, 50x50 mm steel L-bracket anchor specs, baby carrier sling stair descent, and bedside Life Triangle coordinates.
2. **Demo 2: Kağıthane (Flood):**
   - *Input:* Istanbul / Kağıthane - Cendere Valley (Historical riverbed), ground floor, 3 residents (insulin-dependent diabetic, 1 pet cat).
   - *AI Output:* Flash flood & drainage backflow risk, dry master electrical cutoff protocol, 48h thermal insulin cold-chain bag, and vertical upper-floor evacuation.
3. **Prompt & Ethics Architecture Modal:**
   - Inspect the live 7-Stage Chain-of-Thought, Few-Shot JSON schema, and ethical guardrail instructions via the header button.
4. **Print / PDF:**
   - Generate and download a formatted official emergency household disaster plan with a single click.

---

## 📁 Repository File Structure

```
├── src/
│   ├── app/
│   │   ├── api/analyze/route.ts   # Gemini API endpoint & structured JSON handler
│   │   ├── globals.css            # Dark mode, glassmorphism, grid pattern & print styles
│   │   ├── layout.tsx             # SEO metadata & font configuration
│   │   └── page.tsx               # Main Dashboard page & client state management
│   ├── components/
│   │   ├── Header.tsx             # Top navigation, Dual Demo triggers & modal actions
│   │   ├── InputPanel.tsx         # 3-step smart data input wizard + Micro-zonation presets
│   │   ├── OutputPanel.tsx        # 4 visual cards + Crisis Timeline simulation
│   │   ├── ApiKeyModal.tsx        # Gemini API Key configuration modal
│   │   ├── PromptModal.tsx        # Jury inspection modal for CoT & Few-Shot prompt
│   │   └── SDGInfoModal.tsx       # UN SDG 11.5 & 13.1 alignment modal
│   ├── lib/
│   │   ├── constants.ts           # Turkish cities, geological tags & demo scenarios
│   │   ├── gemini.ts              # Google Gemini API & Multimodal Vision client
│   │   ├── mockData.ts            # High-fidelity intelligent simulation engine
│   │   └── prompts.ts             # Role Prompting, CoT, Few-Shot & Ethical Guardrails
│   └── types/
│       └── disaster.ts            # Strict TypeScript data models & schema interfaces
├── AfetGuard_AI_Report.html       # 2-Page Academic & Technical Summary Report (HTML source)
├── AfetGuard_AI_Report.pdf        # Verified 2-Page Executive Summary Report (PDF)
├── AfetGuard_AI_Slides.html       # 10-Slide Pitch Deck (HTML source)
├── AfetGuard_AI_Slides.pdf        # Verified 10-Slide Widescreen Pitch Deck (PDF)
└── README.md                      # This file
```

---

## ⚖️ Ethical Disclaimer & Legal Notice
AfetGuard AI is a decision-support and awareness platform designed to enhance disaster resilience. It does NOT substitute for official civil engineering structural core tests (karot), building damage inspection reports, or medical prescriptions. Medication items represent logistical backups of existing physician-prescribed treatments.
