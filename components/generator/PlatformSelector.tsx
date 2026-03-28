"use client";

import type { Platform } from "@/lib/types";

const platforms: { value: Platform; label: string; emoji: string; best?: boolean }[] = [
  { value: "instagram", label: "Instagram", emoji: "📸", best: true },
  { value: "facebook",  label: "Facebook",  emoji: "👥", best: true },
  { value: "linkedin",  label: "LinkedIn",  emoji: "💼" },
  { value: "tiktok",    label: "TikTok",    emoji: "🎵" },
];

interface PlatformSelectorProps {
  value: Platform[];
  onChange: (platforms: Platform[]) => void;
  disabled?: boolean;
}

export default function PlatformSelector({ value, onChange, disabled }: PlatformSelectorProps) {
  const toggle = (platform: Platform) => {
    if (value.includes(platform)) {
      // Don't allow deselecting all
      if (value.length === 1) return;
      onChange(value.filter((p) => p !== platform));
    } else {
      onChange([...value, platform]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-800">
          Platforms
        </label>
        <span className="text-xs text-slate-400">Select all that apply</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {platforms.map((p) => {
          const selected = value.includes(p.value);
          return (
            <button
              key={p.value}
              type="button"
              onClick={() => toggle(p.value)}
              disabled={disabled}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                selected
                  ? "border-brand-400 bg-brand-50 text-brand-700 shadow-[0_0_0_2px_rgb(14_134_232/0.15)]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span>{p.emoji}</span>
              {p.label}
              {p.best && (
                <span className="text-[10px] font-semibold text-brand-500 bg-brand-100 rounded-full px-1.5 py-0.5 leading-none">
                  Top
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-slate-400">
        Instagram & Facebook are top platforms for realtors.
      </p>
    </div>
  );
}
