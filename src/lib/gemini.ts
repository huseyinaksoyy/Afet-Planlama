import { UserInput, DisasterAnalysisResult } from "@/types/disaster";
import { 
  SYSTEM_ROLE_PROMPT, 
  CHAIN_OF_THOUGHT_INSTRUCTIONS, 
  FEW_SHOT_EXAMPLE, 
  ETHICAL_GUARDRAILS_PROMPT 
} from "@/lib/prompts";
import { generateMockAnalysis } from "@/lib/mockData";

export async function analyzeDisasterRisk(
  input: UserInput,
  userApiKey?: string
): Promise<DisasterAnalysisResult> {
  const apiKey = userApiKey?.trim() || process.env.GEMINI_API_KEY?.trim() || process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim();

  // If no API key is available, return the high-fidelity simulated response seamlessly
  if (!apiKey) {
    console.warn("AfetGuard AI: No Gemini API key detected. Running in high-fidelity simulation mode.");
    await new Promise((resolve) => setTimeout(resolve, 1400)); // realistic thinking delay
    return generateMockAnalysis(input);
  }

  try {
    const fullPrompt = `
${SYSTEM_ROLE_PROMPT}

${CHAIN_OF_THOUGHT_INSTRUCTIONS}

FEW-SHOT EXAMPLE INPUT AND OUTPUT:
Input: ${JSON.stringify(FEW_SHOT_EXAMPLE.input, null, 2)}
Output (Strict JSON): ${JSON.stringify(FEW_SHOT_EXAMPLE.output, null, 2)}

${ETHICAL_GUARDRAILS_PROMPT}

---
NOW ANALYZE THE FOLLOWING USER DATA FOLLOWING THE EXACT 7 STEPS AND RETURN ONLY VALID JSON IN ENGLISH:
USER DATA:
- City: ${input.city}
- District: ${input.district}
- Neighborhood / Street Detail: ${input.neighborhood || "Not specified"}
- Historical Ground Memory / Micro-Zonation: ${input.historicalGroundTag || "Not specified"}
- Building Construction Era: ${input.buildingAge}
- Floor Level: ${input.floorLevel} (Floor Number: ${input.floorNumber})
- Proximity Environmental Risks: ${input.environmentRisks.join(", ") || "None specified"}
- Household Size: ${input.householdCount} people
- Vulnerable Household Profiles: ${input.vulnerableGroups.join(", ") || "None"}
- Room Assessment Mode: ${input.roomMode}
- Selected Room Risk Tags: ${input.roomRiskTags.join("; ") || "None"}
- User Specific Notes: ${input.customNotes || "None"}
${input.roomPhotoBase64 ? "- USER UPLOADED ROOM PHOTO: Analyze the attached image to detect wardrobes, windows, bed placement, and evacuation door hazards." : ""}

CRITICAL: Return output strictly in valid JSON matching the Few-Shot schema. Do not prepend markdown formatting or conversational text.
`;

    // Try Gemini 2.5 Flash / 1.5 Flash via REST API endpoint with structured JSON
    const modelName = "gemini-2.5-flash"; // or fallback to gemini-1.5-flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const contentsParts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [
      { text: fullPrompt }
    ];

    if (input.roomPhotoBase64) {
      // Extract pure base64 and mime type if it's a data URL
      const match = input.roomPhotoBase64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      if (match) {
        contentsParts.push({
          inlineData: {
            mimeType: match[1],
            data: match[2]
          }
        });
      } else {
        contentsParts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: input.roomPhotoBase64
          }
        });
      }
    }

    const payload = {
      contents: [
        {
          role: "user",
          parts: contentsParts
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
        topK: 40,
        topP: 0.95
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      // Try fallback to gemini-1.5-flash if 2.5 is not yet enabled for the key
      if (res.status === 404 || res.status === 400) {
        const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const fallbackRes = await fetch(fallbackUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!fallbackRes.ok) {
          const errText = await fallbackRes.text();
          console.error("Gemini API fallback error:", errText);
          throw new Error(`Gemini API Error: ${fallbackRes.status}`);
        }

        const data = await fallbackRes.json();
        return parseGeminiResponse(data);
      }

      const errText = await res.text();
      console.error("Gemini API error:", errText);
      throw new Error(`Gemini API Error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    return parseGeminiResponse(data);
  } catch (error) {
    console.error("Gemini API call failed, providing high-fidelity fallback:", error);
    // Graceful fallback so demo never fails during presentation
    const mock = generateMockAnalysis(input);
    mock.summary = `[Gemini Live API temporarily unavailable; Intelligent Fallback Resilience Engine activated] ${mock.summary}`;
    return mock;
  }
}

function parseGeminiResponse(data: unknown): DisasterAnalysisResult {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawText = (data as any)?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      throw new Error("No text response from Gemini API");
    }

    // Clean any markdown formatting if present
    let cleaned = rawText.trim();
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const parsed = JSON.parse(cleaned) as DisasterAnalysisResult;
    parsed.analyzedAt = new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
    parsed.isSimulated = false;
    return parsed;
  } catch (err) {
    console.error("Error parsing Gemini JSON:", err);
    throw err;
  }
}
