# 🌐 AfetGuard AI: English Presentation Slides & 5-Minute Video Script

> **United Nations Sustainable Development Goals (SDG 11.5 & SDG 13.1) Hackathon**  
> **Team 13 Members:** Fatma Çevik, Ayberk Koç, Hüseyin Aksoy, Adil Yer, Mehmet Tarık Özcan  
> **Repository:** AfetGuard AI &mdash; Personalized Household & Room Disaster Preparedness Assistant  
> **Live Prototype URL:** `http://localhost:3000`

---

## PART 1: 6-SLIDE ENGLISH PRESENTATION CONTENT

### SLIDE 1: TITLE & EXECUTIVE MISSION
* **Headline:** AfetGuard AI: Personalized Household & Room Disaster Preparedness Assistant
* **Sub-headline:** Empowering Resilient Communities with Multimodal Generative AI (SDG 11.5 & SDG 13.1)
* **Team 13:** Fatma Çevik | Ayberk Koç | Hüseyin Aksoy | Adil Yer | Mehmet Tarık Özcan
* **Key Highlights:**
  - Direct alignment with UN SDG 11 (Target 11.5) & SDG 13 (Target 13.1)
  - Powered by Google Gemini Multimodal Vision & Text
  - Micro-Zonation Historical Ground Memory + 72-Hour Crisis Simulation Timeline

---

### SLIDE 2: THE PROBLEM & VULNERABLE GROUPS
* **Headline:** Why Generic Disaster Kits Fail in Reality
* **Core Pain Points:**
  1. **One-Size-Fits-All Fallacy:** Standard leaflets give the identical checklist to a ground-floor tenant and an 8th-floor family.
  2. **Non-Structural Collapses:** Over 50% of earthquake injuries are caused by toppling wardrobes, shattered window glass, and blocked escape hallways.
  3. **Vulnerable Groups Overlooked:**
     - *Infants (0-3):* Require evacuation slings/carriers so parents have free hands on stairs; 72-hour sterile formula water.
     - *Elderly (65+):* 7-day critical cardiovascular medication backups, spare eyeglasses, walking canes.
     - *Chronic Patients:* 2-8°C insulin thermal cold-chain bags during power cuts.
     - *Pets:* Hard-case pet carriers to prevent panic escapes.
  4. **Historical Ground Memory:** In the 1999 Marmara earthquake, Avcılar suffered catastrophic damage 110 km from the epicenter due to a **2.4x Soil Amplification** resonance factor and coastal fill.

---

### SLIDE 3: SOLUTION ARCHITECTURE & AI ENGINE
* **Headline:** End-to-End Multimodal Dashboard
* **Architecture Overview:**
  - **Front-End:** Next.js 16 App Router, Tailwind CSS, Lucide Icons, Glassmorphism UI.
  - **AI Engine:** Google Gemini Flash (`gemini-2.5-flash` / `gemini-1.5-flash`).
  - **Input Panel (Left):** 3-Step Wizard:
    1. Location, Building Age (<1999, 2000-2018, 2018+), Floor, and Micro-Zonation Ground Tag.
    2. Household & Vulnerable Person chips.
    3. Hybrid Room Risk Mode: Multimodal Room Photo Upload (Base64) or Quick Risk Tags.
  - **Output Panel (Right):** 4 Structured Cards + Crisis Timeline:
    - *Card 1:* Regional & Structural Hazard Priority Matrix + Historical Ground Memory.
    - *Timeline:* Crisis Action Simulation (T+0-60s, T+1-15m, T+1-72h).
    - *Card 2:* Room Safety, Furniture Anchoring (L-brackets), & Life Triangle Spot.
    - *Card 3:* Hyper-Personalized Interactive Bag Checklist with Dynamic Resilience Score.
    - *Card 4:* Ethical Guardrails, Non-Medical Disclaimers, & Official Institutional Sources.

---

