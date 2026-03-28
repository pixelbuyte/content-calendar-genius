"use client";

import type { AIModel } from "@/lib/types";

interface ModelSelectorProps {
  value: AIModel;
  onChange: (model: AIModel) => void;
  disabled?: boolean;
}

const models: {
  value: AIModel;
  name: string;
  badge: string;
  badgeStyle: string;
  description: string;
  gradient: string;
  ring: string;
  logo: string;
  note?: string;
}[] = [
  {
    value: "openrouter",
    name: "OpenRouter",
    badge: "Primary",
    badgeStyle: "bg-gradient-to-r from-violet-500 to-blue-500 text-white",
    description: "Gemini 2.5 Flash Lite via OpenRouter",
    gradient: "from-violet-500 via-blue-500 to-cyan-400",
    ring: "ring-violet-400/40",
    logo: "⟡",
    note: "Auto-falls back to Gemini if unavailable",
  },
  {
    value: "gemini",
    name: "Gemini",
    badge: "Backup",
    badgeStyle: "bg-slate-100 text-slate-500",
    description: "Gemini 2.5 Flash Lite — direct API",
    gradient: "from-blue-400 via-cyan-400 to-green-400",
    ring: "ring-blue-400/40",
    logo: "✦",
  },
];

export default function ModelSelector({ value, onChange, disabled }: ModelSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-800">AI Model</label>
        <span className="text-xs text-slate-400">OpenRouter auto-falls back to Gemini</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {models.map((m) => {
          const selected = value === m.value;
          return (
            <button
              key={m.value}
              type="button"
              onClick={() => onChange(m.value)}
              disabled={disabled}
              className={`relative overflow-hidden rounded-2xl border-2 p-3.5 text-left transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                selected
                  ? `border-transparent ring-2 ${m.ring} shadow-[var(--shadow-md)]`
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-[var(--shadow-sm)]"
              }`}
            >
              {selected && (
                <div className={`absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-[0.07]`} />
              )}

              <div className="relative flex items-start gap-2.5">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-base font-black text-white shadow-sm bg-gradient-to-br ${m.gradient}`}>
                  {m.logo}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-sm font-bold ${selected ? "text-slate-900" : "text-slate-700"}`}>
                      {m.name}
                    </span>
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${m.badgeStyle}`}>
                      {m.badge}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-400 leading-snug">{m.description}</p>
                  {m.note && (
                    <p className="mt-0.5 text-[10px] text-slate-300 leading-snug italic">{m.note}</p>
                  )}
                </div>
              </div>

              {selected && (
                <div className={`absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br ${m.gradient}`}>
                  <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="1.5,5 4,7.5 8.5,2.5" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
