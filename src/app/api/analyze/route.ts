import { NextRequest, NextResponse } from "next/server";
import { analyzeDisasterRisk } from "@/lib/gemini";
import { UserInput } from "@/types/disaster";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = body.input as UserInput;
    const clientApiKey = body.apiKey || req.headers.get("x-gemini-key") || undefined;

    if (!input || !input.city || !input.district) {
      return NextResponse.json(
        { error: "Invalid data: City and district selection are required." },
        { status: 400 }
      );
    }

    const result = await analyzeDisasterRisk(input, clientApiKey);
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("API /api/analyze Error:", err);
    return NextResponse.json(
      { error: (err as Error)?.message || "An error occurred during disaster analysis." },
      { status: 500 }
    );
  }
}
