import type { ContentPack, FavoriteItem, HistoryItem } from "./types";

const HISTORY_KEY = "ccg_history";
const FAVORITES_KEY = "ccg_favorites";
const MAX_HISTORY = 20;

// ── History ────────────────────────────────────────────────────────────────

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveToHistory(pack: ContentPack): void {
  const item: HistoryItem = {
    id: pack.id,
    topic: pack.topic,
    tone: pack.tone,
    generatedAt: pack.generatedAt,
    pack,
  };
  const history = [item, ...getHistory().filter((h) => h.id !== pack.id)].slice(
    0,
    MAX_HISTORY
  );
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

// ── Favorites ──────────────────────────────────────────────────────────────

export function getFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addFavorite(
  packId: string,
  section: string,
  content: string
): FavoriteItem {
  const item: FavoriteItem = {
    id: `${packId}_${section}_${Date.now()}`,
    packId,
    section,
    content,
    savedAt: new Date().toISOString(),
  };
  const favs = [item, ...getFavorites()];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  return item;
}

export function removeFavorite(id: string): void {
  const favs = getFavorites().filter((f) => f.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

export function isFavorited(packId: string, section: string, content: string): boolean {
  return getFavorites().some(
    (f) => f.packId === packId && f.section === section && f.content === content
  );
}
