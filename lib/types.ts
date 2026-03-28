export type Tone =
  | "professional"
  | "casual"
  | "friendly"
  | "energetic"
  | "luxury"
  | "direct";

export type Platform =
  | "instagram"
  | "facebook"
  | "tiktok"
  | "linkedin";

export interface GenerateRequest {
  topic: string;
  tone: Tone;
  platforms: Platform[];
  niche: "realtor";
}

export interface DayPlan {
  day: string;
  postType: string;
  idea: string;
  platform: string;
}

export type AIModel = "openrouter" | "gemini";

export interface ContentPack {
  id: string;
  topic: string;
  tone: Tone;
  platforms: Platform[];
  generatedAt: string;
  model?: AIModel;

  shortCaption: string;
  longCaption: string;
  hooks: string[];
  titles: string[];
  weeklyPlan: DayPlan[];
  ctaSuggestions: string[];
  hashtags: string[];
  platformTips: Record<string, string>;
}

export interface HistoryItem {
  id: string;
  topic: string;
  tone: Tone;
  generatedAt: string;
  pack: ContentPack;
}

export interface FavoriteItem {
  id: string;
  packId: string;
  section: string;
  content: string;
  savedAt: string;
}
