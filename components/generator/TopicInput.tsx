"use client";

import { useState, useRef } from "react";
import { Lightbulb } from "lucide-react";

const suggestions = [
  "New listing in the neighborhood",
  "Open house this weekend",
  "Just sold over asking price!",
  "5 tips for first-time home buyers",
  "Why now is a great time to sell",
  "Market update for this month",
  "What to look for during a home inspection",
  "Just closed on a dream home",
];

interface TopicInputProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export default function TopicInput({ value, onChange, disabled }: TopicInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const pick = (s: string) => {
    onChange(s);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-800">
        What do you want to post about?
        <span className="ml-1 text-red-400">*</span>
      </label>

      <div className="relative">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={3}
          maxLength={300}
          placeholder="e.g. Open house this Saturday at 2pm in Maple Grove — 3 bed, 2 bath, newly renovated kitchen"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)] outline-none resize-none transition-all focus:border-brand-400 focus:shadow-[0_0_0_3px_rgb(14_134_232/0.15)] disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <div className="absolute bottom-3 right-3 text-xs text-slate-400">
          {value.length}/300
        </div>
      </div>

      {/* Suggestion toggle */}
      <button
        type="button"
        onClick={() => setShowSuggestions(!showSuggestions)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
      >
        <Lightbulb size={13} />
        {showSuggestions ? "Hide suggestions" : "Need inspiration?"}
      </button>

      {showSuggestions && (
        <div className="flex flex-wrap gap-2 pt-1 animate-[fadeIn_0.2s_ease-out]">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => pick(s)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-colors shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
