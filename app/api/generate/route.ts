import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { buildRealtorPrompt } from "@/lib/prompts";
import type { ContentPack, GenerateRequest } from "@/lib/types";

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    "X-Title": "Content Calendar Genius",
  },
});

const google = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

function stripFences(raw: string): string {
  return raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
}

function buildPack(
  parsed: Omit<ContentPack, "id" | "topic" | "tone" | "platforms" | "generatedAt">,
  topic: string,
  tone: string,
  platforms: string[],
  model: string
): ContentPack {
  return {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    topic,
    tone: tone as ContentPack["tone"],
    platforms: platforms as ContentPack["platforms"],
    generatedAt: new Date().toISOString(),
    model: model as ContentPack["model"],
    shortCaption:   parsed.shortCaption   ?? "",
    longCaption:    parsed.longCaption    ?? "",
    hooks:          Array.isArray(parsed.hooks)          ? parsed.hooks          : [],
    titles:         Array.isArray(parsed.titles)         ? parsed.titles         : [],
    weeklyPlan:     Array.isArray(parsed.weeklyPlan)     ? parsed.weeklyPlan     : [],
    ctaSuggestions: Array.isArray(parsed.ctaSuggestions) ? parsed.ctaSuggestions : [],
    hashtags:       Array.isArray(parsed.hashtags)       ? parsed.hashtags       : [],
    platformTips:
      typeof parsed.platformTips === "object" && parsed.platformTips !== null
        ? parsed.platformTips : {},
  };
}

async function withGemini(prompt: string): Promise<string> {
  const model = google.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function withOpenRouter(prompt: string): Promise<string> {
  const completion = await openrouter.chat.completions.create({
    model: "google/gemini-2.5-flash-lite",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 2000,
  });
  return completion.choices[0]?.message?.content ?? "";
}

export async function POST(req: NextRequest) {
  if (!process.env.OPENROUTER_API_KEY && !process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "No API keys configured. Add OPENROUTER_API_KEY or GEMINI_API_KEY to .env.local and restart the server." },
      { status: 500 }
    );
  }

  let body: GenerateRequest & { model?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { topic, tone, platforms, model = "openrouter" } = body;

  if (!topic?.trim())
    return NextResponse.json({ error: "Topic is required." }, { status: 400 });
  if (topic.trim().length > 300)
    return NextResponse.json({ error: "Topic must be under 300 characters." }, { status: 400 });

  const validTones = ["professional", "casual", "friendly", "energetic", "luxury", "direct"];
  if (!tone || !validTones.includes(tone))
    return NextResponse.json({ error: "Invalid tone." }, { status: 400 });

  const safePlatforms = Array.isArray(platforms)
    ? platforms.filter((p) => ["instagram", "facebook", "tiktok", "linkedin"].includes(p))
    : [];
  const finalPlatforms = safePlatforms.length > 0 ? safePlatforms : ["instagram", "facebook"];

  const prompt = buildRealtorPrompt({
    topic: topic.trim(),
    tone,
    platforms: finalPlatforms as GenerateRequest["platforms"],
    niche: "realtor",
  });

  let raw = "";
  let usedModel = model;

  try {
    if (model === "openrouter" && process.env.OPENROUTER_API_KEY) {
      try {
        raw = await withOpenRouter(prompt);
      } catch {
        // Auto-fallback to Gemini
        raw = await withGemini(prompt);
        usedModel = "gemini";
      }
    } else {
      raw = await withGemini(prompt);
      usedModel = "gemini";
    }

    let parsed: Omit<ContentPack, "id" | "topic" | "tone" | "platforms" | "generatedAt">;
    try {
      parsed = JSON.parse(stripFences(raw));
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ pack: buildPack(parsed, topic.trim(), tone, finalPlatforms, usedModel), usedModel });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
