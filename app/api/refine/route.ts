import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    "X-Title": "Content Calendar Genius",
  },
});

const google = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

type RefineAction = "shorter" | "punchier" | "more_formal" | "more_casual" | "add_emoji" | "add_cta";

const actionPrompts: Record<RefineAction, string> = {
  shorter:      "Rewrite this to be significantly shorter — cut at least 40% of the words while keeping the key message. Stay realtor-specific.",
  punchier:     "Rewrite this to be punchier and more energetic. Use shorter sentences. Cut filler words. Make it bold and direct. Stay realtor-specific.",
  more_formal:  "Rewrite this in a more professional, polished tone suitable for luxury real estate or LinkedIn. Keep it realtor-specific.",
  more_casual:  "Rewrite this in a more relaxed, conversational tone — like a text from a trusted friend who happens to be a great realtor.",
  add_emoji:    "Rewrite this and tastefully add 2-3 relevant emojis to make it more engaging. Keep all the content, just add emojis where they fit naturally.",
  add_cta:      "Rewrite this and append a strong, specific call-to-action at the end. The CTA should be direct and easy to act on (e.g. DM me, click the link, call now).",
};

export async function POST(req: NextRequest) {
  let body: { text: string; action: RefineAction; model?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { text, action, model = "openrouter" } = body;
  if (!text?.trim()) return NextResponse.json({ error: "Text is required." }, { status: 400 });
  if (!actionPrompts[action]) return NextResponse.json({ error: "Invalid action." }, { status: 400 });

  const prompt = `${actionPrompts[action]}

Original text:
"${text.trim()}"

Return ONLY the rewritten text. No quotes, no explanation, no labels.`;

  try {
    let result = "";

    if (model === "openrouter" && process.env.OPENROUTER_API_KEY) {
      try {
        const completion = await openrouter.chat.completions.create({
          model: "anthropic/claude-3-5-haiku",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 600,
        });
        result = completion.choices[0]?.message?.content?.trim() ?? "";
      } catch {
        // Auto-fallback to Gemini
        const geminiModel = google.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
        const res = await geminiModel.generateContent(prompt);
        result = res.response.text().trim();
      }
    } else {
      const geminiModel = google.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
      const res = await geminiModel.generateContent(prompt);
      result = res.response.text().trim();
    }

    return NextResponse.json({ result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
