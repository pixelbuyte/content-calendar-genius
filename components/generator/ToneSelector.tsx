"use client";

import type { Tone } from "@/lib/types";

const tones: { value: Tone; label: string; description: string; emoji: string }[] = [
  { value: "professional", label: "Professional", description: "Polished & credible", emoji: "💼" },
  { value: "friendly",     label: "Friendly",     description: "Warm & welcoming",   emoji: "😊" },
  { value: "casual",       label: "Casual",       description: "Real & relaxed",     emoji: "👋" },
  { value: "energetic",    label: "Energetic",    description: "High-energy & bold",  emoji: "⚡" },
  { value: "luxury",       label: "Luxury",       description: "Elevated & refined",  emoji: "✨" },
  { value: "direct",       label: "Direct",       description: "Short & punchy",      emoji: "🎯" },
];

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
  disabled?: boolean;
}

export default function ToneSelector({ value, onChange, disabled }: ToneSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-800">
        Tone
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {tones.map((tone) => {
          const selected = value === tone.value;
          return (
            <button
              key={tone.value}
              type="button"
              onClick={() => onChange(tone.value)}
              disabled={disabled}
              className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                selected
                  ? "border-brand-400 bg-brand-50 shadow-[0_0_0_2px_rgb(14_134_232/0.2)]"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]"
              }`}
            >
              <span className="text-base leading-none">{tone.emoji}</span>
              <div>
                <div className={`text-xs font-semibold ${selected ? "text-brand-700" : "text-slate-700"}`}>
                  {tone.label}
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">{tone.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