### SLIDE 4: PROMPT ENGINEERING MASTERY (`src/lib/prompts.ts`)
* **Headline:** Intentional Prompt Engineering: Role, CoT & Few-Shot
* **Key Pillars:**
  1. **Role Prompting:** Senior Disaster Risk Analyst & Micro-Zonation Specialist compliant with AFAD and the UN Sendai Framework (2015-2030).
  2. **7-Stage Chain-of-Thought (CoT):**
     * Stage 1: Historical Ground & Soil Amplification Analysis
     * Stage 2: Regional & Structural Seismic Calculation
     * Stage 3: Vulnerable Household Member Impact Mapping
     * Stage 4: Crisis Timeline Synthesis (First 60s, 15m, 72h)
     * Stage 5: Room Spatial Toppling & Glass Shrapnel Dynamics
     * Stage 6: Life Triangle & Emergency Bag Coordinate Synthesis
     * Stage 7: Hyper-Personalized Bag & Ethical Filter
  3. **Few-Shot vs. Zero-Shot:**
     - *Zero-Shot Flaw:* Hallucinated markdown prose, breaking front-end JSON parsing.
     - *Few-Shot Solution:* 1 comprehensive input-output pair injected into the system prompt guarantees a 100% compliant, typed JSON schema every invocation.

---

### SLIDE 5: ETHICAL AI & SAFETY GUARDRAILS (15 POINTS)
* **Headline:** Protecting Lives Without Hallucinations
* **Strict Ethical Boundaries:**
  - **No Structural Guarantees:** The model is strictly prohibited from claiming "this building will never collapse" or "it will definitely collapse." Karot/engineering tests are mandatory.
  - **No Medical Prescriptions:** The model never prescribes drug dosages. It solely focuses on logistics (thermal cold-chain storage for existing prescribed insulin, prescription copies).
  - **Official Disclaimer:** Prominent Card 4 disclaims that the tool is an awareness assistant, not a legal engineering assessment or medical consultation. Refers to AFAD, Red Crescent, and UNDRR.

---

### SLIDE 6: MEASURABLE IMPACT & ROADMAP
* **Headline:** Measurable Resilience for SDG 11.5 & SDG 13.1
* **Success Metrics:**
  - **Resilience Score Boost:** Real-time score tracks safety improvements from ~38% up to 95%.
  - **Panic Reduction:** 60-second immediate action guide eliminates life-threatening reflexes.
  - **Open & Accessible:** Dual-scenario demo buttons, offline simulation fallback, and zero-cost accessibility.

---

## PART 2: 5-MINUTE ENGLISH DEMO VIDEO SCRIPT
*(Designed for a screen recording with slide presentation + live browser walkthrough at `http://localhost:3000`)*

---

### ⏱️ 0:00 &ndash; 0:45 | INTRO & THE PROBLEM (Slides 1 & 2)
> **[Speaker on Screen / Slide 1]**  
> "Hello everyone, and welcome. We are **Team 13**: Fatma Çevik, Ayberk Koç, Hüseyin Aksoy, Adil Yer, and Mehmet Tarık Özcan. Today, we are proud to present **AfetGuard AI**—a personalized household and room disaster preparedness platform built for **UN Sustainable Development Goals 11.5 and 13.1**."
>  
> **[Switch to Slide 2]**  
> "In earthquake-prone regions like Turkey, disaster preparedness leaflets are completely static. Everyone gets the exact same advice: 'buy a whistle, canned food, and a flashlight.'  
> But in reality, over 50% of earthquake injuries happen because of toppling wardrobes, shattering windows, and blocked hallways. Furthermore, if you have a 10-month-old infant on the 4th floor, an elderly parent on heart medication, or an insulin-dependent patient, generic advice puts lives at risk.  
> Today, AfetGuard AI solves this through multimodal generative AI."

---

### ⏱️ 0:45 &ndash; 1:30 | ARCHITECTURE & PROMPT ENGINEERING (Slides 3 & 4)
> **[Switch to Slide 3]**  
> "AfetGuard AI is built with **Next.js 16**, Tailwind CSS, and the **Google Gemini Flash API**. Users can input their building specs, select vulnerability tags, and either upload a wide-angle room photo for multimodal vision analysis or choose quick spatial tags."
>  
> **[Switch to Slide 4]**  
> "To prevent AI hallucinations, we designed an intentional prompt engineering architecture in `src/lib/prompts.ts`.  
> We use **Role Prompting**, establishing the model as an AFAD and UN Sendai Framework disaster risk specialist.  
> We enforce a **7-stage Chain-of-Thought** reasoning process: analyzing historical ground memory first, calculating structural building age, mapping vulnerable individuals, and synthesizing an immediate crisis timeline.  
> And crucially, we use **Few-Shot Learning** with a full JSON schema example to ensure our front-end cards render flawlessly without markdown breakages."

---

