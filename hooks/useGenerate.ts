"use client";

import { useState, useCallback } from "react";
import type { AIModel, ContentPack, Tone, Platform } from "@/lib/types";
import { saveToHistory } from "@/lib/storage";

interface GenerateState {
  pack: ContentPack | null;
  loading: boolean;
  error: string | null;
}

export function useGenerate() {
  const [state, setState] = useState<GenerateState>({
    pack: null,
    loading: false,
    error: null,
  });

  const generate = useCallback(
    async (topic: string, tone: Tone, platforms: Platform[], model: AIModel = "gemini") => {
      if (!topic.trim()) return;

      setState({ pack: null, loading: true, error: null });

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, tone, platforms, niche: "realtor", model }),
        });

        const data = await res.json();

        if (!res.ok) {
          setState({ pack: null, loading: false, error: data.error ?? "Something went wrong." });
          return;
        }

        const pack: ContentPack = data.pack;
        saveToHistory(pack);
        setState({ pack, loading: false, error: null });
      } catch {
        setState({
          pack: null,
          loading: false,
          error: "Network error. Check your connection and try again.",
        });
      }
    },
    []
  );

  const clear = useCallback(() => {
    setState({ pack: null, loading: false, error: null });
  }, []);

  return { ...state, generate, clear };
}
