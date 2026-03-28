import type { GenerateRequest } from "./types";

export function buildRealtorPrompt(req: GenerateRequest): string {
  const toneGuide: Record<string, string> = {
    professional:
      "Use polished, credible language. Sound like a top-producing agent with authority and expertise.",
    casual:
      "Use relaxed, conversational language. Sound approachable and real — like texting a friend.",
    friendly:
      "Use warm, welcoming language. Build trust and make the reader feel at home.",
    energetic:
      "Use exciting, high-energy language with momentum. Create urgency and excitement.",
    luxury:
      "Use refined, aspirational language. Evoke exclusivity, elegance, and elevated living.",
    direct:
      "Use short, punchy sentences. No fluff. Every word earns its place.",
  };

  const platformList =
    req.platforms.length > 0 ? req.platforms.join(", ") : "Instagram, Facebook";

  return `You are an expert real estate marketing copywriter specializing in social media content for realtors and real estate agents.

The realtor wants to create social media content about this topic: "${req.topic}"

Tone: ${req.tone} — ${toneGuide[req.tone]}
Target platforms: ${platformList}

Generate a complete content pack in valid JSON with this EXACT structure:

{
  "shortCaption": "A punchy 1-2 sentence caption under 150 characters. Make it real estate specific. Include 1-2 relevant emojis.",
  "longCaption": "A full caption of 3-5 sentences. Story-driven, value-focused, ends with a soft CTA. Make it feel like it was written by a real agent.",
  "hooks": [
    "Hook 1: A scroll-stopping opening line (not a question)",
    "Hook 2: A bold statement or surprising fact about real estate",
    "Hook 3: A relatable pain point or desire the audience has"
  ],
  "titles": [
    "Title/headline idea 1 for a post, reel, or carousel",
    "Title/headline idea 2",
    "Title/headline idea 3"
  ],
  "weeklyPlan": [
    {"day": "Monday", "postType": "Educational", "idea": "Specific post idea for this day", "platform": "Instagram"},
    {"day": "Tuesday", "postType": "Behind the Scenes", "idea": "Specific post idea for this day", "platform": "Facebook"},
    {"day": "Wednesday", "postType": "Market Update", "idea": "Specific post idea for this day", "platform": "LinkedIn"},
    {"day": "Thursday", "postType": "Testimonial / Social Proof", "idea": "Specific post idea for this day", "platform": "Instagram"},
    {"day": "Friday", "postType": "Listing Spotlight", "idea": "Specific post idea tied to the original topic", "platform": "Facebook"},
    {"day": "Saturday", "postType": "Lifestyle / Community", "idea": "Specific post idea for this day", "platform": "Instagram"},
    {"day": "Sunday", "postType": "Motivation / Reflection", "idea": "Specific post idea for this day", "platform": "Instagram Stories"}
  ],
  "ctaSuggestions": [
    "CTA option 1 (e.g. DM me the word TOUR to schedule a private showing)",
    "CTA option 2 (e.g. Click the link in bio to see the full listing)",
    "CTA option 3 (e.g. Comment DETAILS below and I'll send you everything)",
    "CTA option 4"
  ],
  "hashtags": [
    "#realestate", "#realtor", "#[topicspecific1]", "#[topicspecific2]", "#homebuying", "#[city]realestate", "#[nichespecific]", "#listingagent", "#[topicspecific3]", "#homeseller"
  ],
  "platformTips": {
    "instagram": "Specific tip for using this content on Instagram (e.g. use carousel format, best time to post, reel idea)",
    "facebook": "Specific tip for Facebook (e.g. boost as ad, use in a group, go live)",
    "tiktok": "Specific tip for TikTok (e.g. trending audio, duet idea, hook timing)",
    "linkedin": "Specific tip for LinkedIn (e.g. tag your brokerage, add a professional insight)"
  }
}

IMPORTANT:
- Make ALL content feel like a real estate agent wrote it, not a generic AI.
- Use realistic details — mention things like square footage, neighborhood vibes, buyer/seller emotions.
- The weekly plan ideas must all relate back to the original topic: "${req.topic}".
- Hashtags must be realistic and specific, not just generic placeholders.
- Return ONLY the raw JSON object. No markdown, no code fences, no explanation.`;
}