### ⏱️ 1:30 &ndash; 2:45 | LIVE DEMO 1: AVCILAR EARTHQUAKE & SOIL AMPLIFICATION
> **[Switch Screen to Live Browser: `http://localhost:3000`]**  
> "Now, let’s jump straight into our live prototype!  
> Notice in the top-right header, we have dual one-click demo buttons for quick jury inspection.  
> Let’s click **'Demo 1: Avcılar (Deprem)'**."
>  
> **[Click Demo 1 Button &rarr; Watch live loading steps &rarr; Results appear]**  
> "Watch how fast Gemini analyzes this scenario:  
> Here we have Istanbul Avcılar, Denizköşkler neighborhood, a pre-1999 building on the 4th floor, with an infant and an elderly grandparent.  
> Look at **Card 1**: our new **Historical Ground Memory** section immediately warns that Avcılar has coastal fill and an alluvial layer with a **2.4x Soil Amplification factor**, explaining why it suffered heavy damage even 110 kilometers away in 1999."
>  
> **[Scroll to Crisis Timeline]**  
> "Next, look at our **Crisis Simulation Timeline**:  
> In **T+0 to 60 Seconds**, it instructs parents to immediately grab the baby in their chest, take the Drop-Cover-Hold position next to the heavy bed base, and *never run into the stairwell*.  
> In **T+1 to 15 Minutes**, it mandates shutting off gas and power, strapping the baby into a sling so parents have both hands free for the stair rails, and escorting the elderly grandparent with a cane.  
> In **Card 2**, it provides exact steel L-bracket anchor specifications for the wardrobe beside the bed."

---

### ⏱️ 2:45 &ndash; 3:45 | LIVE DEMO 2: KAĞITHANE FLOOD & CHRONIC CARE
> **[Scroll to Header & Click 'Demo 2: Kağıthane (Sel)']**  
> "Now, let’s see the power of hyper-personalization by switching to our second scenario: **Demo 2: Kağıthane (Sel)**."
>  
> **[Watch live loading steps &rarr; Contrasting results appear]**  
> "Notice how the entire analysis changes in seconds!  
> Kağıthane Cendere Valley is a ground-floor apartment in a historical riverbed basin. The primary hazard is no longer an earthquake—it is **Flash Flooding and Sewage Backflow**!  
> Look at the **Crisis Timeline**:  
> In the first 60 seconds, it alerts the user *never to step into water before cutting off the main breaker switch*, because electrocution is the number one cause of flood deaths.  
> It instructs them to secure their pet cat into a hard-shell box, and immediately protect the diabetic patient’s insulin.  
> In the 15-minute phase, it recommends vertical evacuation to upper floors instead of escaping onto flooded streets."

---

### ⏱️ 3:45 &ndash; 4:25 | INTERACTIVE CHECKLIST & RESILIENCE SCORE
> **[Scroll to Card 3: Dynamic Emergency Bag]**  
> "Now let’s look at **Card 3: The Hyper-Personalized Emergency Bag**.  
> Notice that for Kağıthane, it generates a **Thermal Insulin Cold-Chain Bag (2-8°C)**, a portable glucometer, and a pet carrier crate with vaccination records.  
> Watch this interactive feature: as the household packs each item into their backpack, they click on the item.  
> **[Click on 3-4 checklist items]**  
> As we check items off, the **Household Resilience Score** dynamically increases in real time, from 36% all the way toward our target score! This provides engaging behavioral gamification for disaster readiness."

---

### ⏱️ 4:25 &ndash; 5:00 | PROMPT & ETHICS MODAL & CONCLUSION (Slides 5 & 6)
> **[Click 'Prompt & Etik Mimari' in Header & show modal]**  
> "For the jury's evaluation, clicking this header button opens our complete Prompt & Ethics Architecture. You can inspect our exact System Role Prompt, our 7-step Chain-of-Thought, and our strict Ethical Guardrails forbidding false building safety guarantees or medical drug prescribing.  
> Finally, clicking **'Yazdır / PDF'** prints out a clean, ready-to-use family action plan."
>  
> **[Switch to Slide 6 / Camera]**  
> "By bridging cutting-edge multimodal generative AI with life-saving physical ground realities, **AfetGuard AI** directly advances **SDG 11.5 and SDG 13.1**, turning passive victims into prepared, resilient households.  
> Thank you so much, and we are ready for your questions!"
