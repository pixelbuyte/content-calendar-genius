"use client";

import { useState } from "react";
import { Heart, Download, Zap, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import type { AIModel, ContentPack } from "@/lib/types";
import CopyButton from "@/components/ui/CopyButton";
import { useFavorites } from "@/hooks/useFavorites";
import { exportPackAsText, downloadText } from "@/lib/export";

type RefineAction = "shorter" | "punchier" | "more_formal" | "more_casual" | "add_emoji" | "add_cta";

interface ResultCardsProps {
  pack: ContentPack;
  model?: AIModel;
}

const quickActions: { action: RefineAction; label: string }[] = [
  { action: "shorter",     label: "Make shorter" },
  { action: "punchier",    label: "Make punchier" },
  { action: "more_formal", label: "More formal" },
  { action: "more_casual", label: "More casual" },
  { action: "add_emoji",   label: "Add emojis" },
  { action: "add_cta",     label: "Add CTA" },
];

function FavButton({ packId, section, content }: { packId: string; section: string; content: string }) {
  const { toggle, isStarred } = useFavorites();
  const starred = isStarred(packId, section, content);
  return (
    <button
      onClick={() => toggle(packId, section, content)}
      title={starred ? "Remove from favorites" : "Save to favorites"}
      className={`rounded-lg p-1.5 transition-all ${starred ? "text-rose-500 scale-110" : "text-slate-300 hover:text-rose-400 hover:scale-110"}`}
    >
      <Heart size={13} fill={starred ? "currentColor" : "none"} />
    </button>
  );
}

function QuickActionBar({
  text,
  onRefined,
  model = "gemini",
}: {
  text: string;
  onRefined: (newText: string) => void;
  model?: AIModel;
}) {
  const [loading, setLoading] = useState<RefineAction | null>(null);
  const [showActions, setShowActions] = useState(false);

  const refine = async (action: RefineAction) => {
    setLoading(action);
    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, action, model }),
      });
      const data = await res.json();
      if (data.result) onRefined(data.result);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="mt-3 border-t border-slate-100 pt-3">
      <button
        onClick={() => setShowActions(!showActions)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
      >
        <Sparkles size={12} />
        Quick Actions
        {showActions ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      {showActions && (
        <div className="mt-2 flex flex-wrap gap-1.5 animate-[fadeIn_0.2s_ease-out]">
          {quickActions.map(({ action, label }) => (
            <button
              key={action}
              onClick={() => refine(action)}
              disabled={loading !== null}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all disabled:opacity-60 ${
                loading === action
                  ? "border-brand-300 bg-brand-50 text-brand-600"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              {loading === action ? (
                <span className="inline-flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full border-2 border-brand-500 border-t-transparent animate-[spin_0.8s_linear_infinite]" />
                  Rewriting…
                </span>
              ) : label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionHeader({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <div className="border-b border-slate-100 px-5 py-3 bg-gradient-to-r from-slate-50 to-white flex items-center gap-2">
      {icon && <span className="text-brand-500">{icon}</span>}
      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{title}</span>
    </div>
  );
}

function TextSection({
  packId, section, label, icon, model,
}: {
  packId: string; section: string; label: string; icon?: React.ReactNode; model?: AIModel;
}) {
  const [text, setText] = useState(label);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-xs)] overflow-hidden">
      <SectionHeader title={section} icon={icon} />
      <div className="p-5">
        <div className="group relative">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap pr-16">{text}</p>
          <div className="absolute top-0 right-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <FavButton packId={packId} section={section} content={text} />
            <CopyButton text={text} />
          </div>
        </div>
        <QuickActionBar text={text} onRefined={setText} model={model} />
      </div>
    </div>
  );
}

export default function ResultCards({ pack, model }: ResultCardsProps) {
  const handleExport = () => {
    const content = exportPackAsText(pack);
    const slug = pack.topic.slice(0, 30).replace(/\s+/g, "-").toLowerCase();
    downloadText(content, `ccg-${slug}.txt`);
  };

  const allText = [
    `SHORT CAPTION:\n${pack.shortCaption}`,
    `\nLONG CAPTION:\n${pack.longCaption}`,
    `\nHOOK IDEAS:\n${pack.hooks.map((h, i) => `${i + 1}. ${h}`).join("\n")}`,
    `\nTITLE IDEAS:\n${pack.titles.map((t, i) => `${i + 1}. ${t}`).join("\n")}`,
    `\nHASHTAGS:\n${pack.hashtags.join(" ")}`,
  ].join("\n");

  return (
    <div className="space-y-4 animate-[slideUp_0.4s_ease-out]">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="section-label">Your Content Pack</span>
            {model && (
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${
                model === "openrouter"
                  ? "bg-gradient-to-r from-violet-500 to-blue-500"
                  : "bg-gradient-to-r from-blue-500 to-cyan-400"
              }`}>
                {model === "openrouter" ? "⟡ OpenRouter" : "✦ Gemini"}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Hover any item to copy or save · Click Quick Actions to refine
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-[var(--shadow-xs)]"
          >
            <Download size={13} />
            Export .txt
          </button>
          <CopyButton text={allText} label="Copy All" className="rounded-xl px-4 py-2 text-sm" />
        </div>
      </div>

      {/* Short + Long Caption */}
      <div className="grid sm:grid-cols-2 gap-4">
        <TextSection packId={pack.id} section="Short Caption" label={pack.shortCaption} icon={<Zap size={13} />} model={model} />
        <TextSection packId={pack.id} section="Long Caption" label={pack.longCaption} model={model} />
      </div>

      {/* Hooks + Titles */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Hooks */}
        <HookTitleCard
          packId={pack.id}
          section="Hooks"
          items={pack.hooks}
          gradient="from-violet-500 to-violet-600"
          label="Hook Ideas"
        />
        {/* Titles */}
        <HookTitleCard
          packId={pack.id}
          section="Titles"
          items={pack.titles}
          gradient="from-blue-500 to-cyan-500"
          label="Title Ideas"
        />
      </div>

      {/* Weekly plan */}
      <WeeklyPlanCard pack={pack} />

      {/* CTAs + Hashtags */}
      <div className="grid sm:grid-cols-2 gap-4">
        <CtaCard pack={pack} />
        <HashtagCard pack={pack} />
      </div>

      {/* Platform tips */}
      {Object.keys(pack.platformTips).length > 0 && (
        <PlatformTipsCard pack={pack} />
      )}
    </div>
  );
}

function HookTitleCard({
  packId, section, items, gradient, label,
}: {
  packId: string; section: string; items: string[]; gradient: string; label: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-xs)] overflow-hidden">
      <SectionHeader title={label} />
      <div className="p-5 space-y-1">
        {items.map((item, i) => (
          <div key={i} className="group relative flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors">
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-[11px] font-black text-white`}>
              {i + 1}
            </span>
            <p className="flex-1 text-sm text-slate-700 leading-relaxed pr-14">{item}</p>
            <div className="absolute top-2.5 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <FavButton packId={packId} section={section} content={item} />
              <CopyButton text={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeeklyPlanCard({ pack }: { pack: ContentPack }) {
  const dayColors: Record<string, string> = {
    Monday: "text-blue-600 bg-blue-50",
    Tuesday: "text-violet-600 bg-violet-50",
    Wednesday: "text-cyan-600 bg-cyan-50",
    Thursday: "text-emerald-600 bg-emerald-50",
    Friday: "text-orange-600 bg-orange-50",
    Saturday: "text-pink-600 bg-pink-50",
    Sunday: "text-slate-600 bg-slate-100",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-xs)] overflow-hidden">
      <SectionHeader title="7-Day Posting Plan" />
      <div className="p-5 space-y-2">
        {pack.weeklyPlan.map((day) => (
          <div
            key={day.day}
            className="group relative flex items-start gap-3 rounded-xl border border-slate-100 p-3 hover:bg-slate-50 hover:border-slate-200 transition-all"
          >
            <div className="shrink-0 text-center w-[70px]">
              <div className={`inline-block rounded-lg px-2 py-0.5 text-xs font-bold ${dayColors[day.day] ?? "text-slate-600 bg-slate-100"}`}>
                {day.day}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 leading-tight">{day.platform}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                {day.postType}
              </div>
              <p className="text-sm text-slate-700 leading-snug pr-14">{day.idea}</p>
            </div>
            <div className="absolute top-3 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <FavButton packId={pack.id} section={`plan_${day.day}`} content={day.idea} />
              <CopyButton text={day.idea} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CtaCard({ pack }: { pack: ContentPack }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-xs)] overflow-hidden">
      <SectionHeader title="CTA Suggestions" />
      <div className="p-5 space-y-1">
        {pack.ctaSuggestions.map((cta, i) => (
          <div key={i} className="group relative flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors">
            <span className="num-badge mt-0.5">{i + 1}</span>
            <p className="flex-1 text-sm text-slate-700 leading-relaxed pr-14">{cta}</p>
            <div className="absolute top-2.5 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <FavButton packId={pack.id} section="ctas" content={cta} />
              <CopyButton text={cta} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HashtagCard({ pack }: { pack: ContentPack }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-xs)] overflow-hidden">
      <SectionHeader title="Hashtags" />
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          {pack.hashtags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
        <CopyButton text={pack.hashtags.join(" ")} label="Copy all hashtags" />
      </div>
    </div>
  );
}

function PlatformTipsCard({ pack }: { pack: ContentPack }) {
  const icons: Record<string, string> = {
    instagram: "📸",
    facebook: "👥",
    tiktok: "🎵",
    linkedin: "💼",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50/50 to-violet-50/50 shadow-[var(--shadow-xs)] overflow-hidden">
      <SectionHeader title="Platform Tips" icon={<Sparkles size={13} />} />
      <div className="p-5 grid sm:grid-cols-2 gap-4">
        {Object.entries(pack.platformTips).map(([platform, tip]) => (
          <div key={platform} className="flex gap-3 rounded-xl bg-white border border-slate-100 p-3">
            <span className="text-xl leading-none mt-0.5">{icons[platform] ?? "📱"}</span>
            <div>
              <div className="text-xs font-bold text-slate-600 capitalize mb-0.5">{platform}</div>
              <p className="text-xs text-slate-500 leading-relaxed">{tip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
