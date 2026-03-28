"use client";

import { useState } from "react";
import { Zap, RefreshCw, Trash2, BookMarked, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopicInput from "@/components/generator/TopicInput";
import ToneSelector from "@/components/generator/ToneSelector";
import PlatformSelector from "@/components/generator/PlatformSelector";
import ResultCards from "@/components/generator/ResultCards";
import LoadingSkeleton from "@/components/generator/LoadingSkeleton";
import HistorySidebar from "@/components/generator/HistorySidebar";
import ModelSelector from "@/components/generator/ModelSelector";
import { useGenerate } from "@/hooks/useGenerate";
import { useFavorites } from "@/hooks/useFavorites";
import type { AIModel, Tone, Platform, HistoryItem } from "@/lib/types";

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [platforms, setPlatforms] = useState<Platform[]>(["instagram", "facebook"]);
  const [model, setModel] = useState<AIModel>("openrouter");
  const [showFavorites, setShowFavorites] = useState(false);

  const { pack, loading, error, generate, clear } = useGenerate();
  const { favorites } = useFavorites();

  const canGenerate = topic.trim().length > 0 && !loading;

  const handleGenerate = () => {
    if (!canGenerate) return;
    generate(topic, tone, platforms, model);
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setTopic(item.pack.topic);
    setTone(item.pack.tone);
    setPlatforms(item.pack.platforms);
    if (item.pack.model) setModel(item.pack.model);
    generate(item.pack.topic, item.pack.tone, item.pack.platforms, item.pack.model ?? "gemini");
  };

  const handleClear = () => {
    setTopic("");
    setTone("professional");
    setPlatforms(["instagram", "facebook"]);
    clear();
  };

  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen">

        {/* Page hero bar */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-800">
          <div className="absolute inset-0 pointer-events-none opacity-30"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-blue-300 mb-3">
              <Sparkles size={11} />
              Real Estate Content Generator
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Generate Your Content Pack
            </h1>
            <p className="mt-1.5 text-sm text-slate-400">
              Enter a topic, choose a tone, and get captions, hooks, a 7-day plan, and more — in seconds.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">

            {/* Main column */}
            <div className="space-y-6">

              {/* Form card */}
              <div className="relative rounded-3xl border border-slate-200 bg-white shadow-[var(--shadow-md)] overflow-hidden">
                {/* Top gradient line */}
                <div className="h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500" />

                <div className="p-5 sm:p-7 space-y-6">
                  <TopicInput value={topic} onChange={setTopic} disabled={loading} />
                  <ModelSelector value={model} onChange={setModel} disabled={loading} />
                  <ToneSelector value={tone} onChange={setTone} disabled={loading} />
                  <PlatformSelector value={platforms} onChange={setPlatforms} disabled={loading} />

                  {/* Action bar */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={handleGenerate}
                      disabled={!canGenerate}
                      className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-brand)] hover:shadow-[0_10px_28px_-4px_rgb(37_99_235/.45)] hover:-translate-y-0.5 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-[spin_0.8s_linear_infinite]" />
                          Generating…
                        </>
                      ) : (
                        <>
                          <Zap size={16} />
                          Generate Content
                        </>
                      )}
                    </button>

                    {pack && !loading && (
                      <button
                        onClick={handleGenerate}
                        className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-[var(--shadow-xs)]"
                      >
                        <RefreshCw size={14} />
                        Regenerate
                      </button>
                    )}

                    {(pack || topic) && (
                      <button
                        onClick={handleClear}
                        className="ml-auto flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={13} />
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
                  <p className="text-sm font-semibold text-red-700">Error</p>
                  <p className="text-sm text-red-600 mt-0.5">{error}</p>
                </div>
              )}

              {/* Empty hint */}
              {!topic.trim() && !loading && !pack && (
                <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 px-5 py-4">
                  <p className="text-sm font-semibold text-amber-800">Tip: Be specific for best results</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Instead of <em>&quot;new listing&quot;</em>, try{" "}
                    <em>&quot;just listed 4-bed colonial in Lakewood with a renovated kitchen and pool.&quot;</em>
                  </p>
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-3">
                    <span className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-[spin_0.8s_linear_infinite]" />
                    <p className="text-sm font-semibold text-blue-700">Generating your content pack…</p>
                    <span className="text-xs text-blue-500 ml-auto">~15 seconds</span>
                  </div>
                  <LoadingSkeleton />
                </div>
              )}

              {/* Results */}
              {!loading && pack && <ResultCards pack={pack} model={pack.model ?? model} />}
            </div>

            {/* Right sidebar */}
            <div className="space-y-4">

              {/* Favorites */}
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[var(--shadow-xs)]">
                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="w-full flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BookMarked size={13} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Favorites</span>
                    {favorites.length > 0 && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-[10px] font-black text-white">
                        {favorites.length}
                      </span>
                    )}
                  </div>
                  {showFavorites ? <ChevronUp size={13} className="text-slate-400" /> : <ChevronDown size={13} className="text-slate-400" />}
                </button>

                {showFavorites && (
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto animate-[fadeIn_0.2s_ease-out]">
                    {favorites.length === 0 ? (
                      <p className="px-4 py-4 text-xs text-slate-400">
                        Hover any result card and click the ♥ to save favorites here.
                      </p>
                    ) : (
                      favorites.map((fav) => (
                        <div key={fav.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                          <div className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">
                            {fav.section}
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
                            {fav.content}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* History */}
              <HistorySidebar onSelect={handleHistorySelect} currentPackId={pack?.id} />

              {/* Pro tip */}
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-violet-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={13} className="text-blue-600" />
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Pro Tip</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Use <strong>Quick Actions</strong> on any caption to instantly make it shorter, punchier, or add a CTA — no re-generating needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
